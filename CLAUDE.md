# CLAUDE.md - Portfolio Website

## Session Initialization (READ FIRST)

**DO NOT scan directories on startup.** This project is small and well-documented.

### Quick Start Protocol
1. Run `get_context(project="website-portfolio")` for project memory
2. Check `git status` and `git log -3` for recent state
3. Ask the user what they want to work on

---

## Project Structure (No Scanning Needed)

```
website-portfolio/
├── index.html              # Main portfolio page
├── css/
│   ├── styles.css          # Global styles + custom properties
│   └── case-study.css      # Case study visual components
├── js/
│   └── mermaid-init.js     # Mermaid diagram config
├── work/                   # 4 professional case studies
│   ├── contract-transfer.html
│   ├── pinnacle-scoring.html
│   ├── dsp-application.html
│   └── pinnacle-automation.html
├── projects/               # 5 personal project case studies
│   ├── book-library-mcp.html
│   ├── agentic-pipeline.html
│   ├── claude-innit.html
│   ├── tap-sevenrooms.html
│   └── lab-environment.html
└── images/                 # Static assets (ignore)
```

### Key Files by Task
- **Styling**: `css/styles.css`, `css/case-study.css`
- **Content**: `index.html`, `work/*.html`, `projects/*.html`
- **Diagrams**: `js/mermaid-init.js`

---

## Design System

### CSS Custom Properties (in styles.css)
```css
--color-accent: #2563eb;      /* Blue - links, highlights */
--color-heading: #1a1a1a;     /* Near-black */
--color-text: #374151;        /* Dark gray */
--color-muted: #6b7280;       /* Medium gray */
--font-serif: 'Lora', serif;  /* Headings */
--font-sans: 'Inter', sans-serif; /* Body */
```

### Visual Components (in case-study.css)
- `.metrics-row` / `.metric-card` - Key statistics display
- `.bar-comparison` - Before/after horizontal bars
- `.funnel-chart` - Conversion funnel visualization
- `.vote-comparison` - Side-by-side scenario diagrams
- `.process-timeline` - Vertical milestone timeline
- `.data-table` - Styled comparison tables
- `.formula-box` - Highlighted formula/principle display
- `.comparison` - Before/after text blocks
- `.mermaid-container` - Mermaid.js diagram wrapper

---

## Common Tasks

### Add a new case study
1. Copy an existing file from `work/` or `projects/`
2. Update content, keeping the section structure
3. Add visual components as needed (see case-study.css)
4. Link from index.html in the appropriate section
5. Update the "Next:" link chain

### Modify styling
- Global styles: `css/styles.css`
- Case study components: `css/case-study.css`
- Always use existing CSS custom properties

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

*Last updated: 2026-02-06*
