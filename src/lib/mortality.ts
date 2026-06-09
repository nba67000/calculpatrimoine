/**
 * @fileoverview Bibliothèque de calculs actuariels pour rentes viagères
 * 
 * Ce fichier contient toute la logique métier pour calculer des rentes viagères
 * basées sur les tables de mortalité INSEE/INED 2022.
 * 
 * Formules principales :
 * - Rente simple : R = C / a(x)
 * - Rente avec réversion : R = C / [a(x) + p·a_xy̅]
 * - Capital requis (inverse) : C = R · a(x)
 * 
 * @author CalculPatrimoine
 * @version 1.0.0
 */

import type {
 MortalityTables,
 Gender,
 CalculatorInput,
 AnnuityResult,
 MortalityData,
 InverseResult,
 CoupleProfile,
 CoupleCalculation
} from '@/types'
import { formatEurRounded as eur, formatPct as pct, formatLigne as ligne } from '@/lib/formatters'
import type { CalculatorModule } from '@/lib/calculators/types'
import { FAQ_RENTE, HOWTO_RENTE } from '@/lib/schema/schemaData'

export const SOURCES_RENTE_VIAGERE = [
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035514601', label: 'Article A132-1 du Code des assurances', desc: 'Taux technique maximum autorisé pour les contrats de rente viagère (75 % du taux OAT, plafonné à 3,5 %)' },
  { href: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000820127', label: 'Arrêté du 1er août 2006 - tables TGH 05 / TGF 05', desc: 'Homologation des tables de mortalité par génération pour les rentes viagères (art. A335-1 Code des assurances)' },
  // Correction 2026-06-09 : la référence précédente (Loi n° 2011-1906) était la LFSS 2012,
  // sans lien avec les tables unisexes. Bonne base juridique : arrêt CJUE C-236/09
  // (Test-Achats, 1er mars 2011), transposé par la Loi n° 2013-672 art. 60.
  { label: 'Loi n° 2013-672 du 26 juillet 2013 art. 60', desc: "Transposition CJUE Test-Achats - tarification non-discriminatoire H/F applicable depuis le 21/12/2012 (Art. L. 111-7 Code des assurances)" },
  { href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053542725', label: 'Article 158-6 du CGI', desc: "Fractions imposables des rentes viagères à titre onéreux selon l'âge : 70 % (< 50 ans), 50 % (50-59 ans), 40 % (60-69 ans), 30 % (> 69 ans)" },
  { href: 'https://www.insee.fr/fr/statistiques/7624538', label: 'INSEE - Tables de mortalité 2021', desc: "Tables statistiques utilisées pour les projections d'espérance de vie (publication juin 2023)" },
]

// =============================================================================
// CONSTANTES
// =============================================================================

/** Tables de mortalité INSEE/INED 2022 */
import mortalityTablesData from '../../public/mortality_tables.json'
const mortalityTables = mortalityTablesData as MortalityTables

/** Seuil de probabilité en dessous duquel on arrête les calculs */
const NEGLIGIBLE_PROBABILITY = 0.001

/** Nombre max d'années dans le futur pour les calculs de couple */
const MAX_COUPLE_YEARS = 60

// =============================================================================
// FONCTIONS UTILITAIRES - PROBABILITÉS DE SURVIE
// =============================================================================

/**
 * Calcule la probabilité qu'une personne d'âge x survive t années
 * 
 * Utilise la formule actuarielle :
 * t_px = ∏[k=0 to t-1] (1 - q_(x+k))
 * 
 * où q_(x+k) est le taux de mortalité à l'âge x+k
 * 
 * @param age - Âge actuel de la personne
 * @param gender - Sexe (homme/femme) pour utiliser la bonne table
 * @param years - Nombre d'années dans le futur
 * @returns Probabilité de survie entre 0 et 1
 * 
 * @example
 * // Probabilité qu'un homme de 65 ans survive 10 ans
 * const prob = calculateSurvivalProbability(65, 'homme', 10)
 * // prob ≈ 0.87 (87%)
 */
function calculateSurvivalProbability(
 age: number,
 gender: Gender,
 years: number
): number {
 let survivalProb = 1.0
 
 for (let k = 0; k < years; k++) {
 const data = getMortalityData(age + k, gender)
 
 if (!data) {
 // Au-delà des données disponibles, on arrête
 break
 }
 
 // p_x = 1 - q_x (taux de survie annuel)
 const annualSurvivalRate = 1 - data.mortality_rate
 survivalProb *= annualSurvivalRate
 }
 
 return survivalProb
}

/**
 * Calcule le facteur viager "dernier décès" pour un couple
 * 
 * Ce facteur représente la valeur actualisée des paiements tant qu'au moins
 * un membre du couple est en vie.
 * 
 * Formule actuarielle (Esch p.18) :
 * a̅_xy = ∑[t=1,∞] v^t · t_p̅_xy
 * 
 * où :
 * - t_p̅_xy = t_px + t_py - t_px·t_py (prob. qu'au moins un survive)
 * - v^t = (1/(1+i))^t (facteur d'actualisation)
 * 
 * @param age1 - Âge personne 1
 * @param gender1 - Sexe personne 1
 * @param age2 - Âge personne 2
 * @param gender2 - Sexe personne 2
 * @param techRate - Taux technique d'actualisation (ex: 0.005 pour 0.5%)
 * @returns Facteur viager "dernier décès"
 * 
 * @example
 * // Homme 65 ans + Femme 63 ans, taux 0.5%
 * const factor = calculateLastSurvivorFactor(65, 'homme', 63, 'femme', 0.005)
 * // factor ≈ 23.5
 */
function calculateLastSurvivorFactor(
 age1: number,
 gender1: Gender,
 age2: number,
 gender2: Gender,
 techRate: number
): number {
 let factor = 0
 
 for (let t = 1; t <= MAX_COUPLE_YEARS; t++) {
 // Probabilités individuelles de survie à t années
 const t_px = calculateSurvivalProbability(age1, gender1, t)
 const t_py = calculateSurvivalProbability(age2, gender2, t)
 
 // Optimisation : arrêter si probabilités négligeables
 if (t_px < NEGLIGIBLE_PROBABILITY && t_py < NEGLIGIBLE_PROBABILITY) {
 break
 }
 
 // Probabilité qu'au moins un des deux survive
 // Formule des probabilités : P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
 const t_pxy_bar = t_px + t_py - (t_px * t_py)
 
 // Actualisation : valeur d'1€ dans t années
 const discountFactor = Math.pow(1 / (1 + techRate), t)
 
 // Accumulation de la valeur actualisée
 factor += t_pxy_bar * discountFactor
 }
 
 return factor
}

/**
 * Calcule la probabilité de survie unisexe (table moyenne)
 * 
 * Version unisexe de calculateSurvivalProbability pour conformité 2012.
 * 
 * @param age - Âge actuel
 * @param years - Nombre d'années dans le futur
 * @returns Probabilité de survie entre 0 et 1
 * 
 * @example
 * const prob = calculateSurvivalProbabilityUnisex(65, 10)
 * // prob ≈ 0.86 (moyenne H/F)
 */
function calculateSurvivalProbabilityUnisex(
 age: number,
 years: number
): number {
 let survivalProb = 1.0
 
 for (let k = 0; k < years; k++) {
 const data = getUnisexMortalityData(age + k)
 
 if (!data) {
 break
 }
 
 const annualSurvivalRate = 1 - data.mortality_rate
 survivalProb *= annualSurvivalRate
 }
 
 return survivalProb
}

/**
 * Calcule le facteur viager "dernier décès" pour un couple (version unisexe)
 * 
 * Version conforme réglementation 2012 : utilise tables unisexes pour les deux personnes.
 * 
 * @param age1 - Âge personne 1
 * @param age2 - Âge personne 2
 * @param techRate - Taux technique d'actualisation
 * @returns Facteur viager "dernier décès"
 * 
 * @example
 * const factor = calculateLastSurvivorFactorUnisex(65, 63, 0.005)
 * // factor ≈ 24.2
 */
function calculateLastSurvivorFactorUnisex(
 age1: number,
 age2: number,
 techRate: number
): number {
 let factor = 0
 
 for (let t = 1; t <= MAX_COUPLE_YEARS; t++) {
 // Probabilités unisexes de survie
 const t_px = calculateSurvivalProbabilityUnisex(age1, t)
 const t_py = calculateSurvivalProbabilityUnisex(age2, t)
 
 if (t_px < NEGLIGIBLE_PROBABILITY && t_py < NEGLIGIBLE_PROBABILITY) {
 break
 }
 
 // Probabilité qu'au moins un survive
 const t_pxy_bar = t_px + t_py - (t_px * t_py)
 
 // Actualisation
 const discountFactor = Math.pow(1 / (1 + techRate), t)
 
 factor += t_pxy_bar * discountFactor
 }
 
 return factor
}

// =============================================================================
// FONCTIONS PUBLIQUES - ACCÈS AUX DONNÉES
// =============================================================================

/**
 * Récupère les données de mortalité pour un âge et sexe donnés
 * 
 * @param age - Âge recherché (50-110)
 * @param gender - Sexe (homme/femme)
 * @returns Données de mortalité ou null si âge hors limites
 * 
 * @example
 * const data = getMortalityData(65, 'homme')
 * // data = { age: 65, mortality_rate: 0.01234, annuity_factor: 15.67, ... }
 */
export function getMortalityData(
 age: number, 
 gender: Gender
): MortalityData | null {
 const table = mortalityTables.tables[gender]
 return table.find(d => d.age === age) || null
}

/**
 * Récupère les données de mortalité unisexe (conformité réglementation 2012)
 * 
 * Depuis le 21 décembre 2012, les assureurs doivent utiliser une table
 * de mortalité unique pour hommes et femmes (arrêt CJUE mars 2011).
 * 
 * Cette fonction calcule une moyenne pondérée basée sur la démographie française :
 * - 48% hommes
 * - 52% femmes
 * 
 * @param age - Âge recherché (50-110)
 * @returns Données de mortalité unisexe ou null si âge hors limites
 * 
 * @example
 * const data = getUnisexMortalityData(65)
 * // data.annuity_factor ≈ 17.27 (entre homme 16.29 et femme 18.16)
 */
export function getUnisexMortalityData(age: number): MortalityData | null {
 const dataHomme = getMortalityData(age, 'homme')
 const dataFemme = getMortalityData(age, 'femme')
 
 if (!dataHomme || !dataFemme) {
 return null
 }
 
 // Pondération démographique France 2022 (source INSEE)
 const WEIGHT_HOMME = 0.48
 const WEIGHT_FEMME = 0.52
 
 return {
 age,
 mortality_rate: (dataHomme.mortality_rate * WEIGHT_HOMME) + (dataFemme.mortality_rate * WEIGHT_FEMME),
 annuity_factor: (dataHomme.annuity_factor * WEIGHT_HOMME) + (dataFemme.annuity_factor * WEIGHT_FEMME),
 life_expectancy: (dataHomme.life_expectancy * WEIGHT_HOMME) + (dataFemme.life_expectancy * WEIGHT_FEMME)
 }
}

// =============================================================================
// CALCULS PRINCIPAUX - RENTE SIMPLE
// =============================================================================

/**
 * Calcule la rente viagère immédiate (table unisexe, conforme réglementation 2012)
 * 
 * Principe : On divise le capital par le facteur viager pour obtenir
 * la rente annuelle qui sera versée jusqu'au décès.
 * 
 * Formule de base :
 * R = C / a(x)
 * 
 * où :
 * - R = rente annuelle
 * - C = capital investi
 * - a(x) = facteur viager unisexe (moyenne pondérée H/F)
 * 
 * Note : Depuis le 21 décembre 2012, les assureurs utilisent une table
 * unisexe unique (arrêt CJUE mars 2011). Ce calculateur applique cette
 * réglementation.
 * 
 * @param capital - Capital à investir (€)
 * @param age - Âge du bénéficiaire
 * @returns Résultat détaillé du calcul ou null si données manquantes
 * 
 * @example
 * const result = calculateSimpleAnnuity(100000, 65)
 * // result.monthly_amount ≈ 580€/mois (table unisexe)
 * // result.annual_amount ≈ 6960€/an
 */
export function calculateSimpleAnnuity(
 capital: number,
 age: number
): AnnuityResult | null {
 const data = getUnisexMortalityData(age)
 
 if (!data) {
 console.error(`Pas de données de mortalité unisexe pour ${age} ans`)
 return null
 }
 
 // Calcul rente avec table unisexe (conforme 2012)
 const annualAmount = capital / data.annuity_factor
 const monthlyAmount = annualAmount / 12
 const totalExpectedPayout = annualAmount * data.life_expectancy
 const roiYears = capital / annualAmount
 
 return {
 monthly_amount: Math.round(monthlyAmount),
 annual_amount: Math.round(annualAmount),
 life_expectancy: data.life_expectancy,
 total_expected_payout: Math.round(totalExpectedPayout),
 roi_years: Math.round(roiYears * 10) / 10, // Arrondi à 0.1
 annuity_factor: data.annuity_factor,
 tech_rate: mortalityTables.metadata.tech_rate
 }
}

// =============================================================================
// CALCULS PRINCIPAUX - RENTE AVEC RÉVERSION
// =============================================================================

/**
 * Calcule la rente viagère avec réversion au conjoint
 * 
 * Principe : La rente continue à être versée au conjoint survivant à hauteur
 * d'un pourcentage donné (60%, 80% ou 100%). Le capital initial est partagé
 * entre les deux têtes.
 * 
 * Formule actuarielle exacte (Esch, Chapitre 3, p.18) :
 * R = C / [a(x) + p · a̅_xy]
 * 
 * où :
 * - a(x) = facteur viager tête principale
 * - p = pourcentage de réversion (0.6, 0.8 ou 1.0)
 * - a̅_xy = facteur viager "dernier décès"
 * 
 * @param capital - Capital total à investir (€)
 * @param age - Âge du titulaire principal
 * @param gender - Sexe du titulaire
 * @param spouseAge - Âge du conjoint
 * @param reversionPercentage - Pourcentage reversé (60, 80 ou 100)
 * @returns Résultat détaillé avec montants pour chaque membre
 * 
 * @example
 * // Homme 65 ans + Femme 63 ans, réversion 80%, 100k€
 * const result = calculateReversionAnnuity(
 * 100000, 65, 'homme', 63, 80
 * )
 * // result.monthly_amount ≈ 410€ (couple vivant)
 * // result.with_reversion.spouse_monthly_amount ≈ 328€ (après décès)
 */
export function calculateReversionAnnuity(
 capital: number,
 age: number,
 spouseAge: number,
 reversionPercentage: 60 | 80 | 100
): AnnuityResult | null {
 const mainData = getUnisexMortalityData(age)
 const spouseData = getUnisexMortalityData(spouseAge)
 
 if (!mainData || !spouseData) {
 console.error('Données de mortalité unisexe manquantes pour le couple')
 return null
 }
 
 const techRate = mortalityTables.metadata.tech_rate
 const reversionRate = reversionPercentage / 100
 
 // Calcul facteur viager "dernier décès" (version unisexe)
 const lastSurvivorFactor = calculateLastSurvivorFactorUnisex(
 age,
 spouseAge,
 techRate
 )
 
 // Facteur viager total avec réversion (formule actuarielle exacte)
 const jointFactor = mainData.annuity_factor + (reversionRate * lastSurvivorFactor)
 
 // Calculs de montants
 const annualAmount = capital / jointFactor
 const monthlyAmount = annualAmount / 12
 const spouseMonthlyAmount = monthlyAmount * reversionRate
 
 // Espérance de vie conjointe = max des deux espérances
 const jointLifeExpectancy = Math.max(
 mainData.life_expectancy,
 spouseData.life_expectancy
 )
 
 return {
 monthly_amount: Math.round(monthlyAmount),
 annual_amount: Math.round(annualAmount),
 life_expectancy: mainData.life_expectancy,
 total_expected_payout: Math.round(annualAmount * jointLifeExpectancy),
 roi_years: Math.round((capital / annualAmount) * 10) / 10,
 with_reversion: {
 monthly_amount: Math.round(monthlyAmount),
 spouse_monthly_amount: Math.round(spouseMonthlyAmount),
 joint_life_expectancy: jointLifeExpectancy
 },
 annuity_factor: jointFactor,
 tech_rate: techRate
 }
}

// =============================================================================
// POINT D'ENTRÉE PRINCIPAL - CALCUL RENTE
// =============================================================================

/**
 * Point d'entrée principal pour calculer une rente (avec ou sans réversion)
 * 
 * Cette fonction délègue au bon calculateur selon si la réversion est
 * activée ou non.
 * 
 * @param input - Configuration complète du calcul
 * @returns Résultat détaillé du calcul
 * 
 * @example
 * // Rente simple
 * const simpleResult = calculateAnnuity({
 * age: 65,
 * capital: 100000,
 * gender: 'homme'
 * })
 * 
 * // Rente avec réversion
 * const reversionResult = calculateAnnuity({
 * age: 65,
 * capital: 100000,
 * gender: 'homme',
 * reversion: {
 * enabled: true,
 * spouse_age: 63,
 * percentage: 80
 * }
 * })
 */
export function calculateAnnuity(input: CalculatorInput): AnnuityResult | null {
 // Cas avec réversion
 if (input.reversion?.enabled && 
 input.reversion.spouse_age && 
 input.reversion.percentage) {
 return calculateReversionAnnuity(
 input.capital,
 input.age,
 input.reversion.spouse_age,
 input.reversion.percentage
 )
 }
 
 // Cas simple (sans réversion)
 return calculateSimpleAnnuity(
 input.capital,
 input.age
 )
}

// =============================================================================
// CALCUL INVERSE - CAPITAL REQUIS
// =============================================================================

/**
 * Calcule le capital nécessaire pour obtenir une rente mensuelle souhaitée
 * 
 * Inverse la formule de base :
 * C = R · a(x)
 * 
 * @param desiredMonthlyAmount - Rente mensuelle souhaitée (€)
 * @param age - Âge du bénéficiaire
 * @param gender - Sexe du bénéficiaire
 * @param reversion - Configuration réversion (optionnelle)
 * @returns Capital requis et détails du calcul
 * 
 * @example
 * // Combien faut-il pour avoir 1000€/mois à 65 ans ?
 * const result = calculateRequiredCapital(1000, 65, 'homme')
 * // result.required_capital ≈ 196 000€
 */
export function calculateRequiredCapital(
 desiredMonthlyAmount: number,
 age: number,
 reversion?: {
 spouse_age: number
 percentage: 60 | 80 | 100
 }
): InverseResult | null {
 const data = getUnisexMortalityData(age)
 
 if (!data) {
 console.error(`Pas de données de mortalité unisexe pour ${age} ans`)
 return null
 }
 
 const techRate = mortalityTables.metadata.tech_rate
 const desiredAnnualAmount = desiredMonthlyAmount * 12
 
 let annuityFactor = data.annuity_factor
 let jointLifeExpectancy = data.life_expectancy
 
 // Ajustement si réversion
 if (reversion) {
 const spouseData = getUnisexMortalityData(reversion.spouse_age)
 
 if (!spouseData) {
 console.error(`Pas de données unisexe pour ${reversion.spouse_age} ans`)
 return null
 }
 
 const reversionRate = reversion.percentage / 100
 
 const lastSurvivorFactor = calculateLastSurvivorFactorUnisex(
 age,
 reversion.spouse_age,
 techRate
 )
 
 annuityFactor = data.annuity_factor + (reversionRate * lastSurvivorFactor)
 jointLifeExpectancy = Math.max(data.life_expectancy, spouseData.life_expectancy)
 }
 
 // Calcul inverse : C = R · a(x)
 const requiredCapital = desiredAnnualAmount * annuityFactor
 
 return {
 required_capital: Math.round(requiredCapital),
 monthly_amount: desiredMonthlyAmount,
 annual_amount: Math.round(desiredAnnualAmount),
 life_expectancy: jointLifeExpectancy,
 total_payout: Math.round(desiredAnnualAmount * jointLifeExpectancy),
 tech_rate: techRate
 }
}

// =============================================================================
// CALCULS MODE COUPLE - 7 STRATÉGIES
// =============================================================================

/**
 * Calcule et compare 7 stratégies de rente pour un couple
 * 
 * Les 7 stratégies :
 * 1. Rentes séparées (chacun transforme son capital)
 * 2-4. Capital total sur P1 avec réversion 60/80/100% → P2
 * 5-7. Capital total sur P2 avec réversion 60/80/100% → P1
 * 
 * Important : La réversion est UNIDIRECTIONNELLE
 * - Si capital sur P1 rév. 80% → P2 :
 * • P1 décède : P2 reçoit 80% de la rente
 * • P2 décède : P1 garde 100% de sa rente (+ capital P2 intact)
 * 
 * @param person1 - Profil personne 1 (âge, sexe, capital)
 * @param person2 - Profil personne 2
 * @returns Comparaison détaillée des 7 stratégies
 * 
 * @example
 * const comparison = calculateCoupleStrategies(
 * { age: 65, gender: 'homme', capital: 100000 },
 * { age: 63, gender: 'femme', capital: 80000 }
 * )
 * // comparison contient person1_solo, joint_with_reversion_80, etc.
 */
export function calculateCoupleStrategies(
 input: CoupleProfile
): CoupleCalculation[] {
 const age1 = input.person1_age
 const age2 = input.person2_age
 const capital = input.total_capital
 
 const data1 = getUnisexMortalityData(age1)
 const data2 = getUnisexMortalityData(age2)
 
 if (!data1 || !data2) {
 console.error('Données unisexe manquantes pour le couple')
 return []
 }
 
 const techRate = mortalityTables.metadata.tech_rate
 const results: CoupleCalculation[] = []
 
 // Stratégie 1 : Personne 1 seule
 const p1Solo = calculateSimpleAnnuity(capital, age1)
 if (p1Solo) {
 results.push({
 strategy: 'Personne 1 seule',
 monthly_amount: p1Solo.monthly_amount,
 description: `Rente viagère pour personne 1 uniquement (${age1} ans)`,
 life_expectancy: p1Solo.life_expectancy,
 total_payout: p1Solo.total_expected_payout
 })
 }
 
 // Stratégie 2 : Personne 2 seule
 const p2Solo = calculateSimpleAnnuity(capital, age2)
 if (p2Solo) {
 results.push({
 strategy: 'Personne 2 seule',
 monthly_amount: p2Solo.monthly_amount,
 description: `Rente viagère pour personne 2 uniquement (${age2} ans)`,
 life_expectancy: p2Solo.life_expectancy,
 total_payout: p2Solo.total_expected_payout
 })
 }
 
 // Stratégie 3 : Dernier décès (tant qu'un vivant)
 const lastSurvivorFactor = calculateLastSurvivorFactorUnisex(age1, age2, techRate)
 const lastDecesAnnual = capital / lastSurvivorFactor
 const lastDecesMo = lastDecesAnnual / 12
 results.push({
 strategy: 'Dernier décès',
 monthly_amount: Math.round(lastDecesMo),
 description: `Rente versée tant qu'au moins un est vivant`,
 life_expectancy: Math.max(data1.life_expectancy, data2.life_expectancy),
 total_payout: Math.round(lastDecesAnnual * Math.max(data1.life_expectancy, data2.life_expectancy))
 })
 
 // Stratégies 4-6 : P1 titulaire avec réversion à P2 (60%, 80%, 100%)
 const rev60_p1 = calculateReversionAnnuity(capital, age1, age2, 60)
 const rev80_p1 = calculateReversionAnnuity(capital, age1, age2, 80)
 const rev100_p1 = calculateReversionAnnuity(capital, age1, age2, 100)
 
 if (rev60_p1) {
 results.push({
 strategy: 'P1 titulaire, 60% à P2',
 monthly_amount: rev60_p1.monthly_amount,
 description: `P1 (${age1} ans) touche ${rev60_p1.monthly_amount}€/mois. Si décès, P2 touche ${rev60_p1.with_reversion?.spouse_monthly_amount}€/mois`
 })
 }
 
 if (rev80_p1) {
 results.push({
 strategy: 'P1 titulaire, 80% à P2',
 monthly_amount: rev80_p1.monthly_amount,
 description: `P1 (${age1} ans) touche ${rev80_p1.monthly_amount}€/mois. Si décès, P2 touche ${rev80_p1.with_reversion?.spouse_monthly_amount}€/mois`
 })
 }
 
 if (rev100_p1) {
 results.push({
 strategy: 'P1 titulaire, 100% à P2',
 monthly_amount: rev100_p1.monthly_amount,
 description: `P1 (${age1} ans) touche ${rev100_p1.monthly_amount}€/mois. Si décès, P2 touche ${rev100_p1.with_reversion?.spouse_monthly_amount}€/mois`
 })
 }
 
 // Stratégies 7-9 : P2 titulaire avec réversion à P1 (60%, 80%, 100%)
 const rev60_p2 = calculateReversionAnnuity(capital, age2, age1, 60)
 const rev80_p2 = calculateReversionAnnuity(capital, age2, age1, 80)
 const rev100_p2 = calculateReversionAnnuity(capital, age2, age1, 100)
 
 if (rev60_p2) {
 results.push({
 strategy: 'P2 titulaire, 60% à P1',
 monthly_amount: rev60_p2.monthly_amount,
 description: `P2 (${age2} ans) touche ${rev60_p2.monthly_amount}€/mois. Si décès, P1 touche ${rev60_p2.with_reversion?.spouse_monthly_amount}€/mois`
 })
 }
 
 if (rev80_p2) {
 results.push({
 strategy: 'P2 titulaire, 80% à P1',
 monthly_amount: rev80_p2.monthly_amount,
 description: `P2 (${age2} ans) touche ${rev80_p2.monthly_amount}€/mois. Si décès, P1 touche ${rev80_p2.with_reversion?.spouse_monthly_amount}€/mois`
 })
 }
 
 if (rev100_p2) {
 results.push({
 strategy: 'P2 titulaire, 100% à P1',
 monthly_amount: rev100_p2.monthly_amount,
 description: `P2 (${age2} ans) touche ${rev100_p2.monthly_amount}€/mois. Si décès, P1 touche ${rev100_p2.with_reversion?.spouse_monthly_amount}€/mois`
 })
 }
 
 return results
}

/** Formatte le contexte rente viagère pour le chatbot. */
export function formatContexteRente(inputs: CalculatorInput, r: AnnuityResult): string {
  const lines = [
    'Calculateur : Rente viagère',
    '',
    'Paramètres',
    ligne('Âge du souscripteur', `${inputs.age} ans`),
    ligne('Capital converti', eur(inputs.capital)),
    ligne('Taux technique', pct(r.tech_rate * 100)),
    ligne('Facteur de rente (a(x))', r.annuity_factor.toFixed(4)),
  ]
  if (inputs.reversion?.enabled) {
    lines.push(
      ligne('Réversion', `activée à ${inputs.reversion.percentage} %`),
      ligne('Âge du conjoint', `${inputs.reversion.spouse_age} ans`),
    )
  }
  lines.push(
    '',
    'Résultats',
    ligne('Rente mensuelle', eur(r.monthly_amount)),
    ligne('Rente annuelle', eur(r.annual_amount)),
    ligne("Espérance de vie résiduelle", `${r.life_expectancy.toFixed(1)} ans`),
    ligne("Total attendu sur espérance de vie", eur(r.total_expected_payout)),
    ligne('Seuil de rentabilité', `${r.roi_years.toFixed(1)} ans`),
  )
  if (r.with_reversion) {
    lines.push(
      '',
      'Après décès du souscripteur (réversion)',
      ligne('Rente réversionnaire mensuelle', eur(r.with_reversion.spouse_monthly_amount)),
    )
  }
  return lines.join('\n')
}

// Module calculateur unifié (cf. CONTEXT.md, ADR-0001)
export const moduleRenteViagere: CalculatorModule<CalculatorInput, AnnuityResult> = {
  slug: 'rente-viagere',
  nom: 'Rente viagère',
  sources: SOURCES_RENTE_VIAGERE,
  faqSchema: FAQ_RENTE,
  howToSchema: HOWTO_RENTE,
  formatContexteChat: formatContexteRente,
}
