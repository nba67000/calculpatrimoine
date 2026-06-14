import { describe, it, expect } from 'vitest'
import { calculerSciRegime } from './sciRegime'
import type { SciRegimeInputs } from '@/types/sciRegime'

function defaults(over: Partial<SciRegimeInputs> = {}): SciRegimeInputs {
  return {
    loyersAnnuels: 24000,
    chargesDeductibles: 4000,
    interetsEmprunt: 6000,
    amortissementsAnnuels: 8000,
    tmiAssocies: 30,
    dureeProjet: 15,
    ...over,
  }
}

describe('calculerSciRegime', () => {
  it('IR : 24k - 4k - 6k = 14k revenu foncier → impôt 6 804 € (30% + 18,6% LF 2025-1403)', () => {
    const r = calculerSciRegime(defaults())
    expect(r.revenuFoncier).toBe(14000)
    expect(r.totalAnnuelIr).toBe(Math.round(14000 * (0.30 + 0.186)))
  })

  it('IS : 24k - 4k - 6k - 8k = 6k bénéfice → 900 € (15%)', () => {
    const r = calculerSciRegime(defaults())
    expect(r.beneficeImposableIs).toBe(6000)
    expect(r.isAnnuel).toBe(900)
  })

  it('cumul sur durée projet (15 ans par défaut)', () => {
    const r = calculerSciRegime(defaults())
    expect(r.cumulSurDureeIr).toBe(r.totalAnnuelIr * 15)
    expect(r.cumulSurDureeIs).toBe(r.totalAnnuelIs * 15)
  })

  it('IS souvent plus avantageux à TMI 30+ avec amortissements', () => {
    const r = calculerSciRegime(defaults())
    expect(r.regimeAvantageux).toBe('is')
  })

  it('déficit foncier en IR → warning info', () => {
    const r = calculerSciRegime(defaults({ loyersAnnuels: 5000 }))
    expect(r.revenuFoncier).toBeLessThan(0)
    expect(r.warnings.some(w => w.message.includes('Déficit'))).toBe(true)
  })

  it('barème IS : >42 500 € → tranche 25 %', () => {
    // Loyers 100k, sans charges, sans amort → bénéfice 100k
    // IS = 42500 × 15 % + 57500 × 25 % = 6375 + 14375 = 20750
    const r = calculerSciRegime(defaults({
      loyersAnnuels: 100000, chargesDeductibles: 0, interetsEmprunt: 0, amortissementsAnnuels: 0,
    }))
    expect(r.isAnnuel).toBe(20750)
    expect(r.warnings.some(w => w.message.includes('PME'))).toBe(true)
  })

  it('warning danger : limite V1 (pas de sortie modélisée)', () => {
    const r = calculerSciRegime(defaults())
    expect(r.warnings.some(w => w.type === 'danger')).toBe(true)
  })
})
