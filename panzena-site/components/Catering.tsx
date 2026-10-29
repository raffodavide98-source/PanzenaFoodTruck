import type { SiteSettings } from '@/lib/sanity'
import { EVENT_TYPES } from '@/lib/defaults'

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-1 shrink-0 text-sea">
      <path d="M3 9.5l4 4 8-9" />
    </svg>
  )
}

export default function Catering({ settings }: { settings: SiteSettings }) {
  return (
    <section id="catering" className="px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="font-display text-4xl font-extrabold leading-tight text-navy md:text-5xl">
            Il food truck alla tua festa
          </h2>
          <p className="mt-5 text-lg text-navy/80">{settings.cateringIntro}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tipi di evento">
            {EVENT_TYPES.slice(0, 4).map((t) => (
              <li key={t} className="rounded-full border border-navy/20 px-4 py-1.5 text-sm font-medium text-navy">
                {t}
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-xl font-bold text-navy">Cosa è incluso</h3>
          <ul className="mt-3 flex flex-col gap-2 text-navy/85">
            {settings.cateringIncluded.map((item) => (
              <li key={item} className="flex gap-3">
                <Check />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#contatti" className="rounded-full bg-navy px-7 py-3 font-semibold text-cream hover:bg-navy2">
              Richiedi un preventivo
            </a>
            <a
              href={settings.menuPdfUrl}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-navy/30 px-7 py-3 font-semibold text-navy hover:bg-navy/5"
            >
              Scarica il menù (PDF)
            </a>
          </div>
        </div>

        <div className="md:col-span-7 md:pl-8">
          <h3 className="font-display text-2xl font-bold text-navy">Come funziona</h3>
          <ol className="mt-6 flex flex-col">
            {settings.cateringSteps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-navy/15 py-6 first:border-t-0 first:pt-0">
                <span className="font-display text-5xl font-extrabold leading-none text-sea">{i + 1}</span>
                <div>
                  <p className="font-display text-xl font-bold text-navy">{s.title}</p>
                  <p className="mt-1 text-navy/75">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
