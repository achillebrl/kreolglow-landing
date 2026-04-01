const features = [
  {
    letter: 'S',
    label: 'DISPONIBILITÉ',
    name: 'Stock local',
    desc: 'Produits en stock à La Réunion — pas d\'attente',
  },
  {
    letter: 'L',
    label: 'DÉLAI DE LIVRAISON',
    name: 'Livraison J+1-2',
    desc: 'Commandes expédiées depuis La Réunion directement',
  },
  {
    letter: 'P',
    label: 'NOTRE PROMESSE',
    name: 'Prix accessibles',
    desc: 'Kits qualité pro à prix péï — à partir de 12,90€',
  },
]

export function FeaturesRow() {
  return (
    <section className="bg-brand-bg border-b border-brand-primary/10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.label}
              className={`flex items-start gap-4 px-8 py-8 ${
                i < features.length - 1
                  ? 'border-b md:border-b-0 md:border-r border-brand-primary/10'
                  : ''
              }`}
            >
              {/* Decorative large letter */}
              <span
                className="font-heading text-5xl font-bold leading-none select-none flex-shrink-0"
                style={{ color: 'rgba(200, 67, 90, 0.18)' }}
                aria-hidden="true"
              >
                {f.letter}
              </span>

              <div>
                <p className="text-[10px] font-medium tracking-widest uppercase text-brand-muted mb-1">
                  {f.label}
                </p>
                <p className="font-heading text-lg font-bold text-brand-text">
                  {f.name}
                </p>
                <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
