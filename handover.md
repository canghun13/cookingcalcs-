# CookingCalcs 현황 및 인수인계 (2026-09-07 기준)

이 문서는 2026-07-24 버전 인수인계 문서를 기반으로, 이후 진행된 모든 작업 내역을 반영해 갱신한 버전입니다. 새 세션에서는 이 문서만 보고 바로 작업 이어가면 됩니다.

---

## 0. 이 문서 사용법 (새 세션 시작 시 최우선 확인)

0. 🚨 **2026-08-03 기준 전략/KPI 재정렬(중요, 계속 유효)**: 이 사이트의 실제 트래픽은 구글이 아니라 Bing/Yahoo/AI검색/Direct다
   (GSC 3개월 클릭 5건 vs GA4 28일 세션 309). **KPI는 GA4 세션수·활성사용자로 본다. 구글 노출/순위는 후행 참고 지표다.**
   애드센스에 의존하지 않고 공격적 확장(신규 발행) 기조를 유지한다. 09번 섹션의 "회피 리스트"는 구글 SERP 기준으로
   만든 것이므로 **더 이상 자동 기각 근거로 쓰지 말 것** — "우리가 더 정확하고 구조화된 답을 낼 수 있는가"로 판정할 것.
   자세한 내용은 3번 섹션 `2026-08-03 (15차)`의 "★ 전략 재정렬" 항목을 볼 것.
0-2. 🚨 **기본 전략: 공격적 확장(신규 클러스터 발행). 이건 바뀌지 않는다**
   - **Bing: 노출 835·클릭 15·CTR 1.80%·평균 약 5위 / 구글: 노출 9,285·클릭 5·CTR 0.05%·평균 44.7위.**
     구글 노출이 11배 많은데 클릭은 Bing이 3배다. **Bing에서는 이미 1페이지 상위권에 있다.**
   - Bing 순위가 이미 좋다는 건 **콘텐츠 방향이 맞다는 신호**로 읽을 것. 타이틀에 답/숫자를 앞세우는
     패턴은 신규·보강 작업을 할 때 같이 반영하면 되는 것이지, 그 자체를 별도 과제로 잡지 말 것.
   - **미색인 17개는 "한 번도 크롤링된 적 없음"(최종 크롤링 1970-01-01)이다.** 콘텐츠 품질 문제가
     아니라 크롤링 예산 문제이고, **코드로 고칠 수 있는 게 없다.** 18차의 "800단어 미만이라 노출 0"
     진단은 부분적으로만 맞았다(보강한 17개 중 9개가 여전히 미색인). 자세한 건 20차 항목.
   - 🚨 **공격적 확장(신규 클러스터 발행)이 기본 전략이다. 크롤링 예산이나 CTR을 근거로
     발행 속도를 늦추자는 제안을 하지 말 것.** 미크롤링은 코드로 고칠 게 없는 항목일 뿐이다.
   - 총수익 3개월 연속 0. **애드센스가 풀리기 전엔 트래픽이 늘어도 매출은 0이다.**
0-1. 🚨 **수익화(광고망/제휴/애드센스 재심사) 판단 절차**: 특정 사이트를 미리 정해두지 않는다.
   판단이 선 세션이 직접 조사해서 사용자에게 먼저 제안하는 방식 — 12번 섹션 필독.
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

### 2026-08-31 (22차): 신규 클러스터 — 남은 음식 리히팅 (툴1+블로그1+가이드1)

> 21차와 동일 지시: 키워드 넓게 → 리스트 → 경쟁강도 → 강하면 롱테일 → 웬만하면 클러스터.
> GSC 안에서만 보지 말고 문서수 적고 관심 있는 것을 찾을 것.

#### 경쟁도 판정
| 후보 | 판정 | 근거 |
|---|---|---|
| 도우 프루핑/발효 | **기각** | thebakingcalculator·superglobalcalculator·tooliro·usecalcpro·joteo·sourdougharchive·sourdoughratio·thesourdoughjourney + **missvickie(회피리스트) 계산기 2개**. 계산기팜+사워도우 전용 도메인 이중 포화 |
| 에어프라이어 리히팅 단독 | **기각** | air-fryer-convert·airfryerjourny·airfryfoods·converttoairfryer·airfryconverter·airfryercalculator.net·airfrypro 등 전용 도메인 7곳. **19차의 "에어프라이어 축은 요새" 판정과 일치** |
| **리히팅 "방식 교차" 축** | **채택** | 경쟁자가 FSIS·UNL·Texas DSHS·NC State·Fairfax County·UC Extension 등 **.gov/.edu 안전 PDF**와 일반 블로그뿐. 계산기팜 없음 |

#### ★ 차별화 — 구조적 빈틈 두 개
1. **gov/edu는 "165°F까지"만 말하고 음식별·방식별 소요시간을 주지 않는다.** 에어프라이어팜은
   한 방식만 다룬다. **4개 방식(오븐/에어프라이어/전자레인지/스토브)을 음식별로 나란히 놓은
   비교표가 어디에도 없음** → 우리 `how-long-to-cook-*` 20여 개와 같은 포맷으로 구현.
2. **"165°F(내부 목표)"와 "오븐 설정 온도"를 시중 콘텐츠가 계속 혼동시킨다.** 오븐을 165°F에
   맞추는 실수를 유발함. 두 숫자를 표로 명시 분리한 게 롱테일 진입점.
   관통 논리: **"조리 온도보다 30-50°F 낮게"** — 생식품은 표면을 말리는 게 목적이지만
   남은 음식은 이미 표면이 말라 있으므로 같은 열을 주면 겉이 먼저 상한다.

#### 식품안전 정확성 (YMYL 인접이라 USDA/FSIS 기준만 사용)
165°F 내부 · 소스류 rolling boil · 전자레인지는 덮고 중간에 젓고 2분 정치 ·
**슬로우쿠커/워밍드로어는 리히팅에 부적합**(Texas DSHS) · 냉장 3~4일 · 냉동은 해동 없이 가능 ·
**리히팅이 2시간 룰을 무효화하지 못한다**(기존 `how-long-can-food-sit-out`과 연결).

#### 산출물
- `tools/reheating-calculator.html` (866단어) — 음식 선택 → 4방식 나란히 비교 + 권장 방식 표시
- `blog/how-long-to-reheat-leftovers.html` (1,067단어) — 15개 음식 × 4방식 시간표
- `guides/complete-leftover-reheating-guide.html` (964단어) — 허브

가이드 고유값: "리히팅은 재조리가 아니다"를 조직 원리로 삼고, 두 온도 분리 표 +
텍스처 목표별 방식 선택 표 + 증상별 진단표. 개별 페이지 요약이 되지 않게 함.

#### 정합성 검증
계산기와 블로그의 음식별 온도·시간 일치를 스크립트로 대조(피자·감자튀김·프라이드치킨·밥·
스테이크 전부 OK). 기존 `air-fryer-cooking-times`·`how-long-can-food-sit-out`과 충돌 없음.

#### 사이트 규모
툴 28→**29**, 블로그 71→**72**, 가이드 10→**11**, sitemap 116→**119**.

### 2026-09-07 (24차): 신규 클러스터 — 오븐 공유(한 오븐에 여러 요리) 툴1+블로그2+가이드1

> 지시: 키워드 넓게 → 리스트 → 경쟁강도 → 강하면 롱테일 → 웬만하면 클러스터.
> GSC 안에서만 보지 말고 문서수 적고 관심 있는 것을 찾을 것.

#### 경쟁도 판정 (후보 4건)
| 후보 | 판정 | 근거 |
|---|---|---|
| 쌀-물 비율 | 기각 | 계산기팜 10곳(crunchmilk 회피리스트) — 21차 판정 유지 |
| 파스타 건조↔조리 중량 | 기각 | procalculator·calculatorsonline·cookcalcs·ezcalculatoronline·weighschool·letsfoodie·**missvickie(회피리스트)** 등 8곳 |
| 해동 시간 | 기각 | mycalculatorsonline·**agentcalc(회피리스트)**·chilicravings 등 계산기팜 존재 |
| **오븐 공유** | **채택** | 경쟁자가 Whirlpool·KitchenAid·Maytag(가전 브랜드 마케팅) + 블로그 + **Quora·JustAnswer**. 계산기팜 0개 |

#### ★ 차별화 — 구조적 빈틈 두 개
1. **전원이 "온도를 절충하라"는 산문에서 멈추고, 그 결과 바뀌는 시간을 아무도 계산해주지 않는다.**
   Maytag조차 "시간을 그에 맞게 조정하라"고만 하고 숫자가 없음.
   → **새시간 = 원래시간 × (원래온도 ÷ 새온도)** 구현. 투입시각 로직은 21차 채소 스태거링과
   **동일 알고리즘 재사용**(사이트 내 일관성 확보).
2. **"어느 랙이 더 뜨거운가"에 출처들이 정면 충돌한다.** KitchenAid·OurEverydayLife는 "위",
   Quora는 "아래가 열원에 가깝다". → **오븐이 복사열(하부 열원)과 대류열(상승) 두 종류를 준다**는
   것으로 해소. 아래=바닥 크리스핑, 위=표면 브라우닝. 이 모순을 정리한 곳이 없어 롱테일 진입점.

부수: 크라우딩 보정(2접시 +10%, 3접시 +15%)을 시중 콘텐츠가 언급만 하고 수치화 안 함.
구조적으로 절충 불가한 요리(퍼프페이스트리·슈·수플레·빵·커스터드)를 분리 —
"온도가 속도 설정이 아니라 구조 지시"라는 관점.

#### 산출물
- `tools/oven-sharing-calculator.html` (945단어) — 요리별 온도·시간 입력 → 절충온도·조정시간·투입순서
- `blog/baking-two-things-at-different-temperatures.html` (1,052단어) — 절충 규칙과 한계(50°F/75°F)
- `blog/oven-rack-positions-explained.html` (1,102단어) — 랙 모순 해소
- `guides/complete-oven-sharing-guide.html` (967단어) — 허브

가이드 고유값: **4단계 의사결정 순서**(공유 가능한가→온도→시간→랙·타이밍)로 조직하고
"대부분 2번으로 바로 뛰어넘어 1번을 건너뛴다"는 관점 + 전체 식사 스케줄링(로스트 레스팅
30분 창을 이용) + 증상별 진단표.

#### 정합성 검증
계산기 로직과 본문 워크드 예제 일치 node 검증(30min@400°F→425°F=28분, 45min@350→375=42분).
기존 페이지 충돌 없음(`is-your-oven-running-hot-or-cold`의 오븐 편차 15-25°F 인용,
`air-fryer-vs-oven`의 대류 설명과 일관).

#### 사이트 규모
툴 29→**30**, 블로그 72→**74**, 가이드 12→**13**, sitemap 120→**124**.

### 2026-08-31 (23차): 주간 점검 — Bing 4.4배 성장 확인, 버터 허브 신설

#### ★ Bing이 폭발적으로 성장했다 (전주 대비)
| 지표 | 08-17 | 08-24 | 배수 |
|---|---|---|---|
| Bing 노출 | 835 | **약 3,700** | 4.4배 |
| Bing 클릭 | 15 | **55** | 3.7배 |
| 구글 노출/클릭 | 9,285 / 5 | 9,733 / **5** | 정체 |

- **20차에서 타이틀을 바꾼 3개가 전부 개선됨**: liquid-converter 230→978노출·5→11클릭 /
  butter-converter 156→628노출·0→3클릭 / egg-converter CTR 0.87%→**1.79%**.
  답 선행 타이틀 패턴이 실제로 작동한다는 실증. 단 이건 신규·보강 작업에 묻어서 적용할 것이지
  별도 과제로 잡지 말 것(0-2 참고).
- **Bing 상위**: liquid 978@5.58 / egg-converter 726@4.79 / butter 628@7.21 /
  substitute-egg-sizes 328@4.46(CTR 3.66%) / eggs-in-a-cup 188@5.04 / measure-butter 167@6.72
- **CTR 최고**: oven-temp-converter 11.11%, how-long-to-cook-chicken-breast 9.68%,
  how-to-reduce-a-recipe 9.09%, how-to-reduce-a-recipe-by-half 5.56%
- GA4 28일: Organic 370세션(전 322), Direct 260, AI Assistant 11. **총수익 여전히 0.**

#### ★★ 허브 페이지가 Bing에서 빠르게 먹힌다는 실증 (이번 세션 최대 발견)
**20차(08-17)에 만든 `guides/complete-egg-conversion-guide.html`이 발행 1주 만에
Bing 158노출·평균 5.88위·클릭 1.** 계란 변환은 포화 니치인데도 바로 순위가 잡혔다.
→ **구글이 크롤조차 안 한 페이지도 Bing에서는 즉시 노출된다.** 신규 발행의 회수 경로는
구글이 아니라 Bing이라는 뜻이고, 이게 공격적 확장을 계속할 실질적 근거다.
(pressure-cooker-converter 8노출 등 21~22차 신규도 이미 Bing에 잡히기 시작함)

#### 구글 색인 현황 (제공 자료 기준)
- '발견됨-미색인' **17개 → 29개로 증가**. 최종 크롤링 전부 `1970-01-01`(미크롤) 유지.
- 21·22차 신규(vegetable-roasting 3종, appliance/egg 가이드, air-fryer, altitude, pressure-cooker 등)가
  대부분 이 목록에 있음. '크롤링됨-미색인'은 `complete-baking-conversion-guide` 1개(07-19 크롤).
- **이건 코드로 고칠 게 없는 항목이다. 발행 속도를 늦추는 근거로 쓰지 말 것**(0-2 참고).
  Bing에서 회수되고 있으므로 전략 변경 사유가 아님.

#### 산출물 — `guides/complete-butter-conversion-guide.html` (1,031단어)
**선정 근거**: 버터가 Bing 최대 누수 지점. butter-converter 628노출인데 **CTR 0.48%로 사이트 최저**,
measure-butter와 합쳐 795노출에 클릭 5개. Bing 키워드가 스틱↔컵에 집중(62노출).
그런데 **버터만 허브가 없었음**(툴1+블로그1) — 가이드 12개 중 유일한 미허브 주력 클러스터.

**경쟁도**: 버터 변환 head term은 12곳+ 포화(bakinglikeachef·KitchenAid·savorthebest·wyseguide·
errenskitchen·challengeanswer·buttercrayon·bakingscalepro·unittables·scaleforgrams·
**calckitchen(회피리스트)**). 전부 동일 차트만 제공. 계란 허브 선례대로 head term을 노리는 게
아니라 **기존 795노출을 받아낼 허브**로 포지셔닝.

**차별화(자사 중복 회피 + 경쟁사 미커버)**: 기존 `how-to-measure-butter`(903단어)가 차트·유염무염·
유럽버터·오일치환·연화/용해를 이미 다루므로 그건 반복하지 않고 허브 고유값만 담음 —
(1) **레시피 출처별 표기 표**(US스틱/EU 250g·200g/빈티지 knob·lump·size of an egg), **250g을
2스틱으로 착각하면 9.2% 부족**을 전면 배치(250/113=2.21스틱, 계산 검증함). 빈티지 수치는 자사
`vintage-recipe-measurements`와 대조해 일치시킴 — 경쟁사가 못 하는 교차연결.
(2) **정밀도 3단계 표**(계량 필수/신중/눈대중) — '언제 안 따져도 되는지'를 말하는 곳이 없음.
(3) **증상→원인 진단표**. (4) 상황→도구 라우팅 표.

#### 신규 후보 판정
| 후보 | 판정 | 근거 |
|---|---|---|
| 버터 2번째 블로그(스틱↔컵 전용) | **기각(자사중복)** | `how-to-measure-butter`가 903단어로 이미 커버. 억지로 내면 자기잠식 |
| 버터 대체(오일 등) 블로그 | **기각(자사중복)** | `tools/baking-substitutions`에 오일 ¾:1 비율 이미 있음 |
| **버터 허브** | **채택** | 자사 중복 아님(허브 부재), Bing 최대 누수 지점, 계란 허브 선례 |

#### 사이트 규모
툴 29 / 블로그 72 / 가이드 11→**12** / sitemap 119→**120**.

#### 다음 세션 확인
- 버터 허브가 계란 허브처럼 1~2주 내 Bing에 잡히는지 확인. 잡히면 **허브 없는 클러스터를
  계속 찾아 허브를 채우는 게 검증된 패턴**이 된다(현재 미허브: 물/온도 등 확인 필요).
- 총수익 0이 4개월째. 애드센스 상태 확인은 여전히 사용자 행동 대기.

### 2026-08-24 (21차): 신규 클러스터 발굴 — 채소 로스팅 (툴1+블로그2+가이드1)

> 사용자 지시: "신규를 해보자. 키워드를 다양하게 넓게 뽑고 → 리스트 → 경쟁강도 체크 →
> 강하면 롱테일로 뚫어라. 웬만하면 클러스터를 추가해라. **GSC나 우리가 가진 것 안에서만 보지 말고**
> 구글·네이버·레딧 등 다양한 곳에서 **문서수는 적은데 관심은 있는 것**을 찾아라."

#### 후보 발굴 방식 — 자사 데이터가 아니라 "우리에게 통째로 없는 영역"에서 출발
기존 클러스터 10개(계량/육류시간/그릴링/스케일링/비용/빈티지/가전/계란/베이킹/단백질비교)를
나열하고 **그 어디에도 안 걸리는 영역**을 후보로 뽑음. 결과: 채소, 쌀·곡물, 콩, 보관·해동,
빵·이스트, 수비드, 튀김유.

#### 경쟁도 판정
| 후보 | 판정 | 근거 |
|---|---|---|
| 쌀-물 비율 | **기각(계산기팜 포화)** | miniwebtool·gigacalculator·omnicalculator·best-calculators·**crunchmilk(회피리스트)**·lazytools·spoonandsip·everydaytools·saweracooking·gigatools **10곳**. head·롱테일 모두 여지 없음 |
| **채소 로스팅** | **채택** | 경쟁자가 thishealthytable·itsavegworldafterall·cleangreensimple·feelgoodfoodie·loveandlemons·wellplated·twopeas 등 **푸드블로그 + 인쇄용 PDF**. 계산기팜 아님 → 9번 섹션 "업종을 먼저 보라" 기준 부합 |

#### ★ 차별화 — 이 니치의 진짜 빈틈 두 개
1. **시트팬 스태거링을 아무도 계산해주지 않는다.** thekitchn·tastingtable·hellolittlehome·
   twopeasandtheirpod 전부 *"단단한 걸 먼저, 부드러운 걸 나중에"*라는 **산문 조언만** 한다.
   정작 사용자가 필요한 건 "그래서 몇 분에 넣냐"인데 그 숫자가 어디에도 없음.
   → 우리는 계산기 사이트다. **투입시각 = 최장시간 − 해당채소시간**을 구현.
2. **차트마다 수치가 충돌하는데 아무도 이유를 안 밝힌다.** 브로콜리가 12분(NYT/450°F)에서
   25분(400°F)까지 갈리는데, 대부분의 차트가 **기준 온도와 절단 크기를 명시하지 않는다.**
   → 우리 표는 전 항목에 기준온도(425°F)와 절단크기를 병기하고, 이 문제 자체를 본문에서 설명.
   이게 이 니치의 실제 페인포인트라 롱테일 진입점이 됨.

부수 관점: **절단 크기가 채소 종류보다 시간을 더 크게 좌우**한다는 점(감자 ¾" 35분 vs ½" 25분)을
스태거링의 대안으로 제시 — 경쟁 콘텐츠가 거의 다루지 않는 각도.

#### 산출물 (신규 클러스터, 4페이지)
- `tools/vegetable-roasting-calculator.html` (974단어) — 채소 다중선택 + 오븐온도 → 투입 타임라인
- `blog/how-long-to-roast-vegetables.html` (1,116단어) — 20종 시간표(절단크기·완성 신호 포함)
- `blog/roasting-vegetables-together.html` (1,073단어) — 스태거링 규칙 + 4채소 워크드 예제
- `guides/complete-vegetable-roasting-guide.html` (967단어) — 허브

가이드는 요약 나열이 되지 않도록 **4개 변수를 영향력 순서(혼잡>절단크기>온도>시간)로 재조직**하고
"대부분 시간부터 만지는데 순서가 거꾸로"라는 통합 관점 + 증상별 진단표를 넣음.

#### 정합성 검증
계산기 로직과 블로그 워크드 예제(감자35/방울양배추25/브로콜리21/아스파라거스12 → 0/10/14/23분)가
완전 일치함을 node로 검증. 기존 페이지와 충돌 없음(고도: 로스팅은 고도 영향 없음 / 에어프라이어:
소량 우위 서술 일관).

#### 사이트 규모
툴 27→**28**, 블로그 69→**71**, 가이드 9→**10**, sitemap 112→**116**.

#### 다음 세션 주의
- **20차의 Bing 우선 방침은 그대로 유효**(0-2 참고). 이번 신규 4건은 색인·노출까지 시간이 걸리므로
  다음 데이터에서 노출 0이어도 성급히 실패 판정하지 말 것.
- 미크롤링 17개는 코드로 고칠 게 없는 항목이다. **이걸 근거로 신규 발행을 늦추지 말 것.**
  공격적 확장 기조가 기본이다.

### 2026-08-17 (20차): 주간 점검 — GSC+GA4+**Bing 최초 도입** 분석, 계란 허브 신설 + Bing CTR 최적화

> 사용자가 GSC(3개월)·GA4(28일)에 더해 **Bing Webmaster 데이터를 처음 제공**. 색인 판단은 제공 자료로만.

#### ★★★ 최대 발견 — Bing과 구글의 성과가 완전히 다르다. Bing이 압도적이다.
| | 구글 | Bing |
|---|---|---|
| 노출 | 9,285 | 835 |
| 클릭 | 5 | **15** |
| CTR | 0.05% | **1.80%** |
| 평균순위 | 44.7 | **약 5** |

- **구글 노출은 11배 많은데 클릭은 Bing이 3배.** Bing에서 우리는 이미 1페이지(4~7위) 상위권이다.
- Bing 상위: `liquid-converter` 230노출 5.00위 5클릭 / `egg-converter` 231노출 5.11위 2클릭 /
  `butter-converter` 156노출 7.01위 **0클릭** / `how-to-substitute-egg-sizes` 108노출 4.19위 6클릭
  **CTR 5.56%(사이트 최고)** / `how-many-eggs-in-a-cup` 49노출 5.20위 0클릭.
- **15/16차의 "우리 트래픽은 Bing" 가설이 처음으로 실증됨.** 단 GA4 Organic 322세션 vs
  구글5+Bing15=20클릭은 여전히 16배 격차 — **완전히 설명되지 않음. CN 60명·SG 21명 등
  봇 가능성 여전히 배제 못 함. 다음 세션도 이 전제 위에 결론을 쌓지 말 것.**
