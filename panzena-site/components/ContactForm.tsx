'use client'

import { useState, FormEvent } from 'react'
import { EVENT_TYPES } from '@/lib/defaults'

const field = 'w-full rounded-lg border border-navy/20 bg-white px-3 py-2.5 text-navy placeholder:text-navy/40'
const label = 'mb-1 block text-sm font-medium text-navy'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries())

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
    return (
      <div className="rounded-2xl bg-white p-8 text-navy" role="status">
        <p className="font-display text-2xl font-bold">Richiesta inviata</p>
        <p className="mt-2 text-navy/75">Ti rispondiamo entro 24 ore con una proposta di menù e un preventivo.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl bg-white p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Nome e cognome</label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Telefono</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <label htmlFor="eventType" className={label}>Tipo di evento</label>
          <select id="eventType" name="eventType" required defaultValue="" className={field}>
            <option value="" disabled>Scegli…</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className={label}>Data (se la sai)</label>
          <input id="date" name="date" type="date" className={field} />
        </div>
        <div>
          <label htmlFor="guests" className={label}>Numero di ospiti</label>
          <input id="guests" name="guests" type="number" min={1} inputMode="numeric" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>Dettagli</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Location, orari, esigenze particolari…"
          className={field}
        />
      </div>

      {/* Campo trappola per i bot: le persone non lo vedono e non lo compilano */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="company">Azienda</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm text-navy/80">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0" />
        <span>
          Acconsento al trattamento dei dati per ricevere una risposta alla mia richiesta.{' '}
          <a href="/privacy" className="font-medium text-sea underline underline-offset-2">Informativa privacy</a>
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="self-start rounded-full bg-navy px-8 py-3 font-semibold text-cream hover:bg-navy2 disabled:opacity-60"
      >
        {status === 'sending' ? 'Invio in corso…' : 'Invia richiesta'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-700" role="alert">
          Qualcosa è andato storto. Riprova tra poco o scrivici direttamente via email.
        </p>
      )}
    </form>
  )
}
