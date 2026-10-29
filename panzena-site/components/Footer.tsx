import type { SiteSettings } from '@/lib/sanity'

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear()
  const link = 'hover:text-cream underline-offset-4 hover:underline'

  return (
    <footer className="bg-navy px-6 py-14 text-cream/70 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 text-sm md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold text-cream">Panzena Food Truck</p>
          <p className="mt-2 max-w-xs">Street food e catering per eventi. Chiavari e Tigullio.</p>
        </div>

        <div>
          <p className="font-semibold text-cream">Contatti</p>
          <ul className="mt-3 flex flex-col gap-1.5">
            {settings.phone && <li><a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className={link}>{settings.phone}</a></li>}
            <li><a href={`mailto:${settings.email}`} className={link}>{settings.email}</a></li>
            {settings.instagramUrl && <li><a href={settings.instagramUrl} target="_blank" rel="noopener" className={link}>Instagram</a></li>}
            {settings.facebookUrl && <li><a href={settings.facebookUrl} target="_blank" rel="noopener" className={link}>Facebook</a></li>}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-cream">Informazioni</p>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li><a href="#catering" className={link}>Catering per eventi</a></li>
            <li><a href={settings.menuPdfUrl} target="_blank" rel="noopener" className={link}>Menù catering (PDF)</a></li>
            <li><a href="/privacy" className={link}>Privacy</a></li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-cream/15 pt-6 text-xs">
        © {year} {settings.legalName || 'Panzena Food Truck & Catering'}
        {settings.vatNumber ? ` · P.IVA ${settings.vatNumber}` : ''} · Chiavari (GE)
      </p>
    </footer>
  )
}
