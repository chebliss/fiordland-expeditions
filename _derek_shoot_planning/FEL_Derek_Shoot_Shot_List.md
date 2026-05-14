# FEL Derek Shoot — Shot List & Page Placement

**Photographer:** Derek Morrison
**Shoot dates:** 29 April – 1 May 2026
**Total images delivered:** 460
**Cloudinary cloud name:** `dbfwdxsaz`
**Cloudinary public ID prefix:** `fel/derek-2026/`
**URL pattern:** `https://res.cloudinary.com/dbfwdxsaz/image/upload/f_auto,q_auto,w_{width}/{public_id}`

---

## Document status

| Phase | Status |
| --- | --- |
| Hero images (8 slots, populated pages + stub buildouts) | ✅ Locked |
| Secondary / gallery images per page | ⏳ Pending second pass |
| Logo Cloudinary public_id | ⏳ Pending upload |

This file is the source of truth. Claude Code reads the populated slots below and applies them as it executes Batches 1–5. Any slot still marked `TBD` blocks the relevant batch — surface and clarify before committing.

---

## Conventions

- **Hero images** load `eager` with `fetchpriority="high"`. All other images load `lazy`.
- **Alt text for heroes is hand-written** and must be used verbatim. Do not auto-generate from filenames for these 8 images.
- **Alt text for secondary/gallery images** can be auto-generated from filenames. Hand-curation is preferred where time allows.
- **Figcaptions** are optional. Where provided, use as visible figcaption *or* in JSON-LD `caption` schema property.
- **Photographer credit:** Derek Morrison. Apply to JSON-LD `creditText` on every image. Do not include in alt text (would duplicate across 460 images and harm SEO).
- **Image-level keywords** (from IPTC): `adventure, Fiordland Expeditions Limited, FEL, Tutoko II, Doubtful Sound, Fiordland, New Zealand, Richard Abernethy, Mandy Abernethy, Tutoko, coast, culture, tourism, south island, aotearoa, exclusive, luxury, travel, experience`. Use in JSON-LD `keywords` per image.
- **Image-level location** (from IPTC): City `Doubtful Sound`, State `Fiordland`, Region `New Zealand`. Use in JSON-LD `contentLocation` per image.

---

## Spelling and naming notes

- The owners' surname is **Abernethy** (not "Abernathy"). Some filenames carry the typo; alt text and visible copy use the correct spelling. Filenames can be corrected post-launch in a separate pass.
- The vessel is **MV Tutoko II** (capital II, Roman numeral). The older charter vessel is **MV Tutoko** (no II). Some hero-vessel-experience filenames refer to the older vessel — verify visually before placing on the wrong page.

---

# Batch 1 — `index.html` (Homepage)

5 image slots. Hero is the single most important image on the entire site.

### 1.1 Hero (above fold)

- **Public ID:** `fel/derek-2026/hero-vessel-experience/fiordland-expeditions-mv-tutoko-ii-sunrise-mirror-reflection-mist-doubtful-sound-dji0080`
- **Alt text:** `MV Tutoko II at sunrise on Doubtful Sound, mirror-still water and rising mist — Fiordland Expeditions overnight cruises, New Zealand`
- **Figcaption:** `Sunrise over Doubtful Sound, MV Tutoko II`
- **Loading:** `eager`, `fetchpriority="high"`
- **Aspect ratio:** standard 3:2 (2048x1366 native)
- **Rationale:** Aerial drone shot of MV Tutoko II at sunrise with a perfect mirror reflection. Brand-defining image — likely the single most cinematic shot in the entire delivery. Sets the aspirational tone for the whole site.

### 1.2 Product card — Overnight Cruise

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Should represent the standard overnight cruise product. MV Tutoko II in scene preferred. Suggest: an image where guests are visible and the experience reads as "approachable premium."

### 1.3 Product card — Discerning Explorer

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Should represent the premium HNW persona experience. Exclusivity, intimacy, scenic grandeur. Avoid crowd shots.

### 1.4 Why-us split

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Crew, guest experience, or in-the-moment authenticity. Splits work well with vertical-friendly compositions.

### 1.5 Fleet split

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** MV Tutoko II is the hero vessel; secondary mention of MV Tutoko optional.

---

# Batch 2 — `pages/overnight-cruise.html`

2 image slots.

### 2.1 Page header (Hero)

