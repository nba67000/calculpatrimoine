// Démo de la vague 3 : Persona (4 membres famille Pierre) + FluxCapital.
// Reproduit l'esprit de l'acte 1.1 (famille) et de l'acte 3.1 (flux AV avant 70 ans).

import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion'
import { Persona } from '../components/Persona'
import { FluxCapital } from '../components/FluxCapital'
import { colors, fonts } from '../theme'

export function PersonaFluxDemo() {
  const { width } = useVideoConfig()

  return (
    <>
      {/* SCÈNE 1 — Famille Pierre se construit (0-5 s) */}
      <Sequence from={0} durationInFrames={150}>
        <AbsoluteFill style={{ backgroundColor: colors.background }}>
          {/* Titre */}
          <div
            style={{
              position: 'absolute',
              top: 80,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 18,
                color: colors.accent[600],
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
              }}
            >
              Cas Pierre
            </div>
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 52,
                fontWeight: 700,
                color: colors.primary[700],
                letterSpacing: '-0.02em',
                marginTop: 16,
              }}
            >
              62 ans, marié, deux enfants
            </div>
          </div>
        </AbsoluteFill>

        {/* Famille positionnée en ligne horizontale, centrée verticalement plus bas */}
        {/* Pierre (défunt) à gauche */}
        <Persona
          nom="Pierre"
          age={62}
          role="defunt"
          x={width * 0.16}
          y={420}
          frameApparition={0}
          showAnnotation
        />
        {/* Catherine (conjoint TEPA) */}
        <Persona
          nom="Catherine"
          age={60}
          role="conjoint"
          x={width * 0.36}
          y={420}
          frameApparition={20}
          showAnnotation
        />
        {/* Marie (héritière + bénéficiaire AV) */}
        <Persona
          nom="Marie"
          age={34}
          role="heritier"
          bordureAv
          x={width * 0.56}
          y={420}
          frameApparition={40}
          showAnnotation
        />
        {/* Thomas (héritier + bénéficiaire AV) */}
        <Persona
          nom="Thomas"
          age={31}
          role="heritier"
          bordureAv
          x={width * 0.76}
          y={420}
          frameApparition={60}
          showAnnotation
        />
      </Sequence>

      {/* SCÈNE 2 — Décès de Pierre + highlight des bénéficiaires (5-9 s) */}
      <Sequence from={150} durationInFrames={120}>
        <AbsoluteFill style={{ backgroundColor: colors.background }}>
          <div
            style={{
              position: 'absolute',
              top: 80,
              left: 0,
              right: 0,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 48,
                fontWeight: 700,
                color: colors.primary[700],
              }}
            >
              À 80 ans, Pierre décède
            </div>
          </div>
        </AbsoluteFill>

        {/* Pierre décédé (grisé) */}
        <Persona
          nom="Pierre"
          age={62}
          role="defunt"
          x={width * 0.16}
          y={420}
          decede
        />
        <Persona
          nom="Catherine"
          age={60}
          role="conjoint"
          x={width * 0.36}
          y={420}
        />
        {/* Marie et Thomas avec highlight */}
        <Persona
          nom="Marie"
          age={34}
          role="heritier"
          bordureAv
          x={width * 0.56}
          y={420}
          highlight
          showAnnotation
        />
        <Persona
          nom="Thomas"
          age={31}
          role="heritier"
          bordureAv
          x={width * 0.76}
          y={420}
          highlight
          showAnnotation
        />
      </Sequence>

      {/* SCÈNE 3 — FluxCapital : AV avant 70 ans contourne la succession (9-15 s) */}
      <Sequence from={270} durationInFrames={180}>
        <FluxCapital
          titre="Versements AV avant 70 ans"
          source="Art. 990 I CGI — Hors succession"
          boites={[
            { id: 'pierre', label: 'Pierre', sousLabel: 'Versements AV', x: 0.0, y: 0.5, couleur: 'bleu-marine' },
            { id: 'succession', label: 'Succession', sousLabel: 'Barème Art. 777', x: 0.5, y: 0.1, couleur: 'rouge' },
            { id: 'benef', label: 'Marie + Thomas', sousLabel: 'Bénéficiaires AV', montant: 300000, x: 1.0, y: 0.5, couleur: 'dore' },
          ]}
          flux={[
            { de: 'pierre', vers: 'succession', bloque: true, label: 'Contournement' },
            { de: 'pierre', vers: 'benef', delai: 15, label: '152 500 € abattement / bénéficiaire' },
          ]}
        />
      </Sequence>

      {/* SCÈNE 4 — FluxCapital : AV après 70 ans rentre dans la succession (15-21 s) */}
      <Sequence from={450} durationInFrames={180}>
        <FluxCapital
          titre="Versements AV après 70 ans"
          source="Art. 757 B CGI — Agrégation à la succession"
          boites={[
            { id: 'pierre', label: 'Pierre', sousLabel: 'Versements AV', x: 0.0, y: 0.5, couleur: 'bleu-marine' },
            { id: 'succession', label: 'Succession', sousLabel: 'Barème + abattement 100k', x: 0.5, y: 0.3, couleur: 'rouge' },
            { id: 'benef', label: 'Marie + Thomas', sousLabel: 'Héritiers', montant: 269500, x: 1.0, y: 0.5, couleur: 'dore' },
          ]}
          flux={[
            { de: 'pierre', vers: 'succession', label: 'Abattement 30 500 € global' },
            { de: 'succession', vers: 'benef', delai: 20, label: 'Droits ligne directe' },
          ]}
        />
      </Sequence>
    </>
  )
}
