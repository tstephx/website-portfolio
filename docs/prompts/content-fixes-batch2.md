# Batch 2: SHOULD FIX — Affects Hiring Manager Perception

_Clarity, flow, voice, structural parity, accessibility. No blockers — can execute immediately._

---

## Part A: Structural / Accessibility Fixes

These are mechanical find-and-replace operations. Do all 6 first, then move to Part B (content rewrites).

### Fix 2.1: Pull Quote Tag Mismatch (S1)

**Files:**

- `work/cfa-dsp-application/dsp-application.html` (PA protected)
- `work/pinnacle-program-selection/pinnacle-automation.html` (PIN protected)

**In each file:**

- Find: `<blockquote class="pull-quote">`
- Replace: `<aside class="pull-quote">`
- Find: `</blockquote>` (the matching closing tag for the pull quote)
- Replace: `</aside>`

**Verification:**

```bash
grep -rn "blockquote.*pull-quote\|pull-quote.*blockquote" --include="*.html" .
# Should return 0 results
grep -rn "aside.*pull-quote" --include="*.html" .
# Should return 6 results (1 per case study page)
```

### Fix 2.2: Data Table Accessibility (S2 + S3)

**Files:** All 3 protected case study pages

**Step 1 — Add id to `<caption>` elements:**

`work/cfa-dsp-application/dsp-application.html`:

- Find: `<caption>` (in the data table)
- Replace: `<caption id="metrics-caption">`

`work/contract-transfer/contract-transfer.html`:

- Find: `<caption>` (in the defect data table)
- Replace: `<caption id="defect-caption">`

`work/pinnacle-program-selection/pinnacle-automation.html`:

- Find: `<caption>` (in the transformation table)
- Replace: `<caption id="transform-caption">`

**Step 2 — Add `role` and `aria-labelledby` to table wrappers:**

In each file, find the `<div class="data-table-wrapper"` (or similar wrapper with `tabindex="0"`) and add:

- `role="region"`
- `aria-labelledby="[matching-caption-id]"`

Example for PA protected:

- Find: `<div class="data-table-wrapper" tabindex="0">`
- Replace: `<div class="data-table-wrapper" tabindex="0" role="region" aria-labelledby="metrics-caption">`

Repeat for CT (`defect-caption`) and PIN (`transform-caption`).

**Verification:**

```bash
grep -rn "aria-labelledby" --include="*.html" work/
# Should show matches on all 6 case study pages (3 public already have it, 3 protected now added)
grep -rn 'caption id=' --include="*.html" work/
# Should show matches on all 6 pages
```

### Fix 2.3: CT Icon Card Emoji Parity + Accessibility (S4 + X1)

**File 1: `work/contract-transfer-public/index.html`** — Add emoji icons to match protected version

Find each icon card `<div class="icon-card">` and add the emoji div before the heading. The protected version has these emojis:

- Card 1 (Documentation): 📋 (`&#x1F4CB;`)
- Card 2 (Communication): 📨 (`&#x1F4E8;`)
- Card 3 (Evaluation): 🔍 (`&#x1F50D;`)
- Card 4 (Visibility): ⚠️ (`&#x26A0;&#xFE0F;`)

For each icon card, add as first child:

```html
<div class="icon-card-icon" aria-hidden="true">&#x1F4CB;</div>
```

(Use the appropriate emoji code for each card.)

**File 2: `work/contract-transfer/contract-transfer.html`** — Add `aria-hidden="true"` to existing emoji icons

- Find: `<div class="icon-card-icon">`
- Replace: `<div class="icon-card-icon" aria-hidden="true">`
- Apply to all 4 icon cards

**Verification:**

```bash
grep -rn "icon-card-icon" --include="*.html" work/contract-transfer*/
# Should show 4 matches per file (8 total), all with aria-hidden="true"
```

### Fix 2.4: PIN Protected `<th>` Missing `scope="col"` (X2)

**File: `work/pinnacle-program-selection/pinnacle-automation.html`**

Find the transformation/before-after table's `<th>` elements in the `<thead>` row and add `scope="col"`:

