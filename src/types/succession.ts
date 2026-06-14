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

/**
 * Statut civil de l'héritier au jour de l'ouverture de la succession.
 * Utilisé pour l'exonération Art. 796-0 ter CGI (frère/sœur cohabitant).
 * BOFiP BOI-ENR-DMTG-10-20-10 § 30 : la condition est appréciée **au jour
 * du décès**, elle n'a pas à remonter aux 5 années antérieures.
 *
 * Jurisprudence : les frères/sœurs **PACSÉS entre eux** sont exclus de
 * l'exonération (le PACS confère un statut non célibataire).
 */
export type StatutCivilTEPA =
  | 'celibataire'
  | 'veuf'
  | 'divorce'
  | 'separe' // séparé de corps
  | 'marie'
  | 'pacse'

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

  /**
   * Statut civil au jour du décès (Art. 796-0 ter CGI condition 1).
   * Pertinent uniquement pour les héritiers `frere_soeur`.
   * Si non renseigné, l'exonération TEPA frère/sœur n'est pas appliquée.
   */
  statutCivilTEPA?: StatutCivilTEPA

  /**
   * Art. 796-0 ter CGI condition 2 : âge > 50 ans **OU** infirmité empêchant
   * de subvenir à ses besoins par le travail. Aucun taux d'invalidité minimal
   * légalement fixé (BOFiP BOI-ENR-DMTG-10-20-10 § 40).
   * Pertinent uniquement pour les héritiers `frere_soeur`.
   */
  ageSup50OuInvalide?: boolean

  /**
   * Art. 796-0 ter CGI condition 3 : avoir été constamment domicilié avec le
   * défunt pendant les 5 années précédant le décès. La notion de domicile commun
   * (Art. 102 et s. Code civil) n'implique pas cohabitation matérielle constante.
   * Tolérance BOFiP § 50 : un départ pour raison de santé (hospitalisation, EHPAD)
   * n'interrompt pas la condition si les 5 ans étaient déjà acquis au départ.
   * Pertinent uniquement pour les héritiers `frere_soeur`.
   */
  cohabitation5AnsDefunt?: boolean
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
  /**
   * Exonéré totalement de droits de succession au titre de la Loi TEPA 2007.
   * TRUE pour : conjoint/partenaire PACS (Art. 796-0 bis CGI) OU frère/sœur
   * cohabitant remplissant les 3 conditions cumulatives (Art. 796-0 ter CGI).
   * Le motif précis est exposé dans `motifExoneration`.
   */
  exonereLoiTEPA: boolean
  /**
   * Motif détaillé de l'exonération TEPA, undefined si non exonéré.
   * - 'conjoint_pacs_796_0_bis' : conjoint survivant ou partenaire PACS.
   * - 'frere_soeur_796_0_ter' : frère/sœur célibataire/veuf/divorcé/séparé,
   *   âgé de >50 ans ou invalide, cohabitant avec le défunt depuis 5 ans.
   */
  motifExoneration?: 'conjoint_pacs_796_0_bis' | 'frere_soeur_796_0_ter'
  detailTranches: TrancheSuccession[]
}

export interface SuccessionResults {
  totalDroits: number
  totalNetRecu: number
  detailHeritiers: DetailHeritier[]
  warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>
  optimisations: Array<{ type: 'success' | 'info'; message: string; gain?: number }>
}
