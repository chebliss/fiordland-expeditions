/* fel-components.js — shared nav + footer for all FEL pages */

const FEL_LOGO = '/images/fle-logo-white.png';
const now = new Date();
const FH_BOOK = 'https://fareharbor.com/embeds/book/fiordlandexpeditionsnz/items/300312/calendar/'+now.getFullYear()+'/'+String(now.getMonth()+1).padStart(2,'0')+'/?flow=554429&back=https://fiordlandexpeditions.co.nz/&g4=yes';

function getBase() {
  return window.location.pathname.includes('/pages/') ? '../' : '';
}

// Cloudinary URL helpers. Cloud `dbfwdxsaz` hosts the Derek Morrison shoot
// at fel/derek-2026/<subfolder>/<filename>. f_auto + q_auto handle format
// negotiation (WebP/AVIF) and per-image quality. Eager widths pre-cached:
// 640, 960, 1280, 1600, 2400.
const CLD_BASE = 'https://res.cloudinary.com/dbfwdxsaz/image/upload';
function cldUrl(publicId, opts) {
  const transforms = ['f_auto', 'q_auto'];
  if (opts) transforms.push(opts);
  return CLD_BASE + '/' + transforms.join(',') + '/' + publicId;
}
function cldSrcset(publicId, widths) {
  widths = widths || [640, 960, 1280, 1600, 2400];
  return widths.map(function(w) {
    return cldUrl(publicId, 'w_' + w) + ' ' + w + 'w';
  }).join(', ');
}
window.fel = Object.assign(window.fel || {}, { cldUrl: cldUrl, cldSrcset: cldSrcset });

function renderNav() {
  const nav = document.getElementById('fel-nav');
  if (!nav) return;
  const b = getBase();
  nav.innerHTML = `
    <a href="${b}index.html" class="nav-logo"><img src="${FEL_LOGO}" alt="Fiordland Expeditions" /></a>
    <ul class="nav-links">
      <li class="nav-dropdown">
        <a href="#">Cruises &amp; Charters ▾</a>
        <div class="nav-dropdown-menu">
          <a href="${b}pages/doubtful-sound-overnight-cruise.html">Doubtful Sound Overnight Cruise</a>
          <a href="${b}pages/fishing-private-charters.html">Fishing &amp; Private Charters</a>
        </div>
      </li>
      <li><a href="${b}pages/about-us.html">About Us</a></li>
      <li><a href="${b}pages/our-fleet.html">Our Fleet</a></li>
      <li><a href="${b}pages/environment.html">Environment</a></li>
      <li><a href="${b}pages/contact.html">Contact</a></li>
      <li><a href="${b}pages/guest-content-hub.html">Guest Hub</a></li>
    </ul>
    <a href="${FH_BOOK}" target="_blank" class="nav-cta">Book Now</a>
    <button class="nav-hamburger" onclick="toggleMobileNav()" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  `;
}

