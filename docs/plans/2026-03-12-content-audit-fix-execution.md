<!-- project: website-portfolio -->
<!-- INTERVIEW DECISIONS (2026-03-12):
SLA scope: Replace 4 prose instances, KEEP table caption "SLA misses"
Task order: DEFER Task 4 (CT icon parity) until after Decision Gate 1 (D3.6)
Tagline: "Operational Systems & Process Design" confirmed
PIN H2: Agent must verify root cause count before writing the number in the headline
Rewrite QA: Dispatch content-writer agent after Tasks 9-14 to review all rewrites
Callout tiers: Different text per tier (public uses anonymized ratios, protected uses exact figures)
Protected SLA: KEEP "SLA" on CT protected — only change CT public
PIN term scope: Grep "reward program" across ALL files and fix every instance to "expansion program"
PA decision section: Read-then-decide — agent assesses HTML structure before choosing prose vs structural rewrite
New CT callout: Agent drafts 2-3 candidate texts, Taylor picks one before insertion
-->
<!-- DECISIONS (filled in by Taylor):
F1 (274% YoY): A — fix to "174% increase"
F2 ($482K×29): A — $482K correct, fix total to $14M
F3 (PA 62%): B — 4,450 correct, fix rejection to 65%
D3.1 (card order): approve — CT leads homepage
D3.2 (projected label): approve — add "projected" to PA metrics
D3.3 (CT quality para): cut — remove entirely
D3.4 (PIN post-auto): collapse — reduce to 2-3 sentences
D3.5 (PIN superlative): trim — cut "only workstream" clause
D3.6 (CT icon cards): keep — add to public for parity (Task 4a runs)
D3.7 (PA blocker): collapse
D3.8 (CT owned e2e): rephrase
-->

# Content Audit Fix Execution Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Execute all fixes from the Phase 4 content audit triage plan (`docs/active/audit-phase4-fix-plan.md`) across 4 priority batches, with decision gates for Taylor's input.

**Architecture:** File-grouped edits in 3 execution phases separated by 1 decision gate. Batch 2 structural/terminology (no blockers) runs first. After Taylor reviews Batch 3 decisions and Batch 1 math questions, remaining batches execute. All changes on a feature branch, merged after final verification.

**Tech Stack:** HTML editing, grep verification, Playwright test suite (`npm test`)

**Reference docs:**
- `docs/active/audit-phase4-fix-plan.md` — master triage plan
- `docs/prompts/content-fixes-batch1.md` — MUST FIX details
- `docs/prompts/content-fixes-batch2.md` — SHOULD FIX details
- `docs/prompts/content-fixes-batch3-decisions.md` — strategic decisions
- `docs/prompts/content-fixes-batch4.md` — polish details

---

## Execution Phase A: Batch 2 — Structural, A11y, and Terminology (No Blockers)

### Task 1: Create feature branch

**Step 1: Branch from main**

```bash
cd ~/Dev/_Projects/website-portfolio
git checkout -b fix/content-audit-fixes
```

**Step 2: Verify clean state**

```bash
git status
```
Expected: clean working tree

---

### Task 2: Pull quote tag fix (PA + PIN protected)

**Files:**
- Modify: `work/cfa-dsp-application/dsp-application.html:347`
- Modify: `work/pinnacle-program-selection/pinnacle-automation.html:378`

**Fixes:** S1 (pull quote tag mismatch)

**Step 1: Fix PA protected**

In `work/cfa-dsp-application/dsp-application.html`:
- Find: `<blockquote class="pull-quote">`
- Replace: `<aside class="pull-quote">`
- Find the matching `</blockquote>` (closing tag for the pull quote section)
- Replace: `</aside>`

**Step 2: Fix PIN protected**

In `work/pinnacle-program-selection/pinnacle-automation.html`:
- Same find/replace as Step 1

**Step 3: Verify**

```bash
grep -rn "blockquote.*pull-quote" --include="*.html" work/
```
Expected: 0 results

```bash
grep -rn "aside.*pull-quote" --include="*.html" work/ | wc -l
```
Expected: 6 (one per case study page)

