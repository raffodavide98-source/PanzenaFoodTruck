import type { Highlight } from '@/lib/defaults'

export default function Highlights({ items }: { items: Highlight[] }) {
  return (
    <section className="bg-sun text-navy" aria-label="Perché Panzena">
      <ul className="mx-auto grid max-w-6xl gap-6 px-6 py-8 sm:grid-cols-2 md:grid-cols-4 md:gap-0 md:px-8">
        {items.slice(0, 4).map((h, i) => (
          <li key={h.title} className={`md:px-6 ${i === 0 ? 'md:pl-0' : 'md:border-l md:border-navy/25'}`}>
            <p className="font-display text-xl font-bold leading-tight">{h.title}</p>
            <p className="mt-1 text-sm text-navy/80">{h.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
