# Fiordland Expeditions: Website

Built for CloudCannon CMS with GitHub deployment.

## Structure
- `index.html`: Homepage
- `pages/`: All inner pages
  - `overnight-cruise.html`
  - `charters.html`
  - `fleet.html`
  - `why-us.html`
  - `environment.html`
  - `contact.html`
  - `discerning-explorer.html`: Persona landing page
- `css/style.css`: Global brand stylesheet
- `js/nav.js`: Shared nav and footer injection. Exposes `window.fel.cldUrl` and `window.fel.cldSrcset` for Cloudinary image URLs.

## Brand tokens
- Navy: `#253A49`
- Teal: `#97D5CC`
- Orange: `#EC9123`

## Deployment
Connected to CloudCannon. Push to main branch to deploy.

## Image hosting
Photography is hosted on Cloudinary (`dbfwdxsaz` cloud, root folder `fel/derek-2026/`). The `nav.js` shared layer exposes two helpers on `window.fel`:

- `cldUrl(publicId, opts)` returns a single transform URL (defaults `f_auto,q_auto`, append e.g. `'w_1600'`).
- `cldSrcset(publicId, [widths])` returns a complete srcset string at standard widths (640, 960, 1280, 1600, 2400 by default).
