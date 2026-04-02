import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export function Input({
  label,
  error,
  hint,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium text-brand-text">
        {label}
      </label>
      <input
        id={inputId}
        className={`h-12 px-4 text-base rounded-xl border ${
          error
            ? 'border-red-400 bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300'
            : 'border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent'
        } ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-xs text-brand-muted">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
