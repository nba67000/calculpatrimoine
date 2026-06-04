import { describe, it, expect } from 'vitest'
import {
  ajouterBeneficiaire,
  supprimerBeneficiaire,
  equilibrerParts,
  modifierPartBeneficiaire,
  calculerPartsTaxables757B,
} from './transmission'
import { calculerSuccession } from './succession'
import type { Beneficiaire } from '@/types/transmission'

// Helpers de test - IDs stables pour les assertions
function benef(id: string, part: number, lien: Beneficiaire['lien'] = 'enfant'): Beneficiaire {
  return { id, nom: `B${id}`, lien, partPourcentage: part }
}

// ---------------------------------------------------------------------------
// ajouterBeneficiaire
// ---------------------------------------------------------------------------
describe('ajouterBeneficiaire', () => {
  it('ajoute un bénéficiaire avec la part restante', () => {
    const liste = [benef('a', 60), benef('b', 30)]
    const result = ajouterBeneficiaire(liste)
    expect(result).toHaveLength(3)
    expect(result[2].partPourcentage).toBe(10)
  })

  it('part restante = 0 si total déjà à 100', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    const result = ajouterBeneficiaire(liste)
    expect(result[2].partPourcentage).toBe(0)
  })

  it('ne dépasse pas 6 bénéficiaires', () => {
    const liste = Array.from({ length: 6 }, (_, i) => benef(String(i), 100 / 6))
    const result = ajouterBeneficiaire(liste)
    expect(result).toHaveLength(6)
  })

  it('ne mute pas le tableau source', () => {
    const liste = [benef('a', 100)]
    const result = ajouterBeneficiaire(liste)
    expect(liste).toHaveLength(1)
    expect(result).toHaveLength(2)
  })
})

// ---------------------------------------------------------------------------
// supprimerBeneficiaire
// ---------------------------------------------------------------------------
describe('supprimerBeneficiaire', () => {
  it('supprime le bon bénéficiaire', () => {
    const liste = [benef('a', 50), benef('b', 30), benef('c', 20)]
    const result = supprimerBeneficiaire(liste, 'b')
    expect(result).toHaveLength(2)
    expect(result.find(b => b.id === 'b')).toBeUndefined()
  })

  it('ne supprime pas si un seul bénéficiaire', () => {
    const liste = [benef('a', 100)]
    const result = supprimerBeneficiaire(liste, 'a')
    expect(result).toHaveLength(1)
  })

  it('ne mute pas le tableau source', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    supprimerBeneficiaire(liste, 'a')
    expect(liste).toHaveLength(2)
  })
})

// ---------------------------------------------------------------------------
// equilibrerParts
// ---------------------------------------------------------------------------
describe('equilibrerParts', () => {
  it('répartit à parts égales entre 2', () => {
    const liste = [benef('a', 70), benef('b', 30)]
    const result = equilibrerParts(liste)
    expect(result[0].partPourcentage).toBe(50)
    expect(result[1].partPourcentage).toBe(50)
  })

  it('répartit à parts égales entre 3', () => {
    const liste = [benef('a', 40), benef('b', 40), benef('c', 20)]
    const result = equilibrerParts(liste)
    const attendu = Math.round((100 / 3) * 100) / 100
    result.forEach(b => expect(b.partPourcentage).toBe(attendu))
  })

  it('ne mute pas le tableau source', () => {
    const liste = [benef('a', 80), benef('b', 20)]
    equilibrerParts(liste)
    expect(liste[0].partPourcentage).toBe(80)
  })
})

