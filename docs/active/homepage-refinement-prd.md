# PRD: Homepage Refinement — Post-Critique Findings

<!-- project: website-portfolio -->

_Created: 2026-03-11_
_Source: `/critique` re-run after Slate + Rose-Clay + Cream palette ship (design-critique-prd.md, completed 2026-03-11)_
_Status: Ready for implementation_
_Predecessor: `docs/active/design-critique-prd.md` (Complete)_

---

## Executive Summary

The palette redesign shipped clean — 164/164 tests pass, WCAG AA compliance verified, and the `/critique` re-run returned a PASS on the anti-patterns verdict. Five priority issues remain. The largest is the **hero composition**: centered headshot + centered text + centered CTA is the safest pattern on the page, creating a tone mismatch with the bolder card section below. The remaining four are lower-effort: mobile stat hiding drops high-value metrics, the contact section underserves its conversion job, the footer personality line is orphaned where no one reads, and three hardcoded `rgba(255,255,255,0.92)` values break token discipline. Minor CSS simplifications — including removing the dated h2 accent underlines entirely — round out the scope.

This PRD does not propose new content, new pages, or new components. Every change refines what exists. Ships in three batches.

---

## Interview Decisions (Locked)

All strategic questions resolved via interview on 2026-03-11:

| Decision            | Choice                                                   | Rationale                                                                                                                                                 |
| ------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero layout         | **Split layout** — text left (60%), headshot right (40%) | Keeps headshot prominent while breaking centered symmetry. CSS grid at 768px+, stacks on mobile.                                                          |
| Hero background     | **Adapt gradient to new layout**                         | Redesign the radial gradient to complement the split — e.g., warm wash anchored to the text side. Don't strip it.                                         |
| Hero copy           | **Keep both paragraphs**                                 | Value-prop ("I'm the person you call when...") AND career-shape ("8 years building...") both earn their place. Lay out differently, don't cut.            |
| Headshot            | **Keep in hero, prominent**                              | Face + name = memorable. PM portfolios benefit from the human element early. Right side of the split layout.                                              |
| Split breakpoint    | **768px+** (wide tablet)                                 | Best practice for portfolio split heroes. Below 768px, too narrow for readable text column alongside headshot.                                            |
| Mobile hero         | **Headshot centered, text left-aligned**                 | Headshot stays centered at top (visual anchor), then name/tagline/paragraphs/CTA all left-align below.                                                    |
| Hero CTA            | **Ghost/outlined button**                                | More editorial than filled. Border-only button (slate border, transparent fill). Hero-only — case study CTAs keep filled buttons.                         |
| Hero height         | **Content-sized (natural height)**                       | No min-height. Hero is exactly as tall as content requires. Cards may peek above the fold on large screens. Faster to the work.                           |
| F1 personality line | **Keep in footer + add to case study footers**           | Wider reach without forcing personality into a high-profile position. Homepage footer + 3 case study footers = 4× the exposure.                           |
| Resume link label   | **"Resume" with external-link icon**                     | Uses same icon pattern as LinkedIn/GitHub. `rel="nofollow"` on the link. Resume page keeps `noindex, nofollow` meta.                                      |
| Contact alignment   | **Centered heading, horizontal link row**                | Centered "Get In Touch" + intro sentence. Links in a horizontal row (matches current desktop layout). Hybrid approach — trending pattern.                 |
| h2 accent lines     | **Remove entirely**                                      | The 2em underline on h2 is a 2020-2022 pattern. Current trend: heading weight + spacing create hierarchy. Remove `h2::after` and `.cs-section h2::after`. |
| Card left-border    | **Remove, keep top-border only**                         | Top-border opacity variants (100%, 65%, 40%) are the sole differentiator. Left-border accent is associated with blockquotes, not project cards.           |
| Card shadows        | **Add shadow to Featured cards too**                     | Both `.card` and `.project-card` get `box-shadow: var(--shadow-sm)`. Width difference creates hierarchy; shadow is consistent polish.                     |
| Batch cadence       | **Three batches**                                        | Hero is Batch 1. Mobile stats + contact + resume link is Batch 2. Token cleanup + CSS simplifications is Batch 3.                                         |

