import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'PER individuel : ce que vous gagnez à l\'entrée, ce que vous payez à la sortie',
  description: 'Déduction fiscale, plafond épargne retraite, fiscalité des retraits en rente ou capital. Guide complet avec exemples chiffrés et comparaison PER vs assurance-vie.',
  keywords: 'PER individuel, déduction fiscale, plafond épargne retraite, fiscalité sortie PER, rente ou capital, PER vs assurance-vie',
  openGraph: {
    title: 'PER individuel : ce que vous gagnez à l\'entrée, ce que vous payez à la sortie',
    description: 'Vous versez 5 000€ sur un PER. L\'État vous rembourse 1 500€. Avantageux ? Pas si sûr.',
    type: 'article',
    publishedTime: '2026-05-05',
  },

  alternates: { canonical: 'https://calculpatrimoine.fr/blog/per-individuel-deduction-fiscalite' },
}

export default function ArticlePERPage() {
  return (
    <>
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/blog', label: 'Blog' },
          { label: 'PER individuel - fiscalité' },
        ]}
        titre="PER individuel : ce que vous gagnez à l'entrée, ce que vous payez à la sortie"
        features={['Fiscalité · Retraite', '14 min de lecture', '5 mai 2026']}
      />
      <article style={{ backgroundColor: '#F7F3EC' }}>

        <div className="max-w-4xl mx-auto px-6 pt-12 pb-16">

          {/* Intro */}
          <div className="mb-12">
            <p className="text-xl text-neutral-700 leading-relaxed mb-6">
              Vous versez 5 000 euros sur un PER individuel cette année, vous êtes à 30 % de TMI.
              Économie immédiate : 1 500 euros. Mais ce chiffre ne dit pas tout : cet argent sera
              réimposé à la sortie, quand vous le retirerez à la retraite. Le bilan dépend donc de
              votre TMI aujourd&apos;hui comparée à celle prévue à la retraite.
            </p>
            <p className="text-neutral-700">
              Au programme : la mécanique exacte à l&apos;entrée et à la sortie, les plafonds, et une
              comparaison chiffrée avec l&apos;assurance-vie.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-12">
            <p className="font-mono text-xs font-bold text-warning-800 uppercase tracking-wider mb-1">Avertissement</p>
            <p className="text-sm text-warning-700 leading-relaxed">
              Cet article explique la mécanique fiscale du PER individuel avec des exemples chiffrés. Il ne remplace pas un conseil en investissement ou un conseil fiscal personnalisé.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-neutral-900 px-8 py-6 mb-12">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2">Outil associé</p>
            <p className="text-white font-bold text-lg mb-1">Calculez votre économie d&apos;impôt</p>
            <p className="text-neutral-400 text-sm mb-4">
              Le calculateur simule votre économie à l&apos;entrée et la fiscalité à la sortie selon votre TMI actuel et celui prévu à la retraite.
            </p>
            <Link href="/per-individuel" className="inline-block bg-surface-card text-neutral-900 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur →
            </Link>
          </div>

          {/* Lexique */}
          <div className="bg-surface-card border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-5">Lexique - avant de commencer</p>
            <div className="space-y-5">
              {[
                {
                  terme: 'Le taux marginal d\'imposition (TMI)',
                  def: "L'impôt sur le revenu en France est progressif : vous ne payez pas le même taux sur chaque euro gagné. Vos revenus sont découpés en tranches, chacune taxée à un taux différent. Le TMI, c'est le taux qui s'applique sur votre dernière tranche. En 2025, les tranches sont 0 %, 11 %, 30 %, 41 % et 45 %. Un salarié à 45 000 euros nets imposables est à TMI 30 %. Ça ne veut pas dire qu'il paie 30 % sur tout son salaire, mais 30 % sur la partie qui dépasse 28 797 euros.",
                },
                {
                  terme: 'Le PASS (Plafond Annuel de la Sécurité Sociale)',
                  def: "Le PASS sert de base au calcul des indemnités journalières (maladie, accident du travail, maternité), des pensions d'invalidité, des retraites, et d'autres prestations. En 2025, il vaut 47 100 euros. Dans l'article, « 10 % du PASS » veut dire 10 % × 47 100 = 4 710 euros.",
                },
                {
                  terme: 'Le PFU (Prélèvement Forfaitaire Unique)',
                  def: "Un taux fixe de 30 % sur les gains financiers : intérêts, dividendes, plus-values. Composé de 12,8 % d'impôt sur le revenu et 17,2 % de prélèvements sociaux. Aussi appelé « flat tax ». Pour : simple et prévisible, peu importe vos revenus.",
                },
                {
                  terme: 'Les prélèvements sociaux',
                  def: "Cotisations prélevées sur les revenus du capital — épargne, placements, loyers — au taux global de 17,2 %. Décomposés en CSG (9,2 %), CRDS (0,5 %) et autres contributions. S'ajoutent à l'impôt sur le revenu et restent dus même si vous n'êtes pas imposable.",
                },
                {
                  terme: 'La rente viagère',
                  def: "Un revenu mensuel versé jusqu'à votre décès, en échange d'un capital que vous cédez définitivement à un assureur. L'assureur prend le risque de vous payer longtemps si vous vivez longtemps. En contrepartie, si vous décédez tôt, vous n'aurez pas récupéré l'équivalent de votre capital.",
                },
              ].map(({ terme, def }) => (
                <div key={terme} className="border-b border-neutral-100 pb-5 last:border-0 last:pb-0">
                  <p className="font-bold text-sm text-neutral-900 mb-1.5">{terme}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sommaire */}
          <nav className="bg-surface-card border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-4">Sommaire</p>
            <ol className="space-y-2 text-sm font-mono">
              <li><a href="#fonctionnement" className="text-neutral-900 hover:underline">1. Ce que le PER fait exactement</a></li>
              <li><a href="#deduction" className="text-neutral-900 hover:underline">2. La déduction à l&apos;entrée : calcul et exemples</a></li>
              <li><a href="#plafond" className="text-neutral-900 hover:underline">3. Le plafond : combien puis-je déduire ?</a></li>
              <li><a href="#sortie" className="text-neutral-900 hover:underline">4. La fiscalité à la sortie : rente ou capital</a></li>
              <li><a href="#idees-recues" className="text-neutral-900 hover:underline">5. Les idées reçues qui coûtent cher</a></li>
              <li><a href="#per-vs-av" className="text-neutral-900 hover:underline">6. PER vs assurance-vie : 3 profils comparés</a></li>
              <li><a href="#cas-concrets" className="text-neutral-900 hover:underline">7. Calculs complets chiffrés</a></li>
            </ol>
          </nav>

          {/* SECTION 1 */}
          <section id="fonctionnement" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Ce que le PER fait exactement</h2>

            <p className="text-neutral-700 mb-4">
              Le PER individuel (Plan d&apos;Épargne Retraite) est un compte d&apos;épargne longue durée créé en 2019 pour remplacer des produits devenus illisibles comme le PERP ou le Madelin. Vous y versez de l&apos;argent pendant votre vie active. L&apos;argent est bloqué jusqu&apos;à la retraite. Vous le récupérez ensuite, selon les modalités que vous choisissez.
            </p>

            <p className="text-neutral-700 mb-4">
              La différence avec un livret bancaire classique : l&apos;argent versé réduit votre impôt tout de suite. Vous payez 4 000 euros d&apos;impôts cette année, vous versez 5 000 euros sur votre PER : votre facture fiscale baisse de 1 500 euros. Vous ne payez plus que 2 500 euros.
            </p>

            <p className="text-neutral-700 mb-6">
              Contrepartie : quand vous retirerez cet argent à la retraite, il sera réimposé à ce moment-là. Le PER ne supprime pas l&apos;impôt. Il le déplace dans le temps.
            </p>

            <div className="bg-surface-card border border-neutral-200 p-6 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-5">Les trois phases d&apos;un PER</p>
              <div className="space-y-5">
                {[
                  {
                    num: '1',
                    phase: 'Vous versez',
                    desc: "Vous alimentez votre PER. Le montant versé sort de votre revenu imposable avant calcul de l'impôt. Votre impôt de l'année baisse. Une partie du versement vient donc indirectement de l'impôt que vous n'avez pas payé.",
                  },
                  {
                    num: '2',
                    phase: 'L\'argent fructifie',
                    desc: "Votre épargne est investie, selon votre choix, sur des fonds garantis sans risque de perte (les fonds en euros) ou sur des placements en actions et obligations (les unités de compte, avec un risque de perte). Les gains ne sont pas imposés chaque année. Ils s'accumulent sans ponction annuelle.",
                  },
                  {
                    num: '3',
                    phase: 'Vous retirez à la retraite',
                    desc: "Vous récupérez votre épargne. Tout ce que vous avez versé et déduit est alors réimposé, au taux en vigueur à ce moment-là. Les gains accumulés sont aussi imposés, mais selon un régime différent (détaillé plus bas).",
                  },
                ].map(({ num, phase, desc }) => (
                  <div key={num} className="flex items-start gap-5 border-b border-neutral-100 pb-5 last:border-0 last:pb-0">
                    <span className="font-mono text-2xl font-bold text-neutral-400 shrink-0 w-7 mt-0.5">{num}</span>
                    <div>
                      <p className="font-bold text-sm text-neutral-900 mb-1.5">{phase}</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-l-4 border-neutral-300 bg-surface-card px-5 py-4 my-6">
              <p className="text-sm text-neutral-700 leading-relaxed">
                L&apos;idée à retenir : si vous payez plus d&apos;impôts aujourd&apos;hui qu&apos;à la retraite — ce qui est courant quand on passe d&apos;un salaire de cadre à une pension — le PER est mathématiquement gagnant. Si votre taux reste identique, l&apos;avantage devient marginal.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <span className="font-medium text-neutral-700">Article L224-1 du Code monétaire et financier</span>
            </p>
          </section>

          {/* SECTION 2 */}
          <section id="deduction" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">La déduction à l&apos;entrée : calcul et exemples</h2>

            <p className="text-neutral-700 mb-4">
              Quand vous versez sur un PER, le montant est soustrait de votre revenu avant calcul de l&apos;impôt. Vous êtes donc taxé sur un revenu plus faible, ce qui fait baisser directement votre facture fiscale.
            </p>

            <p className="text-neutral-700 mb-6">
              L&apos;économie dépend de votre TMI. Plus le taux est élevé, plus le PER est efficace à l&apos;entrée. La formule est simple.
            </p>

            <div className="bg-surface-card border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2">Formule</p>
              <p className="font-mono text-sm text-neutral-800">Impôt économisé = Montant versé × Votre TMI</p>
              <p className="text-xs text-neutral-400 mt-3">Exemple : vous versez 5 000 euros, vous êtes à 30 % de TMI. Vous économisez 5 000 × 30 % = 1 500 euros d&apos;impôt.</p>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-300">
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Taux marginal</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Profil indicatif</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Versement</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Impôt économisé</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Coût réel du versement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-mono text-xs">
                  {[
                    { tmi: '0 %',  profil: 'Non imposable',      v: '5 000€', eco: '0€',      cout: '5 000€' },
                    { tmi: '11 %', profil: 'Revenus modestes',   v: '5 000€', eco: '550€',    cout: '4 450€' },
                    { tmi: '30 %', profil: 'Cadre intermédiaire',v: '5 000€', eco: '1 500€',  cout: '3 500€' },
                    { tmi: '41 %', profil: 'Cadre supérieur',    v: '5 000€', eco: '2 050€',  cout: '2 950€' },
                    { tmi: '45 %', profil: 'Hauts revenus',      v: '5 000€', eco: '2 250€',  cout: '2 750€' },
                  ].map(r => (
                    <tr key={r.tmi}>
                      <td className="py-2 font-bold text-neutral-900">{r.tmi}</td>
                      <td className="py-2 text-neutral-500">{r.profil}</td>
                      <td className="py-2">{r.v}</td>
                      <td className="py-2 text-neutral-900">{r.eco}</td>
                      <td className="py-2 font-bold text-neutral-900">{r.cout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-neutral-600 text-sm mb-8 leading-relaxed">
              Le coût réel, c&apos;est ce que le versement vous coûte vraiment après la réduction d&apos;impôt. À TMI 30 %, verser 5 000 euros ne vous coûte en réalité que 3 500 euros. Les 1 500 euros restants viennent de l&apos;impôt que vous n&apos;avez pas payé cette année.
            </p>

            <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-3">
              <p className="font-mono text-xs text-warning-700 uppercase tracking-wider mb-1">Ce qu&apos;on entend souvent</p>
              <p className="text-warning-800 text-sm font-medium">&laquo;&nbsp;Avec un PER, l&apos;État me donne de l&apos;argent.&nbsp;&raquo;</p>
            </div>
            <div className="border-l-4 border-accent-400 bg-neutral-50 px-5 py-4 mb-6">
              <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">Ce qui se passe réellement</p>
              <p className="text-neutral-700 text-sm leading-relaxed">
                L&apos;État ne vous donne rien. Il vous fait une avance : vous ne payez pas cet impôt maintenant, mais vous le paierez à la retraite quand vous retirerez. C&apos;est un décalage dans le temps, pas un cadeau.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <span className="font-medium text-neutral-700">Article 163 quatervicies du CGI</span>
            </p>
          </section>

          {/* SECTION 3 */}
          <section id="plafond" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Le plafond : combien puis-je déduire ?</h2>

            <p className="text-neutral-700 mb-4">
              Vous ne pouvez pas déduire ce que vous voulez. Il existe un plafond annuel de déduction qui dépend de vos revenus. La bonne nouvelle : ce plafond est déjà calculé pour vous. Il figure sur votre avis d&apos;imposition, page 3, dans la rubrique &laquo;&nbsp;Plafonds pour les cotisations d&apos;épargne retraite&nbsp;&raquo;.
            </p>

            <div className="border-l-4 border-accent-400 bg-accent-100 px-5 py-4 mb-8">
              <p className="font-bold text-sm text-neutral-900 mb-1">Avant de calculer quoi que ce soit</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Ouvrez votre avis d&apos;imposition. Le montant que vous pouvez déduire cette année y est écrit noir sur blanc. Pas besoin de refaire le calcul.
              </p>
            </div>

            <h3 className="font-bold text-neutral-900 mb-3">Comment le plafond est calculé</h3>

            <p className="text-neutral-700 mb-4">
              Le plafond, c&apos;est 10 % de vos revenus professionnels de l&apos;année précédente. Vous avez gagné 30 000 euros en 2024 ? Plafond 2025 : 3 000 euros. Sauf que 3 000 euros, c&apos;est en dessous du minimum garanti de 4 637 euros. Du coup, vous pouvez quand même déduire 4 637 euros. À l&apos;inverse, vous avez gagné 500 000 euros ? Le calcul donnerait 50 000 euros, mais le plafond max est de 37 094 euros. Au-delà, c&apos;est bloqué.
            </p>

            <p className="text-neutral-700 mb-6">
              Ces bornes sont en pourcentage du PASS (Plafond Annuel de la Sécurité Sociale), qui vaut 47 100 euros en 2025. Quand un texte indique &laquo;&nbsp;10 % du PASS&nbsp;&raquo;, ça veut dire 10 % × 47 100 = 4 710 euros.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Plafond 2025, calculé sur les revenus 2024</p>
              <div className="font-mono text-sm space-y-2 text-neutral-800">
                <p>Plafond = 10 % de vos revenus professionnels 2024</p>
                <div className="border-t border-neutral-200 mt-3 pt-3 space-y-1 text-xs text-neutral-500">
                  <p>Minimum garanti : 4 637 euros (revenus faibles, vous pouvez quand même déduire au moins ça)</p>
                  <p>Maximum autorisé : 37 094 euros (revenus très élevés, plafond bloqué à ce montant)</p>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-neutral-900 mb-3 mt-8">Exemples concrets</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              {[
                { revenu: 'Revenus 2024 : 25 000€', plafond: 'Calcul : 2 500€', note: 'En dessous du minimum garanti. Le plafond passe à 4 637 euros.' },
                { revenu: 'Revenus 2024 : 60 000€', plafond: 'Calcul : 6 000€', note: 'Entre le minimum et le maximum. Vous pouvez déduire 6 000 euros.' },
                { revenu: 'Revenus 2024 : 400 000€', plafond: 'Calcul : 40 000€', note: 'Au-dessus du maximum. Bloqué à 37 094 euros.' },
              ].map(ex => (
                <div key={ex.revenu} className="bg-surface-card border border-neutral-200 p-4">
                  <p className="font-mono text-xs text-neutral-400 uppercase mb-2">{ex.revenu}</p>
                  <p className="font-bold text-sm text-neutral-900 mb-2">{ex.plafond}</p>
                  <p className="text-xs text-neutral-500 leading-relaxed">{ex.note}</p>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-accent-400 bg-accent-100 px-5 py-4 my-6">
              <p className="font-bold text-sm text-neutral-900 mb-1.5">Les plafonds non utilisés se cumulent sur 5 ans (depuis la loi de finances 2026)</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Si vous n&apos;avez pas versé le max les 5 dernières années, vous pouvez rattraper le retard cette année. Votre avis d&apos;imposition affiche le plafond cumulé disponible, pas seulement celui de l&apos;année en cours. Beaucoup de gens ont un solde dispo bien plus élevé qu&apos;ils ne le pensent.
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Cas pratique - salarié, 60 000 euros de revenus en 2024</p>
              <div className="font-mono text-sm space-y-2 text-neutral-800">
                <p>Plafond 2025 : 10 % × 60 000 euros = 6 000 euros</p>
                <p>Plafond 2024 non utilisé : 5 500 euros</p>
                <p>Plafond 2023 non utilisé : 5 200 euros</p>
                <p className="font-bold text-neutral-900 pt-2 border-t border-neutral-200 mt-2">
                  Plafond disponible total cette année : 16 700 euros
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <span className="font-medium text-neutral-700">Article 163 quatervicies du CGI</span>
            </p>
          </section>

          {/* SECTION 4 */}
          <section id="sortie" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">La fiscalité à la sortie : rente ou capital</h2>

            <p className="text-neutral-700 mb-6">
              À la retraite, vous choisissez comment récupérer votre épargne. Deux options, deux fiscalités différentes.
            </p>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4">Sortie en capital</h3>

            <p className="text-neutral-700 mb-4">
              Vous retirez votre épargne en une fois ou progressivement. Le fisc distingue deux catégories dans votre épargne, chacune avec ses propres règles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3">Vos versements</p>
                <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                  L&apos;argent que vous avez versé et qui a été déduit est traité comme un revenu ordinaire au moment du retrait. Il s&apos;ajoute à vos autres revenus de l&apos;année et est taxé à votre TMI du moment.
                </p>
                <p className="font-mono text-xs text-neutral-400 border-t border-neutral-100 pt-3">
                  Exemple : vous retirez 10 000 euros de versements, TMI à la retraite à 11 % → 1 100 euros d&apos;impôt.
                </p>
              </div>
              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3">Les gains accumulés</p>
                <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                  Les intérêts et plus-values générés pendant la phase d&apos;épargne sont taxés au taux fixe de 30 % : 12,8 % d&apos;IR + 17,2 % de prélèvements sociaux. Ce taux s&apos;applique peu importe vos revenus à la retraite.
                </p>
                <p className="font-mono text-xs text-neutral-400 border-t border-neutral-100 pt-3">
                  Exemple : 5 000 euros de gains → 1 500 euros d&apos;impôt (30 %).
                </p>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4 mt-8">Sortie en rente</h3>

            <p className="text-neutral-700 mb-4">
              Vous confiez votre capital à l&apos;assureur, qui vous verse un revenu mensuel jusqu&apos;à votre décès. Fiscalement, ce revenu est traité comme une pension de retraite. Il s&apos;ajoute à vos autres pensions, avec un abattement de 10 % calculé automatiquement (plafonné à 4 321 euros en 2025).
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Exemple - Rente PER de 1 000 euros par mois</p>
              <div className="font-mono text-sm space-y-1.5 text-neutral-800">
                <p>Rente annuelle perçue : 12 000 euros</p>
                <p>Abattement de 10 % : 1 200 euros déduits automatiquement</p>
                <p className="font-bold text-neutral-900 pt-2 border-t border-neutral-200 mt-2">Rente imposable : 10 800 euros</p>
                <p className="text-neutral-500 text-xs mt-1">Ces 10 800 euros s&apos;ajoutent à vos autres pensions pour calculer votre impôt de l&apos;année.</p>
              </div>
            </div>

            <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 my-6">
              <p className="font-mono text-xs text-warning-700 uppercase tracking-wider mb-1">Attention</p>
              <p className="text-sm text-warning-700 leading-relaxed">
                En sortie en rente, les prélèvements sociaux (17,2 %) s&apos;ajoutent sur une fraction de la rente, calculée selon votre âge au moment où vous commencez à la percevoir. Ce coût en plus n&apos;existe pas en sortie capital sur la partie versements, qui ne supporte que l&apos;IR.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Sources :{' '}
              <span className="font-medium text-neutral-700">Article 158, 5° bis du CGI</span>
              {' · '}
              {/* BOFiP 10261 retiré le 2026-05-31 (re-route vers Convention France-Andorre). */}
              <span className="font-medium text-neutral-700">BOFiP RSA-PENS-10</span>
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="idees-recues" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Les idées reçues qui coûtent cher</h2>

            {[
              {
                faux: "Le PER est avantageux dès que je paye des impôts.",
                vrai: "Tout dépend de l'écart entre votre TMI aujourd'hui et celle prévue à la retraite. Si vous êtes à 30 % maintenant et à 30 % à la retraite, vous avez juste décalé l'imposition dans le temps. Zéro gain fiscal net. Le PER est vraiment intéressant quand votre TMI baisse significativement à la retraite.",
              },
              {
                faux: "Je peux récupérer mon argent en cas de besoin.",
                vrai: "Le PER est bloqué jusqu'à la liquidation de vos droits à la retraite. Les cas de déblocage anticipé sont strictement encadrés par la loi : achat de la résidence principale, décès du conjoint ou du partenaire de Pacs, invalidité de 2e ou 3e catégorie, surendettement, fin de droits au chômage. Ce n'est pas un livret accessible à tout moment.",
              },
              {
                faux: "Le PER disparaît si je décède avant la retraite.",
                vrai: "Si vous décédez avant d'avoir liquidé votre PER, le capital est transmis aux bénéficiaires désignés dans votre contrat, comme pour une assurance-vie. La fiscalité applicable ressemble à celle de l'assurance-vie, avec des abattements qui varient selon votre âge au décès.",
              },
              {
                faux: "Je peux déduire autant que je veux.",
                vrai: "La déduction est limitée au plafond inscrit sur votre avis d'imposition. Si vous versez plus, l'excédent n'est pas déductible cette année. Vous pouvez quand même faire ce versement : à la sortie, la partie non déduite ne sera pas réimposée.",
              },
            ].map(({ faux, vrai }) => (
              <div key={faux} className="mb-8">
                <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-2">
                  <p className="font-mono text-xs text-warning-700 uppercase tracking-wider mb-1">Ce qu&apos;on entend souvent</p>
                  <p className="text-warning-800 text-sm font-medium">&laquo;&nbsp;{faux}&nbsp;&raquo;</p>
                </div>
                <div className="border-l-4 border-accent-400 bg-neutral-50 px-5 py-4">
                  <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">Ce qui se passe réellement</p>
                  <p className="text-neutral-700 text-sm leading-relaxed">{vrai}</p>
                </div>
              </div>
            ))}
          </section>

          {/* SECTION 6 */}
          <section id="per-vs-av" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">PER vs assurance-vie : 3 profils comparés</h2>

            <p className="text-neutral-700 mb-4">
              On présente souvent le PER et l&apos;assurance-vie comme des produits concurrents. En vrai, ils ne répondent pas aux mêmes besoins.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="bg-surface-card border-l-4 border-l-accent-400 border border-neutral-200 p-5">
                <p className="font-bold text-sm text-neutral-900 mb-3">Le PER</p>
                <p className="text-sm text-neutral-600 leading-relaxed">Réduit votre impôt dès cette année. L&apos;argent est bloqué jusqu&apos;à la retraite, sauf exceptions. Versements et gains sont imposés à la sortie.</p>
              </div>
              <div className="bg-surface-card border-l-4 border-l-accent-400 border border-neutral-200 p-5">
                <p className="font-bold text-sm text-neutral-900 mb-3">L&apos;assurance-vie</p>
                <p className="text-sm text-neutral-600 leading-relaxed">Aucun avantage fiscal à l&apos;entrée. Capital disponible à tout moment. Seuls les gains sont imposés à la sortie, pas les versements. Fiscalité allégée après 8 ans.</p>
              </div>
            </div>

            {[
              {
                num: 'Profil 1',
                titre: "TMI élevée aujourd'hui, faible à la retraite",
                detail: "Sophie, 45 ans, cadre supérieure. TMI actuelle : 41 %. À la retraite, ses revenus baisseront nettement. TMI prévue : 11 %.",
                versement: '5 000 euros versés cette année',
                per: [
                  "Impôt économisé maintenant : 5 000 × 41 % = 2 050 euros",
                  "Coût effectif du versement : 2 950 euros (pas 5 000)",
                  "À la sortie : ces 5 000 euros sont taxés à 11 % seulement",
                  "Elle gagne la différence entre 41 % économisés et 11 % payés à la sortie",
                ],
                av: [
                  "Zéro économie cette année. Le versement coûte 5 000 euros réels",
                  "À la sortie : seuls les gains sont imposés, pas les 5 000 euros versés",
                  "Capital disponible à tout moment, sans blocage",
                  "Après 8 ans, une partie des gains est exonérée chaque année",
                ],
                note: "Pour ce profil, le PER est clairement plus efficace. L'économie immédiate de 2 050 euros est massive, et la taxation à 11 % à la sortie est bien en dessous de ce que Sophie paierait en restant imposée aujourd'hui.",
              },
              {
                num: 'Profil 2',
                titre: "TMI stable avant et après la retraite",
                detail: "Marc, 50 ans, indépendant. TMI à 30 % aujourd'hui, et probablement encore 30 % à la retraite à cause de ses revenus locatifs.",
                versement: '5 000 euros versés cette année',
                per: [
                  "Impôt économisé maintenant : 5 000 × 30 % = 1 500 euros",
                  "À la sortie : ces 5 000 euros sont retaxés à 30 % aussi",
                  "Le décalage fiscal s'annule. L'avantage résiduel : avoir pu replacer ces 1 500 euros pendant des années",
                ],
                av: [
                  "Aucune économie à l'entrée",
                  "À la sortie : seuls les gains sont imposés, les 5 000 euros versés ne le sont pas",
                  "Après 8 ans : abattement annuel sur les gains (4 600 euros pour une personne seule)",
                  "La fiscalité de sortie est souvent plus douce que celle du PER dans ce cas",
                ],
                note: "Avec un TMI stable, l'avantage du PER est marginal. L'assurance-vie peut rattraper son retard grâce à l'exonération partielle des gains après 8 ans et à la disponibilité du capital.",
              },
              {
                num: 'Profil 3',
                titre: "TMI faible aujourd'hui, incertaine à la retraite",
                detail: "Léa, 35 ans, salariée en début de carrière. TMI actuelle : 11 %. Sa situation à la retraite est difficile à prévoir sur 30 ans.",
                versement: '3 000 euros versés cette année',
                per: [
                  "Impôt économisé maintenant : 3 000 × 11 % = 330 euros. C'est peu",
                  "Capital bloqué pendant 30 ans",
                  "Risque : si sa retraite est confortable, elle pourrait être taxée à 30 % à la sortie",
                  "Elle aurait économisé 11 % pour payer 30 % plus tard",
                ],
                av: [
                  "Aucune économie à l'entrée",
                  "Capital disponible si un besoin survient avant la retraite",
                  "Fiscalité de sortie connue et stable sur les gains",
                  "Plus de visibilité et de flexibilité sur 30 ans",
                ],
                note: "Avec un TMI faible et un long horizon, l'avantage fiscal du PER à l'entrée reste limité : 330 euros sur 3 000 euros versés. L'assurance-vie est souvent plus adaptée quand la situation à la retraite reste floue.",
              },
            ].map(cas => (
              <div key={cas.num} className="mb-10">
                <div className="bg-neutral-900 px-5 py-4">
                  <p className="font-mono text-xs text-neutral-400 mb-1">{cas.num}</p>
                  <p className="text-white font-bold text-lg">{cas.titre}</p>
                  <p className="text-neutral-400 text-sm mt-1">{cas.detail}</p>
                </div>
                <div className="bg-surface-card border border-neutral-200 border-t-0 p-6">
                  <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-4">{cas.versement}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="bg-neutral-50 border-l-4 border-l-accent-400 border border-neutral-200 p-4">
                      <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3">PER individuel</p>
                      <ul className="space-y-2">
                        {cas.per.map(l => <li key={l} className="text-xs text-neutral-700 leading-relaxed">{l}</li>)}
                      </ul>
                    </div>
                    <div className="bg-neutral-50 border-l-4 border-l-accent-400 border border-neutral-200 p-4">
                      <p className="font-mono text-xs text-accent-600 uppercase tracking-wider mb-3">Assurance-vie</p>
                      <ul className="space-y-2">
                        {cas.av.map(l => <li key={l} className="text-xs text-neutral-700 leading-relaxed">{l}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="border-l-4 border-neutral-300 pl-4 py-1">
                    <p className="text-sm text-neutral-700 leading-relaxed">{cas.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* SECTION 7 */}
          <section id="cas-concrets" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Calculs complets chiffrés</h2>

            <p className="text-neutral-700 mb-4">
              Pour montrer l&apos;impact de la TMI sur le résultat final, voici un même versement soumis à trois situations différentes.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 mb-8">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Hypothèses communes aux trois scénarios</p>
              <div className="text-sm space-y-1.5 text-neutral-700">
                <p>Versement unique sur le PER : <strong>5 000 euros</strong></p>
                <p>Durée de placement : <strong>20 ans</strong></p>
                <p>Rendement annuel moyen : <strong>4 %</strong> (hypothèse indicative, non garantie)</p>
                <p>Capital brut après 20 ans : <strong>5 000 × (1,04)²⁰ = 10 956 euros</strong></p>
                <p className="text-neutral-500 text-xs mt-2">Dont 5 000 euros de versement initial et 5 956 euros de gains accumulés.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  label: 'Scénario A - Favorable',
                  tmia: 'TMI actuelle : 30 %',
                  tmib: 'TMI retraite : 11 %',
                  calcul: [
                    { lib: "Impôt économisé à l'entrée", val: "− 1 500€" },
                    { lib: "Impôt sur les versements à la sortie (11 %)", val: "+ 550€" },
                    { lib: "Impôt sur les gains (30 % fixe)", val: "+ 1 787€" },
                    { lib: "Coût fiscal net", val: "= 837€" },
                  ],
                  net: '10 956 − 837 = 10 119€ net',
                  explication: "Vous avez déduit à 30 % et été réimposé à 11 %. Vous gagnez 19 points d'écart sur vos versements.",
                  favorable: true,
                },
                {
                  label: 'Scénario B - Neutre',
                  tmia: 'TMI actuelle : 30 %',
                  tmib: 'TMI retraite : 30 %',
                  calcul: [
                    { lib: "Impôt économisé à l'entrée", val: "− 1 500€" },
                    { lib: "Impôt sur les versements à la sortie (30 %)", val: "+ 1 500€" },
                    { lib: "Impôt sur les gains (30 % fixe)", val: "+ 1 787€" },
                    { lib: "Coût fiscal net", val: "= 1 787€" },
                  ],
                  net: '10 956 − 1 787 = 9 169€ net',
                  explication: "L'économie à l'entrée et l'impôt à la sortie s'annulent. Seuls les gains restent taxés.",
                  favorable: false,
                },
                {
                  label: 'Scénario C - Défavorable',
                  tmia: 'TMI actuelle : 11 %',
                  tmib: 'TMI retraite : 30 %',
                  calcul: [
                    { lib: "Impôt économisé à l'entrée", val: "− 550€" },
                    { lib: "Impôt sur les versements à la sortie (30 %)", val: "+ 1 500€" },
                    { lib: "Impôt sur les gains (30 % fixe)", val: "+ 1 787€" },
                    { lib: "Coût fiscal net", val: "= 2 737€" },
                  ],
                  net: '10 956 − 2 737 = 8 219€ net',
                  explication: "Vous avez déduit à 11 % et été réimposé à 30 %. Vous payez plus que ce que vous avez économisé.",
                  favorable: false,
                },
              ].map((col, i) => (
                <div key={i} className={`border p-5 flex flex-col gap-3 ${col.favorable ? 'bg-accent-50 border-accent-300' : 'bg-surface-card border-neutral-200'}`}>
                  <p className="text-xs font-bold text-neutral-700">{col.label}</p>
                  <div>
                    <p className="font-mono text-xs text-neutral-500">{col.tmia}</p>
                    <p className="font-mono text-xs text-neutral-500">{col.tmib}</p>
                  </div>
                  <div className="space-y-1.5 border-t border-neutral-200 pt-3">
                    {col.calcul.map(l => (
                      <div key={l.lib} className="flex justify-between gap-2">
                        <span className="font-mono text-xs text-neutral-500 leading-tight">{l.lib}</span>
                        <span className="font-mono text-xs text-neutral-800 font-bold shrink-0">{l.val}</span>
                      </div>
                    ))}
                  </div>
                  <p className={`font-mono text-xs font-bold pt-2 border-t border-neutral-200 ${col.favorable ? 'text-accent-600' : 'text-neutral-900'}`}>
                    {col.net}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">{col.explication}</p>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-accent-400 bg-neutral-50 px-5 py-4">
              <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">Ce que ces chiffres disent</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Plus l&apos;écart entre votre TMI actuelle et votre TMI à la retraite est grand, plus le PER est gagnant. Quand les taux s&apos;inversent, la mécanique se retourne contre vous. Ces calculs ne prennent pas en compte le fait que l&apos;économie d&apos;impôt annuelle peut être réinvestie, ce qui améliore mécaniquement le résultat du PER dans les scénarios A et B.
              </p>
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-neutral-900 px-8 py-6 mb-12">
            <p className="text-white font-bold text-lg mb-1">Calculez votre cas avec vos chiffres</p>
            <p className="text-neutral-400 text-sm mb-4">
              Le calculateur PER simule votre économie à l&apos;entrée et la fiscalité à la sortie selon votre TMI actuelle et celle prévue à la retraite. Gratuit, sans inscription, zéro donnée conservée.
            </p>
            <Link href="/per-individuel" className="inline-block bg-surface-card text-neutral-900 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur PER →
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
                    { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053542827', label: 'Article 163 quatervicies du CGI', desc: 'Déductibilité des cotisations versées au PER individuel' },
                    // LEGIARTI000042158853 retiré le 2026-05-31 (re-route vers Art 156, pas 158-5° bis).
                    { label: 'Article 158, 5° bis du CGI' },
                    { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038507575', label: 'Article L224-1 du Code monétaire et financier', desc: 'Définition légale du PER individuel (loi PACTE 2019)' },
                    { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048805604', label: 'Article L224-28 du Code monétaire et financier', desc: 'Cas de déblocage anticipé - liste exhaustive' },
                    { href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F34982', label: 'Service-Public.fr - PER individuel', desc: 'Fiche pratique officielle : ouverture, versements, fiscalité, déblocages' },
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
                  <div>
                    <p className="text-neutral-400 mb-0.5">1. Impôt économisé à l&apos;entrée</p>
                    <p>Économie = Versement × Taux marginal d&apos;imposition</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-0.5">2. Plafond de déduction annuel</p>
                    <p>10 % × revenus N-1, entre 4 637 euros (min) et 37 094 euros (max) en 2025</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-0.5">3. Impôt à la sortie sur les versements</p>
                    <p>Versements retirés × Taux marginal à la retraite</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-0.5">4. Impôt à la sortie sur les gains</p>
                    <p>Gains × 30 % (12,8 % IR + 17,2 % prélèvements sociaux)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outil indicatif uniquement. Ne constitue pas un conseil fiscal ou en investissement personnalisé.{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline">Code source ouvert</a>
            </p>
          </div>

        </div>
      </article>
      <Footer />
    </>
  )
}
