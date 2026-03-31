'use client'

import { useState } from 'react'
import type { PackId } from '@/lib/types'
import { PACKS } from '@/lib/packs'
import { PackCard } from './PackCard'
import { WaitlistForm } from './WaitlistForm'

export function PacksSection() {
  const [selectedPack, setSelectedPack] = useState<PackId>('nuit')

  return (
    <section id="packs" className="py-16 px-4 bg-brand-bg">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text mb-3">
            Nos kits beauté péï
          </h2>
          <p className="text-brand-muted max-w-md mx-auto">
            Choisis ton kit, rejoins la liste et reçois{' '}
            <strong className="text-brand-primary">-20%</strong> à l&apos;ouverture
          </p>
        </div>

        {/* Pack cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PACKS.map((pack) => (
            <PackCard
              key={pack.id}
              pack={pack}
              isSelected={selectedPack === pack.id}
              onSelect={setSelectedPack}
            />
          ))}
        </div>

        {/* Waitlist form */}
        <WaitlistForm preSelectedPack={selectedPack} />
      </div>
    </section>
  )
}
