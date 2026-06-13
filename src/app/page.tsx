import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SimHistoryWidget from '@/components/SimHistoryWidget'
import TrustBadges from '@/components/home/TrustBadges'
import GalerieCalculateurs from '@/components/home/galerie/GalerieCalculateurs'
import HowItWorks from '@/components/home/HowItWorks'
import { ARTICLES } from '@/lib/blog/articles'

export const metadata: Metadata = {
  title: 'CalculPatrimoine - Calculateurs patrimoniaux gratuits et open-source',
  description: 'Plus de 14 calculateurs patrimoniaux gratuits basés sur les textes officiels (CGI, BOFiP, INSEE) : TMI, PER, assurance-vie, donation, succession, IFI, PEA, plus-value immobilière, LMNP, SCI, rente viagère. Sans inscription, aucune donnée conservée.',
  keywords: 'calculateur patrimoine, simulateur fiscal gratuit, calculateur TMI 2026, calculateur PER, plafond PER, assurance vie fiscalité, rachat assurance vie, transmission assurance vie, droits de donation, calculateur succession, IFI 2026, PEA fiscalité, plus-value immobilière, LMNP réel vs micro, SCI IS vs IR, rente viagère, CSG retraite, prêt intrafamilial, démembrement, open source finance',
  openGraph: {
    title: 'CalculPatrimoine - Calculateurs patrimoniaux gratuits et open-source',
    description: 'Plus de 14 calculateurs patrimoniaux basés sur les textes officiels. Aucun conseil, aucune donnée conservée.',
    type: 'website',
  },
  alternates: { canonical: 'https://calculpatrimoine.fr/' },
}

// Palette signature home : noir charbon + blanc + or discret (Qonto-like).
const HOME_BG = '#0A0A0A'
const ACCENT_OR = '#D4AF37'

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />

      <div className="text-white" style={{ backgroundColor: HOME_BG }}>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 lg:pt-32 lg:pb-20">
          <div className="relative max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-widest mb-6" style={{ color: ACCENT_OR }}>
              Calcul patrimonial · France · 2026
            </p>

            <div className="h-[2px] w-14 mb-8" style={{ backgroundColor: ACCENT_OR }} />

            <h1
              className="font-sans font-black text-white leading-[0.95] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.75rem, 7.5vw, 6rem)', letterSpacing: '-0.03em' }}
            >
              Prenez vos décisions<br />
              avec les bons chiffres.
            </h1>

            <p className="text-lg lg:text-xl text-neutral-400 leading-relaxed mb-12 max-w-2xl">
              Des calculateurs gratuits pour vos questions de patrimoine&nbsp;: impôt sur le revenu,
              donation, succession, plus-value immobilière, rente viagère, transmission.
              Basés sur les textes officiels.
              Les calculs se font dans votre navigateur, aucune donnée ne nous parvient.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-16">
              <Link
                href="/calculateurs/fiscalite"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg font-bold transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: '#FFFFFF', color: HOME_BG }}
              >
                <span>Voir les calculateurs</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/methodologie"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg font-bold border-2 transition-colors text-white hover:bg-white/5"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}
              >
                Notre méthode
              </Link>
            </div>
          </div>

          {/* Trust badges */}
          <div className="relative">
            <TrustBadges />
          </div>
        </section>

        {/* ── GALERIE 3D DES CALCULATEURS ──────────────────────── */}
        <GalerieCalculateurs />

        {/* ── COMMENT CA MARCHE ────────────────────────────────── */}
        <HowItWorks />

        {/* ── MANIFESTE ────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 py-24 lg:py-32 text-center">
          <div className="h-[1px] w-20 mx-auto mb-10" style={{ backgroundColor: ACCENT_OR }} />
          <h2
            className="font-sans font-black text-white leading-[1.1] tracking-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Des calculs rigoureux.<br />
            Une décision qui<br />vous appartient.
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed">
            Chaque résultat repose sur les textes officiels en vigueur&nbsp;:
            Code général des impôts, BOFiP, tables de mortalité INSEE 2021.
            Le code source est public et auditable.
            Les données ne quittent pas votre navigateur.
          </p>
          <div className="h-[1px] w-20 mx-auto mt-10" style={{ backgroundColor: ACCENT_OR }} />
        </section>

        {/* ── HISTORIQUE LOCAL ─────────────────────────────────── */}
        <div className="bg-white/[0.02]">
          <SimHistoryWidget />
        </div>

        {/* ── ARTICLES ─────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-20 pb-28">
          <div className="flex items-center gap-6 mb-10">
            <h2
              className="font-sans font-black text-white shrink-0"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.02em' }}
            >
              À lire avant de calculer
            </h2>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          <div className="border-t border-white/10">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col gap-1.5 py-6 border-b border-white/10 hover:bg-white/[0.03] transition-colors px-5"
                style={{ borderLeft: `3px solid ${ACCENT_OR}` }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neutral-500">{article.tag}</span>
                  <span className="font-mono text-xs text-neutral-700">·</span>
                  <span className="font-mono text-xs text-neutral-500">{article.duree} de lecture</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors leading-snug">
                  {article.titre}
                </h3>
                <p className="text-sm text-neutral-400 leading-snug">{article.accroche}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </>
  )
}
