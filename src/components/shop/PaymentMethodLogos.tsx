import { Lock } from 'lucide-react';

export default function PaymentMethodLogos() {
  return (
    <div className="pt-2 space-y-2.5">
      <div
        className="flex flex-wrap items-center justify-center gap-2"
        aria-label="Metodi di pagamento accettati: Visa, Mastercard, American Express, Apple Pay, Google Pay"
      >
        {/* VISA */}
        <span className="inline-flex items-center justify-center h-7 px-2.5 rounded bg-white/10 border border-white/10 text-[11px] font-extrabold tracking-wider text-white">
          VISA
        </span>

        {/* Mastercard */}
        <span
          className="inline-flex items-center justify-center gap-1 h-7 px-2 rounded bg-white/10 border border-white/10"
          title="Mastercard"
        >
          <svg width="24" height="15" viewBox="0 0 24 15" aria-hidden="true">
            <circle cx="9" cy="7.5" r="6" fill="#EB001B" />
            <circle cx="15" cy="7.5" r="6" fill="#F79E1B" fillOpacity="0.88" />
          </svg>
          <span className="sr-only">Mastercard</span>
        </span>

        {/* AMEX */}
        <span className="inline-flex items-center justify-center h-7 px-2 rounded bg-[#016FD0]/85 border border-white/10 text-[10px] font-extrabold tracking-tight text-white">
          AMEX
        </span>

        {/* Apple Pay */}
        <span className="inline-flex items-center justify-center h-7 px-2.5 rounded bg-white/10 border border-white/10 text-[11px] font-semibold tracking-tight text-white">
          Apple Pay
        </span>

        {/* Google Pay */}
        <span className="inline-flex items-center justify-center h-7 px-2.5 rounded bg-white/10 border border-white/10 text-[11px] font-semibold tracking-tight text-white">
          Google Pay
        </span>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-xs text-white/60">
        <Lock size={13} className="text-[#D4A24E]" aria-hidden="true" />
        <span>Pagamento sicuro con Stripe</span>
      </p>
    </div>
  );
}
