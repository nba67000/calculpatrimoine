# Sources - Donation : droits de mutation à titre gratuit

**Dernière vérification** : 2026-06-09 (audit léger : Art 779 CGI LEGIARTI000026292566 toujours OK par sondage ; F14203 service-public.gouv.fr maintenu ; précédente : 2026-06-03)
**Millésime fiscal** : Barème 2026 (abattements et tarifs indexés par la LF 2026)
**Calculateur concerné** : `src/app/donation/droits/page.tsx`

> ⚠ **Crawl 2026-05-31** : 4 URLs Légifrance + 2 URLs BOFiP de ce document
> sont cassées (404 ou re-route vers le mauvais doc). Marquées en
> `~~strikethrough~~`. NB : Art. 779 CGI a un ID alternatif valide
> (`LEGIARTI000026292566`, déjà utilisé dans `src/lib/donation.ts`). Cf.
> `docs/broken-links-to-fix.md` pour la liste consolidée.

---

## Textes de loi

### Code général des impôts

- **Article 777 CGI** - Tarif des droits de mutation à titre gratuit (donations et successions)
  - URL : ~~`LEGIARTI000041464063`~~ (morte HTTP 404)
  - Version en vigueur : 2026
  - Point clé : 4 tableaux (ligne directe / époux-PACS / frères-sœurs / autres), barèmes progressifs par tranches.

- **Article 779 CGI** - Abattements applicables aux donations et successions selon le lien de parenté
  - URL : ~~`LEGIARTI000048845104`~~ (morte HTTP 404) , utiliser à la place `LEGIARTI000026292566` (testé OK 2026-05-31)
  - Version en vigueur : 2026
  - Point clé : 100 000 € enfant/parent ; 159 325 € handicapé ; 15 932 € frère-sœur ; 7 967 € neveu-nièce.

- **Article 784 CGI** - Rappel fiscal des donations antérieures
  - URL : ~~`LEGIARTI000041464760`~~ (morte HTTP 404)
  - Version en vigueur : 2026
  - Point clé : les donations consenties depuis 15 ans sont rapportées (abattement et tranches déjà consommés).

- **Article 790 E CGI** - Abattement spécifique entre époux et partenaires de PACS
  - URL : ~~`LEGIARTI000038588107`~~ (morte HTTP 404)
  - Version en vigueur : 2026
  - Point clé : 80 724 € sur les donations entre époux ou partenaires liés par un PACS.

- **Article 790 G CGI** - Don familial de sommes d'argent (exonération supplémentaire)
  - URL : ~~`LEGIARTI000041464661`~~ (morte HTTP 404)
  - Version en vigueur : 2026
  - Point clé : 31 865 € en plus de l'abattement personnel ; donateur < 80 ans, donataire majeur ; renouvelable tous les 15 ans.

---

## Doctrine administrative

### BOFiP

- **BOI-ENR-DMTG-20-30-20-10** - Calcul des droits de mutation à titre gratuit
  - URL : ~~`bofip/3837-PGP.html`~~ (re-route vers "Exonération heures supplémentaires", pas ENR-DMTG)
  - Sections utilisées : application des abattements puis du barème, rappel fiscal 15 ans.

- **BOI-ENR-DMTG-20-30-20-20** - Tarif des droits de mutation à titre gratuit
  - URL : ~~`bofip/3845-PGP.html`~~ (re-route vers "RPPM Plus-values biens meubles", pas ENR-DMTG)
  - Sections utilisées : tableaux I à IV de l'article 777 CGI.

### Source secondaire de confirmation des chiffres

- **service-public.gouv.fr - Calcul des droits de donation** (vérifié 2026-05-30)
  - URL : https://www.service-public.gouv.fr/particuliers/vosdroits/F14203
  - Cite directement les articles 777, 779, 784, 790 G du CGI.

---

## Barèmes et taux appliqués

### Abattements personnels (Art. 779 et 790 E/G CGI)

