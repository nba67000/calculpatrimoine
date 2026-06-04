# CLAUDE.md - Instructions pour Claude Code sur calcpatrimoine

Ce fichier est lu automatiquement par Claude Code à chaque session dans ce repo.
Il contient **tout** ce qui est nécessaire pour implémenter un nouveau calculateur
dans le respect du style, des conventions et de la ligne éditoriale du projet.

---

## 1. Contexte projet

**CalcPatrimoine** (`calcpatrimoine.fr`) est un site de calculateurs patrimoniaux
**gratuits et open-source** pour la France. Stack : Next.js 16 (App Router),
React 19, TypeScript strict, Tailwind, Framer Motion, Recharts.

**Le créateur** (Nicolas Barbier) est analyste-développeur COBOL/AS400 dans
l'assurance-vie. Le ton du projet est **technique, transparent, anti-conseil**.

**Le positionnement éditorial est strict et non-négociable** :

- Le site **informe**, il ne **conseille pas**.
- Aucune recommandation personnalisée. Jamais.
- Les résultats sont **factuels et comparatifs** : on calcule, on compare, on montre.
- On n'écrit **jamais** "vous devriez", "choisissez", "il est préférable".
- On écrit "l'option X aboutit à un impôt de Y€", "l'écart entre les deux est de Z€".
- Toute suggestion d'optimisation doit rester factuelle et conditionnelle
  ("**En fractionnant sur 2 ans, vous économiseriez X€**"), sans recommandation.

---

## 2. Règle d'or : respect de l'existant

Avant d'écrire la moindre ligne, **lis le code du calculateur le plus proche
thématiquement** de celui que tu vas implémenter. Calque :

- Le nommage (français pour la logique métier, conventions internes déjà établies).
- La structure des fichiers.
- Le style de commentaires (étapes numérotées, explications en français).
- Le format des résultats (warnings/optimisations, pattern non-directif).
- Les imports et l'arborescence.

**Ne réinvente rien.** Si une fonction utilitaire existe déjà (formatage de date,
calcul de durée, etc.), réutilise-la. Si une variable CSS / une classe Tailwind
est utilisée partout pour les cartes, les boutons, les warnings, utilise les
mêmes.

---

## 3. Architecture d'un calculateur

Un calculateur = **4 fichiers** qui suivent tous la même structure.

```
src/types/<domaine>.ts                          ← Interfaces Inputs / Results
src/lib/<domaine>.ts                            ← Logique pure (fonctions de calcul)
src/components/Calculator/<Nom>Calculator.tsx   ← UI React (saisie + affichage)
src/app/<slug>/page.tsx                         ← Page Next.js
docs/sources/<slug>.md                          ← Sources légales (NOUVEAU - voir §6)
```

### 3.1. Le fichier `types/<domaine>.ts`

Trois exports minimum :

- `<Domaine>Inputs` : ce que l'utilisateur saisit.
- `<Domaine>Results` : ce que le calcul renvoie.
- Tout type intermédiaire (`FiscaliteOption`, `Tranche`, etc.) nécessaire.

Le type `Results` doit inclure, quand pertinent :

```ts
warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>;
optimisations: Array<{ type: 'success' | 'info'; message: string; gain?: number }>;
```

### 3.2. Le fichier `lib/<domaine>.ts`

**Fonctions pures, sans effet de bord, sans React.** Une fonction principale
`calculer<Nom>(inputs: ...Inputs): ...Results` plus des helpers privés.

Conventions de style :

- Commentaires JSDoc en français sur chaque fonction exportée.
- Dans la fonction principale, **numéroter les étapes** dans les commentaires :
  ```ts
  // 1. Calcul ancienneté
  // 2. Calcul plus-value totale
  // 3. ...
  ```
- Constantes fiscales et seuils : soit inline avec commentaire citant la source
  (`// Art. 150-0 A CGI - PFU 12,8%`), soit dans `lib/constants.ts` si réutilisés.
- Aucune dépendance externe non justifiée. `date-fns` est dispo si utile.

### 3.3. Le composant `<Nom>Calculator.tsx`

