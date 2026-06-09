# Sources - PER : sortie capital vs rente

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : Revenus 2025 / Barème 2026
**Calculateur concerné** : `src/app/per-sortie/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI relatives au PER sont en grande partie mortes (crawl 2026-05-31). La référence textuelle des articles prime sur l'URL. Cf. `docs/broken-links-to-fix.md`.

Ce calculateur partage des sources avec `per-individuel` (régime de déductibilité à l'entrée). Voir `docs/sources/per-individuel.md`.

---

## Textes de loi

### Code général des impôts

- **Article 158 § 5 b bis CGI** - Rente PER versements déductibles → régime pensions de retraite
  - Statut : 👁 HUMAINE (Nicolas, 2026-06-09)
  - Point clé textuel : « Les dispositions du a sont applicables aux prestations servies sous forme de rentes [...] **lorsque l'option prévue au deuxième alinéa de l'article L. 224-20 du code monétaire et financier n'a pas été exercée** » → rattache la rente PER (versements déductibles) au régime § 5 a (pensions + abattement 10 %).
  - **Correction 2026-06-09** : la mention "Article 158, 5° bis CGI" précédemment dans le code et dans cette doc était erronée — le 5° bis n'existe pas dans l'Art. 158. Bonne référence : § 5 b bis.

- **Article 158 § 5 a CGI** - Régime pensions et retraites (abattement 10 % avec bornes 450 € / 4 399 €)
  - Statut : 👁 HUMAINE (Nicolas, 2026-06-09)
  - Point clé textuel : « Les pensions et retraites font l'objet d'un abattement de 10 % qui ne peut excéder **4 399 €** [...] L'abattement [...] ne peut être inférieur à **450 €** ».

- **Article 158 § 5 b quinquies 1° CGI** - Capital PER versements déductibles imposé sans abattement 10 %
  - Statut : 👁 HUMAINE (Nicolas, 2026-06-09)
  - Point clé textuel : prestations de retraite en capital, pour la part versements déductibles, « **sont imposées sans application de l'abattement** prévu au deuxième alinéa du a du présent 5 » → barème IR direct, sans abattement.

- **Article 200 A B 1° CGI** - Prélèvement forfaitaire unique 12,8 % (+ PS 17,2 % = 30 %)
  - Statut : 👁 HUMAINE (Nicolas, 2026-06-09)
  - Point clé textuel : « Le taux forfaitaire mentionné au premier alinéa du présent 1 est fixé à **12,8 %** ».

- **Article 163 quatervicies I b CGI** - Régime de déduction à l'entrée du PER, report 5 ans (LF 2026 art. 10)
  - Statut : 👁 HUMAINE (Nicolas, 2026-06-09)
  - Point clé textuel : « La différence [...] peut être utilisée au cours de **l'une des cinq années suivantes** » (LOI 2026-103 du 19/02/2026 art. 10).

### Code de la sécurité sociale

- **Article L. 136-1-2 CSS** - Assiette CSG sur revenus d'activité et de remplacement, et exclusions
  - Statut : 👁 HUMAINE (Nicolas, 2026-06-09 : texte intégral consulté, version LOI 2025-199 du 28/02/2025)
  - **Point clé textuel (II 11°)** : "Les prestations de retraite, versées sous forme de rente ou de capital, issues d'un plan d'épargne retraite mentionné à l'article L. 224-1 du code monétaire et financier [...] **lorsque ces prestations correspondent à des versements** mentionnés au 1° de l'article L. 224-2 dudit code **n'ayant pas fait l'objet de l'option** prévue au deuxième alinéa de l'article L. 224-20" → **exclues** de l'assiette L. 136-1-2.
  - **Conséquence** : la rente PER (compartiment versements déductibles) ne relève **pas** de L. 136-1-2. Elle est imposée au régime **pensions de retraite Art. L. 136-8 CSS** (4 paliers selon RFR, taux normal 9,1 %).

- **Article L. 136-8 CSS** - Taux CSG sur pensions de retraite (4 paliers selon RFR)
  - Statut : ☐ NON TESTÉE
  - Point clé : la rente PER (versements déductibles), exclue de L. 136-1-2 par le 11°, est in fine soumise au régime pensions L. 136-8 → 0 % / 4,3 % / 7,4 % / 9,1 % selon RFR.
  - Voir cross-check sur `docs/sources/csg-csds-retraite.md`.

---

## Doctrine administrative

- **BOFiP BOI-RSA-PENS-30-10** - Régime des pensions et rentes viagères : rentes PER
  - Statut : ❌ 404 (URL `10261-PGP.html` re-route vers convention fiscale France-Andorre)
  - Référence textuelle conservée. URL à reconstruire avec identifiant complet.

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr - F34982** - "Plan d'épargne retraite (PER)"
  - Statut : ✅ OK (re-confirmé 2026-06-09 — redirige depuis service-public.fr)
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F34982
  - Sections : "Sortie en capital" et "Sortie en rente" — confirment la mécanique d'imposition.

- **service-public.gouv.fr - F3173** - "Impôt sur le revenu - Déclarer les rentes viagères"
  - Statut : ✅ OK (re-confirmé 2026-06-09)
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F3173
  - Confirme l'abattement 10 % rentes / pensions (Art. 158-5° bis).

---

## Barèmes et taux appliqués

| Paramètre | Valeur | Source primaire | Cross-check | Millésime |
|-----------|--------|------------------|-------------|-----------|
| PFU sur gains (capital) | 30 % (12,8 + 17,2) | Art. 200 A B 1° CGI (validé textuellement 2026-06-09) | F34982 | 2026 |
| Abattement pensions sur rente | 10 % | Art. 158 § 5 a CGI (validé textuellement 2026-06-09) | F3173 | 2026 |
| Plafond abattement pensions (foyer) | **4 399 €** | Art. 158 § 5 a CGI (validé textuellement 2026-06-09) | — | 2026 |
| Plancher abattement pensions (par pensionné) | **450 €** | Art. 158 § 5 a CGI (validé textuellement 2026-06-09) | — | 2026 |
| Exclusion assiette L. 136-1-2 (rente PER versements déductibles) | exclusion II 11° | Art. L. 136-1-2 II 11° CSS (LOI 2025-199, validé textuellement 2026-06-09) | — | 2025+ |
| CSG/CRDS/CASA pensions (normal, après bascule L. 136-8) | 9,1 % (8,3 + 0,5 + 0,3) | Art. L. 136-8 CSS | `csg-csds-retraite.md` | 2026 |

**Note** : le calculateur applique le taux **normal** 9,1 % par simplification (pas d'évaluation RFR pour basculer en taux réduit/médian/exonéré). Pour une simulation fine, croiser avec le calculateur CSG retraite.

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| Légifrance Art 158 § 5 a CGI | Abattement 10 % rentes, plafond 4 399 €, plancher 450 € | 10 % / 4 399 € / 450 € | ✅ | 2026-06-09 |
| Légifrance Art 200 A B 1° CGI | PFU 12,8 % (+17,2 % PS = 30 %) | 30 % | ✅ | 2026-06-09 |
| Légifrance Art L. 136-1-2 II 11° CSS | Exclusion rente PER versements déductibles | exclu de L. 136-1-2 | ✅ | 2026-06-09 |
| Légifrance Art L. 136-8 CSS | Régime pensions 9,1 % taux normal | 9,1 % | ☐ | - |

---

## Exemples de référence

### Exemple 1 - Capital 100 k€, 70 % versements déductibles, TMI 11 %, mode capital
Source : JSDoc inline `src/lib/perSortie.ts:38-44`.

**Inputs** :
- Capital accumulé : 100 000 €
- Fraction versements déductibles : 70 %
- TMI à la retraite : 11 %
- Mode : capital

**Résultat attendu** :
- Versements imposables = 70 000 €
- Impôt versements = 70 000 × 11 % = 7 700 €
- Impôt gains (PFU) = 30 000 × 30 % = 9 000 €
- Total impôt = 16 700 €
- Net capital = 83 300 €

### Exemple 2 - Mode rente, capital 100 k€, taux rente 4 %, TMI 30 %, durée 20 ans

**Inputs** :
- Capital : 100 000 €
- Taux rente : 4 %
- TMI : 30 %
- Espérance vie résiduelle : 20 ans

**Résultat attendu** :
- Rente annuelle brute = 4 000 €
- Abattement 10 % = 400 € → base imposable = 3 600 €
- IR rente = 3 600 × 30 % = 1 080 €
- PS rente = 4 000 × 9,1 % = 364 €
- Rente nette = 4 000 - 1 444 = 2 556 €
- Net cumulé 20 ans = 51 120 €

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Sortie capital (versements à l'IR + gains au PFU).
- Sortie rente (régime pensions Art. 158-5° bis + CSG/CRDS/CASA).
- Mode mixte (part capital + complément rente).
- Calcul du seuil de rentabilité rente vs capital.

### Ce que le calculateur **ne traite pas** (volontairement)

- Sortie anticipée pour acquisition résidence principale.
- Sortie anticipée pour accident de la vie (Art. L.224-4 CMF).
- Versements non déductibles (compartiment 2 du PER).
- Sélection fine du taux PS retraite selon RFR (le calculateur applique 9,1 % normal en simplification).
- Réversion de rente au conjoint.

Ces limites doivent figurer dans la section "À savoir" du calculateur.

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- Taux PS 9,1 % retenu en simplification : pour un RFR sous le seuil médian, le taux réel peut être 7,4 % (médian), 4,3 % (réduit) ou 0 % (exonéré). Mentionner dans l'UI. Cf. `csg-csds-retraite.md`.
- **Abattement pensions 10 % bornes corrigées 2026-06-09 : min 450 € / max 4 399 € par foyer** (Art. 158 § 5 a CGI, validé textuellement par Nicolas). Précédente valeur "454 € / 4 439 €" dans la doc était erronée. Non modélisé dans le calculateur — abattement 10 % appliqué sans bornage.
- **Confirmation 2026-06-09** : la référence textuelle pour l'exclusion CSG de la rente PER (versements déductibles) est **Art. L. 136-1-2 II 11° CSS** (créé/modifié par LOI 2025-199 du 28/02/2025). La rente bascule sur le régime pensions L. 136-8.
- LF 2026 art. 10 a allongé le report PER de 3 à 5 ans côté entrée (Art. 163 quatervicies I b CGI, validé textuellement par Nicolas) — sans effet sur ce calculateur.
