# Homepage Refinement Implementation Plan

<!-- project: website-portfolio -->

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement the 5 priority improvements and CSS simplifications from the post-critique PRD (`docs/active/homepage-refinement-prd.md`).

**Architecture:** Pure CSS/HTML changes across 3 batches. Batch 1 restructures the hero section to a split layout with ghost CTA. Batch 2 fixes mobile stats, adds resume link, and expands personality line. Batch 3 cleans up token violations and removes dated CSS patterns. No new files, no new tokens, no JS changes.

**Tech Stack:** Static HTML, vanilla CSS (custom properties), Playwright tests, npm scripts

---

## Batch 1: Hero Redesign

### Task 1: Hero Split Layout — CSS Grid at 768px+

**Files:**

- Modify: `css/styles.css:232-264` (hero rules), `css/styles.css:787-790` (640px+ headshot), `css/styles.css:830-833` (1024px+ headshot)
- Modify: `index.html:45-72` (hero HTML)

**Step 1: Update hero HTML structure**

In `index.html`, restructure the hero section (lines 45–72). The `<picture>` element moves after the text content so CSS grid can place it right:

```html
<section id="hero">
  <div class="hero-content">
    <div class="hero-text">
      <h1>Taylor Stephens</h1>
      <p class="tagline">
        Strategic Program Manager | AI Infrastructure &amp; Systems Design | Former Amazon PM
      </p>
      <p class="summary">
        I&rsquo;m the person you call when a critical process doesn&rsquo;t exist yet, is falling
        apart, or costs millions more than it should &mdash; I&rsquo;ve fixed all three.
      </p>
      <p class="summary career-shape">
        8 years building operational systems at Amazon, Uber, and high-growth startups &mdash;
        coordinating 15+ cross-functional teams.
      </p>
      <a href="#projects" class="cta-button hero-cta">View My Work</a>
    </div>
    <picture class="hero-headshot">
      <source srcset="images/headshot.avif" type="image/avif" />
      <source srcset="images/headshot.webp" type="image/webp" />
      <img
        src="images/headshot.jpg"
        alt="Taylor Stephens, Strategic Program Manager"
        class="headshot"
        loading="eager"
        fetchpriority="high"
        width="300"
        height="300"
      />
    </picture>
  </div>
</section>
```

Key changes:

- Added `.hero-text` wrapper div around all text + CTA
- Moved `<picture>` after `.hero-text` (grid will place it right)
- Added `.hero-headshot` class on `<picture>` for grid targeting
- Added `.hero-cta` class on CTA button (for hero-specific ghost styling)

**Step 2: Rewrite hero CSS for mobile-first split layout**

In `css/styles.css`, replace lines 232–264 (`#hero` through `.hero-content`):

```css
/* ===== HERO ===== */
#hero {
  position: relative;
  padding: 4rem 1.5rem;
  animation: fadeIn 0.8s ease-out both;
}

#hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 40%, var(--color-accent-light) 0%, transparent 70%);
  z-index: -1;
}

.hero-content {
  max-width: var(--max-width);
  margin: 0 auto;
}

.hero-headshot {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
```

This is the mobile-first base: stacked layout, headshot centered above left-aligned text.

**Step 3: Add 768px+ split layout**

Add a new media query block in `css/styles.css` after the mobile hero rules (before the 640px+ tablet block at line 762):

```css
/* =========================================
   HERO SPLIT (768px+)
   ========================================= */
@media screen and (min-width: 768px) {
  .hero-content {
    display: grid;
    grid-template-columns: 3fr 2fr;
    align-items: center;
    gap: 2rem;
  }

  .hero-headshot {
    margin-bottom: 0;
    justify-content: flex-end;
  }

  .headshot {
    width: 150px;
    height: 150px;
  }

  #hero::before {
    background: radial-gradient(ellipse at 30% 50%, var(--color-accent-light) 0%, transparent 60%);
  }
}
```

**Step 4: Update existing headshot size rules**

In the 640px+ block (around line 787–790), remove the `.headshot` size override since 768px+ now handles it. In the 1024px+ block (around line 830–833), remove the `.headshot` size override too — the 768px+ rule already sets 150px.

Remove from `@media (min-width: 640px)`:

```css
.headshot {
  width: 140px;
  height: 140px;
}
```

Remove from `@media (min-width: 1024px)`:

```css
.headshot {
  width: 150px;
  height: 150px;
}
```

**Step 5: Remove centered text from hero**