Client component (`'use client'`). Structure attendue :

```tsx
'use client'

import { useState, useMemo } from 'react'
import { calculer<Nom> } from '@/lib/<domaine>'
import type { <Nom>Inputs } from '@/types/<domaine>'
// ... autres imports UI

export default function <Nom>Calculator() {
  const [inputs, setInputs] = useState<<Nom>Inputs>({ /* defaults raisonnables */ })
  const results = useMemo(() => calculer<Nom>(inputs), [inputs])

  return (
    // Panneau gauche : saisie
    // Panneau droit : résultats + warnings + optimisations
  )
}
```

Règles UI :

- **Calcul temps réel** (useMemo sur les inputs, pas de bouton "Calculer").
- **Montants formatés** en euros français : `n.toLocaleString('fr-FR')` suffixé par `€`.
- **Pourcentages** à 1-2 décimales selon le contexte.
- **Warnings danger** : bordure/fond rouge discret. **Warning** : orange. **Info** : bleu.
- **Optimisations success** : bordure/fond vert discret.
- **Pas d'icônes emoji dans le code source** (UTF-8 mojibake fréquent). Utilise
  `lucide-react` si besoin - mais il n'est pas encore installé, donc préfère des
  textes courts ou des badges Tailwind tant qu'on ne l'a pas ajouté.

### 3.4. La page `app/<slug>/page.tsx`

Server component par défaut (pas de `'use client'`). Structure :

```tsx
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import <Nom>Calculator from '@/components/Calculator/<Nom>Calculator'

export const metadata: Metadata = {
  title: '<Titre SEO - h1 compris entre 50 et 60 caractères>',
  description: '<Meta description 140-160 caractères, factuelle, sans superlatif>',
}

export default function <Nom>Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Header />
      {/* Breadcrumb, H1, sous-titre */}
      <LegalDisclaimer />
      <<Nom>Calculator />
      {/* Section explications / méthodologie inline */}
      <Footer />
    </main>
  )
}
```

**N'oublie jamais `<LegalDisclaimer />` en haut du calculateur.** C'est non négociable.

---

## 4. Tests / validation (pragmatique)

Le repo utilise **vitest** (`npm run test`) pour les fonctions pures de `lib/`.
Config : `vitest.config.ts` à la racine, alias `@/` résolu vers `src/`.

### Règles de test

- **Fichier** : `src/lib/<domaine>.test.ts` côte à côte avec le lib testé.
- **Périmètre** : fonctions pures exportées depuis `lib/`. Pas de tests de composants React.
- **Couverture obligatoire** : toute logique de cascade, de clamp ou de redistribution.
- **Cas nominaux + cas limites** : tester le cas heureux, la valeur limite, l'id inconnu, l'immutabilité du tableau source.

### Commandes

```bash
npm run test          # exécution unique (CI)
npm run test:watch    # mode watch (développement)
npm run type-check    # TypeScript strict, sans erreur
npm run build         # compilation Next.js, sans erreur
```

### Pour un nouveau calculateur

1. **Cas de référence dans le code** : commentaire JSDoc `/** @example */` avec
   2-3 cas issus de sources officielles (BOFiP, service-public.fr).
2. **Test manuel dans le navigateur** : `npm run dev`, vérifier à ±1 € près.
3. **Tests vitest** si la lib contient une logique non triviale (cascade, barème, prorata).

---

## 5. Format du disclaimer par calculateur

Le `<LegalDisclaimer />` générique est toujours en haut. **En plus**, chaque
calculateur doit afficher, en bas de page ou dans une section "Méthodologie",
un **bloc sources** avec :

- Les articles de loi cités (CGI, Code des assurances, etc.) avec lien Légifrance.
- Les doctrines administratives (BOFiP, BOSS) avec lien officiel.
- La **date de dernière consultation** des sources.
- Le millésime fiscal applicable (ex: "Barème IR 2026 - revenus 2025").

Le fichier `docs/sources/<slug>.md` (voir §6) contient ces infos sous forme
structurée et sert de source unique pour le rendu.

