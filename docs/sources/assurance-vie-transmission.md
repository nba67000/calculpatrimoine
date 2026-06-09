# Sources - Transmission Assurance-Vie (Art. 990 I / 757 B)

**Dernière vérification** : 2026-06-09 (audit léger : Art 990 I CGI LEGIARTI000047288653 re-confirmé OK, taux 20 % / 31,25 %, abattement 152 500 €, seuil 700 000 € toujours présents textuellement ; précédente : 2026-06-03)
**Millésime fiscal** : Revenus 2025 / Barème 2026

> ⚠ **Crawl 2026-05-31** : 2 URLs sont cassées : Art 777 (LEGIARTI000044981950 → 404)
> et Loi TEPA docs version (JORFTEXT000000872484 → re-route vers décret 1984 sans
> rapport). Les autres (990 I, 757 B, 779 , IDs LEGIARTI000047288653 / 47288569 /
> 26292566) sont OK et sont aujourd'hui utilisées dans le code. Pour Loi TEPA, le
> code utilise désormais JORFTEXT000000278649 (testé OK). Cf.
> `docs/broken-links-to-fix.md`.

---

## Textes de loi

- **Article 990 I du Code général des impôts** - Prélèvement sur capitaux décès, versements avant 70 ans
  URL Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047288653
  Extrait pertinent : "un prélèvement de 20 % [...] et de 31,25 % au-delà de 700 000 euros"

- **Article 757 B du Code général des impôts** - Versements après 70 ans soumis aux droits de succession
  URL Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047288569
  Note : modifié par Loi n°2023-171 du 9 mars 2023 (ajout PER - core 30 500€ inchangé)
  Extrait pertinent : "les sommes, rentes ou valeurs quelconques dues [...] à raison du décès de l'assuré sont soumises aux droits de mutation par décès"

- **Article 779 du Code général des impôts** - Abattements pour droits de succession
  URL Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000026292566
  Extrait pertinent : "Pour la perception des droits de mutation à titre gratuit, il est effectué un abattement de 100 000 € sur la part de chacun des ascendants et sur la part de chacun des enfants"

- **Article 777 du Code général des impôts** - Barème des droits de succession (ligne directe)
  URL Légifrance : ~~`LEGIARTI000044981950`~~ (morte HTTP 404)
  Extrait pertinent : barème progressif 5 % à 45 %, inchangé depuis LF 2011

- **Loi TEPA du 21 août 2007** - Exonération totale du conjoint survivant / partenaire PACS
  URL Légifrance : ~~`JORFTEXT000000872484`~~ (re-route vers Décret 1984 sans rapport) , utiliser `JORFTEXT000000278649` (testé OK, déjà en code)
  Extrait pertinent : exonération de droits de mutation pour le conjoint ou partenaire PACS

## Doctrine administrative

- **BOFiP BOI-TCAS-AUT-60** - Prélèvement Art. 990 I sur sommes versées par organismes d'assurance
  URL : https://bofip.impots.gouv.fr/bofip/1335-PGP.html/identifiant=BOI-TCAS-AUT-60-20230330
  Date publication : 2023-03-30

- **BOFiP BOI-ENR-DMTG-10-10-20-20** - Contrats Art. 757 B : mutations à titre gratuit, assurance-vie
  URL : https://bofip.impots.gouv.fr/bofip/3456-PGP.html/identifiant=BOI-ENR-DMTG-10-10-20-20-20230330
  Date publication : 2023-03-30

## Barèmes et taux

### Article 990 I - Versements avant 70 ans

| Paramètre | Valeur | Source | Date |
|-----------|--------|--------|------|
| Abattement par bénéficiaire | 152 500 € | Art. 990 I CGI | 2026 |
| Taux réduit (jusqu'à 700 000€ au-delà abattement) | 20 % | Art. 990 I CGI | 2026 |
| Taux normal (au-delà de 700 000€) | 31,25 % | Art. 990 I CGI | 2026 |
| Seuil bascule taux | 700 000 € | Art. 990 I CGI | 2026 |
| Exonération conjoint / partenaire PACS | 100 % | Loi TEPA 2007 | 2026 |

### Article 757 B - Versements après 70 ans

| Paramètre | Valeur | Source | Date |
|-----------|--------|--------|------|
| Abattement global (tous bénéficiaires cumulés) | 30 500 € | Art. 757 B CGI | 2026 |
| Plus-values générées par versements après 70 ans | Exonérées | Art. 757 B CGI | 2026 |
| Régime applicable après l'abattement | Droits de succession de droit commun (Art. 777) | Art. 757 B CGI | 2026 |

### Article 777 - Barème ligne directe

| Fraction de part nette taxable | Taux |
|-------------------------------|------|
| N'excédant pas 8 072 € | 5 % |
| De 8 072 € à 12 109 € | 10 % |
| De 12 109 € à 15 932 € | 15 % |
| De 15 932 € à 552 324 € | 20 % |
| De 552 324 € à 902 838 € | 30 % |
| De 902 838 € à 1 805 677 € | 40 % |
| Au-delà de 1 805 677 € | 45 % |

**Source** : Art. 777 CGI - barème inchangé depuis LF 2011.

### Barème frère / sœur et tiers

| Lien | Taux |
|------|------|
| Frère / sœur (jusqu'à 24 430 €) | 35 % |
| Frère / sœur (au-delà de 24 430 €) | 45 % |
| Autres (neveux, non-parents) | 60 % |

**Source** : Art. 777 CGI (tarif applicable en ligne collatérale et entre non-parents).

## Exemples de référence

### Exemple 1 - 990 I, 1 bénéficiaire enfant, capital décès 300 000€ (versements avant 70 ans)
- Abattement : 152 500€
- Base taxable : 147 500€
- Prélèvement : 147 500 × 20 % = 29 500€
- Net reçu : 270 500€

### Exemple 2 - 757 B, 2 enfants, versements après 70 ans 80 000€
- Abattement global 30 500€ partagé : 15 250€ / enfant
- Base taxable / enfant : (80 000 / 2) − 15 250 = 24 750€
- Droits / enfant (barème ligne directe) :
  - 8 072 × 5 % = 404€
  - (12 109 − 8 072) × 10 % = 404€
  - (15 932 − 12 109) × 15 % = 574€
  - (24 750 − 15 932) × 20 % = 1 764€
  - Total : 3 146€
- Total droits pour les 2 enfants : 6 292€

## Notes et limites connues

- Le calculateur traite séparément les versements avant/après 70 ans avec une simplification : les plus-values des versements avant 70 ans sont regroupées dans la base 990 I, sans ventilation précise entre les deux périodes.
- L'abattement 757 B de 30 500€ est réparti à parts égales entre les bénéficiaires non-conjoints (simplification - en réalité il est partagé au prorata des parts reçues).
- Le calculateur ne gère pas les clauses bénéficiaires démembrées (usufruit / nue-propriété).
- Le calculateur ne gère pas les contrats "vie-génération".
- Le rappel fiscal des donations antérieures (art. 784 CGI) n'est pas pris en compte pour les bénéficiaires qui auraient déjà reçu des capitaux AV.
- Le barème 990 I s'applique par bénéficiaire sur l'ensemble des capitaux décès reçus de l'assuré (tous contrats confondus) - le calculateur ne gère pas le cumul multi-contrats.
