---
description: Implémente un nouveau calculateur de bout en bout, en suivant le workflow défini dans CLAUDE.md §7.
---

# /nouveau-calculateur

Tu vas implémenter **un seul** calculateur de A à Z. Tu suis le workflow
défini dans `CLAUDE.md` §7 sans dévier.

**MODE SOBRIÉTÉ ACTIVE** - Token efficiency obligatoire :
- Chemins de fichiers only (pas de contenu complet sauf si demandé)
- Diffs plutôt que fichiers entiers pour les modifications
- Pas d'explication si l'action est évidente
- Réponses en français

---

## Étapes à suivre dans l'ordre

### 1. Lire la backlog et choisir

- Lire `BACKLOG.md`.
- Sélectionner le **premier item en statut `todo`** dont la priorité est la
  plus haute (P1 > P2 > P3). Si plusieurs P1 `todo`, prendre le premier dans
  l'ordre du fichier.
- **Mettre à jour son statut à `in-progress`** immédiatement, avec la date
  du jour.
- Annoncer : "Je commence le calculateur `<slug>` - <nom>.
  Estimation : <X> étapes, <Y> fichiers."

**STOP - attends validation avant de continuer.**

---

### 2. Recherche des sources légales

**Lire `CLAUDE.md` §6 avant toute chose** : Légifrance et BOFiP sont
structurellement instables au crawl (50 % de 404, 17 % de mauvais contenu
mesurés au crawl 2026-05-31). La stratégie est donc :

1. Identifier les **références textuelles** des articles applicables (Art X
   du code Y) - c'est ça la source primaire, pas l'URL.
2. **Tester chaque URL** avec WebFetch et un prompt qui vérifie le contenu
   (pas juste le code HTTP). Si le contenu affiché ne correspond pas à
   l'article annoncé, classer en `⚠️ MAUVAIS CONTENU`.
3. **Cross-check obligatoire** : pour chaque taux/seuil utilisé, trouver
   au moins **deux sources concordantes**. URLs à privilégier pour le
   cross-check (stables) :
   - `service-public.fr/particuliers/vosdroits/F<numéro>`
   - `impots.gouv.fr` (tableaux récapitulatifs)
   - `boss.gouv.fr` (protection sociale)

Pour chaque article ou barème vérifié :
- **Statut A (✅ OK)** : URL testée + contenu correspond → noter le statut
  dans le fichier sources.
- **Statut B (❌ 404 / 403 / timeout)** : marquer la référence textuelle
  comme valide, l'URL en `~~strikethrough~~`, ajouter à
  `docs/broken-links-to-fix.md`.
- **Statut C (⚠️ MAUVAIS CONTENU)** : retirer le lien, conserver la
  référence textuelle, ajouter à `docs/broken-links-to-fix.md`.
- **Statut D (☐ NON TESTABLE)** : marquer comme à vérifier, mentionner dans
  la section "URLs vérifiées manuellement par Nicolas" du fichier sources.

**Créer `docs/sources/<slug>.md`** en partant de `docs/sources/_TEMPLATE.md`.
Remplir TOUTES les colonnes du tableau "Barèmes et taux appliqués" avec
au minimum 2 cross-checks par ligne.

Lister au moins 3 cas chiffrés de référence venant de sources officielles
(service-public.fr ou BOFiP de préférence, leurs cas chiffrés sont stables).

**STOP - lister :**
1. Les URLs en statut A (vérifiables automatiquement)
2. Les URLs en statut B/C/D qui nécessitent une vérification humaine
   par Nicolas avant que le calculateur puisse être committé
3. Les chiffres dont la source primaire est en B/C/D ET qui n'ont que
   1 cross-check (insuffisant - on en exige 2)

**Attends que Nicolas confirme avant de continuer.**

---

### 3. Types

- Lire `src/types/<domaine-proche>.ts` pour calquer le style.
- Créer ou étendre `src/types/<domaine>.ts`.
- Inclure au minimum : `<Nom>Inputs`, `<Nom>Results`, les types intermédiaires,
  et les structures `warnings` / `optimisations` standards.

