# PRD: Design Critique Implementation

<!-- project: website-portfolio -->

_Created: 2026-03-10_
_Updated: 2026-03-10 (interview decisions incorporated)_
_Source: Holistic design critique + trend research (Dribbble/Awwwards/Bestfolios patterns, 2024-2025)_
_Status: Spec Complete — Ready for Palette Mockup_

---

## Executive Summary

A 10-dimension design critique found a site that passes the AI-slop test and delivers strong content, but reads as competent-but-safe. This PRD scopes the visual refinement: burnt sienna/rust as a co-primary accent, a wider card section with editorial rhythm, a compressed hero with personality moved to the footer, and a redesigned resume metrics bar. The site must look polished between deploys — ship in two batches.

---

## Interview Decisions (Locked)

All strategic questions resolved via interview on 2026-03-10:

| Decision                  | Choice                                                     | Rationale                                                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Brand tone                | **Distinctly warm**                                        | Rust appears in section backgrounds, card accents, and interactive elements. Not a subtle hint — a co-primary.                                                                                |
| Warm palette              | **Burnt sienna / rust**                                    | Bold, editorial, magazine-feel. Candidate value: `#C4622D` (WCAG AA at 18pt+ against white).                                                                                                  |
| Rust scope                | **Let implementation decide**                              | Start with CTA + one background, iterate visually, stop when balanced. Document in ADR after.                                                                                                 |
| Rust tints per case study | **Phase 1 — ship with tints**                              | Three tints from the same rust family. Use opacity variations (`rgba`) to avoid token bloat.                                                                                                  |
| Card count                | **Keep three cards**                                       | Curation is done. Three cards show range.                                                                                                                                                     |
| Card layout               | **Break container** — wider cards                          | Featured Projects section goes to ~1100px while prose stays at 720px. Creates editorial expansion-contraction rhythm.                                                                         |
| Personal Projects         | **Stay narrow (720px)**                                    | Width difference IS the section differentiation. Featured = wide/prominent, Personal = compact/secondary.                                                                                     |
| Hero personality          | **Compress** — then moved to **footer**                    | Footer gets the personality line. Hero is pure competence: name, tagline, one sentence, CTA.                                                                                                  |
| Hero visual               | **Add visual interest** — pending trend research direction | Hero is short on text but gains visual weight through background treatment or layout shift. Research suggests: left-aligned text + warm background strip or split layout with headshot right. |
| Resume bar                | **Redesign, don't remove**                                 | Keep metrics prominent but kill the big-number-on-colored-bar pattern. Scannable for recruiters, not templated.                                                                               |
| Resume access             | **Remove from nav**                                        | Resume page exists at `/resume.html` for direct URL sharing. Not discoverable on site.                                                                                                        |
| Nav labels                | **Featured \| Building \| Contact**                        | 'Work' → 'Featured', 'Side Projects' → 'Building'. Blog/Writing captured as future scope.                                                                                                     |
| Scope callout             | **Inline metadata**                                        | Collapse to: 'Oct 2023–Q1 2024 · Program Manager · Acquisitions, Engineering, Leadership'.                                                                                                    |
| Lessons bullets           | **Numbered principles**                                    | '1. Benchmark the best, then apply as a customer.' Implies a ranked framework.                                                                                                                |
| Mobile stats              | **Two stats + 'more' link**                                | Hide the 'process' stat on mobile (e.g., 'Quarterly → monthly'). Keep outcome metrics.                                                                                                        |
| Sync points               | **Auto-generate copy.md**                                  | Script extracts text from HTML, writes .md. Zero drift by construction.                                                                                                                       |
| Footer                    | **Gets personality**                                       | 'Built by a PM who watches F1 strategy calls like most people watch Netflix.'                                                                                                                 |
| Color fallback            | **Try another warm color**                                 | If rust doesn't work against navy, pivot to warm gold or terra cotta. Direction stays warm.                                                                                                   |
| Prototyping               | **Mockup the palette, code the rest**                      | Palette is highest risk — mockup first. Layout and structural changes go directly to code.                                                                                                    |
| Ship cadence              | **Two batches** (actively applying)                        | Batch 1: palette + homepage. Batch 2: case study polish + resume + tests. Never deploy half-finished.                                                                                         |
| Blog / Writing            | **Future scope**                                           | Captured in portfolio expansion plan. Nav stays at 3 items until content exists.                                                                                                              |

---

## Problem Statement

