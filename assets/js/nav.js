/* ============================================================
   CookingCalcs — nav.js
   헤더/푸터/GA 자동 삽입
   툴 또는 블로그 추가 시 아래 배열만 수정하면 됨
   ============================================================ */

// ── GA ──────────────────────────────────────────────────────
// GA_ID는 Google Analytics 연결 후 교체
const GA_ID = 'G-QZT8PVVY5E';
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
  { name: "Cups to Grams", url: "/tools/cups-to-grams.html" },
  { name: "Oven Temperature Converter", url: "/tools/oven-temp-converter.html" },
  { name: "Tablespoon to Teaspoon", url: "/tools/tablespoon-to-teaspoon.html" },
  { name: "Weight Converter", url: "/tools/weight-converter.html" },
  { name: "Egg Size Converter", url: "/tools/egg-converter.html" },
  { name: "Recipe Multiplier", url: "/tools/recipe-multiplier.html" },
  { name: "Cooking Time Calculator", url: "/tools/cooking-time-calculator.html" },
  { name: "Meat Temperature Guide", url: "/tools/meat-temperature-guide.html" },
  { name: "Meal Cost Calculator", url: "/tools/meal-cost-calculator.html" },
  { name: "Cost Per Serving", url: "/tools/cost-per-serving.html" },
  { name: "Liquid Converter", url: "/tools/liquid-converter.html" },
  { name: "Butter Converter", url: "/tools/butter-converter.html" },
  { name: "Baking Substitutions", url: "/tools/baking-substitutions.html" },
  { name: "Cups to Tablespoons", url: "/tools/cups-to-tablespoons.html" },
  { name: "Raw to Cooked Weight", url: "/tools/raw-to-cooked-weight.html" },
  { name: "Weekly Meal Prep Cost Calculator", url: "/tools/weekly-meal-prep-cost-calculator.html" },
];

