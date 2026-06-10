import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const DonationDemembrementCalculator = dynamic(
  () => import('@/components/Calculator/DonationDemembrementCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'

export const metadata: Metadata = {
  title: 'Donation avec démembrement : calculateur Art. 669 CGI 2026',
  description: 'Calculez les droits de donation sur la nue-propriété transmise (barème Art. 669 CGI selon l\'âge de l\'usufruitier). Comparaison avec donation en pleine propriété.',
  keywords: 'donation démembrement, nue-propriété, usufruit, art 669 CGI, donation enfant démembrement',
  alternates: { canonical: 'https://calculpatrimoine.fr/donation/demembrement' },
}

const LIMITES = [
  'Le calculateur ne traite que la donation de nue-propriété avec conservation de l\'usufruit par le donateur. La donation d\'usufruit temporaire (à durée fixe) suit des règles différentes.',
  'La réversion d\'usufruit (au profit du conjoint au décès du donateur usufruitier) n\'est pas modélisée.',
  'L\'évaluation du bien en pleine propriété (immobilier, parts de société, portefeuille) est laissée à l\'utilisateur : le calculateur ne fait que appliquer le barème 669 CGI sur la valeur saisie.',
  'Au décès du donateur usufruitier, la réunion de l\'usufruit à la nue-propriété est en principe non taxable (Art. 1133 CGI), mais des exceptions existent (démembrement irrégulier, etc.) non couvertes ici.',
]

export default function DonationDemembrementPage() {
  return (
    <CalculateurPageLayout
      breadcrumb={[
        ...getPillarBreadcrumb('/donation/demembrement'),
        { label: 'Donation' },
        { label: 'Démembrement' },
      ]}
      titre={<>Donation avec<br />démembrement</>}
      description="Calculez les droits de donation sur la nue-propriété transmise au donataire, en
        conservant l'usufruit. La valeur fiscale de la nue-propriété dépend de l'âge du donateur
        usufruitier (barème Art. 669 CGI) : plus le donateur est jeune, plus l'économie de droits
        est importante."
      features={[
        'Barème Art. 669 CGI',
        'Comparaison vs pleine propriété',
        'Abattements Art. 779',
        'Rappel 15 ans',
        'Calcul économie',
      ]}
      calculator={<DonationDemembrementCalculator />}
      currentHref="/donation/demembrement"
      methodologie={
        <>
          <SourcesSection slug="donation/demembrement" />

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">
              Barème Art. 669 CGI (valeur de la nue-propriété selon l&apos;âge de l&apos;usufruitier)
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-300">
                  <th className="text-left py-2 text-neutral-500 font-mono text-xs">Âge usufruitier</th>
                  <th className="text-right py-2 text-neutral-500 font-mono text-xs">Usufruit</th>
                  <th className="text-right py-2 text-neutral-500 font-mono text-xs">Nue-propriété</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {[
                  ['Moins de 21 ans', '90 %', '10 %'],
                  ['21 à 30 ans', '80 %', '20 %'],
                  ['31 à 40 ans', '70 %', '30 %'],
                  ['41 à 50 ans', '60 %', '40 %'],
                  ['51 à 60 ans', '50 %', '50 %'],
                  ['61 à 70 ans', '40 %', '60 %'],
                  ['71 à 80 ans', '30 %', '70 %'],
                  ['81 à 90 ans', '20 %', '80 %'],
                  ['91 ans et plus', '10 %', '90 %'],
                ].map(([age, u, n]) => (
                  <tr key={age}>
                    <td className="py-2 text-neutral-700">{age}</td>
                    <td className="py-2 text-right font-mono">{u}</td>
                    <td className="py-2 text-right font-mono font-bold">{n}</td>
                  </tr>
                ))}
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
              Régime applicable 2026. Sources : Art. 669 CGI (barème démembrement), Art. 777 CGI (barème
              droits), Art. 779 CGI (abattements), Art. 1133 CGI (réunion usufruit/nue-propriété non taxable au décès).
            </p>
          </div>
        </>
      }
    />
  )
}
