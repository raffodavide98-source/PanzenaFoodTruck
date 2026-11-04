import Image from 'next/image'
import { TEAM } from '@/lib/content'
import brothersImage from '../photos/brothers.jpg'

export default function About() {
  return (
    <section id="team" className="bg-cream2 px-4 py-20 sm:px-6 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-navy/10 bg-navy shadow-xl">
          <div className="relative aspect-[10/11] w-full">
            <Image
              src={brothersImage}
              alt="I fratelli di Panzena"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 text-cream sm:p-8">
            <p className="font-display text-4xl font-extrabold leading-none sm:text-5xl md:text-6xl">Panzena</p>
            <p className="mt-2 max-w-[16rem] font-display text-xl font-bold leading-tight text-sun sm:text-2xl">
              Panuozzi, panzerotti e pizza a portafoglio.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-4xl font-extrabold leading-tight text-navy md:text-5xl">{TEAM.title}</h2>
          <div className="mt-6 flex max-w-xl flex-col gap-4 text-base text-navy/80 sm:text-lg">
            {TEAM.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
