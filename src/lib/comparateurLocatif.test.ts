import { describe, it, expect } from 'vitest'
import { calculerComparateurLocatif } from './comparateurLocatif'
import type { ComparateurLocatifInputs } from '@/types/comparateurLocatif'

function defaults(over: Partial<ComparateurLocatifInputs> = {}): ComparateurLocatifInputs {
  return {
    capitalInitial: 200000,
    dureeAnnees: 20,
    tmi: 30,
    rendementLocatifBrut: 5,
    valorisationAnnuelle: 2,
    fraisChargesPct: 30,
    regimeLocatif: 'micro_foncier',
    rendementPlacementBrut: 6,
    vehiculePlacement: 'pea',
    ...over,
  }
}

describe('calculerComparateurLocatif', () => {
  it('résultats positifs sur 20 ans, capital récupéré + gains', () => {
    const r = calculerComparateurLocatif(defaults())
    expect(r.totalNetLocatif).toBeGreaterThan(200000)
    expect(r.totalNetPlacement).toBeGreaterThan(200000)
  })

  it('PEA après 5 ans : exonéré IR, PS 18,6% seulement (LF 2025-1403)', () => {
    const r = calculerComparateurLocatif(
      defaults({ rendementPlacementBrut: 5, dureeAnnees: 10, vehiculePlacement: 'pea' }),
    )
    // PEA exonéré IR donc impôt = gains × 18,6 %
    const gainsAttendu = 200000 * (Math.pow(1.05, 10) - 1)
    const impotAttendu = gainsAttendu * 0.186
    expect(r.impotSortiePlacement).toBeCloseTo(Math.round(impotAttendu), -1)
  })

  it('CTO : PFU 31,4% sur gains (CSG 10,6 % LF 2025-1403)', () => {
    const r = calculerComparateurLocatif(defaults({ vehiculePlacement: 'cto', dureeAnnees: 10 }))
    const gains = 200000 * (Math.pow(1.06, 10) - 1)
    expect(r.impotSortiePlacement).toBeCloseTo(Math.round(gains * 0.314), -1)
  })

  it('locatif micro-foncier : abattement 30%', () => {
    const r = calculerComparateurLocatif(defaults({ regimeLocatif: 'micro_foncier' }))
    // Loyer brut = 10 000, frais = 3 000, net = 7 000
    // Imposable micro = 7000 × 70 % = 4900 × (30 + 18,6) % = 2381,4
    // Net après impôt = 7000 - 2381,4 = 4618,6 × 20 ans ≈ 92 372
    expect(r.loyersCumulesNets).toBeCloseTo(92372, -2)
  })

  it('PV immo abattements appliqués à 20 ans (IR ≈ 90%, PS ≈ 33%)', () => {
    const r = calculerComparateurLocatif(defaults({ dureeAnnees: 20, valorisationAnnuelle: 2 }))
    expect(r.pvImmoNette).toBeGreaterThan(0)
    expect(r.capitalRevente).toBeGreaterThan(200000)
  })

  it('détermine optionAvantageuse', () => {
    const r = calculerComparateurLocatif(defaults())
    expect(['locatif', 'placement']).toContain(r.optionAvantageuse)
    expect(r.ecart).toBeGreaterThanOrEqual(0)
  })

  it('warning pas de crédit', () => {
    const r = calculerComparateurLocatif(defaults())
    expect(r.warnings.some(w => w.message.includes('crédit'))).toBe(true)
  })
})
