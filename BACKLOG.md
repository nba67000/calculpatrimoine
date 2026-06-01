# BACKLOG - Calculateurs calcpatrimoine

Liste priorisée des calculateurs à implémenter. Claude Code lit ce fichier au
début de chaque session et **met à jour les statuts** au fil de l'eau.

**Statuts** : `todo` · `in-progress` · `done` · `blocked` · `proposed`
**Priorité** : `P0` (urgent) · `P1` (haut) · `P2` (moyen) · `P3` (bas)

---

## Déjà livrés

| Slug | Nom | Statut | Date |
|------|-----|--------|------|
| `rente-viagere` | Rente viagère (classique / inverse / couple) | `done` | 2026-04 |
| `assurance-vie/fiscalite-rachat` | Fiscalité rachat assurance-vie | `done` | 2026-04 |
| `assurance-vie/transmission` | Transmission assurance-vie (art. 990 I / 757 B) | `done` | 2026-04 |
| `tmi` | Tranche marginale d'imposition (barème IR 2026, QF, décote) | `done` | 2026-04-19 |
| `per-individuel` | PER individuel : économie d'impôt sur versement | `done` | 2026-05-01 |
| `plus-value-immobiliere` | Plus-value immobilière (résidence secondaire / investissement) | `done` | 2026-05-06 |
| `ifi` | Impôt sur la fortune immobilière | `done` | 2026-05-07 |
| `donation/droits` | Donation (art. 777/779/784/790 G CGI, rappel 15 ans) | `done` | 2026-05-30 |
| `succession` | Droits de succession par héritier (Art. 777/779 + Loi TEPA) | `done` | 2026-06-01 |
| `per-sortie` | PER : fiscalité de liquidation (capital vs rente) | `done` | 2026-06-01 |
| `pret-intrafamilial` | Prêt intrafamilial in fine vs donation directe | `done` | 2026-06-01 |
| `donation/demembrement` | Donation nue-propriété (barème Art. 669 CGI) | `done` | 2026-06-01 |
| `plus-value-immobiliere/lmnp` | PV immo LMNP (réintégration amortissements LF 2025) | `done` | 2026-06-01 |
| `comparateur-locatif-placement` | Comparateur immo locatif vs placement financier (V1 simplifiée) | `done` | 2026-06-01 |
| `pea` | PEA fiscalité retrait + bilan latent (3 vues) | `done` | 2026-06-01 |
| `lmnp-reel-vs-micro` | LMNP réel vs micro-BIC (LF 2025) | `done` | 2026-06-01 |
| `sci-is-vs-ir` | SCI à l'IS vs à l'IR (V1 impôt annuel seul) | `done` | 2026-06-01 |
| `csg-csds-retraite` | CSG/CRDS sur pensions de retraite (4 paliers) | `done` | 2026-06-01 |

**18 calculateurs livrés au 2026-06-01.**

---

## Prochains calculateurs

### P3 - Propositions issues du forum-watch

| Slug | Nom | Statut | Source | Notes |
|------|-----|--------|--------|-------|
| `deficit-foncier` | Déficit foncier (revenu nu) | `proposed` | MoneyVox 2026-06-01 | Imputation 10 700 €/an sur revenu global (hors intérêts), excédent reportable 10 ans sur revenus fonciers (Art. 156 I-3° CGI). Variante à prévoir : déficit généré par une SCI translucide imputable sur revenus fonciers nom propre du même associé. |
| `vente-vs-donation-intrafamiliale` | Vente vs donation d'un bien à un proche | `proposed` | MoneyVox 2026-06-01 | Comparateur côté vendeur/donateur : PV immobilière + droits d'enregistrement côté vente vs droits de donation + abattement par lien de parenté côté don. Cas type : parent → neveu, grand-parent → petit-enfant. |

### À considérer en suivi des V1 simplifiées

Les calculateurs livrés ci-dessous sont des MVPs qui mériteraient une V2 plus
complète :

- **`comparateur-locatif-placement`** : ajouter modélisation du crédit
  immobilier (effet de levier), des frais d'acquisition réels (notaire ~7-8 %),
  de la vacance locative explicite, de l'indexation des loyers.
- **`sci-is-vs-ir`** : ajouter calcul de la plus-value à la sortie (PV particulier
  vs PV pro). C'est ce calcul de sortie qui inverse souvent la conclusion.
- **`per-sortie`** : permettre de sélectionner finement le taux PS retraité
  (RFR), intégrer la sortie anticipée pour résidence principale.
- **`plus-value-immobiliere/lmnp`** : ajouter le calcul d'amortissement
  automatique à partir des données du bien (composants, mobilier) au lieu d'une
  saisie manuelle du total.

---

## Journal des scans `/forum-watch`

- **2026-05-31** : 5 catégories MoneyVox scannées, 13 fils retenus sur 30 jours.
  10 opportunités de réponse (calculateurs existants). 2 idées nouvelles
  ajoutées : `pret-intrafamilial-in-fine` et `plus-value-immobiliere-lmnp`.
  Confirmation de `comparateur-locatif-placement`. Promotion `succession` et
  `per-sortie` en P1.

- **2026-06-01** : tous les calculateurs `proposed` du backlog ont été
  implémentés en V1 , backlog vide d'items actionnables après cette session.
  Les V2 d'amélioration sont listées dans "À considérer en suivi des V1
  simplifiées" ci-dessus.

- **2026-06-01 (2e scan)** : 5 catégories MoneyVox rescannées, 29 fils
  analysés. 5 opportunités de réponse vers calculateurs existants
  (`/pret-intrafamilial`, `/donation/droits` x2, `/per-individuel` x2,
  dont 2 partielles). 2 idées nouvelles ajoutées en P3 :
  `deficit-foncier` et `vente-vs-donation-intrafamiliale`. La variante
  "déficit foncier SCI à l'IR" est fusionnée dans `deficit-foncier`.

---

## Règles de mise à jour

- **En début de calculateur** : `todo` → `in-progress`, ajouter `assignee: claude-code-session-<date>`.
- **En fin de calculateur** : `in-progress` → `done`, ajouter la date.
- **Si blocage** : `in-progress` → `blocked`, avec raison en commentaire.
- **Si nouvelle idée pendant une session** : ajouter en `proposed` en bas avec
  une description minimale. Ne jamais faire un calculateur `proposed` sans
  validation humaine - seuls les `todo` sont autorisés à l'implémentation.

Last updated: 2026-06-01 (forum-watch 2e scan : 2 propositions P3 ajoutées).
