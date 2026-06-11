import type { Metadata } from "next";
import { Inter, Playfair_Display, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";

// PERF , Stratégie polices :
// • Playfair (serif, LCP element) → display:'swap' : le texte s'affiche en fallback
//   immédiatement, puis est remplacé par Playfair. Réduit le LCP vs 'block'.
// • Inter (corps) → display:'optional' : si la police n'arrive pas dans le 1er
//   rendu, le navigateur utilise le fallback SANS layout shift. Zéro FOUT.
//   Compromis : certains utilisateurs voient la police système. Acceptable.
// • Lora (italique éditorial) → display:'swap' : utilisée ponctuellement,
//   le swap est invisible car peu de texte concerné.
// next/font auto-héberge ces polices sur le même domaine et injecte le
// <link rel="preload"> dans le <head> , plus de round-trip fonts.googleapis.com.

const inter = Inter({
  subsets: ["latin"],
  display: 'optional', // PERF: 'optional' élimine le FOUT sur le corps du texte
  variable: '--font-inter',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',     // PERF: 'swap' sur les titres (LCP) , fallback immédiat
  weight: ['700'],
  variable: '--font-playfair',
  preload: true,
});

const lora = Lora({
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  preload: false,      // PERF: Lora est below-the-fold, pas besoin de preload
});

export const metadata: Metadata = {
  metadataBase: new URL('https://calculpatrimoine.fr'),
  title: {
    default: 'CalculPatrimoine - Calculateurs patrimoniaux gratuits et open-source',
    template: '%s | CalculPatrimoine'
  },
  description: 'Calculateurs patrimoniaux gratuits basés sur les textes officiels (CGI, BOFiP, INSEE) : TMI, PER, assurance-vie, succession, IFI, PEA, LMNP, SCI.',
  keywords: [
    'calculateur patrimoine',
    'simulateur fiscal gratuit',
    'calculateur TMI',
    'impôt sur le revenu 2026',
    'barème IR',
    'calculateur PER',
    'plafond déduction PER',
    'assurance vie fiscalité',
    'rachat assurance vie',
    'transmission assurance vie',
    'donation droits',
    'abattement donation',
    'calculateur succession',
    'rappel fiscal 15 ans',
    'IFI calcul',
    'impôt fortune immobilière',
    'PEA fiscalité',
    'plus-value immobilière',
    'LMNP réel ou micro',
    'SCI IS ou IR',
    'rente viagère',
    'tables mortalité INSEE',
    'CSG retraite',
    'prêt intrafamilial',
    'démembrement donation',
    'open source finance',
    'calcul patrimoine France',
  ],
  authors: [{ name: 'Nicolas Barbier', url: 'https://calculpatrimoine.fr/a-propos' }],
  creator: 'CalculPatrimoine',
  publisher: 'CalculPatrimoine',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'CalculPatrimoine',
    url: 'https://calculpatrimoine.fr',
    title: 'CalculPatrimoine - Calculateurs patrimoniaux gratuits et open-source',
    description: '14+ calculateurs patrimoniaux gratuits basés sur les textes officiels : TMI, PER, assurance-vie, succession, IFI, PEA, LMNP, SCI. Open-source.',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@calculpatrimoine',
    creator: '@calculpatrimoine',
    title: 'CalculPatrimoine - Calculateurs patrimoniaux gratuits',
    description: 'Calculateurs gratuits pour la fiscalité du patrimoine : TMI, PER, assurance-vie, succession, IFI, PEA. Open-source.',
  },

  verification: {
    google: 'TNiWVpRx2OUPkpd3psd01dLxb9RyaBLgsWxrN_Z-GlY',
  },

  alternates: {
    canonical: 'https://calculpatrimoine.fr',
  },

  category: 'Finance',
  classification: 'Finance Calculator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/*
          PERF , preconnect Vercel Analytics pour anticiper la connexion
          (réduit la latence du beacon sans bloquer le rendu)
        */}
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${lora.variable} antialiased`}>
        <SchemaMarkup />
        {children}
        {/* Vercel Web Analytics - page views et performance, sans cookies */}
        <Analytics />
      </body>
    </html>
  );
}
