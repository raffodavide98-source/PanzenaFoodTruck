import { getSiteSettings, getMenu, getEvents, getTestimonials } from '@/lib/sanity'
import { SAMPLE_TESTIMONIALS } from '@/lib/defaults'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Highlights from '@/components/Highlights'
import Catering from '@/components/Catering'
import Menu from '@/components/Menu'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'
import Events from '@/components/Events'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const revalidate = 60

export default async function HomePage() {
  const [settings, menu, events, testimonials] = await Promise.all([
    getSiteSettings(),
    getMenu(),
    getEvents(),
    getTestimonials(),
  ])

  // Se non hai ancora caricato foto in galleria, usiamo quelle dei piatti.
  const dishPhotos = menu.flatMap((c) => c.dishes).filter((d) => d.imageUrl).map((d) => ({ url: d.imageUrl as string, alt: d.name, caption: d.name }))
  const galleryImages = settings.gallery.length > 0 ? settings.gallery : dishPhotos.length >= 3 ? dishPhotos : []

  return (
    <main>
      <Header />
      <Hero settings={settings} nextEvent={events.find((e) => e.type === 'tappa')} />
      <Highlights items={settings.highlights} />
      <Catering settings={settings} />
      <Menu menu={menu} pdfUrl={settings.menuPdfUrl} />
      <About settings={settings} />
      <Gallery images={galleryImages} />
      <Testimonials items={testimonials.length > 0 ? testimonials : SAMPLE_TESTIMONIALS} />
      <Events events={events} />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </main>
  )
}
