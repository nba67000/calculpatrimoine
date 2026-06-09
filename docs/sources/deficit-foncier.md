# Sources - Déficit foncier

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : Revenus 2025 / Barème 2026
**Calculateur concerné** : `src/app/deficit-foncier/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables. La référence textuelle prime. Cf. `docs/broken-links-to-fix.md`.

---

## Textes de loi

### Code général des impôts

- **Article 156 I-3° CGI** - Régime du déficit foncier : plafond annuel d'imputation sur le revenu global et report sur les revenus fonciers
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051212942
  - Point clé : plafond standard 10 700 €/an d'imputation sur revenu global ; excédent reportable 10 ans sur revenus fonciers. Engagement de location jusqu'au 31 décembre de la 3e année suivant l'imputation.

- **Article 156 I-3° CGI (LF 2023 art. 12)** - Plafond majoré rénovation énergétique
  - Statut : ☐ NON TESTÉE
  - Point clé : 21 400 €/an pour les dépenses payées du 01/01/2023 au 31/12/2025 permettant à un logement E/F/G en DPE d'atteindre A/B/C/D.

- **Article 31 CGI** - Liste des charges déductibles des revenus fonciers
  - Statut : ☐ NON TESTÉE
  - Point clé : intérêts d'emprunt, travaux d'entretien/réparation/amélioration, taxe foncière, frais de gestion, assurances.

---

## Doctrine administrative

- **BOFiP BOI-RFPI-BASE-30-20** - Modalités d'imputation du déficit foncier
  - Statut : ☐ NON TESTÉE
  - URL à reconstruire avec identifiant complet.

- **BOFiP BOI-RFPI-BASE-30-30** - Report des déficits non imputés
  - Statut : ☐ NON TESTÉE

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr - F1334** - "Revenus fonciers : régime micro-foncier" (références au régime réel)
  - Statut : ☐ NON TESTÉE
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F1334

- **service-public.gouv.fr - F19314** - "Revenu foncier : régime réel d'imposition"
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.service-public.gouv.fr/particuliers/vosdroits/F19314

- **impots.gouv.fr** - "Imputer un déficit foncier"
  - URL : https://www.impots.gouv.fr/particulier/comment-est-imposee-la-location-non-meublee

---

## Barèmes et seuils appliqués

| Paramètre | Valeur | Source | Millésime |
|-----------|--------|--------|-----------|
| Plafond standard imputation revenu global | 10 700 €/an | Art. 156 I-3° CGI | 2026 |
| Plafond majoré passoires énergétiques | 21 400 €/an | Art. 156 I-3° CGI (LF 2023 art. 12) | 01/01/2023 – 31/12/2025 |
| Engagement de location | jusqu'au 31/12 de la 3e année suivant l'imputation | Art. 156 I-3° CGI | 2026 |
| Report sur revenus fonciers | 10 ans | Art. 156 I-3° CGI | 2026 |
| Report de la fraction non utilisée sur revenu global | 6 ans | Art. 156 I-3° CGI | 2026 |
| Prélèvements sociaux sur revenu foncier net positif | 17,2 % | Art. L. 136-7 CSS | 2026 |

**Note importante intérêts d'emprunt** : les intérêts s'imputent **en priorité** sur les revenus fonciers de l'année. Si les intérêts dépassent les loyers, l'excédent est un déficit **non imputable** sur le revenu global ; il reste reportable **uniquement sur les revenus fonciers** des 10 années suivantes.

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| (à compléter) | Art 156 I-3° CGI - plafond 10 700 € en 2026 | 10 700 € | ☐ | - |
| (à compléter) | Plafond majoré 21 400 € passoires - prorogation après 31/12/2025 | 21 400 € | ☐ | - |
| (à compléter) | Engagement location 3 ans toujours en vigueur | 3 ans | ☐ | - |

---

## Exemples de référence

### Exemple 1 - Pas de déficit
Source : JSDoc inline `src/lib/deficitFoncier.ts:51-58`.

**Inputs** : revenus 12 000 €, charges hors intérêts 8 000 €, intérêts 4 000 €, TMI 30 %
**Résultat attendu** :
- Revenu après intérêts : 12 000 - 4 000 = 8 000 €
- Revenu foncier net : 8 000 - 8 000 = 0 €
- Pas de déficit, pas d'économie d'impôt immédiate.

### Exemple 2 - Déficit standard
Source : JSDoc inline `src/lib/deficitFoncier.ts:60-66`.

**Inputs** : revenus 10 000 €, charges 18 000 €, intérêts 2 000 €, TMI 30 %
**Résultat attendu** :
- Revenu après intérêts : 10 000 - 2 000 = 8 000 €
- Déficit hors intérêts : 18 000 - 8 000 = 10 000 €
- Imputable revenu global : 10 000 € (< plafond 10 700 €)
- Économie d'impôt immédiate : 10 000 × 30 % = 3 000 €

### Exemple 3 - Plafond dépassé
Source : JSDoc inline `src/lib/deficitFoncier.ts:68-75`.

**Inputs** : revenus 5 000 €, charges 25 000 €, intérêts 3 000 €, TMI 30 %
**Résultat attendu** :
- Revenu après intérêts : 5 000 - 3 000 = 2 000 €
- Déficit hors intérêts : 25 000 - 2 000 = 23 000 €
- Imputable revenu global : 10 700 € (plafonné)
- Reportable revenus fonciers : 23 000 - 10 700 = 12 300 € (+ 0 € lié aux intérêts)
- Économie d'impôt immédiate : 10 700 × 30 % = 3 210 €

### Exemple 4 - Déficit lié aux intérêts uniquement
**Inputs** : revenus 5 000 €, charges 0 €, intérêts 8 000 €, TMI 30 %
**Résultat attendu** :
- Déficit lié aux intérêts : 3 000 € (non imputable revenu global)
- Reportable revenus fonciers : 3 000 €
- Pas d'imputation immédiate, pas d'économie d'impôt.

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Mécanique en 2 étapes (intérêts puis autres charges, conforme BOFiP-RFPI-BASE-30).
- Plafond standard 10 700 € et plafond majoré passoires énergétiques 21 400 €.
- Calcul de l'économie d'impôt immédiate (TMI × imputation revenu global).
- Détermination du report sur revenus fonciers (10 ans).
- Alerte engagement de location 3 ans (Art. 156 I-3°).
- Cas particulier déficit "lié aux intérêts" non imputable revenu global.

### Ce que le calculateur **ne traite pas** (volontairement)

- **Recapture** : si le contribuable cesse la location avant 3 ans, l'administration recalcule l'impôt N (et N+1, N+2). Le calculateur signale le risque mais ne chiffre pas la recapture.
- Cumul avec dispositifs Pinel, Denormandie, etc.
- Cas SCI translucide : le calculateur fonctionne au niveau de la SCI puis les associés imputent au prorata — mécanique non implémentée.
- Report sur les revenus fonciers passés (reports antérieurs).
- Statut LMP (régime BIC, déficit imputable revenu global sous conditions).
- Locations meublées (LMNP) : voir `lmnp-reel-vs-micro.md`.

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- **Plafond majoré 21 400 €** : initialement applicable du 01/01/2023 au 31/12/2025 (LF 2023 art. 12). Vérifier si la LF 2026 ou un texte ultérieur a prorogé le dispositif.
- Le report sur le **revenu global** est limité à **6 ans** (pour la fraction non utilisée l'année de l'imputation). Le calculateur le mentionne dans un warning à TMI 0 % mais ne le détaille pas.
- L'engagement de location est **continu** : toute vacance prolongée pendant les 3 ans peut être assimilée à cessation. À mentionner dans l'UI.
- En SCI translucide, le déficit est calculé au niveau de la SCI puis attribué aux associés au prorata — le présent calculateur fonctionne pour un bailleur en direct.
