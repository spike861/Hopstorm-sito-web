export type ShopCategoryFilter =
  | 'Tutti'
  | 'Birre'
  | 'Pack misti'
  | 'Merch'
  | 'Regali';

export interface ShopProduct {
  id: string;
  attivo: boolean;
  ordine: number;
  categoria: string;
  nome: string;
  stile: string;
  abv: string;
  formato: string;
  prezzo: number;
  prezzo_barrato: number | null;
  foto1: string;
  foto2: string;
  foto3: string;
  descrizione_breve: string;
  descrizione: string;
  allergeni: string;
  disponibile: boolean;
  in_evidenza: boolean;
}

export interface ShopSettings {
  spedizione_costo: number;
  spedizione_gratis_da: number;
  shop_aperto: boolean;
  whatsapp?: string;
}

export interface ShopProductsResponse {
  ok: boolean;
  products: ShopProduct[];
  settings: ShopSettings;
  error?: string;
}

export interface CheckoutItemPayload {
  id: string;
  qty: number;
}

export interface CheckoutResponse {
  ok: boolean;
  url?: string;
  order_id?: string;
  error?: string;
}

export interface VerifiedOrderSummary {
  data: string;
  order_id: string;
  stato: string;
  nome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  articoli: string;
  subtotale: number;
  spedizione: number;
  totale: number;
  stripe_session_id: string;
  spedito: string;
  note: string;
}

export interface VerifySessionResponse {
  ok: boolean;
  paid?: boolean;
  payment_status?: string;
  order?: VerifiedOrderSummary | null;
  error?: string;
}

export interface CartItem {
  product: ShopProduct;
  qty: number;
}
