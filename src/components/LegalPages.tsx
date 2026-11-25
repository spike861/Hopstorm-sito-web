import { useEffect } from 'react';

interface LegalPagesProps {
  currentHash: string;
}

export default function LegalPages({ currentHash }: LegalPagesProps) {
  useEffect(() => {
    let title = "Hop Storm | Birrificio Artigianale Indipendente a Roma";
    let desc = "Birrificio artigianale indipendente a Roma. Fresh Wave, Red Moon ed Enjoy: birre non filtrate né pastorizzate, per locali e privati. Fusti e bottiglie 33cl.";
    let canonical = "https://www.hopstorm.it/";
    
    if (currentHash === "/privacy") {
      title = "Privacy Policy | Hop Storm";
      desc = "Informativa sulla Privacy del birrificio artigianale Hop Storm.";
      canonical = "https://www.hopstorm.it/privacy";
    } else if (currentHash === "/cookie") {
      title = "Cookie Policy | Hop Storm";
      desc = "Informativa sui Cookie del birrificio artigianale Hop Storm.";
      canonical = "https://www.hopstorm.it/cookie";
    } else if (currentHash === "/termini") {
      title = "Termini e Condizioni | Hop Storm";
      desc = "Termini e Condizioni di vendita e utilizzo del sito Hop Storm.";
      canonical = "https://www.hopstorm.it/termini";
    } else if (currentHash === "/vendita") {
      title = "Condizioni di Vendita | Hop Storm";
      desc = "Condizioni Generali di Vendita online del birrificio artigianale Hop Storm.";
      canonical = "https://www.hopstorm.it/vendita";
    }

    document.title = title;
    
    let metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) metaDesc.setAttribute("content", desc);
    
    let linkCan = document.querySelector("link[rel='canonical']");
    if (linkCan) linkCan.setAttribute("href", canonical);

  }, [currentHash]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentHash]);

  const renderContent = () => {
    switch (currentHash) {
      case '/privacy':
        return <PrivacyPolicy />;
      case '/cookie':
        return <CookiePolicy />;
      case '/termini':
      case '/vendita':
        return <TermsAndConditions isVendita={currentHash === '/vendita'} />;
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-[#D4A24E] transition-colors text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A24E] rounded-md px-2 py-1"
        >
          ← Torna alla Home
        </a>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('openCookieBanner'))}
          className="text-xs text-[#D4A24E] hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#D4A24E]"
        >
          Gestisci preferenze cookie
        </button>
      </div>
      <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
        {renderContent()}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-3 rounded-full font-bold text-sm"
          >
            ← Torna alla Home
          </a>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('openCookieBanner'))}
            className="border border-white/20 text-white hover:bg-white/10 transition-colors px-6 py-3 rounded-full font-medium text-sm"
          >
            Gestisci preferenze cookie
          </button>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <article className="prose prose-invert prose-gold max-w-none">
      <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
      <p className="text-white/60 mb-8">Ultimo aggiornamento: 24 Novembre 2026</p>

      <nav aria-label="Indice Privacy Policy" className="bg-white/5 p-6 rounded-xl mb-10 border border-white/10">
        <h2 className="text-xl font-bold mb-4 text-[#D4A24E]">Indice</h2>
        <ul className="space-y-2 text-sm grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <li><a href="#titolare" className="hover:text-[#D4A24E] transition-colors">1. Titolare del Trattamento</a></li>
          <li><a href="#dpo" className="hover:text-[#D4A24E] transition-colors">2. Responsabile della Protezione dei Dati (DPO)</a></li>
          <li><a href="#categorie-dati" className="hover:text-[#D4A24E] transition-colors">3. Categorie di Dati Trattati</a></li>
          <li><a href="#finalita" className="hover:text-[#D4A24E] transition-colors">4. Finalità del Trattamento</a></li>
          <li><a href="#basi-giuridiche" className="hover:text-[#D4A24E] transition-colors">5. Basi Giuridiche</a></li>
          <li><a href="#modalita" className="hover:text-[#D4A24E] transition-colors">6. Modalità e Sicurezza</a></li>
          <li><a href="#destinatari" className="hover:text-[#D4A24E] transition-colors">7. Destinatari e Responsabili</a></li>
          <li><a href="#trasferimenti" className="hover:text-[#D4A24E] transition-colors">8. Trasferimenti Extra UE/SEE</a></li>
          <li><a href="#conservazione" className="hover:text-[#D4A24E] transition-colors">9. Tempi di Conservazione</a></li>
          <li><a href="#diritti" className="hover:text-[#D4A24E] transition-colors">10. Diritti degli Interessati</a></li>
          <li><a href="#reclamo" className="hover:text-[#D4A24E] transition-colors">11. Diritto di Reclamo</a></li>
          <li><a href="#natura-conferimento" className="hover:text-[#D4A24E] transition-colors">12. Natura del Conferimento</a></li>
          <li><a href="#processo-automatizzato" className="hover:text-[#D4A24E] transition-colors">13. Processo Decisionale Automatizzato</a></li>
          <li><a href="#contatti-privacy" className="hover:text-[#D4A24E] transition-colors">14. Contatti Privacy</a></li>
        </ul>
      </nav>

      <section id="titolare" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">1. Titolare del Trattamento</h2>
        <p className="text-white/80">Ai sensi degli artt. 4 e 24 del Regolamento (UE) 2016/679 (GDPR), il Titolare del trattamento è:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-white/80">
          <li><strong>HOPSTORM S.R.L.</strong></li>
          <li>Sede legale: Via Chiana 38, 00198 Roma (RM)</li>
          <li>C.F. / P.IVA: 18407651001</li>
          <li>PEC: Hopstormsrl@legalmail.it</li>
          <li>Email: <a href="mailto:hopstorm.brewery@yahoo.com" className="text-[#D4A24E]">hopstorm.brewery@yahoo.com</a></li>
        </ul>
      </section>

      <section id="dpo" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">2. Responsabile della Protezione dei Dati (DPO)</h2>
        <p className="text-white/80">Il Titolare non ha nominato un Responsabile della Protezione dei Dati (DPO), non ricorrendo i presupposti obbligatori di cui all&apos;art. 37 del GDPR.</p>
      </section>

      <section id="categorie-dati" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">3. Categorie di Dati Trattati</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li><strong>Dati di navigazione e tecnici:</strong> indirizzi IP, log di accesso, tipo di browser e preferenze tecniche memorizzate localmente (es. verifica maggiore età 18+, stato del carrello, consenso cookie).</li>
          <li><strong>Dati forniti tramite modulo di contatto:</strong> nome, cognome, email, numero di telefono, eventuale nome del locale e contenuto del messaggio.</li>
          <li><strong>Dati relativi agli ordini online (Shop):</strong> nome, cognome, email, numero di telefono, indirizzo di spedizione e di fatturazione, articoli acquistati, note di consegna ed esito del pagamento. I dati della carta di pagamento sono gestiti esclusivamente da Stripe e non transitano né vengono salvati sui nostri server.</li>
          <li><strong>Dati analitici e di marketing:</strong> raccolti esclusivamente previo tuo consenso esplicito tramite il banner cookie.</li>
        </ul>
      </section>

      <section id="finalita" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">4. Finalità del Trattamento</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li>Consentire la navigazione del sito web, verificare il requisito legale della maggiore età (18+) e garantire la sicurezza tecnica.</li>
          <li>Rispondere alle richieste inviate tramite il modulo di contatto (informazioni, forniture Horeca, eventi privati).</li>
          <li>Gestire gli acquisti sullo Shop Online, l&apos;incasso dei pagamenti tramite Stripe, la spedizione degli ordini, le comunicazioni di conferma ordine e gli adempimenti contabili/fiscali.</li>
          <li>Misurare le statistiche d&apos;uso o eventuali campagne pubblicitarie (solo previo consenso specifico sui cookie opzionali).</li>
          <li>Adempiere ad obblighi di legge o accertare/difendere un diritto in sede giudiziaria.</li>
        </ul>
      </section>

      <section id="basi-giuridiche" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">5. Basi Giuridiche del Trattamento</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li><strong>Esecuzione di un contratto o misure precontrattuali (Art. 6, par. 1, lett. b GDPR):</strong> per gestire richieste di preventivo/contatto, ordini sullo shop, pagamenti e spedizioni.</li>
          <li><strong>Consenso (Art. 6, par. 1, lett. a GDPR):</strong> per il trattamento dei dati tramite modulo di contatto e per l&apos;attivazione di cookie analitici o di marketing/profilazione.</li>
          <li><strong>Obbligo legale (Art. 6, par. 1, lett. c GDPR):</strong> per la conservazione delle scritture contabili e fiscali relative agli ordini e la verifica del divieto di vendita di alcolici ai minori.</li>
          <li><strong>Legittimo interesse (Art. 6, par. 1, lett. f GDPR):</strong> per la sicurezza informatica del sito, la prevenzione delle frodi nei pagamenti e la tutela giudiziaria.</li>
        </ul>
      </section>

      <section id="modalita" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">6. Modalità e Sicurezza del Trattamento</h2>
        <p className="text-white/80">Il trattamento avviene con strumenti informatici e telematici con logiche strettamente correlate alle finalità indicate, nel rispetto dell&apos;art. 32 GDPR, mediante cifratura delle comunicazioni (HTTPS/TLS) e controlli di accesso adeguati.</p>
      </section>

      <section id="destinatari" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">7. Destinatari e Responsabili Esterni</h2>
        <p className="text-white/80">I dati possono essere trattati da personale autorizzato del Titolare e da fornitori esterni nominati Responsabili del Trattamento (Art. 28 GDPR) o operanti come Titolari autonomi:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-white/80">
          <li><strong>Pagamenti elettronici:</strong> Stripe Payments Europe, Ltd. / Stripe, Inc. (gestione sicura dei pagamenti Checkout).</li>
          <li><strong>Infrastruttura web e gestione ordini/contatti:</strong> fornitori di hosting/cloud (es. Google Cloud / Google Workspace per il registro ordini e le comunicazioni di conferma; FormSubmit per l&apos;inoltro delle richieste dal modulo contatti).</li>
          <li><strong>Logistica e Spedizioni:</strong> corrieri espresso incaricati della consegna degli ordini in Italia.</li>
          <li><strong>Consulenza fiscale e contabile:</strong> commercialisti e studi professionali per gli adempimenti di legge.</li>
          <li><strong>Analytics (solo previo consenso):</strong> Google Ireland Limited (GA4) e Umami Cloud (statistiche aggregate anonime senza cookie).</li>
        </ul>
      </section>

      <section id="trasferimenti" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">8. Trasferimenti Extra UE/SEE</h2>
        <p className="text-white/80">Alcuni fornitori (es. Stripe, Google) possono trattare dati al di fuori dello Spazio Economico Europeo (es. Stati Uniti). Tali trasferimenti avvengono nel pieno rispetto del Capo V del GDPR, sulla base di decisioni di adeguatezza della Commissione Europea (EU-US Data Privacy Framework) o mediante Clausole Contrattuali Standard (SCC).</p>
      </section>

      <section id="conservazione" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">9. Tempi di Conservazione</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li><strong>Log tecnici del server:</strong> fino a 12 mesi per finalità di sicurezza.</li>
          <li><strong>Richieste dal modulo di contatto:</strong> 24 mesi dall&apos;ultimo contatto utile.</li>
          <li><strong>Ordini e dati di fatturazione/spedizione (Shop):</strong> 10 anni dalla conclusione dell&apos;ordine, come richiesto dalla normativa civilistica e fiscale italiana (art. 2220 c.c.).</li>
          <li><strong>Preferenze sui cookie:</strong> 6 mesi dalla scelta espressa dall&apos;utente.</li>
        </ul>
      </section>

      <section id="diritti" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">10. Diritti degli Interessati</h2>
        <p className="text-white/80">Ai sensi degli artt. 15-22 del GDPR, puoi chiedere in qualsiasi momento l&apos;accesso ai tuoi dati personali, la rettifica, la cancellazione (&quot;diritto all&apos;oblio&quot; nei limiti degli obblighi di conservazione fiscale), la limitazione del trattamento, l&apos;opposizione, la portabilità dei dati e la revoca del consenso precedentemente prestato.</p>
      </section>

      <section id="reclamo" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">11. Diritto di Reclamo al Garante</h2>
        <p className="text-white/80">Se ritieni che il trattamento dei tuoi dati violi il GDPR, hai il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#D4A24E]">www.garanteprivacy.it</a>) o all&apos;autorità competente dello Stato membro in cui risiedi.</p>
      </section>

      <section id="natura-conferimento" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">12. Natura del Conferimento dei Dati</h2>
        <p className="text-white/80">Il conferimento dei dati necessari per evadere gli ordini dello shop o rispondere alle richieste di contatto è <strong>obbligatorio</strong> per poter fornire il servizio richiesto; il mancato conferimento impedisce il completamento dell&apos;ordine o l&apos;invio della risposta. Il consenso ai cookie analitici e di marketing è invece interamente <strong>facoltativo</strong>.</p>
      </section>

      <section id="processo-automatizzato" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">13. Processo Decisionale Automatizzato</h2>
        <p className="text-white/80">Il Titolare non effettua processi decisionali interamente automatizzati che producano effetti giuridici sull&apos;interessato. Le verifiche antifrode durante il pagamento con carta sono gestite direttamente da Stripe a tutela della sicurezza delle transazioni.</p>
      </section>

      <section id="contatti-privacy" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">14. Contatti Privacy</h2>
        <p className="text-white/80">Per esercitare i tuoi diritti o richiedere informazioni sul trattamento dei dati personali puoi contattarci a:</p>
        <ul className="list-disc pl-6 mt-2 text-white/80">
          <li>Email: <a href="mailto:hopstorm.brewery@yahoo.com" className="text-[#D4A24E]">hopstorm.brewery@yahoo.com</a></li>
          <li>PEC: Hopstormsrl@legalmail.it</li>
        </ul>
      </section>
    </article>
  );
}