In the base `#hero` rule, the old version had `text-align: center`, `display: flex`, `justify-content: center`, `align-items: center`, `min-height: min(70vh, 600px)`. The new version in Step 2 removes all of these. Verify the old `.summary` rule (line 291) has `margin: 0 auto 2em` — change to `margin: 0 0 2em` since text is no longer centered:

```css
.summary {
  font-family: var(--font-serif);
  font-size: var(--font-size-summary);
  line-height: 1.7;
  color: var(--color-text);
  margin: 0 0 2em;
  max-width: 520px;
  text-wrap: pretty;
}
```

Also update `.hero-content` max-width from `600px` to `var(--max-width)` (done in Step 2).

**Step 6: Run lint + format**

Run: `npm run check`
Expected: PASS (all lint + format checks pass)

**Step 7: Run tests**

Run: `npm test`
Expected: Some visual regression tests will fail (expected — snapshots need updating). Page tests, a11y tests, link chain tests should pass. If layout tests fail, investigate at 375px/768px/1024px viewports.

**Step 8: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: hero split layout — CSS grid at 768px+, mobile stacked"
```

---

### Task 2: Ghost CTA Button (Hero Only)

**Files:**

- Modify: `css/styles.css:303-321` (`.cta-button` base), `css/styles.css:885-897` (hover/active)

**Step 1: Add hero-specific ghost button styles**

Add after the existing `.cta-button` rules (around line 321):

```css
.hero-cta {
  background-color: transparent;
  color: var(--color-heading);
}
```

**Step 2: Update desktop hover for hero CTA**

In the 1024px+ media query, the existing `.cta-button:hover` (lines 885-892) fills with accent color. Add a hero-specific override after it:

```css
.hero-cta:hover {
  background-color: var(--color-heading);
  border-color: var(--color-heading);
  color: var(--color-bg);
  transform: translateY(-1px);
  box-shadow: var(--shadow-hover);
}
```

The base `.cta-button` rules already have `border: 2px solid var(--color-heading)`, so the ghost outline is already there. The `.hero-cta` override just makes the fill transparent.

**Step 3: Verify focus ring**

The existing `a:focus-visible, .cta-button:focus-visible` rule (line 954-959) gives a 2px accent outline. Ghost button on transparent bg needs this to remain visible. No change needed — just verify.

**Step 4: Run lint + format**

Run: `npm run check`
Expected: PASS

**Step 5: Commit**

```bash
git add css/styles.css
git commit -m "feat: ghost CTA button for hero — outlined, fills on hover"
```

---

### Task 3: Hero Height + Gradient Adaptation

**Files:**

- Modify: `css/styles.css` (hero rules from Task 1)

**Step 1: Verify min-height removal**

Confirm the hero CSS from Task 1 Step 2 does NOT include `min-height`. The old rule had `min-height: min(70vh, 600px)` — it should be gone now. If it's still present, remove it.

**Step 2: Verify gradient adaptation**

The 768px+ media query from Task 1 Step 3 already shifts the gradient from `50% 40%` to `30% 50%` (anchored left). Verify this is in place.

**Step 3: Update print styles**

The print media query (line 1036-1039) has `#hero { min-height: auto; }`. Since we removed min-height entirely, this print override is now unnecessary. Remove it:

Delete from `@media print`:

```css
#hero {
  min-height: auto;
  padding: 2rem 0;
}
```

Replace with just the padding override:

```css
#hero {
  padding: 2rem 0;
}
```

**Step 4: Run lint + format**

Run: `npm run check`
Expected: PASS

**Step 5: Commit**

```bash
git add css/styles.css
git commit -m "style: remove hero min-height, update print styles"
```

---

### Task 4: Update Snapshots for Batch 1

**Files:**

- Update: `tests/visual.spec.js-snapshots/` (auto-generated)

**Step 1: Update visual regression snapshots**

Run: `npm run test:update-snapshots`
Expected: Snapshots regenerated for homepage (hero layout changed). Case study and resume snapshots unchanged.

**Step 2: Run full test suite**

Run: `npm test`
Expected: All tests pass including visual regression with new snapshots.

**Step 3: Run lint**

Run: `npm run check`
Expected: PASS

**Step 4: Commit Batch 1**

```bash
git add tests/visual.spec.js-snapshots/ css/styles.css
git commit -m "style: update visual regression snapshots for hero redesign"
```

---

## Batch 2: Mobile Stats + Contact + Personality

