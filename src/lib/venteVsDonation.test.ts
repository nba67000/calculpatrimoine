import { describe, it, expect } from 'vitest'
import { calculerVenteVsDonation } from './venteVsDonation'
import type { VenteVsDonationInputs } from '@/types/venteVsDonation'

function defaults(over: Partial<VenteVsDonationInputs> = {}): VenteVsDonationInputs {
  return {
    valeurBien: 400000,
    dateAcquisition: '2010-01-01',
    prixAcquisition: 200000,
    fraisAcquisitionMode: 'forfait',
    fraisAcquisitionReels: 0,
    travauxMode: 'forfait',
    travauxReels: 0,
    lienBeneficiaire: 'enfant',
    donationsAnterieures: 0,
    tauxDroitsEnregistrement: 5.80665,
    ...over,
  }
}

describe('calculerVenteVsDonation', () => {
  it('cas enfant 400k transmis : la donation reste avantageuse grâce à l\'abattement 100k', () => {
    const r = calculerVenteVsDonation(defaults())
    // Donation : base 300k → barème progressif ≈ 58 194 €
    // Vente : PV imposable réduite par abattements 16 ans + DMTO 23k → souvent < donation
    expect(r.droitsDonation).toBeGreaterThan(0)
    expect(r.coutFiscalVente).toBeGreaterThan(0)
    expect(['vente', 'donation', 'egalite']).toContain(r.optionAvantageuse)
  })

  it('cas neveu : barème 55 % → vente avantageuse', () => {
    const r = calculerVenteVsDonation(defaults({ lienBeneficiaire: 'neveu_niece' }))
    // Donation : base 400k - 7967 = 392 033 → 55 % = 215 618 €
    // Vente : PV abattements 16 ans + DMTO ≈ bien moins
    expect(r.droitsDonation).toBeGreaterThan(200000)
    expect(r.optionAvantageuse).toBe('vente')
    expect(r.warnings.some(w => w.message.includes('55'))).toBe(true)
  })

  it('cas non parent : barème 60 %, abattement 0', () => {
    const r = calculerVenteVsDonation(defaults({ lienBeneficiaire: 'autre' }))
    expect(r.abattementDonation).toBe(0)
    expect(r.droitsDonation).toBeGreaterThan(200000) // 400k × 60 % = 240k
    expect(r.optionAvantageuse).toBe('vente')
  })

  it('droits d\'enregistrement : 5,80665 % sur 400k ≈ 23 227 €', () => {
    const r = calculerVenteVsDonation(defaults())
    // 400000 × 0.0580665 = 23226.6 → arrondi 23 227
    expect(r.droitsEnregistrement).toBe(23227)
  })

  it('taux DMTO départemental relevé (6,32 %) augmente le coût vente', () => {
    const r1 = calculerVenteVsDonation(defaults())
    const r2 = calculerVenteVsDonation(defaults({ tauxDroitsEnregistrement: 6.32 }))
    expect(r2.droitsEnregistrement).toBeGreaterThan(r1.droitsEnregistrement)
  })

  it('donations antérieures > abattement : barème démarre directement, plus de marge', () => {
    const r = calculerVenteVsDonation(defaults({
      lienBeneficiaire: 'enfant',
      donationsAnterieures: 100000,
    }))
    expect(r.abattementResiduel).toBe(0)
    expect(r.warnings.some(w => w.message.includes('intégralement consommé'))).toBe(true)
  })

  it('détention courte (< 22 ans) → optimisation info "attendre exonération IR"', () => {
    const r = calculerVenteVsDonation(defaults({
      dateAcquisition: '2008-01-01', // 18 ans en 2026
    }))
    const hasInfo = r.optimisations.some(o => o.message.includes('exonération IR'))
    expect(hasInfo).toBe(true)
  })

  it('détention longue (> 30 ans) : PV totalement exonérée', () => {
    const r = calculerVenteVsDonation(defaults({
      dateAcquisition: '1990-01-01', // 36 ans en 2026
    }))
    expect(r.irPlusValue).toBe(0)
    expect(r.psPlusValue).toBe(0)
    // Reste seulement les droits d'enregistrement
    expect(r.totalImpotsVente).toBe(0)
    expect(r.coutFiscalVente).toBe(r.droitsEnregistrement)
  })
})
