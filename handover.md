# CookingCalcs 현황 및 인수인계 (2026-07-13 기준)

이 문서는 2026-07-10 버전 인수인계 문서를 기반으로, 이후 진행된 모든 작업 내역을 반영해 갱신한 버전입니다. 새 세션에서는 이 문서만 보고 바로 작업 이어가면 됩니다.

---

## 0. 이 문서 사용법 (새 세션 시작 시 최우선 확인)

1. 이 문서 전체를 먼저 읽는다.
2. **작업 시작 전 반드시 `git clone`으로 최신 repo 상태를 직접 확인**한다 (아래 8번 워크플로우 참고). 이 문서에 적힌 파일 개수/커밋 내역은 스냅샷일 뿐, 실제 작업은 항상 라이브 repo 기준으로 한다.
3. 사용자가 "정리만 해" 라고 하면 절대 바로 코드 작업 진입하지 않는다. 분석 → 결과 요약 → 사용자 확인 → 작업 순서를 지킨다. 다만 이 세션 후반부에는 사용자가 "계획 잡지 말고 바로 해"라는 식으로 속도를 요구하는 경우가 잦았다 — 신호를 보고 판단할 것 (아래 8-6번 참고).
4. 작업 완료 후 **간단한 완료 보고**를 한다. 장황한 설명 금지 — 이 사용자는 불필요한 말이 많으면 짜증낸다.

---

## 1. 기본 정보

| 항목 | 내용 |
|------|------|
| 도메인 | cookingcalcs.com |
| 호스팅 | GitHub Pages (레포: `canghun13/cookingcalcs-`, 브랜치 `main`) |
| DNS | Cloudflare (Always Use HTTPS 활성화 완료) |
| GA 측정 ID | G-QZT8PVVY5E |
| AdSense ID | ca-pub-5592663499707350 |
| 연락처 이메일 | canghun13@naver.com |
| Git 커밋 계정 | `canghun13` / `canghun13@naver.com` (push 시 이 설정 사용) |

**관련 사이트**: `mywellnesscalc.com` (건강/웰니스 계산기, 사용자가 별도로 운영) — 2026-07-11부터 두 사이트 간 교차 내부링크 진행 중 (8-7번 참고).

---

## 2. 현재 사이트 구조 (2026-07-10 기준, 실제 repo 확인값)

### 툴 16개 (`/tools/`)
```
index.html                          ← 툴 메인 (검색 기능, TOOL_ICONS 오브젝트 포함)
cups-to-grams.html
oven-temp-converter.html
tablespoon-to-teaspoon.html
weight-converter.html
egg-converter.html
recipe-multiplier.html
cooking-time-calculator.html
meat-temperature-guide.html
meal-cost-calculator.html
cost-per-serving.html
liquid-converter.html
butter-converter.html
baking-substitutions.html
cups-to-tablespoons.html
raw-to-cooked-weight.html
weekly-meal-prep-cost-calculator.html   ← 2026-07-07 신규
```

### 블로그 40개 (`/blog/`)
nav.js BLOGS 배열에서 전체 목록 관리. 2026-07-07~10 신규/변경:
- `how-long-to-cook-chicken-thighs.html` (신규, 07-07)
- `how-to-calculate-cooking-time.html` (신규, 07-07)
- `average-cost-of-a-home-cooked-meal.html` (신규, 07-10)

### 기타 페이지
- `blog/index.html` — 블로그 메인 (검색 기능 포함)
- `about.html`, `contact.html`, `privacy-policy.html`
- `sitemap.xml`, `robots.txt`, `llms.txt`, `CNAME`

### 개수 검증 (반드시 최신 clone에서 재확인할 것)
```bash
echo "tools: $(ls tools/*.html | grep -v index.html | wc -l)"       # 16
echo "blogs: $(ls blog/*.html | grep -v index.html | wc -l)"        # 40
echo "sitemap: $(grep -c '<loc>' sitemap.xml)"                      # 62 (16+1 + 40+1 + 4정적페이지)
echo "nav.js TOOLS: $(sed -n '/const TOOLS/,/];/p' assets/js/nav.js | grep -c 'url:')"   # 16
echo "nav.js BLOGS: $(sed -n '/const BLOGS/,/^];/p' assets/js/nav.js | grep -c 'url:')"  # 40
```
이 5개 숫자가 서로 안 맞으면 드리프트가 생긴 것 — 바로 잡고 넘어갈 것.

---

## 3. 사이트 구조 변경 이력

### 2026-06-27: 네비게이션 구조 변경
- PC 헤더: Tools ▾ / Blog ▾ 드롭다운 → 단순 링크(`/tools/`, `/blog/`)로 변경
- 모바일 헤더: 드롭다운 유지 + "View All" 링크 추가
- footer: 섹션별 "View All" 링크 추가

### 2026-06-27: tools/index.html 신설
- nav.js TOOLS 배열 기반 클라이언트 사이드 검색. 신규 툴 추가 시 TOOLS 배열 + `TOOL_ICONS` 오브젝트 둘 다 추가해야 함.

