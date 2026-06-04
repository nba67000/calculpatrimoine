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
  { label: 'Article 796-0 bis du CGI', desc: 'Exonération totale du conjoint survivant et partenaire de PACS (Loi TEPA 2007)' },
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
 * Calcule les droits de succession pour chaque héritier.
 *
 * Règles appliquées :
 * - Conjoint et partenaire de PACS : exonérés totalement (Art. 796-0 bis CGI, Loi TEPA 2007).
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

    // 2a. Cas conjoint / PACS : exonération totale Loi TEPA
    if (h.lien === 'epoux_pacs') {
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
