<!-- project: website-portfolio -->

# Case Study HTML Build — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build three case study HTML pages from approved outlines (DSP Application, Contract Transfer, Pinnacle Selection), replacing existing pages at the same URL paths.

**Architecture:** Sequential build — DSP first as template, then CT and Pinnacle. Each page is a clean replacement of the existing HTML file using approved outline content, design tokens from `css/styles.css`, and components from `css/case-study.css`. Five new CSS components are needed (icon-card, pull-quote, tldr-collapsible, decision-card, cta-secondary). Five deferred UX questions have inline defaults (optionally consult `/trend-researcher`).

**Tech Stack:** HTML5, CSS custom properties (57 tokens), Chart.js 4.4.7 (CDN), Playwright tests, ESLint + Stylelint + html-validate + Prettier

**Source Files:**

- `work/cfa-dsp-application/outline-approved.md` — DSP outline + build spec
- `work/contract-transfer/outline-approved.md` — CT outline + build spec
- `work/pinnacle-program-selection/outline-approved.md` — Pinnacle outline + build spec
- `ref/components.md` — component library reference
- `ref/css-tokens.md` — design token reference
- `docs/active/content-writing-standards.md` — voice and tone rules

**Existing Files to Replace (clean replacement):**

- `work/cfa-dsp-application/dsp-application.html`
- `work/contract-transfer/contract-transfer.html`
- `work/pinnacle-program-selection/pinnacle-automation.html`

---

## Task 0: Research — Trend + Design Consultations

Five UX decisions were deferred to `/trend-researcher` during the interview. Consult `/trend-researcher` if time allows; otherwise use the inline defaults below and proceed.

**Files:** None modified — decisions recorded in this plan.

**Step 1: TL;DR collapsible state**
Question: Expanded or collapsed by default? Context: hiring managers, 15-second scan, 8-12 min read.
**Default if skipped:** Collapsed. Hiring managers who want it will click; doesn't consume prime real estate for scanners.

**Step 2: Outcome table column standardization**
Question: Standardized (Before/After) or unique labels per page (Inherited/Built, Before/Target)?
**Default if skipped:** Unique labels per page. CT's "Inherited/Built" is more evocative; DSP's "Before/Target (projected)" is accurate. Consistency across pages matters less than clarity within each page.

**Step 3: Lessons Worth Stealing styling**
Question: Visually distinct or standard section styling?
**Default if skipped:** Visually distinct — subtle `--color-bg-alt` background with left accent border. Makes the section scannable-by-scroll (findable without reading headings).

**Step 4: Page navigation on long case studies**
Question: Progress bar only, sticky sidebar TOC, or horizontal anchor links below hero?
**Default if skipped:** Progress bar only (already exists). Case studies are 8-12 minutes — not long enough for a sticky TOC. Anchor strip adds complexity for marginal value at this length.

**Step 5: Scope callout constraint placement**
Question: Constraints in metadata callout, problem narrative, or both?
**Default if skipped:** Both. Callout gets the constraint visible during scan; narrative weaves it into the story. The constraint IS the story for all three case studies.

**Step 6: Record resolved answers**
If `/trend-researcher` was consulted, update defaults above. Otherwise proceed with defaults to Task 1.

---

## Task 1: New CSS Components

Four new components needed. Add to `css/case-study.css`.

**Files:**

- Modify: `css/case-study.css` (append new components)
- Reference: `ref/css-tokens.md` for token values
- Reference: `ref/components.md` (update after adding)

### Step 1: Write icon-card component CSS

Add to `css/case-study.css`. The icon-card is a 2x2 grid (stacking to 1-col on mobile) for CT's "Four Failures" section. Each card has an icon area, bold title, and 1-2 sentence description.

