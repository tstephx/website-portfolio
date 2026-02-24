# CSS Design System Upgrade — Design Document
<!-- project: website-portfolio -->

**Date:** 2026-02-12
**Scope:** CSS-only changes + 3 minimal HTML touches across 10 pages
**Approach:** Layered Custom Properties (extend existing `:root` token system)
**Validated against:** 12+ books from library, 2 review documents, web standards

---

## Problem Statement

Two review documents identified 20 design fixes ranging from WCAG compliance failures to dead CSS code. The fixes need to be:
1. Future-proof (no rework when adding graphics or dark mode)
2. Standardized across all 10 pages (1 homepage + 4 work/ + 5 projects/)
3. CSS-only with minimal HTML changes

---

## Architecture Decision

**Chosen: Approach A — Layered Custom Properties**

Extends the existing `:root` token system in `styles.css`. All hardcoded values become tokens. Changes propagate through inheritance — edit one token, all pages update. Enables dark mode with a single `@media` block later.

---

## Section 1: Extended Token System

Add to `:root` in `styles.css`:

```css
/* Typography (fluid) */
--font-size-h1: clamp(2.25rem, 1.75rem + 2vw, 3.25rem);
--font-size-h2: clamp(1.5rem, 1.25rem + 1vw, 1.75rem);
--font-size-summary: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
--font-size-body-lg: clamp(0.9375rem, 0.875rem + 0.25vw, 1.0625rem);

/* Spacing */
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 1.5rem;
--space-lg: 2rem;
--space-xl: clamp(5rem, 4rem + 3vw, 6rem);

/* Radii (normalize 3px vs 4px inconsistency) */
--radius-sm: 3px;
--radius-md: 4px;

/* Shadows */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.12);

/* Transitions */
--transition-fast: 0.15s ease;
--transition-base: 0.25s ease;
--transition-content: 0.4s ease-out;

/* Dark mode prep tokens */
--color-bg-alt: #fafafa;
--color-surface: #ffffff;
--color-heading-inv: #ffffff;

/* Semantic colors (replacing Bootstrap hardcodes in vote diagram) */
--color-success: #16a34a;
--color-success-light: #dcfce7;
--color-success-dark: #15803d;
--color-danger: #dc2626;
--color-danger-light: #fee2e2;
--color-danger-dark: #991b1b;

/* WCAG fix */
--color-light: #767676; /* was #a0a0a0, now 4.54:1 contrast */
```

**Replaces:** 3 font-size override blocks in media queries, ~6 hardcoded `#fafafa`/`#fff` values, all Bootstrap colors in vote diagram, inconsistent shadow/transition values.

---

## Section 2: Component Fixes

### Vote Diagram Colors
Replace hardcoded Bootstrap colors (#d4edda, #28a745, etc.) with `--color-success-*` and `--color-danger-*` tokens in `case-study.css`.

### h3 Comparison Card Titles
Differentiate comparison card h3s from section label h3s:
```css
.comparison-before h3,
.comparison-after h3 {
    font-family: var(--font-serif);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    text-transform: none;
    color: var(--color-heading);
}
```

### Table Highlight Semantics
New `.chosen` class for row highlighting (background tint) vs `.highlight` for text labels:
```css
.data-table tr.chosen { background-color: var(--color-accent-light); }
```

### Metric Number Responsive Scaling
```css
.metric-number {
    font-size: clamp(1.5rem, 1.25rem + 1vw, 2.25rem);
}
```

### Mobile Table Overflow
```css
.data-table-wrapper { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
```

### Bar-Fill Animation
Remove dead `transition: width 0.6s ease-out`. Replace with scroll-driven animation:
```css
@supports (animation-timeline: view()) {
    .bar-fill {
        animation: fill-bar linear both;
        animation-timeline: view();
        animation-range: entry 0% entry 100%;
    }
    @keyframes fill-bar {
        from { transform: scaleX(0); transform-origin: left; }
        to { transform: scaleX(1); transform-origin: left; }
    }
}
```

### Tabular Numbers
```css
.metric-number, .stage-value, .bar-value,
.data-table td:nth-child(n+2) {
    font-variant-numeric: tabular-nums;
}
```

---

## Section 3: Accessibility & Interaction

### Focus-Visible States
```css
a:focus-visible,
.cta-button:focus-visible,
.nav-link:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

### Text Wrap
```css
h1, h2, .cs-tagline { text-wrap: balance; }
.cs-section p, .summary { text-wrap: pretty; }
```

### Card Hover Elevation
```css
.project-card { transition: transform var(--transition-fast), box-shadow var(--transition-fast); }
/* Inside 1024px hover block: */
.project-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-hover); }
```

---

## Section 4: Scroll-Driven Animations & Progress Bar

### Reading Progress Bar (CSS + JS fallback)
```css
.reading-progress {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 3px;
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
    @keyframes progress-fill { to { transform: scaleX(1); } }
}
```

JS fallback for Safari/Firefox (~8 lines):
```js
if (!CSS.supports('animation-timeline', 'scroll()')) {
    const bar = document.querySelector('.reading-progress');
    if (bar) window.addEventListener('scroll', () => {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        bar.style.transform = `scaleX(${Math.min(pct, 1)})`;
    }, { passive: true });
}
```

---

## Section 5: Graphics-Ready Containers

```css
.cs-figure { margin: var(--space-md) 0; max-width: 100%; }
.cs-figure img, .cs-figure svg { display: block; max-width: 100%; height: auto; border-radius: var(--radius-md); }
.cs-figure figcaption { font-size: 0.8125rem; color: var(--color-muted); margin-top: 0.5rem; text-align: center; font-style: italic; }

