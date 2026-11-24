import { useState } from 'react';
import { Package, ShoppingBag, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatEuro, isSafeImageUrl } from '../../services/shopApi';
import type { ShopProduct } from '../../types/shop';
import { trackEvent } from '../../utils/analytics';

interface ProductCardProps {
  product: ShopProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openCart } = useShop();
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const productHref = `/shop/${encodeURIComponent(product.id)}`;
  const hasImage = isSafeImageUrl(product.foto1) && !imgError;
  const hasDiscount =
    product.prezzo_barrato !== null && product.prezzo_barrato > product.prezzo;

  const handleAdd = () => {
    if (!product.disponibile) return;
    addToCart(product, 1);
    trackEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.nome,
      item_category: product.categoria,
      price: product.prezzo,
      currency: 'EUR',
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
    openCart();
  };

  return (
    <article className="group h-full bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4A24E]/40">
      <a
        href={productHref}
        className="relative aspect-square bg-black p-3 sm:p-4 overflow-hidden flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D4A24E]"
        aria-label={`Vai ai dettagli di ${product.nome}`}
      >
        {hasImage ? (
          <img
            src={product.foto1}
            alt={product.nome}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-br from-[#141414] to-[#0A0A0A] text-white/30">
            <Package size={40} strokeWidth={1.4} aria-hidden="true" />
            <span className="text-xs tracking-wider uppercase text-white/40 text-center">
              {product.nome}
            </span>
          </div>
        )}
        {!product.disponibile && (
          <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-white/90 bg-black/80 border border-white/20 px-4 py-1.5 rounded-md">
              Esaurito
            </span>
          </div>
        )}
      </a>

      <div className="p-6 flex flex-col flex-1">
        {/* Metadata puliti senza pillole */}
        <div className="flex items-center gap-2 text-xs text-white/60 mb-2 truncate">
          {product.categoria && <span>{product.categoria}</span>}
          {product.categoria && product.formato && (
            <span aria-hidden="true">·</span>
          )}
          {product.formato && <span>{product.formato}</span>}
        </div>

        <h2 className="text-lg font-semibold text-white tracking-tight leading-snug mb-1.5">
          <a
            href={productHref}
            className="hover:text-[#D4A24E] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A24E]"
          >
            {product.nome}
          </a>
        </h2>

        {product.descrizione_breve && (
          <p className="text-sm text-white/60 leading-relaxed line-clamp-2 mb-4">
            {product.descrizione_breve}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-4">
          <div className="flex items-baseline gap-2.5 tabular-nums">
            <span className="text-xl font-bold text-[#D4A24E]">
              {formatEuro(product.prezzo)}
            </span>
            {hasDiscount && product.prezzo_barrato !== null && (
              <span className="text-sm text-white/40 line-through">
                {formatEuro(product.prezzo_barrato)}
              </span>
            )}
          </div>

          {product.disponibile ? (
            <button
              type="button"
              onClick={handleAdd}
              className="w-full min-h-[44px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              {justAdded ? (
                <>
                  <Check size={16} aria-hidden="true" />
                  Aggiunto
                </>
              ) : (
                <>
                  <ShoppingBag size={16} aria-hidden="true" />
                  Aggiungi al carrello
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="w-full min-h-[44px] bg-white/5 border border-white/10 text-white/45 px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center cursor-not-allowed whitespace-nowrap"
            >
              Esaurito
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
