'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Countdown } from './Countdown'
import { PacksSection } from './PacksSection'

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const benefits = [
  { icon: '🚚', text: 'Livraison J+1-2 en 974' },
  { icon: '💰', text: 'Prix accessibles, qualité pro' },
  { icon: '🌺', text: '100% fait pour les kréoles' },
]

interface HeroWithFormProps {
  launchDate: string
}

export function HeroWithForm({ launchDate }: HeroWithFormProps) {
  return (
    <section className="min-h-[100dvh] pt-14 bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — pitch */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Logo on mobile (nav hides on scroll, keep visible here) */}
            <motion.div variants={item} className="lg:hidden">
              <Image src="/logo.png" alt="KRÉOL GLOW" width={140} height={48} className="h-10 w-auto" />
            </motion.div>

            {/* Badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary text-sm font-medium px-4 py-1.5 rounded-full">
                🌺 Bientôt en 974 — places limitées
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-heading text-4xl md:text-5xl font-bold text-brand-text leading-tight"
            >
              La première boutique beauté{' '}
              <em className="text-brand-primary not-italic">livrée chez ou</em>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="font-script text-2xl text-brand-secondary"
            >
              La beauté kréol, livréé chez ou 🌿
            </motion.p>

            {/* Description */}
            <motion.p variants={item} className="text-brand-muted text-base leading-relaxed max-w-md">
              Accessoires capillaires & kits beauté sélectionnés pour les femmes réunionnaises.
              Inscris-toi maintenant et reçois{' '}
              <strong className="text-brand-primary">-20%</strong> à l&apos;ouverture.
            </motion.p>

            {/* Benefits */}
            <motion.ul variants={item} className="flex flex-col gap-2.5">
              {benefits.map((b) => (
                <li key={b.text} className="flex items-center gap-2.5 text-sm text-brand-text">
                  <span className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    {b.icon}
                  </span>
                  {b.text}
                </li>
              ))}
            </motion.ul>

            {/* Countdown */}
            <motion.div variants={item}>
              <p className="text-xs text-brand-muted uppercase tracking-wider mb-3">Ouverture dans</p>
              <Countdown targetDate={launchDate} />
            </motion.div>

            {/* Social proof inline */}
            <motion.p variants={item} className="text-sm text-brand-muted">
              🔥 <strong className="text-brand-text">50+ femmes</strong> déjà inscrites
            </motion.p>
          </motion.div>

          {/* Right — pack selector + form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:sticky lg:top-20"
          >
            <PacksSection />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
