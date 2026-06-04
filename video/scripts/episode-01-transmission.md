# Épisode 01 — Transmission : 56 677 €, ou zéro. Vous décidez.

**Durée cible** : 13-14 min
**Sujet** : transmission de patrimoine, leviers fiscaux (abattement Art. 779, donation 15 ans Art. 784, AV avant/après 70 ans Art. 990 I et 757 B)
**Cas central** : Pierre, 62 ans, marié, 2 enfants adultes, 800 000 € de patrimoine
**Source des calculs** : `src/lib/transmission.ts`, `src/lib/succession.ts` (chiffres validés via vitest le 2026-06-04)
**Mode rédaction** : Strict anti-conseil (cf. mémoire `feedback_anti_conseil_video.md`)
**Ton** : voix Nicolas oral — quelqu'un qui parle, pas qui lit.

---

## Chiffres validés des 3 scénarios

**Base commune** : Pierre 62 ans aujourd'hui, décès à 80 ans dans tous les cas, patrimoine 800 000 € (RP 477 050 + AV 300 000 + Livret A 22 950), marié, 2 enfants. Bénéficiaires AV : Marie 50 % + Thomas 50 %.

| Scénario | Comportement entre 62 et 80 ans | Succession classique | AV | TOTAL droits |
|---|---|---|---|---|
| **1** | Rien anticipé. AV continue d'être alimentée après 70 ans | 6 388 € | 50 289 € | **56 677 €** |
| **2** | Donations échelonnées (200 k€ à 47 ans + 200 k€ à 62 ans). AV toujours alimentée après 70 ans | 0 € | 50 289 € | **50 289 €** |
| **3** | Donations échelonnées + Pierre stoppe ses versements AV avant 70 ans | 0 € | 0 € | **0 €** |

**Leçon narrative** : dans le profil Pierre, le levier dominant est la date des versements en AV (économie 50 289 €), pas les donations (économie 6 388 €). Les deux leviers combinés font basculer le calcul à zéro.

---

## Notation du script

- `[VISUEL]` : indication visuelle pour le composant Remotion correspondant
- `[CHARTE]` : couleur, police, ton spécifiques (bleu marine `#2E4A6F`, doré `#D4AF37`, beige fond `#F7F3EC`)
- `[BEAT]` : pause respiration dans la voix off
- Texte courant = voix off

---

## ACTE 0 — Hook (00:00 – 00:30)

