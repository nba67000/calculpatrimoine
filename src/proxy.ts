// src/proxy.ts
// Rate limiting sur /api/chat - protection contre l'abus de quota Anthropic.
//
// Implémentation : sliding window en mémoire par instance Lambda.
// Limitation : les instances Vercel serverless ne partagent pas de mémoire ;
// cette protection est efficace contre les bursts sur une instance chaude.
// Pour un rate limiting distribué multi-instance, utiliser Upstash Redis.

import { NextRequest, NextResponse } from 'next/server'

const WINDOW_MS = 60_000  // 1 minute
const MAX_REQUESTS = 10   // requêtes par fenêtre par IP

const store = new Map<string, { count: number; windowStart: number }>()

// Nettoyage périodique pour éviter une fuite mémoire sur les instances longue durée
let lastCleanup = Date.now()
function cleanupStore(): void {
  const now = Date.now()
  if (now - lastCleanup < 5 * 60_000) return
  lastCleanup = now
  for (const [ip, entry] of store.entries()) {
    if (now - entry.windowStart > WINDOW_MS) store.delete(ip)
  }
}

function getClientIp(req: NextRequest): string {
  // Vercel pose `x-real-ip` avec l'IP cliente reelle , c'est la source de confiance.
  // Le premier hop de `x-forwarded-for` est controle par le client (usurpable
  // via un simple header HTTP), on prend donc le dernier hop en fallback , c'est
  // celui depose par le proxy le plus proche du serveur.
  const realIp = req.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp
  const xff = req.headers.get('x-forwarded-for')
  if (xff) {
    const hops = xff.split(',').map(s => s.trim()).filter(Boolean)
    if (hops.length > 0) return hops[hops.length - 1]
  }
  return 'unknown'
}

function isRateLimited(ip: string): boolean {
  cleanupStore()
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now })
    return false
  }

  if (entry.count >= MAX_REQUESTS) return true

  entry.count++
  return false
}

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/chat' && req.method === 'POST') {
    const ip = getClientIp(req)
    if (isRateLimited(ip)) {
      return new NextResponse('Trop de requêtes - réessayez dans une minute.', {
        status: 429,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Retry-After': '60',
        },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/chat',
}
