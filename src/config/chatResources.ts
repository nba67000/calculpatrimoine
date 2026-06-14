// src/config/chatResources.ts
// Catalogue des ressources disponibles pour le chatbot.
// Chaque ressource déclare les slugs de calculateurs auxquels elle est liée
// afin que le système prompt puisse filtrer les suggestions pertinentes.

export type SlugCalculateur =
  | 'tmi'
  | 'per-individuel'
  | 'rente-viagere'
  | 'assurance-vie/fiscalite-rachat'
  | 'assurance-vie/transmission'
  | 'plus-value-immobiliere'

export type RessourceCalculateur = {
  type: 'calculateur'
  slug: SlugCalculateur
  titre: string
  description: string
  motsCles: string[]
}

export type RessourceBlog = {
  type: 'blog'
  slug: string           // chemin relatif depuis /blog/
  titre: string
  description: string
  motsCles: string[]
  calculateursLies: SlugCalculateur[]
}

export type RessourceLoi = {
  type: 'loi'
  ref: string            // ex : "Art. 125-0 A CGI"
  // url et sujet sont optionnels : retirés temporairement quand l'URL externe
  // est morte (cf. docs/broken-links-to-fix.md). Dans ce cas, seule la `ref`
  // est citée dans le contexte chat.
  url?: string
  sujet?: string
  calculateursLies: SlugCalculateur[]
}

export type RessourceDoctrine = {
  type: 'doctrine'
  ref: string            // ex : "BOFiP BOI-RPPM-RCM-20-10-20-50"
  url?: string
  sujet?: string
  calculateursLies: SlugCalculateur[]
}

export type Ressource =
  | RessourceCalculateur
  | RessourceBlog
  | RessourceLoi
  | RessourceDoctrine

// ---------------------------------------------------------------------------
// Calculateurs
// ---------------------------------------------------------------------------

export const CALCULATEURS: RessourceCalculateur[] = [
  {
    type: 'calculateur',
    slug: 'tmi',
    titre: 'Tranche marginale d\'imposition (TMI / IR)',
    description: 'Calcule la TMI, l\'IR net et le taux moyen à partir du revenu imposable et de la situation familiale.',
    motsCles: ['tmi', 'tranche', 'impôt sur le revenu', 'barème', 'quotient familial', 'décote'],
  },
  {
    type: 'calculateur',
    slug: 'per-individuel',
    titre: 'PER individuel - économie d\'impôt sur versement',
    description: 'Calcule l\'économie d\'impôt réalisée par un versement volontaire sur un PER individuel selon la TMI et le plafond disponible.',
    motsCles: ['per', 'plan épargne retraite', 'déduction', 'plafond', 'versement', 'économie impôt', 'tns', 'salarié'],
  },
  {
    type: 'calculateur',
    slug: 'rente-viagere',
    titre: 'Rente viagère',
    description: 'Calcule le seuil de rentabilité d\'une rente viagère, la fiscalité (quote-part imposable) et la comparaison classique / à rebours / couple.',
    motsCles: ['rente viagère', 'seuil rentabilité', 'espérance de vie', 'quote-part', 'abattement', 'tables tgh05 tgf05'],
  },
  {
    type: 'calculateur',
    slug: 'assurance-vie/fiscalite-rachat',
    titre: 'Fiscalité rachat assurance-vie',
    description: 'Compare les options PFU et IR pour un rachat partiel : abattement 8 ans, règle proportionnelle, versements avant 2017, seuil 150 000€.',
    motsCles: ['rachat', 'assurance vie', 'pfu', 'flat tax', 'abattement 8 ans', 'règle proportionnelle', '150 000', 'versements 2017'],
  },
  {
    type: 'calculateur',
    slug: 'assurance-vie/transmission',
    titre: 'Transmission assurance-vie (art. 990 I / 757 B)',
    description: 'Calcule les droits à la transmission pour chaque bénéficiaire selon le régime applicable (versements avant/après 70 ans).',
    motsCles: ['transmission', 'succession', 'bénéficiaire', '990 i', '757 b', '70 ans', 'abattement 152500', 'droits décès'],
  },
  {
    type: 'calculateur',
    slug: 'plus-value-immobiliere',
    titre: 'Plus-value immobilière',
    description: 'Calcule la fiscalité d\'une cession immobilière : IR 19 %, PS 18,6 %, abattements par durée de détention, surtaxe sur PV > 50 000 €.',
    motsCles: ['plus-value', 'immobilier', 'cession', 'abattement détention', 'surtaxe', '150 VC', '757 B', 'notaire', 'résidence secondaire'],
  },
]

// ---------------------------------------------------------------------------
// Articles de blog
// ---------------------------------------------------------------------------

export const ARTICLES_BLOG: RessourceBlog[] = [
  {
    type: 'blog',
    slug: 'rente-viagere-seuil-rentabilite',
    titre: 'Rente viagère : pourquoi le seuil de rentabilité est après votre espérance de vie',
    description: 'Explique pourquoi il est normal que le seuil de rentabilité dépasse l\'espérance de vie, avec exemple chiffré à 72 ans / 250 000€.',
    motsCles: ['seuil rentabilité', 'espérance de vie', 'rente viagère', 'rentabilité', 'tables mortalité'],
    calculateursLies: ['rente-viagere'],
  },
  {
    type: 'blog',
    slug: 'assurance-vie-fiscalite-rachat',
    titre: 'Assurance-vie : combien vous allez VRAIMENT payer sur un rachat (guide 2026)',
    description: 'Guide complet sur la fiscalité du rachat AV : règle proportionnelle, abattement 8 ans, PFU vs IR, versements avant 2017, exemples chiffrés.',
    motsCles: ['rachat', 'fiscalité', 'pfu', 'ir', 'abattement', 'règle proportionnelle', 'assurance vie', 'impôt'],
    calculateursLies: ['assurance-vie/fiscalite-rachat'],
  },
]

