import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Droplets, Shield, Leaf, Quote } from 'lucide-react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "start top"]
  });

  // Background darkens quickly as the user scrolls down into the section
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.85]);

  return (
    <section id="chi-siamo" ref={containerRef} className="relative bg-black min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Fixed Background Container */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557008/foto/luppoleto_mbz6xy.jpg")',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Darkening Overlay */}
        <motion.div 
          className="absolute inset-0 bg-black"
          style={{ opacity: bgOpacity }}
        />
      </div>

      {/* Text Content - Scrolls normally */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
        
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6 drop-shadow-2xl">
            Chi Siamo
          </h2>
          <p className="text-2xl md:text-3xl text-[#D4A24E] font-medium drop-shadow-lg mb-12">
            Nati da una tempesta, mossi dalla passione.
          </p>
          <div className="space-y-8 text-white/90 text-xl md:text-2xl leading-relaxed text-left font-light drop-shadow-md">
            <p>
              Tutto nasce da un'ossessione per la birra fatta bene. Non un progetto calcolato, non un business plan. Una cosa più semplice e più testarda: la convinzione che tra le birre tutte uguali sugli scaffali ci fosse spazio per qualcosa con più carattere. Così sono cominciate le prime serate a sperimentare ricette, correggere, rifare, assaggiare, buttare via e ricominciare da capo. Sere che sapevano di luppolo e ostinazione.
            </p>
            <p>
              Hop Storm è nato da quelle sere. Un birrificio artigianale indipendente, con radici a Roma e nel Lazio, fondato sull'idea che la birra non debba mai essere un compromesso.
            </p>
          </div>
        </div>
        
        {/* Section 1: Come lavoriamo (List with Icons) */}
        <div className="mt-32 max-w-6xl mx-auto">
          <h3 className="text-sm font-mono text-[#D4A24E] tracking-[0.2em] uppercase mb-12 text-center">01. Come lavoriamo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors duration-500">
              <Droplets className="text-[#D4A24E] mb-8" size={40} strokeWidth={1.5} />
              <h4 className="text-2xl font-bold text-white mb-4">Nessun Filtro</h4>
              <p className="text-white/70 font-light leading-relaxed text-lg">
                Non filtriamo e non pastorizziamo. Rispettiamo i tempi della fermentazione per lasciare la birra viva, integra e ricca di sfumature.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors duration-500">
              <Shield className="text-[#D4A24E] mb-8" size={40} strokeWidth={1.5} />
              <h4 className="text-2xl font-bold text-white mb-4">Niente Scorciatoie</h4>
              <p className="text-white/70 font-light leading-relaxed text-lg">
                Niente additivi, niente correzioni. Una birra buona non si aggiusta dopo: si progetta bene dall'inizio e si lascia vivere.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors duration-500">
              <Leaf className="text-[#D4A24E] mb-8" size={40} strokeWidth={1.5} />
              <h4 className="text-2xl font-bold text-white mb-4">Materia Prima</h4>
              <p className="text-white/70 font-light leading-relaxed text-lg">
                Lavoriamo con malti, luppoli e lieviti selezionati con cura estrema, privilegiando la qualità assoluta su tutto il resto.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Perché Hop Storm (Large Typographic Quote) */}
        <div className="mt-40 py-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-white/5 pointer-events-none">
            <Quote size={180} />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h3 className="text-sm font-mono text-white/40 tracking-[0.2em] uppercase mb-12">02. Perché Hop Storm</h3>
            <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-2xl">
              "Tempesta di luppolo. Intensa, vivace, capace di sorprendere. Ma le tempeste portano anche pulizia: <span className="text-[#D4A24E]">dopo il temporale l'aria è più fresca, più vera.</span> È quello che vogliamo nel bicchiere."
            </p>
          </div>
        </div>

        {/* Section 3: Cosa ci guida (Split Layout) */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <h3 className="text-sm font-mono text-[#D4A24E] tracking-[0.2em] uppercase mb-6">03. Cosa ci guida</h3>
            <h4 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Spirito<br/>Indipendente.</h4>
            <p className="text-xl text-white/80 font-light leading-relaxed mb-6">
              Nessun gruppo industriale alle spalle, nessun compromesso imposto dal mercato. Solo le nostre ricette, la nostra visione e un'unica regola: fare birra che abbiamo voglia di bere noi per primi.
            </p>
            <p className="text-xl text-white/80 font-light leading-relaxed">
              Siamo nati da un'ossessione per la birra fatta bene. Non un progetto calcolato, ma la testarda convinzione che sugli scaffali ci fosse spazio per qualcosa con più carattere.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#110D05] to-[#0a0a0a] border border-[#D4A24E]/20 p-10 md:p-14 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A24E] to-[#C0392B]"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#D4A24E]/10 rounded-full blur-3xl pointer-events-none"></div>
            <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed italic relative z-10">
              "Non produciamo una bevanda. Produciamo un'occasione di condivisione, di scoperta, di piacere autentico. Ogni birra Hop Storm porta con sé l'energia di chi crede che fare le cose bene valga tutta la fatica."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
