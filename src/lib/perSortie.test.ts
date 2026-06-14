// src/lib/perSortie.test.ts

import { describe, it, expect } from 'vitest'
import { calculerPerSortie } from './perSortie'
import type { PerSortieInputs } from '@/types/perSortie'

function defaults(over: Partial<PerSortieInputs> = {}): PerSortieInputs {
  return {
    capitalAccumule: 100000,
    fractionVersementsDeductibles: 70,
    tmiRetraite: 30,
    ageRetraite: 65,
    esperanceVie: 85,
    tauxRenteAnnuel: 4,
    mode: 'capital',
    partCapitalSiMixte: 50,
    ...over,
  }
}

describe('calculerPerSortie', () => {
  it('capital 100k, 70% versements, TMI 11% → impôt IR 7 700 € + PFU 9 420 € (LF 2025-1403)', () => {
    const r = calculerPerSortie(defaults({ tmiRetraite: 11 }))
    expect(r.impotVersements).toBe(7700)
    // PFU 31,4 % × 30 000 gains = 9 420
    expect(r.impotGains).toBe(9420)
    expect(r.netCapital).toBe(100000 - 7700 - 9420)
  })

  it('TMI 0% → impôt versements nul, seul PFU sur gains (31,4 %)', () => {
    const r = calculerPerSortie(defaults({ tmiRetraite: 0 }))
    expect(r.impotVersements).toBe(0)
    expect(r.impotGains).toBe(9420)
    expect(r.netCapital).toBe(100000 - 9420)
  })

  it('rente : abattement 10% + TMI + PS 9,1%', () => {
    const r = calculerPerSortie(defaults({ tmiRetraite: 30, tauxRenteAnnuel: 5 }))
    // Rente brute = 5000
    // IR = (5000 - 500) × 30 % = 1350
    // PS = 5000 × 9,1 % = 455
    // Net = 5000 - 1350 - 455 = 3195
    expect(r.renteAnnuelleBrute).toBe(5000)
    expect(r.renteAnnuelleNette).toBe(3195)
  })

  it('option avantageuse capital si TMI basse', () => {
    const r = calculerPerSortie(defaults({ tmiRetraite: 0, esperanceVie: 70 }))
    expect(r.optionAvantageuse).toBe('capital')
  })

  it('option avantageuse rente si TMI moyenne et longue durée', () => {
    const r = calculerPerSortie(defaults({ tmiRetraite: 30, ageRetraite: 65, esperanceVie: 95, tauxRenteAnnuel: 5 }))
    // 30 ans de rente nette annuelle peut dépasser le capital net
    expect(r.optionAvantageuse).toBe('rente')
  })

  it('warning si espérance résiduelle < 5 ans', () => {
    const r = calculerPerSortie(defaults({ ageRetraite: 80, esperanceVie: 82 }))
    expect(r.warnings.some(w => w.type === 'danger')).toBe(true)
  })

  it('mode mixte = pondération capital × % + rente × (1-%)', () => {
    const r = calculerPerSortie(defaults({ mode: 'mixte', partCapitalSiMixte: 50 }))
    const expected = Math.round(r.netCapital * 0.5 + r.netCumuleRente * 0.5)
    expect(r.netMixte).toBe(expected)
  })
})
