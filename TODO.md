# Portfolio Code Review: Implementation TODO

*Generated 2026-02-12 from book-library-validated code review*
*Full validation: `~/.claude/knowledge/portfolio-code-review-validation.md`*
*Plan file: `~/.claude/plans/portfolio-code-review-fixes.md`*

---

## CRITICAL — WCAG Level A Violations

- [ ] **Mermaid diagram ARIA labels** (WCAG 1.1.1)
  - Add `role="img"` and descriptive `aria-label` to all `.mermaid-container` elements
  - Files: `projects/mcp-ecosystem.html`, `projects/claude-innit.html`

- [ ] **Table captions** (WCAG 1.3.1)
  - Add `<caption>` to every `<table class="data-table">`
  - Add mobile scroll wrapper (`overflow-x: auto`) to `.data-table` in `css/case-study.css`
  - Files: `projects/mcp-ecosystem.html`, `projects/claude-innit.html`, `css/case-study.css`

- [ ] **Nav aria-labels** (WCAG 2.4.1)
  - `<nav aria-label="Main navigation">` in `index.html`
  - `<nav aria-label="Back navigation">` on `.back-nav` in case study pages
  - Files: `index.html`, all `work/*.html`, all `projects/*.html`

## HIGH — Content Credibility + Positioning

- [ ] **Bar chart → before/after table**
  - Replace `.bar-comparison` section with a data table (bars mix incompatible units)
  - File: `projects/mcp-ecosystem.html`

- [ ] **Update positioning** — "Strategic Program Manager | AI Infrastructure & Systems Design"
  - Update: `<title>`, `og:title`, `twitter:title`, meta description, tagline, headshot alt text, contact copy
  - Do NOT use "Design Strategist" (rejected by 5 career authorities: Mann, Long, HBR, Frost, Weiss)
  - File: `index.html`

- [ ] **Skills section** — add actual technical stack
  - Current "How I Work" lists 2020 PM tools, omits Python/SQLite/FastMCP/AI demonstrated by projects
  - Add 4th column or expand existing ones
  - File: `index.html`

- [ ] **Strengthen weak project cards**
  - tap-sevenrooms: add metrics (API endpoints, data volume, who used it)
  - _Lab Environment: add concrete deliverable, not philosophy
  - Or: remove weak cards entirely (two strong > three uneven)
  - File: `index.html`

## MEDIUM — Performance + UX

- [ ] **Remove `loading="lazy"`** from above-fold headshot
- [ ] **Reduce hero `min-height`** from 85vh to 60-70vh
- [ ] **Mermaid → static SVG** — eliminate 180KB CDN dependency (export once, inline)
- [ ] **Mobile table overflow** — scroll wrapper on `.data-table`

## LOW — Enhancement

- [ ] **og:image** — create 1200x630 social card images for homepage + case studies
- [ ] **Canonical URL** — `<link rel="canonical" href="https://taylorstephens.dev/">`
- [ ] **theme-color** — `<meta name="theme-color" content="#ffffff">`
- [ ] **Footer year** — remove hardcoded 2026 or make dynamic
- [ ] **Mermaid securityLevel** — change from `'loose'` to `'strict'`
