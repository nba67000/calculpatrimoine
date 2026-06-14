// src/components/Calculator/SuccessionCalculator.tsx
'use client'

import {
  calculerSuccession,
  genererIdHeritier,
  LIBELLE_LIEN,
} from '@/lib/succession'
import type {
  SuccessionInputs,
  HeritierSuccession,
  LienHeritier,
  StatutCivilTEPA,
} from '@/types/succession'
import { useCalculator } from '@/hooks/useCalculator'
import AlertList from '@/components/AlertList'
import ChatWidget from '@/components/ChatWidget'
import CrossLink from '@/components/CrossLink'
import SimResumeBanner from '@/components/Calculator/SimResumeBanner'
import { formatEur, formatNombre } from '@/lib/formatters'

const LIENS: Array<{ value: LienHeritier; label: string }> = (
  Object.entries(LIBELLE_LIEN) as Array<[LienHeritier, string]>
).map(([value, label]) => ({ value, label }))

const STATUTS_CIVILS_TEPA: Array<{ value: StatutCivilTEPA; label: string }> = [
  { value: 'celibataire', label: 'Célibataire' },
  { value: 'veuf',        label: 'Veuf / veuve' },
  { value: 'divorce',     label: 'Divorcé(e)' },
  { value: 'separe',      label: 'Séparé(e) de corps' },
  { value: 'marie',       label: 'Marié(e)' },
  { value: 'pacse',       label: 'Pacsé(e)' },
]

const DEFAULT_INPUTS: SuccessionInputs = {
  actifNetSuccessoral: 600000,
  heritiers: [
    { id: 'h1', nom: 'Conjoint',  lien: 'epoux_pacs', partRecue: 300000, donationsAnterieures: 0 },
    { id: 'h2', nom: 'Enfant 1',  lien: 'enfant',     partRecue: 150000, donationsAnterieures: 0 },
    { id: 'h3', nom: 'Enfant 2',  lien: 'enfant',     partRecue: 150000, donationsAnterieures: 0 },
  ],
}

