export default {
  name: 'siteSettings',
  title: 'Impostazioni sito',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'home', title: 'Home e contatti', default: true },
    { name: 'catering', title: 'Catering' },
    { name: 'about', title: 'Chi siamo' },
    { name: 'media', title: 'Foto e menù PDF' },
    { name: 'legal', title: 'Social e dati legali' },
  ],
  fields: [
    // ---- Home e contatti
    { name: 'heroTitle', title: 'Titolo in cima alla home', type: 'string', group: 'home' },
    { name: 'heroSubtitle', title: 'Sottotitolo', type: 'text', rows: 3, group: 'home' },
    {
      name: 'heroImage',
      title: 'Foto di sfondo della home',
      type: 'image',
      options: { hotspot: true },
      description: 'Consigliata: orizzontale, almeno 1600 px di larghezza. Se vuota, il sito usa lo sfondo blu.',
      group: 'home',
    },
    {
      name: 'highlights',
      title: 'Striscia gialla: 4 punti di forza',
      type: 'array',
      group: 'home',
      validation: Rule => Rule.max(4),
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titolo breve', type: 'string', validation: Rule => Rule.required() },
            { name: 'text', title: 'Frase di spiegazione', type: 'string' },
          ],
          preview: { select: { title: 'title', subtitle: 'text' } },
        },
      ],
    },
    { name: 'phone', title: 'Telefono', type: 'string', description: 'Se lo compili compaiono i pulsanti Chiama e WhatsApp.', group: 'home' },
    { name: 'email', title: 'Email', type: 'string', group: 'home' },
    { name: 'serviceArea', title: 'Zona di servizio', type: 'string', group: 'home' },

    // ---- Catering
    { name: 'cateringIntro', title: 'Introduzione catering', type: 'text', rows: 3, group: 'catering' },
    {
      name: 'cateringSteps',
      title: 'Come funziona (passaggi in ordine)',
      type: 'array',
      group: 'catering',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titolo del passaggio', type: 'string', validation: Rule => Rule.required() },
            { name: 'text', title: 'Descrizione', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title', subtitle: 'text' } },
        },
      ],
    },
    {
      name: 'cateringIncluded',
      title: 'Cosa è incluso nel servizio',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'catering',
    },

    // ---- Chi siamo
    { name: 'aboutTitle', title: 'Titolo "Chi siamo"', type: 'string', group: 'about' },
    {
      name: 'aboutText',
      title: 'Testo "Chi siamo"',
      type: 'text',
      rows: 10,
      description: 'Lascia una riga vuota tra un paragrafo e l’altro.',
      group: 'about',
    },
    {
      name: 'aboutImage',
      title: 'Foto del team o del truck',
      type: 'image',
      options: { hotspot: true },
      description: 'Meglio verticale o quadrata. Se vuota, compare un riquadro giallo con il nome.',
      group: 'about',
    },

    // ---- Foto e PDF
    {
      name: 'gallery',
      title: 'Galleria foto (le prime 8 vengono mostrate)',
      type: 'array',
      group: 'media',
      options: { layout: 'grid' },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Descrizione per chi non vede l’immagine', type: 'string' },
            { name: 'caption', title: 'Didascalia (opzionale)', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'menuPdf',
      title: 'Menù catering in PDF',
      type: 'file',
      options: { accept: 'application/pdf' },
      description: 'Se vuoto, il sito usa il PDF di esempio incluso nel progetto.',
      group: 'media',
    },

    // ---- Social e dati legali
    { name: 'instagramUrl', title: 'Link Instagram', type: 'url', group: 'legal' },
    { name: 'facebookUrl', title: 'Link Facebook', type: 'url', group: 'legal' },
    { name: 'legalName', title: 'Ragione sociale (per il footer)', type: 'string', group: 'legal' },
    { name: 'vatNumber', title: 'Partita IVA', type: 'string', group: 'legal' },
  ],
  preview: {
    prepare: () => ({ title: 'Impostazioni sito' }),
  },
}
