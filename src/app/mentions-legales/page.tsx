// src/app/mentions-legales/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata = {
 title: 'Mentions Légales - CalculPatrimoine',
 description: 'Mentions légales et informations obligatoires du site CalculPatrimoine.fr',
  alternates: { canonical: 'https://calculpatrimoine.fr/mentions-legales' },
}

export default function MentionsLegalesPage() {
 return (
 <>
 <Header />
 <PageHero
   breadcrumb={[
     { href: '/', label: 'Accueil' },
     { label: 'Mentions légales' },
   ]}
   titre="Mentions légales"
   description="Éditeur, hébergement, statut réglementaire, propriété intellectuelle."
 />
 <div className="bg-neutral-50 py-12">
 <div className="max-w-4xl mx-auto px-4">

 <div className="bg-white rounded-lg border border-neutral-200 p-8 space-y-8">
 
 {/* Éditeur */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
 <div className="text-neutral-700 space-y-2">
 <p><strong>Nom :</strong>Nicolas Barbier</p>
 <p><strong>Statut :</strong> Micro-entrepreneur</p>
 <p><strong>SIRET :</strong> À compléter</p>
 <p><strong>Adresse :</strong> Disponible sur demande à contact@calculpatrimoine.fr</p>
 <p><strong>Email :</strong> contact@calculpatrimoine.fr</p>
 <p><strong>Directeur de publication :</strong>Nicolas Barbier</p>
 </div>
 </section>

 {/* Statut réglementaire */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Statut réglementaire</h2>
 <div className="text-neutral-700 space-y-2">
 <p>
 CalculPatrimoine est un outil pédagogique à titre indicatif uniquement.
 Ce site <strong>n&apos;est pas enregistré</strong> comme :
 </p>
 <ul className="list-disc list-inside space-y-1 ml-4">
 <li>Conseiller en investissements financiers (CIF) au sens de l&apos;article L. 541-1 du Code monétaire et financier</li>
 <li>Intermédiaire en assurance auprès de l&apos;ACPR</li>
 <li>Prestataire de services d&apos;investissement au sens de la directive MIF II</li>
 </ul>
 <p className="text-sm text-neutral-500 mt-2">
 Les résultats produits ne constituent pas des recommandations personnalisées d&apos;investissement.
 </p>
 </div>
 </section>

 {/* Hébergement */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
 <div className="text-neutral-700 space-y-2">
 <p><strong>Hébergeur :</strong>Vercel Inc.</p>
 <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
 <p><strong>Site :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">https://vercel.com</a></p>
 </div>
 </section>

 {/* Propriété intellectuelle */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
 <div className="text-neutral-700 space-y-3">
 <p>
 Le code source de CalculPatrimoine est sous licence MIT et disponible publiquement sur GitHub.
 Toute personne peut l&apos;utiliser, le modifier et le redistribuer selon les termes de cette licence.
 </p>
 <p>
 Les tables de mortalité utilisées sont issues de l&apos;INSEE (Institut National de la Statistique 
 et des Études Économiques) et sont dans le domaine public.
 </p>
 <p>
 Les contenus éditoriaux (articles, textes explicatifs) sont © Nicolas Barbier et ne peuvent 
 être reproduits sans autorisation, sauf citation courte avec attribution.
 </p>
 </div>
 </section>

 {/* Cookies et données */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Cookies et données personnelles</h2>
 <div className="text-neutral-700 space-y-3">
 <p>
 Ce site utilise <strong>Vercel Web Analytics</strong>, une solution de mesure d&apos;audience 
 sans cookies intégrée à notre hébergeur, qui ne collecte aucune donnée personnelle identifiable.
 </p>
 <p>
 Aucun cookie de tracking n&apos;est déposé sur votre appareil, ce qui ne rend pas nécessaire 
 l&apos;affichage d&apos;un bandeau de consentement aux cookies.
 </p>
 <p>
 Pour plus d&apos;informations, consultez notre{' '}
 <a href="/politique-confidentialite" className="text-primary-600 hover:underline">
 Politique de Confidentialité
 </a>.
 </p>
 </div>
 </section>

 {/* Crédits */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Crédits</h2>
 <div className="text-neutral-700 space-y-2">
 <p><strong>Conception et développement :</strong>Nicolas Barbier</p>
 <p><strong>Données :</strong>INSEE - Tables de mortalité France 2022</p>
 <p><strong>Framework :</strong>Next.js 16, React, TypeScript, Tailwind CSS</p>
 </div>
 </section>

 {/* Contact */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Contact</h2>
 <div className="text-neutral-700">
 <p>
 Pour toute question concernant le site : <br />
 <a href="mailto:contact@calculpatrimoine.fr" className="text-primary-600 hover:underline font-medium">
 contact@calculpatrimoine.fr
 </a>
 </p>
 </div>
 </section>

 {/* Dernière MAJ */}
 <section className="text-sm text-neutral-500 border-t pt-4">
 <p>Dernière mise à jour : 07 mai 2026</p>
 </section>

 </div>
 </div>
 </div>
 <Footer />
 </>
 )
}
