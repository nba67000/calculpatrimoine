# Audit de sécurité — CalculPatrimoine

- **Date** : 2026-06-10
- **Périmètre** : code source applicatif (`src/`, configuration, dépendances). Hors périmètre : infrastructure Vercel, RGPD détaillé, performance.
- **Méthode** : revue statique du code + `npm audit` + vérification des advisories à jour (Next.js mai 2026, comportement React 19).
- **Version auditée** : Next.js 16.2.3, React 19, `@anthropic-ai/sdk` 0.92.0.

---

## Synthèse exécutive

**Niveau de sécurité global : Bon.** Le projet est manifestement conçu avec la sécurité en tête : validation stricte des entrées de l'API, en-têtes de sécurité complets, CSP présente, rate limiting implémenté, TypeScript `strict`, aucun secret committé, `security.txt` présent, et pas de données personnelles persistantes côté serveur. C'est nettement au-dessus de la moyenne d'un side-project.

Le point le plus important n'est pas une faille de logique applicative mais une **dépendance non patchée** : Next.js 16.2.3 est sujet à la release de sécurité coordonnée de mai 2026 (13 advisories, dont 7 « High »). C'est la seule action réellement prioritaire.

Aucune vulnérabilité **critique** ni **haute d'origine applicative** n'a été trouvée. Les findings applicatifs sont des renforcements (« defense in depth ») sur des surfaces réelles mais à exploitabilité actuellement faible.

