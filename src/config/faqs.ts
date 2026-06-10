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
      description: 'Plafond 150 000 EUR, exoneration apres 5 ans, prelevements sociaux 17,2 %, passif fiscal latent.',
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
  ],
}
