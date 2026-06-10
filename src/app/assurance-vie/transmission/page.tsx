import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
// PERF: lazy-load → TransmissionCalculator sort du bundle initial (logique métier + recharts)
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const TransmissionCalculator = dynamic(
  () => import('@/components/Calculator/TransmissionCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'


export const metadata: Metadata = {
  title: 'Calculateur Transmission Assurance-Vie : Succession & Bénéficiaires | CalculPatrimoine',
  description: 'Calculez les droits de transmission de votre assurance-vie. Article 990 I (avant 70 ans) et Article 757 B (après 70 ans). Gestion multi-bénéficiaires.',
  keywords: 'transmission assurance vie, succession, bénéficiaires, abattement 152 500, article 990 I, article 757 B, droits succession',
  openGraph: {
    title: 'Calculateur Transmission Assurance-Vie',
    description: 'Simulez les droits de succession sur votre assurance-vie. Calculs conformes au CGI avec gestion multi-bénéficiaires.',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CalculPatrimoine' }],
  },
  alternates: { canonical: 'https://calculpatrimoine.fr/assurance-vie/transmission' },
}

export default function TransmissionPage() {
  return (
    <>
      <CalculateurPageLayout
      breadcrumb={[
        ...getPillarBreadcrumb('/assurance-vie/transmission'),
        { href: '/assurance-vie', label: 'Assurance-Vie' },
        { label: 'Transmission' },
      ]}
      titre={<>Calculateur Transmission<br />Assurance-Vie</>}
      description="Simulez les droits de succession sur votre assurance-vie. Prend en compte les versements
        avant et après 70 ans, les abattements par bénéficiaire, et la répartition entre héritiers."
      features={['Article 990 I (avant 70 ans)', 'Article 757 B (après 70 ans)', 'Jusqu\'à 6 bénéficiaires', 'Zéro donnée conservée']}
      calculator={<TransmissionCalculator />}
      currentHref="/assurance-vie/transmission"
      methodologie={
        <>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Abattements et taux 2026</h3>
            <div className="bg-neutral-50 border border-neutral-200 p-5 grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div>
                <p className="font-bold text-neutral-900 mb-1">Article 990 I (avant 70 ans)</p>
                <p className="text-neutral-600">Abattement : 152 500 € par bénéficiaire</p>
                <p className="text-neutral-600">Taux : 20 % puis 31,25 % (seuil 700 000 €)</p>
              </div>
              <div>
                <p className="font-bold text-neutral-900 mb-1">Article 757 B (après 70 ans)</p>
                <p className="text-neutral-600">Abattement : 30 500 € global partagé</p>
                <p className="text-neutral-600">Taux : barème succession classique</p>
              </div>
              <div>
                <p className="font-bold text-neutral-900 mb-1">Conjoint / PACS</p>
                <p className="text-neutral-600">Exonération totale (Loi TEPA 2007)</p>
              </div>
              <div>
                <p className="font-bold text-neutral-900 mb-1">Plus-values après 70 ans</p>
                <p className="text-neutral-600">Totalement exonérées</p>
              </div>
            </div>
          </div>

          <SourcesSection slug="assurance-vie/transmission" />

          <div className="border-l-4 border-primary-200 bg-primary-50 px-4 py-3">
            <p className="text-sm text-primary-800">
              Barèmes et abattements 2026 (Art. 990 I et 757 B CGI). Dernière vérification des sources : avril 2026.
            </p>
          </div>
        </>
      }
    >

      {/* Explications */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white border border-neutral-200 p-8 space-y-5">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Deux régimes selon l&apos;âge des versements</h2>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              <strong>Deux régimes selon l&apos;âge des versements.</strong>{' '}
              Quand vous transmettez une assurance-vie à votre décès, les impôts dus par vos héritiers
              dépendent d&apos;une règle simple : l&apos;argent versé avant 70 ans n&apos;est pas traité
              comme l&apos;argent versé après. Deux régimes, deux calculs.
            </p>
            <p>
              <strong>Article 990 I - versements avant 70 ans.</strong>{' '}
              Abattement de 152 500 € par bénéficiaire (non partagé).
              Au-delà : 20 % jusqu&apos;à 700 000 €, puis 31,25 % au-delà.
            </p>
            <p>
              <strong>Article 757 B - versements après 70 ans.</strong>{' '}
              Abattement global de 30 500 € partagé entre tous les bénéficiaires (sauf conjoint).
              Les gains réalisés sur le contrat (intérêts, valorisation) ne sont pas imposés à la succession. Seul l&apos;argent versé après vos 70 ans entre dans le calcul.
              Au-delà de l&apos;abattement : les droits de succession habituels s&apos;appliquent selon le lien de parenté et le montant reçu.
            </p>
            <p>
              <strong>Conjoint et PACS totalement exonérés.</strong>{' '}
              Grâce à la loi TEPA 2007, le conjoint survivant ou partenaire de PACS est
              totalement exonéré de droits, quel que soit le montant transmis.
            </p>
          </div>
        </div>
      </section>

      {/* Liens croisés */}
      <section className="max-w-4xl mx-auto px-6 pb-8">
        <div className="border-t border-neutral-300">
          <Link
            href="/assurance-vie/fiscalite-rachat"
            className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
            style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
          >
            <div>
              <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">Vous voulez retirer de l&apos;argent de votre contrat ?</p>
              <p className="text-sm text-neutral-500">Calculateur de fiscalité des rachats - comparaison automatique PFU vs IR.</p>
            </div>
            <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
          </Link>
          <Link
            href="/faq/transmission"
            className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
            style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
          >
            <div>
              <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">FAQ Transmission Assurance-Vie</p>
              <p className="text-sm text-neutral-500">Article 990 I, 757 B, clause bénéficiaire, abattements - toutes vos questions.</p>
            </div>
            <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
          </Link>
        </div>
      </section>

    </CalculateurPageLayout>
    </>
  )
}
