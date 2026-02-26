# UI/UX Refactor Prompt
<!-- Generated from: _Lab/guides/ux-design + _Lab/guides/visual-design -->
<!-- Date: 2026-02-25 -->

Use the `ui-review` skill to audit the portfolio website, then the `ui-refactor` skill to implement changes.

## Context

Project: `/Users/taylorstephens/Dev/_Lab/website-portfolio`
Primary audience: Technical recruiters and hiring managers scanning 50+ portfolios under time pressure.
Success criterion: A visitor answers "Who is this person, what do they do, why should I care?" within 5 seconds of landing.

Existing design system:
- 44 CSS custom properties in `css/styles.css :root` — use ONLY these tokens, no new values
- Fluid typography already uses `clamp()` — do NOT add font-size media query overrides
- Homepage: `index.html` (6 work cards + 3 personal cards)
- Work pages: `work/*/*.html` (paths use `../../`), project pages: `projects/*.html` (paths use `../`)

## Hard Constraints

- Do NOT modify `Chart.js` color values — they read from CSS tokens via `getComputedStyle`
- Do NOT add new CSS custom properties without also adding them to `:root` in `css/styles.css`
- Do NOT remove or rename existing tokens (downstream pages depend on them)
- Fluid typography: `clamp()` only — no font-size media query overrides
- Every spacing value must come from the existing scale — no arbitrary `px` values

## Audit Scope (Phase 1)

Read `index.html` and `css/styles.css` completely before proposing anything. Then audit for:

**Visual Hierarchy**
- Does the above-the-fold section establish: name → role/specialty → strongest signal → primary CTA in Z-pattern order (name top-left, nav top-right, value prop center, CTA lower-right)?
- Are there more than 4 type sizes on any single screen? (target: 3–4 max)
- Is secondary content de-emphasized with color/weight rather than just size? (dark `#1a1a1a` primary, medium grey `#6b7280` secondary, light grey `#9ca3af` tertiary)
- Does any element use font-weight below 400? (use lighter color instead — never thinner weight)

**Navigation**
- Are there more than 5 global nav items? (4 is ideal: Work / About / Resume / Contact)
- Do all nav labels use visitor vocabulary, not creator vocabulary?
- Are nav labels parallel in grammatical structure (all nouns or all phrases)?
- Is there a visible active-state indicator on the current page?

**Spacing**
- Is spacing consistent with an 8px base scale (4, 8, 12, 16, 24, 32, 48, 64, 96)?
- Does every group have more space around it than within it? (label-to-field gap must be smaller than field-to-field gap)
- Are there any ambiguous proximity relationships (elements equidistant when they should be grouped)?

**Typography**
- Is body text minimum 16px with `line-height: 1.4–1.6`?
- Is prose container width constrained to `max-width: 65ch`?
- Are headlines using `line-height: 1.0–1.2` and slight negative tracking (`letter-spacing: -0.02em`)?
- Is any all-caps label text using increased tracking (`letter-spacing: 0.08–0.12em`)?

**Microcopy**
- Do all buttons complete the sentence "I want to ___"? (eliminate "Submit," "View," "Learn More")
- Does the contact form show what happens after submission (response time)?
- Are there designed empty states for any filtered or dynamic content areas?
- Do success/error states follow: [what happened] + [why] + [what to do next]?

**Responsive / Touch**
- Do all interactive elements meet 44×44px minimum touch target?
- Is there horizontal scrolling on any viewport?
- Are project cards using `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`?

**Shadows and Depth**
- Are box shadows using two-layer natural shadows (ambient + direct)?
- Do interactive cards show shadow elevation change on hover?

## Output Format (Phase 1)

Return a structured audit as:

```
## Critical (blocks goal completion)
- [issue] | [file:line] | [fix]

## Major (significantly impairs)
- [issue] | [file:line] | [fix]

## Minor (causes confusion)
- [issue] | [file:line] | [fix]

## Cosmetic (polish)
- [issue] | [file:line] | [fix]
```

## Implementation (Phase 2)

After I approve the audit, use `ui-refactor` to implement in this order:
1. Visual hierarchy fixes (de-emphasize secondary content before adding visual weight anywhere)
2. Spacing corrections (apply 8px scale consistently)
3. Typography adjustments (line-height, max-width on prose, tracking)
4. Microcopy rewrites (buttons, empty states, success/error messages)
5. Responsive / touch target fixes
6. Shadow and hover polish

For each change: read the full file once, plan all edits, apply in 1–3 Edit calls, re-read once to verify.
