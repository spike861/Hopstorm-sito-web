import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Package,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
  Store,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import {
  formatEuro,
  formatShopAbv,
  getProductGallery,
  parseProductDescription,
} from '../../services/shopApi';
import ProductCard from './ProductCard';
import ShopJsonLd from './ShopJsonLd';
import { trackEvent } from '../../utils/analytics';

interface ProductDetailPageProps {
  productId: string;
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const {
    products,
    settings,
    loading,
    error,
    ensureCatalogLoaded,
    reloadCatalog,
    totalCount,
    openCart,
    addToCart,
  } = useShop();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const decodedId = useMemo(() => {
    try {
      return decodeURIComponent(productId);
    } catch {
      return productId;
    }
  }, [productId]);

  useEffect(() => {
    ensureCatalogLoaded();
  }, [ensureCatalogLoaded]);

  // Reset local gallery/qty when navigating to a different product
  useEffect(() => {
    setSelectedImageIdx(0);
    setFailedImages({});
    setQty(1);
    setJustAdded(false);
  }, [decodedId]);

  const product = useMemo(
    () => products.find((p) => p.id === decodedId) || null,
    [products, decodedId]
  );

  const gallery = useMemo(
    () => (product ? getProductGallery(product) : []),
    [product]
  );

  const formattedAbv = useMemo(
    () => (product ? formatShopAbv(product.abv) : ''),
    [product]
  );

