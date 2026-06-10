// src/app/faq/comparateur-locatif-placement/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_COMPARATEUR_LOCATIF } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ Locatif vs Placement 2026 : comparaison fiscale | CalculPatrimoine',
  description: "Questions frequentes sur la comparaison locatif vs placement : capital comptant, frais d'acquisition, enveloppes financieres, liquidite.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/comparateur-locatif-placement' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'Le calcul comparatif',
    items: [
      {
        question: "Qu'est-ce que ce comparateur calcule exactement ?",
        answer: (
          <p>
            À capital initial et durée égaux, le comparateur calcule le net cumulé final
            de deux stratégies : (1) investissement locatif (loyers nets de charges et
            d&apos;impôts + plus-value à la revente, abattements par durée) vs (2) placement
            financier (PEA, assurance-vie ou CTO). Le résultat permet de quantifier
            l&apos;écart entre les deux options sur des hypothèses simplifiées.
          </p>
        ),
      },
      {
        question: 'Le crédit immobilier est-il modélisé ?',
        answer: (
          <p>
            Non. Le calculateur compare un achat comptant à un placement comptant.
            L&apos;effet de levier du crédit (intérêts déduits des loyers en régime réel,
            capital amorti par la banque, valeur du bien acquise sans apport intégral)
            change radicalement le résultat en faveur du locatif. Cette simplification est
            volontaire pour rester pédagogique ; un calcul avec crédit nécessite des
            hypothèses supplémentaires.
          </p>
        ),
      },
      {
        question: "Les frais d'acquisition sont-ils inclus ?",
        answer: (
          <p>
            Non. Le calculateur n&apos;intègre pas les frais de notaire (environ 7-8 % du
            prix d&apos;achat pour l&apos;ancien, 2-3 % pour le neuf). Sur courte durée, ces
            frais peuvent rendre le locatif structurellement perdant : il faut d&apos;abord
            que la valorisation du bien rattrape ces 7-8 % avant tout gain réel. Pour un
            investissement immobilier réaliste, viser au minimum 10-15 ans.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Périmètre et limites',
    items: [
      {
        question: 'Quels véhicules de placement compare-t-on ?',
        answer: (
          <>
            <p className="mb-3">Trois enveloppes :</p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>PEA : exonération IR après 5 ans, PS 17,2 % au retrait</li>
              <li>Assurance-vie : PFU ou IR après abattement annuel, PS 17,2 %</li>
              <li>CTO : PFU 30 % à chaque revenu, sans avantage d&apos;enveloppe</li>
            </ul>
            <p>Chaque enveloppe a sa propre fiscalité de sortie, intégrée au calcul du net final.</p>
            <div className="mt-4">
              <CrossLink
                href="/pea"
                title="Calculateur PEA"
                description="Détail de la fiscalité du PEA : retrait et passif latent."
              />
            </div>
          </>
        ),
      },
      {
        question: 'Que faire de la liquidité et de la diversification ?',
        answer: (
          <p>
            Ces dimensions ne sont pas modélisées par le calculateur. L&apos;immobilier offre
            une exposition réelle mais peu liquide ; le placement financier offre liquidité
            et diversification mais pas d&apos;effet de levier sans risque équivalent. Le
            calcul reste un point de départ : il faut intégrer ces dimensions qualitatives
            à votre décision.
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

export default function FAQComparateurLocatifPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_COMPARATEUR_LOCATIF} />
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
              <span className="text-neutral-600">Locatif vs Placement</span>
            </nav>

            <div className="h-[2px] w-10 bg-accent-400 mb-6" />

            <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              Questions fréquentes<br />Locatif vs Placement financier
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mb-10">
              Calcul comptant sans crédit, frais d&apos;acquisition non modélisés, place de
              la liquidité et de la diversification.
            </p>

            <Link href="/comparateur-locatif-placement" className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Comparateur Locatif vs Placement</div>
                  <div className="text-lg font-bold">Net cumulé à capital et durée égaux</div>
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
              { href: '/faq/lmnp-reel-vs-micro', label: 'FAQ LMNP', desc: "Si vous penchez locatif : choisir le régime fiscal entre micro et réel." },
              { href: '/faq/pea', label: 'FAQ PEA', desc: "L'une des enveloppes utilisées dans la simulation placement." },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'Assurance-vie, IFI, plus-value immobilière et autres sujets.' },
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
