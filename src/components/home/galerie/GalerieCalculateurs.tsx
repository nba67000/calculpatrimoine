'use client'

// src/components/home/galerie/GalerieCalculateurs.tsx
// Section plein écran : galerie 3D des calculateurs (intérieur de sphère).
// - Initialisation paresseuse : three.js + GSAP ne sont chargés que lorsque
//   l'utilisateur a suffisamment scrollé (IntersectionObserver), puis l'intro
//   est déclenchée par ScrollTrigger.
// - Fallback : liste de liens sémantiques (sr-only) toujours rendue pour le
//   SEO et les lecteurs d'écran ; grille visible si WebGL est indisponible.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SPHERE_CARDS } from './sphere-data'
import type { SphereGalleryEngine } from './SphereGalleryEngine'

const ACCENT_OR = '#B8902A'
const SCENE_BG = '#F7F3EC'

export default function GalerieCalculateurs() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasHostRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<SphereGalleryEngine | null>(null)
  const router = useRouter()
  const [webglKo, setWebglKo] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const host = canvasHostRef.current
    if (!section || !host) return

    let cancelled = false
    let scrollTriggerInstance: { kill: () => void } | null = null

    // N'initialise la scène que lorsque la section approche du viewport.
    const io = new IntersectionObserver(
      async entries => {
        if (!entries.some(e => e.isIntersecting)) return
        io.disconnect()

        if (!hasWebGL()) {
          setWebglKo(true)
          return
        }

        // Polices d'abord : les cartes sont dessinées sur canvas avec Inter.
        try { await document.fonts.ready } catch { /* non bloquant */ }

        const [{ SphereGalleryEngine }, gsapMod, stMod] = await Promise.all([
          import('./SphereGalleryEngine'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])
        if (cancelled) return

        const gsap = gsapMod.default
        const ScrollTrigger = stMod.ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        try {
          engineRef.current = new SphereGalleryEngine({
            container: host,
            cards: SPHERE_CARDS,
            reducedMotion,
            onSelect: href => router.push(href),
          })
        } catch {
          setWebglKo(true)
          return
        }
        setReady(true)

        // Entrée en scène quand la galerie occupe l'écran.
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          once: true,
          onEnter: () => engineRef.current?.playIntro(),
        })
        // Si l'utilisateur a déjà dépassé le seuil au moment de l'init.
        ScrollTrigger.refresh()
      },
      { rootMargin: '400px 0px' }
    )
    io.observe(section)

    return () => {
      cancelled = true
      io.disconnect()
      scrollTriggerInstance?.kill()
      engineRef.current?.dispose()
      engineRef.current = null
    }
  }, [router])

  return (
    <section
      ref={sectionRef}
      aria-label="Galerie des calculateurs"
      className="relative"
      style={{ backgroundColor: SCENE_BG }}
    >
      {/* En-tête de section */}
      <div className="max-w-6xl mx-auto px-6 pt-24 lg:pt-32 pb-10">
        <div className="flex items-center gap-6">
          <h2
            className="font-sans font-black text-neutral-900 shrink-0"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.02em' }}
          >
            Les outils
          </h2>
          <div className="flex-1 h-[1px] bg-black/10" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-600 mt-4">
          {SPHERE_CARDS.length} calculateurs · explorez la sphère
        </p>
      </div>

      {/* Liens sémantiques : toujours présents pour le SEO et l'accessibilité. */}
      <nav className="sr-only" aria-label="Liste des calculateurs">
        <ul>
          {SPHERE_CARDS.map(c => (
            <li key={c.href}>
              <Link href={c.href}>{c.nom} — {c.desc}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {webglKo ? (
        <FallbackGrid />
      ) : (
        <div className="relative h-[100svh] min-h-[540px]">
          {/* Hôte du canvas three.js */}
          <div ref={canvasHostRef} aria-hidden className="absolute inset-0" />

          {/* Fondu haut/bas pour intégrer la scène au fond ocre #F7F3EC */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24"
            style={{ background: 'linear-gradient(to bottom, #F7F3EC, transparent)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(to top, #F7F3EC, transparent)' }}
          />

          {/* Consigne d'interaction */}
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-8 flex justify-center transition-opacity duration-700 ${
              ready ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest text-neutral-700 px-5 py-2.5 rounded-full border border-black/10"
              style={{ backgroundColor: 'rgba(247,243,236,0.75)', backdropFilter: 'blur(6px)' }}
            >
              <span style={{ color: ACCENT_OR }}>⟲</span>
              &nbsp;Cliquez-glissez pour explorer · cliquez sur une carte pour ouvrir
            </p>
          </div>

          {/* Voile de chargement */}
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                Chargement de la galerie…
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

/** Grille de secours (WebGL indisponible) : mêmes données, liens classiques. */
function FallbackGrid() {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SPHERE_CARDS.map(c => (
        <Link
          key={c.href}
          href={c.href}
          className="group flex flex-col gap-2 rounded-2xl border border-black/10 hover:border-black/25 p-6 transition-all hover:-translate-y-1"
          style={{ backgroundColor: '#FFFFFF', borderLeft: `3px solid ${ACCENT_OR}`, boxShadow: '3px 3px 0 #E8E0D0' }}
        >
          <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: ACCENT_OR }}>
            {c.categorie}
          </p>
          <p className="font-sans font-bold text-neutral-900 leading-snug">{c.nom}</p>
          <p className="font-mono text-xs text-neutral-600 leading-relaxed line-clamp-3">{c.desc}</p>
        </Link>
      ))}
    </div>
  )
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}
