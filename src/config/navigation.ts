// src/config/navigation.ts

export type NavItem = {
  href: string
  label: string
  category: 'categorie' | 'ressource' | 'legal'
  showInHeader: boolean
}

export type Calculateur = {
  href: string
  nom: string
  desc: string
  disponible: boolean
  /** Titre SEO alternatif pour la balise <title> (si différent de `nom`). */
  seoTitle?: string
}

export type CategorieCalc = {
  id: string
  slug: string
  label: string
  description: string
  calculateurs: Calculateur[]
}

/**
 * Source unique de vérité pour les catégories et calculateurs.
 * Pour ajouter un calculateur : l'insérer dans la catégorie concernée.
 * Pour ajouter une catégorie : ajouter une entrée dans CATEGORIES_CALC.
 */
export const CATEGORIES_CALC: CategorieCalc[] = [
  {
    id: 'epargne-retraite',
    slug: 'epargne-retraite',
    label: 'Épargne & Retraite',
    description: 'Préparer et optimiser vos revenus futurs',
    calculateurs: [
      {
        href: '/rente-viagere',
        nom: 'Rente Viagère',
        desc: 'Convertir son capital en revenu à vie : montant mensuel, à quel âge ça devient rentable, options pour le conjoint.',
        disponible: true,
      },
      {
        href: '/per-individuel',
        nom: 'PER Individuel',
        desc: "Économie d'impôt sur versement et comparaison avec l'assurance-vie selon votre TMI.",
        disponible: true,
      },
      {
        href: '/per-sortie',
        nom: 'PER Sortie (capital vs rente)',
        desc: 'Comparez la fiscalité à la liquidation : capital (IR + PFU) vs rente (régime pensions).',
        disponible: true,
      },
    ],
  },
  {
    id: 'assurance-vie',
    slug: 'assurance-vie',
    label: 'Assurance-Vie & Succession',
    description: 'Fiscalité des rachats et transmission du patrimoine',
    calculateurs: [
      {
        href: '/assurance-vie',
        nom: 'Assurance-Vie',
        desc: 'Fiscalité des rachats (PFU vs barème IR) et transmission aux bénéficiaires.',
        disponible: true,
      },
      {
        href: '/assurance-vie/fiscalite-rachat',
        nom: 'Fiscalité des rachats',
        desc: 'Rachat d\'assurance-vie : forfait PFU 30 % ou barème de l\'impôt, quelle option vous fait payer le moins ?',
        disponible: true,
      },
      {
        href: '/assurance-vie/transmission',
        nom: 'Transmission',
        desc: 'Assurance-vie au décès : combien chaque bénéficiaire reçoit net d\'impôts, selon l\'âge des versements (Art. 990 I et 757 B).',
        disponible: true,
      },
      {
        href: '/donation/droits',
        nom: 'Droits de donation',
        desc: 'Abattements par lien de parenté (Art. 779), barème Art. 777, rappel 15 ans, don familial 790 G.',
        disponible: true,
      },
      {
        href: '/pret-intrafamilial',
        nom: 'Prêt intrafamilial in fine',
        desc: 'Prêt entre proches avec remboursement in fine : comparaison fiscale avec une donation directe.',
        disponible: true,
      },
      {
        href: '/donation/demembrement',
        nom: 'Donation avec démembrement',
        desc: 'Donation de la nue-propriété (barème Art. 669 CGI) : économie de droits vs pleine propriété.',
        disponible: true,
      },
      {
        href: '/succession',
        nom: 'Droits de succession',
        desc: 'Calcul des droits par héritier selon les abattements légaux et le barème progressif.',
        disponible: true,
      },
    ],
  },
  {
    id: 'fiscalite',
    slug: 'fiscalite',
    label: 'Fiscalité',
    description: 'Comprendre et anticiper votre imposition',
    calculateurs: [
      {
        href: '/tmi',
        nom: 'TMI - Impôt sur le revenu',
        desc: "Tranches marginales, taux effectif et impôt annuel selon le barème en vigueur.",
        disponible: true,
      },
      {
        href: '/pea',
        nom: 'PEA - Fiscalité + bilan latent',
        desc: 'Retrait après 5 ans (PS 17,2 %) + bilan brut/net/passif fiscal latent.',
        disponible: true,
      },
      {
        href: '/csg-csds-retraite',
        nom: 'CSG / CRDS sur pension',
        desc: 'Taux CSG applicable (0 / 4,3 / 7,4 / 9,1 %) selon RFR et nombre de parts.',
        disponible: true,
      },
      {
        href: '/plus-value-mobiliere',
        nom: 'Plus-value mobilière',
        desc: "Imposition sur cession de titres hors PEA selon durée de détention.",
        disponible: false,
      },
    ],
  },
  {
    id: 'immobilier',
    slug: 'immobilier',
    label: 'Immobilier',
    description: 'Rendement et fiscalité de vos investissements locatifs',
    calculateurs: [
      {
        href: '/plus-value-immobiliere',
        nom: 'Plus-value immobilière',
        desc: 'Fiscalité de la cession : IR 19 %, PS 17,2 %, abattements par durée de détention, surtaxe.',
        disponible: true,
      },
      {
        href: '/plus-value-immobiliere/lmnp',
        nom: 'Plus-value immobilière LMNP',
        desc: 'Réintégration des amortissements LMNP au prix d\'acquisition (LF 2025, Art. 150 VB III).',
        disponible: true,
      },
      {
        href: '/comparateur-locatif-placement',
        nom: 'Locatif vs placement financier',
        desc: 'Comparez à capital et durée égaux : immobilier locatif vs PEA / AV / CTO (hypothèses simplificatrices).',
        disponible: true,
      },
      {
        href: '/lmnp-reel-vs-micro',
        nom: 'LMNP réel vs micro-BIC',
        desc: 'Compare l\'impôt LMNP entre régime micro (abattement forfaitaire) et réel (charges + amortissements).',
        disponible: true,
      },
      {
        href: '/sci-is-vs-ir',
        nom: 'SCI à l\'IS vs à l\'IR',
        desc: 'Compare l\'impôt annuel SCI selon le régime (V1 : sortie non incluse, attention).',
        disponible: true,
      },
      {
        href: '/ifi',
        nom: 'IFI - Fortune immobilière',
        desc: 'Calcul IFI : seuil 1 300 000 €, barème progressif, abattement RP 30 %, décote, plafonnement.',
        disponible: true,
      },
      {
        href: '/deficit-foncier',
        nom: 'Déficit foncier',
        desc: 'Location nue régime réel : plafond 10 700 €/an sur revenu global, report 10 ans, plafond majoré 21 400 € pour rénovation énergétique (Art. 156 I-3° CGI).',
        disponible: true,
      },
      {
        href: '/scpi',
        nom: 'SCPI',
        desc: 'Revenus locatifs papier et rentabilité comparée entre véhicules.',
        disponible: false,
      },
      {
        href: '/immobilier-locatif',
        nom: 'Immobilier locatif',
        desc: 'Rendement brut/net, cash-flow, fiscalité LMNP et SCI.',
        disponible: false,
      },
    ],
  },
]