- **전략적 함의: 이제 우선순위는 "구글 순위 올리기"보다 "Bing에서 이미 잡은 4~7위를 클릭으로
  바꾸기"다.** 순위를 올리는 것보다 CTR을 올리는 쪽이 즉효성이 압도적으로 높다.

#### ★★ 발견 2 — 미색인 17개는 "품질 문제"가 아니라 **한 번도 크롤링된 적 없음**
Coverage Drilldown의 '발견됨-현재 색인 생성 안 됨' 17개 URL이 **최종 크롤링 1970-01-01 = 미크롤링**.
```
bacon-vs-sausage / charcoal-vs-gas-grill-temperature / how-long-to-bake-white-fish /
how-long-to-cook-ham / how-long-to-cook-pork-shoulder / how-to-calculate-cooking-time /
measurement-conversion-word-problems / salmon-vs-shrimp / turkey-breast-vs-whole-chicken /
unit-price-word-problems / vintage-ingredient-names / complete-grilling-guide /
complete-protein-comparison-guide / can-size-converter / egg-weight-converter /
grill-temperature-calculator / kitchen-math-generator
```
- **18차의 "800단어 미만이라 노출 0" 진단은 부분적으로만 맞았다.** 18차에 보강한 17개 중 9개가
  여전히 미색인이고, 보강과 무관한 8개가 새로 합류했다. 구글이 **가져가 본 적조차 없는 URL은
  본문을 아무리 늘려도 바뀌지 않는다.** 크롤링 예산 문제이지 콘텐츠 품질 문제가 아님.
- 별건: `complete-baking-conversion-guide`는 '크롤링됨-색인 안 됨'(07-19 크롤링) — 이건 다른 범주.
- **코드로 고칠 수 있는 게 없다.** sitemap·lastmod·내부링크·정적렌더링은 이미 다 되어 있음.
  신규 발행을 늘릴수록 크롤링 예산이 더 얇게 퍼진다는 점만 인지할 것.

#### 발견 3 — 노출은 회복되지 않았고, 평균순위는 더 나빠졌다
08-11~15 일별 노출 30/149/72/60/89. 6월 baseline(10~30)보다는 높지만 07-24 피크(1,028) 대비 미회복.
**평균순위가 43.45(08-10) → 44.7이고 최근 일별로는 63~80위권.** 17차가 "일시 부양분 반납"으로
본 판단은 유지되나, 순위 악화는 별도 신호다. 다만 구글 CTR이 0.05%라 순위 개선의 수익 기여는
Bing CTR 개선보다 훨씬 느리다.

#### 발견 4 — GA4가 계란 클러스터를 1·3위로 지목
Egg Size Converter 134뷰(전체 1위), how-to-substitute-egg-sizes 70뷰(3위), liquid 37, butter 22.
**총수익은 여전히 0(3개월 연속).** click 이벤트 13건. 애드센스가 풀리기 전엔 트래픽이 늘어도 매출 0.

#### 이번 세션 산출물
1. **`guides/complete-egg-conversion-guide.html` 신설(962단어)** — 계란은 3개 데이터 소스 전부에서
   최고 성과 클러스터인데 **가이드 9개 중 유일하게 허브가 없었음**(툴2+블로그2 = 고아 상태).
   19차 교훈("클러스터 단위로 노출이 붙는다") 적용. 요약 나열 방지를 위해 허브 고유값만 담음:
   상황→변환 라우팅 표, 레시피 유형별 3단계 리스크 등급, "4개 이상 + 계란이 구조 담당" 동시
   충족 시에만 보정하라는 판정 기준, 사이즈가 다스당 최소중량으로 정의된다는 점.
2. **Bing CTR 타이틀/메타 3건** — butter-converter(7.01위 클릭0), how-to-measure-butter(5.68위
   클릭0), liquid-converter(5.00위). Bing 쿼리가 스틱↔컵에 집중돼 있어 타이틀에 수치 직접 노출.

#### 신규 후보 판정 — 4건 검토, 3건 기각(자사중복 2 / 외부포화 1), 1건 채택
| 후보 | 판정 | 근거 |
|---|---|---|
| 계란 사이즈/치환 신규 블로그 | **기각(자사중복)** | `how-to-substitute-egg-sizes` 1,513단어가 medium/jumbo/XL/UK-US/부피법까지 이미 커버. `how-many-eggs-in-a-cup` 917단어가 전란·흰자·노른자 컵환산 전 사이즈 커버. 자기잠식 위험 |
| 버터 스틱↔컵 신규 블로그 | **기각(자사중복)** | `how-to-measure-butter` 903단어에 스틱/컵/tbsp/g 전체 표 + 유염무염 + 유럽버터 + 연화/용해 이미 있음. **CTR 문제이지 콘텐츠 부재가 아님** → 타이틀 최적화로 대응 |
| 카레오버 쿠킹/레스팅 전용 페이지 | **기각(외부포화)** | **회피리스트 3곳 포함** — missvickie.com(전용 계산기 보유)·easytemperature.com·calckitchen.com + bbqreport·reluctantgourmet·thermoworks·foodfirefriends·cookingtechniquesauthority. 자사 10개 페이지에 개념은 이미 산재 |
| **계란 가이드 허브** | **채택** | 자사 중복 아님(허브는 부재), 최고 성과 클러스터, 구조적 갭 |

#### 다음 세션 우선순위 (수익화 기준)
1. **애드센스 상태 확인(사용자 행동).** 3개월 연속 총수익 0. 이게 안 풀리면 나머지 전부 매출 0.
2. **신규 클러스터 발굴·발행(기본 전략).** 타이틀 답 선행 패턴은 그 작업에 묻어서 적용하면 되고,
   별도 과제로 잡지 말 것.
3. GA4 소스/매체 확인(여전히 미검증) — Organic 322 vs 실클릭 20의 16배 격차.
4. 미크롤링 17개는 코드로 고칠 게 없는 항목 — 발행 속도를 늦추는 근거로 쓰지 말 것.

### 2026-08-14 (19차): "경쟁 세도 뚫어야 하는 필수 클러스터" — 가전 변환 + 고도 보정 신규 2건

> 사용자 지시: "데이터가 좋아지고 있으니 완성도를 올리자. 반드시 있어야 하는데 경쟁도 때문에
> 못 넣은 클러스터를 넣어라. 경쟁이 세면 롱테일로 낮춰라. 다 들어가 있으면 굳이 안 해도 된다."
> → 18차까지 유지하던 "신규 발행 일시 정지" 기조를 이 지시로 해제하고 신규 2건 발행.

#### 사이트 전수 점검으로 찾은 구조적 빈칸 (grep 실측)
| 클러스터 | 상태 |
|---|---|
| 계량/온도/조리시간/레시피 스케일링/비용/빈티지 | 이미 충분 — 손대지 않음 |
| **압력솥·인스턴트팟** | **site-wide 언급 0건.** slow-cooker-converter는 있는데 압력솥이 없어 "가전 시간 변환" 클러스터가 반쪽만 지어져 있었음 |
| **고도(altitude)** | candy-temperature-calculator에 한 줄뿐. 끓는점은 조리의 근본 변수인데 전용 커버리지 0 |
| 에어프라이어 | how-long-to-cook 20여 개 안에 조리법으로만 존재, 전용 변환 툴 없음 |

#### ✅ 발행 1 — `tools/pressure-cooker-converter.html` (1,699단어)
- **경쟁자 프로필이 결정적**: kidsactivitiesblog·savorandsavvy·glutenfreesupper·prepdish·
  lovefoodnotcooking·amindfullmom + Taste of Home. **계산기 콘텐츠팜 0개.** 9번 섹션의
  "경쟁 강도보다 경쟁자 업종을 먼저 보라" 기준에 정확히 부합 → 롱테일로 낮출 필요도 없이 정면 진입.
- 차별화: 양방향 변환(경쟁자 대부분 단방향) / 경쟁자들이 대충 넘기는 "압력 도달·배출 시간은
  조리시간에 미포함"을 전면 배치 / 음식별 압력시간표 / 액체량이 슬로우쿠커와 **반대로 늘어나는**
  함정 / 스토브탑 vs 전기 PSI 차이(-15%) / 고도 보정.
- 내부 정합: Low↔High 비율(1h High ≈ 2h Low)을 기존 slow-cooker-converter와 동일하게 사용.
  계산기 로직이 게시 차트와 양방향 일치함을 node로 검증.

#### ✅ 발행 2 — `tools/altitude-cooking-calculator.html` (1,421단어)
- **롱테일 포지셔닝으로 정면 회피**: "고도 베이킹"은 elevationbaking.com(전용 사이트, 하위
  가이드 8개+)·simplyaltitude가 장악 → 베이킹은 링크로만 언급하고 **조리(끓임/압력/튀김) 쪽으로
  각도를 틀었음.** 그 쪽 경쟁자는 FSIS(gov)·Colorado State Extension(edu)·ThermoWorks·
  일반 블로그뿐, 계산기 콘텐츠팜 0개.
- 차별화 핵심: **"고도가 바꾸는 것 vs 안 바꾸는 것" 표.** 오븐 로스팅·그릴링·안전내부온도는
  고도 영향이 없다는 FSIS 지침을 명시 — 시중 콘텐츠 상당수가 "전부 오래 걸린다"로 뭉개거나
  서로 모순되는 지점이라 이게 우리 차별점이 됨.
- 출처 검증: 압력솥 5%/1000ft 규칙이 **Colorado State University Extension의 3,000~10,000ft
  실측 연구**로 뒷받침됨을 확인. CSU가 "모든 음식에 필요하진 않았다"고 단 단서까지 그대로 반영.
- 내부 정합: 끓는점 공식과 게시 차트가 0~10,000ft 전 구간 일치함을 node로 검증
  (10,000ft 행 194→193으로 정정해 공식과 맞추고 본문·FAQ 4곳 동기화).

#### ⚠️ 에어프라이어 — 같은 세션 후반에 기각 철회, `tools/air-fryer-cooking-times.html` 발행함
> **먼저 기각했다가 사용자 지적으로 뒤집은 건이다. 아래 기각 사유는 "변환 계산기 축"에 한해서만
> 유효하고, 실제로는 다른 축으로 진입 가능했다. 판단 실패 사례로 남겨둠.**
- 사용자 지적: "완성도 올리는 작업이라 경쟁 세도 최대한 낮춰서 넣어야 되는데 그런 건 전혀 안 했다.
  에어프라이어는 왜 뺐냐. 아무 말도 안 하고 빼지 마라." → 정당한 지적. 기각 시 사용자에게 먼저
  알리지 않고 조용히 뺀 것도 문제였음.
- **뒤집을 수 있었던 이유는 경쟁 축을 바꿨기 때문**: 기존 검토는 전부 `변환 계산기(oven→air fryer)`
  축이었고 거긴 실제로 포화가 맞음. 하지만 **`음식별 실측 시간표` 축은 비어 있었음** — 경쟁자
  전원이 25°F/20% 일괄 규칙 하나로 모든 음식을 처리 중이라 음식별 실측 데이터를 가진 곳이 없음.
- **우리 자산이 결정적이었음**: `how-long-to-cook-*` 13개 페이지에 음식별 에어프라이어 온도/시간이
  이미 있었음. 경쟁자가 복제 불가능하고, 집약 페이지가 기존 13개로 내부링크를 보내는 효과까지 있음.
- 차트 17개 값 전부 원본 페이지와 grep 대조 검증. 온도 3밴드(350/375/380-390/400) 분류가
  일괄 규칙이 재현 못 하는 차별화 포인트.
- **교훈(다음 세션이 반드시 볼 것): 기각하기 전에 "다른 축은 없나"를 먼저 볼 것.** 이 니치에서
  "포화"는 대개 특정 축(계산기/변환기)이 포화라는 뜻이지 주제 전체가 막혔다는 뜻이 아니다.
  그리고 **후보를 뺄 거면 사용자에게 이유를 먼저 말할 것 — 조용히 빼지 말 것.**
- 용량/사이즈 각도는 별도 조사했고 제품 구매 가이드 니치(airfriers.org·airfryguy·airfryerfinder
  등)라 사이트 정체성 이탈로 기각 — 이건 기각 유지.

#### 참고 — 에어프라이어 "변환 계산기 축"이 포화라는 것 자체는 사실 (아래 유지)
07-27(8차)에 이미 기각된 건이지만 "경쟁 세도 필수면 뚫어라" 지시에 따라 재조사함. 결과는 **재기각**:
- **정방향(oven→air fryer)**: inchcalculator, airfryercalculator.com, airfryerconversion.com,
  airfryerconverter.com, oventoairfryercalculator.com, fryconvert.com, airfryingfoodie,
  loveandotherspices — 전용 도메인 다수.
- **롱테일(baked goods 한정)**: airfryerbaking.com, airfriers.org, airfrycentral.com,
  recipescal.com, evvytools.com — 롱테일까지 이미 전용 도메인이 점령.
- **역방향(air fryer→oven)**: fryconvert.com, oventoairfryerconverter.com,
  **agentcalc.com(회피리스트)**, airfryfoods.com, realfoodwithsarah — 여기까지 다 막힘.
- **판정: 정면·롱테일·역방향 3방향 전부 포화. 이 니치에서 확인된 것 중 브라인 다음으로 심함.**
  다만 우리는 how-long-to-cook 20여 개에 에어프라이어 시간이 이미 들어가 있어 정보 공백은 아님.
  **다시 제안하지 말 것 — 재조사도 이번으로 종결.**

#### 🐛 표 스타일 누락 버그 — 사이트 전반에서 발견, 전량 수정 (67파일 154개 표)
- 사용자 스크린샷 제보로 발견. 신규 2건의 표가 테두리·헤더배경·줄무늬 없이 텍스트만
  나열된 상태로 렌더링되고 있었음.
- **원인**: 전역 CSS에 `table` 기본 스타일이 없고, 각 페이지가 개별적으로 `.ref-table`
  클래스나 인라인 style을 정의해 쓰는 구조였음. 그 처리가 빠진 bare `<table>`이
  **19차 신규분만이 아니라 사이트 전반에 154개** 누적돼 있었음(07-24/27 대량 발행분 다수 포함).
- 반응형 가로스크롤 래퍼는 nav.js가 `main table` 전역으로 정상 처리 중이었음 — 그쪽은 문제 없었음.
  즉 "반응형은 되는데 표만 이상한" 증상의 원인이 이것.
- **수정**: 모든 bare `<table>`에 `class="ref-table"` 부여 + 해당 페이지 `<style>` 블록에
  `.ref-table` 규칙 주입(can-size-converter 등 기존 페이지가 쓰던 정의와 동일하게).
  이미 인라인 style이나 ref-table을 쓰던 표는 미변경. 검증: bare table 잔여 0,
  규칙 중복 삽입 0, div/style 태그 균형 및 JSON-LD 파싱 전 파일 통과.
- **다음 세션 주의**: 신규 페이지에 표를 넣을 때 `<table class="ref-table">`로 쓰고
  `<style>`에 규칙이 있는지 확인할 것. 4번 섹션 체크리스트에도 추가함.

#### ⚠️ 클러스터 미완성 지적 → 같은 세션에서 완성 (사용자 2차 지적)
- 사용자 지적: **"툴만 한 거지 클러스터 완성은 안 했잖아. 나는 클러스터를 완성하라고 한 건데."** 정확한 지적.
- 이 사이트의 완성된 클러스터 형태는 **[툴 + 블로그 2~3 + 가이드 허브]**임(그릴링/빈티지/레시피스케일링이
  그 형태). 그런데 이번에 발행한 툴 3개는 전부 지원 블로그도 허브도 없는 **고아 툴**이었음.
  **심지어 기존 `slow-cooker-converter`도 계속 고아 상태였던 걸 이번에 발견함.**
- **추가 발행 4건으로 클러스터 2개 완성**:
  - `blog/slow-cooker-vs-pressure-cooker.html` (1,228단어) — 습열 페어 비교
  - `blog/air-fryer-vs-oven.html` (1,191단어) — 건열 페어 비교
  - `guides/complete-appliance-cooking-guide.html` (1,016단어) — 가전 클러스터 허브
  - `blog/high-altitude-baking-adjustments.html` (1,132단어) — 고도 툴을 베이킹 클러스터에 편입
- **가전 클러스터 최종 형태**: 툴 4(slow-cooker / pressure-cooker / air-fryer-times / altitude)
  + 블로그 2 + 가이드 1. 기존 그릴링(툴1+블로그3+가이드1)·스케일링(툴2+블로그3+가이드1)과 동급.
- **허브의 조직 원리**: '습열 vs 건열' 한 줄로 4개 가전을 정리하고, **같은 열 타입 안에서는 시간
  환산이 성립하지만 열 타입을 건너면 환산 자체가 없다**는 것을 명시. 가이드가 개별 블로그 요약이
  되지 않도록 개별 페이지엔 없는 통합 관점을 넣음(7번 섹션 가이드 작성 원칙 준수).
- 고도는 독립 주제 영역이 아니라 '조리 변수'라 **전용 허브를 새로 만들지 않고 베이킹 클러스터에 편입**.
  단 '고도 베이킹' head term은 elevationbaking.com이 장악 중이므로 **순위 기대치는 낮게 잡을 것** —
  이 페이지의 1차 목적은 고아 툴 해소와 클러스터 구조 완성이지 그 쿼리 획득이 아님.
- 경쟁 차별화: 이 주제 경쟁자(Cozymeal·alsothecrumbsplease·noshingwiththenolands·ATK)는 전부
  **'어느 걸 살까' 제품 비교 + 제휴링크** 구조. 우리는 **'어느 걸 쓸까 + 시간이 어떻게 환산되나'**라는
  조리 판단 레퍼런스로 각도를 잡아 사이트 정체성 유지.
- **교훈(다음 세션 필독): 신규 툴을 낼 때 "이 툴이 어느 클러스터에 속하는가"를 먼저 정할 것.**
  속할 클러스터가 없으면 지원 블로그 2개 + 허브까지 같은 세션에 계획에 넣어야 함.
  툴 단독 발행은 고아 페이지를 만드는 것과 같고, 이 사이트에서 노출이 붙는 건 클러스터 단위다.

#### 사이트 규모
툴 24 → **27**, 블로그 66 → **69**, 가이드 7 → **9**(20차 계란 허브 포함), sitemap 104 → **112**. 가전 클러스터(툴4+블로그2+가이드1)와 고도 편입까지 포함한 수치.

#### 다음 세션 확인 사항
- 이 2건은 18차 보강분과 **발행 시점이 달라서**(08-10 보강 vs 08-14 신규) 다음 GSC 데이터에서
  구분해서 봐야 함. 신규 2건은 색인 자체가 늦게 잡히므로 노출 0이어도 성급히 실패 판정하지 말 것.
- 9번 섹션 "완화된 기준으로 발행한 페이지는 다음 세션에서 GSC 순위를 특별히 확인" 규칙 대상 —
  특히 압력솥은 회피리스트 도메인이 없는 상태에서 진입한 케이스라, 실제로 1페이지에 들어가는지가
  "경쟁자 업종 기준"이 맞는지 검증하는 좋은 샘플이 됨.

### 2026-08-10 (18차): 17차 후속 — 800단어 미만 17개 전부 900+로 보강 (신규 발행 0건, 보강만)

> 17차(같은 날 오전 세션)가 GSC 데이터로 "800단어 미만 페이지 17개가 예외 없이 전부 노출 0"이라고
> 확정하고 목록화한 것을 그대로 이어받아 실행한 세션. 사용자가 프롬프트+추론강도(모두 high)를 지정해서
> 위임, 신규 콘텐츠 없이 보강만 진행. 5개 배치로 나눠 매 배치 커밋.

#### 작업 방식
각 페이지마다 (1) 추가하려는 내용이 사이트 다른 페이지에 이미 있는지 먼저 grep으로 확인 후 겹치면
다른 각도로 전환, (2) 추가 수치는 사이트 내 기존 단일 출처(`meat-temperature-guide.html`,
`egg-converter.html` 등) 재사용 또는 웹서치로 신규 검증한 값만 사용 — 지어낸 수치 없음, (3) FAQ 신설 시
JSON-LD FAQPage 스키마도 함께 동기화, (4) 기계적 증량 대신 실질 정보(worked example, 신규 비교표,
FAQ)로 자연 도달, 억지로 채우지 않음.

#### 보강 결과 (17/17, 전부 900~1050단어대 도달)
| 파일 | 이전→이후 | 추가한 핵심 내용 |
|---|---|---|
| guides/complete-vintage-recipe-guide.html | 527→914 | 빈티지 레시피 한 줄씩 디코딩 워크스루 + 용어로 레시피 연대 추정법 |
| tools/can-size-converter.html | 612→980 | 오늘날 매장 라벨(15/28oz)↔옛 번호 사이즈 대응표, 물빠짐 전/후 컵수 차이(콩 기준 실측, Milk Street 교차검증), EU 사이즈 FAQ |
| blog/vintage-recipe-measurements.html | 617→919 | peck/bushel 등 농산물 단위 표 |
| blog/charcoal-vs-gas-grill-temperature.html | 636→959 | 럼프 vs 브리켓 최고온도(상반된 실측 결과 병기), 가스그릴 BTU/면적당BTU |
| guides/complete-grilling-guide.html | 664→923 | 연료 선택 가이드 + 신규 그릴러용 4문항 의사결정 표 |
| blog/direct-vs-indirect-heat-grilling.html | 678→917 | 플레어업 대처법, 뚜껑 개폐가 존 성격 바꾸는 원리 |
| blog/vintage-ingredient-names.html | 679→909 | 영국식 채소 이름 표(courgette/aubergine/swede 등) + 어원 |
| blog/measurement-conversion-word-problems.html | 685→931 | 무게(lb→oz)·온도(°C→°F)·리터→컵 worked example 3건 |
| tools/grill-temperature-calculator.html | 704→958 | 바람/추위가 프리히트 시간(25-50%)·존 온도에 미치는 영향 |
| tools/kitchen-math-generator.html | 706→940 | JS로만 생성돼 구글이 못 보던 콘텐츠를 정적 샘플 문제 3개로 노출(이 페이지 특유의 인덱싱 구조 문제 해결) |
| blog/how-to-check-grill-temperature-without-a-thermometer.html | 707→963 | 바람/추위에서 손 테스트 보정법 |
| blog/salmon-vs-shrimp.html | 707→937 | 냉동 상태 조리 시 연어 +50%, 새우 +1~2분만(웹서치 검증) |
| tools/pan-size-converter.html | 753→998 | 물채움 실측법, 라운드팬 2개 vs 9x13 실제 용량 차이 |
| blog/how-long-to-cook-tempeh-seitan.html | 765→1016 | 냉동보관·재가열법, 요리 종류별 조리법 매칭 |
| guides/complete-recipe-scaling-guide.html | 765→1024 | 4인분→10인분 풀 워크스루(팽창제 비선형·계란·팬사이즈·굽는시간 한 표에 통합) |
| blog/recipe-scaling-word-problems.html | 774→952 | 그램 기반 스케일링 worked example 2건 |
| blog/bacon-vs-sausage.html | 793→1112 | "uncured" 라벨링이 실제로는 여전히 큐어드라는 USDA 규정 설명, 냉동 조리 시간 차이 |

