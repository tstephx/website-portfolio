# CLAUDE.md - Portfolio Website
<!-- project-name: website-portfolio -->

**DO NOT scan directories on startup.** This project is small and well-documented.

---

## Project Structure (No Scanning Needed)

```
website-portfolio/
├── index.html              # Main portfolio page (6 work cards + 3 personal cards)
├── css/
│   ├── styles.css          # Global styles + :root token system (58 custom properties)
│   └── case-study.css      # Case study visual components
├── js/
│   ├── mermaid-init.js     # Mermaid diagram config
│   └── progress-bar.js     # Reading progress bar JS fallback (Safari/Firefox)
├── work/                   # 6 professional case studies (subdirectories)
│   ├── contract-transfer/contract-transfer.html
│   ├── bpr-scoring-pinnacle/pinnacle-scoring.html
│   ├── cfa-dsp-application/dsp-application.html
│   ├── pinnacle-program-selection/pinnacle-automation.html
│   ├── pinnacle-station/pinnacle-distance.html
│   └── charge-back-processing/chargeback-parsing.html
├── projects/               # 5 personal project case studies
│   ├── mcp-ecosystem.html
│   ├── book-library-mcp.html
│   ├── agentic-pipeline.html
│   ├── claude-innit.html
│   ├── tap-sevenrooms.html
│   └── lab-environment.html
├── docs/plans/             # Design docs and implementation plans
├── .gitignore              # Excludes evidence files, dashboards, .DS_Store
└── images/                 # Static assets (ignore)
```

Each `work/` subdirectory also contains evidence `.md` files and `.jsx` dashboard files (gitignored — reference material, not served).

### Key Files by Task
- **Styling**: `css/styles.css`, `css/case-study.css`
- **Content**: `index.html`, `work/*/*.html`, `projects/*.html`
- **Diagrams**: `js/mermaid-init.js`
- **Design docs**: `docs/plans/2026-02-12-css-design-system-upgrade.md`

### Path Conventions
- Work pages are 2 levels deep: asset paths use `../../css/`, `../../js/`
- Project pages are 1 level deep: asset paths use `../css/`, `../js/`
- Work pages link to siblings via `../subfolder/file.html`

### Link Chain (work case studies)
CT → scoring → DSP → automation → distance → chargeback → CT (circular)

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

## Case Study Workflow (3-Prompt Pattern)

Each case study follows this sequence:

1. **Prompt 1 — Research & Structure:** Read the evidence `.md` and dashboard `.jsx` in the `work/` subdirectory. Read an existing case study as template. Produce an outline mapping sections to specific data points. Don't create the file yet.
2. **Prompt 2 — Create HTML:** Build the page from the approved outline. Use the template structure, design system tokens, and Chart.js patterns. Every claim gets a number.
3. **Prompt 3 — Graphics Review:** Read the `.jsx` dashboard and identify which visualizations to add. Adapt to the site's design system. Propose before making changes.

After each prompt: code review via `/superpowers:requesting-code-review`, fix issues, then add homepage card + update link chain.

### Chart.js Patterns (in `<script>` blocks)
```javascript
var accent = '#2563eb';
var green = '#16a34a';
var red = '#dc3545';
var muted = 'rgba(107, 107, 107, 0.3)';
var defaults = { responsive: true, maintainAspectRatio: true, animation: {...}, plugins: { legend: { display: false }, tooltip: {...} } };
// Per-chart: Object.assign({}, defaults, { aspectRatio: 2.5, scales: {...} })
```

## Common Tasks

### Add a new case study
1. Follow the 3-prompt pattern above
2. For work pages: create a subdirectory, use `../../` paths for assets
3. Add `<div class="reading-progress"></div>` as first child of `<body>`
4. Add `<link rel="canonical">` and `<script src="[path]/js/progress-bar.js" defer>`
5. Update content, keeping the section structure
6. Link from index.html in the appropriate section
7. Update the "Next:" link chain (circular)

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

*Last updated: 2026-02-13*