The portfolio content is specific, quantified, and well-structured. The design is not. A hiring manager scanning 5 portfolios will remember the case study numbers — but not the site itself. The site looks like a well-executed template rather than a designed artifact.

---

## Objectives

| #   | Objective                                         | Measurable Target                                                                                                 |
| --- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| O1  | Introduce visual rhythm between homepage sections | Featured Projects breaks to ~1100px container; Personal Projects stays at 720px; at least 3 distinct visual zones |
| O2  | Break the monochrome with burnt sienna/rust       | Rust token system with per-study tints via opacity; used across CTA, backgrounds, card accents                    |
| O3  | Remove template patterns                          | Resume metrics bar redesigned; case study metric cards use rust tints                                             |
| O4  | Sharpen the hero                                  | Hero = name + tagline + one sentence + CTA. Personality in footer. Visual interest via background or layout.      |
| O5  | Harden content sync                               | 6 sync points tested (copy.md auto-generated); deployment verification                                            |
| O6  | Polish minor issues                               | Mobile stats, footer personality, inline scope callout, numbered lessons, nav relabel                             |

---

## Functional Requirements

### FR-1: Visual Rhythm via Multi-Width Layout (O1)

**Scope:** `index.html`, `css/styles.css`

**Decision:** Featured Projects section breaks to ~1100px container width. All other sections stay at 720px. This creates the editorial expansion-contraction rhythm identified in trend research as the primary differentiator for magazine-feel portfolios.

Implementation:

- Add a wider container class (e.g., `.wide-section`) with `max-width: 1100px` for the Featured Projects section
- Three horizontal cards at 1100px gives each ~340px (accounting for gap + padding) — fits: category label, title (1-2 lines), narrative (1 sentence / 25-35 words), 2-3 stats, link
- Personal Projects stays at 720px — the width contrast IS the hierarchy signal
- Skills & Experience section: evaluate whether the current `--color-bg-alt` treatment is sufficient or needs a stronger visual break (e.g., a full-bleed warm-tinted background)

**Card narrative trimming:** Current narratives are 35-50 words. Trim to one sentence, 25-35 words — the stat block carries quantitative weight, the narrative carries the surprising claim.

**Acceptance Criteria:**

- [ ] Featured Projects renders at ~1100px on desktop, full-width on mobile
- [ ] Personal Projects stays at 720px
- [ ] Card narratives are ≤35 words each
- [ ] At least 3 visually distinct zones identifiable without reading headings
- [ ] Cards stack single-column below 768px

### FR-2: Burnt Sienna / Rust Accent System (O2)

**Scope:** `css/styles.css` (new tokens), all pages

