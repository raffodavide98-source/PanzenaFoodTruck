'use client'

import { useState } from 'react'

const links = [
  { href: '#catering', label: 'Catering' },
  { href: '#menu', label: 'Menù' },
  { href: '#chi-siamo', label: 'Chi siamo' },
  { href: '#eventi', label: 'Dove trovarci' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-8" aria-label="Principale">
        <a href="#top" className="font-display text-xl font-bold text-navy">
          Panzena <span className="text-sea">Food Truck</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-medium text-navy hover:text-sea">
              {l.label}
            </a>
          ))}
          <a href="#contatti" className="rounded-full bg-sun px-5 py-2 font-semibold text-navy hover:brightness-95">
            Richiedi preventivo
          </a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy md:hidden"
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
        <div id="menu-mobile" className="border-t border-navy/10 bg-cream px-6 pb-6 pt-2 md:hidden">
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
            href="#contatti"
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