```css
/* Icon Cards — 2x2 grid for problem decomposition */
.icon-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  margin: 3rem 0;
}

@media (min-width: 640px) {
  .icon-cards {
    grid-template-columns: 1fr 1fr;
  }
}

.icon-card {
  padding: var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.icon-card-icon {
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
  color: var(--color-accent);
}

.icon-card-title {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: var(--space-xs);
  color: var(--color-text);
}

.icon-card-desc {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.6;
}
```

### Step 2: Write pull-quote component CSS

Styled closing quote with accent treatment for case study thesis statements.

```css
/* Pull Quote — closing thesis statement */
.pull-quote {
  position: relative;
  padding: 3rem 3rem 3rem 4rem;
  margin: 4rem 0;
  border-left: 4px solid var(--color-accent);
  background: var(--color-surface);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.pull-quote::before {
  content: '\201C';
  position: absolute;
  top: var(--space-md);
  left: var(--space-md);
  font-size: 3rem;
  font-family: var(--font-sans);
  color: var(--color-accent);
  line-height: 1;
  opacity: 0.3;
}

.pull-quote p {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0;
}
```

### Step 3: Write TL;DR collapsible component CSS

Collapsible summary near the top of case study pages.

```css
/* TL;DR Collapsible Summary */
.tldr-summary {
  margin: var(--space-lg) 0 3rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.tldr-summary summary {
  padding: var(--space-md) var(--space-lg);
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted);
  cursor: pointer;
  user-select: none;
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.tldr-summary summary::before {
  content: '\25B6';
  font-size: 0.7em;
  transition: transform 0.2s ease;
}

.tldr-summary[open] summary::before {
  transform: rotate(90deg);
}

.tldr-summary summary::-webkit-details-marker {
  display: none;
}

.tldr-summary .tldr-content {
  padding: 0 var(--space-lg) var(--space-lg);
}

.tldr-summary .tldr-content ul {
  margin: 0;
  padding-left: var(--space-lg);
}

.tldr-summary .tldr-content li {
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: var(--space-sm);
  color: var(--color-text);
}
```

### Step 4: Write decision-card component CSS

Side-by-side comparison cards with chosen/rejected states for CT's Option A/B.

```css
/* Decision Cards — side-by-side option comparison */
.decision-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  margin: 3rem 0;
}

@media (min-width: 640px) {
  .decision-cards {
    grid-template-columns: 1fr 1fr;
  }
}

.decision-card {
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  border: 2px solid var(--color-border);
}

.decision-card.rejected {
  opacity: 0.65;
  border-color: var(--color-border);
  background: var(--color-surface);
}

.decision-card.chosen {
  border-color: var(--color-accent);
  background: var(--color-accent-light, rgba(26, 58, 107, 0.12));
}

.decision-card-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-sm);
}

.decision-card.rejected .decision-card-label {
  color: var(--color-muted);
}

.decision-card.chosen .decision-card-label {
  color: var(--color-accent);
}

.decision-card-title {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: var(--space-sm);
  color: var(--color-text);
}

.decision-card-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-muted);
}
```

### Step 5: Write CTA secondary link CSS

The existing `.cs-cta` has a button but no secondary link styling. Add:

```css
/* CTA secondary link */
.cs-cta .secondary-link {
  display: block;
  text-align: center;
  margin-top: var(--space-md);
  font-size: 0.875rem;
  color: var(--color-muted);
}

.cs-cta .secondary-link a {
  color: var(--color-muted);
  text-decoration: underline;
}
```

### Step 6: Run Stylelint

Run: `npx stylelint css/case-study.css --fix`
Expected: PASS (no errors)

### Step 7: Update ref/components.md

Add entries for icon-card, pull-quote, tldr-summary, decision-card, and CTA secondary link with usage snippets matching the patterns above.

### Step 8: Commit

```bash
git add css/case-study.css ref/components.md
git commit -m "feat: add 5 new case study components (icon-card, pull-quote, tldr, decision-card, cta-secondary)"
```

---

## Task 2: DSP Application Page (Template)

Build the first page. This establishes patterns for CT and Pinnacle.

**Files:**

