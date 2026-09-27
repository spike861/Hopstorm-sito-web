import { useState, useEffect } from 'react';
import { X, ShieldCheck, Check, Settings, AlertCircle } from 'lucide-react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  expiry: number;
  version: string;
}

const STORAGE_KEY = 'hopstorm_cookie_consent';
const BANNER_VERSION = '2.0';
// 6 months in milliseconds (180 days)
const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState<{ analytics: boolean; marketing: boolean }>({
    analytics: false,
    marketing: false,
  });
  const [hasExistingConsent, setHasExistingConsent] = useState(false);

  // Preventative blocking & script execution based on affirmative consent
  const applyScriptConsent = (consent: { analytics: boolean; marketing: boolean }) => {
    // Notify window for any external integration or tag manager
    window.dispatchEvent(new CustomEvent('hopstorm_consent_update', { detail: consent }));

    // Execute or block analytics scripts strictly according to user consent
    if (consent.analytics) {
      // Reserved for Google Analytics or other performance trackers
      // e.g. window['ga-disable-MEASUREMENT_ID'] = false;
    } else {
      // e.g. window['ga-disable-MEASUREMENT_ID'] = true;
    }

    // Execute or block marketing/advertising scripts strictly according to user consent
    if (consent.marketing) {
      // Reserved for Meta Pixel or advertising tags
    }
  };

  const getStoredConsent = (): CookiePreferences | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      const parsed: CookiePreferences = JSON.parse(stored);
      if (
        parsed &&
        typeof parsed.expiry === 'number' &&
        Date.now() < parsed.expiry &&
        parsed.version === BANNER_VERSION
      ) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  };

  const saveConsent = (analytics: boolean, marketing: boolean) => {
    const now = Date.now();
    const consentData: CookiePreferences = {
      necessary: true,
      analytics,
      marketing,
      timestamp: now,
      expiry: now + SIX_MONTHS_MS,
      version: BANNER_VERSION,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consentData));
    } catch (e) {
      console.warn('LocalStorage non disponibile per il salvataggio dei cookie', e);
    }

    applyScriptConsent({ analytics, marketing });
    setHasExistingConsent(true);
    setIsVisible(false);
    setShowPreferences(false);
  };

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setPrefs({
        analytics: stored.analytics,
        marketing: stored.marketing,
      });
      setHasExistingConsent(true);
      applyScriptConsent({ analytics: stored.analytics, marketing: stored.marketing });
    } else {
      // First visit or expired consent (> 6 months): display banner immediately
      setIsVisible(true);
    }

    const handleOpenBanner = () => {
      const current = getStoredConsent();
      if (current) {
        setPrefs({
          analytics: current.analytics,
          marketing: current.marketing,
        });
      } else {
        setPrefs({ analytics: false, marketing: false });
      }
      setShowPreferences(true);
      setIsVisible(true);
    };

    window.addEventListener('openCookieBanner', handleOpenBanner);
    return () => window.removeEventListener('openCookieBanner', handleOpenBanner);
  }, []);

  const handleAcceptAll = () => {
    setPrefs({ analytics: true, marketing: true });
    saveConsent(true, true);
  };

  const handleRejectAll = () => {
    setPrefs({ analytics: false, marketing: false });
    saveConsent(false, false);
  };

  const handleSavePreferences = () => {
    saveConsent(prefs.analytics, prefs.marketing);
  };

  const handleClose = () => {
    if (hasExistingConsent) {
      // If user was just reviewing, close without revoking
      setIsVisible(false);
      setShowPreferences(false);
    } else {
      // Closing via X on first visit is equivalent to rejecting all non-essential cookies (Garante Privacy)
      handleRejectAll();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      role="region" 
      aria-label="Informativa sul consenso ai cookie"
      className="fixed bottom-0 left-0 right-0 z-[990] p-3 sm:p-6 flex justify-center pointer-events-none"
    >
      <div className="max-w-4xl w-full bg-[#0A0A0A] border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto overflow-hidden text-white backdrop-blur-md max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Accent top gradient */}
        <div className="h-1 w-full bg-gradient-to-r from-[#D4A24E] to-[#C0392B] shrink-0" aria-hidden="true" />

        {!showPreferences ? (
          /* View 1: Main Banner */
          <div className="p-6 md:p-8 relative">
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 text-white/60 hover:text-white p-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A24E] rounded-lg"
              aria-label="Chiudi e rifiuta i cookie non necessari"
            >
              <X size={22} aria-hidden="true" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#D4A24E]/10 border border-[#D4A24E]/30 flex items-center justify-center text-[#D4A24E] shrink-0">
                <ShieldCheck size={18} aria-hidden="true" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                Informativa sull'utilizzo dei cookie
              </h2>
            </div>

            <p className="text-white/70 text-sm md:text-base mb-6 leading-relaxed">
              HOPSTORM S.R.L. rispetta la tua privacy. Utilizziamo cookie tecnici strettamente necessari al funzionamento del sito e alla verifica dell'età. Previo tuo consenso esplicito, vorremmo impiegare anche cookie analitici e di profilazione per misurare le performance e offrirti contenuti in linea con le tue preferenze.
              <br className="mt-2 block" />
              Puoi accettare tutti i cookie, rifiutarli tutti mantenendo solo quelli necessari, oppure personalizzare le tue scelte. Per ulteriori informazioni, consulta la nostra{' '}
              <a 
                href="/cookie" 
                className="text-[#D4A24E] underline hover:text-white transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#D4A24E]"
              >
                Cookie Policy
              </a>, la{' '}
              <a 
                href="/privacy" 
                className="text-[#D4A24E] underline hover:text-white transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#D4A24E]"
              >
                Privacy Policy
              </a> e i{' '}
              <a 
                href="/termini" 
                className="text-[#D4A24E] underline hover:text-white transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#D4A24E]"
              >
                Termini e Condizioni
              </a>.
            </p>

            {/* Actions: "Rifiuta tutti" e "Accetta tutti" hanno PARI EVIDENZA VISIVA secondo le linee guida del Garante */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="order-3 sm:order-1 px-5 py-3 rounded-full border border-white/20 hover:border-white text-white/90 hover:text-white bg-white/5 hover:bg-white/10 font-medium text-sm transition-all text-center flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <Settings size={16} aria-hidden="true" />
                <span>Personalizza</span>
              </button>

              <div className="order-1 sm:order-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="px-6 py-3 rounded-full border-2 border-[#D4A24E] bg-[#D4A24E] text-black font-bold text-sm hover:bg-white hover:border-white transition-all text-center flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A24E]"
                >
                  Rifiuta tutti
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-6 py-3 rounded-full border-2 border-[#D4A24E] bg-[#D4A24E] text-black font-bold text-sm hover:bg-white hover:border-white transition-all text-center flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A24E]"
                >
                  Accetta tutti
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* View 2: Preferences Modal */
          <div className="p-6 md:p-8 relative">
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 text-white/60 hover:text-white p-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A24E] rounded-lg"
              aria-label="Chiudi la schermata preferenze cookie"
            >
              <X size={22} aria-hidden="true" />
            </button>

            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
              Personalizza le preferenze sui cookie
            </h2>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Gestisci in modo granulare i tuoi consensi per ciascuna categoria. Il tuo consenso ha validità per 6 mesi e può essere modificato o revocato in qualsiasi momento dal link nel footer.
            </p>

            <div className="space-y-4 mb-6">
              {/* Category 1: Necessari (Sempre attivi) */}
              <div className="p-4 md:p-5 bg-white/5 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-base">Cookie Tecnici e Necessari</h3>
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                      Obbligatori
                    </span>
                  </div>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                    Strettamente indispensabili per la navigazione, la sicurezza tecnica, il controllo dell'età (Age Gate) e la memorizzazione della scelta dei cookie. Non possono essere disattivati.
                  </p>
                </div>
                <div className="shrink-0 text-[#D4A24E] text-xs font-mono font-bold uppercase tracking-wider bg-[#D4A24E]/10 px-3 py-1.5 rounded-lg border border-[#D4A24E]/20 text-center">
                  Sempre attivi
                </div>
              </div>

              {/* Category 2: Analitici */}
              <div className="p-4 md:p-5 bg-white/5 rounded-2xl border border-white/10 flex items-start sm:items-center justify-between gap-4">
                <div className="pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-base">Cookie Analitici</h3>
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
                      Opzionali
                    </span>
                  </div>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                    Permettono di analizzare in modo anonimizzato il traffico e le modalità d'uso del sito per ottimizzare l'esperienza utente e le prestazioni della pagina.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                    className="sr-only peer"
                    aria-label="Attiva cookie analitici"
                  />
                  <div className="w-12 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4A24E]"></div>
                </label>
              </div>

              {/* Category 3: Marketing e Profilazione */}
              <div className="p-4 md:p-5 bg-white/5 rounded-2xl border border-white/10 flex items-start sm:items-center justify-between gap-4">
                <div className="pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-base">Cookie di Marketing e Profilazione</h3>
                    <span className="text-[10px] uppercase font-mono tracking-widest bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
                      Opzionali
                    </span>
                  </div>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                    Utilizzati per mostrarti comunicazioni mirate e annunci personalizzati in base ai tuoi interessi e alle abitudini di navigazione.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                    className="sr-only peer"
                    aria-label="Attiva cookie di marketing e profilazione"
                  />
                  <div className="w-12 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4A24E]"></div>
                </label>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="order-3 sm:order-1 px-5 py-3 rounded-full border border-white/20 hover:border-white text-white/80 hover:text-white text-sm font-medium transition-all text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                Indietro
              </button>

              <div className="order-1 sm:order-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="px-6 py-3 rounded-full border-2 border-[#D4A24E] bg-[#D4A24E] text-black font-bold text-sm hover:bg-white hover:border-white transition-all text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A24E]"
                >
                  Rifiuta tutti
                </button>
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="px-6 py-3 rounded-full border-2 border-white/40 bg-white/10 hover:bg-white hover:text-black hover:border-white text-white font-bold text-sm transition-all text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  Salva preferenze
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-6 py-3 rounded-full border-2 border-[#D4A24E] bg-[#D4A24E] text-black font-bold text-sm hover:bg-white hover:border-white transition-all text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4A24E]"
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
