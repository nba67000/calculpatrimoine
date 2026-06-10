'use client'

import { calculerSciRegime } from '@/lib/sciRegime'
import type { SciRegimeInputs } from '@/types/sciRegime'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur } from '@/lib/formatters'

const DEFAULT_INPUTS: SciRegimeInputs = {
  loyersAnnuels: 24000,
  chargesDeductibles: 4000,
  interetsEmprunt: 6000,
  amortissementsAnnuels: 8000,
  tmiAssocies: 30,
  dureeProjet: 15,
}

const TMI_OPTIONS = [0, 11, 30, 41, 45] as const

export default function SciRegimeCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'sci-is-vs-ir',
    nom: 'SCI IS vs IR',
    href: '/sci-is-vs-ir',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerSciRegime,
    resume: r => `${r.regimeAvantageux === 'is' ? 'IS' : 'IR'} avantageux : ${formatEur(r.ecart)}/an`,
  })

  function set<K extends keyof SciRegimeInputs>(k: K, v: SciRegimeInputs[K]) {
    setInputs(prev => ({ ...prev, [k]: v }))
  }

  return (
    <>
      <SimResumeBanner slug="sci-is-vs-ir" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Projet locatif</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Loyers annuels (€)</label>
                <input type="number" min="0" step="1000" value={inputs.loyersAnnuels}
                  onChange={e => set('loyersAnnuels', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Charges (€/an)</label>
                <input type="number" min="0" step="500" value={inputs.chargesDeductibles}
                  onChange={e => set('chargesDeductibles', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Intérêts emprunt (€/an)</label>
                <input type="number" min="0" step="500" value={inputs.interetsEmprunt}
                  onChange={e => set('interetsEmprunt', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Amortissements (IS) (€/an)</label>
                <input type="number" min="0" step="500" value={inputs.amortissementsAnnuels}
                  onChange={e => set('amortissementsAnnuels', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-2">TMI des associés</label>
              <div className="flex gap-2">
                {TMI_OPTIONS.map(t => (
                  <button key={t} onClick={() => set('tmiAssocies', t)}
                    className={`px-4 py-2 rounded font-mono text-sm border-2 ${inputs.tmiAssocies === t ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-200'}`}>
                    {t} %
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">
                Durée du projet : <strong>{inputs.dureeProjet} ans</strong>
              </label>
              <input type="range" min="5" max="40" value={inputs.dureeProjet}
                onChange={e => set('dureeProjet', Number(e.target.value))}
                className="w-full" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-xl border-2 p-6 ${results.regimeAvantageux === 'is' ? 'bg-blue-50 border-blue-400' : 'bg-orange-50 border-orange-400'}`}>
            <p className="text-sm text-neutral-600 mb-2">Régime avantageux (impôt annuel uniquement)</p>
            <p className="text-3xl font-bold text-neutral-900 mb-1">
              SCI à l&apos;{results.regimeAvantageux.toUpperCase()}
            </p>
            <p className="text-sm text-neutral-600">
              Écart : <strong>{formatEur(results.ecart)}</strong>/an = <strong>{formatEur(results.ecart * inputs.dureeProjet)}</strong> sur {inputs.dureeProjet} ans
            </p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-orange-900 mb-3">SCI à l&apos;IR (loyers imposés sur votre déclaration)</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Revenu foncier</span>
              <span className="text-right">{formatEur(results.revenuFoncier)}</span>
              <span className="text-neutral-500">IR ({inputs.tmiAssocies} %)</span>
              <span className="text-right">{formatEur(results.irAnnuel)}</span>
              <span className="text-neutral-500">PS 17,2 %</span>
              <span className="text-right">{formatEur(results.psAnnuel)}</span>
              <span className="font-bold pt-2 border-t">Impôt annuel</span>
              <span className="text-right font-bold text-red-700 pt-2 border-t">{formatEur(results.totalAnnuelIr)}</span>
              <span className="font-bold">Cumul {inputs.dureeProjet} ans</span>
              <span className="text-right font-bold">{formatEur(results.cumulSurDureeIr)}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-blue-900 mb-3">SCI à l&apos;IS</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Bénéfice imposable</span>
              <span className="text-right">{formatEur(results.beneficeImposableIs)}</span>
              <span className="text-neutral-500">IS (15 % puis 25 %)</span>
              <span className="text-right">{formatEur(results.isAnnuel)}</span>
              <span className="font-bold pt-2 border-t">Impôt annuel</span>
              <span className="text-right font-bold text-red-700 pt-2 border-t">{formatEur(results.totalAnnuelIs)}</span>
              <span className="font-bold">Cumul {inputs.dureeProjet} ans</span>
              <span className="text-right font-bold">{formatEur(results.cumulSurDureeIs)}</span>
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
          href="/deficit-foncier"
          title="Régime IR : déficit foncier"
          description="SCI translucide à l'IR, le déficit foncier remonte aux associés selon les règles communes (plafond 10 700 €)."
        />
        <CrossLink
          href="/plus-value-immobiliere"
          title="PV à la sortie (SCI IR)"
          description="À l'IR, la PV suit le régime des particuliers : abattements par durée, exonération à 22 ans (IR) / 30 ans (PS)."
        />
        <CrossLink
          href="/lmnp-reel-vs-micro"
          title="Alternative location meublée"
          description="La SCI ne peut pas faire de meublé sans risque d'IS automatique ; le LMNP en direct contourne ce sujet."
        />
      </div>

      <ChatWidget contexte={{ calculateur: 'sci-is-vs-ir', inputs, results }} />
    </>
  )
}
