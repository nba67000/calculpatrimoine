// src/lib/succession.test.ts

import { describe, it, expect } from 'vitest'
import { calculerSuccession } from './succession'
import type { HeritierSuccession } from '@/types/succession'

function h(props: Partial<HeritierSuccession> & Pick<HeritierSuccession, 'lien' | 'partRecue'>): HeritierSuccession {
  return {
    id: props.id ?? 'h-test',
    nom: props.nom ?? 'Test',
    donationsAnterieures: props.donationsAnterieures ?? 0,
    ...props,
  }
}

describe('calculerSuccession', () => {
  it('enfant unique 250 000 € → abattement 100k + barème ligne directe', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 250000,
      heritiers: [h({ id: '1', nom: 'Enfant', lien: 'enfant', partRecue: 250000 })],
    })
    // Base taxable = 150 000 €
    // 5%×8072 + 10%×4037 + 15%×3823 + 20%×134068 = 403,6 + 403,7 + 573,45 + 26813,6 = 28194 €
    expect(r.detailHeritiers[0].abattementApplique).toBe(100000)
    expect(r.detailHeritiers[0].baseTaxable).toBe(150000)
    expect(r.detailHeritiers[0].droits).toBe(28194)
    expect(r.totalDroits).toBe(28194)
    expect(r.totalNetRecu).toBe(250000 - 28194)
  })

  it('conjoint exonéré (Loi TEPA)', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 1000000,
      heritiers: [h({ id: '1', nom: 'Conjoint', lien: 'epoux_pacs', partRecue: 1000000 })],
    })
    expect(r.detailHeritiers[0].exonereLoiTEPA).toBe(true)
    expect(r.detailHeritiers[0].droits).toBe(0)
    expect(r.totalDroits).toBe(0)
    expect(r.totalNetRecu).toBe(1000000)
  })

  it('multi-héritiers : conjoint + 2 enfants', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 600000,
      heritiers: [
        h({ id: '1', nom: 'Conjoint', lien: 'epoux_pacs', partRecue: 300000 }),
        h({ id: '2', nom: 'Enfant 1', lien: 'enfant', partRecue: 150000 }),
        h({ id: '3', nom: 'Enfant 2', lien: 'enfant', partRecue: 150000 }),
      ],
    })
    // Conjoint : 0 €
    // Chaque enfant : base 50 000 €, droits = 5%×8072 + 10%×4037 + 15%×3823 + 20%×34068 = 403,6 + 403,7 + 573,45 + 6813,6 = 8194 €
    expect(r.detailHeritiers[0].droits).toBe(0)
    expect(r.detailHeritiers[1].droits).toBe(8194)
    expect(r.detailHeritiers[2].droits).toBe(8194)
    expect(r.totalDroits).toBe(16388)
  })

  it('rappel 15 ans : donation antérieure de 80 000 € à un enfant héritant de 120 000 €', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 120000,
      heritiers: [
        h({ id: '1', nom: 'Enfant', lien: 'enfant', partRecue: 120000, donationsAnterieures: 80000 }),
      ],
    })
    // Abattement résiduel : 100 000 - 80 000 = 20 000 €
    // Base taxable : 120 000 - 20 000 = 100 000 €
    // Le barème démarre où la donation l'a laissé (donation = 80k, abattement = 80k consommé → 0 tranche consommée)
    expect(r.detailHeritiers[0].abattementApplique).toBe(20000)
    expect(r.detailHeritiers[0].baseTaxable).toBe(100000)
    // Droits = 5%×8072 + 10%×4037 + 15%×3823 + 20%×84068 = 18194 €
    expect(r.detailHeritiers[0].droits).toBe(18194)
  })

  it('frère/sœur : abattement 15 932 € + barème 35 % puis 45 %', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 50000,
      heritiers: [h({ id: '1', nom: 'Frère', lien: 'frere_soeur', partRecue: 50000 })],
    })
    // Base taxable = 50000 - 15932 = 34068
    // Droits = 35%×24430 + 45%×9638 = 8550,5 + 4337,1 = 12888 €
    expect(r.detailHeritiers[0].droits).toBe(12888)
  })

  it('neveu/nièce : abattement 7967 € + 55 %', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 30000,
      heritiers: [h({ id: '1', nom: 'Neveu', lien: 'neveu_niece', partRecue: 30000 })],
    })
    // Base = 30000 - 7967 = 22033
    // Droits = 22033 × 55 % = 12118 €
    expect(r.detailHeritiers[0].droits).toBe(12118)
  })

  it('warning si somme parts ≠ actif net', () => {
    const r = calculerSuccession({
      actifNetSuccessoral: 200000,
      heritiers: [h({ id: '1', nom: 'Enfant', lien: 'enfant', partRecue: 150000 })],
    })
    expect(r.warnings.some(w => w.message.includes('ne correspond pas'))).toBe(true)
  })

  it('immutabilité : ne mute pas inputs.heritiers', () => {
    const heritiers: HeritierSuccession[] = [
      h({ id: '1', nom: 'Enfant', lien: 'enfant', partRecue: 200000 }),
    ]
    const snapshot = JSON.parse(JSON.stringify(heritiers))
    calculerSuccession({ actifNetSuccessoral: 200000, heritiers })
    expect(heritiers).toEqual(snapshot)
  })

  // ---------------------------------------------------------------------------
  // Agrégation 757 B : primes d'assurance-vie après 70 ans
  // BOFiP BOI-ENR-DMTG-10-10-20-20 § 230
  // ---------------------------------------------------------------------------
  describe('agrégation 757 B (AV versée après 70 ans)', () => {
    it('enfant : primes 757 B agrégées à la part successorale, abattement 100k unique', () => {
      // Scénario Pierre acte 1 : enfant reçoit 125 000 € (succession) + 134 750 € (757 B
      // après quote-part 15 250 € de l'abattement global 30 500 € / 2 bénéficiaires)
      const r = calculerSuccession({
        actifNetSuccessoral: 125000,
        heritiers: [
          {
            id: '1',
            nom: 'Marie',
            lien: 'enfant',
            partRecue: 125000,
            donationsAnterieures: 0,
            primes757B: 134750,
          },
        ],
      })
      // Agrégat : 125 000 + 134 750 = 259 750 €
      // Abattement personnel : 100 000 €
      // Base taxable : 159 750 €
      // Barème : 5%×8072 + 10%×4037 + 15%×3823 + 20%×143818 = 403,6 + 403,7 + 573,45 + 28763,6
      //        = 30 144 € (arrondi)
      expect(r.detailHeritiers[0].partRecue).toBe(259750)
      expect(r.detailHeritiers[0].abattementApplique).toBe(100000)
      expect(r.detailHeritiers[0].baseTaxable).toBe(159750)
      expect(r.detailHeritiers[0].droits).toBe(30144)
    })

    it('scénario Pierre acte 1 complet : conjoint + 2 enfants avec 757 B', () => {
      // Pierre 800k : RP 477 050 + Livret A 22 950 + AV 300k versée après 70 ans
      // Communauté légale : Catherine 250k (exonérée), Marie + Thomas se partagent 250k
      // Bénéficiaires AV : Marie 50 % + Thomas 50 %
      // Quote-part abattement 30 500 € / 2 = 15 250 € par bénéficiaire
      // Primes 757 B taxables par enfant = 150 000 - 15 250 = 134 750 €
      const r = calculerSuccession({
        actifNetSuccessoral: 500000,
        heritiers: [
          { id: 'c', nom: 'Catherine', lien: 'epoux_pacs', partRecue: 250000, donationsAnterieures: 0 },
          { id: 'm', nom: 'Marie', lien: 'enfant', partRecue: 125000, donationsAnterieures: 0, primes757B: 134750 },
          { id: 't', nom: 'Thomas', lien: 'enfant', partRecue: 125000, donationsAnterieures: 0, primes757B: 134750 },
        ],
      })
      expect(r.detailHeritiers[0].droits).toBe(0) // Catherine exonérée TEPA
      expect(r.detailHeritiers[1].droits).toBe(30144)
      expect(r.detailHeritiers[2].droits).toBe(30144)
      expect(r.totalDroits).toBe(60288) // 30144 × 2
    })

    it('scénario Pierre acte 2 complet : donations échelonnées + AV 757 B', () => {
      // Pierre a donné 400k échelonnés (200k il y a 16 ans, 200k il y a 16 ans aussi mais
      // simplifié à donationsAnterieures = 0 car >15 ans). Patrimoine résiduel 100k au décès.
      // Communauté : Catherine 50k (exonérée), Marie + Thomas 50k partagés = 25k chacun
      // AV 300k toujours après 70 ans : primes 757 B = 134 750 € par enfant
      const r = calculerSuccession({
        actifNetSuccessoral: 100000,
        heritiers: [
          { id: 'c', nom: 'Catherine', lien: 'epoux_pacs', partRecue: 50000, donationsAnterieures: 0 },
          { id: 'm', nom: 'Marie', lien: 'enfant', partRecue: 25000, donationsAnterieures: 0, primes757B: 134750 },
          { id: 't', nom: 'Thomas', lien: 'enfant', partRecue: 25000, donationsAnterieures: 0, primes757B: 134750 },
        ],
      })
      // Marie : 25 000 + 134 750 = 159 750 € agrégés - 100 000 € abattement = 59 750 € taxables
      // Barème : 403,6 + 403,7 + 573,45 + 20%×43818 = 403,6 + 403,7 + 573,45 + 8763,6 = 10 144 €
      expect(r.detailHeritiers[1].droits).toBe(10144)
      expect(r.detailHeritiers[2].droits).toBe(10144)
      expect(r.totalDroits).toBe(20288) // 10144 × 2
    })

    it('scénario Pierre acte 3 complet : donations + AV avant 70 ans (zéro 757 B)', () => {
      // Patrimoine résiduel 100k au décès, pas de 757 B (AV alimentée avant 70 ans)
      // L'AV passe par 990 I qui est CALCULÉ SÉPARÉMENT (pas par succession.ts)
      const r = calculerSuccession({
        actifNetSuccessoral: 100000,
        heritiers: [
          { id: 'c', nom: 'Catherine', lien: 'epoux_pacs', partRecue: 50000, donationsAnterieures: 0 },
          { id: 'm', nom: 'Marie', lien: 'enfant', partRecue: 25000, donationsAnterieures: 0 },
          { id: 't', nom: 'Thomas', lien: 'enfant', partRecue: 25000, donationsAnterieures: 0 },
        ],
      })
      // 25 000 < 100 000 abattement : zéro droits
      expect(r.detailHeritiers[1].droits).toBe(0)
      expect(r.detailHeritiers[2].droits).toBe(0)
      expect(r.totalDroits).toBe(0)
    })
  })
})
