// src/components/home/galerie/sphere-data.ts
// Aplatie CATEGORIES_CALC en une liste de cartes pour la galerie 3D.
// Source unique de vérité inchangée : src/config/navigation.ts.

import { CATEGORIES_CALC } from '@/config/navigation'

export interface SphereCardData {
  href: string
  nom: string
  desc: string
  categorie: string
}

/** Tous les calculateurs disponibles, avec le label de leur catégorie. */
export const SPHERE_CARDS: SphereCardData[] = CATEGORIES_CALC.flatMap(cat =>
  cat.calculateurs
    .filter(c => c.disponible)
    .map(c => ({
      href: c.href,
      nom: c.nom,
      desc: c.desc,
      categorie: cat.label,
    }))
)
