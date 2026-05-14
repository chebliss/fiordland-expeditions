// nav.js — minimal nav for paid-traffic landing pages.
// Used by pages/discerning-explorer.html, which carries its own scoped
// .fel brand tokens and does not load fel.css. Nav styles are inlined
// so the nav renders correctly without external CSS.
// Footer for this page is rendered by css/footer-landing.js.

(function() {
  const LOGO = '/images/fle-logo-white.png';

  const navHTML = `
<nav style="position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:18px 6%;background:rgba(14,26,36,0.85);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);">
  <a href="/" style="display:flex;align-items:center;">
    <img src="${LOGO}" alt="Fiordland Expeditions" style="height:32px;display:block;">
  </a>
  <a href="#fel-enquire" style="font-family:'Bebas Neue','Arial Narrow',Impact,Arial,sans-serif;letter-spacing:0.08em;font-size:13px;background:#97D5CC;color:#253A49;padding:10px 22px;text-decoration:none;font-weight:700;text-transform:uppercase;">Request your itinerary</a>
</nav>`;

  // Inject nav at top of body
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // FAQ accordion (preserved — page may include inline FAQ items)
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