---

### Task 3: Data table accessibility (3 protected pages)

**Files:**
- Modify: `work/cfa-dsp-application/dsp-application.html:264-266`
- Modify: `work/contract-transfer/contract-transfer.html:258-260`
- Modify: `work/pinnacle-program-selection/pinnacle-automation.html:277-281`

**Fixes:** S2 (missing role/aria-labelledby), S3 (missing caption id), X2 (missing scope="col")

**Step 1: PA protected — add caption id + wrapper attributes**

In `work/cfa-dsp-application/dsp-application.html`:
- Find: `<div class="data-table-wrapper" tabindex="0">`
- Replace: `<div class="data-table-wrapper" tabindex="0" role="region" aria-labelledby="metrics-caption">`
- Find: `<caption>` (the one inside the data table, ~line 266)
- Replace: `<caption id="metrics-caption">`

**Step 2: CT protected — add caption id + wrapper attributes**

In `work/contract-transfer/contract-transfer.html`:
- Find: `<div class="data-table-wrapper" tabindex="0">`
- Replace: `<div class="data-table-wrapper" tabindex="0" role="region" aria-labelledby="defect-caption">`
- Find: `<caption>` (~line 260)
- Replace: `<caption id="defect-caption">`

**Step 3: PIN protected — add caption id + wrapper attributes + th scope**

In `work/pinnacle-program-selection/pinnacle-automation.html`:
- Find: `<div class="data-table-wrapper" tabindex="0">`
- Replace: `<div class="data-table-wrapper" tabindex="0" role="region" aria-labelledby="transform-caption">`
- Find: `<caption>` (~line 279)
- Replace: `<caption id="transform-caption">`
- Find the `<thead>` section (~lines 282-286). Change both `<th>` to include scope:
  - `<th>Before</th>` → `<th scope="col">Before</th>`
  - `<th>After</th>` → `<th scope="col">After</th>`

**Step 4: Verify**

```bash
grep -rn "aria-labelledby" --include="*.html" work/ | wc -l
```
Expected: 6 (3 public + 3 protected)

```bash
grep -rn 'caption id=' --include="*.html" work/ | wc -l
```
Expected: 6

```bash
grep -rn 'scope="col"' --include="*.html" work/pinnacle*/
```
Expected: matches on both public and protected

---

### Task 4: CT protected icon card aria-hidden (a11y only)

> **Note:** CT public icon card parity (adding emojis to public version) is DEFERRED to Task 4a after Decision Gate 1. If D3.6 = cut, icon cards are removed entirely and parity is moot. This task only fixes the a11y issue on icons that already exist.

**File:**
- Modify: `work/contract-transfer/contract-transfer.html:106,115,123,131`

**Fix:** X1 (emoji a11y)

**Step 1: Add aria-hidden to CT protected emojis**

In `work/contract-transfer/contract-transfer.html`, for each of the 4 icon cards:
- Find: `<div class="icon-card-icon">`
- Replace: `<div class="icon-card-icon" aria-hidden="true">`

**Step 2: Verify**

```bash
grep -rn "icon-card-icon" --include="*.html" work/contract-transfer/
```
Expected: 4 results, all with `aria-hidden="true"`

---

### Task 5: Font preloads for protected pages

**Files:**
- Modify: `work/cfa-dsp-application/dsp-application.html` (head section)
- Modify: `work/contract-transfer/contract-transfer.html` (head section)
- Modify: `work/pinnacle-program-selection/pinnacle-automation.html` (head section)

**Fixes:** X3 (font preload consistency)

**Step 1: Get exact preload tags from public version**

Read `work/contract-transfer-public/index.html` lines 23-30. The preload links are:

```html
<link
  rel="preload"
  href="../../fonts/cormorant-garamond-600-normal.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link rel="preload" href="../../fonts/newsreader-400-normal.woff2" as="font" type="font/woff2" crossorigin />
```

**Step 2: Add to each protected page**

Insert these 2 `<link>` tags in the `<head>` of each protected page, after the `<meta name="theme-color">` tag and before the first stylesheet `<link>`.

