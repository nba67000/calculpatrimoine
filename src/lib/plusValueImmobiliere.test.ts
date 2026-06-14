import { describe, it, expect } from 'vitest'
import { calculerPlusValueImmobiliere } from './plusValueImmobiliere'
import type { PlusValueImmobiliereInputs } from '@/types/plusValueImmobiliere'

function base(overrides: Partial<PlusValueImmobiliereInputs> = {}): PlusValueImmobiliereInputs {
  return {
    dateAcquisition: '2018-01-01',
    prixAcquisition: 200000,
    fraisAcquisition: 'forfait',
    fraisAcquisitionReels: 0,
    travaux: 'forfait',
    travauxReels: 0,
    dateCession: '2026-01-01',
    prixCession: 320000,
    typeBien: 'autre',
    premiereCession: false,
    ...overrides,
  }
}

// ---------------------------------------------------------------------------
// Cas nominaux - issus du JSDoc (Art. 150 U, 150 VB, 150 VC CGI)
// ---------------------------------------------------------------------------
describe('calculerPlusValueImmobiliere - cas nominaux', () => {
  it('8 ans détention, PV brute 75 000 € - IR 11 685 €, PS 13 259 €, surtaxe 1 230 € (PS 18,6 % LF 2025-1403)', () => {
    // frais forfait = 200000 × 7,5% = 15000, travaux = 200000 × 15% = 30000
    // prixRevient = 245000, pvBrute = 75000
    // 8 ans : abattement IR = (8-5) × 6% = 18%, PS = (8-5) × 1,65% = 4,95%
    // PS = 75000 × (1 - 0.0495) × 18,6 % = 71 287,5 × 18,6 % = 13 259,5 ≈ 13 259
    const r = calculerPlusValueImmobiliere(base())
    expect(r.pvBrute).toBe(75000)
    expect(r.impotRevenu).toBe(11685)
    expect(r.prelevementsSociaux).toBe(13259)
    expect(r.surtaxe).toBe(1230)
    expect(r.totalImpots).toBe(26174)
  })

  it('moins-value - totalImpots 0 €', () => {
    const r = calculerPlusValueImmobiliere(base({
      dateAcquisition: '2022-01-01',
      prixAcquisition: 350000,
      travaux: 'aucun',
      dateCession: '2026-01-01',
      prixCession: 360000,
    }))
    expect(r.pvBrute).toBeLessThan(0)
    expect(r.totalImpots).toBe(0)
    expect(r.exoneree).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Exonérations
// ---------------------------------------------------------------------------
describe('calculerPlusValueImmobiliere - exonérations', () => {
  it('résidence principale → exonération totale (Art. 150 U II 1° CGI)', () => {
    const r = calculerPlusValueImmobiliere(base({ typeBien: 'principal' }))
    expect(r.exoneree).toBe(true)
    expect(r.totalImpots).toBe(0)
  })

  it('1ère cession hors résidence principale → exonération totale (Art. 150 U II 7° CGI)', () => {
    const r = calculerPlusValueImmobiliere(base({ premiereCession: true }))
    expect(r.exoneree).toBe(true)
    expect(r.totalImpots).toBe(0)
  })

  it('prix cession ≤ 15 000 € → exonération totale (Art. 150 U II 6° CGI)', () => {
    const r = calculerPlusValueImmobiliere(base({ prixCession: 15000, prixAcquisition: 10000, travaux: 'aucun' }))
    expect(r.exoneree).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Abattements par durée de détention
// ---------------------------------------------------------------------------
describe('calculerPlusValueImmobiliere - abattements', () => {
  it('< 6 ans → abattement IR 0 %, PS 0 %', () => {
    const r = calculerPlusValueImmobiliere(base({
      dateAcquisition: '2022-01-01', dateCession: '2026-01-01',
      prixAcquisition: 200000, prixCession: 300000, travaux: 'aucun',
    }))
    expect(r.tauxAbattementIR).toBe(0)
    expect(r.tauxAbattementPS).toBe(0)
  })

  it('22 ans → exonération IR totale (Art. 150 VC CGI)', () => {
    const r = calculerPlusValueImmobiliere(base({
      dateAcquisition: '2004-01-01', dateCession: '2026-01-01', travaux: 'aucun',
    }))
    expect(r.tauxAbattementIR).toBe(100)
    expect(r.impotRevenu).toBe(0)
    expect(r.anneesAvantExoIR).toBe(0)
  })

  it('30 ans → exonération totale IR + PS', () => {
    const r = calculerPlusValueImmobiliere(base({
      dateAcquisition: '1996-01-01', dateCession: '2026-01-01', travaux: 'aucun',
    }))
    expect(r.totalImpots).toBe(0)
    expect(r.anneesAvantExoPS).toBe(0)
  })
})

// ---------------------------------------------------------------------------
// Surtaxe (Art. 1609 nonies G CGI)
// ---------------------------------------------------------------------------
describe('calculerPlusValueImmobiliere - surtaxe', () => {
  it('PV nette IR ≤ 50 000 € → surtaxe 0', () => {
    // 5 ans détention : abattement 0, PV brute < 50k
    const r = calculerPlusValueImmobiliere(base({
      dateAcquisition: '2021-01-01', dateCession: '2026-01-01',
      prixAcquisition: 200000, prixCession: 240000, travaux: 'aucun',
    }))
    expect(r.surtaxeApplicable).toBe(false)
    expect(r.surtaxe).toBe(0)
  })

  it('PV nette IR > 50 000 € → surtaxe applicable', () => {
    // 8 ans, pvBrute = 75000 → pvNetteIR = 75000 × (1-18%) = 61500 > 50000
    const r = calculerPlusValueImmobiliere(base())
    expect(r.surtaxeApplicable).toBe(true)
    expect(r.surtaxe).toBeGreaterThan(0)
  })
})
