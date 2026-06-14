'use client'

import { calculerPlusValueImmobiliere } from '@/lib/plusValueImmobiliere'
import type { PlusValueImmobiliereInputs } from '@/types/plusValueImmobiliere'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur, formatPct } from '@/lib/formatters'

const DEFAULT_INPUTS: PlusValueImmobiliereInputs = {
  dateAcquisition: '2018-05-02',
  prixAcquisition: 200000,
  fraisAcquisition: 'forfait',
  fraisAcquisitionReels: 15000,
  travaux: 'forfait',
  travauxReels: 0,
  dateCession: '2026-05-02',
  prixCession: 295000,
  typeBien: 'autre',
  premiereCession: false,
}

export default function PlusValueImmobiliereCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'plus-value-immobiliere',
    nom: 'Plus-value immobilière',
    href: '/plus-value-immobiliere',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerPlusValueImmobiliere,
    resume: r => r.pvBrute > 0
      ? `PV brute : ${formatEur(r.pvBrute)} · Impôts : ${formatEur(r.totalImpots)}`
      : null,
  })

  const forfaitDisponible = results.anneesDetention > 5

  return (
    <>
    <SimResumeBanner slug="plus-value-immobiliere" onReset={reset} />
    <div className="grid lg:grid-cols-2 gap-8">

      {/* === COLONNE GAUCHE - INPUTS === */}
      <div className="space-y-6">

        {/* Carte : Acquisition */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Acquisition</h3>

          {/* Date acquisition */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Date d&apos;acquisition
            </label>
            <input
              type="date"
              value={inputs.dateAcquisition}
              onChange={(e) => setInputs(prev => ({ ...prev, dateAcquisition: e.target.value }))}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Durée de détention : <span className="font-bold text-neutral-700">{results.anneesDetention} an{results.anneesDetention !== 1 ? 's' : ''}</span>
            </p>
          </div>

          {/* Prix d'acquisition */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Prix d&apos;acquisition
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="1000"
                value={inputs.prixAcquisition}
                onChange={(e) => setInputs(prev => ({ ...prev, prixAcquisition: Number(e.target.value) }))}
                className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base font-medium"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
            </div>
          </div>

          {/* Frais d'acquisition */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Frais d&apos;acquisition (droits + notaire)
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {(['forfait', 'reel'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setInputs(prev => ({ ...prev, fraisAcquisition: mode }))}
                  className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                    inputs.fraisAcquisition === mode
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {mode === 'forfait' ? `Forfait 7,5 %` : 'Montant réel'}
                </button>
              ))}
            </div>
            {inputs.fraisAcquisition === 'forfait' ? (
              <p className="text-xs text-primary-600 bg-primary-50 px-3 py-2 rounded-lg">
                Forfait appliqué : {formatEur(Math.round(inputs.prixAcquisition * 0.075))}
              </p>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={inputs.fraisAcquisitionReels}
                  onChange={(e) => setInputs(prev => ({ ...prev, fraisAcquisitionReels: Number(e.target.value) }))}
                  className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                  placeholder="Montant réel des frais"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
              </div>
            )}
          </div>

          {/* Travaux */}
          <div>
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Travaux
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {(['aucun', 'forfait', 'reel'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setInputs(prev => ({ ...prev, travaux: mode }))}
                  disabled={mode === 'forfait' && !forfaitDisponible}
                  className={`py-2 px-2 rounded-lg font-medium text-xs transition-all ${
                    inputs.travaux === mode
                      ? 'bg-primary-600 text-white shadow-md'
                      : mode === 'forfait' && !forfaitDisponible
                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {mode === 'aucun' ? 'Aucun' : mode === 'forfait' ? 'Forfait 15 %' : 'Montant réel'}
                </button>
              ))}
            </div>
            {inputs.travaux === 'forfait' && (
              <p className="text-xs text-primary-600 bg-primary-50 px-3 py-2 rounded-lg">
                Forfait appliqué : {formatEur(Math.round(inputs.prixAcquisition * 0.15))}
              </p>
            )}
            {inputs.travaux === 'forfait' && !forfaitDisponible && (
              <p className="text-xs text-orange-600">
                Forfait 15 % disponible uniquement si détention &gt; 5 ans.
              </p>
            )}
            {inputs.travaux === 'reel' && (
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={inputs.travauxReels}
                  onChange={(e) => setInputs(prev => ({ ...prev, travauxReels: Number(e.target.value) }))}
                  className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                  placeholder="Montant des travaux"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
              </div>
            )}
          </div>
        </div>

        {/* Carte : Cession */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Cession</h3>

          {/* Date cession */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Date de cession
            </label>
            <input
              type="date"
              value={inputs.dateCession}
              onChange={(e) => setInputs(prev => ({ ...prev, dateCession: e.target.value }))}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
            />
          </div>

          {/* Prix de cession */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Prix de vente
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="1000"
                value={inputs.prixCession}
                onChange={(e) => setInputs(prev => ({ ...prev, prixCession: Number(e.target.value) }))}
                className="w-full px-4 py-3 pr-10 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base font-medium"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">€</span>
            </div>
          </div>

          {/* Nature du bien */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Nature du bien
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([
                { val: 'principal', label: 'Résidence principale' },
                { val: 'autre',     label: 'Autre bien (secondaire / locatif)' },
              ] as const).map(({ val, label }) => (
                <button
                  key={val}
                  onClick={() => setInputs(prev => ({ ...prev, typeBien: val }))}
                  className={`py-2 px-3 rounded-lg font-medium text-xs transition-all ${
                    inputs.typeBien === val
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {inputs.typeBien === 'principal' && (
              <p className="text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg mt-2">
                Exonération totale - résidence principale (Art. 150 U II 1° CGI)
              </p>
            )}
          </div>

          {/* 1ère cession */}
          {inputs.typeBien === 'autre' && (
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.premiereCession}
                  onChange={(e) => setInputs(prev => ({ ...prev, premiereCession: e.target.checked }))}
                  className="w-5 h-5 mt-0.5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 shrink-0"
                />
                <span className="text-sm text-neutral-700">
                  <span className="font-medium">1ère cession hors résidence principale</span>
                  <span className="block text-xs text-neutral-500 mt-0.5">
                    Conditions : ne pas avoir été propriétaire de sa résidence principale dans les 4 ans précédents + réinvestir le prix de vente dans l&apos;achat de sa résidence principale dans les 24 mois (Art. 150 U II 7° CGI)
                  </span>
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* === COLONNE DROITE - RÉSULTATS === */}
      <div className="space-y-5">

        {/* Exonération totale */}
        {results.exoneree && (
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
            <p className="font-bold text-green-900 text-lg mb-1">Exonération totale</p>
            <p className="text-sm text-green-800 leading-relaxed">{results.motifExoneration}</p>
            <div className="mt-4 pt-4 border-t border-green-200 flex justify-between">
              <span className="text-sm text-green-700">Plus-value brute</span>
              <span className="font-bold text-green-900">{formatEur(results.pvBrute)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-green-700">Impôts dus</span>
              <span className="font-bold text-green-900">0 €</span>
            </div>
          </div>
        )}

        {/* Moins-value */}
        {!results.exoneree && results.pvBrute <= 0 && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
            <p className="font-bold text-blue-900 text-lg mb-1">
              Moins-value : {formatEur(Math.abs(results.pvBrute))}
            </p>
            <p className="text-sm text-blue-800">Aucune imposition. La moins-value immobilière n&apos;est pas imputable sur d&apos;autres revenus.</p>
          </div>
        )}

        {/* Résultats imposables */}
        {!results.exoneree && results.pvBrute > 0 && (
          <>
            {/* Net total */}
            <div className="bg-white rounded-xl border-2 border-primary-300 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-neutral-600">Plus-value brute</span>
                <span className="font-bold text-neutral-900 text-lg">{formatEur(results.pvBrute)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-red-700">Total impôts + prél. sociaux</span>
                <span className="font-bold text-red-700 text-xl">{formatEur(results.totalImpots)}</span>
              </div>
              <div className="border-t border-neutral-200 pt-4 flex justify-between items-center">
                <span className="text-sm font-bold text-neutral-800">Gain net (PV − impôts)</span>
                <span className="font-bold text-primary-700 text-2xl">{formatEur(results.pvBrute - results.totalImpots)}</span>
              </div>
            </div>

            {/* Prix de revient ajusté */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
              <h4 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Prix de revient ajusté</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Prix d&apos;acquisition</span>
                  <span className="font-medium">{formatEur(inputs.prixAcquisition)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">
                    Frais {inputs.fraisAcquisition === 'forfait' ? '(forfait 7,5 %)' : '(réels)'}
                  </span>
                  <span className="font-medium">+{formatEur(results.fraisDeductibles)}</span>
                </div>
                {results.travauxDeductibles > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">
                      Travaux {inputs.travaux === 'forfait' ? '(forfait 15 %)' : '(réels)'}
                    </span>
                    <span className="font-medium">+{formatEur(results.travauxDeductibles)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-neutral-200">
                  <span className="font-bold text-neutral-800">Prix de revient total</span>
                  <span className="font-bold text-neutral-900">{formatEur(results.prixRevient)}</span>
                </div>
              </div>
            </div>

            {/* Abattements */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
              <h4 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">
                Abattements - {results.anneesDetention} an{results.anneesDetention !== 1 ? 's' : ''} de détention
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 rounded-lg p-3">
                  <p className="text-xs text-neutral-500 mb-1">Abattement IR (19 %)</p>
                  <p className="text-lg font-bold text-neutral-900">{formatPct(results.tauxAbattementIR)}</p>
                  <p className="text-xs text-neutral-600 mt-1">−{formatEur(results.abattementIR)}</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3">
                  <p className="text-xs text-neutral-500 mb-1">Abattement PS (18,6 %)</p>
                  <p className="text-lg font-bold text-neutral-900">{formatPct(results.tauxAbattementPS)}</p>
                  <p className="text-xs text-neutral-600 mt-1">−{formatEur(results.abattementPS)}</p>
                </div>
              </div>
              {results.anneesAvantExoIR > 0 && (
                <p className="text-xs text-neutral-500 mt-3">
                  Exonération IR dans <span className="font-bold text-neutral-700">{results.anneesAvantExoIR} an{results.anneesAvantExoIR > 1 ? 's' : ''}</span> -
                  Exonération PS totale dans <span className="font-bold text-neutral-700">{results.anneesAvantExoPS} an{results.anneesAvantExoPS > 1 ? 's' : ''}</span>
                </p>
              )}
              {results.anneesAvantExoIR === 0 && results.anneesAvantExoPS > 0 && (
                <p className="text-xs text-neutral-500 mt-3">
                  IR exonéré - Exonération PS totale dans <span className="font-bold text-neutral-700">{results.anneesAvantExoPS} an{results.anneesAvantExoPS > 1 ? 's' : ''}</span>
                </p>
              )}
            </div>

            {/* Détail impôts */}
            <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
              <h4 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">Détail des prélèvements</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-600">Plus-value nette taxée à 19 %</span>
                    <span className="font-medium">{formatEur(results.pvNetteIR)}</span>
                  </div>
                  <div className="flex justify-between text-red-700">
                    <span>Impôt sur le revenu 19 %</span>
                    <span className="font-bold">{formatEur(results.impotRevenu)}</span>
                  </div>
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-600">Plus-value nette taxée à 18,6 %</span>
                    <span className="font-medium">{formatEur(results.pvNettePS)}</span>
                  </div>
                  <div className="flex justify-between text-red-700">
                    <span>Prélèvements sociaux 18,6 %</span>
                    <span className="font-bold">{formatEur(results.prelevementsSociaux)}</span>
                  </div>
                </div>
                {results.surtaxe > 0 && (
                  <div className="border-t border-neutral-100 pt-3">
                    <div className="flex justify-between text-orange-700">
                      <span>Surtaxe (Art. 1609 nonies G CGI)</span>
                      <span className="font-bold">{formatEur(results.surtaxe)}</span>
                    </div>
                    <p className="text-xs text-orange-600 mt-1">Taux effectif : {formatPct(results.tauxSurtaxeEffectif, 2)} - montant indicatif, calcul définitif par le notaire</p>
                  </div>
                )}
                <div className="border-t border-neutral-200 pt-3 flex justify-between font-bold">
                  <span className="text-neutral-800">Total à payer</span>
                  <span className="text-red-700 text-lg">{formatEur(results.totalImpots)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Net perçu (prix vente − impôts)</span>
                  <span className="font-bold text-neutral-900">{formatEur(results.netPercu)}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Warnings et optimisations */}
        <AlertList items={results.warnings} />
        <AlertList items={results.optimisations} />

      </div>
    </div>

    {!results.exoneree && results.pvBrute > 0 && (
      <div className="mt-4 border-t border-neutral-200">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 px-1 pt-4 pb-2">
          Questions naturelles après ce résultat
        </p>
        <CrossLink
          href="/tmi"
          title="Quel sera l'impact de ce produit de cession sur votre TMI ?"
          description="Le net perçu de {netPercu} s'ajoutera à vos revenus cette année : votre tranche marginale peut changer."
          context={{ netPercu: formatEur(results.netPercu) }}
        />
        <CrossLink
          href="/assurance-vie/fiscalite-rachat"
          title="Réinvestir le net de cession en assurance-vie"
          description="{netPercu} réinvesti en assurance-vie : simulation de la fiscalité à la sortie après 8 ans."
          context={{ netPercu: formatEur(results.netPercu) }}
        />
        <CrossLink
          href="/rente-viagere"
          title="Convertir ce capital en rente viagère"
          description="{netPercu} en rente mensuelle garantie à vie (tables INSEE 2021)."
          context={{ netPercu: formatEur(results.netPercu) }}
        />
      </div>
    )}

    <ChatWidget
      contexte={{
        calculateur: 'plus-value-immobiliere',
        inputs,
        results,
      }}
    />
    </>
  )
}
