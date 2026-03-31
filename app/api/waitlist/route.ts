import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { sendCompleteRegistration } from '@/lib/meta-capi'

const schema = z.object({
  first_name: z.string().min(2).max(50),
  whatsapp: z.string().min(8),
  email: z.union([z.email(), z.literal('')]).optional(),
  pack_interest: z.enum(['nuit', 'glam', 'routine']),
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

  // Send confirmation email — lazy init, non-blocking
  if (data.email && process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    resend.emails.send({
      from: 'KRÉOL GLOW <hello@kreolglow.re>',
      to: data.email,
      subject: "🌺 Ton code promo KREOL20 t'attend !",
      html: buildConfirmationEmail(data.first_name),
    }).catch((err) => console.error('Resend error:', err))
  }

  return Response.json({ success: true, promoCode: 'KREOL20' })
}

function buildConfirmationEmail(firstName: string): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FFF8F3;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <h1 style="color:#C8435A;font-size:28px;margin-bottom:8px;">Bienvenue, ${firstName} ! 🌺</h1>
    <p style="color:#1A1A1A;font-size:16px;line-height:1.6;margin-bottom:24px;">
      Merci de rejoindre la famille Kréol Glow !<br>
      Tu fais partie des premières à découvrir nos kits beauté péï.
    </p>
    <div style="background:#C8435A;color:white;padding:24px;border-radius:12px;text-align:center;margin:24px 0;">
      <p style="margin:0;font-size:14px;opacity:0.9;">Ton code promo exclusif :</p>
      <p style="margin:12px 0 4px;font-size:36px;font-weight:bold;letter-spacing:6px;font-family:system-ui,sans-serif;">KREOL20</p>
      <p style="margin:0;font-size:14px;opacity:0.9;">-20% sur ta première commande</p>
    </div>
    <p style="color:#6B7280;font-size:14px;line-height:1.6;">
      On te prévient en avant-première dès l'ouverture de la boutique.<br>
      À très vite ! 💫
    </p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;">
    <p style="color:#9CA3AF;font-size:12px;text-align:center;">
      KRÉOL GLOW — La beauté péï, livrée chez ou<br>
      <a href="https://instagram.com/kreolglow" style="color:#C8435A;">@kreolglow</a>
    </p>
  </div>
</body>
</html>
  `.trim()
}
