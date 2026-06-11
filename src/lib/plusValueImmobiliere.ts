// src/lib/plusValueImmobiliere.ts

import type { PlusValueImmobiliereInputs, PlusValueImmobiliereResults } from '@/types/plusValueImmobiliere'
import type { CalculatorModule } from '@/lib/calculators/types'
import { FAQ_PLUS_VALUE, HOWTO_PLUS_VALUE } from '@/lib/schema/schemaData'
import { formatEurRounded as eur, formatPct as pct, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_PLUS_VALUE = [
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053544910', label: 'Article 150 U du CGI', desc: "Champ d'application - plus-values immobilières des particuliers" },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053544785', label: 'Article 150 VB du CGI', desc: "Frais d'acquisition (forfait 7,5 %) et travaux (forfait 15 % si > 5 ans)" },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047970756', label: 'Article 150 VC du CGI', desc: "Abattement IR : 6 %/an de la 6e à la 21e année, 4 % la 22e - exonération à 22 ans" },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053584839', label: 'Article L136-7 CSS (VI 2)', desc: 'Abattements PS pour durée de détention : 1,65 %/an (6e-21e), 1,60 % (22e), 9 %/an (23e-29e) - exonération à 30 ans' },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047970809', label: 'Article 150 VD du CGI', desc: "Moins-values immobilières - non imputables sauf vente d'immeuble acquis par fractions successives" },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048806252', label: 'Article 1609 nonies G du CGI', desc: 'Taxe additionnelle (surtaxe) sur plus-values > 50 000 € - de 2 % à 6 %' },
  { href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F10864', label: 'Service-Public.fr - Plus-value immobilière', desc: 'Synthèse officielle des règles applicables (vérifié le 15/04/2026)' },
]

// --- Constantes fiscales ---

const TAUX_IR = 0.19                     // Art. 200 B CGI
const TAUX_PS = 0.172                    // Art. L.136-7 CSS (2° du I) - plus-values Art. 150 U à 150 UC CGI
const FORFAIT_FRAIS = 0.075              // Art. 150 VB CGI
const FORFAIT_TRAVAUX = 0.15             // Art. 150 VB CGI (si détention > 5 ans)
const SEUIL_EXONERATION_PRIX = 15000    // Art. 150 U II 6° CGI
const SEUIL_SURTAXE = 50000             // Art. 1609 nonies G CGI

/**
 * Calcule le nombre d'années complètes de détention entre acquisition et cession.
 * Comptage en années calendaires complètes (méthode anniversaire).
 */
function calculerAnneesDetention(dateAcquisition: Date, dateCession: Date): number {
  let annees = dateCession.getFullYear() - dateAcquisition.getFullYear()
  const mAcq = dateAcquisition.getMonth()
  const jAcq = dateAcquisition.getDate()
  const mCess = dateCession.getMonth()
  const jCess = dateCession.getDate()

  if (mCess < mAcq || (mCess === mAcq && jCess < jAcq)) {
    annees--
  }

  return Math.max(0, annees)
}

/**
 * Calcule les taux d'abattement pour durée de détention.
 *
 * IR (Art. 150 VC CGI) :
 *   - 0 % si ≤ 5 ans
 *   - 6 %/an de la 6e à la 21e année
 *   - +4 % à la 22e → exonération totale
 *
 * PS (Art. L136-7 CSS VI 2) :
 *   - 0 % si ≤ 5 ans
 *   - 1,65 %/an de la 6e à la 21e année
 *   - +1,60 % à la 22e → 28 %
 *   - 9 %/an de la 23e à la 29e année
 *   - 100 % à 30 ans
 */
function calculerTauxAbattement(annees: number): { ir: number; ps: number } {
  let ir = 0
  let ps = 0

  // Abattement IR
  if (annees >= 22) {
    ir = 1
  } else if (annees >= 6) {
    ir = (annees - 5) * 0.06
  }

  // Abattement PS
  if (annees >= 30) {
    ps = 1
  } else if (annees >= 23) {
    ps = 0.28 + (annees - 22) * 0.09
  } else if (annees >= 22) {
    ps = 0.28
  } else if (annees >= 6) {
    ps = (annees - 5) * 0.0165
  }

  return { ir: Math.min(ir, 1), ps: Math.min(ps, 1) }
}

