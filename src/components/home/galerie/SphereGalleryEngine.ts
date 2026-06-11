// src/components/home/galerie/SphereGalleryEngine.ts
// Galerie 3D "intérieur de sphère" inspirée de phantom.land.
// - La caméra est au centre d'une grande sphère, les cartes tapissent la paroi.
// - Clic gauche + glisser pour regarder autour (easing type Lenis + inertie).
// - Hover : la carte s'éclaire et grossit (GSAP). Clic : callback de navigation.
//
// Classe vanilla three.js (pas de react-three-fiber) pilotée par le composant
// React GalerieCalculateurs. Tout est nettoyé dans dispose().

import * as THREE from 'three'
import gsap from 'gsap'
import type { SphereCardData } from './sphere-data'

const ACCENT_OR = '#B8902A'
// Fond clair légèrement ocre, identique aux pages catégories (#F7F3EC).
const SCENE_BG = '#F7F3EC'
const CARD_BG = '#FFFFFF'
const CARD_BORDER = 'rgba(0,0,0,0.10)'
const CARD_SHADOW = '#E8E0D0'

// Rayon de la sphère et taille des cartes (unités monde).
const RADIUS = 28
const CARD_W = 12.5
const CARD_H = 7.8125 // ratio 1280x800
// Distance d'approche de la carte sélectionnée (remplit l'écran à fov 72).
const SELECT_DIST = 6.8

// Easing "Lenis-like" : interpolation exponentielle vers la cible.
const EASE = 0.075
const DRAG_SPEED = 0.16
const INERTIA_DECAY = 0.94
const AUTO_DRIFT = 0.012 // degrés/frame quand inactif
const LAT_LIMIT = 52

interface CardEntry {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
  data: SphereCardData
  baseScale: number
}

export interface SphereGalleryOptions {
  container: HTMLElement
  cards: SphereCardData[]
  onSelect: (href: string) => void
  reducedMotion?: boolean
}

export class SphereGalleryEngine {
  private container: HTMLElement
  private onSelect: (href: string) => void
  private reducedMotion: boolean

  private renderer!: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera!: THREE.PerspectiveCamera
  private raycaster = new THREE.Raycaster()
  private pointerNdc = new THREE.Vector2()
  private lookTarget = new THREE.Vector3()

  private cards: CardEntry[] = []
  private hovered: CardEntry | null = null

  // Orientation caméra (degrés) — valeur courante easée vers la cible.
  private lon = 0
  private lat = 0
  private targetLon = 0
  private targetLat = 0
  private velLon = 0
  private velLat = 0

  // État du drag
  private dragging = false
  private pointerType: string = 'mouse'
  private lastX = 0
  private lastY = 0
  private downX = 0
  private downY = 0
  private downTime = 0
  private lastInteraction = 0

  private rafId = 0
  private resizeObserver?: ResizeObserver
  private disposed = false
  private introPlayed = false
  /** Animation de sélection en cours : interactions gelées. */
  private selecting = false

  constructor(opts: SphereGalleryOptions) {
    this.container = opts.container
    this.onSelect = opts.onSelect
    this.reducedMotion = !!opts.reducedMotion

    this.initRenderer()
    this.initCamera()
    this.buildCards(opts.cards)
    this.bindEvents()
    this.lastInteraction = performance.now()
    this.loop()
  }

  // ────────────────────────────────────────────────────────── setup ──

  private initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor(new THREE.Color(SCENE_BG), 1)
    this.scene.background = new THREE.Color(SCENE_BG)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.renderer.domElement.style.display = 'block'
    // pan-y : le scroll vertical de la page reste possible au doigt ;
    // le glisser horizontal pilote la galerie.
    this.renderer.domElement.style.touchAction = 'pan-y'
    this.renderer.domElement.style.cursor = 'grab'
    this.container.appendChild(this.renderer.domElement)

