import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export default function WhereToFindUs() {
  const locations = [
    {
      name: "Sergio's Rustichelli",
      type: "Bar",
      city: "Fiumicino"
    },
    {
      name: "Benny's Burger",
      type: "Bar",
      city: "Aranova"
    },
    {
      name: "Cillo's pub Monte Mario",
      type: "Pub",
      city: "Roma"
    }
  ];

  return (
    <section id="dove-trovarci" className="bg-black py-32 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-4"
          >
            Dove <span className="text-[#D4A24E]">Trovarci</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-xl"
          >
            Cerca le nostre birre nei migliori locali della zona.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-[#D4A24E]/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">{loc.name}</h3>
                <span className="bg-white/10 text-white/60 text-sm px-3 py-1 rounded-full">
                  {loc.type}
                </span>
              </div>
              <div className="flex items-center text-white/60 gap-2">
                <MapPin size={18} />
                <span>{loc.city}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#110D05] border border-[#D4A24E]/20 rounded-2xl p-8 text-center"
        >
          <p className="text-white/80 mb-4">Hai un locale e vuoi inserire le nostre birre?</p>
          <a href="#per-i-locali" className="text-[#D4A24E] font-bold hover:text-white transition-colors">
            Scopri come diventare partner
          </a>
        </motion.div>
      </div>
    </section>
  );
}
