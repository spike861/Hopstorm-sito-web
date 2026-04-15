import { motion } from 'motion/react';
import { ShoppingBag, Package, ArrowRight, MapPin } from 'lucide-react';

export default function ForPrivate() {
  return (
    <section id="per-i-privati" className="bg-black pt-16 md:pt-20 pb-24 md:pb-32 px-6 flex flex-col overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-4 leading-tight"
          >
            Per i <span className="text-[#E53935]">Privati</span>
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-[#E53935] mb-8"
          >
            Birra artigianale, a casa tua.
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-xl leading-relaxed"
          >
            Non serve andare al pub per bere una birra artigianale come si deve. Fresh Wave e Red Moon le puoi avere nel tuo frigo, pronte per una serata con gli amici, una grigliata nel weekend o semplicemente per quel momento a fine giornata in cui ti meriti qualcosa di buono.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-[#E53935]">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-3xl font-bold text-white">Come acquistare</h3>
            </div>
            <p className="text-white/70 mb-12 leading-relaxed">
              Puoi ordinare le nostre birre online e riceverle direttamente a casa, oppure trovarle nei locali della nostra rete partner. In entrambi i casi la birra è la stessa: fresca, artigianale, senza compromessi.
            </p>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-[#D4A24E]">
                  <Package size={24} />
                </div>
                <h4 className="text-xl font-bold text-white">Formati</h4>
              </div>
              <p className="text-white/60 leading-relaxed">
                Bottiglie da 33 cl, singole o in confezioni da 6 e 12. Puoi prendere solo Fresh Wave, solo Red Moon, oppure mescolare le due e scoprire quale preferisci.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1A0A0A] border border-[#E53935]/20 rounded-3xl p-8 md:p-12"
          >
            <h3 className="text-3xl font-bold text-[#E53935] mb-8">Non sai quale scegliere?</h3>
            
            <div className="mb-8">
              <h4 className="text-xl font-bold text-[#D4A24E] mb-3">Fresh Wave</h4>
              <p className="text-white/70 leading-relaxed">
                È la birra per chi cerca freschezza e leggerezza: agrumata, secca, dissetante. Perfetta d'estate, con il pesce, con la pizza, o da sola dopo una giornata calda.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-bold text-[#E53935] mb-3">Red Moon</h4>
              <p className="text-white/70 leading-relaxed">
                È per chi vuole più profondità: maltata, avvolgente, con note di caramello e frutta secca. Ideale con la carne, con i formaggi stagionati, o a fine pasto con un cioccolato fondente.
              </p>
            </div>

            <p className="text-white/90 italic font-medium">
              Il nostro consiglio? Prova entrambe. La maggior parte dei nostri clienti finisce per tenerle tutte e due in frigo.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a href="https://wa.me/393491973069?text=Ciao%20Hop%20Storm!%20Vorrei%20ordinare%20delle%20birre%20a%20casa.%20Potete%20mandarmi%20i%20prezzi%20dei%20Box%20da%206%20e%20da%2012%20e%20le%20info%20sulla%20spedizione%3F" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#E53935] to-[#B71C1C] text-white hover:opacity-90 transition-opacity px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2">
            Ordina Online <ArrowRight size={20} />
          </a>
          <a href="#dove-trovarci" className="border border-white/20 text-white hover:bg-white/5 transition-colors px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2">
            <MapPin size={20} /> Trova un Locale Partner
          </a>
        </motion.div>
      </div>
    </section>
  );
}
