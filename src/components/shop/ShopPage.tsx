import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, RefreshCw, ShoppingBag, Store, AlertCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatEuro } from '../../services/shopApi';
import type { ShopCategoryFilter } from '../../types/shop';
import ProductCard from './ProductCard';
import ShopJsonLd from './ShopJsonLd';

const CATEGORY_TABS: ShopCategoryFilter[] = [
  'Tutti',
  'Birre',
  'Pack misti',
  'Merch',
  'Regali',
];

export default function ShopPage() {
  const {
    products,
    settings,
    loading,
    error,
    ensureCatalogLoaded,
    reloadCatalog,
    totalCount,
    openCart,
  } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<ShopCategoryFilter>('Tutti');

  useEffect(() => {
    ensureCatalogLoaded();
  }, [ensureCatalogLoaded]);

  useEffect(() => {
    document.title = 'Shop Online | Hop Storm';
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Acquista online le birre artigianali Hop Storm, pack misti, merchandising e idee regalo direttamente dal birrificio a Roma.'
      );
    }
    const linkCan = document.querySelector("link[rel='canonical']");
    if (linkCan) {
      linkCan.setAttribute('href', 'https://www.hopstorm.it/shop');
    }
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Tutti') return products;
    const target = selectedCategory.toLowerCase();
    return products.filter(
      (p) => p.categoria.trim().toLowerCase() === target
    );
  }, [products, selectedCategory]);

  const isClosed = !loading && !error && settings !== null && !settings.shop_aperto;

  return (
    <section className="bg-black min-h-screen pt-32 md:pt-36 pb-28 px-6">
      <ShopJsonLd mode="catalog" products={products} />

      <div className="max-w-7xl mx-auto">
        {/* Top Navigation Bar dello Shop */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#D4A24E] transition-colors min-h-[44px]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Torna al sito
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

        {/* Hero / Header dello Shop */}
        <div className="mb-12 border-b border-white/10 pb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4A24E] font-semibold mb-3">
              Birrificio Artigianale Hop Storm
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none mb-4">
              Shop <span className="text-[#D4A24E]">Online</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Ordina le nostre birre artigianali non filtrate, i pack misti e il merchandising ufficiale con spedizione in tutta Italia.
            </p>
          </div>

          {!loading && !error && settings && settings.shop_aperto && (
            <div className="text-sm text-white/70 lg:text-right shrink-0">
              {settings.spedizione_gratis_da > 0 ? (
                <p>
                  Spedizione <span className="text-white font-semibold tabular-nums">{formatEuro(settings.spedizione_costo)}</span>
                  <span className="mx-2 text-white/30" aria-hidden="true">·</span>
                  Gratis da <span className="text-[#D4A24E] font-semibold tabular-nums">{formatEuro(settings.spedizione_gratis_da)}</span>
                </p>
              ) : settings.spedizione_costo > 0 ? (
                <p>
                  Spedizione in Italia <span className="text-white font-semibold tabular-nums">{formatEuro(settings.spedizione_costo)}</span>
                </p>
              ) : (
                <p className="text-[#D4A24E] font-medium">Spedizione gratuita su tutti gli ordini</p>
              )}
              <p className="text-xs text-white/50 mt-1">
                Vendita riservata ai maggiorenni (18+)
              </p>
            </div>
          )}
        </div>

        {/* Stato Loading (Skeleton) */}
        {loading && (
          <div aria-busy="true" aria-label="Caricamento prodotti in corso">
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORY_TABS.map((tab) => (
                <div
                  key={tab}
                  className="h-11 w-24 rounded-full bg-white/5 animate-pulse"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-square bg-white/5" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-24 bg-white/10 rounded" />
                    <div className="h-5 w-3/4 bg-white/10 rounded" />
                    <div className="h-4 w-full bg-white/5 rounded" />
                    <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                      <div className="h-6 w-20 bg-white/10 rounded" />
                      <div className="h-11 w-full bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stato Errore */}
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
            <h2 className="text-xl font-bold text-white mb-2">
              Errore nel caricamento dello shop
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {error}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={reloadCatalog}
                className="min-h-[44px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw size={16} aria-hidden="true" />
                Riprova
              </button>
              <a
                href="/#contatti"
                className="min-h-[44px] border border-white/20 text-white hover:bg-white/5 transition-colors px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center"
              >
                Contattaci
              </a>
            </div>
          </div>
        )}

        {/* Stato Shop Chiuso */}
        {isClosed && (
          <div className="max-w-xl mx-auto my-12 bg-[#0A0A0A] border border-white/15 rounded-2xl p-10 text-center">
            <Store
              size={40}
              className="text-[#D4A24E] mx-auto mb-4"
              aria-hidden="true"
            />
            <h2 className="text-2xl font-bold text-white mb-3">
              Shop momentaneamente chiuso
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              Stiamo preparando nuove cotte o aggiornando il catalogo. Torna a trovarci presto oppure scrivici su WhatsApp per verificare la disponibilità diretta.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/"
                className="min-h-[44px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center"
              >
                Torna alla Home
              </a>
              {settings?.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] border border-white/20 text-white hover:bg-white/5 transition-colors px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center"
                >
                  Scrivici su WhatsApp
                </a>
              )}
            </div>
          </div>
        )}

        {/* Catalogo Attivo */}
        {!loading && !error && !isClosed && (
          <>
            {/* Tabs Filtro Categorie */}
            <div
              role="tablist"
              aria-label="Filtra prodotti per categoria"
              className="flex items-center gap-2 overflow-x-auto pb-2 mb-10"
            >
              {CATEGORY_TABS.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat)}
                    className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#D4A24E] text-black'
                        : 'bg-[#0A0A0A] border border-white/10 text-white/70 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Griglia Prodotti */}
            {filteredProducts.length === 0 ? (
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-12 text-center">
                <p className="text-white/70 text-base mb-4">
                  Nessun prodotto disponibile al momento in questa categoria.
                </p>
                {selectedCategory !== 'Tutti' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('Tutti')}
                    className="min-h-[44px] border border-white/20 text-white hover:border-[#D4A24E] hover:text-[#D4A24E] transition-colors px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Mostra tutti i prodotti
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="h-full">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
