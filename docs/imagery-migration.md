# Imagery migration — Squarespace → CloudCannon

**Status: 7 of 30 assets migrated. 23 remain. URGENT before Squarespace turnoff.**

The Squarespace site is being decommissioned in the next couple of weeks. Every remaining `images.squarespace-cdn.com` URL on the new site will 404 the moment Squarespace goes dark. This migration must complete before cutover.

---

## ✅ Already migrated (7 assets, in `/images/`)

| Local path | Used in |
|---|---|
| `/images/fle-logo-white.png` | nav + footer (`css/fel-components.js`), guest content hub |
| `/images/doubtful-sound-hero.jpg` | many pages — primary hero |
| `/images/doubtful-sound-secondary.jpg` | secondary hero shot |
| `/images/inner-fiord.jpg` | inner-fiord shot |
| `/images/tutoko-ii.jpg` | MV Tutoko II vessel |
| `/images/crew.webp` | crew shot |
| `/images/charters-fishing.webp` | charters / fishing card |
| `/images/favicon.ico` | favicon (linked from all 17 HTML pages) |

---

## ⚠️ Still needed (23 unique assets)

Suggested filenames and which pages will break if not migrated:

| Asset ID | Original filename | Suggested local path | Used in |
|---|---|---|---|
| `1756345555484-WAGQZWG8K2C8BM4DLKIA` | `unsplash-image-LCaKuYefLQk.jpg` | `/images/charters-stock-bg.jpg` | `pages/fishing-private-charters.html` |
| `1759788005780-BH8E866MIHZB5LBQSKD9` | `Fiordland+Expeditions` | `/images/environment-hero.jpg` | `pages/environment.html` |
| `4326131d-5ab3-4e98-8cb1-0ff9f50783dd` | `CRW_0169.webp` | `/images/gch-gallery-1.webp` | `pages/guest-content-hub.html` |
| `4c0f8782-8e24-44c6-9c82-c51cd051d0b2` | `Crooked+Arm+DS.webp` | `/images/crooked-arm.webp` | `index.html`, `pages/contact.html`, `pages/guest-content-hub.html` |
| `578b602b-5918-4c20-80c7-26447d142b4d` | `Fiordland+Expeditions` | `/images/fleet-1.jpg` | `pages/our-fleet.html` |
| `5cf3d80c-b685-44e9-b06a-fd4f6429b988` | `CRW_0218.webp` | `/images/index-detail-1.webp` | `index.html` |
| `5dd7e645-ecee-49f0-a83e-71d3f622fa52` | `Crooked+Arm+DS.webp` | `/images/crooked-arm-2.webp` | `pages/doubtful-sound-overnight-cruise.html` |
| `5dd7e645-ecee-49f0-a83e-71d3f622fa52` | `Fiordland+Expeditions` | `/images/why-fel-1.jpg` | `pages/why-fiordland-expeditions.html` |
| `614347a3-115d-458f-a6a4-6137e5db4de4` | `Fiordland+Expeditions` | `/images/fleet-2.jpg` | `pages/our-fleet.html` |
| `7702816b-22e6-4b7d-a0d4-a203c4ce868d` | `Fiordland+Expeditions` | `/images/why-fel-2.jpg` | `pages/why-fiordland-expeditions.html` |
| `7cb08221-182c-41ac-8c60-2166ce430008` | `Fiordland+Expeditions` | `/images/fleet-3.jpg` | `pages/our-fleet.html` |
| `87d101e5-e532-4b90-b174-1546e06198a5` | `Crooked+Arm+060513+1.webp` | `/images/crooked-arm-060513.webp` | `index.html`, `pages/guest-content-hub.html`, `pages/landing-seclusionist.html` |
| `8da674db-0a17-4666-9eca-9b02b3c9a63e` | `fleet2.png` | `/images/fleet-overview.png` | `pages/our-fleet.html` |
| `b0a9296e-7abb-4241-96f4-04145e41e056` | `Fiordland+Expeditions` | `/images/why-fel-3.jpg` | `pages/why-fiordland-expeditions.html` |
| `b693cd66-d70e-49c0-b155-219e7c0fd689` | `Fiordland+Expeditions` | `/images/shared-fiord-1.jpg` | `index.html`, `pages/our-fleet.html`, `pages/why-fiordland-expeditions.html` |
| `bb5c9ec9-7deb-44dd-a46b-d8d1c5597525` | `Fiordland+Expeditions` | `/images/environment-2.jpg` | `pages/environment.html`, `pages/fishing-private-charters.html` |
| `bec8fed9-fd83-4daa-a0e2-e8277eaa3d93` | `CRW_0150+ed1.webp` | `/images/CRW_0150-ed1.webp` | `pages/guest-content-hub.html`, `pages/landing-milestone-celebrator.html` |
| `c1d715cf-b4c1-4e63-b911-0e31f695b244` | `AdobeStock_394861446.jpeg` | `/images/index-stock-1.jpg` | `index.html` |
| `c8aa026e-165e-462b-b65a-faedab67989e` | `Doubtful-Pano-4.jpg` | `/images/doubtful-pano-4.jpg` | `pages/why-fiordland-expeditions.html` |
| `cc9d5405-cc41-49ae-b6a3-5843a7e75a06` | `_MG_7535a.webp` | `/images/MG_7535a.webp` | `index.html`, `pages/guest-content-hub.html`, `pages/landing-seclusionist.html` |
| `d5ac5cdf-95c5-42de-86a4-9b2ecef32771` | `SLH-1.jpg` | `/images/SLH-1.jpg` | `pages/landing-milestone-celebrator.html` |
| `db2eeb17-ba04-4705-9b6f-5247f318d539` | `Doubtful-Pano-4.jpg` | `/images/doubtful-pano-4-env.jpg` | `pages/environment.html` |
| `f9b38d65-acfe-41bc-8249-d9eb16a3ec53` | `dining+area.png` | `/images/dining-area.png` | `pages/doubtful-sound-overnight-cruise.html` |

