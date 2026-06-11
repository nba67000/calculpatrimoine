// src/components/Calculator/AssuranceVieCalculator.tsx
'use client'

import FiscaliteComparisonChart from '@/components/FiscaliteComparisonChart'
import { calculerFiscaliteRachat, formatDateForInput, parseDateFromInput } from '@/lib/assuranceVie'
import type { AssuranceVieInputs } from '@/types/assuranceVie'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur, formatNombre } from '@/lib/formatters'

// dateOuverture stored as ISO string to survive JSON serialization
interface AVSimState {
  capitalTotal: number
  versementTotal: number
  dateOuverture: string
  montantRachat: number
  versementAvant2017: number
  tmi: AssuranceVieInputs['tmi']
  enCouple: boolean
  encoursTotalContrats: number
}

const DEFAULT_STATE: AVSimState = {
  capitalTotal: 100000,
  versementTotal: 70000,
  dateOuverture: new Date(2015, 0, 1).toISOString(),
  montantRachat: 30000,
  versementAvant2017: 40000,
  tmi: 30,
  enCouple: false,
  encoursTotalContrats: 70000,
}

export default function AssuranceVieCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'assurance-vie-rachat',
    nom: 'Fiscalité des rachats',
    href: '/assurance-vie/fiscalite-rachat',
    defaultInputs: DEFAULT_STATE,
    compute: (state: AVSimState) => calculerFiscaliteRachat({
      ...state,
      dateOuverture: new Date(state.dateOuverture),
    }),
    resume: (r, i) => r.plusValueTaxable > 0
      ? `Rachat : ${formatEur(i.montantRachat)} · PV imposable : ${formatEur(r.plusValueTaxable)}`
      : null,
  })

  return (
    <>
    <SimResumeBanner slug="assurance-vie-rachat" onReset={reset} />
    <div className="grid lg:grid-cols-2 gap-8">

      {/* COLONNE GAUCHE - INPUTS */}
      <div className="space-y-6">

        {/* Carte : Caractéristiques du contrat */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">
            Caractéristiques du contrat
          </h3>

          {/* Capital actuel */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">Capital actuel total</label>
              <span className="text-2xl font-bold text-primary-600">
                {formatEur(inputs.capitalTotal)}
              </span>
            </div>
            <input
              type="range" min="10000" max="500000" step="5000" value={inputs.capitalTotal}
              onChange={(e) => setInputs(prev => ({ ...prev, capitalTotal: Number(e.target.value) }))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>10 000€</span><span>500 000€</span>
            </div>
          </div>

          {/* Versements totaux */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">Versements totaux</label>
              <span className="text-2xl font-bold text-neutral-900">
                {formatEur(inputs.versementTotal)}
              </span>
            </div>
            <input
              type="range" min="5000" max="500000" step="5000" value={inputs.versementTotal}
              onChange={(e) => setInputs(prev => ({ ...prev, versementTotal: Number(e.target.value) }))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>5 000€</span><span>500 000€</span>
            </div>
          </div>

          {/* Date d'ouverture */}
          <div className="mb-6">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              Date d&apos;ouverture du contrat
            </label>
            <input
              type="date"
              value={formatDateForInput(new Date(inputs.dateOuverture))}
              onChange={(e) => setInputs(prev => ({ ...prev, dateOuverture: parseDateFromInput(e.target.value).toISOString() }))}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg font-medium"
            />
            {results && (
              <div className="mt-2 text-sm text-neutral-600">
                Ancienneté : <span className="font-bold text-neutral-900">
                  {results.ancienneteContrat} ans et {results.ancienneteMois} mois
                </span>
              </div>
            )}
          </div>

          {/* Plus-value / moins-value (calculée) */}
          {results && (
            <div className={`rounded-lg p-4 border ${results.plusValueTotale >= 0 ? 'bg-neutral-50 border-neutral-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-neutral-700">
                  {results.plusValueTotale >= 0 ? 'Plus-value totale' : 'Moins-value totale'}
                </span>
                <span className={`text-lg font-bold ${results.plusValueTotale >= 0 ? 'text-primary-600' : 'text-amber-600'}`}>
                  {results.plusValueTotale >= 0 ? '+' : ''}{formatEur(results.plusValueTotale)}
                </span>
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Soit {results.tauxPlusValue.toFixed(1)}% du capital
              </div>
            </div>
          )}
        </div>

        {/* Carte : Rachat envisagé */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Rachat envisagé</h3>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">Montant du rachat partiel</label>
              <span className="text-2xl font-bold text-primary-600">
                {formatEur(inputs.montantRachat)}
              </span>
            </div>
            <input
              type="range" min="1000" max={inputs.capitalTotal} step="1000" value={inputs.montantRachat}
              onChange={(e) => setInputs(prev => ({ ...prev, montantRachat: Number(e.target.value) }))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>1 000€</span><span>{formatNombre(inputs.capitalTotal)}€</span>
            </div>
          </div>

          {results && (
            <div className="space-y-3">
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-neutral-700">Capital (non taxé)</span>
                  <span className="font-bold text-neutral-900">{formatEur(results.partCapital)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-neutral-700">Plus-value (taxée)</span>
                  <span className="font-bold text-primary-600">{formatEur(results.partPlusValue)}</span>
                </div>
              </div>

              {results.abattementApplicable > 0 && (
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-primary-700">✓ Abattement (contrat &gt; 8 ans)</span>
                    <span className="font-bold text-primary-600">-{formatEur(results.abattementApplicable)}</span>
                  </div>
                  <div className="text-xs text-primary-600 mt-1">
                    {inputs.enCouple ? 'Couple : 9 200€' : 'Personne seule : 4 600€'}
                  </div>
                </div>
              )}

              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-primary-700">Part imposable du rachat</span>
                  <span className="text-lg font-bold text-primary-600">{formatEur(results.plusValueTaxable)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Carte : Situation fiscale */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-6">Situation fiscale</h3>

          <div className="mb-6">
            <label className="text-sm font-medium text-neutral-700 block mb-3">
              Votre tranche marginale d&apos;imposition (TMI)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {([0, 11, 30, 41, 45] as const).map((taux) => (
                <button
                  key={taux}
                  onClick={() => setInputs(prev => ({ ...prev, tmi: taux }))}
                  className={`py-2 px-1 sm:py-3 sm:px-2 rounded-lg font-bold text-sm transition-all ${
                    inputs.tmi === taux
                      ? 'bg-primary-600 text-white shadow-md scale-105'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {taux}%
                </button>
              ))}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Consultez votre dernier avis d&apos;imposition pour connaître votre TMI
            </p>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox" checked={inputs.enCouple}
                onChange={(e) => setInputs(prev => ({ ...prev, enCouple: e.target.checked }))}
                className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-neutral-700">
                En couple (abattement 9 200€ au lieu de 4 600€)
              </span>
            </label>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">Versements avant le 27/09/2017</label>
              <span className="text-lg font-bold text-neutral-900">
                {formatEur(inputs.versementAvant2017)}
              </span>
            </div>
            <input
              type="range" min="0" max={inputs.versementTotal} step="5000" value={inputs.versementAvant2017}
              onChange={(e) => setInputs(prev => ({ ...prev, versementAvant2017: Number(e.target.value) }))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>0€</span><span>{formatNombre(inputs.versementTotal)}€</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="text-sm font-medium text-neutral-700">
                Total versé sur tous vos contrats d&apos;assurance-vie
              </label>
              <span className={`text-lg font-bold ${inputs.encoursTotalContrats > 150000 ? 'text-amber-600' : 'text-neutral-900'}`}>
                {formatEur(inputs.encoursTotalContrats)}
              </span>
            </div>
            <input
              type="range" min="0" max="1000000" step="5000" value={inputs.encoursTotalContrats}
              onChange={(e) => setInputs(prev => ({ ...prev, encoursTotalContrats: Number(e.target.value) }))}
              className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>0€</span><span>1 000 000€</span>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Total versé sur toutes vos assurances-vie, tous assureurs confondus.
              Si vous n&apos;avez qu&apos;un seul contrat, reportez le montant de « Versements totaux » ci-dessus.
              Au-delà de 150 000 € versés au total, la flat tax passe de 7,5 % à 12,8 % (Art. 125-0 A CGI).
            </p>
            {inputs.encoursTotalContrats <= 150000 ? (
              <p className="text-xs text-primary-600 mt-1">Taux réduit : 7,5 % (total versé ≤ 150 000 €)</p>
            ) : (
              <p className="text-xs text-amber-600 mt-1">Taux normal : 12,8 % (total versé &gt; 150 000 €)</p>
            )}
          </div>
        </div>
      </div>

      {/* COLONNE DROITE - RÉSULTATS */}
      <div className="space-y-6">

        {results && (
          <>
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <FiscaliteComparisonChart
                optionPFU={results.optionPFU}
                optionIR={results.optionIR}
                optionMoinsImposee={results.optionMoinsImposee}
                montantRachat={inputs.montantRachat}
              />
            </div>

            <AlertList items={results.warnings} />
            <AlertList items={results.optimisations} />

            <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Points clés</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Ancienneté contrat</span>
                  <span className="font-bold text-neutral-900">
                    {results.ancienneteContrat} ans {results.ancienneteMois} mois
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Plus-value taxable</span>
                  <span className="font-bold text-neutral-900">{formatEur(results.plusValueTaxable)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Option la moins imposée</span>
                  <span className="font-bold text-primary-600">{results.optionMoinsImposee}</span>
                </div>
                {results.difference > 50 && (
                  <div className="flex justify-between pt-2 border-t border-neutral-300">
                    <span className="text-neutral-600">Différence</span>
                    <span className="font-bold text-primary-600">{formatEur(results.difference)}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
    {results && results.plusValueTaxable > 0 && (
      <div className="mt-4 border-t border-neutral-200">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 px-1 pt-4 pb-2">
          Questions naturelles après ce résultat
        </p>
        <CrossLink
          href="/assurance-vie/transmission"
          title="Et la transmission après votre décès ? Art. 990 I"
          description="Ce contrat de {capital} transmis à vos bénéficiaires : calcul des droits hors succession."
          context={{ capital: formatEur(inputs.capitalTotal) }}
        />
        <CrossLink
          href="/rente-viagere"
          title="Comparer avec une rente viagère sur ce capital"
          description="Convertir {capital} en rente mensuelle garantie à vie, départ immédiat ou différé."
          context={{ capital: formatEur(inputs.capitalTotal) }}
        />
        <CrossLink
          href="/tmi"
          title="Vérifier votre TMI avant de choisir PFU ou barème"
          description="L'option optimale entre PFU 12,8 % et barème dépend de votre tranche marginale réelle."
        />
      </div>
    )}
    {results && (
      <ChatWidget
        contexte={{
          calculateur: 'assurance-vie/fiscalite-rachat',
          inputs: {
            ...inputs,
            dateOuverture: new Date(inputs.dateOuverture),
          },
          results,
        }}
      />
    )}
    </>
  )
}
