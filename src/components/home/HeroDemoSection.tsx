// src/components/home/HeroDemoSection.tsx
// Section signature de la homepage : demo TMI/IR interactive.
// Palette : fond blanc casse, carte resultat noir charbon "spotlight", accent or.
// Rupture visuelle forte avec le hero noir charbon en dessus/dessous.
'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { calculerTMIResult } from '@/lib/tmi'

const REVENU_MIN = 20_000
const REVENU_MAX = 200_000
const REVENU_STEP = 1_000
const REVENU_DEFAULT = 85_000

const ACCENT_OR = '#D4AF37'
const DEMO_BG = '#FAFAFA'     // blanc casse, doux pour les yeux
const CARD_BG = '#0A0A0A'     // noir charbon - spotlight sur le resultat
const TEXT_DARK = '#0A0A0A'   // noir charbon = couleur titre
const TEXT_MUTED = '#525252'  // neutral-600 = corps

function formatEur(n: number): string {
  return n.toLocaleString('fr-FR')
}

// Gradient gris pour les barres barème (sur fond noir de la carte) ; TMI atteinte en or.
const TRANCHE_FILL: Record<number, string> = {
  0: '#3A3A3A',
  11: '#5A5A5A',
  30: '#7A7A7A',
  41: '#A0A0A0',
  45: ACCENT_OR,
}

export default function HeroDemoSection() {
  const [revenu, setRevenu] = useState(REVENU_DEFAULT)

  const result = useMemo(
    () =>
      calculerTMIResult({
        revenuNetImposable: revenu,
        situationFamiliale: 'celibataire',
        nombreEnfants: 0,
      }),
    [revenu]
  )

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: DEMO_BG, color: TEXT_DARK }}
    >
      <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-center">

          {/* Colonne gauche : explication + slider sur fond clair */}
          <div>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-6"
              style={{ color: ACCENT_OR }}
            >
              Démonstration en direct
            </p>

            <h2
              className="font-sans font-black leading-[1] tracking-tight mb-6"
              style={{
                fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                letterSpacing: '-0.025em',
                color: TEXT_DARK,
              }}
            >
              Un calcul tombe.<br />
              Vous voyez l&apos;impôt&nbsp;exact.
            </h2>

            <p
              className="text-base lg:text-lg leading-relaxed mb-12 max-w-md"
              style={{ color: TEXT_MUTED }}
            >
              Bougez le curseur. C&apos;est le barème officiel 2026 qui répond,
              pas une estimation marketing. Aucune donnée ne quitte votre navigateur.
            </p>

            {/* Slider revenu - palette claire */}
            <div className="mb-2">
              <div className="flex items-baseline justify-between mb-4">
                <label
                  htmlFor="revenu-demo"
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: '#737373' }}
                >
                  Revenu net imposable
                </label>
                <span
                  className="font-sans font-black text-3xl tabular-nums"
                  style={{ letterSpacing: '-0.02em', color: TEXT_DARK }}
                >
                  {formatEur(revenu)} €
                </span>
              </div>

              <input
                id="revenu-demo"
                type="range"
                min={REVENU_MIN}
                max={REVENU_MAX}
                step={REVENU_STEP}
                value={revenu}
                onChange={e => setRevenu(parseInt(e.target.value, 10))}
                className="demo-range-light"
              />

              <div className="flex justify-between text-xs font-mono mt-3 tabular-nums" style={{ color: '#A3A3A3' }}>
                <span>{formatEur(REVENU_MIN)} €</span>
                <span>{formatEur(REVENU_MAX)} €</span>
              </div>
            </div>

            <p className="text-xs font-mono mt-8 leading-relaxed" style={{ color: '#A3A3A3' }}>
              Démo simplifiée&nbsp;: célibataire sans enfant, sans décote.
              Le calculateur complet gère le quotient familial.
            </p>
          </div>

          {/* Colonne droite : carte spotlight noir charbon */}
          <div>
            {/* Carte resultat principale - noir charbon, contraste fort avec le fond blanc */}
            <div
              className="rounded-2xl p-8 lg:p-10 mb-6 text-white shadow-2xl"
              style={{ backgroundColor: CARD_BG }}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4">
                Impôt sur le revenu 2026
              </p>

              <p
                className="font-sans font-black tabular-nums leading-[0.95] mb-2 text-white"
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 6.5rem)',
                  letterSpacing: '-0.04em',
                }}
              >
                {formatEur(Math.round(result.irNet))} €
              </p>

              <div className="flex flex-wrap gap-x-10 gap-y-2 mt-8 pt-6 border-t border-white/10">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Tranche marginale
                  </p>
                  <p className="font-sans font-black text-3xl tabular-nums text-white">
                    {result.tmi}<span className="text-neutral-600 text-xl ml-1">%</span>
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Taux moyen
                  </p>
                  <p className="font-sans font-black text-3xl tabular-nums text-white">
                    {result.tauxMoyen.toFixed(1).replace('.', ',')}<span className="text-neutral-600 text-xl ml-1">%</span>
                  </p>
                </div>
              </div>

              {/* Barème en barres horizontales DANS la carte */}
              <div className="space-y-2.5 mt-8 pt-6 border-t border-white/10">
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3">
                  Répartition par tranche
                </p>
                {result.detailTranches
                  .filter(t => t.revenuDansLaTranche > 0)
                  .map(t => {
                    const widthPct = (t.revenuDansLaTranche / revenu) * 100
                    return (
                      <div key={t.taux}>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-neutral-500 w-9 tabular-nums">
                            {t.taux} %
                          </span>
                          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-200"
                              style={{
                                width: `${widthPct}%`,
                                backgroundColor: TRANCHE_FILL[t.taux] ?? '#94A3B8',
                              }}
                            />
                          </div>
                          <span className="font-sans font-bold text-xs text-white tabular-nums whitespace-nowrap min-w-[4.5rem] text-right">
                            {formatEur(Math.round(t.impotDansLaTranche))} €
                          </span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* CTA noir sur blanc - cohérent avec le fond clair */}
            <Link
              href="/tmi"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-lg font-bold transition-all hover:-translate-y-0.5 text-white"
              style={{ backgroundColor: TEXT_DARK }}
            >
              <span>Calculer sur votre situation</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
