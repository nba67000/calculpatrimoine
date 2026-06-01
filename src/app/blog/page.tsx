import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ARTICLES } from '@/lib/blog/articles'

export const metadata: Metadata = {
  title: 'Blog - CalculPatrimoine',
  description: 'Articles sur la fiscalité du patrimoine, les calculs actuariels, et la finance personnelle. Mécanismes exacts, exemples chiffrés, sources officielles.',
  alternates: { canonical: 'https://calculpatrimoine.fr/blog' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogIndex() {
  return (
    <>
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />
      <div style={{ backgroundColor: '#F7F3EC' }}>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8">
            <Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-neutral-600">Blog</span>
          </nav>

          <div className="h-[2px] w-10 bg-accent-400 mb-6" />

          <h1 className="font-serif text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            Blog CalculPatrimoine
          </h1>

          <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Mécanismes fiscaux, exemples chiffrés, sources officielles.
            Pour comprendre avant de calculer.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex items-center gap-6 mb-0">
            <h2 className="font-serif text-2xl text-neutral-900 shrink-0">Articles</h2>
            <div className="flex-1 h-[1px] bg-neutral-300" />
          </div>

          <div className="border-t border-neutral-300">
            {ARTICLES.map(article => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex flex-col gap-2 py-7 border-b border-neutral-200 hover:bg-surface-card transition-colors px-5"
                style={{ borderLeft: '3px solid #D4AF37' }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neutral-500 border border-neutral-300 px-2 py-0.5 bg-surface-card">
                    {article.tag}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">{article.duree} de lecture</span>
                  <span className="font-mono text-xs text-neutral-300">·</span>
                  <span className="font-mono text-xs text-neutral-400">{formatDate(article.date)}</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-700 transition-colors leading-snug">
                  {article.titre}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed max-w-2xl">
                  {article.extrait}
                </p>
                <span className="font-mono text-xs text-primary-600 group-hover:translate-x-1 transition-transform mt-1">
                  Lire l&apos;article →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
