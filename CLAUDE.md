# CLAUDE.md — Portfolio Website

<!-- project-name: website-portfolio -->

**DO NOT scan directories on startup.** This project is small and well-documented.

## Canonical Entry Points

- Homepage: `index.html` (3 work cards V2.1 + 3 personal cards + skill tags)
- Work case studies: `work/*/*.html` (2 levels deep; paths use `../../`)
- Project pages: `projects/*.html` (1 level deep; paths use `../`)
- Global styling tokens: `css/styles.css` (57 custom properties in `:root`)
- Case study components: `css/case-study.css`
- Site map & page index: `ref/site-map.md`

## Local Preview

```bash
cd website-portfolio && python3 -m http.server 8000
# open http://localhost:8000
```

## Hard Rules

- Always use existing CSS custom properties (57 tokens in `css/styles.css :root`). Do not add new tokens without updating the design doc.
- Fluid typography uses `clamp()` — do NOT add font-size media query overrides.
- Chart.js colors must read from CSS tokens via `getComputedStyle`, never hardcoded hex values.
- Do not scan `images/` or evidence files in `work/` subdirectories unless explicitly asked.

## Path Conventions

- Work pages (2 deep): `../../css/`, `../../js/`, siblings via `../subfolder/file.html`
- Project pages (1 deep): `../css/`, `../js/`
- Link chain (work case studies, circular): DSP → CT → automation → DSP

## Design System

- Token reference: `ref/css-tokens.md` — all 57 tokens with values and usage notes
- Component reference: `ref/components.md` — all case-study components with usage snippets
- ADR: `docs/decisions/ADR-001-css-token-system.md`

## Chart.js Pattern (Token-Driven)

