import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Lock,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import {
  createCheckoutSession,
  formatEuro,
  isAllowedCheckoutRedirectUrl,
  isSafeImageUrl,
} from '../../services/shopApi';
import { trackEvent } from '../../utils/analytics';
import PaymentMethodLogos from './PaymentMethodLogos';

export default function CartDrawer() {
  const {
    items,
    totalCount,
    subtotal,
    settings,
    loading,
    hasLoaded,
    unavailableRemoved,
    clearUnavailableNotice,
    reloadCatalog,
    isCartOpen,
    closeCart,
    updateQty,
    removeItem,
  } = useShop();

  const [note, setNote] = useState('');
  const [isAdultChecked, setIsAdultChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [externalCheckoutUrl, setExternalCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    setExternalCheckoutUrl(null);
  }, [items, note]);

  useEffect(() => {
    if (!isCartOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCartOpen, closeCart]);

  const shippingCost = settings ? settings.spedizione_costo : 0;
  const freeThreshold = settings ? settings.spedizione_gratis_da : 0;
  const isFreeShipping =
    items.length > 0 &&
    (shippingCost === 0 || (freeThreshold > 0 && subtotal >= freeThreshold));
  const computedShipping =
    items.length === 0 ? 0 : isFreeShipping ? 0 : shippingCost;
  const total = subtotal + computedShipping;
  const missingForFree =
    freeThreshold > 0 && subtotal < freeThreshold ? freeThreshold - subtotal : 0;
  const progressPct =
    freeThreshold > 0 ? Math.min(100, Math.round((subtotal / freeThreshold) * 100)) : 100;

  const handleCheckout = async () => {
    if (items.length === 0 || isSubmitting) return;

    if (!isAdultChecked || !isTermsChecked) {
      setValidationError(
        'Conferma entrambe le dichiarazioni obbligatorie per procedere al pagamento.'
      );
      return;
    }

    setValidationError(null);
    setCheckoutError(null);
    setExternalCheckoutUrl(null);
    setIsSubmitting(true);

    trackEvent('begin_checkout', {
      currency: 'EUR',
      value: total,
      items_count: totalCount,
    });

    try {
      const payloadItems = items.map((ci) => ({
        id: ci.product.id,
        qty: ci.qty,
      }));
      const res = await createCheckoutSession(payloadItems, note);
      if (res.url) {
        if (!isAllowedCheckoutRedirectUrl(res.url)) {
          throw new Error('URL di pagamento non valido o non attendibile.');
        }

        let inIframe = false;
        try {
          inIframe = window.self !== window.top;
        } catch {
          inIframe = true;
        }

        if (inIframe) {
          setExternalCheckoutUrl(res.url);
          setIsSubmitting(false);
        } else {
          window.location.href = res.url;
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'Impossibile completare l\'operazione. Uno o più prodotti potrebbero non essere più disponibili.';
      setCheckoutError(message);
      setIsSubmitting(false);
      reloadCatalog();
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Carrello acquisti"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Slide-in Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-[#0A0A0A] border-l border-white/10 h-full flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#D4A24E]" aria-hidden="true" />
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Carrello ({totalCount})
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/carrello"
                  onClick={closeCart}
                  className="text-xs text-white/60 hover:text-[#D4A24E] transition-colors px-2 py-1"
                >
                  Apri pagina
                </a>
                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Chiudi carrello"
                  className="text-white/70 hover:text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {unavailableRemoved.length > 0 && (
                <div
                  role="status"
                  className="p-3.5 rounded-xl bg-[#D4A24E]/10 border border-[#D4A24E]/35 text-xs text-white/90 flex items-start justify-between gap-3"
                >
                  <span>
                    Alcuni prodotti non sono più disponibili e sono stati rimossi:{' '}
                    <strong>{unavailableRemoved.join(', ')}</strong>.
                  </span>
                  <button
                    type="button"
                    onClick={clearUnavailableNotice}
                    aria-label="Chiudi avviso"
                    className="text-white/60 hover:text-white shrink-0"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {loading && !hasLoaded && totalCount > 0 ? (
                <div className="space-y-4 animate-pulse py-4">
                  <div className="h-20 bg-white/5 rounded-xl" />
                  <div className="h-20 bg-white/5 rounded-xl" />
                </div>
              ) : items.length === 0 ? (
                <div className="py-16 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30">
                    <ShoppingBag size={28} aria-hidden="true" />
                  </div>
                  <p className="text-white/70 text-base">Il tuo carrello è vuoto.</p>
                  <a
                    href="/shop"
                    onClick={closeCart}
                    className="inline-flex items-center justify-center min-h-[44px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider"
                  >
                    Vai allo Shop
                  </a>
                </div>
              ) : (
                <>
                  {/* Progresso spedizione gratuita */}
                  {freeThreshold > 0 && (
                    <div className="p-3.5 rounded-xl bg-[#111111] border border-white/10 space-y-2">
                      <p className="text-xs text-white/85">
                        {missingForFree > 0 ? (
                          <>
                            <span className="text-white/70">
                              Spedizione gratuita da{' '}
                              <strong className="text-white tabular-nums">
                                {formatEuro(freeThreshold)}
                              </strong>
                              : ti mancano{' '}
                            </span>
                            <strong className="text-[#D4A24E] tabular-nums">
                              {formatEuro(missingForFree)}
                            </strong>
                          </>
                        ) : (
                          <span className="text-[#D4A24E] font-medium">
                            Spedizione gratuita da {formatEuro(freeThreshold)} sbloccata!
                          </span>
                        )}
                      </p>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#D4A24E] transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <ul className="divide-y divide-white/10">
                    {items.map(({ product, qty }) => (
                      <li key={product.id} className="py-4 flex gap-4">
                        <div className="w-20 h-20 rounded-xl bg-black border border-white/10 p-1.5 overflow-hidden shrink-0 flex items-center justify-center">
                          {isSafeImageUrl(product.foto1) ? (
                            <img
                              src={product.foto1}
                              alt={product.nome}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <ShoppingBag size={20} className="text-white/30" aria-hidden="true" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <a
                              href={`/shop/${encodeURIComponent(product.id)}`}
                              onClick={closeCart}
                              className="text-sm font-semibold text-white hover:text-[#D4A24E] transition-colors truncate"
                            >
                              {product.nome}
                            </a>
                            <button
                              type="button"
                              onClick={() => removeItem(product.id)}
                              aria-label={`Rimuovi ${product.nome} dal carrello`}
                              className="text-white/45 hover:text-[#E53935] p-1.5 transition-colors cursor-pointer"
                            >
                              <Trash2 size={16} aria-hidden="true" />
                            </button>
                          </div>

                          {product.formato && (
                            <p className="text-xs text-white/50 mt-0.5">{product.formato}</p>
                          )}

                          <div className="mt-3 flex items-center justify-between gap-2">
                            <div className="inline-flex items-center border border-white/15 rounded-full bg-black">
                              <button
                                type="button"
                                onClick={() => updateQty(product.id, qty - 1)}
                                aria-label={`Diminuisci quantità di ${product.nome}`}
                                className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                              >
                                <Minus size={14} aria-hidden="true" />
                              </button>
                              <span className="w-8 text-center text-sm font-semibold tabular-nums text-white">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQty(product.id, qty + 1)}
                                disabled={qty >= 48}
                                aria-label={`Aumenta quantità di ${product.nome}`}
                                className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white disabled:opacity-30 cursor-pointer"
                              >
                                <Plus size={14} aria-hidden="true" />
                              </button>
                            </div>

                            <span className="text-sm font-bold text-[#D4A24E] tabular-nums">
                              {formatEuro(product.prezzo * qty)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Nota opzionale */}
                  <div className="pt-1">
                    <label
                      htmlFor="drawer-cart-note"
                      className="block text-xs font-medium text-white/70 mb-1.5"
                    >
                      Note per la consegna (opzionale)
                    </label>
                    <textarea
                      id="drawer-cart-note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      maxLength={500}
                      rows={2}
                      placeholder="Es. citofono, orari preferiti..."
                      className="w-full rounded-xl bg-black border border-white/15 px-3.5 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#D4A24E] focus:outline-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer Checkout */}
            {items.length > 0 && (
              <div
                className="px-6 py-4 border-t border-white/10 bg-black space-y-3"
                style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))' }}
              >
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotale</span>
                    <span className="tabular-nums text-white">{formatEuro(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Spedizione</span>
                    <span className="tabular-nums text-white">
                      {settings === null
                        ? 'Da calcolare'
                        : computedShipping === 0
                          ? 'Gratuita'
                          : formatEuro(computedShipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-white/10">
                    <span className="text-white">Totale</span>
                    <span className="tabular-nums text-[#D4A24E]">{formatEuro(total)}</span>
                  </div>
                </div>

                {/* Dichiarazioni obbligatorie */}
                <div className="space-y-2 pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-white/80 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isAdultChecked}
                      onChange={(e) => {
                        setIsAdultChecked(e.target.checked);
                        if (e.target.checked && isTermsChecked) setValidationError(null);
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-white/30 bg-black accent-[#D4A24E] shrink-0"
                    />
                    <span>Dichiaro di essere maggiorenne</span>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-white/80 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isTermsChecked}
                      onChange={(e) => {
                        setIsTermsChecked(e.target.checked);
                        if (e.target.checked && isAdultChecked) setValidationError(null);
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-white/30 bg-black accent-[#D4A24E] shrink-0"
                    />
                    <span>
                      Accetto{' '}
                      <a
                        href="/vendita"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D4A24E] underline hover:text-white"
                      >
                        Condizioni di vendita
                      </a>{' '}
                      e{' '}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D4A24E] underline hover:text-white"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                {(validationError || checkoutError) && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-[#E53935]/15 border border-[#E53935]/40 text-xs text-white flex items-start gap-2"
                  >
                    <AlertCircle
                      size={16}
                      className="text-[#E53935] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{validationError || checkoutError}</span>
                  </div>
                )}

                {externalCheckoutUrl ? (
                  <div className="p-3.5 rounded-xl bg-[#181207] border border-[#D4A24E]/50 space-y-2.5">
                    <p className="text-xs text-white/85 leading-relaxed">
                      Sessione Stripe pronta. Nell&apos;anteprima il checkout non può aprirsi dentro questo riquadro: clicca sotto per completare il pagamento in una nuova scheda.
                    </p>
                    <a
                      href={externalCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[48px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Lock size={16} aria-hidden="true" />
                      Apri pagamento Stripe
                    </a>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                        Reindirizzamento a Stripe...
                      </>
                    ) : (
                      <>
                        <Lock size={16} aria-hidden="true" />
                        Paga in sicurezza
                      </>
                    )}
                  </button>
                )}

                <PaymentMethodLogos />
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
