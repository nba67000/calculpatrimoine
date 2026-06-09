# Sources - PER individuel : économie d'impôt sur versement

**Dernière vérification** : 2026-06-09 (audit léger : F34982 service-public.gouv.fr "Plan d'épargne retraite (PER)" et F3173 "Déclarer les rentes viagères" re-confirmés OK ; URLs Légifrance toujours mortes ; cross-check des chiffres maintenu ; précédente : 2026-06-03)
**Millésime fiscal** : Revenus 2025 / Barème 2026

> ⚠ **Crawl 2026-05-31** : 3 URLs Légifrance + 1 BOFiP de ce document sont
> mortes (HTTP 404). Marquées en `~~strikethrough~~`. Cf. `docs/broken-links-to-fix.md`.

---

## Textes de loi

- **Article 163 quatervicies du Code général des impôts** - Déductibilité des cotisations et versements effectués au titre de l'épargne retraite (PER individuel)
  URL Légifrance : ~~`LEGIARTI000048776042`~~ (morte HTTP 404)
  Version en vigueur : 21 février 2026 (modifié par LF 2026 art. 10)
  Extrait pertinent point b) : "La différence [...] peut être utilisée au cours de l'une des cinq années suivantes."
  Note : LF 2026 art. 10 a porté la durée de report de 3 ans à 5 ans.

- **Article 83 du Code général des impôts** - Déduction forfaitaire de 10 % pour frais professionnels sur les salaires (abattement min/max)
  URL Légifrance : ~~`LEGIARTI000044986838`~~ (morte HTTP 404)
  Version en vigueur : 21 février 2026 (modifié par LF 2026 art. 78)
  Extrait pertinent : "Elle est limitée à 14 426 € pour l'imposition des rémunérations perçues en 2024 ; chaque année, le plafond [...] est relevé dans la même proportion que la limite supérieure de la première tranche du barème."
  Valeurs 2025 (revenus 2025) : min 509 € = 504 × (11 600/11 497), max 14 555 € = 14 426 × (11 600/11 497)

- **Article L.224-1 et suivants du Code monétaire et financier** - Régime juridique du Plan d'Épargne Retraite (PER)
  URL Légifrance : ~~`LEGISCTA000038619671` (section)~~ (morte HTTP 404)

---

## Doctrine administrative

- **BOFiP BOI-IR-BASE-20-50-10** - Plafond de déduction des cotisations d'épargne retraite
  URL : ~~`bofip/2108-PGP.html`~~ (morte HTTP 404 confirmé 2026-05-31)
  Note : URL à re-vérifier - le BOFiP a restructuré ses identifiants en 2024-2025.

---

## Barèmes et taux

| Paramètre | Valeur | Source | Date |
|-----------|--------|--------|------|
| PASS 2025 | 47 100 € | Décret du 29 nov. 2024 | 2025 |
| Plafond PER max 2026 | 37 680 € | = 10 % × 8 × PASS 2025 | 2026 |
| Plafond PER min 2026 | 4 710 € | = 10 % × 1 × PASS 2025 | 2026 |
| Abattement frais pro min | 509 € | Art. 83 CGI, LF 2026 | 2026 |
| Abattement frais pro max | 14 555 € | Art. 83 CGI, LF 2026 | 2026 |
| Report plafonds non utilisés | 5 ans (N-1 à N-5) - LF 2026 art. 10 | Art. 163 quatervicies I b) CGI | 2026 |

Sources des montants 2026 vérifiées sur https://www.service-public.gouv.fr le 2026-05-01, re-vérifiées le 2026-06-03.

---

## Exemples de référence

### Exemple 1 - Salarié à 60 000 € / TMI 30 % / versement 3 000 €

- Inputs : salaire net 60 000 €, TMI 30 %, versement 3 000 €, reports 0
- Abattement frais pro : min(max(6 000 €, 509 €), 14 555 €) = 6 000 €
- Revenu net professionnel : 60 000 − 6 000 = 54 000 €
- Plafond annuel : max(4 710, min(5 400, 37 680)) = 5 400 €
- Plafond total : 5 400 € (pas de reports)
- Montant déductible : min(3 000, 5 400) = 3 000 €
- Économie fiscale attendue : **900 €** (3 000 × 30 %)
- Coût net réel : **2 100 €**

### Exemple 2 - Salarié à 50 000 € / TMI 30 % / versement 5 000 € (dépassement)

- Inputs : salaire net 50 000 €, TMI 30 %, versement 5 000 €, reports 0
- Abattement frais pro : 5 000 € (10 % × 50 000)
- Revenu net professionnel : 45 000 €
- Plafond annuel : max(4 710, min(4 500, 37 680)) = **4 710 €** (minimum légal s'applique)
- Montant déductible : 4 710 € (versement 5 000 > plafond → warning)
- Économie fiscale attendue : **1 413 €** (4 710 × 30 %)
- Part non déductible : **290 €**

### Exemple 3 - Avec report N-1

- Inputs : salaire net 50 000 €, TMI 41 %, versement 10 000 €, report N-1 = 3 000 €
- Plafond annuel : 4 710 €
- Plafond total : 4 710 + 3 000 = **7 710 €**
- Montant déductible : 7 710 €
- Économie fiscale attendue : **3 161 €** (7 710 × 41 %)
- Coût net réel : **6 839 €**

---

## Notes et limites connues

- Ce calculateur ne traite pas : les TNS (Madelin, plafond différent), le PERCOL, le PERO.
- Il ne simule pas la fiscalité à la sortie (rente imposable ou capital avec IR + PS).
- Il suppose que l'abattement de 10 % pour frais professionnels s'applique (cas salarié standard). Les frais réels ne sont pas gérés.
- La mutualisation des plafonds entre conjoints (mariage/PACS) n'est pas simulée.
- Il suppose que le versement est intégralement un versement volontaire déductible (compartiment 1 du PER).
- Les versements non déductibles (option de ne pas déduire) ne sont pas simulés.
- Millésime applicable : versements effectués en 2026 sur revenus 2025.
