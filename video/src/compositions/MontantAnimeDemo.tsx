// Démo du composant MontantAnime : reproduit la séquence du hook de l'épisode 01.
// Permet de valider que le pipeline Remotion fonctionne (rendu temps réel, animations).

import { Sequence } from 'remotion'
import { MontantAnime } from '../components/MontantAnime'

export function MontantAnimeDemo() {
  return (
    <>
      {/* Premier montant : 56 677 € en rouge (chiffre à perdre) */}
      <Sequence from={0} durationInFrames={75}>
        <MontantAnime
          valeur={56677}
          couleur="rouge"
          taille="hero"
          caption="Droits de succession à payer"
        />
      </Sequence>

      {/* Bascule : 0 € en bleu marine (chiffre à atteindre) */}
      <Sequence from={75} durationInFrames={75}>
        <MontantAnime
          valeur={0}
          couleur="bleu-marine"
          taille="hero"
          caption="Après les deux étapes"
        />
      </Sequence>

      {/* Écart final en doré */}
      <Sequence from={150} durationInFrames={90}>
        <MontantAnime
          valeur={56677}
          couleur="dore"
          taille="hero"
          caption="Écart sur le même patrimoine"
        />
      </Sequence>
    </>
  )
}
