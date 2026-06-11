import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import CrossLink from '@/components/CrossLink'
import type { ReactElement } from 'react'
import SchemaFAQ from '@/components/SchemaFAQ'
import { FAQ_ASSURANCE_VIE } from '@/lib/schema/schemaData'


export const metadata: Metadata = {
 title: 'FAQ Assurance-Vie : Fiscalité, Rachat et Optimisation',
 description: 'Questions fréquentes sur la fiscalité de l\'assurance-vie : PFU vs IR, abattement 8 ans, versements avant 2017, optimisation fiscale. Réponses d\'expert.',
 keywords: 'faq assurance vie, fiscalité rachat, pfu ou ir, abattement 8 ans, versements 2017, questions assurance vie',
 alternates: { canonical: 'https://calculpatrimoine.fr/faq/assurance-vie' },
}

interface FAQItem {
 question: string
 answer: string | ReactElement
 category: 'utilisation' | 'fiscalite' | 'cas-specifiques' | 'optimisation'
}

const faqItems: FAQItem[] = [
 // SECTION 1 : Utilisation du calculateur
 {
 category: 'utilisation',
 question: 'Mes données sont-elles stockées ou envoyées quelque part ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>Non, absolument pas.</strong>{' '}Tous les calculs sont effectués localement 
 dans votre navigateur, en JavaScript. Aucune donnée n&apos;est envoyée à un serveur, 
 stockée dans une base de données, ou conservée après la fermeture de votre navigateur.
 </p>
 <p>
 C&apos;est 100% privé et confidentiel. Vous pouvez même utiliser le calculateur 
 hors ligne si vous téléchargez la page.
 </p>
 </>
 )
 },
 {
 category: 'utilisation',
 question: 'Le calculateur fonctionne-t-il pour tous les types de contrats d\'assurance-vie ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>Oui</strong>, le calculateur s&apos;applique à tous les contrats d&apos;assurance-vie 
 français (monosupport, multisupport, fonds euros, unités de compte).
 </p>
 <p>
 La fiscalité au rachat est identique quel que soit le type de contrat. 
 Seules l&apos;ancienneté du contrat et la date des versements influencent les calculs.
 </p>
 </>
 )
 },
 {
 category: 'utilisation',
 question: 'Puis-je faire confiance aux résultats du calculateur ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>Oui.</strong>{' '}Toutes les formules sont conformes au Code Général des Impôts 
 (article 125-0 A) et au Bulletin Officiel des Finances Publiques.
 </p>
 <p className="mb-3">
 Le code source est open-source et vérifiable sur{' '}
 <a 
 href="https://github.com/nba67000/calculpatrimoine"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline"
>
 GitHub
 </a>.
 </p>
 <p>
 Les cas non couverts (versements &gt; 150 000 €, contrats luxembourgeois, rachats fractionnés multi-années) sont signalés dans cette FAQ.
 </p>
 </>
 )
 },

 // SECTION 2 : Fiscalité de base
 {
 category: 'fiscalite',
 question: 'Quelle est la différence entre PFU et IR + PS ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>PFU (Prélèvement Forfaitaire Unique)</strong> :<br />
 Taux fixe de 30% (12,8% impôt + 17,2% prélèvements sociaux), 
 quelle que soit votre tranche d&apos;imposition.
 </p>
 <p className="mb-3">
 <strong>IR + PS (Impôt sur le Revenu + Prélèvements Sociaux)</strong> :<br />
 Votre Tranche Marginale d&apos;Imposition (TMI) + 17,2% de prélèvements sociaux.
 </p>
 <p className="mb-3">
 <strong>Comment comparer les deux ?</strong>
 </p>
 <ul className="list-disc list-inside space-y-1 mb-3">
 <li>TMI à 0% : IR + PS = 17,2% | PFU = 30%</li>
 <li>TMI à 11% : IR + PS = 28,2% | PFU = 30%</li>
 <li>TMI à 30% : IR + PS = 47,2% | PFU = 30%</li>
 <li>TMI à 41% : IR + PS = 58,2% | PFU = 30%</li>
 </ul>
 <p className="bg-primary-50 border-l-4 border-primary-600 p-3 rounded text-sm">
 Le calculateur affiche les deux montants côte à côte et met en évidence l&apos;option la moins taxée. À TMI ≤ 11 %, l&apos;IR + PS est systématiquement moins coûteux que le PFU.
 </p>
 <div className="mt-4">
  <CrossLink href="/assurance-vie/fiscalite-rachat" title="Calculateur fiscalité des rachats" description="Simulez PFU vs IR sur votre situation : ancienneté, montant, TMI, versements avant 2017." />
 </div>
 </>
 )
 },
 {
 category: 'fiscalite',
 question: 'Comment fonctionne l\'abattement de 4 600€ / 9 200€ ?',
 answer: (
 <>
 <p className="mb-3">
 Si votre contrat a <strong>plus de 8 ans</strong>, vous bénéficiez d&apos;un abattement 
 annuel sur la plus-value taxable :
 </p>
 <ul className="list-disc list-inside mb-3">
 <li>4 600€ pour une personne seule</li>
 <li>9 200€ pour un couple marié ou pacsé</li>
 </ul>
 <p className="mb-3">
 Cet abattement s&apos;applique <strong>chaque année civile</strong>.
 </p>
 <p className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
 <strong>Exemple :</strong>Vous retirez 20 000€ avec 10 000€ de plus-value. 
 Après abattement : seuls 5 400€ seront taxés (10 000 - 4 600).
 </p>
 </>
 )
 },
 {
 category: 'fiscalite',
 question: 'On taxe le montant du rachat ou seulement la plus-value ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>Seule la plus-value est taxée</strong>, pas le capital que vous avez versé.
 </p>
 <p className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
 <strong>Exemple :</strong>Vous avez versé 70 000€, votre contrat vaut 100 000€, 
 vous retirez 30 000€.<br /><br />
 Plus-value totale = 30 000€ (100 000 - 70 000)<br />
 Taux de plus-value = 30%<br />
 Plus-value dans votre rachat = 30 000€ × 30% = 9 000€<br /><br />
 → Seuls ces 9 000€ seront taxés, pas les 30 000€ complets.
 </p>
 </>
 )
 },
 {
 category: 'fiscalite',
 question: 'Comment est calculée la part de plus-value dans mon rachat ?',
 answer: (
 <>
 <p className="mb-3">
 On applique la <strong>règle proportionnelle</strong> définie par le BOFiP :
 </p>
 <div className="bg-neutral-100 p-4 rounded font-mono text-sm mb-3">
 Plus-value dans rachat = Montant rachat × (Plus-value totale ÷ Capital total)
 </div>
 <p className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
 <strong>Exemple :</strong><br />
 Capital total : 100 000€<br />
 Versements totaux : 70 000€<br />
 Plus-value totale : 30 000€<br />
 Rachat : 20 000€<br /><br />
 → Plus-value dans rachat = 20 000 × (30 000 ÷ 100 000) = <strong>6 000€</strong>
 </p>
 </>
 )
 },

 // SECTION 3 : Cas spécifiques
 {
 category: 'cas-specifiques',
 question: 'Qu\'est-ce que la règle du 27 septembre 2017 ?',
 answer: (
 <>
 <p className="mb-3">
 Les versements effectués <strong>avant le 27/09/2017</strong> bénéficient d&apos;un taux 
 d&apos;imposition réduit pour les contrats de plus de 8 ans :
 </p>
 <ul className="list-disc list-inside mb-3">
 <li>7,5% d&apos;impôt (au lieu de 12,8%)</li>
 <li>+ 17,2% de prélèvements sociaux</li>
 <li>= <strong>24,7% au total</strong> (au lieu de 30%)</li>
 </ul>
 <p className="mb-3">
 Cette mesure a été instaurée par la loi de finances 2018.
 </p>
 <p className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
 <strong>À noter :</strong> Si vous avez versé avant cette date, indiquez-le
 dans le calculateur, c&apos;est la variable qui fait passer le taux de 30 % à 24,7 %.
 </p>
 </>
 )
 },
 {
 category: 'cas-specifiques',
 question: 'Comment savoir si j\'ai fait des versements avant le 27/09/2017 ?',
 answer: (
 <>
 <p className="mb-3">
 Consultez vos <strong>relevés annuels d&apos;assurance-vie</strong>. 
 Ils indiquent toutes les dates et montants de vos versements.
 </p>
 <p className="mb-3">
 Si votre contrat a été ouvert avant septembre 2017 et que vous avez fait 
 des versements réguliers, une partie est probablement concernée.
 </p>
 <p>
 Vous pouvez aussi contacter votre assureur qui vous fournira un relevé détaillé.
 </p>
 </>
 )
 },
 {
 category: 'cas-specifiques',
 question: 'Mon contrat a 7 ans et 10 mois. Dois-je attendre les 8 ans pour retirer ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>Impact fiscal d&apos;attendre :</strong>En attendant 2 mois, vous bénéficierez 
 de l&apos;abattement de 4 600€ (ou 9 200€ en couple).
 </p>
 <p className="mb-3">
 La différence fiscale peut atteindre plusieurs milliers d&apos;euros selon le montant 
 de votre plus-value.
 </p>
 <p className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded">
 <strong>Information :</strong>Le calculateur affiche cette différence si votre
 contrat a moins de 8 ans et compare les deux scénarios (rachat immédiat vs
 attendre 8 ans). La décision finale vous appartient selon vos besoins de liquidité.
 </p>
 <div className="mt-4">
  <CrossLink href="/assurance-vie/fiscalite-rachat" title="Simulez les deux scénarios" description="Calculez l'écart fiscal entre un rachat immédiat et attendre le seuil des 8 ans." />
 </div>
 </>
 )
 },
 {
 category: 'cas-specifiques',
 question: 'Je veux retirer 50 000€ mais je dépasse l\'abattement. Que faire ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>Option possible :</strong>Fractionner le rachat sur 2 ans.
 </p>
 <p className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded mb-3">
 <strong>Exemple :</strong><br />
 Au lieu de retirer 50 000€ cette année :<br />
 • 25 000€ cette année<br />
 • 25 000€ l&apos;année prochaine<br /><br />
 Abattement utilisé deux fois :<br />
 2 × 4 600€ = <strong>9 200€ au total</strong>
 </p>
 <p className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded text-sm">
 <strong>Information :</strong>Le calculateur affiche cette option de
 fractionnement et calcule la différence fiscale. Le choix vous appartient
 selon vos besoins de liquidité et votre situation personnelle.
 </p>
 <div className="mt-4">
  <CrossLink href="/assurance-vie/fiscalite-rachat" title="Simulez le fractionnement sur 2 ans" description="Saisissez 25 000€ deux fois et comparez l'économie fiscale réalisée." />
 </div>
 </>
 )
 },
 {
 category: 'cas-specifiques',
 question: 'Que se passe-t-il si j\'ai versé plus de 150 000€ sur mon contrat ?',
 answer: (
 <>
 <p className="mb-3">
 Au-delà de 150 000 € de versements post-27/09/2017 par personne, le taux
 préférentiel de 7,5 % ne s&apos;applique plus à l&apos;excédent : c&apos;est le taux standard
 de 12,8 % qui prend le relais (Art. 125-0 A CGI).
 </p>
 <p className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
 <strong>À noter :</strong> Le calculateur ne gère pas encore ce cas, consultez
 un notaire pour un calcul précis.
 </p>
 </>
 )
 },

 // SECTION 4 : Optimisation
 {
 category: 'optimisation',
 question: 'Quelle est la différence entre rachat partiel et rachat total ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>Rachat partiel :</strong>Vous retirez une partie du capital et conservez le contrat.
 </p>
 <p className="mb-3">
 <strong>Caractéristiques du rachat partiel :</strong>
 </p>
 <ul className="list-disc list-inside mb-3">
 <li>Conservation de l&apos;ancienneté du contrat (important si &gt; 8 ans)</li>
 <li>Possibilité de reverser de l&apos;argent plus tard sans repartir de zéro</li>
 <li>Fractionnement de la fiscalité sur plusieurs années</li>
 <li>Utilisation de l&apos;abattement annuel sur plusieurs rachats</li>
 </ul>
 <p className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded text-sm">
 <strong>À noter :</strong> Même pour un besoin total de capital, conserver
 une somme minimale (ex : 1 000 €) sur le contrat préserve son ancienneté.
 </p>
 </>
 )
 },
 {
 category: 'optimisation',
 question: 'Quelles sont les principales variables qui impactent la fiscalité ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>5 éléments qui influencent le montant d&apos;impôt :</strong>
 </p>
 <div className="space-y-3">
 <div className="bg-neutral-50 p-4 rounded">
 <strong>1. Ancienneté du contrat (seuil 8 ans)</strong><br />
 Contrat &lt; 8 ans : pas d&apos;abattement<br />
 Contrat ≥ 8 ans : abattement 4 600€ / 9 200€
 </div>
 <div className="bg-neutral-50 p-4 rounded">
 <strong>2. Fractionnement des rachats</strong><br />
 Rachat unique : abattement utilisé une fois<br />
 Rachats sur plusieurs années : abattement multiplié
 </div>
 <div className="bg-neutral-50 p-4 rounded">
 <strong>3. Choix PFU vs IR</strong><br />
 TMI à 11% : IR + PS = 28,2% | PFU = 30%<br />
 TMI à 30% : IR + PS = 47,2% | PFU = 30%
 </div>
 <div className="bg-neutral-50 p-4 rounded">
 <strong>4. Versements avant 27/09/2017</strong><br />
 Taux réduit à 24,7% au lieu de 30% pour ces versements
 </div>
 <div className="bg-neutral-50 p-4 rounded">
 <strong>5. Timing du rachat</strong><br />
 TMI variable selon les années (revenus fluctuants)
 </div>
 </div>
 <p className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded mt-3 text-sm">
 Chaque paramètre est modifiable en temps réel, les résultats se recalculent instantanément.
 </p>
 <div className="mt-4">
  <CrossLink href="/assurance-vie/fiscalite-rachat" title="Testez chaque variable en temps réel" description="Modifiez ancienneté, TMI, montant, versements avant 2017, l'impôt se recalcule instantanément." />
 </div>
 </>
 )
 },
 {
 category: 'optimisation',
 question: 'Le calculateur peut-il comparer plusieurs scénarios ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>Oui !</strong>Vous pouvez tester différents scénarios en temps réel :
 </p>
 <ul className="list-disc list-inside mb-3">
 <li>Rachat 50 000€ d&apos;un coup vs 25 000€ sur 2 ans</li>
 <li>Retrait immédiat vs dans 6 mois (si proche des 8 ans)</li>
 <li>PFU vs IR selon votre TMI</li>
 <li>Impact des versements avant 2017</li>
 </ul>
 <p className="mb-3">
 Le calculateur affiche pour chaque scénario :
 </p>
 <ul className="list-disc list-inside mb-3">
 <li>Comparaison PFU vs IR</li>
 <li>Différence entre les deux options</li>
 <li>Avertissement si vous dépassez l&apos;abattement annuel ou approchez du seuil des 8 ans</li>
 <li>Calcul de l&apos;économie fiscale si vous fractionnez le rachat sur 2 ans</li>
 </ul>
 <p className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded text-sm">
 Chaque paramètre est modifiable en temps réel, les résultats se recalculent instantanément.
 </p>
 <div className="mt-4">
  <CrossLink href="/assurance-vie/fiscalite-rachat" title="Ouvrez le calculateur" description="Modifiez chaque paramètre et comparez vos scénarios en temps réel." />
 </div>
 </>
 )
 },
 {
 category: 'optimisation',
 question: 'Puis-je utiliser le calculateur pour simuler un rachat futur ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>Oui, absolument.</strong>Vous pouvez :
 </p>
 <ul className="list-disc list-inside mb-3">
 <li>Simuler différents montants de rachat</li>
 <li>Tester l&apos;impact d&apos;une modification de votre TMI</li>
 <li>Anticiper la fiscalité si vous attendez X mois/années</li>
 <li>Comparer plusieurs scénarios côte à côte</li>
 </ul>
 <p className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded text-sm">
 <strong>Information pratique :</strong>Vous pouvez ouvrir plusieurs onglets
 du calculateur pour comparer différents scénarios simultanément.
 </p>
 <div className="mt-4">
  <CrossLink href="/assurance-vie/fiscalite-rachat" title="Simulez un rachat futur" description="Anticipez la fiscalité selon n'importe quel montant, horizon ou TMI, résultats immédiats." />
 </div>
 </>
 )
 },
 {
 category: 'optimisation',
 question: 'Où puis-je en apprendre plus sur la fiscalité de l\'assurance-vie ?',
 answer: (
 <>
 <p className="mb-3">
 <strong>Ressources CalculPatrimoine :</strong>
 </p>
 <ul className="list-disc list-inside mb-3">
 <li>
 <Link href="/blog/assurance-vie-fiscalite-rachat" className="text-primary-600 hover:underline">
 Article complet : Combien vous allez VRAIMENT payer
 </Link>
 {' '}(2 500 mots, exemples détaillés)
 </li>
 <li>
 <Link href="/assurance-vie" className="text-primary-600 hover:underline">
 Calculateur assurance-vie
 </Link>
 {' '}(section méthodologie avec sources)
 </li>
 </ul>
 <p className="mb-3">
 <strong>Sources officielles :</strong>
 </p>
 <ul className="list-disc list-inside">
 <li>
 {/* LEGIARTI000047956718 retiré le 2026-05-31 (HTTP 404). Cf. docs/broken-links-to-fix.md. */}
 <span className="font-medium text-neutral-700">Article 125-0 A du CGI</span>
 </li>
 <li>
 {/* BOFiP 2823 retiré le 2026-05-31 (URL re-route vers BNC). */}
 <span className="font-medium text-neutral-700">BOFiP-RPPM-RCM-20-10-20</span>
 </li>
 <li>
 <a 
 href="https://www.service-public.gouv.fr/particuliers/vosdroits/F22414"
 target="_blank"
 rel="noopener noreferrer"
 className="text-primary-600 hover:underline"
>
 Service-Public.fr
 </a>
 </li>
 </ul>
 </>
 )
 },
]

