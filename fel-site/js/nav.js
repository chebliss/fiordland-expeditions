// nav.js — injects shared nav and footer into every page
// Usage: <script src="../js/nav.js"></script> (adjust path per depth)

(function() {
  // Detect active page
  const path = window.location.pathname;
  const active = (href) => path.includes(href) ? 'active' : '';

  const LOGO = 'https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/25e4f2cd-780e-4751-8aa0-4a5d0922794a/FLE+Logo+2024+RGB+WHITE.png?format=1500w';
  const BOOK = 'https://fareharbor.com/embeds/book/fiordlandexpeditionsnz/items/300312/calendar/2026/03/?flow=554429&language=en-us&g4=yes';

  const navHTML = `
<nav class="nav">
  <a href="/" class="nav-logo"><img src="${LOGO}" alt="Fiordland Expeditions"></a>
  <ul class="nav-links" id="nav-links">
    <li><a href="/pages/overnight-cruise.html" class="${active('overnight')}">Overnight cruise</a></li>
    <li><a href="/pages/charters.html" class="${active('charter')}">Charters</a></li>
    <li><a href="/pages/fleet.html" class="${active('fleet')}">Our fleet</a></li>
    <li><a href="/pages/why-us.html" class="${active('why')}">Why us</a></li>
    <li><a href="/pages/environment.html" class="${active('environment')}">Environment</a></li>
    <li><a href="/pages/contact.html" class="${active('contact')}">Contact</a></li>
    <li><a href="${BOOK}" target="_blank" class="nav-cta">Book now</a></li>
  </ul>
  <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>`;

  const footerHTML = `
<div class="newsletter-bar">
  <div>
    <h3>Stay in the know</h3>
    <p>Be the first to hear about new cruises, special experiences, and exclusive updates from Fiordland Expeditions.</p>
  </div>
  <form class="newsletter-form" onsubmit="return false">
    <input type="email" placeholder="Email address">
    <button type="submit">Sign up</button>
  </form>
</div>

<div class="footer-trust">
  <div class="ft-item">AUTH-20202007 — Hall Arm · Crooked Arm · Bradshaw Sound</div>
  <div class="ft-item">Valid 8 December 2040</div>
  <div class="ft-item">Maritime NZ Certified — MV Tutoko II</div>
  <div class="ft-item">UNESCO World Heritage — Licensed Overnight Operator</div>
  <div class="ft-item">25+ Years in Doubtful Sound</div>
</div>

<footer class="footer">
  <div class="footer-col">
    <img src="${LOGO}" alt="Fiordland Expeditions" style="height:40px;margin-bottom:16px">
    <p>Doubtful Sound overnight cruises and private charters from Manapouri, Fiordland, New Zealand.</p>
  </div>
  <div class="footer-col">
    <h4>Voyages</h4>
    <a href="/pages/overnight-cruise.html">Doubtful Sound overnight cruise</a>
    <a href="/pages/charters.html">Fishing &amp; private charters</a>
    <a href="/pages/charters.html">Corporate charters</a>
    <a href="/pages/fleet.html">Our fleet</a>
  </div>
  <div class="footer-col">
    <h4>Company</h4>
    <a href="/pages/why-us.html">Why Fiordland Expeditions</a>
    <a href="/pages/environment.html">Environment</a>
    <a href="/pages/contact.html">Contact</a>
    <a href="${BOOK}" target="_blank">Book now</a>
  </div>
  <div class="footer-col">
    <h4>Contact</h4>
    <a href="mailto:info@fiordlandexpeditions.co.nz">info@fiordlandexpeditions.co.nz</a>
    <a href="mailto:charters@fiordlandexpeditions.co.nz">charters@fiordlandexpeditions.co.nz</a>
    <a href="tel:+6432499005">+64 3 249 9005</a>
    <a href="tel:0508888656">0508 888 656</a>
    <p style="margin-top:8px;color:rgba(255,255,255,0.25)">PO Box 300, Te Anau 9600<br>Fiordland, New Zealand</p>
  </div>
</footer>
<div class="footer-bottom">&copy; 2025 Fiordland Expeditions Limited &mdash; Manapouri, Fiordland, New Zealand</div>`;

  // Inject nav at top of body
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // Inject footer at end of body
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Inject site-wide Organization / LocalBusiness JSON-LD
  // Note: JSON-LD works when injected after DOM parse — Googlebot renders JS.
  // For maximum SEO safety, consider hard-coding this in each page's <head> later.
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": "https://fiordlandexpeditions.co.nz/#organization",
    "name": "Fiordland Expeditions",
    "legalName": "Fiordland Expeditions Limited",
    "url": "https://fiordlandexpeditions.co.nz/",
    "logo": LOGO,
    "image": "https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/0b90276b-e615-4a3c-babb-f812cdce619c/Fiordland+Expeditions?format=1200w",
    "description": "Doubtful Sound overnight cruises and private charters from Manapouri, Fiordland, New Zealand. Licensed overnight operator with 25+ years' experience.",
    "telephone": "+64-3-249-9005",
    "email": "info@fiordlandexpeditions.co.nz",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Real NZ Ferry Terminal, Pearl Harbour",
      "addressLocality": "Manapouri",
      "addressRegion": "Southland",
      "postalCode": "9679",
      "addressCountry": "NZ",
      "postOfficeBoxNumber": "PO Box 300, Te Anau 9600"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -45.5671,
      "longitude": 167.6175
    },
    "areaServed": {
      "@type": "Place",
      "name": "Fiordland National Park, New Zealand"
    },
    "slogan": "Experience the majesty of Fiordland",
    "foundingDate": "2000"
  };
  const orgScript = document.createElement('script');
  orgScript.type = 'application/ld+json';
  orgScript.textContent = JSON.stringify(orgSchema);
  document.head.appendChild(orgScript);

  // Mobile nav toggle
  document.getElementById('nav-toggle').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('open');
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ══ dataLayer click tracking ═════════════════════════════
  // GTM tags in the Fiordland Expeditions container subscribe to these
  // Custom Events and forward them to GA4, Google Ads, and Meta.
  window.dataLayer = window.dataLayer || [];

  function parseFareharborItem(url) {
    const m = url.match(/\/items\/(\d+)/);
    return m ? m[1] : null;
  }

  function locationLabel(el) {
    if (el.closest('.nav')) return 'nav';
    if (el.closest('.footer')) return 'footer';
    if (el.closest('.hero')) return 'hero';
    if (el.closest('.page-header')) return 'page_header';
    return 'body';
  }

  document.addEventListener('click', function(e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const where = locationLabel(a);

    if (href.startsWith('tel:')) {
      window.dataLayer.push({
        event: 'contact_phone_click',
        phone_number: href.replace('tel:', ''),
        link_location: where,
        page_path: window.location.pathname
      });
      return;
    }

    if (href.startsWith('mailto:')) {
      window.dataLayer.push({
        event: 'contact_email_click',
        email_address: href.replace('mailto:', '').split('?')[0],
        link_location: where,
        page_path: window.location.pathname
      });
      return;
    }

    if (href.indexOf('fareharbor.com') !== -1) {
      const itemId = parseFareharborItem(href);
      window.dataLayer.push({
        event: 'book_now_click',
        fh_item_id: itemId,
        fh_url: href,
        link_location: where,
        page_path: window.location.pathname,
        // GA4 ecommerce-style payload for begin_checkout mapping in GTM
        ecommerce: {
          items: [{
            item_id: itemId,
            item_name: a.dataset.itemName || 'Doubtful Sound Overnight Cruise',
            affiliation: 'Fareharbor'
          }]
        }
      });
    }
  }, true);
})();
