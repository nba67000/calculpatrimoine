import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, fonts } from '../theme'

type Couleur = 'bleu-marine' | 'rouge' | 'dore' | 'neutre'
type Taille = 'hero' | 'grand' | 'moyen'

interface MontantAnimeProps {
  valeur: number
  unite?: string
  couleur?: Couleur
  taille?: Taille
  /** Frame de début d'apparition (par défaut 0). */
  frameApparition?: number
  /** Texte facultatif sous le montant (caption mono Lora). */
  caption?: string
}

const PALETTE: Record<Couleur, string> = {
  'bleu-marine': colors.primary[600],
  rouge: colors.danger,
  dore: colors.accent[400],
  neutre: colors.neutral[700],
}

const TAILLES: Record<Taille, { fontSize: number; captionSize: number }> = {
  hero: { fontSize: 220, captionSize: 28 },
  grand: { fontSize: 140, captionSize: 24 },
  moyen: { fontSize: 80, captionSize: 18 },
}

/**
 * Affiche un montant en euros au format français, avec une animation d'apparition
 * (fade + scale-up spring) et une couleur paramétrable.
 *
 * @example
 *   <MontantAnime valeur={56677} couleur="rouge" taille="hero" caption="Droits de succession à payer." />
 */
export function MontantAnime({
  valeur,
  unite = '€',
  couleur = 'bleu-marine',
  taille = 'grand',
  frameApparition = 0,
  caption,
}: MontantAnimeProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const frameRelatif = frame - frameApparition

  // Spring d'apparition : opacity 0→1 et scale 0.85→1
  const progression = spring({
    frame: frameRelatif,
    fps,
    config: { damping: 14, stiffness: 80 },
  })

  const opacity = interpolate(progression, [0, 1], [0, 1])
  const scale = interpolate(progression, [0, 1], [0.85, 1])

  const { fontSize, captionSize } = TAILLES[taille]
  const valeurFormatee = `${valeur.toLocaleString('fr-FR')} ${unite}`

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          fontFamily: fonts.serif,
          fontSize,
          fontWeight: 700,
          color: PALETTE[couleur],
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {valeurFormatee}
      </div>

      {caption && (
        <div
          style={{
            opacity,
            fontFamily: fonts.mono,
            fontSize: captionSize,
            color: colors.neutral[500],
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {caption}
        </div>
      )}
    </AbsoluteFill>
  )
}