| Lien de parenté | Abattement | Article | Période |
|-----------------|-----------:|---------|---------|
| Enfant / parent (ligne directe) | 100 000 € | 779-I | 15 ans |
| Époux / partenaire PACS | 80 724 € | 790 E | 15 ans |
| Frère ou sœur | 15 932 € | 779-IV | 15 ans |
| Neveu ou nièce | 7 967 € | 779-V | 15 ans |
| Personne handicapée (cumulable) | 159 325 € | 779-II | 15 ans |
| Don familial de sommes d'argent (cumulable) | 31 865 € | 790 G | 15 ans |
| Tiers / autre parent ou non-parent | 0 € | - | - |

### Barème ligne directe - Art. 777 CGI tableau I

| Tranche taxable | Taux |
|-----------------|-----:|
| Jusqu'à 8 072 € | 5 % |
| 8 072 € à 12 109 € | 10 % |
| 12 109 € à 15 932 € | 15 % |
| 15 932 € à 552 324 € | 20 % |
| 552 324 € à 902 838 € | 30 % |
| 902 838 € à 1 805 677 € | 40 % |
| Au-delà de 1 805 677 € | 45 % |

### Barème époux / PACS - Art. 777 CGI tableau II

| Tranche taxable | Taux |
|-----------------|-----:|
| Jusqu'à 8 072 € | 5 % |
| 8 072 € à 15 932 € | 10 % |
| 15 932 € à 31 865 € | 15 % |
| 31 865 € à 552 324 € | 20 % |
| 552 324 € à 902 838 € | 30 % |
| 902 838 € à 1 805 677 € | 40 % |
| Au-delà de 1 805 677 € | 45 % |

### Barème frères et sœurs - Art. 777 CGI tableau III

| Tranche taxable | Taux |
|-----------------|-----:|
| Jusqu'à 24 430 € | 35 % |
| Au-delà de 24 430 € | 45 % |

### Barème autres - Art. 777 CGI tableau IV

| Lien | Taux unique |
|------|------------:|
| Neveu/nièce, parents jusqu'au 4e degré | 55 % |
| Au-delà du 4e degré ou non-parent | 60 % |

### Rappel fiscal - Art. 784 CGI

Les donations consenties depuis **moins de 15 ans** entre les mêmes parties sont
rapportées : l'abattement déjà consommé et les tranches du barème déjà parcourues
ne sont plus disponibles. Au-delà de 15 ans, le compteur repart à zéro.

---

## Exemples de référence

### Exemple 1 - Parent → enfant 200 000 € pleine propriété
Source : barème Art. 777-I CGI + abattement Art. 779-I CGI.

**Inputs** :
- Montant transmis : 200 000 €
- Lien : ligne directe (parent → enfant)
- Donations antérieures < 15 ans : 0
- Don familial 790 G : non
- Donataire handicapé : non

**Résultat attendu** :
- Abattement appliqué : 100 000 €
- Base taxable : 100 000 €
- Droits dus : **18 194 €**
  - 5 % × 8 072 = 403,60 €
  - 10 % × 4 037 = 403,70 €
  - 15 % × 3 823 = 573,45 €
  - 20 % × 84 068 = 16 813,60 €

**Écart toléré** : ± 1 € (arrondis).

### Exemple 2 - Donation entre époux 150 000 €
Source : barème Art. 777-II CGI + abattement Art. 790 E CGI.

**Inputs** :
- Montant transmis : 150 000 €
- Lien : époux / PACS
- Donations antérieures < 15 ans : 0

**Résultat attendu** :
- Abattement appliqué : 80 724 €
- Base taxable : 69 276 €
- Droits dus : **11 062 €**
  - 5 % × 8 072 = 403,60 €
  - 10 % × 7 860 = 786,00 €
  - 15 % × 15 933 = 2 389,95 €
  - 20 % × 37 411 = 7 482,20 €

### Exemple 3 - Don familial somme d'argent à enfant majeur
Source : abattement Art. 790 G CGI cumulable avec Art. 779-I CGI.

