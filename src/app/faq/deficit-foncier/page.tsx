// src/app/faq/deficit-foncier/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_DEFICIT_FONCIER } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ Deficit foncier 2026 : plafond, report, engagement',
  description: "Questions frequentes sur le deficit foncier : plafond 10 700 EUR, plafond majore 21 400 EUR, report 10 ans, engagement de location 3 ans (Art. 156 I-3 CGI).",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/deficit-foncier' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'Mécanique du déficit',
    items: [
      {
        question: "Qu'est-ce que le déficit foncier ?",
        answer: (
          <p>
            Quand vos charges (intérêts d&apos;emprunt, travaux, assurance, gestion)
            dépassent les loyers que vous encaissez sur un bien loué vide, vous êtes en
            déficit foncier. Une partie de ce déficit vient réduire votre revenu imposable
            global (salaire + autres revenus) et donc votre impôt cette année. Le reste est
            gardé en réserve pour absorber vos loyers imposables des 10 années suivantes
            (Art. 156 I-3° CGI).
          </p>
        ),
      },
      {
        question: 'Quel est le plafond annuel imputable sur le revenu global ?',
        answer: (
          <p>
            10 700 € par an et par foyer fiscal pour la fraction du déficit hors intérêts
            d&apos;emprunt. Le surplus au-dessus de ce plafond se reporte sur les revenus
            fonciers des 10 années suivantes. Pour des travaux de rénovation énergétique
            des passoires thermiques (DPE E/F/G vers A/B/C/D), le plafond est porté à
            21 400 € pour les dépenses payées entre 2023 et 2025 (LF 2023 art. 12).
          </p>
        ),
      },
      {
        question: "Que devient l'excédent au-dessus de 10 700 € ?",
        answer: (
          <p>
            L&apos;excédent (la part du déficit hors intérêts qui dépasse 10 700 €) ne se
            perd pas. Il est reportable sur les revenus fonciers des 10 années suivantes.
            Si pendant ces 10 années vous avez des loyers nets positifs, ce report viendra
            réduire la base imposable IR + prélèvements sociaux.
          </p>
        ),
      },
      {
        question: "Les intérêts d'emprunt sont-ils imputables sur le revenu global ?",
        answer: (
          <p>
            Non. La fraction du déficit liée aux intérêts d&apos;emprunt ne peut PAS être
            imputée sur le revenu global. Elle est uniquement reportable sur les revenus
            fonciers des 10 années suivantes. C&apos;est pour cela que le calculateur sépare la
            part déductible du revenu global (charges hors intérêts) de la part reportable
            (intérêts).
          </p>
        ),
      },
    ],
  },
  {
    title: 'Cas particuliers et limites',
    items: [
      {
        question: "Qu'est-ce que le plafond majoré 21 400 € ?",
        answer: (
          <p>
            Plafond doublé pour les travaux qui permettent à un logement de passer
            d&apos;un DPE E, F ou G vers A, B, C ou D (LF 2023 art. 12). Applicable aux
            dépenses payées entre le 01/01/2023 et le 31/12/2025. Vérifier la prorogation
            pour les dépenses postérieures, qui dépend des lois de finances successives.
          </p>
        ),
      },
      {
        question: 'Combien de temps suis-je engagé à louer après imputation ?',
        answer: (
          <p>
            L&apos;imputation du déficit foncier sur le revenu global engage à conserver la
            location du logement jusqu&apos;au 31 décembre de la 3e année qui suit
            l&apos;imputation. Si vous vendez ou cessez la location avant ce délai,
            l&apos;administration reprend les déficits imputés (Art. 156 I-3° dernier alinéa
            CGI) : l&apos;impôt évité est rétroactivement réclamé.
          </p>
        ),
      },
      {
        question: 'Quelle différence entre déficit foncier et LMNP ?',
        answer: (
          <>
            <p className="mb-3">
              Le déficit foncier concerne la location nue en régime réel (catégorie revenus
              fonciers). Le LMNP concerne la location meublée non professionnelle, taxée en
              BIC. En LMNP, l&apos;amortissement du bien est déductible ; en location nue, non.
              En LMNP, le déficit n&apos;est jamais imputable sur le revenu global ; en location
              nue, il l&apos;est (dans la limite de 10 700 €).
            </p>
            <div className="mt-4">
              <CrossLink
                href="/lmnp-reel-vs-micro"
                title="Calculateur LMNP"
                description="Comparaison régime micro et régime réel en location meublée."
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
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline">GitHub</a>.
            </p>
          </>
        ),
      },
    ],
  },
]

export default function FAQDeficitFoncierPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_DEFICIT_FONCIER} />
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/faq', label: 'FAQ' },
          { label: 'Déficit foncier' },
        ]}
        titre={<>Questions fréquentes<br />Déficit foncier</>}
        description="Plafond 10 700 €, plafond majoré 21 400 € pour la rénovation énergétique, report 10 ans, engagement de location, comparaison LMNP."
      />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <header className="mb-12">
            <Link href="/deficit-foncier" className="block bg-neutral-900 text-white rounded-xl p-6 hover:bg-neutral-800 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-neutral-400">Calculateur Déficit foncier</div>
                  <div className="text-lg font-bold">Imputation, report, économie d&apos;impôt</div>
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
              { href: '/faq/ifi', label: 'FAQ IFI', desc: 'Le bien locatif compte dans l\'IFI dès 1 300 000 € de patrimoine immobilier net.' },
              { href: '/faq/plus-value-immobiliere', label: 'FAQ Plus-value immobilière', desc: 'Impôt à la cession : abattements par durée, surtaxe au-delà de 50 000 €.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'IFI, succession, PER et autres sujets.' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4" style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}>
                <div>
                  <p className="font-bold text-neutral-900 group-hover:text-neutral-900 transition-colors mb-0.5">{link.label}</p>
                  <p className="text-sm text-neutral-500">{link.desc}</p>
                </div>
                <span className="font-mono text-neutral-500 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
              </Link>
            ))}
          </div>

          <div className="bg-neutral-900 p-8 text-center text-white mt-12">
            <h3 className="font-serif text-2xl font-bold mb-3">Vous avez d&apos;autres questions ?</h3>
            <p className="text-neutral-400 mb-6 font-mono text-sm">Réponse par email sous 48h.</p>
            <a href="mailto:contact@calculpatrimoine.fr" className="inline-block bg-white text-neutral-900 px-8 py-3 font-medium hover:bg-neutral-100 transition-colors">Nous contacter →</a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
