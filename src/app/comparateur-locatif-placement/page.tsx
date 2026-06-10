import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const ComparateurLocatifCalculator = dynamic(
  () => import('@/components/Calculator/ComparateurLocatifCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'
import { parseInline } from '@/lib/markdownParser'

export const metadata: Metadata = {
  title: 'Locatif vs placement financier : comparateur 2026',
  description: 'Comparez le rendement net après impôt d\'un investissement locatif (loyers + plus-value) et d\'un placement financier (PEA, AV, CTO) à capital égal et durée égale.',
  alternates: { canonical: 'https://calculpatrimoine.fr/comparateur-locatif-placement' },
}

const LIMITES = [
  '**Pas de crédit immobilier modélisé.** Le calculateur compare un achat comptant à un placement comptant. L\'effet de levier du crédit (intérêts déduits des loyers en régime réel, capital amorti) change radicalement le résultat : non couvert dans cette V1.',
  'Frais d\'acquisition immobilière (notaire ~7-8 %) non modélisés. Sur courte durée, ils peuvent rendre le locatif structurellement perdant.',
  'Surtaxe PV immobilière (> 50 000 €) non calculée. Pour les durées courtes/petits capitaux, impact faible.',
  'Seuil 150 000 € pour PFU réduit en AV non modélisé.',
  'Vacances locatives implicites dans le % de frais : l\'utilisateur doit les intégrer manuellement.',
  'Frais de gestion, courtage, fiscalité du courtier ignorés.',
  'Pas d\'indexation des loyers (taux fixe sur toute la durée).',
]

export default function ComparateurLocatifPage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        ...getPillarBreadcrumb('/comparateur-locatif-placement'),
        { label: 'Locatif vs Placement' },
      ]}
      titre={<>Locatif vs<br />placement financier</>}
      description="Comparez deux stratégies d'investissement à capital égal et durée égale : immobilier locatif
        (loyers nets cumulés + plus-value à la revente) vs placement financier (PEA, assurance-vie, CTO).
        Hypothèses simplificatrices clairement listées : utiliser comme première estimation, pas comme
        décision finale."
      features={[
        'Locatif : micro-foncier ou réel',
        'Placement : PEA / AV / CTO',
        'PV immo avec abattements',
        'Fiscalité sortie par véhicule',
        'Rendement annuel composé',
      ]}
      calculator={<ComparateurLocatifCalculator />}
      currentHref="/comparateur-locatif-placement"
      methodologie={
        <>
          <SourcesSection slug="comparateur-locatif-placement" />

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Limites connues (importantes)</h3>
            <ul className="text-sm text-neutral-600 space-y-1.5">
              {LIMITES.map((l, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-neutral-400 mt-0.5 shrink-0">-</span>
                  <span>{parseInline(l)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l-4 border-amber-300 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-900">
              <strong>Hypothèses simplificatrices.</strong> Ce calculateur est délibérément simple : il
              compare des structures de coût pré-fiscalité plutôt que des situations réelles. Pour
              décider, il faut ajouter : modélisation du crédit, frais d&apos;acquisition réels, vacances
              locatives, fiscalité personnelle complète, valeur de la liberté (l&apos;immobilier est moins
              liquide), inflation, transmission.
            </p>
          </div>
        </>
      }
    />
  )
}
