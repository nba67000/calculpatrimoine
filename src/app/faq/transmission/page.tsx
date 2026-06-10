// src/app/faq/transmission/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_TRANSMISSION } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ Transmission Assurance-Vie - Art. 990I et 757B | CalculPatrimoine',
  description: "Abattements avant et après 70 ans, clause bénéficiaire, droits de succession, optimisations transmission assurance-vie.",

  alternates: { canonical: 'https://calculpatrimoine.fr/faq/transmission' },
}

interface FAQItem {
  question: string
  answer: ReactNode
}

interface FAQSection {
  title: string
  items: FAQItem[]
}

const sections: FAQSection[] = [
  {
    title: "Les deux régimes fiscaux",
    items: [
      {
        question: "Pourquoi l'assurance-vie est-elle avantageuse pour la succession ?",
        answer: (
          <>
            <p className="mb-3">
              L&apos;assurance-vie n&apos;entre pas dans la succession classique. Elle suit ses propres règles fiscales,
              beaucoup plus favorables. Elle <strong>échappe en grande partie aux droits de succession</strong> classiques
              et permet de transmettre des capitaux importants avec des abattements spécifiques.
            </p>
            <p className="mb-3">
              Deux régimes coexistent selon l&apos;âge auquel les versements ont été effectués :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li><strong>Avant 70 ans</strong> : Article 990 I du CGI. Abattement de 152 500 € par bénéficiaire, puis 20 % jusqu&apos;à 700 000 € et 31,25 % au-delà</li>
              <li><strong>Après 70 ans</strong> : Article 757 B du CGI. Abattement global de 30 500 € partagé entre tous les bénéficiaires, gains exonérés, droits de succession ordinaires au-delà</li>
            </ul>
            <div className="bg-primary-50 border-l-4 border-primary-400 p-4">
              <p className="text-sm text-primary-900">
                <strong>À retenir</strong> : c&apos;est la date du versement qui compte, pas la date du décès.
                Les versements réalisés avant 70 ans relèvent du régime 990 I, celui dont les abattements sont les plus élevés.
              </p>
            </div>
          </>
        ),
      },
      {
        question: "Article 990 I : comment fonctionne l'abattement de 152 500€ ?",
        answer: (
          <>
            <p className="mb-3">
              Pour les versements effectués <strong>avant 70 ans</strong>, chaque bénéficiaire
              désigné bénéficie d&apos;un abattement <strong>individuel de 152 500€</strong>.
            </p>
            <p className="mb-3">
              Cet abattement est <strong>par bénéficiaire et non partagé</strong> - contrairement
              à l&apos;Article 757 B.
            </p>
            <p className="mb-3"><strong>Au-delà de 152 500€ par bénéficiaire :</strong></p>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-2 text-left">Tranche</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Taux</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">De 152 501€ à 852 500€</td>
                  <td className="border border-neutral-300 px-4 py-2">20 %</td>
                </tr>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Au-delà de 852 500€</td>
                  <td className="border border-neutral-300 px-4 py-2">31,25 %</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-primary-100 p-4 border border-neutral-200">
              <p className="mb-2 text-sm font-bold">Exemple :</p>
              <ul className="text-sm space-y-1">
                <li>Capital transmis : 400 000€ → 2 bénéficiaires → 200 000€ chacun</li>
                <li>Abattement : 152 500€ chacun</li>
                <li>Taxable : 47 500€ chacun × 20 % = <strong>9 500€ chacun</strong></li>
                <li>Total impôt : <strong>19 000€</strong> (vs ~80 000€ en succession classique)</li>
              </ul>
            </div>
          </>
        ),
      },
      {
        question: "Article 757 B : que se passe-t-il pour les versements après 70 ans ?",
        answer: (
          <>
            <p className="mb-3">
              Pour les versements effectués <strong>après 70 ans</strong>, le régime est moins avantageux :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>
                <strong>Abattement global de 30 500€</strong> - partagé entre tous les bénéficiaires
                (sauf conjoint ou partenaire de PACS, exonéré)
              </li>
              <li>
                Au-delà, les versements sont <strong>réintégrés dans la succession</strong> et
                soumis aux droits de succession classiques selon le lien de parenté
              </li>
              <li>
                <strong>Exception notable</strong> : les plus-values générées après 70 ans
                restent exonérées (seuls les versements bruts sont réintégrés)
              </li>
            </ul>
            <div className="bg-primary-50 border-l-4 border-primary-400 p-4">
              <p className="text-sm text-primary-900">
                <strong>À retenir</strong> : les versements avant 70 ans relèvent du régime 990 I - abattement de 152 500 € par bénéficiaire.
                Les versements après 70 ans relèvent du 757 B - abattement global de 30 500 €.
                L&apos;écart peut représenter plusieurs dizaines de milliers d&apos;euros selon le capital transmis.
              </p>
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Clause bénéficiaire et stratégies",
    items: [
      {
        question: "C'est quoi la clause bénéficiaire ? Pourquoi est-elle cruciale ?",
        answer: (
          <>
            <p className="mb-3">
              La clause bénéficiaire désigne les personnes qui recevront le capital à votre décès.
              <strong>Elle prime sur le testament et les règles successorales classiques</strong> -
              c&apos;est ce qui fait la puissance de l&apos;assurance-vie pour la transmission.
            </p>
            <p className="mb-3"><strong>Vous pouvez désigner :</strong></p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>Votre conjoint (exonération totale de droits)</li>
              <li>Vos enfants (abattement 152 500€ chacun si versements avant 70 ans)</li>
              <li>N&apos;importe quelle personne, même sans lien de parenté</li>
              <li>Une fondation ou association</li>
            </ul>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
              <p className="text-sm text-amber-900">
                <strong>Attention</strong> : une clause bénéficiaire non mise à jour (ex. &quot;mon époux&quot;
                après un divorce) peut créer des situations indésirables. Vérifiez-la régulièrement
                et consultez votre assureur pour la rédiger avec précision.
              </p>
            </div>
          </>
        ),
      },
      {
        question: "Mon conjoint est-il exonéré de droits sur l'assurance-vie ?",
        answer: (
          <>
            <p className="mb-3">
              <strong>Oui, totalement.</strong> Le conjoint survivant (marié) et le partenaire de PACS
              sont exonérés de tout droit de succession sur les capitaux décès d&apos;assurance-vie,
              quel que soit le montant et l&apos;âge des versements.
            </p>
            <p className="mb-3">
              Cette exonération joue dans tous les cas, que les versements aient été faits avant
              70 ans (Art. 990 I CGI) ou après (Art. 757 B CGI).
            </p>
            <p className="text-sm text-neutral-600">
              Base légale : article 796-0 bis du CGI pour le conjoint marié,
              article 796-0 ter pour le partenaire de PACS.
            </p>
          </>
        ),
      },
      {
        question: "Vaut-il mieux désigner 1 ou plusieurs bénéficiaires ?",
        answer: (
          <>
            <p className="mb-3">
              <strong>Plusieurs bénéficiaires multiplient les abattements</strong> (pour les versements
              avant 70 ans, Art. 990 I CGI).
            </p>
            <div className="bg-primary-100 p-4 border border-neutral-200 mb-3">
              <p className="mb-2 text-sm font-bold">Exemple :</p>
              <ul className="text-sm space-y-1">
                <li>Capital : 500 000€ - 1 bénéficiaire → taxable : 347 500€</li>
                <li>Capital : 500 000€ - 3 bénéficiaires (166 666€ chacun) → taxable : ~42 500€ total</li>
              </ul>
            </div>
            <p className="mb-3">
              Le calculateur gère jusqu&apos;à 6 bénéficiaires et ventile automatiquement l&apos;abattement.
            </p>
            <p className="text-sm text-neutral-600">
              La répartition entre bénéficiaires (parts égales, quotes-parts différentes) se définit
              librement dans la clause bénéficiaire.
            </p>
            <div className="mt-4">
              <CrossLink href="/assurance-vie/transmission" title="Calculateur de transmission" description="Simulez la répartition entre bénéficiaires et les droits sur chaque part selon Art. 990 I." />
            </div>
          </>
        ),
      },
      {
        question: "Quelle est la différence entre assurance-vie et héritage classique pour la fiscalité ?",
        answer: (
          <>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-2 text-left"></th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Succession classique</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">AV avant 70 ans</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Abattement enfant', '100 000€ par enfant', '152 500€ par bénéficiaire'],
                  ['Taux au-delà', '20 % à 45 %', '20 % à 31,25 %'],
                  ['Hors succession ?', 'Non', 'Oui'],
                  ['Réserve héréditaire', 'S\'applique', 'Hors masse successorale'],
                ].map(([label, classique, av]) => (
                  <tr key={label}>
                    <td className="border border-neutral-300 px-4 py-2 font-medium">{label}</td>
                    <td className="border border-neutral-300 px-4 py-2">{classique}</td>
                    <td className="border border-neutral-300 px-4 py-2">{av}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-primary-50 border-l-4 border-primary-400 p-4">
              <p className="text-sm text-primary-900">
                <strong>Attention à la réserve héréditaire</strong> : l&apos;assurance-vie est hors masse
                successorale, mais si les versements représentent la quasi-totalité du patrimoine
                au détriment des héritiers réservataires, un tribunal peut les réintégrer.
                Ce risque concerne les patrimoines où l&apos;assurance-vie représente la quasi-totalité des actifs, au point de priver les héritiers réservataires (enfants) de leur quote-part légale. En dessous de ce seuil, ce cas ne s&apos;applique pas.
              </p>
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: "Utilisation du calculateur",
    items: [
      {
        question: "Le calculateur prend-il en compte les deux régimes (avant et après 70 ans) ?",
        answer: (
          <>
            <p className="mb-3">
              <strong>Oui.</strong> Vous saisissez séparément vos versements avant 70 ans et après 70 ans.
              Le calculateur applique automatiquement le bon régime fiscal à chaque part :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li><strong>Art. 990 I</strong> pour les versements avant 70 ans (abattement 152 500€/bénéficiaire)</li>
              <li><strong>Art. 757 B</strong> pour les versements après 70 ans (abattement 30 500€ global)</li>
            </ul>
            <p>
              Les plus-values générées sur les versements après 70 ans sont automatiquement exclues
              du calcul (elles sont exonérées).
            </p>
            <div className="mt-4">
              <CrossLink href="/assurance-vie/transmission" title="Calculateur transmission assurance-vie" description="Saisissez vos versements avant et après 70 ans: les régimes Art. 990 I et 757 B s'appliquent automatiquement." />
            </div>
          </>
        ),
      },
      {
        question: "Mes données sont-elles stockées ou envoyées quelque part ?",
        answer: (
          <>
            <p className="mb-3">
              <strong>Non, absolument pas.</strong> Tous les calculs sont effectués localement dans votre
              navigateur. Aucune donnée n&apos;est transmise à un serveur ni conservée après fermeture de la page.
            </p>
            <p>
              Le code source est open-source et vérifiable sur{' '}
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

export default function FAQTransmissionPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_TRANSMISSION} />
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
              <span className="text-neutral-600">Transmission Assurance-Vie</span>
            </nav>

            <div className="h-[2px] w-10 bg-accent-400 mb-6" />

            <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              Questions fréquentes<br />Transmission Assurance-Vie
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mb-10">
              Article 990 I, Article 757 B, abattements par bénéficiaire, clause bénéficiaire -
              tout comprendre sur la fiscalité successorale de l&apos;assurance-vie.
            </p>

            <Link
              href="/assurance-vie/transmission"
              className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur Transmission</div>
                  <div className="text-lg font-bold">Calculez les droits de succession</div>
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
              { href: '/faq/assurance-vie', label: 'FAQ Assurance-Vie - Fiscalité Rachat', desc: 'PFU vs IR, abattement 8 ans, optimisations sur le rachat.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'Rente viagère, PER, TMI - retrouvez chaque FAQ dédiée.' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
                style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
              >
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
            <a href="mailto:contact@calculpatrimoine.fr" className="inline-block bg-white text-primary-700 px-8 py-3 font-medium hover:bg-neutral-100 transition-colors">
              Nous contacter →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
