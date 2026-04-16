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
                <p className="text-white/60">Via Chiana 38<br/>00198 Roma (RM)</p>
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
          
          <form action="https://formsubmit.co/hopstorm.brewery@yahoo.com" method="POST" className="space-y-6">
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="Nuovo contatto dal sito Hop Storm!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="nome" className="text-sm font-medium text-white/70">Nome *</label>
                <input type="text" id="nome" name="Nome" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4A24E] transition-colors" placeholder="Il tuo nome" />
              </div>
              <div className="space-y-2">
                <label htmlFor="cognome" className="text-sm font-medium text-white/70">Cognome *</label>
                <input type="text" id="cognome" name="Cognome" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4A24E] transition-colors" placeholder="Il tuo cognome" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="telefono" className="text-sm font-medium text-white/70">Numero di Telefono *</label>
              <input type="tel" id="telefono" name="Telefono" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4A24E] transition-colors" placeholder="+39 ..." />
            </div>

            <div className="space-y-2">
              <label htmlFor="locale" className="text-sm font-medium text-white/70">Nome Locale (Facoltativo)</label>
              <input type="text" id="locale" name="Nome Locale" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4A24E] transition-colors" placeholder="Se hai un'attività, inserisci il nome" />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-white/70">A cosa sei interessato? *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 border border-white/10 rounded-xl cursor-pointer hover:border-[#D4A24E]/50 transition-colors has-[:checked]:border-[#D4A24E] has-[:checked]:bg-[#D4A24E]/5">
                  <input type="radio" name="Interesse" value="Fornitura per Locali (B2B)" required className="accent-[#D4A24E] w-4 h-4" />
                  <span className="text-white/90 font-medium">Fornitura per Locali</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-white/10 rounded-xl cursor-pointer hover:border-[#D4A24E]/50 transition-colors has-[:checked]:border-[#D4A24E] has-[:checked]:bg-[#D4A24E]/5">
                  <input type="radio" name="Interesse" value="Fornitura per Privati (B2C)" required className="accent-[#D4A24E] w-4 h-4" />
                  <span className="text-white/90 font-medium">Fornitura per Privati</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="messaggio" className="text-sm font-medium text-white/70">Messaggio (Facoltativo)</label>
              <textarea id="messaggio" name="Messaggio" rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4A24E] transition-colors resize-none" placeholder="Scrivi qui eventuali dettagli..."></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-[#D4A24E] to-[#C0392B] text-white hover:shadow-[0_0_20px_rgba(212,162,78,0.4)] transition-all px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg uppercase tracking-wider">
              Invia Richiesta <Send size={20} />
            </button>
            <p className="text-white/40 text-xs text-center mt-4">
              Inviando questo modulo accetti la nostra <a href="#/privacy" className="underline hover:text-white">Privacy Policy</a>.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
