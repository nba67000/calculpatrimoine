'use client'

import { calculerComparateurLocatif } from '@/lib/comparateurLocatif'
import type { ComparateurLocatifInputs, RegimeLocatif, VehiculePlacement } from '@/types/comparateurLocatif'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur } from '@/lib/formatters'

const DEFAULT_INPUTS: ComparateurLocatifInputs = {
  capitalInitial: 200000,
  dureeAnnees: 20,
  tmi: 30,
  rendementLocatifBrut: 5,
  valorisationAnnuelle: 2,
  fraisChargesPct: 30,
  regimeLocatif: 'micro_foncier',
  rendementPlacementBrut: 6,
  vehiculePlacement: 'pea',
}

const TMI_OPTIONS = [0, 11, 30, 41, 45] as const

export default function ComparateurLocatifCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'comparateur-locatif-placement',
    nom: 'Locatif vs placement',
    href: '/comparateur-locatif-placement',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerComparateurLocatif,
    resume: r => `${r.optionAvantageuse === 'locatif' ? 'Locatif' : 'Placement'} gagnant : ${formatEur(r.ecart)}`,
  })

  function set<K extends keyof ComparateurLocatifInputs>(k: K, v: ComparateurLocatifInputs[K]) {
    setInputs(prev => ({ ...prev, [k]: v }))
  }

  return (
    <>
      <SimResumeBanner slug="comparateur-locatif-placement" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Données communes</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Capital (€)</label>
                <input type="number" min="10000" step="10000" value={inputs.capitalInitial}
                  onChange={e => set('capitalInitial', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Durée (ans)</label>
                <input type="number" min="1" max="40" value={inputs.dureeAnnees}
                  onChange={e => set('dureeAnnees', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">TMI</label>
              <div className="flex gap-2">
                {TMI_OPTIONS.map(t => (
                  <button key={t} onClick={() => set('tmi', t)}
                    className={`px-4 py-2 rounded font-mono text-sm border-2 ${inputs.tmi === t ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-200'}`}>
                    {t} %
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl border-2 border-orange-300 p-6 space-y-4">
            <h3 className="text-xl font-bold text-orange-900">Option locatif</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-neutral-600 block mb-1">Rendement locatif brut (%)</label>
                <input type="number" min="0" step="0.5" value={inputs.rendementLocatifBrut}
                  onChange={e => set('rendementLocatifBrut', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
              <div>
                <label className="text-xs text-neutral-600 block mb-1">Valorisation annuelle (%)</label>
                <input type="number" min="0" step="0.5" value={inputs.valorisationAnnuelle}
                  onChange={e => set('valorisationAnnuelle', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
            </div>
            <div>
              <label className="text-xs text-neutral-600 block mb-1">Frais et charges (% du loyer brut)</label>
              <input type="number" min="0" max="100" value={inputs.fraisChargesPct}
                onChange={e => set('fraisChargesPct', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
            </div>
            <div>
              <label className="text-xs text-neutral-600 block mb-1">Régime fiscal</label>
              <select value={inputs.regimeLocatif}
                onChange={e => set('regimeLocatif', e.target.value as RegimeLocatif)}
                className="w-full px-3 py-2 border border-neutral-200 rounded">
                <option value="micro_foncier">Micro-foncier : 30 % du loyer ne sont pas taxés (forfait charges)</option>
                <option value="reel_nu">Régime réel : on déduit les charges réelles que vous saisissez ci-dessus</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl border-2 border-blue-300 p-6 space-y-4">
            <h3 className="text-xl font-bold text-blue-900">Option placement</h3>
            <div>
              <label className="text-xs text-neutral-600 block mb-1">Rendement annuel brut (%)</label>
              <input type="number" min="0" step="0.5" value={inputs.rendementPlacementBrut}
                onChange={e => set('rendementPlacementBrut', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
            </div>
            <div>
              <label className="text-xs text-neutral-600 block mb-1">Véhicule</label>
              <select value={inputs.vehiculePlacement}
                onChange={e => set('vehiculePlacement', e.target.value as VehiculePlacement)}
                className="w-full px-3 py-2 border border-neutral-200 rounded">
                <option value="pea">PEA (exonéré IR après 5 ans, PS 18,6 %)</option>
                <option value="assurance_vie">Assurance-vie (abattement 4 600 € après 8 ans)</option>
                <option value="cto">CTO (PFU 31,4 %)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-xl border-2 p-6 ${results.optionAvantageuse === 'locatif' ? 'bg-orange-50 border-orange-400' : 'bg-blue-50 border-blue-400'}`}>
            <p className="text-sm text-neutral-600 mb-2">Option avantageuse sur {inputs.dureeAnnees} ans</p>
            <p className="text-3xl font-bold text-neutral-900 mb-1">
              {results.optionAvantageuse === 'locatif' ? 'Locatif' : 'Placement financier'}
            </p>
            <p className="text-sm text-neutral-600">
              Écart : <strong>{formatEur(results.ecart)}</strong> · Rendement annuel composé : <strong>{results.rendementAnnuelAvantageux} %</strong>
            </p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-orange-900 mb-3">Locatif (cumulé)</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Loyers nets cumulés</span>
              <span className="text-right">{formatEur(results.loyersCumulesNets)}</span>
              <span className="text-neutral-500">Capital revente</span>
              <span className="text-right">{formatEur(results.capitalRevente)}</span>
              <span className="text-neutral-500">PV immo nette</span>
              <span className="text-right">{formatEur(results.pvImmoNette)}</span>
              <span className="font-bold pt-2 border-t">Total net locatif</span>
              <span className="text-right font-bold text-primary-700 pt-2 border-t">{formatEur(results.totalNetLocatif)}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Placement (cumulé)</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Capital final brut</span>
              <span className="text-right">{formatEur(results.capitalFinalBrut)}</span>
              <span className="text-neutral-500">Impôt sortie</span>
              <span className="text-right">{formatEur(results.impotSortiePlacement)}</span>
              <span className="font-bold pt-2 border-t">Total net placement</span>
              <span className="text-right font-bold text-primary-700 pt-2 border-t">{formatEur(results.totalNetPlacement)}</span>
            </div>
          </div>

          <AlertList items={results.warnings} />
          <AlertList items={results.optimisations} />
        </div>
      </div>

      <div className="mt-4 border-t border-neutral-200">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 px-1 pt-4 pb-2">
          Questions naturelles après ce résultat
        </p>
        <CrossLink
          href="/plus-value-immobiliere"
          title="Impôt à la sortie du locatif"
          description="Le calculateur ignore la fiscalité à la revente : IR 19 % + PS 18,6 %, abattements par durée de détention."
        />
        <CrossLink
          href="/lmnp-reel-vs-micro"
          title="Si vous penchez locatif : choisir le régime"
          description="Régime micro-BIC ou réel selon le rendement et la possibilité d'amortir le bien."
        />
        <CrossLink
          href="/pea"
          title="Si vous penchez placement : enveloppe PEA"
          description="Après 5 ans, le PEA est exonéré d'IR sur les plus-values, seuls les PS 18,6 % restent."
        />
      </div>

      <ChatWidget contexte={{ calculateur: 'comparateur-locatif-placement', inputs, results }} />
    </>
  )
}
