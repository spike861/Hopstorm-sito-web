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
      <p className="text-white/60 mb-8">Ultimo aggiornamento: 15 Aprile 2026</p>

      <nav className="bg-white/5 p-6 rounded-xl mb-10 border border-white/10">
        <h2 className="text-xl font-bold mb-4 text-[#D4A24E]">Indice</h2>
        <ul className="space-y-2 text-sm grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <li><a href="#titolare" className="hover:text-[#D4A24E] transition-colors">1. Titolare del Trattamento</a></li>
          <li><a href="#categorie-dati" className="hover:text-[#D4A24E] transition-colors">2. Categorie di Dati Trattati</a></li>
          <li><a href="#finalita" className="hover:text-[#D4A24E] transition-colors">3. Finalità del Trattamento</a></li>
          <li><a href="#basi-giuridiche" className="hover:text-[#D4A24E] transition-colors">4. Basi Giuridiche</a></li>
          <li><a href="#modalita" className="hover:text-[#D4A24E] transition-colors">5. Modalità del Trattamento</a></li>
          <li><a href="#destinatari" className="hover:text-[#D4A24E] transition-colors">6. Destinatari e Responsabili</a></li>
          <li><a href="#trasferimenti" className="hover:text-[#D4A24E] transition-colors">7. Trasferimenti Extra UE/SEE</a></li>
          <li><a href="#conservazione" className="hover:text-[#D4A24E] transition-colors">8. Tempi di Conservazione</a></li>
          <li><a href="#diritti" className="hover:text-[#D4A24E] transition-colors">9. Diritti degli Interessati</a></li>
          <li><a href="#reclamo" className="hover:text-[#D4A24E] transition-colors">10. Diritto di Reclamo</a></li>
          <li><a href="#natura-conferimento" className="hover:text-[#D4A24E] transition-colors">11. Natura del Conferimento</a></li>
          <li><a href="#processo-automatizzato" className="hover:text-[#D4A24E] transition-colors">12. Processo Decisionale Automatizzato</a></li>
          <li><a href="#contatti" className="hover:text-[#D4A24E] transition-colors">13. Contatti Privacy</a></li>
        </ul>
      </nav>

      <section id="titolare" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">1. Titolare del Trattamento</h2>
        <p>Ai sensi dell'art. 4 e 24 del Regolamento (UE) 2016/679 (GDPR), il Titolare del trattamento è:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1 text-white/80">
          <li><strong>HOPSTORM S.R.L.</strong></li>
          <li>Sede legale: Via Chiana 38, Roma (RM)</li>
          <li>C.F. / P.IVA: 18407651001</li>
          <li>PEC: Hopstormsrl@legalmail.it</li>
          <li>Email: <a href="mailto:info@hopstorm.it" className="text-[#D4A24E]">info@hopstorm.it</a></li>
        </ul>
      </section>

      <section id="categorie-dati" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">2. Categorie di Dati Trattati</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li><strong>Dati di navigazione:</strong> Indirizzi IP, nomi a dominio dei computer utilizzati dagli utenti, URI/URL delle risorse richieste, orario della richiesta, parametri relativi al sistema operativo.</li>
          <li><strong>Dati forniti volontariamente:</strong> Nome, cognome, indirizzo email, numero di telefono, dati inseriti nei messaggi di contatto o per richieste di listino/degustazioni.</li>
          <li><strong>Dati di transazione (Futuro E-commerce):</strong> Indirizzo di fatturazione/spedizione, storico acquisti, dati di pagamento (gestiti tramite provider esterni).</li>
        </ul>
      </section>

      <section id="finalita" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">3. Finalità del Trattamento</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li>Consentire la navigazione del sito web e garantirne la sicurezza tecnica.</li>
          <li>Rispondere alle richieste di contatto, informazioni, listini Horeca o prenotazioni degustazioni.</li>
          <li>Gestire la futura vendita online di prodotti (e-commerce), inclusa spedizione e fatturazione.</li>
          <li>Inviare comunicazioni promozionali e newsletter (solo previo consenso specifico).</li>
          <li>Adempiere ad obblighi previsti dalla legge, da un regolamento o dalla normativa comunitaria.</li>
          <li>Accertare, esercitare o difendere un diritto in sede giudiziaria.</li>
        </ul>
      </section>

      <section id="basi-giuridiche" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">4. Basi Giuridiche del Trattamento</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li><strong>Esecuzione di un contratto o misure precontrattuali (Art. 6 lett. b GDPR):</strong> per la gestione delle richieste di contatto, listini e futuri ordini.</li>
          <li><strong>Consenso (Art. 6 lett. a GDPR):</strong> per l'iscrizione alla newsletter e l'uso di cookie analitici/profilazione.</li>
          <li><strong>Obbligo legale (Art. 6 lett. c GDPR):</strong> per la conservazione dei dati di fatturazione.</li>
          <li><strong>Legittimo interesse (Art. 6 lett. f GDPR):</strong> per la sicurezza del sito, la prevenzione di frodi e la difesa in giudizio.</li>
        </ul>
      </section>

      <section id="modalita" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">5. Modalità del Trattamento</h2>
        <p className="text-white/80">Il trattamento è effettuato con strumenti informatici e telematici, con logiche strettamente correlate alle finalità indicate e, in ogni caso, in modo da garantire la sicurezza e la riservatezza dei dati stessi, nel rispetto dell'art. 32 del GDPR (misure di sicurezza tecniche e organizzative adeguate).</p>
      </section>

      <section id="destinatari" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">6. Destinatari e Responsabili Esterni</h2>
        <p className="text-white/80">I dati potranno essere resi accessibili a dipendenti/collaboratori del Titolare e a soggetti terzi nominati Responsabili del Trattamento (Art. 28 GDPR) o operanti come Titolari autonomi:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-white/80">
          <li><strong>Hosting e Infrastruttura:</strong> Keliweb S.r.l. e Vercel Inc.</li>
          <li><strong>Analytics e Marketing:</strong> Google Ireland Limited (GA4) e Meta Platforms Ireland Limited (Pixel).</li>
          <li><strong>Pagamenti e Logistica (Futuro E-commerce):</strong> Stripe, PayPal, GLS.</li>
          <li><span className="text-yellow-500 font-bold">[DA CONFERMARE]</span> <strong>Piattaforma Newsletter:</strong> (es. Mailchimp, Brevo - attualmente gestita internamente).</li>
          <li><span className="text-yellow-500 font-bold">[DA CONFERMARE]</span> <strong>Sistemi Antispam / CRM:</strong> (es. reCAPTCHA, HubSpot).</li>
        </ul>
      </section>

      <section id="trasferimenti" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">7. Trasferimenti Extra UE/SEE</h2>
        <p className="text-white/80">Alcuni dei fornitori indicati (es. Vercel, Google, Meta, Stripe) risiedono o hanno server negli Stati Uniti. Il trasferimento dei dati avviene nel pieno rispetto del Capo V del GDPR, basandosi su decisioni di adeguatezza (es. Data Privacy Framework UE-USA) o sulla sottoscrizione di Clausole Contrattuali Standard (SCC) approvate dalla Commissione Europea.</p>
      </section>

      <section id="conservazione" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">8. Tempi di Conservazione</h2>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li><strong>Dati di navigazione:</strong> cancellati o resi anonimi entro 30 giorni.</li>
          <li><strong>Dati di contatto/richieste:</strong> conservati per il tempo strettamente necessario a evadere la richiesta (max 12 mesi se non segue un contratto).</li>
          <li><strong>Dati di acquisto/fatturazione:</strong> 10 anni (art. 2220 c.c.).</li>
          <li><strong>Dati per newsletter:</strong> fino alla revoca del consenso (disiscrizione).</li>
          <li><strong>Dati analitici (GA4):</strong> 14 mesi.</li>
        </ul>
      </section>

      <section id="diritti" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">9. Diritti degli Interessati</h2>
        <p className="text-white/80">Ai sensi degli artt. 15-22 del GDPR, l'interessato ha il diritto di: accedere ai propri dati; chiederne la rettifica o la cancellazione ("diritto all'oblio"); limitarne il trattamento; opporsi al trattamento; richiedere la portabilità dei dati; revocare il consenso in qualsiasi momento (senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca).</p>
      </section>

      <section id="reclamo" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">10. Diritto di Reclamo al Garante</h2>
        <p className="text-white/80">Fatto salvo ogni altro ricorso amministrativo o giurisdizionale, l'interessato che ritenga che il trattamento che lo riguarda violi il GDPR ha il diritto di proporre reclamo a un'autorità di controllo, segnatamente nello Stato membro in cui risiede abitualmente, lavora oppure del luogo ove si è verificata la presunta violazione (in Italia: Garante per la Protezione dei Dati Personali - <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer" className="text-[#D4A24E]">www.garanteprivacy.it</a>).</p>
      </section>

      <section id="natura-conferimento" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">11. Natura del Conferimento dei Dati</h2>
        <p className="text-white/80">Il conferimento dei dati per le finalità di navigazione e per l'esecuzione di misure precontrattuali/contrattuali (es. rispondere a richieste, evadere ordini) è <strong>obbligatorio</strong>; in mancanza, non sarà possibile erogare il servizio richiesto. Il conferimento dei dati per finalità di marketing (newsletter) è <strong>facoltativo</strong> e il mancato conferimento non pregiudica la navigazione o l'acquisto.</p>
      </section>

      <section id="processo-automatizzato" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">12. Eventuale Processo Decisionale Automatizzato</h2>
        <p className="text-white/80">Il Titolare non adotta alcun processo decisionale interamente automatizzato, compresa la profilazione, che produca effetti giuridici sull'interessato o che incida in modo analogo significativamente sulla sua persona, ad eccezione delle attività di profilazione legate ai cookie (es. Meta Pixel) per le quali viene richiesto esplicito consenso.</p>
      </section>

      <section id="contatti" className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">13. Contatti Privacy</h2>
        <p className="text-white/80">Per l'esercizio dei propri diritti o per qualsiasi domanda relativa alla presente Privacy Policy, l'interessato può contattare il Titolare scrivendo a:</p>
        <ul className="list-disc pl-6 mt-2 text-white/80">
          <li>Email: <a href="mailto:info@hopstorm.it" className="text-[#D4A24E]">info@hopstorm.it</a></li>
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
      <p className="text-white/60 mb-8">Ultimo aggiornamento: 15 Aprile 2026</p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">1. Cosa sono i Cookie e gli strumenti di tracciamento?</h2>
        <p className="text-white/80">I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente (computer, tablet, smartphone), dove vengono memorizzati, per poi essere ritrasmessi agli stessi siti alla visita successiva. Oltre ai cookie, questa policy copre anche altri strumenti di tracciamento (es. web beacon, pixel tag, local storage) che hanno finalità simili.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">2. Tipologie di Cookie e Necessità di Consenso</h2>
        <p className="text-white/80">In base alle Linee Guida del Garante Privacy italiano e alla Direttiva ePrivacy, i cookie si dividono in diverse categorie:</p>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li><strong>Cookie Tecnici:</strong> Essenziali per il funzionamento del sito (es. salvataggio della sessione, preferenze di lingua, o verifica dell'età). <em>Non richiedono il consenso preventivo</em> dell'utente, ma solo l'informativa.</li>
          <li><strong>Cookie Analitici:</strong> Utilizzati per raccogliere statistiche aggregate sul numero di utenti e su come visitano il sito. Se anonimizzati (es. mascheramento dell'IP) e senza incrocio di dati, possono essere equiparati ai cookie tecnici. Altrimenti, <em>richiedono il consenso</em>.</li>
          <li><strong>Cookie Funzionali:</strong> Permettono di memorizzare scelte dell'utente per migliorare il servizio (es. chat live). <em>Richiedono il consenso</em>.</li>
          <li><strong>Cookie di Profilazione e Marketing:</strong> Utilizzati per tracciare la navigazione, creare profili utente e inviare messaggi pubblicitari mirati (es. retargeting). <em>Richiedono sempre il consenso preventivo, libero e inequivocabile</em>.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">3. Il Banner Cookie e la Gestione del Consenso</h2>
        <p className="text-white/80">Al primo accesso al sito, ti verrà mostrato un banner contenente un'informativa breve. Tramite il banner potrai:</p>
        <ul className="list-disc pl-6 space-y-2 text-white/80">
          <li><strong>Accettare tutti i cookie</strong> cliccando sull'apposito pulsante di accettazione.</li>
          <li><strong>Rifiutare i cookie non essenziali</strong> chiudendo il banner (tramite la "X" in alto a destra o il pulsante "Rifiuta"), mantenendo le impostazioni di default (solo cookie tecnici).</li>
          <li><strong>Personalizzare le scelte</strong> selezionando solo specifiche categorie di cookie.</li>
        </ul>
        <p className="text-white/80 mt-2">Il tuo consenso viene memorizzato per 6 mesi, salvo che tu non cancelli i cookie dal browser o che non cambino significativamente le condizioni del trattamento.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">4. Dettaglio dei Cookie Installati</h2>
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
                <td className="px-4 py-3 border border-white/20"><code className="text-[#D4A24E]">hopstorm_age_verified</code></td>
                <td className="px-4 py-3 border border-white/20">Hop Storm (Prima parte)</td>
                <td className="px-4 py-3 border border-white/20">Memorizza la conferma della maggiore età per l'accesso al sito.</td>
                <td className="px-4 py-3 border border-white/20">Persistente</td>
                <td className="px-4 py-3 border border-white/20">Tecnico</td>
                <td className="px-4 py-3 border border-white/20">Legittimo interesse / Obbligo legale</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="px-4 py-3 border border-white/20">Google Analytics 4 (GA4)</td>
                <td className="px-4 py-3 border border-white/20">Google Ireland Limited</td>
                <td className="px-4 py-3 border border-white/20">Statistiche aggregate sulle visite. IP anonimizzato di default.</td>
                <td className="px-4 py-3 border border-white/20">14 mesi</td>
                <td className="px-4 py-3 border border-white/20">Analitico</td>
                <td className="px-4 py-3 border border-white/20">Consenso <span className="text-yellow-500 font-bold">[DA CONFERMARE se equiparato a tecnico]</span></td>
              </tr>
              <tr className="border-b border-white/10 bg-white/5">
                <td className="px-4 py-3 border border-white/20">Meta Pixel</td>
                <td className="px-4 py-3 border border-white/20">Meta Platforms Ireland Ltd.</td>
                <td className="px-4 py-3 border border-white/20">Tracciamento conversioni, retargeting e profilazione pubblicitaria.</td>
                <td className="px-4 py-3 border border-white/20"><span className="text-yellow-500 font-bold">[DA CONFERMARE, es. 3 mesi]</span></td>
                <td className="px-4 py-3 border border-white/20">Profilazione / Marketing</td>
                <td className="px-4 py-3 border border-white/20">Consenso preventivo</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="px-4 py-3 border border-white/20"><span className="text-yellow-500 font-bold">[DA CONFERMARE]</span> Altri Widget</td>
                <td className="px-4 py-3 border border-white/20">Es. YouTube, Google Maps</td>
                <td className="px-4 py-3 border border-white/20">Integrazione contenuti multimediali.</td>
                <td className="px-4 py-3 border border-white/20">Variabile</td>
                <td className="px-4 py-3 border border-white/20">Profilazione</td>
                <td className="px-4 py-3 border border-white/20">Consenso preventivo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">5. Come modificare o revocare il consenso</h2>
        <p className="text-white/80">Puoi revocare o modificare il tuo consenso in qualsiasi momento tramite l'apposito widget/link "Gestisci Preferenze Cookie" presente nel footer del sito <span className="text-yellow-500 font-bold">[DA CONFERMARE - Implementare CMP]</span>.</p>
        <p className="text-white/80 mt-2">Inoltre, puoi disabilitare i cookie direttamente dalle impostazioni del tuo browser. Attenzione: disabilitando i cookie tecnici, alcune funzionalità del sito (come l'Age Gate) potrebbero non funzionare correttamente.</p>
        <ul className="list-disc pl-6 mt-2 text-sm text-white/60">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" className="hover:text-[#D4A24E] underline">Guida per Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noreferrer" className="hover:text-[#D4A24E] underline">Guida per Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer" className="hover:text-[#D4A24E] underline">Guida per Apple Safari</a></li>
        </ul>
      </section>

      <div className="mt-16 p-6 bg-red-900/20 border border-red-500/30 rounded-xl">
        <h3 className="text-lg font-bold text-red-400 mb-2">⚠️ NOTA TECNICA PER LO SVILUPPATORE (Privacy by Design)</h3>
        <p className="text-sm text-white/80">
          Per essere conformi alle linee guida del Garante Privacy, <strong>il blocco preventivo degli script è obbligatorio</strong>.
          <br /><br />
          Gli script di profilazione (es. <code>Meta Pixel</code>) e gli script analitici (es. <code>GA4</code>, a meno che non siano strettamente anonimizzati e senza condivisione dati con Google) <strong>NON DEVONO</strong> essere caricati nel DOM al caricamento della pagina (<code>DOMContentLoaded</code>).
          <br /><br />
          Devono essere iniettati o attivati <strong>SOLO DOPO</strong> che l'utente ha cliccato su "Accetta" nel Cookie Banner. Se l'utente chiude il banner con la "X", gli script non devono mai partire. Si consiglia l'integrazione di una CMP (Consent Management Platform) certificata (es. Iubenda, Cookiebot, o soluzione custom con Google Consent Mode v2).
        </p>
      </div>
    </article>
  );
}

function TermsAndConditions() {
  return (
    <article className="prose prose-invert prose-gold max-w-none">
      <h1 className="text-4xl font-bold mb-8 text-white">Termini e Condizioni</h1>
      <p className="text-white/60 mb-8">Ultimo aggiornamento: 15 Aprile 2026</p>

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
        <h2 className="text-2xl font-bold mb-4 text-[#D4A24E]">4. Condizioni di Vendita Online (Futuro E-commerce)</h2>
        <p className="text-white/80 italic mb-4">Questa sezione entrerà in vigore al momento dell'attivazione dell'e-commerce diretto sul sito.</p>
        <ul className="list-disc pl-6 mt-2 space-y-2 text-white/80">
          <li><strong>Prezzi:</strong> Tutti i prezzi indicati si intenderanno comprensivi di IVA.</li>
          <li><strong>Pagamenti Sicuri:</strong> Le transazioni saranno processate in modo sicuro tramite i gateway di pagamento <strong>Stripe</strong> e <strong>PayPal</strong>. HOPSTORM S.R.L. non memorizzerà i dati delle carte di credito.</li>
          <li><strong>Spedizioni:</strong> Le consegne sul territorio nazionale saranno affidate al corriere espresso <strong>GLS</strong>. Tempi e costi di spedizione saranno calcolati al checkout.</li>
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
