// src/app/faq/tmi/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_TMI } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: "FAQ Tranche Marginale d'Imposition 2026 | CalculPatrimoine",
  description: "Questions fréquentes sur la TMI : barème IR 2026, quotient familial, décote, différence TMI et taux moyen.",

  alternates: { canonical: 'https://calculpatrimoine.fr/faq/tmi' },
}

interface FAQItem {
  question: string
  answer: ReactNode
}

interface FAQSection {
  title: string
  items: FAQItem[]
}

const TRANCHES_2026 = [
  { tranche: "Jusqu'à 11 600 €", taux: '0 %' },
  { tranche: 'De 11 601 € à 29 579 €', taux: '11 %' },
  { tranche: 'De 29 580 € à 84 577 €', taux: '30 %' },
  { tranche: 'De 84 578 € à 181 917 €', taux: '41 %' },
  { tranche: 'Au-delà de 181 917 €', taux: '45 %' },
]

const sections: FAQSection[] = [
  {
    title: "Comprendre la TMI",
    items: [
      {
        question: "C'est quoi la Tranche Marginale d'Imposition (TMI) ?",
        answer: (
          <>
            <p className="mb-3">
              La TMI est le taux auquel est imposé le <strong>dernier euro de votre revenu</strong>.
              En France, l&apos;impôt sur le revenu est <strong>progressif</strong> : chaque tranche
              de revenus est taxée à un taux différent, croissant.
            </p>
            <p className="mb-3"><strong>Barème IR 2026 (revenus 2025) par part fiscale :</strong></p>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-2 text-left">Tranche de revenu</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Taux</th>
                </tr>
              </thead>
              <tbody>
                {TRANCHES_2026.map(({ tranche, taux }) => (
                  <tr key={tranche}>
                    <td className="border border-neutral-300 px-4 py-2">{tranche}</td>
                    <td className="border border-neutral-300 px-4 py-2 font-bold">{taux}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-primary-50 border-l-4 border-primary-400 p-4">
              <p className="text-sm text-primary-900">
                <strong>Important</strong> : ces tranches s&apos;appliquent au revenu <em>par part fiscale</em>
                (revenu net imposable ÷ nombre de parts). Un couple sans enfant a 2 parts.
              </p>
            </div>
          </>
        ),
      },
      {
        question: "Quelle différence entre TMI et taux moyen d'imposition ?",
        answer: (
          <>
            <p className="mb-3">
              Ce sont deux notions très différentes, souvent confondues :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>
                <strong>TMI</strong> : taux du dernier euro gagné. Utile pour savoir combien
                vous coûte un revenu supplémentaire ou combien vous économisez sur une déduction.
              </li>
              <li>
                <strong>Taux moyen</strong> : impôt total ÷ revenu total. Représente le vrai
                taux global de votre imposition.
              </li>
            </ul>
            <div className="bg-primary-100 p-4 border border-neutral-200">
              <p className="mb-2 text-sm font-bold">Exemple (célibataire, 50 000€ net imposable) :</p>
              <ul className="text-sm space-y-1">
                <li>Tranches à 0 % : 11 600€ → 0€</li>
                <li>Tranche à 11 % : 17 979€ → 1 978€</li>
                <li>Tranche à 30 % : 20 421€ → 6 126€</li>
                <li className="font-bold mt-2">Impôt total : ~8 104€</li>
                <li><strong>TMI : 30 %</strong> (dernière tranche atteinte)</li>
                <li><strong>Taux moyen : ~16,2 %</strong> (8 104 ÷ 50 000)</li>
              </ul>
            </div>
          </>
        ),
      },
      {
        question: "Sur quel revenu est calculée la TMI ? Brut ou net ?",
        answer: (
          <>
            <p className="mb-3">
              La TMI est calculée sur le <strong>revenu net imposable</strong>, qui est différent
              du salaire brut et du salaire net :
            </p>
            <div className="bg-neutral-100 border border-neutral-200 p-4 mb-3 font-mono text-sm space-y-1">
              <p>Salaire brut</p>
              <p>− Cotisations sociales salariales</p>
              <p>= Salaire net</p>
              <p>− Abattement frais professionnels (10 %, min 509€, max 14 555€)</p>
              <p>= Revenu net imposable</p>
            </div>
            <p className="text-sm text-neutral-600">
              Le calculateur TMI de CalculPatrimoine part directement du revenu net imposable.
              Si vous saisissez votre salaire brut, utilisez d&apos;abord le simulateur impots.gouv.fr
              pour obtenir votre revenu net imposable exact.
            </p>
            <div className="mt-4">
              <CrossLink href="/tmi" title="Calculateur TMI" description="Calculez votre tranche marginale et votre impôt sur le revenu 2026 à partir du revenu net imposable." />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Quotient familial et décote",
    items: [
      {
        question: "C'est quoi le quotient familial ?",
        answer: (
          <>
            <p className="mb-3">
              Le quotient familial divise le revenu net imposable par le nombre de <strong>parts fiscales</strong>
              du foyer. Cela réduit la tranche atteinte et donc l&apos;impôt.
            </p>
            <p className="mb-3"><strong>Nombre de parts :</strong></p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>Célibataire, divorcé : 1 part</li>
              <li>Couple marié ou pacsé : 2 parts</li>
              <li>+ 0,5 part par enfant à charge (1re et 2e enfant)</li>
              <li>+ 1 part à partir du 3e enfant</li>
            </ul>
            <div className="bg-primary-100 p-4 border border-neutral-200">
              <p className="mb-2 text-sm font-bold">Exemple : couple avec 2 enfants</p>
              <ul className="text-sm space-y-1">
                <li>Revenu net imposable : 80 000€</li>
                <li>Parts : 2 + 0,5 + 0,5 = <strong>3 parts</strong></li>
                <li>Revenu par part : 80 000 ÷ 3 = <strong>26 667€</strong></li>
                <li>TMI atteinte : <strong>11 %</strong> (bien en dessous des 30 %)</li>
              </ul>
            </div>
          </>
        ),
      },
      {
        question: "C'est quoi la décote et qui en bénéficie ?",
        answer: (
          <>
            <p className="mb-3">
              La décote est un mécanisme qui <strong>réduit ou annule l&apos;impôt</strong> pour les
              foyers à faibles revenus, afin d&apos;éviter une entrée brutale dans l&apos;imposition.
            </p>
            <p className="mb-3"><strong>Paramètres 2026 (indexés +0,9 %) :</strong></p>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-2 text-left">Situation</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Seuil impôt brut</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Formule</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Célibataire</td>
                  <td className="border border-neutral-300 px-4 py-2">&lt; 1 929€</td>
                  <td className="border border-neutral-300 px-4 py-2 font-mono text-xs">1 929 − 0,75 × impôt brut</td>
                </tr>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Couple</td>
                  <td className="border border-neutral-300 px-4 py-2">&lt; 3 191€</td>
                  <td className="border border-neutral-300 px-4 py-2 font-mono text-xs">3 191 − 0,75 × impôt brut</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-neutral-600">
              Source : BOFiP BOI-IR-LIQ-20-20-30 - paramètres 2026.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "Utilité de la TMI",
    items: [
      {
        question: "À quoi sert de connaître sa TMI ?",
        answer: (
          <>
            <p className="mb-3">
              La TMI est la <strong>variable clé de presque toutes vos décisions fiscales</strong> :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>
                <strong>PER individuel</strong> : l&apos;économie d&apos;impôt = versement × TMI.
                À 30 %, 5 000€ versés = 1 500€ d&apos;économie.
              </li>
              <li>
                <strong>Rachat assurance-vie</strong> : choisir entre PFU (30 %) et IR + PS
                dépend de votre TMI. Si TMI ≤ 11 %, l&apos;IR est souvent plus avantageux.
              </li>
              <li>
                <strong>Optimisation des revenus</strong> : savoir si augmenter ses revenus
                fait franchir une tranche supérieure.
              </li>
              <li>
                <strong>Donation, investissement locatif</strong> : évaluer l&apos;imposition réelle
                de revenus supplémentaires.
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "Mes données sont-elles stockées ou envoyées quelque part ?",
        answer: (
          <>
            <p className="mb-3">
              <strong>Non, absolument pas.</strong> Tous les calculs sont effectués localement dans votre
              navigateur. Aucune donnée n&apos;est transmise à un serveur ni conservée après fermeture de la page.
            </p>
            <p>
              Le code source est open-source et vérifiable sur{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                GitHub
              </a>.
            </p>
          </>
        ),
      },
    ],
  },
]

export default function FAQTMIPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_TMI} />
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/faq', label: 'FAQ' },
          { label: 'TMI' },
        ]}
        titre={<>Questions fréquentes<br />Tranche Marginale d&apos;Imposition</>}
        description={<>TMI vs taux moyen, barème 2026, quotient familial, décote - tout ce qu&apos;il faut savoir pour lire correctement votre avis d&apos;imposition.</>}
      />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <header className="mb-12">
            <Link
              href="/tmi"
              className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur TMI</div>
                  <div className="text-lg font-bold">Calculez votre TMI et votre IR 2026</div>
                </div>
                <div className="text-2xl group-hover:translate-x-1 transition-transform">→</div>
              </div>
            </Link>
          </header>

          {sections.map((section, i) => (
            <section key={i} className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">{section.title}</h2>
              <div>
                {section.items.map((item, j) => (
                  <FAQAccordionClient key={j} question={item.question}>{item.answer}</FAQAccordionClient>
                ))}
              </div>
            </section>
          ))}

          <div className="border-t border-neutral-300">
            {[
              { href: '/faq/per', label: 'FAQ PER Individuel', desc: 'La TMI détermine l\'économie d\'impôt sur vos versements PER.' },
              { href: '/faq/assurance-vie', label: 'FAQ Assurance-Vie', desc: 'PFU vs IR : votre TMI détermine quelle option est moins taxée.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'Rente viagère, transmission, PER - retrouvez chaque FAQ.' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
                style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
              >
                <div>
                  <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">{link.label}</p>
                  <p className="text-sm text-neutral-500">{link.desc}</p>
                </div>
                <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
              </Link>
            ))}
          </div>

          <div className="bg-primary-700 p-8 text-center text-white mt-12">
            <h3 className="font-serif text-2xl font-bold mb-3">Vous avez d&apos;autres questions ?</h3>
            <p className="text-primary-200 mb-6 font-mono text-sm">Réponse par email sous 48h.</p>
            <a href="mailto:contact@calculpatrimoine.fr" className="inline-block bg-white text-primary-700 px-8 py-3 font-medium hover:bg-neutral-100 transition-colors">
              Nous contacter →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
