import type { Metadata } from 'next'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
// PERF: lazy-load → PlusValueImmobiliereCalculator sort du bundle initial (logique métier + recharts)
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'
const PlusValueImmobiliereCalculator = dynamic(
  () => import('@/components/Calculator/PlusValueImmobiliereCalculator'),
  { loading: () => <CalculatorSkeleton /> }
)
import SourcesSection from '@/components/SourcesSection'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'


export const metadata: Metadata = {
  title: 'Plus-value immobilière : calculateur IR et PS 2026',
  description: 'Calculez l\'impôt sur votre plus-value immobilière (19 % IR + 17,2 % PS). Abattements par durée, surtaxe, forfait travaux. Résidence secondaire et locatif.',
  keywords: 'plus-value immobilière, calculateur, impôt, prélèvements sociaux, abattement, durée détention, résidence secondaire, surtaxe',
  openGraph: {
    title: 'Calculateur plus-value immobilière, IR + PS + surtaxe',
    description: 'Simulez la fiscalité de votre cession immobilière : 19 % IR, 17,2 % PS, abattements pour durée, surtaxe éventuelle.',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CalculPatrimoine' }],
  },

  alternates: { canonical: 'https://calculpatrimoine.fr/plus-value-immobiliere' },
}

const ABATTEMENTS_IR = [
  { annees: 5,  taux: '0 %' },
  { annees: 6,  taux: '6 %' },
  { annees: 10, taux: '30 %' },
  { annees: 15, taux: '60 %' },
  { annees: 20, taux: '90 %' },
  { annees: 21, taux: '96 %' },
  { annees: 22, taux: '100 % (exo.)' },
]

const ABATTEMENTS_PS = [
  { annees: 5,  taux: '0 %' },
  { annees: 6,  taux: '1,65 %' },
  { annees: 15, taux: '16,5 %' },
  { annees: 22, taux: '28 %' },
  { annees: 25, taux: '55 %' },
  { annees: 29, taux: '91 %' },
  { annees: 30, taux: '100 % (exo.)' },
]

