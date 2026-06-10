// src/app/faq/pea/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_PEA } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ PEA 2026 : fiscalite, plafond, passif latent | CalculPatrimoine',
  description: "Questions frequentes sur le PEA : plafond 150 000 EUR, exoneration apres 5 ans, prelevements sociaux 17,2 %, passif fiscal latent.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/pea' },
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
    title: 'Le PEA en pratique',
    items: [
      {
        question: "Qu'est-ce que le PEA et qui peut en ouvrir un ?",
        answer: (
          <>
            <p className="mb-3">
              Le PEA (Plan d&apos;Épargne en Actions) est une enveloppe fiscale créée en 1992
              (Art. 163 quinquies D CGI) qui permet d&apos;investir en actions européennes en
              bénéficiant d&apos;une exonération d&apos;impôt sur le revenu sur les plus-values
              après 5 ans. Seuls les prélèvements sociaux (17,2 %) restent dus.
            </p>
            <p>
              Un seul PEA par personne, réservé aux résidents fiscaux français majeurs. Un
              couple peut détenir deux PEA distincts.
            </p>
          </>
        ),
      },
      {
        question: 'Quel plafond de versement sur un PEA ?',
        answer: (
          <>
            <p className="mb-3">Trois plafonds selon le type :</p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>PEA classique : 150 000 €</li>
              <li>PEA-PME : 225 000 € (titres de PME et ETI européennes)</li>
              <li>PEA Jeunes : 20 000 € (18-25 ans rattachés au foyer fiscal des parents)</li>
            </ul>
            <p>
              Les plafonds se cumulent : un même titulaire peut détenir un PEA classique et
              un PEA-PME, jusqu&apos;à 225 000 € au total entre les deux.
            </p>
          </>
        ),
      },
      {
        question: 'Quels supports puis-je détenir dans un PEA ?',
        answer: (
          <>
            <p className="mb-3">
              Actions de sociétés ayant leur siège dans l&apos;Union européenne ou
              l&apos;Espace économique européen, et OPCVM (fonds, ETF) éligibles dès lors
              qu&apos;ils investissent au moins 75 % en titres européens.
            </p>
            <p>
              Les actions américaines ou asiatiques en direct ne sont pas éligibles, mais des
              ETF synthétiques permettent une exposition indirecte au S&amp;P 500 ou aux
              marchés émergents tout en restant dans le PEA.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Fiscalité',
    items: [
      {
        question: 'Comment est imposé un retrait avant 5 ans ?',
        answer: (
          <p>
            Un retrait avant 5 ans entraîne la clôture automatique du PEA et
            l&apos;imposition des gains au prélèvement forfaitaire unique de 30 % (12,8 %
            d&apos;impôt sur le revenu + 17,2 % de prélèvements sociaux), sauf cas
            particuliers : licenciement, invalidité, retraite anticipée, qui n&apos;entraînent
            que les prélèvements sociaux.
          </p>
        ),
      },
      {
        question: 'Et après 5 ans ?',
        answer: (
          <p>
            Après 5 ans de détention, les plus-values sont totalement exonérées
            d&apos;impôt sur le revenu (Art. 157-5° bis CGI). Seuls les prélèvements sociaux
            de 17,2 % restent dus, calculés sur la fraction de plus-value du retrait. Le
            PEA reste ouvert et permet de continuer à verser et retirer librement.
          </p>
        ),
      },
      {
        question: 'Les dividendes sont-ils taxés à l\'intérieur du PEA ?',
        answer: (
          <p>
            Non. Tant que les dividendes restent investis dans le PEA, ils ne subissent
            aucune imposition. Le PEA fonctionne en capitalisation : dividendes et
            plus-values s&apos;accumulent sans frottement fiscal. L&apos;imposition
            n&apos;intervient qu&apos;au moment du retrait.
          </p>
        ),
      },
      {
        question: 'Si je fais un retrait après 5 ans, dois-je clôturer le PEA ?',
        answer: (
          <p>
            Non. Depuis la loi PACTE de 2019, un retrait après 5 ans n&apos;entraîne plus la
            clôture du PEA. Vous pouvez continuer à verser et retirer librement. Avant la
            réforme, tout retrait entre 5 et 8 ans interdisait les versements futurs : cette
            règle a disparu.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Patrimoine et limites',
    items: [
      {
        question: 'Qu\'est-ce que le passif fiscal latent d\'un PEA ?',
        answer: (
          <>
            <p className="mb-3">
              Le passif latent est l&apos;impôt qui serait dû si le PEA était soldé
              aujourd&apos;hui. Même exonéré d&apos;impôt sur le revenu après 5 ans, le PEA
              reste soumis aux prélèvements sociaux de 17,2 % sur la fraction de
              plus-value du retrait.
            </p>
            <p className="mb-3">
              Sur un PEA à 100 000 € dont 40 000 € de plus-value latente, le passif est
              de 40 000 × 17,2 % = 6 880 €.
            </p>
            <p>
              Cette information complète la valeur brute affichée par le courtier et permet
              de comparer honnêtement le PEA à d&apos;autres enveloppes.
            </p>
            <div className="mt-4">
              <CrossLink
                href="/pea"
                title="Calculateur PEA"
                description="Estime le net après prélèvements sociaux d'un retrait, et calcule le passif fiscal latent du PEA."
              />
            </div>
          </>
        ),
      },
      {
        question: 'Le PEA est-il imposé à la succession ?',
        answer: (
          <p>
            Le PEA est clôturé au décès du titulaire. Les prélèvements sociaux dus à la
            date du décès sont calculés sur les plus-values latentes (sans IR car régime
            applicable au-delà de 5 ans considéré acquis). Les titres ou liquidités sont
            ensuite transmis aux héritiers, qui subissent les droits de succession
            classiques (Art. 779 CGI) sur la valeur nette des prélèvements sociaux.
          </p>
        ),
      },
      {
        question: 'Mes données sont-elles stockées quelque part ?',
        answer: (
          <>
            <p className="mb-3">
              Non. Tous les calculs sont effectués localement dans votre navigateur. Aucune
              donnée n&apos;est transmise à un serveur ni conservée après fermeture de la
              page.
            </p>
            <p>
              Le code source est ouvert et vérifiable sur{' '}
              <a
                href="https://github.com/nba67000/calculpatrimoine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </>
        ),
      },
    ],
  },
]

export default function FAQPeaPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_PEA} />
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <header className="mb-12">
            <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8">
              <Link href="/" className="hover:text-primary-600 transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/faq" className="hover:text-primary-600 transition-colors">FAQ</Link>
              <span>/</span>
              <span className="text-neutral-600">PEA</span>
            </nav>

            <div className="h-[2px] w-10 bg-accent-400 mb-6" />

            <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              Questions fréquentes<br />PEA (Plan d&apos;Épargne en Actions)
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mb-10">
              Plafond, fiscalité après 5 ans, prélèvements sociaux, passif fiscal latent,
              succession. Réponses factuelles avec références au CGI.
            </p>

            <Link
              href="/pea"
              className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur PEA</div>
                  <div className="text-lg font-bold">Net après PS et passif fiscal latent</div>
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
              { href: '/faq/assurance-vie', label: 'FAQ Assurance-Vie', desc: 'L\'autre enveloppe défiscalisée : PFU vs IR sur les rachats, abattement 8 ans.' },
              { href: '/faq/tmi', label: 'FAQ TMI', desc: 'Votre tranche détermine l\'arbitrage PFU 30 % vs barème IR sur les autres placements.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'Assurance-vie, PER, transmission, IFI et autres sujets.' },
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
