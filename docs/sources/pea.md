# Sources - PEA : fiscalité retrait + bilan latent

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : Revenus 2025 / Barème 2026
**Calculateur concerné** : `src/app/pea/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables. La référence textuelle prime. Cf. `docs/broken-links-to-fix.md`.

---

## Textes de loi

### Code monétaire et financier

- **Articles L. 221-30 et suivants CMF** - Régime juridique du Plan d'Épargne en Actions
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072026/LEGISCTA000006153317/
  - Point clé : conditions d'ouverture, plafond de versement (150 000 € pour le PEA classique, 75 000 € pour le PEA-PME), univers d'investissement (titres européens).

### Code général des impôts

- **Article 150-0 A CGI** - Régime fiscal des plus-values de valeurs mobilières
  - Statut : ☐ NON TESTÉE
  - Point clé : taxation au PFU 30 % pour les CTO ; exonération PEA après 5 ans (sauf PS).

- **Article 157, 5° bis CGI** - Exonération d'IR sur les gains du PEA après 5 ans de détention
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051212971
  - Point clé : exonération **uniquement IR**, les PS 17,2 % restent toujours dus sur la fraction PV.

### Code de la sécurité sociale

- **Article L. 136-7 CSS** - Prélèvements sociaux 17,2 % sur les revenus du patrimoine
  - Statut : ❌ 404 sur les anciennes versions du LEGIARTI
  - Référence textuelle conservée. La version applicable aux PV mobilières (PEA inclus) renvoie à `LEGIARTI000053584839` (testé OK pour PV immo — même article).

---

## Doctrine administrative

- **BOFiP BOI-RPPM-RCM-40-50** - Plan d'épargne en actions : régime fiscal
  - Statut : ☐ NON TESTÉE
  - URL à reconstruire avec identifiant complet.

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr - F2385** - "Plan d'épargne en actions (PEA)"
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.service-public.gouv.fr/particuliers/vosdroits/F2385

- **impots.gouv.fr** - "Fiscalité du PEA"
  - URL : https://www.impots.gouv.fr/particulier/le-plan-depargne-en-actions-pea

---

## Barèmes et taux appliqués

| Paramètre | Valeur | Source primaire | Cross-check | Millésime |
|-----------|--------|------------------|-------------|-----------|
| Exonération IR (gain) | après 5 ans | Art. 157-5° bis CGI | F2385 | 2026 |
| Prélèvements sociaux | 17,2 % | Art. L. 136-7 CSS | F2385 | 2026 |
| PFU avant 5 ans | 30 % (12,8 + 17,2) | Art. 200 A CGI | — | 2026 |
| Plafond PEA classique | 150 000 € | Art. L. 221-30 CMF | F2385 | 2026 |
| Plafond PEA-PME | 75 000 € | Art. L. 221-32-1 CMF | F2385 | 2026 |
| Retrait partiel après 5 ans | sans clôture (loi PACTE 2019) | Loi 2019-486 art. 89 | F2385 | 2026 |

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| (à compléter) | Art 157-5° bis CGI - exonération IR 5 ans toujours en vigueur | 5 ans | ☐ | - |
| (à compléter) | Plafond PEA 150 000 € (Art. L. 221-30 CMF) | 150 000 € | ☐ | - |

---

## Exemples de référence

### Exemple 1 - PEA 7 ans, valeur 100 k€, versements 60 k€, retrait 30 k€
Source : JSDoc inline `src/lib/pea.ts:26-31`.

**Inputs** :
- Valeur actuelle : 100 000 €
- Versements totaux : 60 000 €
- Âge PEA : 7 ans
- Montant retrait : 30 000 €

**Résultat attendu** :
- Plus-value latente = 40 000 € (soit 40 % de la valeur)
- Part PV dans retrait = 30 000 × 40 % = 12 000 €
- IR exonéré (> 5 ans)
- PS = 12 000 × 17,2 % = 2 064 €
- Net retrait = 30 000 - 2 064 = 27 936 €

### Exemple 2 - Bilan brut/net/passif latent à 7 ans

**Inputs** : valeur 100 000 €, versements 60 000 €, âge 7 ans
**Résultat attendu** :
- Vue brute = 100 000 €
- Vue nette sortie = 60 000 + 40 000 × (1 − 17,2 %) = 60 000 + 33 120 = 93 120 €
- Passif latent = 40 000 × 17,2 % = 6 880 €

### Exemple 3 - Retrait avant 5 ans, clôture automatique
- Âge PEA : 3 ans
- PFU 30 % sur PV → la part PV du retrait subit IR 12,8 % + PS 17,2 %.
- Loi PACTE 2019 : le plan est obligatoirement clôturé (sauf cas limitatifs).

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Trois vues bilan : brute / nette sortie / passif latent.
- Retrait partiel avec calcul du net immédiat.
- Distinction avant/après 5 ans (PFU vs PS seuls).
- Hypothèse de répartition proportionnelle PV / valeur (simplification).

### Ce que le calculateur **ne traite pas** (volontairement)

- Plafond PEA 150 000 € (versements) : non vérifié dans le code.
- PEA-PME (plafond 75 000 €, mêmes règles fiscales).
- Cas dérogatoires de retrait avant 5 ans sans clôture (décès du titulaire, licenciement, invalidité — Art. L. 221-32 CMF).
- Sortie en rente viagère (rente exonérée d'IR mais soumise PS si > 5 ans).
- Donation ou succession d'un PEA (la PV latente devient PV taxable au moment du transfert).

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- L'hypothèse "PV répartie proportionnellement" est une simplification : en pratique, le retrait porte sur des titres précis dont la PV peut diverger. À mentionner dans l'UI.
- Plafond PEA 150 000 € à vérifier dans le code : risque si l'utilisateur saisit une valeur > 150 000 € pour un PEA classique.
- Cas spécifique du PEA-PME (mêmes règles fiscales, plafond 75 000 €) : non distingué.
- L'exonération IR après 5 ans suppose que le plan n'a jamais fait l'objet d'un retrait avant les 5 ans (sinon clôture rétroactive).
