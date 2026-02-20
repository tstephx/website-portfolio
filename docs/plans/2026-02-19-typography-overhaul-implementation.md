# Typography Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace Inter + Lora with a four-font editorial stack (Cormorant Garamond / Newsreader / Epilogue / DM Mono) and shift the accent color from Tailwind blue to ink navy.

**Architecture:** Token-first approach — update CSS custom properties in `styles.css` so all case study pages inherit automatically. Two explicit overrides needed (`h1`, `h3`) because they diverge from their token defaults. One Google Fonts `<link>` replacement in `index.html`. No layout or spacing changes.

**Tech Stack:** HTML5, CSS3 (custom properties), Google Fonts
**Design Doc:** `docs/plans/2026-02-19-typography-overhaul-design.md`

---

## Task 1: Replace Google Fonts Link in index.html

**Files:**
- Modify: `/Users/taylorstephens/_Lab/website-portfolio/index.html:20`

**Step 1: Read the current link for context**

Read `index.html` lines 18–21. You'll see the existing Inter + Lora preconnect/link tags.

**Step 2: Replace the Google Fonts `<link>` on line 20**

Replace:
```html
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Lora:wght@400;600;700&display=swap" rel="stylesheet">
```

With:
```html
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Mono:wght@400;500&family=Epilogue:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
```

Note: The preconnect tags on lines 18–19 stay unchanged.

**Step 3: Verify**

Open `index.html` in a browser (`python3 -m http.server 8000` from `website-portfolio/`, then `http://localhost:8000`).
Expected: Page still loads. Fonts will look broken/fallback until CSS tokens are updated in Task 2 — that's fine.

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: update Google Fonts link for typography overhaul (Cormorant/Newsreader/Epilogue/DM Mono)"
```

---

## Task 2: Add New Font Tokens + Update Existing Font Tokens

**Files:**
- Modify: `/Users/taylorstephens/_Lab/website-portfolio/css/styles.css:14-15`

**Step 1: Read current font tokens**

Read `styles.css` lines 14–15:
```css
    --font-sans:  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-serif: 'Lora', Georgia, 'Times New Roman', serif;
```

**Step 2: Update `--font-sans` and `--font-serif`, add two new tokens**

Replace lines 14–15 with:
```css
    --font-sans:    'Epilogue', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-serif:   'Newsreader', Georgia, 'Times New Roman', serif;
    --font-display: 'Cormorant Garamond', 'Times New Roman', serif;
    --font-mono:    'DM Mono', 'Fira Mono', monospace;
```

**Step 3: Verify**

Reload `http://localhost:8000`.
Expected:
- Body paragraphs and nav render in Epilogue (clean geometric sans, slightly wider than Inter)
- Section headings (`h2`) render in Newsreader (editorial serif)
- `.summary` hero quote renders in Newsreader
- `h1` still renders in Newsreader (will be fixed to Cormorant in Task 4)
- `h3` labels still render in Epilogue (will be fixed to DM Mono in Task 5)

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: add font tokens for typography overhaul (--font-display, --font-mono, update --font-sans/serif)"
```

---

## Task 3: Update Accent Color Tokens

**Files:**
- Modify: `/Users/taylorstephens/_Lab/website-portfolio/css/styles.css:7-9`

**Step 1: Read current accent tokens**

Read `styles.css` lines 7–9:
```css
    --color-accent:       #2563eb;
    --color-accent-hover: #1d4ed8;
    --color-accent-light: rgba(37, 99, 235, 0.08);
```

**Step 2: Replace with ink navy values**

```css
    --color-accent:       #1a3a6b;
    --color-accent-hover: #142e55;
    --color-accent-light: rgba(26, 58, 107, 0.08);
