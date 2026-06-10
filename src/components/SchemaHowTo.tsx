// src/components/SchemaHowTo.tsx
//
// Injecte un bloc JSON-LD HowTo dans le <head>.
// Utilisé sur les pages calculateur pour décrire les étapes d'utilisation.
// Google peut afficher un rich snippet "étapes" dans les SERPs.
//
// Règles de validation :
//   • `name` : phrase courte, max ~80 chars
//   • `text` : description complète de l'étape, visible sur la page
//   • `url`  : ancre vers la section correspondante (recommandé)
//   • `totalTime` : format ISO 8601 durée (PT5M = 5 minutes)

import { safeJsonLd } from '@/lib/safeJsonLd'

export interface HowToStep {
  name: string
  text: string
  url?: string
}

interface Props {
  name: string
  description: string
  totalTime?: string // ISO 8601 : "PT5M" = 5 min, "PT10M" = 10 min
  steps: HowToStep[]
  tool?: string      // Outil utilisé (ex: "Calculateur TMI CalculPatrimoine")
}

export default function SchemaHowTo({ name, description, totalTime, steps, tool }: Props) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime && { totalTime }),
    ...(tool && {
      tool: {
        '@type': 'HowToTool',
        name: tool,
      },
    }),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url && { url: s.url }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  )
}
