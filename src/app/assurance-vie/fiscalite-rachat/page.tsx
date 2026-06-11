import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
// PERF: lazy-load → AssuranceVieCalculator sort du bundle initial (logique métier + recharts)
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const AssuranceVieCalculator = dynamic(
  () => import('@/components/Calculator/AssuranceVieCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'


export const metadata: Metadata = {
  title: 'Calculateur Assurance-Vie : Fiscalité Rachat PFU vs IR',
  description: 'Calculez la fiscalité exacte de votre rachat d\'assurance-vie. Comparez PFU et IR selon votre TMI. Simulateur gratuit conforme au CGI, zéro donnée conservée.',
  keywords: 'assurance vie, fiscalité rachat, PFU, flat tax, IR, impôts, simulation, calculateur gratuit, abattement 8 ans',
  openGraph: {
    title: 'Calculateur Fiscalité Assurance-Vie - PFU vs IR',
    description: 'Calculez combien vous allez payer en impôts sur votre rachat d\'assurance-vie.',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CalculPatrimoine' }],
  },
  alternates: { canonical: 'https://calculpatrimoine.fr/assurance-vie/fiscalite-rachat' },
}

const CROSS_LINKS = [
  { href: '/assurance-vie/transmission', label: 'Vous préparez votre succession ?', desc: 'Calculateur de transmission - droits de succession avant et après 70 ans.' },
  { href: '/blog/assurance-vie-fiscalite-rachat', label: 'Article complet - Assurance-vie, combien allez-vous vraiment payer ?', desc: 'Mécanismes fiscaux, 5 erreurs courantes, optimisations. 2 500 mots pour tout comprendre.' },
  { href: '/faq/assurance-vie', label: 'FAQ assurance-vie', desc: '15 questions/réponses : PFU vs IR, abattement 8 ans, versements avant 2017, optimisations.' },
]

export default function AssuranceViePage() {
  return (
    <>
      <CalculateurPageLayout
      breadcrumb={[
        ...getPillarBreadcrumb('/assurance-vie/fiscalite-rachat'),
        { href: '/assurance-vie', label: 'Assurance-Vie' },
        { label: 'Fiscalité Rachat' },
      ]}
      titre={<>Calculateur Fiscalité<br />Rachat Assurance-Vie</>}
      description="Calculez la fiscalité exacte de votre rachat partiel d'assurance-vie.
        Comparez PFU (flat tax) et IR selon votre tranche d'imposition."
      features={['Calculs officiels (CGI)', 'Règle des 8 ans appliquée', 'Versements avant 2017', 'Zéro donnée conservée']}
      calculator={<AssuranceVieCalculator />}
      currentHref="/assurance-vie/fiscalite-rachat"
      methodologie={
        <>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Formules de calcul</h3>
            <div className="bg-neutral-50 border border-neutral-200 p-5 grid md:grid-cols-2 gap-x-8 gap-y-3">
              {[
                ['Plus-value dans le rachat', 'Montant rachat × (PV totale ÷ Capital total)'],
                ['Abattement (si > 8 ans)', '4 600 € (seul) ou 9 200 € (couple)'],
                ['PFU versements après 27/09/2017', '12,8 % IR + 17,2 % PS = 30 %'],
                ['PFU versements avant 27/09/2017', '7,5 % IR + 17,2 % PS = 24,7 %'],
                ['IR + Prélèvements sociaux', 'TMI utilisateur + 17,2 %'],
                ['Option retenue', 'min(totalPFU, totalIR)'],
              ].map(([label, val]) => (
                <div key={label} className="font-mono">
                  <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
                  <p className="text-xs text-neutral-700">{val}</p>
                </div>
              ))}
            </div>
          </div>

          <SourcesSection slug="assurance-vie/fiscalite-rachat" />

          <div className="border-l-4 border-primary-200 bg-primary-50 px-4 py-3">
            <p className="text-sm text-primary-800">
              Taux et abattements applicables aux rachats 2026 (Art. 125-0 A CGI). Dernière vérification des sources : avril 2026.
            </p>
          </div>
        </>
      }
    >

      {/* Explications */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white border border-neutral-200 p-8 space-y-5">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Ce qui détermine l&apos;impôt sur un rachat</h2>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              <strong>On taxe la plus-value, pas le capital.</strong>{' '}
              Si vous avez versé 70 000 € et que votre contrat vaut 100 000 €,
              seuls les 30 000 € de plus-value sont imposables, répartis proportionnellement dans votre rachat.
            </p>
            <p>
              <strong>L&apos;âge du contrat change tout.</strong>{' '}
              Contrat de moins de 8 ans : pas d&apos;abattement.
              Contrat de plus de 8 ans : abattement de 4 600 € (9 200 € en couple) par an sur la plus-value.
            </p>
            <p>
              <strong>Vous avez le choix entre PFU et IR.</strong>{' '}
              PFU (Flat Tax) : taux fixe de 30 % (12,8 % IR + 17,2 % PS).
              IR + PS : votre TMI + 17,2 % de prélèvements sociaux.
            </p>
            <p>
              <strong>Versements avant le 27/09/2017.</strong>{' '}
              Les versements effectués avant cette date bénéficient d&apos;un taux réduit de 24,7 %
              (7,5 % IR + 17,2 % PS) au lieu de 30 %.
            </p>
          </div>
        </div>
      </section>

      {/* Liens croisés */}
      <section className="max-w-4xl mx-auto px-6 pb-8">
        <div className="border-t border-neutral-300">
          {CROSS_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
              style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
            >
              <div>
                <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">{link.label}</p>
                <p className="text-sm text-neutral-500">{link.desc}</p>
              </div>
              <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
            </Link>
          ))}
        </div>
      </section>

    </CalculateurPageLayout>
    </>
  )
}
