# Imagery migration — Squarespace → CloudCannon

**Status: ✅ COMPLETE.** All 30 Squarespace assets migrated to `/images/`. Zero remaining `images.squarespace-cdn.com` references in the codebase. Site is now safe for the Squarespace decommissioning.

---

## What's now self-hosted (`/images/` in the repo)

### Brand
- `/images/fle-logo-white.png` — nav + footer logo
- `/images/favicon.ico` — favicon (linked from all 17 HTML pages)

### Hero / page-header shots
- `/images/doubtful-sound-hero.jpg` — primary Doubtful Sound hero (used everywhere)
- `/images/doubtful-sound-secondary.jpg` — secondary Doubtful Sound shot
- `/images/inner-fiord.jpg` — inner-fiord shot
- `/images/environment-hero.jpg` — environment page hero
- `/images/charters-stock-bg.jpg` — charters page background

### Vessels + crew
- `/images/tutoko-ii.jpg` — MV Tutoko II
- `/images/crew.webp` — crew shot
- `/images/fleet-1.jpg`, `/images/fleet-2.jpg`, `/images/fleet-3.jpg` — fleet page photography
- `/images/fleet-overview.png` — fleet overview diagram

### Landscape / detail shots
- `/images/charters-fishing.webp` — fishing card
- `/images/crooked-arm.webp` + `/images/crooked-arm-2.webp` + `/images/crooked-arm-060513.webp` — Crooked Arm detail shots
- `/images/index-detail-1.webp` — homepage detail
- `/images/index-stock-1.jpg` — homepage stock fallback
- `/images/shared-fiord-1.jpg` — shared-use fiord shot
- `/images/MG_7535a.webp` — landscape detail
- `/images/CRW_0150-ed1.webp` — landscape detail
- `/images/SLH-1.jpg` — milestone celebrator persona shot
- `/images/dining-area.png` — onboard dining
- `/images/doubtful-pano-4.jpg` + `/images/doubtful-pano-4-env.jpg` — Doubtful Sound panorama
- `/images/why-fel-1.jpg`, `/images/why-fel-2.jpg`, `/images/why-fel-3.jpg` — why-FEL page photography
- `/images/environment-2.jpg` — environment page secondary
- `/images/gch-gallery-1.webp` — Guest Content Hub seed image

**Total: 30 self-hosted assets** ✓

---

## Other image sources still in use (not Squarespace, not at risk)

- `https://lh3.googleusercontent.com/d/...` — Google Drive direct links (persona pages, photo grids). Stable, no migration needed unless we want full independence.
- `https://images-pw.pixieset.com/site/BK3d06/...` — Derek Morrison's portrait on the photography expedition page. Hot-linked from his Pixieset commercial site. Stable; could self-host later if desired.
- `assets/img/*` — Qualmark / TripAdvisor / hunter shots already in repo from earlier work.

Nothing else requires action before Squarespace cutover.
