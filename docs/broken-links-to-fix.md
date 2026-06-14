# URLs externes à reconstruire

Liste consolidée des URLs Légifrance/BOFiP cassées identifiées par les crawls
**2026-05-31** (3 rounds, ~54 URLs testées au total). Toutes les entrées
cassées ont vu leur `href`/`url` et `desc`/`sujet` retirés du code (option A ,
quick fix). Seul le **label / référence textuelle** reste affiché à l'utilisateur.

## Méthode pour reconstruire

Pour chaque article : aller sur https://www.legifrance.gouv.fr/, chercher
l'article par numéro + code, récupérer l'URL stable de la version actuellement
en vigueur. Tester avec WebFetch avant de remettre en code.

Pour les BOFiP : toujours utiliser l'**identifiant BOI-XXX complet** dans l'URL
(`?identifiant=BOI-XXX-XX-XX-DATEMILLESIME`). Les URLs nues `<id>-PGP.html` ne
sont pas stables et re-routent souvent vers le mauvais document.

---

## ✅ URLs restaurées dans le code suite au crawl du 2026-05-31

3 articles ont retrouvé un LEGIARTI valide (identifiants alternatifs déjà
présents dans `docs/sources/` ou `chatResources.ts`) :

| Article | LEGIARTI valide | Restauré dans |
|---|---|---|
| Art 990 I CGI | LEGIARTI000047288653 | `src/lib/assuranceVie.ts`, `src/lib/transmission.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` (×2), `src/config/chatResources.ts` |
| Art 757 B CGI | LEGIARTI000047288569 | `src/lib/transmission.ts`, `src/config/chatResources.ts` |
| Art 779 CGI | LEGIARTI000026292566 | `src/lib/donation.ts`, `src/config/chatResources.ts` |

---

## 👁 Textes intégraux confirmés humainement par Nicolas (2026-06-14)

Nicolas a fourni les **textes intégraux** depuis Légifrance pour les 13 articles ci-dessous. Leurs **références textuelles sont confirmées** ainsi que les **chiffres-clés appliqués** dans le code. Les URLs LEGIARTI restent cassées (côté Légifrance) mais ce n'est plus bloquant — la **référence textuelle** prime sur l'URL (cf. CLAUDE.md §6).

**Conséquence pratique** : les calculateurs qui utilisent ces articles peuvent être considérés **conformes au sourçage** (👁 HUMAINE) jusqu'au prochain crawl Légifrance qui retrouvera une URL stable.

