// src/lib/per.ts

import type { PERInputs, PERResults, PERDetailPlafond } from '@/types/per'
import type { CalculatorModule } from '@/lib/calculators/types'
import { FAQ_PER, HOWTO_PER } from '@/lib/schema/schemaData'
import { formatEurRounded as eur, formatPct as pct, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_PER = [
  // URLs Légifrance partiellement retirées le 2026-05-31. Cf. docs/broken-links-to-fix.md.
  { label: 'Article 163 quatervicies du CGI' },
  // LEGIARTI000044986838 retiré le 2026-05-31 (HTTP 404 round 1).
  { label: 'Article 83 du CGI' },
  // Section LEGISCTA000038619671 retirée le 2026-05-31 (HTTP 404 round 3).
  { label: "Articles L.224-1 et suivants du Code monétaire et financier" },
]

// PASS 2025 - Décret du 29 novembre 2024
const PASS_2025 = 47_100

// Art. 163 quatervicies I CGI - plafonds versements 2026 (base PASS 2025)
const MAX_PLAFOND_PER = Math.round(PASS_2025 * 8 * 0.10)  // 37 680 €
const MIN_PLAFOND_PER = Math.round(PASS_2025 * 1 * 0.10)  // 4 710 €

// Abattement forfaitaire 10 % frais professionnels - Art. 83 CGI, LF 2026 (revenus 2025)
const MIN_ABATTEMENT_FRAIS_PRO = 509
const MAX_ABATTEMENT_FRAIS_PRO = 14_555

/**
 * Calcule le détail du plafond de déduction PER pour un salarié.
 *
 * Formule (Art. 163 quatervicies CGI) :
 *   plafond annuel = max(MIN_PLAFOND, min(revenu_net_pro × 10 %, MAX_PLAFOND))
 *   revenu_net_pro = salaire − abattement_10 %
 *   abattement_10 % = max(MIN_ABATT, min(salaire × 10 %, MAX_ABATT))
 */
function calculerDetailPlafond(inputs: PERInputs): PERDetailPlafond {
  const { salaireNetAnnuel, versementEnvisage, plafondsReportesN1, plafondsReportesN2, plafondsReportesN3, plafondsReportesN4, plafondsReportesN5 } = inputs

  // 1. Abattement forfaitaire frais professionnels (Art. 83 CGI)
  const abattementBrut = salaireNetAnnuel * 0.10
  const abattementFraisPro = Math.round(
    Math.max(MIN_ABATTEMENT_FRAIS_PRO, Math.min(abattementBrut, MAX_ABATTEMENT_FRAIS_PRO))
  )

  // 2. Revenu net professionnel (base de calcul du plafond PER)
  const revenuNetProfessionnel = Math.max(0, salaireNetAnnuel - abattementFraisPro)

  // 3. Plafond annuel - borné entre MIN et MAX légaux
  const plafondBrut = revenuNetProfessionnel * 0.10
  const plafondAnnuel = Math.round(
    Math.max(MIN_PLAFOND_PER, Math.min(plafondBrut, MAX_PLAFOND_PER))
  )

  // 4. Total des reports (N-1 à N-5) - Art. 163 quatervicies I b) CGI, LF 2026 art. 10 (5 ans)
  const plafondsReportesTotal = Math.max(0, plafondsReportesN1)
    + Math.max(0, plafondsReportesN2)
    + Math.max(0, plafondsReportesN3)
    + Math.max(0, plafondsReportesN4)
    + Math.max(0, plafondsReportesN5)

  // 5. Plafond total disponible
  const plafondTotal = plafondAnnuel + plafondsReportesTotal

  // 6. Montant effectivement déductible
  const montantDeductible = Math.min(versementEnvisage, plafondTotal)
  const partNonDeductible = Math.max(0, versementEnvisage - plafondTotal)

  return {
    abattementFraisPro,
    revenuNetProfessionnel,
    plafondAnnuel,
    plafondsReportesTotal,
    plafondTotal,
    montantDeductible,
    partNonDeductible,
  }
}

/**
 * Calcule l'économie d'impôt générée par un versement volontaire sur un PER individuel.
 *
 * Périmètre : PERIN, salarié, versements déductibles (compartiment 1).
 * Millésime : versements 2026 sur revenus 2025 (PASS 2025 = 47 100 €).
 *
 * @example
 * // Salarié 60 000 €, TMI 30 %, versement 3 000 €, sans reports
 * // Attendu : économie 900 €, coût net 2 100 €, plafond 5 400 €
 * calculerPER({ salaireNetAnnuel: 60000, tmi: 30, versementEnvisage: 3000,
 *   plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0 })
 *
 * @example
 * // Salarié 50 000 €, TMI 30 %, versement 5 000 € (dépassement plafond)
 * // Plafond = 4 710 € (minimum légal s'applique car 10 % × 45 000 = 4 500 < MIN)
 * // Attendu : économie 1 413 €, part non déductible 290 €
 * calculerPER({ salaireNetAnnuel: 50000, tmi: 30, versementEnvisage: 5000,
 *   plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0 })
 *
 * @example
 * // Salarié 50 000 €, TMI 41 %, versement 10 000 €, report N-1 = 3 000 €
 * // Plafond total = 4 710 + 3 000 = 7 710 €
 * // Attendu : économie 3 161 €, coût net 6 839 €
 * calculerPER({ salaireNetAnnuel: 50000, tmi: 41, versementEnvisage: 10000,
 *   plafondsReportesN1: 3000, plafondsReportesN2: 0, plafondsReportesN3: 0 })
 */
function evaluerAlertesPER(
  tmi: PERInputs['tmi'],
  versementEnvisage: number,
  detail: PERDetailPlafond
): { warnings: PERResults['warnings']; optimisations: PERResults['optimisations'] } {
  const warnings: PERResults['warnings'] = []
  const optimisations: PERResults['optimisations'] = []

  warnings.push({
    type: 'info',
    message: `Cette économie est reportée, pas annulée. À la retraite, au moment de récupérer l'argent : la part qui correspond à vos versements sera imposée à l'IR (au barème de l'année concernée), les gains seront soumis aux prélèvements sociaux (18,6 %). L'avantage final dépend donc de l'écart entre votre TMI aujourd'hui (${tmi} %) et votre TMI à la retraite.`,
  })

  if (detail.partNonDeductible > 0) {
    warnings.push({
      type: 'danger',
      message: `Votre versement de ${versementEnvisage.toLocaleString('fr-FR')} € dépasse de ${detail.partNonDeductible.toLocaleString('fr-FR')} € le plafond déductible. Seuls ${detail.montantDeductible.toLocaleString('fr-FR')} € réduisent votre revenu imposable cette année. Le surplus (${detail.partNonDeductible.toLocaleString('fr-FR')} €) reste placé sur le PER et continue à produire des intérêts, mais sans effet sur l'impôt de cette année.`,
    })
  }

  if (tmi === 0) {
    warnings.push({
      type: 'info',
      message: `À TMI 0 %, le versement PER ne génère pas d'économie d'impôt immédiate. L'avantage fiscal du PER se produira à la sortie si votre TMI à la retraite est inférieure à votre TMI actuelle.`,
    })
  }

  if (tmi === 11) {
    warnings.push({
      type: 'info',
      message: `À TMI 11 %, l'économie fiscale est limitée. Si le versement fait passer une partie du revenu dans la tranche à 0 %, l'économie sur cette fraction est nulle. Le calculateur affiche l'économie réelle en conséquence.`,
    })
  }

  if (versementEnvisage > 0 && detail.partNonDeductible === 0) {
    const margeRestante = detail.plafondTotal - versementEnvisage
    if (margeRestante >= 1000) {
      const gainSupplementaire = Math.round(margeRestante * (tmi / 100))
      optimisations.push({
        type: 'info',
        message: `Votre plafond disponible n'est pas entièrement utilisé. En versant ${margeRestante.toLocaleString('fr-FR')} € supplémentaires (jusqu'au plafond total de ${detail.plafondTotal.toLocaleString('fr-FR')} €), vous pourriez économiser ${gainSupplementaire.toLocaleString('fr-FR')} € d'impôt de plus.`,
        gain: gainSupplementaire,
      })
    }
  }

  if (detail.plafondsReportesTotal === 0 && tmi >= 30) {
    optimisations.push({
      type: 'info',
      message: `Les plafonds non utilisés des 5 dernières années (N-1 à N-5) sont reportables depuis la LF 2026 (Art. 163 quatervicies I b) CGI). Ces montants figurent sur votre avis d'imposition (rubrique "Plafonds disponibles pour les versements retraite").`,
    })
  }

  return { warnings, optimisations }
}

export function calculerPER(inputs: PERInputs): PERResults {
  const { tmi, versementEnvisage } = inputs

  // 1. Calcul du plafond
  const detail = calculerDetailPlafond(inputs)

  // 2. Économie fiscale sur la part déductible
  const economieFiscale = Math.round(detail.montantDeductible * (tmi / 100))

  // 3. Coût net réel du versement
  const coutNetReel = versementEnvisage - economieFiscale

  // 4. Rendement fiscal (économie / versement total)
  const rendementFiscal =
    versementEnvisage > 0
      ? Math.round((economieFiscale / versementEnvisage) * 1000) / 10
      : 0

  // 5. Warnings et optimisations
  const { warnings, optimisations } = evaluerAlertesPER(tmi, versementEnvisage, detail)

  return {
    detail,
    economieFiscale,
    coutNetReel,
    rendementFiscal,
    warnings,
    optimisations,
  }
}

/** Formatte le contexte PER pour le chatbot. */
export function formatContextePER(inputs: PERInputs, r: PERResults): string {
  const d = r.detail
  const lines = [
    "Calculateur : PER individuel - économie d'impôt sur versement",
    '',
    'Situation fiscale',
    ligne('Salaire net annuel', eur(inputs.salaireNetAnnuel)),
    ligne('TMI', pct(inputs.tmi, 0)),
    ligne('Versement PER envisagé', eur(inputs.versementEnvisage)),
    '',
    'Plafond disponible',
    ligne("Plafond de l'année (10 % du revenu net)", eur(d.plafondAnnuel)),
    ligne('Reports N-1 à N-5 cumulés', eur(d.plafondsReportesTotal)),
    ligne('Plafond total utilisable', eur(d.plafondTotal)),
    ligne('Montant effectivement déductible', eur(d.montantDeductible)),
  ]
  if (d.partNonDeductible > 0) {
    lines.push(ligne('Part non déductible (dépassement plafond)', eur(d.partNonDeductible)))
  }
  lines.push(
    '',
    'Résultats',
    ligne('Économie fiscale', eur(r.economieFiscale)),
    ligne('Coût net réel du versement', eur(r.coutNetReel)),
    ligne('Rendement fiscal immédiat', pct(r.rendementFiscal)),
  )
  return lines.join('\n')
}

// Module calculateur unifié (cf. CONTEXT.md, ADR-0001)
export const modulePer: CalculatorModule<PERInputs, PERResults> = {
  slug: 'per-individuel',
  nom: 'PER individuel',
  sources: SOURCES_PER,
  faqSchema: FAQ_PER,
  howToSchema: HOWTO_PER,
  formatContexteChat: formatContextePER,
}
