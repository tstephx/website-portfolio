# Phase 4: Triage and Fix Plan

_Consolidated findings from Phases 0–3 and four specialist agent reviews (content-writer, code-reviewer, story-reviewer, career-coach). Deduplicated, conflict-resolved, and sequenced into executable batches._

---

## 1. Conflict Resolution

| # | Conflict | Source A | Source B | Resolution |
|---|----------|----------|----------|------------|
| C1 | Pull quote tag severity | Phase 3: MUST FIX | content-writer: SHOULD FIX | **SHOULD FIX.** The tag mismatch (`<blockquote>` vs `<aside>`) doesn't break rendering or accessibility — both display identically. It's a semantic inconsistency, not a factual error. Downgrade to SHOULD FIX. |
| C2 | CT icon cards: cut or keep? | career-coach: cut (redundant with prose) | Phase 2: "effective component" | **STRATEGIC — defer to Taylor.** The cards ARE effective at a glance, but career-coach argues they repeat the prose. This is a judgment call about page length vs scannability. → Batch 3. |
| C3 | PIN post-automation: cut or keep? | career-coach: cut (blunts landing) | Phase 2: "shows system kept improving" | **STRATEGIC — defer to Taylor.** Both positions have merit. Cutting ends on achievement; keeping shows durability. → Batch 3. |
| C4 | PA near-term blocker: cut or collapse? | career-coach: collapse to 1 paragraph | Phase 2: no finding | **STRATEGIC — defer to Taylor.** career-coach's reasoning is sound (tightens page), but Phase 2 found no issue with this section. → Batch 3. |
| C5 | Homepage card order | career-coach: CT first | Current: PA first | **STRATEGIC — defer to Taylor.** CT has all confirmed metrics; PA leads with projections. Strong argument for CT first, but affects visual hierarchy and reading flow. → Batch 3. |
| C6 | 274% YoY math | story-reviewer: MUST FIX — "274% increase" ≠ 23→63 | — | **MUST FIX — DECISION NEEDED.** 23→63 is a 174% increase (or "grew to 274% of prior year"). Taylor must confirm: (a) fix to "174% increase" or (b) fix to "grew to 274% of the prior year" or (c) remove the parenthetical "(23 to 63)". |
| C7 | $482K × 29 math | story-reviewer: MUST FIX — $482K+ × 29 ≈ $14M, not $13M | — | **MUST FIX — DECISION NEEDED.** The "+" makes the gap worse. Taylor must confirm which number is authoritative: (a) adjust "$13M" to "$14M" or (b) adjust "$482K+" to "$448K+" or (c) adjust "29" or (d) note that "$13M" is the exact audited figure and "$482K+" is an average (not every case had the same cost). |

---

## 2. Deduplicated Issue List

Issues grouped by root cause. Sources in brackets.

### Math / Factual Errors (3 issues)

| ID | Issue | Files | Sources |
|----|-------|-------|---------|
| F1 | **274% YoY ambiguity:** "274% year-over-year (23 to 63)" — 23→63 is 174% increase, not 274%. Parenthetical exposes the math to anyone who checks. | CT public `line 99`, CT protected `line ~99`, homepage card | [story-reviewer, Phase 2 §CT] |
| F2 | **$482K × 29 ≠ $13M:** $482K+ × 29 = ~$14M. The two figures coexist on the same page and contradict each other. | CT protected (body + results) | [story-reviewer] |
| F3 | **PA 62% rejection vs 4,450 passed:** 62% of 12,714 = 4,831 passed, not 4,450. Implied rate is 65%. Likely different data windows but coexist in same paragraph. | PA protected `lines 118-126` | [story-reviewer] |

### Anonymization (1 issue)

| ID | Issue | Files | Sources |
|----|-------|-------|---------|
| A1 | **CT Public "39.6%":** Should be "fewer than 40%" per anonymization guide. Only miss across all three guides. | CT public `line ~339` | [story-reviewer] |

### Number Drift (1 issue)