Note: All protected pages are 2 levels deep (`work/slug/file.html`), so `../../fonts/` is the correct relative path.

**Step 3: Verify**

```bash
grep -rn 'rel="preload"' --include="*.html" work/
```
Expected: matches on all 6 case study pages (3 public already had them, 3 protected now added)

---

### Task 6: Commit structural/a11y fixes

**Step 1: Review changes**

```bash
git diff --stat
```
Expected: 5 files changed (3 protected pages + pull quote fixes)

**Step 2: Commit**

```bash
git add work/
git commit -m "fix: structural parity and a11y across case study pages

- Standardize pull quote tags to <aside> (PA + PIN protected)
- Add caption id + role/aria-labelledby to protected data tables
- Add scope=col to PIN protected table headers
- Add aria-hidden to CT protected icon card emojis
- Add font preloads to all protected pages

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 7: Terminology fixes — all files

**Files:**
- Modify: `work/contract-transfer-public/index.html` (SLA → target, defect table header)
- Modify: `work/contract-transfer/contract-transfer.html` (defect table header, Breach of Contract case)
- Modify: `work/pinnacle-public/index.html` (reward → expansion, trailing → past)
- Modify: `work/pinnacle-program-selection/pinnacle-automation.html` (trailing → past, reward → expansion if present)
- Modify: `work/cfa-dsp-application/dsp-application.html` (BRD expansion)
- Modify: `resume.html` (network → program average)
- Potentially: `index.html` (if homepage PIN card uses "reward")

**Fixes:** W2, W3, W6, W7, K3, R1, R2

**Step 1: CT public — "SLA" → "target" (4 instances, KEEP table caption)**

In `work/contract-transfer-public/index.html`:
- Line 94: `no SLAs` → `no targets`
- Line 152: `7-week SLA` → `7-week target`
- Line 178: `hit the SLA` → `hit the target`
- Line 207: `defined SLAs` → `defined targets`
- Line 267 (table caption): **KEEP** `SLA misses` — standard business term in a technical context

Read the file first to confirm exact context for each.

**CT protected: KEEP all "SLA" instances unchanged.** The protected audience knows the term.

**Step 2: CT public + CT protected — defect table column header**

In both CT files, find the defect distribution table's `<th>` that says "Cases":
- Find: `<th>Cases</th>` (or similar, in the defect table thead)
- Replace: `<th>Defect Instances</th>`

**Step 3: PIN — "reward program" → "expansion program" (ALL files)**

Grep across the entire project:
```bash
grep -rn "reward program" --include="*.html" .
```

Change EVERY instance to "expansion program" — in PIN public, PIN protected, homepage (if present), and any other file.

**Step 4: PIN public + PIN protected — "trailing twelve months"**

- Find: `trailing twelve months` (PIN public line 356, PIN protected line 347)
- Replace: `past twelve months`

**Step 5: PA protected — BRD expansion**

In `work/cfa-dsp-application/dsp-application.html`:
- Find the first occurrence of `BRD` (~line 160)
- If not already expanded, change to: `business requirements document (BRD)`

**Step 6: CT protected — "Breach of Contract" case**

In `work/contract-transfer/contract-transfer.html`:
- Find: `Breach of Contract` (in prose, ~lines 372-377)
- Replace: `breach of contract`

**Step 7: Resume — "network average"**

In `resume.html`:
- Find: `network average`
- Replace: `program average`

**Step 8: Verify all terminology fixes**

```bash
grep -rn "reward program" --include="*.html" .
# Expected: 0 across ALL files
grep -rn "trailing twelve" --include="*.html" .
# Expected: 0
grep -rn "SLA" --include="*.html" work/contract-transfer-public/
# Expected: 1 (table caption only)
grep -rn "network average" resume.html
# Expected: 0
grep -rn "Breach of Contract" --include="*.html" work/contract-transfer/
# Expected: 0
```

---

### Task 8: Commit terminology fixes

```bash
git add work/ resume.html index.html
git commit -m "fix: terminology consistency across case studies and resume

