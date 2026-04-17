# Fiordland Expeditions — Website Commercial Effectiveness Audit

**Date:** 2026-04-17
**Branch:** `claude/audit-fel-website-qbEVp`
**Scope:** Static site in `fel-site/` (deployed to `fel-staging.netlify.app`)
**Auditor:** Claude (engineering assistant)

---

## TL;DR

The site has strong brand/visual bones but is commercially under-equipped. **Four of seven pages are empty stubs**, the **contact and newsletter forms don't actually submit** (`onsubmit="return false"`), and there is **zero analytics, zero conversion tracking, zero schema markup, and no SEO/GEO infrastructure** (no sitemap, robots, canonical, OG, JSON-LD). The Fareharbor integration is a plain external link (`target="_blank"`) with no Lightframe and no cross-domain GA linker, so booking attribution is lost.

Before scaling to fishing / photography / charter products, these foundations need to exist — otherwise every new product and every ad dollar will be flying blind.

---

## Site inventory

| Path | Status | Notes |
|---|---|---|
| `fel-site/index.html` | Full | Homepage — hero, reviews, 2 product cards, why-us teaser, fleet teaser, CTA |
| `fel-site/pages/overnight-cruise.html` | Full | Product page with permit info, itinerary, includes list |
| `fel-site/pages/contact.html` | Full (form broken) | Contact form + FAQ |
| `fel-site/pages/discerning-explorer.html` | Full | Persona landing (scoped `.fel` CSS) |
| `fel-site/pages/charters.html` | **Stub** | "Content for this page is being built." |
| `fel-site/pages/fleet.html` | **Stub** | Same |
| `fel-site/pages/why-us.html` | **Stub** | Same |
| `fel-site/pages/environment.html` | **Stub** | Same |
| `fel-site/js/nav.js` | Full | Client-side injected nav + footer, mobile toggle, FAQ accordion |
| `fel-site/css/style.css` | Full | Single 13.8 KB stylesheet |
| `robots.txt` | **Missing** | — |
| `sitemap.xml` | **Missing** | — |

---

## 1. SEO — foundation is missing

- **Good:** unique `<title>` + meta description on `index.html:6-7`, `contact.html:6-7`, `overnight-cruise.html:6-7`.
- **Missing on stub pages** (`charters.html:6`, `fleet.html:6`, `why-us.html:6`, `environment.html:6`): no meta description, and the thin "Content is being built" text will be indexed as low-quality.
- **No canonical URLs** anywhere → duplicate-content risk once CloudCannon/Netlify preview URLs get indexed.
- **No Open Graph / Twitter Card tags** → social shares render without image/title/description.
- **No JSON-LD structured data** → no `LocalBusiness`, `TouristTrip`, `Product`, `Organization`, `FAQPage`, `BreadcrumbList`.
- **No `robots.txt` or `sitemap.xml`** in the repo.
- **No favicon** `<link>` tags.
- **Nav is client-side injected** (`nav.js:80-83`). Googlebot renders JS, but this delays link discovery and dilutes internal link equity. Prefer static nav per page (or SSR via CloudCannon templating).
- **H1 uses `<br>` inside the text** (`index.html:22`) — fine visually, but SEO copy should stand on its own.
- **Headings:** only one H1 per page (good), but stub pages have their only H1 inside a `.page-header-overlay` image block.

## 2. GEO / AI answer-engine optimisation — largely absent

Answer engines (ChatGPT, Perplexity, Google AI Overviews) cite structured, entity-rich content.

- No `Organization` / `LocalBusiness` schema with NAP (name, address, phone), `geo` coordinates, opening hours, `sameAs` social profiles.
- No `TouristTrip` / `Product` / `Offer` schema on the overnight cruise page (the most monetisable entity on the site).
- FAQ block exists (`contact.html:87-111`) but has **no `FAQPage` JSON-LD** wrapping it — the single highest-leverage GEO/SEO win.
- No About/author content describing operator experience, vessel specs, permits as structured entities.
- Permit reference AUTH-20202007 is a unique fact worth embedding in structured data (`overnight-cruise.html:47-51`).

## 3. Navigation & UX

- Nav structure is clear and mobile toggle is present (`nav.js:86-88`).
- **Critical issue:** four nav destinations lead to empty stubs. A visitor clicking "Charters", "Our fleet", "Why us", or "Environment" sees a near-blank page. Kills conversion and trust.
- **No breadcrumbs**, no "You are here" cue on sub-pages.
- Booking CTAs open Fareharbor in a **new tab** (`target="_blank"` on every Book Now). Consider the FH Lightframe (in-page modal) for higher conversion and single-domain analytics.
- "Request itinerary" on overnight page links to contact form (`overnight-cruise.html:108`) — but the form doesn't submit (see §6).
- Contact form grid is `1fr 1fr` hardcoded (`contact.html:23`) — verify on narrow mobile.

