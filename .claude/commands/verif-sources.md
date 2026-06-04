---
description: Vérifie que les sources légales de tous les calculateurs sont à jour et toujours valides.
---

# /verif-sources

Audit périodique des sources légales du projet. À lancer tous les 3 mois, ou
après l'adoption d'une loi de finances / d'une LFSS.

## Pré-requis : conscience du problème de crawl

Légifrance et BOFiP sont **structurellement instables au crawl** :
- Crawl 2026-05-31 : 50 % des LEGIARTI testés étaient en 404, 17 % pointaient
  vers le mauvais article.
- Les URLs BOFiP nues `<id>-PGP.html` re-routent souvent vers un autre document
  que celui annoncé.
- Une 403 ou 404 ne signifie **PAS** que l'article a été abrogé. Cela signifie
  que l'URL n'est plus stable et qu'une vérification humaine est nécessaire.

**Conséquence opérationnelle** : ce skill produit un rapport en 4 catégories
distinctes (OK, 404, mauvais contenu, non testable) - et **toute correction
de taux/seuil dans le code exige une URL valide *vérifiée manuellement par
Nicolas* avant commit**.

---

## Étapes

### 1. Lister les calculateurs livrés

Lire `BACKLOG.md`, section "Déjà livrés". Pour chaque calculateur, localiser
son fichier `docs/sources/<slug>.md`.

Lire aussi `docs/broken-links-to-fix.md` pour ne **pas re-tester** les URLs
déjà connues comme mortes - se concentrer sur les URLs OK qui peuvent avoir
basculé, et sur les URLs jamais testées.

### 2. Pour chaque fichier sources

Pour chaque URL externe citée, classer dans une des 4 catégories :

#### Catégorie A - OK (crawl réussit, contenu correspond)

WebFetch avec un prompt qui **vérifie le contenu**, pas seulement le code HTTP :
```
Vérifie que cette page contient bien le texte de l'article <X> du code <Y>.
Si le contenu affiché concerne un autre article (numéro, objet), réponds
"WRONG_CONTENT: <article réellement affiché>".
Sinon, extrait le ou les passages relatifs à <point précis à vérifier>.
```

Si le contenu correspond → ajouter la date de re-vérification dans le fichier
`docs/sources/<slug>.md` (ligne `**Dernière vérification** :`).

#### Catégorie B - HTTP 404 / 403 / timeout

URL inaccessible. **Ne pas supprimer la citation textuelle** : l'article
existe probablement, c'est l'URL qui est instable.

Action :
1. Marquer l'URL avec `~~strikethrough~~` dans `docs/sources/<slug>.md`.
2. Ajouter une ligne dans `docs/broken-links-to-fix.md` sous la section
   "❌ Légifrance , articles confirmés morts".
3. Tenter une URL de remplacement :
   - Pour Légifrance : chercher l'article sur `https://www.legifrance.gouv.fr/`
     via WebFetch sur la page de recherche, récupérer le nouveau LEGIARTI.
   - Pour BOFiP : reconstruire l'URL avec l'identifiant BOI complet
     (`?identifiant=BOI-XXX-XX-XX-DATE`).
   - Si une URL alternative est trouvée et fonctionne → la tester (Catégorie A).
   - Sinon → laisser strikethrough, bloquer la correction de tout taux qui
     en dépendrait.

#### Catégorie C - URL OK mais MAUVAIS contenu

L'URL répond 200, mais le contenu affiché ne correspond pas à l'article
annoncé (cas fréquent avec les LEGIARTI réutilisés).

C'est **le cas le plus dangereux** : sans vérification du contenu, on croit
avoir validé une source qu'on n'a pas validée.

Action :
1. Marquer dans `docs/sources/<slug>.md` :
   `⚠️ URL pointe vers <article réellement affiché> - réf. textuelle conservée, lien retiré`.
2. Ajouter une ligne dans `docs/broken-links-to-fix.md` sous "⚠️ Légifrance ,
   articles confirmés pointant vers le MAUVAIS contenu".
3. Tenter une URL alternative comme pour la catégorie B.

#### Catégorie D - Non testable / non testé

Cas où WebFetch refuse de fournir une réponse fiable (rate limit, JS non
rendu, contenu vide).