---

## Problem Statement

The critique confirmed the site passes the AI-slop test and delivers strong content through a distinctive design system. But the homepage's opening seconds — the hero — are the weakest section compositionally. A hiring manager's first impression is "template" before the cards prove "designed." The remaining issues are friction points: recruiters on mobile lose high-value stats, the conversion section (Contact) lacks visual weight, and a few token-discipline gaps remain from the palette migration.

**User impact by audience** (from `docs/active/JTBD.md`):

| Issue                | Hiring Manager (30–90s)                                     | Recruiter (15–30s)                | Peer (2–5min)          |
| -------------------- | ----------------------------------------------------------- | --------------------------------- | ---------------------- |
| Safe hero            | First impression is "template" — doesn't match card quality | Doesn't affect (skips to metrics) | Doesn't affect         |
| Mobile stat hiding   | N/A (desktop)                                               | Loses best metrics on phone scan  | N/A (desktop)          |
| Thin contact section | Missing resume link for forwarding                          | Missing resume link               | Minimal impact         |
| Orphaned personality | Never sees it                                               | Never sees it                     | Might scroll to footer |
| Hardcoded nav rgba   | No visual impact                                            | No visual impact                  | No visual impact       |

---

## Objectives

| #   | Objective                                                                | Measurable Target                                                                               |
| --- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| O1  | Hero composition matches the design confidence of the card section below | Split layout at 768px+; left-aligned text on mobile; no centered-stack pattern                  |
| O2  | Mobile visitors retain all high-value metrics                            | Zero stat hiding at ≤480px; all 3 stats visible via reduced font sizes                          |
| O3  | Contact section serves the hiring manager's forwarding workflow          | Resume link added with `rel="nofollow"`; section has visual weight comparable to other sections |
| O4  | Personality line reaches more visitors                                   | F1 line appears in homepage footer AND all 3 case study footers                                 |
| O5  | Token discipline: zero hardcoded color values in layout CSS              | All `rgba(255,255,255,*)` replaced with `--color-bg`-derived values                             |
| O6  | Minor CSS simplifications reduce visual noise                            | h2 lines removed, card left-border removed, shadows consistent                                  |

---

## User Stories

**US-1 (Hiring Manager — Hero):**

> When I land on this portfolio from an application link, I want the first screen to feel as intentionally designed as the case study cards, so I don't dismiss the site as a template before seeing the work.

**US-2 (Recruiter — Mobile Stats):**

> When I'm scanning a portfolio on my phone between meetings, I want to see the most compelling metric for each project without anything hidden, so I can write a pass-through note with a specific number.

**US-3 (Hiring Manager — Contact/Resume):**

> When I've read a case study and want to forward this candidate to my team, I want to find a resume link without navigating away from the portfolio, so I can share it in under 10 seconds.

**US-4 (Peer — Personality):**

> When I'm browsing casually to understand what this person does, I want a moment of personality earlier in the page, so I remember them as a human and not just a list of metrics.

---

## Functional Requirements

### FR-1: Hero Composition Redesign (O1)

**Scope:** `index.html` hero section, `css/styles.css`

**Problem:** The centered headshot + centered text + centered CTA is the most common portfolio hero pattern. Everything below it (left-aligned narrative cards, varied component types, editorial multi-width rhythm) is bolder. The hero sets a safer tone than the page delivers.

**Direction (locked):** Split layout — text left (60%), headshot right (40%).

**Desktop (768px+):**