/**
 * Calcule la surtaxe sur les plus-values élevées (Art. 1609 nonies G CGI).
 * Appliquée sur la PV nette IR (même base que l'imposition à 19 %).
 * Les formules de tempérament à chaque seuil évitent un effet de palier brutal.
 *
 * @example
 * calculerSurtaxe(0) === 0
 * calculerSurtaxe(55000) === 850   // 55000 × 2% − (60000 − 55000) / 20 = 1100 − 250 = 850
 * calculerSurtaxe(80000) === 1600  // 80000 × 2%
 * calculerSurtaxe(255000) === 14050 // 255000 × 6% − (260000 − 255000) × 25% = 15300 − 1250
 */
function calculerSurtaxe(pvNetteIR: number): number {
  if (pvNetteIR <= SEUIL_SURTAXE) return 0
  if (pvNetteIR <= 60000)  return pvNetteIR * 0.02 - (60000  - pvNetteIR) / 20
  if (pvNetteIR <= 100000) return pvNetteIR * 0.02
  if (pvNetteIR <= 110000) return pvNetteIR * 0.03 - (110000 - pvNetteIR) / 10
  if (pvNetteIR <= 150000) return pvNetteIR * 0.03
  if (pvNetteIR <= 160000) return pvNetteIR * 0.04 - (160000 - pvNetteIR) * 3 / 20
  if (pvNetteIR <= 200000) return pvNetteIR * 0.04
  if (pvNetteIR <= 210000) return pvNetteIR * 0.05 - (210000 - pvNetteIR) / 5
  if (pvNetteIR <= 250000) return pvNetteIR * 0.05
  if (pvNetteIR <= 260000) return pvNetteIR * 0.06 - (260000 - pvNetteIR) * 0.25
  return pvNetteIR * 0.06
}

/**
 * Calcule la fiscalité d'une plus-value immobilière (résidence secondaire / bien locatif).
 * Résidence principale : exonération totale (Art. 150 U II 1° CGI).
 *
 * @example
 * // Exemple 1 - 8 ans de détention, PV brute 75 000 €
 * const r = calculerPlusValueImmobiliere({
 *   dateAcquisition: '2018-01-01',
 *   prixAcquisition: 200000,
 *   fraisAcquisition: 'forfait',
 *   fraisAcquisitionReels: 0,
 *   travaux: 'forfait',
 *   travauxReels: 0,
 *   dateCession: '2026-01-01',
 *   prixCession: 320000,
 *   typeBien: 'autre',
 *   premiereCession: false,
 * })
 * // r.pvBrute ≈ 75000, r.impotRevenu ≈ 11685, r.prelevementsSociaux ≈ 12261, r.surtaxe ≈ 1230
 *
 * @example
 * // Exemple 2 - Moins-value (aucune imposition)
 * const r = calculerPlusValueImmobiliere({
 *   dateAcquisition: '2022-01-01', prixAcquisition: 350000,
 *   fraisAcquisition: 'forfait', fraisAcquisitionReels: 0,
 *   travaux: 'aucun', travauxReels: 0,
 *   dateCession: '2026-01-01', prixCession: 360000,
 *   typeBien: 'autre', premiereCession: false,
 * })
 * // r.pvBrute = 360000 − (350000 + 26250) = −16250 → r.totalImpots = 0
 */
