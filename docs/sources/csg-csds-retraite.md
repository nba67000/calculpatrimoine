# Sources - CSG/CRDS sur pensions de retraite

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : Prélèvements 2026 (RFR de référence : revenus 2024)
**Calculateur concerné** : `src/app/csg-csds-retraite/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables. La référence textuelle prime. Cf. `docs/broken-links-to-fix.md`.

---

## Textes de loi

### Code de la sécurité sociale

- **Article L. 136-8 CSS** - Taux CSG sur les revenus de remplacement (pensions de retraite, allocations chômage)
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051212975
  - Point clé : 4 paliers de taux CSG (exonéré / 3,8 % / 6,6 % / 8,3 %) selon le RFR.

- **Article L. 136-1-2 CSS** - Assiette CSG sur revenus d'activité et de remplacement, et liste d'exclusions
  - Statut : 👁 HUMAINE (Nicolas, 2026-06-09 : texte intégral consulté, version LOI 2025-199 du 28/02/2025)
  - **II 1°** : exclut de l'assiette de la contribution les pensions de retraite et d'invalidité dont le RFR n'excède pas les seuils mentionnés au 1° du III de l'article L. 136-8 → c'est le mécanisme **d'exonération**.
  - **II 11°** : exclut également les prestations PER (rente ou capital) issues de versements déductibles (Art. L. 224-2 1° + L. 224-20 al. 2 CMF). Ces prestations relèvent du régime pensions Art. L. 136-8 (et non L. 136-1-2). Cf. `docs/sources/per-sortie.md`.

- **Article L. 14-10-4 CSS** - CASA (Contribution additionnelle de solidarité pour l'autonomie)
  - Statut : ☐ NON TESTÉE
  - Point clé : 0,3 %, applicable aux taux médian et normal uniquement.

### Code général des impôts

- **Article 1417 CGI** - Détermination du RFR (revenu fiscal de référence)
  - Statut : ☐ NON TESTÉE
  - Point clé : assiette de référence pour les seuils CSG ; ajustement par demi-part fiscale.

### Arrêtés annuels

- **Arrêté annuel** - Seuils RFR pour application des taux CSG
  - Statut : ☐ NON TESTÉE
  - Référence : publié au JO en décembre N-1 pour application en N.
  - Pour 2026 : seuils 12 230 / 15 988 / 24 813 € pour 1 part fiscale.

---

## Doctrine administrative

- **BOSS - "CSG sur les revenus de remplacement"** - boss.gouv.fr
  - Statut : ☐ NON TESTÉE
  - URL probable : https://boss.gouv.fr/portail/accueil/cotisations-et-contributions/csg-crds.html

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr - F2971** - "Prélèvements sociaux sur les pensions de retraite"
  - Statut : ☐ NON TESTÉE
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F2971

- **L'Assurance retraite (Cnav)** - "Le prélèvement de la CSG"
  - URL : https://www.lassuranceretraite.fr/portail-info/sites/pub/home/retraites/montant-paiement-retraite/prelevements-sur-la-retraite.html

---

## Barèmes et taux appliqués

### Taux CSG/CRDS/CASA sur pensions (2026)

| Palier | Taux total | Décomposition | Source |
|--------|-----------:|---------------|--------|
| Exonéré | 0 % | — | Art. L. 136-8 CSS |
| Réduit | 4,3 % | 3,8 % CSG + 0,5 % CRDS (pas de CASA) | Art. L. 136-8 + L. 14-10-4 CSS |
| Médian | 7,4 % | 6,6 % CSG + 0,5 % CRDS + 0,3 % CASA | Art. L. 136-8 + L. 14-10-4 CSS |
| Normal | 9,1 % | 8,3 % CSG + 0,5 % CRDS + 0,3 % CASA | Art. L. 136-8 + L. 14-10-4 CSS |

### Seuils RFR 2026 (1 part fiscale, revenus 2024)

| Seuil de RFR | Bascule vers | Source |
|--------------|--------------|--------|
| < 12 230 € | exonération | Arrêté JO décembre 2025 |
| < 15 988 € | taux réduit | Arrêté JO décembre 2025 |
| < 24 813 € | taux médian | Arrêté JO décembre 2025 |
| ≥ 24 813 € | taux normal | Arrêté JO décembre 2025 |

### Majoration des seuils par demi-part supplémentaire

| Seuil | Majoration |
|-------|-----------:|
| Exonération | + 3 267 € |
| Réduit | + 4 269 € |
| Médian | + 6 624 € |

**Source** : Art. 1417 CGI + arrêté annuel.

### Règle anti-bascule

Pour qu'un changement de taux soit appliqué, il faut que la condition soit remplie **2 années consécutives** (évite les bascules ponctuelles liées à un revenu exceptionnel). Source : pratique administrative confirmée sur service-public.gouv.fr.

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| (à compléter) | Seuils RFR 2026 (12 230 / 15 988 / 24 813) | 12230 / 15988 / 24813 | ☐ | - |
| (à compléter) | Majoration demi-part (3 267 / 4 269 / 6 624) | 3267 / 4269 / 6624 | ☐ | - |
| (à compléter) | CASA 0,3 % uniquement médian/normal | 0,3 % | ☐ | - |

---

## Exemples de référence

### Exemple 1 - Pension 24 k€, RFR 18 k€, 1 part fiscale
Source : JSDoc inline `src/lib/csgRetraite.ts:70-75`.

**Inputs** :
- Pension brute annuelle : 24 000 €
- RFR : 18 000 €
- Parts : 1

**Résultat attendu** :
- Seuil médian 1 part = 24 813 € > RFR → taux médian 7,4 %
- Prélèvement = 24 000 × 7,4 % = 1 776 €
- Pension nette = 22 224 €

### Exemple 2 - Couple 2 parts, pension 30 k€, RFR 20 k€
**Inputs** : 30 000 €, RFR 20 000 €, 2 parts (= 1 demi-part sup)
**Calcul des seuils ajustés** :
- Exonération : 12 230 + 2 × 3 267 = 18 764 €
- Réduit : 15 988 + 2 × 4 269 = 24 526 €
- Médian : 24 813 + 2 × 6 624 = 38 061 €
**Résultat** :
- RFR 20 000 € : < 24 526 € → taux réduit 4,3 %
- Prélèvement = 30 000 × 4,3 % = 1 290 €
- Pension nette = 28 710 €

### Exemple 3 - Pension élevée 50 k€, RFR 50 k€, 1 part
- RFR > 24 813 € → taux normal 9,1 %
- Prélèvement = 50 000 × 9,1 % = 4 550 €
- Pension nette = 45 450 €

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- 4 paliers de taux selon RFR (exonéré, réduit, médian, normal).
- Ajustement des seuils selon le nombre de parts fiscales.
- Calcul du prélèvement annuel et de la pension nette.
- Information sur la règle anti-bascule (mention dans warnings).

### Ce que le calculateur **ne traite pas** (volontairement)

- Retenue à la source mensuelle (le calcul ici est annualisé).
- Cas spécifique des retraités résidents fiscaux à l'étranger (régime distinct).
- Pensions d'invalidité (régime CSG différent).
- ASPA et minimum vieillesse (exonération automatique non liée au RFR).
- Cumul emploi-retraite (impact RFR à anticiper).
- Régularisation annuelle si le RFR évolue (rappel ou trop-perçu).

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- Les seuils RFR sont **revalorisés chaque année** par arrêté. Vérifier au prochain audit que le code utilise bien les seuils 2026 (12 230 / 15 988 / 24 813 €) et non N-1.
- L'arrêté de revalorisation paraît au JO en décembre N-1 : nécessite une mise à jour annuelle en janvier.
- La règle anti-bascule (2 années consécutives) est documentée comme une pratique administrative ; à confirmer par une source officielle (BOSS).
- Le RFR utilisé est celui de **N-2** (revenus 2024 pour les prélèvements 2026). À mentionner dans l'UI.
- **Confirmé 2026-06-09 par Nicolas** : la rente PER (versements déductibles) est **exclue** de l'assiette L. 136-1-2 (II 11°) et bascule sur le régime pensions L. 136-8 → mêmes 4 paliers (0 / 4,3 / 7,4 / 9,1 %) que le présent calculateur. Cohérence à valider entre `per-sortie` et `csg-csds-retraite`.