| # | Finding | Sévérité | Origine |
|---|---------|----------|---------|
| 1 | Next.js 16.2.3 — 13 CVE connues (fix 16.2.6) | 🟠 Haute | Dépendance |
| 2 | Rate limiter contournable (XFF + mémoire par instance) | 🟡 Moyenne | Applicatif |
| 3 | CSP avec `'unsafe-inline'` (script + style) | 🟡 Moyenne | Config |
| 4 | Parser markdown sans allowlist de protocole d'URL | 🔵 Basse | Applicatif |
| 5 | JSON-LD via `JSON.stringify` non échappé | 🔵 Basse | Applicatif |
| 6 | `dangerouslySetInnerHTML` + `.replace` sur contenu statique | 🔵 Basse | Applicatif |
| 7 | localStorage non chiffré | 🔵 Basse | Applicatif |
| 8 | `.env` non ignoré par Git (seul `.env*.local` l'est) | 🔵 Basse | Config |

---

## 1. 🟠 Next.js 16.2.3 — 13 vulnérabilités connues (fix : 16.2.6)

**Fichier** : `package.json` (`"next": "^16.2.3"`), version résolue 16.2.3 dans `package-lock.json`.

**Constat.** `npm audit` remonte Next.js en sévérité « high ». Le 7 mai 2026, Vercel a publié une release de sécurité coordonnée corrigeant **13 advisories** (dont 7 « High ») couvrant : contournement de middleware/proxy, XSS, SSRF (via WebSocket upgrade), cache poisoning et déni de service. La plage vulnérable inclut `16.0.0 → < 16.2.6`. La version 16.2.5 ne corrige que partiellement (incomplet avec Turbopack) : il faut **16.2.6 ou plus**.

**Pertinence pour ce projet précisément :**
- **Contournement de middleware/proxy** : ce projet s'appuie sur `src/proxy.ts` pour le rate limiting. Plusieurs des CVE permettent de faire résoudre une route en contournant le matcher du proxy → le rate limiter peut être esquivé. (Ici l'impact est « seulement » le rate limiting, pas de l'auth, ce qui limite la gravité.)
- **DoS dans l'API d'optimisation d'images** : ton `next.config.js` active l'optimisation `images` (AVIF/WebP) → surface concernée.
- **DoS dans les Server Components** : requêtes malformées pouvant crasher le rendu.
- **SSRF via WebSocket upgrade** : les apps hébergées sur Vercel bénéficient d'une mitigation plateforme spécifique pour ce point — mais l'upgrade reste recommandé pour le reste.
- **XSS dans les chemins utilisant les nonces CSP** : non applicable directement (tu n'utilises pas de nonce, cf. finding 3), mais c'est un argument pour faire l'upgrade **avant** de migrer vers une CSP à nonce.

**Correction.**
```bash
npm install next@latest   # vise ≥ 16.2.6 (idéalement la dernière 16.x)
npm audit                 # revérifier
npm run build && npm test # non-régression
```
À noter : même hébergé sur Vercel, l'upgrade reste nécessaire (la plateforme ne mitige que le SSRF, pas les bypass middleware ni les DoS).

---

## 2. 🟡 Rate limiter contournable (en-tête XFF + mémoire par instance)

**Fichier** : `src/proxy.ts` (lignes 27-49).

Le rate limiting est correctement câblé : en Next.js 16, `proxy.ts` exportant `proxy()` + `config.matcher` **est** la convention officielle qui remplace `middleware.ts`. Il s'exécute donc bien. Deux faiblesses cependant.

**2a. Source d'IP usurpable.**
```ts
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??  // ⚠️ premier hop = client
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}
```
`x-forwarded-for` est une liste `client, proxy1, proxy2, …`. Prendre `[0]` prend la valeur **fournie par le client**, qui est arbitraire. Un attaquant qui envoie `X-Forwarded-For: <ip aléatoire>` à chaque requête obtient un compteur neuf à chaque fois → le rate limiting (10 req/min/IP) est **entièrement contourné** par simple rotation d'en-tête.

Sur Vercel, l'IP cliente réelle est ajoutée par la plateforme ; il faut consommer une valeur de confiance, pas le premier élément. Selon la topologie Vercel, c'est généralement le **dernier** hop de XFF (ou `x-real-ip` posé par la plateforme).

**2b. Mémoire non partagée entre instances.**
Le `Map` en mémoire est par instance Lambda (le code le documente honnêtement). La doc Next.js sur `proxy.ts` insiste : *« you should not attempt relying on shared modules or globals »*. Sur un parc serverless, un attaquant réparti sur plusieurs instances dilue le compteur. Combiné au CVE de contournement de proxy (finding 1), la protection est fragile.

**Impact.** Coût API Anthropic potentiellement non borné ; dégradation de service. L'impact financier dépend de tes plafonds côté console Anthropic — vérifie qu'un **budget/limite de dépense** est bien posé là-bas comme filet de sécurité ultime, indépendamment du code.

**Correction.**
- Consommer une IP de confiance (sur Vercel : `x-real-ip` ou le dernier hop XFF) plutôt que `split(',')[0]`.
- Pour un vrai rate limiting distribué, passer à un store partagé : Upstash Redis (`@upstash/ratelimit`), que tu cites déjà en commentaire. Le sliding-window en mémoire reste utile comme première barrière anti-burst.
- Indépendamment du code : poser un plafond de dépense sur la console Anthropic.

---

## 3. 🟡 CSP avec `'unsafe-inline'`

**Fichier** : `next.config.js` (lignes 4-15).

```js
"script-src 'self' 'unsafe-inline'",
"style-src 'self' 'unsafe-inline'",
```

`'unsafe-inline'` sur `script-src` annule une grande partie de la protection anti-XSS qu'apporte une CSP : si un sink d'injection HTML existait, l'attaquant pourrait exécuter du `<script>` inline. C'est ici une **réduction de la défense en profondeur**, pas une faille en soi (aucun sink d'injection HTML utilisateur exploitable n'a été trouvé — cf. findings 4-6).

L'origine probable est double : les scripts JSON-LD inline (`dangerouslySetInnerHTML`) et les styles inline (Tailwind / `RangeSlider`). Le reste de la CSP est solide (`object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`).

**Correction (par ordre d'effort).**
- À court terme : retirer `'unsafe-inline'` de **`style-src`** est souvent plus simple que pour les scripts ; à tester.
- À moyen terme : CSP à **nonce**. Next.js sait générer un nonce via le proxy et le propager (`headers()` + lecture du nonce). ⚠️ Fais l'upgrade Next.js (finding 1) **avant**, car un des CVE concerne justement le XSS dans les chemins à nonce.
- Optionnel : ajouter une CSP `Report-Only` en parallèle pour détecter les violations avant de durcir.

---

## 4. 🔵 Parser markdown — pas d'allowlist de protocole d'URL

**Fichier** : `src/lib/markdownParser.tsx` (ligne 23).

```tsx
<a key={key++} href={m[3]} target="_blank" rel="noopener noreferrer" ...>
  {m[2]}
</a>
```

`m[3]` (l'URL entre parenthèses d'un `[texte](url)`) est injecté tel quel dans `href`, sans validation de protocole. Un `[clic](javascript:...)` produirait `<a href="javascript:...">`.

**Pourquoi ce n'est pas critique ici (mesuré honnêtement) :**
1. **React 19 sanitise nativement les URLs `javascript:` dans les `href`** — le payload classique est neutralisé à l'exécution. (Le `data:` et certains schémas exotiques ne sont pas couverts par React, mais les navigateurs modernes bloquent déjà la navigation top-level vers `data:text/html`.)
2. Le contenu rendu via `renderMarkdown` provient **uniquement** des messages de l'assistant (les messages utilisateur sont rendus en texte brut, cf. `ChatWidget.tsx:195`).
3. Le chat est **par session** et n'est **pas** persisté en localStorage ni partagé entre utilisateurs → au pire un self-XSS, pas un vecteur stocké inter-utilisateurs.

C'est donc un risque **latent** : la protection repose sur un comportement implicite du framework (qui disparaîtrait à un downgrade de React, ou si le parser était réutilisé hors React / côté serveur). Le corriger explicitement est peu coûteux et supprime la dépendance à cette protection implicite.

**Correction.**
```tsx
const SAFE = /^(https?:|mailto:|\/|#)/i   // http(s), mailto, relatif, ancre
// ...
} else {
  const url = m[3]
  if (!SAFE.test(url.trim())) {
    nodes.push(m[2])                      // rendu en texte si protocole non autorisé
  } else {
    nodes.push(
      <a key={key++} href={url} target="_blank" rel="noopener noreferrer" className="...">
        {m[2]}
      </a>
    )
  }
}
```

---

## 5. 🔵 JSON-LD via `JSON.stringify` non échappé

**Fichiers** : `src/components/SchemaMarkup.tsx:97`, `SchemaFAQ.tsx:43`, `SchemaHowTo.tsx:52`, `src/app/ifi/page.tsx:63,67`.

```tsx
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
```

`JSON.stringify` n'échappe pas `<`, `>` ni la séquence `</script>`. Si une valeur de schéma contenait `</script><script>…`, elle sortirait du bloc et exécuterait du JS. **Aujourd'hui le risque est faible** : les données de schéma sont statiques / dérivées de métadonnées de page (pas d'entrée utilisateur). C'est un durcissement standard Next.js pour le JSON-LD.

**Correction.** Échapper `<` (et idéalement `>` et `&`) :
```tsx
const safeJson = JSON.stringify(schema).replace(/</g, '\\u003c')
// ... __html: safeJson
```

---

## 6. 🔵 `dangerouslySetInnerHTML` + `.replace` sur contenu statique

**Fichiers** : `src/components/MethodologieSection.tsx:61`, `src/app/comparateur-locatif-placement/page.tsx:58`, `src/app/sci-is-vs-ir/page.tsx:55`.

```tsx
<span dangerouslySetInnerHTML={{ __html: l.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
```

`l` provient de tableaux **codés en dur dans le source** (ex. `const LIMITES = [...]`) — aucune entrée utilisateur, donc pas de XSS exploitable. Mais le `.replace` transforme `**gras**` en `<strong>` **sans échapper le reste** : si un jour une de ces chaînes contenait un `<` ou une URL avec du HTML, il serait rendu brut. C'est un *code smell* fragile.

**Correction.** Réutiliser le rendu React sûr que tu as déjà (`parseInline` de `markdownParser.tsx` gère `**gras**` sans `dangerouslySetInnerHTML`), ou un petit helper qui échappe d'abord le HTML puis applique le gras.

---

## 7. 🔵 localStorage non chiffré

**Fichier** : `src/hooks/useSimStorage.ts`.

Les inputs des calculateurs (`calcpatrimoine:state:<slug>`) et l'historique (`calcpatrimoine:history`) sont stockés en clair. Selon le calculateur, cela peut inclure des montants de patrimoine/revenus estimés. **Pas d'identifiant ni de PII directe**, et stockage **par navigateur** (jamais transmis). Pour le modèle de menace (site anonyme, sans compte), c'est acceptable.

Deux points mineurs :
- **Appareil partagé** : les valeurs persistent (`localStorage`, pas `sessionStorage`). Tu as déjà un `reset()` par calculateur ; un bouton « effacer toutes mes données » global + une mention courte (« vos saisies restent sur cet appareil ») seraient un plus côté transparence/UX.
- **Altération** : `getSimHistory()` relit `entry.href` qui est rendu dans `<a href>` (`SimHistoryWidget.tsx:47`). Écrire dans localStorage suppose déjà un accès local ou un XSS, donc le risque est faible — mais c'est une raison de plus de garder l'allowlist d'URL du finding 4 en tête si tu factorises le rendu des liens.

**Correction (optionnelle).** Si tu juges les montants sensibles : préférer `sessionStorage` pour l'historique, ou un chiffrement client léger. Sinon, documenter le comportement suffit.

---

## 8. 🔵 `.env` non ignoré par Git

**Fichier** : `.gitignore` (ligne 29 : `.env*.local`).

Seuls les `.env*.local` sont ignorés. Un développeur qui crée un `.env` (sans `.local`) pour y mettre `ANTHROPIC_API_KEY` risquerait de le committer. Aucun `.env` n'est présent dans l'archive (bien), mais c'est un garde-fou à ajouter.

**Correction.**
```gitignore
# local env files
.env
.env.*
!.env.example
```

---

## Points positifs (à conserver)

- **Validation d'entrée API solide** (`route.ts`) : allowlist de slugs, plafonds de longueur (messages, input 1000c, contexte 3000c), validation du `role`, troncature du nombre de messages. Bonne hygiène anti-injection de prompt et anti-abus de coût.
- **En-têtes de sécurité complets** (`next.config.js`) : HSTS `preload`, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` restrictive, CSP présente.
- **Gestion des secrets** : `ANTHROPIC_API_KEY` côté serveur uniquement (pas de préfixe `NEXT_PUBLIC_`), utilisée seulement dans la route API. Aucun secret committé (recherche `sk-ant-`, patterns clé/token : néant).
- **TypeScript `strict: true`**.
- **`public/.well-known/security.txt`** présent (responsible disclosure).
- **Réponses d'erreur génériques** (pas de stack trace renvoyée au client).
- **`RangeSlider.tsx` `innerHTML`** : construit uniquement à partir de `useId()` + constantes `BRAND_COLORS` → non contrôlable, non exploitable (vérifié).
- **Une seule route API** exposée (`POST /api/chat`), pas de CORS permissif, pas de `eval`/`new Function`.

---

## Plan d'action recommandé (par priorité)

1. **Upgrade Next.js ≥ 16.2.6** + `npm audit` + build/tests. *(finding 1 — la seule action vraiment prioritaire)*
2. **Corriger la source d'IP du rate limiter** (ne plus prendre `xff.split(',')[0]`) et **poser un plafond de dépense Anthropic**. *(finding 2)*
3. **Allowlist de protocole dans le parser markdown** *(finding 4)* + échappement `<` du JSON-LD *(finding 5)* — corrections courtes, sûres.
4. **Ajouter `.env` au `.gitignore`** *(finding 8)*.
5. **Durcir la CSP** (retirer `'unsafe-inline'` de `style-src` puis viser une CSP à nonce) — *après* l'upgrade Next.js. *(finding 3)*
6. Remplacer les `dangerouslySetInnerHTML` + `.replace` par `parseInline` *(finding 6)* ; envisager un « clear all data » *(finding 7)*.

## Checklist de vérification des correctifs

- [ ] `npm audit` ne remonte plus Next.js en high/critical
- [ ] `X-Forwarded-For: 1.2.3.4` répété ne réinitialise plus le compteur de rate limit
- [ ] `[x](javascript:alert(1))` et `[x](data:text/html,...)` dans une réponse assistant sont rendus en texte (pas en lien actif)
- [ ] Un champ JSON-LD contenant `</script>` n'échappe plus du bloc `<script>`
- [ ] `.env` (sans `.local`) est bien ignoré par Git
- [ ] La CSP ne casse pas le rendu après retrait de `'unsafe-inline'` (tester chaque page de calculateur)

---

*Audit réalisé par revue statique. Il ne remplace pas un test d'intrusion dynamique ni un audit RGPD. Les advisories Next.js référencées datent de la release du 7 mai 2026 (vérifiées à jour au 2026-06-10).*