function renderFooter() {
  const footer = document.getElementById('fel-footer');
  if (!footer) return;
  const b = getBase();
  footer.innerHTML = `
    <div class="footer-inner">
      <div>
        <div class="footer-logo"><img src="${FEL_LOGO}" alt="Fiordland Expeditions" /></div>
        <p class="footer-blurb">25+ years exploring Fiordland's most pristine waters. Exclusive DOC-consented access to Doubtful Sound: the fiord the crowds never reach.</p>
      </div>
      <div class="footer-col">
        <h5>Experiences</h5>
        <ul>
          <li><a href="${b}pages/doubtful-sound-overnight-cruise.html">Overnight Cruise</a></li>
          <li><a href="${b}pages/fishing-private-charters.html">Fishing &amp; Charters</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Discover</h5>
        <ul>
          <li><a href="${b}pages/about-us.html">About Us</a></li>
          <li><a href="${b}pages/our-fleet.html">Our Fleet</a></li>
          <li><a href="${b}pages/environment.html">Environment</a></li>
          <li><a href="${b}pages/milford-vs-doubtful-sound.html">Milford vs Doubtful Sound</a></li>
          <li><a href="${b}pages/contact.html">Contact Us</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <ul>
          <li><a href="tel:05088886560">0508 888 656</a></li>
          <li><a href="tel:+6432499005">+64 3 249 9005</a></li>
          <li><a href="mailto:info@fiordlandexpeditions.co.nz">info@fiordlandexpeditions.co.nz</a></li>
          <li><a href="mailto:charters@fiordlandexpeditions.co.nz">charters@fiordlandexpeditions.co.nz</a></li>
          <li style="margin-top:12px; font-size:12px; color: var(--text-dim);">PO Box 300, Te Anau 9600<br>Fiordland, New Zealand</li>
        </ul>
      </div>
    </div>

    <!-- Persona / preview link strip — pages not in public nav.
         Dashed-border container retained as a visual delimiter. -->
    <div style="border:1px dashed rgba(201,168,76,0.4);padding:24px 32px;margin-bottom:32px;display:flex;align-items:center;flex-wrap:wrap;gap:10px;justify-content:center;">
      <div style="display:flex;flex-wrap:wrap;gap:10px;">
        <a href="${b}pages/photography-expedition.html" style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(201,168,76,0.35);padding:8px 18px;text-decoration:none;" onmouseover="this.style.background='rgba(201,168,76,0.1)'" onmouseout="this.style.background='transparent'">Photography Expedition · Oct 2026</a>
        <a href="${b}pages/landing-dynasty-builder.html" style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(201,168,76,0.35);padding:8px 18px;text-decoration:none;" onmouseover="this.style.background='rgba(201,168,76,0.1)'" onmouseout="this.style.background='transparent'">Dynasty Builder</a>
        <a href="${b}pages/landing-milestone-celebrator.html" style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(201,168,76,0.35);padding:8px 18px;text-decoration:none;" onmouseover="this.style.background='rgba(201,168,76,0.1)'" onmouseout="this.style.background='transparent'">Milestone Celebrator</a>
        <a href="${b}pages/landing-pilgrim-trophy.html" style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(201,168,76,0.35);padding:8px 18px;text-decoration:none;" onmouseover="this.style.background='rgba(201,168,76,0.1)'" onmouseout="this.style.background='transparent'">Pilgrim &amp; Trophy</a>
        <a href="${b}pages/milford-vs-doubtful-sound.html" style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(201,168,76,0.35);padding:8px 18px;text-decoration:none;" onmouseover="this.style.background='rgba(201,168,76,0.1)'" onmouseout="this.style.background='transparent'">Milford vs Doubtful</a>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="footer-legal">© 2026 Fiordland Expeditions Ltd. All rights reserved.</span>
      <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
        <!-- TripAdvisor owl logo → links to FEL TripAdvisor listing -->
        <a href="https://www.tripadvisor.com/Attraction_Review-g1205733-d8541914-Reviews-Fiordland_Expeditions_Doubtful_Sound_Overnight_Cruises_Multi_Day_Charters-Manapo.html" target="_blank" rel="noopener" title="Fiordland Expeditions on TripAdvisor">
          <img src="${b}assets/img/tripadvisor-owl.webp" alt="TripAdvisor" style="height:56px;width:auto;" />
        </a>
        <!-- Qualmark Gold logo → links to qualmark.co.nz -->
        <a href="https://www.qualmark.co.nz/" target="_blank" rel="noopener" title="Qualmark Gold: NZ Tourism Quality Assurance">
          <img src="${b}assets/img/qualmark-gold.jpg" alt="Qualmark Gold" style="height:72px;width:auto;" />
        </a>
        <!-- Social icons -->
        <div style="display:flex;gap:14px;align-items:center;border-left:1px solid rgba(255,255,255,0.12);padding-left:20px;margin-left:4px;">
          <a href="https://www.facebook.com/Fiordlandexpeditionstutoko/" target="_blank" rel="noopener" title="Fiordland Expeditions on Facebook" style="display:flex;align-items:center;opacity:0.65;transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.65'">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/fiordland_expeditions/?hl=en" target="_blank" rel="noopener" title="Fiordland Expeditions on Instagram" style="display:flex;align-items:center;opacity:0.65;transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.65'">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </div>
      </div>
      <span class="footer-legal">Site by <a href="https://blissconsultancy.co.nz" style="color:var(--gold)">Bliss&amp;Co</a></span>
    </div>
  `;
}

