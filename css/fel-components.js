/* fel-components.js — shared nav + footer for all FEL pages */

const FEL_LOGO = 'https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/25e4f2cd-780e-4751-8aa0-4a5d0922794a/FLE+Logo+2024+RGB+WHITE.png?format=1500w';
const FH_BOOK  = 'https://fareharbor.com/embeds/book/fiordlandexpeditionsnz/items/300312/calendar/2026/03/?flow=554429&back=https://fiordlandexpeditions.co.nz/&g4=yes';

function getBase() {
  return window.location.pathname.includes('/pages/') ? '../' : '';
}

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
      <li><a href="${b}pages/why-fiordland-expeditions.html">Why Fiordland Expeditions?</a></li>
      <li><a href="${b}pages/our-fleet.html">Our Fleet</a></li>
      <li><a href="${b}pages/environment.html">Environment</a></li>
      <li><a href="${b}pages/contact.html">Contact</a></li>
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
        <p class="footer-blurb">25+ years exploring Fiordland's most pristine waters. Exclusive DOC-consented access to Doubtful Sound — the fiord the crowds never reach.</p>
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
          <li><a href="${b}pages/why-fiordland-expeditions.html">Why Choose Us?</a></li>
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

    <!-- STAKEHOLDER PREVIEW BOX -->
    <div style="border:1px dashed rgba(201,168,76,0.4);padding:24px 32px;margin-bottom:32px;display:flex;align-items:center;flex-wrap:wrap;gap:24px;">
      <div style="flex-shrink:0;">
        <p style="font-size:9px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);margin-bottom:4px;">Stakeholder Preview</p>
        <p style="font-size:11px;color:var(--text-dim);line-height:1.5;">Persona landing pages — not in public navigation</p>
      </div>
      <div style="width:1px;height:40px;background:rgba(201,168,76,0.2);flex-shrink:0;"></div>
      <div style="display:flex;flex-wrap:wrap;gap:10px;">
        <a href="${b}pages/landing-seclusionist.html" style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(201,168,76,0.35);padding:8px 18px;text-decoration:none;" onmouseover="this.style.background='rgba(201,168,76,0.1)'" onmouseout="this.style.background='transparent'">The Seclusionist</a>
        <a href="${b}pages/landing-dynasty-builder.html" style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(201,168,76,0.35);padding:8px 18px;text-decoration:none;" onmouseover="this.style.background='rgba(201,168,76,0.1)'" onmouseout="this.style.background='transparent'">Dynasty Builder</a>
        <a href="${b}pages/landing-milestone-celebrator.html" style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(201,168,76,0.35);padding:8px 18px;text-decoration:none;" onmouseover="this.style.background='rgba(201,168,76,0.1)'" onmouseout="this.style.background='transparent'">Milestone Celebrator</a>
        <a href="${b}pages/landing-pilgrim-trophy.html" style="font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(201,168,76,0.35);padding:8px 18px;text-decoration:none;" onmouseover="this.style.background='rgba(201,168,76,0.1)'" onmouseout="this.style.background='transparent'">Pilgrim &amp; Trophy</a>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="footer-legal">© 2026 Fiordland Expeditions Ltd. All rights reserved.</span>
      <div style="display:flex;align-items:center;gap:24px;">
        <a href="https://www.tripadvisor.com/Attraction_Review-g1205733-d8541914-Reviews-Fiordland_Expeditions_Doubtful_Sound_Overnight_Cruises_Multi_Day_Charters-Manapo.html" target="_blank" style="display:block;">
          <img src="https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/3d6c8be6-00a8-4c9c-af89-14208d63aa58/tripadvisor.png" alt="TripAdvisor" style="height:52px;width:auto;opacity:0.9;filter:brightness(0) invert(1);" />
        </a>
        <a href="https://www.tripadvisor.com/Attraction_Review-g1205733-d8541914-Reviews-Fiordland_Expeditions_Doubtful_Sound_Overnight_Cruises_Multi_Day_Charters-Manapo.html" target="_blank" style="display:block;">
          <img src="https://images.squarespace-cdn.com/content/v1/68ad198e14fb0617e39fa27a/8f2ffe14-c3dc-4c20-88db-1994433e6e3a/TA%2B2024.jpg" alt="TripAdvisor 2024 Award" style="height:68px;width:auto;" />
        </a>
        <a href="https://www.qualmark.co.nz/" target="_blank" style="display:block;">
          <img src="https://www.qualmark.co.nz/assets/Qualmark_Logo_Bronze.png" alt="Qualmark Bronze" style="height:64px;width:auto;opacity:0.9;filter:brightness(0) invert(1);" onerror="this.style.display='none'" />
        </a>
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

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  initNav();
  initFadeUp();
  initFAQs();
});
