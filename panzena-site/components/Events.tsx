import type { EventItem } from '@/lib/sanity'
import { dateParts } from '@/lib/format'

export default function Events({ events }: { events: EventItem[] }) {
  return (
    <section id="eventi" className="px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 font-display text-4xl font-extrabold text-navy md:text-5xl">Dove trovarci</h2>

        {events.length === 0 ? (
          <p className="max-w-xl text-lg text-navy/70">
            Al momento non ci sono eventi in programma. Le nuove date compaiono qui.
          </p>
        ) : (
          <ul className="max-w-3xl">
            {events.map((ev) => {
              const p = dateParts(ev.date)
              return (
                <li key={ev.title + ev.date} className="flex items-center gap-5 border-b border-navy/15 py-5 first:border-t">
                  <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-sun text-navy">
                    <span className="text-xs font-semibold capitalize">{p.weekday}</span>
                    <span className="font-display text-3xl font-extrabold leading-none">{p.day}</span>
                    <span className="text-xs font-semibold capitalize">{p.month}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xl font-bold text-navy">{ev.title}</p>
                    <p className="text-navy/70">
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
