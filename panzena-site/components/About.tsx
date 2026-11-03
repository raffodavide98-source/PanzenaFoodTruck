import { TEAM } from '@/lib/content'

export default function About() {
  return (
    <section id="team" className="bg-cream2 px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex aspect-[10/11] w-full flex-col justify-between rounded-3xl bg-sun p-8 text-navy md:p-10">
          <p className="font-display text-6xl font-extrabold leading-none md:text-7xl">Panzena</p>
          <p className="max-w-[16rem] font-display text-2xl font-bold leading-tight">
            Panuozzi, panzerotti e pizza a portafoglio.
          </p>
        </div>

        <div>
          <h2 className="font-display text-4xl font-extrabold leading-tight text-navy md:text-5xl">{TEAM.title}</h2>
          <div className="mt-6 flex max-w-xl flex-col gap-4 text-lg text-navy/80">
            {TEAM.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
