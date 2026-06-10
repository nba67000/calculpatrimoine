import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
// PERF: lazy-load → PERCalculator sort du bundle initial (logique métier + recharts)
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const PERCalculator = dynamic(
  () => import('@/components/Calculator/PERCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'


export const metadata: Metadata = {
  title: 'Simulateur PER individuel - économie d\'impôt',
  description: 'Calculez l\'économie d\'impôt réalisée en versant sur un PER individuel. Plafond de déduction 2026, report 5 ans (LF 2026), TMI. Barème officiel, gratuit et open-source.',
  keywords: 'PER individuel, plan épargne retraite, économie impôt, plafond déduction, TMI, versement PER, fiscalité PER, simulateur PER 2026',
  openGraph: {
    title: 'Simulateur PER individuel - économie d\'impôt sur versement',
    description: 'Calculez votre économie d\'impôt sur un versement PER individuel. Plafond 2026, report des plafonds N-1 à N-5 (LF 2026).',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CalculPatrimoine' }],
  },

  alternates: { canonical: 'https://calculpatrimoine.fr/per-individuel' },
}

const BAREMES = [
  { param: 'PASS 2025', valeur: '47 100 €', base: 'Décret nov. 2024' },
  { param: 'Plafond PER maximum', valeur: '37 680 €', base: '10 % × 8 × PASS' },
  { param: 'Plafond PER minimum', valeur: '4 710 €', base: '10 % × 1 × PASS' },
  { param: 'Abattement frais pro (min)', valeur: '509 €', base: 'Art. 83 CGI' },
  { param: 'Abattement frais pro (max)', valeur: '14 555 €', base: 'Art. 83 CGI' },
]

const EXEMPLES = [
  {
    titre: 'Salarié, 60 000 € / an, TMI 30 %, versement 3 000 €',
    detail: 'Abattement 10 % = 6 000 € · Revenu net professionnel = 54 000 € · Plafond annuel = 5 400 € · Montant déductible = 3 000 € · Économie : 900 € · Coût net réel : 2 100 €',
  },
  {
    titre: 'Salarié, 50 000 € / an, TMI 30 %, versement 5 000 € (dépassement)',
    detail: 'Revenu net = 45 000 € · 10 % × 45 000 = 4 500 € < 4 710 € (minimum) · Plafond = 4 710 € · Part déductible = 4 710 € · Économie : 1 413 € · Part non déductible : 290 €',
  },
  {
    titre: 'Salarié, 50 000 € / an, TMI 41 %, versement 10 000 €, report N-1 = 3 000 €',
    detail: 'Plafond annuel = 4 710 € · Report N-1 = 3 000 € · Plafond total = 7 710 € · Montant déductible = 7 710 € · Économie : 3 161 € · Coût net réel : 6 839 €',
  },
]

const LIMITES = [
  'Ce calculateur couvre uniquement le PER individuel souscrit à titre personnel (ex-PERP, dit PERIN). Les PER d\'entreprise (PERCOL, PERO) et les contrats pour travailleurs indépendants (ex-Madelin) ne sont pas couverts : leurs règles de plafond diffèrent (Art. 154 bis CGI).',
  'Le partage du plafond de déduction entre conjoints ou partenaires de PACS n\'est pas simulé.',
  'La fiscalité à la sortie (imposition de la rente ou du capital) n\'est pas simulée.',
  'Il est supposé que les frais professionnels sont couverts par l\'abattement forfaitaire. Les frais réels ne sont pas gérés.',
]

export default function PERIndividuelPage() {
  return (
    <>
      <CalculateurPageLayout
      breadcrumb={[...getPillarBreadcrumb('/per-individuel'), { label: 'PER individuel - économie d\'impôt' }]}
      titre={<>Simulateur PER individuel<br />Économie d&apos;impôt sur versement</>}
      description="Versez sur votre PER, voyez l'impôt économisé cette année. Plafond 2026 calculé,
        années non consommées reportables sur les 5 années suivantes (LF 2026), coût net du versement
        après économie d'impôt."
      features={['Art. 163 quatervicies CGI', 'PASS 2025 - plafonds 2026', 'Report plafonds N-1 à N-5 (LF 2026)', 'Zéro donnée conservée']}
      calculator={<PERCalculator />}
      currentHref="/per-individuel"
      methodologie={
        <>
          <SourcesSection slug="per-individuel" />

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Barèmes vérifiés - 2026</h3>
            <div className="bg-neutral-50 border border-neutral-200 p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 text-neutral-500 font-mono text-xs">Paramètre</th>
                    <th className="text-right py-2 text-neutral-500 font-mono text-xs">Valeur 2026</th>
                    <th className="text-right py-2 text-neutral-500 font-mono text-xs hidden sm:table-cell">Base</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-700">
                  {BAREMES.map(b => (
                    <tr key={b.param}>
                      <td className="py-2">{b.param}</td>
                      <td className="py-2 text-right font-medium font-mono">{b.valeur}</td>
                      <td className="py-2 text-right text-neutral-400 text-xs hidden sm:table-cell">{b.base}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="font-mono text-xs text-neutral-400 mt-3">Dernière vérification : 1er mai 2026 - service-public.gouv.fr</p>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Limites connues</h3>
            <ul className="text-sm text-neutral-600 space-y-1.5">
              {LIMITES.map((l, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-neutral-400 mt-0.5 shrink-0">-</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l-4 border-primary-200 bg-primary-50 px-4 py-3">
            <p className="text-sm text-primary-800">
              Plafonds et seuils 2026 (PASS 2025, Art. 163 quatervicies CGI). Dernière vérification des sources : 1er mai 2026.
            </p>
          </div>
        </>
      }
    >

      {/* Lien TMI */}
      <div className="max-w-4xl mx-auto px-6 pb-4">
        <div className="bg-white border border-neutral-200 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-800 mb-0.5">Vous ne connaissez pas votre TMI ?</p>
              <p className="text-sm text-neutral-500">Calculez votre tranche marginale d&apos;imposition à partir de votre revenu net imposable.</p>
            </div>
            <Link href="/tmi" className="font-mono text-xs text-primary-600 border border-primary-300 px-3 py-2 hover:bg-primary-600 hover:text-white transition-colors shrink-0 ml-4">
              Calculateur TMI →
            </Link>
          </div>
        </div>
      </div>

      {/* Explications */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white border border-neutral-200 p-8 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">
            Comment fonctionne la déduction PER ?
          </h2>

          <div className="space-y-5 text-neutral-700 leading-relaxed">
            <div>
              <h3 className="font-bold text-neutral-900 mb-2">Un versement qui réduit votre revenu imposable</h3>
              <p>
                Un versement volontaire sur un PER individuel vient en déduction de votre revenu
                imposable (Art. 163 quatervicies CGI). Si vous versez 5 000 € et que votre TMI
                est de 30 %, votre impôt diminue de 1 500 €.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-neutral-900 mb-2">Le plafond de déduction pour les salariés</h3>
              <p>
                Ce que vous pouvez déduire est plafonné à 10 % de votre salaire brut de l&apos;an dernier
                (après déduction des frais professionnels). Pour 2026, ce plafond ne peut pas être
                inférieur à 4 710 € ni supérieur à 37 680 €.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-neutral-900 mb-2">Le report des plafonds non utilisés</h3>
              <p>
                Si vous n&apos;avez pas versé jusqu&apos;au plafond les années précédentes, vous
                pouvez rattraper ce manque sur les 5 années suivantes
                (Art. 163 quatervicies I b) CGI, modifié par LF 2026 art. 10 - auparavant 3 ans).
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Formule de calcul</h3>
              <div className="text-sm text-neutral-700 space-y-1 font-mono">
                <p>abattement = max(509 €, min(salaire × 10 %, 14 555 €))</p>
                <p>revenu net professionnel = salaire − abattement</p>
                <p>plafond annuel = max(4 710 €, min(revenu × 10 %, 37 680 €))</p>
                <p>plafond total = plafond annuel + reports N-1 + N-2 + N-3 + N-4 + N-5</p>
                <p>économie d&apos;impôt = min(versement, plafond total) × TMI</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-neutral-900 mb-4">Exemples chiffrés</h2>
            <div className="space-y-3">
              {EXEMPLES.map(ex => (
                <div key={ex.titre} className="bg-neutral-50 border border-neutral-200 p-5">
                  <p className="font-bold text-neutral-900 text-sm mb-2">{ex.titre}</p>
                  <p className="text-sm text-neutral-700 font-mono leading-relaxed">{ex.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ cross-link */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="border-t border-neutral-300">
          <Link
            href="/faq/per"
            className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
            style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
          >
            <div>
              <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">FAQ PER Individuel</p>
              <p className="text-sm text-neutral-500">Plafonds 2026, report N-1 à N-5 (LF 2026), sortie en capital ou rente, stratégies.</p>
            </div>
            <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
          </Link>
        </div>
      </section>

    </CalculateurPageLayout>
    </>
  )
}
