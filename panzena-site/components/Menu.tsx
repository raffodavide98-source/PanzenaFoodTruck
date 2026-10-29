import type { MenuCategory } from '@/lib/sanity'
import { euro } from '@/lib/format'

const TAGS: Record<string, { label: string; className: string }> = {
  vegetariano: { label: 'Vegetariano', className: 'bg-sea/20 text-cream' },
  piccante: { label: 'Piccante', className: 'bg-red-400/25 text-cream' },
  novita: { label: 'Novità', className: 'bg-sun text-navy' },
}

export default function Menu({ menu, pdfUrl }: { menu: MenuCategory[]; pdfUrl: string }) {
  const visible = menu.filter((c) => c.dishes.length > 0)

  return (
    <section id="menu" className="bg-navy2 px-6 py-20 text-cream md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">Il menù</h2>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener"
            className="rounded-full border border-cream/40 px-6 py-2.5 font-semibold hover:bg-cream/10"
          >
            Scarica il menù catering (PDF)
          </a>
        </div>

        {visible.length === 0 && (
          <p className="text-cream/70">Il menù è in aggiornamento. Scarica il PDF o scrivici per conoscere i piatti del giorno.</p>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {visible.map((cat) => (
            <div key={cat.title} className="rounded-2xl bg-navy p-6">
              <h3 className="mb-6 border-b border-cream/15 pb-2 font-display text-2xl font-bold text-sun">{cat.title}</h3>
              <div className="flex flex-col gap-7">
                {cat.dishes.map((dish) => (
                  <div key={dish.name} className="flex flex-col gap-2">
                    {dish.imageUrl && (
                      <img
                        src={`${dish.imageUrl}?w=640&h=420&fit=crop&auto=format`}
                        alt={dish.name}
                        loading="lazy"
                        className="mb-1 h-40 w-full rounded-xl object-cover"
                      />
                    )}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold">{dish.name}</p>
                        {dish.description && <p className="mt-0.5 text-sm text-cream/70">{dish.description}</p>}
                      </div>
                      <span className="whitespace-nowrap rounded bg-sea/15 px-2 py-0.5 font-mono text-sm text-cream">
                        {euro(dish.price)}
                      </span>
                    </div>
                    {dish.tags && dish.tags.length > 0 && (
                      <ul className="flex flex-wrap gap-1.5">
                        {dish.tags.map((t) =>
                          TAGS[t] ? (
                            <li key={t} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${TAGS[t].className}`}>
                              {TAGS[t].label}
                            </li>
                          ) : null,
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
