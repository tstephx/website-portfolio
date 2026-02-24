# CSS Design System Upgrade — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement 20 design fixes from two review documents, consolidating hardcoded values into a layered custom property system that propagates changes across all pages.

**Architecture:** Extends the existing `:root` token system in `css/styles.css`. All hardcoded values become tokens. Fluid `clamp()` functions replace font-size overrides across 3 media queries. New accessibility, animation, and future-ready rules are added to both `css/styles.css` (global) and `css/case-study.css` (components). Three minimal HTML touches across 11 pages.

**Tech Stack:** Pure CSS custom properties, `clamp()`, `@supports`, `animation-timeline`, `:focus-visible`, `prefers-reduced-motion`, `text-wrap`, vanilla JS (8-line fallback).

**Design doc:** `docs/plans/2026-02-12-css-design-system-upgrade.md`

---

## File Inventory

| File | Role |
|------|------|
| `css/styles.css` | Global styles + `:root` tokens (728 lines) |
| `css/case-study.css` | Case study components (915 lines) |
| `js/progress-bar.js` | **New** — 8-line JS fallback for reading progress bar |
| `index.html` | Homepage |
| `work/contract-transfer/contract-transfer.html` | Work case study |
| `work/bpr-scoring-pinnacle/pinnacle-scoring.html` | Work case study |
| `work/cfa-dsp-application/dsp-application.html` | Work case study |
| `work/pinnacle-program-selection/pinnacle-automation.html` | Work case study |
| `projects/agentic-pipeline.html` | Project case study |
| `projects/book-library-mcp.html` | Project case study |
| `projects/claude-innit.html` | Project case study |
| `projects/mcp-ecosystem.html` | Project case study |
| `projects/tap-sevenrooms.html` | Project case study |
| `projects/lab-environment.html` | Project case study |

---

### Task 1: Add Extended Token System to `:root`

**Files:**
- Modify: `css/styles.css:2-20` (`:root` block)

**Step 1: Fix WCAG contrast on `--color-light`**

In `css/styles.css:6`, change:
```css
    --color-light:        #a0a0a0;
```
to:
```css
    --color-light:        #767676;
```

This fixes a WCAG AA failure (was 2.97:1, now 4.54:1 against white).

**Step 2: Update `--section-spacing` to fluid value**

In `css/styles.css:17`, change:
```css
    --section-spacing:    5rem;
```
to:
```css
    --section-spacing:    clamp(5rem, 4rem + 3vw, 6rem);
```

**Step 3: Add new tokens after `--transition` (line 19)**

Insert the following block between `--transition: 0.2s ease;` (line 19) and the closing `}` (line 20):

```css

    /* Typography (fluid) */
    --font-size-h1:       clamp(2.25rem, 1.75rem + 2vw, 3.25rem);
    --font-size-h2:       clamp(1.5rem, 1.25rem + 1vw, 1.75rem);
    --font-size-summary:  clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
    --font-size-body-lg:  clamp(0.9375rem, 0.875rem + 0.25vw, 1.0625rem);

    /* Spacing */
    --space-xs:           0.5rem;
    --space-sm:           1rem;
    --space-md:           1.5rem;
    --space-lg:           2rem;

    /* Radii */
    --radius-sm:          3px;
    --radius-md:          4px;

    /* Shadows */
    --shadow-sm:          0 1px 3px rgba(0, 0, 0, 0.06);
    --shadow-md:          0 2px 8px rgba(0, 0, 0, 0.08);
    --shadow-hover:       0 4px 12px rgba(0, 0, 0, 0.12);

    /* Transitions */
    --transition-fast:    0.15s ease;
    --transition-base:    0.25s ease;
    --transition-content: 0.4s ease-out;

    /* Dark mode prep */
    --color-surface:      #ffffff;
    --color-heading-inv:  #ffffff;

    /* Semantic colors */
    --color-success:       #16a34a;
    --color-success-light: #dcfce7;
    --color-success-dark:  #15803d;
    --color-danger:        #dc2626;
    --color-danger-light:  #fee2e2;
    --color-danger-dark:   #991b1b;
```

**Step 4: Verify in browser**

Open `index.html` in a browser. Confirm:
- Footer text and scope labels are slightly darker (WCAG fix)
- No visual breakage — all existing styles still work
- Section spacing still transitions smoothly on resize

**Step 5: Commit**

```bash
git add css/styles.css
git commit -m "feat: add extended token system to :root with WCAG contrast fix"
```

---

### Task 2: Apply Fluid Typography — styles.css

**Files:**
- Modify: `css/styles.css:62, 69, 218` (base rules)
- Modify: `css/styles.css` (640px and 1024px media queries — remove overrides)

