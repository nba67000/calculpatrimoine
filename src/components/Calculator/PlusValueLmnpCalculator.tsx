'use client'

import { calculerPlusValueLmnp } from '@/lib/plusValueLmnp'
import type { PlusValueLmnpInputs } from '@/types/plusValueLmnp'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur } from '@/lib/formatters'

const DEFAULT_INPUTS: PlusValueLmnpInputs = {
  dateAcquisition: '2018-05-02',
  prixAcquisition: 200000,
  fraisAcquisition: 'forfait',
  fraisAcquisitionReels: 0,
  travaux: 'aucun',
  travauxReels: 0,
  dateCession: '2026-05-02',
  prixCession: 320000,
  typeBien: 'autre',
  premiereCession: false,
  amortissementsLmnpCumules: 30000,
}

export default function PlusValueLmnpCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'plus-value-immobiliere/lmnp',
    nom: 'Plus-value LMNP',
    href: '/plus-value-immobiliere/lmnp',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerPlusValueLmnp,
    resume: r =>
      r.surcoutLmnp > 0
        ? `PV LMNP : surcoût de ${formatEur(r.surcoutLmnp)} vs standard`
        : null,
  })

  function set<K extends keyof PlusValueLmnpInputs>(k: K, v: PlusValueLmnpInputs[K]) {
    setInputs(prev => ({ ...prev, [k]: v }))
  }

  return (
    <>
      <SimResumeBanner slug="plus-value-immobiliere/lmnp" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Acquisition</h3>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Date d&apos;acquisition</label>
              <input type="date" value={inputs.dateAcquisition}
                onChange={e => set('dateAcquisition', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Prix d&apos;acquisition (€)</label>
              <input type="number" min="0" step="10000" value={inputs.prixAcquisition}
                onChange={e => set('prixAcquisition', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Cession</h3>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Date de cession</label>
              <input type="date" value={inputs.dateCession}
                onChange={e => set('dateCession', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Prix de cession (€)</label>
              <input type="number" min="0" step="10000" value={inputs.prixCession}
                onChange={e => set('prixCession', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl border-2 border-amber-300 p-6 shadow-sm space-y-2">
            <h3 className="text-xl font-bold text-amber-900">Amortissements LMNP</h3>
            <p className="text-sm text-amber-800">
              Total des amortissements que vous avez déduits de vos loyers depuis l&apos;achat. Depuis le
              15/02/2025, ces amortissements sont retirés du prix d&apos;achat fiscal au moment de la vente :
              votre plus-value imposable augmente d&apos;autant (Art. 150 VB III CGI).
            </p>
            <div>
              <input type="number" min="0" step="1000" value={inputs.amortissementsLmnpCumules}
                onChange={e => set('amortissementsLmnpCumules', Number(e.target.value))}
                className="w-full px-3 py-2 border border-amber-300 rounded text-right text-lg font-bold" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-6">
            <p className="text-sm text-neutral-600 mb-1">Surcoût d&apos;impôt dû au régime LMNP</p>
            <p className="text-3xl font-bold text-red-800">{formatEur(results.surcoutLmnp)}</p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Comparaison</h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm">
              <span></span>
              <span className="text-right text-xs text-neutral-500">Standard</span>
              <span className="text-right text-xs text-neutral-500">LMNP</span>
              <span className="text-neutral-500">PV brute</span>
              <span className="text-right">{formatEur(results.resultatStandard.pvBrute)}</span>
              <span className="text-right font-medium">{formatEur(results.resultatLmnp.pvBrute)}</span>
              <span className="text-neutral-500">IR 19 %</span>
              <span className="text-right">{formatEur(results.resultatStandard.impotRevenu)}</span>
              <span className="text-right font-medium">{formatEur(results.resultatLmnp.impotRevenu)}</span>
              <span className="text-neutral-500">PS 18,6 %</span>
              <span className="text-right">{formatEur(results.resultatStandard.prelevementsSociaux)}</span>
              <span className="text-right font-medium">{formatEur(results.resultatLmnp.prelevementsSociaux)}</span>
              <span className="text-neutral-500">Surtaxe</span>
              <span className="text-right">{formatEur(results.resultatStandard.surtaxe)}</span>
              <span className="text-right font-medium">{formatEur(results.resultatLmnp.surtaxe)}</span>
              <span className="font-bold pt-2 border-t">Total impôts</span>
              <span className="text-right font-bold pt-2 border-t">{formatEur(results.resultatStandard.totalImpots)}</span>
              <span className="text-right font-bold text-red-700 pt-2 border-t">{formatEur(results.resultatLmnp.totalImpots)}</span>
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
          title="Plus-value immobilière hors LMNP"
          description="Régime standard, sans réintégration des amortissements : IR 19 % + PS 18,6 %, abattements par durée."
        />
        <CrossLink
          href="/lmnp-reel-vs-micro"
          title="Régime fiscal durant la détention"
          description="Réel ou micro-BIC : choix qui détermine les amortissements pratiqués et donc la PV future."
        />
        <CrossLink
          href="/sci-is-vs-ir"
          title="Alternative SCI à l'IS"
          description="La SCI à l'IS suit aussi un régime PV pro avec réintégration des amortissements (logique analogue au LMNP depuis 2025)."
        />
      </div>

      <ChatWidget contexte={{ calculateur: 'plus-value-immobiliere/lmnp', inputs, results }} />
    </>
  )
}
