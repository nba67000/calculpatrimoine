---
description: Scanne les forums MoneyVox (assurance-vie, épargne retraite, transmission patrimoine, immobilier locatif, bourse) pour (1) rédiger des réponses-calculs prêtes à poster sur les fils répondables (sans jamais mentionner CalcPatrimoine), (2) détecter les idées de nouveaux calculateurs à proposer en backlog. Rapport uniquement - aucune modification sans validation.
---

# /forum-watch

Tu es un veilleur produit pour CalcPatrimoine. Ta mission : lire les fils récents
de MoneyVox et produire un rapport en deux sections.

**Règle absolue de la section Réponses** : la réponse à poster sur le forum est
**le calcul lui-même**, avec citations d'articles de loi. **Jamais** de mention
de CalcPatrimoine, de son URL, de ses calculateurs, ni d'allusion ("j'ai un
outil qui...", "un simulateur en ligne...", etc.). Objectif : construire la
crédibilité technique de Nicolas en tant que contributeur avant toute
promotion du site.

---

## Étapes

### 1. Lire l'état du projet

Avant de toucher les forums, lire :
- `BACKLOG.md` - calculateurs livrés et idées déjà notées (`proposed`)
- `src/config/navigation.ts` - slugs et noms des calculateurs déployés
- `src/lib/<domaine>.ts` pour chaque domaine pertinent au fil étudié - pour
  utiliser la **même logique de calcul** que celle déjà codée et testée.
- `docs/sources/<slug>.md` correspondant - pour citer les **mêmes articles**
  (CGI, BOFiP, service-public.fr) que ceux validés dans le calculateur.

Mémoriser :
- Les domaines couverts par les calculateurs **existants** (pour décider si
  un fil est "répondable") - mais **ne jamais citer les slugs ni l'URL du
  site** dans la réponse.
- Les idées déjà en `proposed` (pour éviter les doublons dans la section Idées).

### 2. Fetcher les catégories MoneyVox

Appeler ces cinq URLs via **WebFetch**, en parallèle :

```
https://www.moneyvox.fr/forums/discussion/assurance-vie/
https://www.moneyvox.fr/forums/discussion/epargne-retraite/
https://www.moneyvox.fr/forums/discussion/transmission-patrimoine/
https://www.moneyvox.fr/forums/discussion/immobilier-locatif/
https://www.moneyvox.fr/forums/discussion/bourse/
```

Pour chaque page, extraire la liste des fils visibles :
- `titre` - titre du fil
- `date` - date du dernier message (ou date de création si seule disponible)
- `url` - URL complète du fil (construire `https://www.moneyvox.fr` + path relatif si besoin)
- `categorie` - nom de la catégorie source

**Filtrer avant l'analyse :**
- Ignorer les fils dont le titre est manifestement hors sujet (litiges bancaires,
  comparaison de néobanques, réclamations SAV, etc.).
- Ne retenir que les fils datant de moins de 30 jours.
- Si un fil semble particulièrement pertinent, fetcher son contenu pour lire
  le premier message (WebFetch sur l'URL du fil).

### 3. Analyser chaque fil

Pour chaque fil retenu, répondre à deux questions :

**Question A - Fil répondable par un calcul ?**
Le fil contient-il assez de données chiffrées (ou des hypothèses raisonnables
à expliciter) pour produire un **calcul concret** à partir d'un domaine déjà
couvert par un calculateur existant ?
- Oui → fetcher le contenu du fil si pas déjà fait, extraire les chiffres,
  et passer à l'étape 4 (rédaction de la réponse-calcul).
- Données insuffisantes → ignorer (ne pas inventer les chiffres, ne pas
  proposer de réponse générique sans calcul).
- Non (domaine non couvert) → passer à la question B.

**Question B - Idée de calculateur ?**
Le fil révèle-t-il un besoin de calcul récurrent qui n'est pas encore couvert ?
- Oui → noter le concept en une phrase, évaluer la fréquence estimée du besoin.
- Non → ignorer le fil.

Ne pas noter les fils qui expriment un besoin de conseil personnalisé (hors scope
du projet) ou dont la réponse est purement narrative (pas de calcul en jeu).

### 4. Rédiger la réponse-calcul (pour chaque fil répondable)

Pour chaque fil retenu en Question A, produire un **brouillon de réponse**
prêt à coller sur MoneyVox. Règles strictes :

**Forme**
- Ton sobre, factuel, neutre. Pas de "bonjour" cérémonieux, pas de
  signature. Style forum : direct, court, technique.
- Longueur : 80 à 250 mots. Si le sujet exige plus, découper en sections
  numérotées.
- Format chiffré : montants en euros français (`12 345 €`), pourcentages
  avec 1 ou 2 décimales selon contexte.
- Markdown léger autorisé (gras pour résultats clés, listes pour étapes).

**Contenu**
- **Reprendre les chiffres exacts** du post initial. Si une donnée manque,
  formuler une hypothèse explicite ("en supposant TMI 30 %, ...").
- **Dérouler le calcul étape par étape**, en utilisant la **même logique
  que `src/lib/<domaine>.ts`** (mêmes formules, mêmes seuils, mêmes
  abattements).
- **Citer les articles de loi** mobilisés : numéro d'article CGI / Code
  des assurances / etc., et éventuellement un BOFiP. Référence textuelle
  uniquement, pas d'URL Légifrance (les URLs LEGIARTI sont instables -
  cf. CLAUDE.md §6.1).
