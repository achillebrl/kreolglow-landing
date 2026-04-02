import Image from 'next/image'

const panels = [
  {
    image: '/Package1.png',
    kit: 'Kit Nuit',
    subtitle: 'La routine nuit',
    tagline: 'Cheveux protégés, style préservé',
    color: '#C8435A',
    align: 'bottom-left',
  },
  {
    image: '/Package2.png',
    kit: 'Kit Jour',
    subtitle: 'Les essentiels du jour',
    tagline: 'Une touche dorée créole, du matin au soir',
    color: '#2D6A4F',
    align: 'bottom-left',
  },
]

export function LifestyleSection() {
  return (
    <section className="w-full">
      {/* Section label */}
      <div className="text-center py-10 px-4 bg-brand-bg">
        <p className="text-[10px] font-medium tracking-widest uppercase text-brand-primary mb-2">
          EN SITUATION
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">
          Conçus pour toi, péï
        </h2>
      </div>

      {/* 2-column full-bleed photos */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {panels.map((panel) => (
          <div
            key={panel.kit}
            className="relative overflow-hidden"
            style={{ aspectRatio: '3/4' }}
          >
            <Image
              src={panel.image}
              alt={`Femme portant le ${panel.kit} Kréol Glow`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Subtle gradient for text legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 45%, transparent 70%)',
              }}
              aria-hidden="true"
            />

            {/* Kit info overlay — bottom left */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white mb-3"
                style={{ backgroundColor: panel.color }}
              >
                {panel.kit}
              </span>
              <p className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight mb-1">
                {panel.subtitle}
              </p>
              <p className="text-white/75 text-sm">{panel.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
