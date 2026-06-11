// src/app/faq/lmnp-reel-vs-micro/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_LMNP_REGIME } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ LMNP reel vs micro-BIC 2026',
  description: "Questions frequentes sur le LMNP : seuils micro-BIC (LF 2025), charges deductibles en reel, amortissements, deficit, sortie.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/lmnp-reel-vs-micro' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'Statut et régimes',
    items: [
      {
        question: "C'est quoi le LMNP et comment y accéder ?",
        answer: (
          <p>
            Le LMNP (Loueur en Meublé Non Professionnel) est le statut fiscal par défaut
            d&apos;un particulier qui loue un logement meublé. Aucune démarche
            d&apos;inscription : il suffit de déclarer les loyers dans la catégorie BIC
            (Bénéfices Industriels et Commerciaux, le régime fiscal de la location
            meublée, par opposition aux revenus fonciers de la location nue). Pour
            basculer en LMP (professionnel), il faut dépasser 23 000 € de recettes
            annuelles ET que ces recettes représentent plus de 50 % des revenus du foyer
            (Art. 155 IV CGI).
          </p>
        ),
      },
      {
        question: 'Quelle différence entre micro-BIC et régime réel en LMNP ?',
        answer: (
          <>
            <p className="mb-3">
              Le micro-BIC applique un abattement forfaitaire sur les loyers :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>50 % pour le meublé classique</li>
              <li>71 % pour le meublé touristique classé</li>
              <li>30 % pour le meublé touristique non classé (LF 2025)</li>
            </ul>
            <p>
              Le régime réel permet de déduire les charges réelles ET d&apos;amortir le bien
              et le mobilier. Comptablement plus lourd mais souvent plus avantageux.
            </p>
          </>
        ),
      },
      {
        question: 'Quel est le seuil pour rester en micro-BIC ?',
        answer: (
          <p>
            Depuis la LF 2025 : 77 700 € de recettes pour le meublé classique, 188 700 €
            pour le meublé touristique classé, 15 000 € pour le meublé touristique non
            classé. Au-delà, passage automatique au régime réel. À noter : le seuil
            15 000 € est très bas et concerne notamment les Airbnb non classés.
          </p>
        ),
      },
      {
        question: 'Quelles charges sont déductibles en régime réel ?',
        answer: (
          <p>
            Toutes les charges nécessaires à l&apos;exploitation du bien : intérêts d&apos;emprunt,
            taxe foncière, assurance, frais de gestion, frais de copropriété, petit
            entretien, frais comptables, CFE. Les amortissements du bien immobilier (hors
            terrain, 20-30 ans) et du mobilier (5-10 ans) sont également déductibles, mais
            ne peuvent pas créer un déficit imputable.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Déficit et sortie',
    items: [
      {
        question: 'Le déficit LMNP est-il imputable sur le revenu global ?',
        answer: (
          <>
            <p className="mb-3">
              Non. Contrairement au déficit foncier (location nue), le déficit LMNP n&apos;est
              jamais imputable sur le revenu global. Il est seulement reportable sur les
              bénéfices LMNP des 10 années suivantes. C&apos;est une différence fiscale majeure
              entre les deux régimes locatifs.
            </p>
            <div className="mt-4">
              <CrossLink
                href="/deficit-foncier"
                title="Calculateur Déficit foncier (location nue)"
                description="Imputation sur revenu global jusqu'à 10 700 €/an (Art. 156 I-3° CGI)."
              />
            </div>
          </>
        ),
      },
      {
        question: 'Que se passe-t-il à la sortie (vente du bien) ?',
        answer: (
          <>
            <p className="mb-3">
              Depuis la LF 2025, les amortissements pratiqués pendant la détention sont
              réintégrés au prix d&apos;acquisition pour le calcul de la plus-value
              (Art. 150 VB III CGI). La plus-value imposable augmente donc, ce qui réduit
              l&apos;avantage du régime réel sur le long terme. Cette règle s&apos;applique aux
              cessions à partir du 15/02/2025.
            </p>
            <div className="mt-4">
              <CrossLink
                href="/plus-value-immobiliere/lmnp"
                title="Calculateur Plus-value LMNP"
                description="Calcul avec réintégration des amortissements (Art. 150 VB III CGI)."
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

export default function FAQLmnpRegimePage() {
  return (
    <>
      <SchemaFAQ items={FAQ_LMNP_REGIME} />
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/faq', label: 'FAQ' },
          { label: 'LMNP réel vs micro' },
        ]}
        titre={<>Questions fréquentes<br />LMNP : réel vs micro-BIC</>}
        description="Seuils LF 2025, charges déductibles, amortissements, déficit non imputable, réintégration à la sortie."
      />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <header className="mb-12">
            <Link href="/lmnp-reel-vs-micro" className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur LMNP</div>
                  <div className="text-lg font-bold">Comparaison régime réel vs micro-BIC</div>
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
              { href: '/faq/sci-is-vs-ir', label: 'FAQ SCI IS vs IR', desc: 'La SCI ne peut pas faire du meublé sans risque d\'IS automatique.' },
              { href: '/faq/plus-value-immobiliere', label: 'FAQ Plus-value immobilière', desc: 'Régime standard hors LMNP : abattements par durée, surtaxe.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'Déficit foncier, IFI, et autres sujets.' },
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
