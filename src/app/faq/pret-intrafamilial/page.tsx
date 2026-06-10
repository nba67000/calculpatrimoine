// src/app/faq/pret-intrafamilial/page.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import CrossLink from '@/components/CrossLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQAccordionClient from '@/components/FAQAccordionClient'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_PRET_INTRAFAMILIAL } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
  title: 'FAQ Pret intrafamilial 2026 : formalites, fiscalite | CalculPatrimoine',
  description: "Questions frequentes sur le pret entre proches : formulaires 2062/2778, taux, fiscalite intérêts, succession, comparaison avec donation.",
  alternates: { canonical: 'https://calculpatrimoine.fr/faq/pret-intrafamilial' },
}

interface FAQItem { question: string; answer: ReactNode }
interface FAQSection { title: string; items: FAQItem[] }

const sections: FAQSection[] = [
  {
    title: 'Formaliser le prêt',
    items: [
      {
        question: 'Comment formaliser un prêt intrafamilial ?',
        answer: (
          <p>
            Un acte sous seing privé suffit jusqu&apos;à 5 000 €. Au-delà, la déclaration via
            le formulaire 2062 est obligatoire, à joindre à la déclaration de revenus de
            l&apos;année du prêt (Art. 242 ter CGI). Au-delà de 1 000 € d&apos;intérêts annuels,
            déclaration via le formulaire 2778 par le prêteur. La formalisation devant
            notaire (acte authentique) est conseillée pour les montants importants ou les
            délais longs.
          </p>
        ),
      },
      {
        question: "Quel taux d'intérêt appliquer ?",
        answer: (
          <p>
            Pas de taux légal imposé, mais un taux trop bas (ou nul) peut entraîner une
            requalification en donation indirecte. Référence usuelle : le TMM (taux moyen
            mensuel) publié par la Banque de France, ou un taux de marché équivalent à un
            prêt bancaire. Le prêt à 0 % est risqué fiscalement : l&apos;administration peut
            considérer que la fraction d&apos;intérêts non réclamée constitue un don taxable.
          </p>
        ),
      },
      {
        question: "Qu'est-ce qu'un prêt in fine ?",
        answer: (
          <p>
            Le prêt in fine est remboursé en une seule fois au terme : pendant la durée du
            prêt, seuls les intérêts sont versés annuellement, et le capital est remboursé
            intégralement à la dernière échéance. C&apos;est le format calculé ici car il
            facilite la comparaison avec une donation directe d&apos;un montant équivalent
            au capital.
          </p>
        ),
      },
    ],
  },
  {
    title: 'Fiscalité et succession',
    items: [
      {
        question: 'Le prêt est-il imposable pour le prêteur ?',
        answer: (
          <p>
            Les intérêts perçus sont imposables comme des revenus de capitaux mobiliers :
            option entre PFU 30 % ou barème IR + PS 17,2 %. Le capital remboursé n&apos;est pas
            imposable. À ne pas confondre avec une donation : le prêt n&apos;utilise pas
            l&apos;abattement Art. 779 et la créance reste dans le patrimoine du prêteur.
          </p>
        ),
      },
      {
        question: 'Que devient le prêt en cas de décès du prêteur ?',
        answer: (
          <p>
            La créance non remboursée entre dans l&apos;actif successoral du prêteur, et donc
            dans la succession. Si l&apos;emprunteur est aussi héritier, sa quote-part
            successorale s&apos;impute sur la dette résiduelle (mécanisme de la confusion).
            Le risque : si l&apos;héritier-emprunteur reçoit une part inférieure à la dette,
            il devra rembourser le surplus aux autres héritiers.
          </p>
        ),
      },
      {
        question: 'Prêt ou donation : que choisir ?',
        answer: (
          <>
            <p className="mb-3">
              Comparatif factuel. La donation utilise l&apos;abattement Art. 779
              (renouvelable tous les 15 ans) et coûte les droits Art. 777 au-delà ; elle
              est définitive. Le prêt n&apos;engage pas l&apos;abattement, génère des intérêts
              imposables, mais reste réversible et lié à la créance. Le calculateur affiche
              le coût net cumulé des deux options sur la durée saisie.
            </p>
            <div className="mt-4">
              <CrossLink
                href="/donation/droits"
                title="Calculateur Donation"
                description="Coût d'une donation directe en pleine propriété : abattements et barème Art. 777."
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

export default function FAQPretIntrafamilialPage() {
  return (
    <>
      <SchemaFAQ items={FAQ_PRET_INTRAFAMILIAL} />
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
              <span className="text-neutral-600">Prêt intrafamilial</span>
            </nav>

            <div className="h-[2px] w-10 bg-accent-400 mb-6" />

            <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">
              Questions fréquentes<br />Prêt intrafamilial in fine
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mb-10">
              Formalités, taux d&apos;intérêt, déclaration, fiscalité des intérêts, place dans
              la succession, comparaison avec la donation.
            </p>

            <Link href="/pret-intrafamilial" className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium mb-1 text-primary-100">Calculateur Prêt intrafamilial</div>
                  <div className="text-lg font-bold">Intérêts cumulés et comparaison vs donation</div>
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
              { href: '/faq/donation-droits', label: 'FAQ Donation', desc: 'Alternative au prêt : transmettre par donation directe avec abattements Art. 779.' },
              { href: '/faq/vente-vs-donation', label: 'FAQ Vente vs donation', desc: 'Quand le prêt sert à acquérir un bien à un proche.' },
              { href: '/faq', label: 'Toutes les FAQ', desc: 'Succession, transmission AV et autres sujets.' },
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
