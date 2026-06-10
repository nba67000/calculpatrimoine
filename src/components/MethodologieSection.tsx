// src/components/MethodologieSection.tsx
//
// Composant standardisé pour le contenu de la prop `methodologie` du
// CalculateurPageLayout. Absorbe le pattern répété sur 18 pages :
// - SourcesSection (auto via slug)
// - liste LIMITES (H3 + ul)
// - bandeau date/contexte (note bareme)
//
// Extraction réalisée le 2026-06-01 (candidat #3 du scan
// /improve-codebase-architecture).
//
// Usage minimal :
//   methodologie={<MethodologieSection slug="succession" limites={LIMITES} note="Barème 2026..." />}

import type { ReactNode } from 'react'
import SourcesSection from '@/components/SourcesSection'
import { parseInline } from '@/lib/markdownParser'

interface Props {
  /** Slug du calculateur , utilisé pour résoudre les sources via le registry. */
  slug: string
  /** Titre alternatif pour la sous-section "Textes de loi" (rare). */
  titreSourcesSection?: string
  /** Liste des limites connues du calculateur. Si vide ou absent, la section
   *  "Limites connues" n'est pas rendue. Le contenu de chaque entrée accepte
   *  du markdown gras `**texte**` qui sera rendu en `<strong>`. */
  limites?: string[]
  /** Note de bas de section (millésime, références légales clés) rendue dans
   *  un bandeau primary discret. Peut contenir du JSX. */
  note?: ReactNode
  /** Slot libre rendu APRÈS sources et avant limites , pour insérer un tableau
   *  spécifique au calc (ex. barème 669 dans donation/démembrement, abattements
   *  spécifiques dans transmission, etc.). */
  extra?: ReactNode
}

/** Rend le contenu standard de la section méthodologie d'une page calculateur. */
export default function MethodologieSection({
  slug,
  titreSourcesSection,
  limites,
  note,
  extra,
}: Props) {
  const hasLimites = limites && limites.length > 0
  return (
    <>
      <SourcesSection slug={slug} title={titreSourcesSection} />

      {extra}

      {hasLimites && (
        <div>
          <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">
            Limites connues
          </h3>
          <ul className="text-sm text-neutral-600 space-y-1.5">
            {limites!.map((l, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-neutral-400 mt-0.5 shrink-0">-</span>
                <span>{parseInline(l)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {note && (
        <div className="border-l-4 border-primary-200 bg-primary-50 px-4 py-3">
          <p className="text-sm text-primary-800">{note}</p>
        </div>
      )}
    </>
  )
}