## 4. Analytics & conversion tracking — **nothing is installed**

Greps for `gtag`, `dataLayer`, `GTM-`, `G-`, `fbq`, `ttq`, `clarity`, `hotjar`, `segment`, `_fhutma`, `fh_source`, `pixel` return no matches. Consequences:

- No GA4 property → no session, channel, geo, or funnel data.
- No **Google Ads conversion tracking** → ads cannot optimise or bid on purchases.
- No **Meta / TikTok pixels** → social advertising cannot retarget or optimise.
- **Fareharbor cross-domain tracking is not set up.** The book URL contains `g4=yes` (`index.html:25`), which enables FH's GA4 passthrough, but without GA4 installed on FEL's site *and* a configured linker / `client_id` pass-through, bookings on `fareharbor.com` will attribute as `(direct)` or `fareharbor.com / referral` — paid-channel attribution is lost. FH also requires adding your GA4 Measurement ID in Fareharbor dashboard → Settings → Analytics for cross-domain to function.
- **No `tel:` / `mailto:` click events.** Phone (`nav.js:72-73`, `contact.html:67-68`) and email (`nav.js:70-71`, `contact.html:59,63`) links fire no events — for a high-ticket charter business, phone calls are a primary conversion path and must be measured.
- **No form-submission tracking** — moot right now because forms are broken.
- **No outbound click tracking** on Fareharbor buttons — at minimum fire `begin_checkout` + a `click_book_now` event with product, price, page context.

## 5. Fareharbor integration

- Only one product ID hardcoded (item `300312`, flow `554429`; `index.html:25`, `overnight-cruise.html:107`, `nav.js:10`, `discerning-explorer.html`). Fine today, but as charter / fishing / photography SKUs come online each needs its own button and its own event payload.
- No **Fareharbor Lightframe** script (`https://fareharbor.com/embeds/api/v1/?autolightframe=yes`). Adopting Lightframe will (a) keep guests on your domain (better brand + analytics), (b) auto-fire GA4 events, (c) pass UTM / gclid through reliably.
- No **availability previews / widgets** on product pages — just a Book Now button. FH's calendar embed on the product page typically lifts conversion.

## 6. Forms — both forms are non-functional

- `contact.html:27` — contact form has `onsubmit="return false"`, no `action`, no submission handler. **Submissions go nowhere.** Most urgent commercial fix on the site.
- `nav.js:35` — newsletter form has the same problem and no email provider integration.
- No "Enquiry type" → conversion tracking pipeline. Once fixed, capture the dropdown value as an event parameter (`enquiry_type`) so you can attribute high-value charter leads vs. general enquiries separately and build Google Ads value-based bidding on it.
- Pick a target: Netlify Forms (simplest — add `name="contact"` + `data-netlify="true"` + hidden honeypot), Formspree, HubSpot, or Mailchimp/Klaviyo for the footer newsletter.

## 7. Phone & email

- `tel:` and `mailto:` links exist on `nav.js:70-73` and `contact.html:59,63,67,68`.
- None are instrumented. Add GA4 events (`contact_phone_click`, `contact_email_click`) with number/address as parameters and mark them as conversions. On mobile, also fire a Google Ads `phone_call` conversion.

## 8. Performance

