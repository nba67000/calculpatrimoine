---
description: Rédige un article de blog SEO depuis BACKLOG_BLOG.md, en suivant les règles éditoriales du projet (zéro em-dash, test des trois frères, anti-conseil).
---

# /nouveau-article-blog

Tu vas rédiger **un seul** article de blog de A à Z, en piochant dans
`BACKLOG_BLOG.md` et en suivant les conventions éditoriales du site.

**MODE SOBRIÉTÉ ACTIVE** - Token efficiency obligatoire :
- Chemins de fichiers only (pas de contenu complet sauf si demandé)
- Diffs plutôt que fichiers entiers pour les modifications
- Pas d'explication si l'action est évidente
- Réponses en français

**Règles éditoriales NON NÉGOCIABLES** (issues de `BACKLOG_BLOG.md` et
`CLAUDE.md` §1) :
- **Zéro cadratin (em-dash, caractère Unicode U+2014)** dans tout l'article.
  Utiliser deux-points, point-virgule, virgule ou parenthèses. Vérifier en
  fin de rédaction avec ripgrep ou la tool Grep que le codepoint U+2014
  n'apparaît pas dans le fichier généré.
- **Test des trois frères** : jargon fiscal traduit à la première apparition
  ("assiette" → "base de calcul", "imputation" → "déduction", "translucide"
  → "transparente fiscalement", etc.).
- **Anti-conseil** : jamais "vous devriez", "choisissez", "il est préférable".
  Toujours factuel : "la simulation indique...", "l'option X aboutit à Y €".
- **Anti-AI-slop** : pas de "guide complet", "tout savoir sur", "il convient
  de noter", "dans le cadre de", "en vertu de".

---

## Étapes à suivre dans l'ordre

### 1. Lire la backlog et choisir

- Lire `BACKLOG_BLOG.md`.
- Sélectionner le **premier item P1** non publié. À défaut, P2, puis P3.
  Dans une même priorité, prendre l'ordre du fichier.
- Annoncer : "Je commence l'article `<slug>` - <titre>.
  Calculateur lié : <calc>. Estimation : ~<X> mots."
- Marquer mentalement l'item comme `in-progress` (pas de table de statut
  dans BACKLOG_BLOG.md, c'est inutile pour les articles, on retire l'entrée
  en fin de course).

**STOP - attends validation avant de continuer.**

---

### 2. Lire l'existant proche

- Lire le blog post **thématiquement le plus proche** pour calquer le style :
  - `src/app/blog/rente-viagere-seuil-rentabilite/page.tsx` (épargne/retraite)
  - `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` (assurance-vie/transmission)
  - `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` (fiscalité/PER)
- Retenir : structure JSX, classes Tailwind, encadrés (avertissement, CTA),
  longueur des paragraphes, niveau de détail des exemples chiffrés.

---

### 3. Vérifier les sources légales

- Pour **chaque chiffre cité** dans l'article (taux, seuil, plafond, durée) :
  - Vérifier l'article du CGI, du CSS ou du BOFiP via **WebFetch** quand
    possible.
  - Si la fetch retourne 404 (cas connu, cf. `docs/broken-links-to-fix.md`) :
    citer la référence textuelle sans URL, et noter `// URL Légifrance à
    reconstruire` en commentaire JSX si nécessaire.
- **Refus formel** : aucun chiffre inventé, aucune source secondaire (blog
  fiscal, presse, IA). Si tu ne trouves pas une donnée :
    ```
    ⚠️ DONNÉE INTROUVABLE
    Sujet : <ce que tu cherchais>
    URLs tentées : <liste>
    Action : Nicolas doit me fournir le chiffre exact.
    ```

**STOP si au moins un ⚠️.**

---

### 4. Affiner le plan H2

- Reprendre le plan H2 fourni dans `BACKLOG_BLOG.md` pour l'article choisi.
- L'enrichir si besoin avec :
  - Une accroche chiffrée pour l'intro (cas type, ratio, gain en € attendu).
  - Au moins **deux cas chiffrés concrets** dans le corps (pas un seul).
  - Une section "Ce que la simulation ne dit pas" en fin (limites honnêtes,
    angles morts).
- Présenter le plan affiné en bullets.

**STOP - attends validation du plan avant rédaction.**

---

### 5. Rédaction

Créer `src/app/blog/<slug>/page.tsx` en calquant le squelette :

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '<titre exact du BACKLOG_BLOG, ≤ 60 c.>',
  description: '<meta du BACKLOG_BLOG, ≤ 160 c.>',
  keywords: '<keywords du BACKLOG_BLOG>',
  openGraph: {
    title: '<titre>',
    description: '<accroche courte, différente de la meta>',
    type: 'article',
    publishedTime: 'YYYY-MM-DD',
  },
  alternates: { canonical: 'https://calculpatrimoine.fr/blog/<slug>' },
}

