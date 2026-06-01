import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const DeficitFoncierCalculator = dynamic(
  () => import('@/components/Calculator/DeficitFoncierCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import MethodologieSection from '@/components/MethodologieSection'

export const metadata: Metadata = {
  title: 'Déficit foncier : calculateur 2026 (Art. 156 I-3° CGI)',
  description: 'Calculez votre déficit foncier en location nue régime réel : imputation 10 700 €/an sur le revenu global, report 10 ans sur revenus fonciers, plafond majoré 21 400 € pour rénovation énergétique.',
  keywords: 'déficit foncier, calcul déficit foncier, imputation revenu global, plafond 10700, article 156 CGI, rénovation énergétique 21400, report revenus fonciers, location nue régime réel',
  alternates: { canonical: 'https://calculpatrimoine.fr/deficit-foncier' },
}

const LIMITES = [
  'Ce calculateur concerne uniquement la location nue en régime réel. La location meublée (LMNP/LMP) suit le régime BIC : voir /lmnp-reel-vs-micro.',
  'Le report sur le revenu global (6 ans, si la TMI ne permet pas d\'absorber le plafond la première année) n\'est pas modélisé. Seule l\'économie d\'impôt immédiate est chiffrée.',
  'Le calculateur suppose que toutes les charges saisies sont déductibles au sens de l\'Art. 31 CGI. Il ne fait pas la distinction entre travaux d\'entretien/réparation (déductibles) et travaux d\'agrandissement/reconstruction (non déductibles).',
  'L\'engagement de location 3 ans (Art. 156 I-3° dernier alinéa) est signalé en warning mais le calcul de recapture en cas de cession anticipée n\'est pas implémenté.',
  'Le dispositif majoré 21 400 € est applicable aux dépenses payées du 01/01/2023 au 31/12/2025 (LF 2023 art. 12). Le calculateur ne vérifie pas la date des dépenses. Vérifiez la prorogation pour 2026 et au-delà.',
  'Le calculateur n\'intègre pas les régimes spécifiques (Pinel, Denormandie, Malraux, monuments historiques) qui ont leurs propres règles de déduction et de plafonnement.',
]

export default function DeficitFoncierPage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        { href: '/', label: 'Accueil' },
        { label: 'Déficit foncier' },
      ]}
      titre={<>Calculateur<br />déficit foncier</>}
      description="Location nue régime réel : calculez votre déficit foncier, son imputation sur le revenu
        global (plafond 10 700 €/an, Art. 156 I-3° CGI) et son report sur les revenus fonciers des 10 années
        suivantes. Plafond majoré 21 400 € pour les travaux de rénovation énergétique des passoires
        thermiques (LF 2023)."
      features={[
        'Plafond 10 700 €/an',
        'Plafond majoré 21 400 € passoires',
        'Décomposition intérêts vs autres charges',
        'Report 10 ans sur revenus fonciers',
        'Économie d\'impôt selon TMI',
      ]}
      calculator={<DeficitFoncierCalculator />}
      currentHref="/deficit-foncier"
      methodologie={
        <MethodologieSection
          slug="deficit-foncier"
          limites={LIMITES}
          note={
            <>
              Régime applicable 2026. Sources : Art. 156 I-3° CGI (plafond et règles d&apos;imputation),
              Art. 31 CGI (charges déductibles), LF 2023 art. 12 (plafond majoré passoires),
              BOFiP BOI-RFPI-BASE-30-20 et BOI-RFPI-BASE-30-30.
            </>
          }
        />
      }
    />
  )
}
