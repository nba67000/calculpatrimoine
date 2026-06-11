// src/components/CalculateurPageLayout.tsx
//
// Layout standard des pages calculateur :
//   - Hero noir charbon + or (PageHero partage) — branding cohereant
//     avec la homepage v3 et toutes les autres pages internes.
//   - Corps lumineux #F7F3EC pour garder la zone fonctionnelle lisible
//     (inputs, resultats, tableaux, sliders).
import type { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import PageHero from '@/components/PageHero'
import RelatedCalcSection from '@/components/RelatedCalcSection'
import SchemaFAQ from '@/components/SchemaFAQ'
import SchemaHowTo from '@/components/SchemaHowTo'
import { getCalculator } from '@/lib/calculators'

interface BreadcrumbItem {
  href?: string
  label: string
}

interface Props {
  breadcrumb: BreadcrumbItem[]
  titre: ReactNode
  description: ReactNode
  features?: string[]
  /** Contenu à insérer entre la section héro et le disclaimer */
  aboveCalculator?: ReactNode
  calculator: ReactNode
  /** Slug href du calculateur courant. Active RelatedCalcSection. */
  currentHref?: string
  children?: ReactNode
  /**
   * Contenu de la section "Méthodologie et sources officielles", rendu
   * après les `children` dans un wrapper standardisé (H2 + container +
   * footer disclaimer). Typiquement : formules, SourcesSection, limites,
   * bandeau date de vérification. La structure interne reste libre.
   */
  methodologie?: ReactNode
}

export default function CalculateurPageLayout({
  breadcrumb,
  titre,
  description,
  features,
  aboveCalculator,
  calculator,
  currentHref,
  children,
  methodologie,
}: Props) {
  // Résolution du module calculateur via le registry pour injecter
  // automatiquement les schémas SEO (FAQ + HowTo). Cf. ADR-0001.
  const slug = currentHref?.replace(/^\//, '')
  const module = slug ? getCalculator(slug) : undefined

  return (
    <>
      {module && (
        <>
          <SchemaHowTo
            name={module.howToSchema.name}
            description={module.howToSchema.description}
            totalTime={module.howToSchema.totalTime}
            steps={module.howToSchema.steps}
            tool="Calculateur CalculPatrimoine"
          />
          <SchemaFAQ items={module.faqSchema} />
        </>
      )}
      <Header />

      <PageHero
        breadcrumb={breadcrumb}
        titre={titre}
        description={description}
        features={features}
      />

      <div style={{ backgroundColor: '#F7F3EC' }}>
        {aboveCalculator}

        <div className="max-w-6xl mx-auto px-6 pt-8 pb-4">
          <LegalDisclaimer />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-4 pb-12">
          {calculator}
        </div>

        {children}

        {methodologie && (
          <section className="max-w-4xl mx-auto px-6 py-4 pb-16">
            <div className="bg-white border border-neutral-200 p-8">
              <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">
                Méthodologie et sources officielles
              </h2>
              <div className="space-y-6">{methodologie}</div>
            </div>

            <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
              <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                Outil indicatif uniquement. Ne constitue pas un conseil fiscal ou patrimonial personnalisé.{' '}
                <a
                  href="https://github.com/nba67000/calculpatrimoine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Code source ouvert
                </a>
              </p>
            </div>
          </section>
        )}

        {currentHref && <RelatedCalcSection currentHref={currentHref} />}

      </div>
      <Footer />
    </>
  )
}