.cs-figure-pair { display: grid; grid-template-columns: 1fr; gap: var(--space-sm); }
@media (min-width: 640px) { .cs-figure-pair { grid-template-columns: 1fr 1fr; } }

.cs-figure-wide {
    max-width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding: 0 var(--space-sm);
}
```

**Note:** When adding actual images, use `srcset`/`sizes` for resolution switching and WebP format with JPEG fallback.

---

## Section 6: Dark Mode Token Prep

Three new tokens (`--color-bg-alt`, `--color-surface`, `--color-heading-inv`) replace ~6 hardcoded color values. When dark mode is wanted later, one `@media (prefers-color-scheme: dark)` block remaps all tokens.

Not implementing the dark mode block now — just ensuring all colors flow through tokens.

---

## Section 7: HTML Touches

Only 3 non-CSS changes:

1. **`<div class="reading-progress"></div>`** — top of `<body>` on 9 case study pages
2. **`<link rel="canonical" href="...">`** — `<head>` of all 10 pages
3. **`loading="eager"` + `fetchpriority="high"`** — homepage headshot image

---

## Print Stylesheet Enhancement

Add to existing `@media print` blocks:
```css
.cs-section { page-break-inside: avoid; }
.reading-progress { display: none; }
```

---

## Files Modified

| File | Changes |
|---|---|
| `css/styles.css` | Extended `:root` tokens, fluid typography, focus-visible, reduced-motion, card hover, text-wrap, print enhancement |
| `css/case-study.css` | Vote diagram tokens, h3 comparison fix, table highlight, metric scaling, table overflow, bar-fill animation, tabular nums, figure containers, progress bar, print enhancement |
| `js/progress-bar.js` | New: 8-line JS fallback for reading progress bar |
| `index.html` | Canonical URL, headshot loading/fetchpriority |
| `work/*.html` (4 files) | Reading progress div, canonical URL |
| `projects/*.html` (5 files) | Reading progress div, canonical URL |

---

## Implementation Order

1. **Tier 1 — Tokens + WCAG** (styles.css `:root` changes, affects everything)
2. **Tier 2 — Component fixes** (case-study.css targeted changes)
3. **Tier 3 — Polish** (focus-visible, reduced-motion, text-wrap, card hover, animations, progress bar)
4. **Tier 4 — Future-ready** (figure containers, dark mode tokens, print enhancements)
5. **Tier 5 — HTML** (canonical URLs, reading progress divs, headshot attributes)

---

## Validation

- Cross-referenced against 12+ chapters from 7 books in library
- All techniques have 93%+ browser support or `@supports` guards
- Zero structural/layout changes — CSS-only with 3 HTML touches
- Existing design patterns preserved and extended, not replaced
