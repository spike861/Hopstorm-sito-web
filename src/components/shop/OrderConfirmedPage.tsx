import { useEffect, useState } from 'react';
import {
  CheckCircle,
  Loader2,
  ArrowLeft,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatEuro, verifyCheckoutSession } from '../../services/shopApi';
import type { VerifiedOrderSummary } from '../../types/shop';
import { trackEvent } from '../../utils/analytics';

export default function OrderConfirmedPage() {
  const { clearCart, settings } = useShop();
  const [loading, setLoading] = useState(true);
  const [unconfirmedMessage, setUnconfirmedMessage] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [order, setOrder] = useState<VerifiedOrderSummary | null>(null);

  useEffect(() => {
    document.title = 'Conferma Ordine | Hop Storm';
    const metaRobots = document.querySelector("meta[name='robots']");
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex');
    }

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id')?.trim() || '';

    if (!sessionId || !/^[A-Za-z0-9_-]{8,200}$/.test(sessionId)) {
      setUnconfirmedMessage(
        'Non abbiamo trovato un codice sessione di pagamento valido. Se hai appena effettuato un ordine, contattaci su WhatsApp per ricevere assistenza.'
      );
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    verifyCheckoutSession(sessionId, controller.signal)
      .then((res) => {
        if (controller.signal.aborted) return;
        const isPaid = Boolean(res.paid);
        setPaid(isPaid);
        setOrder(res.order || null);
        setLoading(false);

        if (isPaid) {
          // Svuota il carrello SOLO se il pagamento è confermato
          clearCart();
          trackEvent('purchase', {
            transaction_id: res.order?.order_id || sessionId,
            currency: 'EUR',
            value: res.order?.totale || 0,
          });
        } else {
          setUnconfirmedMessage(
            'Il pagamento non risulta ancora confermato. Se hai appena completato l\'operazione o riscontri un dubbio, scrivici su WhatsApp e verifichiamo subito insieme.'
          );
        }
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setUnconfirmedMessage(
          'Al momento non riusciamo a verificare automaticamente lo stato del pagamento. Se hai completato l\'ordine, contattaci su WhatsApp indicando i tuoi dati.'
        );
        setLoading(false);
      });

    return () => controller.abort();
  }, [clearCart]);

  const whatsappDigits = (settings?.whatsapp || '393491973069').replace(/[^0-9]/g, '');
  const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
    'Ciao Hop Storm! Ho effettuato un ordine nello shop online e vorrei verificarne lo stato.'
  )}`;

  return (
    <section className="bg-black min-h-screen pt-36 pb-28 px-6">
      <div className="max-w-2xl mx-auto">
        {loading && (
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-10 text-center">
            <Loader2
              size={36}
              className="animate-spin text-[#D4A24E] mx-auto mb-4"
              aria-hidden="true"
            />
            <h1 className="text-xl font-bold text-white mb-2">
              Verifica del pagamento in corso...
            </h1>
            <p className="text-sm text-white/60">
              Attendere qualche secondo mentre confermiamo il tuo ordine.
            </p>
          </div>
        )}

        {!loading && paid && (
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-10 space-y-6">
            <div className="text-center border-b border-white/10 pb-8">
              <CheckCircle
                size={48}
                className="text-[#4ade80] mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4A24E] font-semibold mb-2">
                Ordine Confermato
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                Grazie per il tuo ordine{order?.nome ? `, ${order.nome.split(' ')[0]}` : ''}!
              </h1>
              <p className="text-white/75 text-sm md:text-base">
                Riceverai una email di conferma all&apos;indirizzo{' '}
                <strong className="text-white">{order?.email || 'indicato al checkout'}</strong>.
              </p>
            </div>

            {order && (
              <div className="space-y-5 text-sm">
                <div className="flex flex-wrap justify-between gap-2 text-white/70">
                  <span>Numero Ordine</span>
                  <span className="font-bold text-white tabular-nums">
                    #{order.order_id}
                  </span>
                </div>

                {order.articoli && (
                  <div className="bg-black border border-white/10 rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wider text-[#D4A24E] font-semibold mb-2">
                      Articoli ordinati
                    </p>
                    <p className="text-white/85 whitespace-pre-line leading-relaxed">
                      {order.articoli}
                    </p>
                  </div>
                )}

                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotale</span>
                    <span className="tabular-nums text-white">
                      {formatEuro(order.subtotale)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Spedizione</span>
                    <span className="tabular-nums text-white">
                      {order.spedizione === 0
                        ? 'Gratuita'
                        : formatEuro(order.spedizione)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-white/10">
                    <span className="text-white">Totale pagato</span>
                    <span className="tabular-nums text-[#D4A24E]">
                      {formatEuro(order.totale)}
                    </span>
                  </div>
                </div>

                {order.indirizzo && (
                  <div className="border-t border-white/10 pt-4 text-white/70">
                    <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
                      Indirizzo di spedizione
                    </p>
                    <p className="text-white">{order.indirizzo}</p>
                  </div>
                )}
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/shop"
                className="min-h-[44px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center"
              >
                Torna allo Shop
              </a>
              <a
                href="/"
                className="min-h-[44px] border border-white/20 text-white hover:bg-white/5 transition-colors px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center"
              >
                Torna alla Home
              </a>
            </div>
          </div>
        )}

        {!loading && !paid && (
          <div className="bg-[#0A0A0A] border border-white/15 rounded-2xl p-10 text-center space-y-6">
            <Clock
              size={40}
              className="text-[#D4A24E] mx-auto"
              aria-hidden="true"
            />
            <div>
              <h1 className="text-2xl font-bold text-white mb-3">
                Stato ordine in verifica
              </h1>
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                {unconfirmedMessage}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('click_whatsapp', { sezione: 'ordine_confermato' })
                }
                className="min-h-[48px] bg-[#D4A24E] text-black hover:bg-white transition-colors px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Contattaci su WhatsApp
              </a>
              <a
                href="/shop"
                className="min-h-[48px] border border-white/20 text-white hover:bg-white/5 transition-colors px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Torna allo Shop
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