- CSS grid: `grid-template-columns: 1fr auto` or `3fr 2fr`
- Left column: h1 (Cormorant Garamond, display scale), tagline (pipe-separated metadata), value-prop paragraph, career-shape paragraph (italic, muted), ghost CTA button
- Right column: headshot (150px, border-radius 50%, vertically centered in the column)
- Background: adapted warm gradient — radial gradient anchored to the left/text side of the split, not centered. E.g., `radial-gradient(ellipse at 30% 50%, var(--color-accent-light) 0%, transparent 60%)`
- No `min-height` — content-sized. Remove `min-height: min(70vh, 600px)`
- Max-width: use `--max-width` (720px / 780px) for the hero container, same as other prose sections. The split happens within this container.

**Mobile (<768px):**

- Stacks vertically: headshot (centered, 120px) → h1 (left-aligned) → tagline (left-aligned) → paragraphs (left-aligned) → CTA (left-aligned)
- Hero text is NOT centered on mobile — left-alignment reads faster and feels more editorial
- Headshot remains centered as a visual anchor above the text block

**Ghost CTA button (hero only):**

- Replace filled `background-color: var(--color-heading)` with outlined: `border: 2px solid var(--color-heading)`, `background: transparent`, `color: var(--color-heading)`
- Hover (desktop 1024px+): fills in — `background-color: var(--color-heading)`, `color: var(--color-bg)`
- Case study CTAs remain filled (unchanged)

**Acceptance Criteria:**

- [ ] Desktop: split layout with text left, headshot right at 768px+
- [ ] Mobile: headshot centered, all text left-aligned below 768px
- [ ] Ghost CTA button on hero (outline only, fills on hover)
- [ ] No `min-height` on hero — content-sized
- [ ] Background gradient adapted to split layout (anchored left)
- [ ] `text-align: center` removed from `#hero` (desktop and mobile)
- [ ] 15-second scan test still yields "program manager, builds systems" as primary recall
- [ ] `prefers-reduced-motion` respected (existing `fadeIn` animation unchanged)
- [ ] No horizontal overflow at any viewport width

### FR-2: Mobile Stat Adaptation (O2)

**Scope:** `css/styles.css` (`.card-outcome` at `≤480px`)

**Problem:** Current CSS hides `.card-outcome .stat:last-child` at ≤480px. This drops high-value metrics:

- DSP: "26% → 60% Completion rate" (the completion improvement)
- Contract Transfer: "29 transfers / Zero failures" (the reliability proof)
- Pinnacle: "3 → 10 Team expansion" (the scaling evidence)

**Solution (locked):** Reduce stat font sizes on mobile. Keep the horizontal row.

- Remove `display: none` rule for `.card-outcome .stat:last-child`
- At ≤480px: `.stat-value` drops to `0.875rem` (from `1rem`), `.stat-label` drops to `0.5625rem`
- All 3 stats remain in a single flex row
- Verify at 375px (iPhone SE) — if still too tight, allow flex-wrap as a fallback

**Acceptance Criteria:**

- [ ] All 3 stats visible at 480px viewport width
- [ ] All 3 stats visible at 375px viewport width (iPhone SE)
- [ ] No horizontal overflow or text truncation
- [ ] Stat labels remain readable (not smaller than 0.5625rem / 9px)
- [ ] `display: none` rule removed from `.card-outcome .stat:last-child`

### FR-3: Contact Section Enhancement (O3)

**Scope:** `index.html` contact section, `css/styles.css`

**Problem:** One sentence + three links. The section does its job but has less visual weight than any other section. For hiring managers, this is the conversion point — they want to forward a resume.

**Changes (locked):**

1. **Add resume link:** 4th contact link — external-link SVG icon (matching LinkedIn/GitHub `fill="currentColor"` pattern) + "Resume" label. Points to `/resume.html`. Add `rel="nofollow"` to prevent crawlers from following (resume page retains `noindex, nofollow` meta).

2. **Alignment:** Centered heading + intro sentence. Contact links remain in a horizontal row on desktop (current behavior). The link row already handles 4 items at the existing `gap: 2.5em`.

3. **Visual weight:** Evaluate after adding the 4th link — the additional element may provide enough weight. If not, consider a subtle `border-top: 1px solid var(--color-border-light)` above the section.

