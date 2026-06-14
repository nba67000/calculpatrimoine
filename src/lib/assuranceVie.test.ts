import { describe, it, expect } from 'vitest'
import { calculerFiscaliteRachat, calculerAnciennete } from './assuranceVie'
import type { AssuranceVieInputs } from '@/types/assuranceVie'

// ---------------------------------------------------------------------------
// calculerAnciennete
// ---------------------------------------------------------------------------
describe('calculerAnciennete', () => {
  it('contrat ouvert en 2010 → ancienneté > 8 ans', () => {
    const r = calculerAnciennete(new Date('2010-01-01'))
    expect(r.annees).toBeGreaterThanOrEqual(8)
  })

  it('contrat ouvert il y a 2 ans environ → ancienneté < 8 ans', () => {
    const r = calculerAnciennete(new Date('2024-01-01'))
    expect(r.annees).toBeLessThan(8)
  })
})

// ---------------------------------------------------------------------------
// Base : helper pour des inputs valides (contrat ancien, simple)
// ---------------------------------------------------------------------------
function inputsBase(overrides: Partial<AssuranceVieInputs> = {}): AssuranceVieInputs {
  return {
    capitalTotal: 100000,
    versementTotal: 60000,
    dateOuverture: new Date('2010-01-01'),
    montantRachat: 20000,
    versementAvant2017: 0,
    tmi: 30,
    enCouple: false,
    encoursTotalContrats: 100000,
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// Contrat > 8 ans - vérification du bug fix Art. 125-0 A CGI
// (encours ≤ 150 000 € → taux IR 7,5 %, pas 12,8 %)
// ---------------------------------------------------------------------------
describe('calculerFiscaliteRachat - contrat > 8 ans', () => {
  it('encours ≤ 150 000 € → taux PFU global ≈ 26,1 % (7,5 % IR + 18,6 % PS - LF 2025-1403)', () => {
    const r = calculerFiscaliteRachat(inputsBase({ encoursTotalContrats: 100000 }))
    expect(r.ancienneteContrat).toBeGreaterThanOrEqual(8)
    // plusValueTaxable = 8000 − 4600 = 3400
    expect(r.plusValueTaxable).toBe(3400)
    // taux effectif PFU ≈ 26,1 % sur la plus-value taxable
    const tauxPFU = r.optionPFU.totalPrelevement / r.plusValueTaxable
    expect(tauxPFU).toBeCloseTo(0.261, 3)
  })

  it('encours > 150 000 € → taux PFU supérieur à 26,1 % (prorata 7,5 %/12,8 %)', () => {
    const r = calculerFiscaliteRachat(inputsBase({ encoursTotalContrats: 200000 }))
    const tauxPFU = r.optionPFU.totalPrelevement / r.plusValueTaxable
    // 150k/200k × 7,5% + 50k/200k × 12,8% = 5,625% + 3,2% = 8,825% IR + 18,6% PS = 27,425%
    expect(tauxPFU).toBeCloseTo(0.27425, 3)
  })

  it('abattement célibataire 4 600 € après 8 ans', () => {
    const r = calculerFiscaliteRachat(inputsBase())
    expect(r.abattementApplicable).toBe(4600)
  })

  it('abattement couple 9 200 € après 8 ans', () => {
    const r = calculerFiscaliteRachat(inputsBase({ enCouple: true }))
    expect(r.abattementApplicable).toBe(9200)
  })
})

// ---------------------------------------------------------------------------
// Contrat < 8 ans → flat tax 31,4 % sans abattement (CSG 10,6 % LF 2025-1403)
// ---------------------------------------------------------------------------
describe('calculerFiscaliteRachat - contrat < 8 ans', () => {
  it("taux PFU = 31,4 % (12,8 % IR + 18,6 % PS), pas d'abattement", () => {
    const r = calculerFiscaliteRachat(inputsBase({ dateOuverture: new Date('2024-01-01') }))
    expect(r.ancienneteContrat).toBeLessThan(8)
    expect(r.abattementApplicable).toBe(0)
    const tauxPFU = r.optionPFU.totalPrelevement / r.plusValueTaxable
    expect(tauxPFU).toBeCloseTo(0.314, 5)
  })

  it('warning présent signalant la durée restante avant 8 ans', () => {
    const r = calculerFiscaliteRachat(inputsBase({ dateOuverture: new Date('2024-01-01') }))
    expect(r.warnings.length).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// Répartition proportionnelle capital / plus-value
// ---------------------------------------------------------------------------
describe('calculerFiscaliteRachat - répartition rachat', () => {
  it('50 % de plus-value dans le contrat → 50 % du rachat est de la PV', () => {
    const r = calculerFiscaliteRachat(inputsBase({ capitalTotal: 100000, versementTotal: 50000 }))
    // tauxPlusValue = 50%, partPlusValue = 20000 × 0.5 = 10000
    expect(r.partPlusValue).toBeCloseTo(10000, 0)
    expect(r.partCapital).toBeCloseTo(10000, 0)
  })
})
