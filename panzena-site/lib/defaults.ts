// Contenuti di esempio. Vengono usati finché in Sanity (Impostazioni sito)
// non compila il campo corrispondente: appena lo compili, questi testi
// vengono sostituiti automaticamente. Sono testi inventati: cambiali.

export type Highlight = { title: string; text: string }
export type Step = { title: string; text: string }

export const DEFAULT_SETTINGS = {
  heroTitle: 'Lo street food che ti riempie il cuore e la panza',
  heroSubtitle:
    'Panuozzi, panzerotti e pizza a portafoglio con impasti a lunga lievitazione e ingredienti a km0. Ci trovi in piazza o a casa tua, per la tua festa.',
  phone: '',
  email: 'info@panzena.it',
  serviceArea: 'Chiavari e tutto il Tigullio, su richiesta in Liguria e dintorni',

  highlights: [
    { title: 'Impasto di 72 ore', text: 'Lievitazione lunga: più leggero e più digeribile.' },
    { title: 'Ingredienti del territorio', text: 'Fornitori del Tigullio, dove possibile a km0.' },
    { title: 'Da 20 a 200 ospiti', text: 'Il truck si adatta a una festa in giardino o a un evento aziendale.' },
    { title: 'Cuciniamo a vista', text: 'Tutto preparato al momento, davanti ai tuoi ospiti.' },
  ] as Highlight[],

  cateringIntro:
    'Portiamo il food truck dove fai festa: giardino, azienda, piazza, spiaggia. Prepariamo tutto al momento, davanti ai tuoi ospiti, con un servizio informale ma preciso nei tempi.',

  cateringSteps: [
    {
      title: 'Ci racconti l’evento',
      text: 'Data, luogo e numero di ospiti. Entro 24 ore ricevi una proposta di menù e un preventivo senza impegno.',
    },
    {
      title: 'Sopralluogo e menù',
      text: 'Se serve passiamo a vedere la location: spazio per il truck, corrente, accessi. Poi scegliamo insieme i panuozzi e i panzerotti.',
    },
    {
      title: 'Arriviamo e allestiamo',
      text: 'Il truck arriva circa un’ora e mezza prima dell’inizio, si parcheggia, si accende il forno e si preparano gli ingredienti.',
    },
    {
      title: 'Si mangia, a vista',
      text: 'Panuozzi e panzerotti escono caldi dalla finestra del truck, oppure passiamo tra gli ospiti con i vassoi.',
    },
  ] as Step[],

  cateringIncluded: [
    'Truck attrezzato con forno e frigoriferi',
    'Personale in divisa e formato HACCP',
    'Stoviglie compostabili',
    'Pulizia dell’area a fine servizio',
    'Opzioni vegetariane su richiesta',
  ],

  aboutTitle: 'Due amici, un’Ape e tanta farina',
  aboutText: [
    'Panzena nasce nel 2019 a Chiavari da un’idea semplice: portare in strada il panuozzo come si mangia a Gragnano. Pane caldo, ripieno generoso, nessuna fretta nella lievitazione. All’inizio c’erano un’Ape usata, un forno ricondizionato e il parere severo di una nonna campana a fare da controllo qualità.',
    'Oggi il truck gira per piazze, sagre e feste private del Tigullio. L’impasto riposa 72 ore, le farce cambiano con le stagioni e quasi tutti i fornitori sono a mezz’ora di strada.',
    'Il nostro obiettivo è uno solo: che torni a casa con la pancia piena e il cuore contento.',
  ].join('\n\n'),

  galleryPlaceholders: [
    'Panuozzo chimichurry',
    'Panzerotti appena fritti',
    'Il truck in piazza',
    'L’impasto a riposo',
    'Pizza a portafoglio',
    'La festa è servita',
  ],

  menuPdfUrl: '/menu-catering-panzena.pdf',
}

export type SampleTestimonial = {
  author: string
  eventType: string
  text: string
  isSample: true
}

// Testimonianze di ESEMPIO: finché non ne pubblichi almeno una vera in
// Sanity, il sito mostra queste con l’etichetta "testo di esempio".
export const SAMPLE_TESTIMONIALS: SampleTestimonial[] = [
  {
    author: 'Federica',
    eventType: 'Compleanno a Carasco',
    text: 'Abbiamo scelto Panzena per i 40 anni di Marta: ospiti in fila anche per il bis e nessuno ha aspettato troppo. Puntuali e simpaticissimi.',
    isSample: true,
  },
  {
    author: 'Andrea',
    eventType: 'Evento aziendale a Chiavari',
    text: 'Cercavamo qualcosa di diverso dal solito buffet. Il panuozzo caldo ha fatto più effetto di qualsiasi finger food.',
    isSample: true,
  },
  {
    author: 'Elisa e Luca',
    eventType: 'Matrimonio a Lavagna',
    text: 'Preventivo arrivato in giornata e chiarissimo. Il giorno dopo il matrimonio ci chiedevano ancora dei panzerotti.',
    isSample: true,
  },
]

export const EVENT_TYPES = ['Festa privata', 'Evento aziendale', 'Matrimonio', 'Evento di piazza', 'Altro']
