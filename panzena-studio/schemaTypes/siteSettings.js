export default {
  name: 'siteSettings',
  title: 'Impostazioni sito',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'heroTitle',
      title: 'Titolo hero',
      type: 'string',
    },
    {
      name: 'heroSubtitle',
      title: 'Sottotitolo hero',
      type: 'text',
      rows: 2,
    },
    {
      name: 'phone',
      title: 'Telefono',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'serviceArea',
      title: 'Zona di servizio',
      type: 'string',
    },
    {
      name: 'aboutText',
      title: 'Testo chi siamo',
      type: 'text',
      rows: 4,
    },
  ],
  preview: {
    prepare: () => ({ title: 'Impostazioni sito' }),
  },
}
