import { useEffect, useState } from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const SHOP_AGE_STORAGE_KEY = 'hopstorm_shop_age_gate';

type AgeStatus = 'unknown' | 'yes' | 'no';

export default function ShopAgeGate() {
  const [status, setStatus] = useState<AgeStatus>(() => {
    if (typeof window === 'undefined') return 'unknown';
    try {
      const saved = localStorage.getItem(SHOP_AGE_STORAGE_KEY);
      if (saved === 'yes') return 'yes';
      if (saved === 'no') return 'no';
      return 'unknown';
    } catch {
      return 'unknown';
    }
  });

  useEffect(() => {
    if (status === 'yes') return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [status]);

  if (status === 'yes') return null;

  const handleConfirm = () => {
    try {
      localStorage.setItem(SHOP_AGE_STORAGE_KEY, 'yes');
      localStorage.setItem('hopstorm_age_verified', 'true');
    } catch {
      // Ignore storage errors
    }
    setStatus('yes');
  };

  const handleDeny = () => {
    try {
      localStorage.setItem(SHOP_AGE_STORAGE_KEY, 'no');
    } catch {
      // Ignore storage errors
    }
    setStatus('no');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shop-age-gate-title"
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
    >
      <div className="bg-[#0A0A0A] border border-white/15 rounded-3xl p-8 md:p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A24E] to-[#C0392B]" />

        <div className="flex items-center justify-center mx-auto mb-6">
          <img
            src="https://res.cloudinary.com/dcbomk6i8/image/upload/v1775557006/foto/hopstorm_logo_bianco_trasparente_l3ftm9.png"
            alt="Hop Storm — birrificio artigianale a Roma"
            className="h-14 w-auto opacity-90"
          />
        </div>

        {status === 'unknown' ? (
          <>
            <h2
              id="shop-age-gate-title"
              className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight"
            >
              Hai almeno 18 anni?
            </h2>
            <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed">
              L&apos;acquisto di bevande alcoliche nello shop online Hop Storm è riservato esclusivamente ai maggiorenni secondo la normativa vigente.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 min-h-[48px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Sì, ho almeno 18 anni
              </button>
              <button
                type="button"
                onClick={handleDeny}
                className="flex-1 min-h-[48px] bg-transparent border border-white/25 text-white hover:bg-white/10 transition-colors px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <ShieldAlert
              size={40}
              className="text-[#E53935] mx-auto mb-4"
              aria-hidden="true"
            />
            <h2
              id="shop-age-gate-title"
              className="text-2xl font-bold text-white mb-3 tracking-tight"
            >
              Accesso allo shop non consentito
            </h2>
            <p className="text-white/70 text-sm md:text-base mb-8 leading-relaxed">
              Ci dispiace, la vendita e l&apos;accesso allo shop di bevande alcoliche sono riservati esclusivamente a chi ha compiuto 18 anni.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/10 hover:bg-white/20 text-white transition-colors px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider w-full"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Torna alla Home
            </a>
          </>
        )}
      </div>
    </div>
  );
}
