// src/components/Header.tsx
//
// Header sobre, inspiré Qonto : fond blanc cassé, navigation minimale,
// logo carré or avec lettre charbon, séparation bas par une fine ligne
// neutre. Le dropdown garde le motif "carte décalée" mais s'aligne sur
// la palette accent or de la home v3.
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES_CALC, RESSOURCES } from '@/config/navigation'

const RESSOURCES_HEADER = RESSOURCES.filter(r => r.showInHeader)
const ACCENT_OR = '#D4AF37'
const CHARBON = '#0A0A0A'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCalcOpen, setMobileCalcOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Ferme le dropdown si clic en dehors (Edge, tactile, accessibilité)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isCalcActive = pathname.startsWith('/calculateurs') ||
    CATEGORIES_CALC.flatMap(c => c.calculateurs).some(c => pathname === c.href || pathname.startsWith(c.href + '/'))

  function openDropdown() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDropdownOpen(true)
  }
  function closeDropdown() {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 120)
  }

  return (
    <header className="border-b border-neutral-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo (cohérence avec Footer) */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-10 h-10 flex items-center justify-center transition-colors duration-200"
            style={{ backgroundColor: CHARBON }}
          >
            <span style={{ color: ACCENT_OR }} className="font-bold text-xl">C</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-neutral-900 text-base leading-tight tracking-tight">
              CalculPatrimoine
            </span>
            <span className="font-mono text-[10px] text-neutral-500 leading-tight uppercase tracking-widest">
              Calculateurs open-source
            </span>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden lg:flex items-center gap-1 text-sm">

          {/* Dropdown Calculateurs */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 px-3 py-2 font-medium transition-colors ${
                isCalcActive ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Calculateurs
              <svg
                className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-neutral-200 w-[560px] shadow-lg"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <div
                  className="w-full"
                  style={{ height: '2px', backgroundColor: ACCENT_OR }}
                />
                <div className="grid grid-cols-2 gap-0 p-2">
                  {CATEGORIES_CALC.map(cat => {
                    const actifs = cat.calculateurs.filter(c => c.disponible)
                    return (
                      <Link
                        key={cat.slug}
                        href={`/calculateurs/${cat.slug}`}
                        className="group flex flex-col gap-1 px-4 py-3 hover:bg-neutral-50 transition-colors border-l-[3px] border-transparent"
                        style={{ transition: 'border-color 0.15s' }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = ACCENT_OR
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = 'transparent'
                        }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm text-neutral-900 transition-colors">
                            {cat.label}
                          </span>
                          <span className="font-mono text-neutral-400 group-hover:translate-x-1 transition-transform text-xs shrink-0">
                            →
                          </span>
                        </div>
                        <span className="font-mono text-xs text-neutral-400 leading-snug">
                          {actifs.length > 0
                            ? actifs.map(c => c.nom).join(' · ')
                            : 'À venir'}
                        </span>
                      </Link>
                    )
                  })}
                </div>
                <div className="border-t border-neutral-100 px-6 py-3 bg-neutral-50">
                  <p className="font-mono text-xs text-neutral-500">
                    {CATEGORIES_CALC.flatMap(c => c.calculateurs.filter(x => x.disponible)).length} calculateurs disponibles · Gratuits · Aucune donnée conservée
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Liens ressources */}
          {RESSOURCES_HEADER.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 font-medium transition-colors ${
                pathname === link.href
                  ? 'text-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-neutral-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">

            {/* Calculateurs accordion */}
            <div>
              <button
                className={`w-full flex items-center justify-between px-4 py-3 transition-colors text-left ${
                  isCalcActive ? 'bg-neutral-50 text-neutral-900 font-medium' : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                onClick={() => setMobileCalcOpen(!mobileCalcOpen)}
              >
                <span>Calculateurs</span>
                <svg
                  className={`w-4 h-4 transition-transform ${mobileCalcOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileCalcOpen && (
                <div
                  className="ml-4 pl-2 space-y-0.5 mb-1"
                  style={{ borderLeft: `2px solid ${ACCENT_OR}` }}
                >
                  {CATEGORIES_CALC.map(cat => (
                    <Link
                      key={cat.slug}
                      href={`/calculateurs/${cat.slug}`}
                      className={`block px-4 py-2.5 transition-colors ${
                        pathname === `/calculateurs/${cat.slug}`
                          ? 'text-neutral-900 font-medium'
                          : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="font-medium text-sm">{cat.label}</span>
                      <span className="block font-mono text-xs text-neutral-400 mt-0.5">{cat.description}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Liens ressources */}
            {RESSOURCES_HEADER.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 transition-colors ${
                  pathname === link.href
                    ? 'bg-neutral-50 text-neutral-900 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
