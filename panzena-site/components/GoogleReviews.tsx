'use client'

import Script from 'next/script'

export default function GoogleReviews() {
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

  return (
    <section id="recensioni-google" className="bg-navy px-4 py-20 text-cream sm:px-6 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sun">Google reviews</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold md:text-5xl">Cosa dicono di noi</h2>
          </div>
        </div>

        <div className="rounded-[2rem] border border-cream/15 bg-cream/5 p-4 shadow-xl shadow-navy/10 sm:p-6">
          <div className="ti-widget" data-uid={widgetId} data-theme="light" data-layout="carousel" data-language="it" />
        </div>
      </div>

      <Script src={`https://cdn.trustindex.io/loader.js?${widgetId}`} strategy="afterInteractive" />
    </section>
  )
}
