const STORAGE_KEY = 'hopstorm_cookie_consent';
const DEFAULT_GOOGLE_TAG_ID = 'GTM-PLPQZZ69';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

function getConfiguredTagId(): string {
  const rawId = (import.meta as unknown as { env?: Record<string, string> }).env
    ?.VITE_GA_MEASUREMENT_ID;
  const trimmed = typeof rawId === 'string' ? rawId.trim() : '';
  if (/^(G|GT|GTM|AW|DC)-[A-Z0-9]{4,20}$/i.test(trimmed)) {
    return trimmed.toUpperCase();
  }
  return DEFAULT_GOOGLE_TAG_ID;
}

export function hasTrackingConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.expiry !== 'number' || Date.now() >= parsed.expiry) {
      return false;
    }
    return Boolean(parsed.analytics || parsed.marketing);
  } catch {
    return false;
  }
}

export function initGA4(consent: { analytics: boolean; marketing: boolean }): void {
  if (typeof window === 'undefined') return;

  const tagId = getConfiguredTagId();
  const allowed = Boolean(consent.analytics || consent.marketing);
  window[`ga-disable-${tagId}`] = !allowed;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // Push native Arguments object to match Google Tag / GTM expectations
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }

  if (!allowed) {
    return;
  }

  window.gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
  });

  if (!document.getElementById('ga4-script')) {
    const isGtm = tagId.startsWith('GTM-');
    if (isGtm) {
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    }

    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = isGtm
      ? `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(tagId)}`
      : `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', tagId, {
      anonymize_ip: true,
      page_path: window.location.pathname,
    });
  }
}

export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (!hasTrackingConsent()) return;
  if (typeof window === 'undefined') return;

  const payload = {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: pageTitle || document.title,
  };

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', payload);
  } else {
    window.dataLayer.push({ event: 'page_view', ...payload });
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (!hasTrackingConsent()) return;
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    window.dataLayer.push({ event: eventName, ...params });
  }
}