- **Images served from Squarespace CDN at full resolution** (e.g. hero, `index.html:17`). No `srcset`, no `sizes`, no `loading="lazy"`, no `decoding="async"`, no `width` / `height` attributes → high CLS risk and heavy LCP.
- Logo is pulled at `?format=1500w` regardless of use (`nav.js:9`) — nav + footer logo only need ~200w.
- No `<link rel="preconnect">` to `images.squarespace-cdn.com` despite every image being there.
- No font optimisation (system fonts used — that's a plus).
- CSS is a single 13.8 KB file, not minified but small enough.
- JS is 4.4 KB, fine.
- `<link rel="preload">` for the hero image + `fetchpriority="high"` will measurably improve LCP.

## 9. Accessibility

- Alt text present on most images — good.
- Form inputs have `<label>` but they're not associated via `for` / `id` (`contact.html:29-30`, etc.) — screen readers lose the link.
- FAQ buttons lack `aria-expanded` state (`contact.html:88,92,…`; `nav.js:91-98`).
- Nav toggle has `aria-label` but no `aria-expanded` / `aria-controls` (`nav.js:24`).
- Colour contrast on `rgba(255,255,255,0.25)` footer body copy (`nav.js:74`) likely fails WCAG AA.

## 10. Content & trust gaps

- Only 3 hand-picked review snippets (`index.html:43-57`). No live TripAdvisor / Google widget, no star rating, no `AggregateRating` schema.
- No blog / content marketing engine — critical for SEO & GEO and for the new fishing / photography products.
- No newsletter capture that works.
- No social proof from operators / partners (DOC, UNESCO partner logos).
- No hreflang despite heavily US / AU / UK audience.

---

## Prioritised action list (impact ÷ effort)

| # | Fix | Why it matters | Effort |
|---|-----|---------------|--------|
| 1 | **Make the contact form actually submit** (Netlify Forms or Formspree) + capture `Enquiry type` | Currently losing every enquiry | S |
| 2 | **Install GA4 via GTM** on every page, enable enhanced measurement, add a dataLayer | Prerequisite for everything below | S |
| 3 | **Set up Fareharbor cross-domain tracking**: add GA4 Measurement ID in FH dashboard, confirm `g4=yes`, verify linker passes `_gl` / `client_id`; consider adopting **Lightframe** | Recovers paid-ad attribution on bookings | S–M |
| 4 | **Fill or `noindex` the four stub pages** (`charters`, `fleet`, `why-us`, `environment`) — add `<meta name="robots" content="noindex">` until written | Prevents thin-content ranking damage and trust loss | S |
| 5 | **Fix the broken Book Now → conversion chain**: GTM triggers for button clicks → GA4 `begin_checkout` + Google Ads / Meta / TikTok conversion events | Enables ROAS-driven bidding | M |
| 6 | **Instrument `tel:` / `mailto:` / form submit as GA4 conversions** and import to Google Ads | Phone is a primary B2B / charter channel | S |
| 7 | **Add JSON-LD**: `Organization` + `LocalBusiness` (site-wide), `TouristTrip` + `Offer` (cruise page), `FAQPage` (contact), `BreadcrumbList` (sub-pages) | Biggest single GEO / SEO lift | S |
| 8 | **Add OG + Twitter Card tags** and a social share image per page | Social CTR, WhatsApp previews | S |
| 9 | **Generate `sitemap.xml` and `robots.txt`**, submit to Google Search Console & Bing Webmaster | Indexing + ongoing visibility data | S |
| 10 | **Add canonical tags** on every page | Prevents duplicate-URL dilution | S |
| 11 | **Image performance pass**: resize Squarespace URLs appropriately, add `srcset` / `sizes`, `width` / `height`, `loading="lazy"` on non-hero images, `fetchpriority="high"` + preload hero, preconnect to the CDN | Core Web Vitals + mobile conversion | M |
| 12 | **Make newsletter form work** (Mailchimp / Klaviyo / Beehiiv embed) and track signups as a conversion | Owned channel for repeat / referral | S |
| 13 | **Adopt Fareharbor Lightframe** with per-product buttons for cruise, charter, fishing, photography once live | Single-domain analytics + better UX + simpler event wiring | M |
| 14 | **Product pages for each new SKU** (charter, fishing, photography) with dedicated content, schema, hero image, FAQ, and their own Book Now with `item_id` in events | Required to run per-product campaigns and to rank for intent queries | L |
| 15 | **Accessibility pass** — associate labels with inputs, add `aria-expanded` / `aria-controls` to FAQ + nav toggle, fix low-contrast footer text | Lifts conversion + reduces legal risk | S |
| 16 | **Live reviews widget + `AggregateRating` schema** (TripAdvisor or Google) | Trust + rich snippets in SERPs | S |
| 17 | **Blog / "Journal"** with 6–10 cornerstone articles targeting Doubtful Sound / Fiordland / fishing / photography queries | SEO + GEO pipeline; supports paid retargeting audiences | L |
| 18 | **Add `hreflang="en-nz"` + en-AU / en-US variants** if you publish market-specific pricing or content | International targeting | S |
| 19 | **Consent mode v2 + a cookie banner** (NZ Privacy Act / EU visitors) — required before lighting up ads pixels | Compliance + preserves modelled conversions | S |
| 20 | **Set up Google Business Profile + Bing Places** pointing to the Manapouri departure point, wire to Search Console | Local-pack visibility | S |

---

## Suggested first implementation batch

1. Fix the forms (Netlify Forms + honeypot) and capture `enquiry_type`.
2. Add GTM + GA4 + `dataLayer` on every page, plus a Fareharbor cross-domain snippet.
3. Add JSON-LD (`Organization`, `LocalBusiness`, `TouristTrip`, `FAQPage`).
4. Add OG / Twitter / canonical tags site-wide.
5. Add `robots.txt` + `sitemap.xml`.
6. `noindex` the four stub pages until content lands.
7. Instrument `tel:` / `mailto:` / form / Book-Now clicks as GA4 events.

Further batches to follow once product pages for charter / fishing / photography are ready.