export default function SuccessionCalculator() {
  const { inputs, setInputs, reset, results } = useCalculator({
    slug: 'succession',
    nom: 'Succession - Droits par héritier',
    href: '/succession',
    defaultInputs: DEFAULT_INPUTS,
    compute: calculerSuccession,
    resume: (r) =>
      r.totalDroits > 0
        ? `Droits totaux : ${formatEur(r.totalDroits)} sur ${r.detailHeritiers.length} héritier${r.detailHeritiers.length > 1 ? 's' : ''}`
        : null,
  })

  function modifierHeritier(id: string, updates: Partial<HeritierSuccession>) {
    setInputs(prev => ({
      ...prev,
      heritiers: prev.heritiers.map(h => (h.id === id ? { ...h, ...updates } : h)),
    }))
  }

  function ajouterHeritier() {
    if (inputs.heritiers.length >= 8) return
    setInputs(prev => ({
      ...prev,
      heritiers: [
        ...prev.heritiers,
        {
          id: genererIdHeritier(),
          nom: `Héritier ${prev.heritiers.length + 1}`,
          lien: 'enfant',
          partRecue: 0,
          donationsAnterieures: 0,
        },
      ],
    }))
  }

  function supprimerHeritier(id: string) {
    if (inputs.heritiers.length <= 1) return
    setInputs(prev => ({
      ...prev,
      heritiers: prev.heritiers.filter(h => h.id !== id),
    }))
  }

  return (
    <>
      <SimResumeBanner slug="succession" onReset={reset} />
      <div className="grid lg:grid-cols-2 gap-8">

        {/* COLONNE GAUCHE - INPUTS */}
        <div className="space-y-6">

          {/* Actif net */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Actif net successoral</h3>
            <div className="mb-2">
              <div className="flex items-baseline gap-3">
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={inputs.actifNetSuccessoral}
                  onChange={(e) =>
                    setInputs(prev => ({ ...prev, actifNetSuccessoral: Number(e.target.value) }))
                  }
                  className="w-44 px-4 py-3 border border-neutral-300 rounded-lg text-xl font-bold text-primary-700 text-right focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <span className="text-xl font-bold text-neutral-600">€</span>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Patrimoine du défunt après déduction des dettes. La répartition entre héritiers est gérée
                en colonne « part reçue » ci-dessous.
              </p>
            </div>
          </div>

          {/* Héritiers */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-neutral-900">Héritiers</h3>
              <button
                onClick={ajouterHeritier}
                disabled={inputs.heritiers.length >= 8}
                className="font-mono text-xs px-3 py-1.5 border border-primary-300 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                + Ajouter
              </button>
            </div>

            <div className="space-y-4">
              {inputs.heritiers.map((h) => (
                <div key={h.id} className="border border-neutral-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={h.nom}
                      onChange={(e) => modifierHeritier(h.id, { nom: e.target.value })}
                      className="flex-1 px-3 py-2 border border-neutral-200 rounded text-sm font-medium"
                    />
                    {inputs.heritiers.length > 1 && (
                      <button
                        onClick={() => supprimerHeritier(h.id)}
                        className="font-mono text-xs text-neutral-400 hover:text-red-600 px-2"
                        aria-label="Supprimer"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-neutral-500 block mb-1">Lien avec le défunt</label>
                    <select
                      value={h.lien}
                      onChange={(e) => modifierHeritier(h.id, { lien: e.target.value as LienHeritier })}
                      className="w-full px-3 py-2 border border-neutral-200 rounded text-sm"
                    >
                      {LIENS.map(l => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-neutral-500 block mb-1">Part reçue (€)</label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={h.partRecue}
                        onChange={(e) => modifierHeritier(h.id, { partRecue: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-neutral-200 rounded text-sm text-right"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-500 block mb-1" title="Donations reçues du défunt depuis moins de 15 ans">
                        Dons reçus du défunt depuis moins de 15 ans (€)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={h.donationsAnterieures}
                        onChange={(e) => modifierHeritier(h.id, { donationsAnterieures: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-neutral-200 rounded text-sm text-right"
                      />
                    </div>
                  </div>

                  {h.lien === 'frere_soeur' && (
                    <div className="border-t border-neutral-100 pt-3 mt-2 space-y-3">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                        Exonération Loi TEPA frère/sœur (Art. 796-0 ter CGI)
                      </p>
                      <p className="text-xs text-neutral-500">
                        L&apos;exonération totale s&apos;applique si les 3 conditions cumulatives sont
                        remplies au jour du décès.
                      </p>

                      <div>
                        <label className="text-xs text-neutral-500 block mb-1">
                          1. Statut civil au jour du décès
                        </label>
                        <select
                          value={h.statutCivilTEPA ?? ''}
                          onChange={(e) => {
                            const v = e.target.value
                            modifierHeritier(h.id, {
                              statutCivilTEPA: v === '' ? undefined : (v as StatutCivilTEPA),
                            })
                          }}
                          className="w-full px-3 py-2 border border-neutral-200 rounded text-sm"
                        >
                          <option value="">— non renseigné —</option>
                          {STATUTS_CIVILS_TEPA.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </div>

                      <label className="flex items-start gap-2 text-sm text-neutral-700">
                        <input
                          type="checkbox"
                          checked={h.ageSup50OuInvalide ?? false}
                          onChange={(e) =>
                            modifierHeritier(h.id, { ageSup50OuInvalide: e.target.checked })
                          }
                          className="mt-0.5"
                        />
                        <span>
                          2. Âge supérieur à 50 ans <strong>ou</strong> infirmité empêchant de
                          subvenir à ses besoins par le travail
                        </span>
                      </label>

                      <label className="flex items-start gap-2 text-sm text-neutral-700">
                        <input
                          type="checkbox"
                          checked={h.cohabitation5AnsDefunt ?? false}
                          onChange={(e) =>
                            modifierHeritier(h.id, { cohabitation5AnsDefunt: e.target.checked })
                          }
                          className="mt-0.5"
                        />
                        <span>
                          3. Cohabitation constante avec le défunt pendant les 5 années précédant
                          le décès (tolérance hospitalisation / EHPAD admise)
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLONNE DROITE - RÉSULTATS */}
        <div className="space-y-6">

          {/* Total */}
          <div className="rounded-xl border-2 border-primary-200 bg-primary-50 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-primary-700 mb-1">Droits totaux</div>
                <div className="text-3xl font-bold text-primary-900">
                  {formatEur(results.totalDroits)}
                </div>
              </div>
              <div>
                <div className="text-xs text-primary-700 mb-1">Total net reçu</div>
                <div className="text-3xl font-bold text-primary-900">
                  {formatEur(results.totalNetRecu)}
                </div>
              </div>
            </div>
          </div>

          {/* Détail par héritier */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-neutral-900 mb-4">Détail par héritier</h3>
            <div className="space-y-4">
              {results.detailHeritiers.map(d => (
                <div key={d.id} className="border-l-2 border-accent-400 pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-neutral-900">
                      {d.nom}{' '}
                      <span className="font-normal text-xs text-neutral-500">
                        ({LIBELLE_LIEN[d.lien]})
                      </span>
                    </p>
                    {d.exonereLoiTEPA && (
                      <span
                        className="font-mono text-xs text-green-700 bg-green-50 px-2 py-0.5 border border-green-200"
                        title={
                          d.motifExoneration === 'frere_soeur_796_0_ter'
                            ? 'Exonération Art. 796-0 ter CGI (frère/sœur cohabitant, Loi TEPA 2007 art. 10)'
                            : 'Exonération Art. 796-0 bis CGI (conjoint / PACS, Loi TEPA 2007 art. 8)'
                        }
                      >
                        {d.motifExoneration === 'frere_soeur_796_0_ter'
                          ? 'Exonéré 796-0 ter'
                          : 'Exonéré TEPA'}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <span className="text-neutral-500">Part reçue</span>
                    <span className="text-right">{formatEur(d.partRecue)}</span>
                    <span className="text-neutral-500">Abattement</span>
                    <span className="text-right">{formatEur(d.abattementApplique)}</span>
                    <span className="text-neutral-500">Base taxable</span>
                    <span className="text-right">{formatEur(d.baseTaxable)}</span>
                    <span className="font-medium text-neutral-700">Droits</span>
                    <span className="text-right font-medium text-red-700">{formatEur(d.droits)}</span>
                    <span className="font-bold text-neutral-900">Net reçu</span>
                    <span className="text-right font-bold text-primary-700">{formatEur(d.netRecu)}</span>
                  </div>
                </div>
              ))}
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
          title="Anticiper par donation de son vivant"
          description="Les abattements (Art. 779 CGI) se renouvellent tous les 15 ans : donner permet de fractionner la transmission."
        />
        <CrossLink
          href="/assurance-vie/transmission"
          title="L'assurance-vie échappe à la succession"
          description="Régime spécifique Art. 990 I / 757 B CGI avec abattement de 152 500 € par bénéficiaire."
        />
        <CrossLink
          href="/donation/demembrement"
          title="Donation avec démembrement"
          description="Transmettre la nue-propriété pour réduire l'assiette taxable (barème Art. 669 CGI selon l'âge)."
        />
      </div>

      <ChatWidget contexte={{ calculateur: 'succession', inputs, results }} />
    </>
  )
}