export default function Article<NomPascal>Page() {
  return (
    <>
      <Header />
      <div className="h-[3px] bg-accent-400 w-full" />
      <article style={{ backgroundColor: '#F7F3EC' }}>

        <header>
          <div className="max-w-4xl mx-auto px-6 py-12">
            <nav className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-8">
              <Link href="/blog" className="hover:text-primary-600 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-neutral-600"><tag thématique></span>
            </nav>
            <div className="h-[2px] w-10 bg-accent-400 mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              <H1 = titre>
            </h1>
            <div className="flex flex-wrap gap-4 font-mono text-xs text-neutral-500">
              <span><thème></span>
              <span>·</span>
              <span><N> min de lecture</span>
              <span>·</span>
              <span><date FR></span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 pb-16">

          {/* Intro */}
          <div className="mb-12">
            <p className="text-xl text-neutral-700 leading-relaxed mb-6">
              <intro avec cas chiffré ou question concrète, 2-3 phrases>
            </p>
            <p className="text-neutral-700">
              <annonce du contenu de l'article, 1-2 phrases>
            </p>
          </div>

          {/* Avertissement */}
          <div className="border-l-4 border-warning-400 bg-warning-50 px-5 py-4 mb-12">
            <p className="font-mono text-xs font-bold text-warning-800 uppercase tracking-wider mb-1">Avertissement</p>
            <p className="text-sm text-warning-700 leading-relaxed">
              Cet article décrit les mécanismes fiscaux et présente des exemples chiffrés. Il ne constitue pas un conseil en investissement ou un conseil fiscal personnalisé.
            </p>
          </div>

          {/* CTA calculateur */}
          <div className="bg-primary-700 px-8 py-6 mb-12">
            <p className="font-mono text-xs text-primary-300 uppercase tracking-wider mb-2">Outil associé</p>
            <p className="text-white font-bold text-lg mb-1"><titre CTA spécifique au calc></p>
            <p className="text-primary-200 text-sm mb-4">
              <pitch 1-2 phrases du calc associé>
            </p>
            <Link href="<href du calc>" className="inline-block bg-surface-card text-primary-700 px-6 py-2.5 font-medium text-sm hover:bg-neutral-100 transition-colors font-mono">
              Accéder au calculateur →
            </Link>
          </div>

          {/* Sections H2 - une par point du plan */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
              <H2>
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              <paragraphe>
            </p>
            {/* éventuellement un encadré exemple chiffré : */}
            <div className="bg-neutral-100 border-l-4 border-primary-400 px-5 py-4 my-6 font-mono text-sm">
              <p className="font-bold mb-2">Exemple chiffré</p>
              <p>...</p>
            </div>
          </section>

          {/* ... répéter pour chaque H2 ... */}

          {/* Conclusion / mise en perspective */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
              Ce que la simulation ne dit pas
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-neutral-700">
              <li><limite honnête 1></li>
              <li><limite honnête 2></li>
              <li><limite honnête 3></li>
            </ul>
          </section>

          {/* Maillage interne */}
          <section className="border-t border-neutral-300 pt-8">
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-4">Pour aller plus loin</p>
            <ul className="space-y-3">
              <li>
                <Link href="<calc associé>" className="text-primary-700 hover:underline">→ <Nom calc associé></Link>
              </li>
              <li>
                <Link href="<article voisin 1>" className="text-primary-700 hover:underline">→ <Titre article voisin 1></Link>
              </li>
              {/* 2 à 4 liens internes */}
            </ul>
          </section>

        </div>
      </article>
      <Footer />
    </>
  )
}
```

Règles de contenu :

- **Intro** : commencer par un cas concret ou une question simple, jamais
  par "Le sujet de cet article est...".
- **Sections H2** : 1 paragraphe d'explication suivi d'un exemple chiffré
  encadré (cf. squelette).
- **Cas chiffrés** : au moins 2 dans le corps de l'article, avec montants
  exacts à l'euro près.
- **Exemples** : nommer des sources visibles ("BOFiP RFPI-BASE-30",
  "Art. 156 I-3° CGI") sans inventer d'URL.
- **Anti-cliché** : pas de "tout savoir sur", "guide complet", "en quelques
  clics", "facilement", "simplement".
- **Anti-conseil** : pas de "vous devriez", "il faut", "idéalement". Forme
  factuelle ("la simulation aboutit à...", "l'écart se chiffre à...").
- **Longueur des phrases** : viser 15 à 25 mots, jamais > 30 sans respiration.
- **Liens vers calc** : 2 à 4 maximum répartis dans l'article + CTA en tête
  + bloc "Pour aller plus loin" en fin.

---

### 6. Audit éditorial intégré

Avant de marquer l'article comme prêt, exécuter trois checks :

#### 6a. Zéro em-dash

Utiliser la tool Grep avec le pattern Unicode (PCRE `\x{2014}`) ou ripgrep
en ligne de commande :

```bash
rg -cP '\x{2014}' src/app/blog/<slug>/page.tsx
```

Doit retourner `0` ou `No matches found`. Sinon, remplacer chaque
occurrence par `:`, `;`, `,` ou des parenthèses selon le contexte.

#### 6b. Test des trois frères (auto-check)

Relire l'article en posant à chaque paragraphe :
- "Un lecteur ordinaire comprend-il à la première lecture ?"
- "Tout terme technique a-t-il été traduit à sa première apparition ?"
- "Y a-t-il une phrase > 30 mots sans respiration ?"

Pour les passages qui échouent, reformuler immédiatement. Pas besoin de
STOP pour ça, c'est de l'autocorrection.

#### 6c. Anti-AI-slop (auto-check)

Recherche systématique :

```bash
grep -nE "(tout savoir|guide complet|il convient de noter|en vertu de|dans le cadre de|en quelques clics|facilement|simplement|idéalement|nous vous recommandons|pensez à|n'oubliez pas de)" src/app/blog/<slug>/page.tsx
```

Doit retourner 0 ligne. Sinon, reformuler.

---

### 7. Intégration technique

#### 7a. Sitemap

Ajouter l'article dans `src/app/sitemap.ts` :

```ts
{
  url: `${baseUrl}/blog/<slug>`,
  lastModified: new Date('YYYY-MM-DD'),
  changeFrequency: 'monthly',
  priority: 0.7,
},
```

Vérifier qu'aucune entrée n'existe déjà pour ce slug.

#### 7b. Homepage (liste des articles)

Dans `src/app/page.tsx`, ajouter une entrée dans le tableau `ARTICLES` :

```ts
{
  href: '/blog/<slug>',
  tag: '<tag>',
  duree: '<N> min',
  titre: '<titre>',
  accroche: '<accroche 1 phrase>',
},
```

Placer la nouvelle entrée en tête (ordre chronologique inverse).

#### 7c. Pas de schema JSON-LD séparé

Le `Schema Article` n'est pas géré globalement. Pour cette V1, on s'appuie
sur les balises Open Graph (`type: 'article'`, `publishedTime`) déjà
présentes dans `metadata`. Si Nicolas demande un JSON-LD Article complet,
le créer dans une passe ultérieure.

---

### 8. Validation build

Lancer dans l'ordre :

```bash
npm run type-check
npm run lint
npm run build
```

Les trois doivent passer. Si un échec, corriger avant de continuer.

---

### 9. Mise à jour BACKLOG_BLOG.md

- Retirer l'entrée de la section "P1/P2/P3" correspondante.
- L'ajouter en tête du tableau "Articles déjà publiés" avec la date du jour.
- Mettre à jour le compteur si présent et la ligne "Last updated".

---

### 10. Commit

Un seul commit atomique :

```
feat(blog): ajout article <slug>

<résumé 2-3 phrases : sujet, calc lié, angle pédagogique>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

**Ne pas pousser.** C'est Nicolas qui décide quand pousser.

---

### 11. Fermeture

Résumer en bullets courts :
- Chemin du fichier créé
- Calc associé
- Nombre de mots
- Maillage interne (liens posés)
- Commande pour tester : `npm run dev` puis `http://localhost:3000/blog/<slug>`

**S'arrêter.** Ne pas enchaîner sur un autre article sauf instruction
explicite "boucle blog".

---

## Règles de sécurité

- **Doute sur un chiffre fiscal** → s'arrêter, demander à Nicolas.
- **Source introuvable** → ne pas inventer, signaler avec ⚠️, attendre.
- **Em-dash résiduel après l'autocheck** → s'arrêter, demander.
- **Build qui échoue** → s'arrêter après 2 tentatives, résumer l'erreur.
- **Tentation de basculer en conseil** → résister. Reformuler en factuel ou
  laisser le passage tel quel et le signaler.
- **Article > 3 000 mots** → s'arrêter et demander si on découpe en 2.

Mieux vaut 1 article propre et sourcé que 3 approximatifs.

---

## Exemples de bon / mauvais ton

| AI-slop (❌) | Factuel CalcPatrimoine (✅) |
|---|---|
| "Tout savoir sur le PER individuel" | "PER individuel : ce que vous gagnez à l'entrée, ce que vous payez à la sortie" |
| "Il convient de noter que l'abattement de 100 000 € s'applique" | "L'abattement de 100 000 € (Art. 779-I CGI) s'applique" |
| "Pour optimiser votre situation, pensez à étaler vos donations" | "Étaler les donations sur 15 ans permet de réutiliser l'abattement à chaque cycle" |
| "Ce calculateur vous permet de simuler facilement" | "Le calculateur renvoie le montant exact selon les paramètres saisis" |
| "Vous devriez attendre 5 ans pour retirer de votre PEA" | "Avant 5 ans, le retrait déclenche la flat tax 30 % ; après, seuls les PS s'appliquent" |
| "En quelques clics, obtenez votre simulation" | _supprimer la phrase, n'apporte rien_ |
