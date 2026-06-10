'use client'

import { calculerPretIntrafamilial } from '@/lib/pretIntrafamilial'
import type { PretIntrafamilialInputs, LienEmprunteur } from '@/types/pretIntrafamilial'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur } from '@/lib/formatters'

const DEFAULT_INPUTS: PretIntrafamilialInputs = {
  montantPret: 100000,
  dureeAnnees: 10,
  tauxInteret: 2,
  agePreteur: 65,
  esperanceVie: 85,
  lienEmprunteur: 'enfant',
  donationsAnterieures: 0,
}

const LIENS: Array<{ value: LienEmprunteur; label: string }> = [
  { value: 'enfant', label: 'Enfant (abattement 100 000 €)' },
  { value: 'petit_enfant', label: 'Petit-enfant (abattement 31 865 €)' },
  { value: 'frere_soeur', label: 'Frère/sœur (abattement 15 932 €)' },
  { value: 'autre', label: 'Autre (aucun abattement)' },
]

export default function PretIntrafamilialCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'pret-intrafamilial',
    nom: 'Prêt intrafamilial',
    href: '/pret-intrafamilial',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerPretIntrafamilial,
    resume: r => `Coût prêt ${formatEur(r.interetsCumulesPretDuree + r.droitsSuccessionCreance)} vs donation ${formatEur(r.droitsDonationEquivalente)}`,
  })

  function set<K extends keyof PretIntrafamilialInputs>(key: K, value: PretIntrafamilialInputs[K]) {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <SimResumeBanner slug="pret-intrafamilial" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Le prêt</h3>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Montant prêté (€)</label>
              <input type="number" min="1000" step="1000" value={inputs.montantPret}
                onChange={e => set('montantPret', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right text-lg font-medium" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Durée (ans)</label>
                <input type="number" min="1" max="40" value={inputs.dureeAnnees}
                  onChange={e => set('dureeAnnees', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Taux annuel (%)</label>
                <input type="number" min="0" step="0.1" value={inputs.tauxInteret}
                  onChange={e => set('tauxInteret', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Prêteur et emprunteur</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Âge prêteur</label>
                <input type="number" min="18" max="100" value={inputs.agePreteur}
                  onChange={e => set('agePreteur', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Espérance de vie</label>
                <input type="number" min="60" max="105" value={inputs.esperanceVie}
                  onChange={e => set('esperanceVie', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Lien emprunteur</label>
              <select value={inputs.lienEmprunteur}
                onChange={e => set('lienEmprunteur', e.target.value as LienEmprunteur)}
                className="w-full px-3 py-2 border border-neutral-200 rounded">
                {LIENS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">
                Donations du prêteur à l&apos;emprunteur sur les 15 dernières années (€)
              </label>
              <input type="number" min="0" step="1000" value={inputs.donationsAnterieures}
                onChange={e => set('donationsAnterieures', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-xl border-2 p-6 ${results.optionAvantageuse === 'pret' ? 'bg-blue-50 border-blue-300' : 'bg-green-50 border-green-300'}`}>
            <p className="text-sm text-neutral-600 mb-2">Option avantageuse</p>
            <p className="text-3xl font-bold text-neutral-900 mb-1">
              {results.optionAvantageuse === 'pret' ? 'Prêt intrafamilial' : 'Donation directe'}
            </p>
            <p className="text-sm text-neutral-600">Écart estimé : <strong>{formatEur(results.ecart)}</strong></p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Coûts du prêt</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Intérêts annuels</span>
              <span className="text-right">{formatEur(results.interetsAnnuels)}</span>
              <span className="text-neutral-500">Intérêts cumulés sur la durée</span>
              <span className="text-right">{formatEur(results.interetsCumulesPretDuree)}</span>
              <span className="text-neutral-500">Capital non remboursé au décès estimé</span>
              <span className="text-right">{formatEur(results.capitalNonRembourseDecesEstime)}</span>
              <span className="text-neutral-500">Droits succession sur la créance</span>
              <span className="text-right">{formatEur(results.droitsSuccessionCreance)}</span>
              <span className="font-bold pt-2 border-t">Coût total prêt</span>
              <span className="text-right font-bold text-red-700 pt-2 border-t">
                {formatEur(results.interetsCumulesPretDuree + results.droitsSuccessionCreance)}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Donation directe équivalente</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Abattement disponible</span>
              <span className="text-right">{formatEur(results.abattementDisponible)}</span>
              <span className="text-neutral-500">Base taxable</span>
              <span className="text-right">{formatEur(results.baseTaxableDonation)}</span>
              <span className="font-bold pt-2 border-t">Droits de donation</span>
              <span className="text-right font-bold text-red-700 pt-2 border-t">
                {formatEur(results.droitsDonationEquivalente)}
              </span>
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
          href="/donation/droits"
          title="Alternative donation directe"
          description="Calcul équivalent en droits de donation pour un même montant transmis (Art. 779 abattements)."
        />
        <CrossLink
          href="/donation/demembrement"
          title="Donation de la nue-propriété"
          description="Réduit l'assiette taxable en conservant l'usufruit côté donateur (barème Art. 669 CGI)."
        />
        <CrossLink
          href="/vente-vs-donation"
          title="Vendre ou donner le bien ?"
          description="Si le prêt sert à acquérir un bien à un proche, comparer vente + prêt vs donation directe."
        />
      </div>

      <ChatWidget contexte={{ calculateur: 'pret-intrafamilial', inputs, results }} />
    </>
  )
}