const BLOGS = [
  { name: "Cups to Grams Guide", url: "/blog/cups-to-grams-guide.html", desc: "Convert cups to grams for flour, sugar, butter, and more with our complete reference guide.", date: "2026-07-09" },
  { name: "Why Weigh Ingredients When Baking", url: "/blog/why-weigh-ingredients-baking.html", desc: "Discover why professional bakers always use a scale — and how it makes your recipes more consistent.", date: "2026-07-09" },
  { name: "Oven Temperature Conversion Guide", url: "/blog/oven-temperature-conversion-guide.html", desc: "Quickly convert between Fahrenheit, Celsius, and Gas Mark oven temperatures for any recipe.", date: "2026-07-09" },
  { name: "How to Scale a Recipe", url: "/blog/how-to-scale-a-recipe.html", desc: "Learn how to double, halve, or multiply any recipe without ruining the proportions.", date: "2026-07-09" },
  { name: "Baking Measurement Mistakes", url: "/blog/baking-measurement-mistakes.html", desc: "The most common measurement errors home bakers make — and how to avoid them every time.", date: "2026-07-09" },
  { name: "Meat Internal Temperature Guide", url: "/blog/meat-internal-temperature-guide.html", desc: "Safe internal cooking temperatures for beef, chicken, pork, and more. Never undercook again.", date: "2026-07-09" },
  { name: "How to Cut Your Grocery Bill", url: "/blog/how-to-cut-grocery-bill.html", desc: "Practical strategies to spend less at the grocery store without sacrificing meal quality.", date: "2026-05-07" },
  { name: "How to Calculate Cost Per Serving", url: "/blog/how-to-calculate-cost-per-serving.html", desc: "Figure out exactly how much each meal costs with our step-by-step cost per serving guide.", date: "2026-07-09" },
  { name: "Average Cost of a Home-Cooked Meal", url: "/blog/average-cost-of-a-home-cooked-meal.html", desc: "Real US benchmarks for what a home-cooked meal costs per person, by meal type and budget level, plus how to calculate your own.", date: "2026-07-10" },
  { name: "How Long to Cook Chicken Breast", url: "/blog/how-long-to-cook-chicken-breast.html", desc: "Oven, stovetop, or air fryer — exact cook times for perfectly juicy chicken breast every time.", date: "2026-07-09" },
  { name: "Cooking Measurement Guide", url: "/blog/cooking-measurement-guide.html", desc: "A complete reference for cups, tablespoons, teaspoons, ounces, and metric conversions.", date: "2026-07-09" },
  { name: "Meat Cooking Temperatures Explained", url: "/blog/meat-cooking-temperatures-explained.html", desc: "Everything you need to know about cooking temperatures to get the right doneness every time.", date: "2026-07-09" },
  { name: "How to Meal Prep on a Budget", url: "/blog/how-to-meal-prep-on-a-budget.html", desc: "Plan and prep a week of meals for under $50 with these budget-friendly meal prep tips.", date: "2026-07-09" },
  { name: "How Many Cups in a Pound of Flour?", url: "/blog/how-many-cups-in-a-pound-of-flour.html", desc: "Exact cup counts for all-purpose, bread, cake, and whole wheat flour — plus why the number varies.", date: "2026-07-09" },
  { name: "How to Measure Butter", url: "/blog/how-to-measure-butter.html", desc: "Convert butter between sticks, cups, tablespoons, and grams with a full reference chart.", date: "2026-07-09" },
  { name: "How Long to Cook Salmon", url: "/blog/how-long-to-cook-salmon.html", desc: "Exact cook times for salmon by method — oven, pan, air fryer, and poached. Plus the internal temperature that tells you it's done.", date: "2026-07-09" },
  { name: "How Many Grams in a Cup of Rice?", url: "/blog/how-many-grams-in-a-cup-of-rice.html", desc: "Exact gram weights for white, brown, basmati, jasmine, and sushi rice — dry and cooked. Plus how much cooked rice one cup of dry yields.", date: "2026-07-09" },
  { name: "How Long to Cook Shrimp", url: "/blog/how-long-to-cook-shrimp.html", desc: "Exact cook times for shrimp by method and size — boiled, sautéed, baked, and grilled. Plus visual cues and internal temperature guidance.", date: "2026-07-09" },
  { name: "How to Calculate Meal Prep Cost for a Week", url: "/blog/how-to-calculate-meal-prep-cost-for-a-week.html", desc: "Step-by-step guide to calculating exactly how much your weekly meal prep costs, with a cost per serving formula and tips to reduce spend.", date: "2026-07-09" },
  { name: "Grocery Budget Tips That Actually Work", url: "/blog/grocery-budget-tips.html", desc: "Practical grocery budgeting strategies to cut your food bill without eating badly.", date: "2026-07-09" },
  { name: "Tablespoon vs Teaspoon: What's the Difference?", url: "/blog/tablespoon-vs-teaspoon.html", desc: "How many teaspoons in a tablespoon? Clear answers plus a full conversion chart.", date: "2026-07-09" },
  { name: "How to Substitute Egg Sizes in Recipes", url: "/blog/how-to-substitute-egg-sizes.html", desc: "Learn how to substitute medium, large, extra-large, and jumbo eggs in any recipe, including UK vs US size differences. Includes a conversion chart in both directions.", date: "2026-07-10" },
  { name: "How Long to Cook Ground Beef", url: "/blog/how-long-to-cook-ground-beef.html", desc: "Exact cook times for ground beef on the stovetop, in the oven, and in the air fryer.", date: "2026-06-07" },
  { name: "What Is a Serving Size? A Practical Guide", url: "/blog/what-is-a-serving-size.html", desc: "What does a serving size actually mean? Learn how to estimate serving sizes and how it affects your cost per serving.", date: "2026-06-07" },
  { name: "Tablespoons to Teaspoons: Full Conversion Guide", url: "/blog/tablespoon-to-teaspoon-guide.html", desc: "Simple conversions between tablespoons, teaspoons, and milliliters for any recipe.", date: "2026-06-18" },
  { name: "How to Reduce a Recipe to Fewer Servings", url: "/blog/how-to-reduce-a-recipe.html", desc: "Step-by-step guide to scaling down any recipe for 1 or 2 people. Covers eggs, leavening, pan size, cook time, and the ingredients you can't just divide.", date: "2026-06-18" },
  { name: "How Many Grams in a Cup of Sugar?", url: "/blog/how-many-grams-in-a-cup-of-sugar.html", desc: "Exact gram weights for granulated, brown, powdered, and coconut sugar by cup. Includes a full conversion table for every common sugar type.", date: "2026-06-18" },
  { name: "How Long to Cook Bacon", url: "/blog/how-long-to-cook-bacon.html", desc: "Exact cook times for bacon by method and thickness — oven, stovetop, and air fryer. Includes temperature guide and tips for crispy or chewy results.", date: "2026-06-18" },
  { name: "How Long to Cook Steak", url: "/blog/how-long-to-cook-steak.html", desc: "Exact steak cook times by thickness, doneness level, and method — pan-sear, oven, and grill. Includes internal temperature guide for rare through well-done.", date: "2026-06-18" },
  { name: "How Many Eggs in a Cup?", url: "/blog/how-many-eggs-in-a-cup.html", desc: "4 large eggs = 1 cup. Exact egg counts by size for whole eggs, whites, and yolks — plus how to measure eggs by volume.", date: "2026-07-09" },
  { name: "How to Cut a Recipe in Half", url: "/blog/how-to-reduce-a-recipe-by-half.html", desc: "How to halve any recipe: exact amounts for eggs, leavening, spices, and canned goods. With a complete halving chart.", date: "2026-06-12" },
  { name: "How Long to Cook Pork Chops", url: "/blog/how-long-to-cook-pork-chops.html", desc: "Exact cook times for pork chops by thickness and method — oven, pan, air fryer, and grill. Plus the safe internal temperature.", date: "2026-06-12" },
  { name: "How Many Grams in a Cup of Oats?", url: "/blog/how-many-grams-in-a-cup-of-oats.html", desc: "1 cup of rolled oats = 90g. Exact gram weights for rolled, quick, steel-cut, and instant oats — dry, cooked, and cups per pound.", date: "2026-07-09" },
  { name: "How Many Cups in a Pound of Sugar?", url: "/blog/how-many-cups-in-a-pound-of-sugar.html", desc: "1 pound of granulated sugar = 2¼ cups. Exact cup counts for brown, powdered, and coconut sugar per pound, with a full conversion table for baking.", date: "2026-07-09" },
  { name: "How Long to Cook Lamb Chops", url: "/blog/how-long-to-cook-lamb-chops.html", desc: "Exact lamb chop cook times by method and doneness — pan-sear, oven, grill, and air fryer. Internal temperature guide for rare through well-done.", date: "2026-06-23" },
  { name: "How Long to Cook Turkey Breast", url: "/blog/how-long-to-cook-turkey-breast.html", desc: "Turkey breast cook times by weight, bone-in or boneless, oven and air fryer. Plan 20 minutes per pound at 325°F. Internal temperature guide included.", date: "2026-07-07" },
  { name: "How Many Cups in a Quart, Pint, and Gallon?", url: "/blog/how-many-cups-in-a-quart-pint-gallon.html", desc: "1 quart = 4 cups, 1 pint = 2 cups, 1 gallon = 16 cups. Complete US liquid measurement conversion table with an interactive calculator.", date: "2026-07-07" },
  { name: "How to Convert a Recipe to Metric", url: "/blog/how-to-convert-a-recipe-to-metric.html", desc: "Convert any US recipe to metric measurements step by step. Cups to grams, Fahrenheit to Celsius, and why weight beats volume for accurate metric conversion.", date: "2026-07-07" },
  { name: "How Long to Cook Chicken Thighs", url: "/blog/how-long-to-cook-chicken-thighs.html", desc: "Exact cook times for chicken thighs by method — oven, pan, air fryer, and grill. Bone-in and boneless, plus the internal temperature that tells you they're done.", date: "2026-07-07" },
  { name: "How to Calculate Cooking Time for Meat", url: "/blog/how-to-calculate-cooking-time.html", desc: "The formula for calculating cooking time by weight, cut, and method — plus why time alone isn't enough and what to check instead.", date: "2026-07-07" },
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
          <li><a href="/tools/" class="nav-link">Tools</a></li>
          <li><a href="/blog/" class="nav-link">Blog</a></li>
          <li><a href="/about.html" class="nav-link">About</a></li>
        </ul>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;

  const mobileNav = `
  <nav class="mobile-nav" id="mobileNav">
    <ul class="nav-list">
      <li><a href="/" class="nav-link">Home</a></li>
      <li class="nav-has-dropdown">
        <button class="nav-link nav-btn" aria-expanded="false">Tools ▾</button>
        <ul class="nav-dropdown">
          <li><a href="/tools/" class="nav-dropdown-all">View All Tools →</a></li>
          ${toolItems || '<li class="nav-empty">Coming soon</li>'}
        </ul>
      </li>
      <li class="nav-has-dropdown">
        <button class="nav-link nav-btn" aria-expanded="false">Blog ▾</button>
        <ul class="nav-dropdown">
          <li><a href="/blog/" class="nav-dropdown-all">View All Posts →</a></li>
          ${blogItems || '<li class="nav-empty">Coming soon</li>'}
        </ul>
      </li>
      <li><a href="/about.html" class="nav-link">About</a></li>
    </ul>
  </nav>
  <div class="nav-overlay" id="navOverlay"></div>`;

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
            <li><a href="/tools/">View All Tools →</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Blog</h4>
          <ul>
            ${[...BLOGS].sort((a,b) => (b.date||'') > (a.date||'') ? 1 : -1).slice(0, 6).map(b => `<li><a href="${b.url}">${b.name}</a></li>`).join('') || '<li>Coming soon</li>'}
            <li><a href="/blog/">View All Posts →</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Site</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/blog/">Blog</a></li>
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
  document.querySelector('.site-header').insertAdjacentHTML('afterend', mobileNav);
  document.body.insertAdjacentHTML('beforeend', footer);

  // 현재 페이지 경로
  const currentPath = window.location.pathname;

  // 블로그 카드 자동 렌더링 (id="blog-grid" 또는 id="blog-list" 있는 페이지)
  const blogGrid = document.getElementById('blog-grid') || document.getElementById('blog-list');
  if (blogGrid && BLOGS.length > 0) {
    const sorted = [...BLOGS].sort((a, b) => (b.date || '') > (a.date || '') ? 1 : -1);
    const isMainPage = blogGrid.id === 'blog-grid' && (currentPath === '/' || currentPath === '/index.html');
    const list = isMainPage ? sorted.slice(0, 6) : sorted;
    blogGrid.innerHTML = list.map(b => {
      const dateStr = b.date ? new Date(b.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
      return `
      <a href="${b.url}" class="blog-card">
        <div class="blog-card-body">
          <h3>${b.name}</h3>
          ${b.desc ? `<p class="blog-card-desc">${b.desc}</p>` : ''}
        </div>
        ${dateStr ? `<div class="blog-card-footer"><time>${dateStr}</time></div>` : ''}
      </a>
    `;
    }).join('');
  }

  // 1차 메뉴 a 태그
  document.querySelectorAll('a.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (href === '/' && (currentPath === '/' || currentPath === '/index.html'))) {
      a.classList.add('active');
    }
  });

  // Tools 버튼 (nav-btn) — 하위 드롭다운에 현재 페이지 있으면 active
  document.querySelectorAll('.nav-has-dropdown').forEach(li => {
    const hasActiveChild = Array.from(li.querySelectorAll('.nav-dropdown a')).some(
      a => a.getAttribute('href') === currentPath
    );
    if (hasActiveChild) {
      const btn = li.querySelector('.nav-btn');
      if (btn) btn.classList.add('active');
      const parentLink = li.querySelector('a.nav-link');
      if (parentLink) parentLink.classList.add('active');
    }
  });

  // 2차 메뉴 (드롭다운 안 링크) active
  document.querySelectorAll('.nav-dropdown a').forEach(a => {
    if (a.getAttribute('href') === currentPath) {
      a.classList.add('active');
    }
  });

  // 드롭다운 토글 (Tools: nav-btn, Blog: nav-arrow)
  document.querySelectorAll('.nav-has-dropdown').forEach(li => {
    const trigger = li.querySelector('.nav-btn') || li.querySelector('.nav-arrow');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = li.classList.contains('open');
      document.querySelectorAll('.nav-has-dropdown').forEach(el => el.classList.remove('open'));
      if (!isOpen) {
        li.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
  // 외부 클릭 시 닫기
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-has-dropdown').forEach(el => el.classList.remove('open'));
  });

  // 햄버거
  const hamburger = document.getElementById('hamburger');
  const mobileNavEl = document.getElementById('mobileNav');
  const overlay = document.getElementById('navOverlay');

  function openNav() {
    mobileNavEl.classList.add('nav-open');
    hamburger.classList.add('active');
    overlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    mobileNavEl.classList.remove('nav-open');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    mobileNavEl.classList.contains('nav-open') ? closeNav() : openNav();
  });

  overlay.addEventListener('click', closeNav);

  // ── RESPONSIVE TABLES: wrap every table in a scrollable container
  // with a left-pinned "scroll to see more" hint on narrow screens ──
  (function () {
    var tables = document.querySelectorAll('main table');
    tables.forEach(function (table) {
      if (table.closest('.table-scroll-wrap')) return; // already wrapped

      var wrap = document.createElement('div');
      wrap.className = 'table-scroll-wrap';

      var hint = document.createElement('div');
      hint.className = 'table-scroll-hint';
      hint.textContent = '⇄ Scroll to see more';

      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(hint);
      wrap.appendChild(table);

      // Give the table room to breathe instead of letting it cram every
      // column into whatever narrow width the container happens to be.
      // width:100% lets it stretch to fill wide containers; min-width in
      // px (scaled by column count) guarantees comfortable per-column
      // space, so on narrow screens it genuinely overflows and scrolls
      // rather than squeezing padding down to fit.
      var colCount = table.querySelectorAll('thead th').length || table.rows[0].cells.length;
      table.style.width = '100%';
      table.style.minWidth = Math.max(colCount * 90, 360) + 'px';
      table.querySelectorAll('th, td').forEach(function (cell) {
        if (!cell.style.whiteSpace) cell.style.whiteSpace = 'nowrap';
      });

      // Default value columns (everything after the first) to center
      // alignment when no alignment was already set inline — bare <td>s
      // otherwise default to left, which reads poorly for numbers/units
      // packed tightly next to each other.
      table.querySelectorAll('tr').forEach(function (row) {
        Array.prototype.forEach.call(row.children, function (cell, i) {
          if (i > 0 && !cell.style.textAlign) cell.style.textAlign = 'center';
        });
      });

      function updateHint() {
        var overflowing = table.scrollWidth > wrap.clientWidth + 1;
        hint.style.display = overflowing ? 'inline-block' : 'none';
      }
      updateHint();
      window.addEventListener('resize', updateHint);

      // Re-measure after layout settles and after web fonts finish loading —
      // an early measurement (before fonts swap in) can read a stale, wider
      // scrollWidth and show the hint even when the table actually fits.
      requestAnimationFrame(function () { requestAnimationFrame(updateHint); });
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(updateHint);
      }
      setTimeout(updateHint, 400);
    });
  })();
});
