// nav.js — injects shared nav and footer into every page
// Usage: <script src="../js/nav.js"></script> (adjust path per depth)

(function() {
  // Detect active page
  const path = window.location.pathname;
  const active = (href) => path.includes(href) ? 'active' : '';

  const LOGO = '/images/fle-logo-white.png';
  const BOOK = 'https://fareharbor.com/embeds/book/fiordlandexpeditionsnz/items/300312/calendar/2026/03/?flow=554429&language=en-us&g4=yes';

  const navHTML = `
<nav class="nav">
  <a href="/" class="nav-logo"><img src="${LOGO}" alt="Fiordland Expeditions"></a>
  <ul class="nav-links" id="nav-links">
    <li><a href="/pages/overnight-cruise.html" class="${active('overnight')}">Overnight cruise</a></li>
    <li><a href="/pages/charters.html" class="${active('charter')}">Charters</a></li>
    <li><a href="/pages/fleet.html" class="${active('fleet')}">Our fleet</a></li>
    <li><a href="/pages/about-us.html" class="${active('about')}">About us</a></li>
    <li><a href="/pages/environment.html" class="${active('environment')}">Environment</a></li>
    <li><a href="/pages/contact.html" class="${active('contact')}">Contact</a></li>
    <li><a href="/pages/guest-content-hub.html" class="${active('guest-content-hub')}">Guest hub</a></li>
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
    <a href="/pages/about-us.html">About Fiordland Expeditions</a>
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

  // ── Attribution: GA4 cross-domain linker + UTM forwarding ──
  // Mirrors css/fel-components.js so the legacy-nav page
  // (discerning-explorer) carries the same attribution behaviour.
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  gtag('config', 'G-H3DM3E4BMV', {
    send_page_view: false,
    linker: { domains: ['fareharbor.com'] }
  });
  (function(){
    var params = new URLSearchParams(window.location.search);
    var forward = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'];
    var carry = forward.filter(function(k){ return params.has(k); })
      .map(function(k){ return k + '=' + encodeURIComponent(params.get(k)); })
      .join('&');
    if (!carry) return;
    document.addEventListener('click', function(e) {
      var a = e.target.closest('a');
      if (!a || !a.href) return;
      if (a.href.indexOf('fareharbor.com') === -1) return;
      var sep = a.href.indexOf('?') === -1 ? '?' : '&';
      a.href = a.href + sep + carry;
    }, true);
  })();
})();
