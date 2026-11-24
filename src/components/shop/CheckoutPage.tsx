/// <reference types="vite/client" />
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, AlertCircle, Loader2, Lock } from 'lucide-react';

interface CheckoutFormInstance {
  mount: (selector: string) => void;
  unmount?: () => void;
  on: (eventName: 'confirm', handler: (event: unknown) => void | Promise<void>) => void;
}

type LoadActionsResult =
  | {
      type: 'success';
      actions: {
        confirm: (options: { formConfirmEvent: unknown }) => Promise<unknown>;
      };
    }
  | {
      type: 'error';
      error?: { message?: string };
    };

interface CheckoutFormSdkInstance {
  createForm: (options: { layout: 'expanded' }) => CheckoutFormInstance;
  loadActions: () => Promise<LoadActionsResult>;
}

interface StripeDahliaInstance {
  initCheckoutFormSdk: (options: {
    clientSecret: Promise<string>;
    appearance: {
      theme: 'night' | 'stripe' | 'flat';
      labels: 'auto' | 'above' | 'floating';
      inputs: 'spaced' | 'condensed';
      variables: Record<string, string>;
    };
  }) => CheckoutFormSdkInstance;
}

declare global {
  interface Window {
    Stripe?: (publishableKey: string) => StripeDahliaInstance;
  }
}

const APPEARANCE = {
  theme: 'night' as const,
  labels: 'auto' as const,
  inputs: 'spaced' as const,
  variables: {
    borderRadius: '4px',
    colorBackground: '#ffffff',
    colorDanger: '#df1b41',
    colorPrimary: '#0570de',
    colorSuccess: '#00c853',
    colorText: '#30313d',
    fontFamily: 'default',
    fontSizeBase: '16px',
    spacingUnit: '4px',
  },
};

export default function CheckoutPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const mountedFormRef = useRef<CheckoutFormInstance | null>(null);

  useEffect(() => {
    document.title = 'Checkout | Shop Hop Storm';
    const metaRobots = document.querySelector("meta[name='robots']");
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim();

    if (!publishableKey) {
      setError(
        'Chiave pubblica Stripe non configurata (VITE_STRIPE_PUBLISHABLE_KEY). Consulta STRIPE_INTEGRATION_TODO.md per completare la configurazione.'
      );
      setLoading(false);
      return;
    }

    if (typeof window.Stripe !== 'function') {
      setError(
        'Impossibile caricare Stripe.js dal browser. Ricarica la pagina o verifica la connessione.'
      );
      setLoading(false);
      return;
    }

    const stripe = window.Stripe(publishableKey);

    const initEmbeddedCheckout = async () => {
      try {
        const clientSecretPromise = fetch('/api/create-checkout-session', {
          method: 'POST',
        }).then(async (response) => {
          const json = (await response.json().catch(() => ({}))) as {
            client_secret?: string;
            error?: string;
          };
          if (!response.ok || !json.client_secret) {
            throw new Error(
              json.error ||
                'Impossibile avviare la sessione di pagamento Stripe.'
            );
          }
          return json.client_secret;
        });

        const checkout = stripe.initCheckoutFormSdk({
          clientSecret: clientSecretPromise,
          appearance: APPEARANCE,
        });

        if (cancelled) return;

        const form = checkout.createForm({ layout: 'expanded' });
        mountedFormRef.current = form;
        form.mount('#checkout-form');

        const loadActionsResult = await checkout.loadActions();
        if (cancelled) return;

        if (loadActionsResult.type === 'success') {
          const { actions } = loadActionsResult;
          form.on('confirm', async (event) => {
            setConfirmError(null);
            try {
              await actions.confirm({ formConfirmEvent: event });
            } catch (err: unknown) {
              console.error('Payment confirmation error:', err);
              const msg =
                err instanceof Error && err.message
                  ? err.message
                  : 'Errore durante la conferma del pagamento. Verifica i dati e riprova.';
              if (!cancelled) {
                setConfirmError(msg);
              }
            }
          });
        } else {
          setError(
            loadActionsResult.error?.message ||
              'Impossibile inizializzare il modulo di pagamento Stripe.'
          );
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const msg =
            err instanceof Error && err.message
              ? err.message
              : 'Errore durante il caricamento del checkout.';
          setError(msg);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    initEmbeddedCheckout();

    return () => {
      cancelled = true;
      try {
        mountedFormRef.current?.unmount?.();
      } catch {
        // Ignore cleanup errors if element already unmounted
      }
      mountedFormRef.current = null;
    };
  }, []);

  return (
    <section className="bg-black min-h-screen pt-32 md:pt-36 pb-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <a
            href="/carrello"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#D4A24E] transition-colors min-h-[44px]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Torna al Carrello
          </a>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/55">
            <Lock size={14} className="text-[#D4A24E]" aria-hidden="true" />
            Pagamento sicuro con Stripe
          </span>
        </div>

        <div className="mb-8 border-b border-white/10 pb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4A24E] font-semibold mb-2">
            Shop Hop Storm
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Completa il <span className="text-[#D4A24E]">Pagamento</span>
          </h1>
        </div>

        {confirmError && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-[#E53935]/15 border border-[#E53935]/40 text-sm text-white flex items-start gap-2.5"
          >
            <AlertCircle
              size={18}
              className="text-[#E53935] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{confirmError}</span>
          </div>
        )}

        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 sm:p-8">
          {loading && !error && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-white/70">
              <Loader2 size={28} className="animate-spin text-[#D4A24E]" aria-hidden="true" />
              <p className="text-sm">Caricamento modulo di pagamento Stripe...</p>
            </div>
          )}

          {error ? (
            <div
              role="alert"
              className="py-8 text-center space-y-4 max-w-md mx-auto"
            >
              <AlertCircle
                size={36}
                className="text-[#E53935] mx-auto"
                aria-hidden="true"
              />
              <h2 className="text-lg font-bold text-white">
                Modulo di pagamento non disponibile
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">{error}</p>
              <a
                href="/shop"
                className="inline-flex items-center justify-center min-h-[44px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider"
              >
                Torna allo Shop
              </a>
            </div>
          ) : (
            <div id="checkout-form" />
          )}
        </div>
      </div>
    </section>
  );
}
