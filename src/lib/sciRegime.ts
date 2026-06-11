// src/lib/sciRegime.ts
//
// Comparateur SCI à l'IR vs SCI à l'IS sur un projet locatif.
//
// LIMITES IMPORTANTES (V1 simplifiée) :
// - Ne traite que l'impôt annuel (loyers nets imposés). Pas de plus-value à la
//   sortie (qui diffère radicalement : PV particulier vs PV pro pour l'IS).
// - Pas de distribution de dividendes modélisée (on suppose réinvestissement).
// - Pas de déficit imputable / reportable.
// - Pas de prise en compte des frais de gestion / comptable obligatoire pour
//   l'IS.

import type { SciRegimeInputs, SciRegimeResults } from '@/types/sciRegime'
import type { CalculatorModule, HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import { formatEurRounded as eur, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_SCI_REGIME = [
  { label: 'Article 8 CGI', desc: 'SCI translucide à l\'IR : revenus fonciers imposés au nom des associés' },
  { label: 'Article 206 CGI', desc: 'Option de la SCI pour l\'IS' },
  { label: 'Article 219 I-b CGI', desc: 'Taux réduit IS 15 % jusqu\'à 42 500 € de bénéfice' },
  { label: 'Article 14 et s. CGI', desc: 'Régime des revenus fonciers (location nue)' },
  { label: 'Article L. 136-7 CSS', desc: 'Prélèvements sociaux 17,2 % sur les revenus fonciers' },
]

const PS = 0.172
const TAUX_IS_REDUIT = 0.15
const SEUIL_IS_REDUIT = 42500
const TAUX_IS_NORMAL = 0.25

/**
 * Compare l'impôt annuel d'une SCI à l'IR (revenus fonciers) et à l'IS
 * (bénéfice taxé au taux société).
 *
 * @example
 * // Loyers 24 000, charges 4 000, intérêts 6 000, amortissements 8 000, TMI 30 %
 * // IR : 24 - 4 - 6 = 14 k → 14 k × (30 + 17,2) = 6 608 €
 * // IS : 24 - 4 - 6 - 8 = 6 k → 6 k × 15 % = 900 €
 * // (les chiffres comparent l'impôt annuel uniquement)
 */
export function calculerSciRegime(inputs: SciRegimeInputs): SciRegimeResults {
  const warnings: SciRegimeResults['warnings'] = []
  const optimisations: SciRegimeResults['optimisations'] = []

  // --- SCI à l'IR (transparence, location nue → revenus fonciers) ---
  const revenuFoncier = inputs.loyersAnnuels - inputs.chargesDeductibles - inputs.interetsEmprunt
  // Si déficit foncier, simplification : on clamp à 0 (le déficit est imputable
  // sur revenu global jusqu'à 10 700 €, mais on ne modélise pas ici).
  const revenuFoncierImposable = Math.max(0, revenuFoncier)
  const irAnnuel = revenuFoncierImposable * (inputs.tmiAssocies / 100)
  const psAnnuel = revenuFoncierImposable * PS
  const totalAnnuelIr = irAnnuel + psAnnuel
  const cumulSurDureeIr = totalAnnuelIr * inputs.dureeProjet

  // --- SCI à l'IS ---
  const beneficeIs = inputs.loyersAnnuels - inputs.chargesDeductibles - inputs.interetsEmprunt - inputs.amortissementsAnnuels
  const beneficeIsImposable = Math.max(0, beneficeIs)
  // Barème IS 2026 : 15 % jusqu'à 42 500 €, 25 % au-delà
  let isAnnuel = 0
  if (beneficeIsImposable <= SEUIL_IS_REDUIT) {
    isAnnuel = beneficeIsImposable * TAUX_IS_REDUIT
  } else {
    isAnnuel = SEUIL_IS_REDUIT * TAUX_IS_REDUIT + (beneficeIsImposable - SEUIL_IS_REDUIT) * TAUX_IS_NORMAL
  }
  // Hypothèse : pas de distribution de dividendes (réinvestissement total)
  const totalAnnuelIs = isAnnuel
  const cumulSurDureeIs = totalAnnuelIs * inputs.dureeProjet

  // --- Synthèse ---
  const regimeAvantageux: 'ir' | 'is' = totalAnnuelIs < totalAnnuelIr ? 'is' : 'ir'
  const ecart = Math.abs(totalAnnuelIs - totalAnnuelIr)

  // --- Warnings importants (rappel : V1 simplifiée) ---
  warnings.push({
    type: 'danger',
    message: `IMPORTANT : ce calculateur compare uniquement l'impôt annuel sur les loyers. À la revente, l'écart entre les deux régimes change fortement. À l'IR, le bien suit la plus-value des particuliers : exonération progressive selon la durée de détention (exonéré d'impôt sur le revenu à 22 ans, de prélèvements sociaux à 30 ans). À l'IS, c'est une plus-value de société : tous les amortissements déjà déduits viennent gonfler la plus-value taxable. Pour un projet long terme, refaire le calcul en incluant la sortie est indispensable.`,
  })

  if (inputs.amortissementsAnnuels === 0) {
    warnings.push({
      type: 'warning',
      message: `Pas d'amortissements saisis : le principal avantage de l'IS (déduction des amortissements) n'est pas mesuré. Indicatif : amortissement bien ~2-3 %/an de la valeur du bien.`,
    })
  }
  if (revenuFoncier < 0) {
    warnings.push({
      type: 'info',
      message: `Déficit foncier de ${eur(Math.abs(revenuFoncier))} en SCI à l'IR. Imputable sur le revenu global jusqu'à 10 700 €/an (hors intérêts d'emprunt). Le solde est reportable 10 ans sur revenus fonciers.`,
    })
  }
  if (beneficeIsImposable > SEUIL_IS_REDUIT) {
    warnings.push({
      type: 'info',
      message: `Bénéfice IS > 42 500 € : tranche à 25 % activée. Le taux réduit 15 % nécessite que la société réponde aux conditions PME (CA < 10 M€, capital entièrement libéré, détention par personnes physiques à 75 %).`,
    })
  }

  // --- Optimisations ---
  if (regimeAvantageux === 'is' && ecart > 1000) {
    optimisations.push({
      type: 'info',
      message: `L'IS apparaît plus avantageux annuellement (${eur(ecart)} d'écart). MAIS : 1) frais comptables IS ~1 500-2 500 €/an, 2) à la sortie, la PV pro réintègre les amortissements et est taxée au taux IS (sans abattement durée). Pour un projet d'investissement long, l'IR reste souvent gagnant.`,
    })
  }

  return {
    revenuFoncier: Math.round(revenuFoncier),
    irAnnuel: Math.round(irAnnuel),
    psAnnuel: Math.round(psAnnuel),
    totalAnnuelIr: Math.round(totalAnnuelIr),
    cumulSurDureeIr: Math.round(cumulSurDureeIr),
    beneficeImposableIs: Math.round(beneficeIs),
    isAnnuel: Math.round(isAnnuel),
    totalAnnuelIs: Math.round(totalAnnuelIs),
    cumulSurDureeIs: Math.round(cumulSurDureeIs),
    regimeAvantageux,
    ecart: Math.round(ecart),
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO
// ─────────────────────────────────────────────────────────────

const FAQ_SCI: FAQSchemaItem[] = [
  {
    question: "Pourquoi opter pour la SCI à l'IS ?",
    answer: "L'IS permet de déduire les amortissements du bien (typiquement 2-3 %/an), ce qui réduit fortement le bénéfice imposable annuel. Le taux IS est de 15 % jusqu'à 42 500 € puis 25 %. Mais à la sortie, la plus-value est en PV pro (réintégration des amortissements) et la fiscalité est généralement défavorable pour un projet long.",
  },
  {
    question: "L'option IS est-elle réversible ?",
    answer: "Non. L'option IS est définitive depuis la LF 2019 : une fois la SCI à l'IS, on ne peut plus revenir à l'IR. À l'inverse, une SCI à l'IR peut basculer à l'IS à tout moment (mais reste à l'IS ensuite).",
  },
  {
    question: "Quelle différence avec le LMNP ?",
    answer: "Le LMNP est applicable à un loueur individuel (sans structure). La SCI est une société. La SCI à l'IS et le LMNP réel ont en commun la déduction des amortissements, mais la fiscalité de sortie diffère : PV particulier en LMNP (avec abattement durée), PV pro en SCI à l'IS (sans abattement, réintégration des amortissements).",
  },
]

const HOWTO_SCI: HowToSchema = {
  name: "Comparer SCI à l'IR et SCI à l'IS",
  description: "Comparer l'impôt annuel et cumulé d'un projet SCI selon le régime fiscal choisi.",
  totalTime: "PT3M",
  steps: [
    { name: "Saisir les loyers", text: "Loyers annuels bruts perçus par la SCI." },
    { name: "Indiquer charges + intérêts", text: "Charges déductibles dans les deux régimes." },
    { name: "Saisir les amortissements", text: "Uniquement utilisé pour le calcul IS." },
    { name: "Indiquer TMI + durée", text: "TMI des associés (pour l'IR) et durée du projet pour le cumul." },
    { name: "Lire la comparaison", text: "Impôt annuel et cumulé dans chaque régime, avec rappel des limites (sortie non couverte)." },
  ],
}

// ─────────────────────────────────────────────────────────────
// Module
// ─────────────────────────────────────────────────────────────

export const moduleSciRegime: CalculatorModule<SciRegimeInputs, SciRegimeResults> = {
  slug: 'sci-is-vs-ir',
  nom: 'SCI à l\'IS vs à l\'IR',
  sources: SOURCES_SCI_REGIME,
  faqSchema: FAQ_SCI,
  howToSchema: HOWTO_SCI,
  formatContexteChat: (inputs, results) =>
    [
      'CONTEXTE SCI IS/IR :',
      ligne('Loyers annuels', eur(inputs.loyersAnnuels)),
      ligne('Charges', eur(inputs.chargesDeductibles)),
      ligne('Intérêts', eur(inputs.interetsEmprunt)),
      ligne('Amortissements (IS)', eur(inputs.amortissementsAnnuels)),
      ligne('TMI', `${inputs.tmiAssocies} %`),
      ligne('Durée', `${inputs.dureeProjet} ans`),
      '',
      ligne('Impôt annuel IR', eur(results.totalAnnuelIr)),
      ligne('Impôt annuel IS', eur(results.totalAnnuelIs)),
      ligne('Régime avantageux', `${results.regimeAvantageux} (écart ${eur(results.ecart)}/an)`),
    ].join('\n'),
}
