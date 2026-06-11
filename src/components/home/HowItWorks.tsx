// src/components/home/HowItWorks.tsx
// Section "Comment ca marche" - 3 etapes - mode sombre.
const ACCENT_OR = '#D4AF37'

interface Etape {
  num: string
  titre: string
  desc: string
  icon: React.ReactNode
}

const IconList = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="4" cy="6" r="1.5" fill="currentColor" />
    <line x1="3" y1="12" x2="5" y2="12" />
    <line x1="3" y1="18" x2="5" y2="18" />
  </svg>
)

const IconForm = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="1" />
    <line x1="7" y1="9" x2="13" y2="9" />
    <line x1="7" y1="13" x2="17" y2="13" />
    <line x1="7" y1="17" x2="11" y2="17" />
    <circle cx="17" cy="9" r="1.5" fill="currentColor" />
  </svg>
)

const IconChart = (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="20" x2="20" y2="20" />
    <rect x="6" y="12" width="3" height="8" fill="currentColor" fillOpacity="0.2" />
    <rect x="11" y="7" width="3" height="13" fill="currentColor" fillOpacity="0.5" />
    <rect x="16" y="3" width="3" height="17" fill="currentColor" />
  </svg>
)

const ETAPES: Etape[] = [
  {
    num: '01',
    titre: 'Choisir',
    desc: 'Un calculateur dans la catégorie qui vous concerne : impôt, transmission, immobilier, épargne.',
    icon: IconList,
  },
  {
    num: '02',
    titre: 'Saisir',
    desc: 'Vos chiffres restent dans votre navigateur. Aucun envoi, aucun compte à créer.',
    icon: IconForm,
  },
  {
    num: '03',
    titre: 'Comparer',
    desc: 'Le résultat tombe en direct, avec la référence légale appliquée. Vous décidez.',
    icon: IconChart,
  },
]

export default function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
      <div className="flex items-center gap-6 mb-16">
        <h2
          className="font-sans font-black text-white shrink-0"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.02em' }}
        >
          Trois étapes
        </h2>
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
        {ETAPES.map((etape, i) => (
          <div key={etape.num} className="relative">
            {/* Connecteur entre les etapes */}
            {i < ETAPES.length - 1 && (
              <div
                aria-hidden
                className="hidden md:block absolute top-10 left-[calc(100%-1.5rem)] w-[calc(100%-2rem)] h-[1px]"
                style={{ background: `linear-gradient(to right, ${ACCENT_OR} 0%, transparent 100%)` }}
              />
            )}

            {/* Icone dans une bulle sombre avec bordure or subtile */}
            <div
              className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-2xl border"
              style={{
                backgroundColor: '#171717',
                borderColor: 'rgba(212,175,55,0.25)',
                color: ACCENT_OR,
              }}
            >
              {etape.icon}
            </div>

            <p
              className="font-mono text-xs uppercase tracking-widest mb-3 tabular-nums"
              style={{ color: ACCENT_OR }}
            >
              Étape {etape.num}
            </p>

            <h3
              className="font-sans font-black text-white mb-4 leading-tight"
              style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}
            >
              {etape.titre}
            </h3>

            <p className="text-base text-neutral-400 leading-relaxed">{etape.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
