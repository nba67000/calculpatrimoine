// src/lib/schema/schemaData.ts
//
// Données JSON-LD centralisées pour les rich snippets Google.
// Texte brut extrait des pages FAQ et calculateurs.
//
// Règle : les `answer` et `text` correspondent EXACTEMENT au contenu
// visible dans les accordéons FAQ et les sections calculateur.
// Google pénalise les schemas dont le contenu ne figure pas sur la page.

import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import type { HowToStep } from '@/components/SchemaHowTo'

// ─────────────────────────────────────────────────────────────
// TMI
// ─────────────────────────────────────────────────────────────

export const FAQ_TMI: FAQSchemaItem[] = [
  {
    question: "C'est quoi la Tranche Marginale d'Imposition (TMI) ?",
    answer:
      "La TMI est le taux auquel est imposé le dernier euro de votre revenu. En France, l'impôt sur le revenu est progressif : chaque tranche de revenus est taxée à un taux différent, croissant. Barème IR 2026 (revenus 2025) par part fiscale : jusqu'à 11 600 € à 0 %, de 11 601 € à 29 579 € à 11 %, de 29 580 € à 84 577 € à 30 %, de 84 578 € à 181 917 € à 41 %, au-delà de 181 917 € à 45 %.",
  },
  {
    question: "Quelle différence entre TMI et taux moyen d'imposition ?",
    answer:
      "La TMI est le taux du dernier euro gagné, utile pour savoir combien vous coûte un revenu supplémentaire ou combien vous économisez sur une déduction. Le taux moyen est l'impôt total divisé par le revenu total. Exemple : un célibataire avec 50 000 € net imposable a une TMI de 30 % mais un taux moyen d'environ 16,2 % (8 104 € d'impôt divisé par 50 000 €).",
  },
  {
    question: "Sur quel revenu est calculée la TMI ? Brut ou net ?",
    answer:
      "La TMI est calculée sur le revenu net imposable. Partant du salaire brut, on soustrait les cotisations sociales salariales pour obtenir le salaire net, puis on déduit l'abattement frais professionnels de 10 % (minimum 509 €, maximum 14 555 €) pour obtenir le revenu net imposable.",
  },
  {
    question: "C'est quoi le quotient familial ?",
    answer:
      "Le quotient familial divise le revenu fiscal de référence par le nombre de parts fiscales du foyer. Cela réduit la tranche atteinte et donc l'impôt. Un célibataire dispose d'1 part, un couple marié ou pacsé de 2 parts, avec 0,5 part par enfant pour les deux premiers et 1 part à partir du troisième. Le gain par demi-part est plafonné à 1 807 € (Art. 197-IV CGI).",
  },
  {
    question: "C'est quoi la décote et qui en bénéficie ?",
    answer:
      "La décote est un mécanisme qui réduit ou annule l'impôt pour les foyers à faibles revenus. Paramètres 2026 : pour un célibataire dont l'impôt brut est inférieur à 1 929 €, la décote est 1 929 − 0,75 × impôt brut. Pour un couple dont l'impôt brut est inférieur à 3 191 €, la décote est 3 191 − 0,75 × impôt brut.",
  },
  {
    question: "À quoi sert de connaître sa TMI ?",
    answer:
      "La TMI est la variable clé de presque toutes les décisions fiscales : PER individuel (l'économie d'impôt est égale au versement multiplié par la TMI, donc 1 500 € pour 5 000 € à TMI 30 %), choix entre PFU et IR pour les rachats d'assurance-vie (si TMI ≤ 11 %, l'IR est souvent plus avantageux), optimisation des revenus, et évaluation de l'impact fiscal d'investissements.",
  },
  {
    question: "Mes données sont-elles stockées ou envoyées quelque part ?",
    answer:
      "Non, absolument pas. Tous les calculs sont effectués localement dans votre navigateur. Aucune donnée n'est transmise à un serveur ni conservée après fermeture de la page. Le code source est open-source et vérifiable sur GitHub.",
  },
]

