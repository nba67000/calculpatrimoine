// Registre des compositions Remotion de la chaîne CalcPatrimoine.
// Chaque <Composition> ajoutée ici devient visible dans Remotion Studio.

import { Composition } from 'remotion'
import { videoConfig } from './theme'
import { MontantAnimeDemo } from './compositions/MontantAnimeDemo'

export function RemotionRoot() {
  return (
    <>
      {/* Démo pilote — sert à valider le pipeline. À supprimer une fois la prod lancée. */}
      <Composition
        id="MontantAnimeDemo"
        component={MontantAnimeDemo}
        durationInFrames={240}
        fps={videoConfig.fps}
        width={videoConfig.width}
        height={videoConfig.height}
      />
    </>
  )
}