- Find: `<th>` (in the table header row)
- Replace: `<th scope="col">`

Only apply to `<thead>` `<th>` elements, not any row headers.

**Verification:**

```bash
grep -rn 'scope="col"' --include="*.html" work/pinnacle*/
# Both public and protected should now have scope="col"
```

### Fix 2.5: Font Preload Links (X3)

**Files:** All 3 protected case study pages

Copy the font preload `<link>` tags from any public case study's `<head>` and add them to each protected page's `<head>`.

The preload links to add (get exact URLs from the public version):

```html
<link
  rel="preload"
  href="../../css/fonts/CormorantGaramond-[weight].woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="../../css/fonts/Newsreader-[weight].woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**Important:** Check that the `href` paths are correct for the protected page's directory depth (both public and protected case studies are 2 levels deep, so `../../` should be the same).

**Step:** Read one public case study's `<head>` to get the exact preload links, then copy them into all 3 protected pages.

**Verification:**

```bash
grep -rn "rel=\"preload\"" --include="*.html" work/
# Should show preload links on all 6 case study pages
```

---

## Part B: Content Fixes

### Fix 2.6: CT Quality Tracking Paragraph (W1)

**Files:** `work/contract-transfer-public/index.html` AND `work/contract-transfer/contract-transfer.html`

Find the quality tracking paragraph (around lines 376-383 on public). It currently reads something like:

> "The quality tracking framework proved its value three months after one 2023 launch, when it flagged a deviation in compliance incidents—not a catastrophic failure, but a leading indicator... Four of five launches maintained quality..."

**Replace with:**

> "One 2023 launch deviated from quality standards within three months. The tracking framework caught it before it compounded — the only early warning the program had. Four of five launches maintained baseline quality; the fifth was caught and corrected within the quarter."

Adjust the protected version to use "Breach of Contract" terminology (lowercase per Fix 2.23/R2) instead of "compliance incidents."

### Fix 2.7: CT Defect Table "Cases" Column (W2)

**Files:** CT public AND CT protected

- Find the `<th>` containing "Cases" in the defect distribution table
- Replace: `<th>Defect Instances</th>`

Optionally, add a `<caption>` note: "A single case may have multiple defects."

### Fix 2.8: PIN "reward program" → "expansion program" (W3)

**File: `work/pinnacle-public/index.html`**

- Find: `A reward program for top-performing delivery partners` (TL;DR, ~line 63)
- Replace: `An expansion program for top-performing delivery partners`

Check for any other "reward program" on the public page and change to "expansion program" for consistency.

**Verification:**

```bash
grep -rn "reward program" --include="*.html" work/pinnacle-public/
# Should return 0 results
```

### Fix 2.9: PA TL;DR Third Bullet (W4)

**File: `work/partner-application-public/index.html`**

Find the TL;DR third bullet (~lines 69-71). Currently something like:

> "An evidence chain — requirements specification, technology roadmap, annual planning escalation — secured 3.8 engineers..."

**Replace with two sentences:**

> "An evidence chain — requirements specification, technology roadmap, annual planning escalation — secured the case. Engineering allocation grew from 0.25 to 3.8."

### Fix 2.10: PA Comparison Card Labels (W5)

**File: `work/partner-application-public/index.html`**

- Find: `Current Application` (in comparison box header/label)
- Replace: `Original Application (2018)`

Leave "Benchmark Application" as-is.

### Fix 2.11: PIN "trailing twelve months" (W6)

**Files:** PIN public AND PIN protected

- Find: `trailing twelve months`
- Replace: `past twelve months`

### Fix 2.12: CT "SLA" → "target" (W7)

**File: `work/contract-transfer-public/index.html`**

- Find: `7-week SLA`
- Replace: `7-week target`

(Check for other "SLA" mentions on this page and replace similarly.)

### Fix 2.13: CT Ambiguous "it" Pronoun (W8)

**File: `work/contract-transfer-public/index.html`**

Find the sentence around line 196 with two "it"s that have different antecedents. Read the exact sentence, then rewrite to make each "it" unambiguous — replace with the specific noun each refers to.

### Fix 2.14: PA Funnel Punchline (W9)

**Files:** PA public AND PA protected

In the funnel paragraph, move the "2% end-to-end conversion rate" to the opening position:

**Current structure:** [pipeline details]... "A 2% end-to-end conversion rate."
**New structure:** "A 2% end-to-end conversion rate. [pipeline details showing how the funnel narrows]..."

### Fix 2.15: PA Insight Callout (W10)

**File: `work/partner-application-public/index.html`**

Find the `<aside class="insight-callout">` (or similar). Currently a timeline summary. Rewrite to frame why the numbers matter:

**Example rewrite:**

> "The application wasn't collecting bad data — it was asking the wrong kind of questions. By the time reviewers could evaluate a candidate, the program had already spent $319 per interview on people who would never qualify."

(Adjust for public version — use anonymized figures: "20× more expensive" instead of "$319.")

### Fix 2.16: PIN "What Changed" H2 (W11)

**Files:** PIN public AND PIN protected

- Find: `<h2>What Changed</h2>` (or similar)
- Replace: `<h2>Seven Root Causes Behind One Failing Spreadsheet</h2>` (or similar — add tension, reference the diagnostic work)

### Fix 2.17: CT Missing Insight Callout (G1)

**Files:** CT public AND CT protected

Add an `<aside class="insight-callout">` before the results metrics row. Content should frame the strategic insight — something like:

> "The fastest path to better outcomes wasn't faster decisions — it was catching unqualified candidates before the clock started."

(Or whatever framing fits the CT narrative. Read the results section to identify the right insight.)

### Fix 2.18: PA Decision Section (G2)

**Files:** PA public AND PA protected

Restructure the decision section to lead with why the obvious choice was wrong:

**Current flow:** "3 options → here's what I picked"
**Better flow:** "The obvious choice was [X] — but [reason it was wrong] → the actual decision was [Y]"

### Fix 2.19: Homepage Tagline (K1)

**File: `index.html`**

- Find: `AI Infrastructure & Systems Design` (in meta description, og:description, twitter:description, and tagline)
- Replace with something that matches the case studies: e.g., `Operational Systems & Process Design` or `Systems Design & Program Operations`

**Important:** Update ALL 4 locations (meta, og, twitter, visible tagline) to stay consistent.

### Fix 2.20: CT 2.3 vs 2.28 Reconciliation (K2)

**File: `work/contract-transfer-public/index.html`**

Check: Is the meta description using "2.3" while the results section uses "2.28"? Confirm the convention: "2.3" in headlines/H1/tagline/meta, "2.28" in detailed body text. Fix any that deviate.

### Fix 2.21: Resume "network average" (K3)

**File: `resume.html`**

- Find: `network average`
- Replace: `program average`

### Fix 2.22: PA Protected BRD Expansion (R1)

**File: `work/cfa-dsp-application/dsp-application.html`**

- Find: `BRD` (first occurrence, ~line 160)
- Replace: `business requirements document (BRD)`

### Fix 2.23: CT "Breach of Contract" Capitalization (R2)

**File: `work/contract-transfer/contract-transfer.html`**

- Find: `Breach of Contract` (in prose, not headings — ~lines 372-377)
- Replace: `breach of contract`

---

## Post-Batch 2 Verification

```bash
# 1. Accessibility attributes check
grep -rn "aria-labelledby\|role=\"region\"\|scope=\"col\"\|aria-hidden" --include="*.html" work/

# 2. Pull quote consistency
grep -rn "pull-quote" --include="*.html" work/ | grep -v "aside"
# Should return 0 (all pull quotes should now be <aside>)

# 3. Font preloads
grep -rn "rel=\"preload\"" --include="*.html" work/
# Should show on all 6 case study pages

# 4. Terminology consistency
grep -rn "reward program" --include="*.html" work/pinnacle-public/
# Should return 0
grep -rn "trailing twelve" --include="*.html" .
# Should return 0
grep -rn "SLA" --include="*.html" work/contract-transfer-public/
# Should return 0
grep -rn "network average" resume.html
# Should return 0

# 5. Run full test suite
npm run check && npm test
```
