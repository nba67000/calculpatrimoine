# Candidates ADR - frictions architecturales en attente de grilling

Frictions identifiées par `/improve-codebase-architecture` qui n'ont pas
encore été tranchées par un ADR. Chacune nécessite une session de grilling
pour décider :
- la forme exacte de l'interface du module deepenisé,
- la frontière (ce qui rentre, ce qui reste hors),
- la compatibilité avec les ADR existants (0001, 0002, 0003).

Une fois grillée et tranchée, la friction donne lieu à un ADR numéroté
(ADR-0004, etc.) et l'entrée est retirée d'ici.

---

## C-A , Helpers warnings/optimisations fiscaux partagés

**Source** : scan 2026-06-10. ADR-0003 §Suivi mentionne déjà cette piste
comme hypothèse (`fiscal/warnings.ts`).

**Friction** :
- ~50+ appels `warnings.push({ type, message })` distribués dans ~15 libs
  (`donation.ts`, `succession.ts`, `ifi.ts`, `deficitFoncier.ts`,
  `lmnpRegime.ts`, `pea.ts`, `per.ts`, `transmission.ts`...).
- Plusieurs patterns récurrents avec micro-variations textuelles :
  rappel des 15 ans, dépassement seuil PFU, âge donateur extrême,
  dépassement plafond légal (PEA 150k€, livret A 22 950€, etc.).
- Si la LF 2027 change un seuil, N patches textuels.

**À grilling** :
- Granularité des helpers : un helper par règle fiscale (`warnRappel15Ans`,
  `warnPlafondPEA`) ou un builder paramétrique (`warnSeuilDepassement({
  nom, seuil, valeur, articleSource })`) ?
- Format de retour : `Warning` objet, ou tuple `[type, message]`, ou
  fonction qui push directement dans un array passé en arg ?
- Localisation : `src/lib/fiscal/warnings.ts` global, ou un fichier par
  domaine (`fiscal/warnings/transmission.ts`) ?
- Test surface : tester chaque helper isolément, ou tester l'intégration
  dans une lib type ?

**Tension ADR** : aucune. ADR-0003 §Suivi anticipe explicitement ce
module.

---

## C-B , Sortir `faqSchema` / `howToSchema` de `CalculatorModule`

**Source** : scan 2026-06-10.

**Friction** :
- `CalculatorModule` (`src/lib/calculators/types.ts`) porte 6 champs :
  `slug`, `nom`, `sources`, `faqSchema`, `howToSchema`, `formatContexteChat`.
- `faqSchema` et `howToSchema` ne sont consommés que par
  `CalculateurPageLayout` (qui connaît déjà le slug et pourrait résoudre
  via une registry secondaire) et par les pages FAQ.
- Symptôme d'élargissement spéculatif : le module gonfle pour héberger
  ce que le layout va auto-résoudre.

**À grilling** :
- ADR-0001 a explicitement **regroupé** ces champs dans le module pour
  fournir une **single source of truth par calc**. Sortir maintenant
  serait défaire ce choix — quelle valeur nouvelle le justifierait ?
- Alternative : laisser dans le module mais ajouter un type `SeoSchemas`
  optionnel (signaler que c'est de la donnée SEO et pas du comportement).
- Cette friction est peut-être un faux positif si `formatContexteChat` et
  `sources` sont eux aussi consommés via layout/registry plutôt que
  directement — à mesurer.

**Tension ADR** : contradicte ADR-0001 §Décision. Ne réouvrir que si on
identifie un coût concret au stockage actuel (ex. import circulaire,
bundle size, friction d'ajout d'un calc).

---

## C-C , Primitives visuelles partagées pour Calculator UI

**Source** : scan 2026-06-10.

**Friction** :
- Plusieurs Calculator UI (`DonationCalculator.tsx` 428 L,
  `IFICalculator.tsx`, `SuccessionCalculator.tsx`, `RenteCalculator.tsx`
  438 L, `PERCalculator.tsx` 446 L) répètent les mêmes structures JSX :
  panneau blanc `bg-white rounded-xl border border-neutral-200 p-6
  shadow-sm`, grille résultats `grid grid-cols-2 gap-x-4 gap-y-2`,
  badges warnings/optimisations.
- Changer le shadow / la radius / le spacing impose N éditions.
- ADR-0002 §Alternatives a rejeté un `CalculatorShell` à slots pour
  rigidité, mais ici on parle de primitives plus fines (cartes), pas
  d'un shell.

**À grilling** :
- Quelle granularité : `<ResultCard>` / `<InputPanelCard>` /
  `<WarningBadge>` séparés, ou un seul `<Panel variant="result|input">` ?
- Doit-on viser uniquement les ~5 Calculator UI les plus gros, ou tous
  les 26 ?
- ADR-0002 a explicitement rejeté un shell. Comment formuler la
  distinction "shell rigide" (rejeté) vs "primitives composables"
  (peut-être OK) sans glisser vers la même rigidité ?
- Si l'extraction ne sert que 4-5 fichiers, deletion test : est-ce
  qu'on simplifie réellement, ou est-ce qu'on déplace juste de
  l'inline vers de l'import ?

**Tension ADR** : nuance avec ADR-0002 §Alternatives. À cadrer pour
distinguer du shell rejeté.

---

## C-D , Étendre `useCalculator` au pattern `useNumericInput`

**Source** : scan 2026-06-10 (re-confirme suivi ADR-0002).

**Friction** :
- 4 Calculator UI utilisent `useNumericInput` (state-persisté ≠ inputs-calculs)
  et n'ont pas pu adopter `useCalculator`. Confirmation : `RenteCalculator`
  fait toujours le triplet `useSimStorage + useEffect(sync) + useMemo +
  useEffect(save)` à la main (l. 76-111).
- Cela représente toujours ~35 lignes de boilerplate × 4 fichiers.

**À grilling** (déjà esquissé par ADR-0002) :
- Ajouter une option `transform: (persistedState) => Inputs` au hook ?
- Ou refondre `useNumericInput` pour stocker directement dans
  `useSimStorage` (supprimer le sync `useEffect`) ?
- Ou laisser tel quel et accepter la divergence assumée ?

**Tension ADR** : suivi explicite ADR-0002. Pas de conflit, juste à
trancher quand on juge le moment opportun.

---

## Faux positifs du scan 2026-06-10 (archivés ici pour mémoire)

- **Tests manquants sur 12 libs** : faux positif. Toutes les libs
  citées (csgRetraite, deficitFoncier, lmnpRegime, sciRegime,
  comparateurLocatif, pea, perSortie, plusValueLmnp, pretIntrafamilial)
  ont leur `.test.ts` avec 55-116 lignes. Couverture vérifiée.
- **Duplication baremesArt777 dans donation.ts** : déjà acté en
  ADR-0003 §Suivi.

---

Dernière mise à jour : 2026-06-10.
