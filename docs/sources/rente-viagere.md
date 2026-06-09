# Sources - Rente viagère (classique / inverse / couple)

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : 2026 (tables TGH 05 / TGF 05 toujours en vigueur)
**Calculateur concerné** : `src/app/rente-viagere/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables. La référence textuelle prime. Cf. `docs/broken-links-to-fix.md`.

Le calculateur s'appuie sur des **données actuarielles** (tables de mortalité) plutôt que sur des barèmes fiscaux. La fiscalité de la rente (Art. 158-6 CGI) n'est utilisée que pour le calcul du net imposable.

---

## Textes de loi et arrêtés

### Code des assurances

- **Article A132-1 du Code des assurances** - Taux technique maximum autorisé
  - Statut : ✅ OK (LEGIARTI000035514601 confirmé crawl 2026-05-31)
  - URL : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035514601
  - Point clé : taux technique plafonné à 75 % du taux moyen des emprunts d'État (TME), avec plafond absolu de 3,5 %.

- **Article A335-1 du Code des assurances** - Homologation des tables de mortalité
  - Statut : ☐ NON TESTÉE
  - Point clé : impose les tables TGH 05 (Tables Générations Homme) et TGF 05 (Femme) pour les contrats individuels.

### Code général des impôts

- **Article 158-6 CGI** - Fractions imposables des rentes viagères à titre onéreux
  - Statut : ✅ OK (LEGIARTI000053542725 confirmé crawl 2026-05-31)
  - URL : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053542725
  - Point clé : fraction imposable selon l'âge à l'entrée en jouissance — 70 % avant 50 ans, 50 % entre 50-59 ans, 40 % entre 60-69 ans, 30 % à partir de 70 ans.

### Arrêtés / Lois

- **Arrêté du 1er août 2006** - Homologation des tables TGH 05 / TGF 05
  - Statut : ✅ OK (JORFTEXT000000820127 confirmé crawl 2026-05-31)
  - URL : https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000820127

- **⚠️ Référence erronée à corriger** : la Loi n° 2011-1906 du 21 décembre 2011 est en réalité la **LFSS 2012** (sécurité sociale : maladie, retraite, famille, AT-MP). Elle ne traite **pas** des tables unisexes pour les rentes viagères. Référence à supprimer dans `src/lib/mortality.ts:34` et ici (lecture vérifiée 2026-06-09 par Nicolas, texte complet sur Légifrance).
- **Bonne référence à substituer** : arrêt CJUE C-236/09 "Test-Achats" du 1er mars 2011 + **Loi n° 2013-672 du 26 juillet 2013 art. 60** modifiant l'Art. L. 111-7 Code des assurances (transposition de la directive 2004/113/CE telle qu'interprétée par la CJUE). Effet : à compter du 21 décembre 2012, tarification non-discriminatoire H/F obligatoire pour les contrats d'assurance.
  - Statut : ☐ NON TESTÉE (à valider au prochain `/verif-sources`)
  - URL probable : https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000027751237

---

## Sources de vérification croisée (URLs stables)

- **INSEE - Tables de mortalité 2021** (publication juin 2023)
  - Statut : ✅ OK (re-confirmé crawl 2026-05-31)
  - URL : https://www.insee.fr/fr/statistiques/7624538
  - Usage : projections d'espérance de vie (cross-check).

- **service-public.gouv.fr - F3173** - "Déclarer les rentes viagères"
  - Statut : ✅ OK (re-confirmé 2026-06-09)
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F3173
  - Confirme les fractions imposables (Art. 158-6 CGI).

---

## Barèmes et taux appliqués

### Fractions imposables Art. 158-6 CGI (rentes à titre onéreux)

| Âge entrée en jouissance | Fraction imposable | Source | Millésime |
|---|--:|---|---|
| Moins de 50 ans | 70 % | Art. 158-6 CGI | 2026 |
| 50 à 59 ans | 50 % | Art. 158-6 CGI | 2026 |
| 60 à 69 ans | 40 % | Art. 158-6 CGI | 2026 |
| 70 ans et plus | 30 % | Art. 158-6 CGI | 2026 |

### Tables de mortalité

| Table | Usage | Pondération | Source |
|-------|-------|-------------|--------|
| TGH 05 | Hommes (calculs interne) | 48 % | Arrêté 01/08/2006 |
| TGF 05 | Femmes (calculs interne) | 52 % | Arrêté 01/08/2006 |
| Table unisexe pondérée | Calcul rente affiché | 100 % | Loi 2011-1906 (conformité CJUE) |

**Note** : depuis le 21 décembre 2012, les assureurs sont tenus d'utiliser une table de mortalité unisexe (arrêt CJUE de mars 2011). Le calculateur applique cette règle en pondérant TGH/TGF par la démographie française 2022 (INSEE) — 48 % H / 52 % F.

### Paramètres techniques

- Taux technique max : 3,5 % (plafond absolu Art. A132-1 Code des assurances)
- Plage d'âge supportée : 50 à 110 ans (couverture des tables)
- Seuil de probabilité négligeable : 0,001 (arrêt anticipé des calculs couple)
- Durée max calcul couple : 60 ans

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| (à compléter) | Tables TGH 05 / TGF 05 effectives 2026 | 48/52 % pondération | ☐ | - |
| (à compléter) | Plafond taux technique 3,5 % toujours d'actualité | 3,5 % | ☐ | - |

---

## Exemples de référence

### Exemple 1 - Rente simple homme 65 ans, capital 100 000 €
Source : JSDoc inline `src/lib/mortality.ts:317-320`.

**Inputs** :
- Capital : 100 000 €
- Âge : 65 ans
- Table : unisexe (pondérée)

**Résultat attendu** :
- Facteur viager unisexe ≈ 17,27
- Rente annuelle = 100 000 / 17,27 ≈ 5 790 €
- Rente mensuelle ≈ 482 €
- Espérance de vie résiduelle (unisexe) ≈ 22 ans
- Total attendu ≈ 127 380 €

### Exemple 2 - Rente avec réversion 80 %, H 65 + F 63, 100 000 €
Source : JSDoc inline `src/lib/mortality.ts:376-383`.

**Inputs** :
- Capital : 100 000 €
- Titulaire : 65 ans
- Conjoint : 63 ans
- Réversion : 80 %

**Résultat attendu** :
- Facteur "dernier décès" (unisexe) ≈ 24,2
- Facteur viager total ≈ 17,27 + 0,8 × 24,2 = 36,63
- Rente annuelle ≈ 100 000 / 36,63 ≈ 2 730 €
- Rente mensuelle ≈ 228 €
- Rente conjoint si décès (80 %) ≈ 182 €/mois

### Exemple 3 - Calcul inverse - capital requis pour 1 000 €/mois à 65 ans
Source : JSDoc inline `src/lib/mortality.ts:506-509`.

**Inputs** : rente mensuelle souhaitée 1 000 €, âge 65 ans
**Résultat attendu** :
- Rente annuelle = 12 000 €
- Capital requis = 12 000 × 17,27 ≈ 207 240 €

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Rente viagère immédiate, table unisexe (conformité 2012).
- Rente avec réversion au conjoint (60 %, 80 %, 100 %).
- Calcul inverse (capital requis pour une rente cible).
- Mode couple : 7 stratégies comparées (rentes séparées, dernier décès, réversion croisée).
- Fiscalité Art. 158-6 (fraction imposable selon âge).

### Ce que le calculateur **ne traite pas** (volontairement)

- Rente viagère différée (versement à partir d'une date future).
- Annuités certaines (paiements garantis sur durée fixe quel que soit le décès).
- Tables propres à un assureur (chaque assureur peut majorer techniquement).
- Frais de gestion de l'assureur (-0,3 % à -0,8 % typiquement sur la rente brute).
- Réversion à un tiers non conjoint.
- Liquidation d'un contrat PER en rente (le compartiment versements déductibles a un régime de pensions Art. 158-5° bis, différent — voir `per-sortie.md`).

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- Les tables TGH 05 / TGF 05 datent de 2006 — l'amélioration de la longévité depuis pourrait justifier une mise à jour réglementaire. À surveiller : tout arrêté postérieur modifiant l'Art. A335-1 Code des assurances.
- Le calculateur applique le taux technique implicite des tables (paramétré dans `mortality_tables.json`). À aligner sur le taux pratiqué par les assureurs au moment de la simulation.
- Pondération 48/52 % H/F basée sur la démographie générale (INSEE 2022). Pour un calcul personnalisé, l'individu choisit son contrat — mais l'assureur applique la table unisexe (CJUE).
- **Correction appliquée 2026-06-09 (validation Nicolas)** : `src/lib/mortality.ts` a été corrigé. L'ancienne mention "Loi n° 2011-1906" (qui était en fait la LFSS 2012, sans lien) est remplacée par la **Loi n° 2013-672 du 26 juillet 2013 art. 60**, transposant l'arrêt CJUE C-236/09 Test-Achats — base juridique réelle de la table unisexe en France.
