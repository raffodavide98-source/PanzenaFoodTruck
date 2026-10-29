import { createClient, type SanityClient } from '@sanity/client'
import { DEFAULT_SETTINGS, type Highlight, type Step } from './defaults'
import { todayInRome } from './format'

let client: SanityClient | null = null

function sanityConfigured() {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  return typeof id === 'string' && id.trim() !== ''
}

function getClient(): SanityClient {
  if (!client) {
    client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    })
  }
  return client
}

// Le pagine si aggiornano da sole ogni 60 secondi dopo una modifica in Sanity.
const REVALIDATE = { next: { revalidate: 60 } }

async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  if (!sanityConfigured()) return fallback
  try {
    const result = await getClient().fetch<T>(query, params, REVALIDATE)
    return result ?? fallback
  } catch (err) {
    console.error('Errore Sanity:', err)
    return fallback
  }
}

/* ---------- Tipi ---------- */

export type Dish = {
  name: string
  description?: string
  price: number
  imageUrl?: string
  tags?: string[]
}

export type MenuCategory = { title: string; dishes: Dish[] }

export type EventItem = {
  title: string
  date: string
  startTime?: string
  endTime?: string
  location: string
  type: 'tappa' | 'catering'
}

export type GalleryImage = { url: string; alt?: string; caption?: string }

export type Testimonial = { author: string; eventType?: string; text: string; isSample?: boolean }

export type SiteSettings = {
  heroTitle: string
  heroSubtitle: string
  heroImageUrl?: string
  phone: string
  email: string
  serviceArea: string
  highlights: Highlight[]
  cateringIntro: string
  cateringSteps: Step[]
  cateringIncluded: string[]
  aboutTitle: string
  aboutText: string
  aboutImageUrl?: string
  gallery: GalleryImage[]
  menuPdfUrl: string
  instagramUrl?: string
  facebookUrl?: string
  legalName?: string
  vatNumber?: string
}

/* ---------- Impostazioni sito ---------- */

type RawSettings = Partial<Omit<SiteSettings, 'gallery'>> & {
  gallery?: (GalleryImage | null)[] | null
} | null

const nonEmpty = <T,>(arr: T[] | null | undefined, fallback: T[]) => (arr && arr.length > 0 ? arr : fallback)
const text = (v: string | null | undefined, fallback: string) => (v && v.trim() ? v : fallback)

export async function getSiteSettings(): Promise<SiteSettings> {
  const raw = await safeFetch<RawSettings>(
    `*[_type == "siteSettings"][0]{
      heroTitle, heroSubtitle,
      "heroImageUrl": heroImage.asset->url,
      phone, email, serviceArea,
      highlights[]{title, text},
      cateringIntro,
      cateringSteps[]{title, text},
      cateringIncluded,
      aboutTitle, aboutText,
      "aboutImageUrl": aboutImage.asset->url,
      "gallery": gallery[]{ "url": asset->url, alt, caption },
      "menuPdfUrl": menuPdf.asset->url,
      instagramUrl, facebookUrl, legalName, vatNumber
    }`,
    {},
    null,
  )

  const d = DEFAULT_SETTINGS
  return {
    heroTitle: text(raw?.heroTitle, d.heroTitle),
    heroSubtitle: text(raw?.heroSubtitle, d.heroSubtitle),
    heroImageUrl: raw?.heroImageUrl || undefined,
    phone: text(raw?.phone, d.phone),
    email: text(raw?.email, d.email),
    serviceArea: text(raw?.serviceArea, d.serviceArea),
    highlights: nonEmpty(raw?.highlights, d.highlights),
    cateringIntro: text(raw?.cateringIntro, d.cateringIntro),
    cateringSteps: nonEmpty(raw?.cateringSteps, d.cateringSteps),
    cateringIncluded: nonEmpty(raw?.cateringIncluded, d.cateringIncluded),
    aboutTitle: text(raw?.aboutTitle, d.aboutTitle),
    aboutText: text(raw?.aboutText, d.aboutText),
    aboutImageUrl: raw?.aboutImageUrl || undefined,
    gallery: (raw?.gallery ?? []).filter((g): g is GalleryImage => !!g && !!g.url),
    menuPdfUrl: text(raw?.menuPdfUrl, d.menuPdfUrl),
    instagramUrl: raw?.instagramUrl || undefined,
    facebookUrl: raw?.facebookUrl || undefined,
    legalName: raw?.legalName || undefined,
    vatNumber: raw?.vatNumber || undefined,
  }
}

/* ---------- Menù, eventi, testimonianze ---------- */

export function getMenu(): Promise<MenuCategory[]> {
  return safeFetch<MenuCategory[]>(
    `*[_type == "menuCategory"] | order(order asc){
      title,
      "dishes": *[_type == "dish" && category._ref == ^._id && available == true]{
        name, description, price, tags,
        "imageUrl": photo.asset->url
      }
    }`,
    {},
    [],
  )
}

// Solo tappe future (da oggi in poi): le vecchie spariscono da sole.
export function getEvents(): Promise<EventItem[]> {
  return safeFetch<EventItem[]>(
    `*[_type == "event" && visible == true && date >= $today] | order(date asc)[0...20]{
      title, date, startTime, endTime, location, type
    }`,
    { today: todayInRome() },
    [],
  )
}

export function getTestimonials(): Promise<Testimonial[]> {
  return safeFetch<Testimonial[]>(
    `*[_type == "testimonial" && visible == true] | order(_createdAt desc)[0...6]{
      author, eventType, text
    }`,
    {},
    [],
  )
}
