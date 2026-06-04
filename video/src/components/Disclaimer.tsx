import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, fonts } from '../theme'

interface DisclaimerProps {
  /**
   * Texte du disclaimer. Par défaut : la formule prescrite par la mémoire
   * feedback_anti_conseil_video.md pour l'outro de chaque épisode.
   */
  texte?: string
  /** Frame de début d'apparition (par défaut 0). */
  frameApparition?: number
}

const TEXTE_DEFAUT =
  "Cet épisode présente un cas chiffré à titre pédagogique. Il ne constitue pas un conseil patrimonial personnalisé."

/**
 * Bloc disclaimer pédagogique conforme à la mémoire feedback_anti_conseil_video.md.
 *
 * Apparaît en plein écran avec un fond beige sobre, texte serif Lora,
 * encadré par un filet doré discret. À utiliser à l'outro de chaque épisode
 * (formulation par défaut figée) ou pour signaler une simplification en cours
 * d'épisode (formulation personnalisée).
 */
export function Disclaimer({
  texte = TEXTE_DEFAUT,
  frameApparition = 0,
}: DisclaimerProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const frameRelatif = frame - frameApparition

  const progression = spring({
    frame: frameRelatif,
    fps,
    config: { damping: 22, stiffness: 80 },
  })

  const opacity = interpolate(progression, [0, 1], [0, 1])

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 120,
      }}
    >
      <div
        style={{
          opacity,
          maxWidth: 1100,
          textAlign: 'center',
          padding: '60px 80px',
          borderTop: `2px solid ${colors.accent[400]}`,
          borderBottom: `2px solid ${colors.accent[400]}`,
        }}
      >
        {/* Label "Avertissement" en mono Lora, fin */}
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 18,
            color: colors.accent[600],
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            marginBottom: 28,
          }}
        >
          Avertissement
        </div>

        {/* Texte du disclaimer en mono Lora plus grand, italique */}
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 32,
            color: colors.neutral[700],
            lineHeight: 1.5,
            fontStyle: 'italic',
          }}
        >
          {texte}
        </div>
      </div>
    </AbsoluteFill>
  )
}
