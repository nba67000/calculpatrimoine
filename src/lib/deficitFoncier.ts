// src/lib/deficitFoncier.ts
//
// Calculateur de déficit foncier en location nue régime réel.
// Art. 156 I-3° CGI : plafond 10 700 €/an imputable sur le revenu global,
// excédent reportable 10 ans sur les revenus fonciers. Les intérêts d'emprunt
// sont imputés en priorité sur les revenus fonciers et leur excédent n'ouvre
// PAS le droit à imputation sur le revenu global.

import type {
  DeficitFoncierInputs,
  DeficitFoncierResults,
} from '@/types/deficitFoncier'
import type { CalculatorModule, HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import { formatEurRounded as eur, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_DEFICIT_FONCIER = [
  { label: 'Article 156 I-3° du CGI', desc: "Régime du déficit foncier : plafond annuel d'imputation sur le revenu global et report sur les revenus fonciers" },
  { label: 'Article 156 I-3° CGI (LF 2023 art. 12)', desc: 'Plafond majoré 21 400 € pour les dépenses de rénovation énergétique permettant à un logement classé E/F/G en DPE de passer à A/B/C/D, pour les dépenses payées du 01/01/2023 au 31/12/2025' },
  { label: 'BOFiP BOI-RFPI-BASE-30-20', desc: "Modalités d'imputation du déficit foncier" },
  { label: 'BOFiP BOI-RFPI-BASE-30-30', desc: 'Report des déficits non imputés' },
  { label: 'Article 31 du CGI', desc: 'Liste des charges déductibles des revenus fonciers (intérêts d\'emprunt, travaux, taxe foncière, gestion, assurance)' },
]

// Plafond standard d'imputation sur le revenu global (Art. 156 I-3° CGI)
const PLAFOND_STANDARD = 10700
// Plafond majoré rénovation énergétique passoires thermiques (LF 2023)
const PLAFOND_MAJORE_PASSOIRE = 21400
// Durée d'engagement de location (jusqu'au 31 décembre de la 3e année suivant l'imputation)
const ENGAGEMENT_LOCATION_ANS = 3
// Durée de report sur les revenus fonciers
const REPORT_REVENUS_FONCIERS_ANS = 10
// Durée de report de la fraction non utilisée du revenu global
const REPORT_REVENU_GLOBAL_ANS = 6

/**
 * Calcule le déficit foncier et son imputation sur le revenu global.
 *
 * Mécanique en deux étapes (Art. 156 I-3° CGI, doctrine BOFiP-RFPI-BASE-30) :
 *
 *   1. Les intérêts d'emprunt s'imputent en priorité sur les revenus fonciers
 *      bruts de l'année. Si intérêts > revenus, l'excédent constitue un déficit
 *      qui ne peut être imputé QUE sur les revenus fonciers des 10 années
 *      suivantes (pas sur le revenu global).
 *
 *   2. Les autres charges déductibles (travaux, taxe foncière, gestion,
 *      assurance, copropriété) s'imputent ensuite sur ce qui reste du revenu
 *      foncier. Si le solde est négatif, ce déficit "hors intérêts" est
 *      imputable sur le revenu global dans la limite de 10 700 € (ou 21 400 €
 *      si dispositif passoires énergétiques). L'excédent est reportable 10 ans
 *      sur les revenus fonciers.
 *
 * Engagement de location : conserver le logement loué jusqu'au 31 décembre de
 * la 3e année suivant l'imputation, sous peine de recapture (reprise des
 * déficits indûment imputés).
 *
 * @example
 * // Pas de déficit : revenus 12 000, charges 8 000, intérêts 4 000.
 * calculerDeficitFoncier({
 *   revenusFoncierBruts: 12000, chargesHorsInterets: 8000,
 *   interetsEmprunt: 4000, tmi: 30, renovationEnergetiquePassoire: false,
 * })
 * // → revenuFoncierNet = 0, deficitTotal = 0, economieImpotImmediate = 0
 *
 * @example
 * // Déficit standard : revenus 10 000, charges 18 000, intérêts 2 000, TMI 30.
 * calculerDeficitFoncier({
 *   revenusFoncierBruts: 10000, chargesHorsInterets: 18000,
 *   interetsEmprunt: 2000, tmi: 30, renovationEnergetiquePassoire: false,
 * })
 * // → deficitTotal = 10 000, imputableRevenuGlobal = 10 000,
 * //   economieImpotImmediate = 3 000
 *
 * @example
 * // Plafond dépassé : revenus 5 000, charges 25 000, intérêts 3 000, TMI 30.
 * calculerDeficitFoncier({
 *   revenusFoncierBruts: 5000, chargesHorsInterets: 25000,
 *   interetsEmprunt: 3000, tmi: 30, renovationEnergetiquePassoire: false,
 * })
 * // → deficitTotal = 23 000, imputableRevenuGlobal = 10 700,
 * //   reportableRevenusFonciers = 12 300, economieImpotImmediate = 3 210
 */
export function calculerDeficitFoncier(
  inputs: DeficitFoncierInputs,
): DeficitFoncierResults {
  const warnings: DeficitFoncierResults['warnings'] = []
  const optimisations: DeficitFoncierResults['optimisations'] = []

  // 1. Imputation des intérêts d'emprunt sur les revenus fonciers
  const revenuApresInterets = inputs.revenusFoncierBruts - inputs.interetsEmprunt
  const deficitLieAuxInterets = Math.max(0, -revenuApresInterets)
  // Solde disponible pour absorber les autres charges (clampé à 0).
  const soldeApresInterets = Math.max(0, revenuApresInterets)

  // 2. Imputation des autres charges
  const revenuFoncierNet = revenuApresInterets - inputs.chargesHorsInterets
  const deficitHorsInterets = Math.max(0, inputs.chargesHorsInterets - soldeApresInterets)

  // 3. Plafond applicable
  const plafondAnnuel = inputs.renovationEnergetiquePassoire
    ? PLAFOND_MAJORE_PASSOIRE
    : PLAFOND_STANDARD

  // 4. Imputation sur le revenu global
  const imputableRevenuGlobal = Math.min(plafondAnnuel, deficitHorsInterets)
  const reportableRevenusFonciers =
    deficitLieAuxInterets + (deficitHorsInterets - imputableRevenuGlobal)

  // 5. Déficit total et économie d'impôt
  const deficitTotal = deficitLieAuxInterets + deficitHorsInterets
  const economieImpotImmediate = (imputableRevenuGlobal * inputs.tmi) / 100

  // --- Warnings ---
  if (deficitTotal > 0) {
    warnings.push({
      type: 'info',
      message: `Engagement de location : pour conserver l'imputation sur le revenu global, le logement doit rester loué jusqu'au 31 décembre de la ${ENGAGEMENT_LOCATION_ANS}e année qui suit cette imputation. Si vous vendez ou cessez la location avant, l'administration recapture les déficits imputés (Art. 156 I-3° CGI).`,
    })
  }

  if (deficitLieAuxInterets > 0) {
    warnings.push({
      type: 'warning',
      message: `${eur(deficitLieAuxInterets)} de déficit lié aux intérêts d'emprunt : cette part ne peut PAS être déduite de votre salaire ou retraite. Elle sera reportée pour réduire vos loyers imposables des ${REPORT_REVENUS_FONCIERS_ANS} années suivantes.`,
    })
  }

  if (deficitHorsInterets > plafondAnnuel) {
    warnings.push({
      type: 'warning',
      message: `Plafond annuel ${eur(plafondAnnuel)} dépassé : ${eur(deficitHorsInterets - plafondAnnuel)} sont reportés sur les revenus fonciers des ${REPORT_REVENUS_FONCIERS_ANS} années suivantes (pas sur le revenu global).`,
    })
  }

  if (inputs.tmi === 0 && imputableRevenuGlobal > 0) {
    warnings.push({
      type: 'info',
      message: `À TMI 0 %, l'imputation sur le revenu global ne produit pas d'économie immédiate. La fraction non absorbée par le revenu global est reportable ${REPORT_REVENU_GLOBAL_ANS} ans sur le revenu global et ${REPORT_REVENUS_FONCIERS_ANS} ans sur les revenus fonciers.`,
    })
  }

  if (inputs.renovationEnergetiquePassoire) {
    warnings.push({
      type: 'info',
      message: `Plafond majoré ${eur(PLAFOND_MAJORE_PASSOIRE)} activé : ce dispositif suppose des travaux permettant à un logement classé E/F/G en DPE de passer à A/B/C/D. Il s'applique aux dépenses payées entre le 01/01/2023 et le 31/12/2025 (LF 2023 art. 12). Vérifiez la prorogation pour les dépenses postérieures.`,
    })
  }

  // --- Optimisations ---
  if (deficitTotal === 0 && revenuFoncierNet > 0) {
    optimisations.push({
      type: 'info',
      message: `Revenu foncier net positif de ${eur(revenuFoncierNet)} : il s'ajoute à votre revenu imposable et coûte ${eur((revenuFoncierNet * inputs.tmi) / 100)} d'IR (TMI ${inputs.tmi} %) plus les prélèvements sociaux (17,2 %). Si vous prévoyez des travaux dans les prochaines années, les concentrer sur une seule année fiscale crée un déficit imputable sur le revenu global.`,
    })
  }

  if (
    deficitHorsInterets > 0 &&
    deficitHorsInterets < plafondAnnuel &&
    !inputs.renovationEnergetiquePassoire &&
    inputs.chargesHorsInterets > 0
  ) {
    const margePlafond = plafondAnnuel - deficitHorsInterets
    optimisations.push({
      type: 'info',
      message: `Vous êtes à ${eur(deficitHorsInterets)} sous le plafond ${eur(plafondAnnuel)} : vous pourriez réaliser jusqu'à ${eur(margePlafond)} de travaux déductibles supplémentaires cette année sans perdre le bénéfice de l'imputation sur le revenu global.`,
    })
  }

  return {
    revenuApresInterets: Math.round(revenuApresInterets),
    revenuFoncierNet: Math.round(revenuFoncierNet),
    deficitTotal: Math.round(deficitTotal),
    deficitLieAuxInterets: Math.round(deficitLieAuxInterets),
    deficitHorsInterets: Math.round(deficitHorsInterets),
    plafondAnnuel,
    imputableRevenuGlobal: Math.round(imputableRevenuGlobal),
    reportableRevenusFonciers: Math.round(reportableRevenusFonciers),
    economieImpotImmediate: Math.round(economieImpotImmediate),
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO
// ─────────────────────────────────────────────────────────────

const FAQ_DEFICIT_FONCIER: FAQSchemaItem[] = [
  {
    question: "Qu'est-ce que le déficit foncier ?",
    answer: "Lorsque vos charges déductibles (travaux, taxe foncière, intérêts d'emprunt, gestion, assurance) sont supérieures à vos loyers nus de l'année, vous êtes en déficit foncier. Une partie de ce déficit peut être déduite de votre revenu global (donc de votre salaire ou retraite) et le reste est reporté sur vos revenus fonciers des années suivantes.",
  },
  {
    question: "Quel est le plafond d'imputation sur le revenu global en 2026 ?",
    answer: "Le plafond est de 10 700 € par an, fixé par l'article 156 I-3° du CGI. Pour les travaux de rénovation énergétique permettant à un logement E/F/G en DPE d'atteindre A/B/C/D, le plafond est porté à 21 400 € pour les dépenses payées du 01/01/2023 au 31/12/2025 (LF 2023 art. 12). À actualiser si prorogation.",
  },
  {
    question: "Pourquoi les intérêts d'emprunt sont-ils traités à part ?",
    answer: "Les intérêts d'emprunt s'imputent en priorité sur vos revenus fonciers. Si vos intérêts dépassent vos loyers, l'excédent forme un déficit qui ne peut PAS être imputé sur le revenu global. Il reste reportable uniquement sur les revenus fonciers des 10 années suivantes.",
  },
  {
    question: "Pendant combien de temps puis-je reporter le déficit non imputé ?",
    answer: "La fraction du déficit qui dépasse le plafond annuel (ou qui provient des intérêts d'emprunt) se reporte 10 ans sur les revenus fonciers. La fraction du revenu global non utilisée la première année (si vos autres revenus ne suffisent pas à absorber 10 700 €) se reporte 6 ans sur le revenu global.",
  },
  {
    question: "Suis-je obligé de garder le bien en location après avoir imputé un déficit ?",
    answer: "Oui. L'article 156 I-3° CGI exige de conserver le bien loué jusqu'au 31 décembre de la 3e année qui suit l'année d'imputation. Si vous vendez ou cessez de louer avant ce terme, l'administration recalcule l'impôt des années concernées en réintégrant les déficits déduits.",
  },
  {
    question: "Le déficit foncier réduit-il aussi les prélèvements sociaux ?",
    answer: "Non. Les prélèvements sociaux (17,2 %) ne s'appliquent que sur le revenu foncier net positif. En déficit, vous ne payez ni IR ni PS sur la location, mais l'imputation sur le revenu global ne réduit que l'impôt sur le revenu (pas les PS dus sur d'autres revenus).",
  },
  {
    question: "Le mécanisme s'applique-t-il à une location meublée ?",
    answer: "Non. Le déficit foncier ne concerne que la location NUE en régime réel (revenus fonciers). La location meublée (LMNP/LMP) relève des BIC, avec un mécanisme distinct (amortissements, déficit BIC). Voir /lmnp-reel-vs-micro.",
  },
  {
    question: "Une SCI translucide à l'IR peut-elle générer un déficit foncier ?",
    answer: "Oui, le déficit généré par une SCI à l'IR est calculé au niveau de la SCI, puis attribué aux associés au prorata de leurs parts. Chaque associé l'impute sur ses revenus fonciers personnels et, dans la limite de 10 700 €, sur son revenu global. La SCI à l'IS ne génère pas de déficit foncier (régime BIC/IS distinct, voir /sci-is-vs-ir).",
  },
]

const HOWTO_DEFICIT_FONCIER: HowToSchema = {
  name: 'Calculer son déficit foncier et son économie d\'impôt',
  description: "Calculer le déficit foncier en location nue régime réel, son imputation sur le revenu global et le report sur les revenus fonciers.",
  totalTime: 'PT3M',
  steps: [
    { name: 'Saisir les revenus fonciers bruts', text: 'Total des loyers nus encaissés sur l\'année.' },
    { name: 'Saisir les charges hors intérêts', text: 'Travaux, taxe foncière, gestion, assurance, copropriété.' },
    { name: 'Saisir les intérêts d\'emprunt', text: 'Ils sont traités à part car non imputables sur le revenu global.' },
    { name: 'Indiquer votre TMI', text: 'Permet d\'estimer l\'économie d\'impôt sur revenu global.' },
    { name: 'Cocher si rénovation énergétique passoire', text: 'Active le plafond majoré 21 400 €.' },
    { name: 'Lire la décomposition', text: 'Déficit imputable revenu global vs reportable sur revenus fonciers.' },
  ],
}

// ─────────────────────────────────────────────────────────────
// Module
// ─────────────────────────────────────────────────────────────

export const moduleDeficitFoncier: CalculatorModule<
  DeficitFoncierInputs,
  DeficitFoncierResults
> = {
  slug: 'deficit-foncier',
  nom: 'Déficit foncier',
  sources: SOURCES_DEFICIT_FONCIER,
  faqSchema: FAQ_DEFICIT_FONCIER,
  howToSchema: HOWTO_DEFICIT_FONCIER,
  formatContexteChat: (inputs, results) =>
    [
      'CONTEXTE DÉFICIT FONCIER :',
      ligne('Revenus fonciers bruts', eur(inputs.revenusFoncierBruts)),
      ligne('Charges hors intérêts', eur(inputs.chargesHorsInterets)),
      ligne('Intérêts d\'emprunt', eur(inputs.interetsEmprunt)),
      ligne('TMI', `${inputs.tmi} %`),
      ligne('Plafond majoré passoire', inputs.renovationEnergetiquePassoire ? 'oui' : 'non'),
      '',
      ligne('Déficit total', eur(results.deficitTotal)),
      ligne('Imputable revenu global', eur(results.imputableRevenuGlobal)),
      ligne('Reportable revenus fonciers', eur(results.reportableRevenusFonciers)),
      ligne('Économie d\'impôt immédiate', eur(results.economieImpotImmediate)),
    ].join('\n'),
}
