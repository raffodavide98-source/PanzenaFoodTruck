import type { Metadata } from 'next'
import { Baloo_2, Work_Sans } from 'next/font/google'
import './globals.css'

const displayFont = Baloo_2({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
})

const bodyFont = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Panzena — Food Truck & Catering a Chiavari e nel Tigullio',
  description:
    'Lo street food che ti riempie il cuore e la panza. Panuozzi, panzerotti e pizza a portafoglio: food truck e catering per feste, matrimoni ed eventi aziendali.',
  openGraph: {
    title: 'Panzena — Food Truck & Catering',
    description: 'Panuozzi, panzerotti e catering per eventi a Chiavari e nel Tigullio.',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-cream text-navy font-body">{children}</body>
    </html>
  )
}