const categoryLabels = {
 'utilisation': 'Utilisation du calculateur',
 'fiscalite': 'Fiscalité de base',
 'cas-specifiques': 'Cas spécifiques',
 'optimisation': 'Comparaisons et scénarios',
}

export default function FAQAssuranceViePage() {
 const categories = ['utilisation', 'fiscalite', 'cas-specifiques', 'optimisation'] as const

 return (
 <>
 <Header />
 <SchemaFAQ items={FAQ_ASSURANCE_VIE} />
 <PageHero
   breadcrumb={[
     { href: '/', label: 'Accueil' },
     { href: '/faq', label: 'FAQ' },
     { label: 'Assurance-Vie' },
   ]}
   titre={<>Questions fréquentes<br />Assurance-Vie</>}
   description="PFU vs IR, abattement 8 ans, versements avant 2017 : les mécanismes fiscaux du rachat d'assurance-vie expliqués avec des chiffres."
 />
 <div className="bg-neutral-50">

 {/* Lien vers calculateur */}
 <div className="max-w-4xl mx-auto px-4 py-8">
 <Link
 href="/assurance-vie"
 className="block bg-primary-600 text-white rounded-xl p-6 hover:bg-primary-700 transition-colors group"
>
 <div className="flex items-center justify-between">
 <div>
 <div className="text-sm font-medium mb-1 text-primary-100">
 Calculateur Assurance-Vie
 </div>
 <div className="text-lg font-bold">
 Calculez votre fiscalité en 2 minutes
 </div>
 </div>
 <div className="text-3xl group-hover:translate-x-1 transition-transform">
 →
 </div>
 </div>
 </Link>
 </div>

 {/* FAQ par catégories */}
 <div className="max-w-4xl mx-auto px-4 py-8">
 {categories.map((category) => {
 const items = faqItems.filter(item => item.category === category)
 
 return (
 <div key={category} className="mb-12">
 <h2 className="text-2xl font-bold text-neutral-900 mb-6">
 {categoryLabels[category]}
 </h2>
 
 <div className="space-y-4">
 {items.map((item, index) => (
 <details
 key={index}
 className="bg-white rounded-xl border border-neutral-200 p-6 hover:border-primary-300 transition-colors group"
>
 <summary className="cursor-pointer font-bold text-lg text-neutral-900 group-hover:text-primary-600 transition-colors list-none">
 <div className="flex items-start gap-3">
 <span className="text-primary-600 mt-1 flex-shrink-0"></span>
 <span className="flex-1">{item.question}</span>
 <span className="text-neutral-400 group-open:rotate-180 transition-transform flex-shrink-0">
 ▼
 </span>
 </div>
 </summary>
 
 <div className="mt-4 pt-4 border-t border-neutral-200 text-neutral-700 leading-relaxed">
 {item.answer}
 </div>
 </details>
 ))}
 </div>
 </div>
 )
 })}
 </div>

 {/* CTA vers article */}
 <div className="max-w-4xl mx-auto px-4 py-12">
 <Link
 href="/blog/assurance-vie-fiscalite-rachat"
 className="block bg-primary-50 border-2 border-primary-200 rounded-xl p-8 hover:border-primary-400 hover:shadow-lg transition-all group"
>
 <div className="flex items-start gap-4">
 <div className="text-4xl"></div>
 <div className="flex-1">
 <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
 Article complet : Assurance-vie, combien vous allez VRAIMENT payer ?
 </h3>
 <p className="text-neutral-700 mb-4 leading-relaxed">
 Règle proportionnelle, PFU vs IR, fractionnement des rachats.
 Exemples chiffrés avec formules.
 </p>
 <div className="flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all">
 <span>Lire l&apos;article complet</span>
 <span>→</span>
 </div>
 </div>
 </div>
 </Link>
 </div>

 {/* Footer liens utiles */}
 <div className="max-w-4xl mx-auto px-4 py-12 border-t border-neutral-200">
 <div className="text-center">
 <h3 className="text-lg font-bold text-neutral-900 mb-4">
 Autres ressources
 </h3>
 <div className="flex flex-wrap justify-center gap-4">
 <Link
 href="/faq"
 className="text-primary-600 hover:underline"
>
 FAQ générale
 </Link>
 <span className="text-neutral-300">•</span>
 <Link
 href="/faq/rente-viagere"
 className="text-primary-600 hover:underline"
>
 FAQ Rente Viagère
 </Link>
 <span className="text-neutral-300">•</span>
 <Link
 href="/blog"
 className="text-primary-600 hover:underline"
>
 Tous les articles
 </Link>
 </div>
 </div>
 </div>
 </div>
 <Footer />
 </>
 )
}
