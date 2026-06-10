import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const PerSortieCalculator = dynamic(
  () => import('@/components/Calculator/PerSortieCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import MethodologieSection from '@/components/MethodologieSection'

export const metadata: Metadata = {
  title: 'PER Sortie : capital vs rente. Calculateur fiscalité 2026',
  description: 'Comparez la fiscalité de sortie de votre PER : capital (versements à l\'IR + gains au PFU 30 %) vs rente (Art. 158-5° bis CGI, abattement 10 %, PS retraités).',
  keywords: 'per sortie, capital ou rente, fiscalité PER retraite, art 158 5 bis CGI, PFU PER',
  alternates: { canonical: 'https://calculpatrimoine.fr/per-sortie' },
}

const LIMITES = [
  'Ce calculateur estime le taux PS retraités à 9,1 % (taux normal). Selon votre RFR, vous pouvez relever du taux médian (6,6 %), du taux réduit (3,8 %) ou être exonéré, ce qui réduit d\'autant les PS sur la rente.',
  'Le taux de rente saisi est une hypothèse simplificatrice. Le taux réel dépend des tables de mortalité de l\'assureur et de l\'âge de liquidation. Voir /rente-viagere pour une estimation actuarielle.',
  'Le calculateur ne traite pas la sortie anticipée (acquisition résidence principale, accident de la vie, etc.) qui suit des règles fiscales différentes.',
  'Les versements non déductibles (option de ne pas déduire à l\'entrée) suivent un régime fiscal différent à la sortie. Saisir 0 % en fraction versements déductibles pour s\'en approcher partiellement, mais le mécanisme exact diffère.',
]

export default function PerSortiePage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        ...getPillarBreadcrumb('/per-sortie'),
        { label: 'PER Sortie' },
      ]}
      titre={<>PER Sortie<br />Capital vs rente</>}
      description="Comparez le net après impôt entre une sortie en capital (versements à l'IR + gains au PFU 30 %)
        et une sortie en rente (régime des pensions Art. 158-5° bis CGI : abattement 10 % + IR + PS 9,1 %).
        Calculateur complémentaire de /per-individuel (côté entrée)."
      features={[
        'Capital vs rente',
        'TMI retraite 0-45 %',
        'Espérance de vie paramétrable',
        'Mode mixte',
        'Seuil de rentabilité rente',
      ]}
      calculator={<PerSortieCalculator />}
      currentHref="/per-sortie"
      methodologie={
        <MethodologieSection
          slug="per-sortie"
          limites={LIMITES}
          note={
            <>
              Régime applicable aux liquidations PER 2026. Sources : Art. 158-5° bis CGI (rente),
              Art. 200 A CGI (PFU sur gains), Art. 163 quatervicies CGI (régime d&apos;entrée),
              Art. L. 136-1-2 CSS (CSG retraités).
            </>
          }
        />
      }
    />
  )
}
