import type { SiteSettings } from '@/lib/sanity'

export default function About({ settings }: { settings: SiteSettings }) {
  const paragraphs = settings.aboutText.split(/\n\s*\n/).filter(Boolean)

  return (
    <section id="chi-siamo" className="bg-cream2 px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        {settings.aboutImageUrl ? (
          <img
            src={`${settings.aboutImageUrl}?w=1000&h=1100&fit=crop&auto=format`}
            alt="Il team di Panzena davanti al food truck"
            loading="lazy"
            className="aspect-[10/11] w-full rounded-3xl object-cover"
          />
        ) : (
          <div className="flex aspect-[10/11] w-full flex-col justify-between rounded-3xl bg-sun p-8 text-navy md:p-10">
            <p className="font-display text-6xl font-extrabold leading-none md:text-7xl">Panzena</p>
            <p className="max-w-[16rem] font-display text-2xl font-bold leading-tight">
              Panuozzi, panzerotti e pizza a portafoglio.
            </p>
          </div>
        )}

        <div>
          <h2 className="font-display text-4xl font-extrabold leading-tight text-navy md:text-5xl">{settings.aboutTitle}</h2>
          <div className="mt-6 flex max-w-xl flex-col gap-4 text-lg text-navy/80">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <a href="#contatti" className="mt-8 inline-block rounded-full bg-navy px-7 py-3 font-semibold text-cream hover:bg-navy2">
            Parliamo del tuo evento
          </a>
        </div>
      </div>
    </section>
  )
}
