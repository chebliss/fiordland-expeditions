/* footer-landing.js — minimal footer for paid-traffic landing pages.
   Renders into <footer id="fel-footer"> only. Keep it lean: copyright +
   the two policy links Google Ads requires. No stakeholder navigation,
   no socials, no newsletter, no partner logos — those bleed visitors
   out of the conversion funnel. */
(function () {
  function render() {
    const target = document.getElementById('fel-footer');
    if (!target) return;
    const base = window.location.pathname.includes('/pages/') ? '../' : '';
    target.innerHTML = `
      <div class="footer-landing">
        <span class="footer-landing-legal">© 2026 Fiordland Expeditions Ltd.</span>
        <nav class="footer-landing-links" aria-label="Legal">
          <a href="${base}pages/privacy.html">Privacy Policy</a>
          <a href="${base}pages/terms.html">Terms</a>
        </nav>
      </div>
    `;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