function toggleMobileNav() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  const isOpen = links.getAttribute('data-open') === 'true';
  links.style.display = isOpen ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'fixed';
  links.style.top = '70px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.background = '#141C2E';
  links.style.padding = '24px';
  links.style.gap = '20px';
  links.style.zIndex = '200';
  links.style.borderBottom = '1px solid rgba(201,168,76,0.2)';
  links.setAttribute('data-open', isOpen ? 'false' : 'true');
}

function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

function initFadeUp() {
  const els = document.querySelectorAll('.fade-up');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

function initFAQs() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const a = btn.nextElementSibling;
      a.classList.toggle('open');
      btn.querySelector('span').textContent = a.classList.contains('open') ? '−' : '+';
    });
  });
}

// ── dataLayer click tracking ───────────────────────────────
// GTM tags subscribe to these Custom Events and forward to GA4 + Ads.
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };

// ── Attribution: GA4 cross-domain linker + UTM forwarding ──
// Configures the GA4 SDK's automatic linker so cross-domain
// sessions to fareharbor.com preserve attribution through the
// booking handoff. send_page_view:false avoids duplicating
// pageviews if the existing GTM container also fires GA4 for
// the same property (GTM-52CH2F83 → G-H3DM3E4BMV).
gtag('config', 'G-H3DM3E4BMV', {
  send_page_view: false,
  linker: { domains: ['fareharbor.com'] }
});

// UTM / click-id forwarding — when the visitor landed with ad
// tracking params, decorate any outbound FareHarbor link at click
// time so the source survives the booking handoff. Combined with
// the linker config above, this preserves Google Ads (gclid),
// Meta (fbclid), and UTM attribution through the FH booking flow.
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

function felParseFareharborItem(url) {
  const m = url.match(/\/items\/(\d+)/);
  return m ? m[1] : null;
}

function felLinkLocation(el) {
  if (el.closest('.nav, .header')) return 'nav';
  if (el.closest('.footer')) return 'footer';
  if (el.closest('.hero')) return 'hero';
  if (el.closest('.persona-pill, .landing-cta')) return 'persona_landing';
  return 'body';
}

function initClickTracking() {
  document.addEventListener('click', function(e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const where = felLinkLocation(a);
    const path = window.location.pathname;

    if (href.startsWith('tel:')) {
      window.dataLayer.push({
        event: 'contact_phone_click',
        phone_number: href.replace('tel:', ''),
        link_location: where,
        page_path: path
      });
      return;
    }
    if (href.startsWith('mailto:')) {
      window.dataLayer.push({
        event: 'contact_email_click',
        email_address: href.replace('mailto:', '').split('?')[0],
        link_location: where,
        page_path: path
      });
      return;
    }
    if (href.indexOf('fareharbor.com') !== -1) {
      const itemId = felParseFareharborItem(href);
      window.dataLayer.push({
        event: 'book_now_click',
        fh_item_id: itemId,
        fh_url: href,
        link_location: where,
        page_path: path,
        ecommerce: {
          items: [{
            item_id: itemId,
            item_name: a.dataset.itemName || (itemId === '300312' ? 'Doubtful Sound Overnight Cruise' : 'Fareharbor item'),
            affiliation: 'Fareharbor'
          }]
        }
      });
    }
  }, true);
}

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  initNav();
  initFadeUp();
  initFAQs();
  initClickTracking();
});
