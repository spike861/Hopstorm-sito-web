import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function BeerSection({ 
  title, 
  subtitle, 
  type, 
  imageSrc, 
  description, 
  pairing, 
  specs,
  reverse = false,
  color = "#D4A24E"
}: any) {
  const [activeTab, setActiveTab] = useState('descrizione');

  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-start mb-32`}>
      <div className="w-full lg:w-1/2 flex justify-center">
        <img src={imageSrc} alt={title} className="w-full max-h-[800px] object-contain rounded-2xl" />
      </div>
      <div className="w-full lg:w-1/2 text-white/80">
        <h3 className="text-5xl md:text-7xl font-bold text-white mb-2">{title}</h3>
        <p style={{ color }} className="text-2xl font-medium mb-6">{subtitle}</p>
        <p className="text-sm tracking-widest uppercase mb-12 text-white/50">{type}</p>
        
        {/* Tabs */}
        <div className="flex gap-4 md:gap-8 border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
          {['descrizione', 'abbinamenti', 'scheda tecnica'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xs md:text-sm font-bold tracking-widest uppercase transition-colors relative whitespace-nowrap flex-shrink-0 ${
                activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId={`indicator-${title}`}
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: color }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === 'descrizione' && (
              <motion.div 
                key="descrizione"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-lg leading-relaxed"
              >
                {description}
              </motion.div>
            )}
            {activeTab === 'abbinamenti' && (
              <motion.div 
                key="abbinamenti"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg leading-relaxed"
              >
                {pairing}
              </motion.div>
            )}
            {activeTab === 'scheda tecnica' && (
              <motion.div 
                key="scheda tecnica"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ul className="space-y-4 text-white/70 text-lg">
                  {specs.map((spec: any, i: number) => (
                    <li key={i}>
                      <strong className="text-white/90">{spec.label}:</strong> {spec.value}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function OurBeers() {
  return (
    <section id="le-nostre-birre" className="bg-black py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl tracking-tighter text-white/90 font-bold mb-6 uppercase"
          >
            Due birre. Zero compromessi.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-xl mx-auto text-xl"
          >
            Fresh Wave per la sete. Red Moon per il carattere.
          </motion.p>
        </div>

        <BeerSection 
          title="Fresh Wave"
          subtitle="Helles Lager"
          type="Birra chiara artigianale ad alta fermentazione"
          imageSrc="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557007/foto/freshwave_mare_cel_mjglil.jpg"
          color="#D4A24E"
          description={
            <>
              <p>Fresh Wave nasce dall'idea di creare una birra chiara che fosse dissetante senza essere anonima. Un equilibrio perfetto tra malto e luppolo, prodotta artigianalmente da Hop Storm, birrificio indipendente con radici a Roma e nel Lazio.</p>
              <p>Dal colore dorato luminoso e dalla schiuma bianca compatta e persistente, Fresh Wave conquista già al primo sguardo. Al naso si apre con un profumo agrumato fresco e invitante — note di cedro, pompelmo e un accenno floreale di luppolo — che anticipa un sorso pulito, leggero e immediatamente dissetante. Il corpo è snello ma mai banale: il malto dona una base morbida con sfumature di cereale e crosta di pane, mentre il finale secco e agrumato chiude con una pulizia che invita naturalmente al sorso successivo. Una chiama l'altra.</p>
              <p>Con una gradazione alcolica di 4,5% vol., Fresh Wave è pensata per le giornate calde, gli aperitivi all'aperto e le lunghe serate estive. Leggera abbastanza da accompagnare un intero pasto, strutturata abbastanza da farsi ricordare.</p>
            </>
          }
          pairing={
            <p>Fresh Wave è estremamente versatile a tavola. Pizza, focaccia, pollo e salsicce alla brace, pesce alla griglia o al forno, formaggi freschi e a media stagionatura: la sua freschezza agrumata taglia la sapidità dei piatti più saporiti ed esalta la delicatezza del pesce. Va servita fredda, tra i 6 e gli 8 °C, per apprezzarne al meglio il profilo aromatico.</p>
          }
          specs={[
            { label: "Stile", value: "Helles Lager — birra chiara ad alta fermentazione" },
            { label: "Gradazione alcolica", value: "4,5% vol." },
            { label: "Colore", value: "dorato luminoso" },
            { label: "Schiuma", value: "bianca, compatta, persistente" },
            { label: "Profumo", value: "agrumato, fresco, note di cedro e pompelmo" },
            { label: "Gusto", value: "malto delicato, cereale, finale secco e dissetante" },
            { label: "Temperatura di servizio", value: "6–8 °C" },
            { label: "Formato", value: "bottiglia 33 cl | fusto 20 lt" },
            { label: "Prodotta da", value: "Hop Storm — birrificio artigianale, Roma (Lazio)." }
          ]}
        />

        <BeerSection 
          title="Red Moon"
          subtitle="Rossa Artigianale"
          type="Birra rossa ad alta fermentazione"
          imageSrc="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557008/foto/redmoon_pub_cel_l7iv47.jpg"
          color="#C0392B"
          reverse={true}
          description={
            <>
              <p>Red Moon è una birra rossa artigianale dal carattere deciso, pensata per chi non si accontenta del solito sorso. Prodotta da Hop Storm, birrificio artigianale indipendente con radici a Roma e nel Lazio, è una birra che chiede attenzione e la ripaga con profondità.</p>
              <p>Dal colore ambrato intenso, quasi ramato, con riflessi rossi che si accendono alla luce, Red Moon si presenta con una schiuma bianca fine e persistente che anticipa un profilo aromatico ricco e stratificato. Al naso emergono note calde di caramello, frutta secca e biscotto — un bouquet avvolgente che ricorda il malto appena tostato e invita al primo sorso.</p>
              <p>In bocca mantiene ogni promessa. La base maltata è piena e rotonda, con il caramello che si intreccia a sfumature di crosta di pane e nocciola, mentre un amaro morbido e mai invadente bilancia il tutto e porta verso un finale lungo e pulito. Non è una birra che si beve distrattamente: ogni sorso rivela qualcosa di nuovo, uno strato diverso. È la birra da scegliere quando la serata chiede qualcosa in più.</p>
              <p>Con una gradazione alcolica di 5,8% vol., Red Moon ha il corpo e la struttura per reggere piatti importanti senza mai risultare pesante.</p>
            </>
          }
          pairing={
            <p>Red Moon dà il meglio di sé accanto a sapori intensi e decisi. Secondi di carne — arrosti, brasati, grigliate — trovano in questa rossa artigianale una compagna ideale, capace di sostenerne la struttura senza sovrastarli. Ottima anche con pizze dai condimenti ricchi e saporiti. Ma la vera sorpresa è a fine pasto: Red Moon si abbina in modo straordinario con dolci a base di frutta secca, cioccolato fondente o caffè, dove le sue note di caramello e biscotto creano un gioco di specchi con il dessert. Va servita tra i 6 e i 10 °C: più fredda per esaltare la pulizia, più verso i 10 °C per liberare tutta la complessità aromatica.</p>
          }
          specs={[
            { label: "Stile", value: "Rossa artigianale — birra ad alta fermentazione" },
            { label: "Gradazione alcolica", value: "5,8% vol." },
            { label: "Colore", value: "ambrato intenso con riflessi rossi" },
            { label: "Schiuma", value: "bianca, fine, persistente" },
            { label: "Profumo", value: "caramello, frutta secca, biscotto, malto tostato" },
            { label: "Gusto", value: "maltato, rotondo, caramello e nocciola, amaro morbido, finale lungo" },
            { label: "Temperatura di servizio", value: "6–10 °C" },
            { label: "Formato", value: "bottiglia 33 cl | fusto 20 lt" },
            { label: "Prodotta da", value: "Hop Storm — birrificio artigianale, Roma (Lazio)." }
          ]}
        />

      </div>
    </section>
  );
}
