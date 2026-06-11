// src/app/faq/donation-demembrement/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_DONATION_DEMEMBREMENT } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ Donation demembrement 2026 : Art. 669 CGI',
  description: "Questions frequentes sur la donation avec demembrement : bareme Art. 669, avantage fiscal, extinction usufruit au deces, risque de requalification.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/donation-demembrement' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'Le mécanisme',
    items: [
      {
        question: "C'est quoi le démembrement de propriété ?",
        answer: (
          <>
            <p className="mb-3">
              Le démembrement sépare la propriété d&apos;un bien en deux droits distincts :
              l&apos;usufruit (le droit d&apos;utiliser le bien et d&apos;en encaisser les
              loyers) et la nue-propriété (le droit de devenir propriétaire plein du bien
              plus tard).
            </p>
            <p className="mb-3">
              Exemple concret : un parent donne la nue-propriété de sa maison à son enfant
              mais garde le droit d&apos;y vivre (l&apos;usufruit) jusqu&apos;à son décès.
            </p>
            <p>
              Le donateur peut donner la nue-propriété tout en conservant l&apos;usufruit,
              ce qui réduit l&apos;assiette taxable de la donation.
            </p>
          </>
        ),
      },
      {
        question: 'Comment fonctionne le barème Art. 669 CGI ?',
        answer: (
          <>
            <p className="mb-3">
              La valeur de l&apos;usufruit dépend de l&apos;âge de l&apos;usufruitier au jour de
              la donation (Art. 669 CGI) :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1 text-sm">
              <li>Moins de 21 ans : usufruit 90 %, NP 10 %</li>
              <li>21-30 ans : 80 / 20</li>
              <li>31-40 ans : 70 / 30</li>
              <li>41-50 ans : 60 / 40</li>
              <li>51-60 ans : 50 / 50</li>
              <li>61-70 ans : 40 / 60</li>
              <li>71-80 ans : 30 / 70</li>
              <li>81-90 ans : 20 / 80</li>
              <li>91 ans et plus : 10 / 90</li>
            </ul>
            <p>Seule la nue-propriété est taxée à la donation.</p>
          </>
        ),
      },
      {
        question: "Quel est l'avantage fiscal du démembrement ?",
        answer: (
          <p>
            L&apos;assiette taxable se limite à la valeur de la nue-propriété. Exemple : pour
            un donateur de 65 ans (usufruit 40 %, NP 60 %), un bien de 500 000 € est
            transmis fiscalement à 300 000 €. Après abattement Art. 779 (100 000 € en ligne
            directe), la base taxable est de 200 000 € au lieu de 400 000 € en pleine
            propriété. Économie significative de droits.
          </p>
        ),
      },
      {
        question: "Que devient l'usufruit au décès du donateur ?",
        answer: (
          <p>
            L&apos;usufruit s&apos;éteint au décès du donateur. La pleine propriété est
            reconstituée chez le nu-propriétaire sans nouvelle taxation (Art. 1133 CGI).
            C&apos;est l&apos;avantage majeur du démembrement : la transmission de l&apos;usufruit
            au décès est gratuite fiscalement, alors qu&apos;une transmission de pleine
            propriété aurait subi les droits de succession.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Contraintes et limites',
    items: [
      {
        question: 'Le donateur peut-il vendre le bien après donation ?',
        answer: (
          <p>
            Non, pas seul. La nue-propriété appartient désormais au donataire. La vente
            nécessite l&apos;accord du donateur (usufruitier) ET du donataire (nu-propriétaire).
            C&apos;est une contrainte importante : le démembrement engage la liquidité du
            bien.
          </p>
        ),
      },
      {
        question: 'Y a-t-il un risque de requalification ?',
        answer: (
          <>
            <p className="mb-3">
              Le démembrement classique (donation de nue-propriété avec conservation
              d&apos;usufruit par le donateur) est validé par la doctrine fiscale. Le risque
              concerne les montages plus complexes : démembrement temporaire, démembrement
              croisé, donation NP suivie de donation d&apos;usufruit dans un délai court.
              Ces cas peuvent être requalifiés en abus de droit.
            </p>
            <div className="mt-4">
              <CrossLink
                href="/donation/droits"
                title="Calculateur Donation pleine propriété"
                description="Comparer la donation en NP avec une donation classique pour mesurer l'écart fiscal."
              />
            </div>
          </>
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
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">GitHub</a>.
            </p>
          </>
        ),
      },
    ],
  },
]

export default function FAQDonationDemembrementPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_DONATION_DEMEMBREMENT} />
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/faq', label: 'FAQ' },
          { label: 'Donation démembrement' },
        ]}
        titre={<>Questions fréquentes<br />Donation avec démembrement</>}
        description={<>Barème Art. 669 CGI, avantage fiscal, extinction de l&apos;usufruit au décès, contraintes de revente, risques de requalification.</>}
      />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <header className="mb-12">
            <Link href="/donation/demembrement" className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur Donation démembrement</div>
                  <div className="text-lg font-bold">Droits sur la nue-propriété (Art. 669 CGI)</div>
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
              { href: '/faq/donation-droits', label: 'FAQ Donation', desc: 'Abattements Art. 779, barème Art. 777, don familial 790 G, rappel 15 ans.' },
              { href: '/faq/succession', label: 'FAQ Succession', desc: "À la succession, la reconstitution de la pleine propriété est exonérée (Art. 1133 CGI)." },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'IFI, assurance-vie, transmission et autres sujets.' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4" style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}>
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
            <a href="mailto:contact@calculpatrimoine.fr" className="inline-block bg-white text-primary-700 px-8 py-3 font-medium hover:bg-neutral-100 transition-colors">Nous contacter →</a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
