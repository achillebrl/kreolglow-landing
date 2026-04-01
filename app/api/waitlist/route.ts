import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'
import { sendCompleteRegistration } from '@/lib/meta-capi'

const schema = z.object({
  first_name: z.string().min(2).max(50),
  whatsapp: z.string().min(8),
  email: z.union([z.email(), z.literal('')]).optional(),
  pack_interest: z.enum(['nuit', 'jour', 'complet']),
  // Meta CAPI cookies (optional, sent from browser)
  fbp: z.string().optional(),
  fbc: z.string().optional(),
})

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return Response.json(
      { error: 'Données invalides', details: z.flattenError(parsed.error) },
      { status: 400 }
    )
  }

  const data = parsed.data
  const supabase = createServerClient()

  // Deduplicate by WhatsApp
  const { data: existing } = await supabase
    .from('waitlist')
    .select('id')
    .eq('whatsapp', data.whatsapp)
    .maybeSingle()

  if (existing) {
    return Response.json(
      { error: "Ce numéro est déjà inscrit 😊 On te prévient dès l'ouverture !" },
      { status: 409 }
    )
  }

  const { error: insertError } = await supabase.from('waitlist').insert({
    first_name: data.first_name,
    whatsapp: data.whatsapp,
    email: data.email || null,
    pack_interest: data.pack_interest,
    promo_code: 'KREOL20',
    source: 'landing',
  })

  if (insertError) {
    console.error('Supabase insert error:', insertError)
    return Response.json(
      { error: 'Erreur serveur, réessaie dans quelques instants' },
      { status: 500 }
    )
  }

  // Fire Meta CAPI CompleteRegistration — non-blocking
  const referer = request.headers.get('referer') ?? 'https://kreolglow.re'
  const userAgent = request.headers.get('user-agent') ?? undefined
  sendCompleteRegistration({
    firstName: data.first_name,
    phone: data.whatsapp,
    fbp: data.fbp,
    fbc: data.fbc,
    clientUserAgent: userAgent,
    eventSourceUrl: referer,
  }).catch((err) => console.error('CAPI error:', err))

  // Fire n8n webhook — non-blocking (email + SMS handled by n8n)
  fetch('https://n8n.aieliteacacemy.com/webhook/kreolglow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: data.first_name,
      whatsapp: data.whatsapp,
      email: data.email || null,
      pack_interest: data.pack_interest,
      promo_code: 'KREOL20',
    }),
  }).catch((err) => console.error('n8n webhook error:', err))

  return Response.json({ success: true, promoCode: 'KREOL20' })
}
