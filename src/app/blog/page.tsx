import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog - CalculPatrimoine',
  description: 'Articles sur la fiscalité du patrimoine, les calculs actuariels, et la finance personnelle. Mécanismes exacts, exemples chiffrés, sources officielles.',
  alternates: { canonical: 'https://calculpatrimoine.fr/blog' },
}

const ARTICLES = [
  {
    slug: 'tmi-tranche-marginale-comprendre',
    titre: 'TMI : à quoi sert votre tranche marginale en 2026',
    extrait: 'Votre TMI n\'est pas le taux que vous payez. Comment elle se calcule, à quoi elle sert pour le PER, l\'assurance-vie, et l\'épargne en général.',
    date: '2026-06-02',
    duree: '12 min',
    tag: 'Fiscalité',
  },
  {
    slug: 'per-individuel-deduction-fiscalite',
    titre: 'PER individuel : ce que vous gagnez à l\'entrée, ce que vous payez à la sortie',
    extrait: 'Déduction fiscale, plafond épargne retraite, fiscalité des retraits en capital ou en rente. Les mécanismes exacts, avec formules et comparaison PER vs assurance-vie.',
    date: '2026-05-05',
    duree: '12 min',
    tag: 'Fiscalité',
  },
  {
    slug: 'assurance-vie-fiscalite-rachat',
    titre: 'Assurance-vie : combien vous allez vraiment payer sur un rachat',
    extrait: 'Règle proportionnelle, abattement 8 ans, PFU vs IR, date du 27 septembre 2017. Guide complet avec exemples chiffrés et formules détaillées.',
    date: '2026-04-18',
    duree: '11 min',
    tag: 'Fiscalité',
  },
  {
    slug: 'rente-viagere-seuil-rentabilite',
    titre: 'Pourquoi le seuil de rentabilité est après votre espérance de vie',
    extrait: 'À 72 ans avec 250 000 €, le seuil tombe à 15,8 ans alors que l\'espérance est de 14 ans. Découvrez pourquoi c\'est normal.',
    date: '2026-04-16',
    duree: '15 min',
    tag: 'Rente viagère',
  },
]

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
