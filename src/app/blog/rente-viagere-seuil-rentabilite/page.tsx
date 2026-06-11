import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Rente viagère : pourquoi le seuil de rentabilité est après votre espérance de vie',
  description: 'À 72 ans avec 250 000 euros, le seuil de rentabilité tombe à 15,8 ans alors que l\'espérance de vie est de 14 ans. Pourquoi ce n\'est pas une anomalie.',
  keywords: 'rente viagère, seuil rentabilité, espérance de vie, calcul rente, assurance vie, PER, retraite',
  openGraph: {
    title: 'Rente viagère : pourquoi le seuil de rentabilité est après votre espérance de vie',
    description: 'À 72 ans avec 250 000 euros, il faut vivre jusqu\'à 87,8 ans pour récupérer son capital. Pourquoi c\'est normal.',
    type: 'article',
    publishedTime: '2026-04-16',
  },
  alternates: { canonical: 'https://calculpatrimoine.fr/blog/rente-viagere-seuil-rentabilite' },
}

export default function ArticleRenteViagere() {
  return (
    <>
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/blog', label: 'Blog' },
          { label: 'Rente viagère' },
        ]}
        titre="Rente viagère : pourquoi le seuil de rentabilité est après votre espérance de vie"
        features={['Retraite', '15 min de lecture', '16 avril 2026']}
      />
      <article style={{ backgroundColor: '#F7F3EC' }}>

        <div className="max-w-4xl mx-auto px-6 pt-12 pb-16">

          {/* Intro */}
          <div className="mb-12">
            <p className="text-xl text-neutral-700 leading-relaxed mb-6">
              Vous avez 72 ans, 255 000 euros d&apos;épargne. Vous convertissez tout en rente viagère. L&apos;assureur vous verse 1 340 euros par mois. Pour récupérer votre capital, il faut vivre jusqu&apos;à 87,8 ans. Sauf que l&apos;espérance de vie d&apos;un homme de 72 ans, c&apos;est 86 ans (tables INSEE 2022). Le seuil de rentabilité tombe donc après l&apos;espérance de vie. Arnaque ? Non.
            </p>
            <p className="text-neutral-700 mb-4">
              C&apos;est le fonctionnement normal du produit. La rente viagère n&apos;est pas un placement pour faire rendre votre capital. C&apos;est une assurance contre le risque de vivre trop longtemps.
            </p>
            <p className="text-neutral-700 mb-4">
              La nuance change tout. Une fois que vous savez ce que la rente fait vraiment, vous pouvez décider si ça correspond à votre situation.
            </p>
            <p className="text-neutral-700">
              Au programme : le mécanisme expliqué simplement, pourquoi le seuil dépasse l&apos;espérance de vie par construction, et les cas où la rente a du sens.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-12">
            <p className="font-mono text-xs font-bold text-warning-800 uppercase tracking-wider mb-1">Avertissement</p>
            <p className="text-sm text-warning-700 leading-relaxed">
              Cet article compare des options de gestion du patrimoine à la retraite. Il ne remplace pas un conseil patrimonial personnalisé.
            </p>
          </div>

          {/* Clarification */}
          <div className="border-l-4 border-neutral-300 bg-surface-card px-5 py-4 mb-12">
            <p className="font-bold text-sm text-neutral-900 mb-1.5">À ne pas confondre avec le viager immobilier</p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              On parle ici de rente viagère financière : un capital (assurance-vie, PER, épargne) converti en revenu mensuel à vie. Rien à voir avec le viager immobilier, qui est la vente d&apos;un bien contre un bouquet et une rente. Deux produits différents, qui se ressemblent juste par leur nom.
            </p>
          </div>

          {/* Lexique */}
          <div className="bg-surface-card border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-5">Lexique - avant de commencer</p>
            <div className="space-y-5">
              {[
                {
                  terme: 'Rente viagère',
                  def: "Vous cédez un capital à un assureur. En échange, il vous verse un revenu mensuel jusqu'à votre décès. Si vous vivez jusqu'à 105 ans, il continue. Si vous décédez à 74 ans, il s'arrête et garde le capital restant.",
                },
                {
                  terme: 'Taux de conversion',
                  def: "Le rapport entre la rente annuelle et le capital versé. Un taux de 5 %, ça veut dire que 100 000 euros donnent 5 000 euros par an, soit environ 417 euros par mois. Plus vous êtes âgé au moment de la conversion, plus le taux est élevé.",
                },
                {
                  terme: 'Seuil de rentabilité',
                  def: "Le nombre d'années à vivre après la conversion pour avoir touché en rentes l'équivalent du capital versé. 100 000 euros versés, 5 000 euros par an : le seuil est à 20 ans.",
                },
                {
                  terme: 'Espérance de vie',
                  def: "Le nombre d'années qu'une personne de votre âge peut espérer vivre en moyenne, selon les tables INSEE. C'est une moyenne, pas une prédiction. La moitié des gens de votre âge vivront moins, l'autre moitié plus.",
                },
                {
                  terme: 'Réversion',
                  def: "Une option : à votre décès, une fraction de la rente continue à être versée à votre conjoint. Ça a un prix : la rente initiale baisse de 15 à 30 %.",
                },
                {
                  terme: 'Mutualisation',
                  def: "Le mécanisme qui équilibre les comptes de l'assureur. Ceux qui décèdent avant le seuil de rentabilité financent les rentes de ceux qui vivent au-delà. L'assureur prend sa marge au passage.",
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
            <p className="text-white font-bold text-lg mb-1">Calculez votre seuil de rentabilité</p>
            <p className="text-neutral-400 text-sm mb-4">
              Le calculateur sort votre seuil précis et le compare à votre espérance de vie selon les tables INSEE 2021.
            </p>
            <Link href="/rente-viagere" className="inline-block bg-surface-card text-neutral-900 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur →
            </Link>
          </div>

          {/* Sommaire */}
          <nav className="bg-surface-card border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-4">Sommaire</p>
            <ol className="space-y-2 text-sm font-mono">
              <li><a href="#fonctionnement" className="text-neutral-900 hover:underline">1. Comment fonctionne la rente viagère</a></li>
              <li><a href="#seuil" className="text-neutral-900 hover:underline">2. Pourquoi le seuil de rentabilité est après l&apos;espérance de vie</a></li>
              <li><a href="#avantages" className="text-neutral-900 hover:underline">3. Trois situations où la rente présente un intérêt réel</a></li>
              <li><a href="#limites" className="text-neutral-900 hover:underline">4. Cinq situations où d&apos;autres solutions sont préférables</a></li>
              <li><a href="#synthese" className="text-neutral-900 hover:underline">5. Synthèse : 10 points à retenir</a></li>
            </ol>
          </nav>

          {/* SECTION 1 */}
          <section id="fonctionnement" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Comment fonctionne la rente viagère</h2>

            <p className="text-neutral-700 mb-4">
              Vous arrivez à la retraite avec 200 000 euros sur une assurance-vie ou un PER. Pour transformer ce capital en revenus, vous avez deux options.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="bg-surface-card border border-neutral-200 p-5 border-l-4 border-l-neutral-400">
                <p className="font-bold text-sm text-neutral-900 mb-3">Option A - Retraits programmés</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Vous gardez le capital. Vous retirez chaque mois ce dont vous avez besoin. Vous restez propriétaire et vous pouvez transmettre à vos héritiers. Risque : si vous vivez très longtemps, vous pouvez vider la cagnotte avant votre décès.
                </p>
              </div>
              <div className="bg-surface-card border border-neutral-200 p-5 border-l-4 border-l-accent-400">
                <p className="font-bold text-sm text-neutral-900 mb-3">Option B - Rente viagère</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Vous donnez vos 200 000 euros à un assureur. Il s&apos;engage à vous verser, par exemple, 1 100 euros par mois jusqu&apos;à votre décès. Que vous viviez jusqu&apos;à 75 ans ou jusqu&apos;à 105 ans, il continue. Contrepartie : si vous partez tôt, vos héritiers ne touchent rien.
                </p>
              </div>
            </div>

            <p className="text-neutral-700 mb-6">
              La rente viagère, c&apos;est une assurance longévité. L&apos;assureur prend le risque de vous verser une rente pendant très longtemps. Vous cédez le risque de manquer d&apos;argent à 95 ans. Échange de risques, pas placement.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Fiscalité de la rente (info générale)</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                La rente n&apos;est imposée qu&apos;en partie, et d&apos;autant moins que vous commencez à la percevoir tard. La fraction imposable : 70 % avant 50 ans, 50 % de 50 à 59 ans, 40 % de 60 à 69 ans, 30 % à partir de 70 ans (Art. 158-6 CGI). La logique : plus vous attendez, plus chaque versement ressemble à un remboursement de votre capital, et moins à un revenu.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="seuil" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Pourquoi le seuil de rentabilité est après l&apos;espérance de vie</h2>

            <p className="text-neutral-700 mb-6">
              Voici les chiffres, puis les trois raisons qui expliquent l&apos;écart.
            </p>

            <div className="bg-surface-card border border-neutral-200 p-6 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-4">Exemple de référence</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {[
                  { label: 'Âge', val: '72 ans' },
                  { label: 'Capital converti', val: '255 000 euros' },
                  { label: 'Rente mensuelle', val: '1 340 euros' },
                ].map(({ label, val }) => (
                  <div key={label} className="text-center">
                    <p className="font-mono text-xs text-neutral-400 uppercase mb-1">{label}</p>
                    <p className="font-bold text-lg text-neutral-900">{val}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-100 pt-4 space-y-2 font-mono text-sm text-neutral-800">
                <p>Seuil de rentabilité : 255 000 ÷ (1 340 × 12) = <strong className="text-neutral-900">15,8 ans</strong></p>
                <p>Capital récupéré à partir de : <strong className="text-neutral-900">87,8 ans</strong></p>
              </div>
              <div className="border-t border-neutral-100 mt-4 pt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-mono text-xs text-neutral-400 uppercase mb-1">Espérance de vie homme à 72 ans (INSEE 2022)</p>
                  <p className="font-bold text-neutral-900">environ 14 ans <span className="font-normal text-neutral-500 text-sm">(86 ans)</span></p>
                </div>
                <div>
                  <p className="font-mono text-xs text-neutral-400 uppercase mb-1">Espérance de vie femme à 72 ans (INSEE 2022)</p>
                  <p className="font-bold text-neutral-900">environ 17 ans <span className="font-normal text-neutral-500 text-sm">(89 ans)</span></p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <p className="text-sm text-neutral-700">Le seuil tombe après l&apos;espérance de vie moyenne pour un homme, et juste avant pour une femme.</p>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4 mt-10">Les trois raisons de cet écart</h3>

            <div className="space-y-6">
              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-bold text-sm text-neutral-900 mb-2">1. L&apos;assureur prend une marge</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Sur 255 000 euros versés, l&apos;assureur ne redistribue pas tout. Il garde 20 à 30 % pour sa marge, ses frais de gestion et ses provisions pour les gens qui vivent vraiment très vieux. En pratique : sur 255 000 euros, environ 180 000 euros partent réellement en rentes.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-bold text-sm text-neutral-900 mb-2">2. La mutualisation</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  L&apos;assureur ne parie pas sur votre durée de vie à vous. Il gère un portefeuille de milliers d&apos;assurés. Sur 1 000 personnes, à peu près la moitié décédera avant l&apos;espérance de vie. Le capital non distribué de celles-là finance la rente de celles qui vivent au-delà. C&apos;est le même principe que l&apos;assurance auto : vos primes paient les accidents des autres.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-5">
                <p className="font-bold text-sm text-neutral-900 mb-2">3. C&apos;est une assurance, pas un placement</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Une assurance ne se juge pas au fait de l&apos;avoir &quot;rentabilisée&quot;. Si vous assurez votre maison contre l&apos;incendie et qu&apos;il n&apos;y a jamais d&apos;incendie, vous n&apos;avez pas perdu vos primes. Vous avez payé pour la tranquillité. La rente viagère, pareil. Si vous décédez avant le seuil, vous avez payé pour la garantie de ne jamais manquer de revenus, quoi qu&apos;il arrive.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-accent-400 bg-neutral-50 px-5 py-4 my-8">
              <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">En pratique</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                La rente vous est financièrement favorable si vous vivez longtemps. Plus vous dépassez l&apos;espérance de vie de votre tranche d&apos;âge, plus vous y gagnez. C&apos;est exactement le risque qu&apos;elle couvre.
              </p>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="avantages" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Trois situations où la rente a du sens</h2>

            <div className="space-y-6">
              <div className="bg-surface-card border border-neutral-200 p-6 border-l-4 border-l-accent-400">
                <p className="font-bold text-neutral-900 mb-3">1. Vous tablez sur une longévité supérieure à la moyenne</p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  Bonne santé, parents et grands-parents qui ont passé les 90 ans, mode de vie sain. Si vous vivez 5 à 10 ans de plus que l&apos;espérance de vie statistique, vous touchez 30 à 50 % de plus que le capital versé au départ.
                </p>
                <p className="font-mono text-xs text-neutral-400">
                  Exemple : seuil à 15,8 ans, longévité réelle de 22 ans. Vous touchez 354 000 euros de rentes pour 255 000 euros versés.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6 border-l-4 border-l-accent-400">
                <p className="font-bold text-neutral-900 mb-3">2. Vous n&apos;avez personne à qui transmettre</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Pas d&apos;héritiers ? La question de la transmission ne se pose pas. Du coup, autant optimiser vos revenus de votre vivant plutôt que de garder un capital qui n&apos;ira à personne. La rente est faite pour ça.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6 border-l-4 border-l-accent-400">
                <p className="font-bold text-neutral-900 mb-3">3. Vous ne voulez plus gérer votre capital</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Certains n&apos;ont pas envie de gérer un portefeuille à la retraite. Peur des mauvais arbitrages, peur des marchés, ou simple envie de paix. La rente délègue tout. Zéro gestion. Les versements tombent automatiquement jusqu&apos;au décès, même en cas de perte d&apos;autonomie.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="limites" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Cinq situations où d&apos;autres solutions valent mieux</h2>

            <div className="space-y-6">
              <div className="bg-surface-card border border-neutral-200 p-6">
                <p className="font-bold text-neutral-900 mb-3">1. Vous voulez transmettre un capital</p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  La rente viagère consomme le capital. Sauf option spécifique, vos héritiers ne touchent rien à votre décès. Si transmettre à vos enfants ou petits-enfants compte vraiment, la rente n&apos;est pas le bon outil.
                </p>
                <p className="font-mono text-xs text-neutral-400">
                  Alternative : garder le capital en assurance-vie avec retraits programmés. Vous pouvez retirer 4 600 euros de gains par an sans impôt (9 200 euros en couple), et transmettre le solde avec 152 500 euros d&apos;abattement par bénéficiaire.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6">
                <p className="font-bold text-neutral-900 mb-3">2. Vous pourriez avoir besoin de liquidités</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Une fois le capital chez l&apos;assureur, c&apos;est fini. Plus moyen de récupérer quoi que ce soit, même en urgence. Travaux lourds, coup de pouce aux enfants, dépendance : zéro marge de manœuvre. Un hébergement en EHPAD coûte facilement 3 000 euros par mois, et les aides publiques ne couvrent pas tout.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6">
                <p className="font-bold text-neutral-900 mb-3">3. Votre santé laisse présager une espérance de vie réduite</p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  Une maladie chronique ou une pathologie lourde qui réduit votre horizon à 8 ans, face à un seuil de rentabilité à 15 ans : vous ne récupérez que la moitié de votre capital.
                </p>
                <div className="bg-neutral-50 border border-neutral-200 p-4 font-mono text-xs text-neutral-700">
                  <p>Capital versé : 255 000 euros</p>
                  <p>Rente perçue sur 8 ans : 1 340 × 12 × 8 = 128 640 euros</p>
                  <p className="font-bold text-neutral-900 pt-1">Récupéré : 50 % du capital</p>
                </div>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6">
                <p className="font-bold text-neutral-900 mb-3">4. Vous avez moins de 65 ans</p>
                <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                  Le taux de conversion monte avec l&apos;âge. Avant 65 ans, les rentes sont vraiment maigres.
                </p>
                <div className="bg-neutral-50 border border-neutral-200 p-4 font-mono text-xs text-neutral-700">
                  <p>Capital de 200 000 euros</p>
                  <p>À 60 ans : environ 545 euros par mois</p>
                  <p>À 70 ans : environ 780 euros par mois (+43 %)</p>
                </div>
                <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                  En attendant 10 ans, la rente est presque doublée. Pendant ce temps, le capital continue à travailler en assurance-vie ou PER.
                </p>
              </div>

              <div className="bg-surface-card border border-neutral-200 p-6">
                <p className="font-bold text-neutral-900 mb-3">5. L&apos;inflation vous inquiète</p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Certaines rentes sont indexées sur l&apos;inflation, mais la revalorisation reste souvent en dessous de l&apos;inflation réelle. Avec 3 % d&apos;inflation et 1,5 % de revalorisation, vous perdez 1,5 % de pouvoir d&apos;achat par an. Sur 20 ans, ça fait presque 30 % de perte cumulée. Un capital en unités de compte encaisse mieux l&apos;érosion monétaire.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="synthese" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Synthèse : 10 points à retenir</h2>

            <div className="space-y-4">
              {[
                "La rente viagère, c'est une assurance longévité, pas un placement. Vous refilez à l'assureur le risque de vivre très longtemps, en échange d'un revenu garanti à vie.",
                "Le seuil de rentabilité tombe par construction après l'espérance de vie. Ce n'est pas une anomalie : la marge de l'assureur et la mutualisation des risques expliquent tout.",
                "Le taux de conversion grimpe avec l'âge. La fenêtre la plus favorable se situe entre 70 et 75 ans. Avant 65 ans, les montants sont vraiment maigres.",
                "La décision est irrévocable. Capital transféré, capital perdu pour vous et vos héritiers. C'est le point à bien intégrer avant de signer.",
                "L'option de réversion au profit du conjoint coûte 15 à 30 % sur la rente initiale. À évaluer en fonction des besoins réels du conjoint.",
                "La rente prend son sens si vous tablez sur une longévité supérieure à la moyenne. Si votre santé est fragile, les retraits programmés en assurance-vie gardent le capital accessible.",
                "La rente n'est pas adaptée si vous voulez transmettre. L'assurance-vie avec retraits programmés permet de cumuler revenus réguliers et transmission.",
                "Les taux de conversion varient pas mal d'un assureur à l'autre pour un même profil. 10 % d'écart sur le taux, c'est 10 % de revenus en plus ou en moins, à vie.",
                "La fiscalité de la rente est plus lourde que celle des retraits en assurance-vie. À intégrer dans votre calcul de revenu net réel.",
                "Capital transféré, capital irrécupérable. Comparez avec les alternatives (retraits programmés en assurance-vie, conservation du capital) avant de signer.",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-5 bg-surface-card border border-neutral-200 px-5 py-4">
                  <span className="font-mono font-bold text-neutral-400 text-lg shrink-0 w-6">{i + 1}</span>
                  <p className="text-sm text-neutral-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-neutral-900 px-8 py-6 mb-12">
            <p className="text-white font-bold text-lg mb-1">Simulez votre rente viagère en deux minutes</p>
            <p className="text-neutral-400 text-sm mb-4">
              Projection sur 30 ans, seuil de rentabilité précis, comparaison avec l&apos;espérance de vie INSEE, stratégies couple. Gratuit, sans inscription, zéro donnée conservée.
            </p>
            <Link href="/rente-viagere" className="inline-block bg-surface-card text-neutral-900 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur →
            </Link>
          </div>

          {/* Sources */}
          <div className="bg-surface-card border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Méthodologie et sources</h2>
            <div className="space-y-4 text-sm">
              {[
                { label: 'Tables de mortalité INSEE 2021', desc: 'Source des espérances de vie par âge et par sexe utilisées dans les calculs.' },
                // LEGIARTI000044979614 retiré le 2026-05-31 (HTTP 404).
                // Cf. docs/broken-links-to-fix.md.
                { label: 'Article 158, 6° du CGI' },
                { label: 'Service-Public.fr - Rente viagère', desc: 'Fiche pratique officielle sur le fonctionnement et la fiscalité de la rente viagère.', href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F3173' },
              ].map(s => (
                <div key={s.label} className="flex items-start gap-3">
                  <span className="text-accent-400 mt-0.5 shrink-0">-</span>
                  <div>
                    {s.href
                      ? <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline font-medium">{s.label}</a>
                      : <p className="font-medium text-neutral-800">{s.label}</p>
                    }
                    {s.desc && <p className="text-neutral-500 text-xs mt-0.5">{s.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Outil indicatif uniquement. Ne constitue pas un conseil patrimonial personnalisé.{' '}
              <a href="https://github.com/nba67000/calculpatrimoine" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:underline">Code source ouvert</a>
            </p>
          </div>

        </div>
      </article>
      <Footer />
    </>
  )
}