    this.resizeObserver = new ResizeObserver(() => this.onResize())
    this.resizeObserver.observe(this.container)
  }

  private initCamera() {
    const { clientWidth: w, clientHeight: h } = this.container
    this.camera = new THREE.PerspectiveCamera(72, w / h, 0.1, 200)
    this.camera.position.set(0, 0, 0)
  }

  /** Répartition Fibonacci sur une bande sphérique (on évite les pôles). */
  private buildCards(data: SphereCardData[]) {
    const n = data.length
    const golden = Math.PI * (3 - Math.sqrt(5))
    const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy()

    data.forEach((card, i) => {
      // y ∈ [-0.58, 0.58] : bande autour de l'horizon, lisible depuis le centre.
      const y = n > 1 ? (1 - (i / (n - 1)) * 2) * 0.58 : 0
      const ringR = Math.sqrt(1 - y * y)
      const phi = i * golden
      // Légère variation de profondeur pour le parallaxe.
      const r = RADIUS + ((i * 7) % 5) - 2

      const texture = createCardTexture(card)
      texture.anisotropy = maxAnisotropy
      texture.colorSpace = THREE.SRGBColorSpace

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        // Carte claire : pas de teinte grise au repos, on joue sur l'opacité.
        opacity: 0.88,
      })
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(CARD_W, CARD_H), material)
      mesh.position.set(Math.cos(phi) * ringR * r, y * r, Math.sin(phi) * ringR * r)
      mesh.lookAt(0, 0, 0)
      mesh.userData.index = this.cards.length

      this.scene.add(mesh)
      this.cards.push({ mesh, data: card, baseScale: 1 })
    })
  }

  // ──────────────────────────────────────────────────────── events ──

  private onPointerDown = (e: PointerEvent) => {
    if (this.selecting) return
    if (e.pointerType === 'mouse' && e.button !== 0) return // clic gauche uniquement
    this.dragging = true
    this.pointerType = e.pointerType
    this.lastX = this.downX = e.clientX
    this.lastY = this.downY = e.clientY
    this.downTime = performance.now()
    this.velLon = this.velLat = 0
    this.lastInteraction = performance.now()
    this.renderer.domElement.setPointerCapture(e.pointerId)
    this.renderer.domElement.style.cursor = 'grabbing'
  }

  private onPointerMove = (e: PointerEvent) => {
    this.lastInteraction = performance.now()
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointerNdc.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    )

    if (!this.dragging) return
    const dx = e.clientX - this.lastX
    const dy = e.clientY - this.lastY
    this.lastX = e.clientX
    this.lastY = e.clientY

    const dLon = -dx * DRAG_SPEED
    // Au doigt, la verticale est réservée au scroll de la page.
    const dLat = this.pointerType === 'mouse' ? dy * DRAG_SPEED : 0

    this.targetLon += dLon
    this.targetLat = clamp(this.targetLat + dLat, -LAT_LIMIT, LAT_LIMIT)
    this.velLon = dLon
    this.velLat = dLat
  }

  private onPointerUp = (e: PointerEvent) => {
    const wasDragging = this.dragging
    this.dragging = false
    if (this.selecting) return
    this.renderer.domElement.style.cursor = this.hovered ? 'pointer' : 'grab'

    if (!wasDragging) return
    const moved = Math.hypot(e.clientX - this.downX, e.clientY - this.downY)
    const elapsed = performance.now() - this.downTime

    // Clic franc (pas un drag) → zoom sur la carte + navigation en parallèle.
    if (moved < 7 && elapsed < 350) {
      this.velLon = this.velLat = 0
      const hit = this.pick()
      if (hit) this.selectCard(hit)
    }
    // Sinon l'inertie (velLon/velLat) continue dans la boucle.
  }

  /**
   * Sélection d'une carte : la navigation (router.push) part immédiatement,
   * et pendant que la vraie page se charge derrière, la carte se détache de
   * la sphère et vient remplir l'écran ; les autres s'estompent, puis la
   * scène fond vers le fond #0A0A0A pour un raccord propre avec la page.
   */
  private selectCard(entry: CardEntry) {
    if (this.selecting) return
    this.selecting = true
    this.setHovered(null)
    this.renderer.domElement.style.cursor = 'default'

    // La page cible commence à charger tout de suite.
    this.onSelect(entry.data.href)

    if (this.reducedMotion) return // pas de mise en scène, navigation directe

    // 1) La caméra se recentre sur la carte (via l'easing de la boucle).
    const p = entry.mesh.position
    const lat = THREE.MathUtils.radToDeg(Math.asin(p.y / p.length()))
    let lon = THREE.MathUtils.radToDeg(Math.atan2(p.z, p.x))
    lon = this.lon + shortestAngle(lon - this.lon)
    this.targetLon = lon
    this.targetLat = lat

    // 2) Les autres cartes s'estompent.
    this.cards.forEach(c => {
      if (c === entry) return
      gsap.killTweensOf(c.mesh.material)
      gsap.to(c.mesh.material, { opacity: 0, duration: 0.45, ease: 'power2.out' })
    })

    // 3) La carte choisie quitte la paroi et s'approche jusqu'à remplir l'écran.
    gsap.killTweensOf(entry.mesh.scale)
    gsap.to(entry.mesh.material, { opacity: 1, duration: 0.25 })
    const dir = p.clone().normalize()
    gsap.to(entry.mesh.position, {
      x: dir.x * SELECT_DIST,
      y: dir.y * SELECT_DIST,
      z: dir.z * SELECT_DIST,
      duration: 0.85,
      ease: 'power2.in',
    })

    // 4) Fondu final de la scène vers le fond de page.
    gsap.to(this.container, {
      opacity: 0,
      delay: 0.7,
      duration: 0.35,
      ease: 'power1.in',
    })
  }

  private onPointerLeave = () => {
    this.dragging = false
    this.setHovered(null)
    this.renderer.domElement.style.cursor = 'grab'
  }

  private bindEvents() {
    const el = this.renderer.domElement
    el.addEventListener('pointerdown', this.onPointerDown)
    el.addEventListener('pointermove', this.onPointerMove)
    el.addEventListener('pointerup', this.onPointerUp)
    el.addEventListener('pointercancel', this.onPointerLeave)
    el.addEventListener('pointerleave', this.onPointerLeave)
    el.addEventListener('dragstart', prevent)
  }

  private onResize() {
    if (this.disposed) return
    const { clientWidth: w, clientHeight: h } = this.container
    if (w === 0 || h === 0) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  // ─────────────────────────────────────────────────────── hover ──

  private pick(): CardEntry | null {
    this.raycaster.setFromCamera(this.pointerNdc, this.camera)
    const hits = this.raycaster.intersectObjects(this.cards.map(c => c.mesh), false)
    if (hits.length === 0) return null
    return this.cards[hits[0].object.userData.index] ?? null
  }

  private setHovered(entry: CardEntry | null) {
    if (entry === this.hovered) return
    if (this.hovered) {
      const prev = this.hovered
      gsap.to(prev.mesh.scale, { x: 1, y: 1, z: 1, duration: 0.45, ease: 'power3.out' })
      gsap.to(prev.mesh.material, { opacity: 0.88, duration: 0.35 })
    }
    this.hovered = entry
    if (entry) {
      gsap.to(entry.mesh.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.5, ease: 'power3.out' })
      gsap.to(entry.mesh.material, { opacity: 1, duration: 0.3 })
    }
    if (!this.dragging) {
      this.renderer.domElement.style.cursor = entry ? 'pointer' : 'grab'
    }
  }

  // ──────────────────────────────────────────────────────── intro ──

  /** Entrée en scène : cartes qui éclosent + balayage de caméra. */
  playIntro() {
    if (this.introPlayed) return
    this.introPlayed = true

    if (this.reducedMotion) return // état final immédiat

    this.cards.forEach((c, i) => {
      c.mesh.scale.setScalar(0.001)
      gsap.to(c.mesh.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.9,
        delay: 0.05 + (i % 9) * 0.06,
        ease: 'back.out(1.5)',
      })
    })

    this.lon = this.targetLon - 38
    gsap.to(this, { lon: this.targetLon, duration: 1.8, ease: 'power3.out' })
  }

  // ───────────────────────────────────────────────────────── loop ──

  private loop = () => {
    if (this.disposed) return
    this.rafId = requestAnimationFrame(this.loop)

    // Inertie après relâchement.
    if (!this.selecting && !this.dragging && (Math.abs(this.velLon) > 0.001 || Math.abs(this.velLat) > 0.001)) {
      this.targetLon += this.velLon
      this.targetLat = clamp(this.targetLat + this.velLat, -LAT_LIMIT, LAT_LIMIT)
      this.velLon *= INERTIA_DECAY
      this.velLat *= INERTIA_DECAY
    }

    // Dérive lente après 3 s d'inactivité (désactivée en reduced motion).
    if (!this.reducedMotion && !this.selecting && !this.dragging && performance.now() - this.lastInteraction > 3000) {
      this.targetLon += AUTO_DRIFT
    }

    // Easing exponentiel (sensation Lenis) — recentrage plus vif en sélection.
    const ease = this.reducedMotion ? 0.4 : this.selecting ? 0.12 : EASE
    this.lon += (this.targetLon - this.lon) * ease
    this.lat += (this.targetLat - this.lat) * ease

    const phi = THREE.MathUtils.degToRad(90 - this.lat)
    const theta = THREE.MathUtils.degToRad(this.lon)
    this.lookTarget.set(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    )
    this.camera.lookAt(this.lookTarget)

    // Hover (uniquement à la souris, hors drag et hors sélection).
    if (!this.selecting && !this.dragging && this.pointerType !== 'touch') {
      this.setHovered(this.pick())
    }

    this.renderer.render(this.scene, this.camera)
  }

  // ─────────────────────────────────────────────────────── teardown ──

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.rafId)
    this.resizeObserver?.disconnect()

    const el = this.renderer.domElement
    el.removeEventListener('pointerdown', this.onPointerDown)
    el.removeEventListener('pointermove', this.onPointerMove)
    el.removeEventListener('pointerup', this.onPointerUp)
    el.removeEventListener('pointercancel', this.onPointerLeave)
    el.removeEventListener('pointerleave', this.onPointerLeave)
    el.removeEventListener('dragstart', prevent)

    this.cards.forEach(({ mesh }) => {
      gsap.killTweensOf(mesh.scale)
      gsap.killTweensOf(mesh.position)
      gsap.killTweensOf(mesh.material)
      gsap.killTweensOf(mesh.material.color)
      mesh.geometry.dispose()
      mesh.material.map?.dispose()
      mesh.material.dispose()
    })
    gsap.killTweensOf(this)
    gsap.killTweensOf(this.container)
    this.container.style.opacity = '' // retour navigateur : section visible
    this.renderer.dispose()
    el.remove()
  }
}

