export default {
  name: 'menuCategory',
  title: 'Categoria menù',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nome categoria',
      type: 'string',
      description: 'Es: Panuozzi, Panzerotti, Pizza a portafoglio',
      validation: Rule => Rule.required(),
    },
    {
      name: 'order',
      title: 'Ordine di visualizzazione',
      type: 'number',
      description: 'Numero più basso = mostrato prima',
      validation: Rule => Rule.required(),
    },
  ],
  orderings: [
    {
      title: 'Ordine di visualizzazione',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
