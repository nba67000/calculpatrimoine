# ADR-0004 - Cohérence constantes ↔ texte des messages utilisateur

**Statut** : Accepté
**Date** : 2026-06-10

## Contexte

Le scan `/improve-codebase-architecture` du 2026-06-10 a relevé en
`CANDIDATES.md §C-A` une duplication récurrente : ~50 appels
`warnings.push({ type, message })` répartis dans une quinzaine de libs
(`donation.ts`, `succession.ts`, `ifi.ts`, `deficitFoncier.ts`,
`lmnpRegime.ts`, `pea.ts`, `per.ts`, etc.).

Le grilling a séparé deux frictions qui semblaient se ressembler :

1. **Wording récurrent** (ex. "L'abattement repart à zéro 15 ans après
   chaque don") apparaissant avec micro-variations dans 3-4 libs de
   transmission. Hors scope de cet ADR : la voix éditoriale impose
   des variations contextuelles légitimes (cf. mémoire `feedback_voix_nicolas`).
   Forcer un wording canonique uniformiserait au détriment du sens.

2. **Valeurs numériques désynchronisées entre une constante et le texte
   d'un message**. C'est l'objet de cet ADR.

Bug latent reproductible détecté pendant le grilling :

```ts
// src/lib/ifi.ts:20
const SEUIL_IFI = 1_300_000

// src/lib/ifi.ts:148  (template literal, NBSP entre les triplets)
message: `Patrimoine net taxable très proche du seuil de 1 300 000 €. ...`
```

Si la LF 2027 ajuste `SEUIL_IFI`, la constante bouge, le texte reste
périmé. Le risque est récurrent (seuils PASS, abattements, plafonds
révisés chaque LF) et silencieux (TypeScript et les tests existants ne
détectent rien).

## Décision

### Convention

Dans `CLAUDE.md §3.2` (logique pure), ajouter la règle suivante :

> Toute valeur numérique citée dans un champ `message:` d'un objet
> warning/optimisation **doit** être interpolée depuis la constante
> correspondante du fichier, et non écrite en littéral.
>
> ```ts
> // BAD
> message: `Patrimoine très proche du seuil de 1 300 000 €.`
> // GOOD
> message: `Patrimoine très proche du seuil de ${SEUIL_IFI.toLocaleString('fr-FR')} €.`
> ```

### Test garde-fou

Un test transverse unique `src/lib/_messages-coherence.test.ts`
(préfixe `_` = test non-lié à une lib précise). Son contrat :

1. Lister tous les `src/lib/*.ts` sauf les `*.test.ts` et le test lui-même.
2. Pour chaque fichier, parser les déclarations `const NOM = <littéral numérique>`
   définies en tête de fichier, où `<littéral numérique>` est un nombre
   direct (ex. `1_300_000`, `21400`) et `valeur > 1000`.
3. Pour chaque constante éligible, formater sa valeur via
   `toLocaleString('fr-FR')` (qui produit des séparateurs NNBSP `U+202F`).
4. Scanner les lignes du même fichier contenant `message:` (en
   normalisant NBSP `U+00A0`, NNBSP `U+202F` et espace `U+0020` vers
   un caractère unique des deux côtés).
5. Échouer si la valeur formatée apparaît dans une ligne `message:` du
   même fichier.

Le test ne couvre **pas** :

- Les taux décimaux (`TAUX_PFU = 0.30`, `TAUX_IR = 0.19`). Format de
  rendu hétérogène (`30 %`, `19 %`, `19,0 %`) ; ces taux changent
  rarement.
- Les durées (`ENGAGEMENT_LOCATION_ANS = 3`). Trop ambigus, faux
  positifs probables.
- Les constantes calculées (`const MAX_PLAFOND_PER = Math.round(PASS_2025 * 8 * 0.10)`).
  L'évaluation d'expressions sort du périmètre.
- Les constantes importées d'un autre fichier (ex. `ABATTEMENT_HANDICAP`
  depuis `fiscal/baremesArt777.ts`). Le scope est strictement
  fichier-local.
