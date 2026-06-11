import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Assurance-vie : combien vous allez vraiment payer sur un rachat',
  description: 'Règle proportionnelle, abattement 8 ans, PFU vs IR, versements avant 2017. Guide complet avec exemples chiffrés et formules officielles.',
  keywords: 'assurance vie fiscalité, rachat assurance vie impôts, pfu vs ir, abattement 8 ans, règle proportionnelle, versements 2017',
  openGraph: {
    title: 'Assurance-vie : combien vous allez vraiment payer sur un rachat',
    description: 'Vous retirez 50 000€. Vous pensez payer 15 000€ d\'impôts. La réalité est très différente.',
    type: 'article',
    publishedTime: '2026-04-18',
  },
  alternates: { canonical: 'https://calculpatrimoine.fr/blog/assurance-vie-fiscalite-rachat' },
}

export default function ArticleAssuranceViePage() {
  return (
    <>
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/blog', label: 'Blog' },
          { label: 'Fiscalité assurance-vie' },
        ]}
        titre="Assurance-vie : combien vous allez vraiment payer sur un rachat"
        features={['Fiscalité', '11 min de lecture', '18 avril 2026']}
      />
      <article style={{ backgroundColor: '#F7F3EC' }}>

        <div className="max-w-4xl mx-auto px-6 pt-12 pb-16">

          {/* Intro */}
          <div className="mb-12">
            <p className="text-xl text-neutral-700 leading-relaxed mb-6">
              Vous avez 100 000 euros sur une assurance-vie : 70 000 euros de versements, 30 000 euros de gains. Vous voulez retirer 50 000 euros. Combien allez-vous payer d&apos;impôts ?
            </p>
            <p className="text-neutral-700 mb-4">
              Posez la question à votre banquier, à votre beau-frère, et à Google : vous aurez trois réponses différentes. Et aucune ne sera complète.
            </p>
            <p className="text-neutral-700 mb-4">
              La fiscalité du rachat d&apos;assurance-vie, ce n&apos;est pas une simple multiplication. C&apos;est un empilement de règles qui se cumulent : la règle proportionnelle, l&apos;abattement des 8 ans, la date pivot du 27 septembre 2017, le choix entre PFU et impôt sur le revenu.
            </p>
            <p className="text-neutral-700">
              On décortique tout. Formules, calculs, pièges, exemples chiffrés. Zéro marketing.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-12">
            <p className="font-mono text-xs font-bold text-warning-800 uppercase tracking-wider mb-1">Avertissement</p>
            <p className="text-sm text-warning-700 leading-relaxed">
              Cet article compare les options fiscales possibles. Il ne remplace pas un conseil fiscal personnalisé. Chaque situation est unique. Pour une décision adaptée à votre cas, voyez un expert-comptable, un avocat fiscaliste ou un conseiller en gestion de patrimoine indépendant.
            </p>
          </div>

          {/* Lexique */}
          <div className="bg-surface-card border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-5">Lexique - avant de commencer</p>
            <div className="space-y-5">
              {[
                {
                  terme: 'Rachat',
                  def: "En assurance-vie, on ne dit pas « retrait » mais « rachat ». Rachat partiel : vous retirez une partie en gardant le contrat ouvert. Rachat total : vous clôturez et récupérez tout. Ça n'a aucune incidence sur le calcul de l'impôt, juste sur le vocabulaire.",
                },
                {
                  terme: 'Plus-value (ou gain)',
                  def: "L'écart entre ce que votre contrat vaut aujourd'hui et ce que vous avez versé. 70 000 euros versés, contrat à 100 000 euros : plus-value de 30 000 euros. L'impôt porte uniquement sur cette plus-value, pas sur l'ensemble du contrat.",
                },
                {
                  terme: 'PFU - Prélèvement Forfaitaire Unique',
                  def: "Un taux fixe de 30 % sur les gains financiers : 12,8 % d'impôt sur le revenu + 17,2 % de prélèvements sociaux. Aussi appelé « flat tax ». S'applique par défaut sur vos rachats, sauf si vous demandez l'option IR.",
                },
                {
                  terme: 'TMI - Taux Marginal d\'Imposition',
                  def: "Le taux qui s'applique sur votre dernière tranche de revenus. En 2025, les tranches sont 0 %, 11 %, 30 %, 41 % et 45 %. Un salarié à 45 000 euros nets imposables est à TMI 30 %. C'est ce taux qui détermine si le PFU ou l'option IR est plus avantageux.",
                },
                {
                  terme: 'Antériorité fiscale',
                  def: "L'âge de votre contrat depuis l'ouverture. Un contrat ouvert il y a 9 ans, c'est 9 ans d'antériorité. C'est elle qui vous donne droit à l'abattement des 8 ans. Si vous clôturez un vieux contrat pour en ouvrir un neuf, vous perdez tout.",
                },
              ].map(({ terme, def }) => (
                <div key={terme} className="border-b border-neutral-100 pb-5 last:border-0 last:pb-0">
                  <p className="font-bold text-sm text-neutral-900 mb-1.5">{terme}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-neutral-900 px-8 py-6 mb-12">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2">Outil associé</p>
            <p className="text-white font-bold text-lg mb-1">Calculez votre fiscalité en deux minutes</p>
            <p className="text-neutral-400 text-sm mb-4">
              Le calculateur applique automatiquement toutes les règles : règle proportionnelle, abattement 8 ans, taux réduit 2017, comparaison PFU vs IR.
            </p>
            <Link href="/assurance-vie" className="inline-block bg-surface-card text-neutral-900 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur →
            </Link>
          </div>

          {/* Sommaire */}
          <nav className="bg-surface-card border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-4">Sommaire</p>
            <ol className="space-y-2 text-sm font-mono">
              <li><a href="#piege-1" className="text-neutral-900 hover:underline">1. Le piège n°1 : croire qu&apos;on taxe tout le rachat</a></li>
              <li><a href="#abattement" className="text-neutral-900 hover:underline">2. L&apos;abattement des 8 ans</a></li>
              <li><a href="#pfu-vs-ir" className="text-neutral-900 hover:underline">3. PFU ou IR : lequel choisir ?</a></li>
              <li><a href="#date-2017" className="text-neutral-900 hover:underline">4. La date du 27 septembre 2017</a></li>
              <li><a href="#150k" className="text-neutral-900 hover:underline">5. Le cas des contrats de plus de 150 000 euros</a></li>
              <li><a href="#erreurs" className="text-neutral-900 hover:underline">6. Trois cas comparés : l&apos;écart selon le timing</a></li>
              <li><a href="#cas-concrets" className="text-neutral-900 hover:underline">7. Cas concrets : 3 profils, 3 calculs</a></li>
              <li><a href="#optimisations" className="text-neutral-900 hover:underline">8. Optimisations légales</a></li>
            </ol>
          </nav>

          {/* SECTION 1 */}
          <section id="piege-1" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Le piège n°1 : croire qu&apos;on taxe tout le rachat</h2>

            <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-4">
              <p className="font-mono text-xs text-warning-700 uppercase tracking-wider mb-1">Ce qu&apos;on entend souvent</p>
              <p className="text-warning-800 text-sm font-medium">&laquo;&nbsp;Je retire 50 000 euros, je vais payer 30 % dessus, soit 15 000 euros d&apos;impôts.&nbsp;&raquo;</p>
            </div>
            <div className="border-l-4 border-accent-400 bg-neutral-50 px-5 py-4 mb-8">
              <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">Ce qui se passe réellement</p>
              <p className="text-neutral-700 text-sm leading-relaxed">On taxe uniquement la plus-value contenue dans votre rachat. Pas le capital que vous avez versé. Jamais.</p>
            </div>

            <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-4">La règle proportionnelle</h3>

            <p className="text-neutral-700 mb-4">
              Quand vous retirez de l&apos;argent, le fisc applique une règle simple : votre rachat contient la même proportion de plus-value que l&apos;ensemble de votre contrat.
            </p>
            <p className="text-neutral-700 mb-6">
              Si votre contrat est composé à 30 % de gains, chaque euro que vous retirez contient 30 centimes de gains taxables. Pas plus.
            </p>

            <div className="bg-surface-card border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2">Formule</p>
              <p className="font-mono text-sm text-neutral-800">Plus-value dans le rachat = Montant retiré × (Plus-value totale ÷ Capital total)</p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Application à notre exemple</p>
              <div className="space-y-1.5 text-sm text-neutral-800 font-mono">
                <p>Capital total du contrat : 100 000 euros</p>
                <p>Versements : 70 000 euros · Plus-value : 30 000 euros</p>
                <p className="font-bold text-neutral-900 pt-2">Taux de plus-value dans le contrat : 30 %</p>
                <p className="pt-2">Vous retirez 50 000 euros</p>
                <p className="font-bold text-neutral-900">Plus-value dans le rachat : 50 000 × 30 % = 15 000 euros</p>
                <p>Capital remboursé (non taxé) : 50 000 − 15 000 = 35 000 euros</p>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <p className="text-sm font-bold text-neutral-900">Vous payez des impôts sur 15 000 euros de plus-value. Pas sur les 50 000 euros retirés.</p>
              </div>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <span className="font-medium text-neutral-700">BOFiP - RPPM-RCM-20-10-20</span>
            </p>
          </section>

          {/* SECTION 2 */}
          <section id="abattement" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">L&apos;abattement des 8 ans</h2>

            <p className="text-neutral-700 mb-4">
              Si votre contrat a plus de 8 ans, l&apos;État vous accorde une réduction annuelle sur la plus-value taxable : c&apos;est l&apos;abattement des 8 ans.
            </p>
            <p className="text-neutral-700 mb-6">
              Le montant : 4 600 euros par an pour une personne seule, 9 200 euros pour un couple marié ou pacsé. Il se renouvelle à chaque année civile.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3">Contrat de moins de 8 ans</p>
                <div className="font-mono text-sm space-y-1 text-neutral-700">
                  <p>Plus-value dans le rachat : 15 000 euros</p>
                  <p>Abattement : 0 euro</p>
                  <p className="font-bold text-neutral-900 pt-2">Plus-value taxable : 15 000 euros</p>
                </div>
              </div>
              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3">Contrat de plus de 8 ans (personne seule)</p>
                <div className="font-mono text-sm space-y-1 text-neutral-700">
                  <p>Plus-value dans le rachat : 15 000 euros</p>
                  <p>Abattement : 4 600 euros</p>
                  <p className="font-bold text-neutral-900 pt-2">Plus-value taxable : 10 400 euros</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-accent-400 bg-accent-100 px-5 py-4 my-6">
              <p className="font-mono text-xs text-neutral-600 uppercase tracking-wider mb-1">Ce que ça donne en cash</p>
              <p className="text-sm text-neutral-800">
                4 600 euros × 30 % (PFU) = <strong>1 380 euros d&apos;impôts économisés</strong> chaque année, juste grâce à l&apos;ancienneté du contrat.
              </p>
            </div>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mt-8 mb-4">Le piège du &laquo;&nbsp;presque 8 ans&nbsp;&raquo;</h3>

            <p className="text-neutral-700 mb-4">
              Votre contrat a 7 ans et 11 mois. Vous avez besoin de liquidités. Deux options.
            </p>

            <div className="bg-surface-card border border-neutral-200 p-5 my-6">
              <div className="space-y-5 text-sm">
                <div>
                  <p className="font-bold text-neutral-900 font-mono mb-1">Option A - Retirer maintenant</p>
                  <p className="text-neutral-600 font-mono">Plus-value taxable : 15 000 euros (aucun abattement)</p>
                  <p className="text-neutral-600 font-mono">Impôt : 15 000 × 30 % = <strong>4 500 euros</strong></p>
                </div>
                <div className="border-t border-neutral-100 pt-5">
                  <p className="font-bold text-neutral-900 font-mono mb-1">Option B - Attendre 1 mois</p>
                  <p className="text-neutral-600 font-mono">Plus-value taxable : 10 400 euros (après abattement de 4 600 euros)</p>
                  <p className="text-neutral-600 font-mono">Impôt : 10 400 × 30 % = <strong>3 120 euros</strong></p>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <p className="font-bold text-accent-600 font-mono">1 380 euros économisés en attendant 30 jours.</p>
                </div>
              </div>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed">
              C&apos;est souvent la période la plus rentable de toute la vie d&apos;un contrat. Un mois d&apos;attente peut valoir plusieurs milliers d&apos;euros.
            </p>

          </section>

          {/* SECTION 3 */}
          <section id="pfu-vs-ir" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">PFU ou IR : lequel choisir ?</h2>

            <p className="text-neutral-700 mb-6">
              Depuis 2018, vous avez deux façons de payer l&apos;impôt sur vos plus-values d&apos;assurance-vie.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">Option 1 - PFU (Prélèvement Forfaitaire Unique)</p>
                <p className="text-sm text-neutral-700 mb-3">
                  Taux fixe de 30 % sur vos plus-values, peu importe votre tranche d&apos;imposition. Composé de 12,8 % d&apos;impôt sur le revenu et 17,2 % de prélèvements sociaux. C&apos;est l&apos;option par défaut, appliquée automatiquement si vous ne demandez rien.
                </p>
                <p className="font-mono text-xs text-neutral-400">Pour : simple. Contre : coûteux si votre taux marginal est bas.</p>
              </div>
              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">Option 2 - IR + prélèvements sociaux</p>
                <p className="text-sm text-neutral-700 mb-3">
                  Vos plus-values rejoignent votre revenu imposable et sont taxées à votre taux marginal, plus 17,2 % de prélèvements sociaux. Vous devez le demander explicitement à la déclaration.
                </p>
                <p className="font-mono text-xs text-neutral-400">Pour : souvent moins cher à TMI 0 ou 11 %. Contre : à demander à la main chaque année.</p>
              </div>
            </div>

            <h3 className="font-bold text-neutral-900 mb-4">Le tableau de comparaison</h3>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-300">
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Votre TMI</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">IR + prélèvements sociaux</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">PFU</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Écart</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-mono text-xs">
                  <tr><td className="py-2 text-neutral-700">0 %</td><td className="py-2">17,2 %</td><td className="py-2">30 %</td><td className="py-2 text-neutral-900">Le PFU coûte 74 % de plus</td></tr>
                  <tr><td className="py-2 text-neutral-700">11 %</td><td className="py-2">28,2 %</td><td className="py-2">30 %</td><td className="py-2 text-neutral-900">Le PFU coûte 6 % de plus</td></tr>
                  <tr><td className="py-2 text-neutral-700">30 %</td><td className="py-2">47,2 %</td><td className="py-2">30 %</td><td className="py-2 text-accent-600">L&apos;IR coûte 57 % de plus</td></tr>
                  <tr><td className="py-2 text-neutral-700">41 %</td><td className="py-2">58,2 %</td><td className="py-2">30 %</td><td className="py-2 text-accent-600">L&apos;IR coûte 94 % de plus</td></tr>
                  <tr><td className="py-2 text-neutral-700">45 %</td><td className="py-2">62,2 %</td><td className="py-2">30 %</td><td className="py-2 text-accent-600">L&apos;IR coûte 107 % de plus</td></tr>
                </tbody>
              </table>
            </div>

            <div className="border-l-4 border-accent-400 bg-neutral-50 px-5 py-4 my-6">
              <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">La règle simple</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Le calculateur compare les deux options en temps réel. À TMI ≤ 11 %, l&apos;IR gagne toujours. À 30 % et au-dessus, c&apos;est le PFU presque tout le temps.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <span className="font-medium text-neutral-700">Article 125-0 A du CGI</span>
            </p>
          </section>

          {/* SECTION 4 */}
          <section id="date-2017" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">La date du 27 septembre 2017</h2>

            <p className="text-neutral-700 mb-4">
              Si vous avez fait des versements avant le 27 septembre 2017, vous bénéficiez d&apos;un taux réduit sur ces versements, à condition que votre contrat ait plus de 8 ans.
            </p>
            <p className="text-neutral-700 mb-6">
              Pourquoi cette date pivot ? La loi de finances 2018 a créé le PFU à 30 %. Pour ne pas pénaliser rétroactivement les épargnants qui avaient ouvert leur contrat sous l&apos;ancien régime, le législateur a accordé un taux préférentiel sur les versements antérieurs.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Taux applicable aux versements avant le 27/09/2017, contrat de plus de 8 ans</p>
              <div className="font-mono text-sm space-y-1 text-neutral-800">
                <p>Taux d&apos;imposition sur le revenu : 7,5 % (au lieu de 12,8 %)</p>
                <p>Prélèvements sociaux : 17,2 % (inchangés)</p>
                <p className="font-bold text-neutral-900 pt-2 border-t border-neutral-200 mt-2">Total : 24,7 % au lieu de 30 %</p>
              </div>
              <p className="mt-3 text-sm text-neutral-700">Sur 10 000 euros de plus-value, ça fait 530 euros d&apos;économie.</p>
            </div>

            <h3 className="font-bold text-neutral-900 mt-8 mb-4">Le cas mixte : versements avant et après 2017</h3>

            <p className="text-neutral-700 mb-4">
              Vous avez versé 50 000 euros avant 2017 et 20 000 euros après. Le fisc calcule un taux moyen pondéré selon la proportion de chaque type de versements.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Exemple de calcul</p>
              <div className="font-mono text-sm space-y-1.5 text-neutral-800">
                <p>Plus-value totale : 30 000 euros</p>
                <p>Versements avant 2017 : 50 000 euros soit 71 % du total</p>
                <p>Versements après 2017 : 20 000 euros soit 29 % du total</p>
                <p className="pt-2">Plus-value liée aux versements pré-2017 : 30 000 × 71 % = 21 300 euros → taxée à 24,7 %</p>
                <p>Plus-value liée aux versements post-2017 : 30 000 × 29 % = 8 700 euros → taxée à 30 %</p>
                <p className="font-bold text-neutral-900 pt-2 border-t border-neutral-200 mt-2">Taux moyen effectif : 26,2 %</p>
              </div>
            </div>

            <div className="border-l-4 border-accent-400 bg-neutral-50 px-5 py-4 my-6">
              <p className="text-sm text-neutral-700 leading-relaxed">
                Le calculateur gère ce cas automatiquement. Vous entrez le montant des versements avant 2017, il fait le reste.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <a href="https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000036339197" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline">Loi de finances 2018, article 28</a>
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="150k" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Le cas des contrats de plus de 150 000 euros</h2>

            <p className="text-neutral-700 mb-6">
              Si vos versements totaux, tous contrats d&apos;assurance-vie confondus, passent les 150 000 euros, une règle supplémentaire peut s&apos;appliquer. Et elle est massivement mal comprise.
            </p>

            <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-6">
              <p className="font-mono text-xs text-warning-700 uppercase tracking-wider mb-1">Ce qu&apos;on entend souvent</p>
              <p className="text-warning-800 text-sm font-medium">&laquo;&nbsp;J&apos;ai plus de 150 000 euros sur mon assurance-vie, donc je vais payer une taxe supplémentaire à chaque rachat.&nbsp;&raquo;</p>
            </div>

            <div className="border-l-4 border-accent-400 bg-neutral-50 px-5 py-4 mb-6">
              <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">Ce qui se passe réellement</p>
              <p className="text-neutral-700 text-sm leading-relaxed">
                Cette règle ne touche pas vos rachats de votre vivant. Elle vise uniquement les versements faits après vos 70 ans qui dépassent 152 500 euros. Et même là, elle ne s&apos;applique qu&apos;à votre décès, pour les bénéficiaires.
              </p>
            </div>

            <p className="text-neutral-700 mb-4">
              Si vous avez versé 200 000 euros avant vos 70 ans et que votre capital est monté à 300 000 euros, vous n&apos;êtes pas concerné. Ni sur vos rachats, ni sur la transmission à votre décès.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Les trois conditions cumulatives pour que la taxe s&apos;applique</p>
              <div className="font-mono text-sm space-y-2 text-neutral-800">
                <p>1. Les versements ont été faits après vos 70 ans</p>
                <p>2. Ces versements dépassent 152 500 euros au total, tous contrats confondus</p>
                <p>3. L&apos;assureur verse le capital aux bénéficiaires après votre décès</p>
              </div>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <a href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047288653" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline">Article 990 I du CGI</a>
            </p>
          </section>

          {/* SECTION 6 */}
          <section id="erreurs" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Trois cas comparés : l&apos;écart selon le timing</h2>

            {[
              {
                titre: '1. Retirer juste avant les 8 ans',
                desc: 'Votre contrat a 7 ans et 10 mois. Vous avez besoin d\'argent et vous retirez tout de suite. L\'écart : 1 380 euros pour 60 jours de différence.',
                cols: [
                  { label: 'Retrait immédiat', lines: ['Plus-value : 15 000 euros', 'Abattement : 0 euro', 'Impôt à 30 % : 4 500 euros'] },
                  { label: 'Attente de 2 mois', lines: ['Plus-value : 15 000 euros', 'Abattement : 4 600 euros', 'Impôt à 30 % : 3 120 euros'] },
                ],
                cout: '1 380 euros pour 60 jours d\'impatience',
              },
              {
                titre: '2. Faire un gros rachat en décembre plutôt qu\'à cheval sur deux ans',
                desc: 'L\'abattement de 4 600 euros se renouvelle à chaque année civile. Fractionner un gros retrait entre décembre et janvier permet de l\'utiliser deux fois.',
                cols: [
                  { label: 'Rachat unique en décembre', lines: ['Plus-value : 24 000 euros', 'Abattement : 4 600 euros', 'Plus-value taxable : 19 400 euros', 'Impôt : 5 820 euros'] },
                  { label: 'Fractionné déc. + janv.', lines: ['Déc. : 12 000 euros de PV → 7 400 euros taxables', 'Janv. : 12 000 euros de PV → 7 400 euros taxables', 'Total taxable : 14 800 euros', 'Impôt : 4 440 euros'] },
                ],
                cout: '1 380 euros pour 1 mois d\'attente',
              },
              {
                titre: '3. Laisser le PFU s\'appliquer sans vérifier',
                desc: 'Le PFU s\'applique automatiquement si vous ne demandez rien. Avec une TMI à 11 %, l\'option IR est moins taxée que le PFU. Mais elle ne s\'applique jamais par défaut.',
                cols: [
                  { label: 'PFU par défaut', lines: ['Plus-value taxable : 10 000 euros', 'Taux : 30 %', 'Impôt : 3 000 euros'] },
                  { label: 'Option IR + prél. sociaux', lines: ['Plus-value taxable : 10 000 euros', 'Taux : 11 % + 17,2 % = 28,2 %', 'Impôt : 2 820 euros'] },
                ],
                cout: '180 euros sur cet exemple, beaucoup plus sur de gros montants',
              },
            ].map(({ titre, desc, cols, cout }) => (
              <div key={titre} className="mb-10">
                <h3 className="font-bold text-neutral-900 mb-2">{titre}</h3>
                <p className="text-sm text-neutral-700 mb-4 leading-relaxed">{desc}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {cols.map(col => (
                    <div key={col.label} className="bg-surface-card border border-neutral-200 p-4">
                      <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">{col.label}</p>
                      <div className="font-mono text-xs space-y-1 text-neutral-700">
                        {col.lines.map(l => <p key={l}>{l}</p>)}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="font-mono text-xs text-accent-600 font-bold">Coût de l&apos;erreur : {cout}</p>
              </div>
            ))}

            <div className="mb-10">
              <h3 className="font-bold text-neutral-900 mb-2">4. Oublier les versements avant 2017</h3>
              <p className="text-sm text-neutral-700 mb-4 leading-relaxed">
                Vous avez ouvert votre contrat en 2010 et versé 100 000 euros. Vous croyez que tout est taxé à 30 % ? Faux. Vos versements avant le 27 septembre 2017 bénéficient du taux réduit de 24,7 %.
              </p>
              <div className="bg-neutral-50 border border-neutral-200 p-4 font-mono text-xs text-neutral-700 space-y-1">
                <p>Taux 30 % sur 20 000 euros de plus-value : 6 000 euros d&apos;impôt</p>
                <p>Taux 24,7 % sur 20 000 euros de plus-value : 4 940 euros d&apos;impôt</p>
                <p className="font-bold text-accent-600 pt-1">Économie : 1 060 euros. Automatiquement.</p>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="font-bold text-neutral-900 mb-2">5. Confondre montant retiré et plus-value taxable</h3>
              <p className="text-sm text-neutral-700 mb-4 leading-relaxed">
                Vous retirez 50 000 euros, vous croyez payer des impôts sur 50 000 euros. C&apos;est l&apos;erreur la plus fréquente, et celle qui génère le plus d&apos;angoisse inutile.
              </p>
              <div className="bg-neutral-50 border border-neutral-200 p-4 font-mono text-xs space-y-1.5 text-neutral-700">
                <p>Impôt imaginé : 50 000 × 30 % = <strong>15 000 euros</strong></p>
                <div className="border-t border-neutral-200 pt-2 mt-1 space-y-1">
                  <p>Règle proportionnelle : plus-value dans le rachat = 50 000 × 30 % = 15 000 euros</p>
                  <p>Abattement des 8 ans : 15 000 − 4 600 = 10 400 euros taxables</p>
                  <p className="font-bold text-neutral-900">Impôt réel : 10 400 × 30 % = 3 120 euros</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7 */}
          <section id="cas-concrets" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Cas concrets : 3 profils, 3 calculs</h2>

            <p className="text-neutral-700 mb-8">
              On part du même contrat à chaque fois : plus de 8 ans d&apos;ancienneté, 100 000 euros de capital, 70 000 euros de versements, 30 000 euros de plus-value.
            </p>

            {[
              {
                num: 'Cas 1',
                titre: 'Jean, retraité modeste',
                profil: '68 ans. Pension annuelle de 18 000 euros. Taux marginal : 0 % (non imposable).',
                besoin: 'Retirer 50 000 euros pour financer des travaux.',
                etapes: [
                  { label: 'Règle proportionnelle', val: 'Plus-value dans le rachat : 50 000 × (30 000 ÷ 100 000) = 15 000 euros' },
                  { label: 'Abattement 8 ans', val: 'Plus-value taxable : 15 000 − 4 600 = 10 400 euros' },
                ],
                pfu: '10 400 × 30 % = 3 120 euros',
                ir: '10 400 × (0 % + 17,2 %) = 1 789 euros',
                conclusion: 'À TMI 0 %, l\'option IR fait économiser 1 331 euros. Jean doit le demander explicitement à la déclaration.',
                gagnant: 'IR',
              },
              {
                num: 'Cas 2',
                titre: 'Marie, cadre supérieure',
                profil: '45 ans. Salaire de 90 000 euros par an. Taux marginal : 41 %.',
                besoin: 'Retirer 30 000 euros pour un apport immobilier.',
                etapes: [
                  { label: 'Règle proportionnelle', val: 'Plus-value dans le rachat : 30 000 × 30 % = 9 000 euros' },
                  { label: 'Abattement 8 ans', val: 'Plus-value taxable : 9 000 − 4 600 = 4 400 euros' },
                ],
                pfu: '4 400 × 30 % = 1 320 euros',
                ir: '4 400 × (41 % + 17,2 %) = 2 561 euros',
                conclusion: 'À TMI 41 %, le PFU fait économiser 1 241 euros. Et il s\'applique par défaut, donc rien à faire.',
                gagnant: 'PFU',
              },
              {
                num: 'Cas 3',
                titre: 'Paul et Sophie, couple retraité',
                profil: '70 ans chacun. Pensions cumulées de 48 000 euros par an. Taux marginal : 11 %. Tous les versements (70 000 euros) ont été effectués avant le 27 septembre 2017.',
                besoin: 'Retirer 60 000 euros pour aider leurs enfants.',
                etapes: [
                  { label: 'Règle proportionnelle', val: 'Plus-value dans le rachat : 60 000 × 30 % = 18 000 euros' },
                  { label: 'Abattement couple (9 200 euros)', val: 'Plus-value taxable : 18 000 − 9 200 = 8 800 euros' },
                  { label: 'Taux réduit pré-2017', val: 'Tous les versements datent d\'avant 2017 → taux PFU réduit à 24,7 %' },
                ],
                pfu: '8 800 × 24,7 % = 2 174 euros',
                ir: '8 800 × (11 % + 17,2 %) = 2 482 euros',
                conclusion: 'Le PFU à taux réduit fait économiser 308 euros. Les versements pré-2017 basculent l\'arbitrage côté PFU malgré un TMI faible.',
                gagnant: 'PFU',
              },
            ].map(cas => (
              <div key={cas.num} className="mb-10">
                <div className="bg-neutral-900 px-5 py-4">
                  <p className="font-mono text-xs text-neutral-400 mb-1">{cas.num}</p>
                  <p className="text-white font-bold text-lg">{cas.titre}</p>
                  <p className="text-neutral-400 text-sm mt-1">{cas.profil}</p>
                </div>
                <div className="bg-surface-card border border-neutral-200 border-t-0 p-6">
                  <p className="text-sm text-neutral-600 mb-5 italic">{cas.besoin}</p>
                  <div className="space-y-2 mb-5">
                    {cas.etapes.map(e => (
                      <div key={e.label} className="bg-neutral-50 border border-neutral-200 px-4 py-3">
                        <p className="font-mono text-xs text-neutral-400 mb-0.5">{e.label}</p>
                        <p className="font-mono text-xs text-neutral-800">{e.val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className={`border px-4 py-3 ${cas.gagnant === 'PFU' ? 'border-accent-400 bg-accent-50' : 'border-neutral-200 bg-neutral-50'}`}>
                      <p className="font-mono text-xs text-neutral-500 uppercase mb-1">PFU</p>
                      <p className="font-mono text-sm font-bold text-neutral-800">{cas.pfu}</p>
                    </div>
                    <div className={`border px-4 py-3 ${cas.gagnant === 'IR' ? 'border-accent-400 bg-accent-50' : 'border-neutral-200 bg-neutral-50'}`}>
                      <p className="font-mono text-xs text-neutral-500 uppercase mb-1">IR + prél. sociaux</p>
                      <p className="font-mono text-sm font-bold text-neutral-800">{cas.ir}</p>
                    </div>
                  </div>
                  <div className="border-l-4 border-accent-400 pl-4 py-1">
                    <p className="text-sm text-neutral-800 leading-relaxed">{cas.conclusion}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* SECTION 8 */}
          <section id="optimisations" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Optimisations légales</h2>
            <p className="text-neutral-700 mb-6">Quatre réflexes pour réduire votre fiscalité, dans le respect total de la loi.</p>
            <div className="space-y-4">
              {[
                {
                  titre: '1. Fractionner les gros rachats à cheval sur deux années civiles',
                  desc: 'L\'abattement de 4 600 euros (ou 9 200 euros en couple) se renouvelle le 1er janvier. Besoin de 100 000 euros ? Retirez 50 000 euros en décembre et 50 000 euros en janvier. Vous utilisez deux fois l\'abattement annuel.',
                },
                {
                  titre: '2. Attendre les 8 ans si vous en êtes proche',
                  desc: 'Votre contrat a entre 7 ans et 8 mois et 8 ans ? Attendez avant de retirer. Sur 10 000 euros de plus-value, l\'abattement représente 1 380 euros d\'impôts économisés.',
                },
                {
                  titre: '3. Toujours comparer PFU et option IR avant de retirer',
                  desc: 'Ne laissez pas le PFU s\'appliquer par défaut sans vérifier votre TMI. À TMI 0 ou 11 %, l\'option IR vous fait économiser de l\'argent. Il faut la demander lors de la déclaration annuelle.',
                },
                {
                  titre: '4. Préférer les rachats partiels au rachat total',
                  desc: 'Clôturer votre contrat pour en ouvrir un neuf remet le compteur à zéro. Vous perdez votre antériorité fiscale et votre abattement des 8 ans s\'il était acquis. Un rachat partiel préserve tout ça.',
                },
              ].map(opt => (
                <div key={opt.titre} className="bg-surface-card border border-neutral-200 px-5 py-4">
                  <p className="font-bold text-neutral-900 mb-1.5 text-sm">{opt.titre}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{opt.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-neutral-900 px-8 py-6 mb-12">
            <p className="text-white font-bold text-lg mb-1">Calculez votre fiscalité réelle</p>
            <p className="text-neutral-400 text-sm mb-4">
              Le calculateur applique toutes les règles de cet article automatiquement. Gratuit, sans inscription, zéro donnée conservée.
            </p>
            <Link href="/assurance-vie" className="inline-block bg-surface-card text-neutral-900 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur →
            </Link>
          </div>

          {/* Sources */}
          <div className="bg-surface-card border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Méthodologie et sources</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Textes de loi</h3>
                <ul className="space-y-2 text-sm">
                  {([
                    // URLs Légifrance retirées le 2026-05-31 (HTTP 404).
                    // Cf. docs/broken-links-to-fix.md.
                    { label: 'Article 125-0 A du CGI' },
                    { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047288653', label: 'Article 990 I du CGI', desc: 'Prélèvement spécifique sur versements après 70 ans dépassant 152 500 euros' },
                    { href: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000036339197', label: 'Loi de finances 2018, article 28', desc: 'Réforme PFU et date pivot du 27 septembre 2017' },
                    { label: 'Article L136-7 du Code de la Sécurité Sociale' },
                  ] as Array<{ href?: string; label: string; desc?: string }>).map((s, i) => (
                    <li key={s.href ?? `${s.label}-${i}`} className="flex items-start gap-3">
                      <span className="text-accent-400 mt-0.5 shrink-0">-</span>
                      <div>
                        {s.href ? (
                          <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline font-medium">{s.label}</a>
                        ) : (
                          <span className="font-medium text-neutral-700">{s.label}</span>
                        )}
                        {s.desc && <p className="text-neutral-500 text-xs mt-0.5">{s.desc}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Documentation officielle</h3>
                <ul className="space-y-2 text-sm">
                  {([
                    // BOFiP 2823 retiré le 2026-05-31 (URL re-route vers BNC).
                    { label: 'BOFiP - RPPM-RCM-20-10-20' },
                    { href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F22414', label: 'Service-Public.fr', desc: 'Fiche pratique sur la fiscalité de l\'assurance-vie' },
                  ] as Array<{ href?: string; label: string; desc?: string }>).map((s, i) => (
                    <li key={s.href ?? `${s.label}-${i}`} className="flex items-start gap-3">
                      <span className="text-accent-400 mt-0.5 shrink-0">-</span>
                      <div>
                        {s.href ? (
                          <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline font-medium">{s.label}</a>
                        ) : (
                          <span className="font-medium text-neutral-700">{s.label}</span>
                        )}
                        {s.desc && <p className="text-neutral-500 text-xs mt-0.5">{s.desc}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Formules clés</h3>
                <div className="bg-neutral-50 border border-neutral-200 p-5 font-mono text-xs text-neutral-700 space-y-3">
                  <div><p className="text-neutral-400 mb-0.5">1. Règle proportionnelle</p><p>PV dans le rachat = Montant retiré × (PV totale ÷ Capital total)</p></div>
                  <div><p className="text-neutral-400 mb-0.5">2. Plus-value taxable</p><p>PV taxable = PV dans le rachat − Abattement annuel</p></div>
                  <div><p className="text-neutral-400 mb-0.5">3. Impôt au PFU</p><p>Impôt = PV taxable × 30 % (ou 24,7 % si versements avant 2017)</p></div>
                  <div><p className="text-neutral-400 mb-0.5">4. Impôt à l&apos;IR + prélèvements sociaux</p><p>Impôt = PV taxable × (TMI + 17,2 %)</p></div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outil indicatif uniquement. Ne constitue pas un conseil fiscal personnalisé.{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline">Code source ouvert</a>
            </p>
          </div>

        </div>
      </article>
      <Footer />
    </>
  )
}
