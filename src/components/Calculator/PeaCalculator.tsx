'use client'

import { calculerPea } from '@/lib/pea'
import type { PeaInputs } from '@/types/pea'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur, formatPct } from '@/lib/formatters'

const DEFAULT_INPUTS: PeaInputs = {
  valeurActuelle: 100000,
  versementsTotaux: 60000,
  agePeaAnnees: 7,
  montantRetrait: 30000,
}

export default function PeaCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'pea',
    nom: 'PEA - Fiscalité retrait',
    href: '/pea',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerPea,
    resume: r => `Net retrait ${formatEur(r.netRetrait)} · Passif latent ${formatEur(r.passifLatentEstime)}`,
  })

  function set<K extends keyof PeaInputs>(k: K, v: PeaInputs[K]) {
    setInputs(prev => ({ ...prev, [k]: v }))
  }

  return (
    <>
      <SimResumeBanner slug="pea" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">État du PEA</h3>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Valeur actuelle (€)</label>
              <input type="number" min="0" step="1000" value={inputs.valeurActuelle}
                onChange={e => set('valeurActuelle', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right text-lg font-medium" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Versements totaux nets (€)</label>
              <input type="number" min="0" step="1000" value={inputs.versementsTotaux}
                onChange={e => set('versementsTotaux', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              <p className="text-xs text-neutral-500 mt-1">
                Plafond légal : 150 000 € (PEA classique). Si votre PEA vaut plus que ce que vous y avez
                versé, la différence est une plus-value latente : non taxée tant que vous ne retirez rien,
                mais sur laquelle vous devrez les prélèvements sociaux à la sortie.
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">
                Âge du PEA : <strong>{inputs.agePeaAnnees.toFixed(1)} ans</strong>
              </label>
              <input type="range" min="0" max="30" step="0.5" value={inputs.agePeaAnnees}
                onChange={e => set('agePeaAnnees', Number(e.target.value))}
                className="w-full" />
              <p className="text-xs text-neutral-500 mt-1">
                Seuil clé : à partir de 5 ans, l&apos;impôt sur le revenu disparaît et il ne reste que les
                prélèvements sociaux (18,6 %) sur la plus-value. Avant 5 ans, retirer = flat tax 31,4 % +
                clôture du plan.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Retrait envisagé</h3>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Montant à retirer (€)</label>
              <input type="number" min="0" step="1000" value={inputs.montantRetrait}
                onChange={e => set('montantRetrait', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              <p className="text-xs text-neutral-500 mt-1">
                Mettre 0 pour voir uniquement le bilan brut/net/passif latent sans retrait.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Bilan patrimonial (3 vues)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <div>
                  <p className="text-sm font-medium text-neutral-700">Vue brute</p>
                  <p className="text-xs text-neutral-500">Valeur de marché affichée par le courtier</p>
                </div>
                <p className="text-xl font-bold text-neutral-900">{formatEur(results.vueBrute)}</p>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <div>
                  <p className="text-sm font-medium text-neutral-700">Vue nette de sortie</p>
                  <p className="text-xs text-neutral-500">Ce que vous toucheriez si vous sortiez tout maintenant</p>
                </div>
                <p className="text-xl font-bold text-primary-700">{formatEur(results.vueNetteSortie)}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700">Passif fiscal latent</p>
                  <p className="text-xs text-neutral-500">Impôt non encore matérialisé sur la PV</p>
                </div>
                <p className="text-xl font-bold text-red-700">{formatEur(results.passifLatentEstime)}</p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Décomposition</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Plus-value latente</span>
              <span className="text-right">{formatEur(results.plusValueLatente)}</span>
              <span className="text-neutral-500">Part PV dans la valeur</span>
              <span className="text-right">{formatPct(results.partPlusValueDansValeur, 1)}</span>
              <span className="text-neutral-500">Régime applicable</span>
              <span className="text-right">{results.exonerationIrActive ? 'PS 18,6 % (>5 ans)' : 'PFU 31,4 % (<5 ans)'}</span>
            </div>
          </div>

          {inputs.montantRetrait > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-900 mb-3">Retrait de {formatEur(inputs.montantRetrait)}</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <span className="text-neutral-500">PV dans le retrait</span>
                <span className="text-right">{formatEur(results.pvDansRetrait)}</span>
                <span className="text-neutral-500">Impôt</span>
                <span className="text-right text-red-700">{formatEur(results.impotSurRetrait)}</span>
                <span className="font-bold pt-2 border-t">Net perçu</span>
                <span className="text-right font-bold text-primary-700 pt-2 border-t">{formatEur(results.netRetrait)}</span>
              </div>
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
          href="/assurance-vie/fiscalite-rachat"
          title="PEA vs assurance-vie après 5 ans"
          description="Le PEA est exonéré d'IR ; l'AV cumule abattement annuel et taux historiques sur les versements pré-2017."
        />
        <CrossLink
          href="/per-individuel"
          title="Autre enveloppe défiscalisée"
          description="Le PER produit une économie d'impôt à l'entrée plutôt qu'une exonération à la sortie."
        />
        <CrossLink
          href="/tmi"
          title="Connaître votre TMI"
          description="Utile pour arbitrer entre PFU 30 % et barème IR sur les autres placements (le PEA reste exonéré dans tous les cas)."
        />
      </div>

      <ChatWidget contexte={{ calculateur: 'pea', inputs, results }} />
    </>
  )
}
