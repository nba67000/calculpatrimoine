// src/app/faq/plus-value-immobiliere-lmnp/page.tsx
// Note : ce slug FAQ utilise un tiret au lieu du slash du calc /plus-value-immobiliere/lmnp.
// Convention : les FAQ sont aplaties, pas de sous-dossier dans /faq.
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_PLUS_VALUE_LMNP } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ Plus-value LMNP 2026 : reintegration amortissements',
  description: "Questions frequentes sur la plus-value LMNP : reintegration des amortissements depuis le 15/02/2025 (Art. 150 VB III CGI), abattements par duree.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/plus-value-immobiliere-lmnp' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'La nouvelle règle LF 2025',
    items: [
      {
        question: "Qu'est-ce qui change avec la LF 2025 sur la plus-value LMNP ?",
        answer: (
          <p>
            Depuis le 15/02/2025, les amortissements pratiqués pendant la détention en LMNP
            réel sont réintégrés au prix d&apos;acquisition pour le calcul de la plus-value
            (Art. 150 VB III CGI). Cela augmente mécaniquement la plus-value imposable et
            donc l&apos;impôt à la cession. Avant cette date, les amortissements LMNP
            n&apos;étaient pas réintégrés.
          </p>
        ),
      },
      {
        question: 'Comment calcule-t-on la plus-value LMNP ?',
        answer: (
          <>
            <p className="mb-3">
              Plus-value = Prix de vente − (Prix d&apos;acquisition − amortissements pratiqués).
            </p>
            <p>
              Les amortissements sont déduits du prix d&apos;acquisition pour aboutir au prix
              de revient ajusté. Le résultat suit ensuite le régime des plus-values des
              particuliers : IR 19 % + PS 18,6 %, abattements par durée de détention,
              surtaxe au-delà de 50 000 €.
            </p>
          </>
        ),
      },
      {
        question: "Les abattements par durée s'appliquent-ils ?",
        answer: (
          <>
            <p className="mb-3">
              Oui. Le régime applicable reste celui des plus-values des particuliers
              (Art. 150 U CGI).
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>Abattements IR : 0 % de 0 à 5 ans, 6 %/an de 6 à 21 ans, 4 % la 22e année (exonération totale IR à 22 ans).</li>
              <li>Abattements PS : 0 % à 5 ans, 1,65 %/an de 6 à 21 ans, 1,60 % la 22e, 9 %/an de 23 à 30 ans (exonération totale PS à 30 ans).</li>
            </ul>
          </>
        ),
      },
      {
        question: 'Comment compter les amortissements pratiqués ?',
        answer: (
          <p>
            Cumul de toutes les dotations aux amortissements déduites du résultat LMNP
            année après année, tant pour l&apos;immobilier (hors terrain) que le mobilier. Le
            tableau d&apos;amortissement remis par votre comptable contient cette information.
            En micro-BIC, l&apos;abattement forfaitaire absorbe déjà les amortissements
            théoriques, donc pas de réintégration.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Impact et périmètre',
    items: [
      {
        question: 'Est-ce que ça change la rentabilité du LMNP ?',
        answer: (
          <p>
            Oui pour les détentions courtes (moins de 10 ans) et pour les biens fortement
            amortis. L&apos;avantage fiscal du régime réel sur les loyers (déduction des
            amortissements) est en partie repris à la sortie. Sur le long terme (plus de
            22 ans), l&apos;exonération IR rejoint le régime sans réintégration, mais les PS
            continuent de courir jusqu&apos;à 30 ans.
          </p>
        ),
      },
      {
        question: "La règle s'applique-t-elle aux résidences services LMNP ?",
        answer: (
          <>
            <p className="mb-3">
              Oui. Aucune exception pour les résidences services (étudiantes, seniors,
              EHPAD, tourisme). La réintégration s&apos;applique à tout LMNP réel, quel que
              soit le type de bien ou la formule d&apos;exploitation.
            </p>
            <div className="mt-4">
              <CrossLink
                href="/lmnp-reel-vs-micro"
                title="Calculateur LMNP réel vs micro"
                description="Comparer les deux régimes pendant la détention, avant de calculer la PV à la sortie."
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

export default function FAQPlusValueLmnpPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_PLUS_VALUE_LMNP} />
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/faq', label: 'FAQ' },
          { label: 'Plus-value LMNP' },
        ]}
        titre={<>Questions fréquentes<br />Plus-value immobilière LMNP</>}
        description="Réintégration des amortissements depuis le 15/02/2025, abattements par durée, impact sur la rentabilité long terme."
      />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <header className="mb-12">
            <Link href="/plus-value-immobiliere/lmnp" className="block bg-neutral-900 text-white rounded-xl p-6 hover:bg-neutral-800 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-neutral-400">Calculateur Plus-value LMNP</div>
                  <div className="text-lg font-bold">Avec réintégration des amortissements</div>
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
              { href: '/faq/plus-value-immobiliere', label: 'FAQ Plus-value immobilière', desc: 'Régime standard hors LMNP : abattements par durée, surtaxe au-delà de 50 000 €.' },
              { href: '/faq/sci-is-vs-ir', label: 'FAQ SCI IS vs IR', desc: 'La SCI IS suit aussi un régime PV pro avec réintégration des amortissements.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'IFI, déficit foncier, et autres sujets.' },
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
