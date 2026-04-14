import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: textScroll } = useScroll({
    target: textRef,
    offset: ["start bottom", "start 80%"]
  });

  // Background darkens quickly as the text enters the screen
  const bgOpacity = useTransform(textScroll, [0, 1], [0, 0.85]);

  return (
    <section id="chi-siamo" ref={containerRef} className="relative bg-black">
      {/* Sticky Background Container */}
      <div className="absolute inset-0 h-full w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background Image */}
          <img 
            src="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557008/foto/luppoleto_mbz6xy.jpg" 
            alt="Luppoleto Hop Storm" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Darkening Overlay */}
          <motion.div 
            className="absolute inset-0 bg-black"
            style={{ opacity: bgOpacity }}
          />
        </div>
      </div>

      {/* Text Content - Scrolls normally */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-[150vh] pb-[20vh]">
        <div ref={textRef} className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 drop-shadow-2xl">
            Chi Siamo
          </h2>
          <p className="text-2xl md:text-3xl text-[#D4A24E] font-medium drop-shadow-lg">
            Nati da una tempesta, mossi dalla passione.
          </p>
        </div>
        
        <div className="space-y-12 text-white/90 text-xl md:text-2xl leading-relaxed text-left font-light drop-shadow-md">
          <p>
            Tutto nasce da un'ossessione per la birra fatta bene. Non un progetto calcolato, non un business plan. Una cosa più semplice e più testarda: la convinzione che tra le birre tutte uguali sugli scaffali ci fosse spazio per qualcosa con più carattere. Così sono cominciate le prime serate a sperimentare ricette, correggere, rifare, assaggiare, buttare via e ricominciare da capo. Sere che sapevano di luppolo e ostinazione.
          </p>
          <p>
            Hop Storm è nato da quelle sere. Un birrificio artigianale indipendente, con radici a Roma e nel Lazio, fondato sull'idea che la birra non debba mai essere un compromesso.
          </p>
          
          <div className="pt-8">
            <h3 className="text-4xl font-bold text-white mb-6 text-center drop-shadow-xl">Come lavoriamo</h3>
            <p className="font-medium text-[#D4A24E] text-center mb-6 text-2xl drop-shadow-lg">Non filtriamo. Non pastorizziamo. Non prendiamo scorciatoie.</p>
            <p className="mb-6">
              Ogni bottiglia di Hop Storm è il risultato di un processo artigianale che rispetta i tempi della fermentazione, gli equilibri del malto e la potenza espressiva del luppolo. Niente additivi, niente correzioni. Una birra buona non si aggiusta dopo si progetta bene dall'inizio e si lascia vivere.
            </p>
            <p>
              Lavoriamo con malti, luppoli e lieviti selezionati con cura, privilegiando la qualità delle materie prime su tutto il resto.
            </p>
          </div>

          <div className="pt-8">
            <h3 className="text-4xl font-bold text-white mb-6 text-center drop-shadow-xl">Perché "Hop Storm"</h3>
            <p>
              Tempesta di luppolo. Il nome racconta la nostra idea di birra: intensa, vivace, capace di sorprendere. Ma le tempeste portano anche pulizia dopo il temporale l'aria è più fresca, più vera. È quello che vogliamo nel bicchiere.
            </p>
          </div>

          <div className="pt-8">
            <h3 className="text-4xl font-bold text-white mb-6 text-center drop-shadow-xl">Cosa ci guida</h3>
            <p className="mb-6">
              Siamo un birrificio indipendente. Nessun gruppo industriale alle spalle, nessun compromesso imposto dal mercato. Solo le nostre ricette, la nostra visione e un'unica regola: fare birra che abbiamo voglia di bere noi per primi.
            </p>
            <p>
              Non produciamo una bevanda. Produciamo un'occasione di condivisione, di scoperta, di piacere autentico. Ogni birra che trovi sotto il marchio Hop Storm porta con sé un pezzo di quell'ostinazione originale, l'energia di chi ha creduto che fare le cose bene, davvero bene, valesse tutta la fatica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
