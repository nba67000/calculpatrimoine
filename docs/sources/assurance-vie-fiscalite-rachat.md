# Sources - Fiscalité Rachat Assurance-Vie

**Dernière vérification** : 2026-06-09 (audit léger : Art 125-0 A CGI LEGIARTI000044989424 et F22414 service-public.gouv.fr re-confirmés OK, abattements 4 600/9 200 € + seuil 150 000 € + taux 7,5 %/12,8 % toujours présents textuellement ; précédente : 2026-06-03)
**Millésime fiscal** : Revenus 2025 / Barème 2026

> ⚠ **Crawl 2026-05-31** : 1 URL Légifrance de ce document est morte
> (Art 200 A v37985080). Cf. `docs/broken-links-to-fix.md`.

---

## Textes de loi

- **Article 125-0 A du Code général des impôts** - Imposition des produits des bons ou contrats de capitalisation et assurance-vie
  URL Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044989424
  Extrait pertinent : "Les produits [...] sont soumis à l'impôt sur le revenu selon les modalités prévues au 1 du II de l'article 200 A"

- **Article 200 A du Code général des impôts** - Taux PFU (12,8%)
  URL Légifrance : ~~`LEGIARTI000037985080`~~ (morte HTTP 404)
  Extrait pertinent : "Le taux forfaitaire mentionné au 1 est fixé à 12,8 %"

## Doctrine administrative

- **BOFiP BOI-RPPM-RCM-20-10-20-50** - Produits des contrats d'assurance-vie : taux d'imposition
  URL : https://bofip.impots.gouv.fr/bofip/3951-PGP.html/identifiant=BOI-RPPM-RCM-20-10-20-50-20220630
  Date publication : 2022-06-30

- **impots.gouv.fr** - "J'ai effectué des retraits sur mon contrat d'assurance-vie, quelles sont les règles fiscales ?"
  URL : https://www.impots.gouv.fr/particulier/questions/jai-effectue-des-retraits-sur-mon-contrat-dassurance-vie-quelles-sont-les
  Date mise à jour : 2026-03-20

## Barèmes et taux

| Paramètre | Valeur | Source | Date |
|-----------|--------|--------|------|
| Taux PFU IR | 12,8 % | Art. 200 A CGI | 2026 |
| Prélèvements sociaux | 17,2 % | Art. L.136-6 CSS | 2026 |
| PFU total < 8 ans | 30 % (12,8 + 17,2) | Art. 125-0 A CGI | 2026 |
| PFU total > 8 ans, versements après 27/09/2017, encours ≤ 150 000€ | 24,7 % (7,5 + 17,2) | Art. 125-0 A CGI | 2026 |
| PFU total > 8 ans, versements après 27/09/2017, encours > 150 000€ | 30 % (12,8 + 17,2) | Art. 125-0 A CGI | 2026 |
| Taux IR versements avant 27/09/2017, contrat > 8 ans (PFL) | 7,5 % | Art. 125-0 A CGI | 2026 |
| PFU total versements avant 27/09/2017, contrat > 8 ans | 24,7 % (7,5 + 17,2) | Art. 125-0 A CGI | 2026 |
| Abattement annuel > 8 ans (personne seule) | 4 600 € | Art. 125-0 A CGI | 2026 |
| Abattement annuel > 8 ans (couple marié/pacsé) | 9 200 € | Art. 125-0 A CGI | 2026 |
| Seuil encours PFU réduit 7,5 % (versements post-2017, > 8 ans) | 150 000 € par personne | Art. 125-0 A CGI | 2026 |

**Note seuil 150 000€** : Le seuil de 150 000€ s'apprécie au niveau du foyer fiscal par personne (chaque époux a son propre seuil de 150 000€). Il tient compte de l'ensemble des versements nets effectués sur tous les contrats d'assurance-vie et de capitalisation du contribuable.

## Exemples de référence

### Exemple 1 - Contrat < 8 ans, versement 10 000€ dont 2 000€ de plus-value
- PFU : 2 000 × 30 % = 600€
- Net perçu : 9 400€

### Exemple 2 - Contrat > 8 ans (célibataire, encours < 150k€), rachat 50 000€ dont 5 000€ de plus-value, versements post-2017
- Abattement : 4 600€
- PV taxable : 400€
- PFU : 400 × 24,7 % = 98,80€
- Net perçu : 49 901,20€

### Exemple 3 - Contrat > 8 ans, 50 % versements avant 27/09/2017
- PV dans rachat : 3 000€ (dont 1 500€ pre-2017, 1 500€ post-2017)
- Taux moyen : (1 500 × 24,7 % + 1 500 × 30 %) / 3 000 = 27,35 %

## Notes et limites connues

- **Note historique** : un audit du 2026-05-03 avait identifié une divergence majeure sur l'absence du seuil 150 000 € dans le calculateur. **Corrigé depuis** dans `src/lib/assuranceVie.ts` (constante `SEUIL_ENCOURS_PFU_REDUIT = 150_000`, fonction `tauxIRPost2017` avec prorata). Vérifié le 2026-06-03.
- Le calculateur ne traite pas les contrats "vie-génération" (abattement de 20 % supplémentaire).
- L'abattement annuel est présenté comme disponible en totalité, sans tenir compte de son usage dans l'année (non-cumul d'une année à l'autre non modélisé).
- Les cas < 4 ans et 4-8 ans avec PFL (avant 2018) ne sont pas distingués : le calculateur n'est pas rétroactif sur les contrats anciens avec PFL 35 %/15 %.
- Le calculateur suppose que 100 % des versements sont en euros (pas de gestion UC / fonds euro séparés).