- Replace: `work/cfa-dsp-application/dsp-application.html`
- Reference: `work/cfa-dsp-application/outline-approved.md`

### Step 1: Read existing page and outline

Read: `work/cfa-dsp-application/dsp-application.html` (understand current head tags, OG meta, canonical URL)
Read: `work/cfa-dsp-application/outline-approved.md` (content source + build spec)

### Step 2: Write complete HTML page

Replace `dsp-application.html` with new content. Follow this structure:

```
<head>
  - Keep: charset, viewport, robots, theme-color, favicon, preconnect
  - Update: title, meta description (use headline card text from outline)
  - Update: OG tags (og:title, og:description)
  - Keep: canonical URL (https://taylorstephens.io/work/cfa-dsp-application/)
  - Keep: CSS includes (fonts.css, styles.css, case-study.css)
  - Keep: Chart.js CDN if page has charts (DSP: TBD from /web-artifact-builder)
  - Keep: progress-bar.js defer

<body>
  <div class="reading-progress"></div>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <nav class="back-nav">...</nav>

  <main id="main-content" class="case-study">
    <header class="cs-header">
      <h1>74% of the people who started Amazon's delivery partner application never finished it.</h1>
      <p class="cs-tagline">Competitive Intelligence | 17 Global Markets | 0.25 → 4.6 Engineers Secured</p>
      <div class="tech-pills">
        <span class="tech-pill">Marketing Automation</span>
        <span class="tech-pill">CMS Architecture</span>
        <span class="tech-pill">Statistical Analysis</span>
        <span class="tech-pill">Chick-fil-A Benchmark</span>
      </div>
    </header>

    <!-- TL;DR collapsible (expanded/collapsed per Task 0 research) -->
    <details class="tldr-summary" [open if research says expanded]>
      <summary>Quick Summary</summary>
      <div class="tldr-content">
        <ul>
          [3 bullets from outline's Reusable Extracts, anonymized]
        </ul>
      </div>
    </details>

    <!-- Scope callout (constraint placement per Task 0 research) -->
    <div class="scope-callout">
      <div class="scope-item"><span class="scope-label">Timeline</span><span class="scope-value">Oct 2023 - Q1 2024</span></div>
      <div class="scope-item"><span class="scope-label">My Role</span><span class="scope-value">Program Manager, DSP Acquisitions</span></div>
      <div class="scope-item"><span class="scope-label">Teams</span><span class="scope-value">Acquisitions, Engineering, Senior Leadership</span></div>
      <div class="scope-item"><span class="scope-label">Artifacts</span><span class="scope-value">BRD (101 requirements), Tech Vision 2025, OP1 escalation</span></div>
    </div>

    <!-- Problem section -->
    <section class="cs-section" id="problem">
      <h2>The $2.1M+ Problem</h2>
      [Content from outline "The $2.1M Problem" section]
      [Anonymize: "SDEs" → "engineers", dollar ranges → "$2.1M+"]
    </section>

    <!-- Benchmark section -->
    <section class="cs-section" id="benchmark">
      <h2>What the Benchmark Revealed</h2>
      [Content from outline]
      [CFA stays named]
      <!-- comparison component: Amazon (before) vs CFA (benchmark) -->
      <div class="comparison">
        <div class="comparison-before">
          <div class="comparison-label">Amazon Application</div>
          <p>60+ fields, open-ended questions, 3+ hours, inconsistent data</p>
        </div>
        <div class="comparison-after">
          <div class="comparison-label">CFA Application</div>
          <p>80+ fields, structured dropdowns, under 1 hour, scoreable responses</p>
        </div>
      </div>
      [ANOVA: narrative only — "Statistical analysis of 25,830 records confirmed reviewer scores diverged measurably"]
    </section>

    <!-- Solution section -->
    <section class="cs-section" id="solution">
      <h2>From CFA Application to $10.9M+ Roadmap</h2>
      [Content from outline]
      [Anonymize: "Pardot" → keep (Salesforce product, not Amazon-internal)]
      [Anonymize: "OP1" → "annual operating plan" first use]
      [Anonymize: "SDEs" → "engineers"]
    </section>

    <!-- Pardot decision -->
    <section class="cs-section" id="decision">
      <h2>The Pardot Decision</h2>
      [Content from outline — short section, insight-callout style]
    </section>

    <!-- Results section -->
    <section class="cs-section" id="results">
      <h2>9,419 More Approved Applications Per Year</h2>
      <div class="insight-callout">
        <p>[Framing sentence before metrics]</p>
      </div>
      <div class="metrics-row">
        [4 metric-cards: completion rate, inclination rate, dev cycle, engineers secured]
        [Ranges rounded: $2.1M+, $10.9M+]
      </div>
      <!-- data-table: Before / Target (projected) -->
      <div class="data-table-wrapper">
        <table class="data-table">
          <caption>Column header "Target (projected)" + one-sentence explanation per build spec</caption>
          [Table from outline with anonymized terms]
        </table>
      </div>
      [Placeholder figure elements for visual assets]
    </section>

    <!-- Lessons section -->
    <section class="cs-section" id="lessons">
      <h2>Lessons Worth Stealing</h2>
      <ul class="lessons-list">
        [4 lessons from outline, verbatim]
      </ul>
    </section>

    <!-- Pull quote -->
    <div class="pull-quote">
      <p>[Closing thesis — write one for DSP since outline doesn't have one.
      Suggestion: "The application wasn't collecting bad data — it was asking
      the wrong kind of questions. The fix wasn't fewer questions. It was
      better ones."]</p>
    </div>

    <!-- CTA block -->
    <section class="cs-cta">
      <a href="../contract-transfer/contract-transfer.html" class="cta-button">
        Read next: Contract Transfer Process Redesign <span class="arrow">&rarr;</span>
      </a>
      <p><a href="../../index.html#contact">Get in touch</a></p>
    </section>
  </main>

  <footer>
    <p>&copy; <span id="copy-year">2026</span> Taylor Stephens. All rights reserved.</p>
  </footer>

  [Chart.js inline script if page has charts — token-driven pattern from CLAUDE.md]
</body>
```