| ID | Issue | Files | Sources |
|----|-------|-------|---------|
| N1 | **Resume "$13M+" vs "$13M":** "+" qualifier present in key metrics section, absent in SPM bullet — within the same document. | `resume.html` | [story-reviewer] |

### Structural / Semantic HTML (4 issues)

| ID | Issue | Files | Sources |
|----|-------|-------|---------|
| S1 | **Pull quote tag mismatch:** PA + PIN protected use `<blockquote class="pull-quote">`, should be `<aside class="pull-quote">` to match public versions and CT pair. | PA protected, PIN protected | [Phase 3, content-writer, code-reviewer] |
| S2 | **Data table a11y gap:** All 3 protected versions lack `role="region"` and `aria-labelledby` on `data-table-wrapper`. Public versions have them. | PA protected, CT protected, PIN protected | [Phase 3, code-reviewer] |
| S3 | **Caption id prerequisite:** Protected pages' `<caption>` elements have NO id attribute. Adding `aria-labelledby` without a matching id creates a broken reference. Both must be added together. | PA protected, CT protected, PIN protected | [code-reviewer] |
| S4 | **CT icon card emoji parity:** Protected CT has emoji icons in icon cards; public does not. | CT public, CT protected | [Phase 3, code-reviewer] |

### Accessibility (3 issues)

| ID | Issue | Files | Sources |
|----|-------|-------|---------|
| X1 | **CT icon card emojis need `aria-hidden="true"`:** Screen readers announce "clipboard," "incoming envelope," etc. | CT protected | [code-reviewer] |
| X2 | **PIN protected `<th>` lacks `scope="col"`:** Public version has them, protected does not. | PIN protected | [code-reviewer] |
| X3 | **Font preload missing from protected pages:** All 3 public versions preload Cormorant Garamond + Newsreader. None of the 3 protected versions do. | PA protected, CT protected, PIN protected | [Phase 3, code-reviewer] |

### Content Clarity (11 issues)

| ID | Issue | Files | Sources |
|----|-------|-------|---------|
| W1 | **CT quality tracking paragraph:** Weakest paragraph in the portfolio — abstract, vague, no specifics on what the deviation was or the intervention. | CT public `lines 376-383`, CT protected (matching section) | [Phase 2, content-writer, career-coach] |
| W2 | **CT defect table "Cases" column label:** Misleading — counts defect instances, not cases. Readers will add to 209, not 29. | CT public, CT protected | [Phase 2, content-writer] |
| W3 | **PIN "reward program" vs "expansion program" inconsistency:** Both used on the same page. | PIN public `line 63 vs line 85` | [Phase 2, content-writer, Phase 3] |
| W4 | **PA TL;DR third bullet too dense:** Noticeably denser than the first two bullets. | PA public `lines 69-71` | [Phase 2, content-writer] |
| W5 | **PA comparison card labels "Current Application":** Temporally ambiguous — current as of when? | PA public `lines 146-157` | [Phase 2, content-writer] |
| W6 | **PIN "trailing twelve months":** Finance jargon — "past twelve months" is clearer. | PIN public `line 355` | [Phase 2, content-writer] |
| W7 | **CT "SLA" jargon:** Replace with "target" for non-Amazon readers. | CT public `line 152` | [Phase 2, content-writer] |
| W8 | **CT line ~196 ambiguous "it" pronoun:** Two "it"s with different antecedents in same sentence. | CT public | [content-writer] |
| W9 | **PA funnel paragraph buries the punchline:** "2% conversion" should open, not close. | PA public `lines ~130-133` | [content-writer] |
| W10 | **PA insight callout is a timeline summary, not an insight:** Should frame why the numbers matter. | PA public (insight-callout component) | [content-writer] |
| W11 | **PIN "What Changed" H2 is weak:** Pure label, no tension. | PIN public (H2 heading) | [content-writer] |

### Content Gaps (2 issues)

| ID | Issue | Files | Sources |
|----|-------|-------|---------|
| G1 | **CT results section missing insight callout:** Every other case study has one before the metrics row. CT does not. | CT public, CT protected | [content-writer] |
| G2 | **PA decision section buries the decision:** Reads as "3 options, here's what I picked" instead of leading with why the obvious choice was wrong. | PA public (decision section) | [content-writer] |

