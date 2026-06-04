// src/types/succession.ts

export type LienHeritier =
  | 'enfant'
  | 'epoux_pacs'
  | 'parent'
  | 'petit_enfant'
  | 'frere_soeur'
  | 'neveu_niece'
  | 'autre_4e'
  | 'non_parent'

export interface HeritierSuccession {
  id: string
  nom: string
  lien: LienHeritier
  /** Montant € reçu par cet héritier de l'actif successoral (hors AV). */
  partRecue: number
  /** Donations reçues du défunt < 15 ans (rappel Art. 784 CGI). */
  donationsAnterieures: number
  /**
   * Primes d'assurance-vie versées après 70 ans revenant à cet héritier (Art. 757 B CGI),
   * APRÈS quote-part de l'abattement global de 30 500 € (II du 757 B).
   *
   * Ces sommes sont **agrégées à la partRecue** pour le calcul des droits de mutation
   * (BOFiP BOI-ENR-DMTG-10-10-20-20 § 230) : abattement personnel Art. 779 appliqué
   * UNE SEULE FOIS sur l'agrégat, barème ligne directe Art. 777 en UNE PASSE.
   *
   * Par défaut : 0. À fournir uniquement si l'héritier est aussi bénéficiaire d'une AV
   * dont des versements ont été faits après les 70 ans du défunt.
   */
  primes757B?: number
}

export interface SuccessionInputs {
  actifNetSuccessoral: number
  heritiers: HeritierSuccession[]
}

export interface TrancheSuccession {
  taux: number
  borneInf: number
  borneSup: number | null
  baseDansLaTranche: number
  droitsDansLaTranche: number
}

export interface DetailHeritier {
  id: string
  nom: string
  lien: LienHeritier
  partRecue: number
  abattementApplique: number
  baseTaxable: number
  droits: number
  netRecu: number
  /** Exonéré au titre de la Loi TEPA (Art. 796-0 bis CGI) : conjoint ou PACS. */
  exonereLoiTEPA: boolean
  detailTranches: TrancheSuccession[]
}

export interface SuccessionResults {
  totalDroits: number
  totalNetRecu: number
  detailHeritiers: DetailHeritier[]
  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string; gain?: number }>
}