  const descriptionSections = useMemo(
    () =>
      product
        ? parseProductDescription(product.descrizione || product.descrizione_breve)
        : [],
    [product]
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const others = products.filter((p) => p.id !== product.id);
    const sameCategory = others.filter(
      (p) =>
        product.categoria &&
        p.categoria.toLowerCase() === product.categoria.toLowerCase()
    );
    const remaining = others.filter(
      (p) =>
        !product.categoria ||
        p.categoria.toLowerCase() !== product.categoria.toLowerCase()
    );
    return [...sameCategory, ...remaining].slice(0, 3);
  }, [products, product]);

  useEffect(() => {
    const metaRobots = document.querySelector("meta[name='robots']");
    if (product) {
      document.title = `${product.nome} | Shop Hop Storm`;
      const metaDesc = document.querySelector("meta[name='description']");
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          product.descrizione_breve || product.descrizione || `${product.nome} — Birrificio Hop Storm.`
        );
      }
      const linkCan = document.querySelector("link[rel='canonical']");
      if (linkCan) {
        linkCan.setAttribute(
          'href',
          `https://www.hopstorm.it/shop/${encodeURIComponent(product.id)}`
        );
      }
      if (metaRobots) metaRobots.setAttribute('content', 'index, follow');

      trackEvent('view_item', {
        item_id: product.id,
        item_name: product.nome,
        item_category: product.categoria,
        price: product.prezzo,
        currency: 'EUR',
      });
    } else if (!loading && !error && settings?.shop_aperto) {
      document.title = 'Prodotto non trovato | Hop Storm';
      if (metaRobots) metaRobots.setAttribute('content', 'noindex');
    }
  }, [product, loading, error, settings]);

  const isClosed = !loading && !error && settings !== null && !settings.shop_aperto;

  const handleAddToCart = () => {
    if (!product || !product.disponibile) return;
    addToCart(product, qty);
    trackEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.nome,
      item_category: product.categoria,
      price: product.prezzo,
      quantity: qty,
      currency: 'EUR',
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
    openCart();
  };

  const activeImageUrl = gallery[selectedImageIdx];
  const hasMainImage = Boolean(activeImageUrl) && !failedImages[selectedImageIdx];
  const hasDiscount =
    product &&
    product.prezzo_barrato !== null &&
    product.prezzo_barrato > product.prezzo;

  return (
    <section className="bg-black min-h-screen pt-32 md:pt-36 pb-28 px-6">
      {product && <ShopJsonLd mode="product" product={product} />}

      <div className="max-w-7xl mx-auto">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#D4A24E] transition-colors min-h-[44px]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Torna allo Shop
          </a>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Apri il carrello (${totalCount} articoli)`}
            className="inline-flex items-center gap-2.5 min-h-[44px] bg-[#0A0A0A] border border-white/15 hover:border-[#D4A24E] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag size={16} className="text-[#D4A24E]" aria-hidden="true" />
            <span>Carrello</span>
            <span className="tabular-nums text-[#D4A24E]">({totalCount})</span>
          </button>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div
            aria-busy="true"
            aria-label="Caricamento dettagli prodotto"
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 animate-pulse"
          >
            <div className="aspect-square bg-[#0A0A0A] border border-white/10 rounded-2xl" />
            <div className="space-y-5">
              <div className="h-4 w-40 bg-white/10 rounded" />
              <div className="h-10 w-3/4 bg-white/10 rounded" />
              <div className="h-8 w-28 bg-white/10 rounded" />
              <div className="h-24 w-full bg-white/5 rounded" />
              <div className="h-12 w-full bg-white/10 rounded-full" />
            </div>
          </div>
        )}

        {/* Errore */}
        {!loading && error && (
          <div
            role="alert"
            className="max-w-xl mx-auto my-12 bg-[#0A0A0A] border border-[#E53935]/35 rounded-2xl p-8 text-center"
          >
            <AlertCircle
              size={36}
              className="text-[#E53935] mx-auto mb-4"
              aria-hidden="true"
            />
            <h1 className="text-xl font-bold text-white mb-2">
              Impossibile caricare il prodotto
            </h1>
            <p className="text-white/70 text-sm leading-relaxed mb-6">{error}</p>
            <button
              type="button"
              onClick={reloadCatalog}
              className="min-h-[44px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw size={16} aria-hidden="true" />
              Riprova
            </button>
          </div>
        )}

        {/* Shop Chiuso */}
        {isClosed && (
          <div className="max-w-xl mx-auto my-12 bg-[#0A0A0A] border border-white/15 rounded-2xl p-10 text-center">
            <Store size={40} className="text-[#D4A24E] mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-white mb-3">
              Shop momentaneamente chiuso
            </h1>
            <p className="text-white/70 text-base mb-8">
              Torna a trovarci presto per acquistare online le birre Hop Storm.
            </p>
            <a
              href="/"
              className="min-h-[44px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center"
            >
              Torna alla Home
            </a>
          </div>
        )}

        {/* Prodotto non trovato */}
        {!loading && !error && !isClosed && !product && (
          <div className="max-w-xl mx-auto my-12 bg-[#0A0A0A] border border-white/10 rounded-2xl p-10 text-center">
            <Package size={40} className="text-white/35 mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-white mb-3">
              Prodotto non trovato
            </h1>
            <p className="text-white/70 text-base mb-8">
              L&apos;articolo richiesto non è più disponibile o l&apos;indirizzo non è corretto.
            </p>
            <a
              href="/shop"
              className="min-h-[44px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center"
            >
              Vai allo Shop
            </a>
          </div>
        )}

        {/* Dettaglio Prodotto */}
        {!loading && !error && !isClosed && product && (
          <>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Galleria */}
              <div className="space-y-4">
                <div className="aspect-square max-h-[70vh] w-full bg-black border border-white/10 rounded-2xl overflow-hidden relative flex items-center justify-center p-4 sm:p-6">
                  {hasMainImage ? (
                    <img
                      src={activeImageUrl}
                      alt={product.nome}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [selectedImageIdx]: true }))
                      }
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 p-8 text-white/30">
                      <Package size={56} strokeWidth={1.3} aria-hidden="true" />
                      <span className="text-xs uppercase tracking-widest text-white/45">
                        {product.nome}
                      </span>
                    </div>
                  )}

                  {!product.disponibile && (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                      <span className="text-sm font-bold uppercase tracking-widest text-white bg-black/85 border border-white/20 px-5 py-2 rounded-md">
                        Esaurito
                      </span>
                    </div>
                  )}
                </div>

                {gallery.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {gallery.map((imgUrl, idx) => {
                      const active = idx === selectedImageIdx;
                      return (
                        <button
                          key={`${imgUrl}-${idx}`}
                          type="button"
                          onClick={() => setSelectedImageIdx(idx)}
                          aria-label={`Mostra immagine ${idx + 1} di ${product.nome}`}
                          aria-current={active ? 'true' : undefined}
                          className={`w-20 h-20 rounded-xl overflow-hidden bg-black p-1.5 border transition-colors shrink-0 cursor-pointer flex items-center justify-center ${
                            active
                              ? 'border-[#D4A24E]'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`${product.nome} vista ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modulo Acquisto Contiguo */}
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Metadata senza pillole */}
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-white/60">
                  {product.categoria && <span>{product.categoria}</span>}
                  {product.stile && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{product.stile}</span>
                    </>
                  )}
                  {formattedAbv && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">ABV {formattedAbv}</span>
                    </>
                  )}
                  {product.formato && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{product.formato}</span>
                    </>
                  )}
                </div>

                <div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                    {product.nome}
                  </h1>

                  <div className="flex items-baseline gap-3 tabular-nums">
                    <span className="text-3xl font-bold text-[#D4A24E]">
                      {formatEuro(product.prezzo)}
                    </span>
                    {hasDiscount && product.prezzo_barrato !== null && (
                      <span className="text-lg text-white/40 line-through">
                        {formatEuro(product.prezzo_barrato)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Descrizione e Note di Degustazione */}
                {descriptionSections.length > 0 && (
                  <div className="border-t border-white/10 pt-6 space-y-6">
                    {descriptionSections.map((section, sIdx) => {
                      if (section.variant === 'highlight') {
                        return (
                          <div
                            key={`${section.title || 'highlight'}-${sIdx}`}
                            className="bg-[#181207] border border-[#D4A24E]/55 rounded-2xl p-5 space-y-3 shadow-[0_0_24px_rgba(212,162,78,0.08)]"
                          >
                            {section.title && (
                              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D4A24E]">
                                <AlertTriangle size={15} aria-hidden="true" />
                                <span>{section.title}</span>
                              </div>
                            )}
                            <div className="space-y-2">
                              {section.entries.map((entry, eIdx) => {
                                const showDivider =
                                  eIdx > 0 &&
                                  !entry.emphasis &&
                                  Boolean(section.entries[eIdx - 1]?.emphasis);
                                return (
                                  <p
                                    key={eIdx}
                                    className={
                                      entry.emphasis
                                        ? 'text-sm md:text-[15px] font-bold text-white leading-relaxed'
                                        : `text-sm text-white/85 leading-relaxed ${
                                            showDivider ? 'pt-2.5 border-t border-[#D4A24E]/20' : ''
                                          }`
                                    }
                                  >
                                    {entry.text}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }

                      const hasLabeledItems = section.entries.some((e) => Boolean(e.label));
                      return (
                        <div key={`${section.title || 'sec'}-${sIdx}`} className="space-y-2.5">
                          {section.title && (
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A24E]">
                              {section.title}
                            </h2>
                          )}

                          {hasLabeledItems ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                              {section.entries.map((entry, eIdx) => (
                                <div
                                  key={`${entry.label || 'item'}-${eIdx}`}
                                  className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 space-y-1.5"
                                >
                                  {entry.label && (
                                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-white">
                                      {entry.label}
                                    </div>
                                  )}
                                  {entry.text && (
                                    <p className="text-sm text-white/75 leading-relaxed">
                                      {entry.text}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {section.entries.map((entry, eIdx) => (
                                <p
                                  key={eIdx}
                                  className="text-white/80 text-base leading-relaxed"
                                >
                                  {entry.text}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Specifiche tecniche */}
                {(product.stile || formattedAbv || product.formato) && (
                  <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-white/10 py-5 text-sm">
                    {product.stile && (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-white/50 mb-1">
                          Stile
                        </dt>
                        <dd className="font-semibold text-white">{product.stile}</dd>
                      </div>
                    )}
                    {formattedAbv && (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-white/50 mb-1">
                          Gradazione (ABV)
                        </dt>
                        <dd className="font-semibold text-white tabular-nums">
                          {formattedAbv}
                        </dd>
                      </div>
                    )}
                    {product.formato && (
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-white/50 mb-1">
                          Formato
                        </dt>
                        <dd className="font-semibold text-white">{product.formato}</dd>
                      </div>
                    )}
                  </dl>
                )}

                {/* Allergeni */}
                {product.allergeni && (
                  <div className="bg-[#141008] border border-[#D4A24E]/35 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle
                      size={18}
                      className="text-[#D4A24E] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-white/90 leading-snug">
                      <strong className="text-[#D4A24E]">Allergeni:</strong>{' '}
                      {product.allergeni}
                    </p>
                  </div>
                )}

                {/* Selettore Quantità + Aggiungi al carrello */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="inline-flex items-center justify-between sm:justify-start border border-white/20 rounded-full bg-[#0A0A0A] px-2 min-h-[48px]">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      disabled={!product.disponibile || qty <= 1}
                      aria-label="Diminuisci quantità"
                      className="w-11 h-11 flex items-center justify-center text-white/75 hover:text-white disabled:opacity-30 cursor-pointer"
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <span
                      aria-label={`Quantità selezionata: ${qty}`}
                      className="w-12 text-center text-base font-bold tabular-nums text-white"
                    >
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(48, q + 1))}
                      disabled={!product.disponibile || qty >= 48}
                      aria-label="Aumenta quantità"
                      className="w-11 h-11 flex items-center justify-center text-white/75 hover:text-white disabled:opacity-30 cursor-pointer"
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>

                  {product.disponibile ? (
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="flex-1 min-h-[48px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-8 py-3.5 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      {justAdded ? (
                        <>
                          <Check size={18} aria-hidden="true" />
                          Aggiunto al carrello
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={18} aria-hidden="true" />
                          Aggiungi al carrello
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="flex-1 min-h-[48px] bg-white/5 border border-white/10 text-white/45 px-8 py-3.5 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider flex items-center justify-center cursor-not-allowed whitespace-nowrap"
                    >
                      Esaurito
                    </button>
                  )}
                </div>

                {/* Info spedizione */}
                <p className="text-xs text-white/55 leading-relaxed">
                  {settings && settings.spedizione_gratis_da > 0
                    ? `Spedizione in Italia ${formatEuro(settings.spedizione_costo)} · Gratuita da ${formatEuro(settings.spedizione_gratis_da)} · Vendita riservata ai maggiorenni.`
                    : 'Spedizione in tutta Italia · Vendita riservata ai maggiorenni (18+).'}
                </p>
              </div>
            </div>

            {/* Prodotti Correlati */}
            {relatedProducts.length > 0 && (
              <div className="mt-24 pt-16 border-t border-white/10">
                <div className="flex items-end justify-between gap-4 mb-10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#D4A24E] font-semibold mb-2">
                      Continua l&apos;esplorazione
                    </p>
                    <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                      Prodotti correlati
                    </h2>
                  </div>
                  <a
                    href="/shop"
                    className="text-sm text-white/60 hover:text-[#D4A24E] transition-colors whitespace-nowrap"
                  >
                    Vedi tutto →
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {relatedProducts.map((rel) => (
                    <div key={rel.id} className="h-full">
                      <ProductCard product={rel} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