**Resume link HTML:**

```html
<li>
  <a href="resume.html" rel="nofollow">
    <svg
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

**Acceptance Criteria:**

- [ ] Resume link present in contact section, pointing to `resume.html`
- [ ] Resume link uses external-link SVG icon matching existing icon style
- [ ] `rel="nofollow"` on the resume link
- [ ] Contact section has at least equal visual weight to the Skills section above it
- [ ] axe-core passes (link is accessible, icon has `aria-hidden="true"`)
- [ ] Link row handles 4 items without wrapping on desktop (≥640px)

### FR-4: Personality Line Expansion (O4)

**Scope:** `index.html` footer (existing), 3 case study HTML files

**Problem:** The F1 personality line ("Built by a PM who watches F1 strategy calls like most people watch Netflix.") only appears in the homepage footer. Most visitors never scroll there.

**Solution (locked):** Keep in homepage footer AND add to all 3 case study footers. 4× the exposure without moving it to a higher-profile position.

Add to each case study's footer (before the copyright line):

- `work/cfa-dsp-application/dsp-application.html`
- `work/contract-transfer/contract-transfer.html`
- `work/pinnacle-program-selection/pinnacle-automation.html`

Use the same markup: `<p class="footer-personality">...</p>`

The `.footer-personality` class already exists in `css/styles.css` and will apply automatically.

**Acceptance Criteria:**

- [ ] F1 personality line appears in homepage footer (unchanged)
- [ ] F1 personality line appears in all 3 case study footers
- [ ] Styling matches homepage (`.footer-personality` class)
- [ ] No impact on case study page structure or layout

### FR-5: Sticky Nav Token Compliance (O5)

**Scope:** `css/styles.css`, `css/case-study.css`, `css/resume.css`

**Problem:** `background: rgba(255, 255, 255, 0.92)` appears in three locations. These use pure white (#ffffff) rather than the page background (#faf8f5 / `--color-bg`). On the warm cream background, this creates a barely perceptible cool flash when the nav becomes sticky.

**Fix:** Replace all instances with `rgba(250, 248, 245, 0.92)` to match `--color-bg`.

Locations:

1. `css/styles.css` — `@media screen and (min-width: 640px)` header rule
2. `css/styles.css` — `@media screen and (min-width: 1024px)` header rule
3. `css/case-study.css` — `@media screen and (min-width: 1024px)` `.back-nav` rule
4. `css/resume.css` — `@media screen and (min-width: 640px)` `.back-nav` rule

**Acceptance Criteria:**

- [ ] Zero instances of `rgba(255, 255, 255, 0.92)` in any CSS file
- [ ] Sticky nav background matches page warmth (no cool flash)
- [ ] `backdrop-filter: blur(12px)` still applies (unchanged)
- [ ] Visual regression snapshots updated

### FR-6: CSS Simplifications (O6)

**6a. Remove h2 accent underlines**

Delete `h2::after` rule from `css/styles.css` and `.cs-section h2::after` rule from `css/case-study.css`. The 2em decorative underline is a 2020-2022 pattern. Current trend: heading weight, size, and spacing create hierarchy without decoration.

Also remove:

- `#contact h2::after` centering overrides (no longer needed)
- Any print media rules that hide `h2::after` (no longer needed)

**6b. Remove card left-border**

Remove `border-left: 3px solid var(--color-accent)` from `.card`. The top-border opacity system (100%, 65%, 40%) becomes the sole card differentiator. Left-border accents signal blockquotes/annotations, not featured projects.

Adjust `.card` padding: `padding-left` can reduce from `2rem` to `1.5rem` (matching right padding) since the left-border indentation is gone.

**6c. Add shadow to Featured cards**

Add `box-shadow: var(--shadow-sm)` to `.card` (Featured Projects). Both card types now have consistent shadow treatment. The hover state already adds `var(--shadow-hover)`.