### Step 3: Run html-validate

Run: `npx html-validate work/cfa-dsp-application/dsp-application.html`
Expected: PASS

### Step 4: Run full check suite

Run: `npm run check`
Expected: PASS (lint + html-validate + linkinator)

### Step 5: Run Playwright tests

Run: `npm test`
Expected: Most tests PASS. Visual regression tests will FAIL (expected — page content changed).

### Step 6: Review and fix any test failures

Fix any a11y violations, layout overflow, or missing elements flagged by tests.
Do NOT update visual snapshots yet — wait until all 3 pages are built.

### Step 7: Commit

```bash
git add work/cfa-dsp-application/dsp-application.html
git commit -m "feat: rebuild DSP Application case study from approved outline"
```

---

## Task 3: Contract Transfer Page

**Files:**

- Replace: `work/contract-transfer/contract-transfer.html`
- Reference: `work/contract-transfer/outline-approved.md`

### Step 1: Read existing page and outline

Read both files to understand current structure and new content.

### Step 2: Write complete HTML page

Follow same structure as DSP (Task 2) with CT-specific components:

**CT-specific elements:**

- **TL;DR**: 3-bullet summary from outline
- **Problem section**: Use `icon-cards` component (2x2 grid) for "Four Failures Compounding at $482K+ Each" — 4 icon-cards, each with bold title + 1-2 sentence description
- **Decision section**: Use `decision-cards` component — Option A (`.rejected`) vs Option B (`.chosen`) side-by-side
- **Solution subsections**: Keep H3 subsections from outline ("70% faster decisions", "19 templates", "The Playbook", "100% consensus")
- **5-phase lifecycle**: Use `/web-artifact-builder` output (from Task 0) or process-timeline component
- **Results**: data-table with "Inherited / Built" columns (or standardized per Task 0 research). Metrics-row for headline numbers.
- **Chart.js**: Defect category breakdown (56/20/12/12%) — doughnut or bar chart, token-driven pattern
- **Pull quote**: "A process held together by one person's tribal knowledge is not a process — it's a liability."
- **CTA**: "Read next: Selection Automation" → `../pinnacle-program-selection/pinnacle-automation.html`

