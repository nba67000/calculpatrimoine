'use client'

import { calculerDeficitFoncier } from '@/lib/deficitFoncier'
import type { DeficitFoncierInputs } from '@/types/deficitFoncier'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur } from '@/lib/formatters'

const DEFAULT_INPUTS: DeficitFoncierInputs = {
  revenusFoncierBruts: 12000,
  chargesHorsInterets: 18000,
  interetsEmprunt: 3000,
  tmi: 30,
  renovationEnergetiquePassoire: false,
}

const TMI_OPTIONS = [0, 11, 30, 41, 45] as const

export default function DeficitFoncierCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'deficit-foncier',
    nom: 'Déficit foncier',
    href: '/deficit-foncier',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerDeficitFoncier,
    resume: r =>
      r.deficitTotal > 0
        ? `Déficit ${formatEur(r.deficitTotal)} · Économie IR ${formatEur(r.economieImpotImmediate)}`
        : `Revenu foncier net ${formatEur(r.revenuFoncierNet)}`,
  })

  function set<K extends keyof DeficitFoncierInputs>(k: K, v: DeficitFoncierInputs[K]) {
    setInputs(prev => ({ ...prev, [k]: v }))
  }

  return (
    <>
      <SimResumeBanner slug="deficit-foncier" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Revenus et charges</h3>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Revenus fonciers bruts annuels (€)</label>
              <input type="number" min="0" step="1000" value={inputs.revenusFoncierBruts}
                onChange={e => set('revenusFoncierBruts', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right text-lg font-medium" />
              <p className="text-xs text-neutral-500 mt-1">Total des loyers nus encaissés sur l&apos;année.</p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Charges déductibles hors intérêts (€)</label>
              <input type="number" min="0" step="500" value={inputs.chargesHorsInterets}
                onChange={e => set('chargesHorsInterets', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              <p className="text-xs text-neutral-500 mt-1">
                Travaux d&apos;entretien et réparation, taxe foncière, gestion locative, assurance, copropriété
                (Art. 31 CGI). Pas les travaux d&apos;agrandissement / reconstruction.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1">Intérêts d&apos;emprunt (€)</label>
              <input type="number" min="0" step="500" value={inputs.interetsEmprunt}
                onChange={e => set('interetsEmprunt', Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-200 rounded text-right" />
              <p className="text-xs text-neutral-500 mt-1">
                Traités à part : les intérêts se déduisent d&apos;abord des loyers. S&apos;il en reste plus que les
                loyers, l&apos;excédent ne réduit PAS votre salaire ou retraite imposable, il sera seulement
                déduit des loyers des 10 années suivantes.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-neutral-900">Situation fiscale</h3>

            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-2">TMI</label>
              <div className="flex gap-2 flex-wrap">
                {TMI_OPTIONS.map(t => (
                  <button key={t} onClick={() => set('tmi', t)}
                    className={`px-4 py-2 rounded font-mono text-sm border-2 ${inputs.tmi === t ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-neutral-700 border-neutral-200 hover:border-primary-300'}`}>
                    {t} %
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.renovationEnergetiquePassoire}
                  onChange={e => set('renovationEnergetiquePassoire', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-neutral-700">
                  <strong>Rénovation énergétique passoire (plafond 21 400 €)</strong>
                  <br />
                  <span className="text-xs text-neutral-500">
                    Travaux faisant passer le logement d&apos;une mauvaise classe énergétique (E, F ou G
                    au DPE) à une bonne classe (A, B, C ou D). Dépenses payées du 01/01/2023 au
                    31/12/2025 (LF 2023 art. 12). À vérifier en cas de prorogation après 2025.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-xl border-2 p-6 ${results.deficitTotal > 0 ? 'bg-orange-50 border-orange-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-sm text-neutral-600 mb-2">Résultat</p>
            <p className="text-3xl font-bold text-neutral-900 mb-1">
              {results.deficitTotal > 0
                ? `Déficit ${formatEur(results.deficitTotal)}`
                : `Revenu net ${formatEur(results.revenuFoncierNet)}`}
            </p>
            {results.deficitTotal > 0 && (
              <p className="text-sm text-neutral-600">
                Économie d&apos;impôt immédiate : <strong>{formatEur(results.economieImpotImmediate)}</strong>
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">Décomposition</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <span className="text-neutral-500">Revenus après imputation des intérêts</span>
              <span className="text-right">{formatEur(results.revenuApresInterets)}</span>
              <span className="text-neutral-500">Revenu foncier net (avant déficit)</span>
              <span className="text-right">{formatEur(results.revenuFoncierNet)}</span>
              {results.deficitTotal > 0 && (
                <>
                  <span className="text-neutral-500">Déficit lié aux intérêts</span>
                  <span className="text-right">{formatEur(results.deficitLieAuxInterets)}</span>
                  <span className="text-neutral-500">Déficit hors intérêts</span>
                  <span className="text-right">{formatEur(results.deficitHorsInterets)}</span>
                </>
              )}
            </div>
          </div>

          {results.deficitTotal > 0 && (
            <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-900 mb-3">Imputation</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <span className="text-neutral-500">Plafond annuel applicable</span>
                <span className="text-right">{formatEur(results.plafondAnnuel)}</span>
                <span className="text-neutral-500">Imputable sur le revenu global</span>
                <span className="text-right font-medium">{formatEur(results.imputableRevenuGlobal)}</span>
                <span className="text-neutral-500">Reporté sur revenus fonciers (10 ans)</span>
                <span className="text-right">{formatEur(results.reportableRevenusFonciers)}</span>
                <span className="font-bold pt-2 border-t">Économie d&apos;impôt (TMI {inputs.tmi} %)</span>
                <span className="text-right font-bold text-primary-700 pt-2 border-t">{formatEur(results.economieImpotImmediate)}</span>
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
          href="/lmnp-reel-vs-micro"
          title="Alternative en location meublée"
          description="La location meublée suit le régime BIC : amortissements possibles, déficit non imputable sur le revenu global."
        />
        <CrossLink
          href="/plus-value-immobiliere"
          title="Impôt à la cession du bien locatif"
          description="L'imputation du déficit sur le revenu global engage une location 3 ans (Art. 156 I-3° CGI)."
        />
        <CrossLink
          href="/ifi"
          title="Bien locatif et IFI"
          description="Le bien locatif compte dans l'IFI dès 1 300 000 € de patrimoine immobilier net."
        />
      </div>

      <ChatWidget contexte={{ calculateur: 'deficit-foncier', inputs, results }} />
    </>
  )
}
