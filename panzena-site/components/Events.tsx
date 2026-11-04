import type { EventItem } from '@/lib/sanity'
import { dateParts } from '@/lib/format'
import padelloneImage from '../photos/padellone.jpg'

export default function Events({ events }: { events: EventItem[] }) {
  return (
    <section id="eventi" className="relative overflow-hidden px-4 py-20 sm:px-6 md:px-8 md:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${padelloneImage.src})` }}
      />
      <div className="absolute inset-0 bg-navy/80" />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="mb-10 font-display text-4xl font-extrabold text-cream md:text-5xl">Dove trovarci</h2>

        {events.length === 0 ? (
          <p className="max-w-xl text-lg text-cream/80">
            Al momento non ci sono eventi in programma. Le nuove date compaiono qui.
          </p>
        ) : (
          <ul className="max-w-3xl rounded-3xl border border-cream/15 bg-cream/5 p-3 backdrop-blur-[2px] sm:p-5">
            {events.map((ev) => {
              const p = dateParts(ev.date)
              return (
                <li key={ev.title + ev.date} className="flex items-center gap-4 border-b border-cream/15 py-5 first:border-t first:pt-2 last:border-b-0">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-sun text-navy shadow-sm sm:h-20 sm:w-20">
                    <span className="text-[10px] font-semibold capitalize sm:text-xs">{p.weekday}</span>
                    <span className="font-display text-2xl font-extrabold leading-none sm:text-3xl">{p.day}</span>
                    <span className="text-[10px] font-semibold capitalize sm:text-xs">{p.month}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xl font-bold text-cream sm:text-2xl">{ev.title}</p>
                    <p className="text-sm text-cream/80 sm:text-base">
                      {ev.location}
                      {ev.startTime ? ` · ${ev.startTime}${ev.endTime ? `–${ev.endTime}` : ''}` : ''}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