export function calculerPlusValueImmobiliere(
  inputs: PlusValueImmobiliereInputs
): PlusValueImmobiliereResults {
  const dateAcq  = new Date(inputs.dateAcquisition)
  const dateCess = new Date(inputs.dateCession)

  // 1. Durée de détention
  const anneesDetention = calculerAnneesDetention(dateAcq, dateCess)

  // 2. Prix de revient ajusté (Art. 150 VB CGI)
  const fraisDeductibles = inputs.fraisAcquisition === 'forfait'
    ? inputs.prixAcquisition * FORFAIT_FRAIS
    : inputs.fraisAcquisitionReels

  const forfaitDisponible = anneesDetention > 5
  let travauxDeductibles = 0
  if (inputs.travaux === 'forfait' && forfaitDisponible) {
    travauxDeductibles = inputs.prixAcquisition * FORFAIT_TRAVAUX
  } else if (inputs.travaux === 'reel') {
    travauxDeductibles = inputs.travauxReels
  }

  const prixRevient = inputs.prixAcquisition + fraisDeductibles + travauxDeductibles

  // 3. Plus-value brute
  const pvBrute = inputs.prixCession - prixRevient

  // 4. Calcul des milestones d'exonération
  const anneesAvantExoIR = anneesDetention >= 22 ? 0 : 22 - anneesDetention
  const anneesAvantExoPS = anneesDetention >= 30 ? 0 : 30 - anneesDetention

  // 5. Vérifications exonérations
  const baseResult = {
    prixRevient, fraisDeductibles, travauxDeductibles, pvBrute, anneesDetention,
    anneesAvantExoIR, anneesAvantExoPS,
  }

  // 5a. Résidence principale (Art. 150 U II 1° CGI)
  if (inputs.typeBien === 'principal') {
    return buildResultExoneree(baseResult, 'Résidence principale : exonération totale (Art. 150 U II 1° CGI)')
  }

  // 5b. 1ère cession hors résidence principale (Art. 150 U II 7° CGI)
  if (inputs.premiereCession) {
    return buildResultExoneree(baseResult, '1ère cession hors résidence principale : exonération totale sous conditions de remploi (Art. 150 U II 7° CGI)')
  }

  // 5c. Prix de cession ≤ 15 000 € (Art. 150 U II 6° CGI)
  if (inputs.prixCession <= SEUIL_EXONERATION_PRIX) {
    return buildResultExoneree(baseResult, `Prix de cession ≤ ${SEUIL_EXONERATION_PRIX.toLocaleString('fr-FR')} € : exonération totale (Art. 150 U II 6° CGI)`)
  }

  // 5d. Moins-value : pas d'imposition
  if (pvBrute <= 0) {
    return buildResultMoinsValue(baseResult)
  }

  // 6. Abattements pour durée de détention (Art. 150 VC et 150 VD CGI)
  const { ir: tauxIR, ps: tauxPS } = calculerTauxAbattement(anneesDetention)

  const abattementIR = Math.round(pvBrute * tauxIR)
  const abattementPS = Math.round(pvBrute * tauxPS)

  const pvNetteIR = tauxIR >= 1 ? 0 : pvBrute - abattementIR
  const pvNettePS = tauxPS >= 1 ? 0 : pvBrute - abattementPS

  // 7. Calcul des impôts
  const impotRevenu        = Math.round(pvNetteIR * TAUX_IR)
  const prelevementsSociaux = Math.round(pvNettePS * TAUX_PS)
  const surtaxe            = Math.round(calculerSurtaxe(pvNetteIR))
  const totalImpots        = impotRevenu + prelevementsSociaux + surtaxe
  const netPercu           = inputs.prixCession - totalImpots

  // 8. Warnings et optimisations
  const warnings: PlusValueImmobiliereResults['warnings']      = []
  const optimisations: PlusValueImmobiliereResults['optimisations'] = []

  // Info : exonération IR prochaine
  if (anneesAvantExoIR > 0 && anneesAvantExoIR <= 4 && pvBrute > 0) {
    const pvNetteIRFuture = pvBrute * (1 - Math.min((anneesDetention + anneesAvantExoIR - 5) * 0.06 + (anneesAvantExoIR === 1 ? 0.04 : 0), 1))
    const economieFuture  = impotRevenu + calculerSurtaxe(pvNetteIRFuture > 0 ? pvNetteIRFuture : 0)
    if (economieFuture > 1000) {
      optimisations.push({
        type: 'info',
        message: `En attendant ${anneesAvantExoIR} an${anneesAvantExoIR > 1 ? 's' : ''}, la plus-value serait exonérée d'IR (19 %). L'économie sur l'impôt de 19 % et la surtaxe serait d'environ ${Math.round(impotRevenu + surtaxe).toLocaleString('fr-FR')} €.`,
        gain: impotRevenu + surtaxe,
      })
    }
  }

  // Avertissement : exonération IR déjà acquise, PS encore dus
  if (anneesAvantExoIR === 0 && anneesAvantExoPS > 0) {
    warnings.push({
      type: 'info',
      message: `Bien exonéré d'IR (22 ans de détention). Les prélèvements sociaux (17,2 %) restent dus jusqu'à ${anneesAvantExoPS} an${anneesAvantExoPS > 1 ? 's' : ''} de détention supplémentaire${anneesAvantExoPS > 1 ? 's' : ''} (exonération totale à 30 ans).`,
    })
  }

  // Avertissement : surtaxe applicable
  if (surtaxe > 0) {
    const tauxEffectif = pvNetteIR > 0 ? ((surtaxe / pvNetteIR) * 100).toFixed(1) : '0'
    warnings.push({
      type: 'warning',
      message: `Surtaxe applicable (Art. 1609 nonies G CGI) : la plus-value nette imposable dépasse 50 000 €. Surtaxe estimée : ${surtaxe.toLocaleString('fr-FR')} € (taux effectif ${tauxEffectif} %). Montant définitif calculé par le notaire.`,
    })
  }

  // Optimisation : forfait travaux non utilisé
  if (inputs.travaux === 'aucun' && forfaitDisponible && pvBrute > 0) {
    const travauxForfait  = inputs.prixAcquisition * FORFAIT_TRAVAUX
    const pvBruteForfait  = pvBrute - travauxForfait
    if (pvBruteForfait > 0) {
      const { ir: tirF, ps: tpsF } = calculerTauxAbattement(anneesDetention)
      const pvIRF   = pvBruteForfait * (1 - tirF)
      const pvPSF   = pvBruteForfait * (1 - tpsF)
      const totalF  = Math.round(pvIRF * TAUX_IR + pvPSF * TAUX_PS + calculerSurtaxe(pvIRF))
      const gain    = totalImpots - totalF
      if (gain > 500) {
        optimisations.push({
          type: 'success',
          message: `En appliquant le forfait travaux de 15 % (${travauxForfait.toLocaleString('fr-FR')} €), vous économiseriez environ ${gain.toLocaleString('fr-FR')} € d'impôts. Ce forfait est disponible sans justificatif si vous détenez le bien depuis plus de 5 ans et que les travaux n'ont pas été déduits des revenus fonciers.`,
          gain,
        })
      }
    }
  }

  // Optimisation : frais réels potentiellement supérieurs au forfait
  if (inputs.fraisAcquisition === 'forfait' && inputs.prixAcquisition > 0) {
    optimisations.push({
      type: 'info',
      message: `Les frais d'acquisition sont calculés au forfait de 7,5 % (${fraisDeductibles.toLocaleString('fr-FR')} €). Si les frais réels (droits d'enregistrement + honoraires notaire) dépassent ce montant, passer en mode "réels" baisse la plus-value imposable d'autant.`,
    })
  }

  return {
    ...baseResult,
    exoneree: false,
    tauxAbattementIR: tauxIR * 100,
    tauxAbattementPS: tauxPS * 100,
    abattementIR,
    abattementPS,
    pvNetteIR,
    pvNettePS,
    impotRevenu,
    prelevementsSociaux,
    surtaxe,
    totalImpots,
    netPercu,
    surtaxeApplicable: surtaxe > 0,
    tauxSurtaxeEffectif: pvNetteIR > 0 ? (surtaxe / pvNetteIR) * 100 : 0,
    warnings,
    optimisations,
  }
}

