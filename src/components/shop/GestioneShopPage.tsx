import { useEffect } from 'react';
import { ExternalLink, FileSpreadsheet, CreditCard, Clock } from 'lucide-react';
import { SHEET_URL } from '../../config/shop';

const STRIPE_DASHBOARD_URL = 'https://dashboard.stripe.com/';

const GUIDE_SECTIONS = [
  {
    num: '01',
    title: 'Aggiungere un prodotto',
    steps: [
      'Apri il Google Sheet e vai nella scheda "Prodotti".',
      'Compila una nuova riga partendo dalla colonna id (usa un codice univoco senza spazi, es. box-6-misto).',
      'Imposta attivo = TRUE e disponibile = TRUE, poi scegli il numero in ordine (più basso = appare prima).',
      'Compila categoria esattamente con una di queste voci: Birre, Pack misti, Merch oppure Regali.',
      'Inserisci nome, stile, abv, formato, prezzo, descrizione_breve, descrizione e allergeni (es. "Orzo (glutine)").',
    ],
  },
  {
    num: '02',
    title: 'Modificare un prezzo o inserire uno sconto',
    steps: [
      'Nella scheda "Prodotti", modifica il valore nella colonna prezzo (es. 18.50).',
      'Se vuoi mostrare un prezzo scontato, inserisci il vecchio prezzo più alto nella colonna prezzo_barrato; lasciala vuota per non mostrare sconti.',
      'I totali del checkout vengono sempre ricalcolati dal foglio: nessuno può modificare i prezzi dal browser.',
    ],
  },
  {
    num: '03',
    title: 'Segnare un prodotto come esaurito',
    steps: [
      'Per mostrare il prodotto nello shop con il pulsante "Esaurito" (non acquistabile), imposta disponibile = FALSE.',
      'Per nascondere completamente il prodotto dal sito senza cancellare la riga, imposta attivo = FALSE.',
      'Quando torna in magazzino, riporta disponibile = TRUE.',
    ],
  },
  {
    num: '04',
    title: 'Caricare le immagini su Cloudinary e incollare il link',
    steps: [
      'Accedi al tuo account Cloudinary, entra in Media Library e clicca su Upload per caricare la foto (formato consigliato 4:3 o quadrato, sfondo scuro o pulito).',
      'Passa il mouse sull’immagine caricata e clicca su Copy URL.',
      'Incolla il link completo (che inizia con https://res.cloudinary.com/...) nella colonna foto1 del prodotto.',
      'Puoi aggiungere altre due immagini in foto2 e foto3: appariranno nella galleria della scheda prodotto.',
    ],
  },
  {
    num: '05',
    title: 'Chiudere temporaneamente lo shop',
    steps: [
      'Apri la scheda "Impostazioni" del Google Sheet.',
      'Individua la riga shop_aperto e cambia il valore nella colonna B da TRUE a FALSE.',
      'Il sito mostrerà automaticamente l’avviso "Shop momentaneamente chiuso" e bloccherà nuovi ordini.',
      'Per riaprire lo shop, imposta nuovamente shop_aperto su TRUE.',
    ],
  },
  {
    num: '06',
    title: 'Vedere gli ordini e segnarli come spediti',
    steps: [
      'Apri la scheda "Ordini": ogni pagamento completato genera una riga con stato = Pagato, articoli ordinati, totale e indirizzo completo del cliente.',
      'Riceverai inoltre un’email riepilogativa automatica all’indirizzo indicato in email_titolare (scheda "Impostazioni").',
      'Una volta affidato il pacco al corriere, aggiorna la colonna spedito da No a Sì (e aggiungi eventuali annotazioni nella colonna note).',
    ],
  },
];

export default function GestioneShopPage() {
  const configuredSheetUrl = SHEET_URL.trim();
  const sheetHref = configuredSheetUrl || 'https://docs.google.com/spreadsheets/';

  useEffect(() => {
    document.title = 'Gestione Shop | Hop Storm';

    let metaRobots = document.querySelector("meta[name='robots']");
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');
  }, []);

  return (
    <section className="bg-black min-h-screen pt-32 md:pt-36 pb-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Intestazione */}
        <div className="border-b border-white/10 pb-10 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4A24E] font-semibold mb-3">
              Area Riservata Titolare
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">
              Guida Gestione <span className="text-[#D4A24E]">Shop</span>
            </h1>
            <p className="text-white/70 text-base max-w-2xl leading-relaxed">
              Istruzioni rapide per aggiornare prodotti, prezzi, foto su Cloudinary, disponibilità, stato dello shop ed evadere gli ordini ricevuti via Stripe.
            </p>
          </div>
        </div>

        {/* Pulsanti rapidi */}
        <div className="mb-10 space-y-3">
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={sheetHref}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2.5"
            >
              <FileSpreadsheet size={18} aria-hidden="true" />
              Apri Google Sheet
              <ExternalLink size={15} aria-hidden="true" />
            </a>

            <a
              href={STRIPE_DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] bg-[#0A0A0A] border border-white/20 text-white hover:border-[#D4A24E] hover:text-[#D4A24E] transition-colors px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2.5"
            >
              <CreditCard size={18} aria-hidden="true" />
              Apri Stripe Dashboard
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>

          {!configuredSheetUrl && (
            <p className="text-xs text-white/50">
              Nota tecnica: imposta il link diretto del tuo foglio nella costante{' '}
              <code className="text-[#D4A24E]">SHEET_URL</code> in{' '}
              <code className="text-white/70">src/config/shop.ts</code>.
            </p>
          )}
        </div>

        {/* Avviso cache 5 minuti */}
        <div className="mb-12 bg-[#0A0A0A] border border-[#D4A24E]/30 rounded-2xl p-5 flex items-start gap-3.5">
          <Clock size={20} className="text-[#D4A24E] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-white/80 leading-relaxed">
            <strong className="text-white">Aggiornamento modifiche:</strong> le modifiche effettuate su{' '}
            <strong className="text-white">Prodotti</strong> e{' '}
            <strong className="text-white">Impostazioni</strong> diventano visibili sul sito entro{' '}
            <strong className="text-[#D4A24E]">5 minuti</strong> per via della cache automatica del server.
          </p>
        </div>

        {/* Schede guida */}
        <div className="grid md:grid-cols-2 gap-6">
          {GUIDE_SECTIONS.map((section) => (
            <div key={section.num}>
              <article className="h-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-7 flex flex-col">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-sm font-mono font-bold text-[#D4A24E] tabular-nums">
                    {section.num}.
                  </span>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {section.title}
                  </h2>
                </div>

                <ol className="space-y-3 text-sm text-white/75 leading-relaxed list-decimal list-inside">
                  {section.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
