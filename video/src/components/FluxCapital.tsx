import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, fonts } from '../theme'

type CouleurBoite = 'bleu-marine' | 'rouge' | 'dore' | 'beige' | 'neutre'

export interface Boite {
  /** Identifiant unique. */
  id: string
  /** Libellé principal (ex : "Pierre", "Fisc", "Marie + Thomas"). */
  label: string
  /** Sous-label (ex : "Versements AV", "Article 757 B"). */
  sousLabel?: string
  /** Montant à afficher dans la boîte (ex : 300_000). */
  montant?: number
  /** Position relative (0 à 1, en pourcentage de la largeur/hauteur). */
  x: number
  y: number
  /** Couleur principale de la boîte. */
  couleur?: CouleurBoite
}

export interface Flux {
  /** ID de la boîte source. */
  de: string
  /** ID de la boîte destination. */
  vers: string
  /** Délai d'apparition en frames depuis le début (par défaut 0). */
  delai?: number
  /** Indique si le flux est "bloqué" (contourné, ex : exonération TEPA). */
  bloque?: boolean
  /** Label optionnel sur la flèche (ex : "Hors succession"). */
  label?: string
}

interface FluxCapitalProps {
  /** Liste des boîtes (positions relatives). */
  boites: Boite[]
  /** Liste des flux entre boîtes. */
  flux: Flux[]
  /** Titre au-dessus de la scène. */
  titre?: string
  /** Source légale affichée discrètement. */
  source?: string
  /** Frame de début d'apparition. */
  frameApparition?: number
}

const COULEURS_BOITES: Record<CouleurBoite, { fond: string; texte: string; bordure: string }> = {
  'bleu-marine': { fond: colors.primary[600], texte: colors.surface.card, bordure: colors.primary[700] },
  rouge: { fond: colors.danger, texte: colors.surface.card, bordure: '#A02818' },
  dore: { fond: colors.accent[400], texte: colors.primary[700], bordure: colors.accent[600] },
  beige: { fond: colors.surface.card, texte: colors.primary[700], bordure: colors.neutral[300] },
  neutre: { fond: colors.neutral[100], texte: colors.neutral[700], bordure: colors.neutral[300] },
}

/**
 * Animation de flux d'argent entre boîtes (donateur → fisc → bénéficiaires,
 * versements AV → succession → héritiers, etc.). Les flèches se tracent
 * progressivement avec un effet "particule" qui suit la courbe.
 *
 * Usage : actes 3.1 et 3.2 du script ép.01 — illustrer comment l'AV
 * contourne ou pas la succession selon le régime fiscal.
 *
 * @example
 *   <FluxCapital
 *     titre="AV avant 70 ans — Art. 990 I"
 *     boites={[
 *       { id: 'versements', label: 'Versements AV', x: 0.1, y: 0.5, couleur: 'beige' },
 *       { id: 'succession', label: 'Succession', x: 0.5, y: 0.2, couleur: 'rouge' },
 *       { id: 'benef', label: 'Bénéficiaires', x: 0.9, y: 0.5, couleur: 'dore' },
 *     ]}
 *     flux={[
 *       { de: 'versements', vers: 'succession', bloque: true, label: 'Hors succession' },
 *       { de: 'versements', vers: 'benef', label: '152 500 € abattement' },
 *     ]}
 *   />
 */
