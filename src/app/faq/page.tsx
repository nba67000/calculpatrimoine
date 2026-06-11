// src/app/faq/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'FAQ - Questions fréquentes',
  description: 'Toutes les réponses sur nos calculateurs patrimoniaux : rente viagère, assurance-vie, PER, TMI, transmission. Retrouvez la FAQ dédiée à chaque outil.',
  keywords: 'faq calculpatrimoine, questions fréquentes, aide calculateur, rente viagère, assurance vie, PER, TMI',
  alternates: { canonical: 'https://calculpatrimoine.fr/faq' },
}

const FAQ_SECTIONS = [
  {
    href: '/faq/rente-viagere',
    label: 'FAQ Rente Viagère',
    desc: 'Fonctionnement, réversion, fiscalité, couple, bon âge pour souscrire - tout savoir avant de décider.',
    count: '15 questions',
  },
  {
    href: '/faq/assurance-vie',
    label: 'FAQ Assurance-Vie',
    desc: 'Fiscalité du rachat : PFU vs IR, abattement 8 ans, versements avant 2017, optimisations fiscales.',
    count: '15 questions',
  },
  {
    href: '/faq/per',
    label: 'FAQ PER Individuel',
    desc: 'Déductibilité des versements, plafonds 2026, report sur 3 ans, TMI, sortie en capital ou rente.',
    count: '10 questions',
  },
  {
    href: '/faq/transmission',
    label: 'FAQ Transmission Assurance-Vie',
    desc: 'Droits de succession, abattements avant et après 70 ans, clause bénéficiaire, optimisations.',
    count: '10 questions',
  },
  {
    href: '/faq/donation-droits',
    label: 'FAQ Droits de donation',
    desc: 'Abattements par lien de parenté (Art. 779), barème Art. 777, rappel 15 ans, don familial 790 G.',
    count: '12 questions',
  },
  {
    href: '/faq/tmi',
    label: "FAQ Tranche Marginale d'Imposition",
    desc: 'Calcul de la TMI, barème IR 2026, quotient familial, décote, différence TMI et taux moyen.',
    count: '8 questions',
  },
  {
    href: '/faq/ifi',
    label: 'FAQ IFI - Fortune immobilière',
    desc: 'Seuil 1 300 000 €, barème progressif, abattement résidence principale, décote, plafonnement IFI + IR.',
    count: '10 questions',
  },
]

export default function FAQIndexPage() {
  return (
    <>
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { label: 'FAQ' },
        ]}
        titre="Questions fréquentes"
        description="Retrouvez les réponses aux questions les plus courantes sur chacun de nos calculateurs."
      />
      <main style={{ backgroundColor: '#F7F3EC' }}>
        <div className="max-w-4xl mx-auto px-6 py-16">

          <div className="border-t border-neutral-300">
            {FAQ_SECTIONS.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group flex items-center justify-between py-6 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
                style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-0.5">
                    <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                      {section.label}
                    </p>
                    <span className="font-mono text-xs text-neutral-400">{section.count}</span>
                  </div>
                  <p className="text-sm text-neutral-500">{section.desc}</p>
                </div>
                <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
              </Link>
            ))}
          </div>

          <div className="bg-primary-700 p-8 text-center text-white mt-16">
            <h3 className="font-serif text-2xl font-bold mb-3">Vous ne trouvez pas votre réponse ?</h3>
            <p className="text-primary-200 mb-6 font-mono text-sm">Réponse par email sous 48h.</p>
            <a
              href="mailto:contact@calculpatrimoine.fr"
              className="inline-block bg-white text-primary-700 px-8 py-3 font-medium hover:bg-neutral-100 transition-colors"
            >
              Nous contacter →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
