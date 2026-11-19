#!/usr/bin/env node
/* ============================================================
   CookingCalcs — build-static.js

   왜 필요한가:
   예전에는 헤더/모바일메뉴/푸터와 블로그·툴·가이드 목록 카드를
   전부 nav.js가 런타임에 주입했다. 그 결과 JS를 실행하지 않는
   크롤러(애드센스 심사 포함)에게는 모든 페이지가 네비게이션 없는
   고립 문서로 보였고, /blog/ /tools/ /guides/ 목록 페이지는
   본문 20~30단어짜리 빈 페이지로, 홈은 "Blog posts coming soon"
   으로 보였다. 2026-08-02 애드센스 "가치 없는 콘텐츠" 판정의 직접 원인.

   이 스크립트는 nav.js의 빌더 함수를 그대로 재사용해 동일한 마크업을
   각 HTML 파일에 정적으로 구워 넣는다. nav.js는 정적 마크업이 이미
   있으면 주입을 건너뛰므로 중복되지 않는다.

   사용법:  node build-static.js
   TOOLS/BLOGS/GUIDES 배열을 수정했거나 새 페이지를 추가했다면 반드시 다시 실행할 것.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const nav = require('./assets/js/nav.js');
const { TOOLS, BLOGS, GUIDES, ccBuildHeader, ccBuildMobileNav, ccBuildFooter } = nav;

const ROOT = __dirname;
const START = '<!-- CC:STATIC-CHROME:START (build-static.js 자동 생성 — 직접 수정하지 말 것) -->';
const END = '<!-- CC:STATIC-CHROME:END -->';
// 한 파일에 카드 컨테이너가 2개 이상 있을 수 있으므로(index.html의 blog-grid/guides-grid)
// 마커에 반드시 컨테이너 id를 포함시킨다. id 없이 공용 마커를 쓰면 두 블록이 서로를 덮어쓴다.
const gridStart = id => `<!-- CC:STATIC-CARDS:${id}:START (build-static.js 자동 생성) -->`;
const gridEnd = id => `<!-- CC:STATIC-CARDS:${id}:END -->`;

function fmtDate(d) {
  if (!d) return '';
  // nav.js의 toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'})와
  // 동일한 출력을 내야 JS 렌더링 후 화면이 바뀌지 않는다.
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dt = new Date(d);
  return `${months[dt.getUTCMonth()]} ${dt.getUTCDate()}, ${dt.getUTCFullYear()}`;
}

function cardHTML(item) {
  const dateStr = fmtDate(item.date);
  return `
      <a href="${item.url}" class="blog-card">
        <div class="blog-card-body">
          <h3>${item.name}</h3>
          ${item.desc ? `<p class="blog-card-desc">${item.desc}</p>` : ''}
        </div>
        ${dateStr ? `<div class="blog-card-footer"><time>${dateStr}</time></div>` : ''}
      </a>
    `;
}

function sortByDateDesc(arr) {
  return [...arr].sort((a, b) => (b.date || '') > (a.date || '') ? 1 : -1);
}

// tools/index.html 안의 TOOL_ICONS 맵을 그대로 읽어와 사용한다.
// (아이콘 정의를 두 곳에 두면 반드시 어긋나므로 단일 소스 유지)
function readToolIcons() {
  const src = fs.readFileSync(path.join(ROOT, 'tools', 'index.html'), 'utf8');
  const block = src.match(/const TOOL_ICONS\s*=\s*\{([\s\S]*?)\n\s*\};/);
  if (!block) throw new Error('tools/index.html에서 TOOL_ICONS를 찾지 못함');
  const icons = {};
  const re = /'([^']+)'\s*:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(block[1])) !== null) icons[m[1]] = m[2];
  return icons;
}

function toolCardHTML(t, icons) {
  const icon = icons[t.url] || '🍳';
  return `
        <a href="${t.url}" class="tool-card">
          <div class="tool-card-icon">${icon}</div>
          <h3>${t.name}</h3>
          <span class="tool-card-arrow">Use tool →</span>
        </a>`;
}

// ── 1) 전 페이지에 헤더/모바일메뉴/푸터 정적 삽입 ──────────────
function collectHtmlFiles() {
  const out = [];
  const dirs = ['', 'blog', 'tools', 'guides'];
  for (const d of dirs) {
    const abs = path.join(ROOT, d);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs)) {
      if (!f.endsWith('.html')) continue;
      out.push(path.join(d, f));
    }
  }
  return out;
}

function stripBlock(html, start, end, eatSide) {
  let s = html.indexOf(start);
  let e = html.indexOf(end);
  if (s === -1 || e === -1) return html;
  e = e + end.length;
  // 2026-08-03: 실측(Node 시뮬레이션 + 실제 파일 diff)으로 확인한 두 가지 별개의 누적 방향.
  // (1) 헤더: <body> 바로 뒤에 블록을 끼워넣으면서 원래 있던 콘텐츠가 블록 뒤로 밀려나는데,
  //     strip이 그 밀려난 개행을 못 지워서 <main> 앞에 개행이 계속 쌓임 → 블록 뒤(trailing)를 먹어야 함.
  // (2) 푸터: </body> 앞에 블록을 끼워넣으면서 원래 있던 개행(</main> 뒤)이 블록 앞에 그대로 남는데,
  //     strip 후 재삽입할 때마다 그 개행이 누적됨 → 블록 앞(leading)을 먹어야 함.
  // 처음에 헤더=leading/푸터=trailing으로 잘못 짚었다가 실제 파일로 재검증해서 반대임을 확인함 —
  // 절대 다시 헷갈리지 말 것: 헤더는 trailing, 푸터는 leading.
  if (eatSide === 'leading') {
    while (s > 0 && html[s - 1] === '\n') s -= 1;
  } else if (eatSide === 'trailing') {
    while (e < html.length && html[e] === '\n') e += 1;
  }
  return html.slice(0, s) + html.slice(e);
}

function injectChrome(rel) {
  const abs = path.join(ROOT, rel);
  let html = fs.readFileSync(abs, 'utf8');

  // 2026-10-21: 통합으로 생긴 리다이렉트 스텁(meta refresh)은 크롬을 넣지 않는다.
  if (html.includes('http-equiv="refresh"')) return { rel, ok: true, stub: true };

  // 재실행 가능하도록 기존 자동생성 블록 제거 후 다시 삽입.
  // 첫 번째로 발견되는 START/END 쌍 = 헤더(trailing eat), 두 번째 쌍 = 푸터(leading eat).
  html = stripBlock(html, START, END, 'trailing');
  html = stripBlock(html, START, END, 'leading');

  if (!/<body[^>]*>/.test(html) || !html.includes('</body>')) {
    return { rel, ok: false, reason: 'body 태그 없음' };
  }

  const headerBlock = `${START}${ccBuildHeader()}\n${ccBuildMobileNav()}\n${END}`;
  const footerBlock = `${START}${ccBuildFooter()}\n${END}`;

  html = html.replace(/(<body[^>]*>)/, `$1\n${headerBlock}`);
  html = html.replace('</body>', `${footerBlock}\n</body>`);

  fs.writeFileSync(abs, html, 'utf8');
  return { rel, ok: true };
}

// ── 2) 목록 카드 정적 삽입 ────────────────────────────────────
function injectCards(rel, containerId, items, renderer) {
  const abs = path.join(ROOT, rel);
  let html = fs.readFileSync(abs, 'utf8');

  const render = renderer || cardHTML;
  const cards = items.map(render).join('');
  const GRID_START = gridStart(containerId);
  const GRID_END = gridEnd(containerId);
  const block = `${GRID_START}${cards}${GRID_END}`;

  // 2회차 이후: 이전에 생성한 마커 블록만 통째로 교체한다.
  // (컨테이너 정규식을 다시 쓰면 카드 안의 중첩 </div>에 걸려 마크업이 깨진다 —
  //  2026-08-02에 실제로 목록 페이지 4개가 이 방식으로 깨졌음)
  const s = html.indexOf(GRID_START);
  const e = html.indexOf(GRID_END);
  if (s !== -1 && e !== -1) {
    html = html.slice(0, s) + block + html.slice(e + GRID_END.length);
    fs.writeFileSync(abs, html, 'utf8');
    return { rel, containerId, ok: true, count: items.length, mode: '마커 교체' };
  }

  // 최초 1회: 빈 컨테이너의 내용을 채운다.
  // 컨테이너가 비어 있거나 <p>플레이스홀더</p>만 있는 경우에만 안전하므로,
  // 내부에 <div>가 있으면 중단한다.
  const openRe = new RegExp(`(<div[^>]*id="${containerId}"[^>]*>)([\\s\\S]*?)(</div>)`);
  const m = html.match(openRe);
  if (!m) return { rel, containerId, ok: false, reason: '컨테이너 없음' };
  if (m[2].includes('<div')) {
    return { rel, containerId, ok: false, reason: '컨테이너에 중첩 div 존재 — 마커 없이 덮어쓰면 위험' };
  }
  html = html.replace(openRe, `$1\n${block}\n    $3`);

  fs.writeFileSync(abs, html, 'utf8');
  return { rel, containerId, ok: true, count: items.length, mode: '최초 삽입' };
}

// ── 3) 공유용 메타(og/twitter) 정적 삽입 (2026-11-19) ─────────────────
// <title>, meta description, canonical에서 값을 읽어 canonical 바로 아래에 블록을 넣는다. 재실행 시 블록을 지우고 다시 넣는다.
const OG_START = '<!-- CC:HEAD-META:START (build-static.js 자동 생성) -->';
const OG_END = '<!-- CC:HEAD-META:END -->';
const OG_IMAGE = 'https://cookingcalcs.com/assets/og/cookingcalcs-og.png';
function attr(s) { return String(s).replace(/&(?!(amp|lt|gt|quot|#\d+|#x[0-9a-f]+);)/gi, '&amp;').replace(/"/g, '&quot;'); }
function injectHeadMeta(rel) {
  const abs = path.join(ROOT, rel);
  let html = fs.readFileSync(abs, 'utf8');
  if (html.includes('http-equiv="refresh"')) return { rel, ok: true, skip: 'stub' };
  const s = html.indexOf(OG_START);
  if (s >= 0) { const e = html.indexOf(OG_END, s); html = html.slice(0, s).replace(/\n[ \t]*$/, '') + html.slice(e + OG_END.length); }
  const can = html.match(/<link rel="canonical" href="([^"]+)">/);
  if (!can) { fs.writeFileSync(abs, html, 'utf8'); return { rel, ok: true, skip: 'no canonical' }; }
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || 'CookingCalcs';
  const desc = (html.match(/<meta name="description" content="([^"]*)">/) || [])[1] || '';
  const isArticle = /^(blog|guides)\//.test(rel.replace(/\\/g, '/')) && !/index\.html$/.test(rel);
  const t = attr(title.trim()), d = attr(desc);
  const block = [OG_START,
    `  <meta property="og:type" content="${isArticle ? 'article' : 'website'}">`,
    '  <meta property="og:site_name" content="CookingCalcs">',
    `  <meta property="og:title" content="${t}">`,
    `  <meta property="og:description" content="${d}">`,
    `  <meta property="og:url" content="${can[1]}">`,
    `  <meta property="og:image" content="${OG_IMAGE}">`,
    '  <meta property="og:image:width" content="1200">',
    '  <meta property="og:image:height" content="630">',
    '  <meta property="og:image:alt" content="CookingCalcs — kitchen calculators, charts and guides">',
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${t}">`,
    `  <meta name="twitter:description" content="${d}">`,
    `  <meta name="twitter:image" content="${OG_IMAGE}">`,
    '  ' + OG_END].join('\n');
  html = html.replace(can[0], can[0] + '\n  ' + block);
  fs.writeFileSync(abs, html, 'utf8');
  return { rel, ok: true };
}

// ── 실행 ──────────────────────────────────────────────────────
console.log('== 1) 헤더/모바일메뉴/푸터 정적 삽입 ==');
const files = collectHtmlFiles();
let okCount = 0;
for (const rel of files) {
  const r = injectChrome(rel);
  if (r.ok) okCount++;
  else console.log(`  SKIP ${r.rel}: ${r.reason}`);
}
console.log(`  ${okCount}/${files.length} 페이지 처리 완료`);

console.log('== 2) 목록 카드 정적 삽입 ==');
const icons = readToolIcons();
const missingIcons = TOOLS.filter(t => !icons[t.url]);
if (missingIcons.length) {
  console.log(`  !! 아이콘 미등록 툴 ${missingIcons.length}개(기본 🍳 사용): ` +
    missingIcons.map(t => t.url).join(', '));
}

const results = [
  injectCards('index.html', 'blog-grid', sortByDateDesc(BLOGS).slice(0, 6)),
  // index.html 가이드 그리드는 2026-10-14 제거(상황별 시작점 섹션으로 대체)
  injectCards(path.join('blog', 'index.html'), 'blog-list', sortByDateDesc(BLOGS)),
  injectCards(path.join('guides', 'index.html'), 'guides-grid', sortByDateDesc(GUIDES)),
  injectCards(path.join('tools', 'index.html'), 'tool-list', TOOLS, t => toolCardHTML(t, icons)),
];
for (const r of results) {
  console.log(r.ok
    ? `  OK   ${r.rel} #${r.containerId} — 카드 ${r.count}개`
    : `  FAIL ${r.rel} #${r.containerId}: ${r.reason}`);
}

console.log('== 3) og/twitter 메타 삽입 ==');
let ogCount = 0;
for (const rel of collectHtmlFiles()) { const r = injectHeadMeta(rel); if (r.ok && !r.skip) ogCount++; }
console.log(`  ${ogCount}개 페이지에 og 메타 삽입`);

console.log('\n완료. 변경 후에는 반드시 검증 스크립트를 돌릴 것.');
