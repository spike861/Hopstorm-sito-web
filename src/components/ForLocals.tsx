import { motion } from 'motion/react';
import { CheckCircle2, Users, Beer, MapPin, ArrowRight } from 'lucide-react';

export default function ForLocals() {
  return (
    <section id="per-i-locali" className="bg-black py-32 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
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
        
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {[
            {
              icon: <CheckCircle2 size={24} />,
              title: "Fornitura diretta e continuativa",
              desc: "Consegne puntuali, stock sempre disponibile e un referente dedicato con cui parlare quando serve. Birra fresca, sempre."
            },
            {
              icon: <Users size={24} />,
              title: "Formazione per il tuo staff",
              desc: "Perché il tuo personale sappia raccontare ogni birra Hop Storm ai clienti: profilo aromatico, abbinamenti, temperatura di servizio. Una birra spiegata bene si vende il doppio."
            },
            {
              icon: <Beer size={24} />,
              title: "Supporto per eventi",
              desc: "Supporto per eventi e degustazioni direttamente nel tuo locale per coinvolgere i clienti."
            },
            {
              icon: <MapPin size={24} />,
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
              className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8"
            >
              <div className="text-[#D4A24E] mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
              <p className="text-white/60 leading-relaxed">
                {feature.desc}
              </p>
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
              <strong className="text-white">Fresh Wave</strong> (Helles Lager, 4,5%) e <strong className="text-white">Red Moon</strong> (Rossa, 5,8%) sono disponibili sia in fusti da 20 litri per la spillatura sia in bottiglie da 33 cl.
            </p>
            <p className="text-white/70 leading-relaxed">
              Puoi scegliere un formato o entrambi, a seconda del tipo di locale, dello spazio disponibile e del volume che gestisci. Possiamo studiare insieme la combinazione più adatta a te.
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
            Contattaci per ricevere il listino dedicato ai locali e per fissare un assaggio gratuito delle nostre birre direttamente nel tuo locale. Nessun impegno, nessun minimo d'ordine per iniziare.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#" className="bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2">
              Richiedi il Listino <ArrowRight size={20} />
            </a>
            <a href="#" className="border border-white/20 text-white hover:bg-white/5 transition-colors px-8 py-4 rounded-full font-bold flex items-center justify-center">
              Prenota un Assaggio
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