---

## Download script (run in Mac Terminal)

```bash
mkdir -p ~/Desktop/fel-images-batch2 && cd ~/Desktop/fel-images-batch2
SQS="https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a"

curl -L -o charters-stock-bg.jpg          "$SQS/1756345555484-WAGQZWG8K2C8BM4DLKIA/unsplash-image-LCaKuYefLQk.jpg"
curl -L -o environment-hero.jpg           "$SQS/1759788005780-BH8E866MIHZB5LBQSKD9/Fiordland+Expeditions"
curl -L -o gch-gallery-1.webp             "$SQS/4326131d-5ab3-4e98-8cb1-0ff9f50783dd/CRW_0169.webp"
curl -L -o crooked-arm.webp               "$SQS/4c0f8782-8e24-44c6-9c82-c51cd051d0b2/Crooked+Arm+DS.webp"
curl -L -o fleet-1.jpg                    "$SQS/578b602b-5918-4c20-80c7-26447d142b4d/Fiordland+Expeditions"
curl -L -o index-detail-1.webp            "$SQS/5cf3d80c-b685-44e9-b06a-fd4f6429b988/CRW_0218.webp"
curl -L -o crooked-arm-2.webp             "$SQS/5dd7e645-ecee-49f0-a83e-71d3f622fa52/Crooked+Arm+DS.webp"
curl -L -o why-fel-1.jpg                  "$SQS/5dd7e645-ecee-49f0-a83e-71d3f622fa52/Fiordland+Expeditions"
curl -L -o fleet-2.jpg                    "$SQS/614347a3-115d-458f-a6a4-6137e5db4de4/Fiordland+Expeditions"
curl -L -o why-fel-2.jpg                  "$SQS/7702816b-22e6-4b7d-a0d4-a203c4ce868d/Fiordland+Expeditions"
curl -L -o fleet-3.jpg                    "$SQS/7cb08221-182c-41ac-8c60-2166ce430008/Fiordland+Expeditions"
curl -L -o crooked-arm-060513.webp        "$SQS/87d101e5-e532-4b90-b174-1546e06198a5/Crooked+Arm+060513+1.webp"
curl -L -o fleet-overview.png             "$SQS/8da674db-0a17-4666-9eca-9b02b3c9a63e/fleet2.png"
curl -L -o why-fel-3.jpg                  "$SQS/b0a9296e-7abb-4241-96f4-04145e41e056/Fiordland+Expeditions"
curl -L -o shared-fiord-1.jpg             "$SQS/b693cd66-d70e-49c0-b155-219e7c0fd689/Fiordland+Expeditions"
curl -L -o environment-2.jpg              "$SQS/bb5c9ec9-7deb-44dd-a46b-d8d1c5597525/Fiordland+Expeditions"
curl -L -o CRW_0150-ed1.webp              "$SQS/bec8fed9-fd83-4daa-a0e2-e8277eaa3d93/CRW_0150+ed1.webp"
curl -L -o index-stock-1.jpg              "$SQS/c1d715cf-b4c1-4e63-b911-0e31f695b244/AdobeStock_394861446.jpeg"
curl -L -o doubtful-pano-4.jpg            "$SQS/c8aa026e-165e-462b-b65a-faedab67989e/Doubtful-Pano-4.jpg"
curl -L -o MG_7535a.webp                  "$SQS/cc9d5405-cc41-49ae-b6a3-5843a7e75a06/_MG_7535a.webp"
curl -L -o SLH-1.jpg                      "$SQS/d5ac5cdf-95c5-42de-86a4-9b2ecef32771/SLH-1.jpg"
curl -L -o doubtful-pano-4-env.jpg        "$SQS/db2eeb17-ba04-4705-9b6f-5247f318d539/Doubtful-Pano-4.jpg"
curl -L -o dining-area.png                "$SQS/f9b38d65-acfe-41bc-8249-d9eb16a3ec53/dining+area.png"

echo "Done — 23 files in ~/Desktop/fel-images-batch2"
open .
```

---

## After upload — tell me

Reply **"batch 2 uploaded"** and I'll run the find/replace across the codebase the same way I did the first batch.

---

## Other image sources currently in use (not Squarespace, not at risk)

The codebase also references images at:
- `https://lh3.googleusercontent.com/d/...` — Google Drive direct links (persona pages, photo grids). These are stable and don't need migration.
- `assets/img/*` — local Qualmark / TripAdvisor / hunter shots already in the repo. Already migrated.

Nothing else needs action.