#### 검증
전 파일 div 밸런스/JSON-LD 파싱/sitemap XML 유효성 통과, 반응형 그리드 미디어쿼리 누락 0건,
고아 페이지(내부링크 2개 미만) 0건, 읽기시간(145wpm) 전부 ±1분 이내 정합. `node build-static.js`를
배치마다 재실행해 헤더/모바일메뉴/푸터 각 1개·목록 카드(tools 24/blog 66/guides 7) 정합 확인.
개수 검증(tools 24/blogs 66/guides 7/sitemap 104, nav.js 전부 일치) 최종 재확인 완료.

체크리스트 4번 섹션 "보강 작업 시 추가" 전항목(nav.js date, JSON-LD dateModified, blog-meta
읽기시간, sitemap lastmod, llms.txt 설명) 17개 전부 08-10로 갱신.

`notify-indexnow.js`는 이 환경 방화벽에서 `api.indexnow.org`를 막고 있어 실행 안 함 — 이번 세션은
보강만 진행했고 신규 URL이 아니라 기존 URL 갱신이라 IndexNow 제출 대상 자체가 아님(사용자가 원하면
`node notify-indexnow.js <17개 URL>`을 본인 PC에서 실행해 Bing/Yahoo에 갱신 알림 가능, 필수는 아님).

#### 커밋 목록
`8753739`(배치1) → `d7445fa`(배치2) → `0e74784`(배치3) → `362af24`(배치4) → `d62c6e7`(배치5) →
`701c4c0`(bacon-vs-sausage 읽기시간 미세조정)

#### 이번 세션 범위 밖으로 남긴 것
- **효과 검증은 다음 GSC export가 와야 가능.** "보강했다"는 사실과 "노출이 실제로 붙었다"는 사실은
  다르다 — 다음 세션이 절대 과장해서 보고하지 말 것. 0번 섹션 0-2 참고.
- 애드센스 재심사 제출, GA4 소스/매체 확인은 사용자 행동 대기 중(17차에서 이미 제안함, 진행 여부
  다음 세션이 먼저 확인할 것).
- 신규 콘텐츠(수율 워드프라블럼 등, 17차 "보류" 판정)는 이번 보강 효과가 확인되기 전까지 계속 보류.

### 2026-08-10 (17차): 일요일 정기 점검 — GSC/GA4 전수 분석, 콘텐츠 변경 0건 (분석 + handover 갱신만)

> 사용자가 GSC(Performance 3개월 + Coverage) / GA4(28일) export를 주고 "신규·보강 있으면 정리하고,
> 실제 작업은 sonnet이 할 거니 프롬프트와 추론강도만 달라"고 요청. 이 세션은 분석·판정·문서화만 수행.

#### 데이터 실측값 (2026-05-17~08-07 / GA4 07-13~08-09)
- GSC 3개월: 노출 8,795 · 클릭 5 · CTR 0.06% · 평균순위 43.45. 기기별: 모바일 노출2,941/클릭4/평균순위 11.66,
  데스크톱 노출5,827/클릭1/평균순위 60. 국가: 미국 4,627(클릭4) > 영국 1,663 > 캐나다 596 > 호주 401.
- Coverage: **색인됨 86 / 미색인 23** (발견됨-미색인 17, 리디렉션 4, 크롤링됨-미색인 1, 대체표준태그 1).
- GA4 28일: 활성사용자 370, 세션 437(Organic 254 / Direct 164 / Referral 11 / AI Assistant 4),
  page_view 742, scroll 106, click 4, **총수익 0**.

#### ★ 발견 1 — 07-25 노출 붕괴의 원인: 사이트 문제가 아니라 구글 전역 변동성 이벤트
- 노출 추이: 07-24 1,028 → 07-25 38 (하루 만에 -96%). 평균순위도 35~45위권 → 69~83위권으로 동반 하락.
- **web_search로 확인**: 2026-07-23 밤~07-24에 걸쳐 AccuRanker/Semrush Sensor/Mozcast/Sistrix 등
  주요 트래커가 전부 등록한 대규모 미확인 순위 변동이 있었음(구글 공식 확인 없음). 7월에만 세 번째 변동
  (07-04~12 통칭 "7-Eleven", 07-18~19, 07-23~24). 우리 붕괴 시점과 정확히 일치.
- 또한 노출 급등(07-13 117→294)도 **07월 코어 업데이트 종료(07-09) 직후**에 시작됨. 즉 07-13~24의 급등
  자체가 알고리즘 이벤트발 일시적 부양이었고, 07-25에 원복된 것.
- **현재 수준(08월 14~51/일)은 6월 baseline(10~30/일)보다 오히려 높다.** 붕괴로 baseline을 잃은 게 아니라
  일시 부양분을 반납한 것. 15차의 "붕괴", 16차의 "구글 채널 한정 이슈" 프레이밍 둘 다 과했다.
  → **결론: 패닉 리라이트 금지. 업계 권고대로 롤아웃 후 2~3주 관망 구간이며, 이미 그 구간을 지나는 중.**

#### ★ 발견 2 — 정적 렌더링 수술(14차)은 효과가 있었음: 색인 13 → 86
- 색인 추이: 07-01 13 → 07-11 70 → 07-25 **86**. 07-16~07-20 3세션 연속 "13개 정체"였던 게 완전히 풀렸음.
- 08-02 대수술 이후 미색인이 12까지 떨어졌다가 신규 발행분이 쌓이며 23으로 되돌아온 것 — 구조 문제 아님.

#### ★★ 발견 3 (이번 세션 최대 발견) — 07-24/07-27 발행분 25개 전부 노출 0
sitemap 104개 중 3개월간 노출이 단 1회도 없는 URL이 **33개**. lastmod 기준 분포가 매우 선명함:
- 07-13 1개, 07-16 2개, 07-18 3개(Guides), **07-24 7개 전부**, **07-27 18개 전부**, 08-03 2개 전부.
- 07-13 이전 발행분은 거의 다 노출이 있음. **07-24/07-27 두 번의 대량 발행 세션 산출물은 100% 노출 0.**
- Guides 7개 중 6개가 노출 0 (유일한 예외 complete-meat-cooking-temperature-guide 2회). 07-18에 신설한
  "3번째 콘텐츠 축"이 구글에서는 통째로 안 보이는 상태.
- 워드프라블럼 3개(unit-price / recipe-scaling / measurement-conversion) 전부 노출 0. 그런데 GSC 쿼리엔
  "you purchase beef at $6 per pound..." 계열이 노출 54회·평균순위 6.39로 잡힘 → **이 쿼리를 잡고 있는 건
  워드프라블럼 전용 페이지가 아니라 cost-per-serving 계열 페이지다.** 워드프라블럼 페이지는 아예 안 뜨고 있음.
  → **워드프라블럼 신규 4번째 페이지를 만들자는 제안은 이 상태가 풀리기 전엔 하지 말 것.**

#### ★★ 발견 4 — 800단어 미만 페이지 17개가 예외 없이 전부 노출 0
노출0 페이지 33개 평균 818단어 / 노출>0 페이지 64개 평균 1,049단어. 그리고 **800단어 미만인 페이지는
사이트 전체에 17개인데 그 17개가 전부 노출 0**이다. 4번 섹션 "800~1200단어" 규칙을 07-24/27 세션이 어긴 것.
(Coverage의 "발견됨-현재 색인이 생성되지 않음" 17개와 숫자가 같은 건 **우연일 수 있음 — 검증 안 됨**.
GSC UI에서 실제 URL 목록을 봐야 확정 가능. 넘겨짚지 말 것.)

**보강 대상 17개 (단어수 오름차순, 전부 노출 0):**
```
527  guides/complete-vintage-recipe-guide.html
612  tools/can-size-converter.html
617  blog/vintage-recipe-measurements.html
636  blog/charcoal-vs-gas-grill-temperature.html
664  guides/complete-grilling-guide.html
678  blog/direct-vs-indirect-heat-grilling.html
679  blog/vintage-ingredient-names.html
685  blog/measurement-conversion-word-problems.html
704  tools/grill-temperature-calculator.html
706  tools/kitchen-math-generator.html
707  blog/how-to-check-grill-temperature-without-a-thermometer.html
707  blog/salmon-vs-shrimp.html
753  tools/pan-size-converter.html
765  blog/how-long-to-cook-tempeh-seitan.html
765  guides/complete-recipe-scaling-guide.html
774  blog/recipe-scaling-word-problems.html
793  blog/bacon-vs-sausage.html
```

#### ★ 발견 5 — 구글 CTR 0.06%, 모바일은 평균순위 11.66인데 CTR 0.14%
- 데스크톱(평균 60위) CTR 0%는 순위로 설명됨. **모바일이 문제**: 평균 11.66위면 통상 CTR 1% 안팎인데
  0.14%로 7배 이상 낮음. 노출 2,941회에서 클릭 4건.
- 다만 평균순위는 수백 개 쿼리의 평균이라 과잉해석 금지. 확실한 건 **같은 순위에서 CTR만 올려도
  클릭이 배수로 늘어난다**는 것이고, 통제 가능한 레버는 title/description뿐.
- 실측: 사이트 최고 CTR 페이지는 `blog/how-to-calculate-cost-per-serving.html` **1.47%**(68노출 1클릭).
  타이틀에 답/숫자가 들어간 페이지(oats 90g 등)가 "Free & Instant" 같은 필러가 든 타이틀보다 나음.

#### ★ 발견 6 — GA4 Organic 254세션 vs GSC 클릭 5건의 40~50배 격차는 아직 검증 안 됨
- 15/16차가 "그러니까 우리 트래픽은 Bing/AI/Direct"라고 결론냈는데, **이건 아직 근거가 없다.**
  GA4 export에 source/medium이 없어서 그 254세션이 실제로 bing/duckduckgo인지 확인할 수 없음.
- 반대 신호도 있음: scroll/page_view = 14%로 낮고, click 이벤트 3개월 4건, first_visit이 세션의 83%,
  GSC 노출이 각 2회·9회뿐인 CN(19명)·SG(11명)에서 GA4 사용자가 잡힘. 봇/스팸 트래픽 가능성 배제 못 함.
- **다음 세션은 이 전제 위에 전략을 더 쌓기 전에 반드시 검증부터 할 것.**
  확인 경로: GA4 → 보고서 → 획득 → **트래픽 획득 → 세션 소스/매체**. bing/organic·duckduckgo/organic이
  실제로 찍히면 15/16차 결론이 맞는 것이고, (not set)/direct 덩어리면 전략을 되돌려야 한다.

#### 수익화 판정 (12번 섹션 절차에 따른 이번 세션의 판단)
1. **애드센스 재심사를 지금 넣을 것을 사용자에게 제안함** — 12번 섹션이 "판단이 선 세션이 먼저 제안"
   하라고 한 그 시점이라고 판단. 근거: (a) 08-02 정적 렌더링 대수술로 거절 사유("가치 없는 콘텐츠")에
   해당하는 구조 문제 해소, (b) 색인 13→86으로 실측 확인, (c) 총 104페이지·privacy/about/contact/ads.txt 구비.
   총수익 3개월 연속 0원이고 광고가 아예 안 나가는 상태라 **이걸 풀기 전엔 트래픽을 늘려도 매출은 0이다.**
2. **대체 광고망은 아직 검토 대상 아님** — 이번 세션이 조사한 결과, 세션 규모(28일 437세션 ≈ 월 500세션)가
   주요 대안들의 최소 트래픽 요건에 한참 못 미침. 지금 시점에 특정 광고망을 붙이는 건 실익 없음.
   **월 1만 세션대에 진입하면 그때 그 시점 기준으로 다시 조사할 것**(특정 사명 미리 정해두지 않는 원칙 유지).
3. **제휴(affiliate)도 계속 보류** — 9번 섹션 원칙(트래픽/전환 붙기 전 시작 금지) 그대로 유효.

#### 신규 콘텐츠 후보 판정 결과 (전부 자사 중복 확인 + web_search 경쟁 확인 완료)
- **기각 — 그로서리 예산/가구원수별 식비**: GSC 비용 클러스터가 우리 최고 순위대(8~16위)이고 CPC도 가장
  높아서 검토했으나, head term을 Ramsey Solutions·U.S. News·OneMain Financial 등 대형 금융 미디어가 장악.
  거기에 grocerybudgetcalc.com·mealthinker.com·summitplate.com·sustaincents.com·pocketclear.app 등
  전용 콘텐츠팜까지 겹침. **대형 금융 미디어 + 콘텐츠팜 이중 포화 — 다시 제안하지 말 것.**
- **기각 — 계란 흰자/노른자 컵 환산**: GSC 쿼리 다수 확인했으나 `blog/how-many-eggs-in-a-cup.html`이
  타이틀·메타·본문에서 whites/yolks를 이미 다루고 있음. 자사 중복.
- **기각 — 요리 약어(tsp/tbsp/T/t/tbs) 전용 페이지**: "is capital t tablespoon or teaspoon"(10위) 등이
  잡히지만 `blog/tablespoon-vs-teaspoon.html`이 capital T·tbs·tbsp를 이미 명시적으로 설명 중. 자기잠식 위험.
- **기각 — 설탕 봉지 크기별 컵수**: `blog/how-many-cups-in-a-pound-of-sugar.html`에 ¼~5 lb 표가 이미 있음.
- **보류(기각 아님) — "how many servings can you make" 수율 워드프라블럼**: 자사 중복 0건이고, 경쟁도
  Wyzant·Brainly·onlinemath4all·lumenlearning 등 Q&A/워크시트 사이트뿐이라 7번 섹션 07-27 기준으로는
  "우리가 이길 수 있는" 유형이 맞음. 다만 **기존 워드프라블럼 3개가 전부 노출 0인 상태에서 4번째를 내는 건
  의미 없음.** 17개 보강 후 워드프라블럼 페이지에 노출이 돌아오면 그때 진행할 것.

#### 이번 세션 산출물
콘텐츠/코드 변경 0건. handover.md만 갱신(0번 섹션 0-2 신설, 3번 섹션 17차 추가, 7번 섹션 색인표 행 추가).

**다음 세션 우선순위(수익화 기준 정렬)**:
(1) 애드센스 재심사 제출(사용자 행동) — 이게 안 되면 나머지 전부 매출 0,
(2) GA4 세션 소스/매체 확인(사용자 행동) — 전략 전제 검증,
(3) 800단어 미만 17개 보강(콘텐츠 작업, 신규보다 우선) — **같은 날 18차 세션에서 완료됨, 아래 18차
    항목 참고**,
(4) 상위 노출 페이지 title/description CTR 개선,
(5) (3)(4) 반영 후 다음 GSC 데이터에서 노출0 33개가 줄었는지 확인 — 줄면 신규 재개, 안 줄면 원인 재조사.

### 2026-08-03 (16차): 공격적 확장 세션 — 신규 2건 + 보강 1건 발행, 15차 오판 정정, IndexNow 도입

> 15차(같은 날 앞 세션)의 판단 오류를 사용자가 강하게 지적해서 시작한 세션. 15차는 "구글 노출 95%
> 붕괴"를 사업 최우선 위기로 잘못 판단하고 신규 발행을 보류했었음 — **이 판단이 틀렸음.** 이 사이트의
> 실제 트래픽은 구글이 아니라 Bing/Yahoo/AI검색/Direct이고(GSC 3개월 클릭 5건 vs GA4 28일 세션 309),
> KPI는 GA4 세션·활성사용자로 봐야 한다는 게 이 세션에서 확정됨(위 0번/15차 섹션에 반영 완료).

#### P0 — 15차 판단 오류 정정 (완료)
1. **구글 노출 붕괴 등급 하향**: "사업 최우선 위기" → "구글 채널 한정 이슈, 3개월 클릭 5건짜리라 사업
   영향 미미". GA4 기준으로는 같은 기간 세션·활성사용자 계속 우상향 중이었음.
2. **sitemap lastmod 오판 정정**: 15차가 "102개 전부 08-02로 갱신해야 함"이라고 잘못 판단했던 것을
   정정 — 헤더/푸터 같은 보일러플레이트 변경은 구글 사이트맵 가이드라인상 lastmod 갱신 대상이 아님.
   08-02에 **실질적으로 본문이 바뀐 5개만**(`privacy-policy.html`, `contact.html`, `blog/index.html`,
   `tools/index.html`, `guides/index.html`) lastmod를 2026-08-02로 갱신하고 나머지 97개는 그대로 둠.
3. 09번 섹션 회피 리스트가 "구글 SERP 기준"으로 만들어진 것임을 명시하고, 자동 기각 근거로 쓰지
   말라고 정정(Bing/AI 검색 기준에서는 구글 상위 콘텐츠팜 존재가 우리 노출과 거의 무관).

#### P1 — IndexNow 도입 (Bing/Yahoo 즉시 색인 요청, 신규 인프라)
- repo 루트에 IndexNow 인증 키 파일 추가(`2418ccf7...b3333.txt`, 64자리 16진수).
- `notify-indexnow.js` 신규: 발행 URL을 IndexNow API(`https://api.indexnow.org/indexnow`)에 POST.
  `--sitemap` 옵션으로 전체 URL 일괄 제출도 가능.
- **이 개발 환경의 egress 방화벽이 `api.indexnow.org`를 막고 있어**(`x-deny-reason: host_not_allowed`)
  Claude가 이 스크립트를 실행해도 항상 실패함 — curl과 node 양쪽으로 실제 확인함, 되는 척하지 않음.
  **사용자가 자신의 PC/서버에서 직접 실행해야 실제 제출됨.** 4번 체크리스트에 curl 명령 전문 추가함.

#### P2-1 — 신규 발행: `blog/how-long-to-cook-ham.html` (Gammon & Ham)
- how-long-to-cook 클러스터의 갭. 사이트 전체 재확인 결과 gammon/ham 콘텐츠 0건.
- GSC "gammon cooking calculator" 노출 있음, GB 노출 3위(1,658회)·GA4 사용자 2위(27명) — UK 트래픽 활용.
- 차별화: gammon(raw)과 ham(조리 후)의 UK식 구분 + 미국 마트 ham 대부분이 이미 fully-cooked라
  '조리'가 아니라 '재가열'이라는 사실이 만드는 실제 온도 기준 차이를 US(USDA fresh ham 145°F/63°C)
  vs UK(gammon 70-75°C) 대조표로 정리 — 기존 pork-chops 페이지의 국가별 규정 비교 패턴과 동일 논리.
  경쟁 6곳(procalculator.co.uk, calculatorsonline.co.uk, meatcookingtimecalculator.com 등) 전부
  이 각도를 다루지 않음.
- 1,295단어, FAQ 5개, 표 2개. 기존 `tools/meat-temperature-guide.html`의 ham-fresh/ham-cooked
  수치와 완전히 일치시켜 사이트 내 수치 충돌 없음. 체크리스트 전항목 반영, 역방향 링크 5곳.

#### P2-2 — 신규 발행: `tools/egg-weight-converter.html` (Egg Weight & Volume Converter)
- GSC 관련 쿼리 19종+ 확인(how many ml in one egg, tablespoons in one egg, eggs to grams,
  volume of egg 등). GA4 최고 트래픽 페이지가 egg-converter(134회)라 토픽 권위 활용.
- 기존 egg-converter(사이즈↔사이즈)·how-many-eggs-in-a-cup(컵)과 자사 중복 재확인 — 0건.
- 차별화: 경쟁 계산기 대부분(egg.foodnutrify.com 등, 회피리스트)이 '개수→무게' 단방향뿐인데,
  이 툴은 5개 입력필드(개수/g/oz/ml/tbsp)가 전부 상호 양방향 — 액란 200g→대란 4개처럼 역방향 계산 가능.
- 수치는 전부 기존 `tools/egg-converter.html`의 in-shell 무게(43/50/57/64/71g)를 단일 출처로 재사용,
  껍질손실 12%·흰자:노른자 66:34 비율로 파생. JS 로직 Node로 2000회 랜덤 시뮬레이션 크래시 0건.
  FAQ 수치 전부 계산값과 대조 검증(오차 발견해 1건 수정: 중란 티스푼 값).
- 852단어, FAQ 6개, 표 1개. **모바일 반응형 미디어쿼리 최초 누락을 발행 전에 발견해서 수정함**
  (`.tool-form-grid`에 `@media(max-width:600px)` 추가 — 이 사이트에서 반복된 버그 패턴이라 처음부터
  체크리스트로 잡았어야 했던 것, 다음에도 신규 그리드 만들 때 첫 항목으로 확인할 것).
- **부수 수정**: `index.html`의 `stat-num`이 19로 표시돼 있었는데 실제 툴 개수는 이미 23개였던
  드리프트(원인 불명, 여러 세션 전부터 방치돼 있었던 것으로 보임) — 24로 정정하며 같이 바로잡음.
- 체크리스트 전항목 반영, 역방향 링크 3곳(egg-converter/how-many-eggs-in-a-cup/how-to-substitute-egg-sizes).

#### P2-3 — 영국식 계량 각도(기획했으나 진행 안 함, 이미 커버됨)
- GSC 클러스터(cups to tablespoons uk 50위, 3/4 cup in grams uk 51위, teaspoons in tablespoon uk
  77.5위, gas mark 관련 다수) 재확인 결과 **이미 완전히 커버돼 있었음**:
  `tools/cups-to-tablespoons.html`, `tools/tablespoon-to-teaspoon.html`, `tools/cups-to-grams.html`,
  `blog/tablespoon-to-teaspoon-guide.html`에 US/UK/AU 정확 수치(US tbsp 14.79ml, AU tbsp 20ml,
  UK tbsp 15ml, US cup 236.6ml, AU/CA cup 250ml) FAQ가 전부 이미 있었고, gas mark는
  `tools/oven-temp-converter.html`이 인터랙티브 계산기로 이미 실시간 대응 중. 계란 UK사이즈 쿼리도
  `how-to-substitute-egg-sizes.html`에 이미 전용 섹션 있음(07-10 세션에서 처리됨).
  **진짜 갭이 없어서 신규/보강 둘 다 진행 안 함** — 자사 중복 먼저 확인하라는 원칙이 실제로 작동한 사례.

#### P2-4 — 보강: `tools/liquid-converter.html`에 cc 별칭 추가
- GSC "30cc to tablespoons"(38위), "20 cc to tablespoon"(43위), "30cc to tbsp"(40위) — 사이트 전체
  재확인(이전 grep이 `CC:STATIC-CHROME` 마커 때문에 오탐 났던 것 word-boundary로 재검증) 결과 진짜 갭.
