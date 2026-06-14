// src/types/assuranceVie.ts

import type { Warning, Optimisation } from '@/types/alerts'

export interface AssuranceVieInputs {
 // Caractéristiques du contrat
 capitalTotal: number; // Capital actuel total du contrat
 versementTotal: number; // Montant total versé depuis ouverture
 dateOuverture: Date; // Date d'ouverture du contrat
 
 // Rachat envisagé
 montantRachat: number; // Montant du rachat partiel
 
 // Versements avant 2017 (optionnel)
 versementAvant2017: number; // Montant versé avant 27/09/2017
 
 // Situation fiscale
 tmi: 0 | 11 | 30 | 41 | 45; // Tranche marginale d'imposition
 
 // Couple (pour abattement)
 enCouple: boolean; // true = 9200€ abattement, false = 4600€

 // Encours total tous contrats AV (seuil 150 000€ pour PFU réduit - Art. 125-0 A CGI)
 encoursTotalContrats: number;
}

export interface FiscaliteOption {
 nom: 'PFU' | 'IR';
 description: string;
 impotSurRevenu: number; // Impôt sur le revenu seul
 prelevementsSociaux: number; // Prélèvements sociaux 18,6% (LF 2025-1403)
 totalPrelevement: number; // Total à payer
 netPercu: number; // Montant net perçu après impôts
 tauxEffectif: number; // Taux effectif global (en %)
}

export interface AssuranceVieResults {
 // Calculs de base
 plusValueTotale: number; // Plus-value totale du contrat
 plusValueDansRachat: number; // Plus-value contenue dans le rachat
 tauxPlusValue: number; // % de plus-value dans le contrat
 ancienneteContrat: number; // Ancienneté en années
 ancienneteMois: number; // Ancienneté totale en mois
 
 // Répartition rachat
 partCapital: number; // Part de capital dans rachat (non taxée)
 partPlusValue: number; // Part de plus-value dans rachat (taxée)
 
 // Abattement
 abattementApplicable: number; // 0€ si < 8 ans, 4600€ ou 9200€ si> 8 ans
 plusValueTaxable: number; // PV après abattement
 
 // Options fiscales
 optionPFU: FiscaliteOption;
 optionIR: FiscaliteOption;
 
 // Comparaison (SANS recommandation)
 optionMoinsImposee: 'PFU' | 'IR'; // Pour coloration graphique uniquement
 difference: number; // Différence absolue entre les deux
 
 // Versements avant 2017 (si applicable)
 partAvant2017: {
 montant: number;
 tauxFiscal: number; // 7,5% au lieu de 12,8%
 avantage: number; // Économie vs taux normal
 } | null;
 
 // Warnings et optimisations
 warnings: Warning[]
 optimisations: Optimisation[]
}

export interface FractionnementSuggestion {
 annee: number;
 montant: number;
 plusValue: number;
 abattement: number;
 impots: number;
}
