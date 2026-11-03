export default {
  name: 'event',
  title: 'Evento',
  type: 'document',
  description: 'Sul sito compaiono gli eventi visibili da oggi in poi: quelli passati spariscono da soli.',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      description: 'Es: Truck a Piazza Matteotti',
      validation: Rule => Rule.required(),
    },
    {
      name: 'date',
      title: 'Data',
      type: 'date',
      validation: Rule => Rule.required(),
    },
    {
      name: 'startTime',
      title: 'Orario inizio',
      type: 'string',
      description: 'Es: 19:00',
    },
    {
      name: 'endTime',
      title: 'Orario fine',
      type: 'string',
      description: 'Es: 23:00',
    },
    {
      name: 'location',
      title: 'Luogo',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'visible',
      title: 'Visibile sul sito',
      type: 'boolean',
      initialValue: true,
      description: 'Disattiva per nascondere l’evento senza cancellarlo',
    },
  ],
  orderings: [
    {
      title: 'Data (prossimi prima)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date' },
  },
}
