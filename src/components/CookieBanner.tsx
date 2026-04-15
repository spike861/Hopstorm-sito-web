import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });
  const [hasExistingConsent, setHasExistingConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('hopstorm_cookie_consent');
    if (!consent) {
      // Piccolo ritardo per non sovrapporsi troppo bruscamente all'Age Gate
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setHasExistingConsent(true);
    }

    const handleOpenBanner = () => {
      const currentConsent = localStorage.getItem('hopstorm_cookie_consent');
      if (currentConsent === 'all') {
        setPrefs({ analytics: true, marketing: true });
      } else if (currentConsent === 'technical') {
        setPrefs({ analytics: false, marketing: false });
      } else if (currentConsent) {
        try {
          const parsed = JSON.parse(currentConsent);
          setPrefs({
            analytics: !!parsed.analytics,
            marketing: !!parsed.marketing
          });
        } catch (e) {
          setPrefs({ analytics: false, marketing: false });
        }
      }
      setHasExistingConsent(true);
      setIsVisible(true);
      setShowPreferences(true);
    };

    window.addEventListener('openCookieBanner', handleOpenBanner);
    return () => window.removeEventListener('openCookieBanner', handleOpenBanner);
  }, []);

  const acceptAll = () => {
    localStorage.setItem('hopstorm_cookie_consent', 'all');
    setHasExistingConsent(true);
    setIsVisible(false);
    // Qui andrebbe inserita la logica per attivare gli script (es. gtag, fbq)
  };

  const rejectAll = () => {
    localStorage.setItem('hopstorm_cookie_consent', 'technical');
    setHasExistingConsent(true);
    setIsVisible(false);
    // Gli script rimangono bloccati
  };

  const savePrefs = () => {
    localStorage.setItem('hopstorm_cookie_consent', JSON.stringify(prefs));
    setHasExistingConsent(true);
    setIsVisible(false);
    // Qui andrebbe inserita la logica per attivare solo gli script selezionati
  };

  const handleClose = () => {
    if (hasExistingConsent) {
      // Se l'utente sta solo rivedendo le preferenze, la X chiude senza sovrascrivere
      setIsVisible(false);
    } else {
      // Al primo accesso, la X equivale a rifiutare
      rejectAll();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[990] p-4 md:p-6 pointer-events-none">
      <div className="max-w-5xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden">
        {!showPreferences ? (
          <div className="p-6 md:p-8 relative">
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors" 
              aria-label="Chiudi"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-xl font-bold text-white mb-3">Informativa sull'utilizzo dei cookie</h2>
            
            <p className="text-white/70 text-sm md:text-base mb-6 leading-relaxed">
              HOPSTORM S.R.L. utilizza cookie tecnici strettamente necessari per il funzionamento del sito (come la verifica dell'età). Con il tuo consenso, vorremmo utilizzare anche cookie analitici e di profilazione per misurare le performance del sito e mostrarti comunicazioni in linea con le tue preferenze. Cliccando su "Rifiuta tutti" o chiudendo il banner tramite la "X", continuerai la navigazione mantenendo le impostazioni di default (solo cookie tecnici).
              <br className="hidden md:block mt-2" />
              Per maggiori dettagli, consulta la <a href="#/cookie" className="text-[#D4A24E] hover:underline font-medium">Cookie Policy</a> e la <a href="#/privacy" className="text-[#D4A24E] hover:underline font-medium">Privacy Policy</a>.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={() => setShowPreferences(true)} 
                className="text-white/60 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors order-3 sm:order-1"
              >
                Personalizza
              </button>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
                {/* Uguale evidenza visiva per Rifiuta e Accetta (stessa dimensione, stile a bottone pieno) */}
                <button 
                  onClick={rejectAll} 
                  className="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
                >
                  Rifiuta tutti
                </button>
                <button 
                  onClick={acceptAll} 
                  className="px-6 py-3 rounded-full border border-[#D4A24E] bg-[#D4A24E] text-black font-bold text-sm hover:bg-white hover:border-white transition-colors w-full sm:w-auto text-center"
                >
                  Accetta tutti
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8 relative">
            <button 
              onClick={handleClose} 
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors" 
              aria-label="Chiudi"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold text-white mb-2">Personalizza le tue preferenze</h2>
            <p className="text-white/60 text-sm mb-6">
              Scegli quali categorie di cookie autorizzare. I cookie tecnici non possono essere disabilitati in quanto necessari al funzionamento del sito.
            </p>
            
            <div className="space-y-4 mb-8">
              {/* Tecnici */}
              <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="pr-4">
                  <h3 className="text-white font-bold text-sm mb-1">Cookie Tecnici (Strettamente necessari)</h3>
                  <p className="text-white/50 text-xs">Garantiscono la normale navigazione e fruizione del sito (es. salvataggio preferenze, Age Gate). Non richiedono consenso.</p>
                </div>
                <div className="text-[#D4A24E] text-sm font-bold shrink-0 mt-1">Sempre attivi</div>
              </div>
              
              {/* Analitici */}
              <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="pr-4">
                  <h3 className="text-white font-bold text-sm mb-1">Cookie Analitici</h3>
                  <p className="text-white/50 text-xs">Ci aiutano a capire come i visitatori interagiscono con il sito raccogliendo informazioni in forma aggregata.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={prefs.analytics} 
                    onChange={(e) => setPrefs({...prefs, analytics: e.target.checked})} 
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4A24E]"></div>
                </label>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="pr-4">
                  <h3 className="text-white font-bold text-sm mb-1">Cookie di Profilazione e Marketing</h3>
                  <p className="text-white/50 text-xs">Utilizzati per tracciare i visitatori sui siti web. L'intento è quello di visualizzare annunci pertinenti e coinvolgenti per il singolo utente.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={prefs.marketing} 
                    onChange={(e) => setPrefs({...prefs, marketing: e.target.checked})} 
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4A24E]"></div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={() => setShowPreferences(false)} 
                className="text-white/60 hover:text-white text-sm font-medium transition-colors order-3 sm:order-1"
              >
                Indietro
              </button>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
                <button 
                  onClick={savePrefs} 
                  className="px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
                >
                  Salva preferenze
                </button>
                <button 
                  onClick={acceptAll} 
                  className="px-6 py-3 rounded-full border border-[#D4A24E] bg-[#D4A24E] text-black font-bold text-sm hover:bg-white hover:border-white transition-colors w-full sm:w-auto text-center"
                >
                  Accetta tutti
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
