import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [selectedInteresse, setSelectedInteresse] = useState<string>('');
  const [radioTouched, setRadioTouched] = useState<boolean>(false);

  const [nome, setNome] = useState<string>('');
  const [nomeTouched, setNomeTouched] = useState<boolean>(false);

  const [cognome, setCognome] = useState<string>('');
  const [cognomeTouched, setCognomeTouched] = useState<boolean>(false);

  const [telefono, setTelefono] = useState<string>('');
  const [telefonoTouched, setTelefonoTouched] = useState<boolean>(false);

  const [locale, setLocale] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [emailTouched, setEmailTouched] = useState<boolean>(false);

  const [messaggio, setMessaggio] = useState<string>('');

  const [privacyAccepted, setPrivacyAccepted] = useState<boolean>(false);
  const [privacyTouched, setPrivacyTouched] = useState<boolean>(false);

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Validation states - error only shown after invalid submit attempt or when field has been touched
  const radioHasError = (hasSubmitted || radioTouched) && !selectedInteresse;
  const nomeHasError = (hasSubmitted || nomeTouched) && !nome.trim();
  const cognomeHasError = (hasSubmitted || cognomeTouched) && !cognome.trim();
  const telefonoHasError = (hasSubmitted || telefonoTouched) && !telefono.trim();
  const emailHasError = (hasSubmitted || emailTouched) && (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  const privacyHasError = (hasSubmitted || privacyTouched) && !privacyAccepted;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (radioHasError || !selectedInteresse || !nome.trim() || !cognome.trim() || !telefono.trim() || !email.trim() || !privacyAccepted) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      formData.append("Interesse", selectedInteresse);
      formData.append("Nome", nome);
      formData.append("Cognome", cognome);
      formData.append("Telefono", telefono);
      if (locale) formData.append("Nome Locale", locale);
      formData.append("Email", email);
      if (messaggio) formData.append("Messaggio", messaggio);
      formData.append("_subject", "Nuovo contatto dal sito Hop Storm!");
      formData.append("_template", "table");
      formData.append("_captcha", "false");

      const res = await fetch("https://formsubmit.co/ajax/hopstorm.brewery@yahoo.com", {
        method: "POST",
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await res.json();
      if (data.success === "true" || data.success === true || data.ok) {
        setSubmitStatus('success');
        setSelectedInteresse('');
        setNome('');
        setCognome('');
        setTelefono('');
        setLocale('');
        setEmail('');
        setMessaggio('');
        setPrivacyAccepted(false);
        setHasSubmitted(false);
        setRadioTouched(false);
        setNomeTouched(false);
        setCognomeTouched(false);
        setTelefonoTouched(false);
        setEmailTouched(false);
        setPrivacyTouched(false);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contatti" className="bg-[#050505] py-24 md:py-32 px-6 flex flex-col overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6 leading-tight">
            Parliamo di <span className="text-[#D4A24E]">Birra.</span>
          </h2>
          <p className="text-white/70 text-xl mb-12 leading-relaxed font-light">
            Hai un locale e vuoi inserire le nostre birre? Sei un privato e vuoi organizzare una fornitura per un evento? O semplicemente vuoi saperne di più su Hop Storm? Scrivici.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-[#D4A24E] shrink-0 mt-1" size={24} aria-hidden="true" />
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Sede Legale</h3>
                <p className="text-white/60">
                  <a 
                    href="https://www.google.com/maps/search/Via+Chiana+38,+00198+Roma+(RM)" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[#D4A24E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]"
                    aria-label="Visualizza la sede legale di Hop Storm su Google Maps"
                  >
                    Via Chiana 38<br/>00198 Roma (RM)
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A24E] to-[#C0392B]" aria-hidden="true"></div>
          
          <h3 className="text-2xl font-bold text-white mb-8">Inviaci un messaggio</h3>
          
          <form id="contact-form" noValidate className="space-y-6" onSubmit={handleSubmit}>
            {/* Fieldset Radio Button Group */}
            <fieldset className={`border rounded-2xl p-5 bg-black/40 transition-colors ${radioHasError ? 'border-red-500/70 bg-red-950/10' : 'border-white/10'}`}>
              <legend className="text-white font-semibold text-base px-2">
                A cosa sei interessato?
              </legend>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-3">
                <label 
                  htmlFor="interesse-locali"
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedInteresse === 'Fornitura per Locali' 
                      ? 'border-[#D4A24E] bg-[#D4A24E]/10 text-white shadow-[0_0_15px_rgba(212,162,78,0.2)]' 
                      : 'border-white/10 hover:border-white/30 text-white/80 bg-black/20'
                  }`}
                >
                  <input
                    type="radio"
                    id="interesse-locali"
                    name="interesse"
                    value="Fornitura per Locali"
                    checked={selectedInteresse === 'Fornitura per Locali'}
                    onChange={(e) => {
                      setSelectedInteresse(e.target.value);
                      setRadioTouched(true);
                    }}
                    onBlur={() => setRadioTouched(true)}
                    aria-invalid={radioHasError ? "true" : "false"}
                    aria-describedby={radioHasError ? "interesse-error" : undefined}
                    className="w-4 h-4 accent-[#D4A24E] cursor-pointer"
                  />
                  <span className="text-sm font-medium">Fornitura per Locali</span>
                </label>

                <label 
                  htmlFor="interesse-privati"
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedInteresse === 'Fornitura per Privati' 
                      ? 'border-[#D4A24E] bg-[#D4A24E]/10 text-white shadow-[0_0_15px_rgba(212,162,78,0.2)]' 
                      : 'border-white/10 hover:border-white/30 text-white/80 bg-black/20'
                  }`}
                >
                  <input
                    type="radio"
                    id="interesse-privati"
                    name="interesse"
                    value="Fornitura per Privati"
                    checked={selectedInteresse === 'Fornitura per Privati'}
                    onChange={(e) => {
                      setSelectedInteresse(e.target.value);
                      setRadioTouched(true);
                    }}
                    onBlur={() => setRadioTouched(true)}
                    aria-invalid={radioHasError ? "true" : "false"}
                    aria-describedby={radioHasError ? "interesse-error" : undefined}
                    className="w-4 h-4 accent-[#D4A24E] cursor-pointer"
                  />
                  <span className="text-sm font-medium">Fornitura per Privati</span>
                </label>
              </div>

              {radioHasError && (
                <p id="interesse-error" role="alert" className="text-red-400 text-sm mt-3 flex items-center gap-1.5 font-medium">
                  <AlertCircle size={15} className="shrink-0" aria-hidden="true" />
                  Seleziona a cosa sei interessato per procedere.
                </p>
              )}
            </fieldset>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-white/70 mb-1.5">
                  Nome <span className="text-[#D4A24E]">*</span>
                </label>
                <input 
                  type="text" 
                  id="nome" 
                  name="Nome" 
                  required 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  onBlur={() => setNomeTouched(true)}
                  aria-invalid={nomeHasError ? "true" : "false"}
                  aria-describedby={nomeHasError ? "nome-error" : undefined}
                  className={`w-full bg-black/50 border rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors ${nomeHasError ? 'border-red-500/70' : 'border-white/10'}`} 
                  placeholder="Il tuo nome" 
                />
                {nomeHasError && (
                  <p id="nome-error" role="alert" className="text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                    <AlertCircle size={13} className="shrink-0" aria-hidden="true" /> Inserisci il tuo nome.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="cognome" className="block text-sm font-medium text-white/70 mb-1.5">
                  Cognome <span className="text-[#D4A24E]">*</span>
                </label>
                <input 
                  type="text" 
                  id="cognome" 
                  name="Cognome" 
                  required 
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                  onBlur={() => setCognomeTouched(true)}
                  aria-invalid={cognomeHasError ? "true" : "false"}
                  aria-describedby={cognomeHasError ? "cognome-error" : undefined}
                  className={`w-full bg-black/50 border rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors ${cognomeHasError ? 'border-red-500/70' : 'border-white/10'}`} 
                  placeholder="Il tuo cognome" 
                />
                {cognomeHasError && (
                  <p id="cognome-error" role="alert" className="text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                    <AlertCircle size={13} className="shrink-0" aria-hidden="true" /> Inserisci il tuo cognome.
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-white/70 mb-1.5">
                Telefono <span className="text-[#D4A24E]">*</span>
              </label>
              <input 
                type="tel" 
                id="telefono" 
                name="Telefono" 
                required 
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                onBlur={() => setTelefonoTouched(true)}
                aria-invalid={telefonoHasError ? "true" : "false"}
                aria-describedby={telefonoHasError ? "telefono-error" : undefined}
                className={`w-full bg-black/50 border rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors ${telefonoHasError ? 'border-red-500/70' : 'border-white/10'}`} 
                placeholder="+39 ..." 
              />
              {telefonoHasError && (
                <p id="telefono-error" role="alert" className="text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                  <AlertCircle size={13} className="shrink-0" aria-hidden="true" /> Inserisci un recapito telefonico.
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="locale" className="block text-sm font-medium text-white/70 mb-1.5">
                Nome Locale <span className="text-white/40 text-xs font-normal">(facoltativo)</span>
              </label>
              <input 
                type="text" 
                id="locale" 
                name="Nome Locale" 
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                aria-invalid="false"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors" 
                placeholder="Se hai un'attività, inserisci qui il nome" 
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
                Email <span className="text-[#D4A24E]">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="Email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                aria-invalid={emailHasError ? "true" : "false"}
                aria-describedby={emailHasError ? "email-error" : undefined}
                className={`w-full bg-black/50 border rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors ${emailHasError ? 'border-red-500/70' : 'border-white/10'}`} 
                placeholder="email@esempio.it" 
              />
              {emailHasError && (
                <p id="email-error" role="alert" className="text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                  <AlertCircle size={13} className="shrink-0" aria-hidden="true" /> Inserisci un indirizzo email valido.
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="messaggio" className="block text-sm font-medium text-white/70 mb-1.5">
                Messaggio <span className="text-white/40 text-xs font-normal">(facoltativo)</span>
              </label>
              <textarea 
                id="messaggio" 
                name="Messaggio" 
                rows={4} 
                value={messaggio}
                onChange={(e) => setMessaggio(e.target.value)}
                aria-invalid="false"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors resize-none" 
                placeholder="Scrivi qui eventuali dettagli sulla tua richiesta..."
              />
            </div>
            
            <div>
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  required 
                  checked={privacyAccepted}
                  onChange={(e) => {
                    setPrivacyAccepted(e.target.checked);
                    setPrivacyTouched(true);
                  }}
                  onBlur={() => setPrivacyTouched(true)}
                  aria-invalid={privacyHasError ? "true" : "false"}
                  aria-describedby={privacyHasError ? "privacy-error" : undefined}
                  className="mt-1 w-5 h-5 accent-[#D4A24E] bg-black border-white/20 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] cursor-pointer" 
                />
                <label htmlFor="privacy" className="text-sm text-white/70 leading-relaxed cursor-pointer">
                  Inviando questo modulo accetti la nostra{' '}
                  <a 
                    href="/privacy" 
                    className="underline hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Privacy Policy
                  </a>.
                </label>
              </div>
              {privacyHasError && (
                <p id="privacy-error" role="alert" className="text-red-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                  <AlertCircle size={13} className="shrink-0" aria-hidden="true" /> È necessario accettare la Privacy Policy per procedere.
                </p>
              )}
            </div>

            {submitStatus === 'success' && (
              <div role="alert" className="p-4 bg-green-950/40 border border-green-500/50 rounded-xl text-green-200 flex items-center gap-3">
                <CheckCircle size={20} className="text-green-400 shrink-0" aria-hidden="true" />
                <span>Messaggio inviato con successo! Ti risponderemo al più presto.</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div role="alert" className="p-4 bg-red-950/40 border border-red-500/50 rounded-xl text-red-200 flex items-center gap-3">
                <AlertCircle size={20} className="text-red-400 shrink-0" aria-hidden="true" />
                <span>Si è verificato un errore durante l'invio. Riprova più tardi o contattaci via WhatsApp.</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#D4A24E] text-black hover:bg-white transition-colors py-4 rounded-xl font-bold uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] flex items-center justify-center gap-2"
              aria-label="Invia il modulo di contatto Hop Storm"
            >
              <Send size={18} aria-hidden="true" />
              {isSubmitting ? "Invio in corso..." : "Invia Messaggio"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
