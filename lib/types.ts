export type PackId = 'nuit' | 'jour' | 'complet'

export interface Pack {
  id: PackId
  name: string
  subtitle: string
  emoji: string
  price: number
  priceDisplay: string
  tag: string
  tagColor: string
  shortDesc: string
  longDesc: string
  items: readonly string[]
  image: string
  costPrice: number
}

export interface WaitlistEntry {
  first_name: string
  whatsapp: string
  email?: string
  pack_interest: PackId
}

export interface WaitlistRow extends WaitlistEntry {
  id: string
  created_at: string
  promo_code: string
  source: string
}
