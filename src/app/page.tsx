import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomeHeroWidget from '@/components/HomeHeroWidget'
import SimHistoryWidget from '@/components/SimHistoryWidget'
import { CATEGORIES_CALC } from '@/config/navigation'
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

  alternates: { canonical: 'https://calculpatrimoine.fr' },
}

// Flat list of active calculators for mobile quick-access
const CALCULATEURS_ACTIFS = CATEGORIES_CALC.flatMap(cat =>
  cat.calculateurs.filter(c => c.disponible).map(c => ({ ...c, tag: cat.label }))
)

export default function HomePage() {
  const nbActifs = CATEGORIES_CALC.flatMap(c => c.calculateurs.filter(x => x.disponible)).length

  return (
    <>
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />

      <div style={{ backgroundColor: '#F7F3EC' }}>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 lg:pt-24 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.75fr_1fr] gap-10 lg:gap-16 items-start">

            {/* Colonne gauche - éditoriale */}
            <div>
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-6">
                Calcul patrimonial - France
              </p>

              <div className="h-[2px] w-14 bg-accent-400 mb-8" />

              <h1 className="font-serif text-5xl lg:text-[3.6rem] text-neutral-900 leading-tight tracking-tight mb-6">
                Prenez vos décisions<br />
                avec les bons chiffres.
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed mb-10 max-w-xl">
                Des calculateurs gratuits pour vos questions de patrimoine : impôt sur le revenu, donation, succession,
                plus-value immobilière, rente viagère, transmission. Basés sur les textes officiels (CGI, BOFiP, INSEE).
                Les calculs se font dans votre navigateur, aucune donnée ne nous parvient.
              </p>

              {/* Accès rapide mobile uniquement */}
              <div className="lg:hidden mb-10">
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-3">
                  Accéder à un calculateur
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CALCULATEURS_ACTIFS.map((calc) => (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      className="flex flex-col gap-1 border border-primary-300 px-3 py-3 hover:bg-primary-700 hover:border-primary-700 transition-colors group"
                      style={{ borderLeft: '3px solid #2E4A6F' }}
                    >
                      <span className="font-mono text-xs text-primary-500 group-hover:text-primary-200">
                        {calc.tag}
                      </span>
                      <span className="font-bold text-sm text-neutral-900 group-hover:text-white leading-snug">
                        {calc.nom} →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Trust markers */}
              <div className="flex flex-wrap gap-x-8 gap-y-2.5">
                {[
                  '0 donnée collectée',
                  `${nbActifs} calculateurs actifs`,
                  'Sources : CGI · BOFiP · INSEE',
                  'Code source ouvert',
                ].map(label => (
                  <span key={label} className="font-mono text-xs text-neutral-500">{label}</span>
                ))}
              </div>
            </div>

            {/* Widget desktop uniquement */}
            <div className="hidden lg:block">
              <HomeHeroWidget />
            </div>
          </div>
        </section>

        {/* ── CALCULATEURS PAR CATÉGORIE ───────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="flex items-center gap-6 mb-10">
            <h2 className="font-serif text-3xl text-neutral-900 shrink-0">Les outils</h2>
            <div className="flex-1 h-[1px] bg-neutral-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES_CALC.map((cat) => (
              <div
                key={cat.id}
                className="bg-surface-card border border-neutral-200"
                style={{ boxShadow: '3px 3px 0 #E8E0D0' }}
              >
                {/* En-tête catégorie */}
                <div className="px-5 py-4 border-b border-neutral-100 border-l-4 border-l-primary-700">
                  <p className="font-serif text-base font-bold text-neutral-900">{cat.label}</p>
                  <p className="font-mono text-xs text-neutral-400 mt-0.5">{cat.description}</p>
                </div>

                {/* Calculateurs */}
                <div>
                  {cat.calculateurs.map((calc, i) => (
                    calc.disponible ? (
                      <Link
                        key={calc.href}
                        href={calc.href}
                        className={`group flex items-start gap-4 px-5 py-4 hover:bg-neutral-50 transition-colors ${i < cat.calculateurs.length - 1 ? 'border-b border-neutral-100' : ''}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">
                            {calc.nom}
                          </p>
                          <p className="font-mono text-xs text-neutral-400 leading-relaxed">{calc.desc}</p>
                        </div>
                        <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform shrink-0 mt-0.5">→</span>
                      </Link>
                    ) : (
                      <div
                        key={calc.nom}
                        className={`flex items-start gap-4 px-5 py-4 opacity-40 ${i < cat.calculateurs.length - 1 ? 'border-b border-neutral-100' : ''}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-neutral-500 mb-0.5">{calc.nom}</p>
                          <p className="font-mono text-xs text-neutral-400 leading-relaxed">{calc.desc}</p>
                        </div>
                        <span className="font-mono text-xs text-neutral-400 shrink-0 mt-0.5">Bientôt</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HISTORIQUE LOCAL ─────────────────────────────────── */}
        <SimHistoryWidget />

        {/* ── MANIFESTE ────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto px-6 py-16 lg:py-20 text-center">
          <div className="h-[1px] w-20 bg-accent-400 mx-auto mb-10" />
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight mb-6">
            Des calculs rigoureux.<br />
            Une décision qui vous appartient.
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Chaque résultat repose sur les textes officiels en vigueur :
            Code général des impôts, BOFiP, tables de mortalité INSEE 2021.
            Le code source est public et auditable.
            Les données ne quittent pas votre navigateur.
          </p>
          <div className="h-[1px] w-20 bg-accent-400 mx-auto mt-10" />
        </section>

        {/* ── ARTICLES ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-12 pb-24">
          <div className="flex items-center gap-6 mb-0">
            <h2 className="font-serif text-3xl text-neutral-900 shrink-0">À lire avant de calculer</h2>
            <div className="flex-1 h-[1px] bg-neutral-300" />
          </div>

          <div className="border-t border-neutral-300">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col gap-1.5 py-6 border-b border-neutral-200 hover:bg-surface-card transition-colors px-5"
                style={{ borderLeft: '3px solid #D4AF37' }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neutral-500">{article.tag}</span>
                  <span className="font-mono text-xs text-neutral-300">·</span>
                  <span className="font-mono text-xs text-neutral-500">{article.duree} de lecture</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-700 transition-colors leading-snug">
                  {article.titre}
                </h3>
                <p className="text-sm text-neutral-500 leading-snug">{article.accroche}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </>
  )
}
