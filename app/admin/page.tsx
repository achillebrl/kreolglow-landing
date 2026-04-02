'use client'

import { useState, useEffect, useCallback } from 'react'

type Entry = {
  id: string
  created_at: string
  first_name: string
  whatsapp: string
  email: string | null
  pack_interest: 'nuit' | 'glam' | 'routine'
  promo_code: string
  source: string
}

type SortKey = keyof Entry
type SortDir = 'asc' | 'desc'

const PACK_LABELS: Record<Entry['pack_interest'], string> = {
  nuit: '🌙 Kit Nuit',
  glam: '✨ Kit Glam',
  routine: '💎 Kit Routine',
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [entries, setEntries] = useState<Entry[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('created_at')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async (pw: string) => {
    const res = await fetch('/api/admin', {
      headers: { 'x-admin-password': pw },
    })
    if (res.ok) {
      const json = await res.json() as { data: Entry[] }
      setEntries(json.data)
    }
  }, [])

  useEffect(() => {
    const stored = sessionStorage.getItem('kg_admin_pw')
    if (stored) {
      setAuthed(true)
      fetchData(stored)
    }
  }, [fetchData])

  const login = async () => {
    setLoading(true)
    setLoginError('')
    const res = await fetch('/api/admin', {
      headers: { 'x-admin-password': password },
    })
    if (res.ok) {
      const json = await res.json() as { data: Entry[] }
      sessionStorage.setItem('kg_admin_pw', password)
      setEntries(json.data)
      setAuthed(true)
    } else {
      setLoginError('Mot de passe incorrect')
    }
    setLoading(false)
  }

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = [...entries].sort((a, b) => {
    const va = String(a[sortKey] ?? '')
    const vb = String(b[sortKey] ?? '')
    const cmp = va.localeCompare(vb)
    return sortDir === 'asc' ? cmp : -cmp
  })

  const stats = {
    total: entries.length,
    nuit: entries.filter(e => e.pack_interest === 'nuit').length,
    glam: entries.filter(e => e.pack_interest === 'glam').length,
    routine: entries.filter(e => e.pack_interest === 'routine').length,
    withEmail: entries.filter(e => e.email).length,
  }

  const exportCSV = () => {
    const headers = ['Prenom', 'WhatsApp', 'Email', 'Pack', 'Date inscription', 'Code promo']
    const rows = entries.map(e => [
      e.first_name,
      e.whatsapp,
      e.email ?? '',
      e.pack_interest,
      new Date(e.created_at).toLocaleString('fr-FR'),
      e.promo_code,
    ])
    const csv = [headers, ...rows]
      .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kreolglow-waitlist-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-sm">
          <div className="flex items-baseline gap-1 justify-center mb-6">
            <span className="font-heading font-bold text-xl text-brand-primary">KREOL</span>
            <span className="font-script text-2xl text-brand-accent">Glow</span>
          </div>
          <h1 className="font-heading text-xl font-bold text-center mb-6 text-brand-text">
            Admin
          </h1>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') login() }}
              placeholder="Mot de passe"
              className="w-full h-12 px-4 text-base rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              autoFocus
            />
            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}
            <button
              onClick={login}
              disabled={loading || !password}
              className="w-full min-h-12 bg-brand-primary text-white rounded-full font-medium hover:bg-[#b33a50] disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Verification...' : 'Acceder'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 text-xs opacity-50">
      {sortKey === col ? (sortDir === 'asc' ? '\u2191' : '\u2193') : '\u2195'}
    </span>
  )

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-heading font-bold text-lg text-brand-primary">KREOL</span>
              <span className="font-script text-xl text-brand-accent">Glow</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-brand-text">Dashboard Waitlist</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { const pw = sessionStorage.getItem('kg_admin_pw') ?? ''; fetchData(pw) }}
              className="px-4 py-2 text-sm border border-gray-200 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              ↺ Rafraichir
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 text-sm bg-brand-primary text-white rounded-full hover:bg-[#b33a50] cursor-pointer"
            >
              Exporter CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total inscrits', value: stats.total, color: 'text-brand-primary' },
            { label: '🌙 Kit Nuit', value: stats.nuit, color: 'text-brand-primary' },
            { label: '✨ Kit Glam', value: stats.glam, color: 'text-brand-secondary' },
            { label: '💎 Kit Routine', value: stats.routine, color: 'text-brand-accent' },
            { label: 'Avec email', value: stats.withEmail, color: 'text-gray-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm">
              <p className={`font-heading text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {(
                    [
                      { key: 'first_name' as SortKey, label: 'Prenom' },
                      { key: 'whatsapp' as SortKey, label: 'WhatsApp' },
                      { key: 'email' as SortKey, label: 'Email' },
                      { key: 'pack_interest' as SortKey, label: 'Pack' },
                      { key: 'created_at' as SortKey, label: 'Date' },
                      { key: 'promo_code' as SortKey, label: 'Code' },
                    ] as { key: SortKey; label: string }[]
                  ).map(col => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-800 select-none"
                    >
                      {col.label}
                      <SortIcon col={col.key} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-400">
                      Aucune inscription pour l&apos;instant
                    </td>
                  </tr>
                ) : (
                  sorted.map((entry, i) => (
                    <tr
                      key={entry.id}
                      className={`border-b border-gray-50 hover:bg-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}
                    >
                      <td className="px-4 py-3 font-medium text-brand-text">{entry.first_name}</td>
                      <td className="px-4 py-3 font-mono text-xs">{entry.whatsapp}</td>
                      <td className="px-4 py-3 text-gray-500">{entry.email ?? '\u2014'}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-bg text-brand-text">
                          {PACK_LABELS[entry.pack_interest]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {new Date(entry.created_at).toLocaleString('fr-FR', {
                          day: '2-digit', month: '2-digit', year: '2-digit',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-brand-secondary">{entry.promo_code}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