| Article | Version applicable | Chiffres-clés confirmés | Fichiers impactés |
|---------|---------------------|--------------------------|--------------------|
| **Art 125-0 A CGI** (rachat AV) | LF 2021-1900 art. 35 | Abattement annuel 4 600 €/9 200 € (couple) ; PFU 7,5 % (≥8 ans) ou 12,8 % (<8 ans) | `src/lib/assuranceVie.ts`, blog AV, FAQ AV |
| **Art L136-7 CSS** (PS placements) | LF 2026-103 art. 24 | Assiette CSG sur produits AV (a/b/c du 3° II) | `src/lib/assuranceVie.ts`, blog AV, `docs/sources/assurance-vie-fiscalite-rachat.md` |
| **Art 163 quatervicies CGI** (PER déduction) | LF 2026-103 art. 10 | Déduction PER : 10 % revenus pro plafonné à 8 × PASS ; report 5 ans ; conjoint cumulable | `src/lib/per.ts`, blog PER, `docs/sources/per-individuel.md`, `chatResources.ts` |
| **Art L224-1 CMF** (PER définition) | Loi 2019-486 art. 71 | Définition PER + sortie rente/capital | `src/lib/per.ts`, blog PER |
| **Art 158 CGI** (revenu imposable) | LF 2026-103 art. 9 | Abattement pensions 10 % plafond **4 399 €** (min 450 €) ; rente viagère à titre onéreux : **70/50/40/30 %** selon âge entrée (<50/50-59/60-69/>69) ; abattement dividendes 40 % | `src/lib/tmi.ts`, `src/lib/per.ts`, blog rente, `docs/sources/tmi.md` |
| **Art 964 CGI** (IFI seuil) | LF 2017-1837 art. 31 | Seuil patrimoine taxable **1 300 000 €** | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| **Art 977 CGI** (barème IFI) | LF 2017-1837 art. 31 | 6 tranches : 0 % jusqu'à 800 k€ / 0,50 % / 0,70 % / 1,00 % / 1,25 % / 1,50 % au-delà de 10 M€ + décote 17 500 − 1,25 % P (entre 1,3 et 1,4 M€) | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| **Art 973 CGI** (évaluation IFI) | LF 2023-1322 art. 27 | Abattement **30 %** RP du propriétaire ; règles dettes intra-groupe | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| **Art 974 CGI** (passif IFI) | LF 2018-1317 art. 48 | Dettes déductibles ; prêts in fine : amortissement linéaire fictif ; plafonnement 50 % au-delà de 60 % de la valeur pour patrimoine > 5 M€ | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| **Art 979 CGI** (plafonnement IFI) | LF 2018-1317 art. 202 | Plafonnement IFI + IR ≤ **75 %** des revenus mondiaux N-1 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| **Art 777 CGI** (tarifs DMTG) | LF 2014-1655 art. 61 | Tableau I (ligne directe) : 5/10/15/20/30/40/45 % aux seuils 8 072 / 12 109 / 15 932 / 552 324 / 902 838 / 1 805 677 € ; Tableau II (époux/PACS) : 5/10/15/20/30/40/45 % aux seuils 8 072 / 15 932 / 31 865 / 552 324 / 902 838 / 1 805 677 € ; Tableau III (collatéraux) : frères/sœurs 35 %/45 % (seuil 24 430 €), parents 4e degré 55 %, autres 60 % | `src/lib/donation.ts`, `src/lib/succession.ts`, `src/lib/transmission.ts`, `chatResources.ts`, `docs/sources/donation-droits.md`, `docs/sources/succession.md` |
| **Art 197 CGI** (barème IR + QF) | LF 2026-103 art. 4 | Barème 2026 (revenus 2025) : 0 / 11 / 30 / 41 / 45 % aux seuils **11 600 / 29 579 / 84 577 / 181 917 €** ; plafond QF **1 807 € / demi-part** ; décote 897 € (célib) / 1 483 € (couple) ; majoration parent isolé 4 262 € | `src/lib/tmi.ts`, `chatResources.ts`, `docs/sources/tmi.md` |
| **Art 83 CGI** (frais pro) | LF 2026-103 art. 78 | Plafond frais pro forfaitaire **14 426 €** (rev. 2024) ; minimum 504 € ; barème kilométrique 40 premiers km | `src/lib/per.ts` |
| **Art 784 CGI** (rappel 15 ans) | LF 2016-1917 art. 32 | Durée du rappel : **15 ans** ; reconstitution des donations antérieures dans les **tranches les plus élevées** du barème (Art. 779/790 B/D/E/F) | `src/lib/donation.ts`, `src/lib/succession.ts` |
| **Art 790 G CGI** (don familial argent) | LF 2023-1322 art. 118 | Abattement **31 865 €** tous les 15 ans ; donateur **< 80 ans** ; donataire ≥ 18 ans ou émancipé ; lien : enfant, petit-enfant, arrière-petit-enfant ou (à défaut de descendance) neveu/nièce/petit-neveu/petite-nièce par représentation ; non pris en compte pour le rappel 784 (point III) | `src/lib/donation.ts` |
| **Art 790 E CGI** (don entre époux) | LF 2012-958 art. 5 | Abattement **80 724 €** entre époux ou partenaires de PACS | `src/lib/donation.ts` |
| **Art L136-8 CSS** ⚠️ MAJ MAJEURE | LF 2025-1403 du 30/12/2025 art. 12 | CSG sur produits du capital portée à **10,6 %** (était 9,2 %). Total PS = 10,6 + 0,5 CRDS + 7,5 prélèvement solidarité = **18,6 %** (était 17,2 %). Calendrier : L136-6 → revenus 2025 ; L136-7 → 1/1/2026 | `src/lib/fiscal/taux.ts` + 16 libs migrées |
| **Art 199 septies CGI** | LF 2023-1322 art. 12 | Réduction d'impôt 25 % primes assurance (handicap) ; plafond 1 525 € + 300 € par personne à charge ; pas d'usage direct dans nos calculateurs (mentionné par Art. 125-0 A pour exonération sortie en rente) | n/a (référence textuelle uniquement) |
| **Art 235 ter CGI** | LF 2018-1203 art. 26 | Prélèvement de solidarité **7,5 %** sur revenus du patrimoine et produits de placement (composante du 18,6 %) | `src/lib/fiscal/taux.ts` |

