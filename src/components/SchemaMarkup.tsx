// src/components/SchemaMarkup.tsx
import Script from 'next/script'
import { CATEGORIES_CALC } from '@/config/navigation'
import { safeJsonLd } from '@/lib/safeJsonLd'

export default function SchemaMarkup() {
  const baseUrl = 'https://calculpatrimoine.fr'

  const calculateursActifs = CATEGORIES_CALC
    .flatMap(c => c.calculateurs)
    .filter(c => c.disponible)

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}#website`,
        name: 'CalculPatrimoine',
        url: baseUrl,
        inLanguage: 'fr-FR',
        description:
          'Calculateurs patrimoniaux gratuits et open-source basés sur les textes officiels (CGI, BOFiP, INSEE).',
        publisher: { '@id': `${baseUrl}#organization` },
      },

      {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: 'CalculPatrimoine',
        url: baseUrl,
        logo: `${baseUrl}/logo.svg`,
        sameAs: ['https://github.com/nba67000/calculpatrimoine'],
        founder: {
          '@type': 'Person',
          name: 'Nicolas Barbier',
        },
      },

      {
        '@type': 'SoftwareApplication',
        '@id': `${baseUrl}#software`,
        name: 'CalculPatrimoine',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        url: baseUrl,
        description:
          'Suite de calculateurs patrimoniaux gratuits pour la fiscalité française : TMI, PER, assurance-vie, donation, succession, IFI, PEA, plus-value immobilière, LMNP, SCI, rente viagère, CSG retraite.',
        softwareVersion: '2.0',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
        },
        featureList: [
          'Tranche marginale d\'imposition (TMI) 2026',
          'Économie d\'impôt PER avec plafond et report',
          'Fiscalité des rachats d\'assurance-vie (PFU vs IR)',
          'Transmission assurance-vie (Art. 990 I, 757 B CGI)',
          'Droits de donation par lien de parenté',
          'Donation avec démembrement (Art. 669 CGI)',
          'Droits de succession par héritier',
          'IFI 2026 avec abattement résidence principale et plafonnement',
          'PEA : fiscalité retrait et bilan latent',
          'Plus-value immobilière (résidence secondaire, locatif, LMNP)',
          'LMNP réel vs micro-BIC',
          'SCI à l\'IS vs à l\'IR',
          'Rente viagère sur tables INSEE 2021',
          'CSG/CRDS sur pension de retraite',
          'Prêt intrafamilial in fine',
          'Locatif vs placement financier',
          'Sans inscription, données non conservées',
          'Code source ouvert',
        ],
        author: { '@id': `${baseUrl}#organization` },
      },

      {
        '@type': 'ItemList',
        '@id': `${baseUrl}#calculateurs`,
        name: 'Calculateurs patrimoniaux',
        numberOfItems: calculateursActifs.length,
        itemListElement: calculateursActifs.map((calc, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${baseUrl}${calc.href}`,
          name: calc.nom,
          description: calc.desc,
        })),
      },
    ],
  }

  return (
    <Script
      id="schema-markup"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schemaData) }}
    />
  )
}