export default function PlusValueImmobilierePage() {
  return (
    <>
      <CalculateurPageLayout
      breadcrumb={[...getPillarBreadcrumb('/plus-value-immobiliere'), { label: 'Plus-value immobilière' }]}
      titre={<>Plus-value immobilière :<br />calculateur 2026</>}
      description="Calculez l'impôt sur votre cession immobilière : IR 19 %, prélèvements sociaux
        17,2 %, abattements pour durée de détention, surtaxe. Résidence secondaire, bien locatif."
      features={[
        'IR 19 % + PS 17,2 %',
        'Abattements 6e–30e année',
        'Surtaxe Art. 1609 nonies G',
        'Forfait frais 7,5 % et travaux 15 %',
        'Zéro donnée conservée',
      ]}
      calculator={<PlusValueImmobiliereCalculator />}
      currentHref="/plus-value-immobiliere"
      methodologie={
        <>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Formules de calcul</h3>
            <div className="bg-neutral-50 border border-neutral-200 p-5 grid md:grid-cols-2 gap-x-8 gap-y-3">
              {[
                ['Plus-value brute', 'Prix de cession − Prix de revient ajusté'],
                ['Prix de revient ajusté', 'Prix achat + frais + travaux'],
                ['Forfait frais', '7,5 % du prix d\'acquisition'],
                ['Forfait travaux (> 5 ans)', '15 % du prix d\'acquisition'],
                ['Abattement IR (6e-21e an)', '6 % × (n − 5)'],
                ['Abattement IR (22e an)', '6 % × 16 + 4 % = 100 %'],
                ['Abattement PS (6e-21e an)', '1,65 % × (n − 5)'],
                ['Abattement PS (22e an)', '28 % ; + 9 %/an jusqu\'à 30 ans'],
                ['IR', 'PV nette IR × 19 %'],
                ['Prélèvements sociaux', 'PV nette PS × 17,2 %'],
                ['Surtaxe (si PV nette IR > 50 000 €)', '2 % à 6 % avec tempérament par seuil'],
              ].map(([label, val]) => (
                <div key={label} className="font-mono">
                  <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
                  <p className="text-xs text-neutral-700">{val}</p>
                </div>
              ))}
            </div>
          </div>

          <SourcesSection slug="plus-value-immobiliere" />

          <div className="border-l-4 border-primary-200 bg-primary-50 px-4 py-3">
            <p className="text-sm text-primary-800">
              <strong>Millésime fiscal : 2026.</strong> Barèmes applicables aux cessions réalisées en 2026.
              Dernière vérification des sources : 02/05/2026. Ce calculateur est indicatif ;
              le notaire calcule et prélève les impôts définitifs lors de la cession.
            </p>
          </div>
        </>
      }
    >

      {/* Explications */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white border border-neutral-200 p-8 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Quatre règles à connaître avant la cession</h2>

          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              <strong>Vous avez vendu plus cher que vous n&apos;avez acheté : vous payez des impôts sur la différence.</strong>{' '}
              Mais le prix d&apos;achat pris en compte n&apos;est pas que le prix que vous avez payé à l&apos;époque.
              On y ajoute les frais de notaire (ou 7,5 % en forfait) et les travaux que vous avez réalisés
              (ou 15 % en forfait si vous détenez le bien depuis plus de 5 ans). Plus vous avez dépensé,
              moins le gain imposable est élevé.
            </p>

            <p>
              <strong>Plus vous gardez longtemps, moins vous payez, et à partir d&apos;un certain stade, vous ne payez plus rien.</strong>{' '}
              Deux taxes s&apos;appliquent sur le gain : l&apos;impôt sur le revenu (19 %) et les prélèvements sociaux (17,2 %).
              Chaque année supplémentaire de détention réduit les impôts, mais les deux taxes s&apos;annulent
              à des moments différents. Après 22 ans de détention : l&apos;impôt sur le revenu tombe à zéro.
              Après 30 ans : les prélèvements sociaux aussi. Avant ces seuils, vous payerez quelque chose.
            </p>

            <p>
              <strong>Si votre gain dépasse 50 000 €, une taxe supplémentaire s&apos;ajoute.</strong>{' '}
              Elle varie de 2 % à 6 % selon le montant. C&apos;est le notaire qui la calcule et la prélève
              directement le jour de la vente. Vous recevez le prix net, déjà déduit de tous les impôts.
            </p>

            <p>
              <strong>Certains cas = zéro impôt.</strong>{' '}
              Votre résidence principale est toujours exonérée, sans condition.
              Si le prix de vente est inférieur à 15 000 €, même chose.
              Et si c&apos;est votre première vente d&apos;un bien autre que votre résidence principale,
              vous pouvez être exonéré. Deux conditions cumulatives : ne pas avoir été propriétaire de votre résidence
              principale dans les 4 ans avant la vente, et réinvestir le produit dans votre
              future résidence principale dans les 2 ans.
            </p>
          </div>
        </div>
      </section>

      {/* Tableau abattements */}
      <section className="max-w-4xl mx-auto px-6 py-4 pb-8">
        <div className="bg-white border border-neutral-200 p-8">
          <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
            Combien économisez-vous selon le nombre d&apos;années de détention ?
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            Chaque année supplémentaire réduit le gain imposable. Les deux taxes (impôt sur le revenu et prélèvements sociaux)
            ne suivent pas le même rythme, d&apos;où deux colonnes.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Impôt sur le revenu : 19 %</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 text-neutral-500 font-mono text-xs">Durée de détention</th>
                    <th className="text-right py-2 text-neutral-500 font-mono text-xs">Réduction du gain imposable</th>
                  </tr>
                </thead>
                <tbody>
                  {ABATTEMENTS_IR.map(({ annees, taux }) => (
                    <tr key={annees} className="border-b border-neutral-100">
                      <td className="py-1.5 text-neutral-700">{annees} ans</td>
                      <td className={`py-1.5 text-right font-medium ${taux.includes('exo') ? 'text-green-700' : 'text-neutral-900'}`}>
                        {taux}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-neutral-500 mt-2">Source : Art. 150 VC CGI</p>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Prélèvements sociaux (CSG/CRDS) : 17,2 %</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-2 text-neutral-500 font-mono text-xs">Durée de détention</th>
                    <th className="text-right py-2 text-neutral-500 font-mono text-xs">Réduction du gain imposable</th>
                  </tr>
                </thead>
                <tbody>
                  {ABATTEMENTS_PS.map(({ annees, taux }) => (
                    <tr key={annees} className="border-b border-neutral-100">
                      <td className="py-1.5 text-neutral-700">{annees} ans</td>
                      <td className={`py-1.5 text-right font-medium ${taux.includes('exo') ? 'text-green-700' : 'text-neutral-900'}`}>
                        {taux}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-neutral-500 mt-2">Source : Art. L136-7 CSS VI 2</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-4 pb-8">
        <div className="bg-white border border-neutral-200 p-8 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Questions fréquentes</h2>

          <div className="space-y-5">
            {[
              {
                q: 'De quelles manières puis-je déduire les travaux que j\'ai réalisés ?',
                r: 'Vous pouvez déduire les travaux de deux façons : soit avec vos factures (montant réel), soit avec un forfait de 15 % du prix d\'achat, sans justificatif. Mais ce forfait n\'est accessible que si vous avez possédé le bien plus de 5 ans, et uniquement pour des travaux que vous n\'avez pas déjà déduits de vos loyers imposables. Si vous avez déclaré des revenus fonciers avec des travaux en charges, vous ne pouvez pas les compter une deuxième fois ici.',
              },
              {
                q: 'Pourquoi l\'impôt et les « prélèvements sociaux » ne disparaissent pas au même moment ?',
                r: 'Ce sont deux taxes différentes qui suivent des règles différentes. L\'impôt sur le revenu (19 %) disparaît complètement après 22 ans. Les prélèvements sociaux, la CSG et la CRDS que vous connaissez sur vos fiches de paie, eux, ne disparaissent qu\'après 30 ans. Donc entre 22 et 30 ans de détention, vous ne payez plus les 19 % mais vous payez encore une partie des 17,2 %.',
              },
              {
                q: 'La taxe supplémentaire au-dessus de 50 000 €, comment ça marche ?',
                r: 'C\'est une taxe qui s\'ajoute quand votre gain (après réduction pour ancienneté) dépasse 50 000 €. Elle monte de 2 % à 6 % par paliers. Pour éviter un effet de seuil brutal, chaque palier intègre une formule de lissage, en clair, si vous êtes juste au-dessus de 50 000 €, vous ne payez que quelques euros de surtaxe, pas 2 % sur tout le montant d\'un coup.',
              },
              {
                q: 'Qui s\'occupe de calculer et payer les impôts le jour de la vente ?',
                r: 'C\'est le notaire. Il calcule tout, prélève les impôts sur le prix de vente, et verse le solde au fisc. Vous, vous recevez directement la somme nette sur votre compte, tout déduit. Ce calculateur vous donne une estimation, le chiffre définitif, c\'est lui qui l\'établit.',
              },
              {
                q: 'J\'ai vendu moins cher que j\'ai acheté, est-ce que je peux récupérer quelque chose ?',
                r: 'Non. Vous ne payez aucun impôt bien sûr, mais la perte n\'est pas récupérable : elle ne se déduit pas de vos revenus ni de vos futurs gains immobiliers. Elle est simplement « perdue » fiscalement.',
              },
              {
                q: 'J\'ai loué mon bien en meublé (LMNP), ce calculateur est-il fiable ?',
                r: 'Pas complètement. Depuis le 15 février 2025, si vous avez déduit des amortissements sur ce bien dans le cadre d\'une location meublée, la loi réduit votre prix d\'achat de référence du montant de ces amortissements, ce qui augmente le gain imposable. Ce calculateur ne vous pose pas la question et donnera un résultat trop optimiste dans ce cas. Consultez un notaire pour un calcul précis.',
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
