import { describe, it, expect } from 'vitest'
import { calculerLmnpRegime } from './lmnpRegime'
import type { LmnpRegimeInputs } from '@/types/lmnpRegime'

function defaults(over: Partial<LmnpRegimeInputs> = {}): LmnpRegimeInputs {
  return {
    loyersAnnuels: 20000,
    chargesReelles: 4000,
    amortissementsAnnuels: 6000,
    tmi: 30,
    typeMeuble: 'classique',
    ...over,
  }
}

describe('calculerLmnpRegime', () => {
  it('meublé classique : abattement 50 %, seuil 77 700 €', () => {
    const r = calculerLmnpRegime(defaults())
    expect(r.abattementMicroPct).toBe(50)
    expect(r.seuilMicro).toBe(77700)
    expect(r.microApplicable).toBe(true)
  })

  it('micro-BIC 20k loyers, 50% abattement, TMI 30 → 4 860 € impôt (PS 18,6 % LF 2025-1403)', () => {
    const r = calculerLmnpRegime(defaults())
    // Base = 10000, IR = 3000, PS = 1860, total = 4860
    expect(r.beneficeImposableMicro).toBe(10000)
    expect(r.totalImpotMicro).toBe(4860)
  })

  it('régime réel 20k - 4k charges - 6k amort = 10k → même 4 860 €', () => {
    const r = calculerLmnpRegime(defaults())
    expect(r.beneficeImposableReel).toBe(10000)
    expect(r.totalImpotReel).toBe(4860)
  })

  it('réel avantageux si charges + amort > 50 % loyers', () => {
    const r = calculerLmnpRegime(defaults({ chargesReelles: 4000, amortissementsAnnuels: 10000 }))
    // Réel : 20k - 4k - 10k = 6k imposable
    // Micro : 10k imposable
    expect(r.regimeAvantageux).toBe('reel')
  })

  it('déficit en réel → bénéfice imposable clampé à 0', () => {
    const r = calculerLmnpRegime(defaults({ chargesReelles: 12000, amortissementsAnnuels: 15000 }))
    expect(r.beneficeImposableReel).toBe(0)
    expect(r.totalImpotReel).toBe(0)
    expect(r.warnings.some(w => w.message.includes('Déficit'))).toBe(true)
  })

  it('meublé touristique non classé : abattement 30 %, seuil 15 000 €', () => {
    const r = calculerLmnpRegime(defaults({ typeMeuble: 'touristique_non_classe', loyersAnnuels: 10000 }))
    expect(r.abattementMicroPct).toBe(30)
    expect(r.seuilMicro).toBe(15000)
    expect(r.microApplicable).toBe(true)
  })

  it('loyers > seuil : micro non applicable, warning, réel obligatoire', () => {
    const r = calculerLmnpRegime(defaults({ typeMeuble: 'touristique_non_classe', loyersAnnuels: 30000 }))
    expect(r.microApplicable).toBe(false)
    expect(r.regimeAvantageux).toBe('reel')
    expect(r.warnings.some(w => w.message.includes('dépassent'))).toBe(true)
  })

  it('meublé classé : abattement 71 %, seuil 188 700 €', () => {
    const r = calculerLmnpRegime(defaults({ typeMeuble: 'touristique_classe' }))
    expect(r.abattementMicroPct).toBe(71)
    expect(r.seuilMicro).toBe(188700)
  })
})
