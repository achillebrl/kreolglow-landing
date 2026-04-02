'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { PackId } from '@/lib/types'
import { PACKS } from '@/lib/packs'
import { WaitlistForm } from './WaitlistForm'

export function PacksSection() {
  const [selectedPack, setSelectedPack] = useState<PackId>('complet')
  const [expandedPack, setExpandedPack] = useState<PackId | null>(null)

  return (
    <section id="packs" className="bg-brand-bg py-16">
      {/* Section header */}
      <div className="text-center mb-12 px-4">
        <p className="text-[10px] font-medium tracking-widest uppercase text-brand-primary mb-2">
          KRÉOL GLOW
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">
          Nos kits beauté péï
        </h2>
        <p className="text-brand-muted text-sm mt-3 max-w-sm mx-auto">
          Choisis ton kit — il sera pré-sélectionné dans le formulaire
        </p>
      </div>

      {/* Cards grid */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {PACKS.map((pack) => {
          const isSelected = selectedPack === pack.id
          const isExpanded = expandedPack === pack.id
          const isFeatured = pack.id === 'complet'

          return (
            <div
              key={pack.id}
              className={`relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer ${
                isFeatured
                  ? 'bg-white shadow-xl'
                  : 'bg-white shadow-sm'
              } ${
                isSelected
                  ? 'ring-2 ring-brand-primary shadow-md'
                  : isFeatured
                  ? 'ring-2 ring-[#F4A261]/60 hover:shadow-2xl hover:-translate-y-1'
                  : 'hover:shadow-md hover:-translate-y-0.5'
              }`}
              onClick={() => setSelectedPack(pack.id)}
            >
              {/* Featured glow backdrop */}
              {isFeatured && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#F4A261]/8 to-transparent pointer-events-none" />
              )}

              {/* Featured banner — absolute, overlays image */}
              {isFeatured && (
                <div className="absolute top-0 left-0 right-0 z-20 bg-[#F4A261]/90 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase text-center py-2 px-4">
                  ⭐ Recommandé — Meilleure valeur
                </div>
              )}

              {/* Badge */}
              <div className="absolute top-3 left-3 z-10" style={{ top: isFeatured ? '2.75rem' : '0.75rem' }}>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full text-white shadow-sm"
                  style={{ backgroundColor: pack.tagColor }}
                >
                  {isSelected ? '✓ Sélectionné' : pack.tag}
                </span>
              </div>

              {/* Product image */}
              <div className="relative w-full h-72 bg-[#f9f5f0]">
                <Image
                  src={pack.image}
                  alt={pack.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={pack.id === 'complet'}
                />
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                {/* Name + subtitle + price */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-brand-text leading-tight">
                      {pack.name}
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">{pack.subtitle}</p>
                  </div>
                  <span
                    className="font-heading text-xl font-bold flex-shrink-0"
                    style={{ color: pack.tagColor }}
                  >
                    {pack.priceDisplay}
                  </span>
                </div>

                {/* Short description */}
                <p className="text-sm text-brand-muted mt-2 mb-3 leading-relaxed">
                  {pack.shortDesc}
                </p>

                {/* Items list — 3 max visible, rest in expand */}
                <ul className="space-y-1.5 mb-4">
                  {pack.items.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-brand-muted">
                      <span
                        className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                        style={{ backgroundColor: pack.tagColor }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Long desc toggle */}
                <button
                  type="button"
                  className="text-xs text-brand-primary hover:underline text-left mb-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedPack(isExpanded ? null : pack.id)
                  }}
                >
                  {isExpanded ? 'Voir moins ↑' : `En savoir plus${pack.items.length > 3 ? ` (+${pack.items.length - 3} articles)` : ''} ↓`}
                </button>

                {isExpanded && (
                  <div className="mb-4 -mt-2 space-y-1.5">
                    {pack.items.slice(3).map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-brand-muted">
                        <span
                          className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                          style={{ backgroundColor: pack.tagColor }}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        {item}
                      </div>
                    ))}
                    <p className="text-xs text-brand-muted leading-relaxed mt-2 italic">
                      {pack.longDesc}
                    </p>
                  </div>
                )}

                {/* CTA */}
                <button
                  type="button"
                  className="mt-auto w-full py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
                  style={{
                    backgroundColor: isSelected ? pack.tagColor : 'transparent',
                    color: isSelected ? '#fff' : pack.tagColor,
                    border: `1.5px solid ${pack.tagColor}`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPack(pack.id)
                    setTimeout(() => {
                      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                    }, 50)
                  }}
                  aria-label={`Sélectionner ${pack.name} et s'inscrire`}
                >
                  {isSelected ? "Je le veux → -20% 🌺" : 'Choisir ce kit'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Waitlist form */}
      <div className="mt-16 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[10px] font-medium tracking-widest uppercase text-brand-primary mb-2">
            LISTE D&apos;ATTENTE
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-text">
            Rejoins la liste en avant-première
          </h2>
          <p className="text-brand-muted text-sm mt-2">
            Reçois ton code <strong>-20%</strong> dès l&apos;ouverture 🌺
          </p>
        </div>
        <WaitlistForm preSelectedPack={selectedPack} />
      </div>
    </section>
  )
}
