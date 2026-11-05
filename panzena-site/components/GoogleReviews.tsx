import GoogleReviewsWidget from './GoogleReviewsWidget'

async function getRating() {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID
  if (!key || !placeId) return null

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount',
      },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const data = await res.json()
    if (typeof data.rating !== 'number') return null
    return { rating: data.rating as number, count: (data.userRatingCount ?? 0) as number }
  } catch {
    return null
  }
}

function Stars({ rating }: { rating: number }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100))
  return (
    <span className="relative inline-block text-2xl leading-none tracking-wider" aria-hidden="true">
      <span className="text-cream/25">★★★★★</span>
      <span className="absolute inset-0 overflow-hidden text-sun" style={{ width: `${pct}%` }}>
        ★★★★★
      </span>
    </span>
  )
}

export default async function GoogleReviews() {
  const widgetId = (process.env.NEXT_PUBLIC_TRUSTINDEX_WIDGET || '').trim()

  if (!widgetId) {
    return (
      <section id="recensioni-google" className="bg-navy px-4 py-20 text-cream sm:px-6 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-cream/15 bg-cream/5 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sun">Trustindex</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">Recensioni da inserire</h2>
          <p className="mt-3 text-cream/75">Aggiungi l’ID del widget in .env.local per attivare le recensioni.</p>
        </div>
      </section>
    )
  }

  const stats = await getRating()

  return (
    <section id="recensioni-google" className="bg-navy px-4 py-20 text-cream sm:px-6 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sun">Google reviews</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">Cosa dicono di noi</h2>
          </div>

          {stats && (
            <div className="flex items-center gap-4 rounded-2xl border border-cream/15 bg-cream/5 px-5 py-3">
              <span className="font-display text-5xl font-extrabold leading-none">
                {stats.rating.toFixed(1).replace('.', ',')}
              </span>
              <div>
                <Stars rating={stats.rating} />
                <p className="mt-1 text-sm text-cream/75">
                  {stats.count} recensioni su Google
                </p>
              </div>
            </div>
          )}
        </div>

        <GoogleReviewsWidget widgetId={widgetId} />
      </div>
    </section>
  )
}