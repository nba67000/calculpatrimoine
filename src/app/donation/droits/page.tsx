import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
// PERF: lazy-load → DonationCalculator sort du bundle initial
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const DonationCalculator = dynamic(
  () => import('@/components/Calculator/DonationCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'


export const metadata: Metadata = {
  title: 'Calculateur Donation 2026 : Droits par Lien de Parenté',
  description: 'Calculez les droits de donation 2026 : abattements art. 779 (100 000 € enfant, 80 724 € époux), barème art. 777, rappel 15 ans, don familial 31 865 € (art. 790 G).',
  keywords: 'calcul donation, droits de donation, abattement donation, barème art 777, art 779 CGI, don familial 790G, rappel fiscal 15 ans, donation enfant, donation époux PACS',
  openGraph: {
    title: 'Calculateur Droits de Donation - Barème 2026',
    description: 'Simulez les droits de mutation à titre gratuit d\'une donation : abattements par lien de parenté, barème progressif, don familial de sommes d\'argent.',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CalculPatrimoine' }],
  },
  alternates: { canonical: 'https://calculpatrimoine.fr/donation/droits' },
}

const ABATTEMENTS = [
  { lien: 'Enfant ou parent (ligne directe)', montant: '100 000 €', article: 'Art. 779-I CGI' },
  { lien: 'Époux ou partenaire PACS',         montant: '80 724 €',  article: 'Art. 790 E CGI' },
  { lien: 'Petit-enfant',                     montant: '31 865 €',  article: 'Art. 790 B CGI' },
  { lien: 'Frère ou sœur',                    montant: '15 932 €',  article: 'Art. 779-IV CGI' },
  { lien: 'Neveu ou nièce',                   montant: '7 967 €',   article: 'Art. 779-V CGI' },
  { lien: 'Donataire handicapé (cumulable)',  montant: '+ 159 325 €', article: 'Art. 779-II CGI' },
  { lien: 'Don familial de sommes d\'argent', montant: '+ 31 865 €',  article: 'Art. 790 G CGI' },
]

const LIMITES = [
  'Le calculateur traite une donation en pleine propriété (numéraire ou bien évalué). La donation avec démembrement de propriété (nue-propriété / usufruit) fera l\'objet d\'un calculateur séparé.',
  'Les réductions liées à la transmission d\'entreprise (pacte Dutreil, Art. 787 B CGI) ne sont pas calculées.',
  'Les frais d\'acte notarié et émoluments du notaire ne sont pas inclus (hors fiscalité pure).',
  'La donation-partage est traitée comme une donation classique côté fiscalité (le traitement civil diffère).',
  'Les successions relèvent d\'un calcul distinct (un calculateur dédié est en cours de développement).',
]

export default function DonationDroitsPage() {
  return (
    <>
      <CalculateurPageLayout
        breadcrumb={[
          ...getPillarBreadcrumb('/donation/droits'),
          { label: 'Donation' },
          { label: 'Droits de mutation' },
        ]}
        titre={<>Calculateur Donation<br />Droits 2026</>}
        description="Estimez les droits de donation dus selon le lien de parenté, en appliquant les
          abattements de l'article 779 CGI, le barème de l'article 777 CGI et le rappel fiscal de 15 ans.
          Inclut le don familial de sommes d'argent (Art. 790 G CGI)."
        features={['Barème 2026 (Art. 777 CGI)', 'Abattements Art. 779 + 790 E', 'Don familial 790 G', 'Rappel fiscal 15 ans']}
        calculator={<DonationCalculator />}
        currentHref="/donation/droits"
        methodologie={
          <>
            <SourcesSection slug="donation/droits" />

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
                Barème 2026 de l&apos;article 777 CGI. Calculs croisés contre cinq cas de référence
                (ligne directe, époux, don familial 790 G, frères et sœurs, neveu).
                Dernière vérification des sources : 30 mai 2026.
              </p>
            </div>
          </>
        }
      >

        {/* Comment ça marche */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white border border-neutral-200 p-8 space-y-5">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">
              Comment se calculent les droits de donation ?
            </h2>

            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                <strong>Trois étapes successives, fixées par le Code général des impôts.</strong>{' '}
                Le calcul se fait en trois temps. D&apos;abord on retire l&apos;abattement personnel qui dépend
                du lien de parenté (Art. 779 CGI). Ensuite, si le cas s&apos;y prête, on retire les abattements
                en plus : handicap, don familial 790 G. Sur ce qui reste, on applique le barème de
                l&apos;article 777 CGI.
              </p>
              <p>
                <strong>L&apos;abattement dépend du lien de parenté entre donateur et donataire.</strong>{' '}
                100 000 € par parent et par enfant en ligne directe, 80 724 € entre époux ou partenaires
                de PACS, 15 932 € entre frères et sœurs, 7 967 € pour un neveu ou une nièce. Au-delà du
                4e degré ou sans lien, aucun abattement n&apos;est prévu.
              </p>
              <p>
                <strong>Le rappel fiscal des 15 ans (Art. 784 CGI).</strong>{' '}
                Si vous avez déjà donné à la même personne dans les 15 dernières années, ces dons comptent :
                l&apos;abattement déjà utilisé n&apos;est plus disponible, et le calcul démarre dans une tranche
                plus haute du barème. Au-delà de 15 ans, le compteur repart à zéro : tout redevient comme si
                c&apos;était un premier don.
              </p>
              <p>
                <strong>Le don familial de sommes d&apos;argent (Art. 790 G CGI).</strong>{' '}
                31 865 € d&apos;abattement en plus, valable uniquement pour les dons en argent (chèque,
                virement, espèces ; pas un bien immobilier ou des actions). Trois conditions cumulatives :
                donateur de moins de 80 ans, donataire majeur, et le don va à un enfant, petit-enfant,
                arrière-petit-enfant, ou à défaut à un neveu/nièce.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">
                Abattements personnels - barème 2026
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-300">
                    <th className="text-left py-2 text-neutral-500 font-mono text-xs">Lien de parenté</th>
                    <th className="text-right py-2 text-neutral-500 font-mono text-xs">Abattement</th>
                    <th className="text-right py-2 text-neutral-500 font-mono text-xs">Article</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {ABATTEMENTS.map(a => (
                    <tr key={a.lien}>
                      <td className="py-2 text-neutral-700">{a.lien}</td>
                      <td className="py-2 text-right font-bold font-mono text-neutral-900">{a.montant}</td>
                      <td className="py-2 text-right font-mono text-xs text-neutral-500">{a.article}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Exemples chiffrés */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">
              Exemples chiffrés
            </h2>

            <div className="space-y-6 text-neutral-700">
              <div>
                <h3 className="font-bold text-neutral-900 mb-2">
                  Parent → enfant, 200 000 € en pleine propriété
                </h3>
                <p className="text-sm">
                  Abattement de 100 000 € (Art. 779-I CGI), base taxable de 100 000 €. Application du
                  barème : 5 % × 8 072 + 10 % × 4 037 + 15 % × 3 823 + 20 % × 84 068 ={' '}
                  <strong>18 194 € de droits</strong>. Le donataire reçoit 181 806 € nets.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-2">
                  Donation entre époux, 150 000 €
                </h3>
                <p className="text-sm">
                  Abattement de 80 724 € (Art. 790 E CGI), base taxable de 69 276 €. Application du
                  barème tableau II : <strong>11 062 € de droits</strong>.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-2">
                  Don familial 790 G à un enfant majeur, 150 000 € en numéraire
                </h3>
                <p className="text-sm">
                  Abattement personnel 100 000 € + abattement 790 G 31 865 € = 131 865 €. Base taxable
                  de 18 135 €. Application du barème ligne directe : <strong>1 821 € de droits</strong>.
                  L&apos;option 790 G économise plus de 16 000 € par rapport au cas précédent.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-2">
                  Donation entre frères et sœurs, 50 000 €
                </h3>
                <p className="text-sm">
                  Abattement de 15 932 € (Art. 779-IV CGI), base taxable de 34 068 €. Application du
                  barème tableau III : 35 % × 24 430 + 45 % × 9 638 ={' '}
                  <strong>12 888 € de droits</strong>.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-neutral-900 mb-2">
                  Donation à un neveu, 30 000 €
                </h3>
                <p className="text-sm">
                  Abattement de 7 967 € (Art. 779-V CGI), base taxable de 22 033 €. Taux forfaitaire
                  de 55 % (Art. 777 tableau IV) : <strong>12 118 € de droits</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Liens croisés */}
        <section className="max-w-4xl mx-auto px-6 pb-8">
          <div className="border-t border-neutral-300">
            <Link
              href="/faq/donation-droits"
              className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
              style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
            >
              <div>
                <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">Questions fréquentes sur les donations</p>
                <p className="text-sm text-neutral-500">Abattements par lien de parenté, rappel 15 ans, don familial 790 G, démembrement.</p>
              </div>
              <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
            </Link>
            <Link
              href="/assurance-vie/transmission"
              className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
              style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
            >
              <div>
                <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">Comparer avec la transmission par assurance-vie</p>
                <p className="text-sm text-neutral-500">L&apos;Art. 990 I CGI offre un abattement de 152 500 € par bénéficiaire (versements avant 70 ans).</p>
              </div>
              <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
            </Link>
          </div>
        </section>

      </CalculateurPageLayout>
    </>
  )
}
