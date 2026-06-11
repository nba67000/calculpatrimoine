// src/app/faq/ifi/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_IFI } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ IFI 2026 - Impôt sur la fortune immobilière',
  description: "Seuil 1 300 000 €, barème progressif, abattement résidence principale 30 %, décote et plafonnement IFI + IR.",

  alternates: { canonical: 'https://calculpatrimoine.fr/faq/ifi' },
}

interface FAQItem {
  question: string
  answer: ReactNode
}

interface FAQSection {
  title: string
  items: FAQItem[]
}

const sections: FAQSection[] = [
  {
    title: 'Principes généraux',
    items: [
      {
        question: "Qu'est-ce que l'IFI et qui est concerné ?",
        answer: (
          <>
            <p className="mb-3">
              L&apos;impôt sur la fortune immobilière (IFI) est un impôt annuel qui remplace l&apos;ISF depuis 2018.
              Il est dû par les personnes physiques dont le patrimoine immobilier net dépasse <strong>1 300 000 €</strong> au 1er janvier de l&apos;année d&apos;imposition (Art. 964 CGI).
            </p>
            <p className="mb-3">
              Ce seuil concerne le <strong>foyer fiscal</strong> dans son ensemble, pas chaque personne séparément. Un couple marié ou pacsé n&apos;a qu&apos;un seul seuil à 1 300 000 €, même si les biens sont détenus séparément.
            </p>
            <p>
              Si vous habitez à l&apos;étranger, seuls vos biens situés en France entrent dans le calcul. Les résidents français sont taxés sur l&apos;ensemble de leur patrimoine immobilier mondial, sous réserve des conventions fiscales internationales.
            </p>
          </>
        ),
      },
      {
        question: 'Quels biens immobiliers entrent dans le calcul de l\'IFI ?',
        answer: (
          <>
            <p className="mb-3">Ces biens entrent dans l&apos;IFI :</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li>Biens détenus directement : maisons, appartements, terrains, garages, parkings</li>
              <li>Biens détenus via des sociétés : quote-part des actifs immobiliers (SCI, SCPI, sociétés opérationnelles)</li>
              <li>Droits réels immobiliers : usufruit, nue-propriété (avec règles spécifiques)</li>
              <li>Contrats d&apos;assurance-vie en unités de compte immobilières (part représentant de l&apos;immobilier)</li>
            </ul>
            <p>Ne sont pas concernés : les biens professionnels, les œuvres d&apos;art, les bois et forêts (75 % exonérés), les biens ruraux loués par bail à long terme (75 % exonérés selon conditions Art. 976 CGI).</p>
          </>
        ),
      },
      {
        question: "Comment fonctionne l'abattement de 30 % sur la résidence principale ?",
        answer: (
          <>
            <p className="mb-3">
              La résidence principale bénéficie d&apos;un abattement forfaitaire de 30 % sur sa valeur vénale (Art. 973 CGI).
              Cet abattement est automatique, sans démarche particulière.
            </p>
            <p className="mb-3">
              Exemple : une résidence principale estimée à 800 000 € ne compte que pour 560 000 € dans le calcul de l&apos;IFI (800 000 × 70 %).
            </p>
            <p>
              Cet abattement ne s&apos;applique qu&apos;à la résidence principale effective du foyer, pas à une résidence secondaire même très utilisée. En cas de détention en indivision, l&apos;abattement s&apos;applique sur la part détenue.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Calcul et barème',
    items: [
      {
        question: 'Quel est le barème IFI 2026 ?',
        answer: (
          <>
            <p className="mb-3">Le barème IFI est progressif, inchangé depuis 2018 (Art. 977 CGI) :</p>
            <table className="w-full text-sm mb-3 border border-neutral-200">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="text-left px-3 py-2 border-b border-neutral-200 font-mono text-xs">Tranche de patrimoine net</th>
                  <th className="text-right px-3 py-2 border-b border-neutral-200 font-mono text-xs">Taux</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['0 € à 800 000 €', '0 %'],
                  ['800 000 € à 1 300 000 €', '0,50 %'],
                  ['1 300 000 € à 2 570 000 €', '0,70 %'],
                  ['2 570 000 € à 5 000 000 €', '1,00 %'],
                  ['5 000 000 € à 10 000 000 €', '1,25 %'],
                  ['Au-delà de 10 000 000 €', '1,50 %'],
                ].map(([tr, tx]) => (
                  <tr key={tr} className="border-b border-neutral-100">
                    <td className="px-3 py-2 text-neutral-700">{tr}</td>
                    <td className="px-3 py-2 text-right font-bold">{tx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-neutral-600">
              Rappel : chaque taux ne s&apos;applique que sur la partie du patrimoine qui tombe dans cette tranche - pas sur l&apos;ensemble. Un patrimoine de 2 000 000 € génère un IFI de 7 400 €, soit 0,37 % de taux effectif.
            </p>
            <div className="mt-4">
              <CrossLink href="/ifi" title="Calculateur IFI 2026" description="Saisissez votre patrimoine net et simulez votre IFI: décote et plafonnement inclus." />
            </div>
          </>
        ),
      },
      {
        question: "Qu'est-ce que la décote progressive IFI ?",
        answer: (
          <>
            <p className="mb-3">
              Pour les patrimoines entre 1 300 000 € et 1 400 000 €, une décote vient réduire l&apos;IFI à payer.
              La formule est : <strong>17 500 € − 1,25 % × patrimoine net taxable</strong>.
            </p>
            <p className="mb-3">
              Cette décote vise à éviter un effet de seuil brutal. Sans elle, un contribuable à 1 305 000 € paierait
              brutalement le même IFI qu&apos;un contribuable à 1 350 000 € selon le barème brut.
            </p>
            <div className="bg-neutral-100 p-4 font-mono text-sm mb-3">
              <p>Patrimoine 1 300 000 € → décote = 17 500 − 1,25 % × 1 300 000 = <strong>1 250 €</strong></p>
              <p>Patrimoine 1 350 000 € → décote = 17 500 − 1,25 % × 1 350 000 = <strong>625 €</strong></p>
              <p>Patrimoine 1 400 000 € → décote = 17 500 − 1,25 % × 1 400 000 = <strong>0 €</strong></p>
            </div>
            <p>Au-delà de 1 400 000 €, la décote s&apos;annule et c&apos;est le barème brut qui s&apos;applique intégralement.</p>
          </>
        ),
      },
      {
        question: 'Quelles dettes peut-on déduire dans le calcul de l\'IFI ?',
        answer: (
          <>
            <p className="mb-3">Sont déductibles les dettes existantes au 1er janvier et contractées pour (Art. 974 CGI) :</p>
            <ul className="list-disc pl-5 mb-3 space-y-1">
              <li><strong>L&apos;acquisition</strong> de biens taxables : capital restant dû des emprunts immobiliers</li>
              <li><strong>La construction, réparation ou amélioration</strong> des biens : solde des prêts travaux</li>
              <li><strong>Les taxes foncières</strong> dues sur les biens au 1er janvier</li>
            </ul>
            <p className="mb-3">
              Ne sont pas déductibles : les prêts à la consommation, les crédits non liés aux biens taxables,
              les dettes envers des proches sous certaines conditions.
            </p>
            <p className="text-sm text-neutral-600">
              Important : depuis 2018, les emprunts déductibles sont plafonnés pour les patrimoines de plus
              de 5 000 000 € (Art. 974 II CGI). Ce calculateur ne gère pas ce plafond.
            </p>
            <div className="mt-4">
              <CrossLink href="/ifi" title="Calculateur IFI" description="Saisissez votre patrimoine net de dettes et calculez votre IFI 2026." />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: 'Plafonnement et optimisation',
    items: [
      {
        question: 'Comment fonctionne le plafonnement IFI + IR ?',
        answer: (
          <>
            <p className="mb-3">
              Selon l&apos;Art. 979 CGI, la somme IFI + impôt sur le revenu ne peut excéder 75 % de vos revenus de l&apos;année (revenu fiscal de référence). Si ce seuil est dépassé, l&apos;IFI est réduit du montant qui dépasse 75 %.
            </p>
            <p className="mb-3">
              Exemple : revenus = 60 000 €, IR = 40 000 €, IFI calculé = 15 000 €.
              Seuil = 75 % × 60 000 = 45 000 €. IFI + IR = 55 000 € &gt; 45 000 €.
              IFI plafonné = 45 000 − 40 000 = <strong>5 000 €</strong>.
            </p>
            <p>
              Ce mécanisme bénéficie principalement aux contribuables dont les revenus sont faibles par
              rapport au patrimoine : retraités avec un patrimoine immobilier important peu rentable,
              propriétaires d&apos;un bien familial de valeur non loué.
            </p>
          </>
        ),
      },
      {
        question: 'Quand et comment déclarer l\'IFI ?',
        answer: (
          <p>
            L&apos;IFI est déclaré en même temps que la déclaration de revenus (formulaire 2042-IFI, annexe).
            La date limite est celle de la déclaration d&apos;IR, soit fin mai ou début juin selon le département.
            Le paiement intervient en septembre de l&apos;année de déclaration. Si le patrimoine net
            dépasse 1 300 000 €, il est obligatoire de remplir cette annexe, même si le solde IFI
            après décote et plafonnement est nul.
          </p>
        ),
      },
      {
        question: 'La nue-propriété est-elle taxée à l\'IFI ?',
        answer: (
          <p>
            Quand un bien est divisé entre quelqu&apos;un qui en a l&apos;usage (l&apos;usufruitier) et quelqu&apos;un qui en est
            propriétaire sans pouvoir l&apos;utiliser (le nu-propriétaire), c&apos;est l&apos;usufruitier qui déclare
            la valeur totale du bien dans son IFI (Art. 968 CGI). Le nu-propriétaire ne déclare rien.
            Ce calculateur ne couvre pas les biens en démembrement : déduisez directement la valeur concernée
            avant de saisir le total.
          </p>
        ),
      },
      {
        question: 'Les parts de SCPI entrent-elles dans l\'IFI ?',
        answer: (
          <p>
            Oui, mais pas pour la totalité de leur valeur. Une SCPI (société civile de placement
            immobilier) peut contenir une part de trésorerie ou d&apos;autres actifs non immobiliers :
            seule la part immobilière entre dans l&apos;IFI. Chaque année, la SCPI vous communique le
            pourcentage à retenir (appelé « coefficient IFI »). Ce calculateur part du principe
            que vous intégrez directement la valeur IFI de vos parts dans le montant total
            renseigné.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Limites et cas non couverts',
    items: [
      {
        question: 'Ce calculateur est-il fiable pour une SCI ?',
        answer: (
          <p>
            Partiellement. Pour une SCI, seule la fraction des actifs immobiliers représentant des biens
            taxables doit être déclarée, proportionnellement aux parts détenues. Ce calculateur vous
            permet de saisir directement la valeur IFI de vos parts, si vous l&apos;avez calculée par ailleurs.
            Le calcul interne de la quote-part taxable d&apos;une SCI n&apos;est pas automatisé ici - il dépend de
            la structure bilancielle de la société.
          </p>
        ),
      },
      {
        question: 'Les biens professionnels sont-ils exonérés ?',
        answer: (
          <p>
            Oui, les biens nécessaires à l&apos;exercice d&apos;une activité professionnelle principale sont exonérés
            d&apos;IFI (Art. 975 CGI). Cette exonération s&apos;applique aux biens utilisés pour votre activité
            professionnelle (industrielle, commerciale, artisanale, agricole ou libérale) ou celle d&apos;un
            membre de votre foyer. Ce calculateur ne modélise pas cette exonération : déduisez directement
            la valeur des biens professionnels avant de saisir le total.
          </p>
        ),
      },
    ],
  },
]

export default function FAQIFIPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_IFI} />
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/faq', label: 'FAQ' },
          { label: 'IFI' },
        ]}
        titre="FAQ - Impôt sur la fortune immobilière (IFI)"
        description={<>Tout ce qu&apos;il faut savoir sur l&apos;IFI : seuil, barème, abattement résidence principale, dettes déductibles, décote et plafonnement.</>}
      />
      <div style={{ backgroundColor: '#F7F3EC' }}>

        <section className="max-w-4xl mx-auto px-6 py-12">
          <LegalDisclaimer />
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-12 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-xl font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
                {section.title}
              </h2>
              <div>
                {section.items.map((item) => (
                  <FAQAccordionClient key={item.question} question={item.question}>{item.answer}</FAQAccordionClient>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-white border border-neutral-200 p-6 text-center">
            <p className="text-neutral-700 mb-4">
              Vous avez calculé votre IFI estimatif ?
            </p>
            <Link
              href="/ifi"
              className="inline-block bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              Simuler mon IFI 2026
            </Link>
          </div>

          <p className="font-mono text-xs text-neutral-400 text-center leading-relaxed">
            Outil indicatif uniquement. Ne constitue pas un conseil fiscal personnalisé.
          </p>
        </section>

      </div>
      <Footer />
    </>
  )
}
