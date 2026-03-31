'use client'

import { motion } from 'framer-motion'
import type { Pack, PackId } from '@/lib/types'

interface PackCardProps {
  pack: Pack
  isSelected: boolean
  onSelect: (id: PackId) => void
}

export function PackCard({ pack, isSelected, onSelect }: PackCardProps) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={() => onSelect(pack.id)}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(pack.id)
        }
      }}
      whileHover={isSelected ? {} : { y: -4 }}
      animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`relative bg-white rounded-2xl p-5 cursor-pointer select-none transition-shadow outline-offset-0 ${
        isSelected
          ? 'shadow-lg outline-2'
          : 'shadow-sm hover:shadow-md outline-0'
      }`}
      style={isSelected ? { outlineColor: pack.tagColor } : {}}
    >
      {/* Tag badge - top right */}
      <div
        className="absolute -top-2.5 right-4 text-white text-xs font-medium px-3 py-0.5 rounded-full"
        style={{ backgroundColor: pack.tagColor }}
      >
        {pack.tag}
      </div>

      {/* Selected checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
          style={{ backgroundColor: pack.tagColor }}
        >
          ✓
        </motion.div>
      )}

      {/* Emoji */}
      <div className="text-5xl text-center mb-3 mt-2" aria-hidden="true">
        {pack.emoji}
      </div>

      {/* Pack name */}
      <h3 className="font-heading font-bold text-lg text-center text-brand-text mb-1">
        {pack.name}
      </h3>

      {/* Price */}
      <p
        className="font-heading text-3xl font-bold text-center mb-4"
        style={{ color: pack.tagColor }}
      >
        {pack.priceDisplay}
      </p>

      {/* Items list */}
      <ul className="space-y-1.5">
        {pack.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-brand-muted">
            <span
              className="text-xs mt-0.5 flex-shrink-0"
              style={{ color: pack.tagColor }}
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