**Step 1: Update base font-size declarations to use tokens**

In `css/styles.css`, change the h1 base size (line 62):
```css
    font-size: 2.25rem;
```
to:
```css
    font-size: var(--font-size-h1);
```

Change the h2 base size (line 69):
```css
    font-size: 1.5rem;
```
to:
```css
    font-size: var(--font-size-h2);
```

Change the .summary base size (line 218):
```css
    font-size: 1.125rem;
```
to:
```css
    font-size: var(--font-size-summary);
```

**Step 2: Remove font-size overrides from 640px media query**

In the `@media screen and (min-width: 640px)` block, remove these three rule blocks:

```css
    h1 {
        font-size: 2.75rem;
    }
```

```css
    h2 {
        font-size: 1.625rem;
    }
```

```css
    .summary {
        font-size: 1.1875rem;
    }
```

**Step 3: Remove font-size overrides from 1024px media query**

In the `@media screen and (min-width: 1024px)` block, remove:

The `:root` override block (this only contained `--section-spacing: 6rem` which is now handled by `clamp()`):
```css
    :root {
        --section-spacing: 6rem;
    }
```

And remove these three rule blocks:
```css
    h1 {
        font-size: 3.25rem;
    }
```

```css
    h2 {
        font-size: 1.75rem;
    }
```

```css
    .summary {
        font-size: 1.25rem;
    }
```

**Step 4: Verify responsive scaling**

Open `index.html`, resize browser from 320px to 1400px. Confirm:
- h1 scales smoothly from 2.25rem → 3.25rem (no jump at breakpoints)
- h2 scales smoothly from 1.5rem → 1.75rem
- .summary scales smoothly from 1.125rem → 1.25rem
- Section spacing scales smoothly from 5rem → 6rem

**Step 5: Commit**

```bash
git add css/styles.css
git commit -m "feat: apply fluid typography tokens, remove media query font-size overrides"
```

---

### Task 3: Apply Fluid Typography — case-study.css

**Files:**
- Modify: `css/case-study.css:38, 81, 111` (base rules)
- Modify: `css/case-study.css` (640px and 1024px media queries — remove overrides)

**Step 1: Update base font-size declarations**

Change `.cs-header h1` font-size (line 38):
```css
    font-size: 2.25rem;
```
to:
```css
    font-size: var(--font-size-h1);
```

Change `.cs-section h2` font-size (line 81):
```css
    font-size: 1.5rem;
```
to:
```css
    font-size: var(--font-size-h2);
```

Change `.cs-section p` font-size (line 111):
```css
    font-size: 0.9375rem;
```
to:
```css
    font-size: var(--font-size-body-lg);
```

**Step 2: Remove overrides from 640px media query**

Remove:
```css
    .cs-header h1 {
        font-size: 2.75rem;
    }

    .cs-section h2 {
        font-size: 1.625rem;
    }
```

**Step 3: Remove overrides from 1024px media query**

Remove:
```css
    .cs-header h1 {
        font-size: 3.25rem;
    }

    .cs-section h2 {
        font-size: 1.75rem;
    }

    .cs-section p {
        font-size: 1rem;
    }
```

**Step 4: Verify**

Open any case study page (e.g., `projects/mcp-ecosystem.html`). Resize from 320px to 1400px. Confirm headings, section headings, and body text scale smoothly.

**Step 5: Commit**

```bash
git add css/case-study.css
git commit -m "feat: apply fluid typography tokens to case study components"
```

---

### Task 4: Replace Vote Diagram Bootstrap Colors

**Files:**
- Modify: `css/case-study.css:417-446` (vote diagram section)

**Step 1: Replace all hardcoded Bootstrap colors with semantic tokens**

Replace `.vote-icon.vote-yes` (lines 417-421):
```css
.vote-icon.vote-yes {
    background-color: #d4edda;
    color: #155724;
    border: 2px solid #28a745;
}
```
with:
```css
.vote-icon.vote-yes {
    background-color: var(--color-success-light);
    color: var(--color-success-dark);
    border: 2px solid var(--color-success);
}
```

Replace `.vote-icon.vote-no` (lines 423-427):
```css
.vote-icon.vote-no {
    background-color: #f8d7da;
    color: #721c24;
    border: 2px solid #dc3545;
}
```
with:
```css
.vote-icon.vote-no {
    background-color: var(--color-danger-light);
    color: var(--color-danger-dark);
    border: 2px solid var(--color-danger);
}
```

