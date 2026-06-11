// src/lib/perSortie.ts
//
// Calcul de la fiscalité de sortie d'un PER individuel :
// comparaison capital (versements à l'IR + gains au PFU) vs rente
// (régime des pensions : abattement 10 % + IR + PS retraités).

import type { PerSortieInputs, PerSortieResults } from '@/types/perSortie'
import type { CalculatorModule, HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import { formatEurRounded as eur, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_PER_SORTIE = [
  // Cf. docs/broken-links-to-fix.md et docs/sources/per-sortie.md
  // Référence corrigée 2026-06-09 (validation Nicolas) : la rente PER versements
  // déductibles relève du § 5 b bis (qui rattache au régime pensions § 5 a),
  // pas d'un "5° bis" inexistant.
  { label: 'Article 158 § 5 b bis CGI', desc: 'Rente PER (versements déductibles) imposée au régime pensions de retraite avec abattement 10 % (renvoi au § 5 a)' },
  { label: 'Article 200 A B 1° CGI', desc: 'PFU 30 % (12,8 % IR + 17,2 % PS) sur la fraction "plus-values" du capital sorti' },
  { label: 'Article 158 § 5 b quinquies 1° CGI', desc: 'Capital PER versements déductibles imposé à l\'IR au barème SANS abattement 10 %' },
  { label: 'Article 163 quatervicies CGI', desc: 'Régime de déductibilité à l\'entrée : détermine l\'imposition à la sortie' },
  { label: 'Article L. 136-1-2 II 11° CSS', desc: 'Rente PER versements déductibles exclue de l\'assiette CSG L. 136-1-2 ; bascule sur le régime pensions L. 136-8 (4 paliers selon RFR, taux normal 9,1 %)' },
]

// Taux PS sur pensions de retraite (taux normal , simplification : on n'évalue
// pas le RFR pour appliquer un taux réduit).
const PS_PENSION_NORMAL = 0.091  // CSG 8,3 + CRDS 0,5 + CASA 0,3 = 9,1 %
const ABATTEMENT_PENSION = 0.10  // Art. 158-5° bis CGI

// PFU sur la fraction plus-values du capital
const PFU = 0.30                 // 12,8 % IR + 17,2 % PS

/**
 * Compare la sortie en capital et la sortie en rente d'un PER individuel.
 *
 * Hypothèses simplificatrices :
 * - Capital : versements déductibles imposés au barème IR (TMI à la retraite),
 *   gains imposés au PFU 30 % (12,8 + 17,2 PS).
 * - Rente : régime des pensions (Art. 158-5° bis CGI) , abattement 10 %, IR
 *   au barème (TMI), CSG/CRDS/CASA 9,1 % (taux normal, simplification).
 * - Comparaison cumulée : capital = montant net immédiat ; rente = rente
 *   nette annuelle × (espérance de vie − âge à la retraite).
 *
 * @example
 * // Capital 100 k€, 70 % versements déductibles, TMI retraite 11 %, âge 65,
 * // espérance 85, taux rente 4 %, mode capital.
 * calculerPerSortie({...})
 * // → capital : 70 000 × 11 % + 30 000 × 30 % = 7 700 + 9 000 = 16 700 € d'impôt
 * //   net capital : 83 300 €.
 */
export function calculerPerSortie(inputs: PerSortieInputs): PerSortieResults {
  const warnings: PerSortieResults['warnings'] = []
  const optimisations: PerSortieResults['optimisations'] = []

  const versements = inputs.capitalAccumule * (inputs.fractionVersementsDeductibles / 100)
  const gains = inputs.capitalAccumule - versements

  // --- Capital ---
  const impotVersements = versements * (inputs.tmiRetraite / 100)
  const impotGains = gains * PFU
  const netCapital = inputs.capitalAccumule - impotVersements - impotGains

  // --- Rente ---
  const renteAnnuelleBrute = inputs.capitalAccumule * (inputs.tauxRenteAnnuel / 100)
  const abattement = renteAnnuelleBrute * ABATTEMENT_PENSION
  const irRente = (renteAnnuelleBrute - abattement) * (inputs.tmiRetraite / 100)
  const psRente = renteAnnuelleBrute * PS_PENSION_NORMAL
  const renteAnnuelleNette = renteAnnuelleBrute - irRente - psRente
  const dureeRente = Math.max(0, inputs.esperanceVie - inputs.ageRetraite)
  const netCumuleRente = renteAnnuelleNette * dureeRente

  // --- Mode mixte ---
  const partCap = Math.max(0, Math.min(100, inputs.partCapitalSiMixte)) / 100
  const netCapPart = netCapital * partCap
  const netRentePart = netCumuleRente * (1 - partCap)
  const netMixte = netCapPart + netRentePart

  // --- Synthèse ---
  const optionAvantageuse: 'capital' | 'rente' =
    netCumuleRente > netCapital ? 'rente' : 'capital'
  const ecart = Math.abs(netCumuleRente - netCapital)

  // --- Warnings ---
  if (dureeRente < 5) {
    warnings.push({
      type: 'danger',
      message: `L'espérance de vie résiduelle saisie (${dureeRente} années) est très courte. La sortie en rente perd presque tout intérêt en dessous de 10 ans : vérifier l'âge à la liquidation et l'espérance INSEE pour votre situation.`,
    })
  }

  if (inputs.tmiRetraite === 0) {
    warnings.push({
      type: 'info',
      message: `À TMI 0 %, les versements déductibles ne génèrent pas d'impôt à la sortie. La sortie en capital est mécaniquement plus avantageuse : seuls les gains restent taxés au PFU à 30 %.`,
    })
  }

  if (inputs.tmiRetraite >= 41 && inputs.fractionVersementsDeductibles > 50) {
    warnings.push({
      type: 'warning',
      message: `Tranche d'imposition élevée à la retraite (${inputs.tmiRetraite} %), et ${inputs.fractionVersementsDeductibles} % du capital vient de versements déduits à l'entrée. Sortir en capital fait payer ${eur(impotVersements)} d'IR d'un coup sur cette part. La rente étale cet impôt sur ${dureeRente} ans : le total final dépend de la durée de vie réelle.`,
    })
  }

  // --- Optimisations ---
  const seuilRente = netCapital > 0 ? netCapital / renteAnnuelleNette : 0
  if (renteAnnuelleNette > 0 && seuilRente > 0 && seuilRente < dureeRente) {
    optimisations.push({
      type: 'info',
      message: `Le seuil de rentabilité de la rente vs capital est atteint au bout de ${Math.ceil(seuilRente)} ans. Au-delà, la rente cumulée dépasse le capital net.`,
    })
  }

  return {
    versementsImposables: Math.round(versements),
    impotVersements: Math.round(impotVersements),
    impotGains: Math.round(impotGains),
    netCapital: Math.round(netCapital),
    renteAnnuelleBrute: Math.round(renteAnnuelleBrute),
    renteAnnuelleNette: Math.round(renteAnnuelleNette),
    netCumuleRente: Math.round(netCumuleRente),
    netMixte: Math.round(netMixte),
    optionAvantageuse,
    ecart: Math.round(ecart),
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO
// ─────────────────────────────────────────────────────────────

const FAQ_PER_SORTIE: FAQSchemaItem[] = [
  {
    question: "Comment est taxée la sortie en capital d'un PER ?",
    answer: "La fraction du capital correspondant aux versements déductibles est imposée à l'IR au barème (votre TMI à la retraite). La fraction correspondant aux gains est imposée au PFU 30 % (12,8 % IR + 17,2 % PS). Le total dépend donc du mix versements/gains et de votre TMI.",
  },
  {
    question: "Comment est taxée la sortie en rente d'un PER ?",
    answer: "La rente est imposée comme une pension de retraite (Art. 158-5° bis CGI) : abattement de 10 % sur le montant brut, puis IR au barème (TMI) sur le reste, plus 9,1 % de CSG/CRDS/CASA (taux normal). Pas de PFU.",
  },
  {
    question: "Capital ou rente : quelle option est la plus avantageuse ?",
    answer: "Le capital est mécaniquement avantageux à TMI basse (peu d'impôt) et espérance courte. La rente devient plus intéressante à TMI moyenne/élevée et longue durée de vie : l'étalement de l'imposition + l'abattement 10 % réduisent l'impôt annuel sous le seuil capital. Le calculateur affiche le seuil de rentabilité.",
  },
]

const HOWTO_PER_SORTIE: HowToSchema = {
  name: "Comparer la sortie capital vs rente d'un PER",
  description: "Simuler le net après impôt de chaque mode de sortie d'un PER individuel selon la TMI à la retraite.",
  totalTime: "PT3M",
  steps: [
    { name: "Saisir le capital accumulé", text: "Indiquer le montant total du PER au moment de la liquidation." },
    { name: "Indiquer la fraction versements", text: "Quelle part du capital vient des versements (le reste = plus-values)." },
    { name: "Saisir TMI retraite + âge", text: "TMI estimée à la retraite et âge à la liquidation." },
    { name: "Choisir le mode", text: "Capital, rente, ou mixte (avec % capital)." },
    { name: "Lire la comparaison", text: "Le calculateur affiche le net immédiat (capital) vs le net cumulé sur l'espérance de vie (rente)." },
  ],
}

// ─────────────────────────────────────────────────────────────
// Module
// ─────────────────────────────────────────────────────────────

export const modulePerSortie: CalculatorModule<PerSortieInputs, PerSortieResults> = {
  slug: 'per-sortie',
  nom: 'PER - Sortie capital vs rente',
  sources: SOURCES_PER_SORTIE,
  faqSchema: FAQ_PER_SORTIE,
  howToSchema: HOWTO_PER_SORTIE,
  formatContexteChat: (inputs, results) =>
    [
      'CONTEXTE PER SORTIE :',
      ligne('Capital accumulé', eur(inputs.capitalAccumule)),
      ligne('Fraction versements', `${inputs.fractionVersementsDeductibles} %`),
      ligne('TMI retraite', `${inputs.tmiRetraite} %`),
      ligne('Âge à la retraite', `${inputs.ageRetraite} ans`),
      ligne('Espérance de vie', `${inputs.esperanceVie} ans`),
      ligne('Mode', inputs.mode),
      '',
      ligne('Net sortie capital', eur(results.netCapital)),
      ligne('Rente annuelle nette', eur(results.renteAnnuelleNette)),
      ligne('Net cumulé rente', eur(results.netCumuleRente)),
      ligne('Option avantageuse', `${results.optionAvantageuse} (écart ${eur(results.ecart)})`),
    ].join('\n'),
}
