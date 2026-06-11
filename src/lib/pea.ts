// src/lib/pea.ts
//
// Calculateur PEA :
// (1) Fiscalité de sortie : exonéré IR après 5 ans, PS 17,2 % toujours dus.
// (2) Bilan patrimonial brut/net/passif latent : un PEA de 500 k€ ne vaut pas
//     500 k€ « net » car la CSG latente sur la plus-value n'est pas encore
//     réalisée. Trois vues coexistent (cf. discussion Reddit r/vosfinances).

import type { PeaInputs, PeaResults } from '@/types/pea'
import type { CalculatorModule, HowToSchema } from '@/lib/calculators/types'
import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import { formatEurRounded as eur, formatPct as pct, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_PEA = [
  { label: 'Article L. 221-30 et s. Code monétaire et financier', desc: 'Régime juridique du PEA' },
  { label: 'Article 150-0 A CGI', desc: 'Régime fiscal des plus-values de valeurs mobilières et exonération PEA' },
  { label: 'Article 157, 5° bis CGI', desc: 'Exonération d\'IR sur les gains du PEA après 5 ans de détention' },
  { label: 'Article L. 136-7 CSS', desc: 'Prélèvements sociaux 17,2 % sur les gains du PEA (toujours dus)' },
]

const PS = 0.172
const PFU = 0.30  // avant 5 ans

/**
 * Calculs PEA : bilan + sortie partielle ou totale.
 *
 * Hypothèse : PV répartie proportionnellement dans la valeur du PEA , un retrait
 * partiel emporte la même fraction de PV que sa fraction de la valeur totale.
 *
 * @example
 * // PEA 7 ans, valeur 100 k€, versements 60 k€, retrait 30 k€
 * // PV latente = 40 k€ → 40 % de la valeur
 * // PV dans le retrait = 30 k€ × 40 % = 12 k€
 * // Impôt = 12 k€ × 17,2 % = 2 064 € (IR exonéré, > 5 ans)
 * // Net retrait = 27 936 €
 */
export function calculerPea(inputs: PeaInputs): PeaResults {
  const warnings: PeaResults['warnings'] = []
  const optimisations: PeaResults['optimisations'] = []

  const plusValueLatente = Math.max(0, inputs.valeurActuelle - inputs.versementsTotaux)
  const partPlusValueDansValeur =
    inputs.valeurActuelle > 0 ? (plusValueLatente / inputs.valeurActuelle) * 100 : 0

  const exonerationIrActive = inputs.agePeaAnnees >= 5
  const tauxAppliqueRetrait = exonerationIrActive ? PS : PFU

  // --- Vues bilan ---
  const vueBrute = inputs.valeurActuelle
  // Net sortie : versements + PV × (1 − taux applicable)
  const vueNetteSortie = inputs.versementsTotaux + plusValueLatente * (1 - tauxAppliqueRetrait)
  // Passif latent = différence entre brut et net (= impôt latent sur PV totale)
  const passifLatentEstime = plusValueLatente * tauxAppliqueRetrait

  // --- Sortie (retrait) ---
  const fractionRetrait =
    inputs.valeurActuelle > 0 ? inputs.montantRetrait / inputs.valeurActuelle : 0
  const pvDansRetrait = plusValueLatente * fractionRetrait
  const impotSurRetrait = pvDansRetrait * tauxAppliqueRetrait
  const netRetrait = inputs.montantRetrait - impotSurRetrait

  // --- Warnings ---
  if (!exonerationIrActive && inputs.agePeaAnnees > 0) {
    warnings.push({
      type: 'danger',
      message: `Votre PEA a ${inputs.agePeaAnnees.toFixed(1)} ans. Un retrait avant 5 ans entraîne la clôture du plan et la flat tax de 30 % (12,8 % d'IR + 17,2 % de prélèvements sociaux) sur l'ensemble des gains. Après 5 ans, l'IR disparaît : il ne reste que les prélèvements sociaux (17,2 %).`,
    })
  }

  if (exonerationIrActive && inputs.montantRetrait > 0 && inputs.agePeaAnnees < 8) {
    warnings.push({
      type: 'warning',
      message: `Votre PEA a ${inputs.agePeaAnnees.toFixed(1)} ans : un retrait partiel après 5 ans n'entraîne plus la clôture (depuis loi PACTE 2019) et vous pouvez continuer à verser. Vérifier que votre courtier autorise effectivement les retraits partiels.`,
    })
  }

  if (plusValueLatente === 0 && inputs.versementsTotaux > 0) {
    warnings.push({
      type: 'info',
      message: `Aucune plus-value latente (valeur actuelle = versements). Aucun impôt à la sortie : tout retrait est neutre fiscalement.`,
    })
  }

  // --- Optimisations ---
  if (plusValueLatente > 0 && exonerationIrActive) {
    optimisations.push({
      type: 'success',
      message: `Après 5 ans, l'exonération d'IR vous fait économiser ${eur(plusValueLatente * (PFU - PS))} de fiscalité sur la PV latente vs un compte-titres ordinaire.`,
    })
  }

  if (vueBrute > 0 && passifLatentEstime > vueBrute * 0.05) {
    optimisations.push({
      type: 'info',
      message: `Le passif fiscal latent (${eur(passifLatentEstime)}) représente ${pct((passifLatentEstime / vueBrute) * 100, 1)} de la valeur brute. En cas d'arbitrage ou de revente partielle, intégrer ce coût dans vos calculs pour comparer correctement avec d'autres véhicules.`,
    })
  }

  return {
    plusValueLatente: Math.round(plusValueLatente),
    partPlusValueDansValeur: Math.round(partPlusValueDansValeur * 10) / 10,
    vueBrute: Math.round(vueBrute),
    vueNetteSortie: Math.round(vueNetteSortie),
    passifLatentEstime: Math.round(passifLatentEstime),
    pvDansRetrait: Math.round(pvDansRetrait),
    impotSurRetrait: Math.round(impotSurRetrait),
    netRetrait: Math.round(netRetrait),
    tauxAppliqueRetrait: tauxAppliqueRetrait * 100,
    exonerationIrActive,
    warnings,
    optimisations,
  }
}

// ─────────────────────────────────────────────────────────────
// Schémas SEO
// ─────────────────────────────────────────────────────────────

const FAQ_PEA: FAQSchemaItem[] = [
  {
    question: "Quels sont les prélèvements sur un retrait PEA après 5 ans ?",
    answer: "Après 5 ans, les gains du PEA sont exonérés d'impôt sur le revenu (Art. 157-5° bis CGI). Les prélèvements sociaux (17,2 %) restent toujours dus sur la part plus-value du retrait. Avant 5 ans, le PFU 30 % s'applique (12,8 % IR + 17,2 % PS) sur l'ensemble des gains.",
  },
  {
    question: "Pourquoi un PEA à 500 k€ ne vaut-il pas vraiment 500 k€ ?",
    answer: "Parce que la valeur brute affichée par votre courtier inclut une plus-value latente non encore taxée. Si vous décidez de sortir, vous devez payer les PS sur cette plus-value (et l'IR avant 5 ans). Le passif fiscal latent est analogue aux impôts différés en comptabilité : il existe mais ne se matérialise qu'à la sortie.",
  },
  {
    question: "Un retrait partiel après 5 ans clôture-t-il le PEA ?",
    answer: "Non, depuis la loi PACTE de 2019. Avant 5 ans, tout retrait clôture le plan. Après 5 ans, les retraits partiels sont possibles sans clôture, et on peut continuer à verser (dans la limite des 150 000 € de plafond).",
  },
]

const HOWTO_PEA: HowToSchema = {
  name: "Calculer la fiscalité d'un retrait PEA",
  description: "Calcul du net après PS sur un retrait partiel ou total d'un PEA.",
  totalTime: "PT2M",
  steps: [
    { name: "Saisir valeur + versements", text: "Valeur actuelle du PEA et total des versements nets depuis l'ouverture." },
    { name: "Indiquer l'âge du PEA", text: "Détermine si l'exonération d'IR est active (5 ans)." },
    { name: "Saisir le montant retiré", text: "Pour estimer le net immédiat. Mettre 0 pour ne voir que le bilan." },
    { name: "Lire le détail", text: "Bilan brut/net + impôt sur le retrait + passif fiscal latent." },
  ],
}

// ─────────────────────────────────────────────────────────────
// Module
// ─────────────────────────────────────────────────────────────

export const modulePea: CalculatorModule<PeaInputs, PeaResults> = {
  slug: 'pea',
  nom: 'PEA - Fiscalité retrait + bilan latent',
  sources: SOURCES_PEA,
  faqSchema: FAQ_PEA,
  howToSchema: HOWTO_PEA,
  formatContexteChat: (inputs, results) =>
    [
      'CONTEXTE PEA :',
      ligne('Valeur actuelle', eur(inputs.valeurActuelle)),
      ligne('Versements', eur(inputs.versementsTotaux)),
      ligne('PV latente', eur(results.plusValueLatente)),
      ligne('Âge', `${inputs.agePeaAnnees.toFixed(1)} ans`),
      ligne('Exonération IR', results.exonerationIrActive ? 'oui (>5 ans)' : 'non (<5 ans)'),
      '',
      ligne('Vue brute', eur(results.vueBrute)),
      ligne('Vue nette sortie', eur(results.vueNetteSortie)),
      ligne('Passif latent', eur(results.passifLatentEstime)),
      ligne('Net retrait', `${eur(results.netRetrait)} sur ${eur(inputs.montantRetrait)}`),
    ].join('\n'),
}
