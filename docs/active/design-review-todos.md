# Design Review: Unfixed Recommendations & Future Work

_Generated 2026-02-19 from frontend-design review sessions_
_Pages reviewed: all 6 work case studies, all 6 project pages, index.html_

---

## FIXED — From This Session's Reviews (2026-03-04)

### chargeback-parsing.html

- [x] **Chart legend consistency** — Accepted as intentional. `timeChart` is a single-dataset bar chart where x-axis labels ("Manual"/"Automated") serve the same purpose as a legend. `scalingChart` is a multi-dataset line chart that needs a legend to distinguish the two lines. Different chart types, different needs.
- [x] **Unwrapped data-table** — The email comparison table inside `.comparison-after` was missing a `.data-table-wrapper` for mobile overflow scroll. Wrapped it.

### pinnacle-distance.html

- [x] **Counter-intuitive finding table** — Already had insight-callout + framing paragraph before the performance comparison table. No change needed.
- [x] **Results insight-callout** — Added insight-callout before results metrics-row (was the only page missing one out of 6).

### All case studies (cross-cutting)

- [x] **`.comparison` h3 tags** — Audited all `.comparison` blocks across all pages. All use `<p class="comparison-label">` already. The `<h3>` tags in mcp-ecosystem deep-dive cards are intentional (`.link-card` navigation elements, not before/after comparisons).
- [x] **Results insight-callout audit** — All 6 work case studies now have insight-callouts before their results metrics-row.
- [x] **Chart.js token pattern** — Fixed in commit `f68ca74` (replaced hardcoded hex colors with CSS token variables across all 6 case studies).
- [x] **`og:image`** — Fixed in commit `d9de4a0` (added social card meta to all 14 pages).

---

## PUBLIC CASE STUDY REVIEW (2026-03-11)

_Sources: UX psychology audit, design effectiveness critique, a11y/perf audit, security audit_
_Pages reviewed: partner-application-public, contract-transfer-public, pinnacle-public_

### Contrast — Verified Passing (audit false positives)

Audit agent miscalculated luminance. Verified via Node WCAG calculator:

- accent `#975c4f` on white: **5.30** | cream: **5.00** | bg-alt: **4.54** — all AA pass
- muted `#736a62` on cream: **4.99** | bg-alt: **4.53** — all AA pass
- light `#6b6b6b` on cream: **5.03** | white: **5.33** — all AA pass
- Thin margins on bg-alt (0.03–0.04 above 4.5 threshold). Consider darkening one notch for safety margin in a future palette review, but no blocking issue.

### High Priority — Structure & UX

- [x] **Move `cs-unlock-cta` after Lessons** — Moved to after Lessons + pull-quote on all 3 public pages. Prose reframed from defensive to confident ("You've seen the framework..."). Dedicated `.cs-unlock-cta` CSS added with accent gradient background, centered layout, 44px touch target. (2026-03-12)
- [x] **CTA + back-nav touch targets** — `.cs-cta .cta-button` changed to `inline-flex` with `min-height: 44px`. `.back-nav a` gets `inline-flex` + `min-height: 44px`. `.cs-unlock-cta .cta-button` also 44px. Hover/active states added for unlock CTA in 1024px breakpoint. (2026-03-12)
- [x] **CT emoji icons → CSS/SVG** — Removed emoji icon divs from public CT icon-cards. Title + description carry the component without cross-OS rendering issues. Protected version retains existing emoji (separate scope). (2026-03-12)

### Medium Priority — Engagement & Polish

- [x] **Tagline: increase visual weight** — Removed `font-style: italic`, added `font-weight: 500`, changed color from `--color-muted` to `--color-text`. Tagline now reads as recruiter-critical info, not decorative metadata. (2026-03-12)
- [x] **"Read next" text → use target h1 hook** — Public chain now uses Zeigarnik hooks: "From 17 weeks to 2.3—without lowering the bar", "The reward system that stopped rewarding the right people", "74% never finished the application". (2026-03-12)
- [x] **Scroll-driven animation reduced-motion fix** — Added `@media (prefers-reduced-motion: reduce)` with `animation: none` for `.bar-fill` and `.reading-progress`. (2026-03-12)
- [x] **CT missing pull-quote close** — Added pull-quote to CT public: "The bar was never the problem. The infrastructure behind it was. Fix the system, and decisions happen in days—not months." (2026-03-12)

### Low Priority — Semantic & Polish

- [x] **Scrollable tables: add `aria-label`** — Added `role="region"` + `aria-labelledby` pointing to caption ids on all public page `.data-table-wrapper` elements. (2026-03-12)
- [x] **`<blockquote>` → `<aside>` for pull quotes** — Changed to `<aside class="pull-quote">` on partner-application-public and pinnacle-public. CT pull-quote also uses `<aside>`. (2026-03-12)
- [x] **Pinnacle before/after table: add `scope="col"`** — Added `scope="col"` to both `<th>` elements in pinnacle-public before/after table. (2026-03-12)
- [x] **Font preload hints** — Added `<link rel="preload">` for Cormorant Garamond 600 and Newsreader 400 woff2 files to all 3 public case study `<head>` sections. (2026-03-12)
- [x] **`.scope-context` missing CSS rule** — Added `.scope-context` rule to `case-study.css` with `font-size: var(--font-size-body-lg)`, italic, muted color. (2026-03-12)
- [ ] **Funnel chart scroll affordance** — Deferred. Funnel uses flex column with `min-width: 200px` stages and percentage widths; does not overflow on mobile. Tables already have `overflow-x: auto` via `.data-table-wrapper`. Low-value add.
- [x] **`projected-note` needs caveat styling** — Enhanced with `background-color: var(--color-bg-alt)`, `border-left: 2px solid var(--color-border)`, padding, and border-radius. Visually distinct from body text. (2026-03-12)
- [ ] **Pinnacle 7-item root-cause list** — Accepted as-is. 7 items is at Miller's Law ceiling but each has bold lead-in for scannability. Splitting would break the diagnostic narrative flow.

