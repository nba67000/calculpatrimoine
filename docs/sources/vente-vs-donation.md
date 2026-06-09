# Sources - Vente vs donation intrafamiliale d'un bien immobilier

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : Cessions 2026 / Barème donation 2026
**Calculateur concerné** : `src/app/vente-vs-donation/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables. La référence textuelle prime. Cf. `docs/broken-links-to-fix.md`.

Ce calculateur **mutualise** la quasi-totalité de ses sources :
- Côté vente : `docs/sources/plus-value-immobiliere.md` (PV immo)
- Côté donation : `docs/sources/donation-droits.md` (abattements + barème)

Ce fichier documente uniquement la **comparaison** et le DMTO côté acheteur.

---

## Textes de loi

### Code général des impôts - vente

Cf. `docs/sources/plus-value-immobiliere.md` :
- Art. 150 U CGI - champ d'application PV immo (✅ OK)
- Art. 150 VB CGI - prix d'acquisition majoré (✅ OK)
- Art. 150 VC CGI - abattements durée détention IR (probablement OK)
- Art. L. 136-7 CSS - PS et abattements PS (✅ OK)
- Art. 1609 nonies G CGI - surtaxe PV > 50 000 € (✅ OK)
- Art. 200 B CGI - taux IR 19 %

### Code général des impôts - droits d'enregistrement (DMTO)

- **Articles 1594 D et 1594 F sexies CGI** - Droits d'enregistrement (DMTO) sur ventes immobilières
  - Statut : ☐ NON TESTÉE
  - Point clé : taux départemental jusqu'à 4,50 % (5 % dans les départements majorés) + taxe communale 1,20 % + frais d'assiette 2,37 % du taux départemental. Total standard ≈ 5,80665 %, jusqu'à 6,32 % dans les départements majorés.

### Code général des impôts - donation

Cf. `docs/sources/donation-droits.md` :
- Art. 777 CGI - barème (❌ 404)
- Art. 779 CGI - abattements (✅ OK)
- Art. 784 CGI - rappel fiscal 15 ans (❌ 404)

---

## Doctrine administrative

- **BOFiP BOI-ENR-DMTOI** - Droits de mutation à titre onéreux immobiliers
  - Statut : ☐ NON TESTÉE
  - URL à reconstruire avec identifiant complet.

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr - F1989** - "Vente d'un logement"
  - Statut : ☐ NON TESTÉE
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F1989

- **impots.gouv.fr** - "Vendre un bien immobilier" (DMTO)
  - URL : https://www.impots.gouv.fr/particulier/quelle-est-la-fiscalite-applicable-en-cas-de-vente

- **service-public.gouv.fr - F10864** - "Plus-value immobilière"
  - Statut : ✅ OK (confirmé 2026-06-03)
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F10864

- **service-public.gouv.fr - F14203** - "Calcul des droits de donation"
  - Statut : ✅ OK (confirmé 2026-06-03)
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F14203

---

## Barèmes et taux appliqués

### Droits d'enregistrement (DMTO) côté acheteur

| Composante | Taux | Source |
|------------|-----:|--------|
| Taxe départementale | 4,50 % (standard) / 5 % (départements majorés) | Art. 1594 D CGI |
| Taxe communale | 1,20 % | Art. 1584 CGI |
| Frais d'assiette et de recouvrement | 2,37 % du taux départemental | Art. 1647 V CGI |
| **Total standard** | **5,80665 %** | (4,50 + 1,20 + 0,10665) |
| **Total majoré** | **6,32 %** | (5 + 1,20 + 0,1185) |

**Note** : le taux exact dépend du département où se trouve le bien. Le calculateur prend une valeur paramétrable (`tauxDroitsEnregistrement`).

### Plus-value immobilière

Cf. `docs/sources/plus-value-immobiliere.md` :
- IR 19 % + PS 17,2 %
- Abattements durée détention (IR : exonération à 22 ans, PS : 30 ans)
- Surtaxe Art. 1609 nonies G si PV > 50 000 € (par tranche)

### Donation

Cf. `docs/sources/donation-droits.md` :
- Abattements Art. 779 (100 000 € enfant, 7 967 € neveu, 0 € non parent, etc.)
- Barème Art. 777 (ligne directe 5-45 %, frères-sœurs 35/45 %, neveux 55 %, non parents 60 %)
- Rappel fiscal 15 ans Art. 784

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| (à compléter) | DMTO standard 5,80665 % en 2026 | 5,80665 % | ☐ | - |
| (à compléter) | Liste des départements ayant majoré le DMTO à 5 % | majoré | ☐ | - |

---

## Exemples de référence

### Exemple 1 - Bien acquis 200 k€ en 2010, valorisé 400 k€, transmis à un neveu en 2026
Source : JSDoc inline `src/lib/venteVsDonation.ts:63-78`.

**Inputs côté vente** :
- Date acquisition : 2010-01-01 (16 ans de détention)
- Prix acquisition : 200 000 €
- Forfaits frais 7,5 % et travaux 15 %
- Cession : 400 000 €

**Calcul vente** :
- Prix de revient = 200 000 + 15 000 + 30 000 = 245 000 €
- PV brute = 155 000 €
- Abattement IR à 16 ans : (16-5) × 6 % = 66 % → PV nette IR = 52 700 €
- Abattement PS à 16 ans : (16-5) × 1,65 % = 18,15 % → PV nette PS = 126 870 €
- IR = 52 700 × 19 % = 10 013 €
- PS = 126 870 × 17,2 % = 21 822 €
- Surtaxe Art. 1609 nonies G : PV nette IR > 50 000 € → ≈ 1 054 €
- Total impôts vente : ≈ 32 889 €
- DMTO côté acheteur : 400 000 × 5,80665 % ≈ 23 226 €
- **Coût fiscal vente** ≈ 56 115 €

**Calcul donation au neveu** :
- Abattement : 7 967 €
- Base taxable : 392 033 €
- Barème Art. 777-IV (taux unique 55 %) : ≈ 215 618 €
- **Coût fiscal donation** = 215 618 €

**Conclusion** : vente massivement plus avantageuse (différence ≈ 160 000 €). Le calculateur émet une optimisation explicite + mentionne la possibilité d'un prêt intrafamilial pour financer.

### Exemple 2 - Donation à un enfant, bien 400 k€
- Abattement enfant : 100 000 €
- Base taxable : 300 000 €
- Droits barème ligne directe ≈ 58 194 €
- Côté vente : ≈ 56 115 € (cf. exemple 1)
- Match très serré : le choix dépend du contexte (liquidité, transmission).

### Exemple 3 - Vente d'une résidence principale au profit d'un enfant
- Hors scope : la RP est exonérée d'IR + PS sur PV (Art. 150 U II 1° CGI). Le calculateur ne traite **pas** la RP.

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Comparaison vente vs donation pour un bien immobilier autre que RP.
- Côté vente : PV imposable (IR + PS + surtaxe) + DMTO côté acheteur.
- Côté donation : abattement personnel + barème selon lien, avec rappel fiscal 15 ans.
- Tous les liens de parenté : enfant, petit-enfant, frère/sœur, neveu/nièce, non parent.
- Taux DMTO paramétrable (5,80665 % par défaut).

### Ce que le calculateur **ne traite pas** (volontairement)

- Résidence principale (exonération PV immo Art. 150 U II 1°).
- Première cession (exonération Art. 150 U II 7°).
- Donation avec démembrement (voir `donation-demembrement.md`).
- Prêt intrafamilial pour financer la vente (voir `pret-intrafamilial.md`).
- Frais de notaire (émoluments) : applicables dans les deux cas, non comparatifs.
- Plus-value LMNP (réintégration amortissements LF 2025) : voir `plus-value-immobiliere-lmnp.md`.
- Vente entre vifs avec contrepartie d'usufruit ou rente viagère (régimes mixtes).
- Cession à un GFA, à une fondation, à une SCI familiale.

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- **DMTO** : taux variable selon les départements. La liste des départements ayant majoré le taux départemental à 5 % évolue chaque année (vote des conseils départementaux). À mentionner.
- Pour les liens éloignés (neveu, non parent), la donation est presque toujours fiscalement défavorable. Le calculateur sort la bonne conclusion mais le warning à 5 000 € d'écart peut être faible : ajuster le seuil.
- La **requalification en donation déguisée** est un risque pour les ventes intrafamiliales à prix non-marché. À signaler dans l'UI (référence : Cour de cassation, jurisprudence constante).
- Le calculateur retient la date du jour pour la cession (`new Date().toISOString().slice(0, 10)`) — empêche le calcul d'une vente projetée à date future.
