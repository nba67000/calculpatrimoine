'use client'

import { calculerVenteVsDonation } from '@/lib/venteVsDonation'
import type { VenteVsDonationInputs, LienBeneficiaire } from '@/types/venteVsDonation'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur } from '@/lib/formatters'

const DEFAULT_INPUTS: VenteVsDonationInputs = {
  valeurBien: 400000,
  dateAcquisition: '2010-01-01',
  prixAcquisition: 200000,
  fraisAcquisitionMode: 'forfait',
  fraisAcquisitionReels: 0,
  travauxMode: 'forfait',
  travauxReels: 0,
  lienBeneficiaire: 'enfant',
  donationsAnterieures: 0,
  tauxDroitsEnregistrement: 5.80665,
}

const LIENS: Array<{ value: LienBeneficiaire; label: string }> = [
  { value: 'enfant', label: 'Enfant (abattement 100 000 €, barème 5-45 %)' },
  { value: 'petit_enfant', label: 'Petit-enfant (abattement 31 865 €, ligne directe)' },
  { value: 'frere_soeur', label: 'Frère/sœur (abattement 15 932 €, 35-45 %)' },
  { value: 'neveu_niece', label: 'Neveu/nièce (abattement 7 967 €, taux 55 %)' },
  { value: 'autre', label: 'Autre / non parent (aucun abattement, taux 60 %)' },
]

