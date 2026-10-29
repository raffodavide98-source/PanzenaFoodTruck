import type { Testimonial } from '@/lib/sanity'

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null

  return (
    <section id="recensioni" className="bg-navy px-6 py-20 text-cream md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 font-display text-4xl font-extrabold md:text-5xl">Cosa dicono di noi</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {items.slice(0, 3).map((t) => (
            <figure key={t.author + t.text} className="border-t-4 border-sun pt-6">
              <blockquote className="text-xl leading-relaxed">“{t.text}”</blockquote>
              <figcaption className="mt-5">
                <p className="font-semibold">{t.author}</p>
                {t.eventType && <p className="text-sm text-cream/70">{t.eventType}</p>}
                {t.isSample && <p className="mt-2 text-xs italic text-sun">Testo di esempio da sostituire</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
