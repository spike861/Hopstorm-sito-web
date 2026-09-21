import { motion } from 'motion/react';
import { Send, MapPin } from 'lucide-react';

export default function Contact() {
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
              <MapPin className="text-[#D4A24E] shrink-0 mt-1" size={24} />
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Sede Legale</h4>
                <p className="text-white/60"><a href="https://www.google.com/maps/search/Via+Chiana+38,+00198+Roma+(RM)" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A24E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]">Via Chiana 38<br/>00198 Roma (RM)</a></p>
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
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A24E] to-[#C0392B]"></div>
          
          <h3 className="text-2xl font-bold text-white mb-8">Inviaci un messaggio</h3>
          
          <form id="contact-form" className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const btn = form.querySelector("button[type=submit]");
              const msg = form.querySelector(".form-message");
              btn.disabled = true;
              btn.innerHTML = "Invio in corso...";
              msg.innerHTML = "";
              
              const formData = new FormData(form);
              formData.append("_subject", "Nuovo contatto dal sito Hop Storm!");
              formData.append("_template", "table");
              formData.append("_captcha", "false");
              
              fetch("https://formsubmit.co/ajax/hopstorm.brewery@yahoo.com", {
                method: "POST",
                headers: {
                  'Accept': 'application/json'
                },
                body: formData
              })
              .then(res => res.json())
              .then(data => {
                if (data.success === "true" || data.success === true || data.ok) {
                  msg.innerHTML = "<div class=\"p-4 bg-green-900/50 border border-green-500/50 rounded-xl text-green-200 mt-4\">Messaggio inviato con successo!</div>";
                  form.reset();
                } else {
                  msg.innerHTML = "<div class=\"p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 mt-4\">Errore durante l'invio. Riprova più tardi.</div>";
                }
              })
              .catch(() => {
                msg.innerHTML = "<div class=\"p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 mt-4\">Errore di rete. Riprova più tardi.</div>";
              })
              .finally(() => {
                btn.disabled = false;
                btn.innerHTML = "Invia Messaggio";
              });
            }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="sr-only">Nome</label>
                  <input type="text" id="nome" name="Nome" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors" placeholder="Il tuo nome" />
                </div>
                <div>
                  <label htmlFor="cognome" className="sr-only">Cognome</label>
                  <input type="text" id="cognome" name="Cognome" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors" placeholder="Il tuo cognome" />
                </div>
              </div>
              
              <div>
                <label htmlFor="telefono" className="sr-only">Telefono</label>
                <input type="tel" id="telefono" name="Telefono" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors" placeholder="+39 ..." />
              </div>
              
              <div>
                <label htmlFor="locale" className="sr-only">Nome Locale</label>
                <input type="text" id="locale" name="Nome Locale" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors" placeholder="Se hai un'attività, inserisci il nome" />
              </div>
              
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input type="email" id="email" name="Email" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors" placeholder="email@esempio.it" />
              </div>
              
              <div>
                <label htmlFor="messaggio" className="sr-only">Messaggio</label>
                <textarea id="messaggio" name="Messaggio" rows="4" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors resize-none" placeholder="Scrivi qui eventuali dettagli..."></textarea>
              </div>
              
              <div className="flex items-start gap-3">
                <input type="checkbox" id="privacy" required className="mt-1 w-5 h-5 accent-[#D4A24E] bg-black border-white/20 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]" />
                <label htmlFor="privacy" className="text-sm text-white/60 leading-tight">
                  Inviando questo modulo accetti la nostra <a href="/privacy" className="underline hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Privacy Policy</a>.
                </label>
              </div>

              <div className="form-message w-full"></div>

              <button type="submit" className="w-full bg-[#D4A24E] text-black hover:bg-white transition-colors py-4 rounded-xl font-bold uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]">
                Invia Messaggio
              </button>
            </form>
        </motion.div>
      </div>
    </section>
  );
}