- SLA → target (CT public, 4 prose instances; kept in table caption)
- CT protected: SLA kept unchanged (audience knows the term)
- Cases → Defect Instances (CT defect table header, both tiers)
- reward program → expansion program (all files, comprehensive grep)
- trailing twelve months → past twelve months (PIN both versions)
- Expand BRD on first use (PA protected)
- Lowercase 'breach of contract' (CT protected)
- network average → program average (resume)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## ⏸ DECISION GATE 1

**STOP HERE. Present Taylor with two documents for review.**

### Document A: Batch 1 Math Decisions

Read `docs/prompts/content-fixes-batch1.md` and present the 3 decisions:

1. **274% YoY**: Is it 174% increase, or "grew to 274% of prior year"? Which number to fix?
2. **$482K × 29 ≠ $13M**: Which figure is authoritative?
3. **PA 62% rejection vs 4,450 passed**: Which number is correct?

### Document B: Batch 3 Strategic Decisions

Read `docs/prompts/content-fixes-batch3-decisions.md` and present all 8 decisions:

1. Homepage card order (CT first?)
2. PA projected metric labeling
3. CT quality paragraph (cut vs rewrite?) — **this affects Task 11**
4. PIN post-automation (cut/collapse/keep?) — **this affects Task 13**
5. PIN superlative trimming
6. CT icon cards (cut/keep?) — **this determines whether Task 4a runs**
7. PA near-term blocker collapse
8. CT "owned end-to-end" cut

**Wait for Taylor's responses before continuing.**

Update the `DECISIONS` comment block at the top of this file with Taylor's answers.

---

## Execution Phase B: Batch 2 Content Rewrites + Batch 1

### Task 4a: CT icon card parity (CONDITIONAL — only if D3.6 = KEEP)

> **Skip entirely if D3.6 = CUT.** If cutting icon cards, proceed to Task 9.

**File:** `work/contract-transfer-public/index.html`

**Fix:** S4 (icon card parity)

**Step 1: Add matching emoji icons to CT public**

In `work/contract-transfer-public/index.html`, find the 4 icon cards (search for `class="icon-card"`). Add as the first child of each icon card:

Card 1 (Documentation): `<div class="icon-card-icon" aria-hidden="true">&#x1F4CB;</div>`
Card 2 (Communication): `<div class="icon-card-icon" aria-hidden="true">&#x1F4E8;</div>`
Card 3 (Evaluation): `<div class="icon-card-icon" aria-hidden="true">&#x1F50D;</div>`
Card 4 (Visibility): `<div class="icon-card-icon" aria-hidden="true">&#x26A0;</div>`

Read the CT protected file's icon cards to confirm which emoji maps to which card before adding.

**Step 2: Verify**

```bash
grep -rn "icon-card-icon" --include="*.html" work/contract-transfer*/
```
Expected: 8 results (4 per file), all with `aria-hidden="true"`

**Step 3: Commit**