### Consistency (4 issues)

| ID | Issue | Files | Sources |
|----|-------|-------|---------|
| K1 | **Homepage tagline "AI Infrastructure & Systems Design":** Doesn't match case study content (partner operations). Misleads AI-PM seekers. | `index.html` | [Phase 2] |
| K2 | **CT 2.3 vs 2.28 weeks:** H1 says "2.3", results say "2.28", meta says "2.3". Minor but should be reconciled. | CT public | [Phase 2] |
| K3 | **Resume "network average" jargon:** Protected-tier term on a document that may be shared without auth. | `resume.html` | [Phase 3] |
| K4 | **CT `—` vs `&mdash;` entity inconsistency:** Uses literal `—` in quality tracking paragraph; rest of site uses `&mdash;`. | CT public | [code-reviewer] |

### Performance (1 issue)

| ID | Issue | Files | Sources |
|----|-------|-------|---------|
| P1 | **`progress-bar.js` load position inconsistent:** Homepage loads at end of `<body>`; case studies load in `<head>` with defer. Functionally identical but inconsistent. | `index.html` vs case study pages | [code-reviewer] |

### Protected-Specific (2 issues)

| ID | Issue | Files | Sources |
|----|-------|-------|---------|
| R1 | **PA protected BRD not expanded on first use:** Public version expands it; protected does not. | PA protected `line 160` | [Phase 3] |
| R2 | **CT protected "Breach of Contract" capitalization:** Reads like internal jargon. Lowercase to "breach of contract incidents." | CT protected `lines 372-377` | [Phase 3, content-writer] |

---

## 3. Batched Fix Sequence

### Batch 1: MUST FIX — Blocks Going Public

Factual errors, math contradictions, anonymization leaks. These undermine credibility if an interviewer checks.

| # | Issue ID | What's Wrong | Files | Fix | Blocked By |
|---|----------|-------------|-------|-----|------------|
| 1.1 | F1 | 274% YoY math ambiguity | CT public, CT protected, homepage | **DECISION NEEDED** — see §1 conflict C6 | Taylor's decision |
| 1.2 | F2 | $482K × 29 ≠ $13M | CT protected | **DECISION NEEDED** — see §1 conflict C7 | Taylor's decision |
| 1.3 | F3 | 62% rejection vs 4,450 passed | PA protected | Fix rejection % to 65% or passed count to ~4,831, or add note about different data windows | Taylor's decision |
| 1.4 | A1 | CT Public "39.6%" anonymization gap | CT public | Replace "39.6% of routes recover" with "fewer than 40% of routes recover" | — |
| 1.5 | N1 | Resume "$13M+" vs "$13M" drift | resume.html | Standardize — use "$13M+" in both locations (or "$13M" in both). Depends on F2 resolution. | F2 resolution |

**Files touched:** CT public, CT protected, PA protected, homepage, resume.html
**Estimated effort:** ~30 minutes once decisions are made. Can run in one Claude Code session.

### Batch 2: SHOULD FIX — Affects Hiring Manager Perception

Clarity, flow, voice, structural parity, accessibility.

