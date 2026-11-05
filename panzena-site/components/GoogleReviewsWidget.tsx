'use client'

import { useEffect, useRef, useState } from 'react'

export default function GoogleReviewsWidget({ widgetId }: { widgetId: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // appena compare qualcosa oltre al tag <script>, il widget è pronto
    const observer = new MutationObserver(() => {
      const hasWidget = Array.from(container.children).some((el) => el.tagName !== 'SCRIPT')
      if (hasWidget) {
        setLoaded(true)
        observer.disconnect()
      }
    })
    observer.observe(container, { childList: true, subtree: true })

    const script = document.createElement('script')
    script.src = `https://cdn.trustindex.io/loader.js?${widgetId}`
    script.async = true
    container.appendChild(script)

    // sicurezza: se qualcosa va storto, togli comunque lo skeleton
    const timeout = setTimeout(() => setLoaded(true), 8000)

    return () => {
      clearTimeout(timeout)
      observer.disconnect()
      container.innerHTML = ''
    }
  }, [widgetId])

  return (
    <>
      <link rel="preconnect" href="https://cdn.trustindex.io" crossOrigin="" />

      <div className="relative min-h-[320px] rounded-[2rem] border border-cream/15 bg-cream/5 p-4 shadow-xl shadow-navy/10 sm:p-6">
        {/* skeleton */}
        <div
          className={`pointer-events-none absolute inset-4 grid gap-4 transition-opacity duration-500 sm:inset-6 md:grid-cols-3 ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl bg-cream/10" />
          ))}
        </div>

        <div ref={containerRef} className="relative" />
      </div>
    </>
  )
}