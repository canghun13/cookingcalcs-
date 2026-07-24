# CookingCalcs 현황 및 인수인계 (2026-07-24 기준)

이 문서는 2026-07-20 버전 인수인계 문서를 기반으로, 이후 진행된 모든 작업 내역을 반영해 갱신한 버전입니다. 새 세션에서는 이 문서만 보고 바로 작업 이어가면 됩니다.

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

### 툴 17개 (`/tools/`)
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
slow-cooker-converter.html              ← 2026-07-16 신규
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
echo "tools: $(ls tools/*.html | grep -v index.html | wc -l)"       # 17
echo "blogs: $(ls blog/*.html | grep -v index.html | wc -l)"        # 42
echo "guides: $(ls guides/*.html | grep -v index.html | wc -l)"     # 4 (2026-07-18 신설, 4개 발행)
echo "sitemap: $(grep -c '<loc>' sitemap.xml)"                      # 70
echo "nav.js TOOLS: $(sed -n '/const TOOLS/,/];/p' assets/js/nav.js | grep -c 'url:')"   # 17
echo "nav.js BLOGS: $(sed -n '/const BLOGS/,/^];/p' assets/js/nav.js | grep -c 'url:')"  # 42
echo "nav.js GUIDES: $(sed -n '/const GUIDES/,/^];/p' assets/js/nav.js | grep -c 'url:')" # 4
```
이 숫자들이 서로 안 맞으면 드리프트가 생긴 것 — 바로 잡고 넘어갈 것.

---

## 3. 사이트 구조 변경 이력

### 2026-07-24 (2차): 웹서치로 저경쟁 키워드 재탐색 — cost-per-serving 워드프라블럼 확장
- 사용자가 "웹 검색으로 문서수는 적은데 조회수는 많은 키워드를 직접 찾아보라"고 재지시. web_search로 4개 후보 실사 조사:
  1. `egg substitute liquid conversion`("how many eggs equal 1 cup liquid") — SERP 품질은 약함(Quora, 오래된 포럼, 칼로리 사이트뿐)이지만 확인해보니 **이미 우리 사이트에 커버되어 있었음**(`how-many-eggs-in-a-cup.html`에 液体egg 1:1 치환 FAQ 이미 존재).
  2. `meat per person party calculator` — Calculator Academy, whycalculator.com, letscalculator.com, thekitchn, thedailymeal, sonnysbbq 등 8개+ 이미 장악, 기각.
  3. **`cost per serving word problem worksheet`** — 검색해보니 이 쿼리 계열의 실제 경쟁자는 요리 사이트가 아니라 **수학 워크시트 사이트(Scribd, TES, mathworksheets4kids)**였음. 이게 바로 `cost-per-serving.html`의 "you purchase X at $Y per pound..." 워드프라블럼들이 순위 6~9위를 차지하는 이유 — 요리 콘텐츠 경쟁자가 이 쿼리 패턴을 아예 안 다룸. **이미 검증된 우리만의 저경쟁 구간**이라는 걸 재확인.
  - **사용자가 Bing/Yahoo로 직접 재검증(2026-07-24)**: 두 엔진 모두 동일한 결과(TPT, Scoilnet, weebly, formsbank, ISBE, Scribd 등 전부 학습지/워크시트 계열, 요리 사이트 경쟁자 0). Google/Bing/Yahoo 3개 엔진 교차 확인 완료.
  - **주의할 점(신규 발견)**: 연관 검색어에 "3rd grade", "grade 1", "grade 5" 등 학년 표기가 붙어있어, 이 쿼리들이 초등 수학 커리큘럼(단위가격/비율) 문제이고 실제 검색 주체가 "숙제 답 확인하는 학생"일 가능성이 있음 — 저희 원래 타겟(집에서 요리하는 성인)과 다를 수 있음. 노출/순위는 좋지만 애드센스 클릭률·수익 관점에서 실제 트래픽 품질은 다음 세션에서 지켜볼 것.
  4. 이 발견을 바탕으로 `tools/cost-per-serving.html`의 Worked Example Problems 섹션에 **다른 식재료 4개(치킨브레스트/쌀/연어/다짐육) 워드프라블럼 신규 추가**(기존 치즈/소고기/감자/버터 4개 → 총 8개로 확장). 1260→1414단어. sitemap lastmod 07-24 갱신, div/JSON-LD 검증 통과.
- **패턴 확인**: "$X per pound, Y ounces per serving, cost per serving?" 형태의 소비자수학 워드프라블럼 클러스터는 요리 콘텐츠팜이 건드리지 않는 진짜 블루오션이었음 — 다음에 신규 워드프라블럼형 콘텐츠를 고민할 때는 "요리 사이트가 아니라 수학 워크시트/학습지 사이트가 경쟁자인 쿼리"를 우선적으로 찾아볼 것. 이 패턴을 cost-per-serving 외의 다른 계산기(recipe-multiplier의 배수 워드프라블럼 등)에도 적용할 여지 있음 — 다음 세션 후보.

### 2026-07-24: 첫 클릭 발생 확인 + 신규 갭 재스캔(결과: 없음) + AdSense/제휴 판단권한 이관
- 사용자가 GSC Performance export(07-24 기준, 지난 3개월) + GA4 스크린샷 3장 + CSV 제공. Coverage export는 이번엔 없음(색인 상태는 이번 세션에서 확인 불가).
- **핵심 마일스톤 — 사이트 개설 후 첫 클릭 발생**: 07-20에 1건, 07-21에 1건 (둘 다 미국, 데스크톱 1 + 모바일 1). 페이지별로는 `cost-per-serving.html`(594회 노출, 순위 8.48)과 `cooking-time-calculator.html`(94회 노출, 순위 19.71, CTR 1.06%)에서 발생. 지난 세션들에서 반복 확인되던 "노출은 있는데 클릭 0" 현상이 드디어 깨짐.
- **노출 계속 급증**: 07-21 하루 863회로 역대 최고 경신(직전 최고 07-17 414회). 노출 발생 국가도 90개국 이상으로 확산(직전 세션엔 상위 15개국만 표시됐었음).
- **기기별**: 모바일 평균순위 11.75위(07-20 13.1위 대비 추가 개선, 안정적 1페이지권), 데스크톱은 여전히 61.28위로 부진 — 이 격차는 계속 유지되는 패턴.
- **GA 최고 성과 페이지 = Egg Size Converter**: 최근 28일 조회수 93회로 압도적 1위(2위 홈페이지 86회), 자연 트래픽만 75회. 활성 사용자 30일 기준 100→164명 꾸준히 증가. 리텐션도 7/12-18주 47명으로 최고치 유지 중.
- **신규 콘텐츠 갭 재스캔(rank<80, 노출≥4, 58개 후보 → 자동매칭 실패 39개)**: 상위권 개별 재확인 결과 **전부 이미 커버된 항목** — UK 계란 사이즈(egg-converter.html + how-to-substitute-egg-sizes.html에 이미 상세 테이블/FAQ 존재), 375°F 오븐 변환(oven-temperature-conversion-guide.html에 이미 있음), ½ tbsp(tablespoon-to-teaspoon.html에 이미 있음) 등 — 전부 표현 차이로 인한 자동스캔 오탐이었고 진짜 갭은 0건. **이번 세션은 신규/보강 콘텐츠 작업 없이 분석만 하고 마무리** — 데이터상 억지로 만들 이유가 없었음.
- **AdSense/제휴 판단권한 이관(사용자 지시)**: 애드센스는 07-24 기준 심사 신청 중. 제휴(affiliate) 시작 시점 판단을 이제 Claude가 직접 하기로 함(12번 섹션에 반영) — 사용자 허락을 구하지 않고 데이터 근거로 판단·제안·실행 후 보고하는 방식. 애드센스가 보류/반려되더라도 그 시점 데이터(반려 사유, 트래픽 규모 등) 보고 재판단할 것.
- 사용자가 세션 밖에서 직접 커밋한 배지 2건 확인(`index.html`에 KittyLaunch, Sell With Boost 배지 추가, 07-21/07-22) — 문법 이상 없음, div 밸런스 정상.

### 2026-07-20 (4차): 조리법 매트릭스 잔여 갭 마무리 — steak 에어프라이어 + bacon 그릴 (커밋 예정)
- 3차 완료 후 사용자가 "지금 할 수 있는 건 다 해"라고 지시. 2차 세션에서 발견해뒀던 "how-long-to-cook 시리즈 조리법 매트릭스" 잔여 항목(steak 에어프라이어 없음, bacon 그릴 없음) 마저 처리.
- `blog/how-long-to-cook-steak.html`: "Air Fryer Steak Cook Times" 섹션 신규(400°F, 두께별×굽기별 표, 팬시어/그릴 시간대 사이로 보간 추정). 1006→1125단어.
- `blog/how-long-to-cook-bacon.html`: "Grilled Bacon Cook Times" 섹션 신규(간접열 권장, 플레어업 주의 — lamb-chops 페이지에서 이미 쓴 동일 주의사항 패턴 재사용). 읽기시간 6→8분 갱신(오차 2분 발견해 수정). 909→1201단어.
- dateModified/sitemap lastmod 2개 URL 07-20 갱신. 검증: div/JSON-LD/sitemap/고아페이지 전부 통과.
- **이걸로 07-20(2차)에서 남겨뒀던 "how-long-to-cook 시리즈 조리법 매트릭스" 항목 전부 처리 완료** — salmon(그릴), shrimp(에어프라이어), steak(에어프라이어), bacon(그릴) 4건 전부 반영됨. 다음 세션에서 이 항목 재검토 불필요.

### 2026-07-20 (3차): "경쟁 있어도 롱테일로 뚫어라" 재지시 — 기준 완화 후 신규 툴 1개 + 블로그 1개 실제 발행
- 사용자가 2차 세션의 "7개 후보 전부 기각" 결론에 강하게 반발: "가이드도 안 하고 블로그도 안 하고 툴도 안 하고 전부 포화라고만 하면 말이 안 된다, 롱테일로도 해보고 조금 넓혀도 봐라." **"경쟁자가 0인 아이디어만 통과"라는 기준 자체가 너무 엄격했다고 판단, 기준을 조정**: 경쟁이 어느 정도 있어도(콘텐츠팜 클러스터가 아니라 개별 미디어/범용 계산기 사이트 수준이면) 롱테일 문구량이 많고 사이트 정체성과 맞으면 진행하는 쪽으로 전환.
- **`fresh to dried herb conversion calculator`** 재검토: Omnicalculator, TasteOfHome, ForksOverKnives 등 경쟁 있으나 기존 9번 섹션 회피 리스트의 콘텐츠팜 클러스터와는 무관한 개별 사이트들 — 허브별(바질/로즈마리/타임/오레가노/파슬리/세이지 등 13종) 롱테일 쿼리가 풍부하고, 인터랙티브 계산기 형태 + 사이트 기존 정체성(baking-substitutions 등 환산 계열)과 잘 맞아 진행 결정.
- **신규 툴 발행**: `tools/herb-converter.html`(1067단어) — Fresh↔Dried 양방향, 허브 13종 각각 다른 비율(로즈마리 4:1처럼 목질/고오일 허브는 진하게, 파슬리/세이지 2:1처럼 부드러운 허브는 약하게 — 단일 3:1 규칙 대신 허브별 차등 적용이 차별화 포인트). "허브별 흔한 실수" 섹션(1:1 치환 오류, 조리 시점 오류, 오래된 건조허브, 실란트로/차이브는 건조 비추천) 포함, FAQ 6개.
- **신규 블로그 발행**: `blog/fresh-vs-dried-herbs.html`(1262단어) — "언제 뭘 써야 하는지" 의사결정표(장시간 조리=건조, 가니시/드레싱=생것) + 잘 마르는 허브(오레가노/타임/로즈마리) vs 안 마르는 허브(바질/파슬리/실란트로/차이브) 비교, 보관법, FAQ 5개. herb-converter.html과 상호링크.
- 체크리스트 전항목 반영: `nav.js` TOOLS/BLOGS 배열, `tools/index.html` TOOL_ICONS(🌿), `index.html` 카드 + stat-num 17→18, `llms.txt` Tools/Blog 섹션, `sitemap.xml` 2개 URL(lastmod 07-20), 내부링크(herb-converter 인바운드 4개, fresh-vs-dried-herbs 인바운드 2개 — `tools/baking-substitutions.html` Related 박스에도 추가해서 확보).
- 검증: 개수 정합(tools 18/blogs 43/guides 4/sitemap 72, nav.js 전부 일치), div 밸런스 전체 통과, JSON-LD 파싱 통과, sitemap XML 유효, 고아페이지 0건, 반응형 미디어쿼리 누락 0건.
- **다음 세션 참고 — 기준 조정 기록**: "경쟁자가 있으면 무조건 기각"이 아니라 "콘텐츠팜 클러스터(9번 섹션 회피 리스트)가 아니고, 롱테일 문구량이 있고, 사이트 정체성과 맞으면 진행"으로 판단 기준을 완화함. 다음 세션에서 신규 후보 검토할 때 이 완화된 기준을 기본값으로 쓸 것 — 2차 세션처럼 "경쟁자 존재 = 즉시 기각"으로 되돌아가지 말 것. 다만 9번 섹션의 명시적 회피 리스트(콘텐츠팜 클러스터)에 걸리는 후보는 여전히 기각 유지.

### 2026-07-20 (2차): "공격적으로 신규 진행" 지시 — 신규 후보 7종 전수 경쟁검증 후 전부 기각, 대신 실제 갭 3건 발견해 보강
- 사용자가 revoke는 알아서 하겠다며, "지금 organic search가 오르는 시점이니 롱테일 키워드를 선점해야 한다, 공격적으로 카테고리도 확장해라"고 지시. 1차 세션의 "니치 포화" 결론에 안주하지 말고 신규 후보를 다시 적극적으로 찾아보라는 취지.
- **신규 독립 콘텐츠 후보 7종을 이번 세션에서 직접 web_search로 경쟁 검증 — 7개 전부 기각**:
  1. `meat thawing time calculator`(해동시간 계산기): omnicalculator, agentcalc.com(기존 회피 리스트), mycalculatorsonline.com 등 8개+ 전용 계산기가 이미 장악.
  2. `how long to thaw chicken`(해동 블로그): Perdue, Food Network, The Kitchn 등 대형 브랜드/미디어가 이미 장악 — 계산기뿐 아니라 에디토리얼 프레이밍도 이미 포화.
  3. `why did my cake sink`(케이크 트러블슈팅): KitchenAid, Food Network 등 대형 브랜드가 이미 장악 — "베이킹 트러블슈팅"은 너무 제네릭해서 대형 미디어 영역.
  4. `thermometer calibration`(온도계 캘리브레이션 방법): SDSU/Texas A&M 등 대학 extension·정부기관이 이미 표준 콘텐츠로 장악.
  5. `grams in a cup of brown sugar`(컵당 그램 시리즈 확장): 이미 사이트 자체 `cups-to-grams.html`/`cups-to-grams-guide.html`이 30개 재료(브라운슈가/파우더슈가/코코아파우더 포함)를 이미 커버 중이었고, 외부는 traditionaloven.com, bakeprofit.com, cookingconverter.com 등 전용 사이트가 장악 — 자기잠식 + 외부경쟁 이중으로 기각.
  6. `how long to cook a whole chicken by weight`(기존 "how-long-to-cook" 클러스터의 누락 부위): quickcooktime.com, howlongfor.com, cookrita.com 등 신규 콘텐츠팜 클러스터 + Food Network/BHG/AOL 대형 미디어까지 이중으로 장악.
  7. `US to Australian/UK 계량 변환 가이드`(국가별 트래픽 3-4위 활용): bakefinder.com.au, eightforestlane.com, Nigella.com(셀럽 셰프) 등 9개+ 전용 사이트가 이미 장악.
- **새로 발견해 9번 섹션에 추가할 회피 클러스터**: traditionaloven.com, aqua-calc.com, bakeprofit.com, cookingconverter.com, thebakingcalculator.com(재료 환산), quickcooktime.com, howlongfor.com, cookrita.com, butcherbbq.com(조리시간 계산기 신규 클러스터), justfridge.com, thecalculatedcook.com, howlongtodefrost.com(해동 계산기).
- **결론**: 이번 세션에 한해 직접 검증한 신규 독립 콘텐츠 후보는 0/7 생존 — 3번 섹션에 기록된 기존 9/9 기각과 합치면 사실상 16/16. 니치 포화는 반복된 우연이 아니라 구조적 상태로 재확인. 사용자에게 이 사실을 있는 그대로 보고함.
- **대신 실행한 것 — GSC 쿼리 그물을 순위&lt;100까지 넓혀 전수 재스캔(837개) 후 자동+수동 대조로 진짜 갭 3건 발견**:
  1. `blog/how-long-to-cook-salmon.html`: "Cook Times by Method"에 오븐/팬/에어프라이어/포칭만 있고 **그릴(grill) 조리법이 통째로 빠져있었음** — 연어는 그릴이 매우 흔한 조리법인데 누락. 팬시어 시간 비례로 추정한 그릴 표 추가(¾"=4-5+1-2min, 1"=5-6+2-3min, 1¼"=6-7+2-3min).
  2. `blog/how-long-to-cook-shrimp.html`: 삶기/소테/베이킹/그릴은 있는데 **에어프라이어가 빠져있었음**. 베이킹 시간 대비 오븐→에어프라이어 비율(연어 페이지에서 확인된 약 25% 단축 패턴)을 적용해 추정(Large 5-6min, XL 6-8min, Jumbo 8-10min).
  3. `tools/oven-temp-converter.html`: 기존에 "moderate/hot/very hot oven" 용어는 있었는데 **"slow oven"(300-325°F, 영국 레시피에서 흔한 표현) 단어 자체가 빠져있었음** — 정적 본문 + FAQ(JSON-LD+h3) 3곳에 일관되게 반영.
  4. 그 외 순위&lt;100 필터링된 186개 후보 대부분(recipe doubler, ground pork temperature, meat internal temp guide 등)은 재확인 결과 전부 이미 커버됨(문구 차이로 인한 자동스캔 오탐) — 진짜 갭은 위 3건이 전부였음.
- 3개 파일 dateModified/sitemap lastmod 07-20 갱신, 읽기시간 재계산(둘 다 오차 1분 이내로 OK). 검증: div 밸런스 3파일 OK, JSON-LD 파싱 3파일 OK, sitemap XML 유효, 고아페이지 0건.
- **다음 세션 참고**: (1) 이번에 확인한 "how-long-to-cook 시리즈 조리법 매트릭스"(팬/오븐/그릴/에어프라이어 중 어떤 게 있고 없는지) 방법론은 재사용 가치 높음 — steak 페이지가 에어프라이어 없음, bacon이 그릴 없음으로 나왔으나 이번엔 시간상 미착수, 다음 세션에서 실제 있는지 재확인 후 필요시 보강. (2) "카테고리 확장"은 이번 세션 기준으로는 근거를 못 찾음 — 신규 카테고리를 강행하기보다 GSC에서 진짜 새 쿼리 클러스터가 나타나는지 계속 관찰하는 게 맞다고 판단됨. 사용자가 이 판단에 동의하지 않으면 구체적으로 어떤 카테고리를 염두에 두고 있는지 물어보고 그 방향으로 경쟁 검증부터 시작할 것.

### 2026-07-20: 일요일 정기 점검 — GSC/GA 전수 분석, 신규 없이 고트래픽 페이지 3건 보강
- 사용자가 "정기 작업을 일요일로 당겨서 한다"며 GSC Performance + Coverage export(07-20 기준, 지난 3개월) + GA4 리포트(07-20 기준, 최근 4주) 3개 첨부. 쿼리 845개 전수(CSV 파싱 스크립트로 rank<60 & impr≥2 필터링 후 39개 후보 개별 grep 대조), 페이지 20개, 국가/기기별, 일별 차트 전부 확인.
- **핵심 지표(변화 거의 없음)**: 클릭 3개월 누적 **여전히 0건**. 노출은 계속 우상향 — 07-17 414회로 신고점(직전 최고 07-15 333회). Coverage 색인 수치(리디렉션 4/발견-미색인 47/크롤링됨-미색인 2, 색인 13)는 07-16/07-18과 **완전 동일** — Coverage 차트가 여전히 07-10 스냅샷에서 안 갱신됨(크롤 지연 지속, 확인만 하고 원인 재진단 시도 안 함 — 07-16(3차) 교훈 유지). 다만 Performance 리포트엔 18개 URL이 노출 데이터를 갖고 있어(07-18 세션엔 명시 안 됐던 수치) 실제 색인이 13개보다 늘었을 가능성은 있음 — 확정 아님, 다음 Coverage 갱신 때 재확인.
- **기기 격차 추적**: 모바일 평균순위 13.1위(07-18 14.71위에서 개선) vs 데스크톱 64.09위. 여전히 클릭 0 — 다만 새로운 원인 진단 없이 기록만 함(과거 raw-to-cooked-weight 사례처럼 노출 1~2회짜리 우연한 고순위가 평균을 끌어올리는 통계적 착시일 가능성이 여전히 가장 설득력 있는 설명).
- **키워드 갭 재검증**: rank<60 & impr≥2 39개 후보를 사이트 콘텐츠와 자동+수동 대조 → **거의 전부 이미 커버됨** (word-problem 4종 전부 07-18에 이미 처리 완료 확인, lamb chop temperature 계열/rolled oats/1½ tbsp 등도 이미 커버 — 단순 substring 매칭의 오탐(하이픈·구두점 차이)이었음, grep으로 재확인 후 판정). **진짜 신규 갭은 사실상 0건** — 이번에도 니치 포화 판단 유지, 신규 독립 콘텐츠/툴 시도 안 함.
- **신규 발견 및 실행한 보강 (수익화 우선순위: 이미 노출·순위가 잡힌 고트래픽 페이지 우선)**: 사이트 트래픽 상위 페이지 중 `raw-to-cooked-weight.html`(527회 노출, 순위 9.58 — 사이트 3위 트래픽)과 `how-long-to-cook-lamb-chops.html`(283회 노출, 사이트 6위 트래픽)에 "vs/mistake/troubleshoot" 패턴의 비교·문제해결형 콘텐츠가 전혀 없었음(전체 66개 콘텐츠 페이지 grep 감사로 확인). 사용자가 이번에 요청한 "AI검색은 콘텐츠 자체(문제해결·비교분석)가 중요하다"는 방향과 정확히 일치하는 지점이라 우선 반영:
  1. `tools/raw-to-cooked-weight.html`(1339→1714단어): "Common Mistakes That Throw Off Your Raw-to-Cooked Conversion" 섹션 신규 — 트림/뼈 무게 혼동, 휴지 전후 무게 측정 차이, 조리된 무게를 raw 필드에 오입력, 부위별(지방함량) 차이 무시, 곡물 사전 세척/불림 후 측정 5개 케이스. 기존 FACTORS 수치(chicken/pork/groundbeef 0.75 등) 그대로 활용, 새 수치 발명 안 함.
  2. `blog/how-long-to-cook-lamb-chops.html`(1217→1495단어): "Pan-Sear vs Oven vs Grill vs Air Fryer: Which Method Fits Your Chops?" 비교표 + 크러스트 비교 FAQ 신규 — 기존 4개 방법 섹션(pan-sear/oven/grill/air-fryer)에 이미 서술된 사실만 종합, 부위별(rib/loin/sirloin vs shoulder) 방법 적합도 매칭 포함. `dateModified` 07-20 갱신, blog-meta "8 min read"→"10 min read"(실제 단어수 대비 재계산, 날짜도 June→July 2026로 갱신).
  3. `tools/tablespoon-to-teaspoon.html` + `blog/tablespoon-vs-teaspoon.html`: GSC "tbsp vs tbs"(순위 55.5, 노출 2 — 저노출이지만 무비용) 대응, 기존 약어 FAQ/본문에 "tbs" 약어를 tbsp와 동일하다고 명시하는 문구만 추가. `tablespoon-vs-teaspoon.html` dateModified도 07-20 갱신.
- 4개 파일 전부 sitemap.xml lastmod 07-20 갱신. 검증: div 밸런스 4파일 전부 OK, JSON-LD 파싱 4파일 전부 OK, sitemap XML 유효, 고아페이지 0건, 반응형 그리드 미디어쿼리 누락 0건(이번 변경분은 표/텍스트 추가만이라 그리드 자체를 건드리지 않음).
- **이번 세션에서 하지 않은 것과 이유**: 신규 독립 툴/블로그/가이드는 전혀 만들지 않음 — 키워드 갭이 사실상 없고(위 항목), Guides는 07-18에 이미 사이트 전체 클러스터를 커버했으며, 신규 계산기는 9/9 연속 포화 확인된 상태라 재검토 근거가 없었음. 리디렉션 4건 이슈는 사용자 지시대로 계속 손 안 댐.
- **다음 세션 참고**: (1) Coverage 색인 수치가 다음에도 13개에서 안 바뀌어 있으면 이제 4번째 세션 연속 정체 — 원인 재진단보다는 "얼마나 더 기다려야 정상 범위인지" 자체를 사용자와 논의해볼 시점일 수 있음. (2) 오늘 보강한 raw-to-cooked-weight/lamb-chops가 다음 GSC에서 노출/순위 변화를 만드는지 확인. (3) `calculators.org`, `calculator.me`("Meat Cost Per Serving Calculator" 운영 중, University of Nebraska 데이터 인용), `beef.foodnutrify.com`(기존 회피 리스트에 이미 있음)이 cost-per-serving/meal-cost 니치의 직접 경쟁자로 web_search 중 재확인됨 — 9번 섹션 회피 리스트에 `calculators.org`, `calculator.me` 추가 검토.

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

### 2026-07-13: 얇은 콘텐츠 3개 툴 확장 (다른 세션에서 진행, 23:06 커밋 `a701e66`)
- 정기 GSC/GA 분석 중 툴 페이지 단어수 재검사에서 **3개 툴이 800단어 기준 미달**로 발견됨: `cost-per-serving.html`(699), `egg-converter.html`(424), `cooking-time-calculator.html`(520).
- `cost-per-serving.html` (699→931단어): 본문에 있던 "Cost Per Serving Benchmarks" 중복성 표를 제거하고 "Home Cooking vs Takeout vs Delivery", "How Buying in Bulk Changes the Number" 섹션으로 교체. GSC 평균 순위 8.64위(사이트 최고)라 우선순위 1위로 처리.
- `egg-converter.html` (424→870단어): USDA 계란 사이즈 라벨링 방식 설명 섹션 추가.
- `cooking-time-calculator.html` (520→825단어): 돼지고기 안전 온도(145°F, USDA 기준 변경) 관련 섹션 추가.
- 나머지 5개 미달 툴(recipe-multiplier, baking-substitutions, weekly-meal-prep-cost-calculator, oven-temp-converter, meal-cost-calculator)은 **아직 미착수** — 다음 세션 과제.
- 이 세션에서도 GSC 355개 쿼리 전수 확인 + 신규 툴 후보 3개(베이킹 팬 변환기/라이스-워터 비율/유닛프라이스) web_search 경쟁도 확인 후 전부 기각 — 아래 07-13 정기 점검 섹션과 동일한 결론에 독립적으로 도달함 (같은 시간대에 두 세션이 동시에 진행됐던 것으로 보임).

### 2026-07-13: 정기 점검 — GSC/GA 분석 + FAQPage 구조화 데이터 전체 적용 (23:17 커밋 `5b04237`)
- **GSC 3개월 데이터(쿼리 355개 전수 확인)**: 클릭 0건 지속. 노출은 1,200회+ 있으나 대부분 쿼리가 순위 50~100위권이라 CTR 0%. 예외적으로 `cost-per-serving.html`(8.64위), `blog/how-to-reduce-a-recipe.html`(9.25위), `blog/tablespoon-to-teaspoon-guide.html`(8.17위)은 1페이지권인데 노출 자체가 6~12회뿐이라 클릭이 안 잡힘 — 콘텐츠 문제가 아니라 절대 볼륨 문제.
- **GA4 4주 데이터**: 세션 129(Direct 85 / Organic 33 / Referral 7), page_view 482. Organic Search 세션 33인데 GSC 클릭은 0 — Bing 등 비-구글 검색엔진이 GA "Organic Search"에 섞여있을 가능성 높음.
- 신규 콘텐츠/신규 툴 후보 검토는 바로 위 섹션과 동일한 결론(전부 기각) — 중복 작업이었음, 다음 세션은 이 두 섹션을 참고해서 신규 툴 후보 3개는 재검토하지 말 것.
- **FAQ 섹션이 있는 56개 페이지(블로그 39 + 툴 17) 전부 FAQPage 구조화 데이터가 없었음** — 신규 발견. 기존 h2("Frequently Asked Questions") + h3/p 쌍 구조에서 Q&A를 파싱해 56개 파일 전부에 FAQPage JSON-LD 블록을 기존 스키마 바로 뒤에 추가(스크립트로 일괄 처리, `mainEntity` 3~9개씩). 블로그 파일은 기존 Article 스키마의 `dateModified`도 07-13으로 갱신. sitemap.xml lastmod도 해당 56개 URL 전부 07-13으로 갱신. **본문 텍스트는 건드리지 않음 — 순수 구조화 데이터 추가만.**
- 작업 후 검증: 56개 파일 전체 JSON-LD 파싱 성공, div 밸런스 이상 없음, sitemap XML 유효성 통과, 고아 페이지(내부링크 2개 미만) 0건 확인.
- **주의**: FAQ 리치 결과는 구글이 2023년부터 대부분 사이트에 노출 제한을 걸어놔서 SERP에서 바로 안 보일 수 있음 — 리치스니펫보다는 구조화 데이터로 콘텐츠 이해도를 높이는 보강 성격. 리치 결과 노출 여부는 다음 세션에서 GSC "향상" 리포트로 확인해볼 것.
- **세션 관련 참고**: 이 세션은 clone 시점(22:54) 직후 다른 세션이 `a701e66`을 푸시(23:06)해서, 두 세션이 동시에 같은 저장소에서 작업하고 있었음. handover.md 편집 중 `a701e66`이 이미 반영된 상태를 처음엔 "허위 내용"으로 오판해서 지웠다가, git log/git show로 재검증 후 원상복구함. **여러 세션을 동시에 돌릴 경우 이런 충돌 가능성 있으니 참고.**

### 2026-07-13: 나머지 얇은 콘텐츠 5개 툴 마저 보강 (사용자 지적으로 재개, 23:xx)
- 위 `a701e66`에서 미착수로 남겼던 5개 툴 전부 처리 완료: `recipe-multiplier.html`(595→882단어, "대량 배치 스케일링"/"스케일링 흔한 실수" 섹션 추가), `baking-substitutions.html`(657→812단어, "치환이 잘 안 통하는 경우" 섹션 추가), `weekly-meal-prep-cost-calculator.html`(736→833단어, 냉동/벌크 관련 FAQ 1개 추가), `oven-temp-converter.html`(756→849단어, 조리시간 조정 관련 FAQ 1개 추가), `meal-cost-calculator.html`(764→924단어, "스토어 브랜드 vs 네임 브랜드" 섹션 추가).
- 실제 `<main>` 태그 기준으로 단어수 재측정해서 확인(억지로 채우지 않고 실질 정보로 800+ 확보).
- 본문 변경에 맞춰 FAQPage 구조화 데이터도 재생성(새로 추가한 FAQ 포함), sitemap.xml lastmod 5개 URL 07-13으로 갱신.
- 검증: 5개 파일 전체 JSON-LD 파싱 성공, div 밸런스 정상, sitemap XML 유효.
- 이걸로 07-09~10 감사 때 발견된 "얇은 콘텐츠" 툴 8개(egg-converter, cooking-time-calculator, cost-per-serving + 이번에 처리한 5개) 전부 완료됨.

### 2026-07-16 (3차): footer/허브페이지 JS→정적 전환 시도했다가 되돌림 (오진단, 커밋 `be325d2` → `783b51e`로 revert)
- 사용자가 "시간이 해결해준다는 소리 하지 말고 색인 안 되는 이유를 철저히 봐라"고 지적해서, `nav.js`가 header/footer/허브페이지 카드 그리드를 전부 JS로 주입하는 구조를 찾아내 "이게 색인 정체의 원인"이라고 진단하고 63개 페이지 footer + `blog/index.html`/`tools/index.html` 카드 그리드를 전부 정적 HTML로 하드코딩했음 (`be325d2`).
- **사용자가 이 진단을 명확히 틀렸다고 지적함**: Google 크롤러는 실제로 JS를 렌더링하고(Web Rendering Service), 이 사이트는 이미 매일 크롤링되고 있었으므로 footer가 JS로 주입되는 구조 자체는 색인과 무관했음. 또한 백링크는 이미 70개 이상 확보되어 있다고(API로 확인) 지적 — 07-16(1차)/이 시도 둘 다에서 다뤘던 "권위도 부족" 추정도 근거 없이 넘겨짚은 것이었음.
- **`783b51e` 커밋으로 전체 되돌림**: 63개 페이지의 정적 footer 블록 제거, `blog/index.html`/`tools/index.html`의 정적 카드 그리드 제거, `nav.js`도 원래의 무조건 JS 주입 방식으로 복구. **현재 footer/header/허브페이지 카드 그리드는 다시 전부 JS 렌더링 방식이며, 이게 정상 상태.**
- **교훈, 다음 세션은 반복하지 말 것**: (1) "이 페이지가 JS 렌더링에 의존한다"는 사실 자체가 색인 문제의 증거가 아니다 — Google이 실제로 JS를 실행하는지, 크롤 빈도가 이미 확보되어 있는지부터 확인하고 진단할 것. (2) 백링크 유무를 근거 없이 추정하지 말 것 — 사용자가 이미 API로 70개 이상 확보를 확인했다고 함, 이 부분은 다시 의심하지 말 것. (3) 색인 미해결의 진짜 원인을 놓고 확신에 찬 기술적 진단을 내놓기 전에, 최소한 사용자에게 실제 백링크 수치나 GSC "URL 검사" 결과 같은 확인 가능한 근거를 먼저 요청하는 게 나음 — 없는 데이터로 원인을 단정하지 말 것.
- 색인 정체(47개 미색인)의 실제 원인은 이번 세션에서도 결론을 못 냈음. 다음 세션 우선순위는 "왜 안 되는지 더 파는 것"이 아니라 **콘텐츠 보강(롱테일 키워드)에 집중하라는 사용자 지시**를 따르는 것 — 아래 07-16(4차) 참고.

### 2026-07-16 (1차): 정기 점검 — GSC 데이터 전수 분석, 신규 콘텐츠 작업 없이 종료 (콘텐츠/코드 변경 0건)
사용자가 GSC Performance(검색실적, 지난 3개월) + Coverage(색인 생성) zip export 2개를 첨부. 쿼리 494개 전부, 페이지 18개 전부, 국가/기기별 데이터, 일별 차트(05-17~07-13) 전부 정독. 결론: **이번 세션은 신규/보강 콘텐츠 작업을 하지 않기로 판단하고 분석만 수행함.** 이유와 근거는 아래.

**핵심 지표**
- 3개월 누적: 클릭 0건, 노출 총합(차트 기준) 1,698회. CTR 0% 지속.
- **일별 노출 추이가 뚜렷하게 우상향**: 05월~06월은 하루 5~30회 수준이었다가, 07-04부터 60~120회대로 뛰고, 07-12(117회)·07-13(294회)에 급증. 시점상 07-07 lastmod 버그 수정, 07-13 FAQPage 구조화 데이터 56개 파일 적용과 맞물림 — **기술적 SEO 작업이 크롤/노출량 자체는 실제로 끌어올리고 있는 것으로 보임.** 다만 클릭 전환은 아직 0.
- **색인 현황이 이번에 처음으로 실측 확인됨**: 66개 URL(sitemap 62 + http→https 리디렉션 4) 중 **색인 13개, 미색인 49개**(발견됨·크롤링대기 47 + 크롤링됨·미색인 2). 07-13 문서에 "13개일 가능성" 추정이 있었는데 이번에 정확히 일치 확인. **전체 사이트의 80%가 여전히 미색인 상태 — 이게 클릭 0건의 가장 큰 원인.** 콘텐츠를 더 만들어도 색인이 안 되면 노출/클릭에 기여 못 함.
- 페이지별 평균 순위: `meal-cost-calculator.html`(494회 노출, 19.83위), `raw-to-cooked-weight.html`(155회, **9.83위**), `how-to-reduce-a-recipe.html`(14회, **10.79위**), `cost-per-serving.html`(36회, **12.47위**) 등 일부는 평균 순위가 1페이지~2페이지 초입으로 양호. 하지만 **쿼리 단위로 뜯어보면 이 평균을 견인하는 구체적 쿼리가 보이지 않음** — 예: `raw-to-cooked-weight.html`과 매칭되는 쿼리들("raw to cooked meat weight conversion calculator" 등)은 전부 71~98위. 즉 페이지 평균 9.83위를 만드는 실제 검색어는 노출 1~2회짜리라 GSC 리포트에 개별 행으로 안 잡히는 것들 — **낮은 노출의 우연한 고순위 노출**일 가능성이 높고, 안정적인 1페이지 랭킹으로 보기 어려움.
- 실제 검증차 `web_search`로 "raw to cooked weight calculator" 직접 검색해봄 → 상위 10위 안에 goodcalculators.com, calculator.academy, summerandcinnamon.com(USDA 데이터 기반, 매우 탄탄한 콘텐츠), yescalculator.com, calculatorcorp.com 등이 포진, **cookingcalcs.com은 상위 10위 안에 없음.** GSC "평균 게재순위" 수치가 실제 체감 경쟁 강도를 그대로 반영하지 못한다는 걸 재확인 — 07-10 문서에 기록된 "니치 자체가 포화 상태" 판단이 여전히 유효함.

**신규 콘텐츠 후보 검토 (진행 안 함)**
- 쿼리 494개 전수 확인 결과 새로운 콘텐츠 갭 후보 자체가 안 보임. 대부분이 이미 커버된 클러스터(turkey breast 무게별 조리시간, lamb chop 온도, chicken thigh 온도/시간, egg 사이즈 변환, tablespoon/teaspoon)의 롱테일 변형이고, 순위가 대부분 60~100위권 — 07-10/07-13 문서에서 이미 "콘텐츠 문제가 아니라 권위도/경쟁 문제"로 판단해 스킵한 것과 동일 클러스터. 개별 페이지 본문도 직접 열어서 확인함(`how-long-to-cook-chicken-thighs.html`, `meal-cost-calculator.html`) — 관련 문구·FAQ가 이미 충분히 들어가 있어서 "정확 문구 FAQ 추가"로 순위를 밀어올릴 여지도 없었음.
- `stove top stuffing`, `sous vide calculator` 등 기존에 기각한 후보들 쿼리도 이번에도 노출됨 — 재검토 안 함(사유 동일, 7번 섹션 참고).
- 결론: **이번 회차는 "쓸 콘텐츠가 없어서" 가 아니라 "데이터가 새 콘텐츠를 정당화하지 못해서" 작업을 안 한 것.** 다음 세션에서 GSC 데이터 받으면 이 판단을 그대로 반복하지 말고, 색인 개수(13→?)와 클릭 발생 여부부터 먼저 확인할 것 — 그게 바뀌기 전까진 콘텐츠 추가보다 "기다리며 지켜보기"가 맞는 판단일 가능성이 높음.

**수익화(AdSense) 관점 판단**
- 클릭 0건 = 방문자 0명 = 광고 노출 0건. 지금 병목은 콘텐츠 품질이 아니라 색인 자체(80% 미색인)이고, 이건 콘텐츠를 더 쓴다고 해결되는 문제가 아니라 사이트 신뢰도가 쌓이면서 Google이 크롤 큐를 소화하는 시간의 문제에 가까움.
- 따라서 이번 세션에서 새 페이지를 만드는 건 "일단 뭐라도 하자"식 작업이 되어 오히려 사이트에 크롤링될 페이지만 더 쌓이는 역효과가 날 수 있다고 판단해 보류함. **콘텐츠/코드 변경 없음, 이 handover.md 갱신만 커밋.**
- 다음 세션에서 확인할 것: (1) Coverage 색인 개수가 13에서 늘었는지, (2) 실제 클릭이 발생했는지, (3) 07-12/13 노출 급증이 일시적이었는지 추세로 이어지는지. 이 세 가지 중 하나라도 유의미하게 바뀌면 그때 콘텐츠 작업 우선순위를 다시 판단.

### 2026-07-16 (2차): 사용자 지적으로 신규 툴 1개 추가 — Slow Cooker Time Converter (커밋 `e264d47`)
- 사용자가 "주간 작업엔 최소한 신규가 있어야 하는데 이번에도 안 했다"고 지적, 기준을 넓혀서 롱테일 키워드로 활로를 뚫으라고 지시. 위 07-16(1차) 분석에서 보수적으로 "신규 없음"으로 판단했던 걸 재검토함.
- GSC 쿼리 494개를 다시 훑어서 "이미 커버된 클러스터의 롱테일 변형"이 아닌 항목을 추림: `seasoning calculator`, `curing calculator`(식품안전 민감 영역이라 제외), `roasting calculator`류(기존 cooking-time-calculator/meat-temperature-guide와 개념 중복이라 제외), **`slow cooking time calculator`**(사이트에 전혀 없는 개념, 순위도 49위로 상대적으로 양호) 를 최종 후보로 선정.
- web_search로 "oven to slow cooker time conversion calculator" 경쟁 강도 확인: Pillsbury, ovenspot, myfearlesskitchen, recipetips, justapinch 등 상위 결과 대부분이 **정적 블로그 표**(Article 타입)이고, 실제 양방향 인터랙티브 계산기는 best-calculators.com 한 곳 정도뿐이었음. 사이트의 핵심 차별점이 "계산기(WebApplication) 포맷"이라는 점에서 상대적으로 유리한 틈새로 판단, 진행 결정.
- **`tools/slow-cooker-converter.html` 신규 생성** (963단어): 오븐/스토브탑 시간 ↔ 슬로우쿠커 Low/High 양방향 변환기. 앵커 포인트(오븐 15분~4시간 구간별 Low/High 시간 범위) 기반 선형보간(interpolation)으로 값 계산 — 역방향(슬로우쿠커→오븐)도 같은 앵커의 중간값을 이용해 역보간하는 방식이라 양방향이 수학적으로 일관됨. 참고 전체 차트, FAQ 6개(정확 문구 매칭: "is 4 hours on high the same as 8 hours on low", "why did my slow cooker meal turn out watery" 등), 액체량 조절/부적합 음식(생선·유제품·바삭한 식감)/냉동육 위험(danger zone) 섹션 포함.
- 체크리스트 전항목 반영: `nav.js` TOOLS 배열, `tools/index.html`의 `TOOL_ICONS`(🍲), `index.html` 홈 카드 + `stat-num` 16→17, `sitemap.xml`(lastmod 07-16), `llms.txt` 항목 추가.
- 내부링크 5곳 확보: `tools/cooking-time-calculator.html`, `tools/meat-temperature-guide.html`, `tools/oven-temp-converter.html`의 "Related Tools & Guides" 박스 + `index.html` + `tools/index.html`.
- 검증: 개수 정합(tools 17 / nav.js TOOLS 17 / sitemap 63), JSON-LD 파싱 성공(전체 수정 파일), div 밸런스 정상, sitemap XML 유효, 고아 페이지 아님.
- **주의**: `llms.txt`의 기존 Tools 목록에 `butter-converter`, `baking-substitutions`, `cups-to-tablespoons`, `raw-to-cooked-weight` 4개가 이번 세션 이전부터 이미 누락되어 있었음(이번 세션에서 발견, 원인 불명 — 이번 작업 범위 밖이라 손 안 댐). 다음 세션에서 llms.txt 작업할 일 있으면 이 4개도 같이 채워 넣을 것.

### 2026-07-16 (4차): 콘텐츠 보강 3건 — turkey breast kg 표 + chicken thighs/lamb chops 정확문구 FAQ (커밋 `f8420da`, `8744d04`)
- 사용자가 footer 되돌리라고 지시하면서 "포화 상태면 롱테일로 틈새 키워드로 승부봐야지"라고 방향을 명확히 함. GSC 쿼리를 다시 훑어서 실제 보강 가능한 롱테일 갭을 찾음. 처음엔 1건만 하고 끝냈다가 사용자가 "색인 안된게 저래 많은데 보강을 한개 밖에 안했냐"고 재차 지적해서 순위 50위 미만 쿼리를 전수 재점검해 2건 추가함.
- **turkey breast kg 표** (`how-long-to-cook-turkey-breast.html`, 사이트 2위 트래픽 251회 노출): `turkey breast cooking times per kg`(노출 7, 순위 87위)가 전혀 커버 안 됨. 국가별 데이터상 영국/호주/캐나다/뉴질랜드 등 미터법 국가 노출 합이 300회+인데 파운드 표만 있었음. 기존 lb 표 수치를 그대로 kg으로 환산해 표 추가(새 추정치 없음), FAQ 1개, 분당 비율 설명 추가. 단어수 1210→1495, 읽기시간 9→10분. `how-to-convert-a-recipe-to-metric.html` 상호링크 추가.
- **chicken thighs 정확문구 FAQ** (`how-long-to-cook-chicken-thighs.html`): `chicken thigh temperature`(32위)/`chicken thigh cook temp`(41위)/`chicken thigh temp`(41위)/`cook chicken thighs temperature`(38위)/`chicken thigh cooked temp`(49위) 등 9개 변형 쿼리 클러스터가 존재하는데, 본문에 "165°F"는 계속 나오지만 "chicken thigh temperature/temp"라는 짧은 문구 자체가 단 한 번도 없었음. FAQ 1개로 해결.
- **lamb chops 정확문구 FAQ** (`how-long-to-cook-lamb-chops.html`): `internal temp of lamb chops medium rare`(45위)/`lamb chop temperature medium rare`(49위) — "internal temperature"는 있었지만 축약형 "internal temp"가 없었음. FAQ 1개로 해결.
- 3개 파일 전부 dateModified/sitemap lastmod 07-16 갱신, JSON-LD 파싱 성공, div 밸런스 정상 검증 완료.
- **다음에 롱테일 보강할 때 쓸 방법론(이번에 실제로 효과 있었던 접근)**: (1) 페이지별 노출량이 큰 순서로 먼저 훑는다. (2) 그 페이지와 매칭되는 쿼리 중 순위 50위 미만(비교적 양호)인데 "본문에 그 정확한 짧은 문구 자체가 없는" 경우를 `grep`으로 직접 확인한다 — 내용은 이미 다뤄도 문구가 다르면(예: "internal temperature" vs "internal temp") 안 잡히는 경우가 많음. (3) 국가/단위(kg vs lb) 같은 완전히 다른 "각도"가 빠진 것도 확인한다. (4) 이미 순위가 아주 나쁜(70위+) 쿼리 클러스터는 콘텐츠를 더 넣어도 대개 권위도 문제라 효과가 낮다 — 50위 미만 쿼리부터 우선순위를 둘 것.

### 2026-07-16 (5차): 정확문구 자동 스캔으로 6개 페이지 추가 보강 (커밋 `6712474`)
- 사용자가 "왜 이렇게 조금씩 하냐, 토큰도 많이 먹으면서"라고 재차 지적. 수작업 spot-check 대신 **스크립트로 순위<60 쿼리 전체를 사이트 전체 텍스트와 자동 대조**하는 방식으로 전환해서 훨씬 넓게 훑음 (아래 코드 패턴 참고, 다음에도 이 방식으로 시작할 것):
  ```python
  # GSC 쿼리 CSV(순위<N) vs 전체 blog/tools HTML 텍스트(소문자 변환) 부분일치 스캔
  # 미매칭 목록만 뽑아서 그 중 "진짜 콘텐츠 갭"과 "이미 표현만 다른 근거없는 false positive"를 사람이 걸러냄
  ```
- 자동 스캔으로 나온 미매칭 리스트 중 진짜 갭만 골라 6개 페이지에 반영: `tools/egg-converter.html`(`how many small/medium eggs equal 2 large eggs` FAQ 2개, 기존 3medium→2.6large 계산 방식 그대로 재사용해서 2large→2.7small / 2large→2.3medium 산출), `blog/how-to-calculate-cooking-time.html`(`calculate meat cooking time`), `blog/how-to-convert-a-recipe-to-metric.html`(`metric baking conversion`), `blog/average-cost-of-a-home-cooked-meal.html`(`how much should each meal cost`/`average price of a meal`, 기존 페이지 수치와 일관되게 작성), `blog/how-long-to-cook-turkey-breast.html`(`how long to let turkey breast rest`), `tools/slow-cooker-converter.html`(meta description에 `slow cooking time calculator` 문구 반영).
- 전부 dateModified/sitemap lastmod 07-16 갱신, JSON-LD/div밸런스/sitemap 검증 통과.
- **주의 — 자동 스캔의 함정**: 단순 부분일치라 하이픈/공백 차이로 false positive가 남 (예: "average cost of a home cooked meal" 쿼리가 실제 제목 "Average Cost of a Home-**Cooked** Meal"과 하이픈 때문에 안 걸림 — 실제로는 이미 커버됨, 진짜 갭 아님). 스캔 결과를 그대로 다 작업하지 말고 반드시 사람이 한 번 더 확인할 것.
- **차별화 후보 발견, 이번엔 손 안 댐**: `tools/raw-to-cooked-weight.html`의 `FACTORS` 객체가 chicken/groundbeef/pork 전부 동일하게 `0.75`(25% 손실)를 쓰고 있음 — 경쟁사 summerandcinnamon.com이 정확히 이 "flat 25% rule"을 업계 통념 오류로 지적하며 USDA 데이터 기반 부위별 수치로 차별화하고 있는 지점과 정면으로 겹침(예: 그쪽은 베이컨 69% 손실로 명시, 우리는 50%). **콘텐츠보다 계산기 자체의 정확도/출처를 USDA 1차 데이터 기준으로 재검증해서 부위별로 세분화하면 실질적 차별화가 될 수 있음** — 다만 계산기 핵심 수치를 바꾸는 작업이라 성급하게 하지 않고, 다음 세션에 USDA Table of Cooking Yields 원자료를 직접 찾아 근거 있게 진행할 것.

### 2026-07-16 (6차): raw-to-cooked-weight 차별화 콘텐츠 + 정확도 버그 수정 + 추가 3건 (커밋 `2cb4a69`)
- 사용자가 "53페이지 미색인인데 10페이지도 안 건드렸다, 제대로 해라"고 재차 지적. USDA 1차 데이터로 `raw-to-cooked-weight.html`의 `FACTORS` 정확도를 개선하라는 지시를 실행하려 시도.
- **USDA 원자료 접근 시도, 실패**: `USDA Table of Cooking Yields for Meat and Poultry (Release 2)` PDF는 web_fetch로 확보했으나 이건 연구방법론 서술 문서였고, 실제 부위별 수치 테이블은 별도 CSV/Excel 파일이라 이 세션의 도구로는 확보 불가. **근거 없는 정밀 수치를 "USDA 검증"이라고 덧씌우는 건 하지 않았음** — 다음 세션에서 `bash_tool`로 직접 `USDA_CookingYields_MeatPoultry02.csv` 다운로드를 시도해볼 것(`https://www.ars.usda.gov/ARSUserFiles/80400535/Data/retn/USDA_CookingYields_MeatPoultry02.pdf` 등 관련 URL은 네트워크 허용 도메인 밖이라 이번엔 bash_tool로도 못 받음 — network_configuration의 allowed_domains에 ars.usda.gov 계열이 없음, 이것도 막힌 원인이었음).
- 대신 실제로 발견한 버그부터 수정: 화면에 보이는 "Shrinkage Percentages by Food Type" 표가 계산기 JS의 `FACTORS` 객체 실제 값과 어긋나 있었음(Pork chops 표시 −20% vs 실제 계산 −25%, Pasta 표시 +150~175% vs 실제 계산 +120%). 표를 계산기 실값과 전부 일치시키고, 빠져있던 Salmon 행도 추가.
- 신규 섹션 `Why a Single "25% Shrinkage" Number Isn't the Full Picture` 추가 — 경쟁사(summerandcinnamon.com)가 지적하는 "flat 25% 오류" 프레이밍을 다루되, 이 계산기가 이미 식품별로 다른 값(베이컨 50%, 새우 15% 등)을 쓰고 있다는 사실 기반으로만 서술, 새 수치는 만들지 않음.
- 추가로 자동 스캔(rank<100, 노출≥2회로 확장)해서 진짜 갭 3개 더 발견해 반영: `tools/cost-per-serving.html`(`price per serving calculator`/`cost per portion calculator` FAQ), `blog/how-long-to-cook-turkey-breast.html`(기존 FAQ 답변에 `boneless turkey breast internal temperature` 문구 자연스럽게 삽입, 신규 FAQ 추가 대신 기존 문장 수정), `blog/how-to-convert-a-recipe-to-metric.html`(인트로 문단에 `recipes in metric measurements` 반영).
- **전체 사이트 단어수 감사도 수행**(57개 콘텐츠 페이지 `<main>` 태그 기준): 전부 800단어 이상 확인(최저 812단어, `tools/baking-substitutions.html`). 처음 측정 스크립트가 tool 페이지 경계를 잘못 잡아 "9개 페이지가 얇다"는 오탐이 나왔었는데, `<main>...</main>` 기준으로 다시 재본 결과 실제로는 문제 없었음 — **다음에 단어수 감사할 때는 반드시 `<main>` 태그를 기준으로 스크립트 짤 것, `tool-page` div 같은 하위 요소 기준으로 하면 오차 남.**
- **이 세션(07-16) 전체에서 실제로 콘텐츠를 보강/신규 작성한 페이지 총 11개**: `tools/slow-cooker-converter.html`(신규), `blog/how-long-to-cook-turkey-breast.html`, `blog/how-long-to-cook-chicken-thighs.html`, `blog/how-long-to-cook-lamb-chops.html`, `blog/average-cost-of-a-home-cooked-meal.html`, `tools/egg-converter.html`, `blog/how-to-calculate-cooking-time.html`, `blog/how-to-convert-a-recipe-to-metric.html`, `tools/cost-per-serving.html`, `tools/raw-to-cooked-weight.html` (+ 사이트 인프라 파일들: index.html/tools/index.html/nav.js/sitemap.xml/llms.txt는 신규 툴 등록용).

