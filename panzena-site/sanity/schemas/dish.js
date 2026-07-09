export default {
  name: 'dish',
  title: 'Piatto',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome piatto',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Descrizione breve',
      type: 'string',
      description: 'Es: ingredienti principali, max 1 riga',
    },
    {
      name: 'price',
      title: 'Prezzo (€)',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    },
    {
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'available',
      title: 'Disponibile in menù',
      type: 'boolean',
      initialValue: true,
      description: 'Disattiva per nascondere temporaneamente senza cancellare il piatto',
    },
    {
      name: 'tags',
      title: 'Etichette',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Vegetariano', value: 'vegetariano' },
          { title: 'Piccante', value: 'piccante' },
          { title: 'Novità', value: 'novita' },
        ],
      },
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category.title', media: 'photo' },
  },
}