### Deploy-Time (Cloudflare/nginx)

- [ ] **Content Security Policy** — Add via Cloudflare Transform Rule: `default-src 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' https://taylorstephens.io; form-action https://formsubmit.co; frame-ancestors 'none'; base-uri 'self'`
- [ ] **HSTS: add `includeSubDomains; preload`** — Update in Cloudflare SSL/TLS settings, submit to hstspreload.org.
- [ ] **Referrer-Policy + Permissions-Policy headers** — Add via same Cloudflare Transform Rule.
- [ ] **Auth boundary verification** — Run `curl -sI` tests against both nginx ports after deploy to confirm public paths return 200 without challenge.
- [ ] **401.html honeypot inline style** — Move to CSS class before CSP deployment (inline `style` attribute blocked by strict CSP).

---

## FUTURE RECOMMENDATIONS

### Typography & Spacing

- [x] **Case study h2 underline width** — Already uses `min(2em, 100%)` in `case-study.css:96`. No change needed.
- [ ] **`cs-tagline` font** — currently Epilogue (sans). A single Newsreader italic sentence here would distinguish the tagline from the tech-pills below and add editorial character. Worth prototyping on one page.
- [ ] **Metric card numbers** — currently Epilogue 700. Cormorant Garamond at large weight would make the numbers feel more editorial and less dashboard-y. Prototype on one page before rolling out.

### Visual Hierarchy

- [x] **`scope-callout` visual weight** — Already has `border-left: 3px solid var(--color-accent)` and `background-color: var(--color-accent-light)` in `case-study.css:788-789`. No change needed.
- [x] **`process-timeline` last item** — Green dot + title color applied via `.timeline-item:last-child.completed` in `case-study.css:611-618`. Works on all pages using the component.
- [ ] **`funnel-chart` labels** — on `pinnacle-automation.html`, the funnel stage labels are left-aligned text. A monospace font (DM Mono) for the stage counts (`2,620`, `222`, etc.) would make the numbers more scannable and give the funnel a data-display feel.

### Content & Narrative

- [x] **All 6 case studies: results section insight-callout audit** — All 6 confirmed with insight-callout before results metrics-row (pinnacle-distance was the last one added, 2026-03-04).
- [x] **`cs-cta` "Related:" links** — Audited all 6 case studies. Circular link chain intact: CT → scoring → DSP → automation → distance → chargeback → CT. No duplicate Next + Related pointing to same destination.
- [ ] **Leadership quote pattern** — the `pinnacle-automation.html` leadership quote (`<em>"The acquisition team will create a script..."</em>`) is the only page with external attribution. This is powerful. Look for similar quotes or documented outcomes in other case studies that could be surfaced this way.

### Index / Homepage

- [x] **Homepage refinement (2026-03-11)** — Hero scaled to 2x with dramatic line-height, removed "Featured Projects" h2 (replaced with aria-label), removed Skills & Experience section, added resume link to contact, personality line added to all case study footers, contact section given visual weight with background/border, card top-border opacity widened (100%/50%/20%), sticky nav rgba aligned to `--color-bg`, h2 underlines removed sitewide, card left-borders removed + shadow added, orphaned CSS cleaned up.
- [x] **Work cards "Approach" one-liners** — reviewed 2026-03-11. All 3 card narratives and all 9 stats trace to specific lines in their case studies. No stale content.
- [ ] **Project cards** — `tap-sevenrooms` and `_Lab Environment` cards were flagged as weak in the code review TODO (see `TODO.md`). Still unresolved.

### Cross-Cutting Technical

- [x] **Chart.js token pattern** — Fixed in commit `f68ca74`. All 6 case studies now use `getComputedStyle` pattern to read CSS tokens.
- [x] **Mobile: `.data-table` overflow scroll** — `.data-table-wrapper` already has `overflow-x: auto` in `case-study.css`. Audited all tables: one unwrapped table in chargeback comparison fixed (2026-03-04). All tables now wrapped.
- [x] **`og:image`** — Fixed in commit `d9de4a0`. All 14 pages have social card meta.

---

## REFERENCE: Fixed This Session (2026-02-19)

### chargeback-parsing.html

- ✅ Insight-callout tightened (removed defensive scale language)
- ✅ New insight-callout added before results metrics-row
- ✅ Comparison column headers → `.comparison-label` (DM Mono caps)
- ✅ `.comparison-label` CSS added to `case-study.css`
- ✅ Approach h2 rewritten (removed em dash)

### pinnacle-automation.html

- ✅ Launch chart moved after full problem context
- ✅ Orphaned context paragraph → scope-callout "See Also" item
- ✅ Insight-callout added before results metrics-row
- ✅ Chart-label added above eligibility funnel
- ✅ Duplicate CTA links fixed
- ✅ Technical h2 rewritten to reflect full section scope
