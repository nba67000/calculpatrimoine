import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'TMI : à quoi sert votre tranche marginale en 2026',
  description: 'Votre TMI n\'est pas le taux que vous payez. Comment elle se calcule, à quoi elle sert pour le PER, l\'assurance-vie, et l\'épargne en général.',
  keywords: 'tmi, tranche marginale imposition, taux marginal, comment calculer tmi, barème ir 2026, quotient familial, décote',
  openGraph: {
    title: 'TMI : à quoi sert votre tranche marginale en 2026',
    description: 'Vous gagnez 45 000 € : votre TMI est à 30 %, mais votre taux moyen tombe à 12 %. Pourquoi cet écart change toutes vos décisions d\'épargne.',
    type: 'article',
    publishedTime: '2026-06-02',
  },
  alternates: { canonical: 'https://calculpatrimoine.fr/blog/tmi-tranche-marginale-comprendre' },
}

export default function ArticleTMIPage() {
  return (
    <>
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { href: '/blog', label: 'Blog' },
          { label: 'TMI 2026' },
        ]}
        titre="TMI : à quoi sert votre tranche marginale en 2026"
        features={['Fiscalité', '12 min de lecture', '2 juin 2026']}
      />
      <article style={{ backgroundColor: '#F7F3EC' }}>

        <div className="max-w-4xl mx-auto px-6 pt-12 pb-16">

          {/* Intro */}
          <div className="mb-12">
            <p className="text-xl text-neutral-700 leading-relaxed mb-6">
              Vous gagnez 45 000 euros nets imposables. Votre TMI, c&apos;est 30 %. Mais attention :
              ça ne veut pas dire que vous payez 30 % sur ces 45 000 euros. Votre impôt net tourne
              plutôt autour de 5 500 euros, soit un taux moyen de 12 %. C&apos;est tout l&apos;écart
              entre TMI et taux moyen qu&apos;il faut comprendre.
            </p>
            <p className="text-neutral-700">
              Au programme : ce que la TMI mesure exactement, comment lire le barème 2026, et
              pourquoi votre TMI commande la plupart de vos décisions d&apos;épargne (PER,
              assurance-vie, PFU contre barème).
            </p>
          </div>

          {/* Avertissement */}
          <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-12">
            <p className="font-mono text-xs font-bold text-warning-800 uppercase tracking-wider mb-1">Avertissement</p>
            <p className="text-sm text-warning-700 leading-relaxed">
              Cet article explique le barème de l&apos;impôt sur le revenu 2026 (revenus 2025) et la
              mécanique du calcul. Il ne remplace pas un conseil fiscal personnalisé.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-neutral-900 px-8 py-6 mb-12">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2">Outil associé</p>
            <p className="text-white font-bold text-lg mb-1">Calculez votre TMI et votre impôt</p>
            <p className="text-neutral-400 text-sm mb-4">
              Le calculateur TMI sort le détail tranche par tranche, le quotient familial et la
              décote sur votre situation réelle. Barème 2026, gratuit, sans inscription.
            </p>
            <Link href="/tmi" className="inline-block bg-surface-card text-neutral-900 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur →
            </Link>
          </div>

          {/* Lexique */}
          <div className="bg-surface-card border border-neutral-200 p-6 mb-12">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-5">Lexique - avant de commencer</p>
            <div className="space-y-5">
              {[
                {
                  terme: 'Revenu net imposable',
                  def: "Le revenu sur lequel le fisc calcule votre impôt, après l'abattement de 10 % pour frais pros (ou frais réels). Pour un salarié, c'est environ 90 % du salaire net annuel. C'est ce chiffre qui apparaît ligne 1AJ de votre déclaration et qui entre dans le barème.",
                },
                {
                  terme: 'TMI (tranche marginale d\'imposition)',
                  def: "Le taux qui s'applique sur votre dernier euro de revenu. Pas sur le total. Si vous gagnez 45 000 euros et que la tranche à 30 % démarre à 29 579 euros, votre TMI est à 30 %. Mais les premiers euros restent à 0 %, puis à 11 %.",
                },
                {
                  terme: 'Taux moyen d\'imposition',
                  def: "L'impôt net divisé par le revenu net imposable. Toujours plus bas que la TMI (sauf cas extrême). C'est le taux réel sur tout votre revenu, pas seulement sur le dernier euro.",
                },
                {
                  terme: 'Quotient familial (QF)',
                  def: "Mécanisme qui divise votre revenu par un nombre de parts (1 pour célibataire, 2 pour couple, +0,5 par enfant). Le barème s'applique au revenu par part. Avec des enfants à charge, ça peut faire chuter votre TMI.",
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
              <li><a href="#dernier-euro" className="text-neutral-900 hover:underline">1. La TMI : votre dernier euro, pas votre tout premier</a></li>
              <li><a href="#bareme-2026" className="text-neutral-900 hover:underline">2. Lire le barème 2026 sans se tromper</a></li>
              <li><a href="#a-quoi-sert" className="text-neutral-900 hover:underline">3. À quoi sert vraiment la TMI</a></li>
              <li><a href="#quotient-familial" className="text-neutral-900 hover:underline">4. Le quotient familial : ce que les enfants changent</a></li>
              <li><a href="#decote" className="text-neutral-900 hover:underline">5. La décote : ce qui se passe en bas du barème</a></li>
              <li><a href="#limites" className="text-neutral-900 hover:underline">6. Ce que la simulation ne dit pas</a></li>
            </ol>
          </nav>

          {/* SECTION 1 */}
          <section id="dernier-euro" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">La TMI : votre dernier euro, pas votre tout premier</h2>

            <p className="text-neutral-700 mb-4">
              En France, l&apos;impôt sur le revenu est progressif (Art. 197 CGI). Votre revenu net
              imposable est découpé en tranches, et chaque tranche est taxée à un taux qui monte. Le
              premier euro est à 0 %, le dernier peut grimper à 45 %.
            </p>

            <p className="text-neutral-700 mb-6">
              Votre TMI, c&apos;est le taux qui s&apos;applique sur la dernière tranche atteinte par votre
              revenu. Sur le dernier euro gagné cette année, pas sur le reste. Le mot
              &laquo;&nbsp;marginal&nbsp;&raquo; veut dire &laquo;&nbsp;à la marge&nbsp;&raquo;, donc
              au bout, sur l&apos;euro supplémentaire.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">Exemple chiffré</p>
              <div className="text-sm space-y-2 text-neutral-700">
                <p>Sophie, célibataire, sans enfant, 45 000 euros de revenu net imposable.</p>
                <p>Son revenu traverse trois tranches :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>De 0 à 11 600 euros : taux 0 %</li>
                  <li>De 11 600 à 29 579 euros : taux 11 %</li>
                  <li>De 29 579 à 45 000 euros : taux 30 %</li>
                </ul>
                <p className="pt-2 border-t border-neutral-200 mt-3">
                  <strong>TMI = 30 %</strong> (taux de la dernière tranche atteinte).
                  <br />
                  <strong>Taux moyen = 14,7 %</strong> (5 500 / 45 000 × 100, après décote nulle ici).
                </p>
              </div>
            </div>

            <p className="text-neutral-700">
              Confondre TMI et taux moyen, c&apos;est l&apos;erreur la plus fréquente. Sophie ne paie pas
              30 % de ses 45 000 euros, soit 13 500 euros. Elle paie environ 5 500 euros, parce que
              les premiers 11 600 euros sont à 0 % et la tranche entre 11 600 et 29 579 euros à
              seulement 11 %.
            </p>
          </section>

          {/* SECTION 2 */}
          <section id="bareme-2026" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Lire le barème 2026 sans se tromper</h2>

            <p className="text-neutral-700 mb-6">
              Pour les revenus 2025, déclarés au printemps 2026, le barème vient de la loi de
              finances 2026 (Art. 4 LF 2026), avec une indexation de 0,9 % sur les tranches de
              l&apos;année précédente.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-neutral-300">
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Taux</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">De</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">À</th>
                    <th className="py-2 text-left text-neutral-500 font-mono text-xs">Tranche concernée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 font-mono text-xs">
                  {[
                    { taux: '0 %', de: '0 €', a: '11 600 €', label: 'Tranche exonérée' },
                    { taux: '11 %', de: '11 600 €', a: '29 579 €', label: 'Tranche basse' },
                    { taux: '30 %', de: '29 579 €', a: '84 577 €', label: 'Tranche intermédiaire' },
                    { taux: '41 %', de: '84 577 €', a: '181 917 €', label: 'Tranche haute' },
                    { taux: '45 %', de: '181 917 €', a: 'au-delà', label: 'Tranche supérieure' },
                  ].map(r => (
                    <tr key={r.taux}>
                      <td className="py-2 font-bold text-neutral-900">{r.taux}</td>
                      <td className="py-2">{r.de}</td>
                      <td className="py-2">{r.a}</td>
                      <td className="py-2 text-neutral-500">{r.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-neutral-700 mb-4">
              Le calcul tranche par tranche pour Sophie (45 000 euros, célibataire, sans enfant) :
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6 font-mono text-sm">
              <p className="font-bold mb-3">Décomposition de l&apos;impôt brut</p>
              <div className="space-y-1.5 text-neutral-800">
                <p>Tranche 0 % (0 à 11 600 €) : 11 600 × 0 % = <strong>0 €</strong></p>
                <p>Tranche 11 % (11 600 à 29 579 €) : 17 979 × 11 % = <strong>1 977,69 €</strong></p>
                <p>Tranche 30 % (29 579 à 45 000 €) : 15 421 × 30 % = <strong>4 626,30 €</strong></p>
                <p className="pt-2 border-t border-neutral-200 mt-2">
                  Impôt brut total : <strong className="text-neutral-900">6 604 €</strong>
                </p>
                <p className="text-neutral-500 text-xs mt-1">Décote nulle ici (impôt brut &gt; seuil 1 982 €).</p>
                <p>
                  Impôt net : <strong className="text-neutral-900">6 604 €</strong>
                </p>
                <p className="text-neutral-500 text-xs mt-1">Taux moyen : 6 604 / 45 000 = 14,7 %.</p>
              </div>
            </div>

            <p className="text-neutral-700">
              Sophie est à TMI 30 % mais elle paie en réalité 14,7 % de ses revenus en impôt.
              L&apos;écart est mécanique : les premiers euros sont peu ou pas taxés.
            </p>

            <p className="text-xs text-neutral-500 font-mono mt-6">
              Source :{' '}
              <span className="font-medium text-neutral-700">Article 197 du CGI</span> · LF 2026 art. 4 · BOFiP BOI-IR-LIQ-20-10
            </p>
          </section>

          {/* SECTION 3 */}
          <section id="a-quoi-sert" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">À quoi sert vraiment la TMI</h2>

            <p className="text-neutral-700 mb-6">
              La TMI vous dit à quel taux sera taxé chaque euro supplémentaire. C&apos;est la clé de
              presque toutes les décisions d&apos;épargne et de défiscalisation.
            </p>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-3">PER : économie d&apos;impôt = versement × TMI</h3>

            <p className="text-neutral-700 mb-4">
              Quand vous versez sur un PER, le montant versé sort de votre revenu imposable.
              L&apos;économie d&apos;impôt immédiate, c&apos;est exactement votre versement multiplié par
              votre TMI.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6 font-mono text-sm">
              <p className="font-bold mb-2">5 000 euros versés sur un PER</p>
              <ul className="space-y-1 text-neutral-800">
                <li>À TMI 11 % : économie d&apos;impôt = 550 €</li>
                <li>À TMI 30 % : économie d&apos;impôt = 1 500 €</li>
                <li>À TMI 41 % : économie d&apos;impôt = 2 050 €</li>
                <li>À TMI 45 % : économie d&apos;impôt = 2 250 €</li>
              </ul>
              <p className="text-neutral-500 text-xs mt-3">
                Le PER est mécaniquement plus rentable à TMI élevée. Plus le taux grimpe, plus chaque
                euro versé vous fait économiser d&apos;impôt.
              </p>
            </div>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-3 mt-8">
              Assurance-vie : PFU 30 % ou barème, qui gagne
            </h3>

            <p className="text-neutral-700 mb-4">
              À un rachat d&apos;assurance-vie, vous avez le choix entre le prélèvement forfaitaire
              unique (PFU) à 12,8 % d&apos;impôt sur le revenu (plus 17,2 % de prélèvements sociaux),
              ou le barème progressif (votre TMI plus 17,2 % de prélèvements sociaux).
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6 font-mono text-sm">
              <p className="font-bold mb-2">Quand le barème devient plus intéressant que le PFU</p>
              <ul className="space-y-1 text-neutral-800">
                <li>TMI 0 % : barème largement gagnant (IR nul, contre 12,8 % du PFU)</li>
                <li>TMI 11 % : barème encore gagnant (11 % &lt; 12,8 %)</li>
                <li>TMI 30 % et plus : PFU gagnant (12,8 % &lt; 30 %)</li>
              </ul>
              <p className="text-neutral-500 text-xs mt-3">
                Le bon choix dépend uniquement de votre TMI au moment du rachat. À TMI 11 %, le
                barème vous économise 1,8 point d&apos;IR sur les gains imposables.
              </p>
            </div>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-3 mt-8">
              Plus-values mobilières : même logique
            </h3>

            <p className="text-neutral-700 mb-4">
              Pour les plus-values sur titres hors PEA, c&apos;est pareil : PFU 30 % par défaut, ou
              option pour le barème. Si votre TMI passe sous 12,8 %, le barème reste plus avantageux
              côté impôt sur le revenu.
            </p>

            <p className="text-neutral-700 mb-4">
              Pour les plus-values immobilières, autre logique (taux fixe 19 % d&apos;IR et 17,2 %
              de PS) : votre TMI ne joue pas. Voir le calculateur dédié pour le détail des
              abattements pour durée de détention.
            </p>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <span className="font-medium text-neutral-700">Article 200 A du CGI</span> (PFU 30 %)
            </p>
          </section>

          {/* SECTION 4 */}
          <section id="quotient-familial" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">
              Le quotient familial : ce que les enfants changent
            </h2>

            <p className="text-neutral-700 mb-4">
              Le quotient familial divise votre revenu par un nombre de parts (Art. 194 CGI). Avant
              de passer au barème, le fisc calcule votre revenu par part. Le barème s&apos;applique
              à ce revenu par part, puis le résultat est remultiplié par le nombre de parts.
            </p>

            <p className="text-neutral-700 mb-6">
              Du coup, votre TMI peut chuter : vos enfants
              &laquo;&nbsp;diluent&nbsp;&raquo; votre revenu sur plus de parts.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">
                Cas chiffré : couple marié, 60 000 euros de revenu net imposable
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="border-l-4 border-l-neutral-300 pl-4">
                  <p className="font-bold text-sm text-neutral-900 mb-2">Sans enfant</p>
                  <div className="font-mono text-xs space-y-1 text-neutral-700">
                    <p>Parts : 2</p>
                    <p>Revenu par part : 60 000 / 2 = 30 000 €</p>
                    <p>TMI : 30 % (30 000 dépasse 29 579)</p>
                    <p className="pt-2 border-t border-neutral-200 mt-2 font-bold text-neutral-900">
                      Impôt net : ~5 718 €
                    </p>
                  </div>
                </div>
                <div className="border-l-4 border-l-accent-400 pl-4">
                  <p className="font-bold text-sm text-neutral-900 mb-2">Avec 2 enfants</p>
                  <div className="font-mono text-xs space-y-1 text-neutral-700">
                    <p>Parts : 2 + 0,5 + 0,5 = 3</p>
                    <p>Revenu par part : 60 000 / 3 = 20 000 €</p>
                    <p>TMI : 11 % (20 000 dépasse 11 600)</p>
                    <p className="pt-2 border-t border-neutral-200 mt-2 font-bold text-neutral-900">
                      Impôt net : ~2 543 €
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mt-4">
                Écart : 3 175 euros d&apos;impôt en moins grâce au quotient familial, et une TMI qui
                tombe de 30 % à 11 %.
              </p>
            </div>

            <h3 className="font-serif text-xl font-bold text-neutral-900 mb-3 mt-8">
              Le plafonnement de l&apos;avantage par demi-part
            </h3>

            <p className="text-neutral-700 mb-4">
              Pour empêcher les foyers à hauts revenus d&apos;abuser du mécanisme, la réduction
              d&apos;impôt liée à chaque demi-part supplémentaire (chaque enfant vaut 0,5 part
              jusqu&apos;au deuxième) est plafonnée à 1 807 euros en 2026 (Art. 197-IV CGI).
            </p>

            <p className="text-neutral-700 mb-4">
              En pratique, à partir d&apos;un certain seuil de revenus, votre réduction d&apos;impôt par
              enfant arrête de monter, même si vos revenus continuent à grimper. Le QF perd petit à
              petit son efficacité.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6 font-mono text-sm">
              <p className="font-bold mb-2">Couple marié, 2 enfants, plafonnement actif</p>
              <ul className="space-y-1 text-neutral-800">
                <li>2 demi-parts supplémentaires : 2 × 1 807 = 3 614 €</li>
                <li>Réduction effective bloquée à 3 614 €, même si le QF théorique aurait donné plus</li>
              </ul>
              <p className="text-neutral-500 text-xs mt-3">
                Une fois le plafond atteint, chaque euro de revenu supplémentaire repart à la TMI
                &laquo;&nbsp;sans enfant&nbsp;&raquo;.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Sources :{' '}
              <span className="font-medium text-neutral-700">Article 194 du CGI</span> (parts) ·
              <span className="font-medium text-neutral-700"> Article 197-IV du CGI</span> (plafonnement)
            </p>
          </section>

          {/* SECTION 5 */}
          <section id="decote" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">
              La décote : ce qui se passe en bas du barème
            </h2>

            <p className="text-neutral-700 mb-4">
              Pour les revenus modestes, l&apos;État applique automatiquement une réduction sur
              l&apos;impôt brut (avant les crédits et réductions). C&apos;est la décote (Art. 197-I-4-a CGI).
              Elle ne touche pas votre TMI, mais elle peut faire tomber l&apos;impôt à zéro en bas du
              barème.
            </p>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">
                Seuils de déclenchement en 2026
              </p>
              <div className="font-mono text-sm space-y-1 text-neutral-800">
                <p>Célibataire / parent isolé : décote si impôt brut &lt; 1 982 €</p>
                <p>Couple marié ou pacsé : décote si impôt brut &lt; 3 277 €</p>
              </div>
              <p className="text-xs text-neutral-500 mt-3">
                Au-dessus de ces seuils, la décote tombe à zéro et le barème s&apos;applique tel quel.
              </p>
            </div>

            <p className="text-neutral-700 mb-4">
              La formule officielle s&apos;appuie sur une limite et un coefficient (Art. 197-I-4-a CGI) :
            </p>

            <div className="bg-surface-card border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-2">Formule</p>
              <p className="font-mono text-sm text-neutral-800">
                Décote = limite − 45,25 % × impôt brut
              </p>
              <ul className="font-mono text-xs text-neutral-500 mt-3 space-y-1">
                <li>limite = 897 € pour un célibataire</li>
                <li>limite = 1 483 € pour un couple</li>
                <li>Décote plafonnée à 0 (jamais négative)</li>
              </ul>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-5 my-6">
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">
                Cas chiffré : célibataire, impôt brut de 1 000 €
              </p>
              <div className="font-mono text-sm space-y-1 text-neutral-800">
                <p>Décote = 897 − 0,4525 × 1 000 = 444,50 €</p>
                <p>Impôt net = 1 000 − 445 = <strong className="text-neutral-900">555 €</strong></p>
              </div>
              <p className="text-xs text-neutral-500 mt-3">
                Plus l&apos;impôt brut est petit, plus la décote rogne dessus. À 700 euros d&apos;impôt
                brut, la décote vaut 897 − 0,4525 × 700 = 580 euros, et l&apos;impôt net tombe à 120
                euros.
              </p>
            </div>

            <p className="text-xs text-neutral-500 font-mono">
              Source :{' '}
              <span className="font-medium text-neutral-700">Article 197-I-4-a du CGI</span> ·
              BOFiP BOI-IR-LIQ-20-20-30 (paramètres 2026)
            </p>
          </section>

          {/* SECTION 6 */}
          <section id="limites" className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">
              Ce que la simulation ne dit pas
            </h2>

            <ul className="list-disc pl-6 space-y-3 text-neutral-700">
              <li>
                <strong>Revenus exceptionnels.</strong> Une indemnité de licenciement, une prime de
                départ ou un arriéré de salaire peut être lissé via le mécanisme du quotient
                (Art. 163-0 A CGI), qui amortit l&apos;effet de saut de tranche. Pas géré ici.
              </li>
              <li>
                <strong>Réductions et crédits d&apos;impôt.</strong> Dons aux associations, garde
                d&apos;enfants, emploi à domicile, investissement locatif : ces dispositifs viennent
                s&apos;imputer sur l&apos;impôt après décote, et peuvent vous ramener à zéro d&apos;impôt
                final. Ils ne touchent pas au barème ni à la TMI affichée.
              </li>
              <li>
                <strong>Revenus du capital au barème.</strong> Si vous laissez tomber le PFU pour
                vos intérêts, dividendes ou plus-values mobilières, ces revenus s&apos;ajoutent au
                revenu net imposable et peuvent vous faire changer de tranche. À simuler avant de
                cocher la case 2OP de la déclaration.
              </li>
              <li>
                <strong>Évolution annuelle.</strong> La TMI affichée est une TMI à l&apos;année. Si
                vos revenus bougent en cours d&apos;année (prime, départ à la retraite, perte
                d&apos;emploi), la TMI réelle sur le total final peut différer de la projection.
              </li>
            </ul>
          </section>

          {/* CTA final */}
          <div className="bg-neutral-900 px-8 py-6 mb-12">
            <p className="text-white font-bold text-lg mb-1">Calculez votre TMI avec vos chiffres</p>
            <p className="text-neutral-400 text-sm mb-4">
              Le calculateur TMI sort le détail tranche par tranche, l&apos;effet du quotient familial,
              le plafonnement et la décote. Barème 2026 officiel, gratuit, zéro donnée conservée.
            </p>
            <Link href="/tmi" className="inline-block bg-surface-card text-neutral-900 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur TMI →
            </Link>
          </div>

          {/* Pour aller plus loin */}
          <section className="border-t border-neutral-300 pt-8 mb-12">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-4">Pour aller plus loin</p>
            <ul className="space-y-3">
              <li>
                <Link href="/tmi" className="text-neutral-900 hover:underline">
                  → Calculateur TMI 2026 (votre TMI exacte avec quotient familial et décote)
                </Link>
              </li>
              <li>
                <Link href="/per-individuel" className="text-neutral-900 hover:underline">
                  → Calculateur PER (économie d&apos;impôt sur versement, qui dépend de votre TMI)
                </Link>
              </li>
              <li>
                <Link href="/blog/per-individuel-deduction-fiscalite" className="text-neutral-900 hover:underline">
                  → Article : PER individuel, ce que vous gagnez à l&apos;entrée et payez à la sortie
                </Link>
              </li>
              <li>
                <Link href="/assurance-vie/fiscalite-rachat" className="text-neutral-900 hover:underline">
                  → Calculateur assurance-vie : choix PFU contre barème selon votre TMI
                </Link>
              </li>
            </ul>
          </section>

          {/* Sources */}
          <div className="bg-surface-card border border-neutral-200 p-8">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Méthodologie et sources</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Textes de loi</h3>
                <ul className="space-y-2 text-sm">
                  {([
                    { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051212954', label: 'Article 197 du CGI', desc: 'Barème progressif IR 2026 (revenus 2025), décote, plafonnement QF' },
                    { label: 'Article 194 du CGI', desc: 'Nombre de parts du quotient familial selon la composition du foyer' },
                    { label: 'Article 200 A du CGI', desc: 'Prélèvement forfaitaire unique (PFU) à 12,8 % d\'IR' },
                    { href: 'https://bofip.impots.gouv.fr/bofip/2491-PGP.html/identifiant=BOI-IR-LIQ-20-10-20260407', label: 'BOFiP BOI-IR-LIQ-20-10', desc: "Barème de l'impôt sur le revenu 2026 - publié le 07/04/2026" },
                    { href: 'https://bofip.impots.gouv.fr/bofip/2495-PGP.html/identifiant=BOI-IR-LIQ-20-20-30-20250414', label: 'BOFiP BOI-IR-LIQ-20-20-30', desc: 'Décote 2026 (paramètres limite et coefficient)' },
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
                    <p className="text-neutral-400 mb-0.5">1. Impôt brut par tranche</p>
                    <p>(revenu dans la tranche) × taux de la tranche, sommé sur toutes les tranches atteintes</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-0.5">2. Quotient familial</p>
                    <p>Revenu par part = revenu net imposable / nombre de parts ; barème appliqué au revenu par part puis remultiplié</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-0.5">3. Plafonnement QF</p>
                    <p>Réduction d&apos;impôt par demi-part plafonnée à 1 807 € en 2026 (Art. 197-IV CGI)</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 mb-0.5">4. Décote</p>
                    <p>Décote = max(0 ; limite − 45,25 % × impôt brut), avec limite = 897 € (seul) ou 1 483 € (couple)</p>
                  </div>
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
