export default {
  name: 'dish',
  title: 'Piatto famoso',
  type: 'document',
  description: 'Sul sito compaiono i primi 6 piatti visibili, in base all’ordine.',
  fields: [
    {
      name: 'name',
      title: 'Nome piatto',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descrizione breve',
      type: 'string',
      description: 'Ingredienti principali, max 1 riga',
    },
    {
      name: 'price',
      title: 'Prezzo (€)',
      type: 'number',
      description: 'Facoltativo: se vuoto il prezzo non viene mostrato',
      validation: Rule => Rule.positive(),
    },
    {
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'order',
      title: 'Ordine di visualizzazione',
      type: 'number',
      description: 'Numero più basso = mostrato prima',
      initialValue: 10,
    },
    {
      name: 'visible',
      title: 'Visibile sul sito',
      type: 'boolean',
      initialValue: true,
      description: 'Disattiva per nascondere temporaneamente senza cancellare il piatto',
    },
  ],
  orderings: [
    {
      title: 'Ordine di visualizzazione',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'description', media: 'photo' },
  },
}
