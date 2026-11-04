'use client'

import Image from 'next/image'
import { useState } from 'react'
import logoImage from '../photos/logo.jpeg'

const links = [
  { href: '#piatti', label: 'Piatti famosi' },
  { href: '#eventi', label: 'Eventi' },
  { href: '#team', label: 'Il team' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

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

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-medium text-navy transition hover:text-sea">
              {l.label}
            </a>
          ))}
          <a href="#preventivo" className="rounded-full bg-sun px-5 py-2 font-semibold text-navy shadow-sm transition hover:brightness-95">
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
                <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-navy/10 py-4 text-lg font-medium text-navy">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#preventivo"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-sun px-5 py-3 text-center font-semibold text-navy"
          >
            Richiedi preventivo
          </a>
        </div>
      )}
    </header>
  )
}
