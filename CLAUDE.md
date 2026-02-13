# CLAUDE.md - Portfolio Website
<!-- project-name: website-portfolio -->

**DO NOT scan directories on startup.** This project is small and well-documented.

---

## Project Structure (No Scanning Needed)

```
website-portfolio/
├── index.html              # Main portfolio page
├── css/
│   ├── styles.css          # Global styles + :root token system (58 custom properties)
│   └── case-study.css      # Case study visual components
├── js/
│   ├── mermaid-init.js     # Mermaid diagram config
│   └── progress-bar.js     # Reading progress bar JS fallback (Safari/Firefox)
├── work/                   # 4 professional case studies (subdirectories)
│   ├── contract-transfer/contract-transfer.html
│   ├── bpr-scoring-pinnacle/pinnacle-scoring.html
│   ├── cfa-dsp-application/dsp-application.html
│   └── pinnacle-program-selection/pinnacle-automation.html
├── projects/               # 6 personal project case studies
│   ├── mcp-ecosystem.html
│   ├── book-library-mcp.html
│   ├── agentic-pipeline.html
│   ├── claude-innit.html
│   ├── tap-sevenrooms.html
│   └── lab-environment.html
├── docs/plans/             # Design docs and implementation plans
└── images/                 # Static assets (ignore)
```

### Key Files by Task
- **Styling**: `css/styles.css`, `css/case-study.css`
- **Content**: `index.html`, `work/*/*.html`, `projects/*.html`
- **Diagrams**: `js/mermaid-init.js`
- **Design docs**: `docs/plans/2026-02-12-css-design-system-upgrade.md`

### Path Conventions
- Work pages are 2 levels deep: asset paths use `../../css/`, `../../js/`
- Project pages are 1 level deep: asset paths use `../css/`, `../js/`
- Work pages link to siblings via `../subfolder/file.html`

---

## Design System

### CSS Custom Properties (58 tokens in styles.css :root)
```css
/* Colors */
--color-accent: #2563eb;      /* Blue - links, highlights */
--color-heading: #1a1a1a;     /* Near-black */
--color-text: #3d3d3d;        /* Dark gray */
--color-muted: #6b6b6b;       /* Medium gray */
--color-light: #767676;       /* WCAG AA compliant (4.54:1) */
--font-serif: 'Lora', serif;  /* Headings, editorial */
--font-sans: 'Inter', sans-serif; /* Body, UI */

/* Fluid typography (clamp, no media query overrides needed) */
--font-size-h1, --font-size-h2, --font-size-summary, --font-size-body-lg

/* Spacing, radii, shadows, transitions */
--space-xs/sm/md/lg, --radius-sm/md, --shadow-sm/md/hover, --transition-fast/base/content

/* Semantic colors (vote diagrams) */
--color-success/success-light/success-dark, --color-danger/danger-light/danger-dark

/* Dark mode prep (tokens defined, not activated) */
--color-surface, --color-heading-inv
```

### Visual Components (in case-study.css)
- `.metrics-row` / `.metric-card` - Key statistics (responsive clamp scaling)
- `.bar-comparison` - Before/after horizontal bars (scroll-driven animation)
- `.funnel-chart` - Conversion funnel visualization
- `.vote-comparison` - Side-by-side scenario diagrams (semantic color tokens)
- `.process-timeline` - Vertical milestone timeline
- `.data-table` / `.data-table-wrapper` - Styled tables (mobile overflow scroll)
- `.formula-box` - Highlighted formula/principle display
- `.comparison` - Before/after text blocks (h3s use serif differentiation)
- `.mermaid-container` - Mermaid.js diagram wrapper
- `.cs-figure` / `.cs-figure-pair` / `.cs-figure-wide` - Graphics-ready containers
- `.reading-progress` - Reading progress bar (CSS scroll-driven + JS fallback)
- `.insight-callout` - Editorial voice callout
- `.scope-callout` - Metadata key-value grid

---

## Common Tasks

### Add a new case study
1. Copy an existing file from `work/` or `projects/`
2. For work pages: create a subdirectory, use `../../` paths for assets
3. Add `<div class="reading-progress"></div>` as first child of `<body>`
4. Add `<link rel="canonical">` and `<script src="[path]/js/progress-bar.js" defer>`
5. Update content, keeping the section structure
6. Link from index.html in the appropriate section
7. Update the "Next:" link chain

### Modify styling
- Global styles: `css/styles.css`
- Case study components: `css/case-study.css`
- Always use existing CSS custom properties (58 tokens in :root)
- Fluid typography uses clamp() — do NOT add font-size media query overrides

### Update diagrams
- Mermaid diagrams are inline in HTML files
- Config is in `js/mermaid-init.js`
- Use flowchart LR/TD or stateDiagram-v2

---

## Git Workflow

- Branch: `main`
- Remote: `origin` (github.com:tstephx/website-portfolio.git)
- Commit style: `feat:`, `fix:`, `docs:`, `style:`

---

## Memory Integration

This project uses claude-innit for persistent context:
- `get_context(project="website-portfolio")` - Load project memory
- `remember(content, category="project", project="website-portfolio")` - Save decisions
- `save_session(summary, project="website-portfolio")` - End-of-session summary

---

*Last updated: 2026-02-12*
