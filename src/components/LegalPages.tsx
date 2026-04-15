import { useEffect } from 'react';

interface LegalPagesProps {
  currentHash: string;
}

export default function LegalPages({ currentHash }: LegalPagesProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentHash]);

  const renderContent = () => {
    switch (currentHash) {
      case '#/privacy':
        return <PrivacyPolicy />;
      case '#/cookie':
        return <CookiePolicy />;
      case '#/termini':
        return <TermsAndConditions />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
        {renderContent()}
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <article className="prose prose-invert prose-gold max-w-none">
      <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
      <p className="text-white/60 mb-8">Ultimo aggiornamento: [DATA DA INSERIRE]</p>

      <nav className="bg-white/5 p-6 rounded-xl mb-10 border border-white/10">
        <h2 className="text-xl font-bold mb-4 text-[#D4A24E]">Indice</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#titolare" className="hover:text-[#D4A24E] transition-colors">1. Titolare del Trattamento</a></li>
          <li><a href="#dati-raccolti" className="hover:text-[#D4A24E] transition-colors">2. Dati Raccolti e Finalità</a></li>
          <li><a href="#base-giuridica" className="hover:text-[#D4A24E] transition-colors">3. Base Giuridica del Trattamento</a></li>
          <li><a href="#destinatari" className="hover:text-[#D4A24E] transition-colors">4. Destinatari dei Dati</a></li>
          <li><a href="#conservazione" className="hover:text-[#D4A24E] transition-colors">5. Tempi di Conservazione</a></li>
          <li><a href="#diritti" className="hover:text-[#D4A24E] transition-colors">6. Diritti dell'Interessato</a></li>
        </ul>
      </nav>

      <section id="titolare" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">1. Titolare del Trattamento</h2>
        <p>Ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR), il Titolare del trattamento è:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-white/80">
          <li><strong>HOPSTORM S.R.L.</strong></li>
          <li>Sede legale: Via Chiana 38, Roma (RM)</li>
          <li>C.F. / P.IVA: 18407651001</li>
          <li>Email: <a href="mailto:info@hopstorm.it" className="text-[#D4A24E]">info@hopstorm.it</a></li>
          <li>PEC: Hopstormsrl@legalmail.it</li>
        </ul>
      </section>

      <section id="dati-raccolti" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">2. Dati Raccolti e Finalità</h2>
        <p>Raccogliamo e trattiamo le seguenti categorie di dati personali per le finalità indicate:</p>
        <ul className="list-disc pl-6 mt-4 space-y-4 text-white/80">
          <li><strong>Dati di navigazione:</strong> Indirizzi IP, tipo di browser, sistema operativo, pagine visitate. <em>Finalità:</em> garantire il corretto funzionamento del sito e ricavare informazioni statistiche anonime.</li>
          <li><strong>Dati forniti volontariamente:</strong> Indirizzo email (tramite form newsletter), numero di telefono e nome (se ci contatti via WhatsApp o email). <em>Finalità:</em> rispondere alle richieste di informazioni (es. listino Horeca, ordini privati) e inviare comunicazioni di marketing (solo previo consenso).</li>
          <li><strong>Dati di acquisto <span className="text-yellow-500 font-bold">[DA CONFERMARE - FUTURO E-COMMERCE]</span>:</strong> Dati di fatturazione, indirizzo di spedizione, dettagli di pagamento. <em>Finalità:</em> evasione degli ordini online e adempimenti fiscali.</li>
        </ul>
      </section>

      <section id="base-giuridica" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">3. Base Giuridica del Trattamento</h2>
        <p>Il trattamento dei dati si fonda sulle seguenti basi giuridiche (Art. 6 GDPR):</p>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-white/80">
          <li><strong>Esecuzione di un contratto o misure precontrattuali:</strong> per rispondere alle tue richieste via WhatsApp/email o gestire futuri ordini.</li>
          <li><strong>Consenso:</strong> per l'iscrizione alla newsletter. Il consenso è revocabile in qualsiasi momento.</li>
          <li><strong>Legittimo interesse:</strong> per la sicurezza del sito web e la prevenzione di frodi.</li>
          <li><strong>Obbligo di legge:</strong> per adempimenti contabili e fiscali legati a futuri acquisti.</li>
        </ul>
      </section>

      <section id="destinatari" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">4. Destinatari dei Dati</h2>
        <p>I tuoi dati non saranno diffusi, ma potranno essere comunicati a soggetti terzi che agiscono come Responsabili del Trattamento (Art. 28 GDPR), tra cui:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-white/80">
          <li>Provider di servizi di hosting: <span className="text-yellow-500 font-bold">[DA CONFERMARE NOME PROVIDER]</span>.</li>
          <li>Piattaforma di gestione Newsletter: <span className="text-yellow-500 font-bold">[DA CONFERMARE NOME PIATTAFORMA, es. Mailchimp]</span>.</li>
          <li>Partner logistici e di pagamento <span className="text-yellow-500 font-bold">[DA CONFERMARE - FUTURO E-COMMERCE]</span>.</li>
        </ul>
      </section>

      <section id="conservazione" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">5. Tempi di Conservazione</h2>
        <p className="text-white/80">I dati della newsletter sono conservati fino alla revoca del consenso (disiscrizione). I dati di navigazione vengono cancellati dopo <span className="text-yellow-500 font-bold">[DA CONFERMARE, es. 30 giorni]</span>. I dati relativi a futuri acquisti saranno conservati per 10 anni per obblighi di legge.</p>
      </section>

      <section id="diritti" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">6. Diritti dell'Interessato</h2>
        <p className="text-white/80">Ai sensi degli artt. 15-22 del GDPR, hai il diritto di chiedere ad HOPSTORM S.R.L. l'accesso ai tuoi dati personali, la rettifica, la cancellazione, la limitazione del trattamento, o di opporti al loro trattamento, oltre al diritto alla portabilità dei dati. Puoi esercitare questi diritti scrivendo a <a href="mailto:info@hopstorm.it" className="text-[#D4A24E]">info@hopstorm.it</a>. Hai inoltre il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali.</p>
      </section>
    </article>
  );
}