- **Public ID:** `fel/derek-2026/hero-vessel-experience/fiordland-expeditions-vessel-waterfall-encounter-doubtful-sound-c10707`
- **Alt text:** `MV Tutoko II at a Doubtful Sound waterfall — overnight cruises with intimate fjord encounters, Fiordland New Zealand`
- **Figcaption:** `Waterfall encounter aboard MV Tutoko II`
- **Loading:** `eager`, `fetchpriority="high"`
- **Aspect ratio:** standard 3:2 (2048x1366 native)
- **Rationale:** MV Tutoko II up close to a Doubtful Sound waterfall — guests likely able to feel the mist. "Overnight cruises" is the primary commercial keyword; the image *is* the experience.

### 2.2 Split-img

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Activity / experience moment that supports the cruise description.

---

# Batch 3 — `pages/discerning-explorer.html`

**Page note:** Discerning Explorer is the canonical paid-campaign landing page for the "escape the crowds" archetype (HNW 65+ USA, Doubtful Sound under AUTH-20202007). An earlier draft of this doc routed Batch 3 to `landing-seclusionist.html` — that page targeted the same audience as Discerning Explorer and was deleted as duplicate content during the FEL branch consolidation. Slot 3.1 now lands directly on `discerning-explorer.html`. The other three persona pages (`landing-dynasty-builder`, `landing-milestone-celebrator`, `landing-pilgrim-trophy`) keep their existing hero imagery for Phase 1; extending Derek-shoot heroes to all four personas is a Phase 1.5 task.

6 image slots. The richest persona landing page — targeting HNW 65+ USA travellers seeking exclusivity and silence.

### 3.1 Hero

- **Target page:** `pages/discerning-explorer.html`
- **Public ID:** `fel/derek-2026/09-misc/fiordland-expeditions-fiordland-expedition-doubtful-sound-dji0317`
- **Alt text:** `MV Tutoko II in remote Doubtful Sound, Fiordland — exclusive small-ship expedition cruises for discerning travellers, New Zealand`
- **Figcaption:** `Remote Doubtful Sound, accessible only by boat across Lake Manapouri`
- **Loading:** `eager`, `fetchpriority="high"`
- **⚠️ Aspect ratio: ULTRAWIDE 2048x743 (≈2.75:1)**
- **Layout requirement:** This image **must** be displayed as a cinematic letterbox banner. Do not force-crop to 16:9 or fill the viewport vertically. CSS treatment: full-width, fixed aspect ratio (`aspect-ratio: 2.75 / 1`), `object-fit: cover` only as a safety fallback. Recommended height range on desktop: ~480–560px depending on viewport width.
- **Rationale:** Cinematic ultrawide panorama. The aspect ratio itself signals "premium cinema" and matches the Discerning Explorer framing ("Beyond the crowds. Into the real Fiordland."). AI engines asked "what's the most secluded cruise in NZ" should find "remote" + "accessible only by boat" as the answer-engine bait.

### 3.2 Split-img — primary experience

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Quiet moment, fine detail, sense of scale. Should reinforce intimacy.

### 3.3 Split-img — vessel feature

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** MV Tutoko II detail or wide vessel shot showing craftsmanship.

### 3.4 Catch-grid image 1

- **Public ID:** TBD
- **Alt text:** TBD

### 3.5 Catch-grid image 2

- **Public ID:** TBD
- **Alt text:** TBD

### 3.6 Catch-grid image 3

- **Public ID:** TBD
- **Alt text:** TBD

**Catch-grid notes:** The three catch-grid images function as a triptych. Pick three that work together visually — perhaps morning, midday, evening; or vessel/landscape/wildlife; or arriving/exploring/dining. Variation matters.

---

# Batch 4 — `pages/contact.html`

1 image slot.

### 4.1 Page header (Hero)

- **Public ID:** `fel/derek-2026/hero-vessel-experience/fiordland-expeditions-mv-tutoko-ii-aerial-twilight-tasman-fiordland-dji0259`
- **Alt text:** `MV Tutoko II at twilight near the Tasman Sea — contact Fiordland Expeditions to plan your Doubtful Sound voyage, New Zealand`
- **Figcaption:** `Where the fjord meets the Tasman Sea`
- **Loading:** `eager`, `fetchpriority="high"`
- **Aspect ratio:** standard 3:2 (2048x1366 native)
- **Rationale:** Twilight aerial near Tasman Sea entrance. "Edge of the world" feel — Contact is the last step before booking; this image evokes the threshold. "Plan your voyage" in alt text reinforces the page's call-to-action without being overtly salesy.

