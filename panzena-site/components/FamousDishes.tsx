import type { Dish } from '@/lib/sanity'
import { euro } from '@/lib/format'

export default function FamousDishes({ dishes }: { dishes: Dish[] }) {
  return (
    <section id="piatti" className="bg-navy2 px-6 py-20 text-cream md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 font-display text-4xl font-extrabold md:text-5xl">Ci conoscono per...</h2>
        <p className="mb-8 text-cream/75">Per allergeni e intolleranze, chiedici prima dell’ordine.</p>

        {dishes.length === 0 ? (
          <p className="max-w-xl text-lg text-cream/70">I piatti arrivano presto.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {dishes.map((dish) => (
              <li key={dish.name} className="flex flex-col overflow-hidden rounded-2xl bg-navy">
                {dish.imageUrl && (
                  <img
                    src={`${dish.imageUrl}?w=800&h=560&fit=crop&auto=format`}
                    alt={dish.name}
                    loading="lazy"
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-2xl font-bold text-sun">{dish.name}</p>
                    {typeof dish.price === 'number' && (
                      <span className="whitespace-nowrap rounded bg-sea/15 px-2 py-0.5 font-mono text-sm">{euro(dish.price)}</span>
                    )}
                  </div>
                  {dish.description && <p className="text-cream/75">{dish.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