---

### 4. Logique pure

- Lire `src/lib/<domaine-proche>.ts` pour calquer le style.
- Créer `src/lib/<domaine>.ts` avec :
  - JSDoc en français sur toutes les fonctions exportées.
  - Commentaires `// 1. ... // 2. ...` pour les étapes de la fonction principale.
  - Commentaire source pour chaque constante fiscale (`// Art. X CGI`).
  - Au moins 2 exemples de référence en JSDoc `@example` avec valeurs
    attendues issues des cas identifiés en étape 2.

---

### 5. Auto-validation

- **Simuler mentalement** chaque exemple de référence : la fonction doit
  retourner exactement les valeurs attendues (tolérance ±1 € sur les arrondis).
- Si un écart est constaté, corriger avant de continuer.
- **Si tu n'arrives pas à reproduire un cas officiel → s'arrêter et demander.**

**Cas piège — agrégation entre régimes fiscaux** : si le calculateur touche
plusieurs régimes qui pourraient se croiser (ex : 757 B + succession ordinaire,
PER capital + revenus du foyer, plus-value mobilière + plus-value immobilière),
vérifier explicitement dans le **BOFiP** comment ces régimes s'articulent :

- L'abattement personnel s'applique-t-il sur chaque silo, ou sur l'agrégat ?
- Le barème progressif tourne-t-il en plusieurs passes, ou en une seule sur la
  somme ?
- L'ordre d'imputation des abattements est-il documenté ?

**Le bug 757 B (2026-06-04) est arrivé exactement là**. La lib traitait l'AV
versée après 70 ans en silo séparé avec son propre barème, alors que le BOFiP
BOI-ENR-DMTG-10-10-20-20 § 230 impose l'agrégation à la part successorale
ordinaire avant application de l'abattement Art. 779 et du barème Art. 777.
Conséquences : chiffres affichés au public faux pendant des mois.

**Règle dure** : pour tout calcul qui combine plusieurs régimes, WebFetch
le BOFiP correspondant et lire le paragraphe précis sur l'articulation avant
d'écrire la fonction.

---

### 6. UI - composant calculateur

- Lire un composant existant (`AssuranceVieCalculator.tsx` pour la mise en
  page deux colonnes, `RenteCalculator.tsx` pour les sliders).
- Créer `src/components/Calculator/<Nom>Calculator.tsx`.
- Pattern : `useState` pour les inputs, `useMemo` pour le calcul, deux
  colonnes responsive.
- Palette : bleu unique, zéro emoji, amber warning only.
- Rendu des warnings / optimisations selon la convention Tailwind des
  `CONVENTIONS_CALCULATEUR.md`.

---

### 7. Page calculateur

- Lire `src/app/assurance-vie/fiscalite-rachat/page.tsx` (ou équivalent) pour
  calquer la structure.
- Créer `src/app/<slug>/page.tsx` avec :
  - Metadata complète (title, description, openGraph).
  - Breadcrumb.
  - H1 + sous-titre.
  - `<LegalDisclaimer />` au-dessus du calculateur.
  - Le composant calculateur.
  - Sections SEO sous le fold : "Comment ça marche", "Formule", "Exemples".
  - Section "Sources" reprenant `docs/sources/<slug>.md`.

---

### 8. Page FAQ associée

- Identifier la page FAQ existante la plus proche (lire son fichier pour
  calquer le pattern exact : structure, composants, style).
- Créer `src/app/<slug>/faq/page.tsx` avec :
  - Metadata complète (title, description, openGraph).
  - Breadcrumb incluant le lien retour vers `/<slug>`.
  - H1 + sous-titre orienté questions fréquentes.
  - Au minimum 8 questions/réponses pertinentes issues des cas identifiés
    en étape 2 et de la logique métier de l'étape 4.
  - `<LegalDisclaimer />`.
  - Lien retour vers le calculateur.
- Ajouter le lien FAQ dans la page calculateur (étape 7) si un pattern
  de lien inter-pages existe déjà.

