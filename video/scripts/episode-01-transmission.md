# Épisode 01 — Transmission : 60 288 €, ou zéro. Vous décidez.

**Durée cible** : 13-14 min
**Sujet** : transmission de patrimoine, leviers fiscaux (abattement Art. 779, donation 15 ans Art. 784, AV avant/après 70 ans Art. 990 I et 757 B)
**Cas central** : Pierre, 62 ans, marié, 2 enfants adultes, 800 000 € de patrimoine
**Source des calculs** : `src/lib/transmission.ts` + `src/lib/succession.ts` (chiffres validés via vitest le 2026-06-04, après correction du bug 757 B confirmé par BOFiP BOI-ENR-DMTG-10-10-20-20 § 230)
**Mode rédaction** : Strict anti-conseil (cf. mémoire `feedback_anti_conseil_video.md`)
**Ton** : voix Nicolas oral — quelqu'un qui parle, pas qui lit.

---

## Chiffres validés des 3 scénarios

**Base commune** : Pierre 62 ans aujourd'hui, décès à 80 ans dans tous les cas, patrimoine 800 000 € (RP 477 050 + AV 300 000 + Livret A 22 950), marié, 2 enfants. Bénéficiaires AV : Marie 50 % + Thomas 50 %.

**Méthode** : pour les versements après 70 ans (Art. 757 B), les sommes taxables sont **agrégées à la part successorale ordinaire** de chaque enfant, puis l'abattement Art. 779 (100 000 €) s'applique **une seule fois** sur l'agrégat, et le barème Art. 777 tourne en **une seule passe** (BOFiP § 230).

| Scénario | Comportement entre 62 et 80 ans | Droits par enfant | TOTAL (×2 enfants) |
|---|---|---|---|
| **1** | Rien anticipé. AV continue d'être alimentée après 70 ans | 30 144 € | **60 288 €** |
| **2** | Donations échelonnées (200 k€ à 47 ans + 200 k€ à 62 ans). AV toujours alimentée après 70 ans | 10 144 € | **20 288 €** |
| **3** | Donations échelonnées + Pierre stoppe ses versements AV avant 70 ans | 0 € | **0 €** |

**Leçon narrative** : dans le profil Pierre, **les donations sont le levier dominant** (économie 40 000 €), pas l'AV avant 70 ans (économie 20 288 €). Les donations rechargent l'abattement personnel qui à son tour absorbe une grosse part de l'AV taxable. La combinaison des deux fait basculer le calcul à zéro.

---

## Notation du script

- `[VISUEL]` : indication visuelle pour le composant Remotion correspondant
- `[CHARTE]` : couleur, police, ton spécifiques (bleu marine `#2E4A6F`, doré `#D4AF37`, beige fond `#F7F3EC`)
- `[BEAT]` : pause respiration dans la voix off
- Texte courant = voix off

---

## ACTE 0 — Hook (00:00 – 00:30)

