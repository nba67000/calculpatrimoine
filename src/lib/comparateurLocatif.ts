// src/lib/comparateurLocatif.ts
//
// Comparateur immobilier locatif vs placement financier à capital égal et
// durée égale. Calcul net après impôt côté chaque option.
//
// HYPOTHÈSES SIMPLIFICATRICES (à expliciter clairement à l'utilisateur) :
// - Locatif : prix d'achat = capital initial (pas de financement crédit).
//   Loyers + valorisation linéaires, frais en % du loyer brut.
//   Régime micro-foncier (abattement 30 %) ou réel nu (abattement frais réels = fraisChargesPct).
// - Placement : capitalisation composée au taux brut. Fiscalité à la sortie
//   selon véhicule : PEA exonéré IR après 5 ans (PS 18,6 %), AV abattement
//   4 600 €/an après 8 ans puis PFU 31,4 %, CTO PFU 31,4 % sur gains.
// - Pas de TVA, pas de surtaxe PV immo, pas de plafond PEA.

import type {
  ComparateurLocatifInputs,
  ComparateurLocatifResults,
  RegimeLocatif,
  VehiculePlacement,
} from '@/types/comparateurLocatif'
import type { CalculatorModule, HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import { formatEurRounded as eur, formatLigne as ligne } from '@/lib/formatters'
import { TAUX_PS_CAPITAL, TAUX_PFU_GLOBAL } from '@/lib/fiscal/taux'

export const SOURCES_COMPARATEUR_LOCATIF = [
  { label: 'Art. 150 U et s. CGI', desc: 'Plus-values immobilières des particuliers' },
  { label: 'Art. 14 et s. CGI', desc: 'Revenus fonciers (locatif nu) - régimes micro-foncier (abattement 30 %) et réel' },
  { label: 'Art. 200 A CGI', desc: 'PFU 31,4 % sur les gains des placements financiers (hors PEA/AV durée)' },
  { label: 'Art. 150-0 A CGI', desc: 'Régime PEA - exonération IR après 5 ans, PS toujours dus' },
  { label: 'Art. 125-0 A CGI', desc: 'Régime assurance-vie - abattement annuel après 8 ans' },
  { label: 'Art. L136-8 CSS', desc: 'Taux CSG sur revenus du capital porté à 10,6 % par LF 2025-1403 (PS totaux 18,6 % depuis revenus 2025)' },
]

const PS = TAUX_PS_CAPITAL
const PFU = TAUX_PFU_GLOBAL
const IR_PV_IMMO = 0.19
const ABATTEMENT_AV_SEUL = 4600
const ABATTEMENT_MICRO_FONCIER = 0.30

// Abattements PV immo simplifiés (sans surtaxe)
function abattementIrPvImmo(annees: number): number {
  if (annees < 6) return 0
  if (annees >= 22) return 1
  return Math.min(1, 0.06 * (annees - 5))
}
function abattementPsPvImmo(annees: number): number {
  if (annees < 6) return 0
  if (annees >= 30) return 1
  if (annees <= 21) return 0.0165 * (annees - 5)
  // À partir de 22 ans : 28 % + 9 % par année à partir de 23
  return Math.min(1, 0.28 + 0.09 * Math.max(0, annees - 22))
}

function fiscaliteLocatif(loyerNetCharges: number, tmi: number, regime: RegimeLocatif): number {
  if (regime === 'micro_foncier') {
    const imposable = loyerNetCharges * (1 - ABATTEMENT_MICRO_FONCIER)
    return imposable * (tmi / 100) + imposable * PS
  }
  // Réel : on a déjà déduit les frais via fraisChargesPct → loyerNetCharges = net foncier
  return loyerNetCharges * (tmi / 100) + loyerNetCharges * PS
}

function fiscalitePlacement(
  capitalFinal: number,
  capitalInitial: number,
  dureeAnnees: number,
  vehicule: VehiculePlacement,
): number {
  const gains = Math.max(0, capitalFinal - capitalInitial)
  if (gains === 0) return 0

  if (vehicule === 'pea') {
    // Après 5 ans : exonéré IR, PS 18,6 % sur gains
    if (dureeAnnees >= 5) return gains * PS
    // Avant 5 ans : PFU 31,4 % sur gains
    return gains * PFU
  }

  if (vehicule === 'assurance_vie') {
    if (dureeAnnees >= 8) {
      // Abattement 4 600 € (simpl. : pour 1 année de rachat)
      const imposable = Math.max(0, gains - ABATTEMENT_AV_SEUL)
      // Au-delà : PFU 31,4 % (simpl. : on ignore le seuil 150k€)
      return imposable * PFU
    }
    return gains * PFU
  }

  // CTO
  return gains * PFU
}

/**
 * Compare un investissement locatif (loyers + plus-value à la sortie) avec
 * un placement financier (capitalisation + fiscalité à la sortie), à capital
 * et durée identiques.
 */
export function calculerComparateurLocatif(
  inputs: ComparateurLocatifInputs,
): ComparateurLocatifResults {
  const warnings: ComparateurLocatifResults['warnings'] = []
  const optimisations: ComparateurLocatifResults['optimisations'] = []

  // --- Locatif ---
  // Loyers nets de frais (par an)
  const loyerBrutAnnuel = inputs.capitalInitial * (inputs.rendementLocatifBrut / 100)
  const fraisCharges = loyerBrutAnnuel * (inputs.fraisChargesPct / 100)
  const loyerNetCharges = loyerBrutAnnuel - fraisCharges
  // Impôt annuel sur ce loyer net (selon régime)
  const impotLoyerAnnuel = fiscaliteLocatif(loyerNetCharges, inputs.tmi, inputs.regimeLocatif)
  const loyerNetImpotAnnuel = loyerNetCharges - impotLoyerAnnuel
  const loyersCumulesNets = loyerNetImpotAnnuel * inputs.dureeAnnees

  // Capital revente : valorisation composée
  const capitalRevente = inputs.capitalInitial * Math.pow(1 + inputs.valorisationAnnuelle / 100, inputs.dureeAnnees)
  // Plus-value brute
  const pvBrute = Math.max(0, capitalRevente - inputs.capitalInitial)
  const abatIr = abattementIrPvImmo(inputs.dureeAnnees)
  const abatPs = abattementPsPvImmo(inputs.dureeAnnees)
  const pvNetteIr = pvBrute * (1 - abatIr)
  const pvNettePs = pvBrute * (1 - abatPs)
  const impotPvImmo = pvNetteIr * IR_PV_IMMO + pvNettePs * PS
  const pvImmoNette = pvBrute - impotPvImmo

  const totalNetLocatif = loyersCumulesNets + inputs.capitalInitial + pvImmoNette

  // --- Placement ---
  const capitalFinalBrut = inputs.capitalInitial * Math.pow(1 + inputs.rendementPlacementBrut / 100, inputs.dureeAnnees)
  const impotSortiePlacement = fiscalitePlacement(
    capitalFinalBrut,
    inputs.capitalInitial,
    inputs.dureeAnnees,
    inputs.vehiculePlacement,
  )
  const totalNetPlacement = capitalFinalBrut - impotSortiePlacement

  // --- Synthèse ---
  const optionAvantageuse: 'locatif' | 'placement' =
    totalNetLocatif > totalNetPlacement ? 'locatif' : 'placement'
  const ecart = Math.abs(totalNetLocatif - totalNetPlacement)
  const netGagnant = Math.max(totalNetLocatif, totalNetPlacement)
  const rendementAnnuelAvantageux =
    inputs.capitalInitial > 0 && inputs.dureeAnnees > 0
      ? (Math.pow(netGagnant / inputs.capitalInitial, 1 / inputs.dureeAnnees) - 1) * 100
      : 0

  // --- Warnings ---
  warnings.push({
    type: 'info',
    message: `Hypothèse importante : le calcul suppose un achat comptant, sans emprunt. À crédit, le rendement réel change : l'emprunt permet d'investir plus que l'apport, et les intérêts se déduisent des loyers. Le calculateur ne modélise pas cet effet.`,
  })

  if (inputs.dureeAnnees < 10) {
    warnings.push({
      type: 'warning',
      message: `Sur ${inputs.dureeAnnees} ans, attention : le calculateur ignore les frais d'acquisition (notaire ~7-8 % du prix d'achat). Sur courte durée, ces frais peuvent rendre le locatif perdant : il faut d'abord que le bien prenne 7-8 % de valeur pour les compenser. L'immobilier s'envisage plutôt sur 10-15 ans minimum.`,
    })
  }

  if (inputs.rendementLocatifBrut > 8) {
    warnings.push({
      type: 'warning',
      message: `Rendement locatif brut > 8 % : valeur élevée pour le marché français. Vérifier qu'il s'agit bien d'un rendement brut net de vacances locatives moyennes et représentatif de la zone.`,
    })
  }

  if (optionAvantageuse === 'placement' && inputs.rendementLocatifBrut > 0) {
    optimisations.push({
      type: 'info',
      message: `Sur ces hypothèses, le placement financier (${eur(totalNetPlacement)}) bat le locatif (${eur(totalNetLocatif)}) de ${eur(ecart)} sur ${inputs.dureeAnnees} ans. Mais le locatif offre des avantages non chiffrés ici : effet de levier crédit, protection contre l'inflation, transmission, occupation personnelle possible.`,
    })
  }

  return {
    loyersCumulesNets: Math.round(loyersCumulesNets),
    capitalRevente: Math.round(capitalRevente),
    pvImmoNette: Math.round(pvImmoNette),
    totalNetLocatif: Math.round(totalNetLocatif),
    capitalFinalBrut: Math.round(capitalFinalBrut),
    impotSortiePlacement: Math.round(impotSortiePlacement),
    totalNetPlacement: Math.round(totalNetPlacement),
    optionAvantageuse,
    ecart: Math.round(ecart),
    rendementAnnuelAvantageux: Math.round(rendementAnnuelAvantageux * 10) / 10,
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO
// ─────────────────────────────────────────────────────────────

const FAQ_COMPARATEUR: FAQSchemaItem[] = [
  {
    question: "Le calculateur prend-il en compte l'effet de levier du crédit ?",
    answer: "Non. Le calculateur compare un achat immobilier comptant à un placement financier comptant : même capital de départ, pas de financement. L'effet de levier du crédit immobilier (intérêts déduits des loyers en régime réel, capital amorti par les loyers) change radicalement le résultat ; il faut un calculateur dédié pour cette dimension.",
  },
  {
    question: "Quelle est la différence entre micro-foncier et régime réel ?",
    answer: "Micro-foncier : abattement forfaitaire de 30 % sur le loyer brut, applicable si revenus fonciers < 15 000 €/an. Régime réel : déduction des frais réels (charges, taxes, intérêts d'emprunt, travaux). Le réel est avantageux dès que les frais dépassent 30 % du loyer.",
  },
  {
    question: "Pourquoi le PEA et l'assurance-vie sont-ils traités différemment ?",
    answer: "PEA : après 5 ans, les gains sont exonérés d'IR mais restent soumis aux PS 18,6 %. Assurance-vie : après 8 ans, abattement annuel de 4 600 € (seul) sur les gains avant PFU 31,4 %. Ces régimes spécifiques peuvent rendre le placement plus rentable que prévu vs le locatif imposé au TMI sur les loyers.",
  },
]

const HOWTO_COMPARATEUR: HowToSchema = {
  name: "Comparer immobilier locatif et placement financier",
  description: "Simuler le net après impôt sur une durée pour un investissement locatif et un placement à capital égal.",
  totalTime: "PT4M",
  steps: [
    { name: "Saisir capital + durée + TMI", text: "Données communes aux deux options." },
    { name: "Côté locatif", text: "Rendement brut, valorisation annuelle, frais en % du loyer, régime micro-foncier ou réel." },
    { name: "Côté placement", text: "Rendement annuel brut et véhicule (PEA / AV / CTO)." },
    { name: "Lire la comparaison", text: "Le calculateur affiche le total net cumulé de chaque option et l'écart final." },
  ],
}

// ─────────────────────────────────────────────────────────────
// Module
// ─────────────────────────────────────────────────────────────

export const moduleComparateurLocatif: CalculatorModule<ComparateurLocatifInputs, ComparateurLocatifResults> = {
  slug: 'comparateur-locatif-placement',
  nom: 'Locatif vs placement financier',
  sources: SOURCES_COMPARATEUR_LOCATIF,
  faqSchema: FAQ_COMPARATEUR,
  howToSchema: HOWTO_COMPARATEUR,
  formatContexteChat: (inputs, results) =>
    [
      'CONTEXTE COMPARATEUR LOCATIF/PLACEMENT :',
      ligne('Capital initial', eur(inputs.capitalInitial)),
      ligne('Durée', `${inputs.dureeAnnees} ans`),
      ligne('TMI', `${inputs.tmi} %`),
      ligne('Rendement locatif brut', `${inputs.rendementLocatifBrut} %`),
      ligne('Rendement placement', `${inputs.rendementPlacementBrut} %`),
      '',
      ligne('Net locatif total', eur(results.totalNetLocatif)),
      ligne('Net placement total', eur(results.totalNetPlacement)),
      ligne('Option avantageuse', `${results.optionAvantageuse} (écart ${eur(results.ecart)})`),
    ].join('\n'),
}