// ---------------------------------------------------------------------------
// modifierPartBeneficiaire
// ---------------------------------------------------------------------------
describe('modifierPartBeneficiaire', () => {
  it('2 bénéficiaires : bouger le premier ajuste le second', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    const result = modifierPartBeneficiaire(liste, 'a', 70)
    expect(result[0].partPourcentage).toBe(70)
    expect(result[1].partPourcentage).toBe(30)
  })

  it('3 bénéficiaires : cascade proportionnelle sur les suivants', () => {
    // (40, 40, 20) → bouger 'a' à 60 → reste 40 réparti 40/20 = 2:1 → (26.67, 13.33)
    const liste = [benef('a', 40), benef('b', 40), benef('c', 20)]
    const result = modifierPartBeneficiaire(liste, 'a', 60)
    expect(result[0].partPourcentage).toBe(60)
    expect(result[1].partPourcentage).toBeCloseTo(26.67, 1)
    expect(result[2].partPourcentage).toBeCloseTo(13.33, 1)
  })

  it('3 bénéficiaires : bouger le second ne touche que le troisième', () => {
    // (40, 40, 20) → bouger 'b' à 50 → 'a' figé à 40, reste = 10 → 'c' = 10
    const liste = [benef('a', 40), benef('b', 40), benef('c', 20)]
    const result = modifierPartBeneficiaire(liste, 'b', 50)
    expect(result[0].partPourcentage).toBe(40)
    expect(result[1].partPourcentage).toBe(50)
    expect(result[2].partPourcentage).toBe(10)
  })

  it('dernier bénéficiaire : modification libre, pas de cascade', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    const result = modifierPartBeneficiaire(liste, 'b', 80)
    expect(result[0].partPourcentage).toBe(50) // 'a' inchangé
    expect(result[1].partPourcentage).toBe(80)
  })

  it('clamp : ne peut pas dépasser le maximum disponible', () => {
    // 'a' figé à 60, 'b' essaie de prendre 80% → max dispo = 40
    const liste = [benef('a', 60), benef('b', 20), benef('c', 20)]
    const result = modifierPartBeneficiaire(liste, 'b', 80)
    expect(result[1].partPourcentage).toBe(40)
    expect(result[2].partPourcentage).toBe(0)
  })

  it('parts suivantes à 0 : répartition égale du reste', () => {
    const liste = [benef('a', 100), benef('b', 0), benef('c', 0)]
    const result = modifierPartBeneficiaire(liste, 'a', 60)
    expect(result[0].partPourcentage).toBe(60)
    expect(result[1].partPourcentage).toBe(20)
    expect(result[2].partPourcentage).toBe(20)
  })

  it('id inconnu : retourne le tableau inchangé', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    const result = modifierPartBeneficiaire(liste, 'inconnu', 70)
    expect(result).toEqual(liste)
  })

  it('ne mute pas le tableau source', () => {
    const liste = [benef('a', 50), benef('b', 50)]
    modifierPartBeneficiaire(liste, 'a', 70)
    expect(liste[0].partPourcentage).toBe(50)
  })
})

// ---------------------------------------------------------------------------
// calculerPartsTaxables757B + intégration avec calculerSuccession
// ---------------------------------------------------------------------------
describe('calculerPartsTaxables757B', () => {
  it('2 enfants bénéficiaires : abattement 30 500 € réparti au prorata', () => {
    const parts = calculerPartsTaxables757B({
      versementsApres70: 300000,
      beneficiaires: [
        benef('m', 50),
        benef('t', 50),
      ],
    })
    // 30 500 / 2 = 15 250 € par bénéficiaire
    // Part taxable = (300 000 × 50 %) - 15 250 = 134 750 €
    expect(parts).toEqual([
      { id: 'm', partTaxable: 134750 },
      { id: 't', partTaxable: 134750 },
    ])
  })

  it('conjoint exonéré : part taxable = 0, n\'absorbe pas l\'abattement', () => {
    const parts = calculerPartsTaxables757B({
      versementsApres70: 300000,
      beneficiaires: [
        benef('c', 50, 'conjoint'),
        benef('m', 50, 'enfant'),
      ],
    })
    // Conjoint : 0 (exonéré TEPA)
    // Enfant : 100 % de la quote-part d'abattement = 30 500 € (seul non-exonéré)
    //          part capital = 300 000 × 50 % = 150 000 €
    //          part taxable = 150 000 - 30 500 = 119 500 €
    expect(parts[0]).toEqual({ id: 'c', partTaxable: 0 })
    expect(parts[1]).toEqual({ id: 'm', partTaxable: 119500 })
  })

  it('3 enfants 33/33/34 : répartition proportionnelle de l\'abattement', () => {
    const parts = calculerPartsTaxables757B({
      versementsApres70: 100000,
      beneficiaires: [
        benef('a', 33),
        benef('b', 33),
        benef('c', 34),
      ],
    })
    // Total parts = 100 %
    // a : 33 % × 100 000 = 33 000 €, abattement 33 % × 30 500 = 10 065 €, taxable = 22 935 €
    // b : idem
    // c : 34 % × 100 000 = 34 000 €, abattement 34 % × 30 500 = 10 370 €, taxable = 23 630 €
    expect(parts[0].partTaxable).toBeCloseTo(22935, 0)
    expect(parts[1].partTaxable).toBeCloseTo(22935, 0)
    expect(parts[2].partTaxable).toBeCloseTo(23630, 0)
  })

  it('versements après 70 = 0 : toutes parts taxables = 0', () => {
    const parts = calculerPartsTaxables757B({
      versementsApres70: 0,
      beneficiaires: [benef('a', 50), benef('b', 50)],
    })
    expect(parts).toEqual([
      { id: 'a', partTaxable: 0 },
      { id: 'b', partTaxable: 0 },
    ])
  })
})