Replace `.vote-result.result-rejected` (lines 439-442):
```css
.vote-result.result-rejected {
    background-color: #f8d7da;
    color: #721c24;
}
```
with:
```css
.vote-result.result-rejected {
    background-color: var(--color-danger-light);
    color: var(--color-danger-dark);
}
```

Replace `.vote-result.result-approved` (lines 444-447):
```css
.vote-result.result-approved {
    background-color: #d4edda;
    color: #155724;
}
```
with:
```css
.vote-result.result-approved {
    background-color: var(--color-success-light);
    color: var(--color-success-dark);
}
```

**Step 2: Verify**

Open a page with a vote diagram (e.g., `work/bpr-scoring-pinnacle/pinnacle-scoring.html`). Confirm green/red colors render correctly in vote icons and result badges.

**Step 3: Commit**

```bash
git add css/case-study.css
git commit -m "feat: replace Bootstrap vote diagram colors with semantic tokens"
```

---

### Task 5: Component Fixes — case-study.css

**Files:**
- Modify: `css/case-study.css` (multiple sections)

**Step 1: Differentiate comparison card h3s**

Replace the existing comparison h3 block (lines 227-231):
```css
.comparison-before h3,
.comparison-after h3 {
    margin-top: 0;
}
```

with:
```css
.comparison-before h3,
.comparison-after h3 {
    font-family: var(--font-serif);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    text-transform: none;
    color: var(--color-heading);
    margin-top: 0;
}
```

**Step 2: Add `.chosen` class for table row highlighting**

After `.data-table .new-value` block (line 566), add:

```css

.data-table tr.chosen {
    background-color: var(--color-accent-light);
}
```

**Step 3: Add responsive metric-number scaling**

Change `.metric-number` font-size (line 146):
```css
    font-size: 1.75rem;
```
to:
```css
    font-size: clamp(1.5rem, 1.25rem + 1vw, 2.25rem);
```

**Step 4: Add mobile table overflow wrapper**

After `.data-table tr:last-child td` block (line 551), add:

```css

.data-table-wrapper {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
```

**Step 5: Replace dead bar-fill transition with scroll-driven animation**

Replace `.bar-fill` block (lines 305-310):
```css
.bar-fill {
    height: 100%;
    background: linear-gradient(to right, var(--color-accent), var(--color-accent-hover));
    border-radius: 4px;
    transition: width 0.6s ease-out;
}
```

with:
```css
.bar-fill {
    height: 100%;
    background: linear-gradient(to right, var(--color-accent), var(--color-accent-hover));
    border-radius: var(--radius-md);
}

@supports (animation-timeline: view()) {
    .bar-fill {
        animation: fill-bar linear both;
        animation-timeline: view();
        animation-range: entry 0% entry 100%;
    }
    @keyframes fill-bar {
        from { transform: scaleX(0); transform-origin: left; }
        to   { transform: scaleX(1); transform-origin: left; }
    }
}
```

**Step 6: Add tabular-nums to numeric elements**

After the `@supports` block from Step 5, add:

```css

.metric-number,
.stage-value,
.bar-value,
.data-table td:nth-child(n+2) {
    font-variant-numeric: tabular-nums;
}
```

**Step 7: Verify**

- Open a case study with comparison cards — confirm h3s now use serif font
- Check a data table — numbers should align in columns
- Resize to mobile width — tables should scroll horizontally if they overflow
- Check bar charts on Chrome — bars should animate on scroll into view

**Step 8: Commit**

```bash
git add css/case-study.css
git commit -m "feat: fix comparison h3s, add chosen class, responsive metrics, table overflow, bar animation, tabular-nums"
```

---

### Task 6: Accessibility & Text Wrap — styles.css

**Files:**
- Modify: `css/styles.css` (add new section before print block)

**Step 1: Add focus-visible, reduced-motion, and text-wrap**

Insert the following block before the `/* ===== PRINT ===== */` comment (before line 654 in the original file):

```css

/* ===== ACCESSIBILITY ===== */
a:focus-visible,
.cta-button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

h1, h2 { text-wrap: balance; }
.summary { text-wrap: pretty; }

```

**Step 2: Add text-wrap to case-study.css**

In `css/case-study.css`, add `text-wrap: balance;` to the `.cs-tagline` block (after line 51):
```css
    text-wrap: balance;
```

And add `text-wrap: pretty;` to the `.cs-section p` block (after line 113):
```css
    text-wrap: pretty;
```

**Step 3: Verify**

- Tab through the page using keyboard — interactive elements should show a blue outline with 2px offset
- In browser DevTools, enable "prefers-reduced-motion: reduce" — all animations and transitions should be suppressed
- Check headings — lines should break more evenly (balance)
- Check paragraphs — last lines should avoid orphaned words (pretty)

