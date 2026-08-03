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

   주의: 이 환경(egress 방화벽)은 api.indexnow.org로 나가는 요청을 막고 있다
   (x-deny-reason: host_not_allowed). 즉 Claude가 이 스크립트를 실행해도
   실제 제출은 실패한다 — 스크립트/키 파일만 커밋하고, 사용자가 자신의
   PC나 다른 네트워크에서 직접 실행해야 한다. "제출 완료"라고 보고하지 말 것.
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

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('사용법: node notify-indexnow.js <url> [url...]  또는  node notify-indexnow.js --sitemap');
    process.exit(1);
  }

  const urlList = args[0] === '--sitemap' ? readSitemapUrls() : args;

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
