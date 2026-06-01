// src/lib/calculators/index.ts
//
// **Calculator registry** , collecteur unique des modules calculateur.
//
// Voir CONTEXT.md (vocabulaire) et ADR-0001 (raison d'être).
//
// Pour ajouter un calculateur :
//   1. Exporter `module<Nom>: CalculatorModule<XInputs, XResults>` depuis `src/lib/<calc>.ts`
//   2. Ajouter l'import + l'entrée dans `MODULES` ci-dessous.
//
// Le compilateur TypeScript garantit l'unicité du slug (aucun, c'est un Array)
// , la duplication est repérée par `getCalculator` au premier accès si jamais
// elle se glisse. Pour une vérification stricte, ajouter un test runtime.

import type { CalculatorModule } from './types'

import { moduleTmi } from '@/lib/tmi'
import { modulePer } from '@/lib/per'
import { moduleIfi } from '@/lib/ifi'
import { modulePlusValue } from '@/lib/plusValueImmobiliere'
import { moduleAvRachat } from '@/lib/assuranceVie'
import { moduleTransmission } from '@/lib/transmission'
import { moduleRenteViagere } from '@/lib/mortality'
import { moduleDonation } from '@/lib/donation'
import { moduleSuccession } from '@/lib/succession'
import { modulePerSortie } from '@/lib/perSortie'
import { modulePretIntrafamilial } from '@/lib/pretIntrafamilial'
import { moduleDonationDemembrement } from '@/lib/donationDemembrement'
import { modulePlusValueLmnp } from '@/lib/plusValueLmnp'
import { moduleComparateurLocatif } from '@/lib/comparateurLocatif'
import { modulePea } from '@/lib/pea'
import { moduleLmnpRegime } from '@/lib/lmnpRegime'
import { moduleSciRegime } from '@/lib/sciRegime'
import { moduleCsgRetraite } from '@/lib/csgRetraite'
import { moduleDeficitFoncier } from '@/lib/deficitFoncier'

// Stockage interne : les paramètres génériques TInputs/TResults sont délibérément
// effacés pour permettre un dispatch runtime sur slug. Le typage strict reste
// préservé au callsite côté composants Calculator qui invoquent le module
// directement avec leurs types.
const MODULES: ReadonlyArray<CalculatorModule> = [
  moduleTmi as CalculatorModule,
  modulePer as CalculatorModule,
  moduleIfi as CalculatorModule,
  modulePlusValue as CalculatorModule,
  moduleAvRachat as CalculatorModule,
  moduleTransmission as CalculatorModule,
  moduleRenteViagere as CalculatorModule,
  moduleDonation as CalculatorModule,
  moduleSuccession as CalculatorModule,
  modulePerSortie as CalculatorModule,
  modulePretIntrafamilial as CalculatorModule,
  moduleDonationDemembrement as CalculatorModule,
  modulePlusValueLmnp as CalculatorModule,
  moduleComparateurLocatif as CalculatorModule,
  modulePea as CalculatorModule,
  moduleLmnpRegime as CalculatorModule,
  moduleSciRegime as CalculatorModule,
  moduleCsgRetraite as CalculatorModule,
  moduleDeficitFoncier as CalculatorModule,
]

/** Récupère un module calculateur par son slug, ou undefined s'il n'existe pas. */
export function getCalculator(slug: string): CalculatorModule | undefined {
  return MODULES.find(m => m.slug === slug)
}

/** Liste tous les slugs enregistrés (utile pour les tests d'exhaustivité). */
export function listCalculatorSlugs(): string[] {
  return MODULES.map(m => m.slug)
}

export type { CalculatorModule, Source, HowToSchema } from './types'
