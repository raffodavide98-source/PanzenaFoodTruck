import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, phone, email, message } = body

  if (!name || !phone || !email || !message) {
    return NextResponse.json({ error: 'Campi mancanti' }, { status: 400 })
  }
  console.log("Sanity project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log("Sanity dataset:", process.env.NEXT_PUBLIC_SANITY_DATASET);

  // Se RESEND_API_KEY non è configurata, logga soltanto: utile per
  // testare il form in locale senza aver ancora un account Resend.
  if (!process.env.RESEND_API_KEY) {
    console.log('Nuova richiesta preventivo (email non inviata, manca RESEND_API_KEY):', body)
    return NextResponse.json({ ok: true, dev: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Panzena <preventivi@panzena.it>',
      to: process.env.CONTACT_EMAIL_TO || 'info@panzena.it',
      reply_to: email,
      subject: `Nuova richiesta preventivo da ${name}`,
      text: `Nome: ${name}\nTelefono: ${phone}\nEmail: ${email}\n\n${message}`,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Invio email fallito' }, { status: 500 })
  }
}