// --- Helpers résultats ---

type BaseResult = {
  prixRevient: number
  fraisDeductibles: number
  travauxDeductibles: number
  pvBrute: number
  anneesDetention: number
  anneesAvantExoIR: number
  anneesAvantExoPS: number
}

function buildResultExoneree(
  base: BaseResult,
  motif: string
): PlusValueImmobiliereResults {
  return {
    ...base,
    exoneree: true,
    motifExoneration: motif,
    tauxAbattementIR: 100,
    tauxAbattementPS: 100,
    abattementIR: Math.max(0, base.pvBrute),
    abattementPS: Math.max(0, base.pvBrute),
    pvNetteIR: 0,
    pvNettePS: 0,
    impotRevenu: 0,
    prelevementsSociaux: 0,
    surtaxe: 0,
    totalImpots: 0,
    netPercu: base.pvBrute > 0 ? base.prixRevient + base.pvBrute : base.prixRevient + base.pvBrute,
    surtaxeApplicable: false,
    tauxSurtaxeEffectif: 0,
    warnings: [],
    optimisations: [],
  }
}

export function formatContextePlusValue(inputs: PlusValueImmobiliereInputs, r: PlusValueImmobiliereResults): string {
  const lines = [
    'Calculateur : Plus-value immobilière',
    '',
    'Acquisition / cession',
    ligne('Date acquisition', inputs.dateAcquisition),
    ligne('Prix acquisition', eur(inputs.prixAcquisition)),
    ligne('Frais acquisition', inputs.fraisAcquisition === 'forfait' ? `forfait 7,5 % (${eur(r.fraisDeductibles)})` : `réels (${eur(r.fraisDeductibles)})`),
    ligne('Travaux', inputs.travaux === 'aucun' ? 'aucun' : inputs.travaux === 'forfait' ? `forfait 15 % (${eur(r.travauxDeductibles)})` : `réels (${eur(r.travauxDeductibles)})`),
    ligne('Date cession', inputs.dateCession),
    ligne('Prix cession', eur(inputs.prixCession)),
    ligne('Durée détention', `${r.anneesDetention} an${r.anneesDetention > 1 ? 's' : ''}`),
    ligne('Nature du bien', inputs.typeBien === 'principal' ? 'résidence principale' : 'autre (secondaire / locatif)'),
    '',
    'Résultats',
    ligne('Prix de revient ajusté', eur(r.prixRevient)),
    ligne('Plus-value brute', eur(r.pvBrute)),
  ]

  if (r.exoneree) {
    lines.push(ligne('Exonération', r.motifExoneration ?? 'totale'))
    lines.push(ligne('Total impôts', '0 €'))
  } else if (r.pvBrute <= 0) {
    lines.push(ligne('Résultat', 'moins-value - aucune imposition'))
  } else {
    lines.push(
      ligne('Abattement IR', `${pct(r.tauxAbattementIR)} → base ${eur(r.pvNetteIR)}`),
      ligne('Abattement PS', `${pct(r.tauxAbattementPS)} → base ${eur(r.pvNettePS)}`),
      ligne('IR 19 %', eur(r.impotRevenu)),
      ligne('Prélèvements sociaux 17,2 %', eur(r.prelevementsSociaux)),
    )
    if (r.surtaxe > 0) {
      lines.push(ligne(`Surtaxe (taux eff. ${pct(r.tauxSurtaxeEffectif, 2)})`, eur(r.surtaxe)))
    }
    lines.push(
      ligne('Total impôts', eur(r.totalImpots)),
      ligne('Net perçu (cession − impôts)', eur(r.netPercu)),
    )
    if (r.anneesAvantExoIR > 0) {
      lines.push(ligne('Exo IR dans', `${r.anneesAvantExoIR} an${r.anneesAvantExoIR > 1 ? 's' : ''}`))
    }
    if (r.anneesAvantExoPS > 0) {
      lines.push(ligne('Exo PS totale dans', `${r.anneesAvantExoPS} an${r.anneesAvantExoPS > 1 ? 's' : ''}`))
    }
  }

  return lines.join('\n')
}