export const HOWTO_TMI: { name: string; description: string; totalTime: string; steps: HowToStep[] } = {
  name: "Comment calculer sa Tranche Marginale d'Imposition (TMI) 2026",
  description:
    "Calculez votre TMI et votre impôt sur le revenu net avec le barème IR 2026, le quotient familial et la décote, en moins de 2 minutes.",
  totalTime: "PT2M",
  steps: [
    {
      name: "Saisissez votre revenu net imposable",
      text:
        "Entrez votre revenu net imposable annuel (après abattement de 10 % pour frais professionnels, ou frais réels). Pour un salarié, il correspond au salaire net moins l'abattement 10 % (minimum 509 €, maximum 14 555 €). Ce chiffre figure sur votre avis d'imposition ou peut être estimé depuis votre fiche de paie.",
      url: "https://calculpatrimoine.fr/tmi#revenu",
    },
    {
      name: "Choisissez votre situation familiale",
      text:
        "Sélectionnez votre situation : célibataire (1 part), marié ou pacsé (2 parts), ou parent isolé (1,5 part minimum). Cette information détermine le nombre de parts fiscales de base avant ajout des enfants.",
      url: "https://calculpatrimoine.fr/tmi#situation",
    },
    {
      name: "Indiquez le nombre d'enfants à charge",
      text:
        "Renseignez le nombre d'enfants à charge (enfants mineurs ou rattachés). Chaque enfant ajoute 0,5 part pour les deux premiers, puis 1 part à partir du troisième. Le gain fiscal par demi-part est plafonné à 1 807 € (Art. 197-IV CGI, barème 2026).",
      url: "https://calculpatrimoine.fr/tmi#enfants",
    },
    {
      name: "Lisez votre TMI et votre impôt net",
      text:
        "Le calculateur affiche instantanément votre tranche marginale d'imposition (TMI), votre impôt brut par tranche, l'application éventuelle de la décote, et votre impôt net final. Le détail par tranche montre comment chaque partie de votre revenu est taxée.",
      url: "https://calculpatrimoine.fr/tmi#resultat",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// PER INDIVIDUEL
// ─────────────────────────────────────────────────────────────

export const FAQ_PER: FAQSchemaItem[] = [
  {
    question: "C'est quoi un PER individuel (PERIN) ?",
    answer:
      "Le Plan d'Épargne Retraite Individuel (PERIN) est un produit d'épargne longue durée créé par la loi PACTE (2019). Il remplace les anciens PERP et contrats Madelin. Son avantage principal : les versements volontaires sont déductibles du revenu imposable dans la limite d'un plafond annuel. À la TMI 30 %, 3 000 € versés génèrent 900 € d'économie d'impôt.",
  },
  {
    question: "Comment fonctionne la déductibilité fiscale du PER ?",
    answer:
      "Les versements viennent en déduction du revenu net imposable, ce qui réduit directement l'impôt à payer. L'économie d'impôt est égale au montant versé multiplié par la TMI. Exemples : TMI 11 % → 330 €, TMI 30 % → 900 €, TMI 41 % → 1 230 €, TMI 45 % → 1 350 €, pour un versement de 3 000 €.",
  },
  {
    question: "Quel est le plafond de déduction PER en 2026 ?",
    answer:
      "Le plafond annuel est calculé sur la base du PASS 2025 (47 100 €). Pour un salarié, le plafond est de 10 % du revenu net professionnel (après abattement de 10 % pour frais professionnels), avec un minimum de 4 710 € et un maximum de 37 680 €. Exemple : salarié à 60 000 € brut → revenu net professionnel 54 000 € → plafond 5 400 €.",
  },
  {
    question: "Qu'est-ce que le report des plafonds N-1 à N-5 ?",
    answer:
      "Si vous n'avez pas utilisé tout votre plafond PER dans les 5 années précédentes (depuis la LF 2026), vous pouvez reporter le solde non utilisé sur l'année en cours. Le plafond total est la somme du plafond de l'année N et des soldes des années N-1 à N-5. Ces plafonds non utilisés figurent sur votre avis d'imposition.",
  },
  {
    question: "Quand peut-on débloquer son PER ?",
    answer:
      "Le PER est bloqué jusqu'à la retraite, avec 5 cas de déblocage anticipé : acquisition de la résidence principale, invalidité du titulaire, du conjoint ou d'un enfant, décès du conjoint ou partenaire de PACS, surendettement, et expiration des droits chômage.",
  },
  {
    question: "Le PER vaut-il le coup si ma TMI va baisser à la retraite ?",
    answer:
      "Oui, si votre TMI aujourd'hui est supérieure à votre TMI à la retraite, ce qui est le cas pour la majorité des salariés. Exemple : TMI 30 % aujourd'hui, versement 5 000 €, économie 1 500 €. À la retraite, TMI 11 %, impôt sur le capital retiré 550 €. Gain net : 950 € plus la croissance du capital.",
  },
  {
    question: "Mes données sont-elles stockées ou envoyées quelque part ?",
    answer:
      "Non, absolument pas. Tous les calculs sont effectués localement dans votre navigateur. Aucune donnée n'est transmise à un serveur ni conservée après fermeture de la page.",
  },
]

export const HOWTO_PER: { name: string; description: string; totalTime: string; steps: HowToStep[] } = {
  name: "Comment simuler l'économie d'impôt d'un versement PER individuel",
  description:
    "Calculez l'économie d'impôt générée par un versement sur votre PER individuel, le plafond de déduction 2026 et le report des plafonds des 5 années précédentes.",
  totalTime: "PT3M",
  steps: [
    {
      name: "Entrez votre revenu brut annuel",
      text:
        "Saisissez votre revenu brut annuel. Le calculateur en déduit automatiquement l'abattement forfaitaire de 10 % (minimum 509 €, maximum 14 555 €) pour obtenir votre revenu net professionnel, base du calcul du plafond PER.",
      url: "https://calculpatrimoine.fr/per-individuel#revenu",
    },
    {
      name: "Indiquez votre TMI",
      text:
        "Sélectionnez ou calculez votre TMI (11 %, 30 %, 41 % ou 45 %). C'est elle qui détermine le montant de l'économie d'impôt : économie = versement × TMI. Si vous ne la connaissez pas, utilisez d'abord le calculateur TMI.",
      url: "https://calculpatrimoine.fr/per-individuel#tmi",
    },
    {
      name: "Renseignez les reports de plafonds N-1 à N-5",
      text:
        "Si vous n'avez pas utilisé tout votre plafond PER dans les 5 années précédentes (depuis la LF 2026), ajoutez les soldes non utilisés. Ces montants figurent sur votre avis d'imposition sous 'Plafonds non utilisés des années antérieures'.",
      url: "https://calculpatrimoine.fr/per-individuel#reports",
    },
    {
      name: "Saisissez le montant du versement envisagé",
      text:
        "Entrez le montant que vous souhaitez verser sur votre PER. Le calculateur indique la partie déductible (dans la limite du plafond total), l'économie d'impôt correspondante et le coût net réel du versement après avantage fiscal.",
      url: "https://calculpatrimoine.fr/per-individuel#versement",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// RENTE VIAGÈRE
// ─────────────────────────────────────────────────────────────

export const FAQ_RENTE: FAQSchemaItem[] = [
  {
    question: "C'est quoi une rente viagère ?",
    answer:
      "Une rente viagère transforme un capital en revenus mensuels garantis jusqu'au décès. Exemple concret : avec 100 000 € à 65 ans, un assureur verse 614 € chaque mois à vie. Plus l'âge de souscription est élevé, plus la rente mensuelle est élevée, car l'assureur estime verser moins longtemps.",
  },
  {
    question: "Si je décède avant l'âge moyen (espérance de vie), je perds tout ?",
    answer:
      "Oui, sauf en cas d'option réversion. Jean, 65 ans, verse 100 000 €, reçoit 614 €/mois. S'il décède à 70 ans : total reçu 36 840 €, perte 63 160 €. S'il décède à 85 ans : total reçu 147 360 €, gain 47 360 €. Le point mort (âge de récupération du capital) est environ 78-79 ans pour un homme de 65 ans.",
  },
  {
    question: "Si je vis très longtemps (100 ans), l'assureur arrête de payer ?",
    answer:
      "Non, l'assureur paie jusqu'au décès, même à 110 ans. C'est l'intérêt principal de la rente viagère : protection contre le risque de longévité. Marie, 65 ans, verse 100 000 €, reçoit 532 €/mois. Si elle vit jusqu'à 102 ans : total reçu 236 208 €, gain 136 208 €.",
  },
  {
    question: "La réversion, c'est quoi ? Ça sert à quoi ?",
    answer:
      "La réversion protège le conjoint survivant. Sans réversion, la rente s'arrête au décès du titulaire. Avec réversion à 60 %, 80 % ou 100 %, le conjoint continue à percevoir cette fraction de la rente à vie. La réversion réduit légèrement la rente mensuelle du titulaire. Elle fonctionne dans un seul sens : du titulaire vers le bénéficiaire.",
  },
  {
    question: "Quel est le bon âge pour souscrire ?",
    answer:
      "Entre 65 et 75 ans, c'est l'idéal. Avant 60 ans, la rente est trop faible (environ 400 €/mois pour 100 000 € à 55 ans) et il est trop tôt pour immobiliser le capital. Après 80 ans, le risque de santé est plus élevé. L'âge optimal dépend de la santé, des besoins de revenus et de l'existence d'héritiers.",
  },
  {
    question: "Fiscalité : je paie des impôts sur ma rente ?",
    answer:
      "Oui, mais seulement sur une partie. La fraction imposable dépend de l'âge de souscription : 70 % si moins de 50 ans, 50 % entre 50 et 59 ans, 40 % entre 60 et 69 ans, 30 % à partir de 70 ans. Exemple : Paul, 65 ans, reçoit 614 €/mois, fraction imposable 40 %, soit 245,60 €. À TMI 11 %, impôt de 27 €/mois, rente nette 587 €.",
  },
  {
    question: "Comment savoir combien je vais toucher chaque mois ?",
    answer:
      "Utilisez le calculateur gratuit de CalculPatrimoine, basé sur les tables de mortalité INSEE 2021. Ordres de grandeur pour 100 000 € de capital : homme 65 ans → 614 €/mois, homme 70 ans → 766 €/mois, homme 75 ans → 996 €/mois, femme 65 ans → 532 €/mois, femme 70 ans → 671 €/mois.",
  },
]

export const HOWTO_RENTE: { name: string; description: string; totalTime: string; steps: HowToStep[] } = {
  name: "Comment calculer une rente viagère à partir d'un capital",
  description:
    "Estimez votre rente mensuelle à vie à partir d'un capital, avec gestion de la réversion au conjoint, basé sur les tables de mortalité INSEE 2021 unisexes.",
  totalTime: "PT2M",
  steps: [
    {
      name: "Choisissez le mode de calcul",
      text:
        "Trois modes sont disponibles : Calculateur simple (rente individuelle), Calculateur inverse (capital nécessaire pour une rente cible), et Mode couple (comparaison de 9 stratégies pour deux personnes). Choisissez selon votre situation.",
      url: "https://calculpatrimoine.fr/rente-viagere#mode",
    },
    {
      name: "Entrez votre âge",
      text:
        "L'âge détermine votre espérance de vie selon les tables de mortalité INSEE 2021 unisexes. Plus vous êtes jeune, plus le capital est réparti sur une longue durée, donc plus la rente mensuelle est faible. À 70 ans, la rente est environ 25 % plus élevée qu'à 65 ans.",
      url: "https://calculpatrimoine.fr/rente-viagere#age",
    },
    {
      name: "Saisissez le capital à convertir",
      text:
        "Indiquez le montant total à convertir en rente. Il peut s'agir d'une assurance-vie, d'un PER, ou de toute épargne disponible. Attention : ce capital est définitivement cédé à l'assureur. Conservez une réserve en dehors de la rente pour les dépenses imprévues.",
      url: "https://calculpatrimoine.fr/rente-viagere#capital",
    },
    {
      name: "Activez la réversion si vous avez un conjoint",
      text:
        "La réversion permet à votre conjoint de continuer à percevoir une fraction de la rente après votre décès (60 %, 80 % ou 100 %). Elle réduit légèrement le montant mensuel mais protège le survivant. Entrez l'âge du conjoint pour un calcul précis.",
      url: "https://calculpatrimoine.fr/rente-viagere#reversion",
    },
    {
      name: "Lisez votre estimation et le graphique de projection",
      text:
        "Le calculateur affiche la rente mensuelle estimée, l'espérance de vie statistique, le total espéré, et le point mort (âge auquel vous aurez récupéré votre capital). Le graphique montre l'évolution du capital résiduel dans le temps.",
      url: "https://calculpatrimoine.fr/rente-viagere#resultat",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// IFI
// ─────────────────────────────────────────────────────────────

export const FAQ_IFI: FAQSchemaItem[] = [
  {
    question: "Qu'est-ce que l'IFI et qui est concerné ?",
    answer:
      "L'impôt sur la fortune immobilière (IFI) remplace l'ISF depuis 2018. Il est dû par les personnes physiques dont le patrimoine immobilier net dépasse 1 300 000 € au 1er janvier (Art. 964 CGI). Ce seuil concerne le foyer fiscal dans son ensemble. Les résidents français sont taxés sur leur patrimoine immobilier mondial.",
  },
  {
    question: "Quel est le barème IFI 2026 ?",
    answer:
      "Le barème IFI est progressif, inchangé depuis 2018 (Art. 977 CGI) : 0 % de 0 € à 800 000 €, 0,50 % de 800 000 € à 1 300 000 €, 0,70 % de 1 300 000 € à 2 570 000 €, 1,00 % de 2 570 000 € à 5 000 000 €, 1,25 % de 5 000 000 € à 10 000 000 €, 1,50 % au-delà de 10 000 000 €. Chaque taux ne s'applique que sur la fraction correspondante.",
  },
  {
    question: "Comment fonctionne l'abattement de 30 % sur la résidence principale ?",
    answer:
      "La résidence principale bénéficie d'un abattement forfaitaire de 30 % sur sa valeur vénale (Art. 973 CGI), automatiquement, sans démarche particulière. Une résidence estimée à 800 000 € ne compte que pour 560 000 € dans l'IFI. Cet abattement ne s'applique qu'à la résidence principale effective.",
  },
  {
    question: "Qu'est-ce que la décote progressive IFI ?",
    answer:
      "Pour les patrimoines entre 1 300 000 € et 1 400 000 €, une décote atténue l'entrée dans l'IFI. Formule : 17 500 € − 1,25 % × patrimoine net taxable. À 1 300 000 € : décote de 1 250 €. À 1 350 000 € : décote de 625 €. Au-delà de 1 400 000 €, la décote est nulle.",
  },
  {
    question: "Comment fonctionne le plafonnement IFI + IR ?",
    answer:
      "Selon l'Art. 979 CGI, la somme IFI + impôt sur le revenu ne peut excéder 75 % des revenus imposables. Si ce seuil est dépassé, l'IFI est réduit. Exemple : revenus 60 000 €, IR 40 000 €, IFI calculé 15 000 €. Seuil 75 % × 60 000 = 45 000 €. IFI plafonné = 45 000 − 40 000 = 5 000 €.",
  },
  {
    question: "Quelles dettes peut-on déduire dans le calcul de l'IFI ?",
    answer:
      "Sont déductibles les dettes existantes au 1er janvier contractées pour l'acquisition de biens taxables (capital restant dû des emprunts immobiliers), la construction, réparation ou amélioration des biens, et les taxes foncières dues sur les biens au 1er janvier. Les prêts à la consommation non liés aux biens taxables ne sont pas déductibles.",
  },
]

export const HOWTO_IFI: { name: string; description: string; totalTime: string; steps: HowToStep[] } = {
  name: "Comment calculer son IFI 2026",
  description:
    "Simulez votre impôt sur la fortune immobilière 2026 : patrimoine net taxable, abattement résidence principale 30 %, barème progressif, décote et plafonnement IFI + IR.",
  totalTime: "PT5M",
  steps: [
    {
      name: "Saisissez la valeur vénale de vos biens immobiliers",
      text:
        "Entrez la valeur de marché actuelle de chaque bien immobilier : résidence principale, résidences secondaires, biens locatifs, parts de SCPI (à hauteur de la fraction immobilière communiquée par la SCPI). Utilisez des estimations réalistes, pas le prix d'acquisition.",
      url: "https://calculpatrimoine.fr/ifi#actifs",
    },
    {
      name: "Appliquez l'abattement résidence principale",
      text:
        "La résidence principale bénéficie automatiquement d'un abattement de 30 % sur sa valeur vénale (Art. 973 CGI). Le calculateur l'applique dès que vous identifiez votre résidence principale. Un bien estimé à 800 000 € ne compte que pour 560 000 € dans l'IFI.",
      url: "https://calculpatrimoine.fr/ifi#abattement",
    },
    {
      name: "Déduisez vos dettes immobilières",
      text:
        "Renseignez le capital restant dû de vos emprunts immobiliers contractés pour l'acquisition ou les travaux de biens taxables. Les prêts à la consommation et crédits non liés aux biens IFI ne sont pas déductibles.",
      url: "https://calculpatrimoine.fr/ifi#dettes",
    },
    {
      name: "Entrez vos revenus pour le plafonnement",
      text:
        "Indiquez vos revenus imposables et votre IR pour calculer le plafonnement IFI + IR à 75 % des revenus (Art. 979 CGI). Si la somme IFI + IR dépasse ce seuil, l'IFI est automatiquement réduit.",
      url: "https://calculpatrimoine.fr/ifi#plafonnement",
    },
    {
      name: "Lisez votre IFI net après décote et plafonnement",
      text:
        "Le calculateur affiche l'IFI brut par tranche, la décote éventuelle (patrimoines entre 1 300 000 € et 1 400 000 €), le plafonnement IFI + IR si applicable, et l'IFI net à payer.",
      url: "https://calculpatrimoine.fr/ifi#resultat",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// ASSURANCE-VIE FISCALITÉ RACHAT
// ─────────────────────────────────────────────────────────────

export const FAQ_ASSURANCE_VIE: FAQSchemaItem[] = [
  {
    question: "Quelle est la différence entre PFU et IR + PS ?",
    answer:
      "Le PFU (Prélèvement Forfaitaire Unique) est un taux fixe de 30 % (12,8 % impôt + 17,2 % prélèvements sociaux). L'IR + PS correspond à votre TMI + 17,2 %. Comparaison : TMI 0 % → IR + PS = 17,2 % vs PFU 30 % ; TMI 11 % → IR + PS = 28,2 % vs PFU 30 % ; TMI 30 % → IR + PS = 47,2 % vs PFU 30 %. En dessous de TMI 11 %, l'IR est plus avantageux.",
  },
  {
    question: "Comment fonctionne l'abattement de 4 600 € / 9 200 € ?",
    answer:
      "Pour un contrat de plus de 8 ans, vous bénéficiez d'un abattement annuel sur la plus-value taxable : 4 600 € pour une personne seule, 9 200 € pour un couple marié ou pacsé. Cet abattement s'applique chaque année civile. Exemple : vous retirez 20 000 € avec 10 000 € de plus-value ; après abattement de 4 600 €, seuls 5 400 € sont taxés.",
  },
  {
    question: "On taxe le montant du rachat ou seulement la plus-value ?",
    answer:
      "Seule la plus-value est taxée, pas le capital versé. La règle proportionnelle s'applique : plus-value dans le rachat = montant rachat × (plus-value totale ÷ capital total). Exemple : capital 100 000 €, versements 70 000 €, rachat 30 000 € → plus-value dans le rachat = 30 000 × 30 % = 9 000 €. Seuls ces 9 000 € sont taxés.",
  },
  {
    question: "Qu'est-ce que la règle du 27 septembre 2017 ?",
    answer:
      "Les versements effectués avant le 27/09/2017 bénéficient d'un taux d'imposition réduit pour les contrats de plus de 8 ans : 7,5 % d'impôt au lieu de 12,8 %, soit 24,7 % au total avec les prélèvements sociaux, au lieu de 30 %. Cette mesure a été instaurée par la loi de finances 2018.",
  },
  {
    question: "Que se passe-t-il si j'ai versé plus de 150 000 € sur mon contrat ?",
    answer:
      "Au-delà de 150 000 € de versements post-27/09/2017 par personne, le taux préférentiel de 7,5 % ne s'applique plus à l'excédent : c'est le taux standard de 12,8 % qui prend le relais (Art. 125-0 A CGI).",
  },
  {
    question: "Mes données sont-elles stockées ou envoyées quelque part ?",
    answer:
      "Non, absolument pas. Tous les calculs sont effectués localement dans votre navigateur en JavaScript. Aucune donnée n'est envoyée à un serveur, stockée dans une base de données, ou conservée après la fermeture du navigateur.",
  },
]

export const HOWTO_ASSURANCE_VIE: { name: string; description: string; totalTime: string; steps: HowToStep[] } = {
  name: "Comment calculer la fiscalité d'un rachat d'assurance-vie",
  description:
    "Calculez le montant d'impôt sur un rachat partiel ou total d'assurance-vie : règle proportionnelle, PFU vs IR, abattement 8 ans, versements avant 2017.",
  totalTime: "PT3M",
  steps: [
    {
      name: "Renseignez les données de votre contrat",
      text:
        "Saisissez la valeur totale du contrat, le total des versements effectués et la date d'ouverture du contrat. L'ancienneté détermine si vous bénéficiez de l'abattement de 4 600 € (9 200 € pour un couple) applicable après 8 ans.",
      url: "https://calculpatrimoine.fr/assurance-vie/fiscalite-rachat#contrat",
    },
    {
      name: "Indiquez si vous avez versé avant le 27/09/2017",
      text:
        "Les versements effectués avant le 27 septembre 2017 bénéficient d'un taux d'imposition réduit à 7,5 % (au lieu de 12,8 %) pour les contrats de plus de 8 ans. Consultez vos relevés annuels pour identifier ces versements.",
      url: "https://calculpatrimoine.fr/assurance-vie/fiscalite-rachat#versements",
    },
    {
      name: "Entrez le montant du rachat souhaité",
      text:
        "Indiquez le montant que vous souhaitez retirer. Le calculateur applique automatiquement la règle proportionnelle pour déterminer la fraction de plus-value contenue dans ce rachat.",
      url: "https://calculpatrimoine.fr/assurance-vie/fiscalite-rachat#rachat",
    },
    {
      name: "Comparez PFU et IR selon votre TMI",
      text:
        "Entrez votre TMI pour comparer le PFU (30 % forfaitaire) et l'imposition au barème IR + prélèvements sociaux (17,2 %). Le calculateur recommande l'option la moins taxée selon votre situation et affiche la différence chiffrée.",
      url: "https://calculpatrimoine.fr/assurance-vie/fiscalite-rachat#comparaison",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// TRANSMISSION ASSURANCE-VIE
// ─────────────────────────────────────────────────────────────

export const FAQ_TRANSMISSION: FAQSchemaItem[] = [
  {
    question: "Pourquoi l'assurance-vie est-elle avantageuse pour la succession ?",
    answer:
      "L'assurance-vie n'entre pas dans la succession classique. Elle échappe en grande partie aux droits de succession et permet de transmettre des capitaux importants avec des abattements spécifiques. Deux régimes coexistent : Article 990 I du CGI pour les versements avant 70 ans (abattement de 152 500 € par bénéficiaire) et Article 757 B pour les versements après 70 ans (abattement global de 30 500 €).",
  },
  {
    question: "Article 990 I : comment fonctionne l'abattement de 152 500 € ?",
    answer:
      "Pour les versements effectués avant 70 ans, chaque bénéficiaire bénéficie d'un abattement individuel de 152 500 €. Au-delà : 20 % de 152 501 € à 852 500 €, 31,25 % au-delà. Exemple : capital transmis 400 000 €, 2 bénéficiaires, 200 000 € chacun, abattement 152 500 € chacun, taxable 47 500 € × 20 % = 9 500 € chacun, total impôt 19 000 € contre environ 80 000 € en succession classique.",
  },
  {
    question: "Article 757 B : que se passe-t-il pour les versements après 70 ans ?",
    answer:
      "Pour les versements effectués après 70 ans, l'abattement global est de 30 500 €, partagé entre tous les bénéficiaires (sauf conjoint ou partenaire de PACS, exonéré). Au-delà, les versements sont réintégrés dans la succession. Exception : les plus-values générées après 70 ans restent exonérées.",
  },
  {
    question: "Mon conjoint est-il exonéré de droits sur l'assurance-vie ?",
    answer:
      "Oui, totalement. Le conjoint survivant (marié) et le partenaire de PACS sont exonérés de tout droit de succession sur les capitaux décès d'assurance-vie, quel que soit le montant et l'âge des versements, aussi bien dans le cadre de l'Article 990 I que de l'Article 757 B.",
  },
  {
    question: "Vaut-il mieux désigner 1 ou plusieurs bénéficiaires ?",
    answer:
      "Plusieurs bénéficiaires multiplient les abattements dans le cadre de l'Article 990 I. Exemple : capital 500 000 €, 1 bénéficiaire, taxable 347 500 €. Avec 3 bénéficiaires à parts égales (166 666 € chacun), taxable total environ 42 500 €. Le calculateur gère jusqu'à 6 bénéficiaires.",
  },
  {
    question: "C'est quoi la clause bénéficiaire ? Pourquoi est-elle cruciale ?",
    answer:
      "La clause bénéficiaire désigne les personnes qui recevront le capital au décès. Elle prime sur le testament et les règles successorales classiques. Vous pouvez désigner votre conjoint (exonération totale), vos enfants, ou toute personne sans lien de parenté. Une clause non mise à jour après un divorce peut créer des situations indésirables.",
  },
]

export const HOWTO_TRANSMISSION: { name: string; description: string; totalTime: string; steps: HowToStep[] } = {
  name: "Comment calculer les droits de succession d'une assurance-vie",
  description:
    "Simulez la fiscalité successorale de votre assurance-vie : abattement 152 500 € (Art. 990 I) avant 70 ans, abattement 30 500 € (Art. 757 B) après 70 ans, jusqu'à 6 bénéficiaires.",
  totalTime: "PT3M",
  steps: [
    {
      name: "Répartissez les versements avant et après 70 ans",
      text:
        "Indiquez séparément vos versements effectués avant 70 ans et ceux effectués après 70 ans. Ce sont deux régimes fiscaux distincts : Art. 990 I (abattement 152 500 € par bénéficiaire) pour les versements avant 70 ans, Art. 757 B (abattement global 30 500 €) pour les versements après 70 ans.",
      url: "https://calculpatrimoine.fr/assurance-vie/transmission#versements",
    },
    {
      name: "Indiquez la part de plus-value",
      text:
        "Pour les versements après 70 ans, seuls les versements bruts entrent dans l'assiette taxable du 757 B. Les plus-values générées après 70 ans sont exonérées. Entrez la valeur actuelle du contrat et les versements bruts pour calculer automatiquement la plus-value exonérée.",
      url: "https://calculpatrimoine.fr/assurance-vie/transmission#plus-value",
    },
    {
      name: "Renseignez les bénéficiaires et leur quote-part",
      text:
        "Entrez jusqu'à 6 bénéficiaires avec leur part respective. Le conjoint ou partenaire de PACS est totalement exonéré. Pour les autres bénéficiaires, l'abattement de 152 500 € (Art. 990 I) s'applique individuellement à chacun.",
      url: "https://calculpatrimoine.fr/assurance-vie/transmission#beneficiaires",
    },
    {
      name: "Lisez les droits dus par bénéficiaire",
      text:
        "Le calculateur affiche pour chaque bénéficiaire le capital reçu, l'abattement applicable, la base taxable et les droits dus selon le barème Art. 990 I (20 % puis 31,25 %). Il compare également avec la succession classique pour visualiser l'avantage fiscal.",
      url: "https://calculpatrimoine.fr/assurance-vie/transmission#resultat",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// DONATION - DROITS DE MUTATION
// ─────────────────────────────────────────────────────────────

export const FAQ_DONATION: FAQSchemaItem[] = [
  {
    question: "Quels abattements s'appliquent sur une donation en 2026 ?",
    answer:
      "Avant de calculer l'impôt, on retire un abattement de la valeur donnée. Le montant de cet abattement dépend du lien entre celui qui donne et celui qui reçoit (Art. 779 et 790 E CGI) : 100 000 € par parent et par enfant (ligne directe), 80 724 € entre époux ou partenaires de PACS, 31 865 € pour un petit-enfant, 15 932 € entre frères et sœurs, 7 967 € pour un neveu ou une nièce. Un abattement supplémentaire de 159 325 € s'ajoute pour un donataire en situation de handicap (Art. 779-II CGI). Aucun abattement n'est prévu pour les donations à des tiers ou parents éloignés. L'abattement repart à zéro tous les 15 ans (Art. 784 CGI).",
  },
  {
    question: "Comment fonctionne le rappel fiscal de 15 ans ?",
    answer:
      "L'article 784 du CGI prévoit que si vous redonnez à la même personne dans les 15 ans qui suivent un premier don, ce premier don est pris en compte dans le nouveau calcul. L'abattement déjà utilisé n'est plus disponible et le calcul démarre dans une tranche plus haute du barème. Au-delà de 15 ans, le compteur repart à zéro : l'abattement est de nouveau disponible en entier et le barème s'applique à nouveau dès la première tranche.",
  },
  {
    question: "C'est quoi le don familial de sommes d'argent (Art. 790 G CGI) ?",
    answer:
      "L'article 790 G du CGI ajoute 31 865 € d'abattement aux dons en argent (chèque, virement, espèces). Cet abattement s'ajoute à l'abattement personnel et repart à zéro tous les 15 ans. Trois conditions cumulatives : le donateur a moins de 80 ans, le donataire est majeur (ou mineur émancipé), et le don va à un enfant, petit-enfant, arrière-petit-enfant (ou, à défaut de descendant, à un neveu ou une nièce). Le don doit porter sur de l'argent, pas sur un bien immobilier ni sur des actions.",
  },
  {
    question: "Quel est le barème des droits de donation en ligne directe ?",
    answer:
      "Le barème de l'article 777 CGI tableau I s'applique à ce qui reste après abattement (donation - abattements). Il est progressif : chaque taux ne s'applique que sur la part du montant qui tombe dans sa tranche. Détail : 5 % jusqu'à 8 072 €, 10 % de 8 072 € à 12 109 €, 15 % de 12 109 € à 15 932 €, 20 % de 15 932 € à 552 324 €, 30 % de 552 324 € à 902 838 €, 40 % de 902 838 € à 1 805 677 €, 45 % au-delà. Exemple : une donation de 200 000 € d'un parent à un enfant après abattement de 100 000 € génère 18 194 € de droits.",
  },
  {
    question: "Quel barème entre frères et sœurs, et entre neveux et nièces ?",
    answer:
      "Entre frères et sœurs (tableau III de l'art. 777 CGI), le barème est de 35 % jusqu'à 24 430 € de base taxable puis 45 % au-delà, après abattement de 15 932 €. Pour les neveux et nièces et les parents jusqu'au 4e degré (tableau IV), le taux est forfaitaire de 55 % sur toute la base taxable, après abattement de 7 967 € pour les neveux et nièces. Au-delà du 4e degré ou sans lien de parenté, le taux est de 60 % sans abattement.",
  },
  {
    question: "Quelle différence entre donation et succession ?",
    answer:
      "Les abattements personnels (100 000 €, 80 724 €, etc.) et le barème de l'art. 777 CGI sont identiques en donation et en succession. La différence tient au moment du transfert : la donation est consentie du vivant du donateur, la succession au moment de son décès. La donation permet d'anticiper, d'utiliser les abattements plusieurs fois sur 15 ans, et de bénéficier de mécanismes spécifiques (don familial 790 G, démembrement, donation-partage). La succession applique un seul abattement à la date du décès.",
  },
  {
    question: "Faut-il déclarer une donation au fisc ?",
    answer:
      "Oui, les donations doivent être déclarées au service des impôts dans le mois qui suit l'acte (formulaire 2735 pour un don manuel, acte notarié pour une donation par acte). Cette déclaration fait courir le délai de 15 ans pour le rappel fiscal et constitue une date certaine en cas de contestation ultérieure (notamment pour les héritiers réservataires). L'enregistrement génère les droits de donation calculés sur la base taxable après abattements.",
  },
  {
    question: "Mes données sont-elles stockées ou envoyées quelque part ?",
    answer:
      "Non, absolument pas. Tous les calculs sont effectués localement dans votre navigateur. Aucune donnée n'est transmise à un serveur ni conservée après fermeture de la page. Le code source est open-source et vérifiable sur GitHub.",
  },
]

export const HOWTO_DONATION: { name: string; description: string; totalTime: string; steps: HowToStep[] } = {
  name: "Comment calculer les droits de donation en 2026",
  description:
    "Simulez les droits de mutation à titre gratuit dus sur une donation : abattements par lien de parenté (Art. 779), barème (Art. 777), rappel fiscal 15 ans (Art. 784), don familial 790 G.",
  totalTime: "PT3M",
  steps: [
    {
      name: "Entrez le montant de la donation",
      text:
        "Saisissez la valeur en pleine propriété du bien ou des sommes transmises. Pour un bien autre que de l'argent, indiquez sa valeur vénale estimée. Le calcul s'applique à la donation prise isolément ; les donations antérieures sont saisies séparément.",
      url: "https://calculpatrimoine.fr/donation/droits#montant",
    },
    {
      name: "Choisissez le lien de parenté",
      text:
        "Sélectionnez le lien entre donateur et donataire : enfant, parent, petit-enfant, époux/PACS, frère/sœur, neveu/nièce, autre parent jusqu'au 4e degré, ou non-parent. Ce choix détermine l'abattement personnel (Art. 779 / 790 E) et le tableau du barème (Art. 777 CGI) appliqués.",
      url: "https://calculpatrimoine.fr/donation/droits#lien",
    },
    {
      name: "Renseignez les donations antérieures de moins de 15 ans",
      text:
        "Indiquez le total des donations déjà consenties au même donataire dans les 15 dernières années (Art. 784 CGI). L'abattement déjà utilisé est déduit, et les tranches basses du barème déjà parcourues ne sont plus disponibles.",
      url: "https://calculpatrimoine.fr/donation/droits#anterieures",
    },
    {
      name: "Activez les options spécifiques applicables",
      text:
        "Cochez le don familial de sommes d'argent (Art. 790 G CGI) pour ajouter 31 865 € d'abattement si les conditions sont remplies (donateur < 80 ans, donataire majeur, lien éligible). Cochez l'option handicap pour ajouter l'abattement de 159 325 € (Art. 779-II CGI).",
      url: "https://calculpatrimoine.fr/donation/droits#options",
    },
    {
      name: "Lisez les droits dus et le détail des tranches",
      text:
        "Le calculateur affiche le détail des abattements appliqués, la base taxable, les droits dus par tranche, le taux effectif d'imposition, le montant net pour le donataire, et l'économie liée aux abattements.",
      url: "https://calculpatrimoine.fr/donation/droits#resultat",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// PLUS-VALUE IMMOBILIÈRE
// ─────────────────────────────────────────────────────────────

export const FAQ_PLUS_VALUE: FAQSchemaItem[] = [
  {
    question: "Pourquoi IR et prélèvements sociaux ont-ils des abattements différents ?",
    answer:
      "L'IR et les prélèvements sociaux sont deux impôts distincts avec leurs propres barèmes d'exonération. L'IR de 19 % est totalement exonéré après 22 ans de détention (Art. 150 VC CGI). Les prélèvements sociaux de 17,2 % ne le sont qu'après 30 ans (Art. 150 VD CGI). Entre 22 et 30 ans, vous ne payez plus l'IR mais encore une fraction des prélèvements sociaux.",
  },
  {
    question: "Le forfait travaux de 15 % est-il toujours applicable ?",
    answer:
      "Non. Le forfait travaux de 15 % n'est applicable que si le bien est détenu depuis plus de 5 ans complets à la date de cession, et si les travaux concernés n'ont pas déjà été déduits des revenus fonciers. Si vos travaux réels sont supérieurs à 15 %, utilisez les montants réels justifiés par factures.",
  },
  {
    question: "Qu'est-ce que la surtaxe sur les plus-values élevées ?",
    answer:
      "La surtaxe (Art. 1609 nonies G CGI) s'applique en plus de l'IR de 19 % lorsque la plus-value nette imposable dépasse 50 000 €. Barème : 2 % de 50 001 € à 100 000 €, 3 % de 100 001 € à 150 000 €, 4 % de 150 001 € à 200 000 €, 5 % de 200 001 € à 250 000 €, 6 % au-delà de 250 000 €. Elle s'applique après les abattements pour durée de détention.",
  },
  {
    question: "La résidence principale est-elle toujours exonérée ?",
    answer:
      "Oui. La cession de la résidence principale est totalement exonérée de plus-value, quelle que soit la durée de détention (Art. 150 U II 1° CGI). Le bien doit être la résidence habituelle et effective du vendeur au jour de la cession. Un délai raisonnable d'environ 12 mois est admis entre le départ et la vente.",
  },
  {
    question: "Comment la durée de détention est-elle comptée ?",
    answer:
      "La durée est comptée en années complètes entre l'acte d'acquisition et l'acte de cession. Exemple : achat le 15 mars 2020, vente le 10 mars 2026 = 5 ans complets, 0 % d'abattement. Vente le 20 mars 2026 = 6 ans complets, 6 % d'abattement IR. Chaque année d'abattement s'acquiert au jour anniversaire.",
  },
  {
    question: "Que se passe-t-il si je vends à perte (moins-value) ?",
    answer:
      "Aucun impôt n'est dû. La moins-value immobilière des particuliers n'est pas imputable sur d'autres revenus ni reportable sur des cessions futures. Elle est définitivement perdue fiscalement.",
  },
]

// ─────────────────────────────────────────────────────────────
// PEA
// ─────────────────────────────────────────────────────────────

export const FAQ_PEA: FAQSchemaItem[] = [
  {
    question: "Qu'est-ce que le PEA et qui peut en ouvrir un ?",
    answer:
      "Le PEA (Plan d'Épargne en Actions) est une enveloppe fiscale créée en 1992 (Art. 163 quinquies D CGI) qui permet d'investir en actions européennes en bénéficiant d'une exonération d'impôt sur le revenu sur les plus-values après 5 ans. Seuls les prélèvements sociaux (17,2 %) restent dus. Un seul PEA par personne, réservé aux résidents fiscaux français majeurs. Un couple peut détenir deux PEA distincts.",
  },
  {
    question: "Quel plafond de versement sur un PEA ?",
    answer:
      "Trois plafonds selon le type : PEA classique 150 000 €, PEA-PME 225 000 € (titres de PME et ETI européennes), PEA Jeunes 20 000 € (pour les 18-25 ans rattachés au foyer fiscal de leurs parents). Les plafonds se cumulent : un même titulaire peut avoir un PEA classique et un PEA-PME simultanément, jusqu'à 225 000 € au total entre les deux.",
  },
  {
    question: "Quels supports puis-je détenir dans un PEA ?",
    answer:
      "Actions de sociétés ayant leur siège dans l'Union européenne ou l'Espace économique européen, et OPCVM (fonds, ETF) éligibles dès lors qu'ils investissent au moins 75 % en titres européens. Les actions américaines ou asiatiques en direct ne sont pas éligibles, mais des ETF synthétiques permettent une exposition indirecte au S&P 500 ou aux marchés émergents tout en restant dans le PEA.",
  },
  {
    question: "Comment est imposé un retrait avant 5 ans ?",
    answer:
      "Un retrait avant 5 ans entraîne la clôture automatique du PEA et l'imposition des gains au prélèvement forfaitaire unique de 30 % (12,8 % d'impôt sur le revenu + 17,2 % de prélèvements sociaux), sauf cas particuliers : licenciement, invalidité, retraite anticipée, qui n'entraînent que les prélèvements sociaux.",
  },
  {
    question: "Et après 5 ans ?",
    answer:
      "Après 5 ans de détention, les plus-values sont totalement exonérées d'impôt sur le revenu (Art. 157-5° bis CGI). Seuls les prélèvements sociaux de 17,2 % restent dus, calculés sur la fraction de plus-value du retrait. Le PEA reste ouvert et permet de continuer à verser et retirer librement.",
  },
  {
    question: "Les dividendes sont-ils taxés à l'intérieur du PEA ?",
    answer:
      "Non. Tant que les dividendes restent investis dans le PEA, ils ne subissent aucune imposition. Le PEA fonctionne en capitalisation : dividendes et plus-values s'accumulent sans frottement fiscal. L'imposition n'intervient qu'au moment du retrait.",
  },
  {
    question: "Si je fais un retrait après 5 ans, dois-je clôturer le PEA ?",
    answer:
      "Non. Depuis la loi PACTE de 2019, un retrait après 5 ans n'entraîne plus la clôture du PEA. Vous pouvez continuer à verser et retirer librement. Avant la réforme, tout retrait entre 5 et 8 ans interdisait les versements futurs : cette règle a disparu.",
  },
  {
    question: "Qu'est-ce que le passif fiscal latent d'un PEA ?",
    answer:
      "Le passif latent est l'impôt qui serait dû si le PEA était soldé aujourd'hui. Même exonéré d'impôt sur le revenu après 5 ans, le PEA reste assujetti aux prélèvements sociaux de 17,2 % sur la fraction de plus-value. Sur un PEA à 100 000 € dont 40 000 € de plus-value latente, le passif est de 40 000 × 17,2 % = 6 880 €. Cette information complète la valeur brute affichée par le courtier.",
  },
  {
    question: "Le PEA est-il imposé à la succession ?",
    answer:
      "Le PEA est clôturé au décès du titulaire. Les prélèvements sociaux dus à la date du décès sont calculés sur les plus-values latentes (sans IR car régime applicable au-delà de 5 ans considéré acquis). Les titres ou liquidités sont ensuite transmis aux héritiers, qui subissent les droits de succession classiques (Art. 779 CGI) sur la valeur nette des prélèvements sociaux.",
  },
  {
    question: "Mes données sont-elles stockées quelque part ?",
    answer:
      "Non. Tous les calculs sont effectués localement dans votre navigateur. Aucune donnée n'est transmise à un serveur ni conservée après fermeture de la page. Le code source est ouvert et vérifiable sur GitHub.",
  },
]

// ─────────────────────────────────────────────────────────────

export const HOWTO_PLUS_VALUE: { name: string; description: string; totalTime: string; steps: HowToStep[] } = {
  name: "Comment calculer la plus-value immobilière sur une résidence secondaire",
  description:
    "Simulez l'imposition de votre plus-value immobilière : IR 19 %, prélèvements sociaux 17,2 %, abattements par durée de détention, surtaxe et exonérations.",
  totalTime: "PT5M",
  steps: [
    {
      name: "Entrez le prix d'acquisition et la date d'achat",
      text:
        "Saisissez le prix d'achat du bien et la date de l'acte notarié d'acquisition. La date détermine la durée de détention exacte en années complètes, qui conditionne les abattements pour l'IR et les prélèvements sociaux.",
      url: "https://calculpatrimoine.fr/plus-value-immobiliere#acquisition",
    },
    {
      name: "Ajoutez les frais d'acquisition",
      text:
        "Ajoutez les frais d'acquisition : droits d'enregistrement et frais de notaire. Vous pouvez utiliser le forfait de 7,5 % du prix d'achat ou entrer vos frais réels si supérieurs. Ces frais augmentent le prix de revient et réduisent la plus-value imposable.",
      url: "https://calculpatrimoine.fr/plus-value-immobiliere#frais",
    },
    {
      name: "Déduisez les travaux réalisés",
      text:
        "Renseignez vos travaux de construction, agrandissement ou amélioration (sur justificatifs). Si le bien est détenu depuis plus de 5 ans, vous pouvez utiliser le forfait de 15 % du prix d'achat pour les travaux non déduits des revenus fonciers, sans justificatif.",
      url: "https://calculpatrimoine.fr/plus-value-immobiliere#travaux",
    },
    {
      name: "Entrez le prix de vente",
      text:
        "Saisissez le prix de cession figurant dans l'acte de vente. Le calculateur calcule la plus-value brute (prix de vente − prix de revient ajusté), puis applique les abattements selon la durée de détention pour obtenir les bases imposables IR et prélèvements sociaux.",
      url: "https://calculpatrimoine.fr/plus-value-immobiliere#vente",
    },
    {
      name: "Lisez l'impôt total et la surtaxe éventuelle",
      text:
        "Le calculateur affiche l'IR de 19 % et les prélèvements sociaux de 17,2 % après abattements, la surtaxe éventuelle si la plus-value nette IR dépasse 50 000 €, et l'impôt total à payer. Le notaire prélèvera ce montant directement sur le prix de vente.",
      url: "https://calculpatrimoine.fr/plus-value-immobiliere#resultat",
    },
  ],
}
