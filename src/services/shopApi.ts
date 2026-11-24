import { SHOP_API_URL } from '../config/shop';
import type {
  CheckoutItemPayload,
  CheckoutResponse,
  ShopProduct,
  ShopProductsResponse,
  ShopSettings,
  VerifySessionResponse,
} from '../types/shop';

export function formatEuro(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  return `€ ${safe.toFixed(2).replace('.', ',')}`;
}

export function isSafeImageUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  // Allow only relative same-origin paths (block protocol-relative '//')
  if (trimmed.startsWith('/')) {
    return !trimmed.startsWith('//') && !trimmed.startsWith('/\\');
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isAllowedCheckoutRedirectUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed, typeof window !== 'undefined' ? window.location.origin : 'https://www.hopstorm.it');
    if (parsed.protocol !== 'https:') {
      return false;
    }
    const host = parsed.hostname.toLowerCase();
    if (host === 'checkout.stripe.com' || host.endsWith('.stripe.com')) {
      return true;
    }
    if (typeof window !== 'undefined' && parsed.origin === window.location.origin) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export function getProductGallery(product: ShopProduct): string[] {
  return [product.foto1, product.foto2, product.foto3]
    .map((u) => (typeof u === 'string' ? u.trim() : ''))
    .filter((u) => isSafeImageUrl(u));
}

export function formatShopAbv(raw: string | undefined | null): string {
  if (!raw) return '';
  const trimmed = String(raw).trim();
  if (!trimmed) return '';

  if (trimmed.includes('%')) {
    return trimmed.replace(/(\d)\.(\d)/g, '$1,$2');
  }

  const parsed = Number(trimmed.replace(',', '.'));
  if (Number.isFinite(parsed) && parsed > 0) {
    // Google Sheets auto-converts inputs like "5.8%" into decimal 0.058
    const pct = parsed < 1 ? Number((parsed * 100).toFixed(2)) : parsed;
    return `${pct.toString().replace('.', ',')}%`;
  }

  return trimmed;
}

export interface ProductDescriptionEntry {
  label?: string;
  text: string;
  emphasis?: boolean;
}

export interface ProductDescriptionSection {
  title?: string;
  variant?: 'default' | 'highlight';
  entries: ProductDescriptionEntry[];
}

const KNOWN_DESCRIPTION_HEADINGS = new Set([
  'stile',
  'luppoli',
  'aroma',
  'gusto',
  'aspetto',
  'abbinamenti',
  'ingredienti',
  'note di degustazione',
]);

const HIGHLIGHT_SECTION_MARKER = '__IN_EVIDENZA__';

function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function splitHighlightSentences(text: string): ProductDescriptionEntry[] {
  const cleaned = text.trim();
  if (!cleaned) return [];

  // Separa l'avviso iniziale dalla descrizione di occasioni e numero di bicchieri
  const parts = cleaned
    .replace(/(OSSIDARSI\.)\s+/i, '$1\n')
    .replace(/\.\s+(Il contenuto corrisponde\b)/gi, '.\n$1')
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return parts.map((part, idx) => ({
    text: part,
    emphasis: idx === 0,
  }));
}