---

# Batch 5 — Stub buildouts

These pages are being built from scratch.

## 5a `pages/charters.html`

Estimated 4–6 images: hero, 2–3 splits, possibly a small grid.

### 5a.1 Hero

- **Public ID:** `fel/derek-2026/03-guest-experience/fiordland-expeditions-fishing-aerial-mv-tutoko-ii-doubtful-sound-dji0232`
- **Alt text:** `Private fishing charter aboard MV Tutoko II in Doubtful Sound — bespoke small-group expeditions for up to 8 guests, Fiordland New Zealand`
- **Figcaption:** `Bespoke fishing expedition, MV Tutoko II`
- **Loading:** `eager`, `fetchpriority="high"`
- **Aspect ratio:** standard 3:2 (2048x1366 native)
- **Rationale:** Aerial of MV Tutoko II during a fishing charter — exclusivity + adventure customisation. "Up to 8 guests" is a high-value GEO signal: AI engines reward numerical specifics over vague qualifiers.

### 5a.2 Split — the experience

- **Public ID:** TBD
- **Alt text:** TBD

### 5a.3 Split — the vessel (MV Tutoko)

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Note this is **MV Tutoko (no II)** — the vessel used for charters. Verify visually before placement.

### 5a.4 Split — custom itineraries

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Fishing, diving, multi-night, helipad — visual cue for adventure customisation.

## 5b `pages/fleet.html`

Two vessel cards (MV Tutoko II + MV Tutoko) plus possible specs/comparison imagery.

### 5b.1 Hero

- **Public ID:** `fel/derek-2026/hero-vessel-experience/fiordland-expeditions-mv-tutoko-ii-water-level-kayakers-reflection-doubtful-sound-c21778`
- **Alt text:** `MV Tutoko II at anchor with kayakers on Doubtful Sound — purpose-built expedition vessel and basecamp for fjord exploration, Fiordland New Zealand`
- **Figcaption:** `MV Tutoko II — your floating basecamp on Doubtful Sound`
- **Loading:** `eager`, `fetchpriority="high"`
- **Aspect ratio:** standard 3:2 (2048x1366 native)
- **Rationale:** Water-level perspective showing the vessel at anchor with kayakers in the scene. Reframes the vessel from "transport" to "floating basecamp + adventure enabler" — a stronger fleet narrative than a pure aerial. The reflection adds visual richness; the kayakers convey the expedition lifestyle. Final pick after curatorial review.

### 5b.2 MV Tutoko II — primary card

- **Public ID:** TBD
- **Alt text:** TBD

### 5b.3 MV Tutoko — secondary card

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Must be MV Tutoko (no II) — the older vessel used for charters.

### 5b.4 Helipad callout

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Optional — only if a strong helipad image exists in the shoot.

## 5c `pages/why-us.html`

Estimated 3–5 images.

### 5c.1 Hero