```

**Step 3: Verify**

Reload `http://localhost:8000`.
Expected:
- All link colors now render in deep navy instead of bright Tailwind blue
- `h2::after` underline rule now renders in navy (it uses `--color-accent` and `--color-accent-hover`)
- Hero background gradient subtly shifts (barely visible either way)
- CTA button stays near-black (it uses `--color-heading`, not `--color-accent`)

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: update accent color tokens to ink navy (#1a3a6b)"
```

---

## Task 4: Override h1 to Use Display Font

**Files:**
- Modify: `/Users/taylorstephens/_Lab/website-portfolio/css/styles.css:99-104`

**Step 1: Read current h1 rule**

Read `styles.css` lines 93–104. Note that `h1, h2, h3 { font-family: var(--font-serif); }` (line 93–97) sets all headings to the serif. The `h1 { ... }` block (lines 99–104) doesn't override `font-family` — it only sets `font-size`, `font-weight`, `line-height`, and `margin-bottom`.

**Step 2: Add font-family override to the h1 block**

The h1 block currently reads:
```css
h1 {
    font-size: var(--font-size-h1);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 0.3em;
}
```

Replace with:
```css
h1 {
    font-family: var(--font-display);
    font-size: var(--font-size-h1);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 0.3em;
}
```

Note: `font-weight` drops from 700 → 600 because Cormorant Garamond's 600 is visually equivalent to Inter's 700. The `letter-spacing` overrides the `-0.02em` set on the `h1, h2, h3` shared rule — Cormorant needs slightly tighter tracking at display size.

**Step 3: Verify**

Reload `http://localhost:8000`.
Expected:
- "Taylor Stephens" in the hero renders in Cormorant Garamond — high-contrast strokes, editorial quality
- `h2` section headings still render in Newsreader (unaffected — the shared rule still applies)
- Letter-spacing on `h1` feels tighter and more refined than before

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: override h1 to Cormorant Garamond display font with tuned letter-spacing"
```

---

## Task 5: Override h3 Labels to DM Mono

**Files:**
- Modify: `/Users/taylorstephens/_Lab/website-portfolio/css/styles.css:123-131`

**Step 1: Read current h3 rule**

Read `styles.css` lines 123–131:
```css
h3 {
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: 0.75em;
}
```

**Step 2: Swap font-family and font-weight**

Replace with:
```css
h3 {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin-bottom: 0.75em;
}
```

Note: `font-weight` drops from 700 → 500 because DM Mono only ships at 400 and 500. The wide `letter-spacing: 0.06em` stays — monospace + wide tracking is the label look.

**Step 3: Verify**

Reload `http://localhost:8000`.
Expected:
- "Featured Projects", "About Me", "Skills & Experience" section labels render in DM Mono uppercase
- "What I Do", "How I Work", "Where I've Been" skills labels render in DM Mono uppercase
- The labels feel like structured data headers, not generic bold caps
- On case study pages: sub-section h3 labels (e.g. "Two-Tier Distance Filter") also update automatically

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: override h3 labels to DM Mono monospace for analytical precision aesthetic"
```

---

## Task 6: Override .project-meta to DM Mono

**Files:**
- Modify: `/Users/taylorstephens/_Lab/website-portfolio/css/styles.css:376-384`

**Step 1: Read current .project-meta rule**

Read `styles.css` lines 376–384:
```css
.project-meta {
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--color-muted);
    letter-spacing: 0.01em;
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--color-border-light);
}
```

**Step 2: Add font-family and adjust letter-spacing**

Replace with:
```css
.project-meta {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    font-weight: 400;
    color: var(--color-muted);
    letter-spacing: 0.02em;
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--color-border-light);
}
```

Note: `font-weight` drops to 400 (DM Mono doesn't have 500 in the bold sense — 400 is the right weight for metadata). `letter-spacing` bumps from 0.01em → 0.02em to give the monospace text a slightly more intentional, data-output feel.

**Step 3: Verify**

Reload `http://localhost:8000`.
Expected:
- Project card metadata lines render in DM Mono: `8 Root Causes | 6-Step SQL Pipeline | Haversine Formula | 2,620 DSPs`
- These lines now feel like terminal output / analytical system output
- The `|` separators look especially sharp in monospace
- Check that line doesn't overflow its container on mobile (375px — resize browser)

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: override .project-meta to DM Mono for data-output aesthetic"
```

---

## Task 7: Visual QA

**Files:** None — verification only

**Step 1: Open index page**

```bash
open http://localhost:8000
```

**Desktop checklist (1024px+):**
- [ ] `h1` "Taylor Stephens" — Cormorant Garamond, high-contrast strokes, noticeably editorial
- [ ] `.summary` hero quote — Newsreader, slightly more open than Lora
- [ ] Nav links — Epilogue, clean geometric sans
- [ ] CTA button "View My Work" — Epilogue
- [ ] Section `h2` headings — Newsreader, readable serif
- [ ] Section `h3` labels ("FEATURED PROJECTS", "SKILLS & EXPERIENCE") — DM Mono uppercase
- [ ] Project card titles — Newsreader serif (from `.project-card h3` override)
- [ ] `.project-meta` lines — DM Mono, data-output feel
- [ ] Accent elements (links, `h2::after` underlines) — ink navy, not Tailwind blue
- [ ] About section text — Epilogue sans at comfortable reading size
- [ ] No font fallback rendering (all 4 Google Fonts loading correctly)

**Mobile checklist (resize to 375px):**
- [ ] `.project-meta` doesn't overflow — if it wraps, does it wrap gracefully?
- [ ] `h1` at mobile size still looks editorial, not cramped
- [ ] Nav links Epilogue readable at small size

**Step 2: Open a case study page**

```bash
open http://localhost:8000/work/pinnacle-program-selection/pinnacle-automation.html
```

**Case study checklist:**
- [ ] Case study `h1` title — Cormorant Garamond (inherits)
- [ ] Body text — Epilogue (inherits)
- [ ] `.code-annotation-title` — Epilogue (uses `--font-sans`)
- [ ] DM Mono labels don't conflict with `.code-annotation pre code` (already uses explicit `font-family` stack in case-study.css)
- [ ] Accent color on `h2::after` underlines — ink navy

**Step 3: If any issues found**

Fix in a follow-up commit:
```bash
git add css/styles.css
git commit -m "fix: typography QA adjustments"
```

**Step 4: Final git log check**

```bash
git log --oneline -8
```

Expected: 6–7 commits since before Task 1 (design doc + 5 implementation commits + optional fix).

---

## Summary

| Task | File | Change |
|------|------|--------|
| 1 | `index.html` | Replace Google Fonts `<link>` |
| 2 | `css/styles.css` | Update `--font-sans`/`--font-serif`, add `--font-display`/`--font-mono` |
| 3 | `css/styles.css` | Update accent color tokens to ink navy |
| 4 | `css/styles.css` | Override `h1` → Cormorant Garamond, tuned weight + tracking |
| 5 | `css/styles.css` | Override `h3` → DM Mono, weight 500 |
| 6 | `css/styles.css` | Override `.project-meta` → DM Mono, weight 400 |
| 7 | (none) | Visual QA on desktop + mobile |

**Total: 7 tasks, 6 commits, 2 files modified.**

After completion: compare before/after screenshots. If approved, the feature is production-ready.
