import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const PlusValueLmnpCalculator = dynamic(
  () => import('@/components/Calculator/PlusValueLmnpCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import MethodologieSection from '@/components/MethodologieSection'

export const metadata: Metadata = {
  title: 'Plus-value LMNP : réintégration amortissements 2026',
  description: 'Calculez la plus-value imposable d\'un bien LMNP avec réintégration des amortissements au prix d\'acquisition (Art. 150 VB III CGI depuis le 15/02/2025).',
  keywords: 'plus-value LMNP, réintégration amortissements LMNP, art 150 VB CGI, loi finances 2025 LMNP',
  alternates: { canonical: 'https://calculpatrimoine.fr/plus-value-immobiliere/lmnp' },
}

const LIMITES = [
  'Ce calculateur ne traite que le LMNP (loueur en meublé non professionnel). Le LMP relève d\'un régime fiscal différent (BIC professionnel, plus-values pro).',
  'L\'utilisateur saisit lui-même le total des amortissements déduits. Le calculateur ne reconstitue pas le tableau d\'amortissement à partir des données du bien.',
  'La règle de réintégration s\'applique aux cessions à partir du 15/02/2025. Pour une vente antérieure, utiliser le calculateur standard /plus-value-immobiliere.',
  'Le notaire calcule l\'impôt définitif lors de la cession. Ce calculateur fournit une estimation pré-cession.',
]

export default function PlusValueLmnpPage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        ...getPillarBreadcrumb('/plus-value-immobiliere/lmnp'),
        { href: '/plus-value-immobiliere', label: 'Plus-value immobilière' },
        { label: 'Mode LMNP' },
      ]}
      titre={<>Plus-value immobilière<br />LMNP (réintégration)</>}
      description="Calculez la plus-value imposable d'un bien loué en meublé non professionnel (LMNP). Depuis
        le 15/02/2025, les amortissements déduits des revenus locatifs sont réintégrés au prix d'acquisition
        pour le calcul de la PV, ce qui augmente mécaniquement l'impôt. Comparaison automatique avec le
        régime standard."
      features={[
        'Réintégration amortissements',
        'LF 2025 / Art. 150 VB III',
        'Comparaison vs standard',
        'IR + PS + surtaxe',
      ]}
      calculator={<PlusValueLmnpCalculator />}
      currentHref="/plus-value-immobiliere/lmnp"
      methodologie={
        <MethodologieSection
          slug="plus-value-immobiliere/lmnp"
          limites={LIMITES}
          note={
            <>
              Règle applicable depuis le 15/02/2025 (LF 2025 art. 84). Sources : Art. 150 VB III CGI
              (réintégration), Art. 150 U et s. CGI (régime général PV immobilière particulier),
              Art. L136-7 CSS VI 2 (abattements PS).
            </>
          }
        />
      }
    />
  )
}
