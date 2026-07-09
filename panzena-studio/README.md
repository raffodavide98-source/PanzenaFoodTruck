# Panzena Studio — pannello di gestione contenuti

Questo è lo Sanity Studio: il pannello dove il cliente aggiorna menù ed
eventi. È un progetto separato dal sito Next.js — girano indipendenti,
condividono solo i dati (via Sanity).

## 1. Requisiti

- Node.js 18.18+ (consigliato 20 LTS)
- Un account gratuito su [sanity.io](https://sanity.io)

## 2. Installazione

```bash
npm install
```

## 3. Creare il progetto su Sanity (una volta sola)

Questo passo va fatto interattivamente sul tuo computer perché apre il
browser per il login — non è automatizzabile da riga di comando pura.

```bash
npx sanity login
```

Sceglie il provider (Google, GitHub o email) e autorizza nel browser.

Poi crea il progetto:

```bash
npx sanity init --env
```

- Quando chiede "Use the default dataset configuration?" rispondi sì
  (crea un dataset `production`, va bene per un progetto di queste
  dimensioni).
- Quando chiede "Would you like to add configuration files for a
  Sanity project in this Studio folder?", rispondi che il progetto
  esiste già (i file `sanity.config.ts` e `sanity.cli.ts` ci sono già
  in questa cartella, non farteli sovrascrivere se non vuoi perdere lo
  schema).
- `--env` scrive automaticamente `SANITY_STUDIO_PROJECT_ID` e
  `SANITY_STUDIO_DATASET` in un file `.env` per te.

In alternativa, se preferisci farlo a mano: crea il progetto dalla
dashboard su [sanity.io/manage](https://sanity.io/manage), poi copia
`.env.example` in `.env` e incolla tu il Project ID che trovi lì.

## 4. Avvio in locale

```bash
npm run dev
```

Apre lo Studio su [http://localhost:3333](http://localhost:3333). Da
qui puoi già creare categorie di menù, piatti ed eventi — sono gli
stessi dati che il sito Next.js leggerà (vedi il README del progetto
`panzena-site`, che deve avere lo stesso `NEXT_PUBLIC_SANITY_PROJECT_ID`
nel suo `.env.local`).

## 5. Dare accesso al cliente

Due opzioni:

**A. Deploy dello Studio (consigliata)**
```bash
npm run deploy
```
Ti chiede un nome sottodominio (es. `panzena`) e ti dà un URL fisso
tipo `panzena.sanity.studio`. Il cliente va lì, fa login con le sue
credenziali (che inviti tu dal pannello sanity.io/manage → Members) e
lavora da browser, senza bisogno del tuo computer o di npm.

**B. Inviti al progetto**
Da [sanity.io/manage](https://sanity.io/manage) → il tuo progetto →
Members → Invite, aggiungi l'email del cliente con ruolo "Editor" (può
modificare contenuti ma non toccare schema o impostazioni del
progetto — è il ruolo giusto per lui).

## 6. Verifica che tutto sia a posto

```bash
npm run build
```

Se builda senza errori, schema e configurazione sono validi.

## Struttura

```
panzena-studio/
├── sanity.config.ts     → plugin, titolo dello studio, schema collegati
├── sanity.cli.ts         → legge project ID / dataset dalle env
├── schemaTypes/
│   ├── index.ts          → registra tutti gli schema
│   ├── menuCategory.js
│   ├── dish.js
│   ├── event.js
│   └── siteSettings.js
└── .env                  → project ID e dataset (non committare)
```