**Step 4: Commit**

```bash
git add css/styles.css css/case-study.css
git commit -m "feat: add focus-visible states, reduced-motion, text-wrap balance/pretty"
```

---

### Task 7: Card Hover Elevation — styles.css

**Files:**
- Modify: `css/styles.css` (project-card base transition + hover block)

**Step 1: Update project-card base transition**

Change the `.project-card` transition property (line 308):
```css
    transition: border-color var(--transition), box-shadow var(--transition), background-color var(--transition);
```
to:
```css
    transition: transform var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
```

**Step 2: Update project-card hover state**

In the 1024px media query, change `.project-card:hover` (lines 613-617):
```css
    .project-card:hover {
        border-color: var(--color-border-light);
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
        background-color: var(--color-bg);
    }
```
to:
```css
    .project-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-hover);
        background-color: var(--color-bg);
    }
```

**Step 3: Replace CTA hover hardcoded shadow with token**

In the 1024px media query, change `.cta-button:hover` (line 605):
```css
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
```
to:
```css
        box-shadow: var(--shadow-hover);
```

**Step 4: Verify**

On desktop, hover over project cards — they should lift 2px with a clean shadow. Hover over the CTA button — same shadow token.

**Step 5: Commit**

```bash
git add css/styles.css
git commit -m "feat: enhance card hover with translateY and shadow tokens"
```

---

### Task 8: Figure Containers & Reading Progress Bar — case-study.css

**Files:**
- Modify: `css/case-study.css` (add new sections before tablet media query)

**Step 1: Add figure containers and progress bar rules**

Insert the following before the `/* TABLET (640px+) */` comment in `css/case-study.css`:

```css

/* ===== FIGURE CONTAINERS (graphics-ready) ===== */
.cs-figure {
    margin: var(--space-md) 0;
    max-width: 100%;
}

.cs-figure img,
.cs-figure svg {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-md);
}

.cs-figure figcaption {
    font-size: 0.8125rem;
    color: var(--color-muted);
    margin-top: 0.5rem;
    text-align: center;
    font-style: italic;
}

.cs-figure-pair {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-sm);
}

.cs-figure-wide {
    max-width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding: 0 var(--space-sm);
}

/* ===== READING PROGRESS BAR ===== */
.reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--color-accent);
    transform-origin: left;
    transform: scaleX(0);
    z-index: 100;
}

@supports (animation-timeline: scroll()) {
    .reading-progress {
        animation: progress-fill linear both;
        animation-timeline: scroll();
    }
    @keyframes progress-fill {
        to { transform: scaleX(1); }
    }
}

```

**Step 2: Add responsive figure-pair to tablet media query**

In the `@media screen and (min-width: 640px)` block, add:

```css

    .cs-figure-pair {
        grid-template-columns: 1fr 1fr;
    }
```

**Step 3: Verify**

The figure containers are empty scaffolding (no images added yet) — just confirm no CSS errors. The progress bar requires the HTML `<div>` from Task 11 to be visible.

**Step 4: Commit**

```bash
git add css/case-study.css
git commit -m "feat: add figure containers and reading progress bar CSS"
```

---

### Task 9: Print Enhancements

**Files:**
- Modify: `css/case-study.css` (print block)
- Modify: `css/styles.css` (print block)

**Step 1: Add case study print rules**

In `css/case-study.css`, inside the `@media print` block, add:

```css

    .cs-section {
        page-break-inside: avoid;
    }

    .reading-progress {
        display: none;
    }
```

**Step 2: Add global print rule**

In `css/styles.css`, inside the `@media print` block, after `header, .skip-link, .cta-button { display: none; }`, add:

```css

    .reading-progress {
        display: none;
    }
```

**Step 3: Commit**

```bash
git add css/styles.css css/case-study.css
git commit -m "feat: add print enhancements — page-break-inside, hide progress bar"
```

---

### Task 10: Create Progress Bar JS Fallback

**Files:**
- Create: `js/progress-bar.js`

**Step 1: Create the file**

Create `js/progress-bar.js` with:

```js
// Reading progress bar — JS fallback for browsers without scroll-driven animations
// (Safari, Firefox as of 2026). Feature-gated: only runs when CSS can't handle it.
if (!CSS.supports('animation-timeline', 'scroll()')) {
    const bar = document.querySelector('.reading-progress');
    if (bar) window.addEventListener('scroll', () => {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        bar.style.transform = `scaleX(${Math.min(pct, 1)})`;
    }, { passive: true });
}
```

**Step 2: Commit**

