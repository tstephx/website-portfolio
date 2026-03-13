# Phase 3: Protected Pages + Cross-Cutting Consistency

_Part A: Deep review of 3 protected case studies. Part B: Cross-cutting checks across all pages._
_Standards reference: `docs/active/audit-phase1-standards.md`. Phase 2 reference: `docs/active/audit-phase2-public.md`._

---

## Part A: Protected Pages Deep Review

---

### Partner Application Redesign — Protected (`work/cfa-dsp-application/dsp-application.html`)

#### Comprehension

- **Summary:** Amazon's delivery partner application (unchanged since 2018) had a 74% abandonment rate costing $2.1M+ annually; Taylor benchmarked Chick-fil-A's franchise program, built a 101-requirement redesign, and secured 15× the engineering allocation through a three-document evidence chain.
- **Strongest sentences:**
  1. _"A one-way ANOVA across six reviewers returned F = 430.9 (p < 2e-16) — the application design, not reviewer judgment, was the root cause."_ — Same strength as public version. Statistical rigor in a PM context is the differentiator.
  2. _"At $319 per final interview versus $15 at application review, the program filtered a full stage too late."_ — The protected version's exact dollar figures make the cost asymmetry visceral. This is dramatically stronger than the public version's "20× more expensive" ratio.
  3. _"I submitted one franchise application on a Tuesday night."_ — The "Tuesday night" detail adds personality that the public version ("Q4 2023") strips out. This makes the protected version feel more human and memorable.
- **Interview question:** "You went to Chick-fil-A's website and applied to their franchise program as competitive intelligence. Walk me through that decision — was this sanctioned, and how did you frame it to leadership?"

#### Findings

##### MUST FIX

_(None — content is internally consistent, dollar figures are the expected protected-tier specifics)_

##### SHOULD FIX

- **Line 160: "I owned the work end-to-end: diagnosis, BRD, roadmap, and the annual operating plan escalation."** "BRD" is used without expansion. On the public version, it's spelled out as "business requirements document (BRD)." The protected version should also expand it on first use — the audience (hiring managers reviewing with credentials) may not be Amazon employees.
  → **Recommended fix:** "diagnosis, business requirements document (BRD), roadmap, and the annual operating plan escalation."

- **Lines 118-126: The funnel paragraph is the densest in the portfolio.** "Of ~49,000 started applications, three out of four abandoned before submitting — 36,000+ candidates lost before a reviewer saw their information. Of the 12,714 who submitted, two in three were rejected. Of the 4,450 who passed, only 23% showed program interest — 1,023 inclined candidates. A 2% end-to-end conversion rate." This is excellent data and stronger than the public version, but it's a wall. Consider a mini-funnel visualization or bullet list to match the precision.
  → **Recommended fix:** Break into a small funnel table or styled list. The data is the strength — let the format match.

- **Pull quote uses `<blockquote>` (line 347) while public version uses `<aside>`.** This is a structural inconsistency. Both should use the same semantic element for the same component.
  → **Recommended fix:** Standardize to `<aside class="pull-quote">` across both versions (matches public, and the content is a callout, not a quotation).

##### NICE TO HAVE

- The "Tuesday night" detail in the results insight callout is a strong personality signal that doesn't exist in the public version. The protected version benefits from these small human touches.
- The comparison labels ("Amazon Application" vs "CFA Application") are more specific than the public version's "Current Application" vs "Benchmark Application." The protected labels are better — clearer and more informative.

#### Public ↔ Protected Comparison

- **Content on public but missing from protected:** None. The public version is a strict subset of the protected version.
- **Structural differences:**
  - Protected has NO unlock CTA section (correct — it IS the full version)
  - Public uses `<aside class="pull-quote">`; protected uses `<blockquote class="pull-quote">` — **tag mismatch**
  - Protected H2 is "The $2.1M+ Problem"; public is "The Conversion Gap No One Was Measuring" — good differentiation
  - Protected results H2: "9,419 More Approved Applications" (exact); public: "9,000+ More Approved Applications" (rounded) — correct tier behavior
  - Public uses `role="region" aria-labelledby="metrics-caption"` on data table wrapper; protected does NOT — **accessibility gap**
