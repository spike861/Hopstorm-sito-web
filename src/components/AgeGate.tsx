import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beer } from 'lucide-react';

export default function AgeGate() {
  const [isVisible, setIsVisible] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già confermato l'età
    const isVerified = localStorage.getItem('hopstorm_age_verified');
    if (!isVerified) {
      // Piccolo ritardo per evitare flash visivi al caricamento
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('hopstorm_age_verified', 'true');
    setIsVisible(false);
  };

  const handleDeny = () => {
    setAccessDenied(true);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
          >
            {/* Elemento decorativo */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A24E] to-[#C0392B]"></div>

            {!accessDenied ? (
              <>
                <div className="flex items-center justify-center mx-auto mb-8">
                  <img src="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557006/foto/hopstorm_logo_bianco_trasparente_l3ftm9.png" alt="Hop Storm Logo" className="h-16 w-auto opacity-90" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Sei maggiorenne?</h2>
                <p className="text-white/60 mb-10 leading-relaxed font-light">
                  Per visitare il sito di Hop Storm e scoprire le nostre birre artigianali devi avere almeno 18 anni.
                </p>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleConfirm}
                    className="bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider w-full"
                  >
                    Sì, ho più di 18 anni
                  </button>
                  <button
                    onClick={handleDeny}
                    className="bg-transparent border border-white/20 text-white hover:bg-white/10 transition-colors px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider w-full"
                  >
                    No, ho meno di 18 anni
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mx-auto mb-8 grayscale opacity-50">
                  <img src="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557006/foto/hopstorm_logo_bianco_trasparente_l3ftm9.png" alt="Hop Storm Logo" className="h-16 w-auto" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Accesso Negato</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  Ci dispiace, ma devi essere maggiorenne per visualizzare i contenuti di questo sito. Torna a trovarci quando avrai compiuto 18 anni!
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