function buildResultMoinsValue(base: BaseResult): PlusValueImmobiliereResults {
  return {
    ...base,
    exoneree: false,
    tauxAbattementIR: 0,
    tauxAbattementPS: 0,
    abattementIR: 0,
    abattementPS: 0,
    pvNetteIR: 0,
    pvNettePS: 0,
    impotRevenu: 0,
    prelevementsSociaux: 0,
    surtaxe: 0,
    totalImpots: 0,
    netPercu: base.prixRevient + base.pvBrute,
    surtaxeApplicable: false,
    tauxSurtaxeEffectif: 0,
    warnings: [{
      type: 'info',
      message: `Moins-value de ${Math.abs(base.pvBrute).toLocaleString('fr-FR')} € : aucune imposition. La moins-value immobilière n'est pas imputable sur d'autres revenus ni reportable.`,
    }],
    optimisations: [],
  }
}

// Module calculateur unifié (cf. CONTEXT.md, ADR-0001)
export const modulePlusValue: CalculatorModule<PlusValueImmobiliereInputs, PlusValueImmobiliereResults> = {
  slug: 'plus-value-immobiliere',
  nom: 'Plus-value immobilière',
  sources: SOURCES_PLUS_VALUE,
  faqSchema: FAQ_PLUS_VALUE,
  howToSchema: HOWTO_PLUS_VALUE,
  formatContexteChat: formatContextePlusValue,
}
