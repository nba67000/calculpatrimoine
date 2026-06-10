import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const PretIntrafamilialCalculator = dynamic(
  () => import('@/components/Calculator/PretIntrafamilialCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import MethodologieSection from '@/components/MethodologieSection'

export const metadata: Metadata = {
  title: 'Prêt intrafamilial in fine : calculateur 2026',
  description: 'Simulez un prêt entre proches in fine vs une donation directe : intérêts, droits succession sur la créance, comparaison fiscale (Art. 779 et 784 CGI).',
  keywords: 'prêt intrafamilial, prêt familial in fine, prêt parent enfant, alternative donation, requalification don indirect',
  alternates: { canonical: 'https://calculpatrimoine.fr/pret-intrafamilial' },
}

const LIMITES = [
  'Le calculateur estime un remboursement in fine pur : intérêts annuels + capital intégral à la fin. Pour un prêt amortissable, l\'amortissement réduit la créance restante mais augmente la charge de remboursement annuelle.',
  'Le taux d\'intérêt minimal acceptable (sans requalification) n\'est pas codé en dur. Référence usuelle : TMM (taux moyen mensuel) publié par la Banque de France. À actualiser annuellement.',
  'Le calculateur suppose que l\'emprunteur est aussi héritier du prêteur. Sinon, la créance s\'impute sur l\'ensemble des héritiers proportionnellement.',
  'La déclaration du prêt (formulaire 2062 si > 5 000 €) et des intérêts (formulaire 2778 si > 1 000 €/an) est obligatoire mais hors scope de ce calculateur.',
  'Le risque de requalification en don indirect (prêt sans intérêt sans remboursement effectif, ou simulation de remboursement avec dons réguliers compensatoires) n\'est pas modélisé.',
]

export default function PretIntrafamilialPage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        ...getPillarBreadcrumb('/pret-intrafamilial'),
        { label: 'Prêt intrafamilial' },
      ]}
      titre={<>Prêt intrafamilial<br />in fine</>}
      description="Simulez un prêt entre proches avec remboursement in fine comme alternative ou complément
        à la donation. Calcul des intérêts à verser, du risque successoral si le prêteur décède avant le
        terme, et comparaison fiscale avec une donation directe équivalente."
      features={[
        'Intérêts cumulés',
        'Risque succession si décès',
        'Comparaison vs donation',
        'Abattements Art. 779',
        'Warning requalification',
      ]}
      calculator={<PretIntrafamilialCalculator />}
      currentHref="/pret-intrafamilial"
      methodologie={
        <MethodologieSection
          slug="pret-intrafamilial"
          limites={LIMITES}
          note={
            <>
              Régime applicable 2026. Sources : Art. 1892 et s. C. civil (prêt), Art. 757 B CGI
              (remise de dette assimilée don), Art. 779 et 784 CGI (abattements et rappel 15 ans
              utilisés pour la comparaison avec donation).
            </>
          }
        />
      }
    />
  )
}