[VISUEL : écran beige `#F7F3EC`. Au centre, un grand nombre qui s'écrit : "60 288 €" en bleu marine, police serif Playfair. Sous-titre mono Lora : "Droits de succession à payer."]

Voici Pierre. 62 ans, marié, deux enfants adultes. Sa maison est payée, son Livret A est rempli, et il a une assurance-vie. Total du patrimoine : 800 000 euros. Une vie de travail.

[BEAT]

Dans cet épisode, Pierre vit jusqu'à 80 ans. Toujours. Dans les trois scénarios qu'on va dérouler ensemble, il meurt à 80 ans, sur le même patrimoine. Seule la variable change : ce qu'il fait — ou ne fait pas — entre maintenant et son décès.

[VISUEL : trois cards apparaissent côte à côte, mono Lora :
- Scénario 1 : "Pierre n'anticipe rien"
- Scénario 2 : "Pierre fait des donations, mais continue à alimenter son AV après 70 ans"
- Scénario 3 : "Pierre fait des donations ET stoppe les versements AV avant 70 ans"]

Trois scénarios. Trois résultats.

[VISUEL : sous chaque card, un montant apparaît : "60 288 €", "20 288 €", "0 €"]

Dans le premier, ses enfants paieront 60 288 euros au fisc. Dans le deuxième, 20 288 euros. Dans le troisième, zéro euro.

[BEAT]

Sur le même patrimoine. Même décès à 80 ans. Écart entre les deux extrêmes : 60 288 euros.

[VISUEL : caption en bas, mono Lora : "60 288 € d'écart sur le même patrimoine"]

Ce n'est pas un conseil, c'est un calcul. Alors voyons comment il fonctionne.

---

## ACTE 1 — Scénario 1 : Pierre n'anticipe rien (00:30 – 04:00)

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

[VISUEL : transition. Le patrimoine hors AV de 500 000 € (RP + Livret A) se sépare en deux flux animés : 50 % vers Catherine, 50 % réparti entre les deux enfants]

À 80 ans, Pierre décède. Maintenant, qu'est-ce qui se passe ?

Pierre et Catherine étaient mariés en communauté. Donc la moitié du patrimoine appartenait déjà à Catherine de son vivant — ce n'est pas un héritage, c'est sa part à elle. 250 000 euros, qui restent simplement entre ses mains.

L'autre moitié — les 250 000 euros qui appartenaient à Pierre — passe aux enfants. Marie et Thomas se la partagent. 125 000 euros chacun.

[VISUEL : annotation discrète "Art. 796-0 bis CGI — Loi TEPA 2007" en mono Lora pâle, en bas d'écran]

Catherine, dans ce scénario simplifié, ne récupère rien de la part de Pierre. Si elle en récupérait — c'est possible juridiquement — elle serait totalement exonérée au titre de la Loi TEPA de 2007. On y reviendra dans un futur épisode.

[VISUEL : deux barres de 125 000 € apparaissent côte à côte, une pour Marie, une pour Thomas]

### Scène 1.3 — L'assurance-vie versée après 70 ans s'ajoute à la part de chaque enfant (01:45 – 02:30)

[VISUEL : focus sur le panneau "Assurance-vie : 300 000 €". À côté, annotation : "Bénéficiaires : Marie + Thomas (50 % / 50 %)" en mono Lora]

Petite précision importante : sur l'assurance-vie de Pierre, la clause bénéficiaire désigne ses deux enfants à parts égales. Marie 50 %, Thomas 50 %. Pas Catherine.

[BEAT]

C'est un choix fréquent chez les parents qui veulent que leurs enfants profitent directement du régime fiscal favorable de l'assurance-vie, sans passage par le conjoint. Si Catherine était bénéficiaire à la place, le calcul serait différent — on y revient en fin de vidéo.

[VISUEL : focus revient sur le panneau. Annotation : "Versements continués après les 70 ans de Pierre"]

Dans ce scénario, Pierre a continué à alimenter son AV après ses 70 ans — par habitude, comme beaucoup de gens. Et là, le régime fiscal change. Article 757 B du Code général des impôts.

[BEAT]

Et c'est ici qu'on tombe sur le point que la plupart des calculs simplifiés ratent. Les versements après 70 ans ne sont pas taxés séparément avec leur propre barème. Le BOFiP est très clair sur ce point : ils "donnent ouverture aux droits de mutation par décès dans les conditions de droit commun". Ce qui veut dire qu'on les agrège à la part successorale de chaque enfant, et qu'on applique un seul barème et un seul abattement sur le total.

[VISUEL : caption mono Lora : "BOFiP BOI-ENR-DMTG-10-10-20-20 § 230"]

Concrètement : sur les 300 000 euros de l'AV, on commence par retirer un abattement global de 30 500 euros, partagé entre les deux bénéficiaires. Il reste 269 500 euros à répartir, donc 134 750 euros par enfant.

[VISUEL : animation. 300 000 € → 269 500 € après abattement global → 134 750 € par enfant. À droite, la barre "succession 125 000 €" de Marie grossit de 134 750 € supplémentaires, total 259 750 €.]

Et ces 134 750 euros viennent **s'ajouter** à la part successorale de chaque enfant. Marie : 125 000 + 134 750 = 259 750 euros. Thomas, pareil.

### Scène 1.4 — L'abattement personnel (02:30 – 03:00)

[VISUEL : sur chaque barre de 259 750 €, une fraction de 100 000 € se sépare et s'éclaire en bleu marine. Caption : "Abattement Art. 779 CGI : 100 000 € par enfant par parent"]

Sur cet agrégat — succession ordinaire plus assurance-vie — la loi prévoit un abattement personnel de 100 000 euros par enfant et par parent. Article 779 du Code général des impôts. Une seule fois sur le total, pas une fois sur chaque morceau.

Donc sur les 259 750 euros, 100 000 sont exonérés. Il reste 159 750 euros taxables, pour chaque enfant.

### Scène 1.5 — Le barème en une passe (03:00 – 04:00)

[VISUEL : `<BaremeProgressif>`. Les 7 tranches du barème ligne directe Art. 777 CGI apparaissent verticalement. Les 159 750 € taxables descendent dans le barème, les tranches concernées s'éclairent à mesure.]

Maintenant, sur ces 159 750 euros, on applique le barème. Le barème est progressif. Article 777 du CGI. Une seule passe — pas une pour la succession, une autre pour l'AV. Tout en une fois.

[Au fur et à mesure que les tranches s'éclairent, les calculs apparaissent en mono Lora à droite]

Première tranche, jusqu'à 8 072 euros : 5 %. Ça fait 404 euros.

Deuxième tranche : 10 %. Encore 404 euros.

Troisième : 15 %. 574 euros.

Et le reste, de 15 932 à 159 750 euros, c'est la tranche à 20 %. 28 764 euros.

[VISUEL : le total apparaît : "30 144 € par enfant"]

On additionne tout ça : 30 144 euros par enfant.

[VISUEL : x2 → 60 288 €. Caption : "Droits totaux scénario 1"]

Fois deux, parce qu'on a deux enfants : 60 288 euros. C'est le point de départ. C'est ce qui se passe si Pierre ne touche à rien.

---

## ACTE 2 — Scénario 2 : Pierre fait des donations, mais continue à alimenter son AV après 70 ans (04:00 – 07:30)

### Scène 2.1 — La règle des 15 ans (04:00 – 05:00)

[VISUEL : transition. Card en haut de l'écran : "Scénario 2 — Pierre meurt à 80 ans, donations échelonnées, AV alimentée après 70 ans"]

On reprend le même Pierre, même patrimoine, même décès à 80 ans. Mais cette fois, il a fait une chose en plus : des donations échelonnées à ses enfants. L'assurance-vie, en revanche, continue d'être alimentée après 70 ans, comme dans le scénario 1.

[BEAT]

[VISUEL : `<FriseAbattements>`. Une timeline horizontale sur 30 ans. Une barre verticale "Abattement 100 000 €" en bleu marine. Au bout de 15 ans, une nouvelle barre identique apparaît, soulignant le rechargement]

Premier levier. Et il s'appuie sur une mécanique fiscale qui surprend toujours.

L'abattement de 100 000 euros par enfant et par parent, ce n'est pas un montant unique pour toute une vie. Il se recharge.

Tous les 15 ans, le compteur repart à zéro. C'est l'article 784 du CGI. Chaque parent peut transmettre 100 000 euros à chaque enfant, en exonération totale, puis recommencer 15 ans plus tard.

[VISUEL : la timeline montre maintenant deux abattements pleins, à 15 ans d'intervalle. Caption mono Lora : "Article 784 CGI — Rappel fiscal des 15 ans"]

[BEAT]

Et ça vaut autant pour la donation que pour la succession. La donation de son vivant utilise l'abattement tout de suite. La succession l'utilise au décès. Et si une donation a eu lieu il y a plus de 15 ans, le fisc ne la compte plus dans le calcul de la succession. Elle disparaît du radar.

### Scène 2.2 — Application au cas Pierre (05:00 – 06:00)

[VISUEL : retour au cas Pierre. Hypothèse alternative : Pierre fait une donation à 47 ans (il y a 15 ans dans ce scénario)]

Alors regardons ce que ça donne sur Pierre. Scénario alternatif.

À 47 ans, Pierre fait une donation de 200 000 euros à ses enfants. 100 000 chacun. L'abattement s'applique en plein. Zéro euro de droits.

[VISUEL : flèche horizontale entre "47 ans" et "62 ans", caption "15 ans plus tard"]

15 ans plus tard, Pierre a maintenant 62 ans. Il fait une seconde donation : encore 200 000 euros, 100 000 par enfant. L'abattement s'est rechargé entre-temps. Donc, à nouveau, zéro euro de droits.

[VISUEL : caption synthèse : "Total transmis hors succession : 400 000 €, droits payés : 0 €"]

Au total : 400 000 euros transmis hors succession, sans un euro de droits.

### Scène 2.3 — Recalcul de la succession agrégée (06:00 – 07:30)

[VISUEL : revenir au patrimoine. Maintenant : 500 000 € de patrimoine hors AV au départ, moins 400 000 € donnés, il reste 100 000 € à transmettre au décès. La moitié pour Catherine (sa part de communauté), l'autre moitié pour les enfants : 50 000 € au total, soit 25 000 € par enfant]

Au décès de Pierre, qu'est-ce qui reste à transmettre, hors assurance-vie ? 100 000 euros.

Catherine garde sa moitié de communauté. Les enfants se partagent les 50 000 euros restants. 25 000 par enfant.

[BEAT]

Et là, attention au timing. Comme plus de 15 ans se sont écoulés depuis la dernière donation, l'abattement de 100 000 euros s'est rechargé une nouvelle fois. Il est plein. Mais voilà l'effet pas évident : sur la succession ordinaire, chaque enfant ne reçoit que 25 000 euros. L'abattement de 100 000 euros n'est consommé qu'à 25 000. Il reste 75 000 euros d'abattement disponible.

[VISUEL : barre 25 000 € avec abattement plein 100 000 €, surplus 75 000 € en doré]

Et c'est là que ça devient intéressant. Ces 75 000 euros d'abattement résiduel vont absorber une partie de l'assurance-vie taxable.

[VISUEL : `<BarresComparatives>`, deux barres face à face :
- Gauche : "Scénario 1 — rien fait" : 60 288 €
- Droite : "Scénario 2 — donations échelonnées" : à calculer]

L'AV est toujours alimentée après 70 ans. Donc par enfant, 134 750 euros viennent s'ajouter aux 25 000 euros de la succession ordinaire. Agrégat : 159 750 euros. On retire l'abattement personnel de 100 000 euros (qui est plein parce que la dernière donation est trop ancienne). Il reste 59 750 euros taxables.

[VISUEL : barème qui tourne sur 59 750 €. Résultat : 10 144 € par enfant]

Le barème en une passe sur 59 750 euros : 10 144 euros par enfant.

[VISUEL : x2 → 20 288 €. Barres comparées : 60 288 € vs 20 288 €. Écart : 40 000 € économisés.]

Fois deux : 20 288 euros au total. À comparer aux 60 288 du scénario 1. Économie : 40 000 euros.

[BEAT]

Ça mérite qu'on s'arrête une seconde. 40 000 euros d'économie. Juste en faisant deux donations à 15 ans d'intervalle. Pourquoi ce chiffre n'est pas juste les 6 000 et quelques euros qu'on aurait pu attendre — c'est-à-dire les droits qu'on aurait payés sur la succession ordinaire seule ? Parce que les donations rechargent l'abattement personnel, et que cet abattement, une fois rechargé, mord ENSUITE sur l'assurance-vie taxable. C'est un effet en cascade : moins de succession ordinaire à taxer, donc plus d'abattement disponible pour absorber l'AV. Les donations ont un effet de levier sur l'AV, pas juste sur la succession ordinaire.

---

## ACTE 3 — Scénario 3 : Pierre fait des donations ET stoppe les versements AV avant 70 ans (07:30 – 10:30)

### Scène 3.1 — Avant 70 ans, l'article 990 I (07:30 – 08:30)

[VISUEL : transition. Card en haut de l'écran : "Scénario 3 — Pierre meurt à 80 ans, donations échelonnées, AV stoppée avant 70 ans"]

Troisième et dernier scénario. Toujours le même Pierre, même décès à 80 ans, mêmes donations échelonnées. Mais cette fois, il fait une chose supplémentaire : il arrête d'alimenter son assurance-vie avant ses 70 ans. Le contrat reste ouvert, l'argent fructifie, mais plus aucun versement après son anniversaire des 70.

[BEAT]

[VISUEL : `<FluxCapital>`. À gauche, un flux "versements assurance-vie". Au milieu, une boîte "Succession". À droite, "Bénéficiaires". Animation : les versements avant 70 ans contournent visuellement la boîte "Succession" et arrivent directement aux bénéficiaires]

Deuxième levier : la date des versements en assurance-vie. Et là, le régime fiscal est complètement différent.

Les versements faits avant les 70 ans du souscripteur ne passent PAS par les droits de mutation par décès. Ils sont soumis à un prélèvement spécifique, complètement séparé. Article 990 I du CGI.

[VISUEL : caption mono Lora "Art. 990 I CGI — 152 500 € d'abattement par bénéficiaire"]

Et le régime est généreux : chaque bénéficiaire désigné a droit à un abattement de 152 500 euros sur les capitaux reçus. Au-delà, c'est 20 % jusqu'à 700 000 euros, puis 31,25 % au-dessus.

Point essentiel : l'abattement est **par bénéficiaire**, pas global. Pour Pierre, avec deux bénéficiaires, ça représente 305 000 euros d'abattement total sur l'assurance-vie.

### Scène 3.2 — Comparaison des deux régimes AV (08:30 – 09:30)

[VISUEL : comparaison côte à côte des deux régimes :
- "Avant 70 ans (Art. 990 I) : 152 500 € par bénéficiaire, prélèvement séparé"
- "Après 70 ans (Art. 757 B) : 30 500 € global + agrégation à la succession"]

Pour Pierre, avec deux bénéficiaires : 305 000 euros d'abattement si les versements sont avant 70 ans. Trente mille cinq cents euros si c'est après. Et surtout, dans le cas "après 70 ans", les sommes s'agrègent à la succession ordinaire et passent au barème classique — c'est précisément ce qui a tiré le calcul vers le haut dans les scénarios 1 et 2.

[BEAT]

Une nuance pour les versements après 70 ans : les intérêts générés par l'assurance-vie restent, eux, totalement exonérés. C'est uniquement les versements qui passent dans la succession.

### Scène 3.3 — Recalcul de l'AV dans le scénario 3 (09:30 – 10:00)

[VISUEL : retour au cas Pierre du scénario 3. AV de 300 000 € entièrement versée avant 70 ans]

Donc dans le scénario 3 : tout a été versé avant 70 ans, plus rien après. C'est l'article 990 I qui s'applique.

[VISUEL : 300 000 € — 305 000 € d'abattement (152 500 × 2) = 0 €. Animation : la boîte "Droits" reste vide]

300 000 euros répartis entre Marie et Thomas, donc 150 000 chacun. Chaque part est en dessous de l'abattement de 152 500. Droits payés sur l'assurance-vie : zéro.

Et la succession ordinaire ? Pareil que dans le scénario 2 : 25 000 euros par enfant, abattement personnel plein à 100 000 euros (donations trop anciennes pour être rappelées). Droits sur la succession : zéro.

### Scène 3.4 — Synthèse des trois scénarios (10:00 – 10:30)

[VISUEL : `<BarresComparatives>`. Trois barres côte à côte :
- Scénario 1 : "Pierre n'anticipe rien" : 60 288 €
- Scénario 2 : "Donations + AV après 70 ans" : 20 288 €
- Scénario 3 : "Donations + AV stoppée avant 70 ans" : 0 €]

On récapitule les trois scénarios côte à côte. Même Pierre, même 80 ans, même 800 000 euros de patrimoine.

Scénario 1, rien anticipé : 60 288 euros de droits.

Scénario 2, donations échelonnées sur 15 ans mais AV toujours alimentée après 70 ans : 20 288 euros. Économie de 40 000 euros.

Scénario 3, donations échelonnées plus AV stoppée avant les 70 ans : zéro euro de droits.

[BEAT]

Point important pour comprendre ce calcul : dans le cas Pierre, **le levier dominant, c'est les donations**. 40 000 euros d'économie sur les 60 288 du départ. La bascule de l'AV avant 70 ans en rajoute 20 288 supplémentaires, et fait tomber le total à zéro. Mais c'est bien les donations qui font le gros du travail — pas parce qu'elles exonèrent les sommes données, mais parce qu'elles rechargent un abattement qui absorbe ensuite une grosse partie de l'AV taxable.

---

## ACTE 4 — Démo calculateur (10:30 – 12:00)

[VISUEL : transition vers une capture d'écran vidéo du site CalcPatrimoine. URL visible : `calcpatrimoine.fr`. Les calculateurs succession et transmission sont ouverts côte à côte.]

Tous ces calculs, vous pouvez les refaire directement sur les calculateurs de CalcPatrimoine. Deux calculateurs s'enchaînent : le calculateur transmission pour identifier la quote-part de l'assurance-vie qui passe en succession (versements après 70 ans), et le calculateur succession qui agrège tout pour appliquer correctement l'abattement et le barème.

[VISUEL : capture animée. Saisie des chiffres de Pierre dans les calculateurs. Les résultats s'affichent en temps réel]

On entre les paramètres de Pierre. AV : 300 000 euros, tous versés après 70 ans. Bénéficiaires : Marie 50 %, Thomas 50 %. Le calculateur transmission sort la quote-part taxable : 134 750 euros par enfant, déjà après l'abattement global de 30 500 euros.

[BEAT]

On reporte ces 134 750 euros dans le calculateur succession, dans le champ "primes 757 B". On y ajoute la part successorale ordinaire : 125 000 euros par enfant. Et le calculateur applique automatiquement les articles 777, 779, 796-0 bis, et la Loi TEPA.

[VISUEL : le résultat s'affiche : 30 144 € par enfant, total 60 288 €. Le même chiffre annoncé.]

Le résultat tombe : 60 288 euros pour les deux enfants. Exactement les chiffres qu'on vient de calculer à la main.

[VISUEL : démonstration : on remet l'AV en "versements avant 70 ans" et on ajoute deux donations passées. Le résultat tombe à zéro.]

Et là, regardez. On modifie deux paramètres : les versements AV passent en "avant 70 ans", et on ajoute deux donations échelonnées dans le passé. Le résultat passe de 60 288 euros à zéro. C'est le calculateur qui montre l'effet combiné des deux leviers.

---

## ACTE 5 — Nuances et garde-fous (12:00 – 13:30)

[VISUEL : retour à l'environnement Remotion. Fond beige. Texte sobre, mono Lora. Pas de personnages, juste les nuances en typographie]

Maintenant, quelques nuances importantes avant de conclure.

### Scène 5.1 — La donation est définitive (12:00 – 12:30)

D'abord : la donation est juridiquement définitive. Une fois faite, le donateur ne peut pas reprendre les sommes données. Le mécanisme suppose qu'il garde assez de patrimoine pour vivre jusqu'à la fin de sa vie. Ça ne se décide pas à la légère.

### Scène 5.2 — L'exonération du conjoint ne change pas selon les leviers (12:30 – 12:50)

Deuxième point : l'exonération totale du conjoint survivant prévue par la Loi TEPA s'applique dans tous les cas. Les leviers qu'on vient de voir ne concernent que la part transmise aux enfants ou à d'autres bénéficiaires.

### Scène 5.3 — Le profil de Pierre n'est pas universel (12:50 – 13:10)

Troisième point, et celui-là est important : le levier dominant dépend du profil. Dans le cas Pierre, les donations rechargent un abattement qui absorbe une grosse part de l'AV taxable — c'est ce qui rend les donations très puissantes. Pour quelqu'un avec une succession ordinaire de 500 000 euros par enfant et peu d'AV après 70 ans, l'effet de levier des donations sera très différent. Selon la façon dont chacun a réparti son patrimoine entre maison, assurance-vie, livrets, le calcul change complètement.

### Scène 5.4 — Le choix des bénéficiaires de l'assurance-vie est déterminant (13:10 – 13:50)

Et dernier point — c'est le point qu'on a posé en début de vidéo et qui change tout : la clause bénéficiaire de l'assurance-vie.

L'abattement de 152 500 euros s'applique par bénéficiaire. Donc plus la clause désigne de bénéficiaires distincts, plus on additionne d'abattements.

[VISUEL : `<BarresComparatives>`. Trois barres avec le scénario 1 décliné selon la clause bénéficiaire :
- "Marie + Thomas seuls bénéficiaires" : 60 288 €
- "Catherine 50 % + enfants 25 % / 25 %" : à recalculer
- "Catherine 100 % bénéficiaire" : à recalculer
Caption mono Lora : "Mêmes chiffres, même AV, trois clauses différentes."]

Sur le scénario 1 de Pierre — AV 300 000 versée après 70 ans, rien d'autre n'a changé — voilà ce que donnent trois rédactions différentes de la clause.

Clause "à mes enfants par parts égales" : 60 288 euros de droits totaux. C'est notre scénario 1.

Clause partagée, Catherine 50 % et les enfants 25 % chacun : un chiffre intermédiaire qu'on validera dans un futur épisode dédié aux clauses bénéficiaires.

Et clause "à mon conjoint" — Catherine 100 % bénéficiaire : zéro euro sur l'AV (Catherine exonérée TEPA), reste seulement les droits de la succession ordinaire sur les enfants. Soit dans le cas Pierre, environ 6 000 euros.

[BEAT]

Trois rédactions, trois résultats très différents. Mais attention au piège : si Catherine reçoit 100 % de l'AV au décès de Pierre, l'argent devient le sien. Et le jour où Catherine décède à son tour, ces 300 000 euros entrent dans SA succession, transmis aux enfants. Avec, cette fois, le barème classique de succession. Sans l'abattement spécial de l'assurance-vie. C'est un autre calcul, à un autre moment. On le traitera dans un prochain épisode.

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
| `<BaremeProgressif>` | Acte 1.5 | `{tranches[], baseTaxable, source}` |
| `<FriseAbattements>` | Acte 2.1 | `{abattement, periode, evenements[]}` |
| `<FluxCapital>` | Acte 3.1, 3.2 | `{source, destinations[], boites[]}` |
| `<BarresComparatives>` | Acte 2.3, 3.4, 5.4 | `{barres[]}` |
| `<DemoCalculateurCapture>` | Acte 4 | `{src, poster}` (capture vidéo .mp4) |
| `<LowerThird>` | partout | `{titre, sousTitre, sourceArticle}` |
| `<TitreActe>` | transitions | `{numero, titre}` |
| `<Disclaimer>` | Acte 5.4, Outro | (statique) |

### Audio voix off

- Génération externe via outil de clonage (ElevenLabs Creator recommandé, cf. `video/specs/voix-off.md`)
- Fichier final : `video/src/audio/episode-01.mp3`
- Découpe en segments par acte si plus pratique : `episode-01-acte0.mp3`, etc.
- Synchronisation Remotion : `useAudioData` + `getAudioDurationInSeconds`

### Sources légales citées dans l'épisode

- Art. 777 du CGI — Barème progressif des droits de succession ligne directe
- Art. 779 du CGI — Abattement personnel de 100 000 € par enfant et par parent
- Art. 784 du CGI — Rappel fiscal des 15 ans
- Art. 796-0 bis du CGI — Exonération du conjoint survivant (Loi TEPA 2007)
- Art. 990 I du CGI — Prélèvement spécifique sur les versements en assurance-vie avant 70 ans
- Art. 757 B du CGI — Droits de mutation par décès sur les versements en assurance-vie après 70 ans
- **BOFiP BOI-ENR-DMTG-10-10-20-20 § 230** — Doctrine confirmant l'agrégation des sommes 757 B à la part successorale ordinaire pour le calcul des droits

---

## Cohérence avec le site

- Cas Pierre = cohérent avec les exemples des calculateurs succession et transmission
- Chiffres = validés via `src/lib/succession.ts` (avec champ `primes757B`) + `src/lib/transmission.ts` (fonction `calculerPartsTaxables757B`). Tests vitest spécifiques aux 3 scénarios Pierre dans `src/lib/transmission.test.ts` et `src/lib/succession.test.ts`.
- Méthode = conforme BOFiP BOI-ENR-DMTG-10-10-20-20 § 230 (vérifiée le 2026-06-04 par WebFetch)
- Ton = aligné `feedback_voix_nicolas.md` + `feedback_anti_conseil_video.md`
- CTA outro = `calcpatrimoine.fr/transmission` et `calcpatrimoine.fr/succession`

## Historique des corrections de chiffres

- **2026-06-04 (matin)** : chiffres initiaux 56 677 € / 50 289 € / 0 € via `calculerTransmission` en silo (méthode FAUSSE)
- **2026-06-04 (soir)** : bug 757 B identifié par audit externe, confirmé par BOFiP § 230. Refonte de `succession.ts` pour agréger 757 B + succession ordinaire. Nouveaux chiffres : 60 288 € / 20 288 € / 0 €. Narration inversée : les donations deviennent le levier dominant (économie 40 000 €), pas l'AV avant 70 ans.