function CookiePolicy() {
  return (
    <article className="prose prose-invert prose-gold max-w-none">
      <h1 className="text-4xl font-bold mb-8 text-white">Cookie Policy</h1>
      <p className="text-white/60 mb-8">Ultimo aggiornamento: 24 Novembre 2026</p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">1. Cosa sono i Cookie e gli strumenti di tracciamento</h2>
        <p className="text-white/80">I cookie sono piccoli file di testo inviati dal sito web al browser dell&apos;utente per memorizzare informazioni tecniche o di preferenza. Oltre ai cookie tradizionali, la presente informativa disciplina anche gli strumenti di archiviazione locale del browser (<code>localStorage</code>) e gli eventuali script di analisi o terze parti.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">2. Tipologie utilizzate e blocco preventivo</h2>
        <p className="text-white/80">In conformità alle Linee Guida del Garante Privacy del 10 giugno 2021:</p>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li><strong>Strumenti Tecnici e Strettamente Necessari:</strong> indispensabili per il funzionamento del sito, la verifica dell&apos;età (18+), il carrello dello shop, la sicurezza dei pagamenti e la memorizzazione delle scelte sui cookie. Non richiedono consenso preventivo.</li>
          <li><strong>Strumenti Analitici e di Marketing (Opzionali):</strong> restano bloccati preventivamente per impostazione predefinita e si attivano esclusivamente dopo tuo esplicito consenso tramite il banner o il pannello preferenze.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">3. Gestione del Consenso tramite il Banner</h2>
        <p className="text-white/80">Al primo accesso puoi scegliere liberamente con pulsanti di pari evidenza visiva di:</p>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li><strong>Accettare tutti</strong> i cookie e gli strumenti opzionali.</li>
          <li><strong>Rifiutare tutti</strong> i cookie non essenziali (anche chiudendo il banner con la &quot;X&quot;), lasciando attivi solo gli strumenti tecnici necessari.</li>
          <li><strong>Personalizzare</strong> in modo granulare le singole categorie.</li>
        </ul>
        <p className="text-white/80 mt-2">La scelta viene conservata per 6 mesi e può essere modificata o revocata in qualsiasi momento cliccando su &quot;Gestisci preferenze cookie&quot; nel footer.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">4. Dettaglio degli Strumenti e Cookie</h2>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-white/80 border-collapse">
            <thead className="text-xs uppercase bg-white/10 text-white">
              <tr>
                <th className="px-4 py-3 border border-white/20">Nome / Strumento</th>
                <th className="px-4 py-3 border border-white/20">Fornitore</th>
                <th className="px-4 py-3 border border-white/20">Finalità</th>
                <th className="px-4 py-3 border border-white/20">Durata</th>
                <th className="px-4 py-3 border border-white/20">Categoria</th>
                <th className="px-4 py-3 border border-white/20">Base Giuridica</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10 bg-white/5">
                <td className="px-4 py-3 border border-white/20"><code className="text-[#D4A24E]">hopstorm_age_verified</code> / <code className="text-[#D4A24E]">hopstorm_shop_age_gate</code></td>
                <td className="px-4 py-3 border border-white/20">HOPSTORM S.R.L.</td>
                <td className="px-4 py-3 border border-white/20">Memorizza la conferma della maggiore età (18+) per l&apos;accesso al sito e allo shop.</td>
                <td className="px-4 py-3 border border-white/20">Persistente (localStorage)</td>
                <td className="px-4 py-3 border border-white/20">Tecnico</td>
                <td className="px-4 py-3 border border-white/20">Obbligo legale / Legittimo interesse</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="px-4 py-3 border border-white/20"><code className="text-[#D4A24E]">hopstorm_shop_cart_v1</code></td>
                <td className="px-4 py-3 border border-white/20">HOPSTORM S.R.L.</td>
                <td className="px-4 py-3 border border-white/20">Conserva gli articoli aggiunti al carrello (solo ID prodotto e quantità, nessun dato personale).</td>
                <td className="px-4 py-3 border border-white/20">Persistente (localStorage)</td>
                <td className="px-4 py-3 border border-white/20">Tecnico</td>
                <td className="px-4 py-3 border border-white/20">Esecuzione contratto / Servizio richiesto</td>
              </tr>
              <tr className="border-b border-white/10 bg-white/5">
                <td className="px-4 py-3 border border-white/20"><code className="text-[#D4A24E]">hopstorm_cookie_consent</code></td>
                <td className="px-4 py-3 border border-white/20">HOPSTORM S.R.L.</td>
                <td className="px-4 py-3 border border-white/20">Memorizza la preferenza granulare sui cookie espressa dall&apos;utente.</td>
                <td className="px-4 py-3 border border-white/20">6 mesi (localStorage)</td>
                <td className="px-4 py-3 border border-white/20">Tecnico</td>
                <td className="px-4 py-3 border border-white/20">Obbligo legale (Garante Privacy)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="px-4 py-3 border border-white/20">Stripe (<code className="text-[#D4A24E]">__stripe_mid</code>, <code className="text-[#D4A24E]">__stripe_sid</code>)</td>
                <td className="px-4 py-3 border border-white/20">Stripe Payments Europe / Stripe, Inc.</td>
                <td className="px-4 py-3 border border-white/20">Prevenzione frodi e gestione sicura dei pagamenti al checkout.</td>
                <td className="px-4 py-3 border border-white/20">Sessione / 1 anno</td>
                <td className="px-4 py-3 border border-white/20">Tecnico necessario (pagamenti)</td>
                <td className="px-4 py-3 border border-white/20">Esecuzione contratto / Sicurezza pagamenti</td>
              </tr>
              <tr className="border-b border-white/10 bg-white/5">
                <td className="px-4 py-3 border border-white/20">Google Tag Manager / Google Analytics 4 (<code className="text-[#D4A24E]">_ga</code>, <code className="text-[#D4A24E]">_ga_*</code>)</td>
                <td className="px-4 py-3 border border-white/20">Google Ireland Limited</td>
                <td className="px-4 py-3 border border-white/20">Statistiche di visita aggregate e misurazione conversioni (caricato esclusivamente dopo consenso esplicito).</td>
                <td className="px-4 py-3 border border-white/20">Fino a 14 mesi</td>
                <td className="px-4 py-3 border border-white/20">Analitico / Marketing</td>
                <td className="px-4 py-3 border border-white/20">Consenso esplicito preventivo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">5. Come modificare o revocare il consenso</h2>
        <p className="text-white/80">Puoi revocare o modificare il consenso in qualsiasi momento tramite il pulsante &quot;Gestisci preferenze cookie&quot; presente in fondo a ogni pagina o nelle impostazioni del tuo browser:</p>
        <ul className="list-disc pl-6 mt-2 text-sm text-white/60">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A24E] underline">Guida per Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A24E] underline">Guida per Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A24E] underline">Guida per Apple Safari</a></li>
        </ul>
      </section>
    </article>
  );
}

