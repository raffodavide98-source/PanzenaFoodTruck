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

## 5. Collegare Sanity (piatti famosi ed eventi)

Lo Studio (il pannello del cliente) è nella cartella `../panzena-studio`,
progetto separato: segui il suo README per crearlo e avviarlo. Poi:

1. Prendi il **Project ID** (è in `panzena-studio/.env`) e mettilo in
   `panzena-site/.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=il_tuo_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
2. Riavvia `npm run dev`: piatti ed eventi creati nello Studio compaiono in
   homepage.

Cosa è modificabile da Sanity: **Piatti famosi** (max 6 mostrati) ed **Eventi**
(solo da oggi in poi). Il testo del team, i contatti e i dati legali stanno in
`lib/content.ts`. I link social nel footer si configurano con
`NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_INSTAGRAM_URL` e
`NEXT_PUBLIC_WHATSAPP_URL` in `.env.local`.

Per verificare il collegamento, controlla il terminale dove gira Next.js
(`npm run dev`) o i log del deployment: vengono registrati il numero di record
ricevuti per piatti ed eventi, oppure un avviso con i filtri applicati o
l'errore Sanity. Questi messaggi sono lato server e non compaiono nella console
del browser.

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
│   ├── page.tsx              → homepage (4 sezioni)
│   ├── layout.tsx
│   ├── globals.css
│   ├── privacy/              → informativa privacy
│   └── api/preventivo/       → endpoint che invia l'email del form
├── components/
│   ├── Header.tsx            → un pulsante per sezione
│   ├── FamousDishes.tsx      → piatti famosi (da Sanity)
│   ├── Events.tsx            → eventi (da Sanity)
│   ├── About.tsx             → team (testo in lib/content.ts)
│   ├── Contact.tsx + ContactForm.tsx → richiesta preventivo
│   └── Footer.tsx
├── lib/
│   ├── sanity.ts             → query a Sanity
│   ├── content.ts            → testi fissi, contatti, dati legali
│   └── format.ts
└── .env.local.example
```
