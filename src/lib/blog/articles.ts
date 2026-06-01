// src/lib/blog/articles.ts
//
// Source unique des articles de blog. Consommée par :
//   - src/app/blog/page.tsx       (listing complet sur /blog)
//   - src/app/page.tsx            (section "À lire avant de calculer" en home)
//   - src/app/sitemap.ts          (entrées blog/<slug> dans le sitemap)
//
// Pour publier un nouvel article : ajouter une entrée en TÊTE du tableau
// (ordre chronologique inverse, plus récent en premier). Voir le skill
// /nouveau-article-blog.

export interface BlogArticle {
  /** Slug URL sous /blog/. */
  slug: string
  /** Titre éditorial (utilisé pour le H1 et le listing). */
  titre: string
  /** Tag thématique (Fiscalité, Rente viagère, etc.). */
  tag: string
  /** Date de publication au format ISO YYYY-MM-DD. */
  date: string
  /** Durée indicative de lecture (ex. "12 min"). */
  duree: string
  /** Version longue de l'accroche (utilisée sur /blog). */
  extrait: string
  /** Version courte (utilisée sur la homepage). */
  accroche: string
}

export const ARTICLES: BlogArticle[] = [
  {
    slug: 'tmi-tranche-marginale-comprendre',
    titre: 'TMI : à quoi sert votre tranche marginale en 2026',
    tag: 'Fiscalité',
    date: '2026-06-02',
    duree: '12 min',
    extrait: "Votre TMI n'est pas le taux que vous payez. Comment elle se calcule, à quoi elle sert pour le PER, l'assurance-vie, et l'épargne en général.",
    accroche: "Votre TMI n'est pas le taux que vous payez. Pourquoi cet écart commande vos décisions PER, assurance-vie et plus-value.",
  },
  {
    slug: 'per-individuel-deduction-fiscalite',
    titre: "PER individuel : ce que vous gagnez à l'entrée, ce que vous payez à la sortie",
    tag: 'Fiscalité',
    date: '2026-05-05',
    duree: '12 min',
    extrait: "Déduction fiscale, plafond épargne retraite, fiscalité des retraits en capital ou en rente. Les mécanismes exacts, avec formules et comparaison PER vs assurance-vie.",
    accroche: "Déduction fiscale, plafond épargne retraite, fiscalité des retraits. Les mécanismes exacts avec formules et comparaison PER vs assurance-vie.",
  },
  {
    slug: 'assurance-vie-fiscalite-rachat',
    titre: 'Assurance-vie : combien vous allez vraiment payer sur un rachat',
    tag: 'Fiscalité',
    date: '2026-04-18',
    duree: '11 min',
    extrait: "Règle proportionnelle, abattement 8 ans, PFU vs IR, date du 27 septembre 2017. Guide complet avec exemples chiffrés et formules détaillées.",
    accroche: "Règle proportionnelle, abattement 8 ans, PFU vs IR, versements avant 2017. Tout le détail.",
  },
  {
    slug: 'rente-viagere-seuil-rentabilite',
    titre: 'Pourquoi le seuil de rentabilité est après votre espérance de vie',
    tag: 'Rente viagère',
    date: '2026-04-16',
    duree: '15 min',
    extrait: "À 72 ans avec 250 000 €, le seuil tombe à 15,8 ans alors que l'espérance est de 14 ans. Découvrez pourquoi c'est normal.",
    accroche: "À 72 ans avec 250 000 €, le seuil tombe à 15,8 ans. Ce n'est pas une anomalie.",
  },
]
