import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const SuccessionCalculator = dynamic(
  () => import('@/components/Calculator/SuccessionCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import MethodologieSection from '@/components/MethodologieSection'

export const metadata: Metadata = {
  title: 'Calculateur droits de succession 2026 par héritier',
  description: 'Calculez les droits de succession par héritier : abattements Art. 779 CGI, barème Art. 777, exonération conjoint/PACS Loi TEPA, rappel 15 ans.',
  keywords: 'droits succession, calculateur succession, abattement succession, barème succession, exonération conjoint TEPA, rappel 15 ans',
  alternates: { canonical: 'https://calculpatrimoine.fr/succession' },
}

const LIMITES = [
  'Ce calculateur traite la succession en pleine propriété : argent, comptes, biens transmis intégralement à l\'héritier. Il ne gère pas le démembrement (cas où l\'usufruit reste à un parent et la nue-propriété va à l\'enfant).',
  'L\'assurance-vie n\'est pas intégrée à la succession : elle suit ses propres règles (Art. 990 I / 757 B CGI). Voir le calculateur dédié /assurance-vie/transmission.',
  'Les exonérations spéciales ne sont pas calculées : Pacte Dutreil (transmission d\'entreprise), forêts (Art. 793 CGI), œuvres d\'art, monuments historiques.',
  'Les frais de notaire et émoluments ne sont pas inclus (hors fiscalité pure).',
  'L\'abattement spécifique aux héritiers handicapés (Art. 779-II CGI, +159 325 €) n\'est pas géré dans cette V1.',
]

export default function SuccessionPage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        ...getPillarBreadcrumb('/succession'),
        { label: 'Succession' },
      ]}
      titre={<>Calculateur Succession<br />Droits par héritier 2026</>}
      description="Calculez les droits de succession dus par chaque héritier selon le lien de parenté
        avec le défunt. Abattements Art. 779 CGI, barème Art. 777, exonération totale conjoint/PACS
        (Loi TEPA 2007), prise en compte des donations antérieures (rappel 15 ans, Art. 784 CGI)."
      features={[
        'Barème 2026 (Art. 777 CGI)',
        'Abattements Art. 779',
        'Exonération conjoint TEPA',
        'Rappel 15 ans',
        'Jusqu\'à 8 héritiers',
      ]}
      calculator={<SuccessionCalculator />}
      currentHref="/succession"
      methodologie={
        <MethodologieSection
          slug="succession"
          limites={LIMITES}
          note={
            <>
              Barème 2026 de l&apos;article 777 CGI (inchangé depuis LF 2011). Abattements
              Art. 779 CGI applicables aux successions ouvertes en 2026. Le conjoint et le
              partenaire de PACS sont totalement exonérés (Art. 796-0 bis CGI, Loi TEPA 2007).
            </>
          }
        />
      }
    />
  )
}
