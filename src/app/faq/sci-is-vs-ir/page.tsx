// src/app/faq/sci-is-vs-ir/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_SCI_IS_IR } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ SCI IS vs IR 2026 : comparatif fiscal et sortie | CalculPatrimoine',
  description: "Questions frequentes sur la SCI a l'IS vs a l'IR : impot annuel, amortissements, plus-value pro a la sortie, option irreversible, deficit foncier.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/sci-is-vs-ir' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'Les deux régimes',
    items: [
      {
        question: "Quelle différence entre une SCI à l'IR et à l'IS ?",
        answer: (
          <>
            <p className="mb-3">
              <strong>SCI à l&apos;IR (translucide)</strong> : les loyers nets remontent aux
              associés selon leur quote-part, et sont imposés dans la catégorie revenus
              fonciers à leur taux marginal d&apos;imposition + 17,2 % de prélèvements sociaux.
            </p>
            <p>
              <strong>SCI à l&apos;IS</strong> : la SCI est une société soumise à l&apos;impôt sur
              les sociétés : 15 % jusqu&apos;à 42 500 € de bénéfice, 25 % au-delà. Les
              amortissements du bien sont déductibles.
            </p>
          </>
        ),
      },
      {
        question: "Pourquoi l'IS donne-t-il souvent un impôt annuel plus bas ?",
        answer: (
          <p>
            À l&apos;IS, le bien est amortissable (typiquement 20 à 30 ans pour le bâti), ce
            qui crée une charge déductible annuelle sans flux de trésorerie. Cette charge
            réduit le bénéfice imposable, donc l&apos;IS dû. À l&apos;IR, l&apos;amortissement n&apos;est
            pas admis : seules les charges réelles (intérêts d&apos;emprunt, travaux, assurance,
            frais de gestion) sont déductibles des loyers.
          </p>
        ),
      },
      {
        question: 'Que se passe-t-il à la sortie (vente du bien) ?',
        answer: (
          <p>
            Le piège classique du calcul SCI à l&apos;IS : à la vente, la SCI subit le régime
            des plus-values professionnelles. Les amortissements pratiqués pendant la
            détention sont réintégrés au calcul, donc la plus-value imposable est très
            supérieure à la plus-value économique. L&apos;IS est dû sur cette plus-value, sans
            abattement pour durée de détention. À l&apos;IR, la SCI suit le régime des
            particuliers : abattements progressifs, exonération à 22 ans (IR) et 30 ans
            (PS).
          </p>
        ),
      },
      {
        question: "L'option IS est-elle réversible ?",
        answer: (
          <p>
            Non. Depuis la loi de finances 2019, l&apos;option pour l&apos;IS est définitive. Une
            SCI qui opte pour l&apos;IS ne peut plus revenir à l&apos;IR. Avant 2019, un retour à
            l&apos;IR était possible dans les 5 ans suivant l&apos;option, mais cette possibilité a
            disparu. La décision engage la SCI pour toute sa durée d&apos;existence.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Cas particuliers et contraintes',
    items: [
      {
        question: 'Un déficit foncier est-il possible en SCI ?',
        answer: (
          <>
            <p className="mb-3">
              Oui en SCI à l&apos;IR. Le déficit foncier généré au niveau de la SCI remonte aux
              associés selon leur quote-part, et chacun l&apos;impute sur son revenu global
              selon les règles communes (10 700 €/an hors intérêts, Art. 156 I-3° CGI). En
              SCI à l&apos;IS, le déficit reste au niveau de la société et se reporte sur ses
              bénéfices futurs : aucune imputation possible chez les associés.
            </p>
            <div className="mt-4">
              <CrossLink
                href="/deficit-foncier"
                title="Calculateur Déficit foncier"
                description="Imputation sur revenu global et report, applicable en SCI à l'IR."
              />
            </div>
          </>
        ),
      },
      {
        question: 'La SCI peut-elle faire du meublé ?',
        answer: (
          <p>
            Risqué : la SCI qui exerce une activité de location meublée est en principe
            automatiquement assujettie à l&apos;IS (Art. 206-2 CGI), même si elle a opté pour
            l&apos;IR. La doctrine admet une tolérance si l&apos;activité meublée reste accessoire
            (moins de 10 % des recettes). En pratique, pour faire du meublé, mieux vaut une
            SARL de famille ou détenir le bien en direct (LMNP).
          </p>
        ),
      },
      {
        question: 'Qui doit tenir une compta SCI ?',
        answer: (
          <p>
            À l&apos;IR, une comptabilité simplifiée suffit (cahier de recettes-dépenses). À
            l&apos;IS, la SCI doit tenir une comptabilité commerciale complète, déposer ses
            comptes annuels au greffe, et payer un expert-comptable (compter 1 500 à
            2 500 € par an). Ce coût annuel doit être intégré dans la comparaison fiscale
            entre les deux régimes.
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

export default function FAQSciIsVsIrPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_SCI_IS_IR} />
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
              <span className="text-neutral-600">SCI IS vs IR</span>
            </nav>

            <div className="h-[2px] w-10 bg-accent-400 mb-6" />

            <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              Questions fréquentes<br />SCI à l&apos;IS vs à l&apos;IR
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mb-10">
              Impôt annuel vs piège de la sortie, amortissements, option irréversible
              depuis 2019, place du déficit foncier.
            </p>

            <Link href="/sci-is-vs-ir" className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur SCI IS vs IR</div>
                  <div className="text-lg font-bold">Comparaison de l&apos;impôt annuel</div>
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
              { href: '/faq/plus-value-immobiliere', label: 'FAQ Plus-value immobilière', desc: 'À la sortie en SCI IR, le régime des particuliers s\'applique avec abattements.' },
              { href: '/faq/ifi', label: 'FAQ IFI', desc: 'Les parts de SCI immobilière entrent dans l\'IFI au prorata de la valeur des biens.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'Déficit foncier, LMNP, succession et autres sujets.' },
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
