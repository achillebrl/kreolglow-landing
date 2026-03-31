import { createHash } from 'crypto'

function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

function normalizePhone(phone: string): string {
  // Strip spaces, dashes, dots — keep + and digits
  const cleaned = phone.replace(/[\s\-\.]/g, '')
  // Convert Réunion local formats to E.164
  if (cleaned.startsWith('0262')) return '+262' + cleaned.slice(4)
  if (cleaned.startsWith('0693') || cleaned.startsWith('0692')) return '+262' + cleaned.slice(1)
  if (cleaned.startsWith('06') || cleaned.startsWith('07')) return '+262' + cleaned.slice(1)
  return cleaned
}

interface CAPIPayload {
  firstName: string
  phone: string
  fbp?: string | null
  fbc?: string | null
  clientUserAgent?: string | null
  eventSourceUrl: string
}

export async function sendCompleteRegistration(payload: CAPIPayload): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const token = process.env.META_CAPI_ACCESS_TOKEN

  if (!pixelId || pixelId === 'REPLACE_ME' || !token) return

  const userData: Record<string, string | undefined> = {
    fn: sha256(payload.firstName),
    ph: sha256(normalizePhone(payload.phone)),
  }
  if (payload.fbp) userData.fbp = payload.fbp
  if (payload.fbc) userData.fbc = payload.fbc
  if (payload.clientUserAgent) userData.client_user_agent = payload.clientUserAgent

  const body = {
    data: [
      {
        event_name: 'CompleteRegistration',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: payload.eventSourceUrl,
        user_data: userData,
      },
    ],
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
    if (!res.ok) {
      const err = await res.text()
      console.error('Meta CAPI error:', err)
    }
  } catch (err) {
    console.error('Meta CAPI fetch error:', err)
  }
}
