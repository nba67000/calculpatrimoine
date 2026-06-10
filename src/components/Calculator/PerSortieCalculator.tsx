// src/components/Calculator/PerSortieCalculator.tsx
'use client'

import { calculerPerSortie } from '@/lib/perSortie'
import type { PerSortieInputs, ModeSortie } from '@/types/perSortie'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur } from '@/lib/formatters'

const DEFAULT_INPUTS: PerSortieInputs = {
  capitalAccumule: 100000,
  fractionVersementsDeductibles: 70,
  tmiRetraite: 30,
  ageRetraite: 65,
  esperanceVie: 85,
  tauxRenteAnnuel: 4,
  mode: 'capital',
  partCapitalSiMixte: 50,
}

const TMI_OPTIONS = [0, 11, 30, 41, 45] as const
const MODES: Array<{ value: ModeSortie; label: string }> = [
  { value: 'capital', label: 'Capital (en une fois)' },
  { value: 'rente', label: 'Rente viagère' },
  { value: 'mixte', label: 'Mixte (partiel capital + rente)' },
]

export default function PerSortieCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'per-sortie',
    nom: 'PER - Sortie capital vs rente',
    href: '/per-sortie',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerPerSortie,
    resume: (r) =>
      r.netCapital > 0
        ? `Capital net ${formatEur(r.netCapital)} · Rente nette ${formatEur(r.renteAnnuelleNette)}/an`
        : null,
  })

  function set<K extends keyof PerSortieInputs>(key: K, value: PerSortieInputs[K]) {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <SimResumeBanner slug="per-sortie" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          {/* Capital + fraction */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Capital accumulé</h3>
            <div className="flex items-baseline gap-2">
              <input
                type="number" min="0" step="10000"
                value={inputs.capitalAccumule}
                onChange={e => set('capitalAccumule', Number(e.target.value))}
                className="w-44 px-4 py-3 border border-neutral-300 rounded-lg text-xl font-bold text-primary-700 text-right"
              />
              <span className="text-xl font-bold text-neutral-600">€</span>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-2">
                Fraction issue des versements déductibles : <strong>{inputs.fractionVersementsDeductibles} %</strong>
              </label>
              <input
                type="range" min="0" max="100" step="5"
                value={inputs.fractionVersementsDeductibles}
                onChange={e => set('fractionVersementsDeductibles', Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Le reste ({100 - inputs.fractionVersementsDeductibles} %) correspond aux plus-values
                générées par votre PER, taxées à la flat tax 30 % (PFU) à la sortie en capital.
              </p>
            </div>
          </div>

          {/* TMI + âge + espérance */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Situation à la retraite</h3>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-2">TMI estimée à la retraite</label>
              <div className="flex gap-2 flex-wrap">
                {TMI_OPTIONS.map(t => (
                  <button
                    key={t}
                    onClick={() => set('tmiRetraite', t)}
                    className={`px-4 py-2 rounded font-mono text-sm border-2 ${inputs.tmiRetraite === t ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-200 hover:border-primary-300'}`}
                  >
                    {t} %
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-neutral-500 block mb-1">Âge liquidation</label>
                <input
                  type="number" min="55" max="100"
                  value={inputs.ageRetraite}
                  onChange={e => set('ageRetraite', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-sm text-right"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-500 block mb-1">Espérance de vie</label>
                <input
                  type="number" min="60" max="105"
                  value={inputs.esperanceVie}
                  onChange={e => set('esperanceVie', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-sm text-right"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-2">
                Taux de rente annuel : <strong>{inputs.tauxRenteAnnuel} %</strong>
              </label>
              <input
                type="range" min="2" max="8" step="0.5"
                value={inputs.tauxRenteAnnuel}
                onChange={e => set('tauxRenteAnnuel', Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Indicatif. Le taux réel dépend de l&apos;âge et des tables de mortalité de l&apos;assureur. Voir le
                calculateur /rente-viagere pour une estimation actuarielle précise.
              </p>
            </div>
          </div>

          {/* Mode */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Mode de sortie</h3>
            <div className="space-y-2">
              {MODES.map(m => (
                <button
                  key={m.value}
                  onClick={() => set('mode', m.value)}
                  className={`w-full text-left px-4 py-3 rounded font-medium text-sm border-2 ${inputs.mode === m.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-200 hover:border-primary-300'}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {inputs.mode === 'mixte' && (
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-2">
                  Part en capital : <strong>{inputs.partCapitalSiMixte} %</strong> (le reste en rente)
                </label>
                <input
                  type="range" min="0" max="100" step="5"
                  value={inputs.partCapitalSiMixte}
                  onChange={e => set('partCapitalSiMixte', Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* RÉSULTATS */}
        <div className="space-y-6">

          <div className={`rounded-xl border-2 p-6 ${results.optionAvantageuse === 'capital' ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-sm text-neutral-600 mb-2">Option avantageuse (sur l&apos;espérance saisie)</p>
            <p className="text-3xl font-bold text-neutral-900 mb-1">
              {results.optionAvantageuse === 'capital' ? 'Sortie en capital' : 'Sortie en rente'}
            </p>
            <p className="text-sm text-neutral-600">Écart net : <strong>{formatEur(results.ecart)}</strong></p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Sortie capital (immédiat)</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Impôt versements (IR)</span>
              <span className="text-right">{formatEur(results.impotVersements)}</span>
              <span className="text-neutral-500">Impôt gains (PFU 30 %)</span>
              <span className="text-right">{formatEur(results.impotGains)}</span>
              <span className="font-bold text-neutral-900 pt-2 border-t">Net capital</span>
              <span className="text-right font-bold text-primary-700 pt-2 border-t">{formatEur(results.netCapital)}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Sortie rente</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Rente annuelle brute</span>
              <span className="text-right">{formatEur(results.renteAnnuelleBrute)}</span>
              <span className="text-neutral-500">Rente annuelle nette</span>
              <span className="text-right font-medium">{formatEur(results.renteAnnuelleNette)}</span>
              <span className="font-bold text-neutral-900 pt-2 border-t">Net cumulé ({inputs.esperanceVie - inputs.ageRetraite} ans)</span>
              <span className="text-right font-bold text-primary-700 pt-2 border-t">{formatEur(results.netCumuleRente)}</span>
            </div>
          </div>

          {inputs.mode === 'mixte' && (
            <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Mode mixte (combiné)</h3>
              <p className="text-2xl font-bold text-primary-700">{formatEur(results.netMixte)}</p>
            </div>
          )}

          <AlertList items={results.warnings} />
          <AlertList items={results.optimisations} />
        </div>
      </div>

      <div className="mt-4 border-t border-neutral-200">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 px-1 pt-4 pb-2">
          Questions naturelles après ce résultat
        </p>
        <CrossLink
          href="/per-individuel"
          title="Côté entrée : économie d'impôt sur versement"
          description="Calcul amont du PER : plafond de déduction, report N-1 à N-5, coût net du versement après économie."
        />
        <CrossLink
          href="/rente-viagere"
          title="Modélisation actuarielle d'une rente"
          description="Estimer le taux de conversion réel à partir des tables INSEE 2021 plutôt qu'une hypothèse forfaitaire."
        />
        <CrossLink
          href="/csg-csds-retraite"
          title="CSG sur la rente PER"
          description="La rente PER est soumise à la CSG retraite (taux 4,3 / 7,4 / 9,1 %) selon votre RFR."
        />
      </div>

      <ChatWidget contexte={{ calculateur: 'per-sortie', inputs, results }} />
    </>
  )
}