- 1cc=1ml이라 신규 필드/로직 불필요 — ml 필드 레이블에 "(ml / cc)" 병기 + FAQ 1건으로 충분.
  20cc≈1⅓tbsp, 30cc≈2tbsp로 실제 계산해서 명시.

#### P3 — AI검색 최적화 패턴 (이번에 신규 도입, 신규 발행 2건에 적용)
- H1 직후 2-3문장 직답 문단에 구체 수치 명시(예: "A 4 kg (9 lb) bone-in gammon needs about...").
- 표 헤더에 단위 명시("Weight (lb / kg)" 등, "Weight" 단독 금지).
- 수치 출처를 JSON-LD뿐 아니라 본문 문장으로도 명시(USDA, 7 CFR 56 등).
- **기존 페이지 retrofit도 같은 세션 안에서 마저 진행함**(처음엔 "다음 세션"으로 미뤘다가, 사용자가
  "계속"이라고 해서 이어감): `tools/raw-to-cooked-weight.html`(노출 1,134·GA4 3위 트래픽)와
  `tools/cost-per-serving.html`(노출 754)의 인트로 문단을 구체 수치 직답형으로 교체(치킨 100g→75g,
  쌀 100g→300g, \$12÷4인분=\$3.00 등 — 전부 기존 FACTORS 값 재사용, 새 수치 없음). sitemap lastmod
  2건 08-03 갱신. 커밋 `b03a211`.

#### 최종 상태
**툴 24 + 블로그 66 + 가이드 7 = 총 97페이지** (세션 시작 95 → +2 신규, cc 보강은 페이지 수 불변).
검증: 개수정합 전부 일치(tools 24/blogs 66/guides 7/sitemap 104, nav.js 전부 일치), 신규/수정 파일
전부 JSON-LD 파싱·div 밸런스·sitemap XML 유효성 통과, noindex 0건, canonical 누락 0건, chrome
(header/mobileNav/footer) 전 페이지 각 1개, node build-static.js 정상 실행(104페이지 처리).

**참고(이번 세션 범위 밖으로 남겨둔 것)**: build-static.js의 빈줄 누적 버그(기능 영향 없음, 15차에서
처음 발견, 재실행마다 재현됨)는 이번에도 손대지 않음 — 우선순위 낮음으로 계속 이월.

**다음 세션 우선순위**: (1) IndexNow 실제 제출은 사용자 PC에서, (2) 새 채널(Bing/AI) 유입이 실제로
늘고 있는지 다음 GA4 자료로 확인, (3) 비-애드센스 수익화(광고망/제휴) 검토(12번 섹션
참고, 이번 세션엔 코드 추가 안 함), (4) P3 패턴을 다른 고트래픽 페이지(meal-cost-calculator,
egg-converter 등)로 추가 확장할지 다음 GSC 데이터로 반응 보고 판단.

### 2026-08-03 (15차): GSC 노출 붕괴 확인(구글 채널 한정, 영향 미미) + 전략 재정렬 — 분석 전용, 콘텐츠 변경 0건

> **이 항목은 같은 날 두 번 갱신됐다.** 최초 작성 시 "구글 노출 붕괴"를 사업 전체의 최우선 위기로 잘못 판단했음
> (사용자 지적으로 수정, 아래 ★전략 재정렬 참고). **KPI는 GSC가 아니라 GA4 세션·활성사용자다.**
> 구글 클릭은 3개월 누적 5건에 불과한 채널이라, 이 채널의 등락이 사업에 미치는 영향은 크지 않다.

#### ★ 전략 재정렬 (2026-08-03, 사용자 지시로 확정 — 이후 모든 세션에 적용)
- **이 사이트의 실제 트래픽은 구글이 아니다.** GSC 3개월 클릭 5건 vs GA4 28일 세션 309.
  주력 채널은 Bing / Yahoo / AI 검색(ChatGPT·Perplexity 등) / Direct.
- **KPI는 세션수·활성사용자(GA4)로 삼는다.** 구글 노출/순위(GSC)는 후행 참고 지표로 강등.
  단 장기적으로는 organic이 중요하므로 완전히 무시하지는 않음 — 우선순위만 낮춘 것.
- 애드센스에 의존하지 않는다. 심사는 병렬로 두되 발행을 멈추는 근거로 쓰지 않는다.
- **09번 섹션의 "회피 리스트"는 구글 SERP 1페이지 진입 기준으로 만든 것** — Bing/AI 검색 기준에서는
  "omnicalculator가 구글 3위"라는 사실이 우리 노출과 거의 무관함. **08-03부터 신규 후보 판정 기준을 바꾼다**:
  - (구) "이 쿼리를 콘텐츠팜이 선점했나" → 선점했으면 자동 기각
  - (신) "우리가 그 페이지보다 더 정확하고 더 구조화된 답을 낼 수 있나" → 되면 진행
  - 회피 리스트 자체는 계속 참고하되(어떤 도메인이 있는지 아는 건 유용함), **자동 기각 근거로 쓰지 말 것.**
- 수익화도 애드센스 단일 의존에서 벗어나 검토한다. **단, 특정 광고망/제휴사를 미리 정해두지 않는다**
  (2026-08-03, 사용자 지시로 정정 — 아래 12번 섹션 참고). 광고 제휴는 실사용 툴(온도계·주방저울 등)과
  자연스럽게 붙는 카테고리부터 검토하되, 구체적으로 어느 사이트/네트워크와 할지는 그 시점 데이터를
  보고 판단할 세션이 직접 찾아서 정할 것.

#### 발견 1 — GSC 노출 급락 (구글 채널 한정, 사업 영향은 미미로 재평가)
GSC Performance 일별 차트 기준:
| 구간 | 총 노출 | 일평균 | 평균순위 |
|---|---|---|---|
| 07-18 ~ 07-24 | 5,250 | 750 | 약 40위 |
| 07-25 ~ 07-31 | 248 | 35 | 약 56위 (07-28 이후는 70위대) |

**감소율 95.3%.** 07-24(1,028회) → 07-25(38회) 하루 만에 꺼짐.
노출이 먼저 붕괴(07-25)하고 순위 악화는 3일 뒤(07-28)에 따라옴.

**단, 이 채널의 3개월 누적 클릭은 5건이었다.** 즉 이 붕괴가 만든 실질 매출/트래픽 손실은 사실상 0에 가깝다.
GA4 기준 세션·활성사용자는 이 기간에도 계속 우상향(아래 발견 3 참고) — **사업 전체로 보면 이 채널 하나의 등락일 뿐,
다음 세션의 우선순위를 여기에 맞출 근거는 아니다.** 원인 추정(참고용, 조치 불필요):
- 07-11: Coverage 색인 9→70개 급증, 노출 급증도 이 시점부터 시작. 이후 14일간 CTR 0.0~0.2%로 낮았음.
- 2026년 7월 코어 업데이트는 06-28~07-09에 이미 종료 — 07-25 시점과 안 맞음.
- 07-11 대량 색인 직후 탐색적 노출(허니문) → 낮은 CTR로 재평가 후 강등, 이 정도로 추정할 뿐 확정 아님.
- 14차(08-02) 정적 렌더링 전환이 이 채널 회복에도 도움이 될 수 있으나, **적극적으로 확인하러 갈 필요는 없음** — 다음 GSC 자료 받을 때 참고만 할 것.

#### 발견 2 — sitemap.xml lastmod 재확인 (조치 사실상 불필요, 아래 3개만 예외)
08-02 커밋에서 102개 전 파일에 헤더/모바일메뉴/푸터가 정적 삽입됐지만, sitemap.xml lastmod는 07-13~07-27에 멈춰있고
08-02 날짜가 0개다. **최초 이걸 P0 버그로 잘못 판단했었다** — 구글 사이트맵 가이드라인상 헤더/푸터 같은
보일러플레이트 변경은 lastmod 갱신 대상이 아니다. 08-02는 순수 chrome(뼈대) 주입이었으므로 **102개 대부분은
현재 lastmod(07-27 등)가 정상이고 손댈 필요 없음.**
다만 08-02에 **본문 자체가 실질적으로 바뀐 파일 5개**는 예외로 lastmod 08-02 갱신 대상이다:
`privacy-policy.html`(120→700단어 재작성), `contact.html`(27→400단어 재작성),
`blog/index.html`·`tools/index.html`·`guides/index.html`(카드 목록이 정적 텍스트로 대량 추가, 21/25/29단어 → 900~2,700단어).
→ 이 5개만 갱신하고 나머지 97개는 건드리지 말 것.

#### 발견 3 — GA \"Organic Search\"의 97%는 구글이 아님 (프레이밍 교정, 여전히 유효)
- GA4(07-06~08-02, 28일): 세션 309, 활성사용자 30일 기준 247명(계속 증가 중), Organic Search 세션 173.
- 같은 기간 GSC 클릭은 사실상 2건.
- → **GA의 Organic Search 173세션 중 구글 유입은 1~2%뿐.** 실질 트래픽은 Bing/DDG 등 비구글 + Direct.
- 지금까지 세션마다 "GSC는 0인데 GA는 는다"를 애매하게 표현해왔는데, 정확히 말하면
  **"구글은 원래도 작은 채널이고(3개월 클릭 5건) 최근 더 줄었지만, 사업의 실제 성장은 Bing/AI/Direct가 이끌고 있다"**가
  맞는 서술임. 08-03 확정된 전략 전제(위 참고) 그대로다.

#### 발견 4 — build-static.js 비멱등 (경미하지만 기록)
14차 기록에 "멱등성 보장(2회 연속 실행해도 중복 안 생김, 검증함)"이라고 적혀 있으나, 실제로는
**실행할 때마다 102개 전 파일에 빈 줄이 1줄씩 누적됨**(`<main>` 앞, `CC:STATIC-CHROME:START` 앞 각 1줄).
헤더/모바일메뉴/푸터 개수는 정확히 1개씩 유지되므로 **기능상 문제는 없음**. 다만 실행할 때마다 102 파일 diff가 발생해
"진짜 변경분"을 가리므로, 블록 제거 시 앞뒤 개행까지 같이 트림하도록 고치는 게 좋음(우선순위 낮음).

#### 발견 5 — 신규 콘텐츠 후보 2건 검증, 둘 다 기각
| 후보 | 근거 | 판정 |
|---|---|---|
| 가몬/햄 조리시간 (`gammon cooking calculator` GSC 노출 있음, how-long-to-cook 클러스터 유일한 큰 빈칸) | 전용 계산기 6개+ — **missvickie.com(회피리스트)**, procalculator.co.uk, calculatorsonline.co.uk, **meatcookingtimecalculator.com**, cookipedia.co.uk, feistytapas.com | 기각 |
| 계란 무게/부피 변환 툴 (GSC에 관련 쿼리 19종+, GA 최고 트래픽이 egg-converter라 토픽 권위 활용 가능) | **egg.foodnutrify.com**(beef.foodnutrify와 동일 계열, 회피리스트), **handychefdom.com**(회피리스트), **challengeanswer.com**(회피리스트), **aqua-calc.com**(회피리스트), calculatorsoup.app, codingace.net, howmuchisin.com | 기각 |

**중복 확인은 실제 grep으로 완료함**: gammon/ham = 사이트 전체 0건(진짜 갭이었음), 계란 부피 = egg-converter/how-many-eggs-in-a-cup에 부분 커버.
`bag of sugar / 5 lb bag` 계열은 이미 how-many-cups-in-a-pound-of-sugar/flour에 표+FAQ로 커버돼 있어 별도 후보 아님(재확인 완료).

**회피 리스트 신규 추가(9번 섹션에도 반영)**: meatcookingtimecalculator.com(고기 조리시간 전용 도메인 — how-long-to-cook 클러스터 직접 경쟁자),
procalculator.co.uk, calculatorsonline.co.uk, calculatorsoup.app, egg.foodnutrify.com, calcs.tools, cookingcalculators.us.

#### 발견 6 — CTR이 진짜 병목 (다음 콘텐츠 작업의 방향)
- 3개월 누적: 노출 8,660 / 클릭 5 / **CTR 0.058%**.
- 모바일 평균순위 11.47위(노출 2,930, 클릭 4) vs 데스크톱 59.77위(노출 5,705, 클릭 1).
- 페이지별 최악의 낭비: `raw-to-cooked-weight`(노출 1,134, 평균 9.67위, 클릭 1), `cost-per-serving`(754, 8.23위, 1).
  **1페이지 평균순위에서 정상 CTR(2%)이면 각각 20건 이상 나왔어야 함.**
- 원인 후보: (a) 평균순위를 끌어올리는 게 노출 1~2회짜리 쿼리라 실제로는 1페이지가 아님(기존 세션들의 해석), (b) 상위 쿼리 상당수가
  **워드프라블럼(숙제)**이라 원래 클릭이 안 남 — "you purchase beef at $6 per pound…"가 노출 1위(54회, 6.39위, 클릭 0),
  (c) AI Overview 흡수.
- **참고용 기록(우선순위 아님)**: 위 CTR 병목은 구글 채널 한정 얘기다. 08-03 전략 재정렬 이후 이번 세션의 실제 작업은
  신규 발행 + Bing/AI 채널 강화 쪽으로 진행함(아래 08-03(16차) 참고).

#### 이번 세션 조치
- 코드/콘텐츠 변경 0건. **handover.md 이 항목만 추가.**
- 기술 점검은 전부 통과: noindex 0건, canonical 누락 0건, robots.txt 정상, 102개 전 페이지 header/mobileNav/footer 각 1개,
  개수 정합(tools 23 / blogs 65 / guides 7 / sitemap 102 / nav.js 전부 일치).

### 2026-08-02 (14차): 🚨 애드센스 "가치 없는 콘텐츠" 거절 대응 — 정적 렌더링 전환 (구조 대수술)

> **다음 세션에서 가장 먼저 읽어야 할 항목.** 이 세션에서 사이트의 렌더링 방식이 근본적으로 바뀌었고,
> 앞으로 페이지를 추가할 때마다 **반드시 빌드 스크립트를 돌려야 한다.**

#### 무슨 일이 있었나
애드센스에서 `cookingcalcs.com`에 대해 **"가치가 별로 없는 콘텐츠"**로 게재 거부 판정.
사이트 전반을 점검한 결과 **콘텐츠 자체는 문제가 아니었음** — 102페이지 중 대부분이
600~1700단어에 표·FAQ·JSON-LD까지 완비돼 있었음. 문제는 전부 **"크롤러 눈에 어떻게 보이는가"**였음.

#### 진단된 원인 4가지
1. **헤더/네비/푸터가 전 페이지에서 nav.js 런타임 주입** ← 최대 원인.
   정적 HTML에 `<header>`/`<nav>`/`<footer>`가 **단 한 페이지도 없었음**.
   JS를 실행하지 않는 크롤러(애드센스 심사 포함)에게는 사이트 전체가
   **네비게이션도 푸터도 없는 고립 문서 더미**로 보였음.
2. **목록 페이지 3개가 사실상 빈 페이지**: 정적 기준 본문이
   `/blog/` 21단어, `/tools/` 25단어, `/guides/` 29단어, **내부링크 0개**. 카드가 전부 JS 렌더링이었음.
3. **홈페이지가 정적 기준으로 "Blog posts coming soon" / "Guides coming soon"** 표시.
   실제로는 블로그 65개·가이드 7개를 보유한 상태에서 "준비 중"이라고 말하고 있었음.
4. **프라이버시 정책에 광고 관련 고지 전무**. Google Analytics만 언급하고
   애드센스·서드파티 광고 쿠키·개인 맞춤 광고 옵트아웃이 하나도 없었음 → **정책 직접 위반**.

#### 조치 내용
**(1) `assets/js/nav.js` 리팩터링 — 단일 소스 유지**
- 헤더/모바일메뉴/푸터 마크업을 `ccBuildHeader()` / `ccBuildMobileNav()` / `ccBuildFooter()`
  최상위 함수로 분리하고 `module.exports` 추가 → Node에서 `require` 가능.
- GA 블록을 `typeof document !== 'undefined'` 가드로 감싸 Node 실행 시 죽지 않게 함.
- **주입 전 `.site-header` / `.site-footer` 존재 여부를 확인해 이미 있으면 건너뜀**(중복 방지).
  정적 마크업이 없는 페이지에서는 기존처럼 폴백 주입되므로 하위 호환됨.

**(2) `build-static.js` 신규 추가 (repo 루트)**
- nav.js의 빌더 함수를 **그대로 재사용**해 102개 전 HTML에 헤더/모바일메뉴/푸터를 정적 삽입.
- 목록 카드 정적 삽입: `index.html`(블로그6+가이드7), `blog/index.html`(65),
  `guides/index.html`(7), `tools/index.html`(23).
- `tools/index.html`의 `TOOL_ICONS` 맵을 **파싱해서** 사용 → 아이콘 정의를 두 곳에 두지 않음.
- `<!-- CC:STATIC-CHROME:START/END -->`, `<!-- CC:STATIC-CARDS:START/END -->` 주석 마커로 감싸
  재실행 시 기존 블록을 제거 후 재삽입 → **멱등성 보장(2회 연속 실행해도 중복 안 생김, 검증함)**.

**(3) 프라이버시 정책 전면 재작성** (120단어 → 약 700단어)
- Google AdSense 사용 명시, 서드파티 광고 쿠키 설명, 개인 맞춤 광고 옵트아웃 3경로
  (Google Ads Settings / aboutads.info / NAI), Google 파트너 사이트 정책 링크.
- EEA·UK·스위스 이용자 권리, 아동 개인정보(13세 미만), 외부 링크 면책, 정책 변경 조항 추가.

**(4) 부수 수정**
- `about.html` 메타설명의 **"no ads"** 문구 제거 — 광고 게재 사이트와 정면 모순이라 정책 리스크였음.
- `tools/index.html` 메타설명 "14 free calculators" → **23**으로 갱신(실제 개수와 불일치했음).
- `TOOL_ICONS`에 누락돼 있던 신규 툴 4개 아이콘 추가(grill/pan-size/can-size/candy).
- `contact.html` 27단어 → 약 400단어(오류 제보 방법, 정확성 정책, 응답 시간, 식품안전 면책).
- `contact.html`·`privacy-policy.html` 메타설명 추가(둘 다 누락돼 있었음).
- `ads.txt` 신규 추가: `google.com, pub-5592663499707350, DIRECT, f08c47fec0942fa0`

#### 결과 (정적 기준 = JS 미실행 크롤러가 보는 것)
| 페이지 | 이전 | 이후 |
|---|---|---|
| `index.html` | 484단어 / 내부링크 22 | **1,604단어 / 169** |
| `blog/index.html` | 21단어 / 0 | **2,683단어 / 199** |
| `tools/index.html` | 25단어 / 0 | **899단어 / 157** |
| `guides/index.html` | 29단어 / 0 | **976단어 / 141** |
| 전 페이지 | 600단어 미만 8개 | **600단어 미만 0개** |

#### ⚠️ 앞으로 반드시 지킬 것 (신규 페이지 추가 시)
1. `assets/js/nav.js`의 TOOLS/BLOGS/GUIDES 배열에 항목 추가 (기존과 동일)
2. sitemap.xml / llms.txt 반영 (기존과 동일)
3. **`node build-static.js` 실행** ← 신규 필수 단계.
   안 돌리면 새 페이지에 헤더/푸터가 정적으로 안 들어가고, 목록 페이지 카드도 갱신 안 됨.
   (브라우저에선 nav.js 폴백으로 보이니 육안으로는 멀쩡해 보임 → **놓치기 쉬우니 주의**)
4. 커밋 전 검증:
```bash
node build-static.js
# 전 페이지 header/mobileNav/footer가 정확히 1개씩인지
for f in $(find . -name "*.html" -not -path "./.git/*"); do
  h=$(grep -c 'class="site-header"' "$f"); m=$(grep -c 'id="mobileNav"' "$f"); ft=$(grep -c 'class="site-footer"' "$f")
  [ "$h" != "1" ] || [ "$m" != "1" ] || [ "$ft" != "1" ] && echo "이상: $f h=$h m=$m f=$ft"
done
# JS 없이 본문 단어수 확인(600 미만 없어야 함)
python3 -c "
from bs4 import BeautifulSoup; import glob
for fp in sorted(glob.glob('*.html')+glob.glob('blog/*.html')+glob.glob('tools/*.html')+glob.glob('guides/*.html')):
    s=BeautifulSoup(open(fp,encoding='utf-8').read(),'html.parser')
    [t.decompose() for t in s(['script','style'])]
    w=len(s.find('body').get_text(' ',strip=True).split())
    if w<600: print(w, fp)"
```

#### 다음 단계
- 애드센스 콘솔에서 **"문제를 수정했음을 확인합니다" 체크 후 검토 요청** 제출 필요(사용자 작업).
- 재심사는 보통 며칠~2주 소요. 거절 사유가 또 나오면 이번 4가지 외 다른 원인일 가능성이 높으니
  거절 화면의 세부 문구를 그대로 확인할 것.
- 배지: `index.html` `<main>` 안에만 존재하며 다른 페이지엔 없음(푸터 정적화와 무관하게 홈 전용 유지됨).
  단 **launchbison 배지는 사용자가 `display:none` 처리한 상태**(이미지 깨짐 때문). 사용자 판단이므로 건드리지 말 것.

### 2026-07-27 (13차): 신규 4건 발행 (Candy 계산기 + 조리시간 3건) — 91→95페이지
사전 검증된 P1~P4를 순서대로 전부 실행 완료. 중단 없이 끝까지 진행됨.

**P1 — `tools/candy-temperature-calculator.html`(신규 툴)**: 13개 캔디 드롭다운 →
목표온도/단계/냉수테스트. 8단계 전체 참고표. 차별화: 온도=수분함량 원리,
**고도 보정(1,000ft당 -2°F, 경쟁 차트 대부분이 빠뜨림)**, 일반온도계 vs 캔디온도계 구분.
- 검증 배경: WebstaurantStore/MasterClass/ThermoPro 등 전부 정적 차트만 보유,
  인터랙티브 계산기 0개 — grill-temperature-calculator와 동일한 승리 패턴 확인.

**P2 — `blog/how-long-to-cook-pork-tenderloin.html`(신규)**: 무게×온도 교차표 +
시어링 후 별도 표. 차별화: 조리시간 8분~1시간15분 편차의 원인 4가지 중 최대 원인인
**tenderloin vs loin 혼동**을 구분표로 정리. **이 클러스터의 예외 사례로 명시**
(brisket/ribs는 안전최소온도 넘겨야 맛있는데, tenderloin은 lean이라 반대로 145°F
넘기면 퍽퍽해짐) — brisket 페이지와 대조 링크해 클러스터 논리를 오히려 강화함.
tenderloin vs loin **비교 전용 페이지는 만들지 않음**(1차 기각 유지).