| # | Issue ID | What's Wrong | Files | Fix |
|---|----------|-------------|-------|-----|
| 2.1 | S1 | Pull quote tag mismatch | PA protected, PIN protected | Change `<blockquote class="pull-quote">` to `<aside class="pull-quote">` |
| 2.2 | S2 + S3 | Data table a11y gap + missing caption id | PA/CT/PIN protected | Add `id` to `<caption>`, add `role="region" aria-labelledby="[caption-id]"` to wrapper |
| 2.3 | S4 + X1 | CT icon card emoji parity + a11y | CT public (add emojis), CT protected (add `aria-hidden="true"`) | Add emoji `<div>` to public; add `aria-hidden="true"` to protected emojis |
| 2.4 | X2 | PIN `<th>` missing `scope="col"` | PIN protected | Add `scope="col"` to all `<th>` in transformation table |
| 2.5 | X3 | Font preload missing | PA/CT/PIN protected | Add `<link rel="preload">` for Cormorant Garamond + Newsreader (copy from public `<head>`) |
| 2.6 | W1 | CT quality tracking paragraph weak | CT public + CT protected | Rewrite: lead with outcome, make specific, or cut. See Batch 2 prompt for proposed text. |
| 2.7 | W2 | CT defect table "Cases" column | CT public + CT protected | Change column header to "Defect instances" |
| 2.8 | W3 | PIN "reward/expansion" inconsistency | PIN public | Change TL;DR "reward program" → "expansion program" |
| 2.9 | W4 | PA TL;DR third bullet too dense | PA public | Split into two sentences |
| 2.10 | W5 | PA comparison labels ambiguous | PA public | "Current Application" → "Original Application (2018)" |
| 2.11 | W6 | PIN "trailing twelve months" | PIN public + PIN protected | → "past twelve months" |
| 2.12 | W7 | CT "SLA" jargon | CT public | → "target" |
| 2.13 | W8 | CT ambiguous "it" pronoun | CT public | Rewrite sentence to disambiguate |
| 2.14 | W9 | PA funnel punchline buried | PA public + PA protected | Move "2% end-to-end conversion" to opening position |
| 2.15 | W10 | PA insight callout is timeline, not insight | PA public | Rewrite to frame why numbers matter |
| 2.16 | W11 | PIN "What Changed" H2 weak | PIN public + PIN protected | Rewrite: add tension (e.g., "Seven Root Causes Behind One Failing Spreadsheet") |
| 2.17 | G1 | CT missing insight callout before metrics | CT public + CT protected | Add `<aside class="insight-callout">` before metrics row |
| 2.18 | G2 | PA decision section buries decision | PA public + PA protected | Lead with why the obvious choice was wrong |
| 2.19 | K1 | Homepage tagline mismatch | index.html | Reword "AI Infrastructure & Systems Design" to match case studies |
| 2.20 | K2 | CT 2.3 vs 2.28 reconciliation | CT public | Use "2.3" in H1/tagline, "2.28" in body/results (current approach, but fix meta) |
| 2.21 | K3 | Resume "network average" | resume.html | → "program average" |
| 2.22 | R1 | PA protected BRD not expanded | PA protected | Add "(BRD)" expansion on first use |
| 2.23 | R2 | CT "Breach of Contract" caps | CT protected | Lowercase to "breach of contract incidents" |

**Files touched:** All 6 case study pages, homepage, resume — 8 files total
**Estimated effort:** ~60–90 minutes. Can run in one Claude Code session, but recommend splitting into two sub-sessions (structural/a11y first, then content rewrites).

### Batch 3: STRATEGIC — Requires Taylor's Approval

See `docs/prompts/content-fixes-batch3-decisions.md` for the full decision document.

| # | Recommendation | Source | Trade-off |
|---|---------------|--------|-----------|
| 3.1 | Reorder homepage cards: CT first, not PA | career-coach | CT has confirmed metrics; PA leads with projections. But PA's problem statement is more universally accessible. |
| 3.2 | PA metric cards need "projected" visible on face | career-coach | Adds precision but may weaken the initial visual impact. |
| 3.3 | Cut CT quality tracking paragraph entirely | career-coach | Removes weakest section; but loses the "system kept working" proof point. |
| 3.4 | Cut or collapse PIN "Post-automation" section | career-coach | Ends on achievement vs shows durability. |
| 3.5 | PIN superlative "only workstream" — keep fact, drop comparison | career-coach | Reduces self-congratulation without losing the credibility signal. |
| 3.6 | CT icon cards — cut or keep | career-coach | Removes repetition; loses scannability for skimmers. |
| 3.7 | PA "Near-Term Blocker" — collapse to 1 paragraph | career-coach | Tightens page; loses some narrative tension. |
| 3.8 | CT "I owned end-to-end implementation" — cut | career-coach | Removes defensive fragment; but "end-to-end" is a useful ownership signal. |