---

## 6. Sourçage légal - obligation par calculateur

### 6.1. Réalité du crawl Légifrance/BOFiP

**Cette section a été révisée après le crawl 2026-05-31** qui a montré que :
- 50 % des URLs Légifrance (LEGIARTI) testées renvoyaient 404.
- 17 % renvoyaient 200 mais pointaient vers le **mauvais article**.
- Les URLs BOFiP nues `<id>-PGP.html` re-routent souvent ailleurs.

**Conséquence** : on ne peut pas se fier à la mémoire du modèle pour citer
des URLs Légifrance et BOFiP. **Chaque URL doit être testée au moment de
l'écriture du fichier sources** et son statut explicitement consigné.

### 6.2. Hiérarchie des sources - règle révisée

L'ordre de priorité pour **citer** une donnée fiscale est :

1. **Texte légal officiel** (CGI, code des assurances, etc.) - **référence
   textuelle obligatoire** (numéro d'article, code).
2. **BOFiP avec identifiant BOI complet** (`?identifiant=BOI-XXX-XX-XX-DATE`)
   si l'URL est testée OK.
3. **service-public.fr** (fiches F\<numéro\>) - URLs historiquement stables,
   excellente vérification croisée.
4. **impots.gouv.fr** - tableaux récapitulatifs des barèmes, stables.
5. **BOSS** (boss.gouv.fr) pour la protection sociale.
6. **Légifrance LEGIARTI** - **mis volontairement en dernier** : la référence
   textuelle de l'article reste primaire, mais l'URL LEGIARTI est instable.
   À tester systématiquement avant de la citer.

**Différence clé** vs la version précédente :
- Avant : "priorité Légifrance > BOFiP > service-public.fr"
- Maintenant : la **référence textuelle** prime sur l'URL. service-public.fr
  et impots.gouv.fr sont préférés pour la **vérification de la valeur** car
  leurs URLs sont stables et leur contenu lisible.

### 6.3. Format obligatoire du fichier sources

**Chaque nouveau calculateur nécessite un fichier `docs/sources/<slug>.md`**.
Le template canonique est `docs/sources/_TEMPLATE.md` - il doit être suivi
sans déviation. Points-clés :

- Chaque URL externe doit porter un **statut de vérification** : `✅ OK`,
  `❌ 404`, `⚠️ MAUVAIS CONTENU` ou `☐ NON TESTÉE`.
- Une section dédiée **"URLs vérifiées manuellement par Nicolas"** liste les
  URLs qui ont nécessité une confirmation visuelle (Légifrance bloque ou
  rate-limit, contenu ambigu, divergence détectée).
- Une section **"Cross-check des chiffres"** liste chaque taux/seuil avec
  au minimum **deux sources concordantes** quand la source primaire
  (Légifrance) est inaccessible.
- L'historique des vérifications est tracé.

### 6.4. Règles de sourçage strictes

- **Tout taux, tout seuil, tout barème doit avoir une source primaire** -
  un article de loi ou un BOFiP - **identifié par sa référence textuelle**
  (l'URL est secondaire).
- **Pas de source tertiaire** (blogs fiscaux, articles de presse, sortie IA
  non vérifiée). Jamais.
- Les citations sont **très courtes** (une phrase, moins de 15 mots) ou en
  reformulation. Jamais de paragraphe entier copié.
- La date de consultation est obligatoire.
- Si un texte a été modifié récemment, signaler la version applicable
  (ex: "Version issue de la LF 2026").
- **Aucun calculateur ne peut être committé si la section "URLs vérifiées
  manuellement" est vide ET que la source primaire est en catégorie B/C/D**
  (cf. `/verif-sources`). Dans ce cas : STOP, demander à Nicolas.

---

## 7. Workflow pour un nouveau calculateur

**Toujours dans cet ordre :**

1. **Lire `BACKLOG.md`** → choisir le premier item en statut `todo`, priorité
   la plus haute. Passer son statut à `in-progress`.
2. **Rechercher et vérifier les textes de loi** en vigueur à la date du jour.
   Créer `docs/sources/<slug>.md` avec les sources.
3. **Définir les types** dans `src/types/<domaine>.ts`.
4. **Écrire la logique pure** dans `src/lib/<domaine>.ts` avec JSDoc et cas
   de référence en `@example`.
5. **Valider mentalement** contre les exemples officiels du BOFiP (simulation
   à la main).
6. **Construire le composant** `src/components/Calculator/<Nom>Calculator.tsx`.
7. **Créer la page** `src/app/<slug>/page.tsx` avec metadata SEO, disclaimer,
   section sources.
8. **Ajouter une entrée dans `src/config/navigation.ts`** (`category: 'calculateur'`,
   `showInHeader: true`). Header et Footer se mettent à jour automatiquement.
9. **Ajouter au `sitemap.ts`**.
10. **Vérifier** : `npm run type-check`, `npm run lint`, `npm run build`.
11. **Commit atomique** : `feat(calc): ajout calculateur <nom>`.
12. **Passer le statut à `done` dans `BACKLOG.md`** avec la date.

La slash-command `/nouveau-calculateur` déclenche exactement ce workflow.

---

## 8. Conventions Git

- Branches : `feat/calc-<slug>`, `fix/<slug>`, `docs/<sujet>`.
- Messages : préfixe conventional commits en français - `feat(calc):`,
  `fix(ui):`, `docs(sources):`, `chore(deps):`.
- **Commits atomiques** : un calculateur = un gros commit bien décrit, ou
  plusieurs commits découpés proprement (types / logique / UI / page).
- **Pas de fichiers de brouillon** dans les commits. Pas de `test_xxx.js` à la
  racine - si besoin de scratch, utiliser `/tmp`.

---

## 9. Ce qu'on **ne fait pas**

- Pas de recommandation personnalisée, jamais.
- Pas d'appel d'API externe payante ou à risque de changement (tout en local).
- Pas de `localStorage` / `sessionStorage` sauf nécessité explicite.
- Pas de dépendance JS sans justification claire.
- Pas de barème périmé. Si tu n'es pas sûr de la date d'applicabilité, **tu
  vérifies avant de coder**.
- Pas de "quick win" qui contourne le sourçage. Si tu ne trouves pas la source
  officielle, tu documentes le manque dans `docs/sources/<slug>.md` et tu
  demandes à Nicolas avant de publier.
- Pas d'emoji dans le code source (utiliser du texte ou des badges).
- Pas d'ajout de calculateur qui ne figure pas dans `BACKLOG.md`. Si tu as une
  idée, tu la proposes en l'ajoutant à la backlog avec statut `proposed`,
  et tu attends validation.

---

## 10. Mode autonome

La slash-command `/mode-autonome` enchaîne `/nouveau-calculateur` en boucle sur
la backlog. Entre chaque calculateur :

- Faire un `git status` et vérifier qu'on est clean.
- Relire la backlog (elle a pu être mise à jour).
- S'arrêter si la backlog est vide OU si 3 calculateurs consécutifs ont été
  produits (demander validation humaine).

**Règle de sécurité** : si un doute existe sur un point fiscal, **s'arrêter et
demander**, ne pas deviner. Mieux vaut livrer 1 calculateur juste que 3
approximatifs.

---

## 11. Pour aller plus loin

- `BACKLOG.md` - liste priorisée des calculateurs.
- `docs/CONVENTIONS_CALCULATEUR.md` - détail technique complet (extension de §3).
- `docs/sources/` - sources légales par calculateur.
- `.claude/commands/` - slash-commands personnalisées.

Last updated: 2026-04-19.

---

## Agent skills

### Issue tracker

Issues dans GitHub Issues sur `github.com/nba67000/calculpatrimoine` (CLI `gh`). Voir `docs/agents/issue-tracker.md`.

### Triage labels

Vocabulaire cinq labels : `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. Voir `docs/agents/triage-labels.md`.

### Domain docs

Single-context : un `CONTEXT.md` à la racine + `docs/adr/`. Voir `docs/agents/domain.md`.
