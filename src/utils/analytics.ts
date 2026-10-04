const STORAGE_KEY = 'hopstorm_cookie_consent';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
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

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args as unknown as Record<string, unknown>);
    };
  }

  if (consent.analytics || consent.marketing) {
    const measurementId = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GA_MEASUREMENT_ID;
    if (measurementId && !document.getElementById('ga4-script')) {
      const script = document.createElement('script');
      script.id = 'ga4-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
      window.gtag('js', new Date());
      window.gtag('config', measurementId, { anonymize_ip: true });
    }
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