```bash
git add work/contract-transfer-public/
git commit -m "fix: add emoji icons to CT public icon cards for parity with protected

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 9: PA public content rewrites

**File:** `work/partner-application-public/index.html`

**Fixes:** W4, W5, W9, W10, G2

**Step 1: Read the file sections that need changes**

Read lines 60-75 (TL;DR), 118-135 (funnel paragraph), 146-157 (comparison box), the insight-callout section, and the decision section.

**Step 2: TL;DR third bullet — split (W4)**

Find the third `<li>` in the TL;DR `<details>` section (~line 69-71). It contains a dense sentence about evidence chain → 3.8 engineers.

Split into two sentences:
- "An evidence chain — requirements specification, technology roadmap, annual planning escalation — secured the case."
- "Engineering allocation grew from 0.25 to 3.8."

**Step 3: Comparison labels — temporal anchor (W5)**

Find the comparison box header (~lines 146-157):
- Find: `Current Application` (label text)
- Replace: `Original Application (2018)`

**Step 4: Funnel punchline — lead with conversion rate (W9)**

Find the funnel paragraph. Move "A 2% end-to-end conversion rate" to the opening position. Current structure buries it at the end.

New structure: "A 2% end-to-end conversion rate. Of ~49,000 started applications, three out of four abandoned before submitting..."

**Step 5: Insight callout — reframe for PUBLIC tier (W10)**

Find the `<aside class="insight-callout">` (or similar component). Currently reads as a timeline summary. Rewrite to frame WHY the numbers matter using ANONYMIZED figures:

"The application wasn't collecting bad data — it was asking the wrong kind of questions. By the time a reviewer saw a candidate, the program had already spent 20× more per evaluation than the benchmark."

(The 20× ratio is the public-tier anonymization of $319 vs $15.)

**Step 6: Decision section — read-then-decide (G2)**

Read the actual decision section HTML first. Assess whether it uses:
- (a) Prose paragraphs → rewrite the introductory prose to lead with why the obvious choice was wrong
- (b) Visual components (option cards with rejected/chosen labels) → only rewrite the framing prose, do NOT restructure the visual components
- (c) A mix → adapt accordingly

The goal: the reader should understand why the obvious choice was wrong BEFORE seeing the options.

**Step 7: Verify**

Read the modified sections to confirm they read naturally. Check that no numbers were accidentally changed.

---

### Task 10: PA protected content rewrites

**File:** `work/cfa-dsp-application/dsp-application.html`

**Fixes:** W9 (funnel), W10 (insight callout), G2 (decision section)

**Step 1: Apply matching funnel rewrite (W9)**

Same restructure as Task 9 Step 4, but using protected-tier figures ($319, $2.1M+, exact counts like 49,000, 12,714, 4,450).

**Step 2: Insight callout — PROTECTED tier text (W10)**

Use exact dollar figures instead of ratios:

"The application wasn't collecting bad data — it was asking the wrong kind of questions. At $319 per final interview versus $15 at application review, the program filtered a full stage too late."

**Step 3: Apply matching decision section rewrite (G2)**

Same read-then-decide approach as Task 9 Step 6. The protected version has the same structure.

**Step 4: Verify parity**

Read both PA files' modified sections. The narrative arc should match even though specific figures differ.

---

### Task 11: CT content rewrites — draft insight callout options

**Files:**
- `work/contract-transfer-public/index.html`
- `work/contract-transfer/contract-transfer.html`

**Fixes:** W1 or D3.3, W8, G1, K2

**Step 1: Quality tracking paragraph — CUT or REWRITE (W1 / D3.3)**

**If Decision 3.3 = CUT:** Remove the quality tracking paragraph entirely (~lines 376-383 and the surrounding section if empty).

**If Decision 3.3 = REWRITE:** Replace the paragraph with:
"One 2023 launch deviated from quality standards within three months. The tracking framework caught it before it compounded — the only early warning the program had. Four of five launches maintained baseline quality; the fifth was caught and corrected within the quarter."

For CT protected: use "breach of contract" (lowercase, per Task 7) instead of "quality standards" if the protected version uses that terminology.

**Step 2: Ambiguous "it" pronoun (W8)**

Read the sentence around line 196 that has two "it"s with different antecedents. Replace each "it" with the specific noun it refers to.

**Step 3: Draft 2-3 insight callout options (G1) — PRESENT TO TAYLOR**

Read the CT results section to understand the narrative. Then draft 2-3 candidate callout texts. Examples of the style:

- Option A: "The fastest path to better outcomes wasn't faster decisions — it was catching unqualified candidates before the clock started."
- Option B: [compose based on the CT-specific narrative — the reframe from customer service to network protection]
- Option C: [compose based on the durability angle — the system that outlasted the person who built it]

**Present all options to Taylor. Wait for selection before inserting.**

Read the PA and PIN insight callouts first to match the component's HTML structure for insertion.

**Step 4: Reconcile 2.3 vs 2.28 (K2)**

Verify: "2.3" should appear in H1, tagline, and meta description. "2.28" should appear in body text and results detail. Fix any that deviate.

**Step 5: Verify**

```bash
grep -n "2\.3\|2\.28" work/contract-transfer-public/index.html
```
Confirm the pattern: rounded in headlines, precise in body.

---

### Task 12: CT protected content rewrites

**File:** `work/contract-transfer/contract-transfer.html`

**Fixes:** W1/D3.3 matching, G1 matching

**Step 1: Quality tracking paragraph — match CT public**

Apply the same cut or rewrite from Task 11 Step 1, using protected-tier terminology.

**Step 2: Add insight callout — use Taylor's selected text from Task 11**

Insert the same callout using the HTML structure matched from other callouts.

---

### Task 13: PIN content rewrites

**Files:**
- `work/pinnacle-public/index.html`
- `work/pinnacle-program-selection/pinnacle-automation.html`

**Fixes:** W11, D3.4 (if applicable), D3.5 (if applicable)

**Step 1: "What Changed" H2 — verify root cause count first (W11)**

In both files, read the section under the "What Changed" H2. **Count the actual root causes described.** Then write a tension-building headline with the CORRECT number:

- If 7: "Seven Root Causes Behind One Failing Spreadsheet"
- If 6: "Six Root Causes Behind One Failing Spreadsheet"
- If the count is unclear: use "The Root Causes Behind One Failing Spreadsheet" (no number)

Replace the H2 in both public and protected.

**Step 2: If Decision 3.4 = COLLAPSE — collapse post-automation section**

Reduce the post-automation section to 2-3 sentences keeping the strongest proof points (77% acceptance, zero exits, 2.7pp quality improvement). Remove the detail about CRM migration, heuristics allocation, etc.

**Step 3: If Decision 3.5 = TRIM — trim the superlative**

Find: "Leadership credited it by name in program documentation — the only workstream in that document attributed to a specific person."

Replace: "Leadership credited it by name in program documentation."

Apply to both public and protected.

---

### Task 14: Homepage content rewrites

**File:** `index.html`

**Fixes:** K1, D3.1 (if approved), D3.2 (if approved)

**Step 1: Tagline fix (K1)**

Find all occurrences of "AI Infrastructure & Systems Design" in:
- `<meta name="description">` (line ~8)
- `<meta property="og:description">` (line ~15)
- `<meta name="twitter:description">` (line ~25)
- Visible tagline (line ~49)

Replace with: **"Operational Systems & Process Design"**

**Step 2: If Decision 3.1 = APPROVE — reorder homepage cards**

Swap the CT and PA `<article class="work-card">` elements so CT appears first.

**Step 3: If Decision 3.2 = APPROVE — add "projected" to PA metric cards**

Add `<span class="metric-qualifier">projected</span>` (or similar small text) under the PA card's metric numbers. Check the card HTML structure first.

**Step 4: Verify**

```bash
grep -n "AI Infrastructure" index.html
```
Expected: 0 results

---

### Task 14a: Content-writer agent QA pass

> **REQUIRED:** After completing Tasks 9-14, dispatch the content-writer agent to review ALL rewritten sections.

**Prompt for content-writer agent:**

```
Read these files:
- docs/active/audit-phase1-standards.md (voice rules)
- docs/active/content-writing-standards.md (anti-patterns)

