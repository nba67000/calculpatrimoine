// src/lib/succession.ts
//
// Calcul des droits de succession par héritier.
// Réutilise barème Art. 777 CGI + abattements Art. 779 (mêmes que donation),
// ajoute l'exonération conjoint/PACS Loi TEPA 2007 (Art. 796-0 bis CGI).

import type {
  SuccessionInputs,
  SuccessionResults,
  LienHeritier,
  TrancheSuccession,
  DetailHeritier,
  HeritierSuccession,
} from '@/types/succession'
import type { CalculatorModule } from '@/lib/calculators/types'
import { formatEurRounded as eur, formatLigne as ligne } from '@/lib/formatters'
import {
  appliquerBareme,
  getBaremePourLien,
  BAREME_LIGNE_DIRECTE,
  ABATTEMENTS_ART_779,
  ABATTEMENT_PETIT_ENFANT_SUCCESSION,
  ABATTEMENT_DEFAUT_ART_788,
} from '@/lib/fiscal/baremesArt777'

export const SOURCES_SUCCESSION = [
  // Cf. docs/broken-links-to-fix.md pour le statut des URLs Légifrance.
  { label: 'Article 777 du CGI' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000026292566', label: 'Article 779 du CGI', desc: 'Abattements personnels par lien de parenté (100 000 € enfant, 15 932 € frère-sœur, etc.)' },
  { label: 'Article 784 du CGI', desc: 'Rappel fiscal des donations antérieures (15 ans)' },
  { label: 'Article 796-0 bis du CGI', desc: 'Exonération totale du conjoint survivant et partenaire de PACS (Loi TEPA 2007 art. 8)' },
  { label: 'Article 796-0 ter du CGI', desc: 'Exonération totale frère/sœur célibataire/veuf/divorcé/séparé, >50 ans ou invalide, cohabitant 5 ans (Loi TEPA 2007 art. 10)' },
  { href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F14198', label: 'Service-public.gouv.fr F14198', desc: '3 conditions cumulatives Art. 796-0 ter (vérifié 2026-06-14)' },
  { label: 'BOFiP BOI-ENR-DMTG-10-20-10', desc: '§ 30 (statut civil au jour du décès), § 40 (âge ou infirmité), § 50 (domicile commun, tolérance EHPAD) - identifiant complet -20180619 vérifié 2026-06-14' },
  { href: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000278649', label: 'Loi TEPA 2007', desc: 'Loi en faveur du travail, de l\'emploi et du pouvoir d\'achat' },
]

// ─────────────────────────────────────────────────────────────
// Abattements en succession (cas particuliers vs donation)
// ─────────────────────────────────────────────────────────────
//
// En succession :
// - Conjoint/PACS : exonérés totalement (Loi TEPA, traité en amont).
// - Petit-enfant et autres : abattement par défaut Art. 788 (1 594 €).
// - Les autres abattements suivent Art. 779 CGI standard (cf. baremesArt777.ts).
//
// On dérive donc d'ABATTEMENTS_ART_779 en surchargeant les cas spécifiques
// succession.

const ABATTEMENTS: Record<LienHeritier, number> = {
  enfant:       ABATTEMENTS_ART_779.enfant,        // 100 000 €
  epoux_pacs:   ABATTEMENTS_ART_779.epoux_pacs,    // 80 724 € (jamais appliqué - exonéré TEPA)
  parent:       ABATTEMENTS_ART_779.parent,        // 100 000 €
  petit_enfant: ABATTEMENT_PETIT_ENFANT_SUCCESSION, // 1 594 € (≠ donation : 31 865 €)
  frere_soeur:  ABATTEMENTS_ART_779.frere_soeur,   // 15 932 €
  neveu_niece:  ABATTEMENTS_ART_779.neveu_niece,   // 7 967 €
  autre_4e:     ABATTEMENT_DEFAUT_ART_788,         // 1 594 €
  non_parent:   ABATTEMENT_DEFAUT_ART_788,         // 1 594 €
}

function getBareme(lien: LienHeritier) {
  // En succession, conjoint/PACS sont exonérés (TEPA, traité en amont).
  // Le barème renvoyé pour epoux_pacs n'est pas appliqué , on retourne
  // ligne directe par sécurité.
  if (lien === 'epoux_pacs') return BAREME_LIGNE_DIRECTE
  return getBaremePourLien(lien)
}

/**
 * Vérifie si un frère ou une sœur du défunt remplit les 3 conditions cumulatives
 * de l'Article 796-0 ter CGI (exonération totale de droits de succession, Loi TEPA 2007 art. 10).
 *
 * Conditions cumulatives (BOFiP BOI-ENR-DMTG-10-20-10 §§ 30-50) :
 * 1. Statut civil au jour du décès : célibataire, veuf, divorcé ou séparé de corps.
 *    Les frères/sœurs **mariés** ou **PACSÉS** (y compris pacsés entre eux) sont exclus.
 * 2. Être âgé de plus de 50 ans **ou** atteint d'une infirmité empêchant de subvenir
 *    à ses besoins par le travail (aucun taux d'invalidité minimal légal).
 * 3. Avoir été constamment domicilié avec le défunt pendant les 5 années précédant
 *    le décès. Tolérance hospitalisation / EHPAD si les 5 ans étaient déjà acquis
 *    au moment du départ pour raison de santé.
 *
 * Les conditions ne sont vérifiées que pour les héritiers `frere_soeur`.
 * Pour tout autre lien, retourne false.
 */
/**
 * Diagnostic détaillé des 3 conditions Art. 796-0 ter pour un héritier frère/sœur.
 * Utilisé par l'UI/warnings pour expliquer à l'utilisateur quelles conditions
 * manquent quand l'exonération ne se déclenche pas.
 */
function diagnostic796_0_ter(heritier: HeritierSuccession): {
  exonere: boolean
  manquantes: string[]
  eligibleSiCorrige: string[]
} {
  if (heritier.lien !== 'frere_soeur') {
    return { exonere: false, manquantes: [], eligibleSiCorrige: [] }
  }

  const manquantes: string[] = []
  const eligibleSiCorrige: string[] = []

  // Condition 1
  const statutsEligibles = ['celibataire', 'veuf', 'divorce', 'separe'] as const
  const statutEligible =
    heritier.statutCivilTEPA !== undefined &&
    (statutsEligibles as readonly string[]).includes(heritier.statutCivilTEPA)
  if (!statutEligible) {
    if (heritier.statutCivilTEPA === 'marie' || heritier.statutCivilTEPA === 'pacse') {
      manquantes.push('le statut civil n\'est pas éligible (mariage ou PACS incompatibles)')
    } else {
      manquantes.push('le statut civil au jour du décès n\'est pas renseigné')
      eligibleSiCorrige.push('statut civil')
    }
  }

  // Condition 2
  if (!heritier.ageSup50OuInvalide) {
    manquantes.push('la condition d\'âge (>50 ans) ou d\'invalidité n\'est pas remplie')
    eligibleSiCorrige.push('âge ou invalidité')
  }

  // Condition 3
  if (!heritier.cohabitation5AnsDefunt) {
    manquantes.push('la cohabitation 5 ans avec le défunt n\'est pas confirmée')
    eligibleSiCorrige.push('cohabitation 5 ans')
  }

  return {
    exonere: manquantes.length === 0,
    manquantes,
    eligibleSiCorrige,
  }
}

function estExonere796_0_ter(heritier: HeritierSuccession): boolean {
  if (heritier.lien !== 'frere_soeur') return false

  // Condition 1 : statut civil éligible (célibataire / veuf / divorcé / séparé)
  const statutsEligibles = ['celibataire', 'veuf', 'divorce', 'separe'] as const
  const statutEligible =
    heritier.statutCivilTEPA !== undefined &&
    (statutsEligibles as readonly string[]).includes(heritier.statutCivilTEPA)
  if (!statutEligible) return false

  // Condition 2 : > 50 ans OU infirmité empêchant de travailler
  if (!heritier.ageSup50OuInvalide) return false

  // Condition 3 : cohabitation 5 ans avec le défunt
  if (!heritier.cohabitation5AnsDefunt) return false

  return true
}

/**
 * Calcule les droits de succession pour chaque héritier.
 *
 * Règles appliquées :
 * - Conjoint et partenaire de PACS : exonérés totalement (Art. 796-0 bis CGI, Loi TEPA 2007 art. 8).
 * - Frère/sœur cohabitant : exonération totale Art. 796-0 ter CGI (Loi TEPA 2007 art. 10)
 *   si 3 conditions cumulatives au jour du décès : (1) célibataire/veuf/divorcé/séparé,
 *   (2) >50 ans ou invalide, (3) cohabitation 5 ans avec le défunt.
 * - Pour les autres héritiers : abattement personnel Art. 779 CGI + barème Art. 777 CGI selon le lien.
 * - Rappel 15 ans (Art. 784 CGI) : si le défunt avait fait des donations à l'héritier
 *   dans les 15 années avant son décès, l'abattement déjà utilisé n'est plus disponible,
 *   et le calcul démarre dans une tranche plus haute du barème.
 *
 * @example
 * // Enfant unique recevant 250 000 € sans donation antérieure
 * calculerSuccession({
 *   actifNetSuccessoral: 250000,
 *   heritiers: [{ id: '1', nom: 'Enfant', lien: 'enfant', partRecue: 250000, donationsAnterieures: 0 }],
 * })
 * // → Abattement 100 000 €, base taxable 150 000 €, droits ≈ 28 194 €.
 *
 * @example
 * // Frère célibataire 60 ans cohabitant 8 ans, exonération Art. 796-0 ter
 * calculerSuccession({
 *   actifNetSuccessoral: 200000,
 *   heritiers: [{
 *     id: '1', nom: 'Frère', lien: 'frere_soeur', partRecue: 200000,
 *     donationsAnterieures: 0,
 *     statutCivilTEPA: 'celibataire',
 *     ageSup50OuInvalide: true,
 *     cohabitation5AnsDefunt: true,
 *   }],
 * })
 * // → Exonération totale TEPA, droits 0 €, net reçu 200 000 €.
 */
export function calculerSuccession(inputs: SuccessionInputs): SuccessionResults {
  const detailHeritiers: DetailHeritier[] = []
  const warnings: SuccessionResults['warnings'] = []
  const optimisations: SuccessionResults['optimisations'] = []

  let totalDroits = 0
  let totalNetRecu = 0

  // 1. Vérification : la somme des parts reçues colle à l'actif successoral
  const sommeParts = inputs.heritiers.reduce((s, h) => s + h.partRecue, 0)
  if (Math.abs(sommeParts - inputs.actifNetSuccessoral) > 1) {
    warnings.push({
      type: 'warning',
      message: `La somme des parts reçues (${eur(sommeParts)}) ne correspond pas à l'actif net successoral saisi (${eur(inputs.actifNetSuccessoral)}). Les calculs portent sur les parts saisies.`,
    })
  }

  // 2. Calcul par héritier
  for (const h of inputs.heritiers) {
    // Primes 757 B (après quote-part de l'abattement global 30 500 €) agrégées
    // à la part successorale ordinaire. Cf. BOFiP BOI-ENR-DMTG-10-10-20-20 § 230 :
    // les sommes 757 B "donnent ouverture aux droits de mutation par décès dans les
    // conditions de droit commun", barème et abattements Art. 779 communs.
    const primes757B = h.primes757B ?? 0
    const partAgregee = h.partRecue + primes757B

    // 2a. Exonérations Loi TEPA 2007 :
    //  - Conjoint / partenaire PACS (Art. 796-0 bis CGI)
    //  - Frère/sœur cohabitant remplissant les 3 conditions cumulatives (Art. 796-0 ter CGI)
    //
    // Note d'agrégation TEPA + primes 757 B : le BOFiP BOI-ENR-DMTG-10-20-10
    // n'explicite pas le sort des sommes 757 B reçues par un frère/sœur exonéré
    // 796-0 ter. Par cohérence avec le silo conjoint (où l'exonération TEPA
    // couvre l'agrégat part successorale + primes 757 B), on étend l'exonération
    // à l'agrégat pour le frère/sœur 796-0 ter. Justification : l'Art. 757 B
    // soumet les primes aux droits de mutation "dans les conditions de droit
    // commun suivant le degré de parenté" ; si la part successorale ordinaire
    // de ce parent est exonérée, l'assimilation conduit logiquement à exonérer
    // également les primes 757 B agrégées.
    const exonereConjoint = h.lien === 'epoux_pacs'
    const exonereFrereSoeurTEPA = estExonere796_0_ter(h)
    if (exonereConjoint || exonereFrereSoeurTEPA) {
      const motif: DetailHeritier['motifExoneration'] = exonereConjoint
        ? 'conjoint_pacs_796_0_bis'
        : 'frere_soeur_796_0_ter'
      detailHeritiers.push({
        id: h.id,
        nom: h.nom,
        lien: h.lien,
        partRecue: partAgregee, // on expose l'agrégat pour cohérence d'affichage
        abattementApplique: partAgregee, // l'intégralité est "abattue"
        baseTaxable: 0,
        droits: 0,
        netRecu: partAgregee,
        exonereLoiTEPA: true,
        motifExoneration: motif,
        detailTranches: [],
      })
      totalNetRecu += partAgregee
      continue
    }

    // 2b. Abattement personnel après rappel 15 ans
    const abattementMax = ABATTEMENTS[h.lien]
    const abattementConsomme = Math.min(h.donationsAnterieures, abattementMax)
    const abattementApplique = Math.max(0, abattementMax - abattementConsomme)

    // 2c. Base taxable : agrégation succession + 757 B, puis abattement personnel UNIQUE
    const baseTaxable = Math.max(0, partAgregee - abattementApplique)

    // 2d. Tranches consommées par les donations antérieures (au-delà de l'abattement)
    const tranchesConsomees = Math.max(0, h.donationsAnterieures - abattementMax)

    // 2e. Application du barème (utilise le module fiscal partagé) — UNE PASSE sur l'agrégat
    const bareme = getBareme(h.lien)
    const { droits, detail } = appliquerBareme(baseTaxable, tranchesConsomees, bareme)

    // Adaptation type detail vers TrancheSuccession (compatible shape)
    const detailSuccession: TrancheSuccession[] = detail

    const droitsArrondis = Math.round(droits)
    detailHeritiers.push({
      id: h.id,
      nom: h.nom,
      lien: h.lien,
      partRecue: partAgregee, // on expose l'agrégat (succession + 757 B)
      abattementApplique,
      baseTaxable,
      droits: droitsArrondis,
      netRecu: partAgregee - droitsArrondis,
      exonereLoiTEPA: false,
      detailTranches: detailSuccession,
    })

    totalDroits += droitsArrondis
    totalNetRecu += partAgregee - droitsArrondis

    // 2f. Warnings/optimisations par héritier
    if (h.donationsAnterieures > 0 && abattementConsomme > 0) {
      warnings.push({
        type: 'info',
        message: `${h.nom} : les donations reçues du défunt depuis moins de 15 ans (${eur(h.donationsAnterieures)}) ont consommé ${eur(abattementConsomme)} d'abattement. Il ne reste que ${eur(abattementApplique)} avant que la part reçue ne soit taxée (Art. 784 CGI).`,
      })
    }

    // 2g. Diagnostic exonération 796-0 ter quand frère/sœur partiellement éligible
    if (h.lien === 'frere_soeur') {
      const conditions = diagnostic796_0_ter(h)
      if (conditions.eligibleSiCorrige.length > 0 && !conditions.exonere) {
        warnings.push({
          type: 'info',
          message: `${h.nom} : l'exonération Loi TEPA frère/sœur (Art. 796-0 ter CGI) ne s'applique pas car ${conditions.manquantes.join(' et ')}. Conditions cumulatives : statut civil célibataire / veuf / divorcé / séparé, âge >50 ans ou invalidité, cohabitation 5 ans avec le défunt.`,
        })
      }
    }
  }

  // 3. Optimisations transverses
  const enfants = inputs.heritiers.filter(h => h.lien === 'enfant')
  if (enfants.length > 0 && totalDroits > 0) {
    const sansDonationAnterieure = enfants.filter(h => h.donationsAnterieures === 0)
    if (sansDonationAnterieure.length > 0) {
      optimisations.push({
        type: 'info',
        message: `L'abattement de 100 000 € par enfant (Art. 779-I CGI) se reconstitue tous les 15 ans. Anticiper la transmission par donation permettrait d'éviter les droits de succession au décès, dans la limite de cet abattement renouvelable.`,
      })
    }
  }

  return {
    totalDroits,
    totalNetRecu,
    detailHeritiers,
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO (FAQ + HowTo minimaux)
// ─────────────────────────────────────────────────────────────

import type { HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'

const FAQ_SUCCESSION: FAQSchemaItem[] = [
  {
    question: "Qui paie les droits de succession ?",
    answer: "Chaque héritier paie ses propres droits de succession, calculés sur sa part reçue après l'abattement applicable à son lien de parenté avec le défunt.",
  },
  {
    question: "Le conjoint paie-t-il des droits de succession ?",
    answer: "Non. Depuis la loi TEPA de 2007 (Art. 796-0 bis CGI), le conjoint survivant et le partenaire de PACS sont totalement exonérés de droits de succession, quel que soit le montant transmis.",
  },
  {
    question: "Quel est l'abattement par enfant ?",
    answer: "Chaque enfant bénéficie d'un abattement de 100 000 € sur sa part d'héritage (Art. 779-I CGI). Cet abattement se reconstitue tous les 15 ans.",
  },
]

const HOWTO_SUCCESSION: HowToSchema = {
  name: "Calculer les droits de succession",
  description: "Estimer les droits de succession par héritier selon l'actif successoral et le lien de parenté avec le défunt.",
  totalTime: "PT5M",
  steps: [
    {
      name: "Renseigner l'actif net successoral",
      text: "Indiquer le montant total de l'héritage après dettes.",
    },
    {
      name: "Ajouter chaque héritier",
      text: "Saisir le nom, le lien de parenté et la part reçue par chaque héritier.",
    },
    {
      name: "Saisir les donations antérieures",
      text: "Pour chaque héritier, indiquer les donations reçues du défunt depuis moins de 15 ans (rappel Art. 784 CGI).",
    },
    {
      name: "Lire le détail",
      text: "Le calculateur affiche l'abattement appliqué, la base taxable, les droits et le net reçu pour chaque héritier.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// Helpers UI
// ─────────────────────────────────────────────────────────────

let nextHeritierId = 1
export function genererIdHeritier(): string {
  return `h${nextHeritierId++}-${Date.now()}`
}

export const LIBELLE_LIEN: Record<LienHeritier, string> = {
  enfant:       'Enfant',
  epoux_pacs:   'Époux / PACS (exonéré)',
  parent:       'Parent (ascendant)',
  petit_enfant: 'Petit-enfant',
  frere_soeur:  'Frère ou sœur',
  neveu_niece:  'Neveu ou nièce',
  autre_4e:     'Autre parent (jusqu\'au 4e degré)',
  non_parent:   'Non parent ou au-delà du 4e degré',
}

// ─────────────────────────────────────────────────────────────
// Module calculateur (cf. ADR-0001)
// ─────────────────────────────────────────────────────────────

export const moduleSuccession: CalculatorModule<SuccessionInputs, SuccessionResults> = {
  slug: 'succession',
  nom: 'Succession - Droits par héritier',
  sources: SOURCES_SUCCESSION,
  faqSchema: FAQ_SUCCESSION,
  howToSchema: HOWTO_SUCCESSION,
  formatContexteChat: (inputs, results) => {
    const lignes = [
      'CONTEXTE SUCCESSION :',
      ligne('Actif net', eur(inputs.actifNetSuccessoral)),
      ligne('Nombre d\'héritiers', String(inputs.heritiers.length)),
      ligne('Total droits', eur(results.totalDroits)),
      ligne('Total net reçu', eur(results.totalNetRecu)),
      '',
      'Détail par héritier :',
      ...results.detailHeritiers.map(h =>
        `  - ${h.nom} (${LIBELLE_LIEN[h.lien]}) : part ${eur(h.partRecue)}, droits ${eur(h.droits)}, net ${eur(h.netRecu)}${h.exonereLoiTEPA ? ' [exonéré TEPA]' : ''}`
      ),
    ]
    return lignes.join('\n')
  },
}