function CookiePolicy() {
  return (
    <article className="prose prose-invert prose-gold max-w-none">
      <h1 className="text-4xl font-bold mb-8 text-white">Cookie Policy</h1>
      <p className="text-white/60 mb-8">Ultimo aggiornamento: [DATA DA INSERIRE]</p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">Cosa sono i Cookie?</h2>
        <p className="text-white/80">I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente, dove vengono memorizzati, per poi essere ritrasmessi agli stessi siti alla visita successiva. Il sito hopstorm.it utilizza i cookie per garantire il corretto funzionamento delle procedure e migliorare l'esperienza di navigazione.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">Tipologie di Cookie Utilizzati</h2>
        
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold mb-2 text-white">1. Cookie Tecnici (Strettamente Necessari)</h3>
            <p className="text-white/80 mb-2">Questi cookie sono essenziali per il corretto funzionamento del sito. Non richiedono il preventivo consenso dell'utente.</p>
            <ul className="list-disc pl-6 text-sm text-white/60">
              <li><strong>Nome:</strong> <code className="text-[#D4A24E]">hopstorm_age_verified</code></li>
              <li><strong>Scopo:</strong> Memorizza la conferma della maggiore età (Age Gate) per evitare di mostrare il popup ad ogni visita.</li>
              <li><strong>Durata:</strong> Persistente (fino a cancellazione manuale).</li>
            </ul>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold mb-2 text-white">2. Cookie Analitici <span className="text-yellow-500 font-bold">[DA CONFERMARE]</span></h3>
            <p className="text-white/80 mb-2">Utilizzati per raccogliere informazioni in forma aggregata sul numero degli utenti e su come questi visitano il sito.</p>
            <p className="text-sm text-yellow-500 font-bold">Inserire qui i dettagli se si usa Google Analytics 4, Matomo, ecc. Se GA4 è anonimizzato, può essere equiparato ai cookie tecnici a certe condizioni.</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold mb-2 text-white">3. Cookie di Profilazione e Marketing <span className="text-yellow-500 font-bold">[DA CONFERMARE]</span></h3>
            <p className="text-white/80 mb-2">Utilizzati per tracciare la navigazione dell'utente in rete e creare profili sui suoi gusti, abitudini, scelte, ecc.</p>
            <p className="text-sm text-yellow-500 font-bold">Inserire qui i dettagli se si usa Meta Pixel, Google Ads, ecc. Richiedono esplicito consenso tramite Cookie Banner.</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">Gestione delle Preferenze</h2>
        <p className="text-white/80">Puoi gestire le preferenze relative ai cookie direttamente all'interno del tuo browser ed impedire – ad esempio – che terze parti possano installarne. Tramite le preferenze del browser è inoltre possibile eliminare i cookie installati in passato, incluso il cookie in cui è eventualmente salvato il consenso all'installazione di cookie da parte di questo sito.</p>
      </section>
    </article>
  );
}

