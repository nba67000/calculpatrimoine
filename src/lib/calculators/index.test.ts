// src/lib/calculators/index.test.ts
//
// Test du **calculator registry** (ADR-0001).
//
// Garantit que :
//   1. Tous les slugs attendus sont enregistrés.
//   2. Chaque module produit un `formatContexteChat` non-trivial sur des
//      inputs/results valides issus de la lib correspondante.
//
// Remplace l'ancien `chatContext.test.ts` qui testait l'exhaustivité du
// switch supprimé.

import { describe, it, expect } from 'vitest'
import { getCalculator, listCalculatorSlugs } from './index'
import { calculerTMIResult } from '@/lib/tmi'
import { calculerPER } from '@/lib/per'
import { calculateSimpleAnnuity } from '@/lib/mortality'
import { calculerFiscaliteRachat } from '@/lib/assuranceVie'
import { calculerTransmission } from '@/lib/transmission'
import { calculerPlusValueImmobiliere } from '@/lib/plusValueImmobiliere'
import { calculerIFI } from '@/lib/ifi'
import { calculerDonation } from '@/lib/donation'
import { calculerSuccession } from '@/lib/succession'
import { calculerPerSortie } from '@/lib/perSortie'
import { calculerPretIntrafamilial } from '@/lib/pretIntrafamilial'
import { calculerDonationDemembrement } from '@/lib/donationDemembrement'
import { calculerPlusValueLmnp } from '@/lib/plusValueLmnp'
import { calculerComparateurLocatif } from '@/lib/comparateurLocatif'
import { calculerPea } from '@/lib/pea'
import { calculerLmnpRegime } from '@/lib/lmnpRegime'
import { calculerSciRegime } from '@/lib/sciRegime'
import { calculerCsgRetraite } from '@/lib/csgRetraite'
import { calculerDeficitFoncier } from '@/lib/deficitFoncier'
import { calculerVenteVsDonation } from '@/lib/venteVsDonation'
import type { PERInputs } from '@/types/per'
import type { AssuranceVieInputs } from '@/types/assuranceVie'
import type { IFIInputs } from '@/types/ifi'

describe('calculator registry , exhaustivité', () => {
  it('expose tous les calculateurs livrés', () => {
    expect(listCalculatorSlugs().sort()).toEqual([
      'assurance-vie/fiscalite-rachat',
      'assurance-vie/transmission',
      'comparateur-locatif-placement',
      'csg-csds-retraite',
      'deficit-foncier',
      'donation/demembrement',
      'donation/droits',
      'ifi',
      'lmnp-reel-vs-micro',
      'pea',
      'per-individuel',
      'per-sortie',
      'plus-value-immobiliere',
      'plus-value-immobiliere/lmnp',
      'pret-intrafamilial',
      'rente-viagere',
      'sci-is-vs-ir',
      'succession',
      'tmi',
      'vente-vs-donation',
    ])
  })

  it('getCalculator retourne undefined pour un slug inconnu', () => {
    expect(getCalculator('inexistant')).toBeUndefined()
  })
})

