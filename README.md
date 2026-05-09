# Fiordland Expeditions: Website

Static HTML site for Fiordland Expeditions Ltd. Built for CloudCannon CMS, deployed to Netlify from the `FEL` branch.

## Site

- Production: https://fiordlandexpeditions.co.nz
- Staging: https://fel-staging.netlify.app (blocked from indexing via `_headers` and `robots.txt`)

## File structure

```
.
├── index.html                              Homepage
├── pages/
│   ├── doubtful-sound-overnight-cruise.html
│   ├── fishing-private-charters.html
│   ├── our-fleet.html
│   ├── why-fiordland-expeditions.html
│   ├── environment.html
│   ├── contact.html
│   ├── milford-vs-doubtful-sound.html
│   ├── landing-seclusionist.html           Persona: escape the world
│   ├── landing-dynasty-builder.html        Persona: generational travel
│   ├── landing-milestone-celebrator.html   Persona: anniversaries, milestones
│   ├── landing-pilgrim-trophy.html         Persona: bucket-list, trophy
│   ├── photography-expedition.html         Stakeholder, noindex
│   ├── guest-content-hub.html              GCH (dynamic, see netlify/functions)
│   └── discerning-explorer.html            Legacy fragment, noindex
├── css/
│   ├── fel.css                             Global brand stylesheet
│   ├── style.css                           Legacy stylesheet
│   └── fel-components.js                   Shared nav, footer, helpers
├── js/nav.js                               Legacy nav (only loaded by discerning-explorer.html)
├── images/                                 Self-hosted brand and photography
├── assets/img/                             Qualmark, TripAdvisor, owner photography
├── netlify/functions/                      Guest Content Hub backend (4 functions)
├── docs/imagery-migration.md               Squarespace decommissioning record
├── cloudcannon.config.yml                  CMS configuration
├── netlify.toml                            Netlify build configuration
├── _headers                                Per-route response headers
├── _redirects                              URL rewrites (e.g. /gch, /share)
├── robots.txt                              Staging block, production sitemap pointer
└── sitemap.xml                             Production URL list
```

## Brand tokens

- Navy: `#253A49`
- Teal: `#97D5CC`
- Orange: `#EC9123`
- Gold: `#C9A84C`
- Cream: `#F5F2EC`

## Image hosting

Photography lives in two places.

1. **Cloudinary** (cloud `dbfwdxsaz`) is the primary host for new photography. The Derek Morrison shoot (April 2026, 460 images) is at `fel/derek-2026/<subfolder>/<filename>`. Eager-generated widths: 640, 960, 1280, 1600, 2400. URL pattern:

   ```
   https://res.cloudinary.com/dbfwdxsaz/image/upload/f_auto,q_auto,w_{width}/<public_id>
   ```

   No extension in the URL. `f_auto` negotiates WebP or AVIF based on the requesting browser.

2. **Self-hosted** (`/images/`, `/assets/img/`) holds historical assets migrated from Squarespace plus brand assets (logo, favicon, Qualmark, TripAdvisor). See `docs/imagery-migration.md` for the migration record.

`css/fel-components.js` exposes Cloudinary URL helpers on `window.fel`:

```js
window.fel.cldUrl(publicId, opts)         // single transform URL
window.fel.cldSrcset(publicId, [widths])  // full srcset string
```

Image alt text is taken verbatim from each image's IPTC Description field (delivered via shot list MD), giving consistent voice and proper photo credit attribution. Filename-derived alt is the fallback for any image with missing IPTC metadata.

## CloudCannon

`cloudcannon.config.yml` declares two collections, `pages` at `pages/` and `home` for `index.html`, with both source and visual editors enabled.

Editable text fields use `data-cms-edit="source"`. Hero image fields use `data-prop-image-src` and `data-prop-image-alt` (image-only). Full Editable Regions migration is deferred to a Phase 2 build-step refactor, likely Astro, so the team can edit images visually today without committing to a partial templating system.

## Guest Content Hub

`pages/guest-content-hub.html` plus four Netlify functions in `netlify/functions/`. Backed by Cloudinary uploads with consent flow. Out of scope for the photography integration pass. Do not edit GCH files without explicit scope confirmation.

## Deployment

Connected to CloudCannon. Push to `FEL` to deploy to staging at `fel-staging.netlify.app`. Production at `fiordlandexpeditions.co.nz` cuts over via DNS (separate workstream).
