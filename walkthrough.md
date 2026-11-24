# Security Summary

**Reviewed Files**: 26
**Issues Resolved**: 7

### Issues Resolved
| Area | File | Line | What Was Happening | Impact | Status | How It Was Fixed |
|---|---|---|---|---|---|---|
| Client Secret Bundling | `vite.config.ts` | 10 | `GEMINI_API_KEY` from environment variables was injected into the client browser bundle via `define`. | High | Fixed | Removed `loadEnv` and the `define` block so server environment variables are never bundled into browser code. |
| JSON-LD Script Injection | `src/components/shop/ShopJsonLd.tsx`, `src/components/JsonLd.tsx` | 86, 117, 209 | External product metadata from the catalog feed was serialized with raw `JSON.stringify` inside `dangerouslySetInnerHTML`, allowing `</script>` tag breakout if malicious content appeared in product fields. | High | Fixed | Added `safeJsonLdStringify` in `src/services/shopApi.ts` to escape `<`, `>`, `&`, and Unicode line separators before rendering JSON-LD. |
| Checkout Redirect Validation | `src/components/shop/CartPage.tsx`, `src/components/shop/CartDrawer.tsx`, `src/services/shopApi.ts` | 103, 100, 346 | Checkout redirect links returned from the external shop endpoint accepted any `http:` or `https:` domain. | Medium | Fixed | Added `isAllowedCheckoutRedirectUrl` restricting redirects strictly to `https:` on `checkout.stripe.com`, `*.stripe.com`, or same-origin URLs. |
| Image URL Validation | `src/services/shopApi.ts` | 16 | `isSafeImageUrl` accepted protocol-relative `//` paths and plaintext `http:` image URLs. | Low | Fixed | Blocked protocol-relative `//` and `/\` paths and required `https:` for external image URLs. |
| Direct DOM Mutation | `src/components/ForLocals.tsx` | 171 | Form submission handlers updated status alerts and button labels via raw `innerHTML`. | Medium | Fixed | Replaced `innerHTML` mutations with React state (`isSubmitting`, `submitStatus`) and safe JSX text rendering. |
| API Abuse & Missing Security Headers | `server.ts`, `vercel.json` | 6–90 | The Express server exposed `X-Powered-By`, lacked protective response headers, had no cross-origin POST check or rate limit on `/api/create-checkout-session`, and used raw `req.url` in canonical redirect. | Medium | Fixed | Disabled `x-powered-by`, added `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, conditional `Strict-Transport-Security`, same-origin POST validation, per-IP rate limiting (20 req/min), `16kb` JSON payload limit, and sanitized redirect paths. |
| Unvalidated Query/Analytics Inputs & Unused Script | `src/components/shop/OrderConfirmedPage.tsx`, `src/utils/analytics.ts`, `index.html` | 29, 36, 11 | `session_id` query parameters and `VITE_GA_MEASUREMENT_ID` were accepted without format checks, and `index.html` loaded an unused third-party Umami script with a placeholder ID. | Low | Fixed | Added strict alphanumeric format validation for `session_id` and GA4 IDs, removed the unused placeholder Umami script tag, and upgraded `express` to `4.22.3`. |

### Safeguards Verified
| Area | File | How It's Protected |
|---|---|---|
| Payment Secret Isolation | `server.ts`, `.env.example` | `STRIPE_SECRET_KEY` is read strictly on the server via `process.env` and never prefixed with `VITE_` or returned to browsers. |
| Consent-Gated Tracking | `src/components/CookieBanner.tsx`, `src/utils/analytics.ts` | Analytics and marketing scripts remain blocked until explicit user opt-in consent is recorded. |
| Server-Side Price Integrity | `src/context/ShopContext.tsx`, `src/services/shopApi.ts` | Browser storage persists only product IDs and quantities (`1..48`), while totals and payment sessions are verified server-side. |
| Cross-Origin Protection | `server.ts` | `POST /api/create-checkout-session` validates `Sec-Fetch-Site` and `Origin` against the active host and enforces per-IP rate limiting. |

## PoC Verification

### JSON-LD Script Tag Breakout in Shop Metadata
#### Summary
| Field | Value |
|---|---|
| Issue Type | Unsafe Script Serialization in JSON-LD |
| Impact | High |
| Affected File | `src/components/shop/ShopJsonLd.tsx:86` |
| Test Scenario | Product name containing `Enjoy</script><img src=x onerror=alert(1)>` returned from catalog API |

#### How It Was Fixed
Added `safeJsonLdStringify` in `src/services/shopApi.ts` and applied it to every JSON-LD `<script type="application/ld+json">` tag in `ShopJsonLd.tsx` and `JsonLd.tsx` so `<`, `>`, and `&` are encoded as JSON Unicode escapes (`\u003c`, `\u003e`, `\u0026`).

#### Step-by-Step Trace
| Step | What Happens in the Code | Outcome |
|---|---|---|
| 1 | Malicious string `Enjoy</script><img src=x onerror=alert(1)>` enters `buildProductSchema(product)` in `src/components/shop/ShopJsonLd.tsx:36` | String is placed inside `schema` object |
| 2 | `safeJsonLdStringify(schema)` executes at `src/services/shopApi.ts:54` | Every `<` and `>` is replaced with `\u003c` and `\u003e` |
| 3 | React renders `<script type="application/ld+json">` | Browser HTML parser never sees `</script>`, keeping payload inert JSON data — **Handled Safely** |

#### Conclusion
**Fix Verified** - Escaping angle brackets and ampersands prevents HTML script-tag breakout regardless of external catalog text.

---

### Untrusted Checkout Redirect URL & Cross-Origin Checkout Session Creation
#### Summary
| Field | Value |
|---|---|
| Issue Type | Unrestricted External Redirect & Unthrottled Payment Endpoint |
| Impact | Medium |
| Affected File | `src/services/shopApi.ts:346`, `server.ts:84` |
| Test Scenario | Tampered checkout response returning `http://evil.example/pay` and cross-origin `POST /api/create-checkout-session` with `Origin: https://evil.example` |

#### How It Was Fixed
Added `isAllowedCheckoutRedirectUrl` to enforce `https:` and allow only Stripe Checkout domains (`checkout.stripe.com`, `*.stripe.com`) or same-origin URLs, and added `isSameOriginPost` + `isCheckoutRateLimited` on `POST /api/create-checkout-session`.

#### Step-by-Step Trace
| Step | What Happens in the Code | Outcome |
|---|---|---|
| 1 | Tampered checkout response returns `{ ok: true, url: "http://evil.example/pay" }` to `createCheckoutSession` | Enters validation at `src/services/shopApi.ts:346` |
| 2 | `isAllowedCheckoutRedirectUrl` checks `parsed.protocol === 'https:'` and domain allowlist (`src/services/shopApi.ts:38`) | Returns `false`, throws error, and blocks navigation — **Handled Safely** |
| 3 | Cross-site `POST /api/create-checkout-session` arrives with `Origin: https://evil.example` | `isSameOriginPost(req)` at `server.ts:85` returns `false` and responds with HTTP `403` — **Handled Safely** |

#### Conclusion
**Fix Verified** - Neither unverified external checkout redirects nor cross-site payment session creation requests can proceed.
