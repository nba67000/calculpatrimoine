# Spec voix off — chaîne YouTube CalcPatrimoine

Choix d'outil de clonage de voix française pour la chaîne YouTube.

Statut : **à valider par Nicolas avant production de l'épisode 01.**

---

## Comparatif des principaux outils (2026)

### 1. ElevenLabs ★ Recommandé

- **Qualité français** : excellente. Le modèle multilingue v2 et le modèle Eleven Turbo v2.5 rendent une voix française très naturelle, avec respiration et intonation.
- **Clonage** : Instant Voice Cloning (IVC) avec 1 min d'échantillon ; Professional Voice Cloning (PVC) avec 30 min à 3 h d'échantillon pour la fidélité maximale.
- **Tarification** :
  - Free : 10 000 caractères/mois, sans clonage
  - **Starter ($5/mois)** : 30 000 caractères, IVC inclus, usage commercial OK
  - **Creator ($22/mois)** : 100 000 caractères, PVC inclus, usage commercial OK, qualité 192 kbps
  - Pro ($99/mois) et au-delà : volumes plus élevés
- **Pour Nicolas** : un épisode de 14 min ≈ 14 × 150 mots/min × 5 caractères/mot ≈ 10 500 caractères. Une vidéo/semaine → ~45 000 caractères/mois. Le plan **Creator à $22/mois** est calibré.
- **Usage commercial** : autorisé sur Starter et au-delà.
- **API** : oui, intégrable dans un workflow automatisé.
- **Limites légales** : on ne peut cloner QUE sa propre voix ou celle d'un tiers avec son consentement écrit (vérification possible via Voice Captcha).

### 2. PlayHT

- **Qualité français** : très bonne, légèrement en dessous d'ElevenLabs sur les intonations émotionnelles.
- **Clonage** : Instant cloning avec 30 secondes d'échantillon.
- **Tarification** : Creator $39/mois, plus chère qu'ElevenLabs à fonctionnalités équivalentes.
- **Pour Nicolas** : alternative valable si problème avec ElevenLabs, mais pas la première option.

### 3. Resemble AI

- **Qualité français** : bonne, mais l'outil est plus orienté entreprises avec un focus API et intégration.
- **Clonage** : 3 min d'échantillon, paid tier obligatoire.
- **Tarification** : à partir de $29/mois, plus pour les volumes élevés.
- **Pour Nicolas** : overkill pour le besoin actuel. À reconsidérer si la chaîne devient une production à fort volume.

### 4. Murf.ai

- **Qualité français** : bonne en TTS classique (bibliothèque de voix pré-enregistrées), clonage plus limité.
- **Pour Nicolas** : si l'objectif était d'utiliser une voix générique, oui. Pas adapté pour cloner sa propre voix.

### 5. Bark / Coqui TTS (open source)

- **Qualité français** : variable, demande du fine-tuning.
- **Coût** : zéro en licences, mais coût en temps de setup et en GPU pour le rendu.
- **Pour Nicolas** : à explorer dans un second temps si on veut tout self-host. Pour démarrer la chaîne, c'est trop d'inertie technique.

---

## Recommandation

**ElevenLabs Creator ($22/mois)**, pour 3 raisons :

1. **Qualité française au niveau pro** dès l'abonnement Creator, avec PVC (Professional Voice Cloning) qui demande un échantillon plus long mais donne le rendu le plus fidèle.
2. **Calibrage économique** : 100 000 caractères/mois suffisent pour 9-10 épisodes de 14 min, soit largement plus que la cadence hebdo prévue.
3. **API disponible** pour automatiser plus tard (script Markdown → mp3 directement).

---

## Workflow voix off cible

1. **Une fois** : Nicolas enregistre 30-60 min d'échantillon de sa voix (texte varié, intonations différentes — lectures de scripts CalcPatrimoine existants par exemple). Upload sur ElevenLabs en PVC, attente de l'entraînement (~24 h).

2. **Par épisode** :
   - Le script Markdown est nettoyé (suppression des indications [VISUEL]/[BEAT], ne garder que la voix off)
   - Copié-collé dans ElevenLabs sous le profil voix clonée
   - Génération mp3, téléchargement
   - Découpe éventuelle par acte si plus pratique pour synchroniser avec Remotion
   - Fichier final : `video/src/audio/episode-XX.mp3`

3. **Itération** : si un passage sonne mal (tonalité étrange, prononciation), regénérer juste ce passage en jouant sur les paramètres (Stability, Similarity, Style exaggeration).

---

## Considérations légales

- **Voix de Nicolas uniquement** : pas de clonage d'autres personnes (acteurs, célébrités), même pour des références.
- **Disclaimer YouTube** : pas obligatoire en France, mais peut être ajouté dans la description : "Voix off générée par clonage IA de la voix de l'auteur."
- **YouTube policy 2026** : autoriser le clonage de SA voix est explicitement OK. Le risque "contenu inauthentique" ne s'applique pas tant que le script reste sous direction éditoriale humaine.

---

## Coût annuel estimé

- Abonnement ElevenLabs Creator : $22/mois × 12 = $264/an
- Au cours moyen 2026 (~0,95 €) : ~250 €/an

À comparer aux revenus potentiels d'une chaîne finance/patrimoine bien positionnée ($15-30 RPM sur format long monétisé, selon la conv initiale) : seuil de rentabilité atteint dès quelques milliers de vues mensuelles.

---

## Décisions ouvertes (à valider par Nicolas)

1. Souscription ElevenLabs Creator confirmée ? Ou test gratuit Starter d'abord pour évaluer la qualité ?
2. Échantillon d'entraînement : prévoir une session d'enregistrement de 30-60 min (espace calme, micro correct). Nicolas a-t-il déjà un micro de qualité ?
3. Première voix clonée : démarrer dès maintenant pour avoir la voix prête au moment du rendu, ou attendre que les composants Remotion soient prêts ?