// ---------------------------------------------------------------------------
// Intégration : scénario Pierre complet (transmission + succession)
// Ces tests reproduisent les 3 scénarios du script vidéo épisode 01,
// en passant par l'orchestration correcte (cf. BOFiP § 230).
// ---------------------------------------------------------------------------
describe('intégration scénario Pierre (transmission + succession agrégées)', () => {
  // Pierre : 800k € — RP 477 050 + Livret A 22 950 (= 500k succession ordinaire) + AV 300k
  // Marié en communauté → Catherine reçoit 250k (exonérée TEPA), Marie + Thomas se partagent 250k
  // Bénéficiaires AV : Marie 50 % + Thomas 50 %

  it('scénario 1 : rien fait, AV après 70 ans → 60 288 € de droits', () => {
    // 1. Quote-part 757 B par bénéficiaire AV
    const parts757B = calculerPartsTaxables757B({
      versementsApres70: 300000,
      beneficiaires: [
        { id: 'm', lien: 'enfant', partPourcentage: 50 },
        { id: 't', lien: 'enfant', partPourcentage: 50 },
      ],
    })

    // 2. Calcul succession agrégée (succession ordinaire + 757 B)
    const r = calculerSuccession({
      actifNetSuccessoral: 500000,
      heritiers: [
        { id: 'c', nom: 'Catherine', lien: 'epoux_pacs', partRecue: 250000, donationsAnterieures: 0 },
        {
          id: 'm', nom: 'Marie', lien: 'enfant', partRecue: 125000, donationsAnterieures: 0,
          primes757B: parts757B.find(p => p.id === 'm')!.partTaxable,
        },
        {
          id: 't', nom: 'Thomas', lien: 'enfant', partRecue: 125000, donationsAnterieures: 0,
          primes757B: parts757B.find(p => p.id === 't')!.partTaxable,
        },
      ],
    })
    expect(r.totalDroits).toBe(60288)
  })

  it('scénario 2 : donations échelonnées + AV après 70 → 20 288 € de droits', () => {
    // Patrimoine résiduel 100k (Pierre a donné 400k il y a >15 ans)
    const parts757B = calculerPartsTaxables757B({
      versementsApres70: 300000,
      beneficiaires: [
        { id: 'm', lien: 'enfant', partPourcentage: 50 },
        { id: 't', lien: 'enfant', partPourcentage: 50 },
      ],
    })

    const r = calculerSuccession({
      actifNetSuccessoral: 100000,
      heritiers: [
        { id: 'c', nom: 'Catherine', lien: 'epoux_pacs', partRecue: 50000, donationsAnterieures: 0 },
        {
          id: 'm', nom: 'Marie', lien: 'enfant', partRecue: 25000, donationsAnterieures: 0,
          primes757B: parts757B.find(p => p.id === 'm')!.partTaxable,
        },
        {
          id: 't', nom: 'Thomas', lien: 'enfant', partRecue: 25000, donationsAnterieures: 0,
          primes757B: parts757B.find(p => p.id === 't')!.partTaxable,
        },
      ],
    })
    expect(r.totalDroits).toBe(20288)
  })

  it('scénario 3 : donations + AV avant 70 → 0 € de droits sur la succession', () => {
    // Pas de 757 B (AV alimentée avant 70). Le 990 I se calcule séparément.
    // Marie + Thomas reçoivent 150k chacun via 990 I, sous l'abattement 152 500 → 0 € de prélèvement
    const r = calculerSuccession({
      actifNetSuccessoral: 100000,
      heritiers: [
        { id: 'c', nom: 'Catherine', lien: 'epoux_pacs', partRecue: 50000, donationsAnterieures: 0 },
        { id: 'm', nom: 'Marie', lien: 'enfant', partRecue: 25000, donationsAnterieures: 0 },
        { id: 't', nom: 'Thomas', lien: 'enfant', partRecue: 25000, donationsAnterieures: 0 },
      ],
    })
    expect(r.totalDroits).toBe(0)
  })
})