- **Anonymization accuracy:** PASS. All swaps from the anonymization guide are correctly applied:
  - Chick-fil-A → "best-in-class franchise" / "benchmark" ✓
  - $2.1M+ → "multi-million" / "seven-figure" ✓
  - $319/$15 → "20× more expensive" ✓
  - 40,000/0.2% → "tens of thousands, sub-1%" ✓
  - October 17, 2023 → "Q4 2023" ✓
  - CFA → "the benchmark" ✓
  - Salesforce → "CRM" ✓
  - DSP Acquisitions → "Partner Acquisitions" ✓
  - BRD expanded on first use in public ✓
  - Annual operating plan → "annual planning" ✓
  - 25,830 → "25,000+" ✓
  - 9,419 → "9,000+" ✓
  - 15,699→25,118 → "~16K→~25K" ✓
  - 2,200+ → "2,000+" ✓

---

### Contract Transfer Process Redesign — Protected (`work/contract-transfer/contract-transfer.html`)

#### Comprehension

- **Summary:** Same narrative arc as public version — inherited a transfer process with zero documentation, reframed from customer service to network protection, built the operating system. The protected version adds: exact dollar figures ($482K+ per exit, $13M total, $25M expansion target), specific program names (Legacy Transfer, DSP), and station-level capacity metrics.
- **Strongest sentences:**
  1. _"I didn't think the program was failing. I thought we were measuring it against the wrong mission."_ — Same as public. The strongest sentence across the entire portfolio.
  2. _"29 cases at $482K+ each — $13M in avoided exit costs, and 29 delivery routes that stayed in the network."_ — The exact dollar multiplication ($482K × 29 ≈ $14M, reported as $13M) gives this credibility the public version's "six figures each — eight-figure" can't match.
  3. _"The SOP became the foundation for the 2025 Legacy Transfer strategy — a leadership initiative targeting $25M in avoided exit costs by 2026."_ — Shows the work had lasting institutional impact beyond the initial scope.
- **Interview question:** "You say the SOP became the foundation for a $25M expansion strategy. How much of that $25M target was modeled from your original 29-case dataset, and what assumptions did you have to extrapolate?"

#### Findings

##### MUST FIX

- **Icon cards in protected version have emoji icons (📋📨🔍⚠️) that the public version does NOT.** Lines 106, 115, 123, 131 in protected have `<div class="icon-card-icon">&#x1F4CB;</div>` etc. The public version's icon cards have no icon div at all. This is a structural divergence — one version has a visual element the other doesn't.
  → **Recommended fix:** Either add icons to public version or remove from protected. The icons add personality but their absence on the public version isn't a broken experience. Recommend adding them to public for parity.

##### SHOULD FIX

- **Line 63: TL;DR says "above network average"** while the public version says "above program average." Per the anonymization guide, "network average" → "program average" on the public tier. This is correct — but a hiring manager reading both versions would notice the terminology difference. Worth noting for interview prep.

- **Lines 372-377: "Breach of Contract incidents"** — the public version correctly anonymizes this to "compliance incidents." The protected version retains it. Correct per anonymization guide. However, "Breach of Contract" as a phrase capitalized like a proper noun suggests it's an internal metric name. Consider whether lowercase "breach of contract incidents" would read more naturally.
  → **Recommended fix:** Lowercase to "breach of contract incidents" — it reads less like internal jargon while retaining the specificity that differentiates the protected version.

- **Protected version uses `tabindex="0"` on data table wrapper (line 258) but does NOT have `role="region"` or `aria-labelledby`.** Public version has all three attributes. Accessibility gap.
  → **Recommended fix:** Add `role="region" aria-labelledby="defect-caption"` to match public version's accessibility pattern.

##### NICE TO HAVE

- The protected version's decision cards say "Partner Transfer as Customer Service" / "Partner Transfer as Network Protection" while the public version says "Transfer as Customer Service" / "Transfer as Network Protection." The "Partner" prefix in the protected version is more precise. Both work.

#### Public ↔ Protected Comparison

