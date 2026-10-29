import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 })
  }

  // Campo trappola: i bot lo compilano, le persone no. Rispondiamo "ok" senza inviare nulla.
  if (body.company) return NextResponse.json({ ok: true })

  const { name, phone, email, message, eventType, date, guests, consent } = body

  if (!name || !phone || !email || !message || !eventType) {
    return NextResponse.json({ error: 'Campi mancanti' }, { status: 400 })
  }
  if (!consent) {
    return NextResponse.json({ error: 'Consenso privacy mancante' }, { status: 400 })
  }

  const text = [
    `Nome: ${name}`,
    `Telefono: ${phone}`,
    `Email: ${email}`,
    `Tipo di evento: ${eventType}`,
    `Data: ${date || 'non indicata'}`,
    `Ospiti: ${guests || 'non indicato'}`,
    '',
    message,
  ].join('\n')

  // Senza RESEND_API_KEY la richiesta viene solo stampata nel log: utile in locale.
  if (!process.env.RESEND_API_KEY) {
    console.log('Nuova richiesta preventivo (email non inviata, manca RESEND_API_KEY):\n' + text)
    return NextResponse.json({ ok: true, dev: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Panzena <preventivi@panzena.it>',
      to: process.env.CONTACT_EMAIL_TO || 'info@panzena.it',
      reply_to: email,
      subject: `Preventivo ${eventType} — ${name}`,
      text,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Invio email fallito' }, { status: 500 })
  }
}
