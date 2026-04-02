const items = [
  'LIVRAISON J+1-2 À LA RÉUNION',
  'STOCK LOCAL',
  '-20% À L\'OUVERTURE',
  '100% KRÉOL',
  'LIVRAISON J+1-2 À LA RÉUNION',
  'STOCK LOCAL',
  '-20% À L\'OUVERTURE',
  '100% KRÉOL',
]

export function Marquee() {
  return (
    <div
      className="w-full overflow-hidden bg-brand-primary py-2.5"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 text-white text-xs font-medium tracking-widest uppercase px-8"
          >
            {item}
            <span className="text-white/50">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
