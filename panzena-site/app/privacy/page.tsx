import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy — Panzena Food Truck' }

// BOZZA: testo generico. Fallo rivedere (e completa i dati del titolare)
// prima della pubblicazione definitiva.
export default function PrivacyPage() {
  return (
    <main className="px-6 py-16 md:px-8">
      <article className="mx-auto max-w-2xl text-navy">
        <a href="/" className="text-sm font-semibold text-sea underline underline-offset-4">← Torna al sito</a>
        <h1 className="mt-6 font-display text-4xl font-extrabold">Informativa privacy</h1>

        <div className="mt-8 flex flex-col gap-4 text-navy/85">
          <p>
            Questo sito raccoglie dati personali solo quando compili il modulo “Raccontaci il tuo evento”: nome, telefono,
            email e i dettagli dell’evento che scegli di indicare.
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold text-navy">Perché li usiamo</h2>
          <p>
            Usiamo questi dati esclusivamente per risponderti e preparare un preventivo. Non li vendiamo e non li usiamo
            per inviarti pubblicità.
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold text-navy">Per quanto tempo</h2>
          <p>Conserviamo la tua richiesta per il tempo necessario a gestirla e agli obblighi di legge.</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-navy">I tuoi diritti</h2>
          <p>
            Puoi chiedere in ogni momento accesso, correzione o cancellazione dei tuoi dati scrivendo a{' '}
            <a href="mailto:info@panzena.it" className="font-semibold text-sea underline underline-offset-4">info@panzena.it</a>.
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold text-navy">Cookie</h2>
          <p>Il sito non usa cookie di profilazione né strumenti di tracciamento.</p>
        </div>
      </article>
    </main>
  )
}