Then read these MODIFIED files and review ONLY the sections that were rewritten:
- work/partner-application-public/index.html (TL;DR, funnel paragraph, insight callout, decision section)
- work/cfa-dsp-application/dsp-application.html (funnel paragraph, insight callout, decision section)
- work/contract-transfer-public/index.html (quality paragraph, insight callout, ambiguous pronoun fix)
- work/contract-transfer/contract-transfer.html (matching sections)
- work/pinnacle-public/index.html (H2 headline)
- work/pinnacle-program-selection/pinnacle-automation.html (H2 headline)
- index.html (tagline)

For each rewritten section, check:
1. Voice: confident and direct, no self-congratulation, no weasel words
2. Front-loading: first sentence delivers the key point
3. Specificity: every claim has a number
4. Clarity: no re-reading needed, no ambiguous pronouns
5. Tier parity: public and protected versions match in arc (different in figures)

Report issues ONLY. If a section passes, don't mention it.
```

**If issues found:** Fix them before committing. Then re-run the agent on just the fixed sections.

**If clean:** Proceed to commit.

---

### Task 15: Commit content rewrites

```bash
git add work/ index.html
git commit -m "fix: content rewrites — clarity, callouts, and homepage tagline

- PA: split TL;DR bullet, anchor comparison labels, lead with conversion rate
- PA: reframe insight callout (tier-specific text), restructure decision section
- CT: [rewrite/cut] quality tracking paragraph, add insight callout
- CT: disambiguate pronouns, reconcile 2.3/2.28
- PIN: replace 'What Changed' H2 with verified tension headline
- Homepage: 'AI Infrastructure' → 'Operational Systems & Process Design'
[+ any approved Batch 3 items applied in this phase]

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 16: Batch 1 — anonymization fix (no decision needed)