### 2026-07-07: PDF 다운로드 기능 추가 (5개 툴)
대상: `recipe-multiplier`, `meal-cost-calculator`, `cooking-time-calculator`, `cost-per-serving`, `meat-temperature-guide`.
- **방식**: `window.print()` 기반. 버튼 클릭 시 JS가 결과 영역을 클론해서 `#pdf-overlay` div로 body에 붙이고, `@media print`가 그 overlay만 보이게 함. 인쇄 후 `afterprint` 이벤트에서 overlay 제거.
- **시행착오 기록** (다음에 비슷한 거 만들 때 반복하지 말 것): `visibility:hidden`+`position:absolute` 조합 → 빈 페이지 발생. `position:fixed` → 여러 페이지에 반복 출력됨. `display:none !important` → CSS 특이도 문제로 안 먹힘. **최종적으로 JS로 직접 DOM에서 overlay를 만드는 방식만 안정적으로 작동함.**
- meat-temperature-guide는 결과값(선택한 고기 온도)이 있으면 차트 위에 같이 출력, 없으면 차트만 출력.
- 나머지 11개 툴(단순 변환기류)은 PDF 버튼 불필요하다고 판단해서 적용 안 함 — 앞으로도 안 할 것.

### 2026-07-09~10: 반응형 테이블 시스템 전면 구축 (`nav.js` + `style.css`)
- **최종 방식: 순수 가로 스크롤** (카드 스택 방식은 시도했다가 명시적으로 되돌림 — 아래 참고)
- `nav.js`의 공통 `DOMContentLoaded` 핸들러 안에 IIFE로 구현: `main` 안의 모든 `<table>`을 자동으로 `.table-scroll-wrap` div로 감싸고, 왼쪽에 `position:sticky`로 고정되는 "⇄ Scroll to see more" 힌트 배지를 붙임.
- 테이블이 실제로 넘칠 때만 힌트 표시 (`table.scrollWidth > wrap.clientWidth`로 측정). **웹폰트 로딩 전에 측정하면 오탐 발생** — `requestAnimationFrame` 이중 호출 + `document.fonts.ready` + 400ms 폴백 타임아웃으로 재측정하도록 처리함.
- 테이블 사이징: `width:100%` + **컬럼 수 기반 px 단위 min-width** (컬럼당 90px, 최소 360px). `min-width:100%`만 쓰면 좁은 화면에서 그냥 다 구겨 넣고 끝나버리므로 반드시 px 단위로 여유를 줘야 함.
- 값 셀은 인라인 `text-align`이 이미 있으면 그대로 두고, 없으면 JS가 첫 컬럼 제외 가운데 정렬 기본 적용.
- **시도했다가 되돌린 것: 모바일에서 행을 카드로 세로 쌓는 방식** (`@media max-width:700px`에 thead 숨기고 각 행을 `data-label` 붙은 카드로 변환). 사용자가 명시적으로 거부하고 순수 스크롤 방식으로 되돌리라고 지시함 (커밋 `ae37435`→`ce2eafd`). **다시 카드 방식 제안하지 말 것.**
- 표 헤더 긴 단어("Tablespoons", "Ounces", "Milliliters", "Teaspoons") 축약(Tbsp/Oz/mL/Tsp)도 병행 적용해서 애초에 스크롤 필요성을 줄임.
- 기존에 파일별로 수동으로 `<div style="overflow-x:auto;">` 감싸놨던 7개 파일은 이 공통 시스템으로 대체되면서 중복 래핑 방지를 위해 정리함.
- **PDF 인쇄 시**: `@media print`에서 `.table-scroll-wrap { overflow:visible !important; }` 처리해서 PDF에는 표 전체가 잘리지 않고 다 나옴.