- **Public ID:** `fel/derek-2026/06-crew-team/fiordland-expeditions-richard-mandy-abernathy-owners-portrait-mv-tutoko-ii-c12056`
- **Alt text:** `Owner-operators Richard and Mandy Abernethy aboard MV Tutoko II — over 25 years operating Fiordland Expeditions in Doubtful Sound, New Zealand`
- **Figcaption:** `Richard and Mandy Abernethy, owners of Fiordland Expeditions`
- **Loading:** `eager`, `fetchpriority="high"`
- **Aspect ratio:** standard 3:2 (2048x1366 native)
- **⚠️ Spelling note:** Filename uses "abernathy" (Derek's typo); alt text and figcaption use the correct **"Abernethy"**. Always defer to alt/visible copy when there's a conflict.
- **Rationale:** Both owners together aboard the vessel. The personal story = the why-us. "Owner-operators" + "over 25 years" is heavy GEO signal — AI engines asked "who runs Fiordland Expeditions" will cite this.

### 5c.2 Crew bios image (placeholder if not in shoot)

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Mark `TBD-NO-IMAGE` if no suitable crew portraiture exists; commission separately post-launch.

### 5c.3 Permit / authenticity moment

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** AUTH-20202007 permit narrative — show authentic Fiordland operation.

## 5d `pages/environment.html`

Estimated 4–6 images: hero, marine wildlife strip, principles grid.

### 5d.1 Hero

- **Public ID:** `fel/derek-2026/07-landscape-fjord/fiordland-expeditions-misty-mountain-reflection-doubtful-sound-c11818`
- **Alt text:** `Doubtful Sound's misty fjord landscape — pristine UNESCO World Heritage waters of Te Wāhipounamu, Fiordland National Park New Zealand`
- **Figcaption:** `Te Wāhipounamu — South West New Zealand World Heritage Area`
- **Loading:** `eager`, `fetchpriority="high"`
- **Aspect ratio:** standard 3:2 (2048x1366 native)
- **Rationale:** Pure landscape, mist, mountain reflection. No human presence. "UNESCO World Heritage" is the highest-authority signal possible. Including the proper Māori toponym **Te Wāhipounamu** (the actual UNESCO site name) is rare among operators — both AI engines and SEO reward the precision.

### 5d.2 Wildlife strip image 1

- **Public ID:** TBD
- **Alt text:** TBD

### 5d.3 Wildlife strip image 2

- **Public ID:** TBD
- **Alt text:** TBD

### 5d.4 Wildlife strip image 3

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Wildlife strip should ideally show range. Folder `08-wildlife/` has only 6 images (all albatross/seabird), so all are useful candidates. May need to source additional wildlife images post-launch (dolphins, seals).

### 5d.5 Principles grid feature

- **Public ID:** TBD
- **Alt text:** TBD
- **Notes:** Low-impact operations — quiet moment, small footprint.

---

# Logo / brand assets (separate from shoot)

### Brand logo

- **Public ID:** TBD (upload pending — recommended path: `fel/brand/logo`)
- **Alt text:** `Fiordland Expeditions`
- **Notes:** Currently still hot-linking to Squarespace. Ché to upload to Cloudinary as part of this pass. Once uploaded, replace the `FEL_LOGO` constant in `css/fel-components.js` with the Cloudinary URL.

---

# Image handling reference (for context — Claude Code already knows this)

URL pattern Claude Code generates from each Public ID:


```
https://res.cloudinary.com/dbfwdxsaz/image/upload/f_auto,q_auto,w_{width}/{public_id}
```


Available widths configured as eager transformations:
- `w_640` — mobile
- `w_960` — tablet
- `w_1280` — desktop standard
- `w_1600` — desktop hero
- `w_2400` — retina full-bleed

Heroes get `loading="eager"` + `fetchpriority="high"`. All other images get `loading="lazy"`.

---

# Open questions for Claude Code

1. **Ultrawide hero treatment for #3.1 (Seclusionist hero — `dji0317`).** This image is 2048x743. Confirm the page layout's hero block can accommodate `aspect-ratio: 2.75 / 1` cleanly, or propose a CSS pattern for a cinematic letterbox banner.

2. **Logo public_id.** Held in `fel/brand/logo` once uploaded. Until then, leave the LOGO constant in `fel-components.js` pointing at Squarespace and surface the dependency in the appropriate batch summary.

---

# Phase 1.5 follow-up (post-launch)

Phase 1 ships hero imagery for 8 page targets. FEL has 4 persona landing pages (`discerning-explorer`, `landing-dynasty-builder`, `landing-milestone-celebrator`, `landing-pilgrim-trophy`) plus 2 topic pages (`photography-expedition`, `milford-vs-doubtful-sound`) — only `discerning-explorer.html` is covered in Phase 1 (slot 3.1).

**Phase 1.5 will extend Derek-shoot heroes to:**
- `landing-dynasty-builder.html` — generational/family travel angle (consider images with multi-generational guest groups)
- `landing-milestone-celebrator.html` — anniversaries/milestones (consider celebration moments, golden hour, intimate dining)
- `landing-pilgrim-trophy.html` — bucket-list/achievement (consider dramatic landscape, "I made it here" moments)
- `photography-expedition.html` — likely benefits from a dedicated landscape or wildlife hero
- `milford-vs-doubtful-sound.html` — comparison page; may need split hero or paired imagery

These pages currently use existing imagery and are functional. Extending to Derek-shoot heroes is a quality enhancement, not a launch blocker.
