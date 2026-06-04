# Sources - <Nom du calculateur>

**Dernière vérification** : YYYY-MM-DD
**Millésime fiscal** : Revenus YYYY / Barème YYYY+1
**Calculateur concerné** : `src/app/<slug>/page.tsx`

---

## Avertissement crawl

Les URLs Légifrance LEGIARTI sont **structurellement instables** (50 % de 404
mesurés au crawl 2026-05-31). La référence **textuelle** de chaque article
(numéro + code) prime sur l'URL. Le statut de vérification de chaque URL est
indiqué explicitement ci-dessous selon le code :

- `✅ OK` : URL testée, contenu correspond à l'article annoncé.
- `❌ 404` : URL morte au dernier crawl - la référence textuelle reste valide,
  l'URL est à reconstruire (cf. `docs/broken-links-to-fix.md`).
- `⚠️ MAUVAIS CONTENU` : URL répond 200 mais affiche un autre article que
  celui annoncé.
- `☐ NON TESTÉE` : URL jamais crawlée - à valider lors du prochain
  `/verif-sources`.
- `👁 HUMAINE` : vérifiée visuellement par Nicolas à la date indiquée.

---

## Textes de loi

### Code général des impôts

- **Article XXX CGI** - <objet, 1 phrase>
  - Statut : ✅ OK | ❌ 404 | ⚠️ MAUVAIS CONTENU | ☐ NON TESTÉE | 👁 HUMAINE
  - URL : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI...
  - Version en vigueur : <date>
  - Point clé repris dans le calcul : <reformulation, 15 mots max>

### Autres codes applicables

- **Article L.XXX du Code <...>** - <objet>
  - Statut : ✅ / ❌ / ⚠️ / ☐ / 👁
  - URL : https://...

---

## Doctrine administrative

### BOFiP

- **BOI-<référence>** - <titre>
  - Statut : ✅ / ❌ / ⚠️ / ☐ / 👁
  - URL : https://bofip.impots.gouv.fr/bofip/<id>-PGP.html?identifiant=BOI-XXX-XX-XX-DATE
  - Date publication : YYYY-MM-DD
  - Sections utilisées : §<numéros>

### BOSS (si applicable)

- **BOSS <référence>** - <titre>
  - Statut : ✅ / ❌ / ⚠️ / ☐ / 👁
  - URL : https://boss.gouv.fr/portail/accueil/...

---

## Sources de vérification croisée (URLs stables)

À utiliser quand la source primaire (Légifrance/BOFiP) est en catégorie
❌/⚠️/☐. Ces URLs sont historiquement stables et serviront de second œil.

- **service-public.fr - F<numéro>** - <objet>
  - Statut : ✅ / ☐
  - URL : https://www.service-public.fr/particuliers/vosdroits/F<numéro>
  - Date consultation : YYYY-MM-DD

- **impots.gouv.fr - <page>** - <objet>
  - Statut : ✅ / ☐
  - URL : https://www.impots.gouv.fr/...
  - Date consultation : YYYY-MM-DD

---

## Barèmes et taux appliqués

| Paramètre | Valeur | Source primaire (référence textuelle) | Cross-check 1 | Cross-check 2 | Millésime |
|-----------|--------|----------------------------------------|---------------|---------------|-----------|
| <ex: Tranche IR 14%> | 14 % | Art. 197-I-1 CGI | service-public.fr F23 | impots.gouv.fr barème 2026 | 2026 |
| <ex: Plafond QF> | 1 793 € | Art. 197-I-2 CGI | service-public.fr F23 | impots.gouv.fr | 2026 |

**Règle** : si la **source primaire** est en catégorie ❌/⚠️/☐, il faut
**au moins deux cross-checks** concordants avant de pouvoir utiliser le
chiffre dans le code.

---

## URLs vérifiées manuellement par Nicolas

Section **obligatoire avant publication** si au moins une URL est en catégorie
❌, ⚠️ ou ☐.

Liste les URLs que Nicolas a ouvertes manuellement (le crawl automatique ne
peut pas faire ce travail de façon fiable). Sans cette section remplie pour
les chiffres critiques, le calculateur **ne peut pas être committé**.

| URL ouverte | Article/donnée vérifié | Chiffre code | Confirmé ? | Date |
|-------------|------------------------|--------------|------------|------|
| https://... | Art. X reste à Y % en 2026 | 12,8 % | ☐ / ✅ / ❌ | YYYY-MM-DD |

---

## Exemples de référence

Cas chiffrés vérifiés pour validation des calculs :

### Exemple 1 - <nom du cas>
Source : <BOFiP / service-public / communiqué>

**Inputs** :
- <paramètre> : <valeur>
- <paramètre> : <valeur>

**Résultat attendu** :
- <grandeur> : <valeur> €
- <grandeur> : <valeur> €

**Écart toléré** : ± 1 € (arrondis)

### Exemple 2 - <nom du cas>
<...>

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- <cas standard>
- <cas particulier pris en charge>

### Ce que le calculateur **ne traite pas** (volontairement)

- <cas hors scope, avec raison>
- <cas nécessitant un conseil personnalisé>
- <cas trop marginal pour la v1>

Ces limites **doivent** être mentionnées dans la section "À savoir" de la
page du calculateur.

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| YYYY-MM-DD | Claude Code | Création initiale | <hash> |

### Points de vigilance

- <alerte sur un point complexe>
- <date prévue de mise à jour légale>