- **Content on public but missing from protected:** None. Public is a strict subset.
- **Structural differences:**
  - Protected has emoji icons in icon cards; public does not
  - Protected has no unlock CTA section (correct)
  - Public data table has `role="region"` and `aria-labelledby`; protected does not
  - Same pull quote element: both use `<aside class="pull-quote">` ✓
- **Anonymization accuracy:** PASS.
  - $482K+ → "six figures" ✓
  - $13M → "eight-figure" ✓
  - $25M → "eight-figure" ✓
  - CT → "transfer" / "contract transfer" ✓
  - Legacy Transfer → "succession planning initiative" ✓
  - network average → "program average" ✓
  - Breach of Contract → "compliance" ✓
  - partner quality scores → "operator quality scores" ✓
  - station capacity → "local delivery capacity" ✓
  - DSP Acquisitions → "Partner Acquisitions" ✓

---

### Selection Automation — Protected (`work/pinnacle-program-selection/pinnacle-automation.html`)

#### Comprehension

- **Summary:** Same narrative as public. Protected version adds: "Pinnacle" program name, "Tier 1" designation, exact network numbers (2,620 vs 2,600+), "Amazon's" attribution, internal tool names (Salesforce, Asana), and internal metric names (Leadership & Engagement, Positive Environment, Strategic Communicator).
- **Strongest sentences:**
  1. _"The same route measured 49 miles one month and 52 the next."_ — Same as public. Universally understandable.
  2. _"Pinnacle didn't need a new approach — it needed a working spreadsheet."_ — The named program ("Pinnacle") lands slightly harder than the public version's "The program" — it's more concrete, more memorable.
  3. _"blended Quality reached 66.7% (+270 basis points month-over-month)."_ — More specific than the public version's "2.7 percentage points" — shows the exact quality level, not just the improvement delta.
- **Interview question:** "You mention tightening Leadership & Engagement, Positive Environment, and Strategic Communicator qualification screens while simultaneously growing the eligible pool 43%. How do you reconcile tighter criteria with pool growth?"

#### Findings

##### MUST FIX

_(None)_

##### SHOULD FIX

- **Pull quote uses `<blockquote>` (line 378) while the public version uses `<aside>`.** Same inconsistency as PA. The CT pair correctly uses `<aside>` on both versions.
  → **Recommended fix:** Change to `<aside class="pull-quote">` for consistency.

- **Lines 337-344: Post-automation paragraph is the densest across all protected pages.** "441 delivery partners" / "Leadership & Engagement, Positive Environment, and Strategic Communicator" / "118 delivery partners" / "Asana workflow" / "66.7% (+270 basis points)" — all in one paragraph. The public version is slightly lighter (rounded numbers, generalized names) but still dense. Both versions need the same fix: break into 2-3 paragraphs.
  → **Recommended fix:** Same as Phase 2 recommendation for the public version — break into shorter paragraphs or add a mini metrics component.

- **Protected data table wrapper (line 277) has `tabindex="0"` but no `role="region"` or `aria-labelledby`.** Same accessibility gap as CT protected.
  → **Recommended fix:** Add `role="region" aria-labelledby="transform-caption"` (caption ID exists on the table).

##### NICE TO HAVE

- The protected version's naming is actually easier to read in several places. "Pinnacle team expanded from 3 to 10" is clearer than "the program team expanded from 3 to 10" — proper nouns anchor the reader.
- "Asana workflow" (protected) vs "project management workflow" (public) — the Salesforce/Asana names actually help the reader understand the tech stack. The public version's generalization is necessary for anonymization but does cost some readability.

#### Public ↔ Protected Comparison

- **Content on public but missing from protected:** None. Public is a strict subset.
- **Structural differences:**
  - Protected pull quote uses `<blockquote>`; public uses `<aside>` — tag mismatch
  - Protected has no unlock CTA section (correct)
  - Protected data table wrappers lack `role="region"` and `aria-labelledby`
  - Funnel numbers: 2,620 / ~222 (protected) vs 2,600+ / ~220 (public) — correct rounding
