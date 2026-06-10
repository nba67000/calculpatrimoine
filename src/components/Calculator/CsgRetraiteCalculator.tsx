'use client'

import { calculerCsgRetraite } from '@/lib/csgRetraite'
import type { CsgRetraiteInputs } from '@/types/csgRetraite'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur, formatPct } from '@/lib/formatters'

const DEFAULT_INPUTS: CsgRetraiteInputs = {
  pensionBruteAnnuelle: 24000,
  revenuFiscalReference: 22000,
  nombreParts: 1,
}

const TAUX_LABELS = {
  exonere: { label: 'Exonéré', color: 'bg-green-100 border-green-300 text-green-900' },
  reduit:  { label: 'Réduit (4,3 %)', color: 'bg-blue-100 border-blue-300 text-blue-900' },
  median:  { label: 'Médian (7,4 %)', color: 'bg-orange-100 border-orange-300 text-orange-900' },
  normal:  { label: 'Normal (9,1 %)', color: 'bg-red-100 border-red-300 text-red-900' },
}

export default function CsgRetraiteCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'csg-csds-retraite',
    nom: 'CSG Retraite',
    href: '/csg-csds-retraite',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerCsgRetraite,
    resume: r => `Taux ${r.tauxApplicable} (${formatPct(r.tauxTotalPct, 1)}) - net ${formatEur(r.pensionNette)}/an`,
  })

  function set<K extends keyof CsgRetraiteInputs>(k: K, v: CsgRetraiteInputs[K]) {
    setInputs(prev => ({ ...prev, [k]: v }))
  }

  const tauxStyle = TAUX_LABELS[results.tauxApplicable]

  return (
    <>
      <SimResumeBanner slug="csg-csds-retraite" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Pension</h3>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">
                Pension brute annuelle (€)
              </label>
              <input type="number" min="0" step="500" value={inputs.pensionBruteAnnuelle}
                onChange={e => set('pensionBruteAnnuelle', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right text-lg font-medium" />
              <p className="text-xs text-neutral-500 mt-1">
                Total annuel brut de toutes vos pensions : retraite de base (CNAV/MSA/CARSAT)
                et complémentaires (AGIRC-ARRCO, IRCANTEC, etc.).
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Situation fiscale</h3>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">
                Revenu fiscal de référence (RFR) N-2 (€)
              </label>
              <input type="number" min="0" step="500" value={inputs.revenuFiscalReference}
                onChange={e => set('revenuFiscalReference', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right text-lg font-medium" />
              <p className="text-xs text-neutral-500 mt-1">
                RFR figurant sur votre avis d&apos;imposition 2024 (pour la CSG 2026).
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Nombre de parts fiscales</label>
              <div className="flex gap-2 flex-wrap">
                {[1, 1.5, 2, 2.5, 3, 3.5, 4].map(n => (
                  <button key={n} onClick={() => set('nombreParts', n)}
                    className={`px-4 py-2 rounded font-mono text-sm border-2 ${inputs.nombreParts === n ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-200'}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-xl border-2 p-6 ${tauxStyle.color}`}>
            <p className="text-sm mb-2">Taux appliqué</p>
            <p className="text-3xl font-bold mb-1">{tauxStyle.label}</p>
            <p className="text-sm">
              Total prélèvements : <strong>{formatPct(results.tauxTotalPct, 1)}</strong>
            </p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Pension nette</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Pension brute annuelle</span>
              <span className="text-right">{formatEur(inputs.pensionBruteAnnuelle)}</span>
              <span className="text-neutral-500">CSG + CRDS + CASA (contributions sociales)</span>
              <span className="text-right text-red-700">- {formatEur(results.prelevement)}</span>
              <span className="font-bold pt-2 border-t">Pension nette annuelle</span>
              <span className="text-right font-bold text-primary-700 pt-2 border-t">{formatEur(results.pensionNette)}</span>
              <span className="text-neutral-500">Net mensuel ≈</span>
              <span className="text-right">{formatEur(Math.round(results.pensionNette / 12))}</span>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Seuils RFR (vos {inputs.nombreParts} part{inputs.nombreParts > 1 ? 's' : ''})</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Exonération si RFR &lt;</span>
              <span className="text-right">{formatEur(results.seuilExoneration)}</span>
              <span className="text-neutral-500">Taux réduit si RFR &lt;</span>
              <span className="text-right">{formatEur(results.seuilReduit)}</span>
              <span className="text-neutral-500">Taux médian si RFR &lt;</span>
              <span className="text-right">{formatEur(results.seuilMedian)}</span>
              <span className="text-neutral-500">Taux normal si RFR ≥</span>
              <span className="text-right">{formatEur(results.seuilMedian)}</span>
            </div>
            <p className="text-xs text-neutral-500 mt-3">
              Votre RFR : <strong>{formatEur(inputs.revenuFiscalReference)}</strong>
            </p>
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
          href="/tmi"
          title="Votre RFR détermine aussi votre TMI"
          description="Le RFR sert au calcul CSG mais aussi à votre tranche marginale d'imposition sur le revenu."
        />
        <CrossLink
          href="/per-individuel"
          title="Réduire votre RFR via un PER"
          description="Verser sur un PER déductible réduit le revenu imposable et peut faire baisser le palier CSG."
        />
        <CrossLink
          href="/per-sortie"
          title="Sortie PER : CSG sur la rente"
          description="Une sortie PER en rente subit la CSG retraite calculée ici (palier selon RFR)."
        />
      </div>

      <ChatWidget contexte={{ calculateur: 'csg-csds-retraite', inputs, results }} />
    </>
  )
}
