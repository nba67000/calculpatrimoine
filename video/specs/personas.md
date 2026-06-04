# Spec personas — chaîne YouTube CalcPatrimoine

Style retenu pour la chaîne : **flat-design détaillé**, palette restreinte, cohérent avec la charte du site (bleu marine + doré sur beige chaud).

Choix validé le 2026-06-04 lors du brief de l'épisode 01.

---

## Principes visuels

**Forme générale** : cercle de fond ~140 px de diamètre, contenant le visage stylisé. Pas de carré, pas de cadre rectangulaire — le cercle est plus chaleureux et plus universel en motion design.

**Style du visage** : flat-design, traits clean, palette restreinte (3-4 couleurs max par persona). Pas de tridimensionnel, pas d'ombrage complexe. Inspiration : icônes Notion, Stripe, Wise — clean mais pas froid.

**Détails du visage** :
- Yeux : deux points simples
- Bouche : ligne discrète ou sourire minimaliste (pas plus)
- Cheveux : élément clé de différenciation (âge, genre)
- Lunettes optionnelles pour les personas seniors
- Pas de nez détaillé (juste une indication très discrète éventuellement)

**Ce qu'on évite** :
- Le stick figure (rejeté, casse la crédibilité)
- Les visages "cartoon" exagérés
- Les sourires forcés à la "stock image"
- Trop de détails (rides, accessoires, vêtements travaillés)
- Style "startup fintech 2018"

---

## Code visuel des rôles

Chaque persona porte deux informations visuelles redondantes : **couleur du cercle** et **annotation mono Lora**.

| Rôle | Couleur cercle | Annotation mono Lora |
|---|---|---|
| **Défunt (Pierre)** | `#2E4A6F` (primary-600, bleu marine) | "Défunt" |
| **Conjoint exonéré TEPA (Catherine)** | `#D4AF37` (accent-400, doré) | "Conjoint — exonéré TEPA" |
| **Héritier ligne directe (Marie, Thomas)** | `#F5F0E8` (surface-card, beige clair) | "Héritière" / "Héritier" |
| **Bénéficiaire AV** | bordure dorée `#D4AF37` sur cercle de la couleur du rôle | "Bénéficiaire AV" |
| **Notaire** (futur épisode) | `#1E3A5F` (primary-700, bleu marine foncé) | "Notaire" |
| **Banquier/assureur** (futur épisode) | `#7C5E07` (accent-700, ocre foncé) | "Assureur" |

**Visage et cheveux** : les figures restent en bleu marine `#2E4A6F` sur le cercle de fond, quelle que soit la couleur du cercle (excepté quand le cercle est déjà bleu marine — dans ce cas, le visage passe en beige clair pour le contraste).

**Annotation visible quand** :
- Première apparition du persona dans la vidéo
- Première apparition dans une nouvelle scène
- Quand la voix off parle spécifiquement du rôle du persona

Sinon, l'annotation disparaît pour ne pas alourdir l'image.

---

## Différenciation des personas

**Pierre (62 ans, défunt à 80 ans)**
- Cheveux gris, courts
- Lunettes
- Cercle bleu marine `#2E4A6F`
- Annotation : "Pierre, 62 ans" puis "Défunt" selon la scène

**Catherine (60 ans, conjointe)**
- Cheveux gris, mi-longs
- Sans lunettes
- Cercle doré `#D4AF37`
- Annotation : "Catherine, 60 ans" puis "Conjoint — exonéré TEPA"

**Marie (34 ans, enfant)**
- Cheveux longs, châtains
- Sans lunettes
- Cercle beige clair `#F5F0E8`
- Annotation : "Marie, 34 ans" puis "Héritière"

**Thomas (31 ans, enfant)**
- Cheveux courts, châtains
- Sans lunettes
- Cercle beige clair `#F5F0E8`
- Annotation : "Thomas, 31 ans" puis "Héritier"

---

