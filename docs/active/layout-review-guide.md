# Site Layout Review Guide

A step-by-step workflow for reviewing and improving the portfolio site layout. Content drives layout — not the other way around.

---

## When to Use This Guide

- You feel something looks "off" but can't pinpoint it
- You're adding a new page or section
- You're preparing the site for a job application push
- It's been 2+ weeks since the last visual review

---

## Phase 1: Audit What You Have

### Content audit (do this first)

```
/content-audit
```

Score every page on: accurate, useful, clear, findable, purposeful. Pages that score low on content need rewriting before any layout changes — a layout fix on weak content is wasted effort.

### Structural review

```
/ui-review index.html
/ui-review work/contract-transfer/contract-transfer.html
```

Checks for: overflow, broken responsive behavior, spacing inconsistencies, alignment issues, z-index problems.

### Design quality review

```
/frontend-design-pro:review index.html
```

Checks for: anti-patterns (hero badges, decorative blobs, generic fonts), design principles (hierarchy, contrast, whitespace, consistency), accessibility (headings, focus states, contrast ratios).

### Automated checks

```
/check                    # lint + format + html-validate + Playwright
/link-check               # broken links + link chain
```

---

## Phase 2: Identify What Needs Work

After the audits, categorize findings:

| Category | Action | Tool |
|---|---|---|
| Content is weak | Rewrite first, then reassess layout | `/content-audit` results |
| Layout breaks on mobile | Fix overflow/wrapping | `/ui-refactor` |
| Spacing feels wrong | Check against design tokens | `/design-system-principles` |
| Component looks dated | Targeted CSS update | `/ui-refactor` |
| Need a completely new layout | Full design process | `/frontend-design-pro:design` |
| Accessibility violation | Fix contrast/structure | Run axe-core tests |

**Rule: never change layout to fix a content problem.** If a section feels too long, the fix is editing the words — not adding columns.

---

## Phase 3: Make Changes

### For tweaks to existing pages

```
/ui-refactor
```

Tell Claude what feels off. Be specific: "the skills grid has too much whitespace on mobile" or "the metrics row feels cramped on desktop." Surgical changes only.

### For spacing/color/shadow decisions

```
/design-system-principles
```

Loads the decision framework before making any visual change. Prevents ad-hoc values that drift from the design system.

### For new pages or major redesigns

```
/frontend-design-pro:design
```

Interactive wizard: trend research → moodboard → color/font selection → full design. Use this only when building something that doesn't fit existing templates.

### For new case studies

```
/new-case-study --slug=name --title="Title"
```

Uses the existing template and 3-prompt pattern. No design decisions needed — the system handles it.

---

## Phase 4: Verify

### Visual regression

```
npm run test:visual
```

Compare screenshots at desktop (1280px) and mobile (390px). If changes are intentional:

```
/update-snapshots
```

### Layout tests

```
npx playwright test tests/layout.spec.js
```

Checks all 14 pages for horizontal overflow at 1280px, 390px, and 320px.

### Accessibility

```
npx playwright test tests/a11y.spec.js
```

WCAG 2.1 AA audit on all 14 pages via axe-core.

### Full suite

```
/check
```

---

## Phase 5: Get a Second Opinion

Ask Claude to dispatch subagents for parallel review:

- "Run the accessibility reviewer on all pages"
- "Run the content reviewer on the case studies"
- "Check for visual regressions after these CSS changes"

Or use Playwright MCP to interact with the site visually:

- "Take a screenshot of the homepage at mobile width"
- "Click through the link chain and verify each page loads"

---

## Design System Quick Reference

- **57 CSS tokens** in `css/styles.css :root` — full reference in `ref/css-tokens.md`
- **Component library** in `ref/components.md` — all case study components with snippets
- **Chart.js pattern** in `ref/chartjs-pattern.md` — token-driven, no hardcoded colors
- **ADR** in `docs/decisions/ADR-001-css-token-system.md` — why tokens exist

**Hard rules:**
- Use existing tokens. Don't invent new ones without updating the design doc.
- Fluid typography uses `clamp()` — no font-size media query overrides.
- Chart.js colors via `getComputedStyle`, never hardcoded hex.

---

## Decision Tree

```
Something looks off
  ├── Is it the words?
  │     └── Yes → /content-audit → rewrite → reassess
  │
  ├── Does it break on mobile?
  │     └── Yes → /ui-review → /ui-refactor → layout tests
  │
  ├── Does it look dated or generic?
  │     └── Yes → /frontend-design-pro:review → targeted fixes
  │
  ├── Is it a new page?
  │     ├── Case study → /new-case-study
  │     └── New type → /frontend-design-pro:design
  │
  └── Not sure what's wrong
        └── Run all three audits (content, structural, design)
            → the reports will tell you
```

---

*Created: 2026-03-04*
