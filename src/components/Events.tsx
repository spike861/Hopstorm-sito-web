import { motion } from 'motion/react';
import { MapPin, Calendar, ArrowRight, Mail } from 'lucide-react';

export default function Events() {
  const upcomingEvents = [
    {
      title: "Hop Storm @ Palatorrino Boxe Night",
      type: "Evento Sportivo",
      date: "Maggio 2026",
      time: "Apertura ore 18:00",
      location: "Roma (Torrino)",
      address: "Palatorrino, Via Fiume Giallo 47",
      description: "Hop Storm sale sul ring. Saremo presenti come partner ufficiale alla grande serata di boxe al Palatorrino. Birra artigianale, adrenalina e grande sport: un'accoppiata vincente. Vi aspettiamo a bordo ring con le nostre spine per goderci lo spettacolo insieme.",
      image: "https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557008/foto/redmoon_pub_cel_l7iv47.jpg",
      featured: true
    }
  ];

  const pastEvents = [
    {
      title: "Hop Storm alla 73ª Sagra del Carciofo",
      type: "Festival",
      date: "10-12 Aprile 2026",
      location: "Ladispoli (RM)",
      image: "https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557007/foto/HOP_STORM_sagra_carciofo_jyrnla.jpg"
    }
  ];

  return (
    <section id="eventi" className="bg-[#050505] py-24 md:py-32 px-6 flex flex-col overflow-hidden border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header SEO Optimized */}
        <header className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 uppercase"
          >
            La Nostra <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A24E] to-[#C0392B]">Community</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            Degustazioni, tap takeover nei pub di Roma ed eventi sportivi. Scopri dove berci alla spina e incontrare il team Hop Storm.
          </motion.p>
        </header>

        {/* Featured Event */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-3 rounded-full bg-[#D4A24E] animate-pulse shadow-[0_0_10px_rgba(212,162,78,0.8)]"></div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Prossimo Evento</h3>
          </div>
          
          {upcomingEvents.filter(e => e.featured).map((event, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-[#D4A24E]/30 flex flex-col lg:flex-row shadow-2xl"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A24E] to-[#C0392B] z-20" />

              {/* Image Side */}
              <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:bg-gradient-to-t" />
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-gradient-to-r from-[#D4A24E] to-[#C0392B] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    {event.type}
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-6">
                  {/* Big Date Block */}
                  <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[120px] text-center shrink-0">
                    <Calendar className="text-[#D4A24E] mb-2" size={24} />
                    <span className="text-xl font-bold text-white leading-tight">{event.date}</span>
                  </div>
                  <div>
                    <h4 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[#D4A24E] text-sm font-medium">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/70 text-lg leading-relaxed mb-8 font-light">
                  {event.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <div className="space-y-1 w-full sm:w-auto">
                    <div className="text-white/50 text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/30"></span> {event.address}</div>
                    <div className="text-white/50 text-sm flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white/30"></span> {event.time}</div>
                  </div>
                  <a 
                    href="https://wa.me/393491973069?text=Ciao%2C%20vorrei%20info%20sull'evento%20di%20boxe%20al%20Palatorrino." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full sm:w-auto bg-gradient-to-r from-[#D4A24E] to-[#C0392B] text-white hover:shadow-[0_0_20px_rgba(212,162,78,0.4)] transition-all px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-wider whitespace-nowrap"
                  >
                    Partecipa Ora <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Past Events Grid */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Archivio Eventi</h3>
            <div className="h-px bg-white/10 flex-grow ml-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#050505]">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/80 backdrop-blur-md text-white/40 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
                      Concluso
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow relative z-10 -mt-12">
                  <div className="text-[#D4A24E]/70 text-xs font-mono uppercase tracking-widest mb-3">{event.date}</div>
                  <h4 className="text-xl font-bold text-white/80 mb-4 group-hover:text-white transition-colors leading-tight">{event.title}</h4>
                  <div className="mt-auto flex items-center gap-2 text-white/40 text-sm">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Newsletter CTA (Centered since gallery is removed) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#110D05] to-[#0a0a0a] border border-[#D4A24E]/20 rounded-3xl p-10 md:p-16 relative overflow-hidden max-w-4xl mx-auto text-center"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A24E] to-[#C0392B]"></div>
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-8 text-[#D4A24E] mx-auto">
            <Mail size={32} />
          </div>
          <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">Non perderti la prossima spina.</h4>
          <p className="text-white/70 text-lg mb-10 font-light max-w-2xl mx-auto">
            Iscriviti alla nostra newsletter. Zero spam, solo aggiornamenti su nuove cotte, eventi esclusivi e sconti per lo shop online.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="La tua email" 
              className="flex-grow bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4A24E] transition-colors"
              required
            />
            <button type="submit" className="bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider whitespace-nowrap">
              Iscriviti
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