## Animations standard

**Entrée d'un persona** :
- Fade-in (opacity 0 → 1, durée 400 ms)
- Léger scale-up (0.85 → 1, spring) pour l'aspect "arrivée"
- Décalage vertical de quelques pixels (translateY 8px → 0)

**Highlight (quand la voix parle du persona)** :
- Scale up subtil (1 → 1.05, spring)
- Glow discret de 8-12 px dans la couleur du rôle (box-shadow ou drop-shadow)
- Retour à l'état neutre en sortie

**Disparition / décès** :
- Pour Pierre dans l'acte 1 (le décès) : transition douce vers un état grisé (fade vers 40 % d'opacity, sans le faire disparaître complètement — il reste présent narrativement comme défunt)
- Ne pas faire disparaître complètement, pour qu'on puisse continuer à le pointer dans les scènes suivantes

**Transition entre personas (flux de capital)** :
- Quand le capital passe de Pierre aux héritiers : Pierre reste à l'écran, les héritiers entrent par fade-in, et un flux animé (lignes courbes, particules) part de Pierre vers chaque héritier

---

## Implémentation Remotion

**Approche recommandée** : composant `<Persona>` paramétré qui prend en props :

```typescript
type PersonaRole = 'defunt' | 'conjoint' | 'heritier' | 'beneficiaire-av' | 'notaire' | 'assureur'
type PersonaGenre = 'homme' | 'femme'
type PersonaAge = 'jeune-adulte' | 'adulte' | 'senior'

interface PersonaProps {
  nom: string
  age: number
  role: PersonaRole
  genre: PersonaGenre
  tranche: PersonaAge
  bordureAccent?: boolean  // pour signaler "bénéficiaire AV"
  highlight?: boolean       // animation de mise en avant
  decede?: boolean          // état grisé pour Pierre après l'acte 1
  showAnnotation?: boolean  // afficher l'annotation mono Lora
}
```

**Construction du SVG** : composer le visage à partir de sous-composants réutilisables :
- `<Tete>` (forme du visage)
- `<Cheveux>` (4-5 variantes : courts gris, longs gris, courts châtains, longs châtains, chauve)
- `<Yeux>` (1-2 variantes)
- `<Bouche>` (3 variantes : neutre, léger sourire, ligne)
- `<Lunettes>` (optionnel)

Chaque sous-composant en SVG codé en dur dans Remotion (pas d'asset externe nécessaire).

**Alternative à évaluer** : `react-nice-avatar` ou `boring-avatars` (génération paramétrique d'avatars stylisés). À tester avant de coder soi-même les SVG, peut faire gagner du temps de production.

---

## Cohérence avec les autres composants Remotion

- Les personas doivent harmoniser avec `<MontantAnime>`, `<ArbreSuccession>`, `<FluxCapital>` — même palette, mêmes règles d'animation (durations, springs).
- Le doré du cercle Catherine doit être identique au doré utilisé dans les chiffres-clés (les montants importants en doré).
- Les transitions entre scènes ne doivent jamais montrer un mélange "ancien style + nouveau style" — toute mise à jour des personas s'applique à toute la chaîne.

---

## Réutilisation entre épisodes

Pour les épisodes futurs, créer une bibliothèque de "types" pré-configurés :

```typescript
// video/src/data/personas-types.ts
export const PERSONA_TYPES = {
  homme_senior: { tranche: 'senior', genre: 'homme', cheveux: 'courts-gris' },
  femme_senior: { tranche: 'senior', genre: 'femme', cheveux: 'mi-longs-gris' },
  homme_adulte: { tranche: 'adulte', genre: 'homme', cheveux: 'courts-chatain' },
  femme_adulte: { tranche: 'adulte', genre: 'femme', cheveux: 'longs-chatain' },
  // ...
}
```

Pour chaque épisode, on instancie depuis cette bibliothèque en passant juste `nom`, `age`, `role`.
