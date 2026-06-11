import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos - CalculPatrimoine',
  description: 'CalculPatrimoine : un développeur dans l\'assurance-vie, des outils de calcul open-source, une ligne éditoriale anti-conseil. L\'histoire du projet.',
  alternates: { canonical: 'https://calculpatrimoine.fr/a-propos' },
}

export default function APropos() {
  return (
    <>
      <Header />
      <PageHero
        breadcrumb={[
          { href: '/', label: 'Accueil' },
          { label: 'À propos' },
        ]}
        titre="Pourquoi CalculPatrimoine existe"
        description="Un développeur dans l'assurance-vie, des outils de calcul open-source, une ligne éditoriale anti-conseil. L'histoire du projet."
      />
      <div style={{ backgroundColor: '#F7F3EC' }}>
        <article className="max-w-4xl mx-auto px-6 py-16">

          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            Vous vous souvenez de la scène des &quot;Trois Frères&quot; chez le notaire ? Les frères Latour
            se retrouvent face à un homme qui débite son jargon à toute vitesse, imperturbable,
            pendant qu&apos;eux hochent la tête, l&apos;air de parfaitement suivre (il est où le pognon ?).
            C&apos;est une des scènes les plus drôles du film, mais elle dit quelque chose de vrai : face
            aux questions d&apos;argent, la plupart d&apos;entre nous faisons semblant de comprendre.
          </p>

          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            J&apos;ai eu exactement ce sentiment il y a quelques mois. Je travaille comme développeur
            dans une compagnie d&apos;assurance-vie, je côtoie les contrats et les chiffres tous les jours,
            et pourtant le jour où j&apos;ai voulu simuler le rachat de ma propre assurance-vie, je me suis
            retrouvé face à des simulateurs vagues, des interfaces pensées pour vous orienter vers un
            conseiller plutôt que pour vous donner une réponse claire. Même moi, avec mon bagage technique,
            je ne trouvais pas ce que je cherchais.
          </p>

          <p className="text-lg text-neutral-700 leading-relaxed mb-12">
            Alors j&apos;ai construit l&apos;outil que j&apos;aurais voulu trouver. Pas pour remplacer un conseiller,
            mais pour arriver à la conversation avec des chiffres concrets en tête plutôt qu&apos;une vague
            intuition. CalculPatrimoine, c&apos;est ça : des calculs transparents, des formules accessibles,
            et aucune raison de faire semblant de comprendre.
          </p>

          {/* Le constat */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">Ce qui manquait</h2>

            <p className="text-neutral-700 leading-relaxed mb-5">
              Les simulateurs que j&apos;ai trouvés avaient tous le même problème : ils vous donnaient
              un résultat sans expliquer d&apos;où il venait. Impossible de vérifier le calcul, impossible
              de modifier un paramètre sans recommencer depuis le début, et souvent impossible d&apos;accéder
              à la page correctement depuis un téléphone. Sans parler de ceux qui bloquent les résultats
              derrière un formulaire de contact.
            </p>

            <p className="text-neutral-700 leading-relaxed">
              Ce que je voulais était simple : voir la formule, comprendre chaque variable, pouvoir
              tester différents scénarios en temps réel, et repartir avec des chiffres que je pouvais
              réutiliser. Le code source de CalculPatrimoine est public sur GitHub, les tables de
              mortalité utilisées sont celles de l&apos;INSEE, et aucune donnée n&apos;est collectée.
              Chaque résultat est reproductible.
            </p>
          </section>

          {/* La solution */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">La solution : faire mieux</h2>

            <div className="bg-white border border-neutral-200 p-6">
              <div className="space-y-5">
                {[
                  { titre: 'Transparence totale', desc: 'Code source public sur GitHub, formules détaillées, tables INSEE brutes téléchargeables.' },
                  { titre: 'Vraiment gratuit', desc: 'Pas de formulaire caché, pas de vente forcée, aucune donnée collectée.' },
                  { titre: 'Fonctionnalités uniques', desc: 'Calculateur inverse + mode couple avec 5 stratégies comparées + calcul temps réel.' },
                  { titre: 'Anti-conseil, pro-calcul', desc: 'Le site calcule et compare. Il ne recommande pas. Chaque résultat est factuel et conditionnel.' },
                ].map(item => (
                  <div key={item.titre} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 shrink-0" />
                    <div>
                      <h3 className="font-bold text-neutral-900 mb-1">{item.titre}</h3>
                      <p className="text-sm text-neutral-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Qui suis-je */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">Qui suis-je ?</h2>

            <div className="bg-white border border-neutral-200 p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 bg-neutral-900 flex items-center justify-center text-white text-2xl font-bold shrink-0">
                  N
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">Nicolas</h3>
                  <p className="text-neutral-600 mb-4 leading-relaxed">
                    Analyste-développeur COBOL/AS400 dans l&apos;assurance-vie,
                    spécialisé dans les systèmes de gestion de contrats et calculs actuariels.
                  </p>
                  <div className="space-y-1.5 text-sm text-neutral-600 font-mono">
                    <p><span className="text-neutral-400">Stack :</span> Next.js 16, TypeScript, Tailwind CSS</p>
                    <p><span className="text-neutral-400">Open source :</span>{' '}
                      <a href="https://github.com/nba67000/calculpatrimoine" className="text-neutral-900 hover:underline" target="_blank" rel="noopener noreferrer">
                        github.com/nba67000/calculpatrimoine
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stack technique */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">Comment c&apos;est fait ?</h2>

            <div className="bg-white border border-neutral-200 p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Frontend</h3>
                  <ul className="space-y-1.5 text-sm text-neutral-700 font-mono">
                    <li>Next.js 16 (React 19, Server Components)</li>
                    <li>TypeScript (typage strict)</li>
                    <li>Tailwind CSS (design system)</li>
                    <li>Framer Motion (animations)</li>
                    <li>Recharts (graphiques)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Backend & Data</h3>
                  <ul className="space-y-1.5 text-sm text-neutral-700 font-mono">
                    <li>Python (scraping tables INSEE)</li>
                    <li>GitHub Actions (MAJ annuelle)</li>
                    <li>Vercel (hébergement)</li>
                    <li>JSON (stockage tables mortalité)</li>
                    <li>ISR/SSG (génération statique)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 border-t border-neutral-100 pt-4">
                <p className="font-mono text-xs text-neutral-500">
                  Performance : Lighthouse 95+ mobile · bundle &lt;155 KB · temps calcul &lt;10ms
                </p>
              </div>
            </div>
          </section>

          {/* Modèle économique */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">Modèle économique</h2>

            <div className="bg-white border border-neutral-200 p-6">
              <p className="text-neutral-700 mb-4">
                <strong>V1 (actuelle) : 100 % gratuit, sans publicité.</strong>{' '}
                L&apos;objectif est de construire une audience qualifiée avant toute monétisation.
              </p>
              <div className="border-l-4 border-neutral-300 pl-5 py-2 text-sm text-neutral-600">
                <p className="font-bold text-neutral-800 mb-2">V2 (future, si succès) : Partenariats courtiers</p>
                <p>CTA optionnel &quot;Être rappelé par un courtier&quot; · Commission lead qualifié · Partenaires sélectionnés · Identifiés clairement comme publicité.</p>
              </div>
              <p className="text-sm text-neutral-500 mt-4">
                Le calculateur restera <strong>toujours gratuit et sans inscription</strong>.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-5">Contact</h2>

            <div className="bg-white border border-neutral-200 p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Développeurs</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="https://github.com/nba67000/calculpatrimoine" className="text-neutral-900 hover:underline" target="_blank" rel="noopener noreferrer">Code source GitHub →</a></li>
                    <li><a href="https://github.com/nba67000/calculpatrimoine/issues" className="text-neutral-900 hover:underline" target="_blank" rel="noopener noreferrer">Reporter un bug →</a></li>
                    <li><a href="https://github.com/nba67000/calculpatrimoine/pulls" className="text-neutral-900 hover:underline" target="_blank" rel="noopener noreferrer">Contribuer (Pull Requests) →</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">Contact</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="mailto:contact@calculpatrimoine.fr" className="text-neutral-900 hover:underline">contact@calculpatrimoine.fr →</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-neutral-900 p-8 text-center text-white">
            <h3 className="font-serif text-2xl font-bold mb-3">Essayez les calculateurs</h3>
            <p className="text-neutral-400 mb-6 font-mono text-sm">Transparent · Gratuit · Sans inscription</p>
            <Link
              href="/"
              className="inline-block bg-white text-neutral-900 px-8 py-3 font-medium hover:bg-neutral-100 transition-colors"
            >
              Accueil →
            </Link>
          </div>

        </article>
      </div>
      <Footer />
    </>
  )
}