- **Lister les articles cités** en fin de réponse sous forme "Sources :
  art. X CGI, art. Y CGI." - rien d'autre.
- Si pertinent, montrer un **scénario alternatif** ("si fractionné sur
  2 ans, l'impôt serait de ..., économie de Z €"), sans recommandation.

**Interdits absolus**
- **Aucune** mention de "CalcPatrimoine", "calcpatrimoine.fr",
  "calculateur en ligne", "simulateur", "outil que j'ai développé",
  "un site qui...", ni allusion équivalente.
- Aucun lien sortant (sauf éventuellement une référence textuelle
  service-public.fr ou impots.gouv.fr si elle est strictement utile au
  calcul - et **pas** vers le site).
- Aucune recommandation personnalisée ("vous devriez", "il vaut mieux").
  Style anti-conseil de CLAUDE.md §1 : on **calcule, on compare, on
  montre**.
- Aucun jargon non expliqué (cf. memory `feedback_style_explication` -
  test des trois frères).
- Aucune affirmation non sourcée. Si un point demande vérification,
  le marquer "⚠️ à vérifier" plutôt que d'inventer.

### 5. Produire le rapport

Présenter le rapport dans la conversation dans ce format exact :

---

## Forum Watch - MoneyVox - [date du jour]

### Réponses-calculs à poster
*Brouillons prêts à coller sur MoneyVox. Aucune mention du site.*

Pour chaque fil retenu (max 5), produire un bloc :

#### [N]. [Titre du fil](url) - catégorie

**Données extraites** : (résumé en 1-2 lignes des chiffres du post)
**Hypothèses ajoutées** : (si certaines données manquaient)
**Domaine couvert par** : `src/lib/<domaine>.ts` *(usage interne, ne sera pas
posté)*

**Brouillon à poster :**

```
<le texte exact à coller sur MoneyVox, 80-250 mots,
calcul détaillé, articles cités, zéro mention du site>
```

**Self-check** *(usage interne)* :
- [ ] Zéro occurrence de "calcpatrimoine", "calculateur en ligne",
      "simulateur", URL du site, allusion à un outil personnel.
- [ ] Chiffres recalculés vs `src/lib/<domaine>.ts` : OK.
- [ ] Articles de loi cités présents dans `docs/sources/<slug>.md`.
- [ ] Style anti-conseil : aucun "vous devriez", "choisissez".

---

### Idées backlog
*Fils suggérant un calculateur non encore couvert.*

| # | Fil | Catégorie | Concept | Note |
|---|-----|-----------|---------|------|
| 1 | [Titre](url) | transmission-patrimoine | Simulateur donation avec rappel fiscal 15 ans | Demande récurrente ; pas encore en backlog. |
| … | … | … | … | … |

*(Maximum 10 entrées. Trier par pertinence estimée.)*

---

### Synthèse
- **Catégories scannées** : 5
- **Fils analysés** : N
- **Réponses-calculs rédigées** : N
- **Idées backlog nouvelles** : N (hors doublons déjà proposés)

---

### 6. STOP - attendre instruction

Présenter le rapport. **Ne modifier ni BACKLOG.md ni aucun autre fichier.**
**Ne rien poster sur MoneyVox.** Les brouillons sont des suggestions que
Nicolas valide manuellement avant publication.

Si Nicolas dit "go backlog [numéros]", ajouter les idées correspondantes dans
`BACKLOG.md` section P3 au format `proposed`, puis committer.

Si Nicolas dit "affine [numéro]", retravailler le brouillon correspondant
selon ses retours.

---

## Règles de qualité

- **Pas de faux positifs** : ne pas rédiger une réponse-calcul si les données
  du post sont insuffisantes ou si la question dépasse le domaine couvert.
- **Pas de doublons backlog** : comparer avec les entrées `proposed` existantes
  avant de créer une nouvelle idée.
- **Volume raisonnable** : 5 réponses-calculs max par run, 10 idées backlog
  max. Retenir les plus pertinentes.
- **Liens vérifiés** : utiliser l'URL complète du fil MoneyVox.
- **Zéro promotion** : la règle anti-mention du site est non-négociable.
  L'objectif est de construire la crédibilité technique de Nicolas
  contributeur, pas de générer du trafic à court terme.

---

## Catégories MoneyVox → Calculateurs CalcPatrimoine (correspondance)

| Catégorie MoneyVox | Calculateurs existants | Calculateurs backlog |
|-------------------|----------------------|---------------------|
| assurance-vie | `/assurance-vie/fiscalite-rachat`, `/assurance-vie/transmission` | - |
| epargne-retraite | `/per-individuel` | - |
| transmission-patrimoine | - | `donation` (P2 todo), `succession` (P2 todo) |
| immobilier-locatif | `/plus-value-immobiliere` | `lmnp-reel-vs-micro` (P3), `sci-is-vs-ir` (P3) |
| bourse | - | `pea` (P3) |
