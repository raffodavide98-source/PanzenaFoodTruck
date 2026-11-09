import type { Metadata } from 'next'
import { SITE } from '@/lib/content'

export const metadata: Metadata = { title: 'Privacy — Panzena Food Truck' }

export default function PrivacyPage() {
  return (
    <main className="px-6 py-16 md:px-8">
      <article className="mx-auto max-w-2xl text-navy">
        <a href="/" className="text-sm font-semibold text-sea underline underline-offset-4">← Torna al sito</a>
        <h1 className="mt-6 font-display text-4xl font-extrabold">Informativa privacy</h1>

        <div className="mt-8 flex flex-col gap-4 text-navy/85">
          <h2 className="mt-4 font-display text-2xl font-bold text-navy">Titolare del trattamento</h2>
          <p>
            {SITE.registeredName || '[ragione sociale da inserire]'}, {SITE.legalAddress || '[indirizzo della sede legale da inserire]'},
            {' '}P. IVA {SITE.vatNumber || '[da inserire]'}, email{' '}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-sea underline underline-offset-4">{SITE.email}</a>,
            {' '}PEC {SITE.pec || '[da inserire]'}.
          </p>
          <p>
            Il conferimento dei dati è facoltativo; senza i dati necessari non potremo rispondere alla richiesta.
          </p>

          <h2 className="mt-4 font-display text-2xl font-bold text-navy">Quali dati raccogliamo e perché</h2>
          <p>
            Quando compili il modulo “Raccontaci il tuo evento” raccogliamo nome, telefono, email e i dettagli dell’evento
            che scegli di indicare. Usiamo i dati solo per rispondere alla richiesta e preparare un preventivo; la base
            giuridica è l’esecuzione di misure precontrattuali richieste dall’interessato (art. 6, par. 1, lett. b GDPR).
            Non vendiamo i dati né li usiamo per finalità pubblicitarie.
          </p>

          <h2 className="mt-4 font-display text-2xl font-bold text-navy">Per quanto tempo</h2>
          <p>
            Conserviamo la richiesta per 12 mesi dall’ultimo contatto. Se si conclude un contratto, i dati necessari sono
            conservati per gli obblighi di legge, anche fiscali, per i relativi termini (di norma 10 anni).
          </p>

          <h2 className="mt-4 font-display text-2xl font-bold text-navy">Chi tratta i dati per noi</h2>
          <p>
            Per erogare il servizio ci avvaliamo di fornitori che trattano dati per nostro conto: Vercel Inc. per
            l’hosting del sito, Resend per l’invio delle email del modulo e Sanity AS per la gestione dei contenuti.
            I dati del modulo sono inviati via email e non vengono salvati in un database del sito.
          </p>

          <h2 className="mt-4 font-display text-2xl font-bold text-navy">Trasferimenti fuori dallo Spazio economico europeo</h2>
          <p>
            Alcuni fornitori possono trattare dati negli Stati Uniti. Quando si verifica un trasferimento fuori dallo
            Spazio economico europeo, questo avviene sulla base di una decisione di adeguatezza (incluso il Data Privacy
            Framework UE-USA, se applicabile al fornitore) o di clausole contrattuali standard e delle eventuali misure
            supplementari richieste.
          </p>

          <h2 className="mt-4 font-display text-2xl font-bold text-navy">Cookie e servizi di terze parti</h2>
          <p>
            Il sito non utilizza cookie né strumenti di analisi o profilazione. Per mostrare le recensioni, il sito
            carica il widget Trustindex: quando visualizzi la sezione delle recensioni, il browser contatta i server di
            Trustindex, che ricevono il tuo indirizzo IP. Consulta la{' '}
            <a
              href="https://www.trustindex.io/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sea underline underline-offset-4"
            >
              informativa privacy di Trustindex
            </a>.
          </p>

          <h2 className="mt-4 font-display text-2xl font-bold text-navy">I tuoi diritti</h2>
          <p>
            Puoi chiedere accesso, rettifica, cancellazione, limitazione del trattamento, opposizione e portabilità
            scrivendo a{' '}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-sea underline underline-offset-4">{SITE.email}</a>.
            {' '}Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali (
            <a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener noreferrer" className="font-semibold text-sea underline underline-offset-4">
              garanteprivacy.it
            </a>).
          </p>
        </div>
      </article>
    </main>
  )
}
