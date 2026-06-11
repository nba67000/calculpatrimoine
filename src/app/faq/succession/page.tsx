// src/app/faq/succession/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_SUCCESSION } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ Succession 2026 : droits, abattements, baremes | CalculPatrimoine',
  description: "Questions frequentes sur les droits de succession : abattements Art. 779, bareme Art. 777, exoneration conjoint, rappel 15 ans, assurance-vie.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/succession' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'Mécanique des droits',
    items: [
      {
        question: 'Qui paie les droits de succession et quand ?',
        answer: (
          <p>
            Chaque héritier paie individuellement, sur ce qu&apos;il reçoit (après
            abattements et déduction de sa part de dettes du défunt). Plus vous héritez,
            plus vous payez ; un héritier qui reçoit peu paie peu. La déclaration doit être
            déposée dans les 6 mois suivant le décès (12 mois si le défunt résidait hors
            de France métropolitaine). Le paiement intervient à la date du dépôt, avec
            possibilité de fractionnement ou de différé sous conditions (Art. 1717 CGI).
          </p>
        ),
      },
      {
        question: 'Quels sont les abattements par lien de parenté en 2026 ?',
        answer: (
          <>
            <p className="mb-3">Abattements applicables avant calcul des droits (Art. 779 CGI) :</p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>Enfant ou parent en ligne directe : 100 000 €</li>
              <li>Petit-enfant : 1 594 €</li>
              <li>Frère ou sœur : 15 932 €</li>
              <li>Neveu ou nièce : 7 967 €</li>
              <li>Autres héritiers ou tiers : 1 594 €</li>
              <li>Majoration héritier handicapé : +159 325 € (Art. 779-II CGI)</li>
            </ul>
            <p>
              L&apos;abattement est consommé par toutes les transmissions au même héritier sur
              les 15 dernières années (rappel fiscal Art. 784 CGI).
            </p>
          </>
        ),
      },
      {
        question: 'Comment est calculé le barème progressif ?',
        answer: (
          <>
            <p className="mb-3">
              Après application de l&apos;abattement, le solde taxable est soumis au barème
              progressif Art. 777 CGI. En ligne directe (parent-enfant) :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>5 % jusqu&apos;à 8 072 €</li>
              <li>10 % de 8 073 à 12 109 €</li>
              <li>15 % de 12 110 à 15 932 €</li>
              <li>20 % de 15 933 à 552 324 €</li>
              <li>30 % jusqu&apos;à 902 838 €</li>
              <li>40 % jusqu&apos;à 1 805 677 €</li>
              <li>45 % au-delà</li>
            </ul>
            <p>
              Les frères et sœurs subissent un barème simplifié à 35 % / 45 %. Les autres
              héritiers sont à 55 % ou 60 % selon le lien.
            </p>
          </>
        ),
      },
      {
        question: 'Le conjoint paie-t-il des droits de succession ?',
        answer: (
          <p>
            Non. Le conjoint survivant marié ou pacsé est totalement exonéré de droits de
            succession depuis la loi TEPA de 2007 (Art. 796-0 bis CGI). Cette exonération
            couvre l&apos;ensemble de la part recueillie par le conjoint, sans plafond. Le
            concubin notoire n&apos;en bénéficie pas et subit le barème de 60 % applicable aux
            tiers.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Anticipation et particularités',
    items: [
      {
        question: 'Comment fonctionne le rappel fiscal de 15 ans ?',
        answer: (
          <p>
            L&apos;abattement Art. 779 CGI se reconstitue tous les 15 ans. Si un parent a déjà
            donné 100 000 € à son enfant il y a 10 ans, et qu&apos;il décède aujourd&apos;hui,
            l&apos;enfant n&apos;a plus d&apos;abattement disponible : tout est taxé dès le premier
            euro (Art. 784 CGI). En revanche, si la donation a plus de 15 ans, l&apos;abattement
            est intégralement disponible pour la succession.
          </p>
        ),
      },
      {
        question: "L'assurance-vie entre-t-elle dans la succession ?",
        answer: (
          <>
            <p className="mb-3">
              Non, l&apos;assurance-vie est hors succession civile. Elle suit un régime fiscal
              propre :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>Versements avant 70 ans (Art. 990 I CGI) : abattement de 152 500 € par bénéficiaire, puis 20 %, puis 31,25 %.</li>
              <li>Versements après 70 ans (Art. 757 B CGI) : abattement global de 30 500 € puis barème de succession sur la fraction des primes.</li>
            </ul>
            <div className="mt-4">
              <CrossLink
                href="/assurance-vie/transmission"
                title="Calculateur transmission assurance-vie"
                description="Net par bénéficiaire selon l'âge des versements et les abattements applicables."
              />
            </div>
          </>
        ),
      },
      {
        question: 'Les frais de notaire sont-ils inclus dans les droits ?',
        answer: (
          <p>
            Non. Les droits de succession sont l&apos;impôt dû à l&apos;État. Les émoluments du
            notaire (rédaction de l&apos;acte, déclaration, partage) sont des honoraires distincts,
            calculés selon un barème dégressif réglementé (décret 2016-230) sur la valeur
            des biens. Sur une succession de 600 000 € en ligne directe, comptez environ
            1 % du brut en frais de notaire, en plus des droits.
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

export default function FAQSuccessionPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_SUCCESSION} />
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/faq', label: 'FAQ' },
          { label: 'Succession' },
        ]}
        titre={<>Questions fréquentes<br />Succession</>}
        description={<>Abattements par lien de parenté, barème progressif, exonération conjoint, rappel fiscal 15 ans, place de l&apos;assurance-vie.</>}
      />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <header className="mb-12">
            <Link href="/succession" className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur Succession</div>
                  <div className="text-lg font-bold">Droits par héritier 2026</div>
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
              { href: '/faq/donation-droits', label: 'FAQ Donation', desc: 'Anticiper la transmission de son vivant pour utiliser les abattements plusieurs fois sur 15 ans.' },
              { href: '/faq/transmission', label: 'FAQ Transmission AV', desc: "L'assurance-vie hors succession : Art. 990 I et 757 B CGI." },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'IFI, PER, TMI, plus-value, et autres sujets.' },
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
