# Imagery migration — Squarespace → CloudCannon

**Status:** URGENT. The current Squarespace site (`fiordlandexpeditions.co.nz` on Squarespace) is being decommissioned in the next couple of weeks. Every image on the new site currently loads from `images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/…`. The moment Squarespace is turned off, those URLs **will return 404** and the new site will render with broken images everywhere.

This must be resolved before cutover.

---

## What needs to happen

1. **Download** every original image from the Squarespace CDN at full resolution (no `?format=` parameter — that gives the original).
2. **Upload** them to CloudCannon (or wherever the new site's static assets will live — typically `fel-site/images/`).
3. **Update** every `src` and `srcset` reference across the codebase to use the new local paths.
4. **Optimise** — if the CMS doesn't auto-resize, generate `500w / 800w / 1000w / 1200w / 1800w` variants (or use a Netlify image transform / `<picture>` with `loading="lazy"`).

A migration script can do steps 1 and 3 in one pass. Happy to write one once the destination is confirmed.

---

## Inventory — every Squarespace asset currently referenced

### Logo (used in nav + footer + JSON-LD + OG image)
| Asset ID | Filename | Used in | Suggested local path |
|---|---|---|---|
| `25e4f2cd-780e-4751-8aa0-4a5d0922794a` | `FLE+Logo+2024+RGB+WHITE.png` | `js/nav.js` (nav + footer logo) | `/images/brand/fle-logo-white.png` |

### Hero / page-header images
| Asset ID | Filename | Used in | Notes |
|---|---|---|---|
| `0b90276b-e615-4a3c-babb-f812cdce619c` | `Fiordland+Expeditions` | `index.html` (hero), `pages/overnight-cruise.html` (header), `pages/charters.html`, `pages/fleet.html`, `pages/why-us.html`, `pages/environment.html`, `pages/photography-expedition.html` (header), `pages/discerning-explorer.html` | Primary Doubtful Sound hero. **Used everywhere — highest priority.** |
| `a4af5834-eeba-4a45-91c2-7791bfc00446` | `Fiordland+Expeditions` | `index.html` (Doubtful Sound product card), `pages/contact.html` (header), `pages/discerning-explorer.html` | Secondary Doubtful Sound shot |

### Vessel + crew + inner-fiord shots
| Asset ID | Filename | Used in | Notes |
|---|---|---|---|
| `73c94012-68ed-497e-80d0-3de34dcfc773` | `IMG_3572+%282%29.JPG` | `index.html` (fleet teaser), `pages/photography-expedition.html`, `pages/discerning-explorer.html` | MV Tutoko II |
| `9294edac-8a44-4d14-b075-ed06cfc0f40e` | `_MG_7551sm.webp` | `index.html` (why-us teaser), `pages/photography-expedition.html`, `pages/discerning-explorer.html` | Crew |
| `2bdc6c68-de28-4136-a4d3-22b0c195208a` | `_MG_7313.webp` | `index.html` (charters card), `pages/discerning-explorer.html` | Charters / fishing |
| `a2c2c64a-4115-47c6-b56a-4225022f76c8` | `Fiordland+Expeditions` | `pages/overnight-cruise.html`, `pages/photography-expedition.html`, `pages/discerning-explorer.html` | Inner fiord |

### Favicon (referenced from JSON-LD only — not yet wired into HTML)
| Asset ID | Filename | Used in | Notes |
|---|---|---|---|
| `865228d5-871d-46c1-8d24-1d160373ef45` | `favicon.ico` | Squarespace `<link rel="icon">` (live site) | Need to also save and upload to `/favicon.ico` on the new site. |

**Total: 7 unique CDN assets to migrate** + favicon.

---

## Quick CLI snippet for the download step

Once you decide on a destination folder:

```bash
mkdir -p fel-site/images
cd fel-site/images
SQS="https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a"
curl -L -o doubtful-sound-hero.jpg          "$SQS/0b90276b-e615-4a3c-babb-f812cdce619c/Fiordland+Expeditions"
curl -L -o doubtful-sound-secondary.jpg     "$SQS/a4af5834-eeba-4a45-91c2-7791bfc00446/Fiordland+Expeditions"
curl -L -o inner-fiord.jpg                  "$SQS/a2c2c64a-4115-47c6-b56a-4225022f76c8/Fiordland+Expeditions"
curl -L -o tutoko-ii.jpg                    "$SQS/73c94012-68ed-497e-80d0-3de34dcfc773/IMG_3572+(2).JPG"
curl -L -o crew.webp                        "$SQS/9294edac-8a44-4d14-b075-ed06cfc0f40e/_MG_7551sm.webp"
curl -L -o charters-fishing.webp            "$SQS/2bdc6c68-de28-4136-a4d3-22b0c195208a/_MG_7313.webp"
curl -L -o fle-logo-white.png               "$SQS/25e4f2cd-780e-4751-8aa0-4a5d0922794a/FLE+Logo+2024+RGB+WHITE.png"
curl -L -o ../favicon.ico                   "$SQS/865228d5-871d-46c1-8d24-1d160373ef45/favicon.ico"
```

Run that **before** the Squarespace site is turned off. If it's already off, the originals are gone — only what's in browser caches / Wayback Machine remains.

---

## After download — codebase updates

Find/replace patterns to apply:

```
https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/0b90276b-e615-4a3c-babb-f812cdce619c/Fiordland+Expeditions
  →  /images/doubtful-sound-hero.jpg

https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/a4af5834-eeba-4a45-91c2-7791bfc00446/Fiordland+Expeditions
  →  /images/doubtful-sound-secondary.jpg

https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/a2c2c64a-4115-47c6-b56a-4225022f76c8/Fiordland+Expeditions
  →  /images/inner-fiord.jpg

https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/73c94012-68ed-497e-80d0-3de34dcfc773/IMG_3572+%282%29.JPG
  →  /images/tutoko-ii.jpg

https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/9294edac-8a44-4d14-b075-ed06cfc0f40e/_MG_7551sm.webp
  →  /images/crew.webp

https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/2bdc6c68-de28-4136-a4d3-22b0c195208a/_MG_7313.webp
  →  /images/charters-fishing.webp

https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/25e4f2cd-780e-4751-8aa0-4a5d0922794a/FLE+Logo+2024+RGB+WHITE.png
  →  /images/brand/fle-logo-white.png
```

The `?format=NNNw` query strings need to come off too — they're a Squarespace-specific resize feature that won't work on a generic static host. Replace with either a `<picture>` element with explicitly-resized variants, or a Netlify Image CDN transform if the CMS supports it.

I can write a one-shot migration script (`scripts/migrate-imagery.sh`) that does the download + sed replacements once you've picked the local image folder structure. Just say the word.
