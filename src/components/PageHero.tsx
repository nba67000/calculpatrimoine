// src/components/PageHero.tsx
//
// Hero standard pour toutes les pages internes (calculateurs, FAQ, blog,
// pages légales et éditoriales). Palette noir charbon + or discret,
// cohérente avec la homepage v3.
//
// Le filet or 3px en haut (déjà rendu par les pages avant la refonte)
// est inclus ici pour centraliser le motif. Les pages qui utilisaient
// `<div className="h-[3px] bg-accent-400 w-full" />` doivent le retirer.
import type { ReactNode } from 'react'
import Link from 'next/link'

const HERO_BG = '#0A0A0A'
const ACCENT_OR = '#D4AF37'

export type BreadcrumbItem = {
  href?: string
  label: string
}

interface Props {
  /** Fil d'Ariane affiché en haut, format mono italique discret. */
  breadcrumb: BreadcrumbItem[]
  /** Sur-titre optionnel en font-mono uppercase or (ex : « Calculateur · 2026 »). */
  eyebrow?: ReactNode
  /** Titre principal de la page, rendu en sans-serif black blanc. */
  titre: ReactNode
  /** Accroche sous le titre, en gris neutral. */
  description?: ReactNode
  /** Liste de caractéristiques courtes affichées en bas du hero. */
  features?: string[]
  /** Taille du titre : 'lg' (par défaut) ou 'xl' pour homepage-like. */
  size?: 'lg' | 'xl'
}

export default function PageHero({
  breadcrumb,
  eyebrow,
  titre,
  description,
  features,
  size = 'lg',
}: Props) {
  const fontSize =
    size === 'xl'
      ? 'clamp(2.5rem, 6vw, 4.75rem)'
      : 'clamp(2.25rem, 4.5vw, 3.75rem)'

  return (
    <>
      <div
        className="w-full"
        style={{ height: '3px', backgroundColor: ACCENT_OR }}
      />
      <section
        className="text-white"
        style={{ backgroundColor: HERO_BG, contain: 'layout' }}
      >
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-16 lg:pt-20 lg:pb-20">

          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 font-mono text-xs text-neutral-500 mb-10"
            style={{ minHeight: '16px' }}
            aria-label="Fil d'Ariane"
          >
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-neutral-700">/</span>}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-neutral-300">{item.label}</span>
                )}
              </span>
            ))}
          </nav>

          {/* Eyebrow optionnel */}
          {eyebrow && (
            <p
              className="font-mono text-xs uppercase tracking-widest mb-6"
              style={{ color: ACCENT_OR }}
            >
              {eyebrow}
            </p>
          )}

          {/* Filet or */}
          <div
            className="mb-8"
            style={{ height: '2px', width: '3.5rem', backgroundColor: ACCENT_OR }}
          />

          {/* H1 sans-serif black */}
          <h1
            className="font-sans font-black text-white leading-[1] tracking-tight mb-6"
            style={{
              fontSize,
              letterSpacing: '-0.025em',
              minHeight: '3.5rem',
            }}
          >
            {titre}
          </h1>

          {/* Accroche */}
          {description && (
            <p className="text-lg lg:text-xl text-neutral-400 leading-relaxed max-w-3xl">
              {description}
            </p>
          )}

          {/* Features (puces courtes) */}
          {features && features.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8">
              {features.map(t => (
                <span key={t} className="font-mono text-xs text-neutral-500">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
