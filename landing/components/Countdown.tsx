'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownProps {
  targetDate: string
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    function calculate() {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  // Render nothing on SSR to avoid hydration mismatch
  if (!timeLeft) return <div className="h-20" aria-hidden="true" />

  const units = [
    { value: timeLeft.days, label: 'jours' },
    { value: timeLeft.hours, label: 'heures' },
    { value: timeLeft.minutes, label: 'minutes' },
    { value: timeLeft.seconds, label: 'secondes' },
  ]

  return (
    <div
      className="flex gap-3"
      aria-label="Compte à rebours jusqu'au lancement"
    >
      {units.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center min-w-[56px]">
          <div className="bg-white/15 backdrop-blur-sm border border-white/20 text-white rounded-xl w-14 h-14 flex items-center justify-center">
            <span className="font-heading text-xl font-bold tabular-nums">
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] text-white/60 mt-1 uppercase tracking-wider">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
