import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, fonts } from '../theme'

export interface Tranche {
  /** Borne basse de la tranche (incluse). */
  min: number
  /** Borne haute de la tranche (exclue). Utiliser Infinity pour la dernière. */
  max: number
  /** Taux d'imposition de la tranche (ex : 0.05 pour 5 %). */
  taux: number
}

interface BaremeProgressifProps {
  /** Liste des tranches du barème (du taux le plus bas au plus haut). */
  tranches: Tranche[]
  /** Montant taxable à appliquer dans le barème. */
  baseTaxable: number
  /** Référence légale affichée en haut (ex : "Article 777 du CGI"). */
  source?: string
  /** Frame de début d'apparition (par défaut 0). */
  frameApparition?: number
  /** Stagger entre tranches qui s'éclairent (en frames). Par défaut 20. */
  staggerFrames?: number
}

/**
 * Visualisation tranche par tranche d'un barème progressif. Les tranches
 * s'éclairent à mesure que la base taxable les remplit, avec le calcul affiché
 * à droite de chaque tranche concernée.
 *
 * Usage : barème ligne directe Art. 777 CGI (acte 1.4 de l'épisode 01), mais
 * aussi tout barème progressif (IR, IFI, etc.).
 *
 * @example
 *   <BaremeProgressif
 *     tranches={BAREME_LIGNE_DIRECTE}
 *     baseTaxable={25000}
 *     source="Article 777 du CGI"
 *   />
 */
export function BaremeProgressif({
  tranches,
  baseTaxable,
  source,
  frameApparition = 0,
  staggerFrames = 20,
}: BaremeProgressifProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const frameRelatif = frame - frameApparition

  // Total cumulé pour l'affichage final
  let droitsTotal = 0
  const tranchesAvecCalcul = tranches.map(t => {
    if (baseTaxable <= t.min) {
      return { ...t, montantDansTranche: 0, droitsTranche: 0 }
    }
    const montantDansTranche = Math.min(baseTaxable, t.max) - t.min
    const droitsTranche = montantDansTranche * t.taux
    droitsTotal += droitsTranche
    return { ...t, montantDansTranche, droitsTranche }
  })

  const opacityGlobal = interpolate(
    spring({ frame: frameRelatif, fps, config: { damping: 18, stiffness: 90 } }),
    [0, 1],
    [0, 1],
  )

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        padding: '60px 100px',
        flexDirection: 'column',
        gap: 24,
        opacity: opacityGlobal,
      }}
    >
      {/* En-tête : source */}
      {source && (
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 18,
            color: colors.accent[600],
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            textAlign: 'center',
          }}
        >
          {source}
        </div>
      )}

      {/* Base taxable rappelée en haut */}
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 32,
          color: colors.primary[700],
          textAlign: 'center',
          fontWeight: 700,
        }}
      >
        Base taxable : {baseTaxable.toLocaleString('fr-FR')} €
      </div>

      {/* Tableau des tranches */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginTop: 16,
        }}
      >
        {tranchesAvecCalcul.map((t, index) => (
          <LigneTranche
            key={`tranche-${t.min}`}
            tranche={t}
            frameApparition={frameRelatif - index * staggerFrames}
            fps={fps}
            active={t.montantDansTranche > 0}
          />
        ))}
      </div>

      {/* Total final */}
      <LigneTotal
        droitsTotal={droitsTotal}
        frameApparition={frameRelatif - tranches.length * staggerFrames}
        fps={fps}
      />
    </AbsoluteFill>
  )
}

function LigneTranche({
  tranche,
  frameApparition,
  fps,
  active,
}: {
  tranche: Tranche & { montantDansTranche: number; droitsTranche: number }
  frameApparition: number
  fps: number
  active: boolean
}) {
  const progression = spring({
    frame: frameApparition,
    fps,
    config: { damping: 18, stiffness: 100 },
  })
  const opacity = interpolate(progression, [0, 1], [0, 1])
  const fond = active
    ? interpolate(progression, [0, 1], [0, 1])
    : 0

  const formatBorne = (v: number) =>
    v === Infinity ? '∞' : `${v.toLocaleString('fr-FR')} €`

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr 1fr 1.5fr',
        alignItems: 'center',
        gap: 24,
        padding: '14px 24px',
        backgroundColor: `rgba(212, 175, 55, ${fond * 0.15})`,
        borderLeft: active
          ? `4px solid ${colors.accent[400]}`
          : `4px solid ${colors.neutral[200]}`,
        opacity,
        borderRadius: 4,
      }}
    >
      {/* Taux */}
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 32,
          fontWeight: 700,
          color: active ? colors.primary[700] : colors.neutral[400],
        }}
      >
        {(tranche.taux * 100).toFixed(0)} %
      </div>

      {/* Borne basse */}
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 20,
          color: colors.neutral[600],
        }}
      >
        {formatBorne(tranche.min)}
      </div>

      {/* Borne haute */}
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 20,
          color: colors.neutral[600],
        }}
      >
        → {formatBorne(tranche.max)}
      </div>

      {/* Calcul (visible uniquement si active) */}
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 20,
          color: active ? colors.primary[700] : colors.neutral[300],
          fontWeight: active ? 600 : 400,
          textAlign: 'right',
        }}
      >
        {active ? (
          <>
            {tranche.montantDansTranche.toLocaleString('fr-FR')} × {(tranche.taux * 100).toFixed(0)} % ={' '}
            <strong style={{ color: colors.accent[600] }}>
              {Math.round(tranche.droitsTranche).toLocaleString('fr-FR')} €
            </strong>
          </>
        ) : (
          'non atteinte'
        )}
      </div>
    </div>
  )
}

function LigneTotal({
  droitsTotal,
  frameApparition,
  fps,
}: {
  droitsTotal: number
  frameApparition: number
  fps: number
}) {
  const progression = spring({
    frame: frameApparition,
    fps,
    config: { damping: 18, stiffness: 100 },
  })
  const opacity = interpolate(progression, [0, 1], [0, 1])

  return (
    <div
      style={{
        opacity,
        marginTop: 24,
        padding: '24px 32px',
        backgroundColor: colors.primary[700],
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 22,
          color: colors.accent[300],
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        }}
      >
        Droits totaux
      </div>
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 56,
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-0.02em',
        }}
      >
        {Math.round(droitsTotal).toLocaleString('fr-FR')} €
      </div>
    </div>
  )
}
