// src/app/faq/assurance-vie-fiscalite-rachat/page.tsx
// Note : slug FAQ aplati pour éviter le sous-dossier (cohérence avec les autres FAQ).
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_AV_FISCALITE_RACHAT } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ Fiscalite rachat assurance-vie 2026 : PFU vs IR | CalculPatrimoine',
  description: "Questions frequentes sur la fiscalite des rachats d'assurance-vie : PFU 12,8 %, IR au bareme, abattement 8 ans, versements avant 2017, fractionnement.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/assurance-vie-fiscalite-rachat' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'Imposition du rachat',
    items: [
      {
        question: "Comment est imposé un rachat d'assurance-vie ?",
        answer: (
          <p>
            Seule la fraction de plus-value du rachat est imposée (règle proportionnelle :
            le rachat partiel se compose d&apos;une part de capital et d&apos;une part de gain
            au prorata). Cette plus-value est soumise au PFU 30 % (12,8 % IR + 17,2 % PS),
            ou au barème IR + PS sur option globale du foyer pour l&apos;année.
            L&apos;abattement annuel après 8 ans (4 600 € célibataire, 9 200 € couple) joue
            uniquement sur la fraction IR, pas sur les PS.
          </p>
        ),
      },
      {
        question: "Quand est-il avantageux d'opter pour le barème IR plutôt que le PFU ?",
        answer: (
          <>
            <p className="mb-3">
              Si votre TMI est de 0 % ou 11 %, le barème IR est plus avantageux que le PFU
              12,8 %. Au-delà (30 %, 41 %, 45 %), le PFU 12,8 % devient préférable.
            </p>
            <p>
              À noter : l&apos;option pour le barème est globale et concerne tous les revenus
              de capitaux du foyer pour l&apos;année (intérêts, dividendes, PV, etc.). À
              comparer en consolidé avant de cocher la case.
            </p>
            <div className="mt-4">
              <CrossLink
                href="/tmi"
                title="Calculateur TMI"
                description="Connaître votre TMI exacte pour arbitrer entre PFU et barème."
              />
            </div>
          </>
        ),
      },
      {
        question: 'Quelle différence entre les versements avant et après le 27/09/2017 ?',
        answer: (
          <p>
            Les versements antérieurs au 27/09/2017 (date de mise en place du PFU)
            bénéficient d&apos;un régime historique avantageux : prélèvement libératoire à
            7,5 % après 8 ans (au lieu de 12,8 %), avec abattement annuel inchangé. Le
            calculateur ventile automatiquement les versements selon leur date et applique
            le taux correct sur chaque fraction.
          </p>
        ),
      },
      {
        question: "L'abattement annuel s'applique-t-il aussi aux PS ?",
        answer: (
          <p>
            Non. L&apos;abattement de 4 600 € (célibataire) ou 9 200 € (couple) après 8 ans
            s&apos;applique uniquement à la fraction IR de la plus-value. Les prélèvements
            sociaux de 17,2 % sont dus dès le premier euro de plus-value, sans abattement.
            Cette règle réduit fortement le gain réel de l&apos;abattement quand la TMI est
            basse.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Optimisation et transmission',
    items: [
      {
        question: 'Le rachat fractionné est-il fiscalement intéressant ?',
        answer: (
          <p>
            Oui après 8 ans. En fractionnant un retrait sur deux années civiles, vous
            utilisez deux fois l&apos;abattement annuel (4 600 € + 4 600 € = 9 200 €
            exonérés d&apos;IR au lieu de 4 600 €). Le calculateur affiche l&apos;économie
            estimée si le fractionnement réduit l&apos;impôt total de plus de 300 €.
          </p>
        ),
      },
      {
        question: 'La plus-value latente est-elle taxée à la succession ?',
        answer: (
          <>
            <p className="mb-3">
              Non, l&apos;assurance-vie est hors succession civile. Au décès, c&apos;est le
              régime Art. 990 I (versements avant 70 ans) ou Art. 757 B (versements après
              70 ans) qui s&apos;applique, avec abattement de 152 500 € par bénéficiaire
              (Art. 990 I) ou 30 500 € global (Art. 757 B).
            </p>
            <div className="mt-4">
              <CrossLink
                href="/assurance-vie/transmission"
                title="Calculateur transmission AV"
                description="Net par bénéficiaire selon l'âge des versements et les abattements applicables."
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

export default function FAQAvFiscaliteRachatPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_AV_FISCALITE_RACHAT} />
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/faq', label: 'FAQ' },
          { label: 'Fiscalité rachat AV' },
        ]}
        titre={<>Questions fréquentes<br />Fiscalité rachat assurance-vie</>}
        description="PFU vs barème IR selon la TMI, abattement 8 ans, versements avant 2017, fractionnement, passage en succession."
      />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <header className="mb-12">
            <Link href="/assurance-vie/fiscalite-rachat" className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur Fiscalité rachat AV</div>
                  <div className="text-lg font-bold">Comparaison PFU vs IR sur votre rachat</div>
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
              { href: '/faq/assurance-vie', label: 'FAQ Assurance-Vie (généralités)', desc: 'Mécaniques de base : fonctionnement, abattement 8 ans, options.' },
              { href: '/faq/transmission', label: 'FAQ Transmission AV', desc: 'Art. 990 I (versements avant 70 ans) et Art. 757 B (après 70 ans).' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'PEA, PER, succession et autres sujets.' },
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
