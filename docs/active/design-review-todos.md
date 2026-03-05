# Design Review: Unfixed Recommendations & Future Work

_Generated 2026-02-19 from frontend-design review sessions_
_Pages reviewed: all 6 work case studies, all 6 project pages, index.html_

---

## UNFIXED — From This Session's Reviews

### chargeback-parsing.html

- [ ] **Chart legend consistency** — `timeChart` has `legend: display: false`, `scalingChart` has `legend: display: true`. Either add a legend to the time chart or label the bars via annotation. Currently the time chart bars are red/green with no legend — understandable but inconsistent with the scaling chart which shows a legend.

### pinnacle-distance.html

- [ ] **Counter-intuitive finding table** — the table showing shorter distances ≠ better conversion has no `insight-callout` framing above it. The `insight-callout` that was added during the session appears above the section, but the table itself still lands cold. Consider a short framing sentence directly before the table.

### All case studies (cross-cutting)

- [ ] **`.comparison` h3 tags** — the new `.comparison-label` CSS class was added and applied to `chargeback-parsing.html`, but `pinnacle-distance.html` and any other pages using `.comparison` blocks with `<h3>` column headers still use the old `h3` style. Audit and update all `.comparison-before h3` / `.comparison-after h3` to `<p class="comparison-label">`.
  - Check: `work/pinnacle-station/pinnacle-distance.html`
  - Check: `work/bpr-scoring-pinnacle/pinnacle-scoring.html`

---

## FUTURE RECOMMENDATIONS

### Typography & Spacing

- [ ] **Case study h2 underline width** — `h2::after` is `2em` (updated from 2.5rem). On long h2 titles this reads well; on short ones (2–3 words) the underline feels too wide. Consider `min(2em, 100%)` or a fixed `2.5rem` cap.
- [ ] **`cs-tagline` font** — currently Epilogue (sans). A single Newsreader italic sentence here would distinguish the tagline from the tech-pills below and add editorial character. Worth prototyping on one page.
- [ ] **Metric card numbers** — currently Epilogue 700. Cormorant Garamond at large weight would make the numbers feel more editorial and less dashboard-y. Prototype on one page before rolling out.

### Visual Hierarchy

- [ ] **`scope-callout` visual weight** — the scope-callout sits between the header and first section but has minimal visual presence. A subtle left-border or background tint (matching `--color-accent-light`) would help it read as a distinct "card" rather than a continuation of the header.
- [ ] **`process-timeline` last item** — the green dot treatment for the final step (added in this session) works well on `chargeback-parsing.html`. Confirm it also applies correctly on `pinnacle-automation.html` which uses "Step 1/2/3" labels — the CSS targets `.timeline-item:last-child` so it should be automatic, but visually verify.
- [ ] **`funnel-chart` labels** — on `pinnacle-automation.html`, the funnel stage labels are left-aligned text. A monospace font (DM Mono) for the stage counts (`2,620`, `222`, etc.) would make the numbers more scannable and give the funnel a data-display feel.

### Content & Narrative

- [ ] **All 6 case studies: results section insight-callout audit** — confirmed added on `chargeback-parsing.html` and `pinnacle-automation.html`. Verify the other 4 pages have a framing callout before their metrics-row:
  - `pinnacle-distance.html` — check
  - `pinnacle-scoring.html` — check
  - `dsp-application.html` — check
  - `contract-transfer.html` — check
- [ ] **`cs-cta` "Related:" links** — audit all 6 case studies to confirm the circular link chain is intact and no page has a duplicate "Next" + "Related" pointing to the same destination (fixed on automation, may exist elsewhere).
- [ ] **Leadership quote pattern** — the `pinnacle-automation.html` leadership quote (`<em>"The acquisition team will create a script..."</em>`) is the only page with external attribution. This is powerful. Look for similar quotes or documented outcomes in other case studies that could be surfaced this way.

### Index / Homepage

- [ ] **Work cards "Approach" one-liners** — review for freshness now that the full case study content has been refined. Some card summaries may no longer match the case study's sharpened narrative.
- [ ] **Project cards** — `tap-sevenrooms` and `_Lab Environment` cards were flagged as weak in the code review TODO (see `TODO.md`). Still unresolved.

### Cross-Cutting Technical

- [ ] **Chart.js token pattern** — all 6 case studies use hardcoded hex colors in Chart.js scripts (accepted exception, per CLAUDE.md). If a color token ever changes, 6 files need manual updates. Consider a one-time refactor to `getComputedStyle` pattern when doing a CSS token refresh.
- [ ] **Mobile: `.data-table` overflow scroll** — flagged in `TODO.md`, still unresolved. Wide tables (root causes table, before/after tables) likely break on narrow viewports.
- [ ] **`og:image`** — all case studies missing social card images. Low priority until site goes public.

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