export default function VenteVsDonationCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'vente-vs-donation',
    nom: 'Vente vs donation',
    href: '/vente-vs-donation',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerVenteVsDonation,
    resume: r =>
      r.optionAvantageuse === 'egalite'
        ? `Égalité : ${formatEur(r.coutFiscalVente)}`
        : `${r.optionAvantageuse === 'vente' ? 'Vente' : 'Donation'} avantageuse : ${formatEur(r.ecart)} d'écart`,
  })

  function set<K extends keyof VenteVsDonationInputs>(k: K, v: VenteVsDonationInputs[K]) {
    setInputs(prev => ({ ...prev, [k]: v }))
  }

  return (
    <>
      <SimResumeBanner slug="vente-vs-donation" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Le bien et son histoire</h3>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Valeur de marché aujourd&apos;hui (€)</label>
              <input type="number" min="10000" step="10000" value={inputs.valeurBien}
                onChange={e => set('valeurBien', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right text-lg font-medium" />
              <p className="text-xs text-neutral-500 mt-1">
                Identique côté vente (prix de cession) et côté donation (valeur transmise).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Date d&apos;acquisition</label>
                <input type="date" value={inputs.dateAcquisition}
                  onChange={e => set('dateAcquisition', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded" />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1">Prix d&apos;acquisition (€)</label>
                <input type="number" min="0" step="1000" value={inputs.prixAcquisition}
                  onChange={e => set('prixAcquisition', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Frais d&apos;acquisition</label>
              <div className="flex gap-2">
                <button onClick={() => set('fraisAcquisitionMode', 'forfait')}
                  className={`px-3 py-2 rounded text-sm border-2 ${inputs.fraisAcquisitionMode === 'forfait' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-200'}`}>
                  Forfait 7,5 %
                </button>
                <button onClick={() => set('fraisAcquisitionMode', 'reel')}
                  className={`px-3 py-2 rounded text-sm border-2 ${inputs.fraisAcquisitionMode === 'reel' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-200'}`}>
                  Réels
                </button>
                {inputs.fraisAcquisitionMode === 'reel' && (
                  <input type="number" min="0" step="1000" value={inputs.fraisAcquisitionReels}
                    onChange={e => set('fraisAcquisitionReels', Number(e.target.value))}
                    className="flex-1 px-3 py-2 border border-neutral-200 rounded text-right" />
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Travaux</label>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => set('travauxMode', 'aucun')}
                  className={`px-3 py-2 rounded text-sm border-2 ${inputs.travauxMode === 'aucun' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-200'}`}>
                  Aucun
                </button>
                <button onClick={() => set('travauxMode', 'forfait')}
                  className={`px-3 py-2 rounded text-sm border-2 ${inputs.travauxMode === 'forfait' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-200'}`}>
                  Forfait 15 % (si &gt; 5 ans)
                </button>
                <button onClick={() => set('travauxMode', 'reel')}
                  className={`px-3 py-2 rounded text-sm border-2 ${inputs.travauxMode === 'reel' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-200'}`}>
                  Réels
                </button>
              </div>
              {inputs.travauxMode === 'reel' && (
                <input type="number" min="0" step="1000" value={inputs.travauxReels}
                  onChange={e => set('travauxReels', Number(e.target.value))}
                  className="w-full mt-2 px-3 py-2 border border-neutral-200 rounded text-right" />
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Le bénéficiaire</h3>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Lien de parenté</label>
              <select value={inputs.lienBeneficiaire}
                onChange={e => set('lienBeneficiaire', e.target.value as LienBeneficiaire)}
                className="w-full px-3 py-2 border border-neutral-200 rounded">
                {LIENS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">
                Donations antérieures au même bénéficiaire sur 15 ans (€)
              </label>
              <input type="number" min="0" step="1000" value={inputs.donationsAnterieures}
                onChange={e => set('donationsAnterieures', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              <p className="text-xs text-neutral-500 mt-1">
                Les donations faites au même bénéficiaire dans les 15 dernières années s&apos;additionnent
                (Art. 784 CGI) : elles consomment d&apos;abord votre abattement, puis les premières tranches
                du barème, pour éviter qu&apos;on les compte deux fois.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">
                Droits d&apos;enregistrement (DMTO) payés par l&apos;acheteur - %
              </label>
              <input type="number" min="0" max="10" step="0.001" value={inputs.tauxDroitsEnregistrement}
                onChange={e => set('tauxDroitsEnregistrement', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              <p className="text-xs text-neutral-500 mt-1">
                Standard 5,80665 %. Jusqu&apos;à 6,32 % dans les départements ayant majoré le DMTO.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-xl border-2 p-6 ${results.optionAvantageuse === 'vente' ? 'bg-blue-50 border-blue-300' : results.optionAvantageuse === 'donation' ? 'bg-green-50 border-green-300' : 'bg-neutral-50 border-neutral-300'}`}>
            <p className="text-sm text-neutral-600 mb-2">Option fiscalement avantageuse</p>
            <p className="text-3xl font-bold text-neutral-900 mb-1">
              {results.optionAvantageuse === 'vente' ? 'Vente' : results.optionAvantageuse === 'donation' ? 'Donation' : 'Égalité'}
            </p>
            <p className="text-sm text-neutral-600">
              Écart : <strong>{formatEur(results.ecart)}</strong>
            </p>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Vente</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Plus-value brute</span>
              <span className="text-right">{formatEur(results.pvBrute)}</span>
              <span className="text-neutral-500">PV nette après abattements IR</span>
              <span className="text-right">{formatEur(results.pvNetteIR)}</span>
              <span className="text-neutral-500">IR sur PV (19 %)</span>
              <span className="text-right">{formatEur(results.irPlusValue)}</span>
              <span className="text-neutral-500">PS sur PV (17,2 %)</span>
              <span className="text-right">{formatEur(results.psPlusValue)}</span>
              {results.surtaxePV > 0 && (
                <>
                  <span className="text-neutral-500">Surtaxe Art. 1609 nonies G</span>
                  <span className="text-right">{formatEur(results.surtaxePV)}</span>
                </>
              )}
              <span className="text-neutral-500">Droits d&apos;enregistrement (acheteur)</span>
              <span className="text-right">{formatEur(results.droitsEnregistrement)}</span>
              <span className="font-bold pt-2 border-t">Coût fiscal cumulé vente</span>
              <span className="text-right font-bold text-red-700 pt-2 border-t">{formatEur(results.coutFiscalVente)}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-green-900 mb-3">Donation</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Abattement applicable</span>
              <span className="text-right">{formatEur(results.abattementDonation)}</span>
              <span className="text-neutral-500">Abattement résiduel après rappel</span>
              <span className="text-right">{formatEur(results.abattementResiduel)}</span>
              <span className="text-neutral-500">Base taxable</span>
              <span className="text-right">{formatEur(results.baseTaxableDonation)}</span>
              <span className="font-bold pt-2 border-t">Droits de donation</span>
              <span className="text-right font-bold text-red-700 pt-2 border-t">{formatEur(results.droitsDonation)}</span>
            </div>
          </div>

          <AlertList items={results.warnings} />
          <AlertList items={results.optimisations} />
        </div>
      </div>

      <ChatWidget contexte={{ calculateur: 'vente-vs-donation', inputs, results }} />
    </>
  )
}
