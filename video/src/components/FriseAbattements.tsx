import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { colors, fonts } from '../theme'

export interface EvenementFrise {
  /** Année (absolue, ex : 47) ou nombre d'années depuis le début (relatif). */
  annee: number
  /** Type d'événement — détermine le style visuel. */
  type: 'donation' | 'deces' | 'recharge-abattement' | 'autre'
  /** Label affiché sous le marqueur. */
  label: string
  /** Sous-label optionnel. */
  sousLabel?: string
}

interface FriseAbattementsProps {
  /** Année de début de la frise (par défaut 47, comme dans l'épisode 01). */
  anneeDebut?: number
  /** Année de fin de la frise (par défaut 80). */
  anneeFin?: number
  /** Période de rechargement de l'abattement (par défaut 15 ans, Art. 784 CGI). */
  periodeRechargement?: number
  /** Liste d'événements à afficher sur la frise. */
  evenements: EvenementFrise[]
  /** Titre au-dessus de la frise. */
  titre?: string
  /** Source légale. */
  source?: string
  /** Frame de début d'apparition (par défaut 0). */
  frameApparition?: number
  /** Vitesse de construction de la frise (frames par évènement). Par défaut 24. */
  staggerFrames?: number
}

/**
 * Timeline horizontale qui montre les rechargements successifs de l'abattement
 * (Art. 784 CGI — 15 ans) et les événements clés (donations, décès).
 *
 * La frise se construit de gauche à droite ; chaque événement apparaît avec
 * un stagger réglable. Les périodes de rechargement sont matérialisées par
 * des barres verticales dorées.
 *
 * @example
 *   <FriseAbattements
 *     anneeDebut={47}
 *     anneeFin={80}
 *     evenements={[
 *       { annee: 47, type: 'donation', label: 'Donation 200 000 €' },
 *       { annee: 62, type: 'donation', label: 'Donation 200 000 €' },
 *       { annee: 80, type: 'deces', label: 'Décès' },
 *     ]}
 *   />
 */
export function FriseAbattements({
  anneeDebut = 47,
  anneeFin = 80,
  periodeRechargement = 15,
  evenements,
  titre,
  source,
  frameApparition = 0,
  staggerFrames = 24,
}: FriseAbattementsProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const frameRelatif = frame - frameApparition

  const dureeTotale = anneeFin - anneeDebut

  // Calcul des positions de rechargement (chaque 15 ans depuis le début)
  const rechargements: number[] = []
  for (let a = anneeDebut + periodeRechargement; a <= anneeFin; a += periodeRechargement) {
    rechargements.push(a)
  }

  // Progression globale de la frise (la ligne se trace de gauche à droite)
  const progressionLigne = spring({
    frame: frameRelatif,
    fps,
    config: { damping: 22, stiffness: 60 },
  })
  const largeurLigne = interpolate(progressionLigne, [0, 1], [0, 100])

  const opacityCadre = interpolate(progressionLigne, [0, 0.3], [0, 1])

  // Fonction utilitaire : convertit une année en position horizontale (en %)
  const positionPct = (annee: number) =>
    ((annee - anneeDebut) / dureeTotale) * 100

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        padding: '80px 100px',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      {/* En-tête */}
      {(titre || source) && (
        <div style={{ opacity: opacityCadre, textAlign: 'center' }}>
          {titre && (
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 48,
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
                fontSize: 18,
                color: colors.accent[600],
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                marginTop: 12,
              }}
            >
              {source}
            </div>
          )}
        </div>
      )}

      {/* Conteneur de la frise */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 80,
          paddingBottom: 120,
        }}
      >
        {/* Marqueurs de rechargement (barres verticales dorées) */}
        {rechargements.map(annee => {
          const positionRecharge = positionPct(annee)
          const seuilRecharge = positionRecharge / 100
          const opacityRecharge = interpolate(
            progressionLigne,
            [seuilRecharge - 0.05, seuilRecharge + 0.05],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          )

          return (
            <div
              key={`recharge-${annee}`}
              style={{
                position: 'absolute',
                left: `${positionRecharge}%`,
                top: 20,
                bottom: 80,
                width: 4,
                marginLeft: -2,
                backgroundColor: colors.accent[400],
                opacity: opacityRecharge,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -42,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontFamily: fonts.mono,
                  fontSize: 14,
                  color: colors.accent[700],
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}
              >
                Abattement
                <br />
                rechargé
              </div>
            </div>
          )
        })}

        {/* Ligne horizontale principale */}
        <div
          style={{
            position: 'relative',
            height: 4,
            backgroundColor: colors.neutral[200],
            borderRadius: 2,
            width: '100%',
          }}
        >
          {/* La partie qui se "remplit" en bleu marine */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${largeurLigne}%`,
              backgroundColor: colors.primary[600],
              borderRadius: 2,
            }}
          />
        </div>

        {/* Marqueurs de début et fin */}
        <Marqueur
          position={0}
          label={`${anneeDebut} ans`}
          opacity={opacityCadre}
        />
        <Marqueur
          position={100}
          label={`${anneeFin} ans`}
          opacity={opacityCadre}
        />

        {/* Événements (donations, décès, etc.) */}
        {evenements.map((evenement, index) => {
          const positionEvent = positionPct(evenement.annee)
          const apparitionEvent = frameRelatif - staggerFrames * (index + 1)
          return (
            <PointEvenement
              key={`event-${evenement.annee}-${index}`}
              evenement={evenement}
              positionPct={positionEvent}
              frameApparition={apparitionEvent}
              fps={fps}
            />
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

function Marqueur({
  position,
  label,
  opacity,
}: {
  position: number
  label: string
  opacity: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${position}%`,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        opacity,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          backgroundColor: colors.primary[700],
          marginBottom: 12,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: fonts.mono,
          fontSize: 16,
          color: colors.neutral[600],
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  )
}

function PointEvenement({
  evenement,
  positionPct,
  frameApparition,
  fps,
}: {
  evenement: EvenementFrise
  positionPct: number
  frameApparition: number
  fps: number
}) {
  const progression = spring({
    frame: frameApparition,
    fps,
    config: { damping: 16, stiffness: 110 },
  })
  const opacity = interpolate(progression, [0, 1], [0, 1])
  const scale = interpolate(progression, [0, 1], [0.6, 1])

  // Style selon le type d'événement
  const couleurPoint =
    evenement.type === 'donation'
      ? colors.primary[700]
      : evenement.type === 'deces'
        ? colors.danger
        : evenement.type === 'recharge-abattement'
          ? colors.accent[400]
          : colors.neutral[500]

  return (
    <div
      style={{
        position: 'absolute',
        left: `${positionPct}%`,
        top: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Bloc label au-dessus de la ligne */}
      <div
        style={{
          marginBottom: 14,
          padding: '8px 16px',
          backgroundColor: colors.surface.card,
          border: `2px solid ${couleurPoint}`,
          borderRadius: 4,
          textAlign: 'center',
          minWidth: 160,
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 20,
            fontWeight: 700,
            color: couleurPoint,
            lineHeight: 1.2,
          }}
        >
          {evenement.label}
        </div>
        {evenement.sousLabel && (
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.neutral[500],
              marginTop: 4,
              fontStyle: 'italic',
            }}
          >
            {evenement.sousLabel}
          </div>
        )}
      </div>

      {/* Le point sur la ligne */}
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          backgroundColor: couleurPoint,
          border: `3px solid ${colors.background}`,
        }}
      />
    </div>
  )
}
