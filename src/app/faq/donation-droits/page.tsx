// src/app/faq/donation-droits/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import { FAQ_DONATION } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ Donation : abattements, barème, rappel 15 ans',
  description: "Abattements Art. 779 CGI, barème Art. 777, rappel fiscal 15 ans, don familial 790 G : toutes les réponses sur les droits de donation 2026.",
  openGraph: {
    title: 'FAQ Donation - Droits de mutation à titre gratuit',
    description: 'Questions fréquentes sur les droits de donation : abattement enfant 100 000 €, barème ligne directe, don familial 31 865 €, rappel 15 ans.',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CalculPatrimoine' }],
  },
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/donation-droits' },
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
    title: 'Abattements et barème',
    items: [
      {
        question: 'Quels abattements s\'appliquent sur une donation en 2026 ?',
        answer: (
          <>
            <p className="mb-3">
              Avant de calculer l&apos;impôt, on retire un abattement de la valeur donnée. Le montant de cet
              abattement dépend du lien entre celui qui donne et celui qui reçoit (Art. 779 et 790 E CGI).
              Il repart à zéro tous les 15 ans (Art. 784 CGI), donc on peut le réutiliser une fois ce
              délai passé.
            </p>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-2 text-left">Lien</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Abattement</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Article</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-neutral-300 px-4 py-2">Enfant ou parent</td><td className="border border-neutral-300 px-4 py-2">100 000 €</td><td className="border border-neutral-300 px-4 py-2">779-I</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">Époux / PACS</td><td className="border border-neutral-300 px-4 py-2">80 724 €</td><td className="border border-neutral-300 px-4 py-2">790 E</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">Petit-enfant</td><td className="border border-neutral-300 px-4 py-2">31 865 €</td><td className="border border-neutral-300 px-4 py-2">790 B</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">Frère ou sœur</td><td className="border border-neutral-300 px-4 py-2">15 932 €</td><td className="border border-neutral-300 px-4 py-2">779-IV</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">Neveu ou nièce</td><td className="border border-neutral-300 px-4 py-2">7 967 €</td><td className="border border-neutral-300 px-4 py-2">779-V</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">Donataire handicapé (cumulable)</td><td className="border border-neutral-300 px-4 py-2">+ 159 325 €</td><td className="border border-neutral-300 px-4 py-2">779-II</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">Tiers / parent éloigné</td><td className="border border-neutral-300 px-4 py-2">0 €</td><td className="border border-neutral-300 px-4 py-2">-</td></tr>
              </tbody>
            </table>
            <p className="text-sm text-neutral-600">
              Un abattement supplémentaire de 31 865 € s&apos;applique au don familial de sommes
              d&apos;argent (Art. 790 G), cumulable avec l&apos;abattement personnel sous conditions.
            </p>
          </>
        ),
      },
      {
        question: 'Quel est le barème des droits de donation en ligne directe ?',
        answer: (
          <>
            <p className="mb-3">
              Le barème de l&apos;article 777 CGI tableau I s&apos;applique sur la base taxable,
              c&apos;est-à-dire le montant de la donation moins l&apos;abattement personnel applicable. Il est progressif : chaque taux ne
              s&apos;applique que sur la part du montant qui tombe dans sa tranche. Concrètement,
              sur 100 000 € taxables, vous ne payez pas 20 % sur 100 000 € : vous payez 5 % sur
              les 8 072 premiers, 10 % sur la tranche suivante, etc.
            </p>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-2 text-left">Tranche taxable</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Taux</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-neutral-300 px-4 py-2">Jusqu&apos;à 8 072 €</td><td className="border border-neutral-300 px-4 py-2">5 %</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">8 072 € à 12 109 €</td><td className="border border-neutral-300 px-4 py-2">10 %</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">12 109 € à 15 932 €</td><td className="border border-neutral-300 px-4 py-2">15 %</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">15 932 € à 552 324 €</td><td className="border border-neutral-300 px-4 py-2">20 %</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">552 324 € à 902 838 €</td><td className="border border-neutral-300 px-4 py-2">30 %</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">902 838 € à 1 805 677 €</td><td className="border border-neutral-300 px-4 py-2">40 %</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">Au-delà de 1 805 677 €</td><td className="border border-neutral-300 px-4 py-2">45 %</td></tr>
              </tbody>
            </table>
            <div className="bg-neutral-50 border-l-4 border-accent-400 p-4">
              <p className="text-sm text-neutral-900">
                <strong>Exemple :</strong> donation parent → enfant de 200 000 €. Abattement 100 000 €,
                base taxable 100 000 €. Droits : 5 % × 8 072 + 10 % × 4 037 + 15 % × 3 823 + 20 % × 84 068
                = 18 194 €.
              </p>
            </div>
          </>
        ),
      },
      {
        question: 'Quel barème entre frères et sœurs, neveux et nièces ?',
        answer: (
          <>
            <p className="mb-3">
              <strong>Entre frères et sœurs</strong> (tableau III de l&apos;art. 777 CGI), le barème
              est dégradé par rapport à la ligne directe :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>35 % jusqu&apos;à 24 430 € de base taxable</li>
              <li>45 % au-delà de 24 430 €</li>
            </ul>
            <p className="mb-3">
              <strong>Pour les neveux et nièces et les parents jusqu&apos;au 4e degré</strong>
              {' '}(tableau IV), le taux est forfaitaire de <strong>55 %</strong> sur toute la base
              taxable, après abattement de 7 967 €. Au-delà du 4e degré ou sans aucun lien de
              parenté, le taux passe à <strong>60 %</strong> sans abattement.
            </p>
            <p className="text-sm text-neutral-600">
              Exemple : donation de 30 000 € à un neveu. Abattement 7 967 €, base 22 033 €,
              droits 22 033 × 55 % = 12 118 €.
            </p>
          </>
        ),
      },
      {
        question: 'Quel barème entre époux ou partenaires de PACS ?',
        answer: (
          <>
            <p className="mb-3">
              Le barème entre époux ou partenaires de PACS (tableau II de l&apos;art. 777 CGI) diffère
              légèrement de la ligne directe dans les premières tranches. L&apos;abattement personnel
              est de 80 724 € (Art. 790 E CGI).
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>5 % jusqu&apos;à 8 072 €</li>
              <li>10 % de 8 072 € à 15 932 €</li>
              <li>15 % de 15 932 € à 31 865 €</li>
              <li>20 % de 31 865 € à 552 324 €</li>
              <li>30 % au-delà selon les mêmes seuils que la ligne directe</li>
            </ul>
            <p className="text-sm text-neutral-600">
              À noter : en succession, le conjoint survivant ou partenaire de PACS est totalement
              exonéré (Art. 796-0 bis et ter CGI). Cette exonération n&apos;existe pas pour les
              donations - le barème s&apos;applique au-delà de l&apos;abattement de 80 724 €.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Rappel fiscal et fractionnement',
    items: [
      {
        question: 'Comment fonctionne le rappel fiscal de 15 ans ?',
        answer: (
          <>
            <p className="mb-3">
              L&apos;article 784 du CGI prévoit que si vous redonnez à la même personne dans les 15 ans
              qui suivent un premier don, ce premier don est pris en compte dans le nouveau calcul.
              Concrètement :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>
                <strong>L&apos;abattement déjà consommé n&apos;est plus disponible.</strong> Si un
                parent a donné 60 000 € à son enfant il y a 10 ans, il ne reste que 40 000 €
                d&apos;abattement pour une nouvelle donation aujourd&apos;hui.
              </li>
              <li>
                <strong>Les tranches basses du barème déjà parcourues ne se reconstituent pas.</strong>{' '}
                Si la donation antérieure a déjà consommé les tranches 5 %, 10 % et 15 %, la nouvelle
                donation démarre directement à 20 %.
              </li>
              <li>
                <strong>Au-delà de 15 ans révolus, le compteur repart à zéro.</strong> L&apos;abattement
                est intégralement disponible et le barème s&apos;applique à nouveau dès la première
                tranche.
              </li>
            </ul>
            <p className="text-sm text-neutral-600">
              Le délai de 15 ans se compte au jour près. C&apos;est pourquoi déclarer formellement la
              donation (formulaire 2735 ou acte notarié) est essentiel : cette déclaration fixe
              officiellement la date du don. Sans elle, en cas de contrôle, vous ne pourriez pas
              prouver que les 15 ans sont écoulés.
            </p>
          </>
        ),
      },
      {
        question: 'Comment fractionner ses donations pour optimiser le rappel 15 ans ?',
        answer: (
          <>
            <p className="mb-3">
              En espaçant les donations de 15 ans ou plus, l&apos;abattement de 100 000 € par parent
              et par enfant (Art. 779-I CGI) se reconstitue à chaque cycle. La simulation suivante
              illustre l&apos;effet du fractionnement sur un couple souhaitant transmettre 400 000 €
              à un enfant unique :
            </p>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-2 text-left">Stratégie</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Abattement</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Droits</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-neutral-300 px-4 py-2">Une seule donation père 400 000 €</td><td className="border border-neutral-300 px-4 py-2">100 000 €</td><td className="border border-neutral-300 px-4 py-2">58 194 €</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2">Père et mère donnent chacun 200 000 € le même jour</td><td className="border border-neutral-300 px-4 py-2">2 × 100 000 €</td><td className="border border-neutral-300 px-4 py-2">2 × 18 194 € = 36 388 €</td></tr>
              </tbody>
            </table>
            <p className="text-sm text-neutral-600">
              En attendant 15 ans pour fractionner sur deux périodes, l&apos;abattement de chaque
              parent se reconstituerait à nouveau, ce qui annulerait totalement les droits pour
              une donation de 400 000 €.
            </p>
            <div className="mt-4">
              <CrossLink href="/donation/droits" title="Simulateur de droits de donation" description="Saisissez le montant des donations antérieures pour visualiser l'effet du rappel 15 ans sur l'abattement disponible." />
            </div>
          </>
        ),
      },
    ],
  },
  {
    title: 'Don familial de sommes d\'argent (Art. 790 G CGI)',
    items: [
      {
        question: 'C\'est quoi le don familial de sommes d\'argent (Art. 790 G CGI) ?',
        answer: (
          <>
            <p className="mb-3">
              L&apos;article 790 G du CGI prévoit un abattement de <strong>31 865 €</strong> sur les
              dons de sommes d&apos;argent (chèque, virement, espèces). Cet abattement est{' '}
              <strong>cumulable avec l&apos;abattement personnel</strong> de l&apos;art. 779 et se
              reconstitue tous les 15 ans.
            </p>
            <p className="mb-3"><strong>Trois conditions cumulatives :</strong></p>
            <ul className="list-disc pl-6 mb-3 space-y-1">
              <li>Le donateur a <strong>moins de 80 ans</strong> à la date du don.</li>
              <li>Le donataire est <strong>majeur</strong> ou mineur émancipé.</li>
              <li>Le lien est <strong>descendant</strong> (enfant, petit-enfant, arrière-petit-enfant)
                ou, à défaut de descendant, <strong>neveu ou nièce</strong>.</li>
            </ul>
            <div className="bg-neutral-50 border-l-4 border-accent-400 p-4">
              <p className="text-sm text-neutral-900">
                <strong>Exemple :</strong> parent de 65 ans donne 150 000 € en numéraire à son enfant
                majeur. Abattement personnel 100 000 € + abattement 790 G 31 865 € = 131 865 €.
                Base taxable 18 135 €, droits 1 821 € au lieu de 18 194 € sans l&apos;option 790 G.
              </p>
            </div>
          </>
        ),
      },
      {
        question: 'Le don 790 G fonctionne-t-il pour la donation d\'un bien immobilier ?',
        answer: (
          <>
            <p className="mb-3">
              Non. L&apos;abattement de l&apos;article 790 G CGI ne s&apos;applique qu&apos;aux dons
              de <strong>sommes d&apos;argent</strong> (numéraire, chèque, virement, mandat). Il ne
              s&apos;applique ni à la donation d&apos;un bien immobilier, ni à celle de valeurs
              mobilières (actions, obligations), ni à celle d&apos;un objet d&apos;art ou de bijoux.
            </p>
            <p className="text-sm text-neutral-600">
              Pour ces donations, seul l&apos;abattement personnel de l&apos;article 779 CGI
              s&apos;applique (100 000 € en ligne directe par exemple).
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: 'Cas particuliers et démarches',
    items: [
      {
        question: 'Faut-il déclarer une donation au fisc ?',
        answer: (
          <>
            <p className="mb-3">
              <strong>Oui, dans le mois qui suit l&apos;acte.</strong> Deux formes de déclaration
              selon le type de donation :
            </p>
            <ul className="list-disc pl-6 mb-3 space-y-2">
              <li>
                <strong>Don manuel ou don familial 790 G</strong> : formulaire Cerfa 2735 à déposer
                au service des impôts (en ligne sur impots.gouv.fr ou en version papier).
              </li>
              <li>
                <strong>Donation par acte</strong> (immobilier, donation-partage, donation entre époux) :
                acte notarié obligatoire ; le notaire procède à l&apos;enregistrement et au paiement
                des droits.
              </li>
            </ul>
            <p className="text-sm text-neutral-600">
              Cette déclaration formelle donne <strong>date certaine</strong> au don et fait courir
              le délai de 15 ans pour le rappel fiscal. Elle est aussi déterminante en cas de
              contestation par les héritiers réservataires.
            </p>
          </>
        ),
      },
      {
        question: 'Quelle différence entre donation et succession ?',
        answer: (
          <>
            <p className="mb-3">
              Les <strong>abattements et le barème sont identiques</strong> en donation et en
              succession (Art. 777 et 779 CGI). La différence tient au moment du transfert et à
              plusieurs mécanismes spécifiques à chaque régime.
            </p>
            <table className="w-full text-sm border-collapse mb-3">
              <thead>
                <tr className="bg-neutral-100">
                  <th className="border border-neutral-300 px-4 py-2 text-left"></th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Donation</th>
                  <th className="border border-neutral-300 px-4 py-2 text-left">Succession</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-neutral-300 px-4 py-2 font-medium">Moment du transfert</td><td className="border border-neutral-300 px-4 py-2">Du vivant du donateur</td><td className="border border-neutral-300 px-4 py-2">Au décès</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2 font-medium">Abattement réutilisable</td><td className="border border-neutral-300 px-4 py-2">Tous les 15 ans</td><td className="border border-neutral-300 px-4 py-2">Une seule fois</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2 font-medium">Don familial 790 G</td><td className="border border-neutral-300 px-4 py-2">Cumulable +31 865 €</td><td className="border border-neutral-300 px-4 py-2">Non applicable</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2 font-medium">Conjoint survivant</td><td className="border border-neutral-300 px-4 py-2">Barème + abattement 80 724 €</td><td className="border border-neutral-300 px-4 py-2">Exonération totale (Art. 796-0 bis)</td></tr>
                <tr><td className="border border-neutral-300 px-4 py-2 font-medium">Démembrement</td><td className="border border-neutral-300 px-4 py-2">Stratégie courante</td><td className="border border-neutral-300 px-4 py-2">Réservé conjoint survivant</td></tr>
              </tbody>
            </table>
            <p className="text-sm text-neutral-600">
              Anticiper par donation permet d&apos;utiliser plusieurs cycles de 15 ans et de
              transmettre plus avec moins de droits, mais réduit le patrimoine disponible
              jusqu&apos;à la fin de vie du donateur.
            </p>
          </>
        ),
      },
      {
        question: 'Que se passe-t-il en cas de donation avec démembrement de propriété ?',
        answer: (
          <>
            <p className="mb-3">
              La donation de la nue-propriété (en conservant l&apos;usufruit) permet de réduire la
              base taxable selon le barème de l&apos;article 669 CGI : à 65 ans, l&apos;usufruit
              vaut 40 % de la pleine propriété, donc la nue-propriété vaut 60 %.
            </p>
            <p className="mb-3">
              <strong>Concrètement :</strong> un parent de 65 ans transmet la nue-propriété d&apos;un
              bien valant 500 000 € à son enfant. La base taxable est de 60 % × 500 000 € = 300 000 €,
              avant abattement de 100 000 € et application du barème.
            </p>
            <p className="text-sm text-neutral-600">
              Au décès du donateur, l&apos;usufruit s&apos;éteint et le donataire récupère la pleine
              propriété <strong>sans nouveau droit à payer</strong>. Cette stratégie n&apos;est pas
              encore intégrée à ce calculateur, qui se limite à la donation en pleine propriété.
              Un calculateur dédié au démembrement est en cours de développement.
            </p>
          </>
        ),
      },
      {
        question: 'Mes données sont-elles stockées ou envoyées quelque part ?',
        answer: (
          <>
            <p className="mb-3">
              <strong>Non, absolument pas.</strong> Tous les calculs sont effectués localement dans
              votre navigateur. Aucune donnée n&apos;est transmise à un serveur ni conservée après
              fermeture de la page.
            </p>
            <p>
              Le code source est open-source et vérifiable sur{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline">
                GitHub
              </a>.
            </p>
          </>
        ),
      },
    ],
  },
]

export default function FAQDonationPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_DONATION} />
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/faq', label: 'FAQ' },
          { label: 'Droits de donation' },
        ]}
        titre={<>Questions fréquentes<br />Droits de donation</>}
        description={<>Abattements par lien de parenté, barème art. 777 CGI, rappel fiscal de 15 ans, don familial de sommes d&apos;argent : tout comprendre sur les droits de mutation à titre gratuit applicables aux donations.</>}
      />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <header className="mb-12">
            <LegalDisclaimer />

            <Link
              href="/donation/droits"
              className="block bg-neutral-900 text-white rounded-xl p-6 hover:bg-neutral-800 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-neutral-400">Calculateur donation</div>
                  <div className="text-lg font-bold">Calculer les droits de ma donation</div>
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
              { href: '/faq/transmission', label: 'FAQ Transmission Assurance-Vie', desc: 'Comparer avec l\'abattement de 152 500 € par bénéficiaire (Art. 990 I CGI).' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'Rente viagère, PER, TMI, IFI - retrouvez chaque FAQ dédiée.' },
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
            <h3 className="font-serif text-2xl font-bold mb-3">Une question non couverte ?</h3>
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