**Anonymization (per build spec):**

- BCs → "field coaches"
- BDMs → "development managers"
- DRR → "screening team"
- DSS → "support services"
- WBR → "weekly review" or describe function
- NH → "network operations"
- Capacity Reliability → "network capacity" or define
- No internal quotes

### Step 3: Run html-validate

Run: `npx html-validate work/contract-transfer/contract-transfer.html`
Expected: PASS

### Step 4: Run check + test

Run: `npm run check && npm test`
Expected: Lint PASS. Visual tests FAIL (expected).

### Step 5: Fix any test failures

Fix a11y, layout, or structural issues.

### Step 6: Commit

```bash
git add work/contract-transfer/contract-transfer.html
git commit -m "feat: rebuild Contract Transfer case study from approved outline"
```

---

## Task 4: Pinnacle Selection Page

**Files:**

- Replace: `work/pinnacle-program-selection/pinnacle-automation.html`
- Reference: `work/pinnacle-program-selection/outline-approved.md`

### Step 1: Read existing page and outline

Read both files.

### Step 2: Write complete HTML page

Follow same structure as DSP/CT with Pinnacle-specific components:

**CRITICAL: `<title>` tag must contain "Automation"** — `pages.spec.js` line 30 asserts `title: /Automation/i`. Use a title like `"Selection Automation | Taylor Stephens"` or `"Pinnacle Automation | Taylor Stephens"`. If a different title is preferred, update `tests/pages.spec.js` line 30 AND `tests/a11y.spec.js`, `tests/layout.spec.js`, `tests/link-chain.spec.js` to match.

**Pinnacle-specific elements:**

- **TL;DR**: 3-bullet summary
- **Problem section**: 5 compressed root cause bullets (mention "8 root causes diagnosed" in narrative)
- **Decision section (H2)**: "The Decision That Made Eligibility Deterministic" — Haversine explanation, narrative only (no formula syntax)
- **Solution**: 6-stage pipeline as numbered list, one sentence per stage. Narrative only — no SQL table names or function signatures.
- **Eligibility funnel**: Use `/web-artifact-builder` output or Chart.js horizontal bar (2,620 → 222 → ~180 → ~160 → ~140 → output)
- **Results**: data-table with Before/After columns. Metrics-row for headline numbers.
- **Pull quote**: "A reward mechanism is only as good as the infrastructure behind it. When top performers don't receive the opportunities they've earned, the program hasn't failed — the process has."
- **CTA**: "Read next: DSP Application Redesign" → `../cfa-dsp-application/dsp-application.html`

**Anonymization (per build spec):**

- "Amazon Redshift" → "data warehouse"
- "Who's My Neighbor Dashboard" → "the proximity tool" or "the distance dashboard"
- LRP → "capacity planning" / BDM → "outreach team" / WBR → "weekly reporting"
- RTT/R2O/RTE/RTO → described by function (already done in outline)
- MSO → "vetting" / NH → "network performance"
- MMRO, XL, ZL → omit or genericize
- Haversine stays named (public math concept)

### Step 3: Run html-validate + check + test

Run: `npm run check && npm test`
Expected: Lint PASS. Visual tests FAIL (expected).

### Step 4: Fix any test failures

### Step 5: Commit

```bash
git add work/pinnacle-program-selection/pinnacle-automation.html
git commit -m "feat: rebuild Pinnacle Selection case study from approved outline"
```

---

## Task 5: Test Suite Pass

All three pages are built. Run the full test suite and fix issues.

**Files:**

