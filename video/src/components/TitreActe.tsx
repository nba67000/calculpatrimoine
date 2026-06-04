import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, fonts } from '../theme'

interface TitreActeProps {
  /** Numéro de l'acte (ex : "1", "2", "Acte 3"). */
  numero: string
  /** Titre de l'acte (ex : "Pierre n'anticipe rien"). */
  titre: string
  /** Sous-titre optionnel (ex : "Patrimoine 800 000 € — décès à 80 ans"). */
  sousTitre?: string
  /** Frame de début d'apparition (par défaut 0). */
  frameApparition?: number
}

/**
 * Carton de transition entre actes : grand numéro en serif Playfair,
 * titre dessous en bleu marine, sous-titre optionnel en mono Lora.
 *
 * Apparaît avec un fade-in + scale-up subtil. Tient typiquement 2-3 secondes
 * entre deux actes du script.
 */
export function TitreActe({
  numero,
  titre,
  sousTitre,
  frameApparition = 0,
}: TitreActeProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const frameRelatif = frame - frameApparition

  const progression = spring({
    frame: frameRelatif,
    fps,
    config: { damping: 18, stiffness: 90 },
  })

  const opacity = interpolate(progression, [0, 1], [0, 1])
  const scale = interpolate(progression, [0, 1], [0.92, 1])

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      {/* Label "ACTE" en mono Lora, fin et discret */}
      <div
        style={{
          opacity,
          fontFamily: fonts.mono,
          fontSize: 22,
          color: colors.neutral[500],
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          transform: `scale(${scale})`,
        }}
      >
        Acte {numero}
      </div>

      {/* Titre principal en serif Playfair, bleu marine */}
      <div
        style={{
          opacity,
          fontFamily: fonts.serif,
          fontSize: 88,
          fontWeight: 700,
          color: colors.primary[700],
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          textAlign: 'center',
          maxWidth: 1400,
          padding: '0 80px',
          transform: `scale(${scale})`,
        }}
      >
        {titre}
      </div>

      {/* Filet doré sous le titre */}
      <div
        style={{
          opacity,
          width: 80,
          height: 3,
          backgroundColor: colors.accent[400],
        }}
      />

      {/* Sous-titre optionnel */}
      {sousTitre && (
        <div
          style={{
            opacity,
            fontFamily: fonts.mono,
            fontSize: 26,
            color: colors.neutral[600],
            textAlign: 'center',
            maxWidth: 1200,
            padding: '0 80px',
            lineHeight: 1.4,
          }}
        >
          {sousTitre}
        </div>
      )}
    </AbsoluteFill>
  )
}