All charts must use this pattern — no hardcoded color values. **Exception:** existing case study `titleFont`/`bodyFont`/`font.family` strings use hardcoded `'Epilogue'` (pre-dates token system; accepted as-is, pending future refactor).

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const css = getComputedStyle(document.documentElement);
  const token = (name, fallback) => css.getPropertyValue(name).trim() || fallback;

  const accent = token('--color-accent', '#1a3a6b');
  const green = token('--color-success', '#16a34a');
  const red = token('--color-danger', '#dc2626');
  const muted = token('--color-muted', '#6b6b6b');
  const text = token('--color-text', '#3d3d3d');

  const hexToRgba = (hex, a = 1) => {
    const h = hex.replace('#', '');
    const full =
      h.length === 3
        ? h
            .split('')
            .map((c) => c + c)
            .join('')
        : h;
    const n = parseInt(full, 16);
    const r = (n >> 16) & 255,
      g = (n >> 8) & 255,
      b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const grid = hexToRgba(muted, 0.25);

  Chart.defaults.color = text;
  Chart.defaults.borderColor = grid;
  Chart.defaults.plugins.legend.labels.color = text;
  Chart.defaults.scale.grid.color = grid;
  Chart.defaults.scale.ticks.color = grid;

  // use accent/green/red per dataset as needed
});
```

## Case Study Workflow

**Content quality gate:** Run `/revise-case-study <slug>` on `work/<slug>/case-study-draft.md` first. Scores draft on 8-criterion rubric (28/40 minimum, no criterion below 3). On approval, writes `outline-approved.md`.

**3-Prompt Pattern (via `/new-case-study <slug>`):**
1. **Research & Structure:** Read evidence `.md` and dashboard `.jsx` in `work/` subdirectory. Read existing case study as template. Produce outline mapping sections to data. Don't create the file yet. (Skip if `outline-approved.md` exists — go to Prompt 2.)
2. **Create HTML:** Build page from approved outline using template structure, design tokens, and Chart.js pattern above. Every claim gets a number.
3. **Graphics Review:** Read `.jsx` dashboard, identify visualizations to add. Propose before making changes.

After each prompt: code review via `/superpowers:requesting-code-review`, fix issues, then add homepage card + update link chain.

### Definition of Done (new pages)

- [ ] Paths correct for depth (`../../` for work, `../` for projects)
- [ ] Has `<link rel="canonical">` pointing to production URL
- [ ] Has `<div class="reading-progress"></div>` as first `<body>` child
- [ ] Has `<script src="[path]/js/progress-bar.js" defer>`
- [ ] Index card added in appropriate section
- [ ] "Next:" link chain updated (circular)
- [ ] Chart.js uses token-driven pattern (no hardcoded colors)
- [ ] Added to all 4 test files (pages, a11y, layout, visual) + `lint:html` script
- [ ] `npm run check` and `npm test` pass (including axe-core a11y)

## Testing

- 7 Playwright spec files: pages, link-chain, a11y (axe-core), layout (3 viewports), visual regression, assets, changelog
- Linting: ESLint + Stylelint (with a11y plugin) + Prettier + html-validate + Linkinator
- Quick run: `npm run check` (lint) then `npm test` (Playwright), or use `/check`
- Full reference: `ref/testing.md`

## Automation (Skills, Agents, Hooks)

- 8 skills: `/deploy`, `/new-case-study`, `/revise-case-study`, `/check`, `/update-snapshots`, `/content-audit`, `/link-check`, design-tokens (Claude-only)
- 3 agents: accessibility-reviewer, content-reviewer, visual-regression-watcher
- 3 hooks: block lock/env edits, auto-format (Prettier), HTML validate
- Full reference: `ref/automation.md`

## Documentation

- ADRs: `docs/decisions/` — permanent decision log, ~1 page each, numbered ADR-NNN
- Active work: `docs/active/` — open items only; files >14 days old are stale, flag them
- Archive: `docs/archive/` — executed plans, reviews, audits, and source design docs; read-only reference
- Prompts: `docs/prompts/` — reusable Claude prompt templates for recurring tasks
- When shipping significant changes, update the relevant ADR status or write a new ADR

## Common Tasks

### Modify styling

- Global: `css/styles.css` — Case study: `css/case-study.css`
- Use existing tokens. Do not invent new ones.

### Update diagrams

- Mermaid diagrams inline in HTML, config in `js/mermaid-init.js`
- Use `flowchart LR/TD` or `stateDiagram-v2`

## Git

- Branch: `main` — Remote: `origin` (github.com:tstephx/website-portfolio.git)
- Commit style: `feat:`, `fix:`, `docs:`, `style:`

---

## Reference Docs (`ref/`)

- `ref/site-map.md` — all pages, paths, link chain, asset directories
- `ref/css-tokens.md` — all 57 design tokens with values and usage
- `ref/components.md` — case study component library with usage snippets
- `ref/chartjs-pattern.md` — Chart.js token-driven boilerplate, color variables, dataset patterns
- `ref/deploy.md` — deployment workflow (git pull on Whatbox), Cloudflare config, header verification
- `ref/testing.md` — test architecture, 7 spec files, npm scripts, dependencies
- `ref/automation.md` — skills, agents, hooks index with descriptions

## Guides (`docs/active/`)

- `docs/active/layout-review-guide.md` — 5-phase workflow for reviewing/improving site layout
- `docs/active/deployment-checklist.md` — pre-deploy verification, push/pull steps, rollback
- `docs/active/case-study-playbook.md` — 3-prompt pattern end-to-end with content strategy
- `docs/active/content-writing-standards.md` — voice, tone, anti-patterns, before/after examples
- `docs/active/testing-cheat-sheet.md` — which test to run when, common failures and fixes
- `docs/active/design-system-usage.md` — when to use which token, component selection guide
- `docs/active/JTBD.md` — audience personas, jobs-to-be-done, 15-second scan spec
- `docs/active/feedback-request-template.md` — structured feedback template for portfolio reviews
- `docs/active/portfolio-expansion-plan.md` — candidate projects for future portfolio pages
- `docs/active/design-review-todos.md` — unfixed design review findings and future work

---

## Design Context

### Users

Three audiences, each with different time budgets and jobs-to-be-done (full analysis: `docs/active/JTBD.md`):

| Audience | Time Budget | Job |
|----------|-------------|-----|
| Hiring manager | 30–90s homepage, 3–5min case study | "Is this person senior enough to shortlist?" |
| Recruiter | 15–30s homepage only | "Can I justify passing this candidate through?" |
| Peer PM | 2–5min, curiosity-driven | "What kind of problems does this person solve?" |

The portfolio succeeds when a hiring manager can name a specific metric after 30 seconds, and wants to discuss a case study in an interview after 5 minutes.

### Brand Personality

**Confident, Warm, Clear** — authority without arrogance, approachable but unmistakably senior. Like a good 1:1 with a strong PM who respects your time.

**Voice:** Professional, specific, reader-focused. Every claim gets a number. Lead with results, then explain. No weasel words, no self-congratulation. (Full standards: `docs/active/content-writing-standards.md`)

**Emotional targets:**
- Primary: Confidence + Calm ("this person is senior and in control"), Sharpness + Precision ("this person thinks clearly")
- Secondary: Warmth + Competence ("I'd want to work with them"), Curiosity + Respect ("how did they do that?")

### Aesthetic Direction

**Visual tone:** The restraint is the signal. Clean, precise, intentional — every element earns its place. The design itself demonstrates analytical rigor without being cold.

**References:**
- **Apple product pages** — dramatic reveals, large type, strong visual hierarchy, each scroll feels intentional
- **Stripe / Linear** — engineering-meets-design precision, generous whitespace, subtle depth, no wasted elements

**Anti-references (the site must NOT resemble):**
- Generic template sites (Squarespace/Wix cookie-cutter layouts)
- Developer portfolios (dark mode, terminal aesthetics, animated code)
- Corporate/Enterprise (blue-gray monotony, stock photos, "synergy" language)
- Over-designed Dribbble (glassmorphism, 3D elements, micro-animations everywhere)

**Theme:** Light mode only (dark mode tokens prepped but not active). Navy accent (#1a3a6b) as the sole brand color — no gradients, no secondary hues. The palette is intentionally narrow: near-black, warm gray, navy, white.

### Design Principles

1. **Scannable before readable.** Metrics, headings, and visual hierarchy must deliver value at a 15-second glance. Paragraphs are for the second pass.
2. **Precision is personality.** Specific numbers, tight typography, intentional spacing — the craft signals the same rigor shown in the case studies.
3. **Earn every element.** No decoration without purpose. If a component doesn't help a hiring manager decide, it doesn't belong.
4. **Warmth through restraint.** Generous whitespace, serif warmth in headings, subtle transitions. Confidence comes from what's left out, not what's added.
5. **Content drives the design, not the reverse.** Components serve the narrative. Choose the simplest visualization that makes the data clear. A metrics row beats a chart for 3 numbers.

---

_Last updated: 2026-03-10_