### 2026-07-09~10: 사이트 전체 콘텐츠 품질 감사 및 버그 수정
자세한 내용은 6번(SEO 진행 이력) 참고. 핵심만:
- **sitemap.xml에 `lastmod` 태그가 0개였던 버그 발견 및 수정** (구글이 크롤 스케줄링에 실제로 쓰는 유일한 필드인데 아예 없었음). 이후 모든 페이지 추가/수정 시 lastmod 갱신은 필수 체크리스트 항목으로 승격.
- **FAQ 섹션이 통째로 복사-붙여넣기되어 중복된 버그, 12개 파일에서 발견 및 수정** (`salmon`, `shrimp`, `pound-of-flour`, `cup-of-rice`, `meal-prep-cost-for-a-week`, `measure-butter`, `cooking-time-calculator`, `cost-per-serving`, `egg-converter`, `meat-temperature-guide`, `oven-temp-converter`, `recipe-multiplier`). 이 중 `cost-per-serving`, `egg-converter`는 이미 색인된 페이지였음 — 즉 색인 여부와 무관한 사이트 전체 품질 문제였음. **새 파일 만들 때 기존 내용 확인 없이 이어붙이지 않도록 계속 주의.**
- **FAQ가 "Try our tool" CTA 박스 안에 잘못 중첩되어 본문(`blog-content`) 밖으로 밀려나 있던 구조 버그, 2개 파일에서 발견 및 수정** (`cooking-measurement-guide`, `meat-cooking-temperatures-explained`). 이 경우 FAQ가 단어수 집계에서도 아예 빠져있었음.
- **분량 기준 상향: 600단어 → 800~1200단어.** 600은 폐기됨. 억지로 채우지 말고 실질 정보(예시, FAQ 깊이, 실수 사례)로 채울 것. 44개 미색인 대상 페이지 전수 조사해서 전부 800+ 확보 완료.
- `raw-to-cooked-weight.html`에 빠져있던 법적 disclaimer(영양/칼로리 관련) 추가 완료.
- 모바일에서 폼 입력 그리드가 고정 2열이라 반응형 깨지던 버그, 6개 파일에서 발견 및 수정 (`egg-converter`, `butter-converter`, `cooking-time-calculator`, `raw-to-cooked-weight`, `weight-converter` — `meat-temperature-guide`는 결과 숫자 박스라 2열 유지해도 문제없다고 판단해 그대로 둠).

