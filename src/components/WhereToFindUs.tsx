import { motion } from 'motion/react';
import { MapPin, Navigation, Beer, Store } from 'lucide-react';

export default function WhereToFindUs() {
  const locations = [
    {
      name: "Sergio's Rustichelli",
      type: "Ristorante / Pizzeria",
      city: "Fiumicino",
      address: "Fiumicino, RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Sergio's+Rustichelli+Fiumicino"
    },
    {
      name: "Berny's Burger",
      type: "Burger Bar",
      city: "Aranova",
      address: "Aranova, Fiumicino RM",
      products: ["Fresh Wave"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Berny's+Burger+Aranova"
    },
    {
      name: "Cillo's pub Monte Mario",
      type: "Pub",
      city: "Roma",
      address: "Monte Mario, Roma RM",
      products: ["Fresh Wave", "Red Moon"],
      mapsLink: "https://www.google.com/maps/search/?api=1&query=Cillo's+pub+Monte+Mario+Roma"
    }
  ];

  return (
    <section id="dove-trovarci" className="bg-[#050505] py-24 md:py-32 px-6 flex flex-col overflow-hidden border-t border-white/5 relative">
      {/* Subtle grid background for a technical/premium feel */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <header className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 uppercase"
          >
            Bevi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A24E] to-[#C0392B]">Locale</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            I pub, burger bar e ristoranti che hanno scelto di non scendere a compromessi. Trova la spina o la bottiglia Hop Storm più vicina a te.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {locations.map((loc, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 flex flex-col group"
            >
              <header className="mb-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#D4A24E] transition-colors">{loc.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm font-mono uppercase tracking-wider mb-4">
                  <Store size={14} />
                  <span>{loc.type}</span>
                </div>
                <address className="flex items-start gap-2 text-white/70 not-italic">
                  <MapPin size={18} className="shrink-0 mt-0.5 text-[#D4A24E]" />
                  <span>{loc.address}</span>
                </address>
              </header>

              <div className="mb-8 flex-grow">
                <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-3">
                  <Beer size={14} />
                  <span>In mescita:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {loc.products.map((product, idx) => (
                    <span key={idx} className="bg-white/5 border border-white/10 text-white/80 text-sm px-3 py-1 rounded-full font-medium">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              <footer className="mt-auto">
                <a 
                  href={loc.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white transition-all px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                  aria-label={`Apri ${loc.name} su Google Maps`}
                >
                  <Navigation size={16} /> Apri su Maps
                </a>
              </footer>
            </motion.article>
          ))}
        </div>

        {/* B2B CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#110D05] to-[#0a0a0a] border border-[#D4A24E]/20 rounded-3xl p-10 text-center max-w-3xl mx-auto relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A24E] to-[#C0392B]"></div>
          <h4 className="text-3xl font-bold text-white mb-4">Hai un locale?</h4>
          <p className="text-white/70 text-lg mb-8 font-light">
            Unisciti ai partner che servono birra artigianale autentica. Contattaci per scoprire le condizioni riservate al settore Horeca.
          </p>
          <a 
            href="https://wa.me/393491973069?text=Ciao%2C%20gestisco%20un%20locale%20e%20vorrei%20ricevere%20il%20vostro%20listino%20Horeca%20per%20fusti%20e%20bottiglie." 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-4 rounded-full font-bold items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            Richiedi Listino Horeca
          </a>
        </motion.div>
      </div>
    </section>
  );
}
