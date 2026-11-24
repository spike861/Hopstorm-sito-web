# Stripe Checkout Integration — Remaining Setup & Reference

## Values to Replace

The following values are placeholders and must be updated before going live.

**Files containing placeholders:**
- [server.ts](server.ts)
- [.env.example](.env.example)

| Field | Current Value | What to Set |
|-------|--------------|-------------|
| `mode` | `payment` | Set to `"payment"` for one-time charges or `"subscription"` for recurring billing (in [server.ts](server.ts)). |
| `line_items[].price` | `price_...` | Your actual Stripe Price ID(s) from the [Stripe Dashboard Prices](https://dashboard.stripe.com/prices) or dynamically mapped from your product catalog (in [server.ts](server.ts)). |
| `STRIPE_SECRET_KEY` | *(empty)* | Server-only Stripe secret key (`sk_test_...` / `sk_live_...`) from [Stripe API Keys](https://dashboard.stripe.com/test/apikeys). |
| `VITE_STRIPE_PUBLISHABLE_KEY` | *(empty)* | Browser-accessible Stripe publishable key (`pk_test_...` / `pk_live_...`) from [Stripe API Keys](https://dashboard.stripe.com/test/apikeys). Must keep the `VITE_` prefix for Vite client builds. |

## Configured Parameters

These parameters were configured in Checkout Studio and are already set correctly.

**Files containing these parameters:**
- [server.ts](server.ts)
- [src/components/shop/CheckoutPage.tsx](src/components/shop/CheckoutPage.tsx)

| Parameter | Value |
|-----------|-------|
| `ui_mode` | `"form"` |
| `billing_address_collection` | `"required"` |
| `phone_number_collection` | `{ enabled: false }` |
| `automatic_tax` | `{ enabled: false }` |
| `payment_method_collection` | `"always"` *(conditionally applied when `mode === "subscription"`)* |
| `submit_type` | `"pay"` |
| `shipping_address_collection` | `{ allowed_countries: ["IT"] }` |
| `name_collection` | `{ individual: { enabled: true } }` |
| `integration_identifier` | `"custom_embedded_web_0001"` |

## Setup Instructions

1. **Environment variables**:
   - Copy `.env.example` to `.env` locally (or configure secrets in your hosting environment / AI Studio Secrets panel):
     ```env
     STRIPE_SECRET_KEY=sk_test_...
     VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
     ```
   - Never expose `STRIPE_SECRET_KEY` with a `VITE_` prefix or commit `.env` to version control.
2. **Stripe SDK & Stripe.js**:
   - Server SDK: `stripe` (`apiVersion: "2026-03-25.dahlia"`) is installed in `package.json`.
   - Client SDK: `https://js.stripe.com/dahlia/stripe.js` is loaded directly from Stripe's CDN in [index.html](index.html).
3. **Run the app**:
   - Start development server (`npm run dev`) and visit `/checkout`.

## Project Structure

- [server.ts](server.ts) — Express backend serving `POST /api/create-checkout-session`, creating a Stripe Checkout Session (`ui_mode: "form"`) and returning `{ client_secret }`.
- [index.html](index.html) — Loads `https://js.stripe.com/dahlia/stripe.js` in `<head>`.
- [src/components/shop/CheckoutPage.tsx](src/components/shop/CheckoutPage.tsx) — Client component rendering `<div id="checkout-form"></div>`, calling `stripe.initCheckoutFormSdk({ clientSecret, appearance })`, mounting `checkout.createForm({ layout: "expanded" })`, and handling `loadActions()` + `form.on("confirm", ...)`.
- [src/App.tsx](src/App.tsx) — Registers the `/checkout` client route.
- [.env.example](.env.example) — Documents `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLISHABLE_KEY`.

## How the Integration Works (Flow Overview)

1. A visitor opens `/checkout` (guarded by `ShopAgeGate` for 18+ compliance).
2. `CheckoutPage` initializes `Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)` using the Dahlia Stripe.js script loaded in `index.html`.
3. `CheckoutPage` calls `POST /api/create-checkout-session` on the Express server.
4. `server.ts` calls `stripe.checkout.sessions.create(...)` with `ui_mode: "form"` and the configured Checkout Studio options, then returns `{ client_secret: session.client_secret }` as JSON.
5. `stripe.initCheckoutFormSdk({ clientSecret, appearance })` mounts the embedded Stripe Checkout form into `#checkout-form` with `layout: "expanded"` and binds the `confirm` event to `loadActionsResult.actions.confirm({ formConfirmEvent: event })`.

## Testing Credit Card Numbers & Test Mode

Use Stripe's Test Mode keys (`sk_test_...` and `pk_test_...`) with the standard [Stripe test cards](https://docs.stripe.com/testing#cards):

- **Successful Visa payment**: `4242 4242 4242 4242` (any future expiry date, any 3-digit CVC)
- **Successful Mastercard**: `5555 5555 5555 4444`
- **3D Secure / Authentication required**: `4000 0025 0000 3155`
- **Declined card**: `4000 0000 0000 0002`

## Next Steps

- Replace `price_...` in [server.ts](server.ts) with real Stripe Price IDs from your [Stripe Dashboard](https://dashboard.stripe.com/prices) (or pass validated item IDs from the request body and map/price them server-side against your catalog).
- Connect `CartPage` / `CartDrawer` to `/checkout` if you want the cart to use this embedded Stripe form instead of the external Google Apps Script redirect flow.
- Add a Stripe Webhook endpoint (`/api/webhook` using `express.raw({ type: "application/json" })` and `stripe.webhooks.constructEvent`) to record paid orders, send confirmation emails, and trigger fulfillment reliably.
- Switch to Live Mode keys (`sk_live_...` / `pk_live_...`) before accepting real payments.

## Resources

- [Stripe Support](https://support.stripe.com)
- [Stripe MCP Documentation](https://docs.stripe.com/mcp)
