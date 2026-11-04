import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID || 'ChIJrejq21Cj1BIR_S1fBZrfRT4'

  console.log('[GoogleReviews API] start request', { placeId, hasApiKey: Boolean(apiKey) })

  if (!apiKey) {
    console.warn('[GoogleReviews API] missing GOOGLE_MAPS_API_KEY')
    return NextResponse.json({
      name: 'Panzena',
      rating: null,
      total: 0,
      reviews: [],
      message: 'Google Maps API key non configurata',
    })
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`
  console.log('[GoogleReviews API] requesting Google Places URL:', url)

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    console.log('[GoogleReviews API] response status:', res.status)

    if (!res.ok) {
      throw new Error(`Google Places request failed: ${res.status}`)
    }

    const data = await res.json()
    console.log('[GoogleReviews API] full payload:', JSON.stringify(data).slice(0, 2000))

    const result = data?.result ?? {}
    const reviews = Array.isArray(result.reviews)
      ? result.reviews.slice(0, 6).map((review: any) => ({
          author: review.author_name ?? 'Google reviewer',
          rating: review.rating ?? 0,
          text: review.text ?? '',
          time: review.relative_time_description ?? '',
          photo: review.profile_photo_url ?? null,
        }))
      : []

    console.log('[GoogleReviews API] mapped reviews count:', reviews.length)

    return NextResponse.json({
      name: result.name ?? 'Panzena',
      rating: result.rating ?? null,
      total: result.user_ratings_total ?? reviews.length,
      reviews,
    })
  } catch (error) {
    console.error('[GoogleReviews API] fetch failed:', error)
    return NextResponse.json({
      name: 'Panzena',
      rating: null,
      total: 0,
      reviews: [],
      message: 'Impossibile recuperare le recensioni in questo momento.',
    })
  }
}