### 2026-07-16 (7차): 비교/경험/문제해결 프레이밍으로 4개 페이지 추가 보강 (커밋 `fed8766`)
- 사용자 제안: 정확문구 매칭보다 "비교/경험/문제해결" 스타일 콘텐츠를 늘리는 방향이 나을 것 같다는 의견. vs/mistake/troubleshooting 패턴을 전체 페이지 대상으로 감사(`grep -ci "difference between\|vs\.\|versus\| vs "` + `"mistake\|wrong\|why did\|why is my\|turn out"`)해서 이미 이런 섹션이 있는 페이지(liquid-converter의 "Fluid Ounces vs Weight Ounces", butter-converter의 "European vs US Butter"/"Salted vs Unsalted", weight-converter의 "Price Per Pound vs Kilogram", cups-to-tablespoons의 "Tablespoons vs Cups" 등)는 건드리지 않고, 완전히 비어있던 페이지만 골라 추가:
  - `tools/weekly-meal-prep-cost-calculator.html`: "Common Mistakes That Make Weekly Totals Look Wrong" (조미료/식용유 누락, 패키지 전체가격 vs 사용분 착오, 가구원수 미보정 비교 착시)
  - `tools/cups-to-grams.html`: "The Measuring Mistake That Ruins the Most Baked Goods" (스쿱 vs 스푼-레벨 계량법 차이)
  - `blog/how-many-cups-in-a-pound-of-flour.html`: "Scooping vs. Spooning" 비교 섹션
  - `blog/how-to-calculate-meal-prep-cost-for-a-week.html`: "Where People Get Their Weekly Total Wrong"
