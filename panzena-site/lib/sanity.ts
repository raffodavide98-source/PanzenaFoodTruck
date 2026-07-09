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
      useCdn: false,
    })
  }
  return client
}

export type Dish = {
  name: string
  description?: string
  price: number
  imageUrl?: string // Aggiungiamo l'URL dell'immagine opzionale
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

// Funzione per fare un dump completo di TUTTI i documenti presenti su Sanity
export async function getAllSanityData(): Promise<any[]> {
  if (!sanityConfigured()) return []
  
  // Questa query prende letteralmente QUALSIASI documento che non sia un sistema interno di Sanity
  return getClient().fetch(`*[!(_id in path("system.**"))]`)
}

export async function getMenu(): Promise<MenuCategory[]> {
  if (!sanityConfigured()) return []
  // Modificata la query per puntare direttamente a category._ref e recuperare l'url dell'immagine
  return getClient().fetch(`*[_type == "menuCategory"] | order(order asc){
    title,
    "dishes": *[_type == "dish" && category._ref == ^._id && available == true]{
      name, 
      description, 
      price,
      "imageUrl": photo.asset->url
    }
  }`)
}

export async function getEvents(): Promise<EventItem[]> {
  if (!sanityConfigured()) return []
  // Rimosso il controllo stringente se crea conflitti, lasciando il filtro visible
  return getClient().fetch(`*[_type == "event" && visible == true] | order(date asc){
    title, date, startTime, endTime, location, type
  }`)
}