**STOP - liste les fichiers créés (chemins uniquement). Attends validation.**

---

### 9. Intégration navigation

- Ajouter le lien dans `src/components/Header.tsx` si la navigation principale
  doit le contenir (P1 oui, P2/P3 en sous-menu ou footer).
- Ajouter les URLs (`/<slug>` et `/<slug>/faq`) dans `src/app/sitemap.ts`.

---

### 10. Tests

- Identifier les fichiers de tests existants et lire un test proche pour
  calquer le pattern.
- Créer les tests pour le nouveau calculateur (logique pure + composant si
  couverture UI existe déjà).

**Règle dure — test contre source primaire obligatoire** : chaque fonction
de calcul fiscal exportée DOIT avoir au moins un test vitest qui valide un
cas chiffré contre une source primaire (BOFiP, exemple officiel
service-public.fr, doctrine fiscale citée explicitement dans le commentaire
du test). Les tests qui valident uniquement la manipulation de données
(ajout/suppression/cascade d'éléments) ne suffisent **pas** : ils auraient
laissé passer le bug 757 B.

Le commentaire du test doit citer :
1. Le cas de référence (source : BOFiP § X, service-public.fr exemple Y, etc.)
2. Le calcul attendu pas à pas (montant taxable, abattement, barème par tranche)
3. La valeur finale exacte avec sa marge de tolérance (±1 € sur les arrondis)

**Cas piège — agrégation entre régimes** : si la fonction agrège plusieurs
régimes fiscaux (cf. étape 5), ajouter au moins un test "scénario complet"
qui valide l'agrégation correcte. Exemple :

```ts
it('scénario X : régime A + régime B agrégés (BOFiP § Y)', () => {
  // Source : BOI-XXX-YYY § Z
  // Montant régime A : 125 000 €
  // Montant régime B taxable (après abattement spécifique) : 134 750 €
  // Agrégat : 259 750 €
  // Abattement personnel Art. ZZZ : 100 000 € (une seule fois sur l'agrégat)
  // Base taxable : 159 750 €
  // Barème Art. WWW en une passe : 30 144 €
  expect(result.totalDroits).toBe(30144)
})
```

- Lancer **tous** les tests existants :

```bash
npm run test
```

- Produire un rapport en tableau compact :

| Fichier test | Statut | Écart vs pattern | Source primaire validée |
|---|---|---|---|
| ... | ✅ / ❌ | ... | ✅ BOFiP § X / ❌ aucune |

- Si des écarts de pattern sont détectés entre tests existants →
  proposer une harmonisation en diff minimal.

**STOP si des tests échouent ou si une harmonisation est proposée -
attends validation avant toute modification.**

**STOP supplémentaire si une fonction de calcul fiscal n'a pas de test
contre source primaire** — ne pas committer.

---

### 11. Vérifications build

Lancer dans l'ordre, corriger au fur et à mesure :

```bash
npm run type-check
npm run lint
npm run build
```

**Tous doivent passer.** Si un échec semble impossible à corriger en 2
tentatives, s'arrêter et résumer l'erreur.

---

### 12. Audit performance

Tu es un performance engineer spécialisé Next.js. Diagnostique le projet
sur les axes suivants et applique les corrections validées.

#### 12a. Bundle & imports

```bash
npm run build -- --debug
npx @next/bundle-analyzer
```

Vérifier :
- Imports barrel (`index.ts`) qui tirent des modules non utilisés → remplacer
  par imports directs.
- Librairies importées en entier alors qu'un seul export est utilisé
  (ex. `lodash`, `date-fns`, `recharts`) → tree-shaking ou import ciblé.
- Chunks > 200 kB non justifiés → identifier le coupable avec
  `ANALYZE=true npm run build`.

#### 12b. Mémoire & fuites React

Inspecter tous les composants Calculator créés ou modifiés :
- `useEffect` sans cleanup (listeners, timers, subscriptions) → ajouter
  la fonction de retour.
- `useMemo` / `useCallback` manquants sur des calculs fiscaux lourds
  (provisions mathématiques, tables de mortalité) → wrapper.
- State inutilement global qui force des re-renders en cascade → localiser.

#### 12c. Latence SSR / ISR

Vérifier `src/app/<slug>/page.tsx` et `src/app/<slug>/faq/page.tsx` :
- Page en `'use client'` alors qu'elle pourrait être Server Component → convertir
  les parties statiques.
- Données statiques (barèmes, taux) hardcodées dans le composant client →
  déplacer en `generateStaticParams` ou `export const revalidate`.
- Absence de `loading.tsx` pour les routes dynamiques → créer si manquant.

#### 12d. Images & assets

```bash
find public/ -name "*.png" -o -name "*.jpg" | xargs ls -lh
```

- Images > 50 kB non passées par `next/image` → remplacer.
- SVG inline volumineux dans les composants → externaliser ou optimiser avec
  `svgo`.

#### 12e. Core Web Vitals

```bash
npx lighthouse http://localhost:3000/<slug> --output=json --quiet \
  | jq '{LCP:.audits["largest-contentful-paint"].displayValue,
         CLS:.audits["cumulative-layout-shift"].displayValue,
         FID:.audits["total-blocking-time"].displayValue}'
```

Seuils cibles :
- LCP < 2,5 s
- CLS < 0,1
- TBT (proxy FID) < 200 ms

Si un seuil est dépassé → identifier l'audit Lighthouse incriminé et corriger.

#### 12f. Rapport & corrections

Produire un rapport en tableau :

| Axe | Problème détecté | Impact | Correction appliquée |
|---|---|---|---|
| Bundle | ... | High / Med / Low | ... |
| Mémoire | ... | High / Med / Low | ... |
| SSR/ISR | ... | High / Med / Low | ... |
| Images | ... | High / Med / Low | ... |
| CWV | ... | High / Med / Low | ... |

- Corrections **Low** → appliquer directement sans STOP.
- Corrections **Med / High** → lister en diff, **STOP - attends validation.**
- Relancer `npm run build` après chaque correction pour valider.

---

### 13. Amélioration architecture

Invoquer le skill `/improve-codebase-architecture`.

**STOP après le rapport - attends validation avant tout refactor.**

---

### 14. Audit sécurité

Tu es un security specialist. Audite le projet sur les points suivants :

- **Security headers** : CSP, HSTS, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy - vérifier la config
  `next.config.js` / middleware.
- **Exposition côté client** : variables d'env publiques, données sensibles
  dans le bundle.
- **Dépendances vulnérables** :

```bash
npm audit
```

- **Surface d'attaque** : formulaires, inputs non sanitisés, absence de
  rate limiting si API routes présentes.
- **Fichiers sensibles exposés** : `.env`, configs, routes admin sans
  protection.

Produire un rapport en tableau :

| Faille | Sévérité | Fix recommandé |
|---|---|---|
| ... | Critical / High / Medium / Low | ... |

**STOP - attends validation avant d'appliquer les fixes.**

---

### 15. Audit conformité légale

Tu es un juriste spécialisé en droit financier français et en droit du
numérique (RGPD, LCEN). Audite **l'intégralité des textes produits** dans
ce calculateur : UI, FAQ, metadata SEO, et `docs/sources/<slug>.md`.

#### 15a. Périmètre des fichiers à analyser

Scanner phrase par phrase :
- `src/app/<slug>/page.tsx` - tous les textes visibles (H1, sous-titre,
  sections SEO, sources)
- `src/app/<slug>/faq/page.tsx` - toutes les questions et réponses
- `src/components/Calculator/<Nom>Calculator.tsx` - labels, tooltips,
  warnings, messages d'optimisation
- Metadata : `title`, `description`, `openGraph.description`
- `docs/sources/<slug>.md` - formulations des cas de référence

#### 15b. Détection des formulations conseil

**Règle absolue** : CalcPatrimoine est un outil de simulation, pas un
conseiller en investissements financiers (CIF). Aucune phrase ne doit
pouvoir être interprétée comme une recommandation personnalisée.

Signaler toute formulation tombant dans l'une de ces catégories :

| Catégorie | Exemple problématique | Reformulation cible |
|---|---|---|
| Injonction directe | "Vous devriez racheter avant 8 ans" | "La simulation indique que..." |
| Promesse de résultat | "Vous économiserez X€" | "La simulation estime une économie de X€ selon les paramètres saisis" |
| Certitude fiscale | "Vous êtes exonéré" | "Selon les paramètres saisis, le calcul indique une exonération" |
| Conseil implicite | "Il est préférable d'opter pour..." | "Certains épargnants choisissent... - à valider avec un conseiller" |
| Généralisation | "Les contrats d'assurance-vie permettent toujours..." | "En règle générale... (sous réserve des conditions contractuelles)" |

Pour chaque occurrence détectée → proposer la reformulation corrigée.

#### 15c. Présence et qualité du disclaimer légal

Vérifier que `<LegalDisclaimer />` est présent et visible sur :
- La page calculateur (au-dessus du composant)
- La page FAQ

Vérifier le contenu du composant `LegalDisclaimer` :
- Mentionne explicitement que l'outil ne constitue pas un conseil en
  investissement au sens de la directive MIF II.
- Recommande de consulter un conseiller en gestion de patrimoine (CGP)
  ou un notaire pour toute décision.
- Indique que les résultats dépendent des paramètres saisis et de la
  législation en vigueur à la date affichée.
- Précise l'année de la dernière mise à jour des barèmes.

Si le disclaimer est absent ou incomplet → proposer le texte corrigé,
**STOP - attends validation.**

#### 15d. Conformité RGPD

Vérifier selon la présence effective dans le projet
(skip les checks non applicables) :

**Analytics** (Plausible, GA, etc.) :
- Bandeau de consentement présent et conforme (opt-in avant collecte) ?
- Politique de confidentialité accessible depuis le footer ?
- Durée de conservation des données mentionnée ?

**Formulaires** (contact, newsletter) :
- Case à cocher opt-in non pré-cochée ?
- Mention de la finalité du traitement au moment de la collecte ?
- Lien vers la politique de confidentialité au point de collecte ?
- Droit d'accès/rectification/suppression mentionné ?

**Cookies** :
- `next.config.js` ou middleware : headers `Set-Cookie` avec `SameSite`
  et `Secure` ?
- Si cookies tiers → listés dans la politique de confidentialité ?

**Hébergement** :
- Le prestataire d'hébergement est-il établi dans l'UE ou dispose-t-il
  de garanties adéquates (clauses contractuelles types) ?

#### 15e. Conformité LCEN (loi pour la confiance dans l'économie numérique)

Vérifier la présence dans le footer ou une page dédiée :
- Nom ou raison sociale de l'éditeur du site.
- Adresse de contact (email suffit pour un particulier sous micro-entreprise).
- Mention de l'hébergeur (nom, adresse, contact).
- Si applicable : numéro SIRET / SIREN de la micro-entreprise.

#### 15f. Mentions obligatoires spécifiques finance

Pour un outil traitant d'assurance-vie, rentes, et fiscalité patrimoniale :
- Vérifier qu'aucune page ne présente les résultats comme une projection
  garantie au sens AMF.
- Vérifier l'absence de toute mention pouvant laisser entendre que
  CalcPatrimoine est agréé AMF, ACPR, ou enregistré comme CIF.
- Si des taux de rendement sont affichés (ex. taux fonds euros) → vérifier
  la présence de la mention "Les performances passées ne préjugent pas des
  performances futures" ou équivalent.

#### 15g. Rapport & corrections

Produire un rapport structuré :

**Formulations conseil détectées :**

| Fichier | Texte actuel | Problème | Texte corrigé |
|---|---|---|---|
| ... | ... | ... | ... |

**Disclaimer légal :**

| Check | Statut | Action |
|---|---|---|
| Présent page calculateur | ✅ / ❌ | ... |
| Présent page FAQ | ✅ / ❌ | ... |
| Mention MIF II | ✅ / ❌ | ... |
| Année barèmes | ✅ / ❌ | ... |

**RGPD :**

| Check | Applicable | Statut | Action |
|---|---|---|---|
| Bandeau consentement | O/N | ✅ / ❌ | ... |
| Politique confidentialité | O/N | ✅ / ❌ | ... |
| Opt-in formulaires | O/N | ✅ / ❌ | ... |

**LCEN :**

| Check | Statut | Action |
|---|---|---|
| Mentions éditeur | ✅ / ❌ | ... |
| Mentions hébergeur | ✅ / ❌ | ... |

**Finance :**

| Check | Statut | Action |
|---|---|---|
| Absence mention agrément AMF/ACPR | ✅ / ❌ | ... |
| Disclaimer performances passées | ✅ / ❌ | ... |

- Corrections textuelles (reformulations) → appliquer directement.
- Corrections structurelles (nouveau composant, nouvelle page mentions
  légales) → proposer en diff, **STOP - attends validation.**

---

### 16. Audit SEO

Tu es un expert SEO spécialisé dans les outils financiers francophones.
Audite et optimise le nouveau calculateur pour maximiser sa visibilité
organique, en priorisant la longue traîne avant les requêtes génériques.

#### 16a. Recherche de mots-clés cibles

Sans outil externe, reconstituer l'univers sémantique à partir des sources
légales et de la logique métier (étapes 2 et 4) :

- **Requêtes principales** (volume élevé, concurrence forte) :
  ex. "calculateur rente viagère", "simulateur assurance vie".
- **Requêtes longue traîne** (volume faible, intention forte) :
  ex. "calcul rente viagère homme 65 ans taux 3%".
- **Requêtes question** (People Also Ask) :
  ex. "comment calculer une rente viagère ?"

Identifier 1 requête principale cible et 5 à 8 longue traîne prioritaires.

| Requête | Type | Intention | Priorité |
|---|---|---|---|
| ... | Principale / Longue traîne / Question | Informationnelle / Transactionnelle | P1/P2/P3 |

#### 16b. Optimisation on-page

Vérifier et corriger dans `src/app/<slug>/page.tsx` :

**Balises fondamentales :**
- `<title>` : requête principale + "| CalcPatrimoine" - 60 caractères max.
- `<meta description>` : requête principale + bénéfice concret + CTA
  implicite - 155 caractères max.
- `openGraph.title` / `openGraph.description` : adaptés au partage social,
  pas une copie des balises standard.

**Structure H1/H2/H3 :**
- H1 unique contenant la requête principale.
- H2 pour chaque section sous le fold - contiennent des variantes ou
  requêtes longue traîne.
- H3 pour les sous-sections FAQ - chaque H3 formulé comme une requête
  question naturelle.
- Pas de saut de niveaux (H1 → H3 sans H2).
- Mot-clé principal présent dans le premier paragraphe visible.

**Contenu textuel :**
- Section "Comment ça marche" : ≥ 150 mots, 2 à 3 variantes de la requête.
- Section "Exemples" : chaque exemple chiffré répond implicitement à une
  requête longue traîne identifiée en 16a.
- Liens vers Légifrance/BOFiP : `rel="noopener noreferrer"` sans `nofollow`
  (les sources officielles sont des signaux de crédibilité).

#### 16c. Optimisation FAQ (`/<slug>/faq`)

- Chaque question formulée en langage naturel - pas "Définition de la rente
  viagère" mais "Qu'est-ce qu'une rente viagère ?".
- Les 8 questions couvrent les requêtes question identifiées en 16a.
- Chaque réponse ≥ 80 mots (seuil featured snippets).
- Schema `FAQPage` en JSON-LD :

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
  }))
}