describe('calculator registry , formatContexteChat retourne une chaîne non vide', () => {
  it('tmi', () => {
    const inputs = { revenuNetImposable: 45000, situationFamiliale: 'celibataire' as const, nombreEnfants: 0 }
    const results = calculerTMIResult(inputs)
    const txt = getCalculator('tmi')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('per-individuel', () => {
    const inputs: PERInputs = {
      salaireNetAnnuel: 60000, tmi: 30, versementEnvisage: 3000,
      plafondsReportesN1: 0, plafondsReportesN2: 0, plafondsReportesN3: 0,
      plafondsReportesN4: 0, plafondsReportesN5: 0,
    }
    const results = calculerPER(inputs)
    const txt = getCalculator('per-individuel')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('rente-viagere', () => {
    const inputs = { capital: 100000, age: 65 }
    const results = calculateSimpleAnnuity(100000, 65)!
    const txt = getCalculator('rente-viagere')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('assurance-vie/fiscalite-rachat', () => {
    const inputs: AssuranceVieInputs = {
      capitalTotal: 100000, versementTotal: 80000,
      dateOuverture: new Date('2015-01-01'), montantRachat: 20000,
      versementAvant2017: 0, tmi: 30, enCouple: false,
      encoursTotalContrats: 100000,
    }
    const results = calculerFiscaliteRachat(inputs)
    const txt = getCalculator('assurance-vie/fiscalite-rachat')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('assurance-vie/transmission', () => {
    const inputs = {
      capitalTotal: 200000, versementsAvant70: 150000, versementsApres70: 20000,
      dateOuverture: new Date('2010-01-01'), ageSouscripteur: 72,
      beneficiaires: [{ id: '1', nom: 'Enfant 1', lien: 'enfant' as const, partPourcentage: 100 }],
    }
    const results = calculerTransmission(inputs)
    const txt = getCalculator('assurance-vie/transmission')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('plus-value-immobiliere', () => {
    const inputs = {
      dateAcquisition: '2018-01-01', prixAcquisition: 200000,
      fraisAcquisition: 'forfait' as const, fraisAcquisitionReels: 0,
      travaux: 'aucun' as const, travauxReels: 0,
      dateCession: '2026-01-01', prixCession: 295000,
      typeBien: 'autre' as const, premiereCession: false,
    }
    const results = calculerPlusValueImmobiliere(inputs)
    const txt = getCalculator('plus-value-immobiliere')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('ifi', () => {
    const inputs: IFIInputs = {
      valeurBruteImmobilier: 1500000,
      incluResidencePrincipale: true,
      valeurResidencePrincipale: 800000,
      dettesDeductibles: 100000,
      appliquerPlafonnement: false,
      revenusAnnuels: 0,
      irAnnuel: 0,
    }
    const results = calculerIFI(inputs)
    const txt = getCalculator('ifi')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('donation/droits', () => {
    const inputs = {
      montantDonation: 200000, lien: 'enfant' as const,
      donataireHandicape: false, donFamilial790G: false,
      ageDonateur: 60, donataireMajeur: true,
      donationsAnterieures15Ans: 0,
    }
    const results = calculerDonation(inputs)
    const txt = getCalculator('donation/droits')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('csg-csds-retraite', () => {
    const inputs = { pensionBruteAnnuelle: 24000, revenuFiscalReference: 22000, nombreParts: 1 }
    const results = calculerCsgRetraite(inputs)
    const txt = getCalculator('csg-csds-retraite')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('sci-is-vs-ir', () => {
    const inputs = {
      loyersAnnuels: 24000, chargesDeductibles: 4000, interetsEmprunt: 6000,
      amortissementsAnnuels: 8000, tmiAssocies: 30 as const, dureeProjet: 15,
    }
    const results = calculerSciRegime(inputs)
    const txt = getCalculator('sci-is-vs-ir')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('lmnp-reel-vs-micro', () => {
    const inputs = {
      loyersAnnuels: 20000, chargesReelles: 4000, amortissementsAnnuels: 6000,
      tmi: 30 as const, typeMeuble: 'classique' as const,
    }
    const results = calculerLmnpRegime(inputs)
    const txt = getCalculator('lmnp-reel-vs-micro')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('pea', () => {
    const inputs = { valeurActuelle: 100000, versementsTotaux: 60000, agePeaAnnees: 7, montantRetrait: 30000 }
    const results = calculerPea(inputs)
    const txt = getCalculator('pea')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('comparateur-locatif-placement', () => {
    const inputs = {
      capitalInitial: 200000, dureeAnnees: 20, tmi: 30 as const,
      rendementLocatifBrut: 5, valorisationAnnuelle: 2, fraisChargesPct: 30,
      regimeLocatif: 'micro_foncier' as const,
      rendementPlacementBrut: 6, vehiculePlacement: 'pea' as const,
    }
    const results = calculerComparateurLocatif(inputs)
    const txt = getCalculator('comparateur-locatif-placement')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('plus-value-immobiliere/lmnp', () => {
    const inputs = {
      dateAcquisition: '2018-01-01', prixAcquisition: 200000,
      fraisAcquisition: 'forfait' as const, fraisAcquisitionReels: 0,
      travaux: 'aucun' as const, travauxReels: 0,
      dateCession: '2026-01-01', prixCession: 320000,
      typeBien: 'autre' as const, premiereCession: false,
      amortissementsLmnpCumules: 30000,
    }
    const results = calculerPlusValueLmnp(inputs)
    const txt = getCalculator('plus-value-immobiliere/lmnp')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('donation/demembrement', () => {
    const inputs = {
      valeurBienPleinePropriete: 500000, ageUsufruitier: 65,
      lienDonataire: 'enfant' as const, donationsAnterieures: 0,
    }
    const results = calculerDonationDemembrement(inputs)
    const txt = getCalculator('donation/demembrement')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('pret-intrafamilial', () => {
    const inputs = {
      montantPret: 100000, dureeAnnees: 10, tauxInteret: 2,
      agePreteur: 65, esperanceVie: 85,
      lienEmprunteur: 'enfant' as const, donationsAnterieures: 0,
    }
    const results = calculerPretIntrafamilial(inputs)
    const txt = getCalculator('pret-intrafamilial')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('per-sortie', () => {
    const inputs = {
      capitalAccumule: 100000, fractionVersementsDeductibles: 70,
      tmiRetraite: 30 as const, ageRetraite: 65, esperanceVie: 85,
      tauxRenteAnnuel: 4, mode: 'capital' as const, partCapitalSiMixte: 50,
    }
    const results = calculerPerSortie(inputs)
    const txt = getCalculator('per-sortie')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('succession', () => {
    const inputs = {
      actifNetSuccessoral: 300000,
      heritiers: [
        { id: '1', nom: 'Enfant', lien: 'enfant' as const, partRecue: 300000, donationsAnterieures: 0 },
      ],
    }
    const results = calculerSuccession(inputs)
    const txt = getCalculator('succession')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('deficit-foncier', () => {
    const inputs = {
      revenusFoncierBruts: 12000, chargesHorsInterets: 18000, interetsEmprunt: 3000,
      tmi: 30, renovationEnergetiquePassoire: false,
    }
    const results = calculerDeficitFoncier(inputs)
    const txt = getCalculator('deficit-foncier')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })

  it('vente-vs-donation', () => {
    const inputs = {
      valeurBien: 400000,
      dateAcquisition: '2010-01-01',
      prixAcquisition: 200000,
      fraisAcquisitionMode: 'forfait' as const,
      fraisAcquisitionReels: 0,
      travauxMode: 'forfait' as const,
      travauxReels: 0,
      lienBeneficiaire: 'enfant' as const,
      donationsAnterieures: 0,
      tauxDroitsEnregistrement: 5.80665,
    }
    const results = calculerVenteVsDonation(inputs)
    const txt = getCalculator('vente-vs-donation')!.formatContexteChat(inputs, results)
    expect(txt.length).toBeGreaterThan(20)
  })
})
