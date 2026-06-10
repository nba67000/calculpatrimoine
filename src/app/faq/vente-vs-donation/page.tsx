// src/app/faq/vente-vs-donation/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_VENTE_DONATION } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ Vente vs Donation 2026 : choix fiscal | CalculPatrimoine',
  description: "Questions frequentes sur l'arbitrage vente vs donation : plus-value immobiliere, droits d'enregistrement, abattements Art. 779, donation deguisee.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/vente-vs-donation' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'Les deux régimes',
    items: [
      {
        question: 'Vendre ou donner un bien à un proche : quelle différence fiscale ?',
        answer: (
          <>
            <p className="mb-3">
              La vente déclenche deux impôts. Côté vendeur : impôt sur la plus-value
              immobilière (19 % d&apos;IR + 17,2 % de prélèvements sociaux, avec abattements
              selon la durée de détention). Côté acheteur : les « frais de notaire »
              usuels, dont la plus grosse part est un impôt sur la mutation appelé DMTO
              (Droits de Mutation à Titre Onéreux, environ 5,80 % du prix).
            </p>
            <p>
              La donation déclenche un seul impôt, payé par celui qui reçoit : les droits
              de donation, calculés selon le lien de parenté (barème Art. 777 CGI) après
              abattement (Art. 779 CGI - par exemple 100 000 € pour un enfant). Le
              calculateur compare les deux régimes en cumulé.
            </p>
          </>
        ),
      },
      {
        question: 'Pourquoi vendre peut être plus coûteux que donner ?',
        answer: (
          <p>
            Parce que la vente engendre deux impositions cumulées (PV immo côté vendeur +
            droits d&apos;enregistrement côté acheteur), alors que la donation n&apos;engendre
            qu&apos;une imposition (droits Art. 777) après abattement Art. 779. Si
            l&apos;abattement couvre la valeur du bien (100 000 € en ligne directe), la
            donation est gratuite fiscalement. La vente, en revanche, déclenche au minimum
            les DMTO d&apos;environ 5,80 %.
          </p>
        ),
      },
      {
        question: "L'abattement 31 865 € du don familial s'applique-t-il ?",
        answer: (
          <p>
            Non. L&apos;abattement supplémentaire de 31 865 € (Art. 790 G CGI) ne
            s&apos;applique qu&apos;aux dons de sommes d&apos;argent (chèque, virement, espèces),
            pas aux biens immobiliers. Pour un bien immobilier, seul l&apos;abattement
            standard Art. 779 joue (100 000 € pour un enfant, 7 967 € pour un neveu, etc.).
          </p>
        ),
      },
      {
        question: 'La résidence principale est-elle exonérée de PV à la vente ?',
        answer: (
          <p>
            Oui. La cession de la résidence principale est totalement exonérée de PV
            immobilière (Art. 150 U II 1° CGI), quelle que soit la durée de détention. La
            donation d&apos;une RP suit les règles communes de droits de donation. Pour
            comparer vente RP vs donation RP, seuls les DMTO côté acheteur sont opposés aux
            droits de donation côté donataire.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Combinaisons et risques',
    items: [
      {
        question: 'Peut-on combiner vente et prêt familial ?',
        answer: (
          <>
            <p className="mb-3">
              Oui. Le vendeur peut consentir un prêt intrafamilial à l&apos;acheteur pour
              neutraliser le besoin de financement bancaire. Le prêt évite la plus-value
              (qui resterait due au moment de la vente) mais permet à l&apos;acheteur de
              payer le prix sans crédit. Le risque de requalification en don indirect est
              limité si le prêt est formalisé et remboursé.
            </p>
            <div className="mt-4">
              <CrossLink
                href="/pret-intrafamilial"
                title="Calculateur Prêt intrafamilial"
                description="Coût d'un prêt entre proches et comparaison fiscale avec une donation directe."
              />
            </div>
          </>
        ),
      },
      {
        question: 'Quel est le risque de requalification en donation déguisée ?',
        answer: (
          <p>
            Si le prix de vente est manifestement sous-évalué (par rapport au marché), ou
            si le paiement n&apos;est pas effectif (faux remboursement, prêt non honoré),
            l&apos;administration peut requalifier en donation déguisée et réclamer les
            droits de mutation à titre gratuit + pénalités. Le calculateur ne modélise pas
            ce risque ; il suppose que la vente est faite à juste prix.
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
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">GitHub</a>.
            </p>
          </>
        ),
      },
    ],
  },
]

export default function FAQVenteVsDonationPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_VENTE_DONATION} />
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
              <span className="text-neutral-600">Vente vs donation</span>
            </nav>

            <div className="h-[2px] w-10 bg-accent-400 mb-6" />

            <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              Questions fréquentes<br />Vendre ou donner à un proche
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mb-10">
              Coût fiscal cumulé vente vs donation, place du prêt familial, risque de
              requalification en donation déguisée.
            </p>

            <Link href="/vente-vs-donation" className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur Vente vs Donation</div>
                  <div className="text-lg font-bold">Comparaison cumulée des deux régimes</div>
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
              { href: '/faq/plus-value-immobiliere', label: 'FAQ Plus-value immobilière', desc: 'IR + PS, abattements par durée, exonération RP, surtaxe au-delà de 50 000 €.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'Succession, transmission AV et autres sujets.' },
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