function TermsAndConditions() {
  return (
    <article className="prose prose-invert prose-gold max-w-none">
      <h1 className="text-4xl font-bold mb-8 text-white">Termini e Condizioni</h1>
      <p className="text-white/60 mb-8">Ultimo aggiornamento: [DATA DA INSERIRE]</p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">1. Introduzione</h2>
        <p className="text-white/80">I presenti Termini e Condizioni regolano l'accesso e l'utilizzo del sito web hopstorm.it, di proprietà di HOPSTORM S.R.L. Accedendo al sito, l'utente accetta di essere vincolato dai presenti termini.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">2. Requisito di Età</h2>
        <p className="text-white/80">L'accesso a questo sito web e l'acquisto dei nostri prodotti sono rigorosamente riservati a soggetti che hanno compiuto il <strong>18° anno di età</strong> (o l'età legale per il consumo di alcolici nel paese di residenza). HOPSTORM S.R.L. promuove il consumo responsabile di alcol.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">3. Proprietà Intellettuale</h2>
        <p className="text-white/80">Tutti i contenuti presenti sul sito (inclusi, a titolo esemplificativo, il logo "Hop Storm", i testi, le grafiche, le fotografie delle bottiglie e degli eventi) sono di proprietà esclusiva di HOPSTORM S.R.L. o dei rispettivi autori (es. Graziano Adamo per lo sviluppo web). È severamente vietata la riproduzione, distribuzione o modifica senza esplicito consenso scritto.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">4. Condizioni di Vendita Online <span className="text-yellow-500 font-bold">[SEZIONE FUTURA - DA CONFERMARE]</span></h2>
        <p className="text-white/80 italic">Questa sezione sarà aggiornata al momento dell'attivazione dell'e-commerce diretto sul sito.</p>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-white/60">
          <li><strong>Prezzi:</strong> Tutti i prezzi indicati si intenderanno comprensivi di IVA.</li>
          <li><strong>Spedizioni:</strong> Dettagli su corrieri, tempistiche e costi.</li>
          <li><strong>Diritto di Recesso:</strong> Ai sensi del Codice del Consumo (D.Lgs. 206/2005), il consumatore avrà 14 giorni per recedere, a condizione che i prodotti (sigillati) non siano stati aperti o alterati.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">5. Limitazione di Responsabilità</h2>
        <p className="text-white/80">HOPSTORM S.R.L. si impegna a mantenere il sito aggiornato e funzionante, ma non garantisce l'assenza di errori o interruzioni del servizio. L'azienda non sarà responsabile per eventuali danni diretti o indiretti derivanti dall'uso del sito web.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">6. Legge Applicabile e Foro Competente</h2>
        <p className="text-white/80">I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia derivante dall'uso del sito, sarà competente in via esclusiva il Foro di Roma, fatto salvo il foro inderogabile del consumatore (luogo di residenza o domicilio del cliente) nel caso di vendite B2C.</p>
      </section>
    </article>
  );
}