**Decision:** Burnt sienna (#C4622D candidate) as a co-primary accent. Rust appears across multiple surfaces — scope determined during implementation. Per-study tints via opacity variations (one base token, `rgba()` for lighter/deeper).

Token additions:

- `--color-warm`: base burnt sienna (e.g., `#C4622D`)
- `--color-warm-hover`: darker variant for interactive states
- `--color-warm-light`: `rgba(196, 98, 45, 0.08)` — tint for backgrounds
- Per-study tints use the same base at different opacities, not separate tokens

Surfaces to evaluate (iterate, don't pre-commit):

- CTA buttons (homepage "View My Work", case study "Read next")
- One section background (Featured Projects or hero)
- Card category tags or card top-border accents
- `h2::after` rule lines (currently navy)
- Case study metric card accents (per-study tint)
- Footer accent

**Palette mockup required before coding.** Apply color swatches to key elements in a static mockup. Verify:

- Contrast against white backgrounds (WCAG AA: 4.5:1 for body text, 3:1 for large text/UI)
- Harmony with existing navy (#1a3a6b)
- No clash with success green (#16a34a) and danger red (#dc2626) in case study data tables

**Fallback:** If rust doesn't work, pivot to warm gold or terra cotta. The warm direction is locked; the specific hue is not.

**Acceptance Criteria:**

- [ ] New token(s) documented in `ref/css-tokens.md`
- [ ] All rust uses reference tokens, no hardcoded hex values
- [ ] Contrast ratios meet WCAG AA
- [ ] axe-core accessibility tests pass
- [ ] Palette mockup reviewed and approved before full implementation

### FR-3: Resume Metrics Bar Redesign (O3)

**Scope:** `resume.html`, `css/resume.css`

**Decision:** Redesign, don't remove. Keep metrics prominent and scannable for recruiters, but eliminate the big-number-on-colored-bar pattern.

Options to prototype:

- **Inline highlight sentence:** "Prevented $13M in exit costs. Cut decisions 86.6% faster. Absorbed 17× volume growth." — styled as a pull-quote or highlighted paragraph with rust accent.
- **Subtle sidebar or margin annotations** alongside the summary paragraph.
- **Horizontal pills:** Metrics as styled inline chips (not a banner) that flow with the summary text.

Must NOT: use big numbers stacked vertically on a colored background bar with tiny labels beneath.

**Additional change:** Remove "Resume" from nav. Page remains at `/resume.html` for direct sharing.

**Acceptance Criteria:**

- [ ] No element matches the "big number on colored bar + tiny label" pattern
- [ ] Key metrics ($13M, 86.6%, 17×, 15+) still discoverable on first scan
- [ ] "Resume" removed from navigation
- [ ] Visual regression snapshots updated
- [ ] axe-core tests pass

### FR-4: Hero Sharpening + Visual Interest (O4)

**Scope:** `index.html` hero section, `css/styles.css`

**Decision:** Hero = name + tagline + one value-prop sentence + CTA. Personality line moves to footer. Add visual interest through background treatment or layout shift (not just short text).

Trend research identified three viable directions:

1. **Warm background strip:** Hero section gets a burnt sienna or warm-tinted background. Name and tagline sit on the colored field. White nav above, white Featured Projects below. The color transition creates a clear section boundary.

2. **Left-aligned editorial layout:** Break the centered hero. Name and tagline left-aligned in the left 55%, headshot in a contained rectangle on the right 45%. More editorial, more designed. Requires CSS grid.

3. **Large type, no photo in hero:** Name at 72-96px display type fills the top. One-line value prop beneath at smaller scale. Headshot moves to Contact section. Bold, confident, unusual for PM portfolios.

**Direction chosen during implementation based on what the rust palette mockup suggests.** The hero visual must complement the palette — don't choose the layout before seeing the color.

**Personality line relocation:** The F1/Arsenal sentence moves to the footer: _"Built by a PM who watches F1 strategy calls like most people watch Netflix."_

**Acceptance Criteria:**

- [ ] Hero contains at most 1 paragraph between tagline and CTA
- [ ] Personality line is in the footer, not the hero
- [ ] Hero has a visual treatment beyond just text (background color, layout shift, or typographic emphasis)
- [ ] 15-second scan test yields "program manager, builds systems" not "F1, Arsenal"

### FR-5: Content Sync Hardening (O5)

**Scope:** `tests/content-consistency.spec.js`, new script, `docs/active/content-writing-standards.md`

**Decision:** 6 rendered sync points tested via Playwright. Copy.md auto-generated from HTML (zero drift by construction).

**6 sync points per case study:**

1. `<meta name="description">`
2. `<meta property="og:description">`
3. `.cs-tagline`
4. `.tldr-content` (Quick Summary)
5. Homepage card (`.card-narrative` + `.stat-value`)
6. `resume.html` (corresponding bullet)

**Auto-generation script:** A script (Node.js or Python) that extracts text content from each case study HTML and writes the corresponding `*-copy.md` file. Runs as part of the build/test workflow or manually after edits.

**Acceptance Criteria:**

- [ ] Content-consistency tests cover all 6 rendered sync points for all 3 case studies
- [ ] Auto-generation script exists and produces correct copy.md from HTML
- [ ] `npm test` passes
- [ ] 6-sync-point model documented in content-writing-standards.md

### FR-6: Minor Polish Items (O6)

**6a. Mobile stat compression**

- Show 2 stats on mobile (≤375px), hide the 'process' stat per card:
  - DSP: hide "26% → 60% Completion rate" (keep "20 markets" + "15×")
  - CT: hide "274% YoY Volume absorbed" (keep "87% faster" + "29 transfers")
  - Pinnacle: hide "Quarterly → monthly Data refresh" (keep "57.9%→94.1%" + "3→10")
- CSS: `display: none` on the third `.stat` child at mobile breakpoint

**6b. Footer personality**

- Add personality line: _"Built by a PM who watches F1 strategy calls like most people watch Netflix."_
- Add "Back to top" link
- Keep copyright

**6c. Lessons → numbered principles**

- Replace ✓ checkmark bullets with numbered list (1. 2. 3. 4.)
- Bold takeaway sentence, regular explanation
- Applies to all 3 case study pages

**6d. Nav relabeling**

- "Projects" → "Featured"
- "Side Projects" → "Building"
- "Resume" → removed
- Final nav: Featured | Building | Contact

**6e. Scope callout → inline metadata**

- Replace the boxed 4-field grid with a single inline line:
  `Oct 2023–Q1 2024 · Program Manager, DSP Acquisitions · Acquisitions, Engineering, Leadership`
- Artifacts line drops to a separate subtle line or is removed (available in the Quick Summary)

**6f. Favicon verification**

- Verify `favicon.svg` renders in Chrome, Firefox, Safari tabs
- Add `<link rel="icon" type="image/png">` fallback if needed

**6g. Card visual differentiation**

- Add a 3px `border-top` per card in a category-specific color (research-backed pattern):
  - DSP: rust tint A
  - CT: rust tint B (or navy)
  - Pinnacle: rust tint C (or a cooler warm)
- This is the lowest-effort, highest-return change for imageless card differentiation

**Acceptance Criteria:**

- [ ] Mobile: 2 stats visible per card, no truncation at 375px
- [ ] Footer has personality line + back-to-top link
- [ ] Lesson bullets are numbered, no ✓ checkmarks
- [ ] Nav reads: Featured | Building | Contact
- [ ] Scope callout is inline metadata, not a boxed grid
- [ ] Favicon renders in 3 major browsers
- [ ] Cards have category-colored top borders

---

## Non-Functional Requirements

| Category            | Requirement                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Performance**     | No new render-blocking resources. New CSS added to existing files.                                                           |
| **Accessibility**   | All changes pass axe-core. New colors meet WCAG AA. Focus indicators preserved.                                              |
| **Design System**   | New tokens documented in `ref/css-tokens.md`. ADR written for the warm accent addition. No inline styles.                    |
| **Browser Support** | Chrome, Firefox, Safari (latest 2 versions). Mobile Safari iOS 16+.                                                          |
| **Testing**         | All 156+ Playwright tests pass. Visual regression snapshots updated.                                                         |
| **Content**         | No copy changes beyond: hero personality relocation, card narrative trimming (≤35 words), and nav relabeling. No new claims. |
| **Deployment**      | Site must look polished between deploys. Two-batch ship cadence.                                                             |

---

## Success Metrics

| Metric                  | Current State             | Target                           | Measurement            |
| ----------------------- | ------------------------- | -------------------------------- | ---------------------- |
| Anti-pattern score      | PASS with notes           | Clean PASS                       | Re-run `/critique`     |
| Visual zones (homepage) | 1-2                       | 3-4 distinct zones               | First-time viewer test |
| 15-second scan recall   | "PM, Amazon, F1, Arsenal" | "PM, Amazon, builds systems"     | Feedback template test |
| Color palette           | 1 accent (navy)           | 2 co-primaries (navy + rust)     | Token count            |
| Content sync coverage   | ~60% tested               | 100% (6 sync points × 3 studies) | Test file              |
| Mobile stat readability | Some truncation           | Zero truncation at 375px         | Visual regression      |

---

## Implementation Sequence

### Batch 1: Palette + Homepage (ship together)

| Step | Items                                                                                              | Depends On                        |
| ---- | -------------------------------------------------------------------------------------------------- | --------------------------------- |
| 1a   | **Palette mockup** — apply rust swatches to hero, CTA, cards, h2 rules. Verify contrast + harmony. | Nothing                           |
| 1b   | **Palette approval** — review mockup, confirm rust hue or pivot to fallback                        | 1a                                |
| 1c   | **Add rust tokens** to `css/styles.css` + document in `ref/css-tokens.md` + write ADR              | 1b                                |
| 1d   | **Hero restructure** — compress text, move personality to footer, add visual treatment             | 1c (needs palette for background) |
| 1e   | **Card section** — widen to ~1100px, trim narratives, add category-colored top borders             | 1c                                |
| 1f   | **Nav relabeling** — Featured \| Building \| Contact, remove Resume link                           | Nothing                           |
| 1g   | **Section rhythm** — verify 3+ visual zones, adjust spacing/backgrounds                            | 1d + 1e                           |
| 1h   | **Footer** — add personality line + back-to-top                                                    | 1d                                |
| 1i   | **Visual regression snapshots** — update all homepage snapshots                                    | 1d-1h                             |
| 1j   | **Full test suite** — `npm run check && npm test`                                                  | 1i                                |

### Batch 2: Case Study Polish + Resume + Tests (ship together)

| Step | Items                                                                              | Depends On                    |
| ---- | ---------------------------------------------------------------------------------- | ----------------------------- |
| 2a   | **Scope callout** — convert to inline metadata across 3 case studies               | Nothing                       |
| 2b   | **Lessons** — replace ✓ with numbered principles across 3 case studies             | Nothing                       |
| 2c   | **Case study rust tints** — apply per-study opacity tints to metric cards, accents | Batch 1 (tokens exist)        |
| 2d   | **Mobile stat hiding** — CSS for 2-stat display at ≤375px                          | Nothing                       |
| 2e   | **Resume metrics bar** — redesign treatment                                        | Batch 1 (palette established) |
| 2f   | **Content sync tests** — expand to 6 sync points × 3 studies                       | Nothing                       |
| 2g   | **Copy.md auto-generation script**                                                 | Nothing                       |
| 2h   | **Favicon verification**                                                           | Nothing                       |
| 2i   | **Visual regression snapshots** — update all changed pages                         | 2a-2e                         |
| 2j   | **Full test suite + `/critique` re-run**                                           | 2i                            |

---

## Assumptions & Constraints

**Assumptions:**

- Case study copy and resume bullets are final (no content rewrites).
- The 3-work-card + 3-personal-card structure is settled.
- The design token system remains the foundation.
- Actively applying to jobs — site must be polished between deploys.

**Constraints:**

- Static HTML/CSS — no build step, no framework.
- 57 existing tokens + new rust tokens (use opacity for tints, minimize additions).
- CSS-only for visual changes (no JavaScript effects).
- Circular link chain must remain intact (DSP → CT → Pinnacle → DSP).
- Deployment = `git push` + server pull. No CI/CD for visual testing.

---

## Out of Scope

| Item                        | Why                                                                         |
| --------------------------- | --------------------------------------------------------------------------- |
| Dark mode                   | Separate project. Prep tokens exist.                                        |
| Page animations             | Future opportunity, not current deficiency.                                 |
| Case study content rewrites | Post-Elements-of-Style. Final.                                              |
| Blog / Writing section      | Captured as future scope in portfolio expansion plan. Nav stays at 3 items. |
| New case studies            | Tracked in `docs/active/portfolio-expansion-plan.md`.                       |
| SEO / analytics             | Separate scope.                                                             |
| Typography changes          | Font pairing is a strength. Do not change.                                  |
| Chart.js updates            | Token-driven. Functional. Not in scope.                                     |

---

## Trend Research Summary

_Full report from comprehensive-researcher agent, March 2026. Sources: Awwwards, Bestfolios, Semplice, Smashing Magazine, Refactoring UI, Laws of UX._

**Key findings that informed decisions:**

1. **Editorial split layout** is the dominant hero pattern for non-designer PMs (2025). Centered stacks read as template defaults. Left-aligned text or a text-left/visual-right split signals seniority.

2. **Horizontal card information contract:** At ~340px per card, what fits comfortably: category label, title (1-2 lines), one-sentence narrative (25-35 words), 2-3 stats, link. Current narratives (35-50 words) are over-dense.

3. **Warm + cool split palettes** (rust/sienna + deep navy) are the clearest signal of editorial intentionality. Pure navy-on-white reads as consulting firm template.

4. **Variable section width** (narrow prose, wide cards) is the primary technique that makes a site feel editorial — more impactful than any single color or font choice.

5. **Category-colored top borders** on imageless cards are the lowest-effort, highest-return visual differentiation. 3px border-top in a distinct color per category.

6. **Specific palette confirmed across sources:** Navy #1a3a6b + rust #C4622D + warm cream #FAF6F0. Rust passes WCAG AA at 18pt+ against white.

---

## Related Documents

| Document                                                     | Relationship                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------- |
| [JTBD.md](JTBD.md)                                           | Persona definitions, job map — user stories derive from these |
| [design-review-todos.md](design-review-todos.md)             | Existing unfixed recommendations — some overlap with FR-6     |
| [design-system-usage.md](design-system-usage.md)             | Token usage guide — FR-2 updates this                         |
| [content-writing-standards.md](content-writing-standards.md) | FR-5 documents the 6-sync-point model here                    |
| [feedback-request-template.md](feedback-request-template.md) | 15-second scan test protocol                                  |
| [portfolio-expansion-plan.md](portfolio-expansion-plan.md)   | Blog/Writing section captured as future scope                 |
| `ref/css-tokens.md`                                          | Token reference — FR-2 adds new tokens                        |
| `docs/decisions/ADR-001-css-token-system.md`                 | Token system ADR — new ADR for warm accent                    |

---

_This PRD covers visual design refinement. Content, structure, and accessibility are strong. The goal: make the design as memorable as the content._