**Inputs** :
- Montant transmis : 150 000 € en numéraire
- Lien : ligne directe (parent < 80 ans → enfant majeur)
- Don familial 790 G : oui
- Donations antérieures < 15 ans : 0

**Résultat attendu** :
- Abattement personnel : 100 000 €
- Abattement 790 G : 31 865 €
- Base taxable : 18 135 €
- Droits dus : **1 821 €**
  - 5 % × 8 072 = 403,60 €
  - 10 % × 4 037 = 403,70 €
  - 15 % × 3 823 = 573,45 €
  - 20 % × 2 203 = 440,60 €

### Exemple 4 - Donation entre frères et sœurs 50 000 €
Source : barème Art. 777-III CGI + abattement Art. 779-IV CGI.

**Inputs** :
- Montant transmis : 50 000 €
- Lien : frère / sœur

**Résultat attendu** :
- Abattement : 15 932 €
- Base taxable : 34 068 €
- Droits dus : **12 888 €**
  - 35 % × 24 430 = 8 550,50 €
  - 45 % × 9 638 = 4 337,10 €

### Exemple 5 - Donation à un neveu 30 000 €
Source : barème Art. 777-IV CGI + abattement Art. 779-V CGI.

**Inputs** :
- Montant transmis : 30 000 €
- Lien : neveu / nièce

**Résultat attendu** :
- Abattement : 7 967 €
- Base taxable : 22 033 €
- Droits dus : **12 118 €** (taux unique 55 %)

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- Donation simple en pleine propriété (numéraire ou bien transmis évalué).
- Tous les liens de parenté du barème art. 777 CGI.
- Abattement personnel art. 779 (cumulable avec art. 790 G).
- Don familial de sommes d'argent art. 790 G (avec contrôle des conditions d'âge).
- Abattement handicap art. 779-II cumulable.
- Rappel fiscal art. 784 : prise en compte des donations antérieures < 15 ans
  (l'abattement résiduel et les tranches déjà consommées sont gérés).
- Comparaison "donation aujourd'hui vs sans aucun abattement" pour visualiser
  le gain de l'abattement.

### Ce que le calculateur **ne traite pas** (volontairement)

- **Donation aux petits-enfants et arrière-petits-enfants** : abattements
  spécifiques (31 865 € petits-enfants, 5 310 € arrière-petits-enfants,
  Art. 790 B CGI). Confirmé sur service-public.gouv.fr F14203 le 2026-06-03.
  À ajouter au backlog si besoin.
- Donation avec démembrement (nue-propriété / usufruit, art. 669 CGI) :
  fera l'objet d'un calculateur séparé (`donation-demembrement` - backlog P3).
- Réduction de droits pour charges de famille (art. 780 CGI, supprimée pour
  l'essentiel depuis 2017).
- Réductions liées à la transmission d'entreprise (pacte Dutreil, art. 787 B).
- Frais d'acte notarié et émoluments du notaire (hors fiscalité pure).
- Donation-partage (effet civil distinct mais traitement fiscal identique
  côté barème).
- Successions (un calculateur dédié sera proposé séparément - backlog P2).

Ces limites **doivent** être mentionnées dans la section "À savoir" de la
page du calculateur.

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| 2026-05-30 | Claude Code | Création initiale | _à venir_ |
| 2026-06-03 | Claude Code (/verif-sources) | Art 779 CGI re-testé OK, F14203 cross-check OK, ajout note sur petits-enfants/arrière-petits-enfants non couverts | _audit-2026-06-03_ |

### Points de vigilance

- L'abattement art. 790 G a une condition d'âge (donateur < 80 ans, donataire
  majeur ou mineur émancipé). À contrôler dans l'UI avant de l'appliquer.
- Le rappel 15 ans porte aussi sur les successions antérieures, mais ce
  calculateur se limite aux donations. Pour les successions, voir le futur
  calculateur dédié.
- La LF 2026 n'a pas indexé les abattements art. 779 sur l'inflation : les
  montants 100 000 / 80 724 / 15 932 / 7 967 / 31 865 € restent identiques
  depuis 2012.
