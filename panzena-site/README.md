# Panzena — sito web

Sito vetrina Next.js + Tailwind, con menù ed eventi gestiti dal cliente
tramite Sanity (CMS headless), e form di contatto via Resend.

## Sì, puoi testarlo in locale

Il sito gira in locale senza bisogno di aver già configurato Sanity o
Resend: se le variabili d'ambiente mancano, la pagina si carica lo
stesso mostrando le sezioni vuote invece di crashare. Utile per
lavorare sul layout prima di aver collegato i dati veri.

## 1. Requisiti

- Node.js 18.18 o superiore (consigliato: 20 LTS)
- Un account [sanity.io](https://sanity.io) (gratuito) — solo quando vuoi
  collegare i dati veri, non serve per il primo avvio
- Un account [resend.com](https://resend.com) (gratuito) — solo per il
  form di contatto

Verifica la tua versione di Node:

```bash
node -v
```

## 2. Installazione

```bash
npm install
```

## 3. Variabili d'ambiente

```bash
cp .env.local.example .env.local
```

Per il primo test in locale puoi lasciare `.env.local` vuoto o con i
valori segnaposto: il sito parte comunque (vedi sopra). Quando sei
pronto a collegare i dati veri, segui il punto 5.

## 4. Avvio in locale

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000). Ogni modifica ai
file si ricarica automaticamente nel browser.

Per verificare che builda come farà Vercel in produzione:

```bash
npm run build
npm start
```

## 5. Collegare Sanity (menù ed eventi gestiti dal cliente)

Sanity Studio (il pannello di amministrazione) è un progetto separato
dal sito — è normale, sono due applicazioni distinte che condividono
solo i dati.

1. In una cartella diversa (es. accanto a `panzena-site/`):
   ```bash
   npm create sanity@latest -- --project panzena-studio
   ```
   Segui il wizard: crea un nuovo progetto, dataset `production`.

2. Sostituisci il contenuto della cartella `schemaTypes/` (o
   `schemas/`) generata dal wizard con i file che trovi qui in
   `sanity/schemas/`.

3. Avvia lo studio in locale per testare:
   ```bash
   npm run dev
   ```
   Di solito parte su `http://localhost:3333`. Da lì puoi già creare
   categorie, piatti ed eventi di prova.

4. Prendi il **Project ID** (lo trovi in `sanity.config.ts` del
   progetto studio, o nella dashboard su sanity.io) e mettilo in
   `panzena-site/.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=il_tuo_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

5. Riavvia `npm run dev` nel progetto del sito: il menù e gli eventi
   che hai creato nello studio ora appaiono in homepage.

6. Deploy dello studio (opzionale ma consigliato, così il cliente ci
   accede da un link invece che da localhost):
   ```bash
   npm run deploy
   ```
   Ti dà un URL tipo `panzena-studio.sanity.studio` — quello è il
   pannello che userà il cliente ogni settimana.

## 6. Collegare Resend (form preventivo)

1. Crea un account su resend.com, verifica il dominio `panzena.it`
   (Resend ti dà dei record DNS da aggiungere, come per l'email).
2. Genera una API key.
3. Mettila in `.env.local`:
   ```
   RESEND_API_KEY=la_tua_key
   CONTACT_EMAIL_TO=info@panzena.it
   ```
4. Senza la key, il form funziona comunque in locale ma si limita a
   loggare la richiesta in console invece di inviare l'email — utile
   per testare il flusso senza spedire email vere durante lo sviluppo.

## 7. Deploy su Vercel

1. Pusha il repo su GitHub.
2. Su vercel.com, "Add new project", collega il repo.
3. Aggiungi le stesse variabili di `.env.local` nelle impostazioni del
   progetto Vercel (Settings → Environment Variables).
4. Deploy. Vercel builda automaticamente ad ogni push su `main`.
5. Collega il dominio `panzena.it` in Settings → Domains, e aggiorna i
   record DNS presso il registrar come indicato da Vercel.

## 8. Aggiornamento automatico quando il cliente pubblica

Per far sì che il sito si rigeneri da solo quando il cliente modifica
il menù da Sanity Studio (senza bisogno di un tuo intervento):

1. Su Vercel, Settings → Git → Deploy Hooks: crea un hook, copia l'URL.
2. Su Sanity, dashboard del progetto → API → Webhooks: incolla l'URL,
   fai scattare l'evento su `create`, `update`, `delete`.

Da quel momento, ogni pubblicazione in Sanity triggera un rebuild
automatico su Vercel (di solito pronto in meno di un minuto).

## Struttura del progetto

```
panzena-site/
├── app/
│   ├── page.tsx              → homepage
│   ├── layout.tsx            → layout globale, font, metadata
│   ├── globals.css
│   └── api/preventivo/       → endpoint che invia l'email del form
├── components/
│   └── ContactForm.tsx
├── lib/
│   └── sanity.ts             → connessione e query a Sanity
├── sanity/
│   └── schemas/              → schema da incollare nel progetto Sanity Studio
└── .env.local.example
```
