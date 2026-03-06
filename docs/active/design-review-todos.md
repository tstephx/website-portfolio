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

- [ ] **Work cards "Approach" one-liners** — review for freshness now that the full case study content has been refined. Some card summaries may no longer match the case study's sharpened narrative.
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