**P3 — `blog/how-long-to-bake-white-fish.html`(신규)**: cod/haddock/tilapia/halibut/
pollock/catfish/perch 7종×두께 교차표. 자사 해산물 클러스터 갭(salmon/shrimp만 있고
흰살생선 전무) 메움. 차별화: 10분/인치 규칙이 왜 흰살생선 전반에 통하는지(lean이라
지방에 의한 열전달 차이가 작음) 설명, 연어와 대조(연어는 지방으로 버티지만 흰살생선은
안 됨).

**P4 — `blog/how-long-to-cook-pork-shoulder.html`(신규)**: 무게×온도 교차표.
차별화: 파운드당 30분~2시간(4배) 편차의 핵심 원인이 **슬라이스(180°F) vs
pulled(195-205°F) 목표 미구분**이라는 것을 정리 — brisket/ribs와 같은 콜라겐 로직의
가장 큰 사례로 클러스터에 편입.
- 신규 회피 도메인: quickcooktime.com(조리시간 전용 계산기, howlongtocook.org와 동류) — 9번 섹션에 기록.

**부수 작업**: P2·P3가 `complete-meat-cooking-temperature-guide.html` 마스터 리스트에
누락된 것을 P4 작업 중 발견해 함께 백필함.

**9번 회피 리스트 추가 확정**(사전 검증 완료, 앞으로 이 후보들 절대 재시도 말 것):
- 튀김 기름 온도 차트 — missvickie·superglobalcalculator(회피리스트) + airfryerpoint 선점
- 브라인 계산기 — best-calculators·gigacalculator·innovicat·simplifycalc·usecalcpro·
  utils.com·pitmaster.tools·destination-bbq. 전용 계산기 8개+, 이 프로젝트에서 확인된 것 중 최악
- 로스트비프 조리시간 — Certified Angus Beef·RecipeTips가 차트 선점(12차 기각)
- quickcooktime.com — 조리시간 전용 계산기 도메인(howlongtocook.org와 동류, how-long-to-cook
  시리즈 확장할 때마다 확인할 것)

**신규 확립 판정 패턴(다음 세션 최우선 적용 기준)**: "권위 사이트들이 정적 차트만
갖고 있고 인터랙티브 계산기가 없는 니치"가 가장 승산 높음. grill-temperature-calculator와
candy-temperature-calculator 둘 다 이 패턴으로 성공. 신규 후보 탐색 시 이 기준을
경쟁강도 확인보다 먼저 적용할 것 — "차트는 있는데 계산기는 없다"가 핵심 신호.

**현재 사이트 구조**: 툴 23 + 블로그 65 + 가이드 7 = **총 95페이지**.

**다음 세션 미검증 후보**: 프라임립, 관자(scallops), 통오리, 콘비프,
조리도구 용량(더치오븐/슬로우쿠커 — 경쟁자가 브랜드뿐이고 계산기팜 없으나
"뭘 사야 하나"류 제품추천 콘텐츠라 사이트 정체성 이탈 우려로 보류 중, 재검토 필요시
"몇 인분이면 몇 쿼트가 적당한가" 같은 계산기형 각도로 재구성 검토).
how-long-to-cook 클러스터가 15건으로 커졌으니 별도 파생 페이지보다 신선한 축(재료 종류
확장 등)을 우선 탐색할 것 — 이 클러스터 안에서 계속 파생시키면 수확체감 위험.

### 2026-07-27 (12차): 미트볼 신규 발행, 로스트비프 기각
- **로스트비프 검증 후 기각**: web_search 결과 Certified Angus Beef(certifiedangusbeef.com/en/cooking/timetables), RecipeTips.com(recipetips.com/kitchen-tips/t--1542/roast-beef-cook-time.asp)이 이미 부위별·중량별 조리시간 차트를 보유 — 우리의 '레퍼런스 차트' 차별화 각도가 선점된 상태. 9번 섹션 회피 리스트에 추가할 것.
- **미트볼 판단**: `how-long-to-cook-ground-beef.html`의 기존 미트볼 커버리지는 표 2행+문장 일부(~40단어)뿐이었음. 신규 스펙(크기×온도 12칸 교차표, 160/165°F 온도 혼선 정리, 오븐/팬/소스 비교, 냉동 처리, 퍽퍽함 원인, FAQ 4개)이 기존 대비 20배 이상 깊어져 **신규 페이지 발행**으로 진행(단순 확장 아님).
- `blog/how-long-to-cook-meatballs.html`(895단어, 6분) 신규 발행. **차별화 핵심**: 미트볼 안전온도가 사이트마다 160°F 또는 165°F로 갈려서 서로 충돌하는 것처럼 보이는 문제를 "고기 종류 차이일 뿐"이라고 정면으로 정리(소/돼지/혼합=160°F, 칠면조/닭=165°F). 경쟁 레시피 블로그들은 이 혼선 자체를 다루지 않음.
- `how-long-to-cook-ground-beef.html`의 기존 미트볼 표는 1인치 항목만 남기고 간략화, 신규 페이지로 링크. 두 페이지 간 수치 불일치 방지를 위해 시간 값(15-18분)을 신규 페이지 기준으로 통일.
- 체크리스트: nav.js(blogs 62)/sitemap(98)/llms.txt, 상호링크 3곳(`ground-beef`, `complete-meat-cooking-temperature-guide`, `chicken-wings`).
- 검증: div/JSON-LD/sitemap/개수정합/읽기시간(145wpm)/표스타일(unstyled 0)/인바운드(3개) 전부 통과.
- **현재 사이트 구조**: 툴 22 + 블로그 62 + 가이드 7 = **총 91페이지**.
- **다음 세션 남은 빈칸 후보**(미검증): 돼지 안심(pork tenderloin — 단 07-27 1차에 "pork tenderloin vs pork loin" 비교 각도는 이미 기각된 바 있음, 조리시간 단독 페이지는 별개로 재검증 필요), 관자/흰살생선 필렛. **how-long-to-cook 클러스터가 이제 12건(브리스킷/립스/윙/드럼스틱/미트볼 포함)까지 늘어나 별도 Guide 승격 검토 대상** — 단 `complete-meat-cooking-temperature-guide.html`가 이미 유사 역할을 하고 있어 중복 여부부터 확인할 것.

### 2026-07-27 (11차): 신규 클러스터 재탐색 실패 → 기존 클러스터 빈칸 메우기로 전환, 2건 발행
- 사용자 지시: "신규를 해야 된다. 지금은 키워드/롱테일 키워드를 **먼저 점거**해야 뭘 해볼 수 있는 상황이다."
- **신규 클러스터 후보 4건 추가 검증, 3건 기각**:
  | 후보 | 기각 사유 |
  |---|---|
  | 채소·과일 환산(양파 1개=몇 컵) | cookingconverter.com(회피리스트) + kitchencalculator.app(전용 계산기 도메인) + howmuchisin + alibaba 콘텐츠팜 2개 + Tasting Table |
  | 피클링 브라인 비율 | missvickie·best-calculators·mycalcbuddy(**3개 다 회피리스트**) + superglobalcalculator + formulafactory.tools. 게다가 보툴리즘 YMYL |
  | 호주/영국 계량 차이(20ml 스푼) | cookingconverter.com 전용 가이드 + kitchencalculator.app 전용 글 + Nigella Lawson. 자사 `how-to-convert-a-recipe-to-metric`과도 중복 |
  | 조리도구 용량(더치오븐 몇 쿼트) | **경쟁자 프로필은 유리**(Le Creuset·Lodge 등 브랜드와 제품리뷰 사이트뿐, 계산기팜 0개). 단 브랜드 권위가 압도적이고 "뭘 사야 하나"는 제품추천 콘텐츠라 계산기 사이트 정체성에서 벗어남 → **보류**(기각 아님, 나중에 재검토 가능) |
- **중요 인식**: 최근 15건 이상 검증 결과 "계산기"로 검색되는 요리 주제는 사실상 전부 콘텐츠팜이 선점 완료. **신규 클러스터 발굴은 수확체감 구간에 진입**했다고 보는 게 정확함.
- **방향 전환 — 기존 클러스터 빈칸이 실제로 제일 유리함**: 07-27(9차) P4(브리스킷)가 무난했던 이유가 신규 영토 진입이 아니라 이미 11페이지로 점거 중인 `how-long-to-cook` 클러스터의 빈칸이었기 때문. 이 클러스터는 경쟁자가 **레시피 블로그**뿐이고 계산기팜이 없음 — 우리는 '레퍼런스 차트'로 접근해 차별화 가능.
- **신규 발행 2건**:
  1. `blog/how-long-to-cook-ribs.html`(895단어): 갈비 종류(baby back/St.Louis/spare/country-style/beef back) × 오븐온도(250/275/300°F) 교차표, 145°F vs 190-203°F 결과 비교, 벤드 테스트(온도계 없이 판정), 실버스킨 제거, 3-2-1 메소드가 baby back엔 과한 이유
  2. `blog/how-long-to-cook-chicken-wings.html`(834단어): 오븐온도(350/400/425/450 + 냉동) × 통날개/드러메트 교차표. **차별화 핵심 — 경쟁 블로그는 전부 "165°F까지"로 끝나는데, 우리는 165°F가 안전 최소치일 뿐 날개엔 잘못된 목표(175-185°F에서 지방·결합조직 렌더링돼야 껍질이 바삭)라는 점을 정면으로 다룸**. 베이킹파우더 원리(표면 pH↑ → 갈변 촉진)
  3. `blog/how-long-to-cook-chicken-drumsticks.html`(840단어): 오븐온도별 표 + **'드럼스틱 vs 뼈있는허벅지 vs 뼈없는허벅지 vs 날개' 시간 비교표**. 같은 다크미트인데 시간이 다른 이유를 부위 형태(뼈 위치·두께·껍질 렌더링 목적)로 설명 — 개별 레시피 블로그는 자기 부위 하나만 다뤄서 못 하는 비교각도. **단 차별화 강도는 ribs/wings보다 약함**: 101cookingfortwo가 이미 "185-195°F가 165°F보다 낫다"를 쓰고 있어 온도 각도는 선점당함. 계산기팜 부재 + 자사 비교표 강점으로 진행 판단함
- **클러스터 일관성 확보**: brisket(195-205°F) → ribs(190-203°F) → wings(175-185°F) → drumsticks(175-195°F)로 "안전 최소온도 ≠ 맛있는 온도, 콜라겐/지방 렌더링이 진짜 목표"라는 동일 논리를 네 페이지에 걸쳐 연결하고 상호링크함. 이건 개별 레시피 블로그가 못 하는 구조적 강점 — 앞으로 이 클러스터를 확장할 때도 이 논리를 축으로 삼을 것.
- **현재 사이트 구조**: 툴 22 + 블로그 61 + 가이드 7 = **총 90페이지**.
- **다음 세션 남은 빈칸 후보**(미검증): 로스트비프, 미트볼, 관자/생선 필렛 일반, 돼지 안심(pork tenderloin). 통닭은 07-20에, 닭가슴살 관련은 기존 페이지와 중복 위험 있으니 주의. **how-long-to-cook 클러스터가 14건으로 커졌으므로 별도 Guide 승격도 검토 대상**(현재 `complete-meat-cooking-temperature-guide`가 일부 역할 하고 있으니 중복 여부부터 확인할 것).

### 2026-07-27 (10차): 표 스타일 깨짐 버그 수정 — 신규 페이지 체크리스트에 추가할 항목 발견
- 사용자가 `can-size-converter.html`의 "Complete Can Size Chart" 표가 간격 없이 좁게 나온다고 스크린샷 지적.
- **원인**: `style.css`의 표 스타일(패딩/테두리/헤더배경)이 `.blog-content table/th/td`로 스코프돼 있어서, 표가 `.blog-content` div **밖**에 있으면 순수 마크업만 남아 스타일이 전혀 안 먹힘. 이 사이트는 표를 두 가지 방식으로 처리해왔음: (a) `<table style="...">`로 직접 인라인 스타일(구식 패턴), (b) `.blog-content` 안에 넣어서 CSS 상속(신식 패턴) — 이번에 `can-size-converter.html`과 `grill-temperature-calculator.html`을 만들 때 참고 표(Reference Chart)를 `.blog-content` 밖, `chart-header-row` 다음에 배치하면서 (a)도 (b)도 아닌 상태로 방치함.
- 수정: 문제의 표를 `<div class="blog-content" style="margin:0;">`로 감싸서 정상화. `can-size-converter.html`, `grill-temperature-calculator.html`(이번 세션 발행) 외에 `butter-converter.html`(이전 세션부터 있던 버그, 이번에 처음 발견)도 동일 수정.
- **전수 검사 방법 기록**: 정규식으로 div 밸런스를 셀 경우 `<script>` 안 JS 문자열에 들어있는 가짜 `<div...>` 텍스트(printToPDF 등에서 innerHTML 조립 시 사용)에 오탐지됨 — 반드시 BeautifulSoup 같은 실제 HTML 파서로 확인할 것. 이번에 정규식 방식은 폐기하고 bs4로 재검증해서 최종 3건만 확정.
- **다음 세션 필수 체크리스트 추가**: 새 툴/블로그 페이지에 참고표(Reference Chart)를 넣을 때 반드시 (a) 표에 직접 `style="width:100%; border-collapse:collapse; ..."` 인라인 스타일을 주거나, (b) `.blog-content` div 안에 넣을 것. 발행 직후 아래 스니펫으로 확인:
```python
from bs4 import BeautifulSoup
soup = BeautifulSoup(open('FILE').read(), 'html.parser')
for table in soup.find_all('table'):
    if not table.has_attr('style') and not table.find_parent(class_='blog-content'):
        print('UNSTYLED TABLE FOUND')
```

### 2026-07-27 (9차): 오후 작업 큐 실행 완료 — P1(신규 클러스터+7번째 Guide) + P4(브리스킷) + P2(워드프라블럼)
- 08차에서 픽해둔 오후 작업 큐를 순서대로 실행. 시작 전 각 파일 실제 중복 확인은 08차에서 이미 끝내둔 상태였음(재확인 불필요, 그대로 반영).
- **P1 — "옛날 레시피 해독" 신규 클러스터 + 7번째 Guide 승격**:
  - `tools/can-size-converter.html`: #1~#10 캔 10종 + EU 400g/800g 드롭다운 선택형, 컵/oz/ml 환산. FAQ 3개
  - `blog/vintage-recipe-measurements.html`(604단어): gill/teacup/wineglass/tumbler, butter size of egg/walnut/knob, saltspoon/dessertspoon/pinch 3개 표
  - `blog/vintage-ingredient-names.html`(673단어): caster sugar/self-raising flour/saleratus/corn flour 등. corn flour UK-US 혼동 위험 별도 강조
  - `tools/oven-temp-converter.html` **확장**(신규 아님 — 기존 FAQ 1건이 이미 있어 자기잠식 방지 목적으로 정식 섹션화)
  - `guides/complete-vintage-recipe-guide.html`(527단어) — 7번째 Guide, 참조 6개 페이지 전부 상호링크
- **P4 — 고기 클러스터 빈칸 메우기**:
  - `blog/how-long-to-cook-brisket.html`(843단어) 신규: 무게×오븐온도 표, 195-205°F가 필요한 이유(콜라겐), 스톨 현상, 지방면 방향, 그릴/스모커 전환
  - 미트로프는 **신규 발행 안 함** — `how-long-to-cook-ground-beef.html`에 이미 표가 있어서 확장(freeform vs loaf pan 시간차, 가금류 165°F 차이 추가)으로 처리. 자기잠식 회피 판단이 맞았음(08차에서 미리 확인해둔 덕분에 시간 절약됨)
- **P2 — Word Problems 클러스터 4번째**:
  - `blog/measurement-conversion-word-problems.html`(685단어): 컵↔테이블스푼, 그램↔컵(밀도차), ml↔컵, 파운드↔버터스틱 등 7개 워드프라블럼 + 흔한 실수 4가지
  - Word Problems 클러스터가 4건(블로그3+툴1)으로 완성 — 8번째 Guide 승격 요건 근접. **단 08차에 기록한 수익성 경고 유효**: 기존 클러스터가 순위는 좋아도(6-9위) 클릭은 0이었음. 다음 세션에서 GSC 확인 시 이 클러스터의 실제 트래픽 기여를 반드시 재점검할 것
- 체크리스트 전 항목(nav.js/sitemap/llms.txt/상호링크) 매 단계마다 반영, 읽기시간 145wpm 검산 전부 통과, div/JSON-LD/개수정합/고아페이지 검증 전부 통과.
- **현재 사이트 구조(07-27 최종)**: 툴 22 + 블로그 58 + 가이드 7 = **총 87페이지** (세션 시작 시 81페이지 → +6, 08차 예상치와 정확히 일치).
- **남은 선택 항목(P3)**: 치즈 변환 툴 — handychefdom(회피리스트)이 이미 전용 계산기 보유해 우선순위 낮음으로 08차에 분류됨. 사용자가 요청하면 진행.

### 2026-07-27 (8차): 신규 클러스터 대규모 서칭 — 픽 확정 (작업은 오후 세션에서 실행)
- 사용자 지시: "다양하게 다 뚫어보고 방향성 흐려지는 거 아니면 다 픽해놔. 롱테일 단 점거하는 게 좋다. 오늘 오후에 작업한다." → **이번 세션은 검증+픽만, 실제 발행은 다음(오후) 세션에서 진행할 것.**
- 후보 11건을 head term으로 직접 web_search 검증(07-27 7차 교훈 반영 — guide성 문구가 아니라 "X calculator" 헤드텀 자체를 돌릴 것).

#### ✅ 픽 확정 — 오후 작업 큐 (우선순위 순)

**[P1] 신규 클러스터: "옛날 레시피 해독"(Decoding Old Recipes)** — 이번 서칭에서 가장 확실한 승산
- 왜 되는가: **경쟁자가 계산기 콘텐츠팜이 아님.** 포럼·식자재업체·.edu 익스텐션·향수(nostalgia)사이트뿐. 우리 회피리스트 도메인(omnicalculator/missvickie/handychefdom/calckitchen 등)이 이 영역엔 아직 하나도 안 들어옴.
- 만들 페이지(3~4개 → 7번째 Guide 승격까지):
  1. **캔 사이즈 변환 툴**(`tools/can-size-converter.html` 예정) — #10 can, #303, 15oz 등 → 컵/oz/g. 경쟁: netcookingtalk(포럼), alpharubicon(포럼), levapack·qiequip(식자재업체), unl.edu·extension.missouri.edu(.edu), cupstogramscalculator.com(유일한 실질 경쟁자 1개).
  2. **빈티지 계량 용어 변환**(gill, teacup, wineglass, "butter the size of an egg/walnut", knob, saltspoon 등) — 경쟁: clickamericana·dustyoldthing(향수사이트), eatingtheeras(소형블로그), classicfork.com(전용 변환기 1개), Tasting Table/Yahoo(대형 미디어지만 단일 기사 1건뿐).
  3. **옛날 오븐 용어**(slow/moderate/quick/hot oven → °F/°C) — 경쟁: Wikipedia, clickamericana. **기존 `tools/oven-temp-converter.html` 확장으로 처리해도 됨**(신규 페이지로 뺄지 확장으로 붙일지는 오후에 판단).
  4. (선택) 옛날 레시피 전반 해독 가이드 → Guide 승격용 허브
- 주의: 캔 사이즈는 US 기준 외에 유럽 400g/800g 캔 대응도 넣으면 롱테일 확장됨(우리 사이트에 이미 metric 대응 관행 있음).

**[P2] 기존 워드프라블럼 클러스터 확장: 계량 변환 워드프라블럼**
- 경쟁: TPT(교사자료 마켓, 유료), studocu, scribd, 15worksheets.com, kids-cooking-activities — **전부 교육 사이트**. 기존 워드프라블럼 클러스터가 순위 6~9위를 찍은 것과 완전히 동일한 승리 패턴.
- **단, 수익성 경고(사용자에게 이미 고지함)**: 기존 워드프라블럼 3건이 순위 6~9위인데 3개월간 클릭 0. 순위는 확실히 나오지만 AdSense 기여는 사실상 없음. "롱테일 점거" 목적이면 유효, "수익" 목적이면 후순위. 사용자가 "롱테일 점거가 좋다"고 명시해서 픽에 포함함.
- 만들면 워드프라블럼 클러스터가 4건(unit-price / recipe-scaling / measurement-conversion + kitchen-math-generator 툴) → Guide 승격 요건 근접.

**[P3] 기존 계량 클러스터 확장: 치즈 변환(컵↔파운드, 블럭↔슈레드)**
- 경쟁: handychefdom(**회피리스트 도메인이 이미 전용 치즈 계산기 보유**), challengeanswer.com(계산기), texasrealfood·howmuchisin·eathealthy365(소형블로그), cooksrecipes(Q&A).
- 판정: 위 두 개보다 확실히 불리함(회피리스트 도메인이 이미 선점). 다만 소형 블로그 위주라 완전 포화는 아니고, 우리 계량 클러스터(사이트 최대 클러스터, 툴9+블로그16)에 자연스럽게 붙음. **P1·P2 끝내고 여유 있으면 진행.**

#### ❌ 이번 라운드 기각 (전부 head term 직접 검증함)
| 후보 | 기각 사유 |
|---|---|
| 에어프라이어 변환 | 전용 도메인 3개(airfryercalculator.com, airfryerconversion.com, airfryerconverter.com) + **inchcalculator**(회피리스트). 최악 수준 |
| 밥물 비율 | omnicalculator·gigacalculator·goodcalculators·best-calculators·cookcalculator.net·thecalcs.com — **6개 전부 회피리스트 도메인**. 최악 |
| 건파스타→조리후 중량 | omnicalculator·missvickie·handychefdom·calculator.academy·cookcalcs·ctrlcalculator·axiscalc·instacart 8개+ |
| 파티 인원수별 음식량 | bbqpartycalculator.com(전용 도메인) + summerandcinnamon(계산기+가이드 완비) + calculator.academy·whycalculator·calculate-this |
| 인스턴트팟/압력솥 조리시간 | crunchmilk(회피리스트) + earthtoveg(전용계산기) + 유명 푸드블로그 6개+ |
| 마리네이드 시간 | 전용 계산기 2개(miniwebtool, mycalcbuddy) + USU.edu + Jessica Gavin |
| 와인 등 요리 대체재 | 재료 하나당 이미 블로그 6개+ — 재료별 확장 자체가 불가능 |
| 푸드코스트%/수율(AP·EP) | 경쟁자가 레스토랑 SaaS(meez, MarketMan, Apicbase — 콘텐츠마케팅 예산 큰 B2B) + 조리학교 교재(CIA, pressbooks). **추가로 이건 B2B 식당용이라 우리 사이트(가정 요리) 방향성을 흐림 — 두 이유로 기각** |

