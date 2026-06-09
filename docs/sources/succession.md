# Sources - Succession : droits par héritier

**Dernière vérification** : 2026-06-09 (création rétrospective)
**Millésime fiscal** : Barème 2026 (abattements et tarifs inchangés depuis 2012)
**Calculateur concerné** : `src/app/succession/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont structurellement instables (crawl 2026-05-31 : 50 % de 404). La référence **textuelle** des articles prime sur l'URL ; le statut de vérification est indiqué pour chaque lien.

Le calculateur partage l'essentiel de ses sources avec `donation/droits` (mêmes abattements Art. 779 + barème Art. 777). Voir `docs/sources/donation-droits.md` pour ces points. Ce fichier documente uniquement les spécificités succession.

---

## Textes de loi

### Code général des impôts

- **Article 777 CGI** - Tarif des droits de mutation à titre gratuit (donation et succession)
  - Statut : ❌ 404 sur LEGIARTI000041464063 (mort) et LEGIARTI000044981950 (mort)
  - URL : à reconstruire (cf. `docs/broken-links-to-fix.md`)
  - Point clé : 4 tableaux (ligne directe, époux/PACS, frères/sœurs, autres) ; barèmes 5 % à 45 % en ligne directe.

- **Article 779 CGI** - Abattements personnels par lien de parenté
  - Statut : ✅ OK (LEGIARTI000026292566 confirmé 2026-06-09)
  - URL : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000026292566
  - Point clé : 100 000 € enfant/parent, 15 932 € frère-sœur, 7 967 € neveu-nièce, 159 325 € personne handicapée.

- **Article 784 CGI** - Rappel fiscal des donations antérieures
  - Statut : ❌ 404 sur LEGIARTI000041464760
  - URL : à reconstruire
  - Point clé : les donations consenties depuis moins de 15 ans sont rapportées (abattement et tranches déjà consommés).

- **Article 796-0 bis CGI** - Exonération totale du conjoint survivant et partenaire de PACS
  - Statut : ☐ NON TESTÉE
  - Point clé : conjoint survivant et partenaire PACS exonérés de droits, sans plafond ; introduit par la Loi TEPA 2007.

- **Article 788 CGI** - Abattement par défaut applicable aux héritiers sans abattement personnel propre
  - Statut : 👁 HUMAINE (Nicolas, 2026-06-09 : texte intégral consulté sur Légifrance, version LOI 2020-935 du 30/07/2020)
  - Point clé textuel (Art. 788 IV) : « A défaut d'autre abattement, à l'exception de celui mentionné au III, **un abattement de 1 594 € est opéré sur chaque part successorale.** » → 1 594 € confirmé pour petit-enfant succession, autres parents jusqu'au 4e degré, non parents.

- **Article 796-0 bis CGI** - Exonération totale conjoint / partenaire PACS (créé par Loi TEPA art. 8)
  - Statut : 👁 HUMAINE (Nicolas, 2026-06-09 : Loi TEPA art. 8 confirme la création de l'Art. 796-0 bis)

- **Article 796-0 ter CGI** - Exonération frère/sœur célibataire, cohabitant 5 ans avec le défunt (créé par Loi TEPA art. 10)
  - Statut : 👁 HUMAINE (Nicolas, 2026-06-09)
  - Point clé : exonération totale si le frère/sœur (i) est célibataire/veuf/divorcé/séparé, (ii) est âgé de +50 ans **ou** invalide, **et** (iii) a constamment cohabité avec le défunt pendant les 5 années précédant le décès.
  - **Cas NON TRAITÉ par le calculateur** — à ajouter dans la section "Cas non traités" ci-dessous.

### Loi

- **Loi TEPA n° 2007-1223 du 21 août 2007** - En faveur du travail, de l'emploi et du pouvoir d'achat
  - Statut : ✅ OK (JORFTEXT000000278649 confirmé crawl 2026-05-31)
  - URL : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000278649
  - Point clé : pose le principe d'exonération conjoint / partenaire PACS (codifié en Art. 796-0 bis CGI).

---

## Doctrine administrative

- **BOFiP BOI-ENR-DMTG-10-10-20-20** - Mutations à titre gratuit par décès : abattements et tarifs
  - Statut : ☐ NON TESTÉE (URL à reconstruire avec identifiant complet)
  - Référence textuelle utilisée dans le code : § 230 — "les sommes 757 B donnent ouverture aux droits de mutation par décès dans les conditions de droit commun".

---

## Sources de vérification croisée (URLs stables)

- **service-public.gouv.fr - F14198** - "Comment sont calculés les droits de succession ?"
  - Statut : ☐ NON TESTÉE
  - URL probable : https://www.service-public.gouv.fr/particuliers/vosdroits/F14198
  - À tester au prochain audit.

- **impots.gouv.fr** - Page "Succession"
  - Statut : ☐ NON TESTÉE
  - URL : https://www.impots.gouv.fr/particulier/les-successions

---

## Barèmes et taux appliqués

### Abattements personnels (Art. 779 CGI)

| Lien | Abattement | Source | Période |
|------|-----------:|--------|---------|
| Enfant / parent (ligne directe) | 100 000 € | Art. 779-I | 15 ans |
| Frère / sœur | 15 932 € | Art. 779-IV | 15 ans |
| Neveu / nièce | 7 967 € | Art. 779-V | 15 ans |
| Personne handicapée (cumulable) | 159 325 € | Art. 779-II | 15 ans |
| Petit-enfant (succession, ≠ donation) | 1 594 € | Art. 788 (défaut) | — |
| Autres / non-parents | 1 594 € | Art. 788 (défaut) | — |
| Époux / partenaire PACS | n/a (exonération totale) | Art. 796-0 bis | — |

**Note importante succession ≠ donation** : en succession, le petit-enfant ne bénéficie **pas** de l'abattement de 31 865 € spécifique à la donation (Art. 790 B CGI). Il relève de l'abattement par défaut Art. 788 (1 594 €). Le calculateur applique cette règle (cf. `src/lib/succession.ts:50`).

### Barèmes Art. 777 CGI

Identiques à `docs/sources/donation-droits.md` (barème ligne directe, époux/PACS, frères/sœurs, autres) — non reproduits ici.

---

## URLs vérifiées manuellement par Nicolas

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| Légifrance Art. 796-0 bis CGI | Exonération totale conjoint/PACS | n/a | ✅ | 2026-06-09 |
| Légifrance Art. 788 CGI | Abattement défaut Art. 788 IV : 1 594 € | 1 594 € | ✅ | 2026-06-09 |
| Légifrance Art. 779 CGI | Tous abattements 100 000 / 15 932 / 7 967 / 159 325 € | identiques | ✅ | 2026-06-09 |
| Légifrance Loi TEPA 2007 art. 8 et 10 | Crée Art 796-0 bis et 796-0 ter CGI | n/a | ✅ | 2026-06-09 |
| Légifrance Art. 796-0 ter CGI | Exonération frère/sœur célibataire +50 ans cohabitant 5 ans | non implémenté | ✅ (vu, à implémenter) | 2026-06-09 |

---

## Exemples de référence

### Exemple 1 - Enfant unique, héritage 250 000 €, sans donation antérieure
Source : JSDoc inline `src/lib/succession.ts:75-82`.

**Inputs** :
- Actif net successoral : 250 000 €
- 1 enfant héritier, part : 250 000 €
- Donations antérieures : 0

**Résultat attendu** :
- Abattement : 100 000 €
- Base taxable : 150 000 €
- Droits ≈ 28 194 €
- Net reçu ≈ 221 806 €

**Détail barème** (Art. 777 ligne directe sur 150 000 €) :
- 5 % × 8 072 = 403,60 €
- 10 % × 4 037 = 403,70 €
- 15 % × 3 823 = 573,45 €
- 20 % × 134 068 = 26 813,60 €
- Total ≈ 28 194 €

**Écart toléré** : ± 1 € (arrondis).

### Exemple 2 - Conjoint survivant + 2 enfants, héritage 600 000 €
- Conjoint : part 200 000 € → exonéré TEPA, net = 200 000 €
- Enfant 1 : part 200 000 € → abattement 100 000 € → base 100 000 € → droits 18 194 €
- Enfant 2 : idem → droits 18 194 €
- Total droits : 36 388 €

### Exemple 3 - Frère héritier, part 50 000 €
- Abattement 15 932 €
- Base taxable 34 068 €
- Barème frères/sœurs (Art. 777 Tableau III) : 35 % × 24 430 = 8 550 € puis 45 % × 9 638 = 4 337 €
- Droits ≈ 12 888 €

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Succession en ligne directe (enfants, parents, ascendants).
- Exonération totale du conjoint / partenaire PACS (Loi TEPA).
- Frères/sœurs, neveux/nièces, parents éloignés, non-parents.
- Personne handicapée (cumul abattement Art. 779-II).
- Rappel fiscal Art. 784 sur 15 ans.
- Agrégation des primes Art. 757 B au-delà de l'abattement global 30 500 € (cf. BOFiP BOI-ENR-DMTG-10-10-20-20 § 230).

### Ce que le calculateur **ne traite pas** (volontairement)

- **Art. 796-0 ter CGI** - exonération frère/sœur célibataire, +50 ans ou invalide, cohabitant avec le défunt depuis 5 ans (créé par Loi TEPA art. 10). Confirmé textuellement par Nicolas le 2026-06-09. **À ajouter au backlog** : option UI "frère/sœur cohabitant" pour basculer en exonération.
- Pacte Dutreil (transmission d'entreprise, Art. 787 B CGI - exonération 75 % sous engagement de conservation).
- Réversion d'usufruit, démembrement successoral.
- Réduction de droits pour charges de famille (Art. 780 CGI, abrogée par LF 2017).
- Succession internationale (régimes de double imposition, Art. 784 A CGI).
- Plus-values latentes sur titres ou immobilier (gestion par le notaire).
- Exonération biens spoliés contexte persécutions antisémites 1933-1945 (Art. 796-0 quinquies CGI, créé par LF 2024).

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-06-09 | Claude Code (/verif-sources rétrospectif) | Création initiale du fichier sources | _audit-2026-06-09_ |

### Points de vigilance

- ✅ Le calculateur applique l'abattement défaut Art. 788 IV (**1 594 €**) au petit-enfant en succession, **différent** du 31 865 € applicable en donation (Art. 790 B). **Confirmé textuellement par Nicolas le 2026-06-09**.
- L'exonération TEPA conjoint suppose une situation d'union officielle (mariage ou PACS) en vigueur au décès — pas de concubinage. Confirmé par Art. 796-0 bis CGI.
- **Lacune connue Art. 796-0 ter** : exonération totale frère/sœur célibataire +50 ans cohabitant 5 ans. Non gérée — à ajouter au backlog comme amélioration V1.x.
- La rentrée des primes 757 B dans le calcul est documentée dans le code mais sourcée sur un BOFiP non re-testé. Cross-check à faire au prochain `/verif-sources`.