// ---------------------------------------------------------------------------
// Articles de loi (Légifrance)
// ---------------------------------------------------------------------------

export const ARTICLES_LOI: RessourceLoi[] = [
  {
    type: 'loi',
    ref: 'Art. 125-0 A CGI',
    url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044989424',
    sujet: 'Imposition des produits des contrats d\'assurance-vie et bons de capitalisation - taux PFU, abattement 8 ans, seuil 150 000€',
    calculateursLies: ['assurance-vie/fiscalite-rachat'],
  },
  {
    type: 'loi',
    ref: 'Art. 990 I CGI',
    url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047288653',
    sujet: 'Prélèvement sur capitaux décès AV (versements avant 70 ans) - abattement 152 500€/bénéficiaire, taux 20%/31,25%',
    calculateursLies: ['assurance-vie/transmission'],
  },
  {
    type: 'loi',
    ref: 'Art. 757 B CGI',
    url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047288569',
    sujet: 'Versements AV après 70 ans soumis aux droits de succession - abattement global 30 500€, exonération des plus-values',
    calculateursLies: ['assurance-vie/transmission'],
  },
  {
    // Art 777 : URL LEGIARTI000044981950 confirmée 404 (crawl 2026-05-31 round 2).
    // À reconstruire avec un nouveau LEGIARTI.
    type: 'loi',
    ref: 'Art. 777 CGI',
    calculateursLies: ['assurance-vie/transmission'],
  },
  {
    type: 'loi',
    ref: 'Art. 779 CGI',
    url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000026292566',
    sujet: 'Abattements succession : 100 000€ par enfant, 15 932€ frère/sœur, 7 967€ neveu/nièce',
    calculateursLies: ['assurance-vie/transmission'],
  },
  {
    type: 'loi',
    ref: 'Art. 163 quatervicies CGI',
    calculateursLies: ['per-individuel'],
  },
  {
    type: 'loi',
    ref: 'Art. 197 CGI',
    calculateursLies: ['tmi', 'per-individuel'],
  },
  {
    type: 'loi',
    ref: 'Art. 150 U CGI',
    url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053544910',
    sujet: 'Champ d\'application des plus-values immobilières des particuliers - résidence principale, cessions exonérées',
    calculateursLies: ['plus-value-immobiliere'],
  },
  {
    type: 'loi',
    ref: 'Art. 150 VC CGI',
    url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047970756',
    sujet: 'Abattement IR pour durée de détention : 6 %/an de la 6e à la 21e année, 4 % la 22e - exonération totale à 22 ans',
    calculateursLies: ['plus-value-immobiliere'],
  },
  {
    type: 'loi',
    ref: 'Art. 1609 nonies G CGI',
    url: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048806252',
    sujet: 'Surtaxe sur plus-values élevées : s\'applique si PV nette IR > 50 000 € - taux de 2 % à 6 %',
    calculateursLies: ['plus-value-immobiliere'],
  },
]

// ---------------------------------------------------------------------------
// Doctrine administrative (BOFiP)
// ---------------------------------------------------------------------------

export const DOCTRINE: RessourceDoctrine[] = [
  {
    type: 'doctrine',
    ref: 'BOFiP BOI-RPPM-RCM-20-10-20-50',
    url: 'https://bofip.impots.gouv.fr/bofip/3951-PGP.html/identifiant=BOI-RPPM-RCM-20-10-20-50-20220630',
    sujet: 'Produits des contrats d\'assurance-vie : taux d\'imposition selon ancienneté et date des versements',
    calculateursLies: ['assurance-vie/fiscalite-rachat'],
  },
  {
    type: 'doctrine',
    ref: 'BOFiP BOI-TCAS-AUT-60',
    url: 'https://bofip.impots.gouv.fr/bofip/1335-PGP.html/identifiant=BOI-TCAS-AUT-60-20230330',
    sujet: 'Prélèvement Art. 990 I - abattement 152 500€, taux, exonération conjoint/PACS',
    calculateursLies: ['assurance-vie/transmission'],
  },
  {
    type: 'doctrine',
    ref: 'BOFiP BOI-ENR-DMTG-10-10-20-20',
    url: 'https://bofip.impots.gouv.fr/bofip/3456-PGP.html/identifiant=BOI-ENR-DMTG-10-10-20-20-20230330',
    sujet: 'Contrats Art. 757 B - règles droits de succession sur versements après 70 ans',
    calculateursLies: ['assurance-vie/transmission'],
  },
  {
    type: 'doctrine',
    ref: 'BOFiP BOI-IR-BASE-20-50-10',
    url: 'https://bofip.impots.gouv.fr/bofip/2034-PGP.html',
    sujet: 'Plafond de déduction PER - calcul, report N-3, règle TNS (Madelin)',
    calculateursLies: ['per-individuel'],
  },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Toutes les ressources non-calculateur liées à un slug donné */
export function getRessourcesPourCalculateur(slug: SlugCalculateur): (RessourceBlog | RessourceLoi | RessourceDoctrine)[] {
  return [
    ...ARTICLES_BLOG.filter(r => r.calculateursLies.includes(slug)),
    ...ARTICLES_LOI.filter(r => r.calculateursLies.includes(slug)),
    ...DOCTRINE.filter(r => r.calculateursLies.includes(slug)),
  ]
}

/** Tous les calculateurs sauf celui en cours (pour redirection) */
export function getAutresCalculateurs(slugActuel: SlugCalculateur): RessourceCalculateur[] {
  return CALCULATEURS.filter(c => c.slug !== slugActuel)
}
