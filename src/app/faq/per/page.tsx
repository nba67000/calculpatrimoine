// src/app/faq/per/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_PER } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ PER Individuel 2026 - Versements et déductibilité',
  description: "Questions fréquentes sur le PER individuel : plafonds 2026, déductibilité, report sur 5 ans (LF 2026), TMI, sortie en capital ou rente.",

  alternates: { canonical: 'https://calculpatrimoine.fr/faq/per' },
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
    title: 'Les bases du PER individuel',
    items: [
      {
        question: "C'est quoi un PER individuel (PERIN) ?",
        answer: (
          <>
            <p className="mb-3">
              Le <strong>Plan d&apos;Épargne Retraite Individuel (PERIN)</strong> est un produit d&apos;épargne
              longue durée créé par la loi PACTE (2019). Il remplace les anciens PERP et contrats Madelin.
            </p>
            <p className="mb-3">
              <strong>Son avantage principal</strong> : les versements volontaires sont déductibles de
              votre revenu imposable, dans la limite d&apos;un plafond annuel. Concrètement, si vous êtes
              à la TMI 30 % et versez 3 000€, l&apos;État vous en rembourse 900€ via votre feuille d&apos;impôts.
            </p>
            <div className="bg-neutral-50 border-l-4 border-accent-400 p-4 mt-4">
              <p className="text-sm text-neutral-900">
                <strong>À retenir</strong> : ce calculateur couvre uniquement le PER individuel souscrit à titre personnel (ex-PERP, dit PERIN).
                Les PER d&apos;entreprise (PERCOL, PERO) et les contrats pour travailleurs indépendants (ex-Madelin) ne sont pas couverts, leurs règles de plafond diffèrent (Art. 154 bis CGI).
              </p>
            </div>
            <div className="mt-4">
              <CrossLink href="/per-individuel" title="Calculateur PER Individuel" description="Simulez votre économie d'impôt selon votre salaire, TMI et plafonds des années antérieures." />
            </div>
          </>
        ),
      },
      {
        question: 'Quelle est la différence entre PER, PERP et contrat Madelin ?',
        answer: (
          <>
            <p className="mb-3">
              Le PER unifie depuis 2019 les anciens produits de retraite. Le <strong>PERP</strong> était réservé
              aux salariés, le <strong>contrat Madelin</strong> aux travailleurs non-salariés (TNS).
            </p>
            <p className="mb-3">
              Le PER individuel les remplace en offrant plus de flexibilité : sortie possible en capital
              (et non uniquement en rente) et déblocage anticipé pour achat de résidence principale.
            </p>
            <p className="mb-3">
              Si vous avez encore un PERP ou Madelin, vous pouvez le transférer vers un PERIN.
            </p>
          </>
        ),
      },
      {
        question: 'Comment fonctionne la déductibilité fiscale ?',
        answer: (
          <>
            <p className="mb-3">
              <strong>Mécanisme</strong> : vos versements viennent en déduction de votre revenu net imposable,
              ce qui réduit directement votre impôt à payer.
            </p>
            <div className="bg-neutral-100 border border-neutral-200 p-4 mb-3 font-mono text-sm">
              Économie d&apos;impôt = Montant versé × Votre TMI
            </div>
            <p className="mb-3">
              <strong>Exemples selon la TMI :</strong>
            </p>
            <ul className="list-none space-y-2 mb-3">
              {[
                ['TMI 11 %', '3 000€', '330€'],
                ['TMI 30 %', '3 000€', '900€'],
                ['TMI 41 %', '3 000€', '1 230€'],
                ['TMI 45 %', '3 000€', '1 350€'],
              ].map(([tmi, versement, economie]) => (
                <li key={tmi} className="flex gap-4 text-sm">
                  <span className="font-bold w-20">{tmi}</span>
                  <span className="text-neutral-600">Versement {versement} → économie <strong>{economie}</strong></span>
                </li>
              ))}
            </ul>
            <div className="bg-neutral-50 border-l-4 border-accent-400 p-4 mt-4">
              <p className="text-sm text-neutral-900">
                <strong>Plus votre TMI est élevée, plus le PER est avantageux.</strong> En dessous
                de la tranche à 11 %, l&apos;avantage fiscal est limité.
              </p>
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: 'Plafonds et calcul',
    items: [
      {
        question: 'Quel est le plafond de déduction PER en 2026 ?',
        answer: (
          <>
            <p className="mb-3">
              Le plafond annuel est calculé sur la base du <strong>PASS 2025 (47 100€)</strong> :
            </p>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-2 text-left">Paramètre</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Valeur</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['PASS 2025', '47 100 €'],
                  ['Plafond PER maximum', '37 680 € (10 % × 8 × PASS)'],
                  ['Plafond PER minimum', '4 710 € (10 % × 1 × PASS)'],
                  ['Abattement frais pro (salarié)', '10 % du revenu brut, min 509 €, max 14 555 €'],
                ].map(([param, val]) => (
                  <tr key={param}>
                    <td className="border border-neutral-300 px-4 py-2">{param}</td>
                    <td className="border border-neutral-300 px-4 py-2">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mb-3">
              <strong>Pour un salarié</strong>, le plafond est calculé sur le revenu <em>net professionnel</em>
              (après abattement de 10 % pour frais professionnels) : <code>10 % × revenu net professionnel</code>.
            </p>
            <div className="bg-neutral-50 border-l-4 border-accent-400 p-4">
              <p className="text-sm text-neutral-900">
                <strong>Exemple</strong> : Salarié, 60 000€ brut → revenu net professionnel
                = 54 000€ → plafond = 5 400€.
              </p>
            </div>
            <div className="mt-4">
              <CrossLink href="/per-individuel" title="Calculateur PER: plafond et report" description="Calculez votre plafond exact et combien vous pouvez reporter des années antérieures." />
            </div>
          </>
        ),
      },
      {
        question: 'Qu\'est-ce que le report des plafonds N-1 à N-5 ?',
        answer: (
          <>
            <p className="mb-3">
              Si vous n&apos;avez pas utilisé tout votre plafond PER dans les <strong>5 années précédentes</strong> (depuis la LF 2026 - auparavant 3 ans),
              vous pouvez <strong>reporter le solde non utilisé</strong> sur l&apos;année en cours.
            </p>
            <p className="mb-3">
              <strong>Comment ça s&apos;additionne :</strong>
            </p>
            <div className="bg-neutral-100 border border-neutral-200 p-4 mb-3 font-mono text-sm">
              Plafond total = Plafond N + Report N-1 + N-2 + N-3 + N-4 + N-5
            </div>
            <div className="bg-neutral-100 p-4 border border-neutral-200 mb-3">
              <p className="mb-2 font-bold text-sm">Exemple :</p>
              <ul className="list-none text-sm space-y-1">
                <li>Plafond N : 5 000€, versé 2 000€ → solde 3 000€</li>
                <li>Plafond N-1 : 4 800€, versé 4 800€ → solde 0€</li>
                <li>Plafond N-2 : 4 500€, versé 1 500€ → solde 3 000€</li>
                <li>Plafond N-3 : 4 200€, versé 4 200€ → solde 0€</li>
                <li>Plafond N-4 : 4 000€, versé 4 000€ → solde 0€</li>
                <li>Plafond N-5 : 3 800€, versé 1 800€ → solde 2 000€</li>
                <li className="font-bold mt-2">Plafond total disponible : 5 000 + 3 000 + 3 000 + 2 000 = <strong>13 000€</strong></li>
              </ul>
            </div>
            <p className="text-sm text-neutral-600">
              Les plafonds non utilisés sont indiqués sur votre avis d&apos;imposition (rubrique &quot;Plafonds
              non utilisés des années antérieures&quot;).
            </p>
          </>
        ),
      },
      {
        question: 'Comment est calculé le plafond exact pour un salarié ?',
        answer: (
          <>
            <p className="mb-3"><strong>Formule officielle (Art. 163 quatervicies du CGI) :</strong></p>
            <div className="bg-neutral-100 border border-neutral-200 p-4 mb-3 font-mono text-sm space-y-1">
              <p>Revenu net professionnel = Revenu brut − Abattement frais pro (10 %)</p>
              <p>Abattement 10 % = min(max(Revenu brut × 10 %, 509€), 14 555€)</p>
              <p>Plafond annuel = max(Revenu net professionnel × 10 %, 4 710€)</p>
              <p>Plafond annuel = min(Plafond calculé, 37 680€)</p>
            </div>
            <div className="bg-neutral-50 border-l-4 border-accent-400 p-4">
              <p className="text-sm text-neutral-900 mb-1"><strong>Exemple complet :</strong></p>
              <ul className="text-sm text-neutral-900 space-y-1">
                <li>Revenu brut : 50 000€</li>
                <li>Abattement 10 % : 5 000€ (dans la fourchette)</li>
                <li>Revenu net professionnel : 45 000€</li>
                <li>10 % × 45 000 = 4 500€ &lt; 4 710€ (minimum) → plafond = <strong>4 710€</strong></li>
              </ul>
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: 'Stratégie et sortie',
    items: [
      {
        question: 'Quand peut-on débloquer son PER ?',
        answer: (
          <>
            <p className="mb-3">
              Le PER est bloqué jusqu&apos;à la retraite, avec <strong>5 cas de déblocage anticipé</strong> :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>Acquisition de la <strong>résidence principale</strong></li>
              <li>Invalidité (titulaire, conjoint ou enfant)</li>
              <li>Décès du conjoint ou partenaire de PACS</li>
              <li>Surendettement</li>
              <li>Expiration des droits chômage</li>
            </ul>
            <div className="bg-neutral-50 border-l-4 border-accent-400 p-4 mt-4">
              <p className="text-sm text-neutral-900">
                <strong>Résidence principale</strong> : c&apos;est le cas le plus courant. Vous pouvez
                débloquer tout ou partie du PER sans pénalité pour financer votre achat.
                La fiscalité à la sortie s&apos;applique normalement.
              </p>
            </div>
          </>
        ),
      },
      {
        question: 'Sortie en capital ou en rente : quelle différence fiscale ?',
        answer: (
          <>
            <p className="mb-3">
              À la retraite, vous choisissez entre sortir en <strong>capital</strong> (tout d&apos;un coup
              ou en plusieurs fois) ou en <strong>rente viagère</strong>.
            </p>
            <p className="mb-3"><strong>Fiscalité à la sortie :</strong></p>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-2 text-left">Mode de sortie</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Imposition</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Capital (part versements)</td>
                  <td className="border border-neutral-300 px-4 py-2">IR sans prélèvements sociaux</td>
                </tr>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Capital (part plus-value)</td>
                  <td className="border border-neutral-300 px-4 py-2">PFU 30 % (ou IR + 17,2 %)</td>
                </tr>
                <tr>
                  <td className="border border-neutral-300 px-4 py-2">Rente viagère</td>
                  <td className="border border-neutral-300 px-4 py-2">IR sur fraction imposable (30 à 70 % selon âge)</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-neutral-600">
              La fiscalité à la sortie n&apos;est pas simulée par ce calculateur : ce calculateur mesure l&apos;avantage fiscal à l&apos;entrée. Pour estimer l&apos;impôt à la retraite, les paramètres clés sont votre TMI à ce moment-là et le mode de sortie choisi (capital ou rente). Les deux régimes sont résumés dans le tableau ci-dessus.
            </p>
          </>
        ),
      },
      {
        question: 'Le PER vaut-il le coup si ma TMI va baisser à la retraite ?',
        answer: (
          <>
            <p className="mb-3">
              <strong>Oui, si votre TMI aujourd&apos;hui est supérieure à votre TMI à la retraite</strong>.
              C&apos;est le cas pour la majorité des salariés.
            </p>
            <div className="bg-neutral-100 p-4 border border-neutral-200 mb-3">
              <p className="mb-2 text-sm font-bold">Exemple :</p>
              <ul className="text-sm space-y-1">
                <li>Aujourd&apos;hui TMI 30 % → versez 5 000€ → économie : <strong>1 500€</strong></li>
                <li>À la retraite TMI 11 % → vous payez 11 % sur 5 000€ = <strong>550€</strong></li>
                <li className="font-bold text-neutral-900">Gain net : 1 500 - 550 = 950€ (+ la croissance du capital)</li>
              </ul>
            </div>
            <p className="mb-3">
              <strong>Dans quel cas ce n&apos;est pas avantageux ?</strong>
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>Si votre TMI est identique ou plus haute à la retraite (rare, mais possible pour les TNS)</li>
              <li>Si vous avez besoin de liquidités avant la retraite (capital bloqué)</li>
              <li>Si votre TMI actuelle est à 0 % ou 11 % (gain fiscal limité)</li>
            </ul>
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
              <a
                href="https://github.com/nba67000/calculpatrimoine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 hover:underline"
              >
                GitHub
              </a>.
            </p>
          </>
        ),
      },
    ],
  },
]

export default function FAQPERPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_PER} />
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/faq', label: 'FAQ' },
          { label: 'PER Individuel' },
        ]}
        titre={<>Questions fréquentes<br />PER Individuel</>}
        description={<>Plafonds 2026, déductibilité, report des années antérieures, stratégie de sortie - tout comprendre sur le Plan d&apos;Épargne Retraite individuel.</>}
      />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <header className="mb-12">
            <Link
              href="/per-individuel"
              className="block bg-neutral-900 text-white rounded-xl p-6 hover:bg-neutral-800 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-neutral-400">Calculateur PER Individuel</div>
                  <div className="text-lg font-bold">Calculez votre économie d&apos;impôt</div>
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
              { href: '/faq/tmi', label: 'FAQ TMI', desc: 'Calculez votre tranche marginale d\'imposition avant de simuler le PER.' },
              { href: '/faq/assurance-vie', label: 'FAQ Assurance-Vie', desc: 'PER ou assurance-vie ? Comprendre les deux pour comparer.' },
              { href: '/methodologie', label: 'Méthodologie & sources', desc: 'Article 163 quatervicies CGI, PASS 2025, barème officiel.' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
                style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
              >
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
            <a href="mailto:contact@calculpatrimoine.fr" className="inline-block bg-white text-neutral-900 px-8 py-3 font-medium hover:bg-neutral-100 transition-colors">
              Nous contacter →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
