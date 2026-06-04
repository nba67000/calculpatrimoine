// Registre des compositions Remotion de la chaîne CalcPatrimoine.
// Chaque <Composition> ajoutée ici devient visible dans Remotion Studio.

import { Composition } from 'remotion'
import { videoConfig } from './theme'
import { MontantAnimeDemo } from './compositions/MontantAnimeDemo'
import { TypoDemo } from './compositions/TypoDemo'
import { DiagrammesDemo } from './compositions/DiagrammesDemo'
import { PersonaFluxDemo } from './compositions/PersonaFluxDemo'

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

      {/* Démo vague 1 — TitreActe, LowerThird (2 variantes), Disclaimer. 13 s à 30 fps. */}
      <Composition
        id="TypoDemo"
        component={TypoDemo}
        durationInFrames={390}
        fps={videoConfig.fps}
        width={videoConfig.width}
        height={videoConfig.height}
      />

      {/* Démo vague 2 — BarresComparatives (x2), BaremeProgressif, FriseAbattements. 23 s à 30 fps. */}
      <Composition
        id="DiagrammesDemo"
        component={DiagrammesDemo}
        durationInFrames={690}
        fps={videoConfig.fps}
        width={videoConfig.width}
        height={videoConfig.height}
      />

      {/* Démo vague 3 — Persona (famille Pierre) + FluxCapital (AV avant/après 70). 21 s à 30 fps. */}
      <Composition
        id="PersonaFluxDemo"
        component={PersonaFluxDemo}
        durationInFrames={630}
        fps={videoConfig.fps}
        width={videoConfig.width}
        height={videoConfig.height}
      />
    </>
  )
}
