// src/components/home/TrustBadges.tsx
// Trust signals visuels - 4 badges, mode sombre, accent or sur le highlight.
// SVG inline Lucide-style, pas de dependance.
import Link from 'next/link'
import { CATEGORIES_CALC } from '@/config/navigation'

const ACCENT_OR = '#D4AF37'

const nbActifs = CATEGORIES_CALC.flatMap(c =>
  c.calculateurs.filter(x => x.disponible)
).length

interface Badge {
  icon: React.ReactNode
  title: string
  desc: string
  href?: string
  highlight?: boolean
}

const IconGithub = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const IconShield = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
)

const IconBook = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)

const IconCalculator = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="10" y2="10" />
    <line x1="12" y1="10" x2="14" y2="10" />
    <line x1="16" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="10" y2="14" />
    <line x1="12" y1="14" x2="14" y2="14" />
    <line x1="16" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="14" y2="18" />
  </svg>
)

const BADGES: Badge[] = [
  {
    icon: IconCalculator,
    title: `${nbActifs} calculateurs`,
    desc: 'Disponibles, gratuits, à vie',
    highlight: true,
  },
  {
    icon: IconShield,
    title: '0 donnée collectée',
    desc: 'Tout reste sur votre machine',
  },
  {
    icon: IconBook,
    title: 'Sources officielles',
    desc: 'CGI · BOFiP · INSEE',
  },
  {
    icon: IconGithub,
    title: 'Code source ouvert',
    desc: 'Auditable sur GitHub',
    href: 'https://github.com/nba67000/calculpatrimoine',
  },
]

function BadgeCard({ badge }: { badge: Badge }) {
  const accentColor = badge.highlight ? ACCENT_OR : '#A1A1AA'

  const content = (
    <div className="flex items-start gap-4 h-full">
      <div className="shrink-0 mt-0.5" style={{ color: accentColor }}>
        {badge.icon}
      </div>
      <div>
        <p
          className="font-sans font-bold text-base text-white leading-snug"
          style={{ letterSpacing: '-0.01em' }}
        >
          {badge.title}
        </p>
        <p className="font-mono text-xs text-neutral-400 mt-1.5 leading-relaxed">
          {badge.desc}
        </p>
      </div>
    </div>
  )

  const baseClass =
    'block px-5 py-5 h-full rounded-xl border border-white/10 transition-all hover:border-white/25 hover:-translate-y-0.5'
  const bgStyle = { backgroundColor: '#171717' }

  if (badge.href) {
    return (
      <Link
        href={badge.href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        style={bgStyle}
      >
        {content}
      </Link>
    )
  }

  return (
    <div className={baseClass} style={bgStyle}>
      {content}
    </div>
  )
}

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {BADGES.map(b => (
        <BadgeCard key={b.title} badge={b} />
      ))}
    </div>
  )
}
