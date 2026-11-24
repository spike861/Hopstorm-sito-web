import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Lock,
  Loader2,
  AlertCircle,
  RefreshCw,
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

export default function CartPage() {
  const {
    items,
    totalCount,
    subtotal,
    settings,
    loading,
    hasLoaded,
    error,
    ensureCatalogLoaded,
    reloadCatalog,
    unavailableRemoved,
    clearUnavailableNotice,
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
    ensureCatalogLoaded();
  }, [ensureCatalogLoaded]);

  useEffect(() => {
    document.title = 'Carrello | Shop Hop Storm';
    const metaRobots = document.querySelector("meta[name='robots']");
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex');
    }
  }, []);

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
    <section className="bg-black min-h-screen pt-32 md:pt-36 pb-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#D4A24E] transition-colors min-h-[44px]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Continua gli acquisti nello Shop
          </a>
        </div>

        <div className="mb-10 border-b border-white/10 pb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4A24E] font-semibold mb-2">
            Shop Hop Storm
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Il tuo <span className="text-[#D4A24E]">Carrello</span> ({totalCount})
          </h1>
        </div>

        {unavailableRemoved.length > 0 && (
          <div
            role="status"
            className="mb-8 p-4 rounded-xl bg-[#D4A24E]/10 border border-[#D4A24E]/35 text-sm text-white flex items-center justify-between gap-4"
          >
            <span>
              Alcuni articoli non sono più disponibili e sono stati rimossi dal carrello:{' '}
              <strong>{unavailableRemoved.join(', ')}</strong>.
            </span>
            <button
              type="button"
              onClick={clearUnavailableNotice}
              className="text-xs text-[#D4A24E] underline shrink-0 cursor-pointer"
            >
              Chiudi
            </button>
          </div>
        )}

        {loading && !hasLoaded ? (
          <div className="grid lg:grid-cols-12 gap-8 animate-pulse">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-28 bg-[#0A0A0A] border border-white/10 rounded-2xl" />
              <div className="h-28 bg-[#0A0A0A] border border-white/10 rounded-2xl" />
            </div>
            <div className="lg:col-span-5 h-96 bg-[#0A0A0A] border border-white/10 rounded-2xl" />
          </div>
        ) : error ? (
          <div
            role="alert"
            className="max-w-xl mx-auto my-12 bg-[#0A0A0A] border border-[#E53935]/35 rounded-2xl p-8 text-center"
          >
            <AlertCircle
              size={36}
              className="text-[#E53935] mx-auto mb-4"
              aria-hidden="true"
            />
            <h2 className="text-xl font-bold text-white mb-2">
              Errore nel caricamento del carrello
            </h2>
            <p className="text-white/70 text-sm mb-6">{error}</p>
            <button
              type="button"
              onClick={reloadCatalog}
              className="min-h-[44px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw size={16} aria-hidden="true" />
              Riprova
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="max-w-lg mx-auto my-12 bg-[#0A0A0A] border border-white/10 rounded-2xl p-12 text-center">
            <ShoppingBag
              size={44}
              className="text-white/30 mx-auto mb-4"
              aria-hidden="true"
            />
            <h2 className="text-2xl font-bold text-white mb-3">
              Il tuo carrello è vuoto
            </h2>
            <p className="text-white/65 text-sm mb-8">
              Aggiungi le nostre birre artigianali, pack misti o merchandising per completare il tuo ordine.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center justify-center min-h-[48px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider"
            >
              Esplora lo Shop
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Lista Articoli */}
            <div className="lg:col-span-7 space-y-4">
              {items.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 flex gap-5 items-center"
                >
                  <a
                    href={`/shop/${encodeURIComponent(product.id)}`}
                    className="w-24 h-24 rounded-xl bg-black border border-white/10 p-1.5 overflow-hidden shrink-0 flex items-center justify-center"
                  >
                    {isSafeImageUrl(product.foto1) ? (
                      <img
                        src={product.foto1}
                        alt={product.nome}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <ShoppingBag size={24} className="text-white/30" aria-hidden="true" />
                    )}
                  </a>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <a
                          href={`/shop/${encodeURIComponent(product.id)}`}
                          className="text-base md:text-lg font-semibold text-white hover:text-[#D4A24E] transition-colors"
                        >
                          {product.nome}
                        </a>
                        <p className="text-xs text-white/55 mt-0.5">
                          {[product.categoria, product.formato]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        aria-label={`Rimuovi ${product.nome} dal carrello`}
                        className="text-white/45 hover:text-[#E53935] p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Trash2 size={18} aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="inline-flex items-center border border-white/15 rounded-full bg-black">
                        <button
                          type="button"
                          onClick={() => updateQty(product.id, qty - 1)}
                          aria-label={`Diminuisci quantità di ${product.nome}`}
                          className="w-11 h-11 flex items-center justify-center text-white/75 hover:text-white cursor-pointer"
                        >
                          <Minus size={15} aria-hidden="true" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold tabular-nums text-white">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(product.id, qty + 1)}
                          disabled={qty >= 48}
                          aria-label={`Aumenta quantità di ${product.nome}`}
                          className="w-11 h-11 flex items-center justify-center text-white/75 hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <Plus size={15} aria-hidden="true" />
                        </button>
                      </div>

                      <div className="text-right tabular-nums">
                        <span className="text-lg font-bold text-[#D4A24E] block">
                          {formatEuro(product.prezzo * qty)}
                        </span>
                        {qty > 1 && (
                          <span className="text-xs text-white/50">
                            {formatEuro(product.prezzo)} cad.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Riepilogo e Checkout */}
            <aside className="lg:col-span-5 bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-8 space-y-5 lg:sticky lg:top-28">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Riepilogo Ordine
              </h2>

              {freeThreshold > 0 && (
                <div className="p-4 rounded-xl bg-black border border-white/10 space-y-2.5">
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

              <div>
                <label
                  htmlFor="page-cart-note"
                  className="block text-xs font-medium text-white/70 mb-2"
                >
                  Note per la consegna (opzionale)
                </label>
                <textarea
                  id="page-cart-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={500}
                  rows={2}
                  placeholder="Es. citofono, orari preferiti, istruzioni per il corriere..."
                  className="w-full rounded-xl bg-black border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#D4A24E] focus:outline-none"
                />
              </div>

              <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                <div className="flex justify-between text-white/70">
                  <span>Subtotale</span>
                  <span className="tabular-nums text-white">{formatEuro(subtotal)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Spedizione</span>
                  <span className="tabular-nums text-white">
                    {computedShipping === 0
                      ? 'Gratuita'
                      : formatEuro(computedShipping)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
                  <span className="text-white">Totale</span>
                  <span className="tabular-nums text-[#D4A24E]">{formatEuro(total)}</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <label className="flex items-start gap-3 text-xs text-white/85 cursor-pointer select-none">
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

                <label className="flex items-start gap-3 text-xs text-white/85 cursor-pointer select-none">
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
                  className="p-3.5 rounded-xl bg-[#E53935]/15 border border-[#E53935]/40 text-xs text-white flex items-start gap-2"
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
                <div className="p-4 rounded-xl bg-[#181207] border border-[#D4A24E]/50 space-y-3">
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
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
