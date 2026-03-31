'use client'

import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  isLoading?: boolean
}

export function Button({
  variant = 'primary',
  isLoading,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-full font-body font-medium text-base transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full'

  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-[#b33a50] active:bg-[#9d3146]',
    secondary: 'bg-brand-secondary text-white hover:bg-[#245a42]',
    ghost: 'bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-white',
  }

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      className="inline-flex"
    >
      <button
        className={`${base} ${variants[variant]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Chargement…
          </>
        ) : (
          children
        )}
      </button>
    </motion.div>
  )
}
