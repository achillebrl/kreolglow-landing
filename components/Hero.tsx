'use client'

import { motion } from 'framer-motion'
import { Countdown } from './Countdown'
import { Button } from './ui/Button'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

interface HeroProps {
  launchDate: string
}

export function Hero({ launchDate }: HeroProps) {
  function scrollToPacks() {
    document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-[100dvh] flex flex-col items-center justify-center gap-6 px-4 pt-16 pb-8 text-center bg-brand-bg relative overflow-hidden">
      {/* Decorative tropical accent */}
      <div
        className="absolute top-24 right-4 text-4xl opacity-20 select-none hidden md:block"
        aria-hidden="true"
      >
        🌺
      </div>
      <div
        className="absolute top-40 left-4 text-3xl opacity-15 select-none hidden md:block"
        aria-hidden="true"
      >
        🌿
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6 max-w-2xl"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary text-sm font-medium px-4 py-1.5 rounded-full">
            🌺 Bientôt disponible en 974
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={item}
          className="font-heading text-4xl md:text-6xl font-bold text-brand-text leading-tight"
        >
          Tes accessoires beauté{' '}
          <em className="text-brand-primary not-italic">péï</em> arrivent
        </motion.h1>

        {/* Tagline in Dancing Script */}
        <motion.p
          variants={item}
          className="font-script text-2xl md:text-3xl text-brand-secondary"
        >
          La beauté kréol, livrée chez ou
        </motion.p>

        {/* Countdown */}
        <motion.div variants={item} className="w-full">
          <p className="text-sm text-brand-muted mb-3">Ouverture dans</p>
          <Countdown targetDate={launchDate} />
        </motion.div>

        {/* CTA */}
        <motion.div variants={item} className="w-full max-w-xs">
          <Button onClick={scrollToPacks} className="w-full text-lg">
            Je veux découvrir les kits ↓
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
