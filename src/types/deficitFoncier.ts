// src/types/deficitFoncier.ts

export interface DeficitFoncierInputs {
  /** Revenus fonciers bruts annuels (loyers nus). */
  revenusFoncierBruts: number
  /** Charges déductibles hors intérêts (travaux, taxe foncière, gestion, assurance, copropriété). */
  chargesHorsInterets: number
  /** Intérêts d'emprunt déductibles (régime particulier : imputables uniquement sur revenus fonciers). */
  interetsEmprunt: number
  /** TMI applicable au foyer (%) pour estimer l'économie d'impôt. */
  tmi: number
  /** Activation du plafond majoré 21 400 € pour rénovation énergétique de passoires thermiques
   *  (Art. 156 I-3° CGI, dispositif LF 2023 prorogé pour les dépenses payées entre le 01/01/2023
   *  et le 31/12/2025). À actualiser si prorogation. */
  renovationEnergetiquePassoire: boolean
}

export interface DeficitFoncierResults {
  // Calcul revenu foncier
  /** Revenus fonciers après imputation des intérêts d'emprunt (peut être négatif). */
  revenuApresInterets: number
  /** Revenu foncier net (peut être négatif = déficit). */
  revenuFoncierNet: number

  // Décomposition du déficit
  /** Déficit total (0 si pas de déficit). */
  deficitTotal: number
  /** Part du déficit liée aux intérêts (excédent intérêts - revenus). Reportable revenus fonciers uniquement (10 ans). */
  deficitLieAuxInterets: number
  /** Part du déficit liée aux autres charges. Imputable revenu global jusqu'au plafond. */
  deficitHorsInterets: number

  // Imputation
  /** Plafond annuel applicable (10 700 € ou 21 400 € si rénovation passoires). */
  plafondAnnuel: number
  /** Montant effectivement imputé sur le revenu global cette année. */
  imputableRevenuGlobal: number
  /** Montant reporté sur les revenus fonciers des 10 années suivantes. */
  reportableRevenusFonciers: number

  // Impact fiscal
  /** Économie d'impôt estimée = imputable revenu global × TMI. */
  economieImpotImmediate: number

  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string }>
}
