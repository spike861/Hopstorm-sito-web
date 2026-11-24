import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { fetchShopProducts } from '../services/shopApi';
import type { CartItem, ShopProduct, ShopSettings } from '../types/shop';

const CART_STORAGE_KEY = 'hopstorm_shop_cart_v1';
const MAX_QTY = 48;

export interface StoredCartEntry {
  id: string;
  qty: number;
}

interface ShopContextValue {
  // Catalog
  products: ShopProduct[];
  settings: ShopSettings | null;
  loading: boolean;
  hasLoaded: boolean;
  error: string | null;
  ensureCatalogLoaded: () => void;
  reloadCatalog: () => void;
  // Cart (persisted as id + qty only; prices always derived from products)
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  unavailableRemoved: string[];
  clearUnavailableNotice: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: ShopProduct, qty?: number) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

function loadStoredCart(): StoredCartEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const deduped = new Map<string, number>();
    for (const entry of parsed) {
      if (!entry || typeof entry !== 'object') continue;
      const candidateId =
        typeof entry.id === 'string'
          ? entry.id.trim()
          : entry.product && typeof entry.product.id === 'string'
            ? entry.product.id.trim()
            : '';
      const qty = Number(entry.qty);
      if (!candidateId || !Number.isInteger(qty) || qty < 1) continue;
      const existing = deduped.get(candidateId) || 0;
      deduped.set(candidateId, Math.min(MAX_QTY, existing + qty));
    }

    return Array.from(deduped.entries()).map(([id, qty]) => ({ id, qty }));
  } catch {
    return [];
  }
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [settings, setSettings] = useState<ShopSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasLoadedRef = useRef(false);
  const isLoadingRef = useRef(false);
  const activeAbortRef = useRef<AbortController | null>(null);

  const [rawItems, setRawItems] = useState<StoredCartEntry[]>(loadStoredCart);
  const [unavailableRemoved, setUnavailableRemoved] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist ONLY { id, qty } in localStorage (never store prices client-side)
  useEffect(() => {
    try {
      const compact: StoredCartEntry[] = rawItems.map((i) => ({
        id: i.id,
        qty: i.qty,
      }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(compact));
    } catch {
      // Ignore storage quota errors
    }
  }, [rawItems]);

  const loadCatalog = useCallback((force = false) => {
    if (!force && (hasLoadedRef.current || isLoadingRef.current)) return;

    if (activeAbortRef.current) {
      activeAbortRef.current.abort();
    }
    const controller = new AbortController();
    activeAbortRef.current = controller;

    isLoadingRef.current = true;
    setLoading(true);
    setError(null);

    fetchShopProducts(controller.signal)
      .then((res) => {
        if (controller.signal.aborted) return;
        hasLoadedRef.current = true;
        isLoadingRef.current = false;
        setHasLoaded(true);
        setProducts(res.products);
        setSettings(res.settings);
        setLoading(false);

        // Remove unavailable or missing items once live catalog loads
        setRawItems((prev) => {
          const removedNames: string[] = [];
          const next = prev.filter((entry) => {
            const match = res.products.find((p) => p.id === entry.id);
            if (!match || !match.disponibile) {
              removedNames.push(match ? match.nome : entry.id);
              return false;
            }
            return true;
          });
          if (removedNames.length > 0) {
            setUnavailableRemoved(removedNames);
          }
          return next;
        });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        isLoadingRef.current = false;
        const message =
          err instanceof Error && err.message
            ? err.message
            : 'Impossibile caricare i prodotti dello shop. Riprova tra poco.';
        setError(message);
        setLoading(false);
      });
  }, []);

  const ensureCatalogLoaded = useCallback(() => {
    loadCatalog(false);
  }, [loadCatalog]);

  const reloadCatalog = useCallback(() => {
    loadCatalog(true);
  }, [loadCatalog]);

  // Preload catalog if user already has items in cart (so badge/drawer prices stay live)
  // or when landing directly on shop/cart routes
  useEffect(() => {
    const path = window.location.pathname;
    if (
      path === '/shop' ||
      path.startsWith('/shop/') ||
      path === '/carrello' ||
      rawItems.length > 0
    ) {
      loadCatalog(false);
    }
  }, [loadCatalog, rawItems.length]);

  const items: CartItem[] = useMemo(() => {
    if (products.length === 0) return [];
    const map = new Map(products.map((p) => [p.id, p]));
    return rawItems
      .map((entry) => {
        const product = map.get(entry.id);
        return product ? { product, qty: entry.qty } : null;
      })
      .filter((ci): ci is CartItem => ci !== null);
  }, [rawItems, products]);

  const addToCart = useCallback((product: ShopProduct, qty = 1) => {
    if (!product.disponibile) return;
    const safeQty = Math.max(1, Math.min(MAX_QTY, Math.floor(qty)));
    setUnavailableRemoved([]);
    setRawItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          id: product.id,
          qty: Math.min(MAX_QTY, updated[idx].qty + safeQty),
        };
        return updated;
      }
      return [...prev, { id: product.id, qty: safeQty }];
    });
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    const safeQty = Math.floor(qty);
    if (safeQty <= 0) {
      setRawItems((prev) => prev.filter((i) => i.id !== productId));
      return;
    }
    setRawItems((prev) =>
      prev.map((i) =>
        i.id === productId ? { id: i.id, qty: Math.min(MAX_QTY, safeQty) } : i
      )
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setRawItems((prev) => prev.filter((i) => i.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setRawItems([]);
  }, []);

  const totalCount = useMemo(() => {
    if (hasLoaded) {
      return items.reduce((sum, i) => sum + i.qty, 0);
    }
    return rawItems.reduce((sum, i) => sum + i.qty, 0);
  }, [hasLoaded, items, rawItems]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.prezzo * i.qty, 0),
    [items]
  );

  return (
    <ShopContext.Provider
      value={{
        products,
        settings,
        loading,
        hasLoaded,
        error,
        ensureCatalogLoaded,
        reloadCatalog,
        items,
        totalCount,
        subtotal,
        unavailableRemoved,
        clearUnavailableNotice: () => setUnavailableRemoved([]),
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error('useShop must be used inside ShopProvider');
  }
  return ctx;
}
