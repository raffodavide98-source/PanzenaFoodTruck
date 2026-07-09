export default {
  name: 'event',
  title: 'Evento / tappa',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      description: 'Es: Truck a Piazza Matteotti, oppure Catering privato',
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
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Tappa food truck', value: 'tappa' },
          { title: 'Evento privato / catering', value: 'catering' },
        ],
      },
      initialValue: 'tappa',
    },
    {
      name: 'visible',
      title: 'Visibile sul sito',
      type: 'boolean',
      initialValue: true,
      description: 'Disattiva se l\'evento è privato e non va mostrato pubblicamente',
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
