# Sources - Plus-value immobilière LMNP (réintégration amortissements LF 2025)

**Dernière vérification** : 2026-06-09 (audit léger : Art 150 VB CGI mutualisé re-confirmé OK via Art 150 U ; règle LMNP textuelle inchangée ; précédente : 2026-06-03)
**Millésime fiscal** : Cessions à compter du 15/02/2025 / Barème applicable au 03/06/2026
**Calculateur concerné** : `src/app/plus-value-immobiliere/lmnp/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables (50 % de 404 au
crawl 2026-05-31). Statut indiqué pour chaque URL ci-dessous.

Ce calculateur est un **wrapper léger** du calculateur `plus-value-immobiliere`.
La quasi-totalité des sources fiscales (barème 19 % IR, 17,2 % PS, abattements
durée de détention, surtaxe Art. 1609 nonies G) est mutualisée. Voir
`docs/sources/plus-value-immobiliere.md` pour ces points.

**Ce fichier documente uniquement la règle spécifique LMNP** introduite par
la LF 2025 (Art. 150 VB III CGI).

---

## Textes de loi

### Code général des impôts

- **Article 150 VB III CGI** - Réintégration des amortissements LMNP au prix d'acquisition
  - Statut : ✅ OK (re-testé 2026-06-03, contenu correspond)
  - URL : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053544785
  - Version en vigueur : 21 février 2026 (modifié par Loi n°2026-103 du 19 février 2026)
  - Point clé : "Le prix d'acquisition est minoré du montant des amortissements
    admis en déduction en application des i et j du 1° du I de l'article 31 ou
    de l'article 39 C, à l'exception de ceux..." (exclusions spécifiques)
  - Date d'entrée en vigueur originale : 15 février 2025 (LF 2025)

### Sources mutualisées (renvoient à `plus-value-immobiliere.md`)

- Article 150 U CGI - champ d'application des plus-values immobilières
- Article 150 VC CGI - abattements pour durée de détention (IR)
- Article L136-7 CSS VI 2 - abattements PS et taux 17,2 %
- Article 1609 nonies G CGI - surtaxe sur PV > 50 000 €
- Article 200 B CGI - taux IR 19 %

---

## Doctrine administrative

- BOFiP BOI-RFPI-PVI (série Plus-values immobilières)
  - Statut : ❌ 404 (cf. `docs/broken-links-to-fix.md`)
  - Référence textuelle conservée comme source primaire

Aucune actualité BOFiP spécifique à la réintégration LMNP n'a été identifiée
au 2026-06-03. À recroiser lors du prochain `/verif-sources`.

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr - F10864** - Calcul de la plus-value immobilière
  - Statut : ✅ OK (re-consulté 2026-06-03)
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F10864
  - Citation : « Si vous avez loué le bien en meublé en tant que loueur non
    professionnel, les amortissements que vous avez pu déduire sont réintégrés
    dans le prix d'acquisition, sous certaines conditions (pour les ventes
    réalisées depuis le 15 février 2025). »

---

## Barèmes et taux appliqués (spécifiques LMNP)

| Paramètre | Valeur | Source primaire | Cross-check 1 | Cross-check 2 | Millésime |
|-----------|--------|------------------|---------------|---------------|-----------|
| Mécanisme de réintégration | Prix d'acquisition fiscal = prix payé − amortissements LMNP cumulés | Art. 150 VB III CGI | service-public.gouv.fr F10864 | (BOFiP à reconstruire) | 2025+ |
| Date d'entrée en vigueur | 15 février 2025 | LF 2025 + service-public.gouv.fr F10864 | Légifrance Art 150 VB | - | 2025 |
| Périmètre | LMNP uniquement (location meublée non professionnelle) | Art. 150 VB III CGI | F10864 | - | 2025+ |

**Note** : ce calculateur n'introduit **aucun** taux/seuil/abattement nouveau.
Tous les chiffres viennent de `plus-value-immobiliere.md` et n'ont pas
besoin d'être re-cross-checkés ici.

---

## URLs vérifiées manuellement par Nicolas

Aucune URL en catégorie ❌/⚠️/☐ ne bloque ce calculateur, car les chiffres
sont mutualisés depuis `plus-value-immobiliere.md` et la règle LMNP est
confirmée par deux sources concordantes (Légifrance Art 150 VB III + F10864).

Il reste cependant un point que **Nicolas devrait vérifier visuellement** :

| URL ouverte | Article/donnée vérifié | À confirmer | Statut |
|-------------|------------------------|-------------|--------|
| https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053544785 | Art 150 VB III CGI - exclusions du paragraphe III | Le code ne gère pas les exclusions "à l'exception de ceux...". Confirmer que c'est un choix volontaire de simplification et pas un oubli. | ☐ |

---

## Exemples de référence

### Exemple 1 - Bien LMNP, acquisition 200k€, amortissements 30k€, cession 320k€

Source : exemple JSDoc inline `src/lib/plusValueLmnp.ts:36-39`.

**Inputs** :
- Prix d'acquisition : 200 000 €
- Forfait frais 7,5 % : 15 000 €
- Travaux forfait 15 % : 30 000 €
- Prix de cession : 320 000 €
- Détention : 8 ans
- Amortissements LMNP cumulés : 30 000 €

**Résultat attendu (standard, sans réintégration)** :
- Prix de revient : 245 000 €
- PV brute : 75 000 €
- Total impôts ≈ 25 176 € (cf. exemple 1 de `plus-value-immobiliere.md`)

**Résultat attendu (LMNP, avec réintégration)** :
- Prix d'acquisition fiscal : 200 000 − 30 000 = 170 000 €
- Prix de revient : 170 000 + 15 000 + 30 000 = 215 000 €
- PV brute : 320 000 − 215 000 = 105 000 €
- L'écart de PV brute (30 000 €) génère le surcoût LMNP

**Écart toléré** : ± 1 € (arrondis).

### Exemple 2 - Amortissements = 0 (LMNP n'ayant jamais déduit)

**Inputs** : amortissementsLmnpCumules = 0
**Résultat attendu** : resultatStandard = resultatLmnp, surcoutLmnp = 0, info warning.

### Exemple 3 - Amortissements > prix d'acquisition (cas limite, sur-amortissement)

**Inputs** : prixAcquisition = 100 000 €, amortissementsLmnpCumules = 150 000 €
**Résultat attendu** : prix d'acquisition fiscal LMNP = max(0, 100 000 − 150 000) = 0 €
(clamp à 0 dans le code, ligne 53).

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Cession LMNP entre particuliers (Art. 150 U CGI) avec réintégration des
  amortissements LMNP au prix d'acquisition.
- Comparaison du surcoût LMNP vs régime standard non-meublé.
- Clamp à 0 si les amortissements dépassent le prix d'acquisition.

### Ce que le calculateur **ne traite pas** (volontairement)

- **Les exclusions du III de l'Art. 150 VB CGI** ("à l'exception de ceux...").
  Le texte de l'article exclut certains amortissements de la réintégration
  (notamment certains établissements et locations spécifiques). Le
  calculateur applique la règle générale sans exclusion. **Si l'utilisateur
  est concerné par une exclusion, le surcoût LMNP affiché sera surestimé.**
  Limite documentée dans la FAQ et à signaler dans l'UI ("À savoir").
- Le LMP (loueur en meublé professionnel) : régime fiscal différent (BIC pro,
  plus-values pro). Hors scope - mentionné dans la FAQ.
- Les cessions antérieures au 15 février 2025 : suivent l'ancienne règle
  (pas de réintégration). Le calculateur applique systématiquement la
  réintégration - **donner un avertissement si l'utilisateur saisit une
  date de cession antérieure** (à vérifier dans le composant).
- L'amortissement automatique à partir des composants du bien : l'utilisateur
  saisit lui-même le total cumulé.

Ces limites **doivent** être mentionnées dans la section "À savoir" de la
page du calculateur.

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-03 | Claude Code (/verif-sources mini-audit) | Création initiale - Art 150 VB III CGI confirmé OK Légifrance + F10864 service-public.gouv.fr | _à venir_ |

### Points de vigilance

- **LF 2026** a modifié l'Art. 150 VB (version en vigueur depuis le 21/02/2026).
  Re-vérifier au prochain audit si la modification a touché le III (exclusions).
- La règle LMNP est récente : surveiller les commentaires BOFiP sur
  `BOI-RFPI-PVI-20-10` (calcul du prix d'acquisition) - URL actuelle morte,
  à reconstruire.
- Les exclusions du III sont non implémentées - décision de simplification
  à formaliser explicitement (à valider avec Nicolas).