**File:** `work/contract-transfer-public/index.html`

**Fix:** A1

**Step 1: Fix 39.6% anonymization gap**

```bash
grep -n "39\.6" work/contract-transfer-public/index.html
```

Find the exact occurrence and replace "39.6% of routes recover" with "fewer than 40% of routes recover" (or equivalent phrasing matching the sentence).

**Step 2: Verify**

```bash
grep -rn "39\.6" --include="*.html" work/contract-transfer-public/
```
Expected: 0 results

```bash
grep -rn '\$[0-9]' --include="*.html" work/contract-transfer-public/ work/partner-application-public/ work/pinnacle-public/
```
Expected: 0 (no dollar figures on public pages)

---

### Task 17: Batch 1 — math fixes (per Taylor's decisions)

**Files (depend on decisions):**
- `work/contract-transfer-public/index.html` (274% YoY)
- `work/contract-transfer/contract-transfer.html` (274% YoY, $482K×29)
- `index.html` (274% on homepage card)
- `work/cfa-dsp-application/dsp-application.html` (62% rejection)
- `resume.html` ($13M drift)

**Step 1: Apply F1 decision (274% YoY)**

Per Taylor's decision:
- **If "fix to 174%":** Find/replace `274%` → `174%` in CT public, CT protected, homepage, and PA public (if referenced in scope-context)
- **If "reword to 274% of prior year":** Rewrite the sentence in CT public + protected. Homepage card "274% YoY" may work as-is.
- **If "remove parenthetical":** Remove "(23 to 63)" from CT public + protected

**Step 2: Apply F2 decision ($482K × 29)**

Per Taylor's decision, fix in CT protected only (public uses "six figures"):
- Adjust whichever number Taylor specified

**Step 3: Apply F3 decision (PA 62% rejection)**

Per Taylor's decision, fix in PA protected only:
- Adjust the percentage or the count

**Step 4: Fix resume number drift (N1)**

In `resume.html`, standardize "$13M" / "$13M+" to match the resolved F2 value:
```bash
grep -n "13M" resume.html
```
Make both occurrences consistent.

**Step 5: Verify all math**

```bash
grep -rn "274\|482\|13M\|14M\|39\.6\|4,450\|4,831\|62%\|65%" --include="*.html" .
```
Confirm internal consistency across all pages.

---

### Task 18: Commit Batch 1 fixes

```bash
git add work/ index.html resume.html
git commit -m "fix(critical): math corrections, anonymization gap, number drift

- 274% YoY: [describe resolution]
- $482K × 29: [describe resolution]
- PA 62% rejection: [describe resolution]
- CT public: 39.6% → 'fewer than 40%' (anonymization compliance)
- Resume: standardize $13M qualifier

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Execution Phase C: Remaining Batch 3 + Batch 4

### Task 19: Batch 3 — remaining approved strategic changes

**Files:** Depend on which decisions Taylor approved

For each approved decision not already handled in Phase B:

- **D3.6 (CT icon cards — cut):** Remove the 4 icon cards from CT public + protected. Remove the icon additions from Task 4 and Task 4a if they were applied.
- **D3.7 (PA blocker — collapse):** Collapse "Near-Term Blocker" section to 1 paragraph in PA public + protected.
- **D3.8 (CT "owned e2e" — cut/rephrase):** Edit the sentence in CT protected (and PA if similar phrasing exists).

**Step 1:** For each approved decision, make the edit in both public and protected versions.

**Step 2: Verify narrative flow**

After any section cut or collapse, read the surrounding paragraphs to confirm the transition still works.

**Step 3: Commit**

```bash
git add work/
git commit -m "refactor: strategic content changes per audit recommendations