export const NAV_ITEMS: NavItem[] = [
  // Catégories
  { href: '/calculateurs/epargne-retraite',  label: 'Épargne & Retraite',        category: 'categorie', showInHeader: true  },
  { href: '/calculateurs/assurance-vie',     label: 'Assurance-Vie & Succession', category: 'categorie', showInHeader: true  },
  { href: '/calculateurs/fiscalite',         label: 'Fiscalité',                  category: 'categorie', showInHeader: true  },
  { href: '/calculateurs/immobilier',        label: 'Immobilier',                 category: 'categorie', showInHeader: true  },

  // Ressources
  { href: '/blog',         label: 'Blog',         category: 'ressource', showInHeader: true  },
  { href: '/faq',          label: 'FAQ',          category: 'ressource', showInHeader: false },
  { href: '/methodologie', label: 'Méthodologie', category: 'ressource', showInHeader: false },
  { href: '/a-propos',     label: 'À propos',     category: 'ressource', showInHeader: true  },

  // Légal (footer uniquement)
  { href: '/mentions-legales',           label: 'Mentions légales', category: 'legal', showInHeader: false },
  { href: '/cgu',                        label: 'CGU',              category: 'legal', showInHeader: false },
  { href: '/politique-confidentialite',  label: 'Confidentialité',  category: 'legal', showInHeader: false },
]

export const CATEGORIES    = NAV_ITEMS.filter(i => i.category === 'categorie')
export const RESSOURCES    = NAV_ITEMS.filter(i => i.category === 'ressource')
export const LIENS_LEGAUX  = NAV_ITEMS.filter(i => i.category === 'legal')
export const NAV_HEADER    = NAV_ITEMS.filter(i => i.showInHeader)

// Alias compat Footer (liste les catégories dans la colonne "Calculateurs")
export const CALCULATEURS  = CATEGORIES

/** Retourne les métadonnées SEO de base pour un calculateur donné par href. */
export function getCalculateurMeta(href: string): { title: string; description: string } | null {
  const calc = CATEGORIES_CALC
    .flatMap(c => c.calculateurs)
    .find(c => c.href === href)
  if (!calc) return null
  return {
    title: calc.seoTitle ?? calc.nom,
    description: calc.desc,
  }
}