export function FluxCapital({
  boites,
  flux,
  titre,
  source,
  frameApparition = 0,
}: FluxCapitalProps) {
  const frame = useCurrentFrame()
  const { fps, width, height } = useVideoConfig()
  const frameRelatif = frame - frameApparition

  // Dimensions disponibles pour les boîtes (marges)
  const margeH = 200
  const margeV = 200
  const largeurUtile = width - 2 * margeH
  const hauteurUtile = height - 2 * margeV

  // Index des boîtes par ID pour résoudre les flux
  const boitesParId = new Map(boites.map(b => [b.id, b]))

  // Animation globale du titre / source
  const opacityCadre = interpolate(
    spring({ frame: frameRelatif, fps, config: { damping: 20, stiffness: 80 } }),
    [0, 1],
    [0, 1],
  )

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      {/* En-tête */}
      {(titre || source) && (
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            textAlign: 'center',
            opacity: opacityCadre,
          }}
        >
          {titre && (
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 44,
                fontWeight: 700,
                color: colors.primary[700],
                letterSpacing: '-0.02em',
              }}
            >
              {titre}
            </div>
          )}
          {source && (
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 16,
                color: colors.accent[600],
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                marginTop: 12,
              }}
            >
              {source}
            </div>
          )}
        </div>
      )}

      {/* SVG par-dessus pour les flèches (les boîtes seront au-dessus) */}
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {flux.map((f, i) => {
          const source = boitesParId.get(f.de)
          const dest = boitesParId.get(f.vers)
          if (!source || !dest) return null

          const x1 = margeH + source.x * largeurUtile
          const y1 = margeV + source.y * hauteurUtile
          const x2 = margeH + dest.x * largeurUtile
          const y2 = margeV + dest.y * hauteurUtile

          return (
            <Fleche
              key={`flux-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              bloque={f.bloque ?? false}
              label={f.label}
              frameApparition={frameRelatif - (f.delai ?? 0)}
              fps={fps}
              indexParticule={i}
            />
          )
        })}
      </svg>

      {/* Boîtes (par-dessus les flèches) */}
      {boites.map((boite, i) => {
        const left = margeH + boite.x * largeurUtile
        const top = margeV + boite.y * hauteurUtile
        return (
          <BoiteRendue
            key={boite.id}
            boite={boite}
            left={left}
            top={top}
            frameApparition={frameRelatif - i * 8}
            fps={fps}
          />
        )
      })}
    </AbsoluteFill>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sous-composants
// ─────────────────────────────────────────────────────────────────────────────

function BoiteRendue({
  boite,
  left,
  top,
  frameApparition,
  fps,
}: {
  boite: Boite
  left: number
  top: number
  frameApparition: number
  fps: number
}) {
  const progression = spring({
    frame: frameApparition,
    fps,
    config: { damping: 18, stiffness: 100 },
  })
  const opacity = interpolate(progression, [0, 1], [0, 1])
  const scale = interpolate(progression, [0, 1], [0.9, 1])

  const palette = COULEURS_BOITES[boite.couleur ?? 'bleu-marine']

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        padding: '18px 28px',
        backgroundColor: palette.fond,
        border: `3px solid ${palette.bordure}`,
        borderRadius: 8,
        minWidth: 200,
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 24,
          fontWeight: 700,
          color: palette.texte,
          lineHeight: 1.2,
        }}
      >
        {boite.label}
      </div>
      {boite.sousLabel && (
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 13,
            color: palette.texte,
            opacity: 0.8,
            marginTop: 4,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {boite.sousLabel}
        </div>
      )}
      {boite.montant !== undefined && (
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 32,
            fontWeight: 700,
            color: palette.texte,
            marginTop: 8,
            letterSpacing: '-0.02em',
          }}
        >
          {boite.montant.toLocaleString('fr-FR')} €
        </div>
      )}
    </div>
  )
}

function Fleche({
  x1,
  y1,
  x2,
  y2,
  bloque,
  label,
  frameApparition,
  fps,
  indexParticule,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  bloque: boolean
  label?: string
  frameApparition: number
  fps: number
  indexParticule: number
}) {
  // Construction d'une courbe de Bézier quadratique entre les deux points
  // avec un point de contrôle légèrement décalé pour éviter les lignes droites.
  const cx = (x1 + x2) / 2
  const cy = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const longueur = Math.sqrt(dx * dx + dy * dy)
  // Décalage perpendiculaire proportionnel à la distance pour une courbure douce.
  const offsetCourbe = longueur * 0.15 * (indexParticule % 2 === 0 ? 1 : -1)
  // Vecteur perpendiculaire normalisé
  const nx = -dy / longueur
  const ny = dx / longueur
  const cpX = cx + nx * offsetCourbe
  const cpY = cy + ny * offsetCourbe

  const pathData = `M ${x1},${y1} Q ${cpX},${cpY} ${x2},${y2}`

  // Animation de tracé : la flèche se dessine progressivement (stroke-dashoffset)
  const progressionTrace = spring({
    frame: frameApparition,
    fps,
    config: { damping: 20, stiffness: 50 },
  })
  const offsetTrace = interpolate(progressionTrace, [0, 1], [longueur, 0])

  const couleurFleche = bloque ? colors.danger : colors.primary[600]

  // Particule qui se déplace le long de la courbe (boucle infinie)
  const dureeCycle = fps * 2
  const t = ((frameApparition + dureeCycle * indexParticule * 0.3) % dureeCycle) / dureeCycle
  // Position de la particule sur la courbe via formule de Bézier quadratique
  const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cpX + t * t * x2
  const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cpY + t * t * y2

  return (
    <g>
      {/* Trait principal */}
      <path
        d={pathData}
        fill="none"
        stroke={couleurFleche}
        strokeWidth={bloque ? 3 : 4}
        strokeDasharray={bloque ? '10 8' : longueur}
        strokeDashoffset={bloque ? 0 : offsetTrace}
        strokeLinecap="round"
        opacity={interpolate(progressionTrace, [0, 0.3], [0, 1])}
      />

      {/* Flèche au bout (head triangle) */}
      {!bloque && (
        <ArrowHead
          x={x2}
          y={y2}
          fromX={cpX}
          fromY={cpY}
          couleur={couleurFleche}
          opacity={interpolate(progressionTrace, [0.8, 1], [0, 1])}
        />
      )}

      {/* Croix rouge pour les flux bloqués (au centre de la flèche) */}
      {bloque && (
        <CroixBloquee
          x={cpX}
          y={cpY}
          opacity={interpolate(progressionTrace, [0.5, 1], [0, 1])}
        />
      )}

      {/* Particule animée (mouvement perpétuel) */}
      {!bloque && progressionTrace > 0.5 && (
        <circle
          cx={px}
          cy={py}
          r="5"
          fill={colors.accent[400]}
          opacity={interpolate(progressionTrace, [0.5, 1], [0, 0.9])}
        />
      )}

      {/* Label sur la flèche */}
      {label && (
        <text
          x={cpX}
          y={cpY - 16}
          textAnchor="middle"
          fontFamily={fonts.mono}
          fontSize="14"
          fill={couleurFleche}
          fontWeight="600"
          opacity={interpolate(progressionTrace, [0.6, 1], [0, 1])}
        >
          {label}
        </text>
      )}
    </g>
  )
}

function ArrowHead({
  x,
  y,
  fromX,
  fromY,
  couleur,
  opacity,
}: {
  x: number
  y: number
  fromX: number
  fromY: number
  couleur: string
  opacity: number
}) {
  // Angle de la tangente à la fin de la courbe
  const angle = Math.atan2(y - fromY, x - fromX)
  const taille = 14
  const a1x = x - taille * Math.cos(angle - Math.PI / 6)
  const a1y = y - taille * Math.sin(angle - Math.PI / 6)
  const a2x = x - taille * Math.cos(angle + Math.PI / 6)
  const a2y = y - taille * Math.sin(angle + Math.PI / 6)

  return (
    <polygon
      points={`${x},${y} ${a1x},${a1y} ${a2x},${a2y}`}
      fill={couleur}
      opacity={opacity}
    />
  )
}

function CroixBloquee({ x, y, opacity }: { x: number; y: number; opacity: number }) {
  const taille = 18
  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={taille} fill={colors.danger} />
      <line
        x1={x - 7}
        y1={y - 7}
        x2={x + 7}
        y2={y + 7}
        stroke={colors.surface.card}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1={x - 7}
        y1={y + 7}
        x2={x + 7}
        y2={y - 7}
        stroke={colors.surface.card}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  )
}