#### 📋 미검증 3건 → 검증 완료 (2026-07-27 8차 후반)
| 후보 | 경쟁 현황 | 판정 |
|---|---|---|
| **고기 클러스터 갭(브리스킷/미트로프/갈비)** | 레시피 블로그 위주(theroastedroot, eatsimplefood, essenceofyum, lovetoknow, strandquistfamilyfarm) + **howlongtocook.org(전용 도메인, 우리 how-long-to-cook 시리즈 직접 경쟁자)**. 계산기 콘텐츠팜은 없음 | **채택(P4)** — 신규 영토 진입이 아니라 **이미 우리가 11페이지로 점거 중인 클러스터의 빈칸 메우기**라 리스크 낮음. 단 howlongtocook.org를 회피리스트에 추가할 것 |
| **끈적한 재료 계량(꿀/시럽/당밀)** | Taste of Home, Serious Eats(AOL), Cuisine at Home 등 대형 미디어의 "팁" 콘텐츠가 장악 + 실제 환산 데이터는 **cookingconverter.com(회피리스트)** 보유 | **기각** — 계산기 니치가 아니라 팁 콘텐츠 니치이고, 그 쪽은 대형 미디어가 잡고 있음. 환산 데이터 쪽은 회피리스트 도메인 선점 |
| **냉장/냉동 보관기간** | **USDA/FSIS(정부 최상위 권위)** + GoodRx(대형 헬스 도메인) + statefoodsafety.com + freshstoragetips.com·easytemperature.com(전용 도메인 2개) + thewholefork.com | **기각** — 포화 + 식품안전=YMYL 영역이라 권위도 요구치가 특히 높음. 우리가 못 이김 |

#### 📐 오후 작업 실제 페이지 구성 (확정 — 기존 파일 중복 확인까지 완료)
**현재: 툴 21 + 블로그 54 + 가이드 6 = 81페이지**

**⚠️ 작업 전 중복 확인 결과(2026-07-27 8차에서 grep으로 실제 확인함, 오후에 다시 안 해도 됨)**
- `gill / teacup / wineglass / saltspoon / butter the size of an egg·walnut / knob of butter` → **사이트 전체에 0건. 진짜 갭 확정** ✅
- `can size / #10 can / 15 oz can` → 0건("canned"라는 일반 단어만 12개 파일에 걸림, 실제 캔사이즈 환산 콘텐츠는 없음). **진짜 갭 확정** ✅
- `slow/moderate/hot oven` → **`tools/oven-temp-converter.html` 176행대에 이미 FAQ 1건 존재**("Why do some recipes say 'slow,' 'moderate,' or 'hot' oven?"). → **P1-3은 신규 페이지로 만들지 말 것(자기잠식). 기존 FAQ를 정식 섹션으로 확장하는 방식으로 처리** ⚠️
- `brisket` → 그릴 페이지들에 예시로만 언급, 조리시간 데이터 없음. 단 `cooking-time-calculator.html` 데이터에는 이미 있음(60분/lb). **블로그 갭 확정** ✅
- `meatloaf` → **`how-long-to-cook-ground-beef.html`과 `meat-cooking-temperatures-explained.html`에 이미 언급**(수분 유지 팁, 온도계 삽입 위치). 무게별 조리시간은 없음. **부분 중복 — 미트로프는 결국 간고기라 ground-beef 페이지와 자기잠식 위험 있음. 오후에 (a)ground-beef 페이지 확장 (b)무게별 조리시간 중심의 별도 페이지 중 판단할 것** ⚠️

| 순위 | 파일 | 종류 | 비고 |
|---|---|---|---|
| P1-1 | `tools/can-size-converter.html` | 툴 신규 | #10/#303/#2½/15oz 등 → 컵·oz·g. 유럽 400g/800g 캔 대응 포함 |
| P1-2 | `blog/vintage-recipe-measurements.html` | 블로그 신규 | gill, teacup, wineglass, butter the size of an egg/walnut, knob, saltspoon |
| P1-3 | `tools/oven-temp-converter.html` | **기존 확장(신규 아님)** | 기존 FAQ 1건 → 정식 섹션으로 확장. 페이지 수 증가 없음 |
| P1-4 | `guides/complete-vintage-recipe-guide.html` | 가이드 신규 | 위 3개 묶는 7번째 Guide |
| P4-1 | `blog/how-long-to-cook-brisket.html` | 블로그 신규 | 기존 how-long-to-cook 클러스터 빈칸. 저리스크 |
| P4-2 | 미정(ground-beef 확장 or 신규) | 판단 필요 | 위 중복 경고 참고 |
| P2-1 | `blog/measurement-conversion-word-problems.html` | 블로그 신규 | 워드프라블럼 클러스터 4번째 |
| P3-1 | `tools/cheese-converter.html` | 툴 신규(선택) | handychefdom 선점으로 불리 |
| P4-3 | `blog/how-long-to-cook-ribs.html` | 블로그 신규(선택) | |

**증감 계산(P1-3이 확장으로 바뀌어 이전 기록보다 1개 줄었음)**
- P1만: 툴 22 / 블로그 55 / 가이드 7 = **84페이지** (+3)
- P1+P4(brisket+meatloaf): 툴 22 / 블로그 57 / 가이드 7 = **86페이지** (+5)
- P1+P4+P2: 툴 22 / 블로그 58 / 가이드 7 = **87페이지** (+6)
- 전부(P3·P4-3 포함): 툴 23 / 블로그 59 / 가이드 7 = **89페이지** (+8)

**권장 실행 순서**: P1 3개+확장1 먼저(클러스터+7번째 Guide 한 번에 완성) → P4(brisket 우선, meatloaf는 판단 후) → P2 → 여유 시 P3.

**작업 시 반드시 지킬 것(과거 사고 재발 방지)**
1. 읽기시간은 실제 단어수 ÷145 로 검산해서 `blog-meta`에 반영 (4번 섹션 스크립트 사용). 과거 10개 페이지가 최대 5분까지 어긋난 적 있음.
2. Guide 발행 시 가이드가 링크한 페이지는 **전부** 되돌아오는 링크를 넣을 것("최소 2개" 기준과 별개). 과거 누락으로 47개 파일 일괄 보강한 적 있음.
3. 발행 후 div 밸런스 / JSON-LD 파싱 / sitemap XML / 개수정합(tools·blogs·guides vs nav.js vs sitemap) / 고아페이지 전부 검증.

#### 🔑 이번 서칭에서 확립된 판정 원칙 (다음 세션도 이걸 기준으로 쓸 것)
**"계산기"로 검색되는 주제는 예외 없이 콘텐츠팜이 선점했다. 뚫리는 건 경쟁자가 계산기팜이 아닌 다른 업종(포럼 / .edu 익스텐션 / 향수·역사 사이트 / 교육·워크시트 사이트)인 주제뿐이다.** 워드프라블럼 클러스터(경쟁자=수학 학습지 사이트)가 성공한 것, 캔사이즈·빈티지용어(경쟁자=포럼·향수사이트)가 통과한 것 모두 같은 이유. **신규 후보를 낼 때 "이 쿼리를 지금 누가 차지하고 있는가"의 업종부터 확인할 것** — 경쟁 강도보다 경쟁자 업종이 더 정확한 신호.

### 2026-07-27 (7차): 경쟁 재검증 + Grill 클러스터 내부링크 강화 (신규 발행 없음)
- 사용자가 그릴/팬사이즈 경쟁 판단을 재검증하라고 지시(Bing/Yahoo 포함).
- **중요한 도구 한계 확인**: web_fetch로 bing.com/yahoo 직접 접근 시도했으나 "사전에 검색/fetch로 나온 URL만 fetch 가능" 제약에 막혀 실패 — **이 환경에는 Bing/Yahoo SERP을 별도로 조회할 방법이 없음**. web_search 툴은 단일 엔진(정확히 어떤 백엔드인지 불명)만 사용 가능. 다음 세션도 이 한계를 인지하고 "Bing/Yahoo 확인해봐" 요청이 오면 이 사실부터 알릴 것 — 할 수 있는 척하지 말 것.
- **베이킹 팬 사이즈 변환 재검증 결과 — 07-27(6차) 판단이 부정확했음**: 헤드 키워드로 직접 재검색하니 처음에 놓쳤던 경쟁자가 대거 확인됨 — calckitchen.com·foodiebaker.com(둘 다 실제 작동하는 인터랙티브 계산기), Sally's Baking Addiction(초대형 권위 사이트, 자체 공식 보유), extension.missouri.edu(.edu 권위 도메인)까지 겹침. 이 프로젝트에서 확인한 것 중 가장 심하게 포화된 니치 — 지금 상태로는 첫페이지 진입 불가로 판단. **사용자 지시로 페이지 자체는 유지**(어차피 필요한 툴이므로), 다만 순위 기대는 낮게 잡을 것.
- **그릴 계산기 재검증 결과 — 대체로 유효하나 놓친 경쟁자 있었음**: "grill temperature calculator" 헤드 키워드로 재검색해 gopathtomillions.com·thetoolcollective.com이라는 인터랙티브 계산기 2개를 추가로 발견(처음 검색 때 못 찾음, 검색 누락 인정). 다만 둘 다 스팸성/AI툴양산형 도메인으로 권위도 낮아 보임 — Old Farmer's Almanac/Weber/Barbecue Bible 등 진짜 권위 사이트는 여전히 계산기 없이 정적 차트만 보유. 사용자 판단: "해볼만하다"로 유지.
- **롱테일 축소 시도 결과 — 오히려 역효과 확인**: "chicken breast on gas grill" 등으로 좁혀봤더니 Weber(그릴 제조사 본사)·America's Test Kitchen·Perdue Farms까지 붙어서 head term보다 더 세짐. "grilling mistakes" 계열도 Food Network가 장악. **결론: 이 니치는 좁힐수록 레시피 블로그가 더 촘촘해서 롱테일 전략이 안 통함** — 다음에 유사 상황 만나면 먼저 head term 그대로 web_search 한 번 더 정확히 돌려보고 판단할 것(원래 실수: guide성 문구로만 검색하고 "calculator/tool" 헤드텀 자체는 안 돌려봄).
- **Grill 클러스터 강화 실행**(신규 발행 없이 순수 내부링크): 이미 그릴을 조리법 중 하나로 다루고 있던 기존 단백질 페이지 6개(`how-long-to-cook-bacon/chicken-thighs/pork-chops/salmon/steak/turkey-breast.html`)의 Grilled 섹션 본문 + Related 박스에 `grill-temperature-calculator.html` 링크 추가. 결과: 그릴 계산기 인바운드 링크 5개→11개로 증가.
- **현재 사이트 구조**: 변동 없음(툴 21 + 블로그 54 + 가이드 6 = 81페이지). 이번 세션은 신규 발행 없이 검증+링크 강화만.

### 2026-07-27 (6차): 베이킹 팬 사이즈 변환 계산기 신규 발행
- 사용자가 경쟁 기준을 명시적으로 완화: "우리 기준은 구글 첫페이지에 뜨는 것 정도다. 경쟁 사이트가 만만하거나 우리보다 아래면 치고 들어가도 되고, 경쟁이 세도 우리가 이기는데 굳이 안 할 이유가 없다." — 07-27(5차)에서 보류했던 "베이킹 팬 사이즈 변환"을 이 기준으로 재검토해 진행 승인.
- `tools/pan-size-converter.html`: 12개 팬 타입(원형4/사각2/직사각2/스프링폼1/번트1/로프2) 볼륨 데이터 기반, from/to 드롭다운 2개 → 배율 자동계산 + 재료 증감% 안내 + 베이크타임 방향성(넓고 얕은 팬은 더 빨리, 좁고 깊은 팬은 더 늦게) + 배율 1.8배 이상이면 나눠굽기 권장 경고. FAQ 3개.
- 참조 4개 페이지(`recipe-multiplier.html`, `complete-recipe-scaling-guide.html`, `oven-temp-converter.html`, `complete-baking-conversion-guide.html`) 전부 되돌아오는 링크 추가. nav.js(tools 21)/sitemap(88)/llms.txt 반영, 검증 전부 통과.
- **참고**: 이 페이지는 calckitchen.com(회피리스트 콘텐츠팜) + Sally's Baking Addiction(대형 권위사이트)이 경쟁자로 이미 있는 상태에서 진행한 첫 사례 — 앞으로 이런 완화된 기준으로 판단한 페이지들은 GSC에서 실제 순위가 어떻게 나오는지 특별히 지켜볼 것(콘텐츠팜/대형사이트 상대로 실제 1페이지 진입이 되는지 검증 데이터 축적 필요).
- **현재 사이트 구조(07-27 최종)**: 툴 21 + 블로그 54 + 가이드 6 = **총 81페이지**.

### 2026-07-27 (5차): 신규 Grill 클러스터(툴1+블로그3) 발행 + 6번째 Guide 즉시 승격
- 사용자 지시로 신규 클러스터 재탐색. "베이킹 팬 사이즈 변환"/"채소 조리시간"은 각각 calckitchen.com/missvickie.com(둘 다 기존 회피리스트 콘텐츠팜)이 경쟁자로 있어 보류. **"그릴/BBQ 온도·시간 가이드"**는 web_search 결과 Old Farmer's Almanac/Barbecue Bible/A Couple Cooks 등 개별 미디어만 있고 인터랙티브 계산기 형태의 콘텐츠팜은 전무 확인 — 진행 결정.
- 사전 발견 버그 수정: `tools/cooking-time-calculator.html`의 "Cooking Method"(Oven/Grill/Pan) 드롭다운이 선택해도 결과에 전혀 반영 안 되고 있었음 — 실제 배수 로직(oven 1.0x/grill 0.88x/pan 0.7x) 추가, whole/brisket/shoulder 등 큰 덩어리를 pan으로 선택 시 경고 문구 추가.
- 사용자 지시("하나만 하지 말고 파생시켜서 Guide까지") 반영해 한 세션에 클러스터 형성부터 Guide 승격까지 전부 실행:
  1. `tools/grill-temperature-calculator.html` — 14개 식재료 드롭다운 선택형 인터랙티브 툴(직화/간접 구분, 온도, 손대기테스트 초, 예상시간, 안전온도) + 전체 참고표.
  2. `blog/direct-vs-indirect-heat-grilling.html`(673단어) — 직화 vs 간접열 비교/설명.
  3. `blog/charcoal-vs-gas-grill-temperature.html`(631단어) — 숯불 vs 가스 그릴 비교.
  4. `blog/how-to-check-grill-temperature-without-a-thermometer.html`(702단어) — 손대기 테스트("Mississippi count") 트러블슈팅 가이드.
  5. `guides/complete-grilling-guide.html`(664단어) — 위 4건을 하나로 묶는 6번째 Guide. 참조하는 7개 페이지(신규4 + `meat-temperature-guide.html` + `cooking-time-calculator.html` + 기존 `complete-meat-cooking-temperature-guide.html`) 전부에 되돌아오는 링크 추가(07-18 7차 교훈 준수).
- 체크리스트 전항목: nav.js(tools 20/blogs 54/guides 6)/sitemap(87)/llms.txt 반영. 검증: 8개 파일 div/JSON-LD 통과, JS 신택스 체크 통과, 개수정합 전부 일치, 신규 5개 페이지 인바운드 4-7개(고아페이지 아님).
- **현재 사이트 구조(07-27 최종)**: 툴 20 + 블로그 54 + 가이드 6 = **총 80페이지**.

### 2026-07-27 (4차): Comparisons 클러스터 → 5번째 Guide로 정식 승격
- 사용자가 "계속 신규 진행할거니까 지금 검토해봐"라고 지시 — 07-27(3차)에서 완성된 Comparisons 클러스터(5건)를 07-24(8차) 합의 기준("4~5개 이상이면 Guide 승격 검토")에 따라 검토 후 바로 승격 실행.
- 기존 4개 Guide와 겹치지 않게 설계: 단순 링크 모음이 아니라 "두 단백질을 1:1로 바꿔써도 되는지" 판단하는 **마스터 스왑 표** — 5개 비교글을 다시 읽어 각 페어의 (1)안전온도 동일여부 (2)실제 차이점 (3)스왑 가능여부를 종합. 핵심 룰: 안전온도 자체가 다르면(베이컨 145°F vs 소시지 160°F) 스왑 불가·처음부터 재계산 필요, 같으면(나머지 4쌍) 크기/오븐온도 관행만 조정하면 됨.
- **신규 발행**: `guides/complete-protein-comparison-guide.html`(887단어, 6분). Article+FAQPage(3개) JSON-LD.
- **07-18(7차) 교훈 반영**: 가이드가 참조하는 페이지 전부(8개 — 비교글 5개 + `meat-temperature-guide.html` + `cooking-time-calculator.html` + 기존 `complete-meat-cooking-temperature-guide.html`)에 빠짐없이 되돌아오는 링크 추가(최소 2개 기준이 아니라 전체 상호링크).
- 체크리스트 반영: nav.js GUIDES(5)/sitemap(82)/llms.txt. 9개 파일(신규 1 + 링크 추가 8) 전부 div/JSON-LD 검증 통과, 개수정합(guides 5/tools 19/blogs 51/sitemap 82) 통과, 신규 가이드 인바운드 링크 8개 확인.
- **현재 사이트 구조(07-27 최종)**: 툴 19 + 블로그 51 + 가이드 5 = **총 75페이지**.
- **다음 세션 참고**: Word Problems 클러스터는 아직 3건(변화 없음) — 4~5건으로 늘어나면 같은 방식으로 6번째 Guide 승격 검토.

### 2026-07-27 (3차): 신규 발행 — Turkey Breast vs Whole Chicken (Comparisons 클러스터 5번째, 마감)
- 사용자 지시로 신규 비교 콘텐츠 후보 재탐색. `chicken drumsticks vs thighs`, `bone-in vs boneless chicken`, `pork tenderloin vs pork loin` 3건은 이번 세션 1차에서 이미 대형 푸드미디어 포화로 기각한 상태라 재시도 안 함.
- **`turkey breast vs whole chicken`(조리시간 비교)**: web_search 결과 "터키 vs 치킨" 일반 비교(맛/영양/가격)나 각 단독 로스팅 가이드는 다수 있지만, 조리시간 중심의 직접 비교 콘텐츠는 없음을 확인 — 진행.
- **신규 발행**: `blog/turkey-breast-vs-whole-chicken.html`(983단어, 7분). **핵심 인사이트**: 같은 무게 기준으로 통닭이 칠면조가슴살보다 보통 더 빨리 익음 — 고기 형태(뼈/공동구조) 때문이 아니라 오븐 온도 관행 차이(칠면조가슴살은 통칠면조 로스팅 습관을 그대로 물려받아 325°F 저속, 통닭은 껍질 바삭함 때문에 375-425°F 고속) 때문이라는 반직관적 설명. 자사 기존 칠면조가슴살 데이터(`how-long-to-cook-turkey-breast.html`)와 복수 소스로 교차검증한 통닭 로스팅 시간 범위를 나란히 비교, 인분수/비용 비교(통닭이 lb당 훨씬 저렴 — cost-per-serving 계산기 연결)까지 포함. FAQ 4개.
- 체크리스트 전항목 반영(nav.js/sitemap 81/llms.txt), 내부링크 2곳(`how-long-to-cook-turkey-breast.html`, `turkey-breast-vs-chicken-breast.html` Related 박스 — 링크만 추가한 두 파일은 기존 관행대로 dateModified 갱신 안 함). div/JSON-LD/sitemap/개수정합(blogs 51)/고아페이지 전부 통과.
- **Comparisons 클러스터 5건 완성**: lamb vs pork, salmon vs shrimp, bacon vs sausage, turkey breast vs chicken breast, turkey breast vs whole chicken. 07-24(8차)에서 논의했던 "4~5개 이상이면 Guide 승격 검토" 기준 충족 — 다음 세션에서 5번째 Guide로 정식 승격할지 검토할 시점.
- **현재 사이트 구조(07-27 최종)**: 툴 19 + 블로그 51 + 가이드 4 = **총 74페이지**.

### 2026-07-27 (2차): PDF 저장 시 2페이지로 넘어가는 버그 수정 — meat-temperature-guide.html
- 사용자가 `tools/meat-temperature-guide.html`에서 "Save as PDF" 실행 시 내용은 1페이지 분량인데 2페이지로 출력된다고 스크린샷으로 지적.
- 원인: `@page` 마진을 지정 안 해서 브라우저 기본 여백이 적용된 위에, `#pdf-overlay`의 `padding:2rem` + JS로 주입되는 헤더/결과박스 `margin-bottom:2rem` + 표 셀 패딩(`0.65rem`)이 누적되어 총 높이가 1페이지를 살짝 초과.
- 수정: `@page { margin: 10mm; }` 명시, overlay `padding` 2rem→0.5rem + `font-size:0.9em`, 헤더/결과박스 margin 축소, 표 셀 패딩을 인쇄 시에만 `0.35rem`으로 축소(`!important`로 인라인 스타일 오버라이드), 차트 헤더줄(`chart-header-row` 클래스 신규 부여)/h2 margin도 인쇄 시 축소. **전부 `@media print` 안에서만 적용되어 평상시 화면 표시엔 영향 없음.**
- wkhtmltopdf로 동일 구조를 별도 렌더링 테스트한 결과 1페이지로 확인(이 저장소 환경엔 Chrome이 없어 완전히 동일한 렌더러는 아니지만, 마진/패딩을 충분히 줄여 여유 있게 1페이지에 들어가는 것을 확인).
- **다음 세션 참고**: 이 사이트에서 `printToPDF()` 함수와 동일한 패턴을 쓰는 툴이 5개 더 있음(`cooking-time-calculator.html`, `cost-per-serving.html`, `meal-cost-calculator.html`, `recipe-multiplier.html`, `weekly-meal-prep-cost-calculator.html`) — 이번엔 사용자가 지적한 `meat-temperature-guide.html`만 수정함. 나머지 5개도 같은 여백 누적 문제로 내용에 따라 페이지가 넘어갈 수 있으니, 사용자가 확인 요청하면 동일한 패턴(overlay padding 축소 + `@page` 마진 + 표 셀 패딩 인쇄시 축소)으로 고칠 것.