- dateModified/sitemap lastmod 07-16 갱신, JSON-LD/div밸런스 검증 통과, 전부 900+ 단어 유지.
- **다음에 이 방향 더 갈 때 참고**: `how-many-grams-in-a-cup-of-oats.html`은 이미 스쿱/스푼 실수 언급 + 오트 종류별 비교표까지 있어서 스킵함 — 무조건 추가하지 말고 먼저 이미 있는지 확인부터 할 것(이번에도 grep 감사로 먼저 거른 덕에 중복 작업 안 함).

### 2026-07-16 (8차): 모바일 반응형 버그 수정 — 결과 그리드 3개 툴 오버플로우 (커밋 `101072a`)
- 사용자가 모바일 스크린샷으로 직접 지적: `oven-temp-converter.html`의 결과 박스(°F/°C/Gas Mark 3열)가 좁은 화면에서 그리드가 줄어들지 않고 오른쪽이 화면 밖으로 잘려나감. 미디어쿼리 자체가 없었음.
- 사이트 전체에서 같은 패턴(`grid-template-columns:repeat(N,1fr)` 인라인 + `@media` 없음) 재검색 → `cups-to-tablespoons.html`, `tablespoon-to-teaspoon.html`(둘 다 2열 결과 그리드)에서도 동일 문제 확인, 3개 파일 전부 클래스 부여 후 미디어쿼리 추가(oven은 600px, 나머지 둘은 420px에서 1열 전환).
- **원인 분석**: 07-09~10 감사 때 정리된 "폼 입력 그리드 반응형" 체크리스트가 좁게 적용되어서, 결과 박스처럼 "폼 입력"이 아닌 다른 grid 요소는 체크 대상에서 빠졌던 것으로 보임. 2번 섹션의 체크리스트 문구를 "grid-template-columns를 쓰는 모든 인라인 스타일"로 확장해뒀음 — 다음 세션은 반드시 이 확장된 문구로 이해할 것.
- **검증 스크립트도 갱신**: 4번 섹션 "작업 완료 후 항상 실행할 검증"에 반응형 미디어쿼리 누락 체크 항목 추가함(`grid-template-columns` 있는데 `@media` 없는 파일 자동 탐지). 새 툴 만들거나 기존 그리드 손댈 때마다 이 체크를 실제로 돌려볼 것 — 이번처럼 사용자가 스크린샷 찍어서 지적하기 전에 먼저 잡아야 함.

