'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Countdown } from './Countdown'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

interface HeroProps {
  launchDate: string
}

export function Hero({ launchDate }: HeroProps) {
  function scrollToPacks() {
    document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(520px, 70vh, 780px)' }}
    >
      {/* Full-bleed background photo */}
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Gradient overlay — left side opaque (for text), right side transparent (shows photo) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(184,58,80,0.88) 0%, rgba(200,67,90,0.80) 40%, rgba(200,67,90,0.35) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Small label */}
            <motion.p
              variants={item}
              className="text-white/75 text-xs font-medium tracking-widest uppercase mb-4"
            >
              Pour les femmes réunionnaises
            </motion.p>

            {/* Main headline */}
            <motion.h1
              variants={item}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5"
            >
              Beauté kréol.{' '}
              <br />
              <em className="not-italic" style={{ color: '#FFE4D6' }}>
                Livraison 974. 🌺
              </em>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={item}
              className="text-white/80 text-sm md:text-base leading-relaxed max-w-md mb-8"
            >
              Rejoins les premières et reçois{' '}
              <strong className="text-white font-semibold">-20%</strong> à l&apos;ouverture.
            </motion.p>

            {/* Countdown */}
            <motion.div variants={item} className="mb-8">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-3">
                Ouverture dans
              </p>
              <Countdown targetDate={launchDate} />
            </motion.div>

            {/* CTA */}
            <motion.div variants={item}>
              <button
                onClick={scrollToPacks}
                className="inline-flex items-center gap-2 bg-white text-brand-primary font-semibold px-8 py-4 rounded-full text-sm md:text-base hover:bg-brand-bg transition-colors cursor-pointer"
                style={{ minHeight: '52px' }}
              >
                Découvrir les kits
                <span aria-hidden="true">↓</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
