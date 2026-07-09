'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/preventivo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return <p className="text-navy">Richiesta inviata. Ti rispondiamo entro 24 ore.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" required placeholder="Nome e cognome" className="rounded-lg border border-navy/15 bg-cream px-3 py-2" />
        <input name="phone" required placeholder="Telefono" className="rounded-lg border border-navy/15 bg-cream px-3 py-2" />
      </div>
      <input name="email" type="email" required placeholder="Email" className="rounded-lg border border-navy/15 bg-cream px-3 py-2" />
      <textarea name="message" required placeholder="Data, location, numero invitati, tipo di evento..." rows={4} className="rounded-lg border border-navy/15 bg-cream px-3 py-2" />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start rounded-full bg-navy px-7 py-3 font-semibold text-cream disabled:opacity-60"
      >
        {status === 'sending' ? 'Invio in corso...' : 'Invia richiesta'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-600">Qualcosa è andato storto, riprova o scrivici direttamente.</p>
      )}
    </form>
  )
}
