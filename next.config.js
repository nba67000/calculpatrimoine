/** @type {import('next').NextConfig} */

// Content-Security-Policy
// Note: script-src 'unsafe-inline' reste necessaire tant que les JSON-LD
// inline (SchemaMarkup, SchemaFAQ, SchemaHowTo) ne sont pas migres vers
// une CSP a nonce. Migration prevue apres l'upgrade Next.js (cf. audit
// 2026-06-10, finding 3).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "connect-src 'self' https://vitals.vercel-insights.com https://eu.umami.is",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ')

const nextConfig = {
  // PERF : compression gzip/brotli activée sur toutes les réponses
  compress: true,

  // PERF : génération WebP et AVIF automatique pour toutes les <Image>
  // Réduit le poids des images de 30–60 % selon le format source
  images: {
    formats: ['image/avif', 'image/webp'],
    // Cache CDN Vercel 60 jours pour les images optimisées (valeur max recommandée)
    minimumCacheTTL: 60 * 60 * 24 * 60,
  },

  async headers() {
    return [
      // Headers sécurité sur toutes les routes
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: CSP },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()' },
        ],
      },
      // PERF : cache long sur les assets statiques (Next.js les hash de toute façon)
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // PERF : cache moyen sur les images publiques
      // Next.js n'accepte pas les groupes capturants , on cible /public/* avec un wildcard simple
      {
        source: '/:path*.(png|jpg|jpeg|gif|svg|ico|webp|avif)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