### Task 5: Mobile Stat Adaptation

**Files:**

- Modify: `css/styles.css:919-931` (≤480px media query)

**Step 1: Remove stat hiding, reduce font sizes**

Replace the ≤480px media query (lines 919–931):

```css
@media screen and (max-width: 480px) {
  .card-outcome {
    gap: 1rem 1.25rem;
  }

  .card-outcome .stat-value {
    font-size: 0.875rem;
  }

  .card-outcome .stat-label {
    font-size: 0.5625rem;
  }
}
```

Key change: removed `.card-outcome .stat:last-child { display: none; }`. Added `.stat-label` size reduction. `.stat-value` drops from `1rem` to `0.875rem`.

**Step 2: Run lint + format**

Run: `npm run check`
Expected: PASS

**Step 3: Verify at 375px viewport**

Run: `npx playwright test tests/layout.spec.js`
Expected: PASS — all 3 stats visible, no overflow. If the layout test checks stat count, it should now expect 3 not 2.

**Step 4: Commit**

```bash
git add css/styles.css
git commit -m "fix: show all 3 stats on mobile — reduce font size instead of hiding"
```

---

### Task 6: Resume Link in Contact Section

**Files:**

- Modify: `index.html:236-272` (contact links)

**Step 1: Add resume link as 4th contact item**

In `index.html`, add after the GitHub `<li>` (after line 271, before `</ul>`):

```html
<li>
  <a href="resume.html" rel="nofollow"
    ><svg
      class="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" /></svg
    >Resume</a
  >
</li>
```

Follows the same formatting pattern as existing links (SVG inline, tight closing tags).

**Step 2: Run lint + a11y tests**

Run: `npm run check && npx playwright test tests/a11y.spec.js`
Expected: PASS — resume link is accessible (icon has `aria-hidden="true"`, link has text content)

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add resume link to contact section with external-link icon"
```

---

### Task 7: Personality Line in Case Study Footers

**Files:**

- Modify: `work/cfa-dsp-application/dsp-application.html:354-356` (footer)
- Modify: `work/contract-transfer/contract-transfer.html:397-399` (footer)
- Modify: `work/pinnacle-program-selection/pinnacle-automation.html:383-385` (footer)

**Step 1: Add F1 personality line to all 3 case study footers**

In each file, add the personality line before the copyright `<p>`:

Before:

```html
<footer>
  <p>&copy; <span id="copy-year">2026</span> Taylor Stephens. All rights reserved.</p>
</footer>
```

After:

```html
<footer>
  <p class="footer-personality">
    Built by a PM who watches F1 strategy calls like most people watch Netflix.
  </p>
  <p>&copy; <span id="copy-year">2026</span> Taylor Stephens. All rights reserved.</p>
</footer>
```

The `.footer-personality` class already exists in `css/styles.css` (lines 734-742) and will apply automatically.

**Step 2: Run HTML validation**

Run: `npm run lint:html`
Expected: PASS

**Step 3: Run full test suite**

Run: `npm test`
Expected: Some visual regression failures (expected — case study pages changed). Other tests pass.

**Step 4: Commit**

```bash
git add work/cfa-dsp-application/dsp-application.html work/contract-transfer/contract-transfer.html work/pinnacle-program-selection/pinnacle-automation.html
git commit -m "feat: add F1 personality line to case study footers"
```

---

### Task 8: Update Snapshots for Batch 2

**Files:**

- Update: `tests/visual.spec.js-snapshots/` (auto-generated)

**Step 1: Update visual regression snapshots**

Run: `npm run test:update-snapshots`

**Step 2: Run full test suite**

Run: `npm test`
Expected: All tests pass

**Step 3: Commit Batch 2**

```bash
git add tests/visual.spec.js-snapshots/
git commit -m "style: update visual regression snapshots for batch 2"
```

---

## Batch 3: Token Cleanup + CSS Simplifications

### Task 9: Sticky Nav Token Compliance

**Files:**

- Modify: `css/styles.css:766` — `rgba(255, 255, 255, 0.92)` in 640px+ header
- Modify: `css/styles.css:814` — `rgba(255, 255, 255, 0.92)` in 1024px+ header
- Modify: `css/case-study.css:1236` — `rgba(255, 255, 255, 0.92)` in 1024px+ `.back-nav`
- Modify: `css/resume.css:383` — `rgba(255, 255, 255, 0.92)` in 640px+ `.back-nav`

**Step 1: Replace all 4 instances**

In each file, replace `rgba(255, 255, 255, 0.92)` with `rgba(250, 248, 245, 0.92)` to match `--color-bg: #faf8f5`.