// ───────────────────────────────────────────────── card texture ──

/** Police chargée par next/font, lue depuis la variable CSS (fallback système). */
function resolveFont(cssVar: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
  return v ? `${v}, ${fallback}` : fallback
}

/**
 * Dessine la carte d'un calculateur sur un canvas 2D → CanvasTexture.
 * Style "noir charbon + or" de la home : eyebrow catégorie or, titre blanc,
 * description grise, flèche or.
 */
function createCardTexture(card: SphereCardData): THREE.CanvasTexture {
  const W = 1280
  const H = 800
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  const sans = resolveFont('--font-inter', 'system-ui, sans-serif')
  const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace'

  const inset = 24 // marge pour loger l'ombre portée

  // Ombre portée façon "3px 3px 0" des cartes du site (décalée, nette).
  roundRect(ctx, inset + 10, inset + 10, W - inset * 2, H - inset * 2, 34)
  ctx.fillStyle = CARD_SHADOW
  ctx.fill()

  // Carte blanche + bordure fine
  roundRect(ctx, inset, inset, W - inset * 2, H - inset * 2, 34)
  ctx.fillStyle = CARD_BG
  ctx.fill()
  ctx.lineWidth = 3
  ctx.strokeStyle = CARD_BORDER
  ctx.stroke()

  // Filet or à gauche (signature des cartes du site)
  ctx.fillStyle = ACCENT_OR
  ctx.fillRect(inset, 150, 8, H - inset * 2 - 220)

  const padX = 92

  // Eyebrow : catégorie en mono or, uppercase
  ctx.fillStyle = ACCENT_OR
  ctx.font = `600 30px ${mono}`
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(card.categorie.toUpperCase(), padX, 142)

  // Titre — anthracite
  ctx.fillStyle = '#1A1A1A'
  ctx.font = `900 80px ${sans}`
  const titleLines = wrapText(ctx, card.nom, W - padX * 2, 2)
  let y = 248
  for (const line of titleLines) {
    ctx.fillText(line, padX, y)
    y += 92
  }

  // Filet séparateur
  ctx.fillStyle = 'rgba(0,0,0,0.10)'
  ctx.fillRect(padX, y - 36, W - padX * 2, 2)

  // Description — gris foncé, lisible à distance
  ctx.fillStyle = '#5A5550'
  ctx.font = `400 42px ${sans}`
  const descLines = wrapText(ctx, card.desc, W - padX * 2, 4, true)
  let dy = y + 38
  for (const line of descLines) {
    ctx.fillText(line, padX, dy)
    dy += 58
  }

  // Flèche or en bas à droite
  ctx.fillStyle = ACCENT_OR
  ctx.font = `700 62px ${sans}`
  ctx.fillText('→', W - padX - 48, H - 80)

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  return texture
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
  ellipsis = false
): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width <= maxWidth) {
      current = test
    } else {
      if (current) lines.push(current)
      current = word
      if (lines.length === maxLines) break
    }
  }
  if (current && lines.length < maxLines) lines.push(current)

  if (lines.length > maxLines) lines.length = maxLines
  const truncated = lines.join(' ').length < text.replace(/\s+/g, ' ').length
  if (ellipsis && truncated && lines.length > 0) {
    let last = lines[lines.length - 1]
    while (ctx.measureText(`${last}…`).width > maxWidth && last.length > 1) {
      last = last.slice(0, -1)
    }
    lines[lines.length - 1] = `${last}…`
  }
  return lines
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

/** Ramène un écart angulaire en degrés dans [-180, 180] (plus court chemin). */
function shortestAngle(delta: number): number {
  return ((delta + 180) % 360 + 360) % 360 - 180
}

function prevent(e: Event) {
  e.preventDefault()
}
