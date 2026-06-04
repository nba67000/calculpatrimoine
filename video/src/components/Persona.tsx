import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, fonts } from '../theme'

export type PersonaRole = 'defunt' | 'conjoint' | 'heritier' | 'beneficiaire-av' | 'notaire' | 'assureur'

interface PersonaProps {
  nom: string
  age: number
  role: PersonaRole
  /** Position absolue dans la scène (pixels). Si omis, le persona est centré. */
  x?: number
  y?: number
  /** Diamètre du cercle (par défaut 200 px). */
  taille?: number
  /** Frame de début d'apparition. */
  frameApparition?: number
  /** Mise en avant : scale 1.05 + glow doré. */
  highlight?: boolean
  /** État grisé (utilisé pour Pierre après son décès). */
  decede?: boolean
  /** Bordure dorée signalant "bénéficiaire AV". */
  bordureAv?: boolean
  /** Affiche l'annotation (nom + role) sous le persona. */
  showAnnotation?: boolean
  /** Initiale forcée (par défaut : première lettre du nom). */
  initiale?: string
}

const FONDS: Record<PersonaRole, string> = {
  defunt: colors.primary[600],
  conjoint: colors.accent[400],
  heritier: colors.surface.card,
  'beneficiaire-av': colors.surface.card,
  notaire: colors.primary[700],
  assureur: colors.accent[700],
}

// Couleur du texte (de l'initiale) selon la couleur du cercle, pour contraste.
const TEXTE: Record<PersonaRole, string> = {
  defunt: colors.surface.card,
  conjoint: colors.primary[700],
  heritier: colors.primary[700],
  'beneficiaire-av': colors.primary[700],
  notaire: colors.accent[300],
  assureur: colors.surface.card,
}

const ANNOTATIONS: Record<PersonaRole, string> = {
  defunt: 'Défunt',
  conjoint: 'Conjoint — exonéré TEPA',
  heritier: 'Héritier',
  'beneficiaire-av': 'Bénéficiaire AV',
  notaire: 'Notaire',
  assureur: 'Assureur',
}

/**
 * Persona en monogramme typographique : cercle coloré selon le rôle, initiale
 * du nom en serif Playfair au centre. Style "vieille banque privée moderne"
 * cohérent avec la charte CalcPatrimoine.
 *
 * Cf. video/specs/personas.md pour la spec complète.
 *
 * @example
 *   <Persona nom="Pierre" age={62} role="defunt" showAnnotation />
 *   <Persona nom="Catherine" age={60} role="conjoint" bordureAv />
 */
export function Persona({
  nom,
  age,
  role,
  x,
  y,
  taille = 200,
  frameApparition = 0,
  highlight = false,
  decede = false,
  bordureAv = false,
  showAnnotation = false,
  initiale,
}: PersonaProps) {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()
  const frameRelatif = frame - frameApparition

  // Entrée : fade-in + scale-up spring
  const apparition = spring({
    frame: frameRelatif,
    fps,
    config: { damping: 14, stiffness: 80 },
  })
  const opacityApparition = interpolate(apparition, [0, 1], [0, 1])
  const opacity = opacityApparition * (decede ? 0.45 : 1)
  const scaleEntree = interpolate(apparition, [0, 1], [0.85, 1])
  const scaleHighlight = highlight ? 1.05 : 1
  const scale = scaleEntree * scaleHighlight

  // Position : par défaut centré, sinon (x, y) absolus
  const posX = x ?? (width - taille) / 2
  const posY = y ?? (height - taille) / 2 - 40

  const couleurFond = FONDS[role]
  const couleurTexte = TEXTE[role]
  const lettre = (initiale ?? nom.charAt(0)).toUpperCase()

  // Filtre désaturation pour décédé
  const filterDecede = decede ? 'grayscale(70%)' : 'none'

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          left: posX,
          top: posY,
          opacity,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          width: taille,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          filter: filterDecede,
        }}
      >
        {/* Cercle avec initiale */}
        <div
          style={{
            width: taille,
            height: taille,
            position: 'relative',
            filter: highlight
              ? `drop-shadow(0 0 18px ${couleurFond})`
              : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08))',
          }}
        >
          {/* Cercle de fond + bordure AV optionnelle, en SVG pour le rendu fin */}
          <svg
            viewBox="0 0 200 200"
            width={taille}
            height={taille}
            style={{ display: 'block', position: 'absolute', inset: 0 }}
          >
            <circle cx="100" cy="100" r="96" fill={couleurFond} />
            {bordureAv && (
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke={colors.accent[400]}
                strokeWidth="3"
                strokeDasharray="6 5"
              />
            )}
          </svg>

          {/* Initiale en Playfair, centrée optiquement */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.serif,
              fontSize: taille * 0.5,
              fontWeight: 700,
              color: couleurTexte,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              // Léger décalage vertical pour compenser la métrique optique du serif
              paddingBottom: taille * 0.04,
            }}
          >
            {lettre}
          </div>
        </div>

        {/* Annotation : nom + âge en serif, rôle en mono */}
        {showAnnotation && (
          <div style={{ textAlign: 'center', width: 'max-content' }}>
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 24,
                fontWeight: 700,
                color: colors.primary[700],
                lineHeight: 1.2,
              }}
            >
              {nom}, {age} ans
            </div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 14,
                color: colors.neutral[500],
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginTop: 4,
              }}
            >
              {ANNOTATIONS[role]}
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  )
}
