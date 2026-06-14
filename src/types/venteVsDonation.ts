// src/types/venteVsDonation.ts

/** Lien de parenté entre donateur/vendeur et donataire/acheteur (limité au champ
 *  de ce calculateur : transmission intrafamiliale). */
export type LienBeneficiaire =
  | 'enfant'
  | 'petit_enfant'
  | 'frere_soeur'
  | 'neveu_niece'
  | 'autre'

export interface VenteVsDonationInputs {
  /** Valeur de marché du bien (prix de vente ou valeur transmise). */
  valeurBien: number

  /** Date d'acquisition initiale par le donateur/vendeur (pour PV). Format YYYY-MM-DD. */
  dateAcquisition: string
  /** Prix d'acquisition initial. */
  prixAcquisition: number
  /** Mode frais d'acquisition pour la PV. */
  fraisAcquisitionMode: 'forfait' | 'reel'
  /** Montant des frais réels (si mode 'reel'). */
  fraisAcquisitionReels: number
  /** Mode travaux pour la PV. */
  travauxMode: 'aucun' | 'forfait' | 'reel'
  /** Montant des travaux réels (si mode 'reel'). */
  travauxReels: number

  /** Lien de parenté avec le bénéficiaire. */
  lienBeneficiaire: LienBeneficiaire
  /** Donations antérieures du même donateur au même donataire dans les 15 dernières années. */
  donationsAnterieures: number

  /** Taux d'enregistrement appliqué côté acheteur (5,80665 % standard, jusqu'à 6,32 % selon département). */
  tauxDroitsEnregistrement: number
}

export interface VenteVsDonationResults {
  // Côté vente
  /** Plus-value brute. */
  pvBrute: number
  /** Plus-value nette après abattements IR (Art. 150 VC CGI). */
  pvNetteIR: number
  /** Impôt sur la plus-value (19 %). */
  irPlusValue: number
  /** Prélèvements sociaux (18,6 %, LF 2025-1403). */
  psPlusValue: number
  /** Surtaxe Art. 1609 nonies G (si PV nette IR > 50 000 €). */
  surtaxePV: number
  /** Total impôts côté vendeur. */
  totalImpotsVente: number
  /** Droits d'enregistrement payés par l'acheteur (taux × valeur). */
  droitsEnregistrement: number
  /** Coût fiscal total cumulé pour la vente (vendeur + acheteur). */
  coutFiscalVente: number

  // Côté donation
  /** Abattement personnel applicable selon le lien. */
  abattementDonation: number
  /** Donations antérieures restant à imputer sur l'abattement. */
  abattementResiduel: number
  /** Base taxable après abattement résiduel. */
  baseTaxableDonation: number
  /** Droits de donation (barème Art. 777). */
  droitsDonation: number

  // Synthèse
  /** Option avantageuse (coût fiscal cumulé le plus faible). */
  optionAvantageuse: 'vente' | 'donation' | 'egalite'
  /** Écart absolu entre les deux options. */
  ecart: number

  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string }>
}