- Les valeurs hardcodées hors d'un champ `message:` (commentaires,
  JSDoc, autres strings). Volontaire pour éviter les faux positifs.

Ces limitations sont des choix conscients d'éviter la sur-ingénierie
et seront réévaluées si un bug réel passe entre les mailles.

### Migration

Implémentation en deux commits atomiques :

- **PR1** : audit ponctuel de toutes les libs concernées, corrections
  par lib (`fix(<lib>): interpolation const dans messages`).
- **PR2** : ajout du test `_messages-coherence.test.ts` + cet ADR.

Le test ne doit jamais être committé en état "rouge" ni avec une
expect-list de hardcodes connus.

## Raison

**Locality.** Le scope fichier-local évite de parser les imports et
les graphes de constantes. Suffit pour 95 % du problème (convention
projet : les constantes fiscales sont co-localisées avec la lib qui
les utilise, à l'exception de `fiscal/baremesArt777.ts`).

**Heuristique simple, faux positifs maîtrisés.** Restreindre le scan
aux lignes `message:` élimine les commentaires, les JSDoc `@example`,
les définitions de constantes et les calculs intermédiaires. La
heuristique `valeur > 1000` exclut les "3 ans", "15 %", "60 %" pour
lesquels le risque de désynchronisation est moindre et le bruit
serait élevé.

**Coût d'opportunité.** Une approche structurelle
(`Warning { template, refs }` + formatteur centralisé) toucherait
tous les types `Results`, tous les Calculator UI et tous les tests
existants pour résoudre un problème ponctuel. ~50 fichiers impactés
contre ~30 lignes de test et une convention écrite.

**Détection mécanique préférée à la vigilance.** Une convention
écrite dans `CLAUDE.md` sans garde-fou dépend de la rigueur du
développeur (humain ou IA). Un test qui casse au build cristallise
la contrainte.

## Alternatives rejetées

**Refactor structurel des warnings** (`Warning { template, refs }`).
Lourd : touche les types dans `src/types/*`, oblige tous les
Calculator UI à utiliser un formatteur, demande de migrer les ~50
sites d'appel et leurs tests. Bénéfice marginal vs. le test
proposé.

**ESLint plugin custom**. Détection statique des littéraux numériques
dans les template literals. Maintenance non-triviale pour distinguer
les littéraux légitimes (exemples, durées) du bruit, et difficulté
à corréler le littéral avec la "bonne" constante à utiliser.

**Convention seule, sans test**. Dépend de la relecture humaine ou
de la vigilance d'une IA assistante. Échoue silencieusement à la
première session distraite.

**Snapshot Vitest des messages générés**. Exécuter chaque lib sur
un input canonique et figer le `.snap`. Quand une constante change,
N snaps cassent et forcent la review. Surface de maintenance élevée
(un input canonique par lib + maintenance des snapshots) pour un
gain identique à l'approche statique.

**Bundler avec C-D ou C-C**. Les autres frictions
(`useCalculator`/`useNumericInput`, primitives visuelles partagées)
sont architecturalement distinctes. Atomicité préférée pour la
clarté de l'historique ADR.

## Suivi

- **PR1 audit ponctuel** : grep des littéraux suspects dans toutes
  les libs `src/lib/*.ts`. À ce jour, au moins `ifi.ts:148` est
  identifié. Cas probables à vérifier : `donation.ts` (abattements
  cités), `lmnpRegime.ts` (plafonds micro-BIC), `assuranceVie.ts`
  (abattements 4 600 / 9 200).
- **PR2** : commit du test + cet ADR.
- **Extension future** : si un bug de désynchronisation sur les
  taux ou les durées est constaté en pratique, étendre la heuristique
  ou passer à une annotation JSDoc explicite (`/** @watched
  euro|percent|year */`).
- **C-B, C-C, C-D** restent dans `CANDIDATES.md` pour grilling
  séparé.
