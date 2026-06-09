# Sources - LMNP réel vs micro-BIC

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : Revenus 2025 / Barème 2026 (post-LF 2025)
**Calculateur concerné** : `src/app/lmnp-reel-vs-micro/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables. La référence textuelle prime. Cf. `docs/broken-links-to-fix.md`.

Sources spécifiques à la **plus-value à la sortie** : voir `docs/sources/plus-value-immobiliere-lmnp.md` (réintégration amortissements LF 2025).

---

## Textes de loi

### Code général des impôts

- **Article 50-0 CGI** - Régime micro-BIC : abattements forfaitaires et seuils
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000048846006
  - Point clé : seuils et abattements modifiés par LF 2025 pour le meublé touristique non classé (50 % → 30 %, 77 700 € → 15 000 €).

- **Article 32 CGI** - Conditions d'option pour le régime réel
  - Statut : ☐ NON TESTÉE
  - Point clé : option pour le réel possible quel que soit le montant des loyers.

- **Article 156 I-1° ter CGI** - Imputation du déficit LMNP
  - Statut : ☐ NON TESTÉE
  - Point clé : le déficit LMNP est imputable **uniquement sur les bénéfices LMNP des 10 années suivantes** (jamais sur le revenu global, contrairement au déficit foncier).

### Loi

- **Loi de finances pour 2025 art. 84** - Réforme du micro-BIC pour les meublés touristiques non classés
  - Statut : ☐ NON TESTÉE
  - Point clé : abattement passé de 50 % à 30 %, seuil de loyers réduit de 77 700 € à 15 000 €, à compter des revenus 2024 (déclarés en 2025).

### Code de la sécurité sociale

- **Article L. 136-7 CSS** - Prélèvements sociaux 17,2 % sur les revenus LMNP
  - Statut : ✅ OK (LEGIARTI000053584839 — confirmé cross-check PV immo)
  - URL : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053584839

---

## Doctrine administrative

- **BOFiP BOI-BIC-CHAMP-40-20** - Location meublée non professionnelle : régime micro-BIC
  - Statut : ☐ NON TESTÉE
  - URL à reconstruire avec identifiant complet.

- **BOFiP BOI-BIC-BASE-100** - Régime réel BIC : charges et amortissements déductibles
  - Statut : ☐ NON TESTÉE

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr - F32744** - "Location meublée non professionnelle"
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.service-public.gouv.fr/particuliers/vosdroits/F32744

- **impots.gouv.fr** - "Location meublée"
  - URL : https://www.impots.gouv.fr/particulier/location-meublee

---

## Barèmes et taux appliqués

### Seuils et abattements micro-BIC (Art. 50-0 CGI)

| Type de meublé | Abattement | Seuil de loyers/an | Source |
|----------------|-----------:|--------------------:|--------|
| Meublé classique (longue durée) | 50 % | 77 700 € | Art. 50-0 CGI |
| Meublé touristique classé | 71 % | 188 700 € | Art. 50-0 CGI |
| Meublé touristique non classé | 30 % | 15 000 € | Art. 50-0 CGI (LF 2025 art. 84) |

### Prélèvements sociaux et IR

| Paramètre | Valeur | Source | Millésime |
|-----------|--------|--------|-----------|
| Prélèvements sociaux | 17,2 % | Art. L. 136-7 CSS | 2026 |
| IR | au barème selon TMI | Art. 197 CGI | 2026 |
| Report déficit réel LMNP | 10 ans (uniquement bénéfices LMNP) | Art. 156 I-1° ter CGI | 2026 |

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| (à compléter) | Art 50-0 CGI - abattement 30 % / seuil 15 000 € meublé touristique non classé | 30 % / 15 000 € | ☐ | - |
| (à compléter) | Seuil 188 700 € meublé classé | 188 700 € | ☐ | - |
| (à compléter) | Seuil 77 700 € meublé classique | 77 700 € | ☐ | - |

---

## Exemples de référence

### Exemple 1 - Loyers 20 k€, charges 4 k€, amortissements 6 k€, TMI 30 %, meublé classique
Source : JSDoc inline `src/lib/lmnpRegime.ts:35-41`.

**Inputs** :
- Loyers annuels : 20 000 €
- Charges réelles : 4 000 €
- Amortissements : 6 000 €
- TMI : 30 %
- Type meublé : classique

**Résultat attendu** :
- Micro : 20 000 × (1 − 50 %) = 10 000 € imposable → IR 3 000 € + PS 1 720 € = 4 720 €
- Réel : 20 000 − 4 000 − 6 000 = 10 000 € imposable → IR 3 000 € + PS 1 720 € = 4 720 €
- Égalité dans ce cas — la décision se joue à la marge.

### Exemple 2 - Meublé touristique non classé, loyers 25 k€
- Loyers 25 000 € > seuil 15 000 € → micro-BIC inaccessible
- Réel obligatoire avec tenue de comptabilité.

### Exemple 3 - Loyers 40 k€, charges 10 k€, amortissements 15 k€, TMI 41 %
- Micro : 40 000 × 50 % = 20 000 € → 4 100 × 5 = IR 8 200 + PS 3 440 = 11 640 €
- Réel : 40 000 − 10 000 − 15 000 = 15 000 € → IR 6 150 + PS 2 580 = 8 730 €
- Réel avantageux d'environ 2 910 €/an → couvre largement les ~600 €/an de comptable.

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Comparaison micro-BIC vs régime réel.
- 3 types de meublé (classique, touristique classé, touristique non classé post-LF 2025).
- Calcul d'IR (TMI) + PS 17,2 %.
- Gestion du déficit réel (clamp à 0, signal report 10 ans).
- Vérification d'éligibilité au micro selon seuil.

### Ce que le calculateur **ne traite pas** (volontairement)

- **LMP** (loueur en meublé professionnel) : régime distinct, déficit imputable sur revenu global, plus-values pro à la sortie. Hors scope.
- **Plus-value à la sortie LMNP** : voir `docs/sources/plus-value-immobiliere-lmnp.md` (réintégration amortissements LF 2025).
- Cas de bascule micro → réel en cours d'année.
- Cotisations sociales URSSAF en cas de dépassement de seuil professionnel (23 000 €/an et > 50 % des revenus).
- Choix d'amortissement par composants (le calculateur prend un total annuel).
- TVA (régime LMNP > seuil de franchise).

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- LF 2025 art. 84 : la réforme du meublé touristique non classé s'applique aux revenus 2024 (déclarés 2025). Vérifier la date d'entrée en vigueur exacte côté code.
- Le seuil de bascule LMNP → LMP (23 000 € + > 50 % revenus du foyer) n'est pas vérifié dans le code. Risque pour les bailleurs intensifs.
- L'amortissement saisi est un total annuel — le calculateur ne décompose pas par composant (gros œuvre, second œuvre, mobilier). Approximation acceptable en V1.
- Cotisations sociales du LMNP (revenu < 23 000 €) : 17,2 % PS prélevés à l'IR. Au-delà, basculement potentiel URSSAF non modélisé.
