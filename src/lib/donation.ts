// src/lib/donation.ts

import type {
  DonationInputs,
  DonationResults,
  LienParente,
  TrancheDonation,
} from '@/types/donation'
import type { CalculatorModule } from '@/lib/calculators/types'
import { FAQ_DONATION, HOWTO_DONATION } from '@/lib/schema/schemaData'
import { formatEurRounded as eur, formatPct as pct, formatLigne as ligne } from '@/lib/formatters'

export const SOURCES_DONATION = [
  // Légifrance partiellement retirés le 2026-05-31. Cf. docs/broken-links-to-fix.md.
  { label: 'Article 777 du CGI' },
  // URL restaurée le 2026-05-31 (crawl round 2 : LEGIARTI alternatif valide).
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000026292566', label: 'Article 779 du CGI', desc: 'Abattements personnels par lien de parenté (100 000 € enfant, 15 932 € frère-sœur, etc.)' },
  { label: 'Article 784 du CGI' },
  // LEGIARTI000038588107 retiré le 2026-05-31 (HTTP 404 round 2).
  { label: 'Article 790 E du CGI' },
  { label: 'Article 790 G du CGI' },
  // BOFiP 3845 retiré le 2026-05-31 (URL re-route vers PV biens meubles, pas donation).
  { label: 'BOFiP BOI-ENR-DMTG-20-30-20-20' },
  { href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F14203', label: 'Service-public.gouv.fr F14203', desc: 'Donation : calcul des droits - source secondaire confirmée le 2026-05-30' },
]

// ─────────────────────────────────────────────────────────────
// Abattements personnels (en €) - Art. 779 / 790 E CGI, barème 2026
// ─────────────────────────────────────────────────────────────
const ABATTEMENTS: Record<LienParente, number> = {
  enfant:       100000, // Art. 779-I CGI
  parent:       100000, // Art. 779-I CGI (ligne directe ascendante)
  petit_enfant: 31865,  // Art. 790 B CGI - abattement petits-enfants
  epoux_pacs:   80724,  // Art. 790 E CGI
  frere_soeur:  15932,  // Art. 779-IV CGI
  neveu_niece:  7967,   // Art. 779-V CGI
  autre_4e:     0,      // Aucun abattement personnel
  non_parent:   0,      // Aucun abattement personnel
}

const ABATTEMENT_HANDICAP = 159325 // Art. 779-II CGI - cumulable
const ABATTEMENT_790G = 31865      // Art. 790 G CGI - cumulable, don familial somme d'argent

// ─────────────────────────────────────────────────────────────
// Barèmes (Art. 777 CGI - tableaux I à IV) - en vigueur 2026
// ─────────────────────────────────────────────────────────────
interface Tranche {
  taux: number   // en %
  min: number    // borne inférieure (base taxable cumulée)
  max: number    // borne supérieure
}

// Tableau I - ligne directe (enfant, parent, petit-enfant)
const BAREME_LIGNE_DIRECTE: Tranche[] = [
  { taux: 5,  min: 0,       max: 8072 },
  { taux: 10, min: 8072,    max: 12109 },
  { taux: 15, min: 12109,   max: 15932 },
  { taux: 20, min: 15932,   max: 552324 },
  { taux: 30, min: 552324,  max: 902838 },
  { taux: 40, min: 902838,  max: 1805677 },
  { taux: 45, min: 1805677, max: Number.MAX_VALUE },
]

// Tableau II - époux / partenaires de PACS
const BAREME_EPOUX_PACS: Tranche[] = [
  { taux: 5,  min: 0,       max: 8072 },
  { taux: 10, min: 8072,    max: 15932 },
  { taux: 15, min: 15932,   max: 31865 },
  { taux: 20, min: 31865,   max: 552324 },
  { taux: 30, min: 552324,  max: 902838 },
  { taux: 40, min: 902838,  max: 1805677 },
  { taux: 45, min: 1805677, max: Number.MAX_VALUE },
]

// Tableau III - frères et sœurs
const BAREME_FRERE_SOEUR: Tranche[] = [
  { taux: 35, min: 0,     max: 24430 },
  { taux: 45, min: 24430, max: Number.MAX_VALUE },
]

// Tableau IV - neveux/nièces et autres parents jusqu'au 4e degré (55 %)
const BAREME_NEVEU_NIECE: Tranche[] = [
  { taux: 55, min: 0, max: Number.MAX_VALUE },
]

// Tableau IV - non parents ou au-delà du 4e degré (60 %)
const BAREME_NON_PARENT: Tranche[] = [
  { taux: 60, min: 0, max: Number.MAX_VALUE },
]

function getBareme(lien: LienParente): Tranche[] {
  switch (lien) {
    case 'enfant':
    case 'parent':
    case 'petit_enfant':
      return BAREME_LIGNE_DIRECTE
    case 'epoux_pacs':
      return BAREME_EPOUX_PACS
    case 'frere_soeur':
      return BAREME_FRERE_SOEUR
    case 'neveu_niece':
    case 'autre_4e':
      return BAREME_NEVEU_NIECE
    case 'non_parent':
      return BAREME_NON_PARENT
  }
}

/**
 * Applique le barème par tranches à une base taxable et retourne le détail tranche par tranche.
 * Gère le rappel fiscal Art. 784 CGI : si des donations antérieures consomment déjà une
 * fraction des tranches basses, on les exclut du calcul.
 */
function appliquerBareme(
  baseTaxable: number,
  tranchesConsomeesParRappel: number,
  bareme: Tranche[]
): { droits: number; detail: TrancheDonation[] } {
  const detail: TrancheDonation[] = []
  let droits = 0

  // La donation actuelle "démarre" au-dessus de la fraction déjà consommée
  // par les donations antérieures (rappel 15 ans).
  const debut = tranchesConsomeesParRappel
  const fin = debut + baseTaxable

  for (const t of bareme) {
    if (fin <= t.min) break

    // Fraction de la donation actuelle qui tombe dans cette tranche
    const borneBasse = Math.max(t.min, debut)
    const borneHaute = Math.min(t.max, fin)

    if (borneHaute <= borneBasse) continue

    const baseDansLaTranche = borneHaute - borneBasse
    const droitsDansLaTranche = baseDansLaTranche * (t.taux / 100)
    droits += droitsDansLaTranche

    detail.push({
      taux: t.taux,
      borneInf: t.min,
      borneSup: t.max === Number.MAX_VALUE ? null : t.max,
      baseDansLaTranche: Math.round(baseDansLaTranche),
      droitsDansLaTranche: Math.round(droitsDansLaTranche),
    })
  }

  return { droits, detail }
}

/**
 * Vérifie que les conditions du don familial de sommes d'argent (Art. 790 G CGI)
 * sont remplies. Conditions cumulatives :
 * - Donateur âgé de moins de 80 ans.
 * - Donataire majeur ou mineur émancipé.
 * - Lien éligible : descendant (enfant, petit-enfant, arrière-petit-enfant) ou,
 *   à défaut de descendant, neveu/nièce.
 */
function verifierConditions790G(
  inputs: DonationInputs
): { eligible: boolean; motif: string } {
  if (inputs.ageDonateur >= 80) {
    return { eligible: false, motif: 'donateur âgé de 80 ans ou plus (Art. 790 G CGI)' }
  }
  if (!inputs.donataireMajeur) {
    return { eligible: false, motif: 'donataire non majeur ni mineur émancipé (Art. 790 G CGI)' }
  }
  const liensEligibles: LienParente[] = ['enfant', 'petit_enfant', 'neveu_niece']
  if (!liensEligibles.includes(inputs.lien)) {
    return { eligible: false, motif: 'lien de parenté non éligible (descendant ou neveu/nièce requis)' }
  }
  return { eligible: true, motif: '' }
}

function evaluerAlertes(p: {
  abattementPersonnelTheorique: number
  abattementPersonnelApplique: number
  rappel15AnsActif: boolean
  baseTaxable: number
  donFamilial790GRefuse: boolean
  motifRefus790G: string
  inputs: DonationInputs
  droitsBruts: number
  lien: LienParente
}): { warnings: DonationResults['warnings']; optimisations: DonationResults['optimisations'] } {
  const warnings: DonationResults['warnings'] = []
  const optimisations: DonationResults['optimisations'] = []

  if (p.rappel15AnsActif) {
    const conso = p.abattementPersonnelTheorique - p.abattementPersonnelApplique
    warnings.push({
      type: 'warning',
      message: `Vos dons précédents au même bénéficiaire (sur les 15 dernières années) ont déjà utilisé ${eur(conso)} d'abattement. Il vous reste ${eur(p.abattementPersonnelApplique)} à donner sans droits avant que le surplus ne soit taxé. Le compteur se remet à zéro 15 ans après chaque don (Art. 784 CGI).`,
    })
  }

  if (p.donFamilial790GRefuse) {
    warnings.push({
      type: 'danger',
      message: `L'option don familial (Art. 790 G CGI) n'est pas applicable : ${p.motifRefus790G}. L'abattement supplémentaire de 31 865 € n'entre pas dans le calcul ; seul l'abattement personnel s'applique.`,
    })
  }

  if (p.baseTaxable === 0 && p.inputs.montantDonation > 0) {
    optimisations.push({
      type: 'success',
      message: `Selon les paramètres saisis, la donation est intégralement couverte par les abattements (Art. 779 / 790 E / 790 G CGI) : aucun droit n'est dû.`,
    })
  }

  // Suggestion fractionnement sur 15 ans
  if (
    p.lien === 'enfant' &&
    p.inputs.montantDonation > 100000 &&
    p.inputs.donationsAnterieures15Ans === 0 &&
    p.droitsBruts > 0
  ) {
    optimisations.push({
      type: 'info',
      message: `L'abattement de 100 000 € (Art. 779-I CGI) repart à zéro au bout de 15 ans. Un nouveau don à cet enfant à cette date bénéficierait à nouveau de l'abattement plein.`,
    })
  }

  // Suggestion don 790 G non utilisé alors qu'éligible
  if (
    !p.inputs.donFamilial790G &&
    p.inputs.ageDonateur < 80 &&
    p.inputs.donataireMajeur &&
    ['enfant', 'petit_enfant', 'neveu_niece'].includes(p.lien) &&
    p.droitsBruts > 0
  ) {
    optimisations.push({
      type: 'info',
      message: `Si la donation porte sur des sommes d'argent, l'option don familial (Art. 790 G CGI) ajouterait un abattement de ${eur(ABATTEMENT_790G)} cumulable avec l'abattement personnel.`,
    })
  }

  return { warnings, optimisations }
}

/**
 * Calcule les droits de donation à partir des paramètres saisis.
 *
 * Conformément à la doctrine BOFiP BOI-ENR-DMTG-20-30-20, on applique successivement :
 *   1. Le rappel fiscal Art. 784 CGI (donations antérieures < 15 ans) sur l'abattement.
 *   2. Les abattements personnels (Art. 779 / 790 E) puis spécifiques (790 G, handicap).
 *   3. Le barème de l'Art. 777 CGI correspondant au lien de parenté, en démarrant
 *      au-dessus des tranches déjà consommées par les donations antérieures.
 *
 * @example
 * // Parent → enfant 200 000 € sans donation antérieure
 * // Attendu : abattement 100 000 €, base 100 000 €, droits 18 194 €
 * calculerDonation({
 *   montantDonation: 200000,
 *   lien: 'enfant',
 *   donataireHandicape: false,
 *   donFamilial790G: false,
 *   ageDonateur: 60,
 *   donataireMajeur: true,
 *   donationsAnterieures15Ans: 0,
 * })
 *
 * @example
 * // Don familial sommes d'argent à enfant majeur
 * // Attendu : abattement 131 865 €, base 18 135 €, droits 1 821 €
 * calculerDonation({
 *   montantDonation: 150000,
 *   lien: 'enfant',
 *   donataireHandicape: false,
 *   donFamilial790G: true,
 *   ageDonateur: 60,
 *   donataireMajeur: true,
 *   donationsAnterieures15Ans: 0,
 * })
 *
 * @example
 * // Donation entre frères et sœurs 50 000 €
 * // Attendu : abattement 15 932 €, base 34 068 €, droits 12 888 €
 * calculerDonation({
 *   montantDonation: 50000,
 *   lien: 'frere_soeur',
 *   donataireHandicape: false,
 *   donFamilial790G: false,
 *   ageDonateur: 70,
 *   donataireMajeur: true,
 *   donationsAnterieures15Ans: 0,
 * })
 */
export function calculerDonation(inputs: DonationInputs): DonationResults {
  const { montantDonation, lien, donationsAnterieures15Ans } = inputs

  // 1. Abattement personnel théorique selon le lien de parenté
  const abattementPersonnelTheorique = ABATTEMENTS[lien]

  // 2. Rappel fiscal Art. 784 CGI : les donations antérieures < 15 ans ont déjà
  //    consommé une partie de l'abattement personnel.
  const abattementResiduel = Math.max(
    0,
    abattementPersonnelTheorique - donationsAnterieures15Ans
  )
  const abattementPersonnelApplique = Math.min(montantDonation, abattementResiduel)
  const rappel15AnsActif =
    donationsAnterieures15Ans > 0 && abattementPersonnelTheorique > 0

  // 3. Abattement handicap (Art. 779-II CGI, cumulable avec l'abattement personnel)
  const reste1 = Math.max(0, montantDonation - abattementPersonnelApplique)
  const abattementHandicap = inputs.donataireHandicape
    ? Math.min(reste1, ABATTEMENT_HANDICAP)
    : 0

  // 4. Don familial de sommes d'argent (Art. 790 G CGI)
  const verif790G = verifierConditions790G(inputs)
  const donFamilial790GRefuse = inputs.donFamilial790G && !verif790G.eligible
  const motifRefus790G = donFamilial790GRefuse ? verif790G.motif : ''

  const reste2 = Math.max(0, reste1 - abattementHandicap)
  const abattement790G =
    inputs.donFamilial790G && verif790G.eligible
      ? Math.min(reste2, ABATTEMENT_790G)
      : 0

  // 5. Base taxable
  const abattementTotal =
    abattementPersonnelApplique + abattementHandicap + abattement790G
  const baseTaxable = Math.max(0, montantDonation - abattementTotal)

  // 6. Application du barème art. 777 CGI avec rappel des tranches consommées
  //    par les donations antérieures (au-delà de l'abattement)
  const bareme = getBareme(lien)
  const tranchesConsomees = Math.max(
    0,
    donationsAnterieures15Ans - abattementPersonnelTheorique
  )
  const { droits: droitsBruts, detail: detailTranches } = appliquerBareme(
    baseTaxable,
    tranchesConsomees,
    bareme
  )

  // 7. Comparaison "sans abattement" (à titre pédagogique)
  const { droits: droitsSansAbattement } = appliquerBareme(
    montantDonation,
    0,
    bareme
  )

  // 8. Indicateurs
  const droitsArrondis = Math.round(droitsBruts)
  const montantNet = Math.max(0, montantDonation - droitsArrondis)
  const tauxEffectif =
    montantDonation > 0
      ? Math.round((droitsArrondis / montantDonation) * 1000) / 10
      : 0
  const coutPour100Transmis =
    montantDonation > 0
      ? Math.round((droitsArrondis / montantDonation) * 10000) / 100
      : 0
  const economieAbattements = Math.max(
    0,
    Math.round(droitsSansAbattement) - droitsArrondis
  )

  // 9. Alertes
  const { warnings, optimisations } = evaluerAlertes({
    abattementPersonnelTheorique,
    abattementPersonnelApplique,
    rappel15AnsActif,
    baseTaxable,
    donFamilial790GRefuse,
    motifRefus790G,
    inputs,
    droitsBruts: droitsArrondis,
    lien,
  })

  return {
    montantDonation,
    lien,
    abattementPersonnelTheorique,
    abattementPersonnelApplique,
    abattementHandicap,
    abattement790G,
    abattementTotal,
    baseTaxable,
    droitsBruts: droitsArrondis,
    detailTranches,
    montantNet,
    tauxEffectif,
    coutPour100Transmis,
    droitsSansAbattement: Math.round(droitsSansAbattement),
    economieAbattements,
    rappel15AnsActif,
    donFamilial790GRefuse,
    motifRefus790G,
    warnings,
    optimisations,
  }
}

/** Libellé lisible du lien de parenté pour l'UI et le chat. */
export const LIBELLE_LIEN: Record<LienParente, string> = {
  enfant:       'enfant (ligne directe)',
  parent:       'parent (ligne directe)',
  petit_enfant: 'petit-enfant',
  epoux_pacs:   'époux / partenaire PACS',
  frere_soeur:  'frère ou sœur',
  neveu_niece:  'neveu ou nièce',
  autre_4e:     'autre parent jusqu\'au 4e degré',
  non_parent:   'non parent ou au-delà du 4e degré',
}

/** Formatte le contexte donation pour le chatbot. */
export function formatContexteDonation(
  inputs: DonationInputs,
  r: DonationResults
): string {
  const lines = [
    'Calculateur : Donation - droits de mutation à titre gratuit',
    '',
    'Paramètres de la donation',
    ligne('Montant transmis', eur(inputs.montantDonation)),
    ligne('Lien de parenté', LIBELLE_LIEN[inputs.lien]),
    ligne('Donations antérieures < 15 ans', eur(inputs.donationsAnterieures15Ans)),
    ligne('Don familial 790 G', inputs.donFamilial790G ? 'oui' : 'non'),
    ligne('Donataire handicapé', inputs.donataireHandicape ? 'oui' : 'non'),
    ligne('Âge donateur', String(inputs.ageDonateur)),
    '',
    'Abattements appliqués',
    ligne('Abattement personnel', eur(r.abattementPersonnelApplique)),
    ligne('Abattement handicap', eur(r.abattementHandicap)),
    ligne('Abattement don familial 790 G', eur(r.abattement790G)),
    ligne('Total abattements', eur(r.abattementTotal)),
    '',
    'Résultats',
    ligne('Base taxable', eur(r.baseTaxable)),
    ligne('Droits dus', eur(r.droitsBruts)),
    ligne('Montant net pour le donataire', eur(r.montantNet)),
    ligne('Taux effectif', pct(r.tauxEffectif)),
  ]
  if (r.rappel15AnsActif) {
    lines.push(ligne('Rappel 15 ans', 'actif - abattement réduit'))
  }
  if (r.donFamilial790GRefuse) {
    lines.push(ligne('Don 790 G refusé', r.motifRefus790G))
  }
  return lines.join('\n')
}

// Module calculateur unifié (cf. CONTEXT.md, ADR-0001)
export const moduleDonation: CalculatorModule<DonationInputs, DonationResults> = {
  slug: 'donation/droits',
  nom: 'Donation - droits',
  sources: SOURCES_DONATION,
  faqSchema: FAQ_DONATION,
  howToSchema: HOWTO_DONATION,
  formatContexteChat: formatContexteDonation,
}
