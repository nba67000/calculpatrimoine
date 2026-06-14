// src/types/plusValueImmobiliere.ts

import type { Warning, Optimisation } from '@/types/alerts'

export interface PlusValueImmobiliereInputs {
  // Acquisition
  dateAcquisition: string      // ISO date (YYYY-MM-DD)
  prixAcquisition: number      // Prix d'achat
  fraisAcquisition: 'forfait' | 'reel' // 7,5 % forfait ou réels
  fraisAcquisitionReels: number // Montant si mode 'reel'

  // Travaux
  travaux: 'aucun' | 'forfait' | 'reel' // 15 % forfait (si > 5 ans) ou réels
  travauxReels: number          // Montant si mode 'reel'

  // Cession
  dateCession: string           // ISO date (YYYY-MM-DD)
  prixCession: number           // Prix de vente

  // Exonérations
  typeBien: 'principal' | 'autre' // Résidence principale = exo totale
  premiereCession: boolean        // 1ère cession hors résidence principale (conditions Art. 150 U II 7°)
}

export interface PlusValueImmobiliereResults {
  // Prix de revient
  prixRevient: number           // Prix d'acquisition + frais + travaux
  fraisDeductibles: number      // Frais effectivement déduits
  travauxDeductibles: number    // Travaux effectivement déduits

  // Plus-value brute
  pvBrute: number               // prixCession − prixRevient
  anneesDetention: number       // Années complètes entre acquisition et cession

  // Exonération
  exoneree: boolean
  motifExoneration?: string

  // Abattements
  tauxAbattementIR: number      // En % (0 à 100)
  tauxAbattementPS: number      // En % (0 à 100)
  abattementIR: number          // En €
  abattementPS: number          // En €

  // Bases imposables
  pvNetteIR: number             // Base de l'impôt 19 %
  pvNettePS: number             // Base des prélèvements sociaux 18,6 %

  // Impôts
  impotRevenu: number           // pvNetteIR × 19 %
  prelevementsSociaux: number   // pvNettePS × 18,6 %
  surtaxe: number               // Si pvNetteIR > 50 000 € (Art. 1609 nonies G CGI)
  totalImpots: number
  netPercu: number              // prixCession − totalImpots

  // Détail surtaxe
  surtaxeApplicable: boolean
  tauxSurtaxeEffectif: number   // Taux effectif surtaxe en %

  // Milestones d'exonération (pour info)
  anneesAvantExoIR: number      // 0 si déjà exonéré IR
  anneesAvantExoPS: number      // 0 si déjà exonéré PS

  // Warnings et optimisations (pattern standard)
  warnings: Warning[]
  optimisations: Optimisation[]
}
