import type { SiteSettings } from '@/lib/sanity'
import { telLink, whatsappLink } from '@/lib/format'
import ContactForm from './ContactForm'

export default function Contact({ settings }: { settings: SiteSettings }) {
  const wa = settings.phone ? whatsappLink(settings.phone) : ''
  const btn = 'rounded-full border border-navy/30 px-6 py-2.5 font-semibold text-navy hover:bg-navy/5'

  return (
    <section id="contatti" className="bg-cream2 px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="font-display text-4xl font-extrabold leading-tight text-navy md:text-5xl">
            Raccontaci il tuo evento
          </h2>
          <p className="mt-5 text-lg text-navy/80">
            Compila il modulo: ti rispondiamo entro 24 ore con una proposta e un preventivo gratuito.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {settings.phone && (
              <a href={telLink(settings.phone)} className={btn}>Chiama {settings.phone}</a>
            )}
            {wa && (
              <a href={wa} target="_blank" rel="noopener" className={btn}>WhatsApp</a>
            )}
            <a href={`mailto:${settings.email}`} className={btn}>{settings.email}</a>
          </div>

          <p className="mt-8 text-navy/70">
            <span className="font-semibold text-navy">Dove arriviamo:</span> {settings.serviceArea}
          </p>
        </div>

        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
