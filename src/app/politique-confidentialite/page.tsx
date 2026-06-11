// src/app/politique-confidentialite/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'

export const metadata = {
 title: 'Politique de Confidentialité - CalculPatrimoine',
 description: 'Politique de confidentialité et protection des données personnelles sur CalculPatrimoine',
  alternates: { canonical: 'https://calculpatrimoine.fr/politique-confidentialite' },
}

export default function PolitiqueConfidentialitePage() {
 return (
 <>
 <Header />
 <PageHero
   breadcrumb={[
     { href: '/', label: 'Accueil' },
     { label: 'Confidentialité' },
   ]}
   titre="Politique de confidentialité"
   description="Aucune donnée personnelle identifiable n'est collectée. Les calculs s'exécutent dans votre navigateur."
 />
 <div className="bg-neutral-50 py-12">
 <div className="max-w-4xl mx-auto px-4">

 <div className="bg-white rounded-lg border border-neutral-200 p-8 space-y-8">
 
 {/* Intro */}
 <section>
 <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
 <p className="text-primary-900 font-medium">
 CalculPatrimoine ne collecte <strong>aucune donnée personnelle identifiable</strong> et n&apos;utilise aucun cookie de tracking.
 </p>
 </div>
 <p className="text-neutral-700">
 Cette politique de confidentialité explique comment nous traitons les informations 
 dans le cadre de votre utilisation du site CalculPatrimoine.fr.
 </p>
 <p className="text-sm text-neutral-500 mt-2">
 Dernière mise à jour : 24 avril 2026
 </p>
 </section>

 {/* Ce que nous NE collectons PAS */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Ce que nous NE collectons PAS</h2>
 <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
 <ul className="space-y-2 text-neutral-700">
 <li className="flex items-start gap-2">
 <span className="text-primary-600 font-bold">•</span>
 <span>Nom, prénom, adresse email ou numéro de téléphone</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 font-bold">•</span>
 <span>Adresse IP complète (elle est anonymisée, cf. ci-dessous)</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 font-bold">•</span>
 <span>Montants de capital, âges ou situations personnelles que vous saisissez dans les calculateurs</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 font-bold">•</span>
 <span>Cookies de tracking, cookies publicitaires ou cookies tiers</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 font-bold">•</span>
 <span>Données de navigation cross-site (pas de fingerprinting persistant)</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 font-bold">•</span>
 <span>Compte utilisateur, historique de calculs ou profils personnalisés</span>
 </li>
 </ul>
 </div>
 </section>

 {/* Ce que nous collectons */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Ce que nous collectons (anonyme et agrégé)</h2>
 <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
 <p className="text-neutral-700 mb-4">
 Nous utilisons <strong>Vercel Web Analytics</strong>, une solution de mesure d&apos;audience
 sans cookies, intégrée à notre hébergeur Vercel. Elle nous permet de mesurer la fréquentation 
 du site sans identifier les visiteurs individuellement.
 </p>
 <ul className="space-y-2 text-neutral-700">
 <li className="flex items-start gap-2">
 <span className="text-primary-600 font-bold">✓</span>
 <span>Pages visitées (sans identification de l&apos;utilisateur)</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 font-bold">✓</span>
 <span>Pays et région d&apos;origine (niveau géographique large, pas de ville précise)</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 font-bold">✓</span>
 <span>Type d&apos;appareil et navigateur (desktop/mobile/tablette, de manière agrégée)</span>
 </li>
 <li className="flex items-start gap-2">
 <span className="text-primary-600 font-bold">✓</span>
 <span>Source de trafic (moteur de recherche, lien direct, etc.)</span>
 </li>
 </ul>
 <p className="text-sm text-neutral-600 mt-4">
 <strong>Important : </strong>Vercel Analytics calcule un identifiant visiteur à partir 
 d&apos;un hash de l&apos;adresse IP et du user-agent, renouvelé chaque jour. Cet identifiant 
 ne permet pas de reconnaître un visiteur d&apos;une journée sur l&apos;autre et n&apos;est 
 jamais partagé avec des tiers. Aucune donnée ne permet de vous identifier personnellement.
 </p>
 </div>
 </section>

 {/* Calculs locaux */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Calculs effectués localement</h2>
 <div className="text-neutral-700 space-y-3">
 <p>
 <strong>Tous les calculs (rente viagère, assurance-vie, transmission) sont effectués 
 directement dans votre navigateur</strong>, côté client (frontend), grâce à JavaScript.
 </p>
 <p className="font-semibold text-primary-700">
 Aucune donnée que vous saisissez (âge, capital, situation familiale) n&apos;est 
 transmise à nos serveurs ou stockée où que ce soit.
 </p>
 <p>
 Vos informations restent 100% privées et disparaissent dès que vous fermez votre navigateur 
 ou rechargez la page.
 </p>
 </div>
 </section>

 {/* Vercel Analytics */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Pourquoi Vercel Web Analytics ?</h2>
 <div className="text-neutral-700 space-y-3">
 <p>
 Nous avons choisi Vercel Web Analytics pour ses caractéristiques respectueuses de la vie privée :
 </p>
 <ul className="list-disc list-inside space-y-2 ml-4">
 <li>Aucun cookie déposé sur votre appareil</li>
 <li>Pas de collecte de données personnelles identifiables</li>
 <li>Pas de vente ni de partage de données à des tiers publicitaires</li>
 <li>Identifiant visiteur renouvelé quotidiennement (pas de suivi persistant)</li>
 <li>Statistiques entièrement anonymes et agrégées</li>
 <li>Intégré nativement à notre hébergeur (pas de service tiers additionnel)</li>
 </ul>
 <p className="mt-4 text-sm text-neutral-600">
 Vercel Analytics est fourni par Vercel Inc. (société américaine). Dans ce cadre, 
 certaines données techniques peuvent transiter par des serveurs situés hors Union européenne. 
 Ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne 
 et le cadre Data Privacy Framework.
 </p>
 </div>
 </section>

 {/* Vos droits RGPD */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Vos droits (RGPD)</h2>
 <div className="text-neutral-700 space-y-3">
 <p>
 Bien que nous ne collections aucune donnée personnelle identifiable, 
 conformément au Règlement Général sur la Protection des Données (RGPD), 
 vous disposez des droits suivants :
 </p>
 <ul className="list-disc list-inside space-y-1 ml-4">
 <li>Droit d&apos;accès à vos données</li>
 <li>Droit de rectification</li>
 <li>Droit à l&apos;effacement</li>
 <li>Droit d&apos;opposition au traitement</li>
 <li>Droit à la portabilité</li>
 </ul>
 <p className="mt-4">
 Pour exercer ces droits ou pour toute question concernant vos données personnelles, 
 contactez-nous à : <a href="mailto:contact@calculpatrimoine.fr" className="text-primary-600 hover:underline font-medium">contact@calculpatrimoine.fr</a>
 </p>
 </div>
 </section>

 {/* Conservation */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Conservation des données</h2>
 <div className="text-neutral-700">
 <p>
 Les statistiques agrégées collectées via Vercel Web Analytics sont conservées 
 conformément à la politique de rétention de Vercel (généralement <strong>1 à 12 mois</strong> selon 
 le type de métrique), après quoi elles sont automatiquement supprimées ou agrégées de manière 
 définitivement anonyme.
 </p>
 </div>
 </section>

 {/* Cookies */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
 <div className="text-neutral-700 space-y-3">
 <p>
 CalculPatrimoine <strong>n&apos;utilise pas de cookies de tracking</strong> nécessitant 
 votre consentement.
 </p>
 <p>
 Vercel Web Analytics ne dépose aucun cookie sur votre appareil. C&apos;est pourquoi 
 vous ne voyez pas de bandeau de consentement aux cookies sur ce site (conformément à la 
 réglementation, un tel bandeau n&apos;est obligatoire que si des cookies de tracking ou 
 équivalents sont utilisés).
 </p>
 </div>
 </section>

 {/* Sécurité */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Sécurité</h2>
 <div className="text-neutral-700">
 <p>
 Nous mettons en œuvre des mesures de sécurité appropriées pour protéger nos systèmes, 
 notamment :
 </p>
 <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
 <li>Connexion HTTPS sécurisée (chiffrement SSL/TLS)</li>
 <li>Hébergement sur infrastructure Vercel (certifiée et sécurisée)</li>
 <li>Code source ouvert et auditable publiquement</li>
 </ul>
 </div>
 </section>

 {/* Modifications */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Modifications de cette politique</h2>
 <div className="text-neutral-700">
 <p>
 Nous pouvons être amenés à mettre à jour cette politique de confidentialité. 
 La date de dernière modification est indiquée en haut de cette page. 
 Toute modification substantielle sera communiquée de manière appropriée.
 </p>
 </div>
 </section>

 {/* Contact */}
 <section>
 <h2 className="text-2xl font-semibold mb-4">Contact</h2>
 <div className="text-neutral-700">
 <p>
 Pour toute question concernant cette politique de confidentialité ou 
 le traitement de vos données :
 </p>
 <p className="mt-2">
 <strong>Email : </strong>{' '}
 <a href="mailto:contact@calculpatrimoine.fr" className="text-primary-600 hover:underline font-medium">
 contact@calculpatrimoine.fr
 </a>
 </p>
 </div>
 </section>

 {/* Footer */}
 <section className="text-sm text-neutral-500 border-t pt-4">
 <p>Version 1.1 - Dernière mise à jour : 24 avril 2026</p>
 </section>

 </div>
 </div>
 </div>
 <Footer />
 </>
 )
}