**Précision IR 2026 (Art. 197)** : le barème actuel dans `src/lib/tmi.ts` doit être confronté à ces valeurs. Si déjà à jour → laisser. Sinon → tâche à inscrire au prochain `/verif-sources`.

**Migration PS 17,2 % → 18,6 % (Art. L136-8 LF 2025-1403)** : effectuée le 2026-06-14. Module centralisé `src/lib/fiscal/taux.ts` créé. 16 libs + 12 pages + 3 articles blog mis à jour. 282 tests vitest passent. Build Next.js OK.

---

## ❌ Légifrance , articles confirmés morts (HTTP 404)

Légende : 👁 = texte intégral confirmé manuellement par Nicolas le 2026-06-14 — la **référence textuelle prime** sur l'URL (cf. section dédiée plus haut). Les autres lignes attendent encore une vérification humaine ou un nouveau crawl.

| Article | Ancien LEGIARTI | Statut | Fichiers à mettre à jour quand l'URL valide est trouvée |
|---|---|---|---|
| Art 125-0 A CGI (rachat AV) | LEGIARTI000047956718 | 👁 2026-06-14 | `src/lib/assuranceVie.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` (×3), `src/app/faq/assurance-vie/page.tsx` |
| Art L136-7 CSS (prélèvements sociaux) | LEGIARTI000047958086 | 👁 2026-06-14 | `src/lib/assuranceVie.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` |
| Art L136-7 CSS (autre version) | LEGIARTI000037985080 | 👁 2026-06-14 | `docs/sources/assurance-vie-fiscalite-rachat.md` |
| Art 163 quatervicies CGI (déduction PER) | LEGIARTI000048776042 | 👁 2026-06-14 | `src/lib/per.ts`, `docs/sources/per-individuel.md` |
| Art 163 quatervicies CGI (chatResources) | LEGIARTI000047605786 | 👁 2026-06-14 | `src/config/chatResources.ts` |
| Art 163 quatervicies CGI (blog) | LEGIARTI000037985573 | 👁 2026-06-14 | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` (×2) |
| Art L224-1 CMF (blog) | LEGIARTI000038612513 | 👁 2026-06-14 | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` |
| Art 158-5° bis CGI | LEGIARTI000044979614 | 👁 2026-06-14 (Art 158 confirmé) | `src/app/blog/per-...`, `src/app/blog/rente-viagere-seuil-rentabilite/page.tsx` |
| Art 964 CGI (seuil IFI) | LEGIARTI000036472764 | 👁 2026-06-14 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 977 CGI (barème IFI) | LEGIARTI000036473012 | 👁 2026-06-14 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 973 CGI (abattement RP IFI) | LEGIARTI000036472780 | 👁 2026-06-14 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 974 CGI (dettes IFI) | LEGIARTI000036472786 | 👁 2026-06-14 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 979 CGI (plafond IFI+IR) | LEGIARTI000036473018 | 👁 2026-06-14 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 777 CGI (donation lib) | LEGIARTI000041464063 | 👁 2026-06-14 | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| Art 777 CGI (chatResources) | LEGIARTI000044981950 | 👁 2026-06-14 | `src/config/chatResources.ts` |
| Art 779 CGI (lib version) | LEGIARTI000048845104 | À crawler | `docs/sources/donation-droits.md` (le lib utilise désormais la version `26292566` qui fonctionne) |
| Art 784 CGI (rappel 15 ans) | LEGIARTI000041464760 | 👁 2026-06-14 | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| Art 790 G CGI (don familial) | LEGIARTI000041464661 | 👁 2026-06-14 | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| Art 790 E CGI (don entre époux) | LEGIARTI000038588107 | 👁 2026-06-14 | `src/lib/donation.ts` |
| Art 990 I CGI (lib version) | LEGIARTI000045583309 | À crawler | `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` source , les libs utilisent désormais la version `47288653` qui fonctionne |
| Art 83 CGI (frais professionnels) | LEGIARTI000044986838 | 👁 2026-06-14 | `src/lib/per.ts` |
| Articles L.224-1 et s. CMF (section) | LEGITEXT000006072026/LEGISCTA000038619671/ | 👁 2026-06-14 (Art L224-1 confirmé) | `src/lib/per.ts` |
| Articles 777 et s. (transmission) | LEGIARTI000042160878 | 👁 2026-06-14 (Art 777 confirmé) | `src/lib/transmission.ts` |
| Art 197 CGI (chatResources) | LEGIARTI000044981244 | 👁 2026-06-14 | `src/config/chatResources.ts` |