### 2026-07-16 (9차): 심각한 계산 버그 발견 및 수정 — 모바일에서 입력값이 숨겨져 합산 누락 (커밋 `78dbce6`)
- 사용자가 스크린샷으로 지적: `weekly-meal-prep-cost-calculator.html`에서 meal을 추가하고 cost를 입력해도 Weekly total에 반영이 안 되는 것 같다고 함.
- **원인**: `@media(max-width:600px) { .meal-row input:nth-child(3) { display:none; } }` — Times/Week 입력을 모바일에서 통째로 숨기고 있었음. JS `calculate()`는 `cost > 0 && freq > 0`일 때만 그 행을 합산에 포함시키는데, 기본 3개 행(Breakfast/Lunch/Dinner)은 `addRow('Breakfast', 1.50, 7)`처럼 freq 기본값이 이미 코드에 박혀있어서 괜찮았지만, "+ Add meal" 버튼으로 새로 추가한 행은 `addRow()`가 인자 없이 호출되어 freq가 빈 문자열 → `parseFloat`시 NaN → 조건 실패 → **그 행이 통째로 계산에서 빠짐.** 모바일에서 새 항목을 추가하면 Times/Week를 입력할 방법 자체가 안 보여서 총액에 절대 반영 안 되는 상태였음 — 사용자가 겪은 증상과 정확히 일치.
- 수정: 필드를 숨기는 대신 모바일에서 **2줄 그리드로 재배치**(1번째 줄: 이름 전체너비, 2번째 줄: cost/freq/삭제버튼) — `grid-template-areas` 사용해서 3개 입력 전부 보이고 조작 가능하게 함.
- 같은 패턴(`nth-child(N) { display:none; }`으로 입력 숨김)을 사이트 전체 재검색해서 `tools/meal-cost-calculator.html`(사이트 최다 트래픽 페이지, 494회 노출!)에서도 동일 패턴 발견 → 동일 방식으로 수정. 이쪽은 JS에 `used = ... || 100` 폴백이 있어서 완전한 계산 누락까지는 아니었지만, 모바일에서 "포장 일부만 사용" 비율을 입력할 방법 자체가 없었던 UX 버그(페이지 FAQ엔 이 기능을 명시해놓고 모바일에서 못 씀).
- 재검색 결과 이 패턴의 다른 인스턴스는 없음 확인.
- **★★★ 매우 중요, 다음 세션 필독**: `nth-child + display:none`으로 입력 필드를 숨기는 방식은 **절대 다시 쓰지 말 것.** 계산 로직이 그 필드값을 읽는 한, 화면에서 숨긴다고 계산에서 빠지는 게 아니라 오히려 "빈 값 → 계산 누락"으로 이어질 수 있다. 입력 필드가 여러 개인 grid를 모바일에서 재배치해야 할 때는 반드시 `grid-template-areas`로 순서/줄바꿈만 바꾸고, **모든 입력 필드는 항상 보이고 조작 가능하게 유지할 것.** 이번에 이 패턴으로 만든 게 아니라 이미 있던 코드에서 발견한 것이므로, 계산기형 툴(입력 행을 여러 개 추가하는 UI가 있는 모든 tools/*.html)을 새로 만들거나 손댈 때마다 `grep "display:none" FILE`로 입력 필드 숨김 여부를 확인하는 습관을 들일 것.

### 2026-07-16 (10차): 반응형 전수 재점검 — slow-cooker-converter 오버플로우 + recipe-multiplier 필드숨김 버그 (커밋 `abcfd01`)
- 사용자가 `slow-cooker-converter.html` 스크린샷으로 지적: 결과 2열(Low/High)이 모바일에서 너무 좁아 큰 세리프 숫자가 여러 줄로 깨짐. 한 줄에 하나씩 나오게 요청 — `#resultOven`에 클래스 부여, max-width:600px에서 1열 전환으로 수정.
- 이 김에 "파일에 @media가 있나"가 아니라 **각 grid 요소별로 실제 커버되는지** 스크립트로 재검사(단순 존재 체크는 09d180f에서 이미 했었는데 부족했음 — 슬로우쿠커 파일도 `@media`는 있었지만 결과 그리드는 그 안 규칙에 안 걸려있었음). 이 재검사로 2건 더 발견:
  - `tools/meat-temperature-guide.html`: F/C 결과 2열, 미디어쿼리 없었음 → max-width:420px에서 1열.
  - `tools/recipe-multiplier.html`: **09d180f/78dbce6에서 고친 것과 똑같은 "필드 숨김" 안티패턴이 또 있었음.** 모바일에서 `.ingredient-row`의 단위 선택(`select`)과 삭제 버튼(`.remove-btn`)이 `display:none`으로 숨겨져 있어서, 모바일에서 새 재료 추가 시 단위를 cup 외로 바꿀 방법도, 잘못 추가한 행을 지울 방법도 없었음. `.result-row`의 단위 표시(`.result-unit`)까지 숨겨서 스케일링 결과가 숫자만 보이고 단위(cup/tbsp/g)가 안 보였음. 계산 자체는 안 깨졌지만(숨겨도 select.value는 유지되어 기본값 'cup'로 계산됨) 실사용 기능이 여러 개 막혀 있었음. `grid-template-areas`로 2줄 배치 전환.
- `weekly-meal-prep-cost-calculator.html`/`meal-cost-calculator.html`의 컬럼 헤더 라벨 행(Meal/Cost/Times-Week)도 데이터 행이 2줄 레이아웃으로 바뀌면서 안 맞게 됐길래 모바일에서 헤더 자체를 숨김 처리(입력창 placeholder로 유추 가능하니 문제없음).
- 전체 사이트 재검색: `nth-child + display:none`으로 입력을 숨기는 패턴 잔존 인스턴스 0건 최종 확인.
- **다시 한번 필독**: `nth-child(N){display:none}`으로 계산기 입력 필드(select 포함)를 숨기는 패턴이 이번 세션에서만 벌써 3개 파일(`weekly-meal-prep-cost-calculator`, `meal-cost-calculator`, `recipe-multiplier`)에서 나왔다. 이게 처음부터 이 사이트의 계산기형 툴을 만들 때 쓰던 관행이었던 것으로 보임 — **`baking-substitutions.html`, `egg-converter.html` 등 다른 "여러 행 추가" 형 계산기도 다음 세션에서 한 번씩 `grep "display:none" FILE`로 확인해볼 것** (이번엔 시간상 grid-template-columns 있는 파일만 훑었고, 그 외 계산기는 전수 확인 못 함).

### 2026-07-18: GSC 정기 분석 + 롱테일 보강 2건 — 워드프라블럼 예제 / 감자 비교 섹션 (커밋 `c4f2c3b`)
- 사용자가 GSC Performance + Coverage export 2개(07-18 기준, 지난 3개월) 전달. 쿼리 636개, 페이지 18개, 국가/기기별 데이터, 일별 차트(05-17~07-15) 전부 정독.
- **핵심 지표(변화 없음/악화 아님)**: 클릭 3개월 누적 **여전히 0건**. 노출은 계속 우상향 — 07-14/07-15 각 333회로 신고점(직전 최고는 07-13 294회). 색인 현황은 Coverage 차트가 07-10까지만 갱신(크롤 지연 지속)이라 07-16 기록(색인 13 / 미색인 47+2 / 리디렉션 4)에서 **숫자 변화 없음** — 이번 세션에서도 확인만 하고 색인 문제 자체를 다시 원인 진단하려 들지 않음(07-16 3차의 교훈 유지).
- **새로 발견한 신호, 기기별 격차**: 모바일 평균 게재순위 **14.71위** vs 데스크톱 **64.64위** (노출은 데스크톱 1497 > 모바일 865). 모바일에서는 이미 1페이지권에 근접해 있는데 클릭 0건 — 콘텐츠보다 SERP상에서 실제로 클릭을 유도하는 문제(제목/메타 매력도, 리치 결과 미노출 등)일 가능성. 이번 세션에선 조치 안 함, 다음 세션에서 모바일 SERP 실제 노출 형태를 확인해볼 만한 단서로 기록만 해둠.
- **쿼리 전수 분석 방법론**: 순위<60 쿼리 82개를 뽑아 사이트 전체 콘텐츠와 대조. 대부분(chicken thigh temp, lamb chop medium rare, tablespoon/teaspoon 변형, egg 변형, average cost of a meal, metric baking conversion, calculate meat cooking time, turkey breast rest 등)은 07-16 세션들에서 이미 커버됨 확인 — 재작업 안 함.
- **진짜 신규 갭 2건 발견 및 반영**:
  1. **워드프라블럼 쿼리 클러스터** (`you purchase cheese/beef/potatoes/butter at $X per pound, each serving uses Y ounces...`) — 순위 **6.00 / 6.67 / 9.00 / 11.00**로 사이트 전체에서 가장 좋은 순위인데 매칭되는 콘텐츠가 전혀 없었음(소비자수학 교과서/워크시트 스타일 문제로, web_search로 확인 결과 전용 경쟁 사이트 없음 — 니치 자체가 비어있음). `tools/cost-per-serving.html`에 "Worked Example Problems" 섹션으로 4문제 전부 단계별 풀이 추가.
  2. **`raw to cooked potato weight conversion`**(순위 47) — `raw-to-cooked-weight.html`의 `FACTORS` 계산기에 감자가 아예 없음. 조사 결과 감자는 로스팅/베이킹 시 15-35% 감량되지만 삶으면 오히려 거의 안 변하거나 늘어남(USDA 수분함량: 생감자 83.3g/100g → 구운감자 74.9g/100g 기반 역산) — 육류처럼 방향이 일관된 단일 계수가 아예 성립하지 않음. **계산기 옵션에 억지로 추가하지 않고**, "왜 감자가 목록에 없는지"를 설명하는 비교 섹션을 콘텐츠로 추가해서 계산기 정확도를 지키면서 쿼리는 커버.
- 두 파일 다 sitemap lastmod 07-18 갱신. 단어수: cost-per-serving 985→1251, raw-to-cooked-weight 1331(변경분 반영 후). 검증: div 밸런스/JSON-LD/sitemap XML/고아페이지/반응형 그리드 전체 통과.
- **llms.txt 재확인**: 07-16(2차) 기록에 남아있던 "butter-converter/baking-substitutions/cups-to-tablespoons/raw-to-cooked-weight 4개 누락" 이슈는 이번에 확인해보니 **이미 해소되어 있었음**(17개 툴/40개 블로그 전부 등록 확인). 원인 불명이나 이후 어느 세션에서 처리된 것으로 보임 — 이 항목은 이제 다음 세션 과제 목록에서 제외해도 됨.
- **이번 세션에서 신규 툴/블로그는 만들지 않음** — 쿼리 상위 40개(노출 기준)를 전부 검토했으나 기존에 커버된 클러스터의 변형이거나(cooking calculator, kitchen calculator 등 제네릭 헤드텀, 순위 58~91위권) 이미 07-16에 기각한 후보(sous vide 등)와 동일 계열이었음. "신규가 반드시 있어야 한다"는 이전 세션의 지적은 07-16(2차)에서 이미 반영되었고, 이번 회차는 데이터가 신규보다 보강을 정당화하는 쪽이라 판단.
- **수익화 관점 판단**: 병목은 여전히 콘텐츠가 아니라 색인(66개 중 13개만). 다만 이번 2건은 **이미 인덱싱되어 노출이 잡히고 있는 페이지**(cost-per-serving 154회 노출, raw-to-cooked-weight 349회 노출)에 대한 보강이라 색인 문제와 무관하게 클릭 전환에 바로 기여할 수 있는 작업으로 우선순위를 매김 — 미색인 상태인 페이지 확장보다 이런 "이미 노출되는데 클릭 안 되는" 지점을 계속 우선할 것을 다음 세션에도 권장.

### 2026-07-18 (2차): 카테고리 확장 리서치 — "신규 계산기" 전략의 경쟁 지형 변화 확인 + 계란 보관 FAQ 1건 (커밋 예정)
- 사용자가 GA(애널리틱스, 이번엔 자료 없이 구두로만)를 근거로 "Organic Search가 실제로는 1위인데 GSC는 구글만 잡아서 그렇다, 구글 데이터만으로 결론내지 말고 신규 확장 국면으로 봐야 한다"고 지시. 카테고리를 넓혀서 신규 계산기/콘텐츠 후보를 web_search로 탐색.
- **핵심 발견 — 매우 중요, 다음 세션 필독**: 최근 몇 달 사이 "요리 계산기" 틈새 전체가 AI 생성형 콘텐츠팜 도메인들에 의해 빠르게 클로닝되고 있음. 이번 세션에서 확인한 6개 후보 카테고리(압력솥/Instant Pot 시간변환, 커피 물비율 계산기, 이스트 환산 계산기, 케이크 팬 사이즈 변환기, 파티 인원수별 음식량 계산기, 냉장/냉동 보관기간 계산기) **전부** 이미 5~9개의 전용 경쟁 사이트가 존재함을 확인. 특히 다음 도메인들이 여러 카테고리에 걸쳐 반복 등장 — `crunchmilk.com`, `cookingcalchub.co`, `cookcalculator.net`, `agentcalc.com`, `handychefdom.com`, `cosmomath.com`, `usecalcpro.com`, `best-calculators.com`, `calckitchen.com`(기존에 이름 유사 경쟁사로 이미 파악됨), `kitchencalcs.com`(마찬가지) — 이들은 짧은 기간에 요리 계산기 카테고리를 거의 전 영역에 걸쳐 프로그래매틱하게 찍어내고 있는 것으로 보임(메타데이터 age 값들이 대부분 2025년 말~2026년 초로 최근).
- **결론**: "아직 없는 계산기 아이디어를 찾아서 만든다"는 07-16(2차)식 전략(그때는 slow-cooker-converter가 실제로 틈새였음)이 **이제는 거의 통하지 않음**. 확인한 6개 후보 전부 기각 — 새로 계산기 아이디어를 낼 때마다 이 목록의 도메인들이 이미 선점했을 가능성을 최우선으로 의심하고 시작할 것. **7번 섹션의 "회피 대상 대형 사이트" 리스트에 이 도메인 그룹도 사실상 준-회피 대상으로 추가해서 판단할 것.**
- **그래도 진행한 것**: `tools/egg-converter.html`에 "How long do eggs last in the fridge, and does size change that?" FAQ 1개 추가(USDA 기준 3-5주, 삶은 계란 1주). 새 페이지를 만드는 대신 **이미 순위/노출이 잡혀있는 기존 페이지에 인접 롱테일 질문을 얹는 방식**(07-18 1차 세션과 동일 전략)으로 진행 — 이 방식은 계산기팜 경쟁과 무관하게 우리 페이지 자체의 토픽 권위를 넓히는 것이라 리스크가 낮음. sitemap lastmod 07-18 갱신, JSON-LD/div밸런스 검증 통과, 단어수 1020.
- **다음 세션 방향 제안**: (1) 신규 "독립 계산기 페이지" 기획은 이제 기본값이 "일단 의심"으로 바뀌어야 함 — 반드시 위 도메인 그룹 포함해서 web_search 먼저. (2) 대신 이미 순위가 잡힌 페이지에 인접 롱테일 질문(보관기간, 안전 온도, 인분수 등)을 FAQ로 얹는 방식이 지금 국면에서 더 안전하고 효율적인 확장 경로. (3) GA에서 구글 외 유입이 늘고 있다는 사용자 언급은 GSC만으로 판단하지 말라는 근거가 됨 — 다음 세션에서 GA export를 실제로 받으면 채널별(Organic Search 세부 검색엔진 구분 가능하면) 데이터를 반드시 확인할 것.

**롱테일 키워드 백로그 (다음 세션 즉시 활용 가능하도록 기록)**
- 아래는 이번 세션 GSC 636개 쿼리 전수 분석 + 카테고리 확장 리서치에서 나온 것 중, 이번엔 반영 안 했지만 향후 후보로 남겨두는 것들:
  - `steak calculator` / `cook time calculator` / `cook time converter` (제네릭 헤드텀, 순위 57~59) — 신규 스테이크 전용 계산기까지는 과함, 대신 `blog/how-long-to-cook-steak.html`에 두께별 요약표가 이미 있는지 다음 세션에서 재확인하고 없으면 보강 후보.
  - `metric baking conversion` / `cooking conversion calculators` 계열 제네릭 쿼리 — 이미 커버됨, 재작업 불필요하나 노출 늘면 재점검.
  - **감자류 후속**: `raw-to-cooked-weight.html`에 추가한 감자 설명 섹션이 실제로 "potato" 관련 신규 노출을 만드는지 다음 세션에서 확인 — 늘면 감자를 FACTORS에 조리법별로 분리해서 추가하는 것도 재검토 가능(로스팅 전용으로 한정하면 단일 계수가 성립할 수 있음).
  - **계란 보관 FAQ 반응 확인**: `egg-converter.html`에 추가한 보관기간 FAQ가 노출을 만드는지 확인 후, 반응 있으면 `how-many-eggs-in-a-cup.html`이나 `how-to-substitute-egg-sizes.html`에도 유사 패턴(각 페이지 핵심 주제에 인접한 보관/안전 질문 1개씩)으로 확장 검토.
  - **카테고리 확장 후보 중 "완전 포화 확인"으로 폐기(재검토 금지)**: 압력솥/Instant Pot 시간변환기, 커피 물비율 계산기, 이스트 환산 계산기, 케이크 팬 사이즈 변환기, 파티 인원수별 음식량 계산기, 냉장/냉동 식품 보관기간 계산기(이상 6개, 위 07-18(2차) 항목 참고 — 이유는 전부 5개 이상 전용 경쟁 사이트 존재).
  - **터키(칠면조) 인분수 계산기(`how much turkey per person`)**: 경쟁이 계산기팜이 아니라 Today/GoodHousekeeping/TasteOfHome 같은 대형 미디어 브랜드 + `inchcalculator.com`(기존 회피 리스트에 이미 있음)라 신규 독립 페이지는 무리. 다만 계절성(추수감사절, 11월) 콘텐츠라 `blog/how-long-to-cook-turkey-breast.html`에 "인분수" FAQ 1개 얹는 정도는 저위험 후보로 가을 시즌 전에 재검토. **→ 07-18(3차)에서 실행 완료(커밋 `ef1c147`)** — "How many people does a turkey breast feed?" FAQ 추가, 기존 무게표 재사용(boneless 0.5lb/bone-in 0.75lb per person 기준). 추수감사절 전 인덱싱 시간 확보 목적으로 미리 반영.

### 2026-07-18 (4차): 신규 카테고리 "Guides" 신설 — Tools/Blog 외 3번째 콘텐츠 축 (커밋 `0f87697`)
- 사용자가 이전 세션에서 준 nav 스크린샷(Home/Tools/Blog/About)의 진짜 의도를 뒤늦게 파악: "Blog에 글 하나 더"가 아니라 **"Tools/Blog 외에 완전히 새로운 카테고리를 하나 더 만들자"**는 요청이었음. 07-16 이후 반복된 "신규 계산기 아이디어가 전부 콘텐츠팜에 선점됨" 문제를 우회하는 방향으로, 새 계산기 UI를 만드는 대신 **이미 있는 툴/블로그를 묶는 필러(pillar)/허브 페이지 카테고리**를 신설.
- **사이트 구조 변경**: `nav.js`에 `GUIDES` 배열 신설(TOOLS/BLOGS와 동급). PC 헤더, 모바일 드롭다운, 푸터 컬럼에 "Guides" 항목 추가. `guides-grid` id 기반 자동 카드 렌더링 로직 추가(blog-grid와 카드 스타일 재사용, 카테고리 재정의 아님). `/guides/index.html`(허브 목록 페이지), `/guides/complete-meal-prep-budget-guide.html`(1호 가이드) 신설.
- **1호 가이드 "The Complete Meal Prep & Grocery Budget Guide"**(1013단어): meal-cost-calculator/cost-per-serving/weekly-meal-prep-cost-calculator 3개 툴 + grocery-budget-tips 등 블로그 5개를 하나로 묶음. 단순 요약이 아니라 "어떤 계산기를 언제 쓸지" 비교표, 예산 벤치마크 통합, "그로서리 절약 전술을 실제 영향력 순으로 랭킹"(단백질 선택 > 배치쿠킹 > 완제품 회피 > 로열티/스토어브랜드) 같은 **기존 어느 페이지에도 없던 신규 종합/비교 콘텐츠**로 구성 — AI 검색이 콘텐츠 깊이를 중시한다는 방향성에 맞춤. Article + FAQPage JSON-LD 적용(FAQ 3개).
- 체크리스트 반영: `index.html`에 Guides 섹션(guides-grid) 추가, `llms.txt`에 Guides 섹션 추가, `sitemap.xml` 2개 URL 추가(lastmod 07-18), `cost-per-serving.html`/`weekly-meal-prep-cost-calculator.html`의 Related 박스에 신규 가이드 링크 추가(내부링크 2곳 확보, 고아페이지 방지).
- 검증: div 밸런스, JSON-LD 파싱, sitemap XML, `node --check`로 nav.js 구문 검사, 고아페이지 체크(guides 디렉토리 포함하도록 스크립트 자체도 확장), 반응형 그리드 — 전부 통과. 카운트: tools 17 / blogs 40 / **guides 1**(신규) / sitemap 65.
- **다음 세션 참고**: 이제 신규 페이지 추가 시 카운트 검증 스크립트(2번 섹션)에 `guides: $(ls guides/*.html | grep -v index.html | wc -l)`도 추가해서 같이 확인할 것 — 지금은 1개뿐이라 드리프트 위험 낮지만 늘어나면 필요. 향후 Guides 후보(만들 때 참고): "The Complete Meat Cooking & Temperature Guide"(meat-temperature-guide/cooking-time-calculator/raw-to-cooked-weight + how-long-to-cook-* 블로그 다수 통합), "The Complete Baking Conversion Guide"(cups-to-grams/tablespoon-teaspoon/butter-converter/egg-converter/oven-temp-converter/baking-substitutions 통합) — 둘 다 기존 콘텐츠 재구성형이라 경쟁 리서치 부담 낮음, 다음 "신규" 요청 때 우선 후보로 검토할 것.

### 2026-07-18 (5차): 신규 툴 아이디어 9종 연속 포화 확인 — "신규 독립 계산기" 전략 사실상 종료 판단 + Guides 2호 발행 (커밋 `f140877`)
- 사용자가 "경쟁 심하면 롱테일로 피하되, 일단 신규를 진행하라"고 지시. 먼저 지난 세션에 예고한 Guides 2호("The Complete Meat Cooking & Temperature Guide")를 발행(툴 3개+블로그 13개 통합, 962단어, "어떤 툴을 언제 쓸지" 비교표+단백질별 안전온도 요약+조리시간 인덱스+공통 트러블슈팅 4가지로 구성. 새 수치는 만들지 않고 기존 meat-temperature-guide 차트 재사용).
- 이어서 신규 독립 툴 아이디어를 "롱테일 각도"로 다시 탐색: **스테이크 전용 두께+굽기별 계산기**(기존 cooking-time-calculator가 무게 기반이라 두께 기반 스테이크엔 구조적으로 안 맞는다는 진짜 갭을 찾아서 시도), **고도별 베이킹 보정 계산기**(완전히 새로운 카테고리, 우리 사이트에 전혀 없는 개념) — 둘 다 web_search로 확인한 결과 **각각 7개 이상의 전용 경쟁 계산기 사이트가 이미 존재**함을 확인하고 기각.
- **07-18(2차)에서 이미 6개 확인했던 것에 이번 2개를 더해 총 9개 후보 전부 포화로 확인됨** — 압력솥/Instant Pot, 커피 물비율, 이스트 환산, 케이크 팬 변환기, 파티 인원수별 음식량, 냉장/냉동 보관기간, 스테이크 두께/굽기 계산기, 고도별 베이킹 보정. **9개 중 9개 전부 콘텐츠팜/전용 사이트에 이미 선점됨.** 이 정도면 우연이 아니라 구조적 현상으로 판단해도 됨 — **"요리 계산기" 성격의 신규 독립 페이지는 당분간(다음 몇 세션) 기본적으로 시도하지 않는 쪽으로 방향을 굳힐 것.** 아주 구체적인 GSC 실제 쿼리 갭이 나오지 않는 한, 새 계산기 아이디어를 web_search 없이 제안하지 말 것.
- **회피 대상 준-그룹에 신규 도메인 추가**: missvickie.com, tooliro.com, steakrecipe.org, bbqtoolbox.com, meatidentifier.com(ButcherIQ), beef.foodnutrify.com, elevationbaking.com, simplyaltitude.com, inclinebaked.com — 07-18(2차) 목록과 합쳐서 아래 9번 섹션에 통합 반영.
- **결론 — 다음 세션 신규 전략**: (1) "독립 계산기 툴" 신규는 보류. (2) 대신 **Guides(필러 페이지)** 확장이 지금 가장 안전한 "신규" 경로 — 이미 사이트에 있는 콘텐츠를 재구성하는 거라 경쟁 리서치 부담이 없음. 다음 후보: "The Complete Baking Conversion Guide"(cups-to-grams/tablespoon-teaspoon/butter-converter/egg-converter/oven-temp-converter/baking-substitutions 통합). (3) 블로그는 계산기와 경쟁 구도가 다름(콘텐츠 자체로 경쟁, farm 사이트들도 결국 블로그 프로즈는 대량으로 못 찍어냄) — 롱테일 신규 블로그 주제는 계속 유효한 옵션이니 다음 세션에서 GSC 쿼리 재확인 후 시도할 것.

### 2026-07-18 (6차): Guides 3호·4호 + 블로그 2건 신규 발행 — "최대한 늘려라" 지시 이행 (커밋 `d847f8f`, `1bed6e5`)
- 사용자가 "경쟁 심하면 롱테일로 피하되, 블로그랑 가이드는 최대한 추가해봐"라고 지시. 07-18(5차)에서 정리한 방향(계산기 신규 보류 → Guides/블로그 중심)을 바로 실행.
- **Guides 3호 "The Complete Baking Measurement & Conversion Guide"**(945단어): 사이트 최대 콘텐츠 클러스터(툴 9개+블로그 16개) 통합. 컨버터 선택표, 외워둘 핵심 수치 목록, 무게vs부피, 계량 실수 4가지 섹션.
- **Guides 4호 "The Complete Recipe Scaling & Serving Guide"**(761단어): recipe-multiplier 툴 + 블로그 5개(scale/reduce/half/metric/serving-size) 통합. 상황별 선택표, 선형으로 안 늘어나는 것들(리빙제/소금/조리시간/팬사이즈), 계란 스케일링 문제 섹션.
- **신규 블로그 1: "Is Your Oven Running Hot or Cold? How to Test It"**(866단어) — 오븐 다이얼 부정확성(25-50°F 오차 흔함), 오븐온도계 정확 테스트법, 설탕으로 온도계 없이 대략 테스트하는 법(설탕 캐러멜화 ~365°F 이용), 핫스팟 체크법, 오프셋 보정법. oven-temp-converter 툴과 직결되는데 사이트에 전혀 없던 트러블슈팅 주제.
- **신규 블로그 2: "How Long Can Food Sit Out? The 2-Hour Rule Explained"**(936단어) — USDA 2시간 룰/90°F 이상 1시간 단축/데인저존(40-140°F)/누적 시간 계산/2시간룰 예외 식품/재가열의 한계/대용량 냉각법(얕은 용기 분산). 사이트 여러 페이지에 흩어져 있던 "danger zone"/"2 hours" 언급을 전용 페이지로 통합.
- **경쟁 리서치 접근 구분**: 이 2개 블로그 주제는 web_search로 확인한 결과 계산기팜이 아니라 개별 에디토리얼 블로그/미디어(mrappliance, thermoworks, seattletimes 등)와 경쟁하는 영역 — 09번 섹션의 "계산기 회피 로직"과는 다른 카테고리로 판단, 콘텐츠 품질로 승부 가능하다고 보고 진행함. (참고: "계란 신선도 float test" 주제도 검토했으나 attainable-sustainable/tasteofhome/happyegg 등 이미 매우 많은 대형 에디토리얼 사이트가 있어 이번엔 보류 — 07-18(2차)에서 egg-converter에 이미 보관기간 FAQ를 추가한 상태라 우선순위를 낮춤.)
- 전부 nav.js 등록(BLOGS 42개/GUIDES 4개), sitemap.xml 반영(70개 URL), llms.txt 반영, 각 신규 페이지당 내부링크 2곳 이상 확보(고아페이지 0건 확인).
- **이 세션(07-18) 전체 신규/보강 총계**: Guides 4개 전부 신규, 블로그 신규 2개(is-your-oven-running-hot-or-cold, how-long-can-food-sit-out), 기존 페이지 보강 다수(cost-per-serving 워드프라블럼, raw-to-cooked-weight 감자, egg-converter 보관FAQ, turkey-breast 인분수FAQ). 카운트: tools 17(변동없음) / blogs 42(+2) / guides 4(신규) / sitemap 70.
- **다음 세션 참고**: Guides 후보는 이번에 4개로 사실상 사이트 전체 콘텐츠를 다 커버함(meal-prep/meat-cooking/baking-conversion/recipe-scaling) — 당장 5번째 Guide를 만들 명확한 새 클러스터는 안 보임, 억지로 쪼개지 말 것. 블로그는 이번에 다룬 "트러블슈팅/식품안전" 계열이 반응 좋으면 유사한 각도(예: 도마/조리도구 관리, 냉장고 정리 등)로 더 발굴 가능 — 다음 GSC 데이터로 반응 확인 후 판단.

### 2026-07-18 (7차): Guides 내부링크 부실 지적 및 전면 보강 — 47개 페이지 (커밋 `544438c`)
- 사용자가 정확히 지적: **Guides가 각각 6~16개 페이지를 참조/링크하는데, 정작 그 페이지들에서 가이드로 되돌아오는 링크는 페이지당 딱 2개뿐**이었음. 07-18(6차)에서 만든 4개 가이드 전부 "고아페이지 방지용 최소 2개" 기준만 채웠을 뿐, 필러페이지(허브-스포크) 전략에 필요한 "가이드가 참조하는 모든 스포크 페이지가 가이드로 되돌아 링크"는 안 되어 있었음 — 필러페이지 SEO/토픽 클러스터 전략의 핵심을 놓친 상태였음.
- 각 가이드의 실제 참조 목록을 다시 추려서 47개 파일에 일괄 보강:
  - meal-prep-budget 가이드 → +5개 페이지
  - meat-cooking-temperature 가이드 → +14개 페이지
  - baking-conversion 가이드 → +22개 페이지(사이트 최대 클러스터)
  - recipe-scaling 가이드 → +4개 페이지
- 작업 방식: 36개 파일은 기존 "Related Guides"/"Related Tools & Guides" `<h3>+<ul>` 패턴을 정규식으로 찾아 스크립트로 일괄 삽입, 나머지 11개(관련 박스가 아예 없거나 다른 텍스트 패턴("Related tools & guides:" strong 태그, 화살표 위치가 텍스트 뒤 등) 사용)는 개별 확인 후 수동 추가. `tools/butter-converter.html`, `tools/baking-substitutions.html`은 애초에 관련 섹션 자체가 없었어서 새로 만들어 추가함.
- **결과(가이드별 실제 인바운드 링크 수, 기존 2개 → 보강 후)**: meal-prep-budget 9개, meat-cooking-temperature 17개, baking-conversion 26개, recipe-scaling 6개.
- 검증: 사이트 전체 66개 콘텐츠 파일(blog+tools+guides) div밸런스/JSON-LD 파싱 전수 통과, sitemap XML 유효, nav.js 구문 정상, 고아페이지 0건.
- **다음에 신규 Guide 만들 때 반드시 지킬 것**: 가이드 본문에 링크로 언급한 페이지는 **전부** 그 페이지에서도 가이드로 되돌아오는 링크를 넣을 것 — "최소 2개만 채우면 된다"는 고아페이지 방지 기준과, "필러페이지가 제대로 기능하려면 클러스터 전체가 상호링크되어야 한다"는 기준은 별개임. 신규 가이드 발행 체크리스트에 이 항목을 추가로 취급할 것.
- **추가 자체 QA(같은 세션, 커밋 `18f388a`)**: 사용자가 "더 할 게 있냐"고 물어봐서 자체 점검하다가 읽기시간 오류 발견 — 오늘 만든 가이드 4개+블로그 2개 전부 실제 단어수(145wpm 기준) 대비 임의로 분 단위를 써놔서 최대 5분까지 어긋나 있었음(예: 761단어 가이드에 "9 min read"). 전체 48개 blog+guides 파일을 스크립트로 재검산해서 오늘 것 6개 + 기존부터 있던 드리프트 4개(oven-temperature-conversion-guide 등) 총 10개 수정. **다음 세션도 새 페이지 발행 후 이 방식으로 스윕 검사하는 습관 들일 것** — 체크리스트에 "읽기시간 실제 단어수 대비 검산"을 명시적 스크립트 항목으로 승격.

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
- [ ] **(Guides 신규 발행 시 추가 필수)** 가이드 본문에서 링크로 언급한 페이지는 "최소 2곳" 기준과 별개로 **전부 다** 가이드로 되돌아오는 링크를 넣을 것 — 07-18(7차)에서 이걸 빠뜨렸다가 사용자 지적으로 47개 파일 일괄 보강한 적 있음(3번 섹션 참고). 필러페이지는 클러스터 전체 상호링크가 핵심.
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

# 반응형 그리드 누락 체크 (2026-07-16 추가) — grid-template-columns를 인라인으로 쓰면서
# 같은 파일에 @media 쿼리가 하나도 없으면 모바일에서 잘릴 위험. 새 파일 만들거나 그리드 손댈 때마다 실행.
for f in FILE; do
  if grep -q "grid-template-columns" "$f" && ! grep -q "@media" "$f"; then
    echo "반응형 미디어쿼리 없음: $f"
  fi
done

# 읽기시간(min read) 검산 (2026-07-18 추가) — blog-meta의 "N min read"가 실제 <main> 단어수 대비
# 145wpm 기준과 1분 넘게 어긋나면 출력. 새 블로그/가이드 발행하거나 본문 분량 바꿀 때마다 실행.
python3 -c "
import re
html = open('FILE').read()
meta = re.search(r'blog-meta\">[^<]*·\s*(\d+)\s*min read', html)
m2 = re.search(r'<main.*?</main>', html, re.S)
text = re.sub('<[^>]+>', ' ', m2.group(0))
words = len(text.split())
expected = round(words/145)
stated = int(meta.group(1)) if meta else None
print(f'words={words} expected={expected}min stated={stated}min', '<<< 확인 필요' if stated and abs(stated-expected)>1 else 'OK')
"
```

---

## 5. HTML 작성 규칙

### 툴 페이지 필수 구성
1. `<head>` — title, description, canonical, AdSense 코드, JSON-LD WebApplication Schema
2. 툴 본체 (계산기 UI) — input 클래스는 `form-group` (**input-group 아님**)
3. **폼 입력이든 결과 표시든, 그리드(2열 이상)가 하나라도 있으면 반드시 모바일 미디어쿼리로 1열 전환.** (2026-07 초에 폼 입력 그리드 6개 파일에서 이거 누락돼서 모바일 깨졌던 적 있고, **2026-07-16엔 결과(result) 그리드 3개 파일에서 똑같은 실수가 또 나와서 사용자가 스크린샷으로 직접 지적함** — `oven-temp-converter.html`의 °F/°C/Gas Mark 3열, `cups-to-tablespoons.html`/`tablespoon-to-teaspoon.html`의 2열. "폼 입력"에만 적용되는 규칙이라고 좁게 해석하지 말 것 — **grid-template-columns를 쓰는 모든 인라인 스타일**에 적용됨.) 클래스명 붙이고 `@media(max-width:600px){ .클래스 { grid-template-columns:1fr !important; } }` 패턴 사용. **신규 툴 만들 때 결과 박스를 grid로 배치한다면 처음부터 이 미디어쿼리를 같이 넣을 것 — 나중에 발견되는 게 아니라 처음부터 체크리스트 항목으로 취급.**
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

- PC 헤더: `<a href="/tools/">Tools</a>`, `<a href="/blog/">Blog</a>` 단순 링크 (JS 전용)
- 모바일 헤더: TOOLS/BLOGS 기반 드롭다운 유지 + 상단 "View All" 링크 (JS 전용)
- footer: 각 섹션 상위 6개 + "View All" 링크 (JS 전용)
- **(참고) 2026-07-16에 "footer가 JS 전용이라 색인이 안 된다"는 진단으로 63개 페이지 footer/허브페이지를 정적 HTML로 바꿨다가, 사용자가 명확히 틀린 진단이라고 지적해서 같은 세션에 전부 되돌림** (커밋 `be325d2` → `783b51e`). Google은 실제로 JS를 렌더링하므로 이 구조 자체는 문제가 아니었음. **다시 이 방향으로 손대지 말 것** — 3번 섹션의 07-16(3차) 항목 참고.
- **DOMContentLoaded 핸들러 안에 반응형 테이블 자동 래핑 IIFE 포함됨** (3번 항목 참고) — 이 부분은 건드릴 일 거의 없음, 새 테이블 만들 때 자동 적용됨

---

## 7. SEO 진행 이력 및 현재 상태

### 색인 현황 추이
| 날짜 | 미색인 | 색인됨 | 비고 |
|------|--------|--------|------|
| 06-18 | - | - | GSC 등록 초기 |
| 07-04 | 53 | 9 | 최초 정밀 점검 |
| 07-10 | (재확인 필요) | (재확인 필요) | 이번 세션 작업들이 아직 반영 안 됐을 가능성 높음 (크롤링 지연) |
| 07-13 | 53 | 9 | Coverage 차트가 06-30 데이터까지만 나옴(크롤 지연 지속) — 06-30 스냅샷 기준 07-04와 동일. 단, Performance(검색실적) 리포트엔 13개 URL이 노출 데이터를 갖고 있어 실제로는 06-30 이후 더 인덱싱됐을 가능성 있음. 클릭수는 3개월간 0건 지속(노출 대부분 순위 50~100위권).
| 07-16 | 47(발견됨·미색인) + 2(크롤링됨·미색인) = 49 | 13 (07-01 기준, Coverage 차트가 07-10까지만 갱신됨 — 크롤 지연 여전) | 색인 13개는 07-13 기록의 "13개 URL 노출 데이터 보유" 추정과 정확히 일치, 실측 확인됨. sitemap 62개 + 리디렉션 포함 4개(http→https 버전) = 66개와 49+13+4(리디렉션은 별도 집계)로 대략 정합. **핵심 병목은 여전히 색인 자체** — 전체 66개 중 13개만 색인, 47개가 "발견됨(크롤링 큐 대기)" 상태로 몇 주째 정체. 클릭수는 3개월 누적 여전히 0건. |
| 07-18 | 47+2=49 (변화 없음) | 13 (Coverage 차트가 여전히 07-10까지만 갱신 — 크롤 지연 지속, 숫자 자체는 갱신 안 됨) | 색인 개수는 07-16과 완전히 동일 — 진전 없음. 클릭 3개월 누적 여전히 0건. 노출은 계속 우상향(07-14/15 각 333회, 신고점). **신규 발견**: 모바일 평균 순위 14.71위 vs 데스크톱 64.64위로 기기간 격차 큼 — 모바일에서는 사실상 1페이지권인데도 클릭 0건, 다음 세션에서 원인 살펴볼 단서로 기록만 해둠. |
| 07-20 | 47+2=49 (변화 없음) | 13 (Coverage 차트 여전히 07-10 스냅샷 — 3세션째 갱신 안 됨) | 색인 수치 3세션 연속 완전 동일 — 정체 지속. 클릭 3개월 누적 여전히 0건. 노출 신고점 갱신(07-17, 414회). 모바일 평균순위 13.1위(개선)로 격차는 좁혀지는 추세지만 클릭은 여전히 0. Performance 리포트 기준 노출 발생 URL이 18개로(13개보다 많음) 실제 색인이 늘었을 가능성 있으나 Coverage 미갱신으로 미확정. |
| 07-24 | (Coverage export 미제공 — 이번 세션은 확인 불가) | (Coverage export 미제공) | **첫 클릭 발생** — 07-20/07-21 각 1건씩 총 2건(미국, cost-per-serving.html + cooking-time-calculator.html). 노출 신고점 재경신(07-21, 863회). 모바일 평균순위 11.75위로 추가 개선. 다음 세션에서 Coverage export 받으면 색인 수치가 실제로 늘었는지 꼭 확인할 것 — Performance 기준 노출 URL 수가 계속 늘고 있어(18개→더 많을 가능성) 색인 정체가 풀렸을 가능성이 있음. |

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
- **회피 대상 준-그룹(2026-07-18 추가, "요리 계산기" 콘텐츠팜 클러스터)**: crunchmilk.com, cookingcalchub.co, cookcalculator.net, agentcalc.com, handychefdom.com, cosmomath.com, usecalcpro.com, best-calculators.com, calckitchen.com, kitchencalcs.com, missvickie.com, tooliro.com, steakrecipe.org, bbqtoolbox.com, meatidentifier.com, beef.foodnutrify.com, elevationbaking.com, simplyaltitude.com, inclinebaked.com — 신규 계산기 아이디어를 낼 때마다 이 그룹이 이미 선점했을 가능성부터 web_search로 확인할 것 (3번 섹션 07-18(2차)/(5차) 참고). **9개 후보 연속 포화 확인(07-18 기준) — 당분간 독립 계산기 신규는 기본적으로 보류, Guides/블로그 쪽으로 신규 방향 전환.**
- **회피 대상 추가(2026-07-20)**: calculators.org, calculator.me — 둘 다 "Meat/Beef Cost Per Serving Calculator"를 University of Nebraska-Lincoln 데이터 인용해서 운영 중, cost-per-serving/meal-cost 니치의 직접 경쟁자로 web_search 중 확인됨(3번 섹션 07-20 참고).
- **회피 대상 추가(2026-07-20, 2차)**: 해동/재료환산/조리시간 3개 신규 콘텐츠팜 클러스터 발견 — traditionaloven.com, aqua-calc.com, bakeprofit.com, cookingconverter.com, thebakingcalculator.com(재료 그램/컵 환산), quickcooktime.com, howlongfor.com, cookrita.com, butcherbbq.com(조리시간 계산기), justfridge.com, thecalculatedcook.com, howlongtodefrost.com(해동 계산기). 신규 후보를 낼 때마다 위 9번(회피 리스트) 전체와 함께 확인할 것.
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

**백링크 현황 (2026-07-16, 사용자 확인)**: 사용자가 API로 확인한 백링크 수는 **70개 이상**. "백링크 부족이 색인 지연의 원인"이라는 추정은 근거 없이 넘겨짚은 것이었고 사용자가 명확히 부인함 — **다음 세션에서 색인 문제를 백링크 부족 탓으로 돌리지 말 것.**

---

## 11. 정기 업데이트 주기

| 요일 | 작업 |
|------|------|
| 토요일 | 신규 콘텐츠 작업 (블로그/툴, 그때그때 자료 기반 결정) |
| 일요일 | GA + Search Console 분석, 보강 작업, 색인 상태 점검 |

※ 요일 고정보다 사용자가 자료(GA/GSC 스크린샷 or CSV export + 새 GitHub 토큰)를 들고 오는 시점에 맞춰 진행하는 패턴이 계속됨. **주간 정기 작업과 별개로 "추가 작업"을 요청하는 경우도 있음** (2026-07-11 사례: 주간 작업 끝난 후 남은 토큰으로 GSC 데이터 기반 추가 보강 요청) — 이런 경우 별도 세션으로 취급하고 동일한 검증 절차를 그대로 적용할 것.

---

## 12. 수익화 계획

- 1단계 AdSense: 코드 삽입 완료, **2026-07-24 기준 심사 신청 중** (사용자가 신청 절차 진행함)
- **2단계 Affiliate 제휴 시작 시점은 이제 Claude(어시스턴트)가 직접 판단한다** (2026-07-24, 사용자 지시) — 트래픽/전환 데이터를 보고 시작해도 되겠다 싶으면 그렇게 제안·진행하면 됨. 사용자에게 "지금 해도 될까요" 허락을 구할 필요 없이, 데이터 근거를 들어 판단하고 실행 후 보고하는 방식으로 전환.
- AdSense 심사가 보류/반려될 경우에도 Claude가 상황을 보고 재판단 — 예를 들어 반려 사유가 트래픽 부족이면 트래픽이 더 쌓일 때까지 재신청을 미루자고 제안하는 식. 이 판단에 사용자가 미리 규칙을 정해두지 않았으므로, 다음 세션에서 심사 결과가 나오면 그 시점 데이터(클릭률, 트래픽 규모, 반려 사유 등)를 근거로 다시 판단할 것.
- affiliate 홀더(빈 링크/배너)를 미리 넣지 않는다는 기존 원칙은 유지 — 다만 "언제부터 넣어도 되는가"의 판단 주체가 사용자에서 Claude로 바뀐 것뿐, 원칙 자체(트래픽/전환이 실제로 붙기 전에는 시작 안 함)는 그대로.

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