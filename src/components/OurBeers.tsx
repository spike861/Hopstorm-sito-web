import { motion } from 'motion/react';
import { ShoppingBag, Store, Droplets, Flame } from 'lucide-react';

const beers = [
  {
    id: "fresh-wave",
    name: "Fresh Wave",
    style: "Helles Lager",
    abv: "4,5% VOL",
    color: "#D4A24E",
    image: "https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557007/foto/freshwave_mare_cel_mjglil.jpg",
    description: "Chiara, fresca e dissetante. Un equilibrio perfetto tra malto e luppolo per una bevuta pulita che non stanca mai.",
    icon: Droplets,
    specs: [
      { label: "Profilo Aromatico", value: "Agrumato, cedro, finale secco" },
      { label: "Corpo", value: "Snello, scorrevole e beverino" },
      { label: "Abbinamenti Ideali", value: "Pizza, pesce, carni bianche" }
    ],
    whatsappPrivate: "https://wa.me/393491973069?text=Ciao%20Hop%20Storm!%20Vorrei%20ordinare%20delle%20birre%20a%20casa.%20Potete%20mandarmi%20i%20prezzi%20dei%20Box%20da%206%20e%20da%2012%20e%20le%20info%20sulla%20spedizione%3F",
    whatsappBusiness: "https://wa.me/393491973069?text=Ciao%2C%20gestisco%20un%20locale%20e%20vorrei%20ricevere%20il%20vostro%20listino%20Horeca%20per%20fusti%20e%20bottiglie."
  },
  {
    id: "red-moon",
    name: "Red Moon",
    style: "Rossa Artigianale",
    abv: "5,8% VOL",
    color: "#C0392B",
    image: "https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557008/foto/redmoon_pub_cel_l7iv47.jpg",
    description: "Dal carattere deciso e dalla struttura avvolgente. Una birra complessa, maltata, perfetta per accompagnare sapori intensi.",
    icon: Flame,
    specs: [
      { label: "Profilo Aromatico", value: "Caramello, nocciola, malto tostato" },
      { label: "Corpo", value: "Rotondo, pieno e strutturato" },
      { label: "Abbinamenti Ideali", value: "Carni rosse, formaggi stagionati, dolci" }
    ],
    whatsappPrivate: "https://wa.me/393491973069?text=Ciao%20Hop%20Storm!%20Vorrei%20ordinare%20delle%20birre%20a%20casa.%20Potete%20mandarmi%20i%20prezzi%20dei%20Box%20da%206%20e%20da%2012%20e%20le%20info%20sulla%20spedizione%3F",
    whatsappBusiness: "https://wa.me/393491973069?text=Ciao%2C%20gestisco%20un%20locale%20e%20vorrei%20ricevere%20il%20vostro%20listino%20Horeca%20per%20fusti%20e%20bottiglie."
  }
];

export default function OurBeers() {
  return (
    <section id="le-nostre-birre" className="bg-[#050505] py-32 px-6 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl tracking-tighter text-white font-bold mb-6 uppercase"
          >
            Scegli il tuo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A24E] to-[#C0392B]">Carattere</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-2xl mx-auto text-xl font-light"
          >
            Due visioni opposte della birra artigianale. Stessa cura maniacale per i dettagli. Confronta e scegli la tua prossima bevuta.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {beers.map((beer, index) => (
            <motion.div 
              key={beer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative flex flex-col bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
            >
              {/* Image Header */}
              <div className="relative h-[450px] lg:h-[550px] bg-[#0a0a0a] flex items-center justify-center p-8">
                <img 
                  src={beer.image} 
                  alt={beer.name} 
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent pointer-events-none" />
                
                {/* Top Badges */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-black/40 border border-white/10"
                    style={{ color: beer.color }}
                  >
                    <beer.icon size={24} />
                  </div>
                  <div className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full font-mono text-sm font-bold tracking-wider">
                    {beer.abv}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-8 lg:p-10 relative z-10 -mt-20">
                <div className="mb-8">
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{beer.name}</h3>
                  <p style={{ color: beer.color }} className="text-lg font-bold uppercase tracking-widest">
                    {beer.style}
                  </p>
                </div>

                <p className="text-white/70 text-lg leading-relaxed font-light mb-10 flex-grow">
                  {beer.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 gap-6 mb-12">
                  {beer.specs.map((spec, i) => (
                    <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <span className="block text-xs uppercase tracking-widest text-white/40 mb-1">{spec.label}</span>
                      <span className="block text-white/90 font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <a 
                    href={beer.whatsappPrivate}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-white text-black hover:bg-gray-200 transition-colors px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                  >
                    <ShoppingBag size={18} /> Ordina
                  </a>
                  <a 
                    href={beer.whatsappBusiness}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-transparent border border-white/20 text-white hover:bg-white/10 transition-colors px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                  >
                    <Store size={18} /> Per Locali
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