### 2026-07-13: 정기 점검 — GSC/GA 분석 + FAQPage 구조화 데이터 전체 적용
- **GSC 3개월 데이터(쿼리 355개 전수 확인)**: 클릭 0건 지속. 노출은 1,200회+ 있으나 대부분 쿼리가 순위 50~100위권이라 CTR 0%. 예외적으로 `cost-per-serving.html`(8.64위), `blog/how-to-reduce-a-recipe.html`(9.25위), `blog/tablespoon-to-teaspoon-guide.html`(8.17위)은 1페이지권인데 노출 자체가 6~12회뿐이라 클릭이 안 잡힘 — 콘텐츠 문제가 아니라 절대 볼륨 문제. 이 페이지들에 손댄 건 없음, 그냥 관찰 기록.
- **GA4 4주 데이터**: 세션 129(Direct 85 / Organic 33 / Referral 7), page_view 482. Organic Search 세션 33인데 GSC 클릭은 0 — Bing 등 비-구글 검색엔진이 GA "Organic Search"에 섞여있을 가능성 높음. 실질적으로 구글 유입은 거의 없다고 봐야 함.
- **신규 콘텐츠 후보 검토** (기존 파일 대조 완료, 전부 이미 커버됨 → 작업 없음): 치킨 허벅지 온도 클러스터(`blog/how-long-to-cook-chicken-thighs.html`에 165°F FAQ로 이미 커버), half-a-recipe 계열(`blog/how-to-reduce-a-recipe-by-half.html` 이미 존재), stove-top-stuffing/sous-vide/osrs(기존에 기각된 노이즈, 재확인만 함).
- **신규 툴 후보 3개 웹서치로 경쟁도 확인 후 전부 기각**: 베이킹 팬 사이즈 변환기(Food Network/omnicalculator/miniwebtool/bakingscalepro 등 전용 계산기 다수 선점), 라이스-워터 비율 계산기(omnicalculator/goodcalculators/gigacalculator 등 다수), 유닛프라이스/파운드당 가격 계산기(omnicalculator/**inchcalculator**(이미 회피 리스트)/calculator.academy 등 — 요리 특화가 아닌 범용 쇼핑 계산기라 포지셔닝도 안 맞음). **앞으로 이 3개는 다시 제안하지 말 것.**
- **보강 작업으로 방향 전환**: 콘텐츠 갭도 새 툴도 근거가 약해서, 사용자 지시로 색인 관련 보강 작업 실행. 확인해보니 FAQ 섹션이 있는 56개 페이지(블로그 39 + 툴 17) **전부 FAQPage 구조화 데이터가 없었음** — 신규 발견. 기존 h2("Frequently Asked Questions") + h3/p 쌍 구조에서 Q&A를 파싱해 56개 파일 전부에 FAQPage JSON-LD 블록을 기존 스키마 바로 뒤에 추가(스크립트로 일괄 처리, `mainEntity` 3~9개씩). 블로그 파일은 기존 Article 스키마의 `dateModified`도 07-13으로 갱신. sitemap.xml lastmod도 해당 56개 URL 전부 07-13으로 갱신. **본문 텍스트는 전혀 건드리지 않음 — 순수 구조화 데이터 추가만.**
- 작업 후 검증: 56개 파일 전체 JSON-LD 파싱 성공, div 밸런스 이상 없음, sitemap XML 유효성 통과, 고아 페이지(내부링크 2개 미만) 0건 확인.
- **주의**: FAQ 리치 결과는 구글이 2023년부터 대부분 사이트에 노출 제한을 걸어놔서 SERP에서 바로 안 보일 수 있음 — 리치스니펫보다는 구조화 데이터로 콘텐츠 이해도를 높이는 보강 성격. 리치 결과 노출 여부는 다음 세션에서 GSC "향상" 리포트로 확인해볼 것.

### 2026-07-11: mywellnesscalc.com 교차 내부링크
- `mywellnesscalc.com`에서 이미 우리 사이트로 링크 걸어놓은 상태(`protein-calculator.html`→`meal-cost-calculator.html`, `macro-calculator.html`→`weekly-meal-prep-cost-calculator.html`).
- 반대 방향 링크를 `tools/meal-cost-calculator.html`, `tools/weekly-meal-prep-cost-calculator.html`의 "Related Tools & Guides" 리스트에 추가 완료 (`target="_blank" rel="noopener"`, 링크 텍스트에 "(MyWellnessCalc)" 명시).
- 앞으로 이 두 사이트 간 링크 교환이 더 있을 수 있음 — 요청 오면 기존 리스트 스타일(인라인 style, → 화살표) 그대로 맞춰서 추가.

---

## 4. 신규 페이지 추가 시 필수 체크리스트

### 공통 (툴/블로그 공통)
- [ ] HTML 파일 작성 (`/tools/` 또는 `/blog/` 폴더)
- [ ] `<head>`에 JSON-LD Schema 추가 (툴→`WebApplication`, 블로그→`Article`)
- [ ] AdSense 코드 삽입 (`<head>` 안, 모든 페이지 공통)
- [ ] `nav.js` TOOLS 또는 BLOGS 배열에 추가
  - 블로그는 `desc` 필드 반드시 채울 것 (검색 정확도 직결)
  - 신규 추가 시 `date` = 추가일
- [ ] **`sitemap.xml`에 URL 추가 + `lastmod` 반드시 포함** (2026-07 초까지 이게 통째로 빠져있던 버그가 있었음 — 다시 빠뜨리지 말 것)
- [ ] `llms.txt`에 항목 추가
- [ ] `index.html`(홈) 툴 카드 섹션에 카드 추가 (툴인 경우만) + 개수 숫자(`stat-num`) 갱신
- [ ] `tools/index.html`의 `TOOL_ICONS` 객체에 신규 툴 아이콘 추가 (툴인 경우만)
- [ ] **내부 링크 최소 2곳 확보**: 관련된 기존 블로그/툴 본문에 "Related Guides"(블로그) 또는 "Related Tools & Guides"(툴) 형태로 역방향 링크 추가
- [ ] **분량 800~1200단어** (억지로 채우지 않기, FAQ 3개+환산표+실질정보로 자연스럽게 도달)
- [ ] **FAQ 섹션은 `blog-content` div 안에, 한 번만** — 복사-붙여넣기로 중복되거나 CTA 박스 안에 잘못 중첩되지 않도록 작성 후 반드시 확인
- [ ] Search Console에 sitemap 재제출 (사용자가 직접 수행)

### 보강 작업 시 추가
- [ ] `nav.js` 해당 항목 `date`를 보강일로 갱신
- [ ] JSON-LD `dateModified` 업데이트
- [ ] **`blog-meta` 읽기시간(`X min read`) 텍스트를 실제 늘어난 분량 기준으로 재계산해서 갱신** (사이트 관행상 약 140~150 words/min 페이스 사용 — 이거 빠뜨리기 쉬움, 2026-07-10에 실제로 놓쳤다가 나중에 잡음)
- [ ] `llms.txt` 설명에 새로 추가된 핵심 내용이 있으면 설명 문구도 갱신

### 작업 완료 후 항상 실행할 검증 (스크립트로)
```bash
# div 밸런스
opens=$(grep -o "<div" FILE | wc -l); closes=$(grep -o "</div>" FILE | wc -l)

# JSON-LD 유효성
python3 -c "import re,json; html=open('FILE').read(); m=re.search(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL); json.loads(m.group(1))"

# sitemap XML 유효성
python3 -c "import xml.etree.ElementTree as ET; ET.parse('sitemap.xml')"

# 고아 페이지 체크 (내부링크 2개 미만이면 고아)
for f in blog/*.html; do name=$(basename $f .html); count=$(grep -rl "$name" blog/*.html tools/*.html index.html 2>/dev/null | grep -v "/$name.html" | wc -l); [ "$count" -lt 2 ] && echo "$count $name"; done
```

---

## 5. HTML 작성 규칙

### 툴 페이지 필수 구성
1. `<head>` — title, description, canonical, AdSense 코드, JSON-LD WebApplication Schema
2. 툴 본체 (계산기 UI) — input 클래스는 `form-group` (**input-group 아님**)
3. 폼 입력이 그리드(2열 이상)면 **반드시 모바일 미디어쿼리로 1열 전환** (2026-07 초에 6개 파일에서 이거 누락돼서 모바일 깨졌던 적 있음 — 클래스명 붙이고 `@media(max-width:600px){ .클래스 { grid-template-columns:1fr !important; } }` 패턴 사용)
4. Related Tools & Guides 섹션 (내부 링크 2개 이상)
5. How to Use 섹션
6. **FAQ 섹션 최소 3개** (필수, 중복 생성 금지, CTA 박스 안에 중첩시키지 말 것)
7. **단어수 800~1200자**

### 블로그 페이지 필수 구성
1. `<head>` — title, description, canonical, AdSense 코드, JSON-LD Article Schema
2. `<span class="blog-card-tag">카테고리</span>`
3. `<h1>` 제목
4. `<div class="blog-meta">` 날짜 및 읽기 시간 (보강 시 갱신 잊지 말 것)
5. `<div class="blog-content">` 본문
   - 800~1200단어
   - 환산표, 설명 포함 (표는 자동으로 반응형 처리됨, 별도 작업 불필요 — nav.js가 전역 처리)
   - 관련 툴 내부 링크
   - **FAQ 섹션 최소 3개** (필수)
6. Related tool CTA 버튼 + Related Guides 박스 (블로그↔블로그 링크)

### 표(table) 작성 시
- 별도 반응형 처리 코드 작성 불필요 — `nav.js`가 `main` 안의 모든 `<table>`을 자동으로 감싸서 처리함
- 헤더는 짧게 쓰는 게 좋음 (Tbsp/Tsp/mL/Oz 같은 축약 선호, 완전한 단어는 좁은 화면에서 스크롤을 더 자주 유발함)
- 인라인 `style="width:100%..."`를 넣어도 JS가 알아서 무력화하고 재계산하니 문제없음

### AdSense 코드 (모든 HTML `<head>` 안에 삽입)
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5592663499707350" crossorigin="anonymous"></script>
```

---

## 6. nav.js 핵심 구조

```javascript
const TOOLS = [
  { name: "툴 이름", url: "/tools/파일명.html" },
];

const BLOGS = [
  { name: "블로그 제목", url: "/blog/파일명.html", desc: "설명", date: "2026-07-10" },
];
```

- PC 헤더: `<a href="/tools/">Tools</a>`, `<a href="/blog/">Blog</a>` 단순 링크
- 모바일 헤더: TOOLS/BLOGS 기반 드롭다운 유지 + 상단 "View All" 링크
- footer: 각 섹션 상위 6개 + "View All" 링크
- **DOMContentLoaded 핸들러 안에 반응형 테이블 자동 래핑 IIFE 포함됨** (3번 항목 참고) — 이 부분은 건드릴 일 거의 없음, 새 테이블 만들 때 자동 적용됨

---

## 7. SEO 진행 이력 및 현재 상태

### 색인 현황 추이
| 날짜 | 미색인 | 색인됨 | 비고 |
|------|--------|--------|------|
| 06-18 | - | - | GSC 등록 초기 |
| 07-04 | 53 | 9 | 최초 정밀 점검 |
| 07-10 | (재확인 필요) | (재확인 필요) | 이번 세션 작업들이 아직 반영 안 됐을 가능성 높음 (크롤링 지연) |
| 07-13 | 53 | 9 | Coverage 차트가 06-30 데이터까지만 나옴(크롤 지연 지속) — 06-30 스냅샷 기준 07-04와 동일. 단, Performance(검색실적) 리포트엔 13개 URL이 노출 데이터를 갖고 있어 실제로는 06-30 이후 더 인덱싱됐을 가능성 있음. 클릭수는 3개월간 0건 지속(노출 대부분 순위 50~100위권). |

**핵심 발견 (07-07)**: sitemap.xml에 `lastmod` 태그가 전무했음. 구글은 `changefreq`/`priority`를 공식적으로 무시하고 `lastmod`만 크롤 스케줄링에 사용하는데, 이게 아예 없어서 구글이 페이지 갱신 여부를 전혀 알 수 없는 상태였음. `nav.js`의 블로그별 날짜 데이터를 이용해 전체 lastmod 채워 넣음. **이후 신규/보강 작업마다 lastmod 갱신은 항상 같이 처리할 것.**

**PetPawCalc(자매 프로젝트, Jekyll 기반)와 비교했을 때 우리 쪽이 불리했던 기술적 이유**: Jekyll의 `jekyll-sitemap` 플러그인이 포스트 date front matter에서 자동으로 lastmod를 생성해주는데, 우리는 손으로 sitemap을 관리하다 보니 이 필드가 통째로 빠졌던 것. CookingCalcs는 순수 HTML이라 이런 자동화가 없으므로 **사람(Claude)이 매번 수동으로 챙겨야 함**.

**니치 자체가 포화 상태**: "cookingcalcs.com"으로 직접 검색해도 우리 사이트가 안 뜨고 `cookcalcs.com`, `kitchencalcs.com`, `calckitchen.com`, `mykitchencalculator.com` 같은 이름까지 비슷한 경쟁 사이트들이 먼저 나옴. 이들도 전부 우리와 동일한 포맷(15~20개 계산기 + 변환표 + FAQ). 신규 콘텐츠 기획 시 "남들과 똑같은 방식"이 아니라 **차별화 포인트가 있는지**를 먼저 따질 것.

### GSC 데이터 기반 실제 발견/수정 사례 (07-10, GSC Coverage + Performance CSV 전체 export 정독 후)
아래는 **쿼리 데이터를 근거로 실제 콘텐츠 갭을 찾아 수정한 기록** — 앞으로 GSC 데이터 받으면 이런 식으로 진행할 것 (요약 몇 줄만 보고 넘어가지 말고, CSV 전체를 끝까지 읽을 것 — 07-10에 사용자가 "따로 논다"고 지적한 이유가 이거였음):

- "medium eggs to large eggs" 계열 쿼리(3~5개 변형) → `how-to-substitute-egg-sizes.html`에 medium→large 역방향 표 + 정확 문구 FAQ 추가
- "medium eggs to large eggs conversion uk" → 같은 파일에 UK/EU vs US 계란 사이즈 비교표 추가 (**UK가 노출 기준 2위 국가**라 이 작업 우선순위가 맞았음, 국가별 데이터도 꼭 확인할 것)
- "how many jumbo eggs equal large eggs" → jumbo→large 역방향 정보 + FAQ 추가
- "rolled oats" "cups per pound" (이미 순위 6.5로 거의 1페이지) → `how-many-grams-in-a-cup-of-oats.html`에 파운드당 컵수 표 추가 (본문에 "pound" 언급이 0번이었음)
- "cooking time for 10 lb turkey breast" 등 → `how-long-to-cook-turkey-breast.html` 무게표가 8-9lb에서 끊겨있었음, 10-12lb 행 추가 (인접 행들의 분당 비율로 역산해서 계산, 대충 넣지 않음)
- "boneless turkey breast internal temperature" → 내용은 있었는데 정확히 그 문구("internal temperature")를 쓴 FAQ가 없었음, 추가
- "lamb loin chop temperature" 등 10개 넘는 변형 쿼리 클러스터 → 확인해보니 이미 전용 온도표가 있어서 **콘텐츠 문제가 아니라 순위/권위도 문제로 판단, 추가 작업 안 함** (모든 쿼리 신호가 콘텐츠 갭인 건 아님 — 이미 커버된 건 스킵하는 판단도 중요)
- "temperature lamb chops" → 정확 문구 FAQ 1개 추가
- "how many lamb chops per person" → 인분수 커버리지 0이었음, FAQ 추가
- "average cost of a home cooked meal" / "how much is a meal" 등 클러스터(순위 38~65, 다른 쿼리 대비 훨씬 양호한데 전용 콘텐츠 없었음) → 신규 블로그 `average-cost-of-a-home-cooked-meal.html` 작성 (경쟁도 web_search로 확인 후 진행 — 회피 대상 대형 사이트 없음 확인)

### 신규 콘텐츠 후보로 검토했으나 기각한 것 (다시 제안하지 말 것)
- **"sous vide calculator"**: Anova, ChefSteps 등 브랜드 파워 있는 대형 전용 사이트가 이미 장악. 진입장벽 높음, 노출도 낮음(2회). 기각.
- **"stove top stuffing water ratio"**: 경쟁 자체는 약하지만 특정 브랜드(Kraft) 제품 레시피 정보라 사이트 포지셔닝(계산기/변환)과 안 맞고 노출도 1~2회로 노이즈 수준. 기각.
- **"air fryer time/temp converter"**: airfryercalculator.com, inchcalculator(회피 대상 리스트에 이미 있음) 등 전용 사이트 다수 선점. 기각.

### 노이즈로 판단해 무시한 쿼리
- "osrs cooking calculator" — Old School RuneScape(게임) 관련, 완전히 무관한 우연 매칭. 무시.

### 리디렉션 이슈 (사용자 지시로 보류)
GSC Coverage에 "리디렉션이 포함된 페이지 4개, 검증 실패" 항목이 07-10 데이터에 새로 나타남. CSV export엔 구체적 URL이 없어서 원인 파악 못 함 (GSC UI에서 직접 클릭해야 URL 리스트 나옴). **사용자가 "신경쓰지 마라"고 명시적으로 지시함 — 먼저 나서서 다시 꺼내지 말 것.** 사용자가 먼저 언급하면 그때 진행.

---

## 8. 작업 워크플로우 (2026-07-11부터 완전히 변경됨 — 반드시 숙지)

### 8-1. GitHub 직접 접근 (zip 방식 완전 폐기)
**이제 zip 파일 주고받지 않는다.** 사용자가 매 작업 세션마다 **GitHub Personal Access Token을 채팅으로 직접 전달**하고, Claude가 그 토큰으로:
```bash
git clone https://github.com/canghun13/cookingcalcs-.git repo
cd repo
# ... 파일 수정 ...
git config user.email "canghun13@naver.com"
git config user.name "canghun13"
git add -A && git commit -m "..."
git push https://x-access-token:${TOKEN}@github.com/canghun13/cookingcalcs-.git main
```
직접 clone → 수정 → commit → push까지 전부 처리한다.

### 8-2. 토큰 취급 주의사항
- 토큰은 **매번 새로 발급**받아서 전달됨 (한 세션에서만 유효, 작업 끝나면 사용자가 revoke함).
- 토큰 자체를 응답 텍스트에 반복해서 노출하지 말 것(불필요하게 노출 안 해도 bash 명령에서 변수로 쓰면 됨).
- 토큰 받으면 먼저 `curl -H "Authorization: token $TOKEN" https://api.github.com/user`로 인증/권한(push 가능 여부) 확인 후 진행.
- 세션 시작 시 토큰이 없으면 절대 있는 척하지 말 것 — 실제로 준 적 없는데 검증하려 든 적이 있었고 사용자가 지적함.

### 8-3. 작업 전 항상 최신 상태부터 확인
매번 새로 clone해서 시작할 것 (이전 세션의 로컬 상태를 재사용하지 말 것 — 최신 push 반영 여부를 매번 확실히 하기 위함).

### 8-4. 커밋 메시지 규칙
- 무엇을, 왜 고쳤는지 구체적으로 남길 것 (다음 세션의 Claude가 이 로그만 보고도 히스토리를 이해할 수 있어야 함).
- 이번 세션 커밋 메시지들이 실제로 상세하게 잘 작성된 편이니 그 톤/디테일 수준을 유지할 것.

### 8-5. 파일 산출물 관련
- **더 이상 zip으로 파일을 사용자에게 전달할 필요 없음.** push까지가 작업의 끝.
- 상태 정리 문서(이 파일 같은 것)를 요청받았을 때만 md 파일로 만들어서 전달. **사용자가 요청하지 않았는데 임의로 정리 파일 만들지 말 것** — 이걸로 한 번 지적받은 적 있음 ("파일은 또 왜 만드냐").

### 8-6. 작업 진행 판단 기준 (이 세션에서 반복된 패턴)
- 이 사용자는 "정리부터 하자"고 스스로 말할 때도 있고, "계획 잡지 말고 바로 진행해"라고 할 때도 있다. **직전 메시지의 명시적 지시를 따를 것** — 기본값으로 항상 계획부터 잡으려 하면 답답해하고, 반대로 항상 바로 실행하면 신중하지 못하다고 화낼 수 있다.
- **"방만한 태도"라는 표현이 나오면 위험 신호** — "시간이 지나면 해결된다"는 식의 설명은 데이터로 뒷받침되지 않으면 하지 말 것. 반드시 구체적으로 뭘 확인했고 뭘 고쳤는지로 답할 것.
- 작업 결과를 보고할 때 **과장하지 말 것**. "49개 중 2개 고쳤다"를 큰 진전인 것처럼 말했다가 지적받은 적 있음. 규모 대비 실제 처리한 비율을 정직하게 전달할 것.
- 자료(GSC export 등)를 받으면 **요약만 보지 말고 전체 행을 다 읽을 것**. 260줄짜리 쿼리 CSV를 60줄만 보고 결론 냈다가 지적받음.

### 8-7. mywellnesscalc.com 관련 요청 처리
- 사용자가 두 사이트를 같이 운영 중. `mywellnesscalc.com` 관련 교차 링크나 협업 작업 요청이 오면, 기존에 적용한 스타일(인라인 `style="color:var(--tomato-dark); font-weight:500;"`, `→` 화살표, 외부 링크는 `target="_blank" rel="noopener"` + 링크 텍스트에 사이트명 명시)을 그대로 따를 것.

---

## 9. SEO 전략 (변경 없음, 계속 유효)

- 롱테일 키워드 타겟 — 대형 사이트가 일반 페이지로만 대응하는 구체적 질문형
- **회피 대상 대형 사이트**: allrecipes, epicurious, calculatorsoup, omnicalculator, inchcalculator
- 신규 콘텐츠 제안 전 반드시 web_search로 경쟁 강도 확인 (7번 "기각한 후보" 참고 — 실제로 이 과정에서 3개 걸러냄)
- **thin content 절대 금지**: 환산표 + 설명 + FAQ 필수, 800~1200단어 (600에서 상향됨)
- affiliate 홀더(빈 링크/배너) 미리 넣지 말 것 — AdSense 안정화 전까지 시작 금지
- 신규 콘텐츠 기획 시 "이미 존재하는 유사 사이트들 대비 뭐가 다른지"를 먼저 확인 (니치 포화 상태이므로)

---

## 10. 디렉토리 등록 현황 (2026-06-18 기준, 변동 없음 — 재확인 필요 시 사용자에게 요청)

| 사이트 | 상태 |
|--------|------|
| SideProjectors, Uneed, Launching Next, MicroLaunch, Smol Launch, Indie Hackers, dev.to, OpenHunts, AlternativeTo, f6s.com, Peerlist, startupa.ge, LaunchIgniter, StartupBuffer, Startup Stash, PromoteProject | 완료 |
| NewTool.site, FoundrList, Fazier, Findly.tools, twelve.tools | 완료 (뱃지 홈에 삽입) |
| mrfreetools.com, PitchWall(뱃지 삽입), TinyLaunch, 10words.io | 완료 |
| SaaSHub | 심사 대기 중 (07-04 기준, 재확인 필요) |

---

## 11. 정기 업데이트 주기

| 요일 | 작업 |
|------|------|
| 토요일 | 신규 콘텐츠 작업 (블로그/툴, 그때그때 자료 기반 결정) |
| 일요일 | GA + Search Console 분석, 보강 작업, 색인 상태 점검 |

※ 요일 고정보다 사용자가 자료(GA/GSC 스크린샷 or CSV export + 새 GitHub 토큰)를 들고 오는 시점에 맞춰 진행하는 패턴이 계속됨. **주간 정기 작업과 별개로 "추가 작업"을 요청하는 경우도 있음** (2026-07-11 사례: 주간 작업 끝난 후 남은 토큰으로 GSC 데이터 기반 추가 보강 요청) — 이런 경우 별도 세션으로 취급하고 동일한 검증 절차를 그대로 적용할 것.

---

## 12. 수익화 계획 (변경 없음)

- 1단계 AdSense: 코드 삽입 완료, 심사 상태는 사용자 확인 필요
- 2단계 Affiliate: 트래픽 안정화 전까지 미시작, affiliate 홀더 미리 넣지 말 것

---

## 13. 디자인 시스템 (변경 없음)

- 색상: 토마토 레드 + 샌드 베이지
- CSS 변수: `--tomato`, `--tomato-light`, `--tomato-dark`, `--sand`, `--sand-dark`, `--border`, `--mid`, `--muted`, `--ink`, `--white`, `--radius-lg`
- 폰트: Playfair Display(헤딩), Plus Jakarta Sans(본문) — **웹폰트 로딩 타이밍이 반응형 테이블 측정 로직에 영향 준 적 있음, 참고**
- 툴 input 클래스: `form-group` (**input-group 아님**)
- 블로그 카드 클래스: `blog-card`, `blog-card-body`, `blog-card-desc`, `blog-card-footer`
- Related Guides 박스 표준 패턴:
```html
<div style="margin-top:2rem; padding:1.25rem; background:var(--tomato-light); border-radius:var(--radius-lg);">
  <h3 style="font-family:'Playfair Display',serif; margin-bottom:0.75rem;">Related Guides</h3>
  <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem;">
    <li><a href="/blog/파일명.html" style="color:var(--tomato-dark); font-weight:500;">→ 제목</a></li>
  </ul>
</div>
```
- PDF 저장 버튼 표준 패턴 (5개 툴에 적용됨, 3번 항목 참고):
```html
<button class="pdf-btn" onclick="printToPDF('영역ID')" style="display:flex; align-items:center; gap:0.5rem; background:none; border:1.5px solid var(--tomato); color:var(--tomato-dark); border-radius:8px; padding:0.5rem 1rem; font-size:0.875rem; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; font-weight:500;">⬇ Save as PDF</button>
```

---

## 14. 기술 스택 (변경 없음)

- 순수 HTML + CSS + JS (프레임워크 없음)
- GitHub Pages 정적 호스팅, Cloudflare DNS
- Google Analytics GA4 / Google Search Console
- DB 없음 — 모든 데이터 JS 하드코딩 (`nav.js`)

---

## 15. 법적 이슈

영양/칼로리 관련 툴에는 하단에 disclaimer 필수:
> "For informational purposes only. Not a substitute for professional nutritional advice."

**`raw-to-cooked-weight.html`에 이미 적용 완료** (2026-07-04 문서에선 미적용으로 남아있던 항목, 07-07에 처리함). 앞으로 영양/칼로리 관련 신규 콘텐츠 만들 때 이 disclaimer 빠뜨리지 말 것.

---

## 16. 새 세션 시작 시 체크리스트

1. GitHub 토큰 받았는지 확인 (없으면 요청하지 말고, 사용자가 필요시 먼저 줌)
2. 토큰 받으면 `git clone`으로 최신 상태 확보, 개수 검증 스크립트(3번 항목) 실행해서 드리프트 확인
3. 사용자가 GA/GSC 자료(스크린샷 또는 CSV export) 주면, **전체를 끝까지 다 읽고** 분석 (요약만 보고 넘어가지 말 것)
4. 작업 전 "정리만" 요청인지 "바로 시작" 요청인지 직전 메시지 기준으로 명확히 판단
5. 신규 콘텐츠 제안 전 키워드 경쟁도 web_search로 확인
6. 작업 완료 후 4번(체크리스트) 항목 빠짐없이 수행 — 특히 sitemap lastmod, blog-meta 읽기시간, 내부링크 2곳
7. 커밋 → push까지 완료. zip 전달 불필요.
8. 완료 후 간결하게 보고. 과장 금지, 구체적 수치로.
9. 정리 문서(이 파일 같은 것)는 사용자가 명시적으로 요청할 때만 생성.