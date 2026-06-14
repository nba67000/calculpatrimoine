'use client'

import { calculerLmnpRegime } from '@/lib/lmnpRegime'
import type { LmnpRegimeInputs, TypeMeuble } from '@/types/lmnpRegime'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur } from '@/lib/formatters'

const DEFAULT_INPUTS: LmnpRegimeInputs = {
  loyersAnnuels: 20000,
  chargesReelles: 4000,
  amortissementsAnnuels: 6000,
  tmi: 30,
  typeMeuble: 'classique',
}

const TMI_OPTIONS = [0, 11, 30, 41, 45] as const

const TYPES_MEUBLE: Array<{ value: TypeMeuble; label: string }> = [
  { value: 'classique', label: 'Meublé classique (location longue durée) - 50% abat., seuil 77 700 €' },
  { value: 'touristique_classe', label: 'Meublé touristique classé (étoiles) - 71% abat., seuil 188 700 €' },
  { value: 'touristique_non_classe', label: 'Meublé touristique non classé - 30% abat., seuil 15 000 € (LF 2025)' },
]

export default function LmnpRegimeCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'lmnp-reel-vs-micro',
    nom: 'LMNP réel vs micro',
    href: '/lmnp-reel-vs-micro',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerLmnpRegime,
    resume: r => `${r.regimeAvantageux === 'reel' ? 'Réel' : 'Micro'} avantageux : ${formatEur(r.economie)} d'écart`,
  })

  function set<K extends keyof LmnpRegimeInputs>(k: K, v: LmnpRegimeInputs[K]) {
    setInputs(prev => ({ ...prev, [k]: v }))
  }

  return (
    <>
      <SimResumeBanner slug="lmnp-reel-vs-micro" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Loyers et type de location</h3>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Loyers annuels (€)</label>
              <input type="number" min="0" step="1000" value={inputs.loyersAnnuels}
                onChange={e => set('loyersAnnuels', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right text-lg font-medium" />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Type de meublé</label>
              <select value={inputs.typeMeuble}
                onChange={e => set('typeMeuble', e.target.value as TypeMeuble)}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-sm">
                {TYPES_MEUBLE.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
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

          <div className="bg-orange-50 rounded-xl border-2 border-orange-200 p-6 space-y-4">
            <h3 className="text-xl font-bold text-orange-900">Charges et amortissements (régime réel)</h3>
            <p className="text-sm text-orange-800">
              Ces données sont uniquement utilisées pour le calcul du régime réel.
            </p>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Charges déductibles (€/an)</label>
              <input type="number" min="0" step="500" value={inputs.chargesReelles}
                onChange={e => set('chargesReelles', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              <p className="text-xs text-neutral-500 mt-1">
                Total annuel des dépenses que vous pouvez déduire de vos loyers : entretien,
                copropriété, taxe foncière, intérêts d&apos;emprunt, assurances. Ces charges réduisent
                votre bénéfice imposable en régime réel, mais ne servent à rien en régime micro
                (l&apos;abattement forfaitaire les couvre déjà).
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Amortissements annuels (€/an)</label>
              <input type="number" min="0" step="500" value={inputs.amortissementsAnnuels}
                onChange={e => set('amortissementsAnnuels', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              <p className="text-xs text-neutral-500 mt-1">
                Repère : ~2-3 % de la valeur du bien par an + ~10 % de la valeur des meubles. C&apos;est
                une charge fictive qui diminue le bénéfice imposable : c&apos;est l&apos;intérêt principal du
                régime réel. Un comptable établit le calcul détaillé par composant.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-xl border-2 p-6 ${results.regimeAvantageux === 'reel' ? 'bg-orange-50 border-orange-400' : 'bg-green-50 border-green-400'}`}>
            <p className="text-sm text-neutral-600 mb-2">Régime fiscal le plus avantageux</p>
            <p className="text-3xl font-bold text-neutral-900 mb-1">
              {results.regimeAvantageux === 'reel' ? 'Régime réel' : 'Micro-BIC'}
            </p>
            <p className="text-sm text-neutral-600">
              Économie : <strong>{formatEur(results.economie)}</strong> /an
              {!results.microApplicable && <> (micro non applicable, loyers &gt; {formatEur(results.seuilMicro)})</>}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Micro-BIC</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Abattement</span>
              <span className="text-right">{results.abattementMicroPct} %</span>
              <span className="text-neutral-500">Base imposable</span>
              <span className="text-right">{formatEur(results.beneficeImposableMicro)}</span>
              <span className="text-neutral-500">IR</span>
              <span className="text-right">{formatEur(results.irMicro)}</span>
              <span className="text-neutral-500">PS 18,6 %</span>
              <span className="text-right">{formatEur(results.psMicro)}</span>
              <span className="font-bold pt-2 border-t">Total impôt</span>
              <span className="text-right font-bold text-red-700 pt-2 border-t">{formatEur(results.totalImpotMicro)}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Régime réel</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Loyers - charges - amort.</span>
              <span className="text-right">
                {formatEur(inputs.loyersAnnuels)} - {formatEur(inputs.chargesReelles)} - {formatEur(inputs.amortissementsAnnuels)}
              </span>
              <span className="text-neutral-500">Base imposable</span>
              <span className="text-right">{formatEur(results.beneficeImposableReel)}</span>
              <span className="text-neutral-500">IR</span>
              <span className="text-right">{formatEur(results.irReel)}</span>
              <span className="text-neutral-500">PS 18,6 %</span>
              <span className="text-right">{formatEur(results.psReel)}</span>
              <span className="font-bold pt-2 border-t">Total impôt</span>
              <span className="text-right font-bold text-red-700 pt-2 border-t">{formatEur(results.totalImpotReel)}</span>
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
          href="/plus-value-immobiliere/lmnp"
          title="Plus-value LMNP à la sortie"
          description="Depuis le 15/02/2025, les amortissements sont réintégrés au prix d'acquisition pour le calcul de la PV (Art. 150 VB III CGI)."
        />
        <CrossLink
          href="/comparateur-locatif-placement"
          title="Locatif vs placement financier"
          description="Comparer le rendement locatif net à un placement financier (PEA, assurance-vie) à capital et durée égaux."
        />
        <CrossLink
          href="/deficit-foncier"
          title="Équivalent en location nue"
          description="La location nue suit un régime foncier différent (déficit imputable sur revenu global jusqu'à 10 700 €)."
        />
      </div>

      <ChatWidget contexte={{ calculateur: 'lmnp-reel-vs-micro', inputs, results }} />
    </>
  )
}