```bash
git add js/progress-bar.js
git commit -m "feat: add progress bar JS fallback for Safari/Firefox"
```

---

### Task 11: HTML Changes — Case Study Pages

**Files:**
- Modify: All 10 case study HTML files (4 work + 6 projects)

For each case study page, make three changes:

**Step 1: Add reading progress div**

Add `<div class="reading-progress"></div>` as the first child of `<body>`, before the skip link. Example:

```html
<body>

    <div class="reading-progress"></div>
    <a class="skip-link" href="#main-content">Skip to content</a>
```

**Step 2: Add canonical URL and progress bar script to `<head>`**

Add before `</head>`:

```html
    <link rel="canonical" href="https://taylorstephens.dev/[page-path]">
    <script src="[relative-path]/js/progress-bar.js" defer></script>
```

**Paths per file:**

| File | Canonical URL | Script src |
|------|---------------|------------|
| `work/contract-transfer/contract-transfer.html` | `https://taylorstephens.dev/work/contract-transfer/` | `../../js/progress-bar.js` |
| `work/bpr-scoring-pinnacle/pinnacle-scoring.html` | `https://taylorstephens.dev/work/bpr-scoring-pinnacle/` | `../../js/progress-bar.js` |
| `work/cfa-dsp-application/dsp-application.html` | `https://taylorstephens.dev/work/cfa-dsp-application/` | `../../js/progress-bar.js` |
| `work/pinnacle-program-selection/pinnacle-automation.html` | `https://taylorstephens.dev/work/pinnacle-program-selection/` | `../../js/progress-bar.js` |
| `projects/agentic-pipeline.html` | `https://taylorstephens.dev/projects/agentic-pipeline` | `../js/progress-bar.js` |
| `projects/book-library-mcp.html` | `https://taylorstephens.dev/projects/book-library-mcp` | `../js/progress-bar.js` |
| `projects/claude-innit.html` | `https://taylorstephens.dev/projects/claude-innit` | `../js/progress-bar.js` |
| `projects/mcp-ecosystem.html` | `https://taylorstephens.dev/projects/mcp-ecosystem` | `../js/progress-bar.js` |
| `projects/tap-sevenrooms.html` | `https://taylorstephens.dev/projects/tap-sevenrooms` | `../js/progress-bar.js` |
| `projects/lab-environment.html` | `https://taylorstephens.dev/projects/lab-environment` | `../js/progress-bar.js` |

**Step 3: Verify**

Open one case study page. Confirm:
- Blue progress bar appears at top and fills as you scroll
- Bar works in both Chrome (CSS-driven) and Safari (JS fallback)

**Step 4: Commit**

```bash
git add work/ projects/
git commit -m "feat: add reading progress bar and canonical URLs to case study pages"
```

---

### Task 12: HTML Changes — Homepage

**Files:**
- Modify: `index.html:8, 41`

**Step 1: Add canonical URL**

In `index.html`, add after the favicon line (line 8):

```html
    <link rel="canonical" href="https://taylorstephens.dev/">
```

**Step 2: Fix headshot loading attributes**

Change the headshot `<img>` tag (line 41):
```html
<img src="images/headshot.jpg" alt="Taylor Stephens, Program Manager" class="headshot" loading="lazy" width="300" height="300">
```
to:
```html
<img src="images/headshot.jpg" alt="Taylor Stephens, Program Manager" class="headshot" loading="eager" fetchpriority="high" width="300" height="300">
```

**Step 3: Verify**

Open `index.html`. Confirm:
- Headshot loads immediately (no lazy-load delay)
- View page source — canonical URL present

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add canonical URL, fix headshot loading priority"
```

---

## Summary

| Task | Files | What |
|------|-------|------|
| 1 | styles.css | Extended `:root` tokens + WCAG fix |
| 2 | styles.css | Fluid typography + remove media query overrides |
| 3 | case-study.css | Fluid typography + remove media query overrides |
| 4 | case-study.css | Vote diagram semantic colors |
| 5 | case-study.css | h3 fix, .chosen, metrics, overflow, bar animation, tabular-nums |
| 6 | styles.css + case-study.css | focus-visible, reduced-motion, text-wrap |
| 7 | styles.css | Card hover elevation + shadow tokens |
| 8 | case-study.css | Figure containers + progress bar CSS |
| 9 | styles.css + case-study.css | Print enhancements |
| 10 | js/progress-bar.js | **New** — JS fallback |
| 11 | 10 case study HTML files | Reading progress div + canonical URLs + script |
| 12 | index.html | Canonical URL + headshot fix |

**Total: 12 tasks, ~12 commits, 14 files modified**
