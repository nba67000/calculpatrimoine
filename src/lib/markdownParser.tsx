// src/lib/markdownParser.tsx
// Minimal markdown renderer: **bold**, [text](url), newlines, paragraphs.
// Used by ChatWidget to render assistant messages.

import React from 'react'

type InlineNode = string | React.ReactElement

// Whitelist des protocoles autorisés dans les liens markdown. Bloque
// javascript:, data:, vbscript:, et autres schemas exotiques.
const SAFE_URL = /^(?:https?:|mailto:|\/|#)/i

export function parseInline(text: string): InlineNode[] {
  const regex = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|\n/g
  const nodes: InlineNode[] = []
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[0] === '\n') {
      nodes.push(<br key={key++} />)
    } else if (m[0].startsWith('**')) {
      nodes.push(<strong key={key++}>{m[1]}</strong>)
    } else {
      const url = m[3].trim()
      if (SAFE_URL.test(url)) {
        nodes.push(
          <a key={key++} href={url} target="_blank" rel="noopener noreferrer"
             className="text-primary-600 underline hover:text-primary-800">
            {m[2]}
          </a>
        )
      } else {
        // Protocole non autorisé , rendu en texte avec le label visible
        nodes.push(`${m[2]} (${url})`)
      }
    }
    last = m.index + m[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export function renderMarkdown(text: string): React.ReactNode {
  const paras = text.split(/\n\n+/)
  return paras.map((para, i) => (
    <p key={i} className={i < paras.length - 1 ? 'mb-2' : undefined}>
      {parseInline(para)}
    </p>
  ))
}
