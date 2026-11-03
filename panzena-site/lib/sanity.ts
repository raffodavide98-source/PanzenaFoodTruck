import { createClient, type SanityClient } from '@sanity/client'
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

async function safeFetch<T>(
  contentType: string,
  query: string,
  params: Record<string, unknown>,
  fallback: T,
  filters: string,
): Promise<T> {
  if (!sanityConfigured()) {
    console.warn(`[Sanity] ${contentType}: project ID non configurato; impossibile recuperare i record.`)
    return fallback
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

  try {
    const result = await getClient().fetch<T>(query, params, REVALIDATE)
    const data = result ?? fallback
    const count = Array.isArray(data) ? data.length : undefined

    if (count === 0) {
      console.warn(`[Sanity] ${contentType}: 0 record ricevuti (project ${projectId}, dataset ${dataset}; filtri: ${filters}).`)
    } else {
      console.info(`[Sanity] ${contentType}: ${count ?? 'risultato'} record ricevuti (project ${projectId}, dataset ${dataset}).`)
    }

    return data
  } catch (err) {
    console.error(`[Sanity] Errore durante il recupero di ${contentType} (project ${projectId}, dataset ${dataset}):`, err)
    return fallback
  }
}

/* ---------- Tipi ---------- */


export type EventItem = {
  title: string
  date: string
  startTime?: string
  endTime?: string
  location: string
}

/* ---------- Query ---------- */

// Piatti più famosi: solo quelli visibili, in ordine, massimo 6.
export function getDishes(): Promise<Dish[]> {
  return safeFetch<Dish[]>(
    'piatti famosi',
    `*[_type == "dish" && visible == true] | order(order asc, _createdAt asc)[0...6]{
      name, description, price,
      "imageUrl": photo.asset->url
    }`,
    {},
    [],
    'visible == true, massimo 6 risultati',
  )
}

export type SiteSettings = {
  cateringIntro: string;
  cateringIncluded: string[];
  menuPdfUrl: string;
  cateringSteps: { title: string; text: string }[];
  heroImageUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  // aggiungi qui altre proprietà che usi in altri componenti
};

export type GalleryImage = {
  url: string;
  alt?: string;
  caption?: string;
};

export type Dish = {
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  tags?: string[];
};

export type MenuCategory = {
  title: string;
  dishes: Dish[];
};

export type Testimonial = {
  author: string;
  text: string;
  eventType?: string;
  isSample?: boolean;
};

// Solo eventi futuri (da oggi in poi): i vecchi spariscono da soli.
export function getEvents(): Promise<EventItem[]> {
  const today = todayInRome()

  return safeFetch<EventItem[]>(
    'eventi',
    `*[_type == "event" && visible == true && date >= $today] | order(date asc)[0...20]{
      title, date, startTime, endTime, location
    }`,
    { today },
    [],
    `visible == true, date >= ${today}`,
  )
}
