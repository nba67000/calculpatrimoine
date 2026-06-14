// src/types/pea.ts

export interface PeaInputs {
  /** Valeur de marché actuelle du PEA. */
  valeurActuelle: number
  /** Total des versements nets effectués (pour calculer la PV latente). */
  versementsTotaux: number
  /** Âge du PEA en années (1 décimale possible). */
  agePeaAnnees: number
  /** Montant qu'on souhaite retirer (rachat partiel ou total). 0 = bilan seulement. */
  montantRetrait: number
}

export interface PeaResults {
  // Décomposition
  plusValueLatente: number
  partPlusValueDansValeur: number  // en % (PV / valeur)

  // Vues bilan (toujours calculées)
  vueBrute: number               // = valeur actuelle
  vueNetteSortie: number         // versements + PV × (1 − PS/PFU)
  passifLatentEstime: number     // = PV × taux effectif

  // Sortie (rachat partiel ou total) , appliqué au montantRetrait
  pvDansRetrait: number
  impotSurRetrait: number
  netRetrait: number
  tauxAppliqueRetrait: number    // 0 (avant 5 ans non détenu, pas codé), 18,6 (>5 ans, LF 2025-1403) ou 31,4 (<5 ans simplifié)
  exonerationIrActive: boolean   // true si âge >= 5 ans

  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string }>
}
