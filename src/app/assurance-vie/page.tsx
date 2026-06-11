import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Calculateurs Assurance-Vie : Fiscalité Rachat & Transmission',
  description: 'Deux calculateurs gratuits pour l\'assurance-vie : fiscalité des rachats (PFU vs IR) et transmission aux bénéficiaires. Calculs conformes au CGI.',
  keywords: 'assurance vie, calculateur, fiscalité rachat, transmission succession, PFU, IR, bénéficiaires, abattement',
  openGraph: {
    title: 'Calculateurs Assurance-Vie - Fiscalité & Transmission',
    description: 'Deux calculateurs gratuits : fiscalité des rachats et transmission aux bénéficiaires. Calculs officiels conformes au CGI.',
    type: 'website',
  },
  alternates: { canonical: 'https://calculpatrimoine.fr/assurance-vie' },
}

const CALCULATEURS = [
  {
    href: '/assurance-vie/fiscalite-rachat',
    nom: 'Fiscalité Rachat',
    tag: 'Impôt',
    question: 'Combien allez-vous payer sur votre retrait ?',
    desc: 'Simulez l\'impôt dû sur un rachat partiel ou total. Comparez PFU (30 %) et IR + PS selon votre tranche d\'imposition.',
    points: ['Règle proportionnelle automatique', 'Abattement 8 ans (4 600 € / 9 200 €)', 'Versements avant 27/09/2017', 'Comparaison PFU vs IR'],
  },
  {
    href: '/assurance-vie/transmission',
    nom: 'Transmission',
    tag: 'Succession',
    question: 'Combien vos bénéficiaires vont-ils recevoir ?',
    desc: 'Simulez les droits de succession sur votre assurance-vie. Gérez plusieurs bénéficiaires avec abattements avant et après 70 ans.',
    points: ['Article 990 I (abattement 152 500 €)', 'Article 757 B (abattement 30 500 €)', 'Jusqu\'à 6 bénéficiaires', 'Comparaison succession classique'],
  },
]

export default function AssuranceVieHubPage() {
  return (
    <>
      <Header />

      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { label: 'Assurance-Vie' },
        ]}
        eyebrow="Assurance-vie · 2026"
        titre={<>Calculateurs<br />Assurance-Vie</>}
        description="Deux outils gratuits pour anticiper votre fiscalité et votre transmission. Calculs conformes au Code Général des Impôts, aucune donnée conservée."
        features={['Conforme CGI 2026', 'Code source ouvert', 'Zéro donnée conservée', '100 % gratuit']}
      />

      <div style={{ backgroundColor: '#F7F3EC' }}>


        {/* 2 Calculateurs - table-style */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-6 mb-0">
            <h2 className="font-serif text-2xl text-neutral-900 shrink-0">Les deux calculateurs</h2>
            <div className="flex-1 h-[1px] bg-neutral-300" />
          </div>

          <div className="border-t border-neutral-300 mt-0">
            {CALCULATEURS.map(calc => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group block border-b border-neutral-200 hover:bg-white transition-colors py-8 pr-6"
                style={{ borderLeft: '3px solid #2E4A6F', paddingLeft: '1.25rem' }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-neutral-700 border border-neutral-300 px-2 py-0.5 bg-white">
                        {calc.tag}
                      </span>
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-neutral-900 transition-colors">
                        {calc.nom}
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-500 italic mb-4">{calc.question}</p>
                    <p className="text-neutral-600 mb-4 leading-relaxed max-w-2xl">{calc.desc}</p>
                    <ul className="flex flex-wrap gap-x-6 gap-y-1">
                      {calc.points.map(p => (
                        <li key={p} className="font-mono text-xs text-neutral-500">{p}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="font-mono text-neutral-500 group-hover:translate-x-1 transition-transform mt-1 shrink-0 text-lg">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Info pédagogique */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white border border-neutral-200 p-8 space-y-5">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">
              Rachat ou transmission : deux fiscalités séparées
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              Un même contrat d&apos;assurance-vie déclenche deux régimes fiscaux distincts selon ce que vous en faites.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              <strong>Le calculateur Fiscalité Rachat</strong> traite ce qui se passe quand vous retirez de l&apos;argent
              de votre vivant : seule la part de plus-value contenue dans le rachat est imposée, au PFU (30 %)
              ou à l&apos;IR + prélèvements sociaux selon votre choix, avec un abattement de 4 600 € (9 200 € en couple)
              après 8 ans de détention.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              <strong>Le calculateur Transmission</strong> traite ce que reçoivent vos bénéficiaires à votre décès.
              L&apos;assurance-vie échappe à la succession classique et suit ses propres règles
              (Art. 990 I et 757 B CGI). Ce qui compte : votre âge au moment des versements, pas votre âge au décès.
              Versé avant 70 ans = abattement de 152 500 € par bénéficiaire. Versé après 70 ans = abattement
              de 30 500 € à partager entre tous.
            </p>
          </div>
        </section>

        {/* Article lié */}
        <section className="max-w-4xl mx-auto px-6 pb-16">
          <div className="border-t border-neutral-300">
            {[
              { href: '/blog/assurance-vie-fiscalite-rachat', label: 'Article complet - Assurance-vie, combien allez-vous vraiment payer ?', desc: 'Mécanismes fiscaux, règle proportionnelle, optimisations. Guide complet avec exemples chiffrés.' },
              { href: '/faq/assurance-vie', label: 'FAQ assurance-vie', desc: '15 questions/réponses sur la fiscalité, les abattements, les optimisations et la transmission.' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
                style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
              >
                <div>
                  <p className="font-bold text-neutral-900 group-hover:text-neutral-900 transition-colors mb-0.5">{link.label}</p>
                  <p className="text-sm text-neutral-500">{link.desc}</p>
                </div>
                <span className="font-mono text-neutral-500 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outils indicatifs uniquement. Ne constituent pas un conseil fiscal ou patrimonial personnalisé.{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline">Code source ouvert</a>
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}
