# Sources - Donation avec démembrement

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : Barème 2026 (Art. 669 inchangé)
**Calculateur concerné** : `src/app/donation/demembrement/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables. La référence textuelle prime. Cf. `docs/broken-links-to-fix.md`.

Le calculateur partage la majeure partie de ses sources avec `donation/droits` (mêmes abattements Art. 779 + barème Art. 777). Voir `docs/sources/donation-droits.md` pour ces points. Ce fichier documente uniquement le mécanisme du démembrement (Art. 669 CGI).

---

## Textes de loi

### Code général des impôts

- **Article 669 CGI** - Barème légal de la valeur de l'usufruit et de la nue-propriété selon l'âge de l'usufruitier
  - Statut : ☐ NON TESTÉE (URL Légifrance à valider)
  - Point clé : barème par tranches de 10 ans, de 90 % usufruit (moins de 21 ans) à 10 % usufruit (plus de 91 ans).

- **Article 777 CGI** - Barème progressif des droits de mutation à titre gratuit
  - Statut : ❌ 404 (LEGIARTI000041464063, 44981950) — référence textuelle conservée
  - Cf. `docs/sources/donation-droits.md`.

- **Article 779 CGI** - Abattements personnels
  - Statut : ✅ OK (LEGIARTI000026292566 confirmé 2026-06-09)
  - URL : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000026292566

- **Article 784 CGI** - Rappel fiscal des donations antérieures
  - Statut : ❌ 404 (LEGIARTI000041464760)

---

## Doctrine administrative

- **BOFiP BOI-ENR-DMTG-10-40-10-30** - Démembrement et valorisation usufruit/nue-propriété
  - Statut : ☐ NON TESTÉE
  - URL à reconstruire avec identifiant complet.

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr - F14202** - "Donation"
  - Statut : ☐ NON TESTÉE
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F14202

- **impots.gouv.fr** - "Démembrement de propriété"
  - URL : https://www.impots.gouv.fr/particulier/le-demembrement-de-propriete

---

## Barèmes et taux appliqués

### Barème Art. 669 CGI - valeur de l'usufruit selon l'âge

| Âge usufruitier | Usufruit | Nue-propriété |
|-----------------|---------:|--------------:|
| Moins de 21 ans | 90 % | 10 % |
| 21 à 30 ans | 80 % | 20 % |
| 31 à 40 ans | 70 % | 30 % |
| 41 à 50 ans | 60 % | 40 % |
| 51 à 60 ans | 50 % | 50 % |
| 61 à 70 ans | 40 % | 60 % |
| 71 à 80 ans | 30 % | 70 % |
| 81 à 90 ans | 20 % | 80 % |
| 91 ans et plus | 10 % | 90 % |

**Source** : Art. 669 CGI - barème inchangé depuis 2004 (Loi de finances rectificative pour 2003).

### Abattements et barème : voir `donation-droits.md`

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| (à compléter) | Art 669 CGI - barème complet usufruit | 90/80/70/60/50/40/30/20/10 % | ☐ | - |

---

## Exemples de référence

### Exemple 1 - Donation à un enfant, parent 65 ans, bien 500 000 €
Source : JSDoc inline `src/lib/donationDemembrement.ts:67-71`.

**Inputs** :
- Valeur bien : 500 000 €
- Âge usufruitier : 65 ans
- Lien : enfant
- Donations antérieures : 0

**Résultat attendu** :
- Tranche 61-70 ans : NP = 60 %
- Valeur nue-propriété transmise = 500 000 × 60 % = 300 000 €
- Abattement Art. 779-I = 100 000 €
- Base taxable = 200 000 €
- Droits ≈ 38 194 € (barème ligne directe Art. 777-I)
- Comparaison pleine propriété : base 400 000 € → droits ≈ 78 194 €
- Économie ≈ 40 000 €

### Exemple 2 - Donation à un enfant, donateur 45 ans, bien 1 000 000 €
- Tranche 41-50 ans : NP = 40 %
- Valeur NP = 400 000 € → après abattement 100 000 € → base 300 000 € → droits ≈ 58 194 €
- Donation jeune = très avantageuse fiscalement.

### Exemple 3 - Donation à un enfant, donateur 85 ans, bien 500 000 €
- Tranche 81-90 ans : NP = 80 %
- Valeur NP = 400 000 € → après abattement → base 300 000 € → droits ≈ 58 194 €
- Démembrement tardif : peu d'intérêt fiscal vs PP (300 000 € de base au lieu de 400 000 €).

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Donation de la seule nue-propriété (usufruit conservé par le donateur).
- Barème Art. 669 CGI complet (9 tranches d'âge).
- Comparaison avec donation en pleine propriété (économie chiffrée).
- Tous les liens de parenté du barème Art. 777.
- Rappel fiscal Art. 784 (donations antérieures < 15 ans).

### Ce que le calculateur **ne traite pas** (volontairement)

- Donation d'usufruit temporaire ou viager.
- Démembrement croisé (donation usufruit à A, nue-propriété à B).
- Quasi-usufruit (Art. 587 Code civil).
- Réversion d'usufruit au conjoint survivant.
- Don familial Art. 790 G cumulé avec démembrement (cas marginaux).
- Évaluation économique vs évaluation fiscale (le notaire peut retenir une valeur économique pour la gestion ultérieure, distincte de la valeur fiscale Art. 669).

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- Au décès du donateur (usufruitier), l'usufruit s'éteint et le nu-propriétaire récupère la pleine propriété **sans droits** (Art. 1133 CGI). Point favorable du démembrement non explicitement souligné dans l'UI : à ajouter.
- L'âge est apprécié à la date de la donation. En cas de paiement échelonné, retenir la date juridique du transfert.
- Si l'usufruitier est plus jeune que ce qu'autorise le barème (cas démembrement croisé tiers), la valorisation peut diverger du calcul de ce calculateur. Cas non couvert.
