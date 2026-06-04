import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, fonts } from '../theme'

type CouleurBarre = 'bleu-marine' | 'rouge' | 'dore' | 'neutre'

export interface Barre {
  /** Label affiché sous la barre (ex : "Scénario 1 — rien fait"). */
  label: string
  /** Valeur numérique (ex : 56677). Utilisée pour la hauteur ET l'affichage. */
  valeur: number
  /** Unité affichée à côté du chiffre (par défaut "€"). */
  unite?: string
  /** Couleur principale de la barre. */
  couleur?: CouleurBarre
  /** Sous-label optionnel sous le label principal. */
  sousLabel?: string
  /** Barre mise en avant (bordure dorée + scale léger). */
  highlight?: boolean
}

interface BarresComparativesProps {
  /** Titre au-dessus du graphique. */
  titre?: string
  /** Sous-titre / contexte. */
  sousTitre?: string
  /** Liste des barres à afficher (2 à 4 idéalement). */
  barres: Barre[]
  /** Frame de début d'apparition (par défaut 0). */
  frameApparition?: number
  /** Stagger entre les barres (en frames). Par défaut 12. */
  staggerFrames?: number
}

const COULEURS: Record<CouleurBarre, string> = {
  'bleu-marine': colors.primary[600],
  rouge: colors.danger,
  dore: colors.accent[400],
  neutre: colors.neutral[400],
}

/**
 * Graphique en barres comparatives. Chaque barre se remplit en spring avec un
 * stagger entre elles. La hauteur est normalisée sur la valeur max.
 *
 * Usage : comparer 2-4 scénarios chiffrés (droits payés, économies, etc.).
 *
 * @example
 *   <BarresComparatives
 *     titre="Trois rédactions, trois résultats"
 *     barres={[
 *       { label: 'Scénario 1', valeur: 56677, couleur: 'rouge' },
 *       { label: 'Scénario 2', valeur: 50289, couleur: 'neutre' },
 *       { label: 'Scénario 3', valeur: 0,    couleur: 'dore', highlight: true },
 *     ]}
 *   />
 */
export function BarresComparatives({
  titre,
  sousTitre,
  barres,
  frameApparition = 0,
  staggerFrames = 12,
}: BarresComparativesProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const frameRelatif = frame - frameApparition

  // Normalisation : la barre la plus grande remplit 100 % de la hauteur dispo.
  // Si toutes les valeurs sont 0, on évite la division par zéro.
  const valeurMax = Math.max(...barres.map(b => b.valeur), 1)

  // Animation globale du titre (apparition immédiate)
  const progressionTitre = spring({
    frame: frameRelatif,
    fps,
    config: { damping: 18, stiffness: 90 },
  })
  const opacityTitre = interpolate(progressionTitre, [0, 1], [0, 1])

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        padding: '80px 120px',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      {/* Titre + sous-titre */}
      {(titre || sousTitre) && (
        <div style={{ opacity: opacityTitre, textAlign: 'center' }}>
          {titre && (
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 56,
                fontWeight: 700,
                color: colors.primary[700],
                letterSpacing: '-0.02em',
              }}
            >
              {titre}
            </div>
          )}
          {sousTitre && (
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 22,
                color: colors.neutral[500],
                marginTop: 12,
                fontStyle: 'italic',
              }}
            >
              {sousTitre}
            </div>
          )}
        </div>
      )}

      {/* Conteneur des barres : flex bas, baseline alignée */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 60,
          paddingBottom: 40,
        }}
      >
        {barres.map((barre, index) => (
          <ColonneBarre
            key={`${barre.label}-${index}`}
            barre={barre}
            valeurMax={valeurMax}
            frameApparition={frameRelatif - index * staggerFrames}
            fps={fps}
          />
        ))}
      </div>
    </AbsoluteFill>
  )
}

function ColonneBarre({
  barre,
  valeurMax,
  frameApparition,
  fps,
}: {
  barre: Barre
  valeurMax: number
  frameApparition: number
  fps: number
}) {
  const progression = spring({
    frame: frameApparition,
    fps,
    config: { damping: 16, stiffness: 75 },
  })

  // Hauteur cible normalisée (entre 80 et 600 px). Une valeur de 0 conserve
  // 80 px de hauteur visible avec une bande symbolique pour éviter l'effet "barre fantôme".
  const hauteurCible = barre.valeur === 0 ? 80 : 80 + (barre.valeur / valeurMax) * 520
  const hauteur = interpolate(progression, [0, 1], [0, hauteurCible])
  const opacity = interpolate(progression, [0, 1], [0, 1])

  const couleur = COULEURS[barre.couleur ?? 'bleu-marine']
  const scale = barre.highlight ? interpolate(progression, [0, 1], [1, 1.04]) : 1

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      {/* Valeur en haut */}
      <div
        style={{
          opacity,
          fontFamily: fonts.serif,
          fontSize: 48,
          fontWeight: 700,
          color: couleur,
          letterSpacing: '-0.02em',
        }}
      >
        {barre.valeur.toLocaleString('fr-FR')} {barre.unite ?? '€'}
      </div>

      {/* Barre */}
      <div
        style={{
          width: 180,
          height: hauteur,
          backgroundColor: couleur,
          borderRadius: '4px 4px 0 0',
          boxShadow: barre.highlight
            ? `0 0 0 4px ${colors.accent[400]}, 0 0 0 6px ${colors.background}`
            : 'none',
          opacity: 0.92,
        }}
      />

      {/* Label sous la barre */}
      <div
        style={{
          opacity,
          width: 220,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 18,
            color: colors.neutral[700],
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {barre.label}
        </div>
        {barre.sousLabel && (
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.neutral[500],
              marginTop: 4,
              fontStyle: 'italic',
              lineHeight: 1.3,
            }}
          >
            {barre.sousLabel}
          </div>
        )}
      </div>
    </div>
  )
}