## ⚠️ Légifrance , articles confirmés pointant vers le MAUVAIS contenu

| Référence annoncée | LEGIARTI utilisé | Affiche en réalité | Fichiers |
|---|---|---|---|
| Art 194 CGI (quotient familial) | LEGIARTI000006302756 | Art 150-0 F (PV OPCVM) | `src/lib/tmi.ts`, `docs/sources/tmi.md` |
| Art 196 CGI (parts) | LEGIARTI000006302765 | Art 150 N bis (**abrogé en 2003**) | `docs/sources/tmi.md` |
| Art 757 B CGI (lib version) | LEGIARTI000006305484 | Art 796 (exonération militaires) | (corrigé : lib utilise désormais `47288569`) |
| Art 195 CGI (section) | LEGISCTA000006179579/ | Art 200 A (valeurs mobilières) | `src/lib/tmi.ts` |
| Art 158 5° bis CGI (blog) | LEGIARTI000042158853 | Art 156 (section générique) | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` |
| Loi 2011-1906 (tables unisexes) | JORFTEXT000023744555 | "Pas de contenu disponible" | `src/lib/mortality.ts` |
| Loi TEPA 2007 (docs version) | JORFTEXT000000872484 | Décret n°84-752 (Ministre Affaires européennes 1984) | `docs/sources/assurance-vie-transmission.md` |

## ⚠️ BOFiP , identifiants à reconstruire (URL OK mais re-route vers mauvais doc)

| Référence | URL morte | Contenu réel affiché | Fichiers |
|---|---|---|---|
| BOI-RPPM-RCM-20-10-20 | `bofip/2823-PGP.html` | BNC - Champ d'application | `src/lib/assuranceVie.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` (×2), `src/app/faq/assurance-vie/page.tsx` |
| BOI-ENR-DMTG-20-30-20-20 | `bofip/3845-PGP.html` | RPPM - PV biens meubles incorporels | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| BOFiP-Assurance-vie et successions | `bofip/3296-PGP.html` | ENR-DMTOI-10-70-60 (coopératives agricoles) | `src/lib/transmission.ts` |
| BOFiP RSA-PENS-10 (PER blog) | `bofip/10261-PGP.html` | Convention fiscale France-Andorre | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` |

## ❌ BOFiP , HTTP 404

| Référence | URL morte | Fichiers |
|---|---|---|
| BOFiP IFI | `bofip/11225-PGP.html` | `docs/sources/ifi.md` |
| BOFiP PER (docs) | `bofip/2108-PGP.html/identifiant=BOI-IR-BASE-20-50-10` | `docs/sources/per-individuel.md` |
| BOFiP PV immo | `bofip/208-PGP.html/identifiant=BOI-RFPI-PVI` | `docs/sources/plus-value-immobiliere.md` |

---

## ✅ URLs confirmées OK (validées par les 3 rounds de crawl 2026-05-31)