**Files touched:** Depends on decisions — potentially homepage + all 6 case studies
**Estimated effort:** ~45–60 minutes per approved change. Should be a separate session after Batches 1–2.

### Batch 4: NICE TO HAVE — Polish

| # | Issue ID | What It Would Improve | Files | Suggested Approach |
|---|----------|----------------------|-------|--------------------|
| 4.1 | K4 | CT `—` vs `&mdash;` entity consistency | CT public | Replace literal `—` with `&mdash;` in quality tracking paragraph |
| 4.2 | P1 | `progress-bar.js` load position consistency | index.html | Move to `<head>` with `defer` to match case studies |
| 4.3 | — | PIN has 3 lessons vs 4 on PA/CT | PIN public + protected | Consider adding a 4th lesson for structural parity |
| 4.4 | — | PA results paragraph packs 4 metrics | PA public + PA protected | Consider secondary metrics row or bullet list |
| 4.5 | — | PA public pull quote repeats benchmark point | PA public | No change needed — effective as visual break |
| 4.6 | — | Insight callout placement inconsistent (PA mid-results, CT/PIN pre-results) | PA public + PA protected | Consider standardizing to pre-results |
| 4.7 | — | Homepage "7-Figure" stat vague | index.html (PA card) | Consider "15×" engineering multiplier — BUT content-writer disputed this. Skip unless Taylor wants it. |
| 4.8 | — | Homepage "Built to solve problems the job didn't come with" slightly unclear | index.html | Consider "Built to solve problems the job didn't cover" |
| 4.9 | — | PIN post-automation paragraph too dense | PIN public + protected | Break into 2-3 shorter paragraphs (independent of cut/keep decision in Batch 3) |

**Files touched:** CT public, index.html, PIN public + protected, PA public + protected
**Estimated effort:** ~30 minutes. Can be done as a cleanup pass after Batches 1–3.

---

## 4. Dependencies

```
F2 ($482K×29 resolution) ──────┐
                                ├──→ N1 (resume "$13M" standardization)
F1 (274% YoY resolution) ──────┤
                                └──→ A1 (CT public anonymization — independent, no dependency)

S3 (caption id) ────────────────→ S2 (aria-labelledby depends on id existing)

C2 decision (CT icon cards) ───→ S4 (icon parity fix depends on keep/cut)
                                └──→ X1 (aria-hidden only needed if icons kept)

C3 decision (PIN post-auto) ───→ 4.9 (paragraph density fix only needed if section kept)

C6 decision (274% fix approach) → applies to CT public, CT protected, homepage card
C7 decision ($482K fix approach) → applies to CT protected only (public uses "six figures")
```

---

## 5. Estimated Effort

| Batch | Files | Time | Sessions | Notes |
|-------|-------|------|----------|-------|
| Batch 1 | 5 | ~30 min | 1 (after decisions) | Blocked on 3 Taylor decisions (F1, F2, F3) |
| Batch 2 | 8 | ~60-90 min | 1-2 | No blockers. Can start immediately. |
| Batch 3 | 1-7 | ~45-60 min per approved change | 1 separate session | Requires Taylor to review decision doc first |
| Batch 4 | 5-7 | ~30 min | 1 (cleanup pass) | No blockers. Low priority. |

**Recommended execution order:**
1. Taylor reviews Batch 3 decisions and Batch 1 math questions
2. Execute Batch 2 (no blockers)
3. Execute Batch 1 (once Taylor provides math answers)
4. Execute approved Batch 3 items
5. Execute Batch 4 as time permits

---

## 6. Execution Prompts

See:
- `docs/prompts/content-fixes-batch1.md` — MUST FIX (executable after decisions)
- `docs/prompts/content-fixes-batch2.md` — SHOULD FIX (executable now)
- `docs/prompts/content-fixes-batch3-decisions.md` — STRATEGIC (decision document, not executable)
- `docs/prompts/content-fixes-batch4.md` — NICE TO HAVE (executable, low priority)
