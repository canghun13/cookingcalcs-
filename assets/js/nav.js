/* ============================================================
   CookingCalcs — nav.js
   헤더/푸터/GA 자동 삽입
   툴 또는 블로그 추가 시 아래 배열만 수정하면 됨
   ============================================================ */

// ── GA ──────────────────────────────────────────────────────
// GA_ID는 Google Analytics 연결 후 교체
const GA_ID = 'G-XXXXXXXXXX';
(function () {
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
})();
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', GA_ID);

// ── 툴 목록 (추가 시 여기만 수정) ───────────────────────────
const TOOLS = [
  // { name: "Cups to Grams", url: "/tools/cups-to-grams.html" },
  // { name: "Oven Temperature Converter", url: "/tools/oven-temp-converter.html" },
  // { name: "Recipe Multiplier", url: "/tools/recipe-multiplier.html" },
];

// ── 블로그 목록 (추가 시 여기만 수정) ──────────────────────
const BLOGS = [
  // { name: "Cups to Grams Guide", url: "/blog/cups-to-grams-guide.html" },
];

// ── 메뉴 렌더링 ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  const toolItems = TOOLS.map(t =>
    `<li><a href="${t.url}">${t.name}</a></li>`
  ).join('');

  const blogItems = BLOGS.map(b =>
    `<li><a href="${b.url}">${b.name}</a></li>`
  ).join('');

  const header = `
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="logo">🍳 CookingCalcs</a>
      <nav class="main-nav" id="mainNav">
        <ul class="nav-list">
          <li><a href="/" class="nav-link">Home</a></li>
          <li class="nav-has-dropdown">
            <button class="nav-link nav-btn" aria-expanded="false">Tools</button>
            <ul class="nav-dropdown">
              ${toolItems || '<li class="nav-empty">Coming soon</li>'}
            </ul>
          </li>
          <li class="nav-has-dropdown">
            <button class="nav-link nav-btn" aria-expanded="false">Blog</button>
            <ul class="nav-dropdown nav-dropdown--right">
              ${blogItems || '<li class="nav-empty">Coming soon</li>'}
            </ul>
          </li>
          <li><a href="/about.html" class="nav-link">About</a></li>
        </ul>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;

  const footer = `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <a href="/" class="logo">🍳 CookingCalcs</a>
        <p>Free cooking calculators & tools for every kitchen.</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>Tools</h4>
          <ul>
            ${TOOLS.slice(0, 6).map(t => `<li><a href="${t.url}">${t.name}</a></li>`).join('') || '<li>Coming soon</li>'}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Blog</h4>
          <ul>
            ${BLOGS.slice(0, 6).map(b => `<li><a href="${b.url}">${b.name}</a></li>`).join('') || '<li>Coming soon</li>'}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Site</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about.html">About</a></li>
            <li><a href="/privacy-policy.html">Privacy Policy</a></li>
            <li><a href="/contact.html">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} CookingCalcs. For informational purposes only.</p>
    </div>
  </footer>`;

  // 삽입
  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  // 현재 페이지 active 표시
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link[href]').forEach(a => {
    if (a.getAttribute('href') === currentPath) a.classList.add('active');
  });

  // 드롭다운 토글
  document.querySelectorAll('.nav-has-dropdown').forEach(li => {
    const btn = li.querySelector('.nav-btn');
    const dropdown = li.querySelector('.nav-dropdown');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = li.classList.contains('open');
      document.querySelectorAll('.nav-has-dropdown').forEach(el => el.classList.remove('open'));
      if (!isOpen) {
        li.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 외부 클릭 시 닫기
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-has-dropdown').forEach(el => el.classList.remove('open'));
  });

  // 햄버거
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  hamburger.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('nav-open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
});
