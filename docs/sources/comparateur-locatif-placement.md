# Sources - Comparateur locatif vs placement financier

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : Revenus 2025 / Barème 2026
**Calculateur concerné** : `src/app/comparateur-locatif-placement/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables. La référence textuelle prime. Cf. `docs/broken-links-to-fix.md`.

Ce calculateur est un **agrégateur** : il mutualise des règles déjà documentées dans d'autres fichiers sources. Voir :
- `docs/sources/plus-value-immobiliere.md` pour les abattements PV immo
- `docs/sources/assurance-vie-fiscalite-rachat.md` pour le régime AV
- `docs/sources/pea.md` pour le régime PEA

---

## Textes de loi

### Code général des impôts (location nue, revenus fonciers)

- **Article 14 et suivants CGI** - Revenus fonciers (location nue)
  - Statut : ☐ NON TESTÉE
  - Point clé : régime micro-foncier (abattement 30 %, seuil 15 000 €/an) et régime réel (charges déductibles).

- **Article 200 A CGI** - PFU 30 % sur les gains des placements financiers
  - Statut : ❌ 404 (LEGIARTI000037985080)
  - Point clé : PFU 12,8 % IR + 17,2 % PS sur valeurs mobilières hors PEA/AV durée.

### Régimes spécifiques mutualisés

- **Articles 150 U et s. CGI** - Plus-values immobilières (PV à la sortie locatif)
  - Cf. `docs/sources/plus-value-immobiliere.md`

- **Article 150-0 A CGI** - Régime PEA (exonération IR après 5 ans)
  - Cf. `docs/sources/pea.md`

- **Article 125-0 A CGI** - Régime assurance-vie (abattement 4 600 €/an après 8 ans)
  - Cf. `docs/sources/assurance-vie-fiscalite-rachat.md`

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr - F1334** - "Revenus fonciers : régime micro-foncier"
  - Statut : ☐ NON TESTÉE
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F1334

- **service-public.gouv.fr - F22414** - "Imposition des revenus d'un contrat d'assurance-vie"
  - Statut : ✅ OK (re-confirmé 2026-06-09)
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F22414

- **service-public.gouv.fr - F10864** - "Calcul de la plus-value immobilière"
  - Statut : ✅ OK (confirmé 2026-06-03)
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F10864

---

## Barèmes et taux appliqués (côté placement)

| Paramètre | Valeur | Source | Cross-check |
|-----------|--------|--------|-------------|
| PFU CTO | 30 % (12,8 + 17,2) | Art. 200 A CGI | F22414 |
| PEA après 5 ans | 17,2 % PS seuls (IR exonéré) | Art. 157-5° bis CGI | `pea.md` |
| AV après 8 ans (seul) | Abattement 4 600 € puis PFU 30 % | Art. 125-0 A CGI | `assurance-vie-fiscalite-rachat.md` |

## Barèmes et taux appliqués (côté locatif)

| Paramètre | Valeur | Source | Cross-check |
|-----------|--------|--------|-------------|
| Abattement micro-foncier | 30 % | Art. 32 CGI | F1334 |
| Seuil micro-foncier | 15 000 €/an | Art. 32 CGI | F1334 |
| IR sur PV immo | 19 % | Art. 200 B CGI | `plus-value-immobiliere.md` |
| PS sur PV immo | 17,2 % | Art. L. 136-7 CSS | `plus-value-immobiliere.md` |
| Abattements durée détention | barème Art. 150 VC et L. 136-7 VI 2 | — | `plus-value-immobiliere.md` |

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| (à compléter) | Seuil micro-foncier 15 000 € en 2026 | 15 000 € | ☐ | - |
| (à compléter) | Abattement micro-foncier 30 % en 2026 | 30 % | ☐ | - |

---

## Exemples de référence

### Exemple 1 - Comparaison locatif 4 %, placement 5 %, 100 k€, 20 ans, TMI 30 %

**Inputs** :
- Capital initial : 100 000 €
- Durée : 20 ans
- TMI : 30 %
- Locatif : rendement brut 4 %, valorisation 2 %/an, frais 25 % du loyer, régime micro-foncier
- Placement : 5 %/an, véhicule CTO (PFU 30 %)

**Résultat estimé** :
- Locatif : loyer net cumulé + capital revente + PV nette ≈ 150 000-160 000 €
- Placement : 100 000 × 1,05^20 = 265 330 € brut → impôt PFU sur 165 330 € de gains = 49 599 € → net ≈ 215 730 €
- Placement avantageux d'environ 50-65 k€ sur 20 ans (sans effet de levier crédit immo).

### Exemple 2 - Locatif 6 %, PEA 7 % >5 ans
- PEA après 5 ans : seuls les PS 17,2 % s'appliquent → effet net puissant sur long terme.

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Achat comptant immobilier vs placement comptant (sans crédit).
- Régimes micro-foncier et réel (côté locatif).
- Véhicules placement : PEA, AV, CTO.
- Plus-value immobilière simplifiée avec abattements durée détention (IR + PS).
- Surtaxe Art. 1609 nonies G : non modélisée (V1 simplifiée).
- Frais d'acquisition et droits de mutation : non chiffrés (warning explicite).

### Ce que le calculateur **ne traite pas** (volontairement, V1)

- **Effet de levier crédit immobilier** : achat à crédit + déduction intérêts. Différence radicale du résultat. V2 explicite dans BACKLOG.md.
- Frais notaire (~7-8 % du prix) : non modélisés.
- Vacance locative explicite (intégrée seulement dans `fraisChargesPct`).
- Indexation des loyers à l'inflation.
- Plafond PEA (150 000 €) non vérifié.
- IFI si la valorisation immo dépasse 1,3 M€.
- Régime micro-foncier : seuil 15 000 € de loyers/an non vérifié dans le code.
- TVA pour marchand de biens.
- Mode mixte (50 % immo + 50 % placement).

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- Le calculateur ne vérifie pas le seuil micro-foncier de 15 000 €/an : si les loyers dépassent ce seuil, le micro-foncier n'est pas applicable. Risque de résultat incorrect.
- Abattement AV 4 600 € applicable uniquement aux célibataires (couple = 9 200 €). Le code ne distingue pas la situation matrimoniale.
- Hypothèses macro (rendement, valorisation linéaires) : très simplificatrices. À signaler dans l'UI.
- Une **V2** est prévue dans le BACKLOG pour intégrer l'effet de levier crédit — point central pour la décision réelle.