[list approved changes]

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 20: Batch 4 — polish fixes

**Files:**
- `work/contract-transfer-public/index.html` (em-dash entity)
- `index.html` (progress-bar.js position)

**Fixes:** K4, P1 (and any other approved Batch 4 items)

**Step 1: CT em-dash entity (K4)**

**Skip if CT quality paragraph was cut in D3.3.**

Find literal `—` characters in `work/contract-transfer-public/index.html` and replace with `&mdash;` for consistency.

**Step 2: progress-bar.js load position (P1)**

In `index.html`:
- Find `<script src="js/progress-bar.js"></script>` near `</body>`
- Move to `<head>` and add defer: `<script src="js/progress-bar.js" defer></script>`
- Remove the original `<script>` from the body

**Step 3: Any other approved Batch 4 items**

Review `docs/prompts/content-fixes-batch4.md` for items Taylor approved. Apply each.

**Step 4: Commit**

```bash
git add work/ index.html
git commit -m "style: polish fixes — entity consistency and script loading

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 21: Final verification

**Step 1: Full grep verification**

```bash
cd ~/Dev/_Projects/website-portfolio

# Anonymization
grep -rn '\$[0-9]' --include="*.html" work/contract-transfer-public/ work/partner-application-public/ work/pinnacle-public/

# Terminology
grep -rn "reward program" --include="*.html" .
grep -rn "trailing twelve" --include="*.html" .
grep -rn "SLA" --include="*.html" work/contract-transfer-public/
grep -rn "network average" resume.html
grep -rn "39\.6" --include="*.html" work/contract-transfer-public/

# Structural parity
grep -rn "blockquote.*pull-quote" --include="*.html" work/
grep -rn 'rel="preload"' --include="*.html" work/ | wc -l
```

Expected: terminology greps return 0 (except SLA returns 1 for table caption). Preloads return 6.

**Step 2: Run lint + non-visual tests**

```bash
npm run check
npm test
```

**Step 3: If visual regression tests fail — PAUSE for manual browser review**

Do NOT auto-update snapshots. Instead:

1. List which snapshot files changed
2. Describe what visual difference each change represents (e.g., "CT public icon cards now show emojis", "PA comparison box label changed")
3. **Stop and wait for Taylor to review the pages in-browser** at `http://localhost:8000`
4. Only update snapshots after Taylor confirms the visual changes are correct

```bash
# After Taylor confirms:
npx playwright test --update-snapshots
```

**Step 4: Commit snapshot updates**

```bash
git add tests/
git commit -m "test: update visual snapshots after content audit fixes

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 22: Merge to main

**Step 1: Review full diff**

```bash
git log --oneline main..fix/content-audit-fixes
git diff main..fix/content-audit-fixes --stat
```

**Step 2: Merge**

```bash
git checkout main
git merge fix/content-audit-fixes
```

**Step 3: Clean up**

```bash
git branch -d fix/content-audit-fixes
```

---

## Summary

| Phase | Tasks | Estimated Time | Blockers |
|-------|-------|---------------|----------|
| A: Structural + Terminology | Tasks 1-8 | ~30 min | None |
| Decision Gate 1 | — | Taylor's review | Batch 1 math + Batch 3 strategic |
| B: Content Rewrites + Batch 1 | Tasks 4a, 9-18 | ~60-90 min | Decision Gate 1 |
| B (QA): Content-writer review | Task 14a | ~15 min | Tasks 9-14 complete |
| C: Remaining Batch 3 + 4 | Tasks 19-20 | ~30 min | Decision Gate 1 |
| Final Verification | Tasks 21-22 | ~15 min | All above + manual browser review |
