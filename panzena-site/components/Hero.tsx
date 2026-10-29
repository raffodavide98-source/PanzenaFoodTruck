import type { EventItem, SiteSettings } from '@/lib/sanity'
import { dateParts } from '@/lib/format'

export default function Hero({ settings, nextEvent }: { settings: SiteSettings; nextEvent?: EventItem }) {
  const next = nextEvent ? dateParts(nextEvent.date) : null

  return (
    <section id="top" className="relative overflow-hidden bg-navy text-cream">
      {settings.heroImageUrl ? (
        <>
          <img
            src={`${settings.heroImageUrl}?w=1800&auto=format`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        </>
      ) : (
        <div aria-hidden className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-sun/10 md:h-[40rem] md:w-[40rem]" />
      )}

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-12 md:items-center md:px-8 md:py-28">
        <div className="md:col-span-7">
          <h1 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight md:text-7xl">
            {settings.heroTitle}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-cream/80">{settings.heroSubtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contatti" className="rounded-full bg-sun px-7 py-3 font-semibold text-navy hover:brightness-95">
              Richiedi un preventivo
            </a>
            <a
              href={settings.menuPdfUrl}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-cream/40 px-7 py-3 font-semibold text-cream hover:bg-cream/10"
            >
              Scarica il menù catering
            </a>
          </div>
        </div>

        <div className="md:col-span-5 md:justify-self-end">
          <div className="max-w-sm rounded-2xl bg-cream p-7 text-navy shadow-2xl md:rotate-1">
            {nextEvent && next ? (
              <>
                <p className="text-sm font-semibold text-sea">Prossima tappa del truck</p>
                <p className="mt-2 font-display text-5xl font-extrabold capitalize leading-none">
                  {next.weekday} {next.day} {next.month}
                </p>
                <p className="mt-4 text-xl font-semibold">{nextEvent.location}</p>
                <p className="mt-1 text-navy/70">
                  {nextEvent.startTime ? `${nextEvent.startTime}${nextEvent.endTime ? `–${nextEvent.endTime}` : ''} · ` : ''}
                  {nextEvent.title}
                </p>
                <a href="#eventi" className="mt-5 inline-block font-semibold text-sea underline underline-offset-4">
                  Vedi tutte le tappe
                </a>
              </>
            ) : (
              <>
                <p className="font-display text-3xl font-extrabold leading-tight">Il truck è pronto per la tua festa</p>
                <p className="mt-3 text-navy/70">
                  Compleanni, aziende, matrimoni: raccontaci l’evento e ti rispondiamo entro 24 ore.
                </p>
                <a href="#contatti" className="mt-5 inline-block font-semibold text-sea underline underline-offset-4">
                  Scrivici ora
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
