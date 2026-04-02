import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const password = request.headers.get('x-admin-password')

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Non autorise' }, { status: 401 })
  }

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }

  return Response.json({ data: data ?? [] })
}
