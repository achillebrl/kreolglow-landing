import Image from 'next/image'

export function BrandStory() {
  return (
    <section className="w-full bg-brand-bg">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — photo with overlay (like olafro's message section) */}
        <div className="relative min-h-[400px] md:min-h-[480px] overflow-hidden">
          <Image
            src="/images/story.jpg"
            alt="Femme réunionnaise aux cheveux naturels"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Warm orange overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(244, 162, 97, 0.45)' }}
            aria-hidden="true"
          />
          {/* Quote overlay */}
          <div className="absolute inset-0 flex items-end p-8 md:p-10">
            <div>
              <p className="font-script text-2xl text-white leading-snug drop-shadow">
                &ldquo;La beauté péï mérite une boutique péï&rdquo;
              </p>
              <p className="text-white/80 text-xs mt-2 tracking-wider">— Kréol Glow, La Réunion</p>
            </div>
          </div>
        </div>

        {/* Right — text content */}
        <div
          className="flex flex-col justify-center px-10 md:px-14 py-16"
          style={{ backgroundColor: '#EDE5D5' }}
        >
          <p className="text-[10px] font-medium tracking-widest uppercase text-brand-primary mb-3">
            NOTRE HISTOIRE
          </p>

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text leading-snug mb-5">
            Une boutique conçue pour nous
          </h2>

          <p className="text-brand-muted text-sm leading-relaxed mb-4">
            À La Réunion, trouver des accessoires capillaires de qualité sans commander depuis la métropole
            et attendre des semaines — c&apos;est compliqué. Kréol Glow, c&apos;est la réponse.
          </p>
          <p className="text-brand-muted text-sm leading-relaxed mb-8">
            Des kits sélectionnés pour les cheveux bouclés, frisés et crépus des femmes réunionnaises.
            Stock local. Livraison J+1-2. Prix accessibles. Tout ce qu&apos;il fallait.
          </p>

          <a
            href="#packs"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline"
          >
            Voir les kits disponibles
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
