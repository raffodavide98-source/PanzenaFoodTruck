import type { GalleryImage } from '@/lib/sanity'
import { DEFAULT_SETTINGS } from '@/lib/defaults'

const PLACEHOLDER_BG = ['bg-sea text-cream', 'bg-sun text-navy', 'bg-navy2 text-cream', 'bg-navy text-cream', 'bg-sun text-navy', 'bg-sea text-cream', 'bg-navy2 text-cream', 'bg-sun text-navy']

// Colonne su desktop quando le foto sono poche (meno di 5).
const COLS: Record<number, string> = { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' }

// Con 5-8 foto la prima è grande e l'ultima riga viene riempita senza buchi.
function tileClass(i: number, n: number) {
  const classes: string[] = []
  if (n >= 5) {
    if (i === 0) classes.push('md:col-span-2 md:row-span-2')
    if (n === 6 && i === 5) classes.push('md:col-span-4')
    if (n === 7 && (i === 5 || i === 6)) classes.push('md:col-span-2')
    if (n === 8 && i === 7) classes.push('md:col-span-2')
  }
  // Su mobile (2 colonne) l'ultima foto occupa tutta la riga se il totale è dispari.
  if (n % 2 === 1 && i === n - 1) classes.push('max-md:col-span-2')
  return classes.join(' ')
}

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const usePlaceholders = images.length === 0
  const labels = DEFAULT_SETTINGS.galleryPlaceholders
  const photos = images.slice(0, 8)
  const n = usePlaceholders ? labels.length : photos.length
  const gridCols = n >= 5 ? 'md:grid-cols-4' : COLS[n]

  return (
    <section id="galleria" className="px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 font-display text-4xl font-extrabold text-navy md:text-5xl">Dal truck, con amore</h2>

        <div className={`grid auto-rows-[10rem] grid-cols-2 gap-3 md:auto-rows-[13rem] ${gridCols}`}>
          {usePlaceholders
            ? labels.map((label, i) => (
                <div key={label} className={`flex items-end rounded-2xl p-4 ${PLACEHOLDER_BG[i % PLACEHOLDER_BG.length]} ${tileClass(i, n)}`}>
                  <div>
                    <p className="font-display text-lg font-bold leading-tight">{label}</p>
                    <p className="text-xs opacity-70">Foto in arrivo</p>
                  </div>
                </div>
              ))
            : photos.map((img, i) => (
                <figure key={img.url} className={`relative overflow-hidden rounded-2xl ${tileClass(i, n)}`}>
                  <img
                    src={`${img.url}?w=900&h=900&fit=crop&auto=format`}
                    alt={img.alt || img.caption || 'Foto dal food truck Panzena'}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  {img.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-3 pt-8 text-sm font-medium text-cream">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
        </div>
      </div>
    </section>
  )
}
