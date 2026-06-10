import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const CsgRetraiteCalculator = dynamic(
  () => import('@/components/Calculator/CsgRetraiteCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'

export const metadata: Metadata = {
  title: 'CSG / CRDS sur pension de retraite : taux 2026',
  description: 'Déterminez le taux CSG applicable sur votre pension de retraite (exonéré / 4,3 % / 7,4 % / 9,1 %) selon votre RFR et votre nombre de parts fiscales.',
  alternates: { canonical: 'https://calculpatrimoine.fr/csg-csds-retraite' },
}

const LIMITES = [
  'Le RFR à saisir est celui de l\'année N-2 (= RFR 2024 pour la CSG 2026). C\'est la règle légale, qui crée un décalage temporel.',
  'Le calculateur applique le barème 2026 standard. La règle de bascule de taux après 2 années consécutives de changement (anti-effet de seuil) n\'est pas modélisée : un retraité juste au-dessus d\'un seuil pendant 1 an conserve son ancien taux.',
  'Les majorations de demi-parts supplémentaires sont appliquées via les majorations standards. Les cas particuliers (parent isolé, invalidité, etc.) peuvent légèrement modifier les seuils.',
  'Les revenus de remplacement autres que les pensions (allocations chômage) suivent des règles voisines mais distinctes. Non couvert ici.',
  'Le calculateur ne traite pas l\'abattement spécifique de 10 % sur les pensions pour l\'IR : il porte uniquement sur la CSG/CRDS/CASA.',
]

export default function CsgRetraitePage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        ...getPillarBreadcrumb('/csg-csds-retraite'),
        { label: 'CSG retraite' },
      ]}
      titre={<>CSG / CRDS<br />sur pension de retraite</>}
      description="Déterminez le taux CSG applicable à votre pension de retraite selon votre revenu fiscal
        de référence (RFR) et votre nombre de parts fiscales. Quatre paliers : exonéré (0 %), réduit (4,3 %),
        médian (7,4 %), normal (9,1 %). Barème 2026 (Art. L. 136-8 CSS)."
      features={[
        '4 paliers RFR',
        'Seuils ajustés par parts',
        'CSG + CRDS + CASA',
        'Optimisations RFR',
      ]}
      calculator={<CsgRetraiteCalculator />}
      currentHref="/csg-csds-retraite"
      methodologie={
        <>
          <SourcesSection slug="csg-csds-retraite" />

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">
              Barème CSG 2026 : pensions de retraite (Art. L. 136-8 CSS)
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-300">
                  <th className="text-left py-2 text-neutral-500 font-mono text-xs">Palier</th>
                  <th className="text-right py-2 text-neutral-500 font-mono text-xs">CSG</th>
                  <th className="text-right py-2 text-neutral-500 font-mono text-xs">CRDS</th>
                  <th className="text-right py-2 text-neutral-500 font-mono text-xs">CASA</th>
                  <th className="text-right py-2 text-neutral-500 font-mono text-xs">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr><td className="py-2">Exonéré</td><td className="text-right">0 %</td><td className="text-right">0 %</td><td className="text-right">0 %</td><td className="text-right font-bold">0 %</td></tr>
                <tr><td className="py-2">Réduit</td><td className="text-right">3,8 %</td><td className="text-right">0,5 %</td><td className="text-right">-</td><td className="text-right font-bold">4,3 %</td></tr>
                <tr><td className="py-2">Médian</td><td className="text-right">6,6 %</td><td className="text-right">0,5 %</td><td className="text-right">0,3 %</td><td className="text-right font-bold">7,4 %</td></tr>
                <tr><td className="py-2">Normal</td><td className="text-right">8,3 %</td><td className="text-right">0,5 %</td><td className="text-right">0,3 %</td><td className="text-right font-bold">9,1 %</td></tr>
              </tbody>
            </table>
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
              Barème 2026, seuils RFR pour 1 part : exonération &lt; 12 230 €, réduit &lt; 15 988 €,
              médian &lt; 24 813 €. Sources : Art. L. 136-8 et L. 136-1-2 CSS, Art. 1417 CGI (RFR).
            </p>
          </div>
        </>
      }
    />
  )
}