**Acceptance Criteria:**

- [ ] Zero `h2::after` rules in any CSS file
- [ ] Zero `border-left` on `.card`
- [ ] `.card` padding is symmetric (1.5rem left and right)
- [ ] `.card` has `box-shadow: var(--shadow-sm)` in resting state
- [ ] All changes pass visual regression across all pages

---

## Non-Functional Requirements

| Category            | Requirement                                                                                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Performance**     | No new render-blocking resources. Changes are CSS-only except resume link HTML and case study footer additions.                                                     |
| **Accessibility**   | All changes pass axe-core. WCAG AA contrast maintained. Focus indicators preserved. Ghost button has visible focus ring. Resume link icon has `aria-hidden="true"`. |
| **Design System**   | Any new CSS properties use existing tokens. No new tokens needed.                                                                                                   |
| **Browser Support** | Chrome, Firefox, Safari (latest 2 versions). Mobile Safari iOS 16+. CSS grid for hero split is supported in all targets.                                            |
| **Testing**         | All 164+ Playwright tests pass. Visual regression snapshots updated. Content-consistency tests unaffected (no content changes).                                     |
| **Content**         | No copy changes except: resume link addition, F1 line duplication to case study footers. No new claims.                                                             |

---

## Success Metrics

| Metric                 | Current State        | Target                                   | Measurement                                         |
| ---------------------- | -------------------- | ---------------------------------------- | --------------------------------------------------- |
| Hero composition       | Centered stack       | Split layout (text left, headshot right) | Visual inspection at 768px+ — no centered stack     |
| Mobile hero alignment  | Centered text        | Left-aligned text (headshot centered)    | Visual inspection at 375px                          |
| Mobile stats visible   | 2 of 3 at ≤480px     | 3 of 3 at ≤375px                         | Layout test at iPhone SE viewport                   |
| Resume discoverability | Not on homepage      | 1-click from homepage                    | Contact section includes link                       |
| F1 line visibility     | 1 page (homepage)    | 4 pages (homepage + 3 case studies)      | Grep for "footer-personality"                       |
| Hardcoded rgba count   | 3–4 instances        | 0                                        | `grep -r "rgba(255, 255, 255" css/` returns nothing |
| h2 accent underlines   | Present on all pages | Removed                                  | `grep -r "h2::after" css/` returns nothing          |
| Card left-borders      | Present              | Removed                                  | Visual inspection — top-border only                 |
| Anti-pattern score     | PASS                 | Clean PASS (no priority issues)          | Re-run `/critique`                                  |

---

## Implementation Sequence

### Batch 1: Hero Redesign (highest-impact, highest-risk)

| Step | Item                                                                          | Depends On |
| ---- | ----------------------------------------------------------------------------- | ---------- |
| 1a   | **Hero split layout** — CSS grid at 768px+, left-aligned text, headshot right | Nothing    |
| 1b   | **Mobile hero** — headshot centered, text left-aligned below 768px            | 1a         |
| 1c   | **Ghost CTA button** — outlined hero CTA, fills on hover (hero only)          | 1a         |
| 1d   | **Hero height** — remove `min-height`, content-sized                          | 1a         |
| 1e   | **Hero gradient** — adapt radial gradient to split layout (anchor left)       | 1a         |
| 1f   | **Visual regression snapshots** — update homepage snapshots                   | 1a–1e      |
| 1g   | **Full test suite** — `npm run check && npm test`                             | 1f         |

### Batch 2: Mobile Stats + Contact + Personality (medium-impact, low-risk)

| Step | Item                                                                              | Depends On |
| ---- | --------------------------------------------------------------------------------- | ---------- |
| 2a   | **Mobile stat adaptation** — remove `display: none`, reduce font sizes at ≤480px  | Nothing    |
| 2b   | **Resume link** — add 4th contact link with external-link icon + `rel="nofollow"` | Nothing    |
| 2c   | **Personality line** — add F1 line to 3 case study footers                        | Nothing    |
| 2d   | **Visual regression snapshots** — update homepage + case study snapshots          | 2a–2c      |
| 2e   | **Full test suite** — `npm run check && npm test`                                 | 2d         |

