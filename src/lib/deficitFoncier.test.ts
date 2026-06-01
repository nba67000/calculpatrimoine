import { describe, it, expect } from 'vitest'
import { calculerDeficitFoncier } from './deficitFoncier'
import type { DeficitFoncierInputs } from '@/types/deficitFoncier'

function defaults(over: Partial<DeficitFoncierInputs> = {}): DeficitFoncierInputs {
  return {
    revenusFoncierBruts: 12000,
    chargesHorsInterets: 4000,
    interetsEmprunt: 2000,
    tmi: 30,
    renovationEnergetiquePassoire: false,
    ...over,
  }
}

describe('calculerDeficitFoncier', () => {
  it('cas bénéficiaire : revenus 12 000, charges 4 000, intérêts 2 000 → revenu net 6 000', () => {
    const r = calculerDeficitFoncier(defaults())
    expect(r.revenuFoncierNet).toBe(6000)
    expect(r.deficitTotal).toBe(0)
    expect(r.imputableRevenuGlobal).toBe(0)
    expect(r.economieImpotImmediate).toBe(0)
  })

  it('cas exactement équilibré : revenus 12 000, charges 8 000, intérêts 4 000 → revenu net 0', () => {
    const r = calculerDeficitFoncier(defaults({
      revenusFoncierBruts: 12000,
      chargesHorsInterets: 8000,
      interetsEmprunt: 4000,
    }))
    expect(r.revenuFoncierNet).toBe(0)
    expect(r.deficitTotal).toBe(0)
  })

  it('déficit standard sous plafond : revenus 10k, charges 18k, intérêts 2k, TMI 30 → 10 000 imputable, 3 000 économie', () => {
    const r = calculerDeficitFoncier(defaults({
      revenusFoncierBruts: 10000,
      chargesHorsInterets: 18000,
      interetsEmprunt: 2000,
    }))
    expect(r.deficitTotal).toBe(10000)
    expect(r.deficitLieAuxInterets).toBe(0)
    expect(r.deficitHorsInterets).toBe(10000)
    expect(r.imputableRevenuGlobal).toBe(10000)
    expect(r.reportableRevenusFonciers).toBe(0)
    expect(r.economieImpotImmediate).toBe(3000)
  })

  it('déficit dépassant le plafond : revenus 5k, charges 25k, intérêts 3k → cap 10 700, report 12 300, économie 3 210', () => {
    const r = calculerDeficitFoncier(defaults({
      revenusFoncierBruts: 5000,
      chargesHorsInterets: 25000,
      interetsEmprunt: 3000,
    }))
    expect(r.deficitTotal).toBe(23000)
    expect(r.deficitLieAuxInterets).toBe(0)
    expect(r.deficitHorsInterets).toBe(23000)
    expect(r.plafondAnnuel).toBe(10700)
    expect(r.imputableRevenuGlobal).toBe(10700)
    expect(r.reportableRevenusFonciers).toBe(12300)
    expect(r.economieImpotImmediate).toBe(3210)
    expect(r.warnings.some(w => w.message.includes('Plafond annuel'))).toBe(true)
  })

  it('intérêts > revenus : excédent intérêts seul reportable revenus fonciers', () => {
    const r = calculerDeficitFoncier(defaults({
      revenusFoncierBruts: 5000,
      chargesHorsInterets: 10000,
      interetsEmprunt: 8000,
    }))
    // Étape 1 : revenus - intérêts = -3 000 → déficit intérêts = 3 000
    // Étape 2 : solde 0, charges 10 000 → déficit hors intérêts = 10 000
    expect(r.deficitLieAuxInterets).toBe(3000)
    expect(r.deficitHorsInterets).toBe(10000)
    expect(r.imputableRevenuGlobal).toBe(10000)
    expect(r.reportableRevenusFonciers).toBe(3000) // l'excédent d'intérêts
    expect(r.economieImpotImmediate).toBe(3000)
    expect(r.warnings.some(w => w.message.includes('intérêts d\'emprunt'))).toBe(true)
  })

  it('plafond majoré passoire 21 400 € activé', () => {
    const r = calculerDeficitFoncier(defaults({
      revenusFoncierBruts: 5000,
      chargesHorsInterets: 25000,
      interetsEmprunt: 0,
      renovationEnergetiquePassoire: true,
    }))
    expect(r.plafondAnnuel).toBe(21400)
    // déficit hors intérêts = 25 000 - 5 000 = 20 000 → tout passe sous le plafond majoré
    expect(r.imputableRevenuGlobal).toBe(20000)
    expect(r.reportableRevenusFonciers).toBe(0)
    expect(r.economieImpotImmediate).toBe(6000)
  })

  it('TMI 0 % : pas d\'économie immédiate, warning info', () => {
    const r = calculerDeficitFoncier(defaults({
      revenusFoncierBruts: 5000,
      chargesHorsInterets: 15000,
      interetsEmprunt: 0,
      tmi: 0,
    }))
    expect(r.imputableRevenuGlobal).toBe(10000)
    expect(r.economieImpotImmediate).toBe(0)
    expect(r.warnings.some(w => w.message.includes('TMI 0'))).toBe(true)
  })

  it('warning engagement de location dès qu\'un déficit existe', () => {
    const r = calculerDeficitFoncier(defaults({
      revenusFoncierBruts: 5000,
      chargesHorsInterets: 12000,
      interetsEmprunt: 0,
    }))
    expect(r.deficitTotal).toBeGreaterThan(0)
    expect(r.warnings.some(w => w.message.includes('Engagement de location'))).toBe(true)
  })
})
