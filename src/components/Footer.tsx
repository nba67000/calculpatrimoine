// src/components/Footer.tsx
// Palette signature : noir charbon #0A0A0A + accent or #D4AF37, alignée
// sur la homepage v3. Filet or 3px en haut pour rupture visuelle.
'use client'

import Link from 'next/link'
import { CALCULATEURS, RESSOURCES, LIENS_LEGAUX } from '@/config/navigation'

const FOOTER_BG = '#0A0A0A'
const ACCENT_OR = '#D4AF37'

export default function Footer() {
  return (
    <footer
      className="text-neutral-400 mt-0"
      style={{ backgroundColor: FOOTER_BG }}
    >
      <div
        className="w-full"
        style={{ height: '3px', backgroundColor: ACCENT_OR }}
      />
      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Marque */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ backgroundColor: ACCENT_OR }}
              >
                <span style={{ color: FOOTER_BG }} className="font-bold text-xl">C</span>
              </div>
              <span className="text-white text-lg font-bold tracking-tight">
                CalculPatrimoine
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">
              Calculateurs patrimoniaux gratuits et open-source.
              Sans inscription, sans publicité, aucune donnée conservée.
            </p>
            <div
              className="mt-6"
              style={{ height: '1px', width: '2.5rem', backgroundColor: ACCENT_OR }}
            />
          </div>

          {/* Calculateurs */}
          <div>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: ACCENT_OR }}
            >
              Calculateurs
            </p>
            <ul className="space-y-2 text-sm">
              {CALCULATEURS.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-5"
              style={{ color: ACCENT_OR }}
            >
              Ressources
            </p>
            <ul className="space-y-2 text-sm">
              {RESSOURCES.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ligne bas */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <div className="text-xs text-neutral-500">
            © {new Date().getFullYear()} CalculPatrimoine · Tous droits réservés
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LIENS_LEGAUX.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-neutral-500 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://github.com/nba67000/calculpatrimoine"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-white transition-colors"
            >
              Code source
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
