import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
// PERF: lazy-load → IFICalculator sort du bundle initial (logique métier + recharts)
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const IFICalculator = dynamic(
  () => import('@/components/Calculator/IFICalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'
import { safeJsonLd } from '@/lib/safeJsonLd'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'


export const metadata: Metadata = {
  title: 'Calculateur IFI 2026 : impôt sur la fortune immobilière',
  description: 'Calculez votre IFI 2026 : patrimoine net taxable, barème progressif, abattement résidence principale 30 %, décote et plafonnement IFI + IR.',
  keywords: 'calculateur IFI, impôt fortune immobilière, barème IFI 2026, seuil IFI, abattement résidence principale, plafonnement IFI',
  openGraph: {
    title: 'Calculateur IFI 2026 - impôt sur la fortune immobilière',
    description: 'Simulez votre IFI : abattement RP 30 %, barème 6 tranches, décote progressive, plafonnement IFI + IR à 75 % des revenus.',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CalculPatrimoine' }],
  },

  alternates: { canonical: 'https://calculpatrimoine.fr/ifi' },
}

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculateur IFI - Impôt sur la Fortune Immobilière',
  description: 'Outil gratuit de simulation de l\'IFI 2026 : barème progressif, abattement résidence principale, décote, plafonnement.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  inLanguage: 'fr-FR',
  author: { '@type': 'Organization', name: 'CalcPatrimoine' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://calculpatrimoine.fr' },
    { '@type': 'ListItem', position: 2, name: 'Immobilier', item: 'https://calculpatrimoine.fr/calculateurs/immobilier' },
    { '@type': 'ListItem', position: 3, name: 'IFI', item: 'https://calculpatrimoine.fr/ifi' },
  ],
}

const BAREME_IFI = [
  { de: '0 €',          a: '800 000 €',    taux: '0 %' },
  { de: '800 000 €',    a: '1 300 000 €',  taux: '0,50 %' },
  { de: '1 300 000 €',  a: '2 570 000 €',  taux: '0,70 %' },
  { de: '2 570 000 €',  a: '5 000 000 €',  taux: '1,00 %' },
  { de: '5 000 000 €',  a: '10 000 000 €', taux: '1,25 %' },
  { de: '10 000 000 €', a: 'Sans limite',   taux: '1,50 %' },
]

export default function IFIPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
      <CalculateurPageLayout
        breadcrumb={[...getPillarBreadcrumb('/ifi'), { label: 'IFI' }]}
        titre={<>Calculateur IFI 2026 :<br />impôt sur la fortune immobilière</>}
        description="Calculez votre IFI à partir de la valeur de marché de vos biens immobiliers :
          abattement résidence principale (30 %), barème progressif en 6 tranches,
          décote pour les patrimoines proches du seuil, et plafonnement IFI + IR."
        features={[
          'Seuil 1 300 000 €',
          'Barème 0 % à 1,50 %',
          'Abattement RP 30 %',
          'Décote progressive',
          'Plafonnement 75 % revenus',
          'Zéro donnée conservée',
        ]}
        calculator={<IFICalculator />}
        currentHref="/ifi"
        methodologie={
          <>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Formules de calcul</h3>
              <div className="bg-neutral-50 border border-neutral-200 p-5 grid md:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  ['Valeur brute', 'Valeur de marché totale des biens au 1er janvier'],
                  ['Abattement RP', '30 % de la valeur de la résidence principale'],
                  ['Patrimoine net taxable', 'Assiette brute − abattement RP − dettes'],
                  ['IFI brut', 'Application du barème progressif par tranche'],
                  ['Décote (si 1,3M ≤ P < 1,4M €)', '17 500 € − 1,25 % × patrimoine net'],
                  ['IFI net', 'IFI brut − décote progressive'],
                  ['Plafonnement', 'Si IFI + IR > 75 % revenus → IFI réduit'],
                  ['Taux effectif', 'IFI net / patrimoine net × 100'],
                ].map(([label, val]) => (
                  <div key={label} className="font-mono">
                    <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
                    <p className="text-xs text-neutral-700">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            <SourcesSection slug="ifi" />

            <div className="border-l-4 border-accent-400 bg-neutral-50 px-4 py-3">
              <p className="text-sm text-neutral-700">
                <strong>Millésime fiscal : 2026.</strong> Barème applicable au patrimoine au 1er janvier 2026.
                Inchangé depuis la LF 2018. Dernière vérification des sources : 07/05/2026.
                Ce calculateur est indicatif ; les exonérations partielles (biens professionnels, forêts,
                démembrement) et les réductions pour dons ne sont pas prises en compte.
              </p>
            </div>
          </>
        }
      >

        {/* Comment ça marche */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white border border-neutral-200 p-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">Comment l&apos;IFI est-il calculé ?</h2>

            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                <strong>L&apos;IFI s&apos;applique si votre patrimoine immobilier net dépasse 1 300 000 €.</strong>{' '}
                Ce seuil est vérifié au 1er janvier de chaque année. En dessous, vous n&apos;êtes pas concerné
                et aucune déclaration n&apos;est requise au titre de l&apos;IFI.
              </p>

              <p>
                <strong>La résidence principale bénéficie d&apos;un abattement de 30 %.</strong>{' '}
                Concrètement, si votre maison vaut 600 000 €, seuls 420 000 € entrent dans votre patrimoine taxable.
                Cet abattement s&apos;applique automatiquement sur déclaration, sans démarche particulière.
              </p>

              <p>
                <strong>Les emprunts immobiliers en cours réduisent votre patrimoine taxable.</strong>{' '}
                Seul le capital restant dû au 1er janvier est déductible, et uniquement pour les dettes
                contractées pour acquérir, construire, rénover ou entretenir les biens taxables.
                Les prêts à la consommation ou personnels ne sont pas déductibles.
              </p>

              <p>
                <strong>Le barème est progressif, comme l&apos;impôt sur le revenu.</strong>{' '}
                La première tranche (jusqu&apos;à 800 000 €) est taxée à 0 %, ce qui signifie que seule
                la fraction au-dessus de ce seuil est imposée. Chaque euro de patrimoine ne paye
                que le taux de sa tranche.
              </p>

              <p>
                <strong>Pour les patrimoines proches du seuil, une décote atténue l&apos;entrée dans l&apos;IFI.</strong>{' '}
                Entre 1 300 000 € et 1 400 000 €, une réduction progressive s&apos;applique (formule : 17 500 € − 1,25 % × patrimoine).
                À 1 300 000 € net exactement, la décote est de 1 250 €. Elle s&apos;annule à 1 400 000 €.
              </p>
            </div>
          </div>
        </section>

        {/* Barème IFI */}
        <section className="max-w-4xl mx-auto px-6 py-4 pb-8">
          <div className="bg-white border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
              Barème IFI 2026
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              Inchangé depuis la création de l&apos;IFI par la loi de finances 2018 (Art. 977 CGI).
            </p>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="text-left py-2 text-neutral-500 font-mono text-xs">Fraction du patrimoine net</th>
                  <th className="text-right py-2 text-neutral-500 font-mono text-xs">Taux</th>
                </tr>
              </thead>
              <tbody>
                {BAREME_IFI.map(({ de, a, taux }) => (
                  <tr key={de} className="border-b border-neutral-100">
                    <td className="py-2 text-neutral-700">De {de} à {a}</td>
                    <td className={`py-2 text-right font-bold ${taux === '0 %' ? 'text-green-700' : 'text-neutral-900'}`}>
                      {taux}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-neutral-500 mt-3">Source : Art. 977 CGI - applicable au patrimoine au 1er janvier 2026.</p>
          </div>
        </section>

        {/* Exemples chiffrés */}
        <section className="max-w-4xl mx-auto px-6 py-4 pb-8">
          <div className="bg-white border border-neutral-200 p-8 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-neutral-900">Exemples de calcul IFI</h2>

            <div className="space-y-5">
              {[
                {
                  titre: 'Patrimoine net 2 000 000 € (sans emprunt, sans RP)',
                  calcul: '500 000 × 0,50 % + 700 000 × 0,70 % = 2 500 + 4 900',
                  resultat: 'IFI = 7 400 €',
                },
                {
                  titre: 'Patrimoine brut 1 900 000 €, dont RP valeur 600 000 €, emprunt 200 000 €',
                  calcul: 'Base taxable = 1 900 000 − 180 000 (30 % RP) − 200 000 = 1 520 000 €\n500 000 × 0,50 % + 220 000 × 0,70 % = 2 500 + 1 540',
                  resultat: 'IFI = 4 040 €',
                },
                {
                  titre: 'Patrimoine net 1 350 000 € (décote progressive)',
                  calcul: '500 000 × 0,50 % + 50 000 × 0,70 % = 2 500 + 350 = 2 850 €\nDécote : 17 500 − 1,25 % × 1 350 000 = 625 €',
                  resultat: 'IFI net = 2 225 €',
                },
              ].map(({ titre, calcul, resultat }) => (
                <div key={titre} className="border-l-2 border-accent-400 pl-4">
                  <p className="font-bold text-neutral-900 mb-1">{titre}</p>
                  <p className="text-sm text-neutral-600 font-mono whitespace-pre-line leading-relaxed">{calcul}</p>
                  <p className="text-sm font-bold text-neutral-900 mt-1">{resultat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ intégrée */}
        <section className="max-w-4xl mx-auto px-6 py-4 pb-8">
          <div className="bg-white border border-neutral-200 p-8 space-y-6">
            <div className="flex justify-between items-baseline">
              <h2 className="font-serif text-2xl font-bold text-neutral-900">Questions fréquentes sur l&apos;IFI</h2>
              <Link href="/faq/ifi" className="text-sm text-neutral-900 hover:underline font-medium">
                Toutes les questions sur l&apos;IFI
              </Link>
            </div>

            <div className="space-y-5">
              {[
                {
                  q: 'Qui doit payer l\'IFI ?',
                  r: 'Si votre patrimoine immobilier net (valeur des biens moins les dettes) dépasse 1 300 000 € au 1er janvier, vous devez payer l\'IFI. Ce seuil compte pour le couple entier (mariés ou pacsés), pas chacun de son côté. Si vous habitez à l\'étranger, seuls vos biens situés en France comptent.',
                },
                {
                  q: 'Quels biens entrent dans l\'IFI ?',
                  r: 'Tous les biens et droits immobiliers détenus directement (maisons, appartements, terrains, parkings) ou indirectement via des parts de sociétés (SCI, SCPI). La résidence principale bénéficie d\'un abattement de 30 %. Certains biens sont partiellement ou totalement exonérés : biens professionnels, bois et forêts (75 %), biens ruraux loués par bail à long terme, œuvres d\'art.',
                },
                {
                  q: 'Le plafonnement IFI + IR, c\'est quoi exactement ?',
                  r: 'Une règle protège ceux qui ont beaucoup de patrimoine mais peu de revenus : le total IFI + impôt sur le revenu ne peut pas dépasser 75 % de vos revenus de l\'année (Art. 979 CGI). Si le total dépasse, l\'IFI est réduit du surplus. Cas typique : un retraité dont la maison vaut cher mais qui touche une petite pension, sans ce plafond il serait sur-imposé.',
                },
              ].map(({ q, r }) => (
                <div key={q} className="border-l-2 border-accent-400 pl-4">
                  <p className="font-bold text-neutral-900 mb-1">{q}</p>
                  <p className="text-sm text-neutral-700 leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </CalculateurPageLayout>
    </>
  )
}