Action :
1. Lister dans le rapport d'audit.
2. **Ne pas considérer l'URL comme validée**.
3. Demander à Nicolas de cliquer manuellement (cf. étape 4).

### 3. Vérification croisée des chiffres

Pour chaque taux/seuil/abattement présent dans `lib/constants.ts` ou inline
dans les libs :

- Identifier la source primaire dans `docs/sources/<slug>.md`.
- Si la source primaire est en catégorie A → OK.
- Si la source primaire est en catégorie B/C/D → vérifier la valeur sur
  **deux sources secondaires indépendantes** (service-public.fr +
  impots.gouv.fr / boss.gouv.fr).
- Si les deux secondaires concordent et concordent avec le code → noter
  "valeur cross-checkée 2 sources secondaires, source primaire à re-sourcer".
- Si désaccord ou impossible → **mise à jour majeure**, bloquer la modif
  du code, demander à Nicolas.

### 4. Synthèse - rapport d'audit

Produire `docs/audits/audit-YYYY-MM-DD.md` structuré ainsi :

```markdown
# Audit sources - YYYY-MM-DD

## Périmètre
- Calculateurs audités : <liste>
- URLs testées : N (A: x / B: y / C: z / D: w)

## Statut par calculateur

| Calculateur | URLs OK | URLs 404 | URLs mauvais contenu | URLs non testables | Décision |
|-------------|---------|----------|----------------------|---------------------|----------|
| <slug>      | n       | n        | n                    | n                   | OK / MAJ MINEURE / MAJ MAJEURE / BLOQUÉ |

## Divergences détectées

### Mineure - <slug>
- <description courte>
- Action : <fix textuel direct>

### Majeure - <slug>
- <description du chiffre erroné dans le code>
- Source primaire utilisée pour identifier la divergence : <URL ou
  "deux sources secondaires concordantes">
- Correction proposée (NE PAS APPLIQUER avant validation Nicolas) : <diff>

## URLs à faire vérifier manuellement par Nicolas

Liste des URLs qui n'ont pas pu être validées automatiquement et qui
bloquent une décision. Pour chacune, donner :
- L'URL exacte à ouvrir
- L'article ou la donnée à confirmer
- Le chiffre du code à comparer

| URL | À vérifier | Chiffre code | Confirmé ? |
|-----|-----------|--------------|-----------|
| https://... | Art. X reste-t-il à Y % en 2026 ? | 12,8 % | ☐ |

## Actions

- [ ] Mises à jour mineures (Claude peut appliquer) - liste
- [ ] Mises à jour majeures (attente validation Nicolas) - liste
- [ ] Vérifications manuelles requises - tableau ci-dessus
- [ ] Mise à jour `docs/broken-links-to-fix.md` - liste des entrées ajoutées
```

### 5. Application des corrections

Règles strictes par catégorie :

- **Mineure** (date de re-vérification, reformulation, lien restauré qui
  fonctionne) → Claude applique directement et commit :
  `docs(sources): maj vérification <slug> <date>`.

- **Majeure** (changement de taux, nouveau barème, évolution légale) :
  - Claude **propose** la correction (patch code + maj sources).
  - **Bloque** tant que Nicolas n'a pas confirmé visuellement la source.
  - Une fois validé, applique et commit séparément :
    `fix(calc): maj <slug> suite à <texte légal>`.

- **Bloqué** (source primaire inaccessible ET sources secondaires en désaccord)
  - Claude résume, liste les questions précises pour Nicolas.
  - Pas de modif du code.

---

## Règles d'or

1. Une 404/403/timeout n'**invalide pas** un chiffre. Elle invalide une URL.
2. Un crawl 200 ne **valide pas** un chiffre. Le contenu doit être lu et
   confronté à ce qui est annoncé.
3. **Aucune** modification de taux/seuil/abattement dans le code sans :
   - Une URL valide (catégorie A) sourçant le nouveau chiffre, OU
   - Deux sources secondaires concordantes + validation explicite de Nicolas.
4. Toute URL morte ou divergente va dans `docs/broken-links-to-fix.md`.
5. Si la conclusion est "à confirmer par Nicolas" → la conclusion **reste**
   "à confirmer" jusqu'à confirmation, on ne devine pas.
