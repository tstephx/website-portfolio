# CLAUDE.md — Portfolio Website
<!-- project-name: website-portfolio -->

**DO NOT scan directories on startup.** This project is small and well-documented.

## Canonical Entry Points
- Homepage: `index.html` (6 work cards + 3 personal cards)
- Work case studies: `work/*/*.html` (2 levels deep; paths use `../../`)
- Project pages: `projects/*.html` (1 level deep; paths use `../`)
- Global styling tokens: `css/styles.css` (44 custom properties in `:root`)
- Case study components: `css/case-study.css`

## Local Preview

```bash
cd website-portfolio && python3 -m http.server 8000
# open http://localhost:8000
```

## Hard Rules
- Always use existing CSS custom properties (44 tokens in `css/styles.css :root`). Do not add new tokens without updating the design doc.
- Fluid typography uses `clamp()` — do NOT add font-size media query overrides.
- Chart.js colors must read from CSS tokens via `getComputedStyle`, never hardcoded hex values.
- Do not scan `images/` or evidence files in `work/` subdirectories unless explicitly asked.

## Path Conventions
- Work pages (2 deep): `../../css/`, `../../js/`, siblings via `../subfolder/file.html`
- Project pages (1 deep): `../css/`, `../js/`
- Link chain (work case studies, circular): CT → scoring → DSP → automation → distance → chargeback → CT

## Design System
- Tokens: 44 custom properties in `css/styles.css :root` (colors, typography, spacing, shadows, transitions, semantic colors)
- Components: `css/case-study.css` (metrics-row, bar-comparison, funnel-chart, vote-comparison, process-timeline, data-table, formula-box, comparison, mermaid-container, cs-figure, reading-progress, insight-callout, scope-callout)
- Full token reference: `docs/decisions/ADR-001-css-token-system.md`

## Chart.js Pattern (Token-Driven)

All charts must use this pattern — no hardcoded color values. **Exception:** existing case study `titleFont`/`bodyFont`/`font.family` strings use hardcoded `'Epilogue'` (pre-dates token system; accepted as-is, pending future refactor).

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const css = getComputedStyle(document.documentElement);
  const token = (name, fallback) => (css.getPropertyValue(name).trim() || fallback);

  const accent = token('--color-accent', '#1a3a6b');
  const green  = token('--color-success', '#16a34a');
  const red    = token('--color-danger', '#dc2626');
  const muted  = token('--color-muted', '#6b6b6b');
  const text   = token('--color-text', '#3d3d3d');

  const hexToRgba = (hex, a = 1) => {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const n = parseInt(full, 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const grid = hexToRgba(muted, 0.25);

  Chart.defaults.color = text;
  Chart.defaults.borderColor = grid;
  Chart.defaults.plugins.legend.labels.color = text;
  Chart.defaults.scale.grid.color = grid;
  Chart.defaults.scale.ticks.color = text;

  // use accent/green/red per dataset as needed
});
```

## Case Study Workflow (3-Prompt Pattern)

1. **Research & Structure:** Read evidence `.md` and dashboard `.jsx` in `work/` subdirectory. Read existing case study as template. Produce outline mapping sections to data. Don't create the file yet.
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

## Documentation
- ADRs: `docs/decisions/` — permanent decision log, ~1 page each, numbered ADR-NNN
- Active work: `docs/active/` — open items only; files >14 days old are stale, flag them
- Archive: `docs/archive/` — executed plans, read-only reference
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

*Last updated: 2026-02-23*
