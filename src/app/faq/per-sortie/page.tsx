// src/app/faq/per-sortie/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_PER_SORTIE } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ PER sortie 2026 : capital vs rente, fiscalite | CalculPatrimoine',
  description: "Questions frequentes sur la sortie du PER : options capital/rente/panache, fiscalite (Art. 158-5 bis CGI), sortie anticipee.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/per-sortie' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'Les options de sortie',
    items: [
      {
        question: 'Quelles sont les options de sortie du PER ?',
        answer: (
          <p>
            Trois options à partir de l&apos;âge légal de la retraite : sortie en capital
            (en une fois ou fractionnée), sortie en rente viagère, ou panachage capital +
            rente. Le choix est libre depuis la loi PACTE de 2019. La sortie anticipée est
            possible dans certains cas : acquisition de la résidence principale, accident
            de la vie (chômage, invalidité, décès du conjoint, surendettement).
          </p>
        ),
      },
      {
        question: 'Comment est imposée une sortie en capital ?',
        answer: (
          <p>
            Imposition séparée des versements et des gains. Les versements déductibles
            sont taxés à l&apos;IR (au barème, après quotient familial). Les gains correspondants
            sont taxés au PFU de 30 % (12,8 % IR + 17,2 % PS). Si les versements
            n&apos;étaient pas déductibles (option de ne pas déduire à l&apos;entrée), seuls les
            gains sont imposés au PFU.
          </p>
        ),
      },
      {
        question: 'Comment est imposée une sortie en rente ?',
        answer: (
          <>
            <p className="mb-3">
              Régime des pensions (Art. 158-5° bis CGI) : abattement de 10 % puis
              intégration au barème IR au taux marginal. Les prélèvements sociaux retraités
              s&apos;appliquent (9,1 % normal, 7,4 % médian, 4,3 % réduit, 0 % exonération)
              selon le RFR du foyer.
            </p>
            <div className="mt-4">
              <CrossLink
                href="/csg-csds-retraite"
                title="Calculateur CSG retraite"
                description="Détermine le taux PS applicable à la rente PER selon le RFR du foyer."
              />
            </div>
          </>
        ),
      },
      {
        question: 'Capital ou rente : que choisir ?',
        answer: (
          <p>
            Comparatif factuel sans recommandation. Le capital est versé en une fois :
            vous disposez de l&apos;argent immédiatement, mais l&apos;impôt sur les versements
            tombe en bloc l&apos;année du déblocage, ce qui peut faire grimper votre tranche.
            La rente est versée chaque mois jusqu&apos;à votre décès : l&apos;impôt est
            lissé, mais si vous décédez tôt, vous aurez touché beaucoup moins que le
            capital initial (et il n&apos;y a plus de réversion possible une fois la rente
            versée seule). Le calculateur affiche le net total cumulé selon
            l&apos;espérance de vie saisie pour comparer les deux options.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Cas particuliers',
    items: [
      {
        question: 'Le panachage capital + rente est-il fiscalement avantageux ?',
        answer: (
          <p>
            Pas particulièrement. Chaque fraction (capital ou rente) suit son propre régime
            d&apos;imposition. Le panachage permet surtout de combiner liquidité immédiate
            et revenus réguliers, sans optimisation fiscale spécifique. À comparer au cas
            par cas sur le total net.
          </p>
        ),
      },
      {
        question: 'La sortie anticipée est-elle plus avantageuse fiscalement ?',
        answer: (
          <p>
            Pour l&apos;acquisition de la résidence principale, oui : les versements sont
            taxés à l&apos;IR mais les gains restent au PFU. Pour les accidents de la vie
            (chômage de fin de droits, invalidité, décès du conjoint, surendettement,
            cessation d&apos;activité non salariée), les versements ET les gains sont
            exonérés d&apos;IR ; seuls les PS 17,2 % s&apos;appliquent sur les gains.
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

export default function FAQPerSortiePage() {
  return (
    <>
      <SchemaFAQ items={FAQ_PER_SORTIE} />
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
              <span className="text-neutral-600">PER sortie</span>
            </nav>

            <div className="h-[2px] w-10 bg-accent-400 mb-6" />

            <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              Questions fréquentes<br />PER : sortie capital vs rente
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mb-10">
              Imposition séparée des versements et gains, régime des pensions, sortie
              anticipée pour la résidence principale ou accident de la vie.
            </p>

            <Link href="/per-sortie" className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur PER sortie</div>
                  <div className="text-lg font-bold">Comparaison capital vs rente</div>
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
              { href: '/faq/per', label: 'FAQ PER (entrée)', desc: 'Plafond de déduction, report N-1 à N-5, économie d\'impôt sur versement.' },
              { href: '/faq/rente-viagere', label: 'FAQ Rente viagère', desc: 'Conversion d\'un capital en revenus à vie, tables INSEE, réversion conjoint.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'CSG retraite, assurance-vie et autres sujets.' },
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
