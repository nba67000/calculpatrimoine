// Démo de la vague 2 : BarresComparatives, BaremeProgressif, FriseAbattements.
// Reproduit les visuels clés des actes 1.4, 2.1, 2.3 et 3.4 du script ép.01.

import { Sequence } from 'remotion'
import { BarresComparatives } from '../components/BarresComparatives'
import { BaremeProgressif } from '../components/BaremeProgressif'
import { FriseAbattements } from '../components/FriseAbattements'

// Barème ligne directe Art. 777 CGI — synchronisé avec src/lib/transmission.ts du site
const BAREME_LIGNE_DIRECTE = [
  { min: 0, max: 8072, taux: 0.05 },
  { min: 8072, max: 12109, taux: 0.10 },
  { min: 12109, max: 15932, taux: 0.15 },
  { min: 15932, max: 552324, taux: 0.20 },
  { min: 552324, max: 902838, taux: 0.30 },
  { min: 902838, max: 1805677, taux: 0.40 },
  { min: 1805677, max: Infinity, taux: 0.45 },
]

export function DiagrammesDemo() {
  return (
    <>
      {/* SCÈNE 1 — BarresComparatives : les 3 scénarios principaux (acte 3.4) */}
      <Sequence from={0} durationInFrames={150}>
        <BarresComparatives
          titre="Trois scénarios, trois résultats"
          sousTitre="Pierre, 800 000 € de patrimoine, décès à 80 ans"
          barres={[
            { label: 'Scénario 1', sousLabel: "Pierre n'anticipe rien", valeur: 56677, couleur: 'rouge' },
            { label: 'Scénario 2', sousLabel: 'Donations + AV après 70', valeur: 50289, couleur: 'neutre' },
            { label: 'Scénario 3', sousLabel: 'Donations + AV avant 70', valeur: 0, couleur: 'dore', highlight: true },
          ]}
        />
      </Sequence>

      {/* SCÈNE 2 — BaremeProgressif : 25 000 € taxables dans le barème ligne directe (acte 1.4) */}
      <Sequence from={150} durationInFrames={210}>
        <BaremeProgressif
          tranches={BAREME_LIGNE_DIRECTE}
          baseTaxable={25000}
          source="Article 777 du CGI — Barème ligne directe"
        />
      </Sequence>

      {/* SCÈNE 3 — FriseAbattements : les donations échelonnées de Pierre (acte 2.1 + 2.2) */}
      <Sequence from={360} durationInFrames={180}>
        <FriseAbattements
          titre="Donations échelonnées sur 33 ans"
          source="Article 784 CGI — Rappel fiscal des 15 ans"
          anneeDebut={47}
          anneeFin={80}
          periodeRechargement={15}
          evenements={[
            {
              annee: 47,
              type: 'donation',
              label: 'Donation 200 000 €',
              sousLabel: '100 000 € par enfant',
            },
            {
              annee: 62,
              type: 'donation',
              label: 'Donation 200 000 €',
              sousLabel: 'Abattement rechargé',
            },
            {
              annee: 80,
              type: 'deces',
              label: 'Décès',
              sousLabel: 'Abattement rechargé une 3e fois',
            },
          ]}
        />
      </Sequence>

      {/* SCÈNE 4 — BarresComparatives : les 3 clauses bénéficiaires AV (acte 5.4) */}
      <Sequence from={540} durationInFrames={150}>
        <BarresComparatives
          titre="Mêmes chiffres, même AV, trois clauses différentes"
          sousTitre="Scénario 1 décliné selon la clause bénéficiaire"
          barres={[
            { label: 'Enfants seuls', sousLabel: 'Marie + Thomas', valeur: 56677, couleur: 'rouge' },
            { label: 'Clause partagée', sousLabel: 'Catherine 50 % + enfants 25 / 25', valeur: 26677, couleur: 'neutre' },
            { label: 'Conjoint 100 %', sousLabel: 'Catherine seule, exonérée TEPA', valeur: 6388, couleur: 'dore', highlight: true },
          ]}
        />
      </Sequence>
    </>
  )
}
