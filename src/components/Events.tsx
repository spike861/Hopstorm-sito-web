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
    <section id="eventi" className="bg-[#050505] py-32 px-6 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
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
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D4A24E] animate-pulse"></span>
            Prossimo Evento
          </h3>
          {upcomingEvents.filter(e => e.featured).map((event, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/10 grid lg:grid-cols-2 gap-0"
            >
              <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-[#D4A24E] text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    {event.type}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                  {event.title}
                </h4>
                <p className="text-white/70 text-lg leading-relaxed mb-8 font-light">
                  {event.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-[#D4A24E] shrink-0 mt-1" size={20} />
                    <div>
                      <span className="block text-white font-medium">{event.date}</span>
                      <span className="block text-white/50 text-sm">{event.time}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-[#D4A24E] shrink-0 mt-1" size={20} />
                    <div>
                      <span className="block text-white font-medium">{event.location}</span>
                      <span className="block text-white/50 text-sm">{event.address}</span>
                    </div>
                  </div>
                </div>
                <a href="https://wa.me/393491973069?text=Ciao%2C%20vorrei%20info%20sull'evento%20di%20boxe%20al%20Palatorrino." target="_blank" rel="noopener noreferrer" className="inline-flex w-fit bg-white text-black hover:bg-gray-200 transition-colors px-8 py-4 rounded-full font-bold items-center justify-center gap-2 text-sm uppercase tracking-wider">
                  Richiedi Info <ArrowRight size={18} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Past Events Grid */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-white mb-8">Eventi Passati</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/80 backdrop-blur-md text-white/70 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                      {event.type}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold text-white/80 mb-4 group-hover:text-white transition-colors">{event.title}</h4>
                  <div className="space-y-2 mt-auto">
                    <div className="flex items-center gap-3 text-white/50 text-sm">
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/50 text-sm">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
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
