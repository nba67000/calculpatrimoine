import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const SciRegimeCalculator = dynamic(
  () => import('@/components/Calculator/SciRegimeCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'
import { parseInline } from '@/lib/markdownParser'

export const metadata: Metadata = {
  title: 'SCI à l\'IS vs à l\'IR : comparateur fiscal 2026',
  description: 'Compare l\'impôt annuel d\'une SCI à l\'IR (revenus fonciers) et à l\'IS (bénéfice taxé 15 % puis 25 %, amortissements déductibles).',
  alternates: { canonical: 'https://calculpatrimoine.fr/sci-is-vs-ir' },
}

const LIMITES = [
  '**Pas de calcul sortie inclus.** Ce calculateur ne traite que l\'impôt annuel. À la sortie (vente du bien) : SCI IR → PV particulier (abattements 5-22 ans, exo 22 ans IR / 30 ans PS) ; SCI IS → PV pro (réintégration des amortissements, taxée au taux IS sans abattement). Pour un projet long terme, faire le calcul sortie incluse.',
  'L\'option pour l\'IS est définitive depuis la LF 2019 : retour à l\'IR impossible une fois la SCI à l\'IS. Réflexion à long terme requise.',
  'Frais comptables IS (~1 500-2 500 €/an obligatoires) non modélisés.',
  'Distribution de dividendes non modélisée (hypothèse : réinvestissement total). Les dividendes seraient taxés au PFU 30 % au-delà.',
  'Taux IS réduit 15 % conditionné : SCI considérée comme PME (CA < 10 M€, capital entièrement libéré, détention 75 % personnes physiques).',
  'Déficit foncier (IR) imputable sur revenu global jusqu\'à 10 700 €/an (hors intérêts) non détaillé.',
]

export default function SciRegimePage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        ...getPillarBreadcrumb('/sci-is-vs-ir'),
        { label: 'SCI IS vs IR' },
      ]}
      titre={<>SCI<br />à l&apos;IS vs à l&apos;IR</>}
      description="Comparez l'impôt annuel d'une SCI translucide (revenus fonciers à l'IR + PS) et d'une SCI ayant
        opté à l'IS (bénéfice après amortissements, taxé 15 % jusqu'à 42 500 € puis 25 %). Calculateur V1
        simplifié. Sortie non couverte, voir Limites."
      features={[
        'IR : revenus fonciers + PS',
        'IS : 15 % puis 25 %',
        'Amortissements déductibles IS',
        'Cumul sur durée projet',
      ]}
      calculator={<SciRegimeCalculator />}
      currentHref="/sci-is-vs-ir"
      methodologie={
        <>
          <SourcesSection slug="sci-is-vs-ir" />

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
              <strong>Décision casse-gueule.</strong> Le choix IS/IR engage la SCI sur toute sa durée
              et peut être contre-intuitif : l&apos;IS donne souvent un impôt annuel plus bas mais une
              fiscalité de sortie pénalisante (PV pro avec réintégration des amortissements). Pour
              un projet locatif long terme avec revente, l&apos;IR reste souvent gagnant globalement.
              Consulter un expert-comptable avant de décider.
            </p>
          </div>
        </>
      }
    />
  )
}