- **Anonymization accuracy:** PASS.
  - Pinnacle → "expansion program" / "reward program" ✓
  - Tier 1 → "top-tier" ✓
  - Amazon's Pinnacle → "The expansion program" ✓
  - PM, Pinnacle Operations → "PM, Partner Operations" ✓
  - Salesforce → "CRM" ✓
  - Asana → "project management workflow" ✓
  - 2,620 → "2,600+" ✓
  - ~222 → "~220" ✓
  - 441 → "440+" ✓
  - 118 → "~120" ✓
  - Leadership & Engagement... → "leadership, engagement, and communication qualification screens" ✓
  - 66.7% (+270 basis points) → "2.7 percentage points" ✓
  - Pinnacle opportunities → "expansion opportunities" ✓

---

## Part B: Cross-Cutting Consistency

---

### 1. Terminology Table

| Term                            | Homepage           | PA Pub                                  | PA Prot               | CT Pub                                                                     | CT Prot                                               | PIN Pub                                | PIN Prot                      | Resume                                            |
| ------------------------------- | ------------------ | --------------------------------------- | --------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------------- | ----------------------------- | ------------------------------------------------- |
| 29 **\_** (cases/transfers)     | "29 cases"         | —                                       | —                     | "29 cases" (tagline), "29 cases transferred" (TL;DR), "29 cases" (results) | "29 cases"                                            | —                                      | —                             | "29 cases"                                        |
| Partners called **\_**          | "delivery partner" | "delivery partner"                      | "delivery partner"    | "partner"                                                                  | "partner" / "DSP" (scope only)                        | "delivery partners"                    | "delivery partners"           | "DSP" (company header), "delivery partner" (body) |
| Average called **\_**           | —                  | —                                       | —                     | "program average"                                                          | "network average"                                     | —                                      | —                             | "network average"                                 |
| Transfer process called **\_**  | —                  | —                                       | —                     | "transfer process" / "ownership transfer"                                  | "Owner Transfer process" / "partner transfer process" | —                                      | —                             | "Contract Transfer" / "Legacy Transfer"           |
| Expansion program called **\_** | —                  | —                                       | —                     | —                                                                          | —                                                     | "expansion program" / "reward program" | "Pinnacle" / "reward program" | "Pinnacle"                                        |
| Performance tier called **\_**  | —                  | —                                       | —                     | —                                                                          | —                                                     | "top-tier"                             | "Tier 1"                      | "Tier 1" (implied)                                |
| Benchmark called **\_**         | —                  | "best-in-class franchise" / "benchmark" | "Chick-fil-A" / "CFA" | —                                                                          | —                                                     | —                                      | —                             | —                                                 |

**Findings:**

- **SHOULD FIX:** Resume uses "network average" (line 121: "+18 pp above network average") — this is the protected-tier terminology. Since the resume is behind `noindex, nofollow` and has the same access level as protected pages, this may be intentional. However, if the resume is ever shared without auth (e.g., as a PDF), "network average" is Amazon-internal jargon. Consider "program average" to future-proof.
- **SHOULD FIX:** Resume uses "DSP" in the company header ("Last Mile Delivery Service Partner (DSP)") and "DSP" in one bullet ("internal DSP candidacy"). The company header is fine — it's Taylor's actual job title context. The bullet point reads as insider jargon.
- **NICE TO HAVE:** PIN Public uses both "reward program" (TL;DR) and "expansion program" (everywhere else). The Phase 2 review already flagged this — pick one.

---

### 2. Metric Consistency

