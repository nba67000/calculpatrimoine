// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { CATEGORIES_CALC } from '@/config/navigation'
import { ARTICLES } from '@/lib/blog/articles'

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

  // Blog articles - derived from ARTICLES, single source of truth
  const blogPages: MetadataRoute.Sitemap = ARTICLES.map(article => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
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

    // Blog index
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Blog articles (derived from ARTICLES)
    ...blogPages,

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
    {
      url: `${baseUrl}/faq/pea`,
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
