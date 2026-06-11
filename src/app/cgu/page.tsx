// src/app/cgu/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata = {
 title: 'Conditions Générales d\'Utilisation - CalculPatrimoine',
 description: 'Conditions générales d\'utilisation de CalculPatrimoine - simulateurs patrimoniaux gratuits (rente viagère, assurance-vie, IFI, PER, TMI, plus-value immobilière)',
 alternates: { canonical: 'https://calculpatrimoine.fr/cgu' },
}

export default function CGUPage() {
 return (
 <>
 <Header />
 <PageHero
   breadcrumb={[
     { href: '/', label: 'Accueil' },
     { label: 'CGU' },
   ]}
   titre="Conditions générales d'utilisation"
   description="Objet du service, responsabilités, propriété intellectuelle, droit applicable."
 />
 <div className="bg-neutral-50 py-12">
 <div className="max-w-4xl mx-auto px-4">

 <div className="bg-white rounded-lg border border-neutral-200 p-8 space-y-8">
 
 {/* Article 1 */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
 <p className="text-neutral-700">
 CalculPatrimoine est un ensemble d&apos;outils pédagogiques gratuits de simulation
 patrimoniale, développé et maintenu par Nicolas Barbier. Le site propose des calculs
 indicatifs dans les domaines suivants : rente viagère, fiscalité de l&apos;assurance-vie,
 impôt sur la fortune immobilière (IFI), plan d&apos;épargne retraite (PER), taux marginal
 d&apos;imposition (TMI) et plus-value immobilière.
 Les calculs sont basés sur les textes officiels en vigueur (Code général des impôts,
 BOFiP, tables de mortalité INSEE) et les barèmes fiscaux 2026.
 </p>
 </section>

 {/* Article 2 */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">2. Acceptation des CGU</h2>
 <p className="text-neutral-700">
 L&apos;utilisation du site CalculPatrimoine implique l&apos;acceptation pleine et entière 
 des présentes Conditions Générales d&apos;Utilisation. Si vous n&apos;acceptez pas ces 
 conditions, veuillez ne pas utiliser ce site.
 </p>
 </section>

 {/* Article 3 */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">3. Nature du service</h2>

 <div className="space-y-4">
 <div>
 <h3 className="font-semibold text-lg mb-2 text-neutral-900">CalculPatrimoine FOURNIT :</h3>
 <ul className="list-disc list-inside space-y-1 text-neutral-700 ml-4">
 <li>Des calculs indicatifs basés sur des textes officiels et formules actuarielles reconnues</li>
 <li>Des informations pédagogiques sur la fiscalité et les produits patrimoniaux</li>
 <li>Un code source ouvert et vérifiable sur GitHub</li>
 <li>Des explications sur la réglementation applicable (CGI, BOFiP, tables INSEE)</li>
 </ul>
 </div>

 <div>
 <h3 className="font-semibold text-lg mb-2 text-neutral-900">CalculPatrimoine NE FOURNIT PAS :</h3>
 <ul className="list-disc list-inside space-y-1 text-neutral-700 ml-4">
 <li>De conseil personnalisé en investissement financier au sens de la directive MIF II</li>
 <li>De recommandation de souscription d&apos;un produit spécifique</li>
 <li>De garantie de résultat ou d&apos;exactitude absolue</li>
 <li>D&apos;intermédiation avec des compagnies d&apos;assurance ou tout autre acteur financier</li>
 <li>D&apos;avis juridique, fiscal ou successoral personnalisé</li>
 </ul>
 <p className="text-sm text-neutral-600 mt-3 italic">
 CalculPatrimoine n&apos;est pas enregistré comme conseiller en investissements financiers (CIF)
 auprès de l&apos;AMF, ni comme intermédiaire en assurance auprès de l&apos;ACPR.
 </p>
 </div>
 </div>
 </section>

 {/* Article 4 */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">4. Responsabilité de l&apos;utilisateur</h2>
 <p className="text-neutral-700 mb-3">En utilisant CalculPatrimoine, l&apos;utilisateur reconnaît et accepte :</p>
 <ul className="list-disc list-inside space-y-2 text-neutral-700 ml-4">
 <li>Utiliser l&apos;outil à titre <strong>indicatif et pédagogique uniquement</strong></li>
 <li>Que les résultats ne constituent en aucun cas un conseil personnalisé</li>
 <li>Devoir consulter un professionnel qualifié avant toute décision d&apos;investissement</li>
 <li>Que l&apos;éditeur ne peut être tenu responsable des décisions prises sur la base des calculs fournis</li>
 <li>Que les calculs peuvent différer des offres réelles des assureurs (frais, conditions spécifiques)</li>
 </ul>
 </section>

 {/* Article 5 */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">5. Limitation de responsabilité</h2>
 <div className="space-y-3 text-neutral-700">
 <p className="font-semibold">L&apos;éditeur ne garantit pas :</p>
 <ul className="list-disc list-inside space-y-2 ml-4">
 <li>L&apos;exactitude absolue des calculs, malgré tous les efforts déployés pour assurer leur fiabilité</li>
 <li>L&apos;absence totale d&apos;erreurs, de bugs ou d&apos;inexactitudes dans le code</li>
 <li>La disponibilité permanente et ininterrompue du service</li>
 <li>L&apos;adéquation des calculs à votre situation personnelle spécifique</li>
 <li>Que les résultats correspondent exactement aux offres commerciales des assureurs</li>
 </ul>

 <div className="mt-4 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
 <p className="text-sm">
 <strong>En cas d&apos;erreur constatée</strong>, nous vous encourageons vivement à nous 
 la signaler à l&apos;adresse : <a href="mailto:contact@calculpatrimoine.fr" className="text-neutral-900 hover:underline">contact@calculpatrimoine.fr</a>
 </p>
 </div>

 <p className="mt-4">
 L&apos;utilisateur reconnaît utiliser CalculPatrimoine à ses propres risques. En aucun cas, 
 l&apos;éditeur ne pourra être tenu responsable de dommages directs ou indirects résultant 
 de l&apos;utilisation du site ou de l&apos;impossibilité de l&apos;utiliser.
 </p>
 </div>
 </section>

 {/* Article 6 */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">6. Propriété intellectuelle</h2>
 <div className="text-neutral-700 space-y-3">
 <p>
 Le <strong>code source</strong> de CalculPatrimoine est distribué sous licence MIT (open-source). 
 Vous êtes libre de l&apos;utiliser, le modifier et le redistribuer selon les termes de cette licence.
 </p>
 <p>
 Les <strong>contenus éditoriaux</strong> (articles, guides, explications) sont protégés par 
 le droit d&apos;auteur © Nicolas Barbier. Toute reproduction, même partielle, nécessite une 
 autorisation préalable, sauf citation courte avec attribution de la source.
 </p>
 <p>
 Les <strong>données INSEE</strong> utilisées sont dans le domaine public et librement accessibles.
 </p>
 </div>
 </section>

 {/* Article 7 */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">7. Données personnelles</h2>
 <p className="text-neutral-700">
 CalculPatrimoine ne collecte <strong>aucune donnée personnelle identifiable</strong>. 
 Tous les calculs sont effectués localement dans votre navigateur. Pour plus de détails, 
 consultez notre{' '}
 <a href="/politique-confidentialite" className="text-neutral-900 hover:underline">
 Politique de Confidentialité
 </a>.
 </p>
 </section>

 {/* Article 8 */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">8. Modification des CGU</h2>
 <p className="text-neutral-700">
 L&apos;éditeur se réserve le droit de modifier les présentes CGU à tout moment. 
 Les modifications prennent effet dès leur mise en ligne. Il appartient à l&apos;utilisateur 
 de consulter régulièrement les CGU pour prendre connaissance des éventuelles modifications.
 </p>
 </section>

 {/* Article 9 */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">9. Droit applicable et juridiction</h2>
 <div className="text-neutral-700 space-y-2">
 <p>
 Les présentes CGU sont régies par le <strong>droit français</strong>.
 </p>
 <p>
 En cas de litige, une solution amiable sera recherchée en priorité. 
 À défaut d&apos;accord, tout litige relatif à l&apos;utilisation du site sera 
 soumis aux tribunaux compétents français.
 </p>
 </div>
 </section>

 {/* Contact */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
 <p className="text-neutral-700">
 Pour toute question concernant ces CGU :<br />
 <a href="mailto:contact@calculpatrimoine.fr" className="text-neutral-900 hover:underline font-medium">
 contact@calculpatrimoine.fr
 </a>
 </p>
 </section>

 {/* Footer */}
 <section className="text-sm text-neutral-500 border-t pt-4">
 <p>Version 1.1 - Dernière mise à jour : 07 mai 2026</p>
 </section>

 </div>
 </div>
 </div>
 <Footer />
 </>
 )
}
