import { getMenu, getEvents } from '@/lib/sanity'
import ContactForm from '@/components/ContactForm'

export default async function HomePage() {
  const [menu, events] = await Promise.all([getMenu(), getEvents()])

  return (
    <main>
      <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream">
        <nav className="mx-auto flex h-20 max-w-5xl items-center justify-between px-8">
          <div className="font-display text-xl font-bold text-navy">
            Panzena <span className="text-sea">Food Truck</span>
          </div>
          <div className="hidden gap-8 md:flex">
            <a href="#chi-siamo" className="font-medium text-navy">Chi siamo</a>
            <a href="#menu" className="font-medium text-navy">Menù</a>
            <a href="#eventi" className="font-medium text-navy">Dove trovarci</a>
            <a href="#contatti" className="rounded-full bg-sun px-5 py-2 font-semibold text-navy">
              Richiedi preventivo
            </a>
          </div>
        </nav>
      </header>

      <section className="bg-navy px-8 py-20 text-cream">
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 inline-block rounded-full bg-sun/15 px-4 py-2 text-sm font-semibold text-sun">
            Food truck e catering · Chiavari e Tigullio
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            Lo street food che ti riempie <span className="text-sun">il cuore</span> e la panza
          </h1>
          <p className="mt-5 max-w-md text-cream/80">
            Panuozzi, panzerotti e pizza a portafoglio con impasti a lunga lievitazione
            e ingredienti a km0.
          </p>
          <a href="#contatti" className="mt-8 inline-block rounded-full bg-sun px-7 py-3 font-semibold text-navy">
            Richiedi un preventivo
          </a>
        </div>
      </section>

      <section id="menu" className="bg-navy2 px-8 py-20 text-cream">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 font-display text-3xl font-bold">Il menù</h2>
          {menu.length === 0 && (
            <p className="text-cream/60">
              Nessun dato dal CMS ancora — collega Sanity per vedere qui il menù reale
              (vedi README). Nel frattempo il layout è comunque testabile.
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-3">
            {menu.map((cat) => (
              <div key={cat.title} className="rounded-2xl bg-navy p-6">
                <h3 className="mb-4 font-display text-lg text-sun">{cat.title}</h3>
                {cat.dishes.map((dish) => (
                  <div key={dish.name} className="mb-3 flex justify-between gap-3">
                    <span className="text-sm">{dish.name}</span>
                    <span className="whitespace-nowrap text-sm text-sea">€ {dish.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="eventi" className="px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 font-display text-3xl font-bold text-navy">Dove trovarci</h2>
          {events.length === 0 && (
            <p className="text-navy/60">
              Nessuna tappa pubblicata ancora — aggiungile dal pannello Sanity.
            </p>
          )}
          <div className="flex flex-col gap-4">
            {events.map((ev) => (
              <div key={ev.title + ev.date} className="rounded-xl border border-navy/10 p-4">
                <div className="font-semibold text-navy">{ev.title}</div>
                <div className="text-sm text-navy/60">
                  {ev.date} · {ev.location}
                  {ev.startTime ? ` · ${ev.startTime}-${ev.endTime ?? ''}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contatti" className="bg-cream2 px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 font-display text-3xl font-bold text-navy">Raccontaci il tuo evento</h2>
          <ContactForm />
        </div>
      </section>

      <footer className="bg-navy px-8 py-10 text-cream/60">
        <div className="mx-auto flex max-w-5xl justify-between text-sm">
          <span className="font-display text-cream">Panzena</span>
          <span>© 2026 Panzena Food Truck &amp; Catering — Chiavari (GE)</span>
        </div>
      </footer>
    </main>
  )
}