[VISUEL : écran beige `#F7F3EC`. Au centre, un grand nombre qui s'écrit : "56 677 €" en bleu marine, police serif Playfair. Sous-titre mono Lora : "Droits de succession à payer."]

Voici Pierre. 62 ans, marié, deux enfants adultes. Sa maison est payée, son Livret A est rempli, et il a une assurance-vie. Total du patrimoine : 800 000 euros. Une vie de travail.

[BEAT]

Dans cet épisode, Pierre vit jusqu'à 80 ans. Toujours. Dans les trois scénarios qu'on va dérouler ensemble, il meurt à 80 ans, sur le même patrimoine. Seule la variable change : ce qu'il fait — ou ne fait pas — entre maintenant et son décès.

[VISUEL : trois cards apparaissent côte à côte, mono Lora :
- Scénario 1 : "Pierre n'anticipe rien"
- Scénario 2 : "Pierre fait des donations, mais continue à alimenter son AV après 70 ans"
- Scénario 3 : "Pierre fait des donations ET stoppe les versements AV avant 70 ans"]

Trois scénarios. Trois résultats.

[VISUEL : sous chaque card, un montant apparaît : "56 677 €", "50 289 €", "0 €"]

Dans le premier, ses enfants paieront 56 677 euros au fisc. Dans le deuxième, 50 289 euros. Dans le troisième, zéro euro.

[BEAT]

Sur le même patrimoine. Même décès à 80 ans. Écart entre les deux extrêmes : 56 677 euros.

[VISUEL : caption en bas, mono Lora : "56 677 € d'écart sur le même patrimoine"]

Ce n'est pas un conseil, c'est un calcul. Alors voyons comment il fonctionne.

---

## ACTE 1 — Scénario 1 : Pierre n'anticipe rien (00:30 – 03:30)

### Scène 1.1 — Pose du cas (00:30 – 01:00)

[VISUEL : `<Persona Pierre>` apparaît à gauche. Texte mono Lora à côté : "Pierre, 62 ans". Puis arrive sa conjointe. Puis deux enfants. La famille se stabilise.]

Donc Pierre. 62 ans, marié à Catherine depuis 35 ans. Deux enfants : Marie, 34 ans, et Thomas, 31 ans.

[VISUEL : un panneau apparaît à droite, listing du patrimoine en mono Lora, chaque ligne s'écrit au rythme de la voix off :
- Résidence principale (payée) : 477 050 €
- Assurance-vie : 300 000 €
- Livret A (rempli, au plafond) : 22 950 €
- **Total : 800 000 €**]

Trois choses dans son patrimoine. Sa maison, payée : 477 050 euros. Son assurance-vie : 300 000. Et son Livret A, rempli à plafond : 22 950 euros — c'est le maximum autorisé sur un Livret A depuis 2013.

[BEAT]

Total : 800 000 euros.

[BEAT]

Dans ce premier scénario, Pierre n'anticipe rien. Pas de donation, pas de testament particulier, pas d'optimisation. Il continue à vivre normalement jusqu'à 80 ans, et il alimente son assurance-vie comme il l'a toujours fait — y compris après ses 70 ans. On est dans le cas par défaut. Celui où la facture fiscale arrive aux enfants le jour des obsèques, sans qu'on ait pu rien anticiper avant.

### Scène 1.2 — Le décès et la part des enfants (01:00 – 01:45)

[VISUEL : transition. `<Persona Pierre>` disparaît avec une fade discrète. Le patrimoine hors AV de 500 000 € (RP + Livret A) se sépare en deux flux animés : 50 % vers Catherine (conjoint exonéré, Loi TEPA 2007 — annoté discrètement), 50 % réparti entre les deux enfants]

À 80 ans, Pierre décède. Maintenant, qu'est-ce qui se passe ?

D'abord, on met de côté l'assurance-vie — elle a son propre régime, on y revient juste après. Donc on travaille sur ce qui reste : la maison plus le Livret A. 500 000 euros au total.

Pierre et Catherine étaient mariés en communauté. Donc la moitié du patrimoine appartenait déjà à Catherine de son vivant — ce n'est pas un héritage, c'est sa part à elle. 250 000 euros, qui restent simplement entre ses mains.

L'autre moitié — les 250 000 euros qui appartenaient à Pierre — passe aux enfants. Marie et Thomas se la partagent. 125 000 euros chacun.

[VISUEL : annotation discrète "Art. 796-0 bis CGI — Loi TEPA 2007" en mono Lora pâle, en bas d'écran]

Catherine, dans ce scénario simplifié, ne récupère rien de la part de Pierre. Si elle en récupérait — c'est possible juridiquement — elle serait totalement exonérée au titre de la Loi TEPA de 2007, article 796-0 bis du Code général des impôts. On reverra ce cas dans un futur épisode.

[VISUEL : deux barres de 125 000 € apparaissent côte à côte, une pour Marie, une pour Thomas]

### Scène 1.3 — L'abattement personnel (01:45 – 02:15)

[VISUEL : sur chaque barre de 125 000 €, une fraction de 100 000 € se sépare visuellement et s'éclaire en bleu marine. Caption : "Abattement Art. 779 CGI : 100 000 € par enfant par parent"]

Et là, la loi prévoit un coup de pouce. Chaque enfant a droit à un abattement de 100 000 euros sur la part reçue de chaque parent. C'est l'article 779 du Code général des impôts.

Donc sur les 125 000 euros reçus, 100 000 sont exonérés. Il reste 25 000 euros taxables, pour chaque enfant.

### Scène 1.4 — L'application du barème (02:15 – 03:00)

[VISUEL : `<BaremeProgressif>`. Les 7 tranches du barème ligne directe Art. 777 CGI apparaissent verticalement, en mono Lora :
- 0 – 8 072 € : 5 %
- 8 072 – 12 109 € : 10 %
- 12 109 – 15 932 € : 15 %
- 15 932 – 552 324 € : 20 %
- 552 324 – 902 838 € : 30 %
- 902 838 – 1 805 677 € : 40 %
- au-delà : 45 %

Les 25 000 € taxables descendent dans le barème, les tranches concernées s'éclairent à mesure]

Maintenant, sur ces 25 000 euros, on applique le barème. Le barème est progressif. Article 777 du CGI.

[Au fur et à mesure que les tranches s'éclairent, les calculs apparaissent en mono Lora à droite]

Première tranche, jusqu'à 8 072 euros : 5 %. Ça fait 404 euros.

Deuxième tranche : 10 %. Encore 404 euros.

Troisième : 15 %. 574 euros.

Et le reste, jusqu'à 25 000 euros, c'est la tranche à 20 %. 1 814 euros.

[VISUEL : le total apparaît : "3 194 € par enfant"]

On additionne tout ça, et on tombe sur 3 194 euros par enfant.

[VISUEL : le chiffre x2 apparaît, puis le total global : "6 388 € pour les deux enfants". Puis caption "Mais ce n'est qu'une partie de l'histoire."]

Fois deux, parce qu'on a deux enfants : 6 388 euros. Sauf que ce calcul ne couvre que la résidence et le Livret A. Il reste l'assurance-vie. Et l'assurance-vie, c'est une autre histoire.

### Scène 1.5 — L'assurance-vie versée après 70 ans (03:00 – 03:45)

[VISUEL : focus sur le panneau "Assurance-vie : 300 000 €". À côté, annotation : "Bénéficiaires : Marie + Thomas (50 % / 50 %)" en mono Lora]

Petite précision importante avant d'attaquer le calcul : sur l'assurance-vie de Pierre, la clause bénéficiaire désigne ses deux enfants à parts égales. Marie 50 %, Thomas 50 %. Pas Catherine.

[BEAT]

C'est un choix fréquent chez les parents qui veulent que leurs enfants profitent directement du régime fiscal favorable de l'assurance-vie, sans passage par le conjoint. Si Catherine était bénéficiaire à la place, le calcul serait différent — on y revient en fin de vidéo.

[VISUEL : focus revient sur le panneau. Annotation : "Versements continués après les 70 ans de Pierre"]

L'assurance-vie de Pierre, donc : 300 000 euros. Dans ce scénario, il a continué à l'alimenter après ses 70 ans — par habitude, comme beaucoup de gens. Et là, le régime change complètement.

Article 757 B du Code général des impôts : les versements après 70 ans rentrent dans le calcul de la succession, comme s'ils faisaient partie du patrimoine ordinaire. Avec un abattement global de 30 500 euros pour l'ensemble des bénéficiaires confondus.

[VISUEL : 300 000 € — 30 500 € = 269 500 €, animation. Puis répartition entre Marie et Thomas : 134 750 € par enfant]

Donc 269 500 euros taxables. Répartis entre les deux enfants à parts égales : 134 750 euros chacun.

[VISUEL : application du barème sur la part de chaque enfant. Total : 25 144 € par enfant]

On applique le barème ligne directe sur cette part, et ça donne 25 144 euros de droits par enfant.

[VISUEL : x2 → 50 289 €. Puis grand total qui s'écrit en bleu marine : "56 677 €"]

Fois deux : 50 289 euros sur l'assurance-vie. Et si on additionne avec les 6 388 euros de la succession classique, on obtient le total général : 56 677 euros de droits de succession pour les enfants de Pierre. Voilà le point de départ.

---

## ACTE 2 — Scénario 2 : Pierre fait des donations, mais continue à alimenter son AV après 70 ans (03:30 – 06:30)

### Scène 2.1 — La règle des 15 ans (03:30 – 04:30)

[VISUEL : transition. Card en haut de l'écran : "Scénario 2 — Pierre meurt à 80 ans, donations échelonnées, AV alimentée après 70 ans"]

On reprend le même Pierre, même patrimoine, même décès à 80 ans. Mais cette fois, il a fait une chose en plus : des donations échelonnées à ses enfants. L'assurance-vie, en revanche, continue d'être alimentée après 70 ans, comme dans le scénario 1.

[BEAT]

[VISUEL : transition. `<FriseAbattements>`. Une timeline horizontale apparaît sur 30 ans. Une barre verticale "Abattement 100 000 €" en bleu marine. Au bout de 15 ans, une nouvelle barre identique apparaît, soulignant le rechargement]

Premier levier. Et il s'appuie sur une mécanique fiscale qui surprend toujours.

L'abattement de 100 000 euros par enfant et par parent, ce n'est pas un montant unique pour toute une vie. Il se recharge.

Tous les 15 ans, le compteur repart à zéro. C'est l'article 784 du CGI. Chaque parent peut transmettre 100 000 euros à chaque enfant, en exonération totale, puis recommencer 15 ans plus tard.

[VISUEL : la timeline montre maintenant deux abattements pleins, à 15 ans d'intervalle. Caption mono Lora : "Article 784 CGI — Rappel fiscal des 15 ans"]

[BEAT]

Et ça vaut autant pour la donation que pour la succession. La donation de son vivant utilise l'abattement tout de suite. La succession l'utilise au décès. Et si une donation a eu lieu il y a plus de 15 ans, le fisc ne la compte plus dans le calcul de la succession. Elle disparaît du radar.

### Scène 2.2 — Application au cas Pierre (04:30 – 05:30)

[VISUEL : retour au cas Pierre. Hypothèse alternative : Pierre fait une donation à 47 ans (il y a 15 ans dans ce scénario)]

Alors regardons ce que ça donne sur Pierre. Scénario alternatif.

À 47 ans, Pierre fait une donation de 200 000 euros à ses enfants. 100 000 chacun. L'abattement s'applique en plein. Zéro euro de droits.

[VISUEL : flèche horizontale entre "47 ans" et "62 ans", caption "15 ans plus tard"]

15 ans plus tard, Pierre a maintenant 62 ans. Il fait une seconde donation : encore 200 000 euros, 100 000 par enfant. L'abattement s'est rechargé entre-temps. Donc, à nouveau, zéro euro de droits.

[VISUEL : caption synthèse : "Total transmis hors succession : 400 000 €, droits payés : 0 €"]

Au total : 400 000 euros transmis hors succession, sans un euro de droits.

### Scène 2.3 — Recalcul de la succession (05:30 – 06:30)

[VISUEL : revenir au patrimoine. Maintenant : 500 000 € de patrimoine hors AV au départ, moins 400 000 € donnés, il reste 100 000 € à transmettre au décès. La moitié pour Catherine (exonérée), l'autre moitié pour les enfants : 50 000 € au total, soit 25 000 € par enfant]

Au décès de Pierre, qu'est-ce qui reste à transmettre, hors assurance-vie ? 100 000 euros.

[VISUEL : `<BarresComparatives>`, deux barres face à face :
- Gauche : "Scénario 1 — rien fait" : 56 677 €
- Droite : "Scénario 2 — donations échelonnées" : à calculer]

Catherine reçoit la moitié, exonérée. Les enfants se partagent les 50 000 euros restants. 25 000 par enfant.

[BEAT]

Et là, attention au timing. Si le décès intervient plus de 15 ans après la dernière donation, l'abattement de 100 000 euros s'est rechargé une nouvelle fois. Sinon, la donation reste comptée dans le calcul — comme si elle venait d'être faite.

[VISUEL : à droite de la barre comparative, hypothèse explicite : "Décès 15+ ans après dernière donation"]

Prenons le cas où le décès arrive plus de 15 ans après la dernière donation. La part de chaque enfant — 25 000 euros — est entièrement absorbée par l'abattement de 100 000 euros. Droits sur la succession classique : zéro.

[VISUEL : la barre droite se complète. Mais l'assurance-vie versée après 70 ans est toujours là. Caption "+ assurance-vie 757 B : 50 289 €"]

Mais l'assurance-vie versée après 70 ans, elle, reste imposable au titre du 757 B. 50 289 euros de droits sur cette partie. Rien n'a changé sur l'AV.

[VISUEL : total scénario 2 : 50 289 € — barres comparées : 56 677 € vs 50 289 €. Écart : 6 388 € économisés.]

Total du scénario 2 : 50 289 euros. À comparer aux 56 677 du scénario par défaut. Économie : 6 388 euros.

[BEAT]

C'est moins spectaculaire qu'on pourrait le croire. Et c'est instructif. Sur le profil de Pierre — patrimoine moyen avec une grosse part en assurance-vie — chaque enfant n'hérite que de 25 000 euros sur la succession classique. C'est déjà sous l'abattement de 100 000 euros. Donc le levier des donations ne fait gagner que les 6 388 euros de droits sur cette partie. Pas plus.

[BEAT]

Le gros morceau, c'est l'assurance-vie. Et c'est là qu'on attaque le deuxième levier.

---

## ACTE 3 — Scénario 3 : Pierre fait des donations ET stoppe les versements AV avant 70 ans (06:30 – 10:30)

### Scène 3.1 — Avant 70 ans, l'article 990 I (06:30 – 07:30)

[VISUEL : transition. Card en haut de l'écran : "Scénario 3 — Pierre meurt à 80 ans, donations échelonnées, AV stoppée avant 70 ans"]

Troisième et dernier scénario. Toujours le même Pierre, même décès à 80 ans, mêmes donations échelonnées. Mais cette fois, il fait une chose supplémentaire : il arrête d'alimenter son assurance-vie avant ses 70 ans. Le contrat reste ouvert, l'argent fructifie, mais plus aucun versement après son anniversaire des 70.

[BEAT]

[VISUEL : `<FluxCapital>`. À gauche, un flux "versements assurance-vie". Au milieu, une boîte "Succession". À droite, "Bénéficiaires". Animation : les versements avant 70 ans contournent visuellement la boîte "Succession" et arrivent directement aux bénéficiaires]

Deuxième levier : la date des versements en assurance-vie. Et là, on a un statut fiscal très particulier.

Les versements faits avant les 70 ans du souscripteur sont hors succession. Hors. Succession. Ils contournent purement et simplement le calcul des droits.

Article 990 I du CGI : chaque bénéficiaire désigné a droit à un abattement de 152 500 euros sur les capitaux reçus de l'assurance-vie. Au-delà, c'est 20 % jusqu'à 700 000 euros, puis 31,25 % au-dessus.

[VISUEL : caption mono Lora "Art. 990 I CGI — 152 500 € d'abattement par bénéficiaire"]

Point essentiel : l'abattement est par bénéficiaire, pas global. Pour Pierre, avec deux bénéficiaires — Marie et Thomas — ça représente 305 000 euros d'abattement total. Sur l'assurance-vie seule.

### Scène 3.2 — Après 70 ans, l'article 757 B (07:30 – 08:30)

[VISUEL : nouvelle animation. Cette fois, les versements après 70 ans sont absorbés par la boîte "Succession" et entrent dans le calcul des droits de succession classiques]

Maintenant, qu'est-ce qui se passe pour les versements faits après 70 ans ? Le régime change complètement. Article 757 B.

L'abattement tombe à 30 500 euros. Et il devient global, pour tous les bénéficiaires confondus. Pas par bénéficiaire. Pour tout le monde, ensemble.

[VISUEL : comparaison côte à côte des deux abattements :
- "Avant 70 ans (Art. 990 I) : 152 500 € par bénéficiaire"
- "Après 70 ans (Art. 757 B) : 30 500 € global"]

Pour Pierre, avec deux bénéficiaires : 305 000 euros d'abattement si les versements sont avant 70 ans, contre 30 500 si c'est après. Écart : 274 500 euros d'abattement perdu, juste sur la date des versements.

[BEAT]

Une nuance quand même : pour les versements après 70 ans, les intérêts générés par l'assurance-vie restent, eux, totalement exonérés. C'est uniquement les versements qui passent dans la succession.

### Scène 3.3 — Recalcul de l'AV dans le scénario 3 (08:30 – 09:30)

[VISUEL : retour au cas Pierre du scénario 3. AV de 300 000 € entièrement versée avant 70 ans]

Donc on revient au scénario 3 de Pierre. Tout a été versé avant 70 ans, plus rien après. Conséquence directe : c'est l'article 990 I qui s'applique, pas le 757 B.

[VISUEL : 300 000 € — 305 000 € d'abattement (152 500 × 2) = 0 €. Animation : la boîte "Droits" reste vide]

300 000 euros répartis entre Marie et Thomas, donc 150 000 chacun. Chaque part est en dessous de l'abattement de 152 500. Droits payés sur l'assurance-vie : zéro.

[VISUEL : caption "Économie sur l'AV : 50 289 €"]

Économie sur la partie assurance-vie : 50 289 euros. Juste sur la date des versements. C'est le gros morceau qu'on cherchait.

### Scène 3.4 — Synthèse des trois scénarios (09:30 – 10:30)

[VISUEL : `<BarresComparatives>`. Trois barres côte à côte :
- Scénario 1 : "Pierre n'anticipe rien" : 56 677 €
- Scénario 2 : "Donations + AV après 70 ans" : 50 289 €
- Scénario 3 : "Donations + AV stoppée avant 70 ans" : 0 €]

On récapitule les trois scénarios côte à côte. Même Pierre, même 80 ans, même 800 000 euros de patrimoine.

Scénario 1, rien anticipé : 56 677 euros de droits.

Scénario 2, donations échelonnées sur 15 ans mais AV toujours alimentée après 70 ans : 50 289 euros. L'écart avec le scénario 1 vient uniquement de l'abattement personnel récupéré sur la succession classique.

Scénario 3, donations échelonnées plus AV stoppée avant les 70 ans : zéro euro de droits.

[BEAT]

L'écart entre le scénario 1 et le scénario 3 : 56 677 euros. Sur le même patrimoine, même décès à 80 ans.

[BEAT]

Point important pour comprendre ce calcul : dans le cas Pierre, le levier dominant n'est pas les donations. C'est la date des versements en assurance-vie. Les donations seules économisent 6 388 euros. Arrêter les versements AV avant 70 ans économise 50 289 euros. La combinaison des deux fait basculer le calcul à zéro.

---

## ACTE 4 — Démo calculateur (10:30 – 12:00)

[VISUEL : transition vers une capture d'écran vidéo du site CalcPatrimoine. URL visible : `calcpatrimoine.fr/transmission`. Le calculateur de transmission est ouvert]

Tous ces calculs, vous pouvez les refaire directement sur les calculateurs de CalcPatrimoine. Deux calculateurs s'enchaînent : le calculateur succession pour la résidence et le Livret A, le calculateur transmission pour l'assurance-vie.

[VISUEL : capture animée. Saisie en direct des chiffres de Pierre dans le calculateur. Le résultat s'affiche en temps réel]

On entre les paramètres de Pierre. Patrimoine hors assurance-vie : 500 000 euros. Catherine 250 000, Marie 125 000, Thomas 125 000. Et le calculateur applique automatiquement les articles 777, 779, 796-0 bis, et la Loi TEPA.

[BEAT]

[VISUEL : le résultat s'affiche : 3 194 € par enfant, total 6 388 €. Le même chiffre annoncé.]

Le résultat tombe : 6 388 euros sur la succession classique. Exactement les chiffres qu'on vient de calculer à la main.

[VISUEL : passage au calculateur transmission AV. Saisie : capital 300 000, versements après 70 ans : 300 000. Bénéficiaires Marie 50 %, Thomas 50 %]

On passe au calculateur transmission AV. On entre 300 000 euros en versements après 70 ans. Bénéficiaires : Marie 50 %, Thomas 50 %. Résultat : 50 289 euros.

[VISUEL : démonstration de la modification : passer "versements après 70 ans" à "versements avant 70 ans" dans le formulaire. Le résultat se met à jour]

Et là, regardez. On bascule les 300 000 euros en "versements avant 70 ans" au lieu de "versements après 70 ans". Une seule modification. Et le résultat passe de 50 289 euros à zéro. C'est le calculateur qui montre l'effet de chaque levier, indépendamment.

---

## ACTE 5 — Nuances et garde-fous (12:00 – 13:30)

[VISUEL : retour à l'environnement Remotion. Fond beige. Texte sobre, mono Lora. Pas de personnages, juste les nuances en typographie]

Maintenant, quelques nuances importantes avant de conclure.

### Scène 5.1 — La donation est définitive (12:00 – 12:30)

D'abord : la donation est juridiquement définitive. Une fois faite, le donateur ne peut pas reprendre les sommes données. Le mécanisme suppose qu'il garde assez de patrimoine pour vivre jusqu'à la fin de sa vie. Ça ne se décide pas à la légère.

### Scène 5.2 — L'exonération du conjoint ne change pas selon les leviers (12:30 – 12:50)

Deuxième point : l'exonération totale du conjoint survivant prévue par la Loi TEPA s'applique dans tous les cas. Les leviers qu'on vient de voir ne concernent que la part transmise aux enfants ou à d'autres bénéficiaires.

### Scène 5.3 — Le profil de Pierre n'est pas universel (12:50 – 13:10)

Troisième point, et celui-là est important : le levier dominant dépend du profil. Dans le cas Pierre, l'assurance-vie pèse 37 % du patrimoine. C'est le levier dominant. Pour quelqu'un dont l'AV serait à 5 % du patrimoine, le levier dominant deviendrait les donations. Selon la façon dont chacun a réparti son patrimoine entre maison, assurance-vie, livrets, le calcul change complètement.

### Scène 5.4 — Le choix des bénéficiaires de l'assurance-vie est déterminant (13:10 – 13:50)

Et dernier point — c'est le point qu'on a posé en début de vidéo et qui change tout : la clause bénéficiaire de l'assurance-vie.

L'abattement de 152 500 euros s'applique par bénéficiaire. Donc plus la clause désigne de bénéficiaires distincts, plus on additionne d'abattements.

[VISUEL : `<BarresComparatives>`. Trois barres avec le scénario A décliné selon la clause bénéficiaire :
- "Marie + Thomas seuls bénéficiaires" : 56 677 €
- "Catherine 50 % + enfants 25 % / 25 %" : 26 677 €
- "Catherine 100 % bénéficiaire" : 6 388 €
Caption mono Lora : "Mêmes chiffres, même AV, trois clauses différentes."]

Sur le scénario par défaut de Pierre — AV 300 000 versée après 70 ans, rien d'autre n'a changé — voilà ce que donnent trois rédactions différentes de la clause.

Clause "à mes enfants par parts égales" : 56 677 euros de droits totaux. C'est notre scénario 1.

Clause partagée, Catherine 50 % et les enfants 25 % chacun : 26 677 euros.

Et clause "à mon conjoint" — Catherine 100 % bénéficiaire : 6 388 euros. L'AV ne paie aucun droit, parce que Catherine est exonérée au titre de la Loi TEPA.

[BEAT]

Trois rédactions, trois résultats. Mais attention au piège : si Catherine reçoit 100 % de l'AV au décès de Pierre, l'argent devient le sien. Et le jour où Catherine décède à son tour, ces 300 000 euros entrent dans SA succession, transmis aux enfants. Avec, cette fois, le barème classique de succession. Sans l'abattement spécial de l'assurance-vie. C'est un autre calcul, à un autre moment. On le traitera dans un prochain épisode.

---

## OUTRO (13:30 – 14:00)

[VISUEL : fond beige `#F7F3EC`. Logo CalcPatrimoine au centre. URL : `calcpatrimoine.fr/transmission`. Bouton CTA d'abonnement à la chaîne]

Cet épisode présente un cas chiffré à titre pédagogique. Il ne constitue pas un conseil patrimonial personnalisé.

Le calculateur transmission, et le calculateur succession qu'on a évoqués sont accessibles gratuitement sur calcpatrimoine.fr. Code source ouvert, zéro donnée conservée, aucune inscription.

[BEAT]

Et pour ne pas rater les prochains calculs, l'abonnement à la chaîne, c'est juste en dessous.

---

## Annexes — pour la prod Remotion

### Composants Remotion à créer pour cet épisode

| Composant | Apparitions | Props clés |
|---|---|---|
| `<Persona>` | Acte 1 (Pierre, Catherine, Marie, Thomas) | `{nom, age, role, genre, tranche, highlight?, decede?, showAnnotation?}` — voir `video/specs/personas.md` pour la spec complète (flat-design, code couleur des rôles, animations) |
| `<MontantAnime>` | Hook, transitions, finales | `{valeur, unite, couleur, animation}` |
| `<BaremeProgressif>` | Acte 1.4 | `{tranches[], baseTaxable, source}` |
| `<FriseAbattements>` | Acte 2.1 | `{abattement, periode, evenements[]}` |
| `<FluxCapital>` | Acte 3.1, 3.2 | `{source, destinations[], boites[]}` |
| `<BarresComparatives>` | Acte 2.3, 3.4 | `{barres[]}` |
| `<DemoCalculateurCapture>` | Acte 4 | `{src, poster}` (capture vidéo .mp4) |
| `<LowerThird>` | partout | `{titre, sousTitre, sourceArticle}` |
| `<TitreActe>` | transitions | `{numero, titre}` |
| `<Disclaimer>` | Acte 5.4, Outro | (statique) |

### Audio voix off

- Génération externe via outil de clonage (ElevenLabs, PlayHT, ou équivalent)
- Fichier final : `video/src/audio/episode-01.mp3`
- Découpe en segments par acte si plus pratique : `episode-01-acte0.mp3`, etc.
- Synchronisation Remotion : `useAudioData` + `getAudioDurationInSeconds`

### Sources légales citées dans l'épisode

- Art. 777 du CGI — Barème progressif des droits de succession ligne directe
- Art. 779 du CGI — Abattement personnel de 100 000 € par enfant et par parent
- Art. 784 du CGI — Rappel fiscal des 15 ans
- Art. 796-0 bis du CGI — Exonération du conjoint survivant (Loi TEPA 2007)
- Art. 990 I du CGI — Régime fiscal des versements en assurance-vie avant 70 ans
- Art. 757 B du CGI — Régime fiscal des versements en assurance-vie après 70 ans

---

## Cohérence avec le site

- Cas Pierre = cohérent avec les exemples des calculateurs succession et transmission
- Chiffres = validés via `src/lib/succession.ts` + `src/lib/transmission.ts` (exécution vitest, 2026-06-04)
- Ton = aligné `feedback_voix_nicolas.md` + `feedback_anti_conseil_video.md`
- CTA outro = `calcpatrimoine.fr/transmission` et `calcpatrimoine.fr/succession`
