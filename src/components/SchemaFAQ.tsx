// src/components/SchemaFAQ.tsx
//
// Injecte un bloc JSON-LD FAQPage dans le <head>.
// Chaque `answer` doit être du texte brut (pas de JSX/HTML) , Google
// n'indexe que le texte, et le HTML dans les champs text/answer génère
// des erreurs dans le Rich Results Test.
//
// Usage :
//   import SchemaFAQ from '@/components/SchemaFAQ'
//   <SchemaFAQ items={FAQ_ITEMS} />
//
// Règle de validation Google :
//   • Le texte des réponses doit être visible sur la page (dans les accordéons)
//   • Max ~10 000 caractères par réponse recommandé
//   • Pas besoin de couvrir toutes les questions de la page, mais cohérence requise

import { safeJsonLd } from '@/lib/safeJsonLd'

export interface FAQSchemaItem {
  question: string
  answer: string // TEXTE BRUT uniquement , pas de JSX, pas de HTML
}

interface Props {
  items: FAQSchemaItem[]
}

export default function SchemaFAQ({ items }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  )
}
