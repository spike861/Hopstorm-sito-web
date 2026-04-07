import { motion } from 'motion/react';
import { MapPin, Calendar, Clock } from 'lucide-react';

export default function Events() {
  return (
    <section id="eventi" className="bg-black py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-[#D4A24E] tracking-tighter mb-6"
          >
            Eventi
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-xl max-w-2xl mx-auto"
          >
            Rimani aggiornato sulle nostre degustazioni, festival e serate speciali.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden aspect-[3/4]"
          >
            <img 
              src="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557007/foto/HOP_STORM_sagra_carciofo_jyrnla.jpg" 
              alt="Stand Hop Storm" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="bg-[#D4A24E] text-black text-sm font-bold px-4 py-1 rounded-full w-fit mb-4">
                Prossimo Evento
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Hop Storm alla 73ª Sagra del Carciofo Romanesco
              </h3>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="text-white/70 leading-relaxed text-lg space-y-6">
              <p>
                Ci trovate alla Sagra del Carciofo Romanesco di Ladispoli, uno degli appuntamenti più attesi della primavera nel Lazio. Tre giorni nel cuore della città, tra stand gastronomici, degustazioni, spettacoli dal vivo e intrattenimento per tutti.
              </p>
              <p>
                Saremo presenti con il nostro stand già dalla pre-sagra per farvi assaggiare <strong className="text-white">Fresh Wave</strong> e <strong className="text-white">Red Moon</strong>. Venite a scoprire come una birra artigianale fresca può trasformare il vostro carciofo alla romana. Vi aspettiamo con spillatura diretta, degustazioni guidate e qualche sorpresa.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-[#D4A24E] mt-1">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Dove</h4>
                  <p className="text-white/60">Centro di Ladispoli, tra Viale Italia e Piazza Rossellini</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-[#D4A24E] mt-1">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Quando</h4>
                  <p className="text-white/60">Venerdì 10, sabato 11 e domenica 12 aprile 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-[#D4A24E] mt-1">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Orario</h4>
                  <p className="text-white/60">Dalle 10:00 a tarda sera</p>
                </div>
              </div>
            </div>

            <a href="#" className="border border-white/20 text-white hover:bg-white hover:text-black transition-colors px-8 py-4 rounded-full font-bold flex items-center justify-center w-fit">
              Seguici su Instagram per gli Aggiornamenti
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
