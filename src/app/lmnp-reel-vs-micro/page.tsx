import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const LmnpRegimeCalculator = dynamic(
  () => import('@/components/Calculator/LmnpRegimeCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import MethodologieSection from '@/components/MethodologieSection'

export const metadata: Metadata = {
  title: 'LMNP réel vs micro-BIC : comparateur 2026',
  description: 'Comparez l\'impôt LMNP en régime réel (charges + amortissements déduits) et en micro-BIC (abattement forfaitaire 50 %, 71 % ou 30 % selon type de meublé).',
  alternates: { canonical: 'https://calculpatrimoine.fr/lmnp-reel-vs-micro' },
}

const LIMITES = [
  'Le déficit en régime réel LMNP n\'est pas imputable sur les autres revenus (contrairement au déficit foncier en location nue). Il est reportable 10 ans sur les bénéfices LMNP.',
  'Le calculateur ne distingue pas LMNP / LMP. Le LMP (loueur en meublé professionnel, recettes > 23 000 € ET > 50 % des revenus du foyer) relève d\'un régime BIC professionnel avec règles différentes (cotisations sociales TNS, plus-values pro).',
  'L\'amortissement est saisi manuellement. Un tableau d\'amortissement précis (bien décomposé en composants, mobilier) est établi par un comptable.',
  'La CFE (Cotisation foncière des entreprises) n\'est pas modélisée.',
  'La TVA n\'est pas modélisée (résidence services LMNP avec TVA récupérée).',
]

export default function LmnpRegimePage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        ...getPillarBreadcrumb('/lmnp-reel-vs-micro'),
        { label: 'LMNP réel vs micro' },
      ]}
      titre={<>LMNP<br />Régime réel vs micro-BIC</>}
      description="Comparez l'impôt entre le régime micro-BIC (abattement forfaitaire selon type de meublé) et
        le régime réel (charges et amortissements déduits). Barèmes 2026 post-LF 2025 : meublé classique 50 %,
        meublé touristique classé 71 %, meublé touristique non classé 30 % (avec seuil réduit à 15 000 €)."
      features={[
        'Micro 50 / 71 / 30 %',
        'Réel : charges + amort',
        'Seuils LF 2025',
        'TMI 0-45 %',
        'Déficit reportable',
      ]}
      calculator={<LmnpRegimeCalculator />}
      currentHref="/lmnp-reel-vs-micro"
      methodologie={
        <MethodologieSection
          slug="lmnp-reel-vs-micro"
          limites={LIMITES}
          note={
            <>
              Régime applicable 2026, post-réforme LF 2025. Sources : Art. 50-0 CGI (micro-BIC),
              Art. 32 CGI (option réel), LF 2025 art. 84 (meublé touristique), Art. L. 136-7 CSS (PS).
            </>
          }
        />
      }
    />
  )
}
