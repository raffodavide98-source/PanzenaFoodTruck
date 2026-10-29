export default {
  name: 'testimonial',
  title: 'Recensione cliente',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Nome',
      type: 'string',
      description: 'Anche solo il nome: es. "Federica" oppure "Elisa e Luca".',
      validation: Rule => Rule.required(),
    },
    {
      name: 'eventType',
      title: 'Evento',
      type: 'string',
      description: 'Es: Matrimonio a Lavagna',
    },
    {
      name: 'text',
      title: 'Cosa ha detto',
      type: 'text',
      rows: 4,
      description: 'Solo recensioni vere e autorizzate dal cliente.',
      validation: Rule => Rule.required().max(300),
    },
    {
      name: 'visible',
      title: 'Visibile sul sito',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'author', subtitle: 'eventType' },
  },
}
