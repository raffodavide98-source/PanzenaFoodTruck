// Le date arrivano da Sanity come "2026-07-12". Le leggiamo a mezzogiorno
// per evitare che il fuso orario del server sposti il giorno.
export function parseDate(iso: string) {
  return new Date(`${iso}T12:00:00`)
}

export function dateParts(iso: string) {
  const d = parseDate(iso)
  return {
    weekday: d.toLocaleDateString('it-IT', { weekday: 'short' }).replace('.', ''),
    day: d.toLocaleDateString('it-IT', { day: 'numeric' }),
    month: d.toLocaleDateString('it-IT', { month: 'short' }).replace('.', ''),
  }
}

export function todayInRome() {
  // formato YYYY-MM-DD
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Rome' })
}

export function euro(n: number) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(n)
}

export function whatsappLink(phone: string) {
  const digits = phone.replace(/[^\d]/g, '')
  if (!digits) return ''
  const withCountry = digits.startsWith('39') && digits.length > 10 ? digits : `39${digits.replace(/^0+/, '')}`
  return `https://wa.me/${withCountry}`
}

export function telLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}
