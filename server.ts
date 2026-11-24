import 'dotenv/config';
import express from 'express';
import path from 'path';
import Stripe from 'stripe';

const app = express();
const PORT = 3000;

app.disable('x-powered-by');
app.set('trust proxy', 1);

let stripeClient: Stripe | null = null;
function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      apiVersion: '2026-03-25.dahlia' as Stripe.LatestApiVersion,
    });
  }
  return stripeClient;
}

// Security headers (preserve iframe embed compatibility for preview)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  const proto = req.get('x-forwarded-proto') || req.protocol;
  if (proto === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// Canonical redirect with path sanitization
app.use((req, res, next) => {
  if (req.hostname === 'hopstorm.it') {
    const rawPath = req.originalUrl || '/';
    const safePath = rawPath.startsWith('/') && !rawPath.startsWith('//') ? rawPath : '/';
    return res.redirect(301, `https://www.hopstorm.it${safePath}`);
  }
  next();
});

// Lightweight per-IP sliding window rate limiter for payment session creation
const checkoutRateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 20;

function isCheckoutRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (checkoutRateMap.get(ip) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX_REQUESTS) {
    checkoutRateMap.set(ip, recent);
    return true;
  }
  recent.push(now);
  checkoutRateMap.set(ip, recent);
  if (checkoutRateMap.size > 1000) {
    for (const [k, timestamps] of checkoutRateMap.entries()) {
      if (timestamps.every((ts) => now - ts >= RATE_WINDOW_MS)) {
        checkoutRateMap.delete(k);
      }
    }
  }
  return false;
}

function isSameOriginPost(req: express.Request): boolean {
  const secFetchSite = req.get('sec-fetch-site');
  if (secFetchSite && secFetchSite === 'cross-site') {
    return false;
  }
  const origin = req.get('origin');
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host.toLowerCase();
    const forwardedHost = req.get('x-forwarded-host')?.split(',')[0]?.trim().toLowerCase();
    const host = (forwardedHost || req.get('host') || '').toLowerCase();
    return Boolean(host) && originHost === host;
  } catch {
    return false;
  }
}

app.post('/api/create-checkout-session', express.json({ limit: '16kb' }), async (req, res) => {
  if (!isSameOriginPost(req)) {
    return res.status(403).json({
      error: 'Richiesta non autorizzata da origine esterna.',
    });
  }

  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  if (isCheckoutRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'Troppe richieste di pagamento. Riprova tra un minuto.',
    });
  }

  const stripe = getStripe();
  if (!stripe) {
    return res.status(500).json({
      error: 'Chiave segreta Stripe non configurata sul server (STRIPE_SECRET_KEY).',
    });
  }

  try {
    // TODO: Set mode to "subscription" if selling recurring products.
    const mode: Stripe.Checkout.SessionCreateParams.Mode = 'payment';

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      ui_mode: 'form',
      mode,
      billing_address_collection: 'required',
      phone_number_collection: { enabled: false },
      automatic_tax: { enabled: false },
      submit_type: 'pay',
      shipping_address_collection: { allowed_countries: ['IT'] },
      name_collection: { individual: { enabled: true } },
      integration_identifier: 'custom_embedded_web_0001',
      // TODO: Replace with your actual Stripe Price IDs from the Dashboard or API.
      line_items: [{ price: 'price_...', quantity: 1 }],
    };

    if ((mode as string) === 'subscription') {
      sessionParams.payment_method_collection = 'always';
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return res.json({ client_secret: session.client_secret });
  } catch (err: unknown) {
    const message =
      err instanceof Error && err.message
        ? err.message
        : 'Errore durante la creazione della sessione Stripe Checkout.';
    console.error('Stripe checkout session error:', message);
    return res.status(500).json({
      error: 'Impossibile inizializzare il modulo di pagamento Stripe.',
    });
  }
});

const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Serve prerendered HTML for legal pages
    app.get('/privacy', (_req, res) => res.sendFile(path.join(distPath, 'privacy/index.html')));
    app.get('/cookie', (_req, res) => res.sendFile(path.join(distPath, 'cookie/index.html')));
    app.get('/termini', (_req, res) => res.sendFile(path.join(distPath, 'termini/index.html')));
    app.get('/vendita', (_req, res) => res.sendFile(path.join(distPath, 'vendita/index.html')));
    
    // Fallback to main index for other routes (e.g. 404 handled by client)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