export function parseProductDescription(
  raw: string | undefined | null
): ProductDescriptionSection[] {
  if (!raw) return [];
  let normalized = String(raw).replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];

  // Separa in una sezione evidenziata l'avviso di consumo/spillatura fustini
  normalized = normalized.replace(
    /(?:([.!?])\s*|\n\s*)(UNA VOLTA APERTO\b)/gi,
    (_, punct) => `${punct || ''}\n${HIGHLIGHT_SECTION_MARKER}\nUNA VOLTA APERTO`
  );
  if (/^UNA VOLTA APERTO\b/i.test(normalized)) {
    normalized = `${HIGHLIGHT_SECTION_MARKER}\n${normalized}`;
  }

  // Separa intestazioni rimaste sulla stessa riga dopo un punto
  normalized = normalized.replace(
    /([.!?])\s+(Stile|Luppoli|Aroma|Gusto|Aspetto|Abbinamenti|Ingredienti|Note di degustazione)(?=[\s:\n]|$)/gi,
    '$1\n$2'
  );

  // Separa il Gusto di Red Moon se incollato dopo la descrizione del malto
  normalized = normalized.replace(
    /([.!?])\s+(Equilibrio perfetto tra malto e luppolo)/gi,
    '$1\nGusto\n$2'
  );

  const lines = normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const hasKnownHeadings = lines.some(
    (line) =>
      line === HIGHLIGHT_SECTION_MARKER ||
      KNOWN_DESCRIPTION_HEADINGS.has(line.replace(/:$/, '').toLowerCase())
  );

  if (!hasKnownHeadings) {
    return [
      {
        entries: normalized
          .split(/\n{2,}/)
          .map((p) => p.replace(/\n+/g, ' ').trim())
          .filter(Boolean)
          .map((text) => ({ text })),
      },
    ];
  }

  const sections: ProductDescriptionSection[] = [];
  let currentSection: ProductDescriptionSection | null = null;
  let pendingLabel: string | undefined;

  const ensureSection = () => {
    if (!currentSection) {
      currentSection = { entries: [] };
      sections.push(currentSection);
    }
    return currentSection;
  };

  for (const rawLine of lines) {
    if (rawLine === HIGHLIGHT_SECTION_MARKER) {
      pendingLabel = undefined;
      currentSection = {
        title: 'Avviso importante & Resa',
        variant: 'highlight',
        entries: [],
      };
      sections.push(currentSection);
      continue;
    }

    const cleanHeading = rawLine.replace(/:$/, '');
    if (KNOWN_DESCRIPTION_HEADINGS.has(cleanHeading.toLowerCase())) {
      pendingLabel = undefined;
      currentSection = {
        title: capitalizeFirst(cleanHeading.toLowerCase()),
        entries: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (currentSection?.variant === 'highlight') {
      const parsedEntries = splitHighlightSentences(rawLine);
      currentSection.entries.push(...parsedEntries);
      continue;
    }

    // Sottotitolo tutto maiuscolo (es. CITRA, MOSAIC, MAGNUM, SAPHIR, MALTO TOSTATO)
    const isAllCapsLabel =
      /^[A-ZÀÈÉÌÒÙ0-9][A-ZÀÈÉÌÒÙ0-9\s\-/]{1,32}$/.test(cleanHeading) &&
      /[A-ZÀÈÉÌÒÙ]{2}/.test(cleanHeading);

    if (isAllCapsLabel) {
      ensureSection();
      pendingLabel = cleanHeading;
      continue;
    }

    const sec = ensureSection();
    if (pendingLabel) {
      sec.entries.push({
        label: pendingLabel,
        text: capitalizeFirst(rawLine),
      });
      pendingLabel = undefined;
    } else if (sec.entries.length > 0 && !sec.entries[sec.entries.length - 1].label) {
      sec.entries[sec.entries.length - 1].text += ` ${rawLine}`;
    } else {
      sec.entries.push({ text: capitalizeFirst(rawLine) });
    }
  }

  if (pendingLabel && currentSection) {
    currentSection.entries.push({ label: pendingLabel, text: '' });
  }

  return sections.filter((s) => s.entries.length > 0);
}

function normalizeProduct(raw: Partial<ShopProduct>): ShopProduct {
  const prezzo = Number(raw.prezzo);
  const prezzoBarrato =
    raw.prezzo_barrato !== null && raw.prezzo_barrato !== undefined
      ? Number(raw.prezzo_barrato)
      : null;

  return {
    id: String(raw.id || '').trim(),
    attivo: Boolean(raw.attivo),
    ordine: Number.isFinite(Number(raw.ordine)) ? Number(raw.ordine) : 9999,
    categoria: String(raw.categoria || '').trim(),
    nome: String(raw.nome || '').trim(),
    stile: String(raw.stile || '').trim(),
    abv: String(raw.abv || '').trim(),
    formato: String(raw.formato || '').trim(),
    prezzo: Number.isFinite(prezzo) ? prezzo : 0,
    prezzo_barrato:
      prezzoBarrato !== null && Number.isFinite(prezzoBarrato) && prezzoBarrato > 0
        ? prezzoBarrato
        : null,
    foto1: String(raw.foto1 || '').trim(),
    foto2: String(raw.foto2 || '').trim(),
    foto3: String(raw.foto3 || '').trim(),
    descrizione_breve: String(raw.descrizione_breve || '').trim(),
    descrizione: String(raw.descrizione || '').trim(),
    allergeni: String(raw.allergeni || '').trim(),
    disponibile: Boolean(raw.disponibile),
    in_evidenza: Boolean(raw.in_evidenza),
  };
}

function normalizeSettings(raw?: Partial<ShopSettings>): ShopSettings {
  const shippingCost = Number(raw?.spedizione_costo);
  const freeThreshold = Number(raw?.spedizione_gratis_da);
  return {
    spedizione_costo: Number.isFinite(shippingCost) ? shippingCost : 0,
    spedizione_gratis_da: Number.isFinite(freeThreshold) ? freeThreshold : 0,
    shop_aperto: raw?.shop_aperto !== undefined ? Boolean(raw.shop_aperto) : true,
    whatsapp: raw?.whatsapp ? String(raw.whatsapp).trim() : undefined,
  };
}

function getValidatedBaseUrl(): string {
  const baseUrl = SHOP_API_URL.trim();
  if (!baseUrl) {
    throw new Error(
      'Il catalogo dello shop non è al momento raggiungibile. Riprova tra poco o contattaci su WhatsApp.'
    );
  }
  return baseUrl;
}

export async function fetchShopProducts(signal?: AbortSignal): Promise<ShopProductsResponse> {
  const baseUrl = getValidatedBaseUrl();
  const separator = baseUrl.includes('?') ? '&' : '?';
  const url = `${baseUrl}${separator}action=products`;

  const response = await fetch(url, {
    method: 'GET',
    signal,
  });

  if (!response.ok) {
    throw new Error('Impossibile caricare i prodotti dello shop. Riprova tra poco.');
  }

  let data: ShopProductsResponse;
  try {
    data = (await response.json()) as ShopProductsResponse;
  } catch {
    throw new Error('Risposta non valida dal server dello shop. Riprova tra poco.');
  }

  if (!data || !data.ok) {
    throw new Error(
      data?.error || 'Impossibile caricare i prodotti dello shop. Riprova tra poco.'
    );
  }

  const products = Array.isArray(data.products)
    ? data.products.map(normalizeProduct).filter((p) => p.id && p.nome)
    : [];

  return {
    ok: true,
    products,
    settings: normalizeSettings(data.settings),
  };
}

export async function createCheckoutSession(
  items: CheckoutItemPayload[],
  note?: string
): Promise<CheckoutResponse> {
  const baseUrl = getValidatedBaseUrl();

  const sanitizedItems = (Array.isArray(items) ? items : [])
    .filter((item) => item && typeof item.id === 'string' && item.id.trim().length > 0)
    .map((item) => ({
      id: item.id.trim().slice(0, 120),
      qty: Math.max(1, Math.min(48, Math.floor(Number(item.qty) || 1))),
    }));

  if (sanitizedItems.length === 0) {
    throw new Error('Il carrello non contiene articoli validi.');
  }

  const cleanNote = typeof note === 'string' ? note.trim().slice(0, 500) : '';

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify({
      action: 'checkout',
      items: sanitizedItems,
      ...(cleanNote ? { note: cleanNote } : {}),
    }),
  });

  if (!response.ok) {
    throw new Error('Errore durante la creazione del pagamento. Riprova tra poco.');
  }

  let data: CheckoutResponse;
  try {
    data = (await response.json()) as CheckoutResponse;
  } catch {
    throw new Error('Risposta non valida dal servizio di pagamento.');
  }

  if (!data || !data.ok || !data.url || !isAllowedCheckoutRedirectUrl(data.url)) {
    throw new Error(
      data?.error || 'Impossibile avviare il pagamento. Verifica gli articoli e riprova.'
    );
  }

  return data;
}

export async function verifyCheckoutSession(
  sessionId: string,
  signal?: AbortSignal
): Promise<VerifySessionResponse> {
  const trimmedSessionId = typeof sessionId === 'string' ? sessionId.trim() : '';
  if (!/^[A-Za-z0-9_-]{8,200}$/.test(trimmedSessionId)) {
    throw new Error('Codice sessione non valido.');
  }

  const baseUrl = getValidatedBaseUrl();
  const separator = baseUrl.includes('?') ? '&' : '?';
  const url = `${baseUrl}${separator}action=verify&session_id=${encodeURIComponent(trimmedSessionId)}`;

  const response = await fetch(url, {
    method: 'GET',
    signal,
  });

  if (!response.ok) {
    throw new Error('Impossibile verificare lo stato del pagamento.');
  }

  let data: VerifySessionResponse;
  try {
    data = (await response.json()) as VerifySessionResponse;
  } catch {
    throw new Error('Risposta non valida durante la verifica ordine.');
  }

  if (!data || !data.ok) {
    throw new Error(data?.error || 'Ordine non trovato o non ancora confermato.');
  }

  return data;
}