- May modify: all 3 HTML files for fixes
- Reference: `tests/*.spec.js`

### Step 1: Run full lint suite

Run: `npm run check`
Expected: PASS
Fix: any ESLint, Stylelint, html-validate, or Prettier issues

### Step 2: Run Playwright tests (excluding visual)

Run: `npx playwright test --grep-invert visual`
Expected: PASS on pages, a11y, layout, link-chain, assets, changelog specs

### Step 3: Fix any a11y violations

Common issues: missing alt text on figures, color contrast on new components, ARIA labels.

### Step 4: Fix any layout overflow

Check 390px, 1280px, 320px viewports. Common issues: data tables on mobile, icon-cards at narrow widths.

### Step 5: Fix any link-chain failures

Verify Next: links point to correct paths and return 200.

### Step 6: Commit fixes

```bash
git add -A
git commit -m "fix: resolve test failures across 3 rebuilt case studies"
```

---

## Task 6: Visual Regression Snapshots

All pages passing non-visual tests. Update visual regression baselines.

**Files:**

- Update: `tests/visual.spec.js-snapshots/` (auto-generated)

### Step 1: Update visual snapshots

Run: `npx playwright test visual --update-snapshots`
Expected: All 11 pages x 2 viewports regenerated

### Step 2: Review snapshots

Open the snapshot directory and visually inspect the 6 new screenshots (3 pages x 2 viewports) for:

- Correct heading hierarchy
- Component rendering (icon-cards, decision-cards, pull-quote, tldr)
- No layout breaks
- Readable text at both viewports

### Step 3: Run full test suite (final)

Run: `npm test`
Expected: ALL PASS

### Step 4: Commit

```bash
git add tests/
git commit -m "test: update visual regression snapshots for rebuilt case studies"
```

---

## Task 7: Final Verification + Ship

### Step 1: Run /check skill

Run the full check skill to verify everything passes.

### Step 2: Local preview

Run: `python3 -m http.server 8000`
Open each page in browser:

- http://localhost:8000/work/cfa-dsp-application/dsp-application.html
- http://localhost:8000/work/contract-transfer/contract-transfer.html
- http://localhost:8000/work/pinnacle-program-selection/pinnacle-automation.html

### Step 3: Verify link chain

Click through: DSP → CT → Pinnacle → DSP. All links work.

### Step 4: Verify Chart.js

Charts render with token-driven colors (not hardcoded hex). Check CT defect chart and Pinnacle funnel.

### Step 5: Verify anonymization

Search each page for Amazon-internal terms that should be anonymized:

- No "BCs", "BDMs", "DRR", "DSS", "WBR", "NH", "MSO", "OP1", "SDEs" without definition/replacement
- No "Amazon Redshift", "Who's My Neighbor Dashboard"
- CFA/Chick-fil-A and Haversine ARE named (public)
- No verbatim internal quotes

### Step 6: Final commit

```bash
git add -A
git commit -m "feat: ship 3 rebuilt case studies (DSP, CT, Pinnacle)"
```

---

## Definition of Done (from CLAUDE.md)

For each page, verify:

- [ ] Paths correct for depth (`../../` for work pages)
- [ ] Has `<link rel="canonical">` pointing to production URL
- [ ] Has `<div class="reading-progress"></div>` as first `<body>` child
- [ ] Has `<script src="../../js/progress-bar.js" defer>`
- [ ] "Next:" link chain updated (circular: DSP → CT → Pinnacle → DSP)
- [ ] Chart.js uses token-driven pattern (no hardcoded colors)
- [ ] All 4 test files pass (pages, a11y, layout, visual)
- [ ] `npm run check` and `npm test` pass

## Post-Ship (Separate Tasks, Not in This Plan)

- Homepage card rewrite (after pages ship)
- Visual asset creation (placeholder figures → real screenshots)
- `/trend-researcher` consultations to refine Task 0 defaults (if not done during build)
- `/web-artifact-builder` for process flow and funnel visualizations