### Légifrance , articles
- Art 125-0 A CGI (LEGIARTI000044989424) , `docs/sources/`, `src/config/chatResources.ts`
- Art 197 CGI (LEGIARTI000051212954) , `src/lib/tmi.ts` ⚠ version 2025 (à actualiser pour le millésime 2026 si nécessaire)
- Art 150 U CGI (LEGIARTI000053544910) , `src/lib/plusValueImmobiliere.ts`, `src/config/chatResources.ts`
- Art 150 VB CGI (LEGIARTI000053544785) , `src/lib/plusValueImmobiliere.ts`
- Art 150 VD CGI (LEGIARTI000047970809) , `src/lib/plusValueImmobiliere.ts`
- Art L136-7 CSS VI 2 (LEGIARTI000053584839) , `src/lib/plusValueImmobiliere.ts`
- Art 1609 nonies G CGI (LEGIARTI000048806252) , `src/lib/plusValueImmobiliere.ts`, `src/config/chatResources.ts`
- Art 158 CGI (LEGIARTI000053542725) , `src/lib/mortality.ts`
- Art A132-1 Code des assurances (LEGIARTI000035514601) , `src/lib/mortality.ts`
- Art 163 quatervicies CGI (LEGIARTI000053542827) , `src/app/blog/per-individuel-deduction-fiscalite/page.tsx`
- Art L224-1 CMF (LEGIARTI000038507575) , `src/app/blog/per-individuel-deduction-fiscalite/page.tsx`
- Art L224-28 CMF (LEGIARTI000048805604) , `src/app/blog/per-individuel-deduction-fiscalite/page.tsx`
- **Art 990 I CGI** (LEGIARTI000047288653) , RESTAURÉ dans libs + blog + chatResources
- **Art 757 B CGI** (LEGIARTI000047288569) , RESTAURÉ dans lib + chatResources
- **Art 779 CGI** (LEGIARTI000026292566) , RESTAURÉ dans lib + chatResources

### Légifrance , lois
- Loi TEPA 2007 (JORFTEXT000000278649) , `src/lib/transmission.ts`
- Loi de finances 2018 art. 28 (JORFTEXT000036339197) , `src/lib/assuranceVie.ts`, blog
- Arrêté 1er août 2006 tables TGH/TGF (JORFTEXT000000820127) , `src/lib/mortality.ts`

### BOFiP (avec identifiant complet)
- BOI-RPPM-RCM-20-10-20-50 (3951-PGP) , `src/lib/assuranceVie.ts`, `src/config/chatResources.ts`
- BOI-IR-LIQ-20-10 (2491-PGP) , `src/lib/tmi.ts`, `docs/sources/tmi.md`
- BOI-IR-LIQ-20-20-30 (2495-PGP) , `src/lib/tmi.ts`, `docs/sources/tmi.md`
- BOI-IR-LIQ-20-20-20 (2494-PGP) , `docs/sources/tmi.md`

---

## URLs encore non testées (à valider lors d'une prochaine session)

Très peu : il reste essentiellement quelques URLs Service-Public et docs/sources
non critiques. Sans signal contraire, on les considère OK par défaut tant que
personne ne remonte de problème (ces URLs sont historiquement stables) :

- service-public.fr fiches : F14203, F22414, F3173, F10864, F34982
- insee.fr / ined.fr (URLs INSEE et INED , formats historiques stables)
- bofip/14954-PGP.html/ACTU-2026-00022 (actualité TMI, dans docs seulement)
- LEGIARTI000047970756 (Art 150 VC CGI, dans `chatResources.ts` et `src/lib/plusValueImmobiliere.ts`) , cohérent avec le pattern Art 150 VB/VD qui sont OK, probablement OK aussi

---

## Statistiques crawl 2026-05-31

- **Total URLs testées** : ~54 (sur les 3 rounds)
- **OK** : ~21 (39 %)
- **HTTP 404** : ~27 (50 %)
- **Pointant vers mauvais contenu** : ~9 (17 %)
- **Confirmées via crawl mais déjà OK dans le code** : 11
- **Restaurées dans le code** (URLs alternatives valides) : 3 articles, ~7 occurrences
- **Nouvellement strippées du code** suite aux rounds 2-3 : 11 URLs
