#!/usr/bin/env node
/* ============================================================
   CookingCalcs — notify-indexnow.js

   왜 필요한가:
   2026-08-03 전략 재정렬 — 이 사이트의 실제 트래픽은 구글이 아니라
   Bing/Yahoo/AI검색/Direct다(GSC 3개월 클릭 5건 vs GA4 28일 세션 309).
   구글은 sitemap 크롤을 기다리는 것 외에 즉시 알릴 방법이 없지만,
   Bing/Yahoo는 IndexNow 프로토콜로 발행 즉시 색인 요청을 보낼 수 있다.
   (https://www.indexnow.org/)

   사용법:
     node notify-indexnow.js https://cookingcalcs.com/blog/new-page.html [추가 URL...]
     node notify-indexnow.js --sitemap    # sitemap.xml의 <loc> 전부 제출

   신규 발행/보강 후 체크리스트 항목으로 실행할 것 (4번 섹션 참고).

   2026-11-02: GitHub Actions(.github/workflows/indexnow.yml)가 main에 sitemap.xml이
   바뀌어 push될 때마다 자동 실행한다(--changed: 새 URL + lastmod 바뀐 URL만 제출).
   Claude 작업 환경에서는 api.indexnow.org가 막혀 있어도 이 경로로 제출된다.
   결과는 GitHub 저장소 Actions 탭의 "IndexNow" 실행 로그에서 확인.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const HOST = 'cookingcalcs.com';
const KEY = '2418ccf79ce498437d212ccbeec13acfa57b7f0de6de7d324b937badb91b3333';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

function readSitemapUrls() {
  const xml = fs.readFileSync(path.join(__dirname, 'sitemap.xml'), 'utf-8');
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map(m => m[1]);
}

// --changed <ref>: sitemap.xml을 <ref> 시점과 비교해 새로 생긴 URL + lastmod가 바뀐 URL만 반환
function sitemapMap(xml) {
  const map = {};
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = (m[1].match(/<loc>([^<]+)<\/loc>/) || [])[1];
    const mod = (m[1].match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1] || '';
    if (loc) map[loc] = mod;
  }
  return map;
}
function changedSince(ref) {
  const { execSync } = require('child_process');
  let oldXml = '';
  try { oldXml = execSync(`git show ${ref}:sitemap.xml`, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }); }
  catch (e) { console.log(`기준(${ref}) sitemap 없음 — 전체 제출`); return readSitemapUrls(); }
  const before = sitemapMap(oldXml);
  const after = sitemapMap(fs.readFileSync(path.join(__dirname, 'sitemap.xml'), 'utf-8'));
  return Object.keys(after).filter(u => before[u] !== after[u]);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('사용법: node notify-indexnow.js <url> [url...]  또는  node notify-indexnow.js --sitemap');
    process.exit(1);
  }

  let urlList;
  if (args[0] === '--sitemap') urlList = readSitemapUrls();
  else if (args[0] === '--changed') urlList = changedSince(args[1] || 'HEAD~1');
  else urlList = args;
  if (args[0] === '--changed' && urlList.length === 0) { console.log('sitemap 변경 URL 없음 — 제출 생략.'); return; }

  const bad = urlList.filter(u => !u.startsWith(`https://${HOST}`));
  if (bad.length) {
    console.error('경고: host(' + HOST + ')와 다른 URL 포함됨, 제외하고 진행:', bad);
  }
  const cleaned = urlList.filter(u => u.startsWith(`https://${HOST}`));

  if (cleaned.length === 0) {
    console.error('제출할 URL이 없음.');
    process.exit(1);
  }

  console.log(`제출 대상 ${cleaned.length}개 URL, endpoint=${ENDPOINT}`);

  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: cleaned,
  });

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
    });
    const text = await res.text();
    console.log(`응답: HTTP ${res.status}`);
    if (text) console.log(text);
    if (res.status === 200 || res.status === 202) {
      console.log('제출 성공.');
    } else {
      console.error('제출 실패 — 응답 코드 확인할 것.');
      process.exit(1);
    }
  } catch (err) {
    console.error('요청 실패(네트워크 차단 가능성 높음):', err.message);
    console.error('이 환경에서 안 되면 사용자 PC/서버에서 위 endpoint로 직접 POST할 것.');
    process.exit(1);
  }
}

main();
