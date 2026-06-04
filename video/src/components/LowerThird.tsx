import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, fonts } from '../theme'

interface LowerThirdProps {
  /** Titre principal (ex : "Pierre, 62 ans", "Article 779 du CGI"). */
  titre: string
  /** Sous-titre optionnel (ex : "Défunt", "Abattement personnel 100 000 €"). */
  sousTitre?: string
  /** Frame de début d'apparition (par défaut 0). */
  frameApparition?: number
  /** Position horizontale du bandeau (par défaut "gauche"). */
  position?: 'gauche' | 'centre' | 'droite'
  /** Couleur d'accent du filet vertical à gauche du bandeau. */
  accent?: 'bleu-marine' | 'dore' | 'neutre'
}

const ACCENTS: Record<NonNullable<LowerThirdProps['accent']>, string> = {
  'bleu-marine': colors.primary[600],
  dore: colors.accent[400],
  neutre: colors.neutral[400],
}

const POSITIONS: Record<NonNullable<LowerThirdProps['position']>, React.CSSProperties> = {
  gauche: { left: 80, right: 'auto' },
  centre: { left: '50%', right: 'auto', transform: 'translateX(-50%)' },
  droite: { right: 80, left: 'auto' },
}

/**
 * Bandeau bas d'écran avec titre + sous-titre optionnel.
 * Glisse depuis le bas avec fade-in. Filet vertical de couleur à gauche.
 *
 * Usage typique : identifier un persona ("Pierre, 62 ans"), nommer une source
 * légale ("Article 779 du CGI"), souligner un montant clé.
 */
export function LowerThird({
  titre,
  sousTitre,
  frameApparition = 0,
  position = 'gauche',
  accent = 'bleu-marine',
}: LowerThirdProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const frameRelatif = frame - frameApparition

  const progression = spring({
    frame: frameRelatif,
    fps,
    config: { damping: 18, stiffness: 100 },
  })

  const opacity = interpolate(progression, [0, 1], [0, 1])
  const translateY = interpolate(progression, [0, 1], [16, 0])

  const positionStyle = POSITIONS[position]
  const baseTransform = positionStyle.transform ?? ''
  const transform = `${baseTransform} translateY(${translateY}px)`.trim()

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          ...positionStyle,
          transform,
          opacity,
          display: 'flex',
          alignItems: 'stretch',
          gap: 20,
        }}
      >
        {/* Filet vertical d'accent */}
        <div
          style={{
            width: 4,
            backgroundColor: ACCENTS[accent],
            borderRadius: 2,
          }}
        />

        {/* Bloc texte */}
        <div
          style={{
            backgroundColor: 'rgba(247, 243, 236, 0.92)',
            padding: '18px 28px',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            minWidth: 200,
          }}
        >
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 32,
              fontWeight: 700,
              color: colors.primary[700],
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
            }}
          >
            {titre}
          </div>
          {sousTitre && (
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 18,
                color: colors.neutral[600],
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              {sousTitre}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  )
}
