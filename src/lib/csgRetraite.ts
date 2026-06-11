// src/lib/csgRetraite.ts
//
// Calcul du taux CSG applicable sur les pensions de retraite, selon le RFR
// (Art. L. 136-8 CSS et arrêtés annuels). Barème 2026 (revenus N-2 = 2024).
//
// Taux applicables :
// - Exonéré : 0 %
// - Réduit : 3,8 % CSG + 0,5 % CRDS = 4,3 % (pas de CASA)
// - Médian : 6,6 % CSG + 0,5 % CRDS + 0,3 % CASA = 7,4 %
// - Normal : 8,3 % CSG + 0,5 % CRDS + 0,3 % CASA = 9,1 %

import type {
  CsgRetraiteInputs,
  CsgRetraiteResults,
  TauxCsg,
} from '@/types/csgRetraite'
import type { CalculatorModule, HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import { formatEurRounded as eur, formatPct as pct, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_CSG_RETRAITE = [
  { label: 'Article L. 136-8 du Code de la sécurité sociale', desc: 'Taux CSG sur les revenus de remplacement (pensions de retraite, allocations chômage)' },
  { label: 'Article L. 136-1-2 CSS', desc: 'Assiette CSG des pensions et abattement 10 %' },
  { label: 'Article 1417 CGI', desc: 'Détermination du RFR (revenu fiscal de référence)' },
  { label: 'Arrêté annuel relevant les seuils', desc: 'Seuils RFR indexés chaque année pour exonération / réduit / médian' },
]

// Barème seuils RFR 2026 (revenus 2024) - 1 part fiscale
// Source : barème publié au JO décembre 2025, applicable aux prélèvements 2026
const SEUILS_1_PART = {
  exoneration: 12230,   // < ce seuil → exonéré
  reduit:      15988,   // < ce seuil → taux réduit 3,8 %
  median:      24813,   // < ce seuil → taux médian 6,6 %
  // au-delà → taux normal 8,3 %
}

// Par demi-part supplémentaire, les seuils augmentent (Art. 1417 CGI)
const MAJORATION_DEMI_PART = {
  exoneration: 3267,
  reduit:      4269,
  median:      6624,
}

const TAUX_RATES: Record<TauxCsg, number> = {
  exonere: 0,
  reduit:  0.043,  // 3,8 + 0,5 (CRDS), pas de CASA
  median:  0.074,  // 6,6 + 0,5 + 0,3 (CASA)
  normal:  0.091,  // 8,3 + 0,5 + 0,3 (CASA)
}

function seuilsAjustes(nombreParts: number) {
  const demiPartsSup = Math.max(0, (nombreParts - 1) * 2)
  return {
    exoneration: SEUILS_1_PART.exoneration + demiPartsSup * MAJORATION_DEMI_PART.exoneration,
    reduit:      SEUILS_1_PART.reduit      + demiPartsSup * MAJORATION_DEMI_PART.reduit,
    median:      SEUILS_1_PART.median      + demiPartsSup * MAJORATION_DEMI_PART.median,
  }
}

function determinerTaux(rfr: number, nombreParts: number): TauxCsg {
  const s = seuilsAjustes(nombreParts)
  if (rfr < s.exoneration) return 'exonere'
  if (rfr < s.reduit) return 'reduit'
  if (rfr < s.median) return 'median'
  return 'normal'
}

/**
 * Détermine le taux CSG applicable à une pension de retraite et calcule
 * le prélèvement annuel + la pension nette.
 *
 * @example
 * // Pension 24 000 €/an, RFR 18 000 €, 1 part
 * // → seuil médian 24 813 € > RFR → taux médian 6,6 % + 0,5 % CRDS + 0,3 % CASA = 7,4 %
 * // Prélèvement = 24 000 × 7,4 % = 1 776 €
 * // Pension nette = 22 224 €
 */
export function calculerCsgRetraite(inputs: CsgRetraiteInputs): CsgRetraiteResults {
  const warnings: CsgRetraiteResults['warnings'] = []
  const optimisations: CsgRetraiteResults['optimisations'] = []

  const tauxApplicable = determinerTaux(inputs.revenuFiscalReference, inputs.nombreParts)
  const tauxTotal = TAUX_RATES[tauxApplicable]
  const prelevement = inputs.pensionBruteAnnuelle * tauxTotal
  const pensionNette = inputs.pensionBruteAnnuelle - prelevement

  const s = seuilsAjustes(inputs.nombreParts)

  // --- Warnings ---
  if (tauxApplicable === 'normal' && inputs.revenuFiscalReference - s.median < 2000) {
    warnings.push({
      type: 'info',
      message: `Votre revenu fiscal de référence (RFR) dépasse de ${eur(inputs.revenuFiscalReference - s.median)} le seuil du taux médian. Si le RFR repasse sous ${eur(s.median)} pendant 2 années de suite, le taux médian s'applique à nouveau, soit ${eur(inputs.pensionBruteAnnuelle * (TAUX_RATES.normal - TAUX_RATES.median))} d'écart par an sur la pension nette.`,
    })
  }
  if (tauxApplicable === 'exonere') {
    optimisations.push({
      type: 'success',
      message: `Vous êtes en exonération totale de CSG/CRDS/CASA. Pension nette = pension brute. Statut conservé tant que votre RFR reste sous ${eur(s.exoneration)} (pour ${inputs.nombreParts} part${inputs.nombreParts > 1 ? 's' : ''}).`,
    })
  }
  if (tauxApplicable === 'reduit') {
    warnings.push({
      type: 'info',
      message: `Taux réduit (3,8 % CSG + 0,5 % CRDS = 4,3 %). Pas de CASA car RFR < ${eur(s.median)}. La règle : un mois de revenus exceptionnels peut faire basculer vers le taux médian → revoir 2 ans après.`,
    })
  }

  // --- Optimisations transverses ---
  if (tauxApplicable === 'normal' || tauxApplicable === 'median') {
    optimisations.push({
      type: 'info',
      message: `Le RFR baisse mécaniquement quand le revenu imposable baisse. Un versement déductible sur un PER, ou le passage des revenus de capitaux au PFU plutôt qu'au barème, sont les deux leviers qui agissent sur l'assiette du RFR.`
    })
  }

  return {
    tauxApplicable,
    tauxTotalPct: tauxTotal * 100,
    prelevement: Math.round(prelevement),
    pensionNette: Math.round(pensionNette),
    seuilExoneration: s.exoneration,
    seuilReduit: s.reduit,
    seuilMedian: s.median,
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO
// ─────────────────────────────────────────────────────────────

const FAQ_CSG: FAQSchemaItem[] = [
  {
    question: "Comment est déterminé le taux CSG sur ma retraite ?",
    answer: "Le taux dépend de votre revenu fiscal de référence (RFR) de l'année N-2 et de votre nombre de parts fiscales (Art. L. 136-8 CSS). Quatre paliers : exonéré (0 %), réduit (4,3 %), médian (7,4 %), normal (9,1 %). Les seuils sont relevés chaque année par arrêté.",
  },
  {
    question: "Que se passe-t-il si mon RFR varie d'une année à l'autre ?",
    answer: "Le taux est ajusté chaque année selon le RFR N-2. Pour qu'un changement de taux soit appliqué, il faut généralement que la condition soit remplie 2 années consécutives : cela évite les bascules ponctuelles liées à un revenu exceptionnel.",
  },
  {
    question: "Pourquoi la CASA (Contribution additionnelle de solidarité pour l'autonomie) ?",
    answer: "La CASA (0,3 %) finance les aides aux personnes âgées dépendantes. Elle ne s'applique qu'aux retraités soumis aux taux médian (7,4 %) ou normal (9,1 %). Les taux réduit et exonéré n'incluent pas la CASA.",
  },
]

const HOWTO_CSG: HowToSchema = {
  name: "Calculer la CSG sur sa pension de retraite",
  description: "Déterminer le taux CSG applicable et le prélèvement annuel selon le RFR.",
  totalTime: "PT2M",
  steps: [
    { name: "Saisir la pension annuelle", text: "Montant brut total annuel de toutes vos pensions de retraite." },
    { name: "Indiquer le RFR", text: "Revenu fiscal de référence figurant sur votre avis d'imposition N-2." },
    { name: "Saisir le nombre de parts", text: "Nombre de parts fiscales (1 = célibataire, 2 = couple, +0,5 par enfant à charge, etc.)." },
    { name: "Lire le taux appliqué", text: "Le calculateur identifie le taux (exonéré/réduit/médian/normal) et calcule le prélèvement annuel + pension nette." },
  ],
}

// ─────────────────────────────────────────────────────────────
// Module
// ─────────────────────────────────────────────────────────────

export const moduleCsgRetraite: CalculatorModule<CsgRetraiteInputs, CsgRetraiteResults> = {
  slug: 'csg-csds-retraite',
  nom: 'CSG/CRDS sur pension de retraite',
  sources: SOURCES_CSG_RETRAITE,
  faqSchema: FAQ_CSG,
  howToSchema: HOWTO_CSG,
  formatContexteChat: (inputs, results) =>
    [
      'CONTEXTE CSG RETRAITE :',
      ligne('Pension brute', eur(inputs.pensionBruteAnnuelle)),
      ligne('RFR', eur(inputs.revenuFiscalReference)),
      ligne('Nombre de parts', String(inputs.nombreParts)),
      '',
      ligne('Taux applicable', `${results.tauxApplicable} (${pct(results.tauxTotalPct, 1)})`),
      ligne('Prélèvement annuel', eur(results.prelevement)),
      ligne('Pension nette', eur(results.pensionNette)),
    ].join('\n'),
}
