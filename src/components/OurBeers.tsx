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
    whatsappBusiness: "https://wa.me/393491973069?text=Ciao%2C%20gestisco%20un%20locale%20e%20vorrei%20ricevere%20il%20vostro%20listino%20Horeca%20per%20fusti%20e%20bottiglie.",
    theme: {
      cardBg: "bg-gradient-to-b from-[#0a0f12] to-[#050505]",
      border: "border-white/10 hover:border-[#D4A24E]/50 hover:shadow-[0_0_30px_rgba(212,162,78,0.15)]",
      imageBg: "bg-gradient-to-b from-[#121a20] to-[#0a0f12]",
      glow: "radial-gradient(circle at center, rgba(212,162,78,0.2) 0%, transparent 60%)",
      badgeBg: "bg-white/10 backdrop-blur-md border border-white/20 text-white",
      iconBg: "bg-white/5 backdrop-blur-md border border-white/10 text-[#D4A24E]",
      title: "text-white",
      styleText: "text-[#D4A24E] font-light tracking-[0.2em]",
      btnPrimary: "bg-white text-black hover:bg-gray-200",
      btnSecondary: "border-white/20 text-white hover:bg-white/10"
    }
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
    whatsappBusiness: "https://wa.me/393491973069?text=Ciao%2C%20gestisco%20un%20locale%20e%20vorrei%20ricevere%20il%20vostro%20listino%20Horeca%20per%20fusti%20e%20bottiglie.",
    theme: {
      cardBg: "bg-gradient-to-b from-[#140505] to-[#050505]",
      border: "border-[#C0392B]/20 hover:border-[#C0392B]/60 hover:shadow-[0_0_40px_rgba(192,57,43,0.2)]",
      imageBg: "bg-gradient-to-b from-[#2a0808] to-[#140505]",
      glow: "radial-gradient(circle at center, rgba(192,57,43,0.3) 0%, transparent 70%)",
      badgeBg: "bg-black/80 border border-[#C0392B]/30 text-[#C0392B]",
      iconBg: "bg-black/80 border border-[#C0392B]/30 text-[#C0392B]",
      title: "text-white drop-shadow-[0_2px_15px_rgba(192,57,43,0.6)]",
      styleText: "text-[#C0392B] font-bold tracking-[0.1em]",
      btnPrimary: "bg-[#C0392B] text-white hover:bg-red-600",
      btnSecondary: "border-[#C0392B]/30 text-[#C0392B] hover:bg-[#C0392B]/10"
    }
  }
];

export default function OurBeers() {
  return (
    <section id="le-nostre-birre" className="bg-[#050505] py-24 md:py-32 px-6 relative z-10 flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
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
              className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-700 border ${beer.theme.cardBg} ${beer.theme.border}`}
            >
              {/* Image Header */}
              <div className={`relative h-[450px] lg:h-[550px] flex items-center justify-center p-8 ${beer.theme.imageBg}`}>
                {/* Custom Radial Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                  style={{ background: beer.theme.glow }} 
                />

                <img 
                  src={beer.image} 
                  alt={beer.name} 
                  className="relative z-10 max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none z-20" />
                
                {/* Top Badges */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-30">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${beer.theme.iconBg}`}
                  >
                    <beer.icon size={24} />
                  </div>
                  <div className={`px-4 py-2 rounded-full font-mono text-sm font-bold tracking-wider transition-colors duration-500 ${beer.theme.badgeBg}`}>
                    {beer.abv}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-8 lg:p-10 relative z-30 -mt-12">
                <div className="mb-8">
                  <h3 className={`text-4xl md:text-5xl font-bold mb-2 tracking-tight ${beer.theme.title}`}>{beer.name}</h3>
                  <p className={`text-lg uppercase ${beer.theme.styleText}`}>
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
                    className={`flex-1 transition-colors px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-wider ${beer.theme.btnPrimary}`}
                  >
                    <ShoppingBag size={18} /> Ordina
                  </a>
                  <a 
                    href={beer.whatsappBusiness}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex-1 bg-transparent border transition-colors px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-wider ${beer.theme.btnSecondary}`}
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
