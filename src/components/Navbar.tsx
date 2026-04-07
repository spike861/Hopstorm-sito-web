import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-black/40 backdrop-blur-sm py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src="/foto/hopstorm_logo_bianco_trasparente.png" alt="Hop Storm" className="h-16 md:h-20 w-auto" />
          </a>
          
          {/* Desktop */}
          <div className="hidden md:flex gap-8">
            {['LE NOSTRE BIRRE', 'CHI SIAMO', 'PER I LOCALI', 'PER I PRIVATI', 'DOVE TROVARCI', 'EVENTI'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider font-medium">
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <img src="/foto/hopstorm_logo_bianco_trasparente.png" alt="Hop Storm" className="h-12 w-auto" />
              <button className="text-white" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-2xl">
              {['LE NOSTRE BIRRE', 'CHI SIAMO', 'PER I LOCALI', 'PER I PRIVATI', 'DOVE TROVARCI', 'EVENTI'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                  className="text-white/60 hover:text-white transition-colors uppercase tracking-wider font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