function TermsAndConditions({ isVendita = false }: { isVendita?: boolean }) {
  return (
    <article className="prose prose-invert prose-gold max-w-none">
      <h1 className="text-4xl font-bold mb-8 text-white">
        {isVendita ? 'Condizioni Generali di Vendita' : 'Termini e Condizioni'}
      </h1>
      <p className="text-white/60 mb-8">Ultimo aggiornamento: 24 Novembre 2026</p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">1. Identificazione del Venditore</h2>
        <p className="text-white/80">
          I presenti Termini e Condizioni Generali di Vendita disciplinano l&apos;accesso al sito <strong>hopstorm.it</strong> e gli acquisti effettuati tramite lo Shop Online di <strong>HOPSTORM S.R.L.</strong>, con sede legale in Via Chiana 38, 00198 Roma (RM), C.F. e P.IVA 18407651001, PEC <a href="mailto:Hopstormsrl@legalmail.it" className="text-[#D4A24E]">Hopstormsrl@legalmail.it</a>, Email <a href="mailto:hopstorm.brewery@yahoo.com" className="text-[#D4A24E]">hopstorm.brewery@yahoo.com</a>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">2. Requisito di Maggiore Età (18+)</h2>
        <p className="text-white/80">L&apos;accesso al sito e l&apos;acquisto di bevande alcoliche sullo Shop sono consentiti esclusivamente a soggetti che abbiano compiuto il <strong>18° anno di età</strong>, in conformità alla legge italiana sul divieto di vendita di alcolici ai minori. Con la conferma dell&apos;ordine il cliente dichiara sotto la propria responsabilità di essere maggiorenne. HOPSTORM S.R.L. promuove il consumo responsabile.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">3. Prezzi, Disponibilità e Pagamenti</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-white/80">
          <li><strong>Prezzi:</strong> tutti i prezzi esposti nello Shop sono espressi in Euro (€) e sono comprensivi di IVA. I costi di spedizione (e l&apos;eventuale soglia per la spedizione gratuita) sono chiaramente indicati nel carrello prima del pagamento.</li>
          <li><strong>Disponibilità:</strong> i prodotti sono soggetti a disponibilità di magazzino. In caso di esaurimento sopravvenuto dopo l&apos;ordine, il cliente verrà contattato tempestivamente per concordare la sostituzione o il rimborso integrale.</li>
          <li><strong>Pagamenti sicuri:</strong> i pagamenti sono elaborati esclusivamente tramite <strong>Stripe</strong> (carte Visa, Mastercard, American Express, Apple Pay e Google Pay). Il contratto si intende concluso al buon esito del pagamento e all&apos;invio della email di conferma ordine.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">4. Spedizioni e Consegna</h2>
        <p className="text-white/80">Le spedizioni vengono effettuate su tutto il territorio italiano all&apos;indirizzo indicato in fase di checkout tramite corriere espresso. Si raccomanda di verificare l&apos;integrità dell&apos;imballo alla consegna e segnalare eventuali anomalie entro 48 ore scrivendo a <a href="mailto:hopstorm.brewery@yahoo.com" className="text-[#D4A24E]">hopstorm.brewery@yahoo.com</a>.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">5. Diritto di Recesso e Garanzia Legale</h2>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-white/80">
          <li><strong>Diritto di recesso (14 giorni):</strong> ai sensi degli artt. 52 e ss. del Codice del Consumo (D.Lgs. 206/2005), il cliente consumatore può recedere entro 14 giorni dal ricevimento dei prodotti, inviando comunicazione scritta a <a href="mailto:hopstorm.brewery@yahoo.com" className="text-[#D4A24E]">hopstorm.brewery@yahoo.com</a> o via PEC.</li>
          <li><strong>Esclusioni (art. 59 Codice del Consumo):</strong> il diritto di recesso è escluso per prodotti sigillati aperti dopo la consegna (es. fustini spillati o bottiglie stappate) e per prodotti artigianali soggetti a rapido deterioramento o alterazione se non conservati correttamente. I prodotti resi devono risultare integri, chiusi e nella confezione originale.</li>
          <li><strong>Garanzia legale:</strong> si applica la garanzia legale di conformità prevista dagli artt. 128 e ss. del Codice del Consumo.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">6. Proprietà Intellettuale e Limitazione di Responsabilità</h2>
        <p className="text-white/80">Tutti i contenuti presenti sul sito (logo &quot;Hop Storm&quot;, testi, grafiche, fotografie e codice sorgente sviluppato da Graziano Adamo) sono protetti da copyright e ne è vietata la riproduzione senza consenso scritto.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">7. Legge Applicabile e Foro Competente</h2>
        <p className="text-white/80">Le presenti condizioni sono regolate dalla legge italiana. Per gli acquisti effettuati da consumatori (B2C) è competente in via inderogabile il giudice del luogo di residenza o domicilio del consumatore; per rapporti B2B è competente in via esclusiva il Foro di Roma.</p>
      </section>
    </article>
  );
}
