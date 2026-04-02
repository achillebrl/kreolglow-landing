'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { PACKS } from '@/lib/packs'
import type { PackId } from '@/lib/types'

const schema = z.object({
  first_name: z.string().min(2),
  whatsapp: z.string().min(8),
  email: z.union([z.email(), z.literal('')]).optional(),
  pack_interest: z.enum(['nuit', 'jour', 'complet']),
})

type FormData = z.infer<typeof schema>

interface WaitlistFormProps {
  preSelectedPack: PackId
}

export function WaitlistForm({ preSelectedPack }: WaitlistFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { pack_interest: preSelectedPack },
  })

  // Sync when user clicks a pack card after form renders
  useEffect(() => {
    setValue('pack_interest', preSelectedPack)
  }, [preSelectedPack, setValue])

  const selectedPack = watch('pack_interest')
  const packInfo = PACKS.find((p) => p.id === selectedPack)

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    setErrorMessage('')
    try {
      // Read Meta cookies from browser for CAPI matching
      const getCookie = (name: string) => {
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
        return match ? decodeURIComponent(match[1]) : undefined
      }
      const fbp = getCookie('_fbp')
      const fbc = getCookie('_fbc')

      // Shared event ID for Pixel ↔ CAPI deduplication
      const eventId = crypto.randomUUID()

      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, fbp, fbc, event_id: eventId }),
      })
      const json = (await res.json()) as { error?: string; success?: boolean }
      if (!res.ok) {
        if (res.status === 409) {
          setErrorMessage('Ce numéro WhatsApp est déjà inscrit. Tu seras prévenue à l\'ouverture !')
        } else {
          setErrorMessage(json.error ?? 'Une erreur est survenue')
        }
        setStatus('error')
        return
      }
      setStatus('success')
      // Fire Meta Pixel CompleteRegistration (browser) — same event_id as CAPI for deduplication
      if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq(
          'track',
          'CompleteRegistration',
          { content_name: data.pack_interest, currency: 'EUR', value: 0 },
          { eventID: eventId }
        )
      }
    } catch {
      setErrorMessage('Pas de connexion. Vérifie ta connexion internet et réessaie.')
      setStatus('error')
    }
  }

  const copyPromoCode = async () => {
    await navigator.clipboard.writeText('KREOL20')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    "J'ai rejoint Kréol Glow, la première boutique beauté péï avec livraison à La Réunion ! 🌺 Rejoins-moi : https://kreolglow.re"
  )}`

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 text-center max-w-md mx-auto shadow-sm"
      >
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4"
        >
          ✓
        </motion.div>

        <h3 className="font-heading text-2xl font-bold text-brand-text mb-2">
          Tu es inscrite ! 🌺
        </h3>
        <p className="text-brand-muted mb-6">
          On te prévient en avant-première dès l&apos;ouverture.
        </p>

        {/* Promo code */}
        <button
          onClick={copyPromoCode}
          className="w-full bg-brand-primary text-white rounded-xl p-4 mb-6 cursor-pointer hover:bg-[#b33a50] transition-colors"
          aria-label="Copier le code promo KREOL20"
        >
          <p className="text-sm opacity-90 mb-1">Ton code promo exclusif :</p>
          <p className="text-3xl font-bold tracking-widest font-body">KREOL20</p>
          <p className="text-xs opacity-75 mt-1">
            {copied ? '✓ Copié !' : "Appuie pour copier · -20% à l'ouverture"}
          </p>
        </button>

        {/* WhatsApp share */}
        <a
          href={whatsappShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-brand-secondary font-medium hover:underline"
        >
          <span>💬</span>
          Partage avec tes amies sur WhatsApp
        </a>
      </motion.div>
    )
  }

  return (
    <div id="waitlist" className="bg-white rounded-2xl p-6 md:p-8 max-w-md mx-auto shadow-sm">
      <h2 className="font-heading text-2xl font-bold text-brand-text mb-1">
        Rejoins la liste en avant-première
      </h2>
      <p className="text-brand-muted text-sm mb-6">
        Reçois ton code <strong>-20%</strong> dès l&apos;ouverture 🌺
      </p>

      {/* Error banner */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4"
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Ton prénom *"
          placeholder="Marie"
          autoComplete="given-name"
          error={errors.first_name?.message}
          {...register('first_name')}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-brand-text">Ton numéro de téléphone *</label>
          <div className={`flex items-center border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-primary ${errors.whatsapp ? 'border-red-400' : 'border-gray-200'}`}>
            <span className="px-3 py-3 bg-gray-50 text-brand-muted text-sm font-medium border-r border-gray-200 select-none">+262</span>
            <input
              type="tel"
              placeholder="692 00 00 00"
              autoComplete="tel"
              className="flex-1 px-3 py-3 text-sm text-brand-text bg-white outline-none min-h-[48px]"
              {...register('whatsapp', {
                setValueAs: (v: string) => {
                  const digits = v.replace(/\s/g, '')
                  if (digits.startsWith('+')) return digits
                  return '+262' + digits
                },
              })}
            />
          </div>
          <p className="text-xs text-brand-muted">On ne t&apos;enverra que des infos importantes, promis 💚</p>
          {errors.whatsapp && <p className="text-xs text-red-500">{errors.whatsapp.message}</p>}
        </div>

        <Input
          label="Ton email"
          type="email"
          placeholder="marie@example.com"
          autoComplete="email"
          hint="Pour recevoir ton code promo par email"
          error={errors.email?.message}
          {...register('email')}
        />

        {/* Pack selector */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-brand-text">
            Pack qui t&apos;intéresse *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PACKS.map((pack) => (
              <button
                key={pack.id}
                type="button"
                onClick={() => setValue('pack_interest', pack.id, { shouldValidate: true })}
                className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-xs font-medium transition-all cursor-pointer min-h-12 ${
                  selectedPack === pack.id
                    ? 'text-white border-transparent'
                    : 'border-gray-200 text-brand-muted hover:border-gray-300'
                }`}
                style={
                  selectedPack === pack.id
                    ? { backgroundColor: pack.tagColor, borderColor: pack.tagColor }
                    : {}
                }
                aria-pressed={selectedPack === pack.id}
              >
                <span className="text-2xl" aria-hidden="true">
                  {pack.emoji}
                </span>
                <span className="text-center leading-tight">
                  {pack.name.replace('Kit ', '')}
                </span>
              </button>
            ))}
          </div>
          {packInfo && (
            <p className="text-xs text-brand-muted mt-1">
              {packInfo.name} — {packInfo.priceDisplay}
            </p>
          )}
          {errors.pack_interest && (
            <p className="text-xs text-red-500">{errors.pack_interest.message}</p>
          )}
        </div>

        {/* Hidden field ensures pack_interest is registered in form state */}
        <input type="hidden" {...register('pack_interest')} />

        <Button
          type="submit"
          isLoading={status === 'loading'}
          className="w-full text-base mt-2"
        >
          Je rejoins la liste ! -&gt; -20% 🌺
        </Button>

        <p className="text-xs text-center text-brand-muted">
          Pas de spam. Désabonnement en 1 clic.
        </p>
      </form>
    </div>
  )
}
