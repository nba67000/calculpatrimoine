// src/lib/lmnpRegime.ts
//
// Comparaison régime LMNP réel vs micro-BIC. Barèmes 2026 post-LF 2025 :
// - Meublé classique : abattement 50 %, seuil 77 700 €.
// - Meublé touristique classé : abattement 71 %, seuil 188 700 € (réduit par LF 2025).
// - Meublé touristique non classé : abattement 30 %, seuil 15 000 € (réformé 2025).

import type {
  LmnpRegimeInputs,
  LmnpRegimeResults,
  TypeMeuble,
} from '@/types/lmnpRegime'
import type { CalculatorModule, HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import { formatEurRounded as eur, formatLigne as ligne } from '@/lib/formatters'
import { TAUX_PS_CAPITAL } from '@/lib/fiscal/taux'

export const SOURCES_LMNP_REGIME = [
  { label: 'Article 50-0 CGI', desc: 'Régime micro-BIC : abattements et seuils' },
  { label: 'Article 32 CGI', desc: 'Conditions d\'option pour le régime réel' },
  { label: 'Loi de finances 2025 art. 84', desc: 'Réforme meublé touristique non classé (abattement 30 %, seuil 15 000 €)' },
  { label: 'Article L. 136-7 CSS', desc: 'Assiette CSG sur les revenus LMNP' },
  { label: 'Article L. 136-8 CSS', desc: 'Taux PS porté à 18,6 % par LF 2025-1403 (CSG 10,6 %) depuis revenus 2025' },
]

const PS = TAUX_PS_CAPITAL

const PARAMS_MEUBLE: Record<TypeMeuble, { abattement: number; seuil: number; label: string }> = {
  classique:              { abattement: 0.50, seuil: 77700,  label: 'Meublé classique (location longue durée)' },
  touristique_classe:     { abattement: 0.71, seuil: 188700, label: 'Meublé touristique classé (étoiles)' },
  touristique_non_classe: { abattement: 0.30, seuil: 15000,  label: 'Meublé touristique non classé (LF 2025)' },
}

/**
 * Compare le régime micro-BIC (abattement forfaitaire) et le régime réel
 * (charges + amortissements déductibles) pour un loueur en meublé non
 * professionnel.
 *
 * @example
 * // Loyers 20 000 €/an, charges 4 000 €, amortissements 6 000 €, TMI 30 %,
 * // meublé classique.
 * // Micro : 20 000 × 50 % = 10 000 imposable → 30 % + 18,6 % = 4 860 €
 * // Réel : 20 000 − 4 000 − 6 000 = 10 000 imposable → 4 860 €
 * // Égalité ici.
 */
export function calculerLmnpRegime(inputs: LmnpRegimeInputs): LmnpRegimeResults {
  const warnings: LmnpRegimeResults['warnings'] = []
  const optimisations: LmnpRegimeResults['optimisations'] = []

  const params = PARAMS_MEUBLE[inputs.typeMeuble]
  const microApplicable = inputs.loyersAnnuels <= params.seuil

  // --- Micro-BIC ---
  const beneficeImposableMicro = Math.max(0, inputs.loyersAnnuels * (1 - params.abattement))
  const irMicro = beneficeImposableMicro * (inputs.tmi / 100)
  const psMicro = beneficeImposableMicro * PS
  const totalImpotMicro = irMicro + psMicro

  // --- Réel ---
  const beneficeBrut = inputs.loyersAnnuels - inputs.chargesReelles
  const beneficeApresAmortissement = beneficeBrut - inputs.amortissementsAnnuels
  // Le déficit n'est PAS imputable sur les autres revenus (LMNP), mais reportable
  // sur les bénéfices LMNP futurs. Pour l'impôt N : bénéfice clampé à 0.
  const beneficeImposableReel = Math.max(0, beneficeApresAmortissement)
  const irReel = beneficeImposableReel * (inputs.tmi / 100)
  const psReel = beneficeImposableReel * PS
  const totalImpotReel = irReel + psReel

  // --- Synthèse ---
  // Si micro n'est pas applicable (loyers > seuil), seul le réel est valide.
  const regimeAvantageux: 'micro' | 'reel' =
    !microApplicable ? 'reel'
    : totalImpotReel < totalImpotMicro ? 'reel'
    : 'micro'
  const economie = Math.abs(totalImpotMicro - totalImpotReel)

  // --- Warnings ---
  if (!microApplicable) {
    warnings.push({
      type: 'warning',
      message: `Vos loyers (${eur(inputs.loyersAnnuels)}) dépassent le plafond du micro-BIC pour ce type de location (${eur(params.seuil)}). Le micro avec abattement forfaitaire n'est plus accessible : passage obligatoire au régime réel, avec comptabilité et déduction des charges et amortissements réels.`,
    })
  }
  if (inputs.typeMeuble === 'touristique_non_classe') {
    warnings.push({
      type: 'info',
      message: `Meublé touristique non classé : la loi de finances 2025 a durci le micro-BIC. L'abattement est passé de 50 % à 30 % et le plafond de loyers de 77 700 € à 15 000 €. Au-delà de 15 000 €/an, le micro n'est plus accessible : passage obligatoire au régime réel, qui permet de déduire charges et amortissements.`,
    })
  }
  if (beneficeApresAmortissement < 0) {
    warnings.push({
      type: 'info',
      message: `Déficit réel de ${eur(Math.abs(beneficeApresAmortissement))} : il n'est pas imputable sur vos autres revenus (régime LMNP), mais reportable sur les bénéfices LMNP des 10 années suivantes.`,
    })
  }
  if (inputs.amortissementsAnnuels === 0 && microApplicable) {
    warnings.push({
      type: 'info',
      message: `Aucun amortissement saisi. En régime réel LMNP, l'amortissement du bien et des meubles (généralement 2-3 % du bien par an + 10 % des meubles) réduit fortement la base imposable. Saisir une estimation pour comparer correctement.`,
    })
  }

  // --- Optimisations ---
  if (microApplicable && regimeAvantageux === 'reel' && economie > 100) {
    optimisations.push({
      type: 'success',
      message: `Le régime réel vous fait économiser ${eur(economie)} d'impôt par an vs le micro-BIC. À mettre en balance avec le coût comptable annuel (~500-800 €/an pour un comptable).`,
    })
  }
  if (microApplicable && regimeAvantageux === 'micro') {
    optimisations.push({
      type: 'info',
      message: `Le micro-BIC reste plus avantageux que le réel ici. Pas besoin de comptable, la déclaration est simplifiée (formulaire 2042 C-PRO).`,
    })
  }

  return {
    abattementMicroPct: params.abattement * 100,
    seuilMicro: params.seuil,
    beneficeImposableMicro: Math.round(beneficeImposableMicro),
    irMicro: Math.round(irMicro),
    psMicro: Math.round(psMicro),
    totalImpotMicro: Math.round(totalImpotMicro),
    microApplicable,
    beneficeImposableReel: Math.round(beneficeImposableReel),
    irReel: Math.round(irReel),
    psReel: Math.round(psReel),
    totalImpotReel: Math.round(totalImpotReel),
    regimeAvantageux,
    economie: Math.round(economie),
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO
// ─────────────────────────────────────────────────────────────

const FAQ_LMNP: FAQSchemaItem[] = [
  {
    question: "Qu'est-ce que le LMNP ?",
    answer: "Le LMNP (Loueur en meublé non professionnel) est un régime fiscal applicable aux particuliers qui louent un logement meublé sans en faire leur activité principale. Les revenus sont imposés en BIC (bénéfices industriels et commerciaux), au régime micro (abattement forfaitaire) ou réel (charges et amortissements déduits).",
  },
  {
    question: "Comment a évolué le micro-BIC pour le meublé touristique en 2025 ?",
    answer: "La loi de finances 2025 a réduit l'avantage du micro-BIC pour le meublé touristique non classé : abattement passé de 50 % à 30 %, seuil réduit de 77 700 € à 15 000 €. Pour les meublés touristiques classés, le seuil reste élevé (188 700 €) et l'abattement à 71 %.",
  },
  {
    question: "Le déficit réel LMNP est-il imputable sur le salaire ?",
    answer: "Non, contrairement au déficit foncier (location nue). Le déficit LMNP n'est imputable que sur les bénéfices LMNP futurs, dans la limite de 10 ans. C'est une différence importante avec le LMP (professionnel), où le déficit peut être imputé sur le revenu global.",
  },
]

const HOWTO_LMNP: HowToSchema = {
  name: "Comparer LMNP réel vs micro-BIC",
  description: "Calculer l'impôt et identifier le régime LMNP le plus avantageux.",
  totalTime: "PT3M",
  steps: [
    { name: "Saisir les loyers annuels", text: "Loyers bruts encaissés sur l'année." },
    { name: "Indiquer les charges réelles", text: "Charges déductibles en régime réel : entretien, taxes, copropriété, intérêts d'emprunt." },
    { name: "Saisir les amortissements", text: "Amortissement annuel du bien (2-3 %/an) + meubles (10 %/an) : seulement utilisé en régime réel." },
    { name: "Choisir le type de meublé + TMI", text: "Détermine l'abattement micro et le seuil applicable." },
    { name: "Lire la comparaison", text: "Le calculateur affiche l'impôt dans chaque régime et l'économie réalisée." },
  ],
}

// ─────────────────────────────────────────────────────────────
// Module
// ─────────────────────────────────────────────────────────────

export const moduleLmnpRegime: CalculatorModule<LmnpRegimeInputs, LmnpRegimeResults> = {
  slug: 'lmnp-reel-vs-micro',
  nom: 'LMNP - Régime réel vs micro-BIC',
  sources: SOURCES_LMNP_REGIME,
  faqSchema: FAQ_LMNP,
  howToSchema: HOWTO_LMNP,
  formatContexteChat: (inputs, results) =>
    [
      'CONTEXTE LMNP REEL/MICRO :',
      ligne('Loyers annuels', eur(inputs.loyersAnnuels)),
      ligne('Charges réelles', eur(inputs.chargesReelles)),
      ligne('Amortissements', eur(inputs.amortissementsAnnuels)),
      ligne('TMI', `${inputs.tmi} %`),
      ligne('Type meublé', inputs.typeMeuble),
      '',
      ligne('Impôt micro-BIC', eur(results.totalImpotMicro)),
      ligne('Impôt réel', eur(results.totalImpotReel)),
      ligne('Régime avantageux', `${results.regimeAvantageux} (économie ${eur(results.economie)})`),
    ].join('\n'),
}