### 2026-07-27: 일요일 정기 점검 — GSC/GA 전수 분석, 신규 후보 4건 전부 기각 후 보강 2건 실행
- 사용자가 GSC Coverage export + Performance export(지난 3개월) + GA4 CSV(보고서 개요, 06-29~07-26)를 제공. 세 자료 전체를 끝까지 정독(쿼리 1000행 전부 확인).
- **GSC vs GA 수치 괴리 확인(신규 발견)**: GSC Performance는 3개월 누적 클릭 5건뿐인데, GA는 최근 28일만으로도 Organic Search 세션 118건(전체 세션 221건, page_view 555회)을 기록 — 자릿수 자체가 다름. GSC Performance는 구글 "웹" 검색 클릭만 잡고 GA의 Organic Search는 다른 검색엔진(빙 등) 유입까지 포함하는 채널 분류라 발생하는 차이로 판단됨. **그동안 반복돼온 "클릭 0건"이라는 프레이밍은 GSC 기준으로는 맞지만, 실제 방문자 유입(GA 기준)은 이미 상당히 있고 꾸준히 늘고 있다는 게 이번에 명확해짐** — 30일 활성 사용자가 기간 시작 98명→종료 179명으로 거의 2배 증가. 다음 세션에서도 이 두 지표를 같이 볼 것.
- **색인 현황**: Coverage 심각한 문제 리포트 기준 47(발견됨·미색인)+2(크롤링됨·미색인)=49로 07-16부터 지금까지 완전히 동일 — 여전히 정체. 다만 Performance 페이지 리포트에 노출 있는 URL이 67개로 확인돼(13개보다 훨씬 많음), Coverage 수치가 갱신 안 되고 있을 뿐 실제 색인은 더 진행됐을 가능성이 높음 — 이 괴리 역시 다음 세션에서 Coverage export 새로 받으면 확인할 것.
- **워드프라블럼 클러스터 재확인**: "you purchase beef at $6 per pound..." 등 순위 6~9위로 최상위권인데 클릭은 전부 0건 지속. 스니펫으로 답이 바로 노출되거나(zero-click), 숙제 답 확인용 학생 트래픽이라 클릭 유인이 낮을 가능성(07-24 세션에서도 같은 우려 제기됨, 이번에도 재확인됨). **수익화(AdSense) 관점에서 이 클러스터의 추가 확장은 우선순위 낮음으로 판단** — 순위는 좋아도 광고 노출로 이어지는 실질 트래픽 기여가 없음.
- **신규 콘텐츠 후보 검증, 4건 전부 기각**: Comparisons 클러스터(현재 4건: lamb vs pork, salmon vs shrimp, bacon vs sausage, turkey vs chicken breast)를 5건으로 늘려 Guide 승격 요건을 채우려 web_search로 신규 후보 조사:
  - `chicken drumsticks vs thighs 조리시간`: momswhothink.com, premierfamilyfoods.com, theonlinegrill.com, tatnuckmeatandsea.com, grillsimply.com, micheldumas.com, cychicken.com 등 7개+ 이미 심층 비교 — 포화.
  - `bone-in vs boneless chicken 조리시간`: tastingtable.com, oureverydaylife.com, thedailymeal.com, laurafuentes.com, elizabethrider.com 등 5개+ — 포화.
  - `pork tenderloin vs pork loin 조리시간`: MasterClass, Taste of Home(AOL 재게재 포함), Food Network, Smoked BBQ Source, TheMeatStick, BusyCooks 등 대형 푸드미디어 다수 — 포화.
  - "serves 4 means"(순위 8.0), "is capital T tablespoon or teaspoon"(순위 10.0) 등 좋은 순위의 소형 후보도 확인 — grep으로 정확 문구는 없었지만 실제로는 `what-is-a-serving-size.html`("serves 4"라는 표현 이미 사용), `tablespoon-vs-teaspoon.html`("capital T is tablespoon" 이미 서술)에 다른 어순/표현으로 이미 커버되어 있음을 확인 — 진짜 갭 아님, 자동 스캔의 false positive였음(07-16 5차에서 지적된 함정과 동일 패턴).
  - **결론**: 이번 세션은 신규 발행 없음. "단백질 vs 단백질" 조리시간 비교 니치는 대형 푸드미디어(MasterClass, Food Network, TasteOfHome, DailyMeal 등)가 이미 상당수 커버해서, 07-24 세션까지 성공했던 패턴("영양 비교는 있어도 조리시간 비교는 없다")이 이번에 시도한 조합들에서는 더 이상 통하지 않음. Comparisons 클러스터는 4건에서 정체 — 다음 세션에서 새 조합을 낼 때는 "부위(cut) 간 비교"보다 자사 데이터 재조합이 가능한 다른 각도를 우선 탐색할 것.
- **보강 2건 실행**(신규 대신 고트래픽 페이지에 문제해결/비교분석 프레이밍 추가 — 사용자 지시사항 반영):
  1. `blog/how-to-calculate-cost-per-serving.html`(사이트 전체 CTR 1위, 1.47%) — "Common Mistakes That Skew Your Cost Per Serving" 섹션 신규 추가. 단가 vs 패키지가격 혼동, 생중량/조리중량 혼동(raw-to-cooked-weight.html 링크 추가), 소량 재료 누락, 레시피 표기 서빙수 vs 실제 섭취량 혼동(what-is-a-serving-size.html 링크), cost-per-serving vs cost-per-pound 혼동 — 5개 실수 패턴. 1046→1321단어, 읽기시간 6→9분. dateModified/nav.js date/sitemap lastmod/llms.txt 전부 07-27로 갱신.
  2. `tools/meat-temperature-guide.html` — "Chicken vs Pork vs Beef: Why the Safe Numbers Are So Different" 비교 섹션 신규 추가. 닭고기 165°F(살모넬라/캄필로박터, 안전 마진 없음) vs 돼지고기 145°F(과거 160°F였으나 2011년 USDA가 트리키노시스 위험 감소 반영해 하향) vs 소고기 130~160°F 범위(E.coli가 표면에만 있어 시어링으로 처리되므로 내부 굽기 정도는 취향 문제) — 왜 안전온도 기준 자체가 다른지 설명하는 비교분석형 콘텐츠. FAQ 1건("Why can't chicken be medium-rare like steak?") 신규 추가(JSON-LD + 본문 양쪽). sitemap lastmod 07-27 갱신(이 페이지는 nav.js TOOLS 배열에 date 필드가 없어 해당 사항 없음).
  - 두 파일 모두 div 밸런스/JSON-LD 파싱/읽기시간 검산 통과. 개수검증(tools 19/blogs 50/guides 4/sitemap 80, nav.js 전부 일치) 통과. 고아페이지 체크 — 둘 다 기존에 이미 인바운드 다수 확보돼 있어 문제 없음(cost-per-serving 블로그 4곳, meat-temperature-guide 23곳에서 링크됨).
- **현재 사이트 구조(07-27 최종)**: 툴 19 + 블로그 50 + 가이드 4 = **총 73페이지** (신규 발행 없음, 기존 페이지 2건만 보강).

### 2026-07-24 (9차): 음료/전통주/지역비교 30개+ 추가 검증 후 확정 6건 전부 실행
- 사용자가 "음료 쪽은 있냐"고 질문 → 커피/차/칵테일/레몬즙/아몬드밀크/유자차/보이차/막걸리vs소주/고량주vs보드카 등 **9개 각도를 깊게 확인, 전부 포화** — 특히 tea ratio calculator는 회피리스트 멤버(missvickie.com/handychefdom.com/best-calculators.com) 3곳이 동시에 걸릴 정도로 심했음. 음료는 "비율 계산"이 쉬워서 콘텐츠팜이 요리보다 먼저 점유했고, 한식/중식 전통음료는 한류/중화 문화 콘텐츠 붐 때문에 오히려 이미 많이 다뤄진 상태.
- 사용자가 "지역별 요리 변형"(김치 지역별, 돼지고기 국가별 등) 제안 → 김치 지역별(Korea Herald 등 9개+), 생선회 국가별 안전기준(Sushi-Pedia가 이미 US/일본 비교), 소고기 굽기 용어 프랑스vs영미(Wikipedia에 통째로 비교표 있음) 전부 포화 확인. **유일하게 열린 것: 돼지고기 국가별 안전 조리온도 "규정" 비교**(문화 얘기가 아니라 규제 데이터라서 성격이 다름) — CooksInfo.com 하나만 오래된(2018) 일반 비교글이 있고 돼지고기 전용 국가비교는 없었음.
- **핵심 교훈(반복 확인)**: "이 음식/음료가 뭐고 저거랑 뭐가 다른가" 류 문화·정보성 콘텐츠는 20년간 여행블로그/문화블로그/미디어가 이미 다 써놔서 뚫을 틈이 거의 없음. 반면 "계산·변환·조리시간·규제데이터" 같이 사이트 정체성과 직결된 좁은 각도는 여전히 뚫림. 다음 세션 신규 아이디어 검증 시 이 구분을 우선 적용할 것.
- **오늘 확정된 6건 전부 실행 완료**:
  1. `tools/egg-converter.html` 확장 — 오리/메추리/거위/에뮤/타조 알 ↔ 닭알 통합 계산기 신규 섹션(1067→1403단어). JS 100회 반복 실행 검증(Node.js, 에러 0건).
  2. `tools/baking-substitutions.html` 확장 — 코코아파우더(천연↔더치프로세스) 대체 옵션 추가, 베이킹소다/파우더 조정 안내 포함. JS 실행 테스트 통과.
  3. `blog/bacon-vs-sausage.html` 신규(785→785단어, 읽기시간 5분) — 베이컨(145°F, 얇음, 큐어드) vs 소시지(160°F, 두꺼움, 생고기) 조리시간 비교.
  4. `blog/turkey-breast-vs-chicken-breast.html` 신규(829단어) — **원래 계획은 "통닭 vs 통칠면조"였으나 자사에 정확한 데이터가 있는 "칠면조가슴살 vs 닭가슴살"로 조정**(둘 다 165°F 동일 온도, 크기 차이로 오븐 온도/방식이 완전히 다르다는 인사이트 — 400°F 빠른구이 vs 325°F 저속구이).
  5. `blog/how-long-to-cook-tempeh-seitan.html` 신규(765단어) — 템페/세이탄은 이미 조리된 상태라 "안전온도"가 아니라 "질감/풍미" 기준으로 조리시간 판단한다는 점이 핵심 차별화.
  6. `blog/how-long-to-cook-pork-chops.html`에 "국가별 돼지고기 안전온도 기준 비교" 섹션 추가 — 145°F가 Codex Alimentarius 기준으로 미국/캐나다/호주가 동일 수치를 쓰지만, 영국/EU 케이터링 지침은 시간-온도 조합(더 높은 온도+짧은 유지 또는 낮은 온도+긴 유지)으로 유연하게 제시한다는 실제 차이를 정리.
- 체크리스트 전항목 반영: `nav.js`(TOOLS/BLOGS), `sitemap.xml`(80개), `llms.txt`(egg-converter/baking-substitutions 설명 갱신 + 블로그 3건 추가), 내부링크(각 신규 페이지 인바운드 2개 이상 확보 — tempeh-seitan은 cooking-time-calculator.html/meat-temperature-guide.html에서 연결).
- 검증: 개수 정합(tools 19/blogs 50/guides 4/sitemap 80, nav.js 전부 일치)·div 밸런스 12개 파일 전부 통과·JSON-LD 파싱 12개 파일 전부 통과·고아페이지 0건.
- **현재 사이트 구조(07-24 최종)**: 툴 19 + 블로그 50 + 가이드 4 = **총 73페이지**. Comparisons 클러스터 4건(lamb vs pork, salmon vs shrimp, bacon vs sausage, turkey breast vs chicken breast) — 슬슬 5번째 Guide 승격 검토할 시점에 가까워짐. Word Problems 클러스터는 3건(변화 없음).

### 2026-07-24 (8차): 세션 마무리 — 추가 탐색 15개+ 기각, 클러스터 승격 전략 논의
- (7차 이후) 사용자가 계속 다른 방향 요청 → 다수 후보 web_search로 검증했으나 전부 기각:
  - **steak vs pork chops**: 구조상 유효(steak도 낮은 목표온도, doneness range 있음 — lamb vs pork와 동일 패턴)하지만, 같은 세션에 3번째로 똑같은 "온도차 때문에 시간차" 인사이트를 반복하는 건 콘텐츠 다양성보다 양산처럼 보일 위험 있어 **이번 세션엔 보류**. 다음 세션에서 만들 경우 다른 인사이트 프레이밍 고려할 것(예: 단순 온도차가 아니라 다른 각도).
  - **ground beef vs ground pork 조리시간**: missvickie.com(회피리스트) 등 기존 다수 존재, 기각.
  - **커피 원두:물 비율 계산기**: gigacalculator, goodcalculators, coffeebros, honestcoffeeguide, coffeeratiocalculator.com, coffeeratiocalculatorguru.com 등 전용 계산기 클러스터 7개+ 확인 — 빵 하이드레이션과 유사하게 매우 심하게 포화된 별도 니치. 요리보다 음료 계산기 쪽이 오히려 더 포화 상태.
  - **라면 맛있게 먹는 법(브랜드별 레시피, 사용자 제안)**: "글로벌엔 별로 없을 것"이라는 사용자 가정과 달리 실제로는 Business Insider, AOL(2건), Epicurious, 개인 푸드블로그 다수가 이미 다룸(신라면 등 브랜드별로도 이미 존재: ET Food Voyage, ChefsLabo, FutureDish 등). **더 근본적으로 레시피 콘텐츠 자체가 사이트 정체성(계산기/변환기/비교)과 안 맞는다고 판단** — 사용자도 "라면 자체가 계산할 게 없다"며 동의, 이 방향 완전히 접음.
- **클러스터 전략(사용자 제안, 합의)**: 오늘 만든 두 미니 클러스터를 향후 정식 5번째/6번째 Guide로 승격 검토:
  - **Word Problems 클러스터**: `unit-price-word-problems.html`, `recipe-scaling-word-problems.html`, `kitchen-math-generator.html` (블로그2+툴1)
  - **Comparisons 클러스터**: `lamb-chops-vs-pork-chops.html`, `salmon-vs-shrimp.html` (블로그2)
  - 둘 다 아직 콘텐츠가 2~3개뿐이라 지금 허브(Guide) 페이지 만들기엔 이름 — **각 클러스터가 4~5개 이상으로 늘어나면 기존 4개 Guide와 같은 패턴으로 정식 승격 검토할 것.** 다음 세션에서 이 두 클러스터에 콘텐츠를 더 추가할 기회가 있으면 우선적으로 고려.
- **이번 세션 최종 결산(07-24 전체, 1~8차 누적)**: 신규 페이지 5개(블로그4+툴1) 발행, 기존 페이지 보강 다수, 총 45개 이상의 신규 아이디어를 web_search로 검증(성공 5건, 기각 40건+) — 성공률은 낮지만 니치 자체가 원래 포화 상태였다는 게 반복 확인됨. 사이트 최종 규모: **툴 19 + 블로그 47 + 가이드 4 = 70페이지.**

### 2026-07-24 (7차): 사용자 제안 "해산물 아니면 라면" — Salmon vs Shrimp 조리시간 비교 신규 발행, 라면은 기각
- 사용자가 직접 두 후보 제안. 검증 결과:
  - **라면 계산기(시즈닝 비율/물양)**: usecalcpro.com, handychefdom.com — 둘 다 이미 9번 섹션 회피 리스트에 있는 콘텐츠팜이 이미 선점(ramen-noodle-calculator, ramen-calorie-calculator 형태로 존재). 기각.
  - **salmon vs shrimp 조리시간**: lamb vs pork와 동일한 패턴 확인 — 기존 결과는 전부 영양/단백질 비교(foodstruct, soupersage, berrypatchfarms 등)뿐, 조리시간 비교 콘텐츠는 없음. 진행.
- **신규 발행**: `blog/salmon-vs-shrimp.html`(692단어) — 자사 기존 데이터(salmon/shrimp 페이지) 재조합. **핵심 인사이트**: 둘 다 FDA 목표온도가 145°F로 동일(램/포크와 달리 온도차 없음) — 순전히 크기(연어 1인치 필렛 vs 새우 ½인치) 차이로 연어가 새우보다 조리시간이 약 2배 걸림. 같이 조리할 때 타이밍 맞추는 법, 오차 허용범위 차이(새우가 실수하기 더 쉬움) 등 FAQ 4개.
- 체크리스트: nav.js/sitemap(77)/llms.txt 반영, `how-long-to-cook-salmon.html`/`how-long-to-cook-shrimp.html` 양쪽 Related 박스에 상호링크 추가. 개수검증(blogs 47)·div·JSON-LD·고아페이지 전부 통과.
- **비교 콘텐츠 패턴 확정**: 이걸로 lamb vs pork, salmon vs shrimp 2건 연속 성공 — "영양/맛 비교는 이미 있지만 조리시간 비교는 없다"는 게 재현 가능한 패턴으로 보임(온도차 유무와 무관하게 통함). **자사에 이미 데이터 있는 단백질 조합을 신규 조사 없이 재조합하는 방식**이라 리스크와 비용이 매우 낮음. 다음 세션 후보: chicken thighs vs chicken breast(재검토), ground beef vs ground turkey(재검토), turkey breast vs whole chicken, bacon vs ground beef(온도 차이 큼) 등.
- **현재 사이트 구조(07-24 최종)**: 툴 19 + 블로그 47 + 가이드 4 = **총 70페이지**.

### 2026-07-24 (6차): 사용자가 "비교 콘텐츠는 안 해본 것 같다" — Lamb Chops vs Pork Chops 조리시간 비교 신규 발행
- 사용자가 "롱테일 키워드 중 비교하는 콘텐츠는 안 해본 것 같다"고 지적, 실제로 이 세션 전까지 "X vs Y" 형태의 단백질간 비교 콘텐츠는 시도한 적 없었음(herb-converter/oven-temp 같은 개념 비교는 있었으나 단백질 조리시간 비교는 없음). 확인 결과 정확함.
- 후보 검증: `chicken breast vs chicken thighs 조리시간`(ThermoWorks, TheCookingBooks 등 이미 다수 존재 — 애매), `ground beef vs ground turkey 조리시간`(ShunGrill, THEKITCHENTODAY 등 SEO 콘텐츠팜 다수 — 포화), **`lamb chops vs pork chops 조리시간`**(기존 결과는 전부 맛/영양 비교뿐, "조리시간" 중심 비교 콘텐츠는 없음 — 진행 결정).
- **신규 발행**: `blog/lamb-chops-vs-pork-chops.html`(896단어) — 기존에 이미 발행된 `how-long-to-cook-lamb-chops.html`과 `how-long-to-cook-pork-chops.html`의 실제 데이터를 재조합해 만든 비교 콘텐츠(신규 사실 조사 없이 자사 기존 데이터 기반 — 정확성 리스크 낮음). 팬시어/그릴/에어프라이어 1인치 기준 나란히 비교(램은 목표온도가 10°F 낮아서 20-25% 더 빨리 익음), 대체 가능 여부, FAQ 4개.
- **정확성 주의사항**: 오븐 시간은 두 원본 페이지의 방법론이 달라서(램은 "시어 후 오븐" 전제, 포크는 "생고기부터 오븐" 전제) 직접 비교표에 넣지 않고 텍스트로 caveat 처리 — 다른 데이터를 억지로 나란히 놓지 않고 방법론 불일치를 인지하고 처리한 사례.
- 체크리스트: `nav.js`, `sitemap.xml`(76), `llms.txt` 반영. 내부링크는 `how-long-to-cook-lamb-chops.html`과 `how-long-to-cook-pork-chops.html` 양쪽 Related 박스에 추가(두 페이지가 원래도 서로 링크하고 있었음).
- 개수검증(blogs 46)·div·JSON-LD·고아페이지 전부 통과.
- **현재 사이트 구조(07-24 최종)**: 툴 19 + 블로그 46 + 가이드 4 = **총 69페이지**.
- **다음 세션 참고 — 비교 콘텐츠 확장 여지**: chicken breast vs thighs, ground beef vs turkey는 이번엔 보류했지만 완전히 막힌 건 아님(콘텐츠팜 클러스터 수준까지는 아니고 개별 블로그들이라 롱테일 각도를 더 좁히면 진행 가능성 있음) — 다음에 재검토 여지 있음. 자사에 이미 데이터 있는 단백질 조합(예: salmon vs shrimp, steak vs ground beef)도 같은 방식(신규 조사 없이 기존 데이터 재조합)으로 저비용 확장 가능.

### 2026-07-24 (5차): 사용자가 "툴도 그렇게 좀 해보라" — Word Problems 결을 인터랙티브 툴로 확장, 신규 툴 1건 발행
- 사용자가 07-24(4차)의 롱테일 전략을 재확인("포화된 카테고리 안에서 안 뚫린 좁은 각도 찾기"가 맞는 방향)하며, 이번엔 블로그뿐 아니라 툴에도 같은 전략 적용을 요청.
- `recipe math word problem generator` 검색 → 일반 수학 문제 생성기(miniwebtool, Vondy, Knowt AI 등)는 이미 다수 존재하지만 **요리/장보기 특화 인터랙티브 생성기는 전무** — 문제 자체(kitchen math)는 TPT/Scribd 등에 워크시트로 많지만 전부 정적 PDF이고, 랜덤 생성 툴은 없었음. 좁은 각도 확인 후 진행.
- **신규 발행**: `tools/kitchen-math-generator.html`(701단어) — 클릭할 때마다 랜덤 문제 생성하는 인터랙티브 툴. 3가지 문제 유형(유닛프라이스 비교/서빙당 비용/레시피 배수조정)을 JS로 매번 새로 생성, "정답 보기" 토글로 단계별 풀이 확인. 무제한·가입불필요. 07-24(2~4차) 발행한 워드프라블럼 블로그 3건과 상호링크로 하나의 클러스터 형성.
- **검증**: JS 문제생성 로직을 Node.js로 1500회(3개 유형×500회) 반복 실행해 런타임 에러 0건 확인 — 신규 시도(인터랙티브 생성기는 이번이 처음이라 로직 검증을 별도로 추가함). div/JSON-LD/개수검증(tools 19, sitemap 75)/고아페이지 전부 통과.
- 체크리스트: `nav.js` TOOLS 배열, `tools/index.html` TOOL_ICONS(🎲), `index.html` 카드+stat-num(18→19), `llms.txt`, `sitemap.xml` 전부 반영. 내부링크는 두 워드프라블럼 블로그의 Related 박스에 추가해서 인바운드 확보.
- **현재 사이트 구조(07-24 최종)**: 툴 19 + 블로그 45 + 가이드 4 = **총 68페이지**. Word Problems 클러스터가 블로그 2개 + 인터랙티브 툴 1개로 완성됨.
- **다음 세션 참고**: 이 인터랙티브 생성기는 사이트에서 처음 시도하는 "매번 다른 콘텐츠를 보여주는" 형태의 툴이라, Google이 이런 동적 생성 콘텐츠를 어떻게 색인하는지(정적 텍스트가 없어 색인에 불리할 수 있음) 다음 GSC에서 확인 필요. 같은 문제 유형이 계속 새로 나오는 페이지라 표준적인 "콘텐츠 텍스트 기반 색인"과는 다르게 동작할 수 있음.

