// src/lib/fiscal/taux.ts
//
// Taux fiscaux centralisés des prélèvements sociaux et du PFU sur revenus
// du capital.
//
// Sources primaires :
// - Art. L136-8 I 2° CSS (LF 2025-1403 du 30/12/2025, art. 12) : CSG 10,6 %
// - Art. 14 ordonnance n° 96-50 du 24/01/1996 : CRDS 0,5 %
// - Art. 235 ter III CGI : prélèvement de solidarité 7,5 %
// - Art. 200 A CGI : PFU IR 12,8 %
// - Art. 125-0 A I 1° CGI : PFU IR réduit AV > 8 ans 7,5 %
//
// Calendrier d'entrée en vigueur de la CSG à 10,6 % (LF 2025-1403 art. 12 II) :
// - L136-6 (revenus du patrimoine : dividendes, PV mobilières et immobilières,
//   revenus fonciers, intérêts hors retenue à la source) : à compter de
//   l'imposition des revenus 2025.
// - L136-7 (produits de placement : assurance-vie, PEA, livrets, intéressement,
//   FCP) : à compter du 1er janvier 2026.
//
// À la date de cette constante (2026-06-14), tous les calculs visent les
// revenus 2025 (déclarés en 2026) ou les opérations 2026 : le taux 18,6 %
// s'applique partout sur les revenus du capital.

/** CSG sur revenus du capital (Art. L136-8 I 2° CSS). */
export const TAUX_CSG_CAPITAL = 0.106

/** Contribution au remboursement de la dette sociale (Art. 14 ord. 96-50). */
export const TAUX_CRDS = 0.005

/** Prélèvement de solidarité sur revenus du patrimoine et produits de
 *  placement (Art. 235 ter III CGI). */
export const TAUX_PRELEVEMENT_SOLIDARITE = 0.075

/** Total des prélèvements sociaux sur revenus du capital : 18,6 %.
 *  Somme CSG + CRDS + prélèvement de solidarité. */
export const TAUX_PS_CAPITAL = 0.186

/** Taux IR du PFU sur revenus mobiliers et plus-values (Art. 200 A CGI). */
export const TAUX_PFU_IR = 0.128

/** PFU global IR + PS : 31,4 % (12,8 + 18,6). Remplace l'ancien 30 %. */
export const TAUX_PFU_GLOBAL = 0.314

/** Taux IR réduit AV > 8 ans dans la limite des 150 000 € d'encours
 *  (Art. 125-0 A I 1° CGI). */
export const TAUX_PFU_AV_REDUIT_IR = 0.075

/** Taux global AV > 8 ans (encours ≤ 150 000 €) : 26,1 % (7,5 + 18,6).
 *  Remplace l'ancien 24,7 %. */
export const TAUX_PFU_AV_REDUIT_GLOBAL = 0.261
