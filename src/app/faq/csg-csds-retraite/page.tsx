// src/app/faq/csg-csds-retraite/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_CSG_RETRAITE } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ CSG retraite 2026 : paliers, RFR, taux applicables | CalculPatrimoine',
  description: "Questions frequentes sur la CSG retraite : 4 paliers (0, 4.3, 7.4, 9.1 %), RFR N-2, regle des 2 annees consecutives, application aux rentes PER.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/csg-csds-retraite' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'Comprendre la CSG sur retraite',
    items: [
      {
        question: "Pourquoi paie-t-on de la CSG sur sa retraite ?",
        answer: (
          <p>
            La CSG (Contribution Sociale Généralisée) finance la protection sociale et
            s&apos;applique à tous les revenus, y compris les pensions de retraite
            (Art. L. 136-8 CSS). À cela s&apos;ajoutent la CRDS (Contribution au Remboursement
            de la Dette Sociale) et la CASA (Contribution Additionnelle de Solidarité pour
            l&apos;Autonomie) selon les paliers.
          </p>
        ),
      },
      {
        question: 'Quels sont les paliers de CSG en 2026 ?',
        answer: (
          <>
            <p className="mb-3">
              Quatre paliers selon votre RFR (Revenu Fiscal de Référence, indiqué sur
              votre avis d&apos;imposition) et votre nombre de parts. Du moins au plus taxé :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>Exonéré : 0 % (RFR très bas)</li>
              <li>Réduit : 4,3 % au total</li>
              <li>Médian : 7,4 %</li>
              <li>Normal : 9,1 %</li>
            </ul>
            <p className="mb-3">
              Détail du calcul des 9,1 % : 8,3 % de CSG + 0,5 % de CRDS + 0,3 % de CASA
              (contribution pour l&apos;autonomie).
            </p>
            <p>Les seuils sont indexés chaque année selon l&apos;inflation.</p>
          </>
        ),
      },
      {
        question: 'Sur quel revenu sont calculés les paliers ?',
        answer: (
          <p>
            Sur le Revenu Fiscal de Référence (RFR), qui inclut l&apos;ensemble des revenus du
            foyer (pensions, salaires éventuels, revenus de capitaux, plus-values, revenus
            fonciers). Les seuils dépendent aussi du nombre de parts fiscales. Un retraité
            célibataire a 1 part, un couple 2 parts, etc.
          </p>
        ),
      },
      {
        question: 'Pourquoi le RFR à utiliser est-il celui de N-2 ?',
        answer: (
          <p>
            L&apos;administration applique le RFR de l&apos;année N-2 pour la CSG de l&apos;année N.
            Pour la CSG 2026, c&apos;est le RFR 2024 qui est utilisé. Cette règle légale crée
            un décalage temporel : un retraité qui prend sa retraite en 2026 verra son RFR
            de salarié appliqué les premières années.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Optimisation et cas particuliers',
    items: [
      {
        question: 'Que se passe-t-il si je bascule de palier ?',
        answer: (
          <p>
            Le basculement de palier (vers le haut ou le bas) suit la règle des deux années
            consécutives. Si votre RFR dépasse un seuil pendant deux années consécutives,
            vous basculez au palier supérieur. Cette règle anti-effet de seuil protège des
            variations ponctuelles (vente d&apos;un bien, prime exceptionnelle).
          </p>
        ),
      },
      {
        question: "La CSG s'applique-t-elle aussi aux rentes PER ?",
        answer: (
          <>
            <p className="mb-3">
              Oui. Une rente PER en sortie est imposée comme une pension : abattement 10 %
              puis intégration au barème IR, et CSG retraite au taux applicable selon votre
              RFR (4,3 / 7,4 / 9,1 %). Sortie en capital : seuls les gains sont taxés au
              PFU 12,8 % + PS 17,2 %, sans CSG retraite.
            </p>
            <div className="mt-4">
              <CrossLink
                href="/per-sortie"
                title="Calculateur PER sortie"
                description="Comparaison capital vs rente, avec CSG retraite intégrée selon le RFR."
              />
            </div>
          </>
        ),
      },
      {
        question: 'Comment réduire mon RFR ?',
        answer: (
          <>
            <p className="mb-3">Plusieurs leviers possibles :</p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>Verser sur un PER déductible (réduit le revenu imposable)</li>
              <li>Choisir le PFU sur les revenus de capitaux plutôt que le barème (sortent du RFR pour la CSG retraite)</li>
              <li>Arbitrer entre une assurance-vie en gestion pilotée et un PEA</li>
              <li>Étaler une plus-value sur deux exercices fiscaux</li>
            </ul>
            <p>Chaque levier produit un effet décalé de 2 ans sur la CSG.</p>
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

export default function FAQCsgRetraitePage() {
  return (
    <>
      <SchemaFAQ items={FAQ_CSG_RETRAITE} />
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
              <span className="text-neutral-600">CSG retraite</span>
            </nav>

            <div className="h-[2px] w-10 bg-accent-400 mb-6" />

            <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              Questions fréquentes<br />CSG / CRDS sur pension de retraite
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mb-10">
              Les quatre paliers, le RFR à utiliser, la règle des deux années consécutives,
              et les leviers pour faire baisser son palier.
            </p>

            <Link href="/csg-csds-retraite" className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur CSG retraite</div>
                  <div className="text-lg font-bold">Taux applicable et pension nette</div>
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
              { href: '/faq/per', label: 'FAQ PER', desc: 'Verser sur un PER réduit le RFR, et peut faire basculer le palier CSG.' },
              { href: '/faq/tmi', label: 'FAQ TMI', desc: 'Le RFR sert au calcul CSG mais aussi à votre tranche marginale d\'IR.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'Succession, assurance-vie, IFI et autres sujets.' },
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
