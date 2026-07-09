import { createClient, type SanityClient } from '@sanity/client'

// Il client viene creato solo quando serve davvero (dentro le funzioni
// getMenu/getEvents), non al caricamento del modulo: così il sito builda
// e gira in locale anche prima di aver configurato Sanity.
let client: SanityClient | null = null

function getClient(): SanityClient {
  console.log("PROJECT_ID =", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

  if (!client) {
    client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  }
  return client
}

export type Dish = {
  name: string
  description?: string
  price: number
}

export type MenuCategory = {
  title: string
  dishes: Dish[]
}

export type EventItem = {
  title: string
  date: string
  startTime?: string
  endTime?: string
  location: string
  type: 'tappa' | 'catering'
}

// Se il progetto Sanity non è ancora configurato, ritorna array vuoti
// invece di far crashare la pagina: così puoi testare il layout in
// locale anche prima di aver collegato i dati veri.
function sanityConfigured() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  return (
    typeof projectId === "string" &&
    projectId.trim() !== ""
  )
}

export async function getMenu(): Promise<MenuCategory[]> {
  if (!sanityConfigured()) return []
  return getClient().fetch(`*[_type == "menuCategory"] | order(order asc){
    title,
    "dishes": *[_type == "dish" && references(^._id) && available == true]{
      name, description, price
    }
  }`)
}

export async function getEvents(): Promise<EventItem[]> {
  if (!sanityConfigured()) return []
  return getClient().fetch(`*[_type == "event" && visible == true] | order(date asc){
    title, date, startTime, endTime, location, type
  }`)
}