**Step 2: Verify no remaining instances**

Run: `grep -r "rgba(255, 255, 255" css/`
Expected: Zero matches

**Step 3: Run lint**

Run: `npm run check`
Expected: PASS

**Step 4: Commit**

```bash
git add css/styles.css css/case-study.css css/resume.css
git commit -m "fix: replace hardcoded white rgba with --color-bg-derived values"
```

---

### Task 10: Remove h2 Accent Underlines

**Files:**

- Modify: `css/styles.css:121-129` — `h2::after` rule
- Modify: `css/styles.css:679-682` — `#contact h2::after` centering override
- Modify: `css/styles.css:1013-1015` — print `h2::after { display: none }`
- Modify: `css/case-study.css:99-107` — `.cs-section h2::after` rule

**Step 1: Delete h2::after from styles.css**

Remove lines 121-129:

```css
h2::after {
  content: '';
  display: block;
  width: 2em;
  height: 2px;
  background: linear-gradient(to right, var(--color-accent), var(--color-accent-hover));
  margin-top: 0.75em;
  border-radius: 1px;
}
```

**Step 2: Delete #contact h2::after from styles.css**

Remove lines 679-682:

```css
#contact h2::after {
  margin-left: auto;
  margin-right: auto;
}
```

**Step 3: Delete print h2::after from styles.css**

Remove from print media query:

```css
h2::after {
  display: none;
}
```

**Step 4: Delete .cs-section h2::after from case-study.css**

Remove lines 99-107:

```css
.cs-section h2::after {
  content: '';
  display: block;
  width: min(2em, 100%);
  height: 2px;
  background: linear-gradient(to right, var(--color-accent), var(--color-accent-hover));
  margin-top: 0.75em;
  border-radius: 1px;
}
```

**Step 5: Verify no remaining instances**

Run: `grep -r "h2::after" css/`
Expected: Zero matches

**Step 6: Run lint**

Run: `npm run check`
Expected: PASS

**Step 7: Commit**

```bash
git add css/styles.css css/case-study.css
git commit -m "style: remove dated h2 accent underlines from all CSS"
```

---

### Task 11: Card Left-Border Removal + Shadow Consistency

**Files:**

- Modify: `css/styles.css:479-490` (`.card` rules)

**Step 1: Remove left-border and adjust padding**

In `.card` (lines 479-490), remove `border-left: 3px solid var(--color-accent)` and change left padding from `2rem` to `1.5rem`. Add `box-shadow: var(--shadow-sm)`:

```css
.card {
  padding: 2rem 1.5rem;
  margin: 0 -1.5rem;
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    background-color var(--transition-fast);
  border-radius: var(--radius-md);
  position: relative;
}
```

Changes: removed `border-left`, changed `padding: 2rem 1.5rem 2rem 2rem` → `padding: 2rem 1.5rem`, added `box-shadow: var(--shadow-sm)`.

**Step 2: Run lint**

Run: `npm run check`
Expected: PASS

**Step 3: Commit**

```bash
git add css/styles.css
git commit -m "style: remove card left-border, add shadow consistency"
```

---

### Task 12: Update Snapshots + Final Verification for Batch 3

**Files:**

- Update: `tests/visual.spec.js-snapshots/` (auto-generated)

**Step 1: Update visual regression snapshots**

Run: `npm run test:update-snapshots`

**Step 2: Run full test suite**

Run: `npm test`
Expected: All 164+ tests pass

**Step 3: Run lint**

Run: `npm run check`
Expected: PASS

**Step 4: Final verification greps**

Run these to confirm all cleanup targets are resolved:

```bash
grep -r "rgba(255, 255, 255" css/       # Expected: zero matches
grep -r "h2::after" css/                 # Expected: zero matches
grep -r "border-left.*accent" css/       # Expected: zero matches
grep -r "display: none" css/styles.css   # Expected: only non-stat rules remain
```

**Step 5: Commit Batch 3**

```bash
git add tests/visual.spec.js-snapshots/ css/styles.css css/case-study.css css/resume.css
git commit -m "style: update visual regression snapshots for batch 3 cleanup"
```

---

## Post-Implementation

After all 3 batches ship, run `/critique` to verify the priority issues are resolved and the anti-patterns verdict remains PASS.
