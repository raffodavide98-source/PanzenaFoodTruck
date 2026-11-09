import { SITE } from '@/lib/content'
import { telLink, whatsappLink } from '@/lib/format'

type ContactLink = {
  label: string
  href: string
  icon: 'facebook' | 'instagram' | 'email' | 'whatsapp' | 'phone'
  external?: boolean
}

function ContactIcon({ icon }: { icon: ContactLink['icon'] }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  if (icon === 'facebook') {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
      </svg>
    )
  }

  if (icon === 'instagram') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.8" r=".7" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (icon === 'whatsapp') {
    return (
      <svg {...common}>
        <path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.9a8.2 8.2 0 1 1 16-3.4Z" />
        <path d="M8.2 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.9c.1.2.1.4 0 .5l-.6.7c-.2.2-.2.4 0 .6.5.8 1.3 1.6 2.2 2.1.2.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.4.5 0 .3-.2 1.3-.8 1.8-.5.5-1.2.7-2 .5-1-.2-2.3-.8-3.7-2-1.1-.9-1.9-2.1-2.3-2.9-.5-.9-.7-1.9-.2-2.7l.7-.7Z" />
      </svg>
    )
  }

  if (icon === 'email') {
    return (
      <svg {...common}>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <path d="m3.5 6 8.5 7 8.5-7" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M7 3H4.8A1.8 1.8 0 0 0 3 4.8c0 8.9 7.2 16.2 16.2 16.2a1.8 1.8 0 0 0 1.8-1.8V17l-4.4-1.5-1.5 2a14 14 0 0 1-6.8-6.8l2-1.5L9 4.8 7 3Z" />
      <path d="M14 5a5 5 0 0 1 5 5M14 2a8 8 0 0 1 8 8" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const socialLinks: ContactLink[] = [
    process.env.NEXT_PUBLIC_FACEBOOK_URL
      ? { label: 'Facebook', href: process.env.NEXT_PUBLIC_FACEBOOK_URL, icon: 'facebook', external: true }
      : null,
    process.env.NEXT_PUBLIC_INSTAGRAM_URL
      ? { label: 'Instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM_URL, icon: 'instagram', external: true }
      : null,
    {
      label: 'Email',
      href: `mailto:${SITE.email}`,
      icon: 'email',
    },
    process.env.NEXT_PUBLIC_WHATSAPP_URL || (SITE.phone ? whatsappLink(SITE.phone) : '')
      ? {
          label: 'WhatsApp',
          href: process.env.NEXT_PUBLIC_WHATSAPP_URL || whatsappLink(SITE.phone),
          icon: 'whatsapp',
          external: true,
        }
      : null,
    SITE.phone
      ? { label: 'Telefono', href: telLink(SITE.phone), icon: 'phone' }
      : null,
  ].filter((link): link is ContactLink => link !== null)

  return (
    <footer className="bg-navy px-6 py-12 text-cream md:px-8 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-xl font-extrabold uppercase leading-tight text-sun">
            Per altre informazioni
            <br />
            ci trovi qui
          </h2>
          <address className="mt-5 flex flex-col gap-2 text-lg not-italic text-cream/90 sm:text-xl">
            <a href={`mailto:${SITE.email}`} className="w-fit transition hover:text-sun">
              {SITE.email}
            </a>
            {SITE.phone && (
              <a href={telLink(SITE.phone)} className="w-fit transition hover:text-sun">
                Cell: {SITE.phone}
              </a>
            )}
            {SITE.address && <span>{SITE.address}</span>}
          </address>
        </div>

        <div className="md:justify-self-end">
          <h2 className="font-display text-xl font-extrabold uppercase text-sun">
            Contattaci
          </h2>
          <nav aria-label="Contatti e social" className="mt-5 grid w-fit grid-cols-3 gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                title={link.label}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="flex h-14 w-14 items-center justify-center rounded-xl text-sun transition hover:bg-cream/10 hover:text-cream focus-visible:outline-cream"
              >
                <ContactIcon icon={link.icon} />
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap gap-x-3 gap-y-2 border-t border-cream/15 pt-5 text-xs text-cream/65">
        <span>
          © {year} {SITE.registeredName || SITE.legalName}
          {SITE.legalAddress ? ` · Sede legale: ${SITE.legalAddress}` : ''}
          {SITE.vatNumber ? ` · P.IVA ${SITE.vatNumber}` : ''} · Chiavari (GE)
          {SITE.reaNumber ? ` · REA ${SITE.reaNumber}` : ''}
          {SITE.pec ? ` · PEC ${SITE.pec}` : ''}
        </span>
        <a href="/privacy" className="underline underline-offset-4 hover:text-cream">Privacy</a>
      </div>
    </footer>
  )
}
