'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import logoImage from '../photos/logo.jpeg'

const links = [
  { href: '#eventi', label: 'Dove trovarci' },
  { href: '#piatti', label: 'Ci conoscono per...' },
  { href: '#team', label: 'Chi siamo' },
  { href: '#offerte', label: 'Le nostre proposte' },
  { href: '#recensioni-google', label: 'Recensioni' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [pendingHash, setPendingHash] = useState<string | null>(null)

  useEffect(() => {
    if (open || !pendingHash) return

    window.location.hash = pendingHash
    setPendingHash(null)
  }, [open, pendingHash])

  function navigateFromMobileMenu(href: string) {
    setPendingHash(href)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 md:px-8" aria-label="Principale">
        <a href="#top" className="flex items-center gap-3" aria-label="Torna all'inizio">
          <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-navy/10 bg-white shadow-sm sm:h-14 sm:w-14">
            <Image src={logoImage} alt="Panzena logo" width={56} height={56} className="h-full w-full object-cover" priority />
          </span>
          <span className="hidden font-display text-xl font-extrabold leading-none text-navy sm:block">
            Panzena <span className="text-sea">Food Truck</span>
          </span>
        </a>

        <div className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-navy transition hover:text-sea lg:text-base">
              {l.label}
            </a>
          ))}
          <a href="#preventivo" className="rounded-full bg-sun px-4 py-2 text-sm font-semibold text-navy shadow-sm transition hover:brightness-95 lg:px-5 lg:text-base">
            Richiedi preventivo
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 bg-white text-navy shadow-sm md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Chiudi il menu' : 'Apri il menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="menu-mobile" className="border-t border-navy/10 bg-cream px-4 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(event) => {
                    event.preventDefault()
                    navigateFromMobileMenu(l.href)
                  }}
                  className="block border-b border-navy/10 py-4 text-lg font-medium text-navy"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#preventivo"
            onClick={(event) => {
              event.preventDefault()
              navigateFromMobileMenu('#preventivo')
            }}
            className="mt-5 block rounded-full bg-sun px-5 py-3 text-center font-semibold text-navy"
          >
            Richiedi preventivo
          </a>
        </div>
      )}
    </header>
  )
}
