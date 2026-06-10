// src/lib/calculators/breadcrumb.ts
// Helper pour intercaler la pillar (page categorie) dans le breadcrumb de
// chaque page calculateur. Boost SEO : Google utilise le fil d'Ariane pour
// les rich snippets, et la presence de la categorie densifie le maillage
// pillars <-> clusters (cf. audit linking interne 2026-06-10).

import { CATEGORIES_CALC } from '@/config/navigation'

export interface BreadcrumbItem {
  href?: string
  label: string
}

/**
 * Renvoie le prefix [Accueil, Categorie] pour un calculateur,
 * resolu via CATEGORIES_CALC.
 *
 * @param calcHref - le href du calculateur (ex. '/ifi', '/assurance-vie/transmission')
 * @returns un tableau de 1 ou 2 BreadcrumbItem selon que la categorie est trouvee
 *
 * @example
 *   getPillarBreadcrumb('/ifi')
 *   // [{ href: '/', label: 'Accueil' }, { href: '/calculateurs/immobilier', label: 'Immobilier' }]
 */
export function getPillarBreadcrumb(calcHref: string): BreadcrumbItem[] {
  const cat = CATEGORIES_CALC.find(c =>
    c.calculateurs.some(calc => calc.href === calcHref)
  )
  const accueil: BreadcrumbItem = { href: '/', label: 'Accueil' }
  if (!cat) return [accueil]
  return [
    accueil,
    { href: `/calculateurs/${cat.slug}`, label: cat.label },
  ]
}
