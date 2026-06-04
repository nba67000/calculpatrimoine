// Démo des 3 composants typo de la vague 1 : TitreActe, LowerThird, Disclaimer.
// Permet de valider visuellement la charte (Playfair / Lora / Inter, bleu marine + doré sur beige).

import { AbsoluteFill, Sequence } from 'remotion'
import { TitreActe } from '../components/TitreActe'
import { LowerThird } from '../components/LowerThird'
import { Disclaimer } from '../components/Disclaimer'
import { colors, fonts } from '../theme'

export function TypoDemo() {
  return (
    <>
      {/* Carton d'acte 1 — 90 frames (3s à 30 fps) */}
      <Sequence from={0} durationInFrames={90}>
        <TitreActe
          numero="1"
          titre="Pierre n'anticipe rien"
          sousTitre="Pierre meurt à 80 ans, aucune donation, AV alimentée après 70 ans"
        />
      </Sequence>

      {/* LowerThird seul sur un fond beige — 90 frames */}
      <Sequence from={90} durationInFrames={90}>
        <FondAvecLowerThird
          fondTitre="Démo LowerThird"
          fondSousTitre="(la scène réelle aura un visuel derrière)"
          lowerThirdProps={{
            titre: 'Article 779 du CGI',
            sousTitre: 'Abattement personnel 100 000 €',
            accent: 'bleu-marine',
          }}
        />
      </Sequence>

      {/* LowerThird en doré (cas Catherine, conjoint TEPA) — 90 frames */}
      <Sequence from={180} durationInFrames={90}>
        <FondAvecLowerThird
          fondTitre="LowerThird accent doré"
          fondSousTitre="(usage : conjoint exonéré TEPA)"
          lowerThirdProps={{
            titre: 'Catherine, 60 ans',
            sousTitre: 'Conjoint — exonéré TEPA',
            accent: 'dore',
          }}
        />
      </Sequence>

      {/* Disclaimer outro — 120 frames (4s à 30 fps) */}
      <Sequence from={270} durationInFrames={120}>
        <Disclaimer />
      </Sequence>
    </>
  )
}

/** Scène de fond minimaliste pour tester le LowerThird isolément. */
function FondAvecLowerThird({
  fondTitre,
  fondSousTitre,
  lowerThirdProps,
}: {
  fondTitre: string
  fondSousTitre: string
  lowerThirdProps: Parameters<typeof LowerThird>[0]
}) {
  return (
    <>
      <AbsoluteFill
        style={{
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 56,
            color: colors.primary[700],
            fontWeight: 700,
          }}
        >
          {fondTitre}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 22,
            color: colors.neutral[500],
            fontStyle: 'italic',
          }}
        >
          {fondSousTitre}
        </div>
      </AbsoluteFill>
      <LowerThird {...lowerThirdProps} />
    </>
  )
}
