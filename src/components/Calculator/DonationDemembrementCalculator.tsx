'use client'

import { calculerDonationDemembrement } from '@/lib/donationDemembrement'
import type { DonationDemembrementInputs } from '@/types/donationDemembrement'
import type { LienParente } from '@/types/donation'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur } from '@/lib/formatters'

const DEFAULT_INPUTS: DonationDemembrementInputs = {
  valeurBienPleinePropriete: 500000,
  ageUsufruitier: 65,
  lienDonataire: 'enfant',
  donationsAnterieures: 0,
}

const LIENS: Array<{ value: LienParente; label: string }> = [
  { value: 'enfant', label: 'Enfant' },
  { value: 'petit_enfant', label: 'Petit-enfant' },
  { value: 'parent', label: 'Parent' },
  { value: 'epoux_pacs', label: 'Époux / PACS' },
  { value: 'frere_soeur', label: 'Frère / sœur' },
  { value: 'neveu_niece', label: 'Neveu / nièce' },
  { value: 'autre_4e', label: 'Autre parent (4e degré)' },
  { value: 'non_parent', label: 'Non parent' },
]

export default function DonationDemembrementCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'donation/demembrement',
    nom: 'Donation avec démembrement',
    href: '/donation/demembrement',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerDonationDemembrement,
    resume: r =>
      r.economieRealisee > 0
        ? `Droits ${formatEur(r.droitsDemembrement)} (économie ${formatEur(r.economieRealisee)} vs pleine propriété)`
        : null,
  })

  function set<K extends keyof DonationDemembrementInputs>(k: K, v: DonationDemembrementInputs[K]) {
    setInputs(prev => ({ ...prev, [k]: v }))
  }

  return (
    <>
      <SimResumeBanner slug="donation/demembrement" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Le bien transmis</h3>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Valeur en pleine propriété (€)</label>
              <input type="number" min="0" step="10000" value={inputs.valeurBienPleinePropriete}
                onChange={e => set('valeurBienPleinePropriete', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right text-lg font-medium" />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">
                Âge du donateur / usufruitier : <strong>{inputs.ageUsufruitier} ans</strong>
              </label>
              <input type="range" min="20" max="95" value={inputs.ageUsufruitier}
                onChange={e => set('ageUsufruitier', Number(e.target.value))}
                className="w-full" />
              <p className="text-xs text-neutral-500 mt-1">
                Le donateur garde l&apos;usufruit (droit d&apos;usage et de percevoir les loyers), le donataire
                reçoit la nue-propriété. Plus le donateur est jeune, plus l&apos;usufruit qu&apos;il conserve
                vaut cher : la nue-propriété transmise vaut moins, et les droits à payer baissent
                (barème Art. 669 CGI).
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Le donataire</h3>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Lien de parenté</label>
              <select value={inputs.lienDonataire}
                onChange={e => set('lienDonataire', e.target.value as LienParente)}
                className="w-full px-3 py-2 border border-neutral-200 rounded">
                {LIENS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">
                Donations antérieures du donateur au donataire &lt; 15 ans (€)
              </label>
              <input type="number" min="0" step="1000" value={inputs.donationsAnterieures}
                onChange={e => set('donationsAnterieures', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border-2 border-green-300 bg-green-50 p-6">
            <p className="text-sm text-neutral-600 mb-1">Économie réalisée vs donation en pleine propriété</p>
            <p className="text-3xl font-bold text-green-800">{formatEur(results.economieRealisee)}</p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Démembrement (Art. 669 CGI)</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Usufruit (conservé par donateur)</span>
              <span className="text-right">{results.tauxUsufruit} % = {formatEur(results.valeurUsufruit)}</span>
              <span className="text-neutral-500">Nue-propriété (transmise)</span>
              <span className="text-right font-medium">{results.tauxNuePropriete} % = {formatEur(results.valeurNueProprietetransmise)}</span>
              <span className="text-neutral-500">Abattement disponible</span>
              <span className="text-right">{formatEur(results.abattementDisponible)}</span>
              <span className="text-neutral-500">Base taxable</span>
              <span className="text-right">{formatEur(results.baseTaxable)}</span>
              <span className="font-bold pt-2 border-t">Droits de donation</span>
              <span className="text-right font-bold text-red-700 pt-2 border-t">{formatEur(results.droitsDemembrement)}</span>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Comparaison : donation pleine propriété</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Base taxable</span>
              <span className="text-right">{formatEur(results.baseTaxablePleinePropriete)}</span>
              <span className="font-bold pt-2 border-t">Droits</span>
              <span className="text-right font-bold pt-2 border-t">{formatEur(results.droitsPleinePropriete)}</span>
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
          title="Comparer avec donation en pleine propriété"
          description="Le démembrement réduit l'assiette taxable ; le calculateur droits chiffre l'écart en valeur absolue."
        />
        <CrossLink
          href="/succession"
          title="Au décès, réunion de l'usufruit non taxée"
          description="L'Art. 1133 CGI exonère la reconstitution de pleine propriété au décès du donateur usufruitier."
        />
        <CrossLink
          href="/vente-vs-donation"
          title="Vendre plutôt que donner ?"
          description="Comparaison du coût fiscal entre vente et donation d'un même bien immobilier."
        />
      </div>

      <ChatWidget contexte={{ calculateur: 'donation/demembrement', inputs, results }} />
    </>
  )
}
