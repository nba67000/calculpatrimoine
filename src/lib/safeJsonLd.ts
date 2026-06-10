// src/lib/safeJsonLd.ts
// Serialise un objet JSON-LD pour injection dans une balise <script> via
// dangerouslySetInnerHTML. JSON.stringify natif ne neutralise PAS la
// sequence </script>, ce qui peut casser le bloc et permettre une
// injection si l'objet contient des donnees controlees. Echappe `<` qui
// suffit a bloquer ce vecteur.

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