### Batch 3: Token Cleanup + CSS Simplifications (low-impact, low-risk)

| Step | Item                                                                            | Depends On |
| ---- | ------------------------------------------------------------------------------- | ---------- |
| 3a   | **Sticky nav rgba** — replace 3–4 instances with `rgba(250, 248, 245, 0.92)`    | Nothing    |
| 3b   | **Remove h2::after** — delete accent underline rules from both CSS files        | Nothing    |
| 3c   | **Remove card left-border** — delete `border-left` from `.card`, adjust padding | Nothing    |
| 3d   | **Add card shadow** — `box-shadow: var(--shadow-sm)` on `.card`                 | Nothing    |
| 3e   | **Visual regression snapshots** — update all changed pages                      | 3a–3d      |
| 3f   | **Full test suite + `/critique` re-run**                                        | 3e         |

---

## Assumptions & Constraints

**Assumptions:**

- The Slate + Rose-Clay + Cream palette is final (shipped in design-critique-prd.md).
- The 3-work-card + 3-personal-card structure is settled.
- Case study content and resume bullets are final.
- The hero redesign does not require new images or assets (headshot already exists in avif/webp/jpg).
- CSS grid for the split layout is supported in all target browsers.

**Constraints:**

- Static HTML/CSS — no build step, no framework.
- 57 existing tokens — no new tokens needed for this scope.
- The circular link chain (DSP → CT → Pinnacle → DSP) must remain intact.
- Site must remain polished between batches (actively applying to jobs).
- Ghost CTA is hero-only — case study filled CTAs are unchanged.

---

## Out of Scope

| Item                                  | Why                                                                  |
| ------------------------------------- | -------------------------------------------------------------------- |
| Dark mode                             | Separate project. Prep tokens exist.                                 |
| Page animations / scroll effects      | Future opportunity, not current deficiency.                          |
| Case study content rewrites           | Completed in previous PRD. Final.                                    |
| New case studies                      | Tracked in `docs/active/portfolio-expansion-plan.md`.                |
| Typography changes                    | Font pairing is a confirmed strength.                                |
| Blog / Writing section                | Captured as future scope. Nav stays at 3 items until content exists. |
| Wide-section expansion to other pages | Deferred until hero redesign is evaluated.                           |
| Hero photography / new headshot       | Redesign works with existing headshot assets.                        |
| PDF resume generation                 | The resume page is HTML. PDF export is a separate scope.             |
| Case study CTA changes                | Ghost button is hero-only. Case study CTAs remain filled.            |

---

## Open Questions

These were raised in the critique's "Questions to Consider" section. They inform future work but are not blockers for this PRD:

1. **"What if the hero led with the strongest case study metric?"** — Worth prototyping after FR-1 ships. The split layout could accommodate a featured metric in the left column, but adding content is a separate decision.

2. **"What would wide-section (1100px) extending to more sections look like?"** — The editorial rhythm between 720px and 1100px is effective. Expanding it is a layout exploration, not a refinement. Defer until the hero redesign establishes whether the current rhythm still works with the new hero.

---

## Related Documents

| Document                                         | Relationship                                                  |
| ------------------------------------------------ | ------------------------------------------------------------- |
| [design-critique-prd.md](design-critique-prd.md) | Predecessor — completed palette + Batch 1/2                   |
| [JTBD.md](JTBD.md)                               | Persona definitions, job map — user stories derive from these |
| [design-review-todos.md](design-review-todos.md) | Some overlap with FR-6 minor items                            |
| `ref/css-tokens.md`                              | Token reference — FR-5 enforces compliance                    |
| `ref/components.md`                              | Component reference for hero/card patterns                    |

---

_This PRD refines what the palette redesign revealed. The design system is strong; the composition needs to match._
