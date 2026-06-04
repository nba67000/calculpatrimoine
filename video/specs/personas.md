# Spec personas — chaîne YouTube CalcPatrimoine

Style retenu : **monogrammes typographiques**. Cercle coloré selon le rôle, initiale du nom en serif Playfair au centre. Pas de visage, pas d'illustration de personnage.

Choix validé le 2026-06-04. Première tentative en flat-design SVG abandonnée — rendu trop "smiley dessiné main", incompatible avec la charte "vieille banque privée moderne".

---

## Principes visuels

**Référence** : avatars Apple Music / Linear / Stripe quand pas de photo. Sobre, premium, lisible immédiatement.

**Composition** :
- Cercle de fond ~200 px de diamètre (paramètre `taille`)
- Une initiale unique au centre, en serif Playfair, taille `0.5 × diamètre`
- Drop-shadow discret pour donner de la profondeur
- Bordure dorée optionnelle (cercle pointillé interne) pour signaler "bénéficiaire AV"

**Ce qu'on évite explicitement** :
- Visages dessinés (smiley, stick figure, cartoon)
- Illustrations de personnages flat-design
- Emojis, avatars génériques de stock
- Tout style "startup fintech 2018"

---

## Code visuel des rôles

| Rôle | Couleur cercle | Couleur initiale | Annotation mono Lora |
|---|---|---|---|
| **Défunt (Pierre)** | `#2E4A6F` (primary-600, bleu marine) | `#F5F0E8` (beige clair) | "Défunt" |
| **Conjoint exonéré TEPA (Catherine)** | `#D4AF37` (accent-400, doré) | `#1E3A5F` (bleu marine foncé) | "Conjoint — exonéré TEPA" |
| **Héritier ligne directe (Marie, Thomas)** | `#F5F0E8` (surface-card, beige clair) | `#1E3A5F` (bleu marine foncé) | "Héritier" |
| **Bénéficiaire AV** | couleur du rôle de base | couleur du rôle de base | "Bénéficiaire AV" |
| **Notaire** (futur épisode) | `#1E3A5F` (primary-700, bleu marine foncé) | `#E5C77F` (accent-300, doré clair) | "Notaire" |
| **Banquier/assureur** (futur épisode) | `#7C5E07` (accent-700, ocre foncé) | `#F5F0E8` (beige clair) | "Assureur" |

**Bénéficiaire AV** : signalé par une **bordure dorée pointillée** (cercle interne) autour du cercle de fond, en plus du code couleur du rôle de base. Lecture : "ce qui se passe sur l'AV cible cette personne".

---

## Différenciation des personas

Comme on n'a plus de variations de cheveux ou de lunettes, **la différenciation passe uniquement par** :
- L'**initiale** (P, C, M, T)
- La **couleur du cercle** (par rôle)
- L'**annotation** (nom + âge + rôle)

C'est suffisant et plus lisible que des visages stylisés qui auraient demandé un travail de design important.

**Cas particulier — deux héritiers de même initiale** : si on a un futur épisode avec "Marc" et "Mathieu" qui ont tous les deux la même couleur de cercle, la prop optionnelle `initiale` permet de forcer une distinction (ex : "Mc" / "Ma" — déconseillé) ou on différencie par positionnement et annotation seulement.

---

## Animations standard

**Entrée d'un persona** :
- Fade-in (opacity 0 → 1) couplé à scale-up (0.85 → 1) via `spring()`
- Drop-shadow discret par défaut

**Highlight (quand la voix parle du persona)** :
- Scale up subtil (1 → 1.05)
- Drop-shadow renforcé (`drop-shadow(0 0 18px ${couleurFond})`) qui crée un glow dans la couleur du rôle

**Décès** (Pierre dans l'acte 1) :
- Opacity passe à 0.45
- Filter `grayscale(70%)` pour désaturer
- Persona reste à l'écran (les flux de capital partent encore de lui)

**Transition entre personas (flux de capital)** :
- Géré par le composant `<FluxCapital>` séparé (lignes courbes + particules)

---

## API du composant

```typescript
interface PersonaProps {
  nom: string
  age: number
  role: 'defunt' | 'conjoint' | 'heritier' | 'beneficiaire-av' | 'notaire' | 'assureur'
  /** Position absolue (pixels). Si omis, le persona est centré. */
  x?: number
  y?: number
  /** Diamètre du cercle (par défaut 200 px). */
  taille?: number
  /** Frame de début d'apparition. */
  frameApparition?: number
  /** Mise en avant : scale 1.05 + glow doré. */
  highlight?: boolean
  /** État grisé (utilisé pour Pierre après son décès). */
  decede?: boolean
  /** Bordure dorée signalant "bénéficiaire AV". */
  bordureAv?: boolean
  /** Affiche l'annotation (nom + role) sous le persona. */
  showAnnotation?: boolean
  /** Initiale forcée (par défaut : première lettre du nom). */
  initiale?: string
}
```

Code dans `video/src/components/Persona.tsx`. ~150 lignes (vs ~280 lignes pour la version flat-design abandonnée). Plus simple, plus rapide à itérer.

---

## Cohérence avec les autres composants Remotion

- Polices identiques à `<MontantAnime>`, `<TitreActe>`, `<BarresComparatives>` (Playfair pour la serif, Lora pour la mono).
- Le doré du cercle Catherine est identique au doré utilisé dans les chiffres-clés.
- Les animations spring partagent les mêmes `damping` / `stiffness` que les autres composants pour un rythme cohérent.

---

## Historique des décisions

- **2026-06-04 (matin)** : choix initial flat-design détaillé avec visages stylisés (cf. AskUserQuestion). Spec écrite et code SVG produit (~280 lignes).
- **2026-06-04 (soir)** : rendu jugé "horriblement laid" par Nicolas (validation visuelle). Rebascule sur l'option 1 initialement écartée (monogrammes typographiques) qui colle mieux à la charte "vieille banque privée moderne". Le code SVG flat-design est supprimé du repo.

**Leçon** : pour les composants visuels d'une chaîne YouTube destinée à un public 45-65 ans dans la finance, la sobriété typographique l'emporte sur la chaleur de l'incarnation. Le ton "banque privée" prime sur le ton "edutainment chaleureux".
