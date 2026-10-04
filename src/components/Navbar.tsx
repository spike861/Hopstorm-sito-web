import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useIntro } from '../introContext';
import { introStyle } from '../introStyle';
import { trackEvent } from '../utils/analytics';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { step, reduced } = useIntro();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${step < 3 ? 'bg-transparent py-6' : (scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-black/40 backdrop-blur-sm py-6')}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img loading="lazy" decoding="async" src="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557006/foto/hopstorm_logo_bianco_trasparente_l3ftm9.png" alt="Hop Storm — birrificio artigianale a Roma" className="h-16 md:h-20 w-auto" />
          </a>
          
          {/* Desktop */}
          <div className="hidden md:flex gap-8" style={introStyle(step < 3, -16, 0, 0, reduced)}>
            {['LE NOSTRE BIRRE', 'CHI SIAMO', 'PER I LOCALI', 'PER I PRIVATI', 'DOVE TROVARCI'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider font-medium">
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            type="button"
            className="md:hidden text-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]" 
            onClick={() => setIsOpen(true)} 
            style={introStyle(step < 3, -16, 0, 0, reduced)}
            aria-label="Apri menu di navigazione"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 flex flex-col p-6 overflow-y-auto"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))' }}
          >
            <div className="flex justify-between items-center mb-10 shrink-0">
              <img loading="lazy" decoding="async" src="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557006/foto/hopstorm_logo_bianco_trasparente_l3ftm9.png" alt="Hop Storm — birrificio artigianale a Roma" className="h-12 w-auto" />
              <button 
                type="button"
                className="text-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]" 
                onClick={() => setIsOpen(false)}
                aria-label="Chiudi menu di navigazione"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            
            <nav aria-label="Menu mobile" className="flex flex-col gap-6 text-2xl">
              {['LE NOSTRE BIRRE', 'CHI SIAMO', 'PER I LOCALI', 'PER I PRIVATI', 'DOVE TROVARCI'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                  className="text-white/70 hover:text-white transition-colors uppercase tracking-wider font-medium py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-3.5 shrink-0">
              {/* Verso #per-i-privati, e poi verso #shop quando ci sarà lo shop */}
              <a
                href="#per-i-privati"
                onClick={() => {
                  trackEvent('click_order', { posizione: 'menu_mobile' });
                  setIsOpen(false);
                }}
                className="w-full min-h-[48px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-center flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]"
              >
                ORDINA ONLINE
              </a>

              <a
                href="https://wa.me/393491973069?text=Ciao%20Hop%20Storm!%20Vorrei%20ordinare%20delle%20birre%20a%20casa.%20Potete%20mandarmi%20i%20prezzi%20dei%20Box%20da%206%20e%20da%2012%20e%20le%20info%20sulla%20spedizione%3F"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('click_whatsapp', { sezione: 'menu_mobile' });
                  setIsOpen(false);
                }}
                className="w-full min-h-[48px] border border-white/25 text-white hover:bg-white/10 transition-colors px-6 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider text-center flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                WHATSAPP
              </a>

              <a
                href="https://instagram.com/hopstorm.brewery"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full min-h-[44px] text-white/70 hover:text-[#D4A24E] transition-colors text-sm font-medium flex items-center justify-center mt-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]"
              >
                @hopstorm.brewery
              </a>
            </div>

            <p className="mt-auto pt-6 text-center text-xs text-white/50 tracking-wide shrink-0">
              Vendita riservata ai maggiorenni · Bevi responsabilmente
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
