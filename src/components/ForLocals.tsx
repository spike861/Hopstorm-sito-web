import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function ForLocals() {
  return (
    <section id="per-i-locali" className="bg-black pt-24 md:pt-32 pb-16 md:pb-20 px-6 flex flex-col overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-8 leading-tight"
          >
            Porta Hop Storm nel tuo <span className="text-[#D4A24E]">locale.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-xl mb-8 leading-relaxed"
          >
            Non cerchiamo semplicemente punti vendita. Cerchiamo locali che credono nella birra artigianale quanto noi: pub, ristoranti, pizzerie, bistrot che vogliono offrire ai propri clienti qualcosa di diverso dal solito.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-xl leading-relaxed"
          >
            Collaborare con Hop Storm significa avere un birrificio artigianale del territorio come partner diretto: nessun intermediario, nessun distributore, nessun listino gonfiato. Parliamo direttamente con te, capiamo le esigenze del tuo locale e costruiamo insieme la proposta giusta.
          </motion.p>
        </div>

        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-12"
        >
          Cosa offriamo ai nostri partner
        </motion.h3>
        
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {[
            {
              num: "01",
              title: "Fornitura diretta e continuativa",
              desc: "Consegne puntuali, stock sempre disponibile e un referente dedicato con cui parlare quando serve. Birra fresca, sempre."
            },
            {
              num: "02",
              title: "Formazione per il tuo staff",
              desc: "Perché il tuo personale sappia raccontare ogni birra Hop Storm ai clienti: profilo aromatico, abbinamenti, temperatura di servizio. Una birra spiegata bene si vende il doppio."
            },
            {
              num: "03",
              title: "Supporto per eventi",
              desc: "Supporto per eventi e degustazioni direttamente nel tuo locale per coinvolgere i clienti."
            },
            {
              num: "04",
              title: "Visibilità reciproca",
              desc: "Ogni locale partner viene inserito nella nostra mappa \"Dove Trovarci\" sul sito e promosso sui nostri canali social. I nostri clienti diventano i tuoi clienti."
            }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-500"
            >
              {/* Big background number */}
              <div className="absolute -right-4 -top-8 text-[120px] font-bold text-white/[0.03] group-hover:text-[#C9922A]/10 transition-colors duration-500 pointer-events-none select-none">
                {feature.num}
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-[#C9922A] font-mono text-sm tracking-[0.2em] mb-8 flex items-center gap-4">
                  <span>{feature.num}</span>
                  <span className="w-12 h-px bg-[#C9922A]/50"></span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h4>
                <p className="text-white/70 leading-relaxed font-light text-lg">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Formati disponibili</h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              <strong className="text-white">Fresh Wave</strong> (Helles Lager, 4,5%), <strong className="text-white">Red Moon</strong> (Rossa, 5,8%) e <strong className="text-white">Enjoy</strong> (IPA) sono disponibili per tutte in fusti da 20 litri, fusti da 24 litri e bottiglie da 33 cl.
            </p>
            <p className="text-white/70 leading-relaxed">
              Puoi scegliere i formati più adatti alle tue esigenze, a seconda del tipo di locale, dello spazio disponibile e del volume che gestisci. Possiamo studiare insieme la combinazione più adatta a te.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#110D05] border border-[#D4A24E]/20 rounded-2xl p-8 md:p-12"
          >
            <h4 className="text-2xl font-bold text-[#D4A24E] mb-6">Rete Partner Hop Storm</h4>
            <p className="text-white/80 mb-8 leading-relaxed">
              Selezioniamo i locali con cui lavoriamo. Non per esclusività, ma per garantire che ogni birra venga servita nel modo giusto, alla temperatura giusta, con il racconto giusto.
            </p>
            <p className="text-xl font-bold text-white">
              Se la birra artigianale per te è una cosa seria, parliamo.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-12 md:p-20 text-center"
        >
          <h3 className="text-4xl font-bold text-white mb-6">Diventa partner</h3>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-12">
            Contattaci per ricevere il listino dedicato ai locali e scoprire le nostre condizioni riservate al settore Horeca. Nessun impegno, nessun minimo d'ordine per iniziare.
          </p>
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 md:p-12 text-left w-full max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">Inviaci i tuoi dati</h3>
            <p className="text-white/60 mb-8">Compila il modulo sottostante per essere ricontattato e ricevere il nostro listino dedicato al settore Horeca. Nessun impegno, nessun minimo d'ordine.</p>
            
            <form id="b2b-form" className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const btn = form.querySelector("button[type=submit]");
              const msg = form.querySelector(".form-message");
              btn.disabled = true;
              btn.innerHTML = "Invio in corso...";
              msg.innerHTML = "";
              
              const formData = new FormData(form);
              formData.append("_subject", "Nuova richiesta Horeca da Hop Storm!");
              formData.append("_template", "table");
              formData.append("_captcha", "false");
              
              const beers = [];
              if (form.querySelector("#beer-fresh").checked) beers.push("Fresh Wave");
              if (form.querySelector("#beer-red").checked) beers.push("Red Moon");
              if (form.querySelector("#beer-enjoy").checked) beers.push("Enjoy");
              formData.append("Birre di interesse", beers.join(", "));
              
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
                  msg.innerHTML = "<div class='p-4 bg-green-900/50 border border-green-500/50 rounded-xl text-green-200 mt-4'>Richiesta inviata con successo! Ti contatteremo al più presto.</div>";
                  form.reset();
                } else {
                  msg.innerHTML = "<div class='p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 mt-4'>Errore durante l'invio. Riprova o contattaci su WhatsApp.</div>";
                }
              })
              .catch(() => {
                msg.innerHTML = "<div class='p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-200 mt-4'>Errore di rete. Riprova più tardi.</div>";
              })
              .finally(() => {
                btn.disabled = false;
                btn.innerHTML = "Invia Richiesta";
              });
            }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="b2b-locale" className="block text-sm font-medium text-white/60 mb-2">Nome Locale / Azienda</label>
                  <input type="text" id="b2b-locale" name="Nome Locale" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors" placeholder="Es. Il Mastro Birraio" />
                </div>
                <div>
                  <label htmlFor="b2b-referente" className="block text-sm font-medium text-white/60 mb-2">Referente</label>
                  <input type="text" id="b2b-referente" name="Referente" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors" placeholder="Nome e Cognome" />
                </div>
                <div>
                  <label htmlFor="b2b-zona" className="block text-sm font-medium text-white/60 mb-2">Zona / Città</label>
                  <input type="text" id="b2b-zona" name="Zona" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors" placeholder="Es. Roma Nord, Fiumicino..." />
                </div>
                <div>
                  <label htmlFor="b2b-email" className="block text-sm font-medium text-white/60 mb-2">Email</label>
                  <input type="email" id="b2b-email" name="Email" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors" placeholder="email@esempio.it" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="b2b-telefono" className="block text-sm font-medium text-white/60 mb-2">Telefono</label>
                  <input type="tel" id="b2b-telefono" name="Telefono" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors" placeholder="+39 ..." />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-white/60 mb-4">Birre di interesse (Multi-selezione)</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" id="beer-fresh" className="w-5 h-5 accent-[#D4A24E] bg-black border-white/20 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]" />
                    <span className="text-white group-hover:text-[#D4A24E] transition-colors">Fresh Wave (Helles)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" id="beer-red" className="w-5 h-5 accent-[#D4A24E] bg-black border-white/20 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]" />
                    <span className="text-white group-hover:text-[#D4A24E] transition-colors">Red Moon (Red Ale)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" id="beer-enjoy" className="w-5 h-5 accent-[#D4A24E] bg-black border-white/20 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]" />
                    <span className="text-white group-hover:text-[#D4A24E] transition-colors">Enjoy (IPA)</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="b2b-note" className="block text-sm font-medium text-white/60 mb-2">Note (Opzionale)</label>
                <textarea id="b2b-note" name="Note" rows="3" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E] transition-colors resize-none" placeholder="Richieste particolari, orari di contatto..."></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
                <button type="submit" className="bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-4 rounded-full font-bold flex-1 w-full sm:w-auto text-center disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]">
                  Invia Richiesta
                </button>
                <span className="text-white/60">oppure</span>
                <a href="https://wa.me/393491973069?text=Ciao%2C%20gestisco%20un%20locale%20e%20vorrei%20ricevere%20il%20vostro%20listino%20Horeca%20per%20fusti%20e%20bottiglie." target="_blank" rel="noopener noreferrer" className="border border-white/20 text-white hover:bg-white/10 transition-colors px-6 py-4 rounded-full font-bold flex items-center justify-center gap-2 w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Contattaci su WhatsApp
                </a>
              </div>
              
              <div className="form-message w-full"></div>
            </form>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
