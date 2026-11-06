import { getDishes, getEvents } from '@/lib/sanity'
import Header from '@/components/Header'
import FamousDishes from '@/components/FamousDishes'
import Events from '@/components/Events'
import About from '@/components/About'
import Offers from '@/components/Offers'
import GoogleReviews from '@/components/GoogleReviews'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const revalidate = 60

export default async function HomePage() {
  const [dishes, events] = await Promise.all([getDishes(), getEvents()])

  return (
    <main id="top">
      <Header />
      <Events events={events} />
      <FamousDishes dishes={dishes} />
      <About />
      <Offers />
      <GoogleReviews />
      <Contact />
      <Footer />
    </main>
  )
}
