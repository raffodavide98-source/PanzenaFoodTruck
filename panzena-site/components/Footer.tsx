import { SITE } from '@/lib/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy px-6 py-8 text-xs text-cream/70 md:px-8">
      <p className="mx-auto flex max-w-6xl flex-wrap gap-x-3 gap-y-1">
        <span>
          © {year} {SITE.legalName}
          {SITE.vatNumber ? ` · P.IVA ${SITE.vatNumber}` : ''} · Chiavari (GE)
        </span>
        <a href="/privacy" className="underline underline-offset-4 hover:text-cream">Privacy</a>
      </p>
    </footer>
  )
}
