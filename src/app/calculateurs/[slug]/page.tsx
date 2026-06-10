// src/app/calculateurs/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CATEGORIES_CALC } from '@/config/navigation'
import { FAQS_BY_CATEGORY } from '@/config/faqs'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CATEGORIES_CALC.map(cat => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = CATEGORIES_CALC.find(c => c.slug === slug)
  if (!cat) return {}
  return {
    title: `${cat.label} - Calculateurs`,
    description: `${cat.description}. Calculateurs gratuits basés sur les textes officiels. Aucune donnée conservée.`,
    alternates: { canonical: `https://calculpatrimoine.fr/calculateurs/${slug}` },
  }
}

export default async function CategorieCalcPage({ params }: Props) {
  const { slug } = await params
  const cat = CATEGORIES_CALC.find(c => c.slug === slug)
  if (!cat) notFound()

  const actifs  = cat.calculateurs.filter(c => c.disponible)
  const bientot = cat.calculateurs.filter(c => !c.disponible)
  const autres  = CATEGORIES_CALC.filter(c => c.slug !== slug)
  const faqs    = FAQS_BY_CATEGORY[slug] ?? []

  return (
    <>
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />

      <div style={{ backgroundColor: '#F7F3EC' }} className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-24">

          {/* Fil d'Ariane */}
          <nav className="font-mono text-xs text-neutral-400 mb-10 flex items-center gap-2">
            <Link href="/" className="hover:text-neutral-700 transition-colors">Accueil</Link>
            <span>·</span>
            <span className="text-neutral-600">{cat.label}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">

            {/* Contenu principal */}
            <div>
              <div className="mb-10">
                <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-4">
                  Calculateurs - {cat.label}
                </p>
                <div className="h-[2px] w-14 bg-accent-400 mb-6" />
                <h1 className="font-serif text-4xl lg:text-5xl text-neutral-900 leading-tight tracking-tight mb-4">
                  {cat.label}
                </h1>
                <p className="text-lg text-neutral-600 leading-relaxed max-w-xl">
                  {cat.description}.
                </p>
              </div>

              {actifs.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-5 mb-6">
                    <h2 className="font-serif text-xl text-neutral-900 shrink-0">Disponibles</h2>
                    <div className="flex-1 h-[1px] bg-neutral-300" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {actifs.map(calc => (
                      <Link
                        key={calc.href}
                        href={calc.href}
                        className="group bg-surface-card border border-neutral-200 hover:border-primary-300 transition-all"
                        style={{ boxShadow: '3px 3px 0 #E8E0D0' }}
                      >
                        <div className="px-5 pt-5 pb-4 border-b border-neutral-100 border-l-4 border-l-primary-700">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-serif font-bold text-neutral-900 group-hover:text-primary-700 transition-colors leading-snug">
                              {calc.nom}
                            </p>
                            <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform shrink-0 mt-0.5">→</span>
                          </div>
                        </div>
                        <div className="px-5 py-4">
                          <p className="font-mono text-xs text-neutral-400 leading-relaxed">{calc.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {bientot.length > 0 && (
                <div>
                  <div className="flex items-center gap-5 mb-6">
                    <h2 className="font-serif text-xl text-neutral-500 shrink-0">À venir</h2>
                    <div className="flex-1 h-[1px] bg-neutral-200" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bientot.map(calc => (
                      <div
                        key={calc.nom}
                        className="bg-surface-card border border-neutral-100 opacity-50"
                        style={{ boxShadow: '2px 2px 0 #EDE9E0' }}
                      >
                        <div className="px-5 pt-5 pb-4 border-b border-neutral-100 border-l-4 border-l-neutral-300">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-serif font-bold text-neutral-500 leading-snug">{calc.nom}</p>
                            <span className="font-mono text-xs text-neutral-400 shrink-0 mt-0.5">Bientôt</span>
                          </div>
                        </div>
                        <div className="px-5 py-4">
                          <p className="font-mono text-xs text-neutral-400 leading-relaxed">{calc.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {faqs.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center gap-5 mb-6">
                    <h2 className="font-serif text-xl text-neutral-900 shrink-0">Questions fréquentes</h2>
                    <div className="flex-1 h-[1px] bg-neutral-300" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {faqs.map(faq => (
                      <Link
                        key={faq.href}
                        href={faq.href}
                        className="group bg-surface-card border border-neutral-200 hover:border-primary-300 transition-all"
                        style={{ boxShadow: '3px 3px 0 #E8E0D0' }}
                      >
                        <div className="px-5 pt-5 pb-4 border-b border-neutral-100 border-l-4 border-l-accent-400">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-serif font-bold text-neutral-900 group-hover:text-primary-700 transition-colors leading-snug">
                              {faq.title}
                            </p>
                            <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform shrink-0 mt-0.5">→</span>
                          </div>
                        </div>
                        <div className="px-5 py-4">
                          <p className="font-mono text-xs text-neutral-400 leading-relaxed">{faq.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-surface-card border border-neutral-200" style={{ boxShadow: '3px 3px 0 #E8E0D0' }}>
                <div className="px-5 py-4 border-b border-neutral-100">
                  <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Autres catégories</p>
                </div>
                <div>
                  {autres.map((c, i) => (
                    <Link
                      key={c.slug}
                      href={`/calculateurs/${c.slug}`}
                      className={`group flex items-center justify-between px-5 py-3.5 hover:bg-neutral-50 transition-colors ${i < autres.length - 1 ? 'border-b border-neutral-100' : ''}`}
                    >
                      <div>
                        <p className="font-bold text-sm text-neutral-800 group-hover:text-primary-700 transition-colors">
                          {c.label}
                        </p>
                        <p className="font-mono text-xs text-neutral-400 mt-0.5">
                          {c.calculateurs.filter(x => x.disponible).length} outil{c.calculateurs.filter(x => x.disponible).length > 1 ? 's' : ''}
                        </p>
                      </div>
                      <span className="font-mono text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all shrink-0">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-5 py-4 border border-neutral-200 bg-surface-card">
                <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                  Tous les calculs s&apos;exécutent dans votre navigateur. Aucune donnée ne nous parvient.
                </p>
                <p className="font-mono text-xs text-neutral-400 mt-2">Sources : CGI · BOFiP · INSEE</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
