# Sources - SCI à l'IR vs SCI à l'IS

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : Revenus 2025 / Barème 2026
**Calculateur concerné** : `src/app/sci-is-vs-ir/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables. La référence textuelle prime. Cf. `docs/broken-links-to-fix.md`.

Calculateur **V1 simplifiée** : couvre uniquement l'impôt annuel sur les loyers. La fiscalité de sortie (PV particulier vs PV pro) est **non modélisée** et inverse fréquemment la conclusion. V2 listée dans BACKLOG.md.

---

## Textes de loi

### Code général des impôts

- **Article 8 CGI** - SCI translucide (transparence fiscale) : revenus imposés au nom des associés
  - Statut : ☐ NON TESTÉE
  - Point clé : par défaut, la SCI relève des revenus fonciers chez chaque associé au prorata de ses parts.

- **Article 206 CGI** - Option de la SCI pour l'IS
  - Statut : ☐ NON TESTÉE
  - Point clé : option ouverte ; depuis LF 2019, **option irrévocable** (LF 2019 a supprimé la révocabilité de l'option IS).

- **Article 219 I-b CGI** - Taux réduit d'IS pour PME
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048845200
  - Point clé : 15 % jusqu'à 42 500 € de bénéfice, 25 % au-delà. Conditions PME : CA < 10 M€, capital entièrement libéré, détention 75 % par personnes physiques.

- **Articles 14 et suivants CGI** - Revenus fonciers (location nue)
  - Statut : ☐ NON TESTÉE
  - Cf. `docs/sources/deficit-foncier.md`.

### Code de la sécurité sociale

- **Article L. 136-7 CSS** - Prélèvements sociaux 17,2 % sur les revenus fonciers (SCI à l'IR)
  - Statut : ✅ OK (LEGIARTI000053584839 — cross-check PV immo)

---

## Doctrine administrative

- **BOFiP BOI-IS-CHAMP-10-30** - Sociétés civiles : option IS
  - Statut : ☐ NON TESTÉE

- **BOFiP BOI-IS-LIQ-20** - Liquidation IS : taux réduit PME
  - Statut : ☐ NON TESTÉE

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr - F31497** - "Taux normal et taux réduit de l'IS"
  - Statut : ☐ NON TESTÉE
  - URL : https://www.entreprendre.service-public.fr/vosdroits/F23575

- **impots.gouv.fr** - "Taux de l'impôt sur les sociétés"
  - URL : https://www.impots.gouv.fr/professionnel/lechelle-des-taux-de-limpot-sur-les-societes

---

## Barèmes et taux appliqués

### IS (Art. 219 I-b CGI)

| Tranche bénéfice | Taux | Source | Millésime |
|------------------|-----:|--------|-----------|
| 0 à 42 500 € | 15 % | Art. 219 I-b CGI | 2026 |
| Au-delà de 42 500 € | 25 % | Art. 219 CGI | 2026 |

**Conditions PME pour taux réduit** :
- Chiffre d'affaires < 10 M€
- Capital entièrement libéré
- Détention par des personnes physiques à au moins 75 %

### IR (SCI translucide) - revenus fonciers

| Paramètre | Valeur | Source | Millésime |
|-----------|--------|--------|-----------|
| IR | au barème selon TMI associé | Art. 197 CGI | 2026 |
| Prélèvements sociaux | 17,2 % | Art. L. 136-7 CSS | 2026 |
| Déficit foncier imputable revenu global | 10 700 € (ou 21 400 € passoires) | Art. 156 I-3° CGI | 2026 |

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| (à compléter) | Art 219 I-b CGI - seuil 42 500 € et taux 15/25 % en 2026 | 42 500 € / 15 / 25 % | ☐ | - |
| (à compléter) | Option IS irrévocable depuis LF 2019 | irrévocable | ☐ | - |

---

## Exemples de référence

### Exemple 1 - Loyers 24 k€, charges 4 k€, intérêts 6 k€, amortissements 8 k€, TMI 30 %
Source : JSDoc inline `src/lib/sciRegime.ts:33-38`.

**Inputs** :
- Loyers annuels : 24 000 €
- Charges : 4 000 €
- Intérêts emprunt : 6 000 €
- Amortissements : 8 000 €
- TMI : 30 %

**Résultat annuel attendu** :
- IR (SCI translucide) : 24 - 4 - 6 = 14 000 € imposable → IR 4 200 € + PS 2 408 € = 6 608 €
- IS : 24 - 4 - 6 - 8 = 6 000 € imposable → IS 900 € (15 % × 6 000)
- IS plus avantageux annuellement : 5 708 € d'écart.

**Limite** : à la sortie, l'IS réintègre les 8 000 €/an × N années d'amortissements dans la PV pro → impôt élevé sur la PV finale. Le calcul ne s'arrête donc pas à l'annuel.

### Exemple 2 - Petite SCI sans amortissement, bénéfice IS 50 k€
- IS = 42 500 × 15 % + 7 500 × 25 % = 6 375 + 1 875 = 8 250 €
- À comparer avec IR (TMI 30 %) : 50 000 × (30 + 17,2 %) = 23 600 €
- IS plus de moitié moins cher annuellement, MAIS sortie à modéliser séparément.

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Comparaison **annuelle** de l'impôt SCI IR vs IS.
- Barème IS 2026 (15 % / 25 %).
- Calcul du revenu foncier net (charges + intérêts déduits).
- Amortissements pris en compte uniquement pour l'IS.
- Cumul sur durée de projet.

### Ce que le calculateur **ne traite pas** (volontairement, V1)

- **Plus-value à la sortie** : différence radicale IR (PV particulier, abattements durée détention) vs IS (PV pro, réintégration amortissements). **Warning critique affiché**. V2 listée dans BACKLOG.md.
- Distribution de dividendes (hypothèse : réinvestissement total).
- Déficit foncier imputable sur revenu global (10 700 €) : non modélisé (clamp à 0).
- Frais comptables IS (~1 500-2 500 €/an obligatoires) : non chiffrés mais mentionnés en warning.
- Conditions PME pour le taux réduit 15 % : non vérifiées (hypothèse PME satisfaite).
- Contribution sociale sur l'IS (3,3 % au-delà de 763 000 € d'IS).
- SCI familiale (régime spécifique non distingué).
- Imposition des dividendes côté associés en cas de distribution IS.

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- **Caractère irrévocable de l'option IS** depuis LF 2019 : à confirmer dans le code et signaler dans l'UI.
- Le calcul **annuel** seul est trompeur pour un projet long terme. Le warning danger est présent dans le code (`src/lib/sciRegime.ts:75-77`) : vérifier qu'il s'affiche bien dans l'UI.
- Conditions PME pour 15 % d'IS : potentiellement non remplies (capital partiellement libéré, personne morale dans le capital). Aucune vérification dans le code.
- L'IR clamp le déficit à 0 → sous-estime l'avantage IR pour les SCI en travaux. À reconnaître en V2.
