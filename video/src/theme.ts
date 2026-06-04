// Charte CalcPatrimoine pour les vidéos Remotion.
// Synchronisée avec tailwind.config.ts du site (palette "vieille banque privée moderne").

import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay'
import { loadFont as loadLora } from '@remotion/google-fonts/Lora'
import { loadFont as loadInter } from '@remotion/google-fonts/Inter'

// Chargement des polices Google Fonts (idempotent — appels multiples OK)
export const { fontFamily: serifFamily } = loadPlayfair()
export const { fontFamily: monoFamily } = loadLora()
export const { fontFamily: sansFamily } = loadInter()

export const colors = {
  // Fond principal des vidéos : beige chaud
  background: '#F7F3EC',

  // Bleu marine — primary
  primary: {
    50: '#E8EEF5',
    100: '#D1DDE9',
    200: '#A3BBD3',
    300: '#7599BD',
    400: '#4777A7',
    500: '#2E5A8F',
    600: '#2E4A6F', // bleu marine principal
    700: '#1E3A5F', // bleu marine foncé
    800: '#1A2F4F',
    900: '#0A2540',
  },

  // Doré — accent (pour chiffres clés, Catherine bénéficiaire, etc.)
  accent: {
    100: '#F5EFE0',
    200: '#EBE0C1',
    300: '#E5C77F',
    400: '#D4AF37', // doré principal
    500: '#B8860B',
    600: '#9A7209',
    700: '#7C5E07',
  },

  // Surfaces neutres
  surface: {
    header: '#FEFCF8',
    card: '#F5F0E8',
  },

  // Neutres
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // Rouge (chiffre à perdre, alerte)
  danger: '#C0392B',
}

export const fonts = {
  // Titres et chiffres-clés : serif élégant
  serif: `${serifFamily}, Georgia, serif`,
  // Texte courant : sans-serif lisible
  sans: `${sansFamily}, -apple-system, BlinkMacSystemFont, sans-serif`,
  // Chiffres, labels techniques, captions : serif lisible (jouait le rôle "mono" éditorialement)
  mono: `${monoFamily}, Georgia, serif`,
}

// Format vidéo standard YouTube long-format
export const videoConfig = {
  width: 1920,
  height: 1080,
  fps: 30,
}