| Metric                     | Homepage                 | PA Pub                                | PA Prot                     | CT Pub                                        | CT Prot                                       | PIN Pub                                         | PIN Prot                                        | Resume           |
| -------------------------- | ------------------------ | ------------------------------------- | --------------------------- | --------------------------------------------- | --------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ---------------- |
| 87% / 86.6% decision cycle | "87% faster" (card)      | —                                     | —                           | "87%" (metric card), "86.6% reduction" (body) | "87%" (metric card), "86.6% reduction" (body) | —                                               | —                                               | "86.6%"          |
| 16.98 → 2.28 weeks         | "2.28" (buried in card?) | —                                     | —                           | "16.98 → 2.28" (metric + body)                | "16.98 → 2.28" (metric + body)                | —                                               | —                                               | "16.98 → 2.28"   |
| 29 cases                   | "29 cases" (card)        | —                                     | —                           | "29 cases" (metric card + body)               | "29 cases" (metric card + body)               | —                                               | —                                               | "29 cases"       |
| 274% YoY                   | "274% YoY" (card)        | "274% year-over-year" (scope-context) | "274% year-over-year"       | "274% year-over-year" (problem)               | "274% year-over-year" (problem)               | —                                               | —                                               | —                |
| +18 pp                     | —                        | —                                     | —                           | "+18 pp" (metric card)                        | "+18 pp" (metric card)                        | —                                               | —                                               | "+18 pp"         |
| 57.9% → 94.1%              | "57.9% → 94.1%" (card)   | —                                     | —                           | —                                             | —                                             | "57.9% → 94.1%" (tagline, metrics, body, table) | "57.9% → 94.1%" (tagline, metrics, body, table) | "57.9% to 94.1%" |
| 0.25 → 3.8 engineers       | —                        | "0.25 → 3.8" (body, metric)           | "0.25 → 3.8" (body, metric) | —                                             | —                                             | —                                               | —                                               | —                |
| 26% → 60% completion       | "26% → 60%" (card)       | "26% → 60%" (metric, table)           | "26% → 60%" (metric, table) | —                                             | —                                             | —                                               | —                                               | "26% to 60%"     |
| 11% → 21% approval         | —                        | —                                     | —                           | "11 → 21%" (metric card), "11% to 21%" (body) | "11 → 21%" (metric card), "11% to 21%" (body) | —                                               | —                                               | —                |
| 3 → 10 team                | "3 → 10" (card)          | —                                     | —                           | —                                             | —                                             | "3 → 10" (metric card, table)                   | "3 → 10" (metric card, table)                   | "3 to 10"        |

**Findings:**

- **All metrics are consistent across pages.** No discrepancies in the numbers themselves.
- **NICE TO HAVE:** The homepage card uses "87% faster" while the case study uses both "87%" (metric card headline) and "86.6%" (body text precision). This is the correct pattern per Phase 2's recommendation (punchy in headlines, precise in body). Confirmed consistent.
- **The H1 says "2.3" weeks while body says "2.28"** — Phase 2 already flagged this. Both round correctly from 2.28. Acceptable.

---

### 3. Structural Parity

| Component                                    | PA                                                                         | CT                                            | PIN                                                                    |
| -------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| TL;DR present (both tiers)                   | ✅ Both                                                                    | ✅ Both                                       | ✅ Both                                                                |
| TL;DR default state (open/closed) matches    | ✅ Both closed (`<details>`)                                               | ✅ Both closed                                | ✅ Both closed                                                         |
| Scope-meta present (both tiers)              | ✅ Both                                                                    | ✅ Both                                       | ✅ Both                                                                |
| Scope-context paragraph present (both tiers) | ✅ Both                                                                    | ✅ Both                                       | ✅ Both                                                                |
| Pull-quote present (both tiers)              | ✅ Both — **but tag mismatch**: protected=`<blockquote>`, public=`<aside>` | ✅ Both — both `<aside>` ✓                    | ✅ Both — **tag mismatch**: protected=`<blockquote>`, public=`<aside>` |
| Metrics row card count matches               | ✅ 4 cards both                                                            | ✅ 4 cards both                               | ✅ 4 cards both                                                        |
| Lessons count matches                        | ✅ 4 both                                                                  | ✅ 4 both                                     | ✅ 3 both                                                              |
| Unlock CTA present (public only)             | ✅ Public has it, protected does not                                       | ✅ Public has it, protected does not          | ✅ Public has it, protected does not                                   |
| Icon cards (CT only)                         | N/A                                                                        | ⚠️ Protected has emoji icons; public does not | N/A                                                                    |
| Data table a11y (`role`, `aria-labelledby`)  | ⚠️ Public has; protected does NOT                                          | ⚠️ Public has; protected does NOT             | ⚠️ Public has; protected does NOT                                      |
| Font preload links                           | ✅ Public has; ⚠️ Protected PA does NOT                                    | Protected does NOT; Public has                | Protected does NOT; Public has                                         |

**MUST FIX:**

- **Pull quote tag mismatch (PA + PIN):** Protected versions use `<blockquote class="pull-quote">`, public versions use `<aside class="pull-quote">`. CT pair is consistent (both `<aside>`). Standardize PA and PIN protected versions to `<aside>`.

