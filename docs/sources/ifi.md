# Sources - IFI : Impôt sur la fortune immobilière

**Dernière vérification** : 2026-06-09 (audit léger : aucune URL Légifrance valide à ce jour pour Art 964/973/974/977/979 CGI ; cross-check F563 service-public.gouv.fr maintenu (seuil 1 300 000 € + abattement RP 30 %) ; à re-sourcer dès qu'une URL Légifrance valide est trouvée ; précédente : 2026-06-03)
**Millésime fiscal** : IFI 2026 (patrimoine au 1er janvier 2026)

> ⚠ **Crawl 2026-05-31** : **toutes** les URLs Légifrance et BOFiP de ce document
> sont mortes (HTTP 404). Les URLs sont marquées d'un `~~strikethrough~~`. Cf.
> `docs/broken-links-to-fix.md` pour la liste consolidée. Les références textuelles
> (Art. 964, 977, 973, 974, 979 CGI) restent valides et exploitables , chercher
> directement sur Légifrance.

## Textes de loi

- **Article 964 du Code général des impôts** - Champ d'application et seuil IFI
  URL Légifrance : ~~`LEGIARTI000036472764`~~ (morte HTTP 404)
  Extrait pertinent : "Sont soumises à l'IFI les personnes physiques dont la valeur nette taxable du patrimoine immobilier est supérieure ou égale à 1 300 000 €."

- **Article 973 du Code général des impôts** - Passif déductible et abattement résidence principale
  URL Légifrance : ~~`LEGIARTI000036472780`~~ (morte HTTP 404)
  Extrait pertinent : "La valeur de la résidence principale fait l'objet d'un abattement de 30 %."

- **Article 977 du Code général des impôts** - Barème IFI
  URL Légifrance : ~~`LEGIARTI000036473012`~~ (morte HTTP 404)
  Extrait pertinent : Barème progressif en 6 tranches de 0 % à 1,50 %. Décote pour patrimoines entre 1 300 000 € et 1 400 000 € : 17 500 € − 1,25 % × patrimoine net.

- **Article 979 du Code général des impôts** - Plafonnement
  URL Légifrance : ~~`LEGIARTI000036473018`~~ (morte HTTP 404)
  Extrait pertinent : "La somme de l'IFI et de l'impôt sur le revenu ne peut excéder 75 % des revenus."

- **Article 974 du Code général des impôts** - Dettes déductibles
  URL Légifrance : ~~`LEGIARTI000036472786`~~ (morte HTTP 404)
  Extrait pertinent : Dettes déductibles : emprunts contractés pour acquisition, construction, réparation ou amélioration des biens taxables ; taxes foncières.

## Doctrine administrative

- **BOFiP BOI-PAT-IFI** - Documentation complète IFI
  URL : ~~`bofip/11225-PGP.html`~~ (morte HTTP 404 confirmé 2026-05-31)
  Note : Accès par fetch automatisé non disponible au 2026-05-07 (403). Données vérifiées via Légifrance et Wikipedia FR.

## Barèmes et taux

| Paramètre | Valeur | Source | Date |
|-----------|--------|--------|------|
| Seuil assujettissement | 1 300 000 € | Art. 964 CGI | 2018 (inchangé LF 2026) |
| Tranche 1 : 0 à 800 000 € | 0 % | Art. 977 CGI | 2018 |
| Tranche 2 : 800 000 à 1 300 000 € | 0,50 % | Art. 977 CGI | 2018 |
| Tranche 3 : 1 300 000 à 2 570 000 € | 0,70 % | Art. 977 CGI | 2018 |
| Tranche 4 : 2 570 000 à 5 000 000 € | 1,00 % | Art. 977 CGI | 2018 |
| Tranche 5 : 5 000 000 à 10 000 000 € | 1,25 % | Art. 977 CGI | 2018 |
| Tranche 6 : > 10 000 000 € | 1,50 % | Art. 977 CGI | 2018 |
| Abattement résidence principale | 30 % | Art. 973 CGI | 2018 |
| Décote progressive | 17 500 € − 1,25 % × P (pour 1,3M€ ≤ P < 1,4M€) | Art. 977 CGI | 2018 |
| Plafonnement IFI + IR | 75 % des revenus | Art. 979 CGI | 2018 |

Note : Le barème IFI n'a pas été modifié depuis la création de l'impôt par la LF 2018 (LOI n° 2017-1837 du 30 décembre 2017). Stable confirmé Wikipedia FR (consultation 2026-05-07).

## Exemples de référence

### Exemple 1 - Patrimoine 2 000 000 € (art. 977 CGI - barème seul)
- Inputs : valeur brute 2 000 000 €, pas de RP incluse, dettes 0 €
- Calcul :
  - Tranche 2 : 500 000 × 0,50 % = 2 500 €
  - Tranche 3 : 700 000 × 0,70 % = 4 900 €
  - IFI brut = 7 400 €
- Résultat attendu : IFI net = **7 400 €**

### Exemple 2 - Patrimoine 1 350 000 € avec décote (art. 977 CGI)
- Inputs : valeur brute 1 350 000 €, pas de RP incluse, dettes 0 €
- Calcul :
  - Tranche 2 : 500 000 × 0,50 % = 2 500 €
  - Tranche 3 : 50 000 × 0,70 % = 350 €
  - IFI brut = 2 850 €
  - Décote : 17 500 − 1,25 % × 1 350 000 = 625 €
  - IFI net = 2 225 €
- Résultat attendu : IFI net = **2 225 €**

### Exemple 3 - Patrimoine 5 000 000 € (art. 977 CGI)
- Inputs : valeur brute 5 000 000 €, pas de RP incluse, dettes 0 €
- Calcul :
  - Tranche 2 : 500 000 × 0,50 % = 2 500 €
  - Tranche 3 : 1 270 000 × 0,70 % = 8 890 €
  - Tranche 4 : 2 430 000 × 1,00 % = 24 300 €
  - IFI brut = 35 690 €
- Résultat attendu : IFI net = **35 690 €**

## Notes et limites connues

- Ce calculateur ne traite pas :
  - Les exonérations partielles : bois/forêts (75 %), biens ruraux loués par bail à long terme, actifs professionnels (Art. 975-976 CGI), œuvres d'art (100 %)
  - Les réductions IFI pour dons (Art. 978 CGI) - 75 % du don dans la limite de 50 000 €
  - Les situations de non-résidents (règles spécifiques Art. 964 II CGI)
  - Le démembrement de propriété (nue-propriété / usufruit)
  - Les sociétés civiles immobilières (quote-part taxable)
  - Le plafonnement des dettes déductibles (Art. 974 II CGI - plafond pour biens > 5 M€)
- Il suppose :
  - Biens détenus en pleine propriété directe
  - Valeurs vénales renseignées par l'utilisateur (aucune estimation automatique)
  - Dettes contractées exclusivement pour des biens taxables
