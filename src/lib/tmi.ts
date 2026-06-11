// src/lib/tmi.ts

import type { TMIInputs, TMIResults, TrancheDetail, SituationFamiliale } from '@/types/tmi'
import type { CalculatorModule } from '@/lib/calculators/types'
import { FAQ_TMI, HOWTO_TMI } from '@/lib/schema/schemaData'
import { formatEurRounded as eur, formatPct as pct, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_TMI = [
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051212954', label: 'Article 197 du CGI', desc: 'Barème progressif IR 2026 (revenus 2025), décote, plafonnement QF' },
  // LEGIARTI000006302756 retiré le 2026-05-31 (pointait vers Art 150-0 F, pas 194).
  // Cf. docs/broken-links-to-fix.md.
  { label: 'Article 194 du CGI' },
  // LEGISCTA000006179579 retiré le 2026-05-31 (re-route vers Art 200 A "valeurs mobilières", pas Art 195).
  { label: 'Article 195 du CGI' },
  { href: 'https://bofip.impots.gouv.fr/bofip/2491-PGP.html/identifiant=BOI-IR-LIQ-20-10-20260407', label: 'BOFiP BOI-IR-LIQ-20-10', desc: "Barème de l'impôt sur le revenu 2026 - publié le 07/04/2026" },
  { href: 'https://bofip.impots.gouv.fr/bofip/2495-PGP.html/identifiant=BOI-IR-LIQ-20-20-30-20250414', label: 'BOFiP BOI-IR-LIQ-20-20-30', desc: 'Décote - paramètres 2026 (indexation +0,9 % sur la base 2025)' },
]

// Barème IR 2026 (revenus 2025) - Art. 197 CGI, LF 2026 art. 4, indexation +0,9%
const BAREME_2026: Array<{ taux: number; min: number; max: number }> = [
  { taux: 0,  min: 0,      max: 11600 },
  { taux: 11, min: 11600,  max: 29579 },
  { taux: 30, min: 29579,  max: 84577 },
  { taux: 41, min: 84577,  max: 181917 },
  { taux: 45, min: 181917, max: Number.MAX_VALUE },
]

// Décote 2026 - Art. 197-I-4-a CGI (LF 2026 art. 4, version en vigueur 21/02/2026)
// Formule officielle : décote = limite − 45,25 % × IR brut (Art. 197 CGI)
const DECOTE_2026 = {
  celibataire: { limite: 897,  coefficient: 0.4525 },
  couple:      { limite: 1483, coefficient: 0.4525 },
}

// Plafond QF - Art. 197-IV CGI, LF 2026
const PLAFOND_DEMI_PART = 1807
// Parent isolé : 1re part entière (enfant + case T) plafonnée à 4 262 € au lieu de 2 × 1 807 = 3 614 €
const PLAFOND_PARENT_ISOLE_1ERE_PART = 4262

/**
 * Calcule le nombre de parts fiscales selon la situation familiale et les enfants à charge.
 * Art. 194 CGI (enfants), Art. 195 CGI (case T parent isolé)
 */
function calculerNombreParts(
  situationFamiliale: SituationFamiliale,
  nombreEnfants: number
): { partsTotal: number; partsBase: number; partsEnfants: number; partsCaseT: number } {
  const partsBase = situationFamiliale === 'marie-pacse' ? 2 : 1

  // Art. 194 CGI : 1 et 2e enfants → +0,5 part chacun ; 3e enfant et suivants → +1 part chacun
  let partsEnfants = 0
  for (let i = 1; i <= nombreEnfants; i++) {
    partsEnfants += i <= 2 ? 0.5 : 1
  }

  // Case T (parent isolé avec au moins 1 enfant) - Art. 195-1-c CGI
  const partsCaseT = situationFamiliale === 'parent-isole' && nombreEnfants >= 1 ? 0.5 : 0

  return {
    partsTotal: partsBase + partsEnfants + partsCaseT,
    partsBase,
    partsEnfants,
    partsCaseT,
  }
}

/**
 * Calcule l'IR brut (avant décote) pour un revenu et un nombre de parts donnés.
 */
function calculerIRPourNParts(revenuNetImposable: number, nombreParts: number): number {
  const revenuParPart = revenuNetImposable / nombreParts
  let irParPart = 0
  for (const tranche of BAREME_2026) {
    if (revenuParPart <= tranche.min) break
    const baseImposable = Math.min(revenuParPart, tranche.max) - tranche.min
    irParPart += baseImposable * (tranche.taux / 100)
  }
  return Math.round(irParPart * nombreParts)
}

/**
 * Détermine la TMI à partir du revenu par part.
 */
function determineTMI(revenuParPart: number): 0 | 11 | 30 | 41 | 45 {
  if (revenuParPart <= 11600) return 0
  if (revenuParPart <= 29579) return 11
  if (revenuParPart <= 84577) return 30
  if (revenuParPart <= 181917) return 41
  return 45
}

/**
 * Construit le détail des tranches pour affichage dans l'UI.
 */
function calculerDetailTranches(
  revenuNetImposable: number,
  nombreParts: number
): TrancheDetail[] {
  const revenuParPart = revenuNetImposable / nombreParts
  const tranches: TrancheDetail[] = []

  for (const tranche of BAREME_2026) {
    if (revenuParPart <= tranche.min) break

    const borneSupTotale = tranche.max === Number.MAX_VALUE ? null : tranche.max * nombreParts
    const baseParPart = Math.min(revenuParPart, tranche.max) - tranche.min
    const revenuDansLaTranche = baseParPart * nombreParts
    const impotDansLaTranche = revenuDansLaTranche * (tranche.taux / 100)

    tranches.push({
      taux: tranche.taux,
      borneInf: tranche.min * nombreParts,
      borneSup: borneSupTotale,
      revenuDansLaTranche: Math.round(revenuDansLaTranche),
      impotDansLaTranche: Math.round(impotDansLaTranche),
    })
  }

  return tranches
}

function evaluerAlertesTMI(p: {
  plafonnementActif: boolean
  reductionQFBrute: number
  reductionQFPlafond: number
  decoteApplicable: number
  tmi: number
  enCouple: boolean
}): { warnings: TMIResults['warnings']; optimisations: TMIResults['optimisations'] } {
  const warnings: TMIResults['warnings'] = []
  const optimisations: TMIResults['optimisations'] = []

  if (p.plafonnementActif) {
    warnings.push({
      type: 'warning',
      message: `Les enfants à charge baissent normalement l'impôt, mais la réduction est plafonnée à ${PLAFOND_DEMI_PART.toLocaleString('fr-FR')} € par demi-part au-delà du quotient de base (Art. 197-IV CGI). Ici, la réduction réelle est de ${p.reductionQFPlafond.toLocaleString('fr-FR')} € au lieu de ${Math.round(p.reductionQFBrute).toLocaleString('fr-FR')} € sans plafond.`,
    })
  }

  if (p.decoteApplicable > 0) {
    optimisations.push({
      type: 'info',
      message: `La décote s'applique : l'impôt est réduit de ${p.decoteApplicable.toLocaleString('fr-FR')} € (décote ${p.enCouple ? 'couple' : 'célibataire/parent isolé'}, Art. 197-I-4 CGI).`,
    })
  }

  if (p.tmi >= 30) {
    const gainPER1000 = Math.round(1000 * (p.tmi / 100))
    optimisations.push({
      type: 'info',
      message: `Avec une TMI à ${p.tmi} %, un versement de 1 000 € sur un PER individuel génère une économie d'impôt d'environ ${gainPER1000.toLocaleString('fr-FR')} € (sous réserve du plafond de déductibilité Art. 163 quatervicies CGI).`,
    })
  }

  return { warnings, optimisations }
}

/**
 * Calcule la TMI, l'IR net et le taux moyen d'imposition.
 *
 * @example
 * // Célibataire, 30 000 € de revenu net imposable, sans enfant
 * // Attendu : TMI 30 %, IR net 2 104 €, taux moyen 7,0 %
 * calculerTMIResult({ revenuNetImposable: 30000, situationFamiliale: 'celibataire', nombreEnfants: 0 })
 *
 * @example
 * // Marié, 2 enfants, 60 000 €
 * // Attendu : TMI 11 %, IR net 2 543 €, taux moyen 4,2 %
 * calculerTMIResult({ revenuNetImposable: 60000, situationFamiliale: 'marie-pacse', nombreEnfants: 2 })
 *
 * @example
 * // Célibataire, 1 enfant, 50 000 € (plafonnement QF)
 * // Attendu : IR net 6 297 €
 * calculerTMIResult({ revenuNetImposable: 50000, situationFamiliale: 'celibataire', nombreEnfants: 1 })
 */
export function calculerTMIResult(inputs: TMIInputs): TMIResults {
  const { revenuNetImposable, situationFamiliale, nombreEnfants } = inputs

  // 1. Nombre de parts
  const { partsTotal, partsBase, partsEnfants } = calculerNombreParts(
    situationFamiliale,
    nombreEnfants
  )

  const revenuParPart = revenuNetImposable / partsTotal

  // 2. IR avec QF total et IR base (sans enfants ni case T)
  const irAvecQF = calculerIRPourNParts(revenuNetImposable, partsTotal)
  const irSansQF = calculerIRPourNParts(revenuNetImposable, partsBase)

  // 3. Réduction QF brute
  const reductionQFBrute = Math.max(0, irSansQF - irAvecQF)

  // 4. Plafond de la réduction QF - Art. 197-IV CGI
  // Nombre de demi-parts enfants : 1er et 2e enfants = 1 demi-part chacun ; 3e+ = 2 demi-parts chacun
  const demiPartsEnfants = partsEnfants / 0.5

  let reductionQFPlafond = 0
  if (situationFamiliale === 'parent-isole' && nombreEnfants >= 1) {
    // 1re part (1er enfant 0,5 + case T 0,5) → plafond 4 262 €
    // Demi-parts supplémentaires (enfants 2e, 3e...) → 1 807 € chacune
    const demiPartsSupp = demiPartsEnfants - 1 // au-delà du 1er enfant
    reductionQFPlafond = PLAFOND_PARENT_ISOLE_1ERE_PART + demiPartsSupp * PLAFOND_DEMI_PART
  } else {
    reductionQFPlafond = demiPartsEnfants * PLAFOND_DEMI_PART
  }

  // 5. Application du plafonnement
  const reductionQFAppliquee = Math.min(reductionQFBrute, reductionQFPlafond)
  const plafonnementActif = nombreEnfants > 0 && reductionQFBrute > reductionQFPlafond
  const irBrut = Math.round(irSansQF - reductionQFAppliquee)

  // 6. Décote - Art. 197-I-4 CGI
  // Formule : décote = limite − (limite / seuil) × IR brut
  const enCouple = situationFamiliale === 'marie-pacse'
  const decoteParams = enCouple ? DECOTE_2026.couple : DECOTE_2026.celibataire
  let decoteApplicable = 0
  if (irBrut > 0) {
    decoteApplicable = Math.round(
      Math.max(0, decoteParams.limite - decoteParams.coefficient * irBrut)
    )
  }

  // 7. IR net
  const irNet = Math.max(0, irBrut - decoteApplicable)

  // 8. TMI et taux moyen
  const tmi = determineTMI(revenuNetImposable / partsTotal)
  const tauxMoyen =
    revenuNetImposable > 0
      ? Math.round((irNet / revenuNetImposable) * 1000) / 10
      : 0

  // 9. Détail tranches
  const detailTranches = calculerDetailTranches(revenuNetImposable, partsTotal)

  // 10. Warnings et optimisations
  const { warnings, optimisations } = evaluerAlertesTMI({
    plafonnementActif, reductionQFBrute, reductionQFPlafond, decoteApplicable, tmi, enCouple,
  })

  return {
    nombreParts: partsTotal,
    revenuParPart: Math.round(revenuParPart),
    irAvecQF,
    irSansQF,
    reductionQFBrute,
    reductionQFPlafond,
    reductionQFAppliquee,
    plafonnementActif,
    irBrut,
    decoteApplicable,
    irNet,
    tmi,
    tauxMoyen,
    detailTranches,
    warnings,
    optimisations,
  }
}

/** Formatte le contexte TMI pour le chatbot. */
export function formatContexteTMI(inputs: TMIInputs, r: TMIResults): string {
  const situation: Record<string, string> = {
    celibataire: 'célibataire',
    'marie-pacse': 'marié / pacsé',
    'parent-isole': 'parent isolé',
  }
  const lines = [
    "Calculateur : Tranche marginale d'imposition (TMI / IR)",
    '',
    'Situation fiscale',
    ligne('Revenu net imposable', eur(inputs.revenuNetImposable)),
    ligne('Situation familiale', situation[inputs.situationFamiliale] ?? inputs.situationFamiliale),
    ligne('Enfants à charge', String(inputs.nombreEnfants)),
    ligne('Nombre de parts QF', r.nombreParts.toFixed(2)),
    '',
    'Résultats',
    ligne('IR brut (avant décote)', eur(r.irBrut)),
    ligne('Décote appliquée', eur(r.decoteApplicable)),
    ligne('IR net à payer', eur(r.irNet)),
    ligne('Tranche marginale (TMI)', pct(r.tmi, 0)),
    ligne("Taux moyen d'imposition", pct(r.tauxMoyen)),
  ]
  if (r.plafonnementActif) {
    lines.push(ligne('Plafonnement QF', `actif - réduction limitée à ${eur(r.reductionQFPlafond)}`))
  }
  if (r.detailTranches.length > 0) {
    lines.push('', 'Détail par tranche')
    r.detailTranches
      .filter((t: TrancheDetail) => t.revenuDansLaTranche > 0)
      .forEach((t: TrancheDetail) => lines.push(
        ligne(`Tranche ${pct(t.taux, 0)}`, `${eur(t.revenuDansLaTranche)} imposés → ${eur(t.impotDansLaTranche)}`)
      ))
  }
  return lines.join('\n')
}

// Module calculateur unifié (cf. CONTEXT.md, ADR-0001)
export const moduleTmi: CalculatorModule<TMIInputs, TMIResults> = {
  slug: 'tmi',
  nom: "TMI - Impôt sur le revenu",
  sources: SOURCES_TMI,
  faqSchema: FAQ_TMI,
  howToSchema: HOWTO_TMI,
  formatContexteChat: formatContexteTMI,
}