**SHOULD FIX:**

- **Data table accessibility gap:** All three protected versions lack `role="region"` and `aria-labelledby` on their `data-table-wrapper` divs. All three public versions have these attributes. Add them to protected versions for parity.
- **Icon cards on CT protected:** Protected CT has `<div class="icon-card-icon">` with emoji Unicode; public CT does not. Either add icons to public or remove from protected.
- **Font preload links:** All three public versions have `<link rel="preload">` for Cormorant Garamond and Newsreader fonts. None of the three protected versions do. This is a performance gap — protected pages load these fonts without preloading.

---

### 4. "Read Next" Link Chain

**Public chain:**
| From | CTA Text | Links To | ✓ |
|------|----------|----------|---|
| PA Public | "Read next: Contract Transfer Process Redesign →" | `../contract-transfer-public/index.html` | ✅ |
| CT Public | "Read next: Selection Automation →" | `../pinnacle-public/index.html` | ✅ |
| PIN Public | "Read next: Partner Application Redesign →" | `../partner-application-public/index.html` | ✅ |

**Chain is circular: PA → CT → PIN → PA ✅**

**Protected chain:**
| From | CTA Text | Links To | ✓ |
|------|----------|----------|---|
| PA Protected | "Read next: Contract Transfer Process Redesign →" | `../contract-transfer/contract-transfer.html` | ✅ |
| CT Protected | "Read next: Selection Automation →" | `../pinnacle-program-selection/pinnacle-automation.html` | ✅ |
| PIN Protected | "Read next: Partner Application Redesign →" | `../cfa-dsp-application/dsp-application.html` | ✅ |

**Chain is circular: PA → CT → PIN → PA ✅**

**CTA titles match between tiers:** ✅ (Both use the same short titles: "Contract Transfer Process Redesign", "Selection Automation", "Partner Application Redesign")

**No cross-tier leaks:** ✅ (Public pages link to public pages; protected pages link to protected pages)

---

## Summary of All Findings

### MUST FIX (across all phases)

1. **Pull quote tag mismatch (PA + PIN protected):** `<blockquote>` should be `<aside>` to match public versions and CT pair.

### SHOULD FIX (across all phases)

1. **Homepage tagline "AI Infrastructure & Systems Design"** doesn't match the case study content (partner operations). Reword or reframe.
2. **PA Public TL;DR third bullet** is denser than the other two. Split.
3. **PA Public "Current Application" comparison label** is temporally ambiguous. Add year.
4. **PA Public results paragraph** packs 4 metrics into one paragraph. Consider visual treatment.
5. **CT Public "SLA"** jargon — replace with "target" for non-Amazon readers.
6. **CT Public quality tracking paragraph** (lines 376-383) is the weakest paragraph in the portfolio — abstract and vague by the page's standards.
7. **CT Public defect table "Cases" column** should clarify it counts defect instances, not individual cases.
8. **PIN Public/Protected** inconsistent use of "reward program" vs "expansion program" — pick one.
9. **PIN Public/Protected post-automation paragraph** is too dense — break into 2-3 paragraphs.
10. **PIN Public "trailing twelve months"** is finance jargon — use "past twelve months."
11. **Resume uses "network average"** — should be "program average" to future-proof against sharing without auth.
12. **Data table accessibility gap:** All 3 protected versions need `role="region"` and `aria-labelledby` on table wrappers.
13. **CT protected icon cards have emojis** that public version lacks — standardize.
14. **Font preload links** missing from all 3 protected versions.
15. **PA Protected BRD not expanded** on first use (line 160).

### NICE TO HAVE (across all phases)

1. PA and CT have 4 lessons; PIN has 3 — consider adding one to PIN for structural parity.
2. Homepage "7-Figure" stat on PA card is vague — "15×" engineering multiplier would be more precise.
3. Homepage "Built to solve problems the job didn't come with" is slightly unclear.
4. Public versions' insight-callout placement is inconsistent (PA mid-results, CT/PIN pre-results).
5. Protected versions benefit from small human touches (e.g., "Tuesday night") — consider whether any similar details could be added to other protected pages.
