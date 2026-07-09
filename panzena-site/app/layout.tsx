import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Panzena — Food Truck & Catering',
  description: 'Lo street food che ti riempie il cuore e la panza. Panuozzi, panzerotti e catering a Chiavari e nel Tigullio.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Work+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-navy font-body">{children}</body>
    </html>
  )
}
