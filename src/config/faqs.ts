// src/config/faqs.ts
// Mapping des FAQ existantes (src/app/faq/*) regroupees par categorie pillar.
// Utilise par /calculateurs/[slug]/page.tsx pour ajouter une section
// "Questions frequentes" sous la liste des calcs, ce qui densifie le maillage
// pillar -> cluster FAQ (cf. audit linking interne 2026-06-10, point 3).
//
// Convention : pour ajouter une FAQ a une categorie, l'inserer ci-dessous.
// La page categorie n'affiche la section que si la categorie a au moins une
// entree. Aucun lien casse n'est genere : on liste seulement les FAQ qui
// existent.

export interface FaqLink {
  href: string
  title: string
  description: string
}

export const FAQS_BY_CATEGORY: Record<string, FaqLink[]> = {
  'epargne-retraite': [
    {
      href: '/faq/per',
      title: 'FAQ PER',
      description: 'Plafond de deduction, report N-1 a N-5, sortie en capital ou rente.',
    },
    {
      href: '/faq/rente-viagere',
      title: 'FAQ Rente viagere',
      description: 'Conversion d\'un capital en revenus a vie, reversion conjoint, seuil de rentabilite.',
    },
    {
      href: '/faq/csg-csds-retraite',
      title: 'FAQ CSG retraite',
      description: 'Quatre paliers (0, 4.3, 7.4, 9.1 %), RFR N-2, regle des 2 annees consecutives.',
    },
    {
      href: '/faq/per-sortie',
      title: 'FAQ PER sortie',
      description: 'Options capital/rente, fiscalite Art. 158-5 bis CGI, sortie anticipee.',
    },
  ],

  'assurance-vie': [
    {
      href: '/faq/assurance-vie',
      title: 'FAQ Assurance-Vie',
      description: 'PFU vs IR sur les rachats, abattement 8 ans, versements avant 2017.',
    },
    {
      href: '/faq/transmission',
      title: 'FAQ Transmission',
      description: 'Articles 990 I et 757 B CGI, abattements par beneficiaire, age des versements.',
    },
    {
      href: '/faq/donation-droits',
      title: 'FAQ Donation',
      description: 'Abattements Art. 779, bareme Art. 777, don familial 790 G, rappel 15 ans.',
    },
    {
      href: '/faq/succession',
      title: 'FAQ Succession',
      description: 'Abattements par lien, bareme Art. 777, exoneration conjoint, rappel 15 ans.',
    },
    {
      href: '/faq/vente-vs-donation',
      title: 'FAQ Vente vs donation',
      description: 'Choix fiscal entre vente et donation d\'un bien immobilier a un proche.',
    },
    {
      href: '/faq/pret-intrafamilial',
      title: 'FAQ Pret intrafamilial',
      description: 'Formalites 2062/2778, taux, fiscalite des interets, place dans la succession.',
    },
    {
      href: '/faq/donation-demembrement',
      title: 'FAQ Donation demembrement',
      description: 'Bareme Art. 669 CGI, avantage fiscal, extinction usufruit au deces.',
    },
    {
      href: '/faq/assurance-vie-fiscalite-rachat',
      title: 'FAQ Fiscalite rachat AV',
      description: 'PFU vs IR, abattement 8 ans, versements pre-2017, fractionnement.',
    },
  ],

  'fiscalite': [
    {
      href: '/faq/tmi',
      title: 'FAQ TMI',
      description: 'Tranches du bareme IR, quotient familial, decote, foyer fiscal.',
    },
    {
      href: '/faq/pea',
      title: 'FAQ PEA',
      description: 'Plafond 150 000 EUR, exoneration apres 5 ans, prelevements sociaux 18,6 %, passif fiscal latent.',
    },
  ],

  'immobilier': [
    {
      href: '/faq/ifi',
      title: 'FAQ IFI',
      description: 'Seuil 1 300 000 EUR, abattement residence principale 30 %, decote, plafonnement.',
    },
    {
      href: '/faq/plus-value-immobiliere',
      title: 'FAQ Plus-value immobiliere',
      description: 'Abattements par duree de detention, exoneration residence principale, surtaxe.',
    },
    {
      href: '/faq/deficit-foncier',
      title: 'FAQ Deficit foncier',
      description: 'Plafond 10 700 EUR, plafond majore 21 400 EUR (renovation energetique), engagement 3 ans.',
    },
    {
      href: '/faq/sci-is-vs-ir',
      title: 'FAQ SCI IS vs IR',
      description: 'Impot annuel, amortissements, piege de la sortie en SCI IS, option irreversible.',
    },
    {
      href: '/faq/lmnp-reel-vs-micro',
      title: 'FAQ LMNP reel vs micro',
      description: 'Seuils LF 2025, charges deductibles, amortissements, deficit, sortie.',
    },
    {
      href: '/faq/plus-value-immobiliere-lmnp',
      title: 'FAQ Plus-value LMNP',
      description: 'Reintegration des amortissements depuis le 15/02/2025 (Art. 150 VB III CGI).',
    },
    {
      href: '/faq/comparateur-locatif-placement',
      title: 'FAQ Locatif vs Placement',
      description: 'Comparaison capital comptant, place de la liquidite et de la diversification.',
    },
  ],
}
