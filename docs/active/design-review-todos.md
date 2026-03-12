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

- [ ] **Move `cs-unlock-cta` after Lessons** — Currently between Results and Lessons, creates false page-end signal. Readers may skip Lessons (the most differentiated section). Reframe prose from defensive ("anonymized metrics") to confident ("You've seen the framework. Request the full case study."). Add dedicated CSS.
- [ ] **CTA + back-nav touch targets** — `.cs-cta .cta-button` is ~34-38px tall (need 44px). `.back-nav a` is ~20-24px. Fix: `min-height: 44px` on both.
- [ ] **CT emoji icons → CSS/SVG** — 📋📨🔍⚠ render inconsistently across OS. Replace with simple CSS shapes using `--color-accent` or remove (title + description carry the component).

### Medium Priority — Engagement & Polish

- [ ] **Tagline: increase visual weight** — Currently italic + `--color-muted` makes recruiter-critical info the least prominent header element. Reduce italic, increase weight to 500-600, bring color up to `--color-text`.
- [ ] **"Read next" text → use target h1 hook** — Instead of "Read next: Selection Automation", use "Read next: The reward system that stopped rewarding the right people →". Leverages Zeigarnik effect.
- [ ] **Scroll-driven animation reduced-motion fix** — `animation-timeline: view()` ignores `animation-duration: 0.01ms` override. Add explicit `animation: none` in `@media (prefers-reduced-motion)` for `.bar-fill` and `.reading-progress`.
- [ ] **CT missing pull-quote close** — Partner Application and Pinnacle have pull-quotes; CT goes straight from Lessons to CTA. Weakest recency close.

### Low Priority — Semantic & Polish

- [ ] **Scrollable tables: add `aria-label`** — `tabindex="0"` wrappers need `role="region"` + `aria-labelledby` pointing to `<caption>` id.
- [ ] **`<blockquote>` → `<aside>` for pull quotes** — Content is author's own synthesis, not external citation. Screen readers announce as block quote.
- [ ] **Pinnacle before/after table: add `scope="col"`** — Explicit column scoping for screen readers.
- [ ] **Font preload hints** — Add `<link rel="preload">` for Cormorant Garamond 600 and Newsreader 400 woff2 files.
- [ ] **`.scope-context` missing CSS rule** — Class used in partner-application but has no definition. Add rule or change to `.scope-meta`.
- [ ] **Funnel chart scroll affordance** — No visual hint that table is scrollable on mobile. Add subtle shadow or "scroll →" indicator.
- [ ] **`projected-note` needs caveat styling** — Currently just italic muted text; should be visually distinct as a disclaimer.
- [ ] **Pinnacle 7-item root-cause list** — At Miller's Law ceiling. Consider splitting into 2 visual groups.

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
