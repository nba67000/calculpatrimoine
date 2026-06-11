import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurPageLayout from '@/components/CalculateurPageLayout'
import SourcesSection from '@/components/SourcesSection'
import { getPillarBreadcrumb } from '@/lib/calculators/breadcrumb'
// PERF: lazy-load → RenteModeContent sort du bundle initial (logique métier + recharts)
import dynamic from 'next/dynamic'
import CalculatorSkeleton from '@/components/Calculator/CalculatorSkeleton'

const RenteModeContent = dynamic(
  () => import('@/components/Calculator/RenteModeContent'),
  { loading: () => <CalculatorSkeleton /> }
)

export const metadata: Metadata = {
  title: 'Calculateur Rente Viagère - Tables INSEE 2021',
  description: 'Calculez votre rente viagère à partir d\'un capital. Tables de mortalité INSEE 2021 unisexes. Gestion de la réversion au conjoint, 3 modes de calcul.',
  alternates: { canonical: 'https://calculpatrimoine.fr/rente-viagere' },
}

const CROSS_LINKS = [
  { href: '/assurance-vie/fiscalite-rachat', label: "Plutôt un rachat qu'une rente ?", desc: 'Calculez la fiscalité exacte d\'un rachat partiel ou total d\'assurance-vie.' },
  { href: '/blog/rente-viagere-seuil-rentabilite', label: 'Article - Le seuil de rentabilité', desc: 'À 72 ans avec 250 000 €, le seuil tombe à 15,8 ans. Ce n\'est pas une anomalie.' },
  { href: '/faq/rente-viagere', label: 'FAQ rente viagère', desc: 'Espérance de vie, réversion, fiscalité, couple, bon âge pour souscrire.' },
]

const NOTE_VIAGER = (
  <div className="max-w-6xl mx-auto px-6 mb-6">
    <div className="bg-white border border-neutral-200 p-6">
      <p className="text-sm text-neutral-700 leading-relaxed">
        <strong>À ne pas confondre :</strong>{' '}
        La <strong>rente viagère</strong> (ce calculateur) convertit un capital financier en revenus mensuels versés à vie.
        Le <strong>viager immobilier</strong> est la vente d&apos;un bien avec bouquet + rente.
      </p>
    </div>
  </div>
)

export default function RenteViagerePage() {
  return (
    <>
      <CalculateurPageLayout
      breadcrumb={[...getPillarBreadcrumb('/rente-viagere'), { label: 'Rente Viagère' }]}
      titre={<>Calculateur<br />Rente Viagère</>}
      description="Convertissez votre épargne (PER, assurance-vie, capital) en revenus versés à vie.
        Estimations basées sur les tables de mortalité officielles INSEE,
        avec gestion de la réversion au conjoint."
      features={['Tables INSEE 2021', 'Réversion 60/80/100 %', '3 modes de calcul', 'Zéro donnée conservée']}
      aboveCalculator={NOTE_VIAGER}
      calculator={<RenteModeContent />}
      currentHref="/rente-viagere"
      methodologie={
        <>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Formules actuarielles</h3>
            <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5 grid sm:grid-cols-2 gap-x-8 gap-y-3 overflow-hidden">
              {[
                ['Annuité viagère (äx)', 'Σ (ₖpₓ × vᵏ) pour k = 0 à ω-x'],
                ["Facteur d'actualisation", 'v = 1 / (1 + i) - i = taux technique'],
                ['Probabilité de survie', 'ₖpₓ = lₓ₊ₖ / lₓ (tables TGH05/TGF05)'],
                ['Rente annuelle', 'Rente = Capital / äx'],
                ['Avec réversion', 'Capital / (äx + α × äy|x)'],
                ['Taux technique défaut', '0,5 % (standard marché)'],
              ].map(([label, val]) => (
                <div key={label} className="font-mono">
                  <p className="text-xs text-neutral-400 mb-0.5">{label}</p>
                  <p className="text-xs text-neutral-700 break-all">{val}</p>
                </div>
              ))}
            </div>
          </div>

          <SourcesSection slug="rente-viagere" title="Textes réglementaires" />

          <div className="border-l-4 border-primary-200 bg-primary-50 px-4 py-3">
            <p className="text-sm text-primary-800">
              Tables générationnelles TGH05 / TGF05 homologuées par arrêté du 1er août 2006 (art. A335-1 Code des assurances).
              Taux technique : 0,5 %. Table unisexe : pondération 48 % hommes / 52 % femmes.
              Dernière vérification des sources : mai 2026.
            </p>
          </div>
        </>
      }
    >

      {/* Explications */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white border border-neutral-200 p-8 space-y-5">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">
            Ce qui détermine le montant de la rente
          </h2>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              <strong>La rente dépend de l&apos;espérance de vie.</strong>{' '}
              Plus vous êtes âgé au moment de la conversion, plus la rente est élevée
              à capital égal : l&apos;assureur répartit votre capital sur moins d&apos;années statistiques.
              À 65 ans, l&apos;espérance résiduelle INSEE est d&apos;environ 20 ans ; à 75 ans, 12 ans.
            </p>
            <p>
              <strong>Tables unisexes depuis 2012.</strong>{' '}
              Depuis l&apos;arrêt <em>Test-Achats</em> (CJUE 2011), les assureurs utilisent des tables de mortalité unisexes.
              Un homme et une femme du même âge obtiennent donc la même rente à capital identique.
            </p>
            <p>
              <strong>Les assureurs intègrent une hypothèse de rendement futur dans le calcul.</strong>{' '}
              Ce taux technique part du principe que l&apos;assureur fera fructifier votre capital. Résultat : il vous verse dès le départ une rente un peu plus élevée, en pariant sur les gains à venir.
              Notre calculateur utilise 0,5 %, valeur standard du marché.
            </p>
            <p>
              <strong>La réversion réduit la rente, mais protège le conjoint.</strong>{' '}
              Opter pour une réversion à 60, 80 ou 100 % diminue votre rente personnelle,
              mais garantit le versement au conjoint survivant jusqu&apos;à son décès.
            </p>
          </div>
        </div>
      </section>

      {/* Liens croisés */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="border-t border-neutral-300">
          {CROSS_LINKS.map(link => (
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
      </section>

    </CalculateurPageLayout>
    </>
  )
}