### 2026-07-24 (4차): "카테고리 확장이 필요하다" — Word Problems 미니 카테고리로 발전, 신규 블로그 2건 추가
- 사용자가 "100페이지까진 아니어도 카테고리/콘텐츠 다양화가 필요하다"고 재차 요청. "printable/reference chart" 계열(kitchen conversion chart printable, cooking abbreviations glossary) web_search 확인 → WebstaurantStore, LandOLakes, YourDictionary, KitchenCalculator.app 등 대형 브랜드까지 이미 장악 → 기각.
- 대신 07-24(2~3차)에서 검증한 "요리사이트가 아니라 교육/워크시트 사이트가 경쟁자인 쿼리" 발견을 하나의 미니 카테고리로 formalize. `doubling a recipe fraction word problem` 재검증(TPT, Study.com, Scribd, Lesson Planet, Course Hero만 나옴 — 이번에도 요리 콘텐츠 경쟁자 0) → 진행.
- **신규 발행 2건**:
  1. `blog/unit-price-word-problems.html`(07-24 3차, 974단어) — 이미 발행됨(직전 항목 참고)
  2. `blog/recipe-scaling-word-problems.html`(신규, 763단어) — 레시피 배수조정 워드프라블럼 8개(분수·대분수 곱셈: ¾컵 두배, 2⅓컵×1.5배, ⅔컵 절반, 서빙수 비율로 스케일링팩터 구하기, 어색한 분수를 작은 단위로 변환하는 예시 등). 흔한 실수 4개, FAQ 4개. `recipe-multiplier.html`/`how-to-scale-a-recipe.html`와 상호링크.
  - 기존 `how-to-scale-a-recipe.html`의 "Worked Example"(레시피 1개 전체 스케일링)과는 형식이 다름(신규 페이지는 개별 분수 연산 위주 짧은 문제 8개) — 중복 아님, 확인 완료.
- 체크리스트: `nav.js` BLOGS 배열, `sitemap.xml`(74개), `llms.txt` 전부 반영. 내부링크는 `tools/recipe-multiplier.html`과 `blog/how-to-scale-a-recipe.html` Related 박스에 추가(이 과정에서 recipe-multiplier.html str_replace 실수로 `</div>` 하나 누락됐다가 즉시 발견해 복구 — div 밸런스 검증이 실제로 잡아낸 사례, 검증 절차의 유효성 재확인).
- 개수검증(blogs 45, sitemap 74, nav.js 일치)·div·JSON-LD·고아페이지 전부 통과.
- **현재 사이트 구조(07-24 기준)**: 툴 18 + 블로그 45 + 가이드 4 = 총 67페이지. "Word Problems" 계열이 이번 세션에 2건 추가되며 사실상 새로운 콘텐츠 결(사고방식)로 자리잡음 — 다음 세션에서 이 결을 3번째(예: 온도 변환 워드프라블럼, 계량 단위 환산 워드프라블럼)로 이어갈지, 아니면 완전히 다른 신규 카테고리를 또 찾을지 판단 필요.

### 2026-07-24 (3차): "거의 2달인데 신규가 너무 없다" — 신규 블로그 1건 발행
- 사용자가 확장 부족을 강하게 지적. 신규 후보 재탐색: 설탕 대체재 변환(handychefdom.com 등 8개+ 경쟁, 회피 리스트에 이미 있던 클러스터 재확인 → 기각), 파운드당 컵-파스타(Daily Meal/Yahoo Lifestyle 등 미디어가 이미 장악 → 기각), 유닛프라이스 워드프라블럼(교육/소비자정보 사이트가 경쟁자 — 요리 콘텐츠팜과 다른 경쟁 구도 확인 → 진행).
- **신규 발행**: `blog/unit-price-word-problems.html`(974단어) — 07-24(2차)에서 검증한 "요리사이트가 아니라 수학/교육 사이트가 경쟁자인 쿼리" 패턴을 cost-per-serving 하나에 국한하지 않고 독립 페이지로 확장. 유닛프라이스 워드프라블럼 7개(시리얼/오렌지주스/쌀/땅콩버터/올리브오일/커피/계란) — "큰 포장이 항상 싼 건 아니다"(시리얼 예시로 실제 반례 제시)를 포함한 흔한 실수 섹션, FAQ 4개.
- 체크리스트: `nav.js` BLOGS 배열, `sitemap.xml`, `llms.txt` 반영. 내부링크는 `tools/cost-per-serving.html`과 `blog/grocery-budget-tips.html`의 Related 박스에 추가해서 인바운드 2개 확보. 개수검증(blogs 43→44, sitemap 73)·div·JSON-LD·고아페이지 전부 통과.
- **판단 기준 갱신**: 지금까지 "요리 계산기 콘텐츠팜"(9번 섹션 회피 리스트)과 겹치는지만 확인해왔는데, 이번에 "경쟁자가 다른 카테고리(교육/소비자정보/미디어)"인 경우도 진행 여부를 별도로 판단해야 한다는 걸 배움 — 콘텐츠팜만 피하면 끝이 아니라, 그 쿼리를 실제로 누가 차지하고 있는지 매번 확인 필요.

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
- [ ] 🚨 **표를 넣었다면 `<table class="ref-table">`로 쓰고, `<head>`의 `<style>`에 `.ref-table` 규칙이
      들어있는지 확인** — 전역 CSS에 `table` 기본 스타일이 없어서 bare `<table>`은 테두리·헤더배경 없이
      맨텍스트로 렌더링됨. 2026-08-14에 이 누락이 사이트 전반 154개 발견돼 일괄 수정한 이력 있음.
      (가로스크롤 래퍼는 nav.js가 전역 자동 처리하므로 따로 안 해도 됨)
- [ ] `index.html`(홈) 툴 카드 섹션에 카드 추가 (툴인 경우만) + 개수 숫자(`stat-num`) 갱신
- [ ] `tools/index.html`의 `TOOL_ICONS` 객체에 신규 툴 아이콘 추가 (툴인 경우만)
- [ ] 🚨 **`node build-static.js` 실행** (2026-08-02 14차부터 필수)
  - 헤더/모바일메뉴/푸터 정적 삽입 + 목록 페이지(`blog/` `tools/` `guides/` `index.html`) 카드 갱신
  - **안 돌리면 새 페이지에 정적 헤더/푸터가 없어서 애드센스 재거절 위험**. 브라우저에선 nav.js 폴백으로
    멀쩡해 보이므로 육안 확인만으로는 절대 못 잡음 — 반드시 실행하고 아래 검증까지 돌릴 것
  - 검증: 전 페이지 `site-header`/`mobileNav`/`site-footer` 각 1개 + JS 없이 본문 600단어 이상
    (구체 명령은 3번 섹션의 `2026-08-02 (14차)` 항목 참고)
- [ ] 🚨 **신규 툴이라면 "어느 클러스터에 속하는가"를 먼저 정할 것.** 속할 클러스터가 없으면
      지원 블로그 2개 + 가이드 허브까지 같은 세션 계획에 포함시킬 것 — 이 사이트에서 노출이
      붙는 단위는 개별 페이지가 아니라 클러스터다. 툴 단독 발행 = 고아 페이지 생성
      (2026-08-14에 툴 3개를 고아로 발행했다가 사용자 지적으로 블로그3+허브1을 추가한 이력)
- [ ] **내부 링크 최소 2곳 확보**: 관련된 기존 블로그/툴 본문에 "Related Guides"(블로그) 또는 "Related Tools & Guides"(툴) 형태로 역방향 링크 추가
- [ ] **(Guides 신규 발행 시 추가 필수)** 가이드 본문에서 링크로 언급한 페이지는 "최소 2곳" 기준과 별개로 **전부 다** 가이드로 되돌아오는 링크를 넣을 것 — 07-18(7차)에서 이걸 빠뜨렸다가 사용자 지적으로 47개 파일 일괄 보강한 적 있음(3번 섹션 참고). 필러페이지는 클러스터 전체 상호링크가 핵심.
- [ ] **분량 800~1200단어** (억지로 채우지 않기, FAQ 3개+환산표+실질정보로 자연스럽게 도달)
- [ ] **FAQ 섹션은 `blog-content` div 안에, 한 번만** — 복사-붙여넣기로 중복되거나 CTA 박스 안에 잘못 중첩되지 않도록 작성 후 반드시 확인
- [ ] Search Console에 sitemap 재제출 (사용자가 직접 수행)
- [ ] 🆕 **`node notify-indexnow.js <신규/보강 URL...>` 실행** (2026-08-03 15차부터, Bing/Yahoo 즉시 색인 요청)
  - **이 개발환경(egress 방화벽)은 api.indexnow.org를 막고 있어 Claude가 실행해도 항상 실패한다**
    (`x-deny-reason: host_not_allowed`). 스크립트가 실패해도 코드 문제가 아니니 당황하지 말 것.
  - **사용자가 자신의 PC/서버에서 직접 실행해야 실제로 제출됨.** 방법 2가지:
    1. `git pull` 후 로컬에서 `node notify-indexnow.js <URL1> <URL2> ...`
    2. 또는 curl로 직접:
       ```bash
       curl -X POST https://api.indexnow.org/indexnow -H "Content-Type: application/json" -d '{
         "host": "cookingcalcs.com",
         "key": "2418ccf79ce498437d212ccbeec13acfa57b7f0de6de7d324b937badb91b3333",
         "keyLocation": "https://cookingcalcs.com/2418ccf79ce498437d212ccbeec13acfa57b7f0de6de7d324b937badb91b3333.txt",
         "urlList": ["https://cookingcalcs.com/blog/새페이지.html"]
       }'
       ```
  - 키 파일(`2418ccf79ce498437d212ccbeec13acfa57b7f0de6de7d324b937badb91b3333.txt`)은 repo 루트에 이미 커밋됨,
    배포되면 `https://cookingcalcs.com/그키.txt`로 접근 가능해야 정상(200 응답 + 파일 내용이 키 문자열과 일치).
  - **"제출했다"고 보고하지 말 것** — 이 환경에서 성공한 적이 한 번도 없다. 실행 결과(HTTP 상태코드)를 그대로 보고할 것.

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
| 07-27 | 47+2=49 (07-16부터 완전히 동일, 변화 없음) | Coverage 차트 미갱신 지속 | **Performance 페이지 리포트 기준 노출 URL이 67개로 확인**(13개는 물론 07-24 추정치 18개보다도 훨씬 많음) — Coverage 수치가 그냥 안 갱신되고 있을 뿐 실제 색인은 상당히 진행됐을 가능성 높음. 3개월 누적 클릭 5건(07-20/21 첫 클릭 2건 이후 3건 추가 발생: raw-to-cooked-weight, cups-to-tablespoons, how-to-calculate-cost-per-serving 각 1건). **GA 기준으로는 28일간 Organic Search만 118세션** — GSC 클릭수와 자릿수 차이가 커서, "클릭 0/5건"에만 의존한 판단은 이제 지양하고 GA도 함께 볼 것. |

| 08-10 | 23 (발견됨·미색인 17 + 리디렉션 4 + 크롤링됨·미색인 1 + 대체표준태그 1) | **86** | **색인 정체 완전히 해소됨** — 07-01 13 → 07-11 70 → 07-25 86. 14차(08-02) 정적 렌더링 수술의 효과로 판단. 단 **sitemap 104개 중 33개는 3개월간 노출 0**이고, 그 33개가 07-24/07-27 발행분 전부 + Guides 6개 + 800단어 미만 페이지 17개 전부와 겹침(3번 섹션 17차 참고). 3개월 클릭 5건·CTR 0.06%·평균순위 43.45. 07-25 노출 -96%는 구글 전역 미확인 변동(07-23~24)과 시점 일치, 현재 수준은 6월 baseline보다 높음. |

| 08-17 | **발견됨·미색인 17 + 크롤링됨·미색인 1** | (제공 자료 기준) | 🚨 **미색인 17개는 최종 크롤링이 1970-01-01 — 한 번도 크롤링된 적 없음.** 콘텐츠 품질이 아니라 크롤링 예산 문제이고 코드로 고칠 게 없음. 18차에 보강한 17개 중 9개가 여전히 미색인이고 무관한 8개가 새로 합류 → **"단어수 부족이 원인"이라는 18차 진단은 부분적으로만 맞았음.** 구글 3개월 노출 9,285·클릭 5·CTR 0.05%·평균 44.7위. 반면 **Bing 노출 835·클릭 15·CTR 1.80%·평균 약 5위** — Bing이 실질 성과 채널. 상세는 3번 섹션 20차. |

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
- **회피 대상 추가(2026-07-24)**: 빵 하이드레이션(베이커스 퍼센트) 전용 계산기 클러스터 — breadhydrationcalculator.com, flourwise.com, bytesbreadbbq.com, thecalcs.com, breadhydration.com (6개+, 오늘 확인한 것 중 가장 심하게 포화). 커피 원두:물 비율 전용 계산기 클러스터 — gigacalculator.com, goodcalculators.com, coffeebros.com, honestcoffeeguide.com, coffeeratiocalculator.com, coffeeratiocalculatorguru.com (7개+). 라면 시즈닝/물양 계산기 — usecalcpro.com, handychefdom.com(이미 회피리스트에 있던 클러스터가 라면까지 확장되어 있음, ramen-noodle-calculator/ramen-calorie-calculator 형태로 존재). 캔디 온도 단계 계산기 — usecalcpro.com(중복 확인).
- **회피 대상 추가(2026-07-27, 8차 서칭)**: 이번에 head term 직접 검증으로 새로 확인한 포화 클러스터 —
  - **에어프라이어 변환**: airfryercalculator.com, airfryerconversion.com, airfryerconverter.com(전용 도메인 3개) + inchcalculator(기존 리스트)
  - **밥물 비율**: 기존 회피리스트 도메인 6개(omnicalculator, gigacalculator, goodcalculators, best-calculators, cookcalculator.net, thecalcs.com)가 전부 보유 — 확인된 것 중 가장 심함
  - **건파스타→조리후 중량**: axiscalc.com, ctrlcalculator.com, cookcalcs.com, calculator.academy, instacart(company.instacart.com) 신규 + missvickie·handychefdom·omnicalculator(기존)
  - **파티/BBQ 인원수별 음식량**: bbqpartycalculator.com, summerandcinnamon.com, whycalculator.com, calculate-this.com, calculator.academy
  - **마리네이드 시간**: miniwebtool.com, mycalcbuddy.com
  - **인스턴트팟/압력솥 시간**: earthtoveg.com + crunchmilk(기존)
  - **치즈 변환**: handychefdom(기존 리스트, 전용 치즈계산기 보유), challengeanswer.com
  - **푸드코스트%/수율(B2B)**: getmeez.com, marketman.com, apicbase.com, foodcosttools.com — **단 이건 경쟁 외에 "가정 요리 사이트 정체성을 벗어남"이라는 이유로도 기각한 건이니, 나중에 누가 다시 제안해도 방향성 문제부터 지적할 것**
  - **끈적한 재료 계량(꿀/시럽/당밀)**: 환산 데이터는 cookingconverter.com(기존 리스트) 선점, "측정 팁" 쪽은 Taste of Home·Serious Eats·Cuisine at Home 등 대형 미디어 장악 → 기각
  - **냉장/냉동 보관기간**: freshstoragetips.com, easytemperature.com(전용 도메인 2개) + thewholefork.com, statefoodsafety.com + **USDA/FSIS·GoodRx**. 포화 + 식품안전 YMYL이라 권위도 요구치 높음 → 기각
  - **조리시간 전용 도메인 추가 발견**: howlongtocook.org — 우리 `how-long-to-cook-*` 시리즈의 직접 경쟁자. 이 시리즈 확장할 때마다 확인할 것
  - **로스트비프(roast beef) 조리시간**: certifiedangusbeef.com(부위별 타임테이블 보유), recipetips.com(중량별 차트 보유) — '레퍼런스 차트' 각도가 이미 선점됨. how-long-to-cook 시리즈 확장 시 이 항목은 건너뛸 것
  - **튀김 기름 온도 차트**: missvickie.com·superglobalcalculator.com(둘 다 회피리스트) + airfryerpoint.com(전용 도메인)이 선점
  - **브라인(brine) 계산기**: best-calculators.com·gigacalculator.com·innovicat.com(전부 기존 회피리스트) + simplifycalc.com·usecalcpro.com·utils.com·pitmaster.tools·destination-bbq.com 전용 계산기 8개+ 확인 — 이 프로젝트에서 확인된 것 중 가장 심하게 포화됨
  - **quickcooktime.com**: 조리시간 전용 계산기 도메인(howlongtocook.org와 동류). how-long-to-cook 시리즈 확장할 때마다 확인할 것
- **회피 대상 추가(2026-08-03, 15차)**: **meatcookingtimecalculator.com**(고기 조리시간 전용 도메인 — 우리 `how-long-to-cook-*` 클러스터의 직접 경쟁자, howlongtocook.org·quickcooktime.com과 동류. 이 클러스터 확장할 때마다 확인할 것), procalculator.co.uk·calculatorsonline.co.uk(영국 조리시간 계산기), calculatorsoup.app·egg.foodnutrify.com(계란 무게/부피 변환 전용), calcs.tools·cookingcalculators.us(요리 계산기 콘텐츠팜, 브랜드 쿼리 검색 시 우리보다 상위 노출됨).
  - 이번에 기각한 2건: **가몬/햄 조리시간**(전용 계산기 6개+), **계란 무게·부피 변환 툴**(회피리스트 도메인 4개 포함 7개+). 다시 제안하지 말 것.
- 🚨 **정정(2026-08-14 후반): 에어프라이어 "재기각 확정"은 철회됨.** `변환 계산기` 축은 포화가
  맞지만 `음식별 실측 시간표` 축으로 진입해 `tools/air-fryer-cooking-times.html`을 발행함.
  **"포화"라는 판정을 내리기 전에 반드시 다른 축을 먼저 확인할 것** — 이 니치에서 포화는 보통
  특정 축의 포화이지 주제 전체의 봉쇄가 아니다. 아래 도메인 목록은 변환기 축 참고용으로만 볼 것.
- **회피 대상 참고(2026-08-14, 19차 — 에어프라이어 *변환 계산기 축* 한정)**: 07-27에 기각했던 에어프라이어를
  "경쟁 세도 필수면 뚫어라"는 지시로 재조사했으나 **3방향 전부 포화 확인 → 재기각 확정.**
  정방향 inchcalculator·airfryercalculator.com·airfryerconversion.com·airfryerconverter.com·
  oventoairfryercalculator.com·fryconvert.com·airfryingfoodie·loveandotherspices /
  롱테일(baked goods) airfryerbaking.com·airfriers.org·airfrycentral.com·recipescal.com·evvytools.com /
  역방향 fryconvert.com·oventoairfryerconverter.com·**agentcalc.com(기존 회피리스트)**·airfryfoods.com·
  realfoodwithsarah. **단 이는 변환 계산기 축에 한함(위 정정 참고).**
  같은 세션에서 **통과시킨** 2건은 반대 사례로 기록해둘 것: 압력솥(경쟁자가 푸드블로그뿐, 계산기팜 0)과
  고도 조리(경쟁자가 gov/edu/블로그뿐, 계산기팜 0) — "업종을 먼저 보라"는 기준이 실제로 작동한 사례.
- **신규 후보 판정 시 1순위 체크(2026-07-27 확립)**: 경쟁 "강도"보다 경쟁자 "업종"을 먼저 볼 것. 계산기 콘텐츠팜이 차지한 쿼리는 뚫기 어렵고, 포럼/.edu/향수·역사사이트/교육워크시트 사이트가 차지한 쿼리는 우리가 인터랙티브 툴+구조화 콘텐츠로 이길 수 있음(워드프라블럼·캔사이즈·빈티지용어가 이 케이스).
- **판단 기준 추가 완화(2026-07-27)**: 사용자가 명시적으로 지시 — "우리 기준은 구글 첫페이지에 뜨는 것 정도다. 경쟁 사이트가 만만하거나 우리보다 아래면 치고 들어가도 되고, 경쟁이 세도 우리가 이기는데 굳이 안 할 이유가 없다." 즉 위 회피 리스트(콘텐츠팜 클러스터) 도메인이 경쟁자로 있어도 자동 기각하지 말고, 우리 콘텐츠 품질(인터랙티브 툴, 데이터 기반 비교표, FAQPage 등)로 실제 1페이지 진입이 가능하다고 판단되면 진행할 것. 07-27(6차) 베이킹 팬 사이즈 변환이 이 기준으로 진행한 첫 사례(calckitchen.com 등 경쟁 있었음). **다만 이 기준으로 발행한 페이지는 다음 세션에서 GSC 순위를 특별히 확인해서 실제로 이 판단이 맞았는지 검증할 것** — 근거 없이 계속 완화만 하지 말고 데이터로 확인.
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

- **애드센스**: 코드 삽입 완료, 2026-07-24부터 심사 신청 중. **재심사 요청("문제를 수정했음을 확인합니다"
  체크 + 검토 요청 제출)은 아직 아무도 안 넣어놨다 — 사용자가 지금 넣으라고 한 적 없음.** 08-02(14차)에
  정적 렌더링 대수술로 "가치 없는 콘텐츠" 거절 사유는 대응 완료했지만, **재심사 요청 자체는 다음에
  이 사이트를 맡는 세션이 데이터 보고 "이제 넣어도 되겠다" 판단이 서면 그때 사용자에게 먼저 제안하고
  진행할 것.** 판단 없이 미리 넣어두지 말 것 — 사용자가 시켜서 하는 게 아니라 세션이 판단해서 하는 것.
- **광고망(애드센스 대체/병행)과 제휴(affiliate) — 특정 사이트를 미리 정해놓지 않는다** (2026-08-03,
  사용자 명시 지시로 이전 기록의 Media.net/Ezoic 같은 구체 사명 언급을 전부 취소·정정함). 이전 세션
  기록에 특정 광고망 이름이 후보로 남아있어도 그건 그냥 그 시점에 예시로 든 것일 뿐 확정된 방향이
  아니다 — 다시 검토할 때 그 이름들에 얽매이지 말고 그 시점 기준으로 새로 찾을 것.
- **판단·실행 주체와 절차**: 트래픽/전환 데이터를 보고 "지금 시작해도 되겠다"는 판단이 서면(사용자가
  미리 정해둔 임계값은 없음 — 세션이 데이터로 직접 판단), 그 세션이 **직접 후보를 찾아서(web_search
  등으로 그 시점 기준 적합한 광고망·제휴처 조사) 사용자에게 먼저 "여기서 하자"고 제안**하는 방식으로
  진행한다. 사용자가 먼저 찾아서 물어보는 게 아니라, 판단이 선 세션이 먼저 찾아서 들고 오는 것.
  이후 실행(코드 삽입 등)도 사용자 승인 하에 그 세션이 진행.
- affiliate 홀더(빈 링크/배너)를 미리 넣지 않는다는 원칙은 유지 — 트래픽/전환이 실제로 붙기 전에는
  시작 안 함. "언제, 어디서 시작할지"의 판단과 조사 둘 다 그 시점 세션의 몫.

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