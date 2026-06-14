import { describe, it, expect } from 'vitest'
import { calculerPea } from './pea'
import type { PeaInputs } from '@/types/pea'

function defaults(over: Partial<PeaInputs> = {}): PeaInputs {
  return {
    valeurActuelle: 100000,
    versementsTotaux: 60000,
    agePeaAnnees: 7,
    montantRetrait: 30000,
    ...over,
  }
}

describe('calculerPea', () => {
  it('PV latente = valeur - versements', () => {
    const r = calculerPea(defaults())
    expect(r.plusValueLatente).toBe(40000)
    expect(r.partPlusValueDansValeur).toBe(40)
  })

  it('exonération IR après 5 ans → taux 18,6 % sur retrait (CSG 10,6 % LF 2025-1403)', () => {
    const r = calculerPea(defaults({ agePeaAnnees: 7 }))
    expect(r.exonerationIrActive).toBe(true)
    expect(r.tauxAppliqueRetrait).toBeCloseTo(18.6)
    // PV dans retrait = 30k × 40 % = 12k → impôt = 12k × 18,6 % = 2232
    expect(r.pvDansRetrait).toBe(12000)
    expect(r.impotSurRetrait).toBe(2232)
    expect(r.netRetrait).toBe(27768)
  })

  it('avant 5 ans → PFU 31,4 %', () => {
    const r = calculerPea(defaults({ agePeaAnnees: 3 }))
    expect(r.exonerationIrActive).toBe(false)
    expect(r.tauxAppliqueRetrait).toBeCloseTo(31.4)
    expect(r.warnings.some(w => w.type === 'danger')).toBe(true)
  })

  it('bilan : brut, net sortie, passif latent', () => {
    const r = calculerPea(defaults({ montantRetrait: 0 }))
    expect(r.vueBrute).toBe(100000)
    expect(r.passifLatentEstime).toBe(Math.round(40000 * 0.186))
    expect(r.vueNetteSortie).toBe(60000 + Math.round(40000 * (1 - 0.186)))
  })

  it('PV = 0 si valeur = versements', () => {
    const r = calculerPea(defaults({ valeurActuelle: 60000, versementsTotaux: 60000 }))
    expect(r.plusValueLatente).toBe(0)
    expect(r.warnings.some(w => w.type === 'info')).toBe(true)
  })

  it('montant retrait = 0 → impôt et net = 0', () => {
    const r = calculerPea(defaults({ montantRetrait: 0 }))
    expect(r.pvDansRetrait).toBe(0)
    expect(r.impotSurRetrait).toBe(0)
    expect(r.netRetrait).toBe(0)
  })
})
