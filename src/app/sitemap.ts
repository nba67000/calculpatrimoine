// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { CATEGORIES_CALC } from '@/config/navigation'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://calculpatrimoine.fr'
  const lastModified = new Date()

  // Calculator pages - derived from CATEGORIES_CALC, single source of truth
  const calculatorPages: MetadataRoute.Sitemap = CATEGORIES_CALC
    .flatMap(cat => cat.calculateurs)
    .filter(calc => calc.disponible)
    .map(calc => ({
      url: `${baseUrl}${calc.href}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))

  // Category landing pages - derived from CATEGORIES_CALC
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES_CALC.map(cat => ({
    url: `${baseUrl}/calculateurs/${cat.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    // Home
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Calculators (derived)
    ...calculatorPages,

    // Category landing pages (derived)
    ...categoryPages,

    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/rente-viagere-seuil-rentabilite`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/assurance-vie-fiscalite-rachat`,
      lastModified: new Date('2026-04-18'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/per-individuel-deduction-fiscalite`,
      lastModified: new Date('2026-04-20'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/tmi-tranche-marginale-comprendre`,
      lastModified: new Date('2026-06-02'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // FAQ
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/assurance-vie`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq/transmission`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq/ifi`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/donation-droits`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/tmi`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/per`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/rente-viagere`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/plus-value-immobiliere`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Static pages
    {
      url: `${baseUrl}/methodologie`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    // Legal
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cgu`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
