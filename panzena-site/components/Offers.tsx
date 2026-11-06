import Image, { type StaticImageData } from 'next/image'
import cateringImage from '../photos/catering.jpg'
import publicEventImage from '../photos/public.jpg'
import pizzaImage from '../photos/pizza.jpg'

const offers: {
  id: string
  title: string
  label: string
  description: string
  image: StaticImageData
  imageAlt: string
}[] = [
  {
    id: 'catering',
    title: 'Catering',
    label: 'Il gusto che ti raggiunge',
    description:
      'Portiamo le nostre specialità e i prodotti del territorio nella location che hai scelto. Un servizio curato e informale, per sorprendere i tuoi ospiti con lo street food d’autore.',
    image: cateringImage,
    imageAlt: 'Un gruppo sorride all’interno del food truck Panzena',
  },
  {
    id: 'eventi',
    title: 'Eventi pubblici e privati',
    label: 'La festa si muove con noi',
    description:
      'Matrimoni, compleanni, fiere o feste di piazza: arriviamo con il nostro truck e prepariamo tutto al momento, per trasformare ogni occasione in una festa da ricordare.',
    image: publicEventImage,
    imageAlt: 'Preparazione artigianale di una pizza durante un evento',
  },
  {
    id: 'pizza-night',
    title: 'Pizza night',
    label: 'Il forno a casa tua',
    description:
      'Tu prepari lo spazio e chi vuoi invitare, noi portiamo il forno acceso e la pizza artigianale. Una serata diversa dal solito, con pizze sfornate sul momento.',
    image: pizzaImage,
    imageAlt: 'Il team Panzena insieme a un gruppo di ospiti',
  },
]

export default function Offers() {
  return (
    <section id="offerte" className="bg-navy px-6 py-16 text-cream md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-sun">
            Le nostre proposte
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            La festa ha tutto un altro sapore
          </h2>
          <p className="mt-4 text-cream/75 sm:text-lg">
            Scegli la tua occasione: al gusto ci pensiamo noi.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3">
          {offers.map((offer) => (
            <li key={offer.id}>
              <article className="group relative isolate flex min-h-[26rem] overflow-hidden rounded-[1.75rem] border border-cream/15 bg-navy2 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <Image
                  src={offer.image}
                  alt={offer.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1152px) 33vw, 360px"
                  className="absolute inset-0 -z-20 object-cover transition duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/75 to-navy/5"
                />
                <div className="mt-auto flex w-full flex-col items-start p-6 sm:p-7">
                  <p className="rounded-full border border-sun/60 bg-navy/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sun backdrop-blur-sm">
                    {offer.label}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight text-cream sm:text-3xl">
                    {offer.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-cream/85">{offer.description}</p>
                  <a
                    href="#preventivo"
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-sun transition hover:text-cream focus-visible:outline-cream"
                    aria-label={`Richiedi informazioni per ${offer.title}`}
                  >
                    Parliamone
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