// Dans le return :
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

#### 16d. Données structurées (Schema.org)

Ajouter dans `src/app/<slug>/page.tsx` :

```typescript
const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "<Nom du calculateur>",
  "description": "<description courte>",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "inLanguage": "fr-FR",
  "author": { "@type": "Organization", "name": "CalcPatrimoine" }
}
```

Vérifier que `BreadcrumbList` est présent ou l'ajouter si le composant
`Breadcrumb` ne le génère pas automatiquement.

#### 16e. Maillage interne

- Page calculateur → FAQ : ancre descriptive (ex. "Questions fréquentes
  sur la rente viagère"), pas "cliquez ici".
- FAQ → calculateur : ancre descriptive en retour.
- Page calculateur liée depuis ≥ 1 page existante (calculateur voisin,
  accueil, footer) - vérifier `Header.tsx` et `src/app/page.tsx`.
- Bloc "Calculateurs liés" en bas de page si un pattern similaire existe.

#### 16f. Signaux techniques

`src/app/sitemap.ts` :
- `/<slug>` : `priority: 0.8`, `changeFrequency: 'monthly'`.
- `/<slug>/faq` : `priority: 0.6`, `changeFrequency: 'monthly'`.

`robots.txt` / `src/app/robots.ts` :
- Aucun `Disallow` ne bloque `/<slug>` ou `/<slug>/faq`.
- `Sitemap:` pointe vers l'URL absolue.

Balises canoniques :
- `<link rel="canonical">` présente sur les deux pages, pointant sur
  leur propre URL.

#### 16g. Rapport & corrections

**Mots-clés retenus :** (tableau 16a complété)

**On-page :**

| Check | Fichier | Statut | Correction |
|---|---|---|---|
| Title optimisé | page.tsx | ✅ / ❌ | ... |
| Meta description | page.tsx | ✅ / ❌ | ... |
| H1 avec requête cible | page.tsx | ✅ / ❌ | ... |
| H2/H3 avec variantes | page.tsx | ✅ / ❌ | ... |
| Contenu ≥ 150 mots | page.tsx | ✅ / ❌ | ... |

**FAQ :**

| Check | Statut | Correction |
|---|---|---|
| Questions en langage naturel | ✅ / ❌ | ... |
| Réponses ≥ 80 mots | ✅ / ❌ | ... |
| Schema FAQPage JSON-LD | ✅ / ❌ | ... |

**Données structurées :**

| Schema | Présent | Valide |
|---|---|---|
| WebApplication | ✅ / ❌ | ✅ / ❌ |
| BreadcrumbList | ✅ / ❌ | ✅ / ❌ |
| FAQPage | ✅ / ❌ | ✅ / ❌ |

**Technique :**

| Check | Statut | Correction |
|---|---|---|
| Sitemap à jour | ✅ / ❌ | ... |
| Robots.txt OK | ✅ / ❌ | ... |
| Canonical présent | ✅ / ❌ | ... |
| Maillage interne | ✅ / ❌ | ... |

- Corrections textuelles (title, description, H1/H2, ancres) et schemas
  JSON-LD → appliquer directement.
- Modifications structurelles (nouveau composant, refonte maillage) →
  proposer en diff, **STOP - attends validation.**

---

### 16bis. Garde-fou sources - obligatoire avant commit

**Avant le commit**, vérifier dans `docs/sources/<slug>.md` :

1. **Tableau "Barèmes et taux appliqués"** : chaque ligne a-t-elle bien
   2 cross-checks ? Si non → STOP, compléter.
2. **Chiffres dans le code dont la source primaire est ❌/⚠️/☐** : ces
   chiffres sont-ils tous listés dans la section "URLs vérifiées manuellement
   par Nicolas" avec un statut `✅ Confirmé` daté ?
   - Si **OUI** → ok, on peut committer.
   - Si **NON** → STOP. Produire le tableau récapitulatif :

```
URLs à faire vérifier manuellement par Nicolas avant publication :

| URL à ouvrir | Article/chiffre à confirmer | Chiffre dans le code |
|--------------|------------------------------|----------------------|
| https://...  | Art X reste à Y % en 2026   | Z %                  |
```

Attendre que Nicolas confirme chaque ligne et remplir la section "URLs
vérifiées manuellement" du fichier sources avant de pouvoir passer à
l'étape 17.

3. **Champ "Dernière vérification"** dans le fichier sources : à la date
   du jour ? Si pas → mettre à jour.

**Règle dure** : aucun commit `feat(calc):` ne peut être créé si un chiffre
fiscal du code n'a pas soit (a) une source primaire en catégorie ✅ OK, soit
(b) une confirmation 👁 HUMAINE explicite de Nicolas dans le fichier sources.

---

### 17. Commit

- Un seul commit (ou plusieurs atomiques bien découpés : types / lib / UI /
  page / faq / tests / docs / perf / conformité / seo).
- Message : `feat(calc): ajout calculateur <slug>` avec description courte
  dans le corps.
- **Ne pas pousser automatiquement.** C'est Nicolas qui décide quand pousser.

---

### 18. Fermeture

- Mettre à jour `BACKLOG.md` : statut `in-progress` → `done` avec la date.
- Résumer en bullets courts : fichiers créés, sources utilisées, gains perf
  mesurés, points de conformité corrigés, mots-clés cibles retenus, commande
  `npm run dev` pour tester.
- **S'arrêter.** Ne pas enchaîner sur un autre calculateur sauf si
  `/mode-autonome` a été invoqué.

---

## Règles de sécurité

- **Doute sur un chiffre fiscal** → s'arrêter, demander à Nicolas.
- **Doute sur l'agrégation entre régimes fiscaux** → WebFetch le BOFiP avant
  d'écrire la fonction. Ne pas deviner l'articulation.
- **Source non trouvée** → ne pas inventer, documenter le manque dans
  `docs/sources/<slug>.md`, signaler avec ⚠️, attendre.
- **Commentaire `// Simplification` dans le code** → suspect par défaut.
  Soit le calcul est exact (et le commentaire est trompeur, à retirer), soit
  il est approximatif et il FAUT un warning visible dans l'UI qui alerte
  l'utilisateur, plus une issue documentée pour le corriger.
- **Build qui échoue malgré 2 tentatives** → s'arrêter, résumer l'erreur,
  demander.
- **Tests qui échouent malgré 2 tentatives** → s'arrêter, résumer, demander.
- **Fonction de calcul fiscal sans test contre source primaire** → bloquant.
  Ne pas committer tant qu'au moins un test ne valide pas un cas chiffré
  contre BOFiP / service-public.fr / doctrine fiscale citée.
- **Correction perf Med/High non validée** → ne pas appliquer, attendre.
- **Correction conformité structurelle non validée** → ne pas appliquer,
  attendre.
- **Modification SEO structurelle non validée** → ne pas appliquer, attendre.
- **Fichier existant en conflit** → s'arrêter, montrer le chemin, demander.

Mieux vaut 1 calculateur juste que 3 approximatifs.

## Le bug 757 B — leçon de référence (2026-06-04)

Pour éviter de répéter ce type d'erreur, en rappel :

- `src/lib/transmission.ts` traitait les versements AV après 70 ans (Art. 757 B)
  dans un **silo séparé** : barème ligne directe redémarré à 5 %, abattement
  personnel Art. 779 non appliqué sur l'agrégat.
- Le BOFiP BOI-ENR-DMTG-10-10-20-20 § 230 prescrit l'**agrégation** à la part
  successorale ordinaire, abattement Art. 779 appliqué une seule fois, barème
  Art. 777 en une passe.
- **Conséquence** : chiffres affichés au public surévalués pendant des mois.
- **Cause racine** : aucun test vitest ne validait le calcul des droits contre
  une source primaire. Les tests existants ne couvraient que la manipulation
  de la liste des bénéficiaires. Le commentaire `// Simplification : on applique
  le barème directement` n'était pas accompagné d'un warning utilisateur.
- **Fix** : `succession.ts` accepte désormais un champ `primes757B` qui s'agrège
  à `partRecue` avant abattement et barème. `transmission.ts` expose
  `calculerPartsTaxables757B` pour produire la quote-part à passer en input.
- **Reproduit comme test de référence** : `src/lib/transmission.test.ts`
  décrit `intégration scénario Pierre`.
