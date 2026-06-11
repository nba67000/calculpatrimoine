// src/components/home/BentoCalculateurs.tsx
// Grille inegale (Bento) des 4 categories de calculateurs - mode sombre.
// Vedettes alternees (Assurance-vie + Immobilier = les plus volumineuses).
import Link from 'next/link'
import { CATEGORIES_CALC } from '@/config/navigation'

const ACCENT_OR = '#D4AF37'

interface CardLayout {
  slug: string
  span: 'wide' | 'compact'
}

const LAYOUT: CardLayout[] = [
  { slug: 'assurance-vie', span: 'wide' },
  { slug: 'fiscalite', span: 'compact' },
  { slug: 'epargne-retraite', span: 'compact' },
  { slug: 'immobilier', span: 'wide' },
]

interface BentoCardProps {
  slug: string
  span: 'wide' | 'compact'
}

function BentoCard({ slug, span }: BentoCardProps) {
  const cat = CATEGORIES_CALC.find(c => c.slug === slug)
  if (!cat) return null

  const actifs = cat.calculateurs.filter(c => c.disponible)
  const isWide = span === 'wide'

  const featured = actifs[0]
  const others = actifs.slice(1)

  return (
    <Link
      href={`/calculateurs/${cat.slug}`}
      className={`group relative flex flex-col rounded-2xl border border-white/10 hover:border-white/30 transition-all hover:-translate-y-1 overflow-hidden ${
        isWide ? 'lg:col-span-3' : 'lg:col-span-2'
      }`}
      style={{ backgroundColor: '#171717' }}
    >
      {/* Halo or subtil au survol */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity"
        style={{ background: `radial-gradient(circle, ${ACCENT_OR} 0%, transparent 70%)` }}
      />

      {/* En-tete */}
      <div className="relative px-7 pt-7 pb-6 border-b border-white/10">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
              {actifs.length} outils
            </p>
            <h3
              className="font-sans font-black text-white leading-[1.05] tracking-tight"
              style={{
                fontSize: isWide ? 'clamp(1.75rem, 3vw, 2.5rem)' : 'clamp(1.5rem, 2.5vw, 2rem)',
                letterSpacing: '-0.025em',
              }}
            >
              {cat.label}
            </h3>
          </div>
          <span
            className="font-sans text-2xl shrink-0 mt-1 transition-transform group-hover:translate-x-1"
            style={{ color: ACCENT_OR }}
          >
            →
          </span>
        </div>
        <p className="text-sm text-neutral-400 leading-relaxed">{cat.description}.</p>
      </div>

      {/* Contenu */}
      <div className="relative flex-1 flex flex-col">
        {/* Calc vedette */}
        {featured && (
          <div
            className="px-7 py-5 border-b border-white/10"
            style={{ borderLeft: `3px solid ${ACCENT_OR}` }}
          >
            <p className="font-mono text-xs uppercase tracking-widest mb-1.5" style={{ color: ACCENT_OR }}>
              À découvrir
            </p>
            <p
              className="font-sans font-bold text-white leading-snug mb-1.5"
              style={{ letterSpacing: '-0.01em' }}
            >
              {featured.nom}
            </p>
            <p className="font-mono text-xs text-neutral-500 leading-relaxed line-clamp-2">
              {featured.desc}
            </p>
          </div>
        )}

        {/* Autres calcs */}
        {others.length > 0 && (
          <div
            className={`px-7 py-5 grid gap-x-6 gap-y-2.5 ${
              isWide ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {others.slice(0, isWide ? 4 : 3).map(calc => (
              <p
                key={calc.href}
                className="font-mono text-xs text-neutral-400 leading-snug"
              >
                <span className="mr-1.5" style={{ color: ACCENT_OR }}>·</span>
                {calc.nom}
              </p>
            ))}
            {others.length > (isWide ? 4 : 3) && (
              <p className="font-mono text-xs text-neutral-500 italic mt-1">
                + {others.length - (isWide ? 4 : 3)} autre{others.length - (isWide ? 4 : 3) > 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

export default function BentoCalculateurs() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6">
      {LAYOUT.map(item => (
        <BentoCard key={item.slug} slug={item.slug} span={item.span} />
      ))}
    </div>
  )
}
