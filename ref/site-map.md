# Site Map & Page Index

**Last verified:** 2026-03-05

---

## Homepage

`index.html` — 3 work cards (V2.1 narrative-led) + 3 personal project cards + skill tags

### Work Cards (3)

| Title                             | Path                                                       |
| --------------------------------- | ---------------------------------------------------------- |
| DSP Application Redesign          | `work/cfa-dsp-application/dsp-application.html`            |
| Contract Transfer Process Redesign | `work/contract-transfer/contract-transfer.html`           |
| Selection Automation              | `work/pinnacle-program-selection/pinnacle-automation.html` |

### Project Cards (3 shown on homepage)

| Title                                     | Path                            |
| ----------------------------------------- | ------------------------------- |
| MCP Ecosystem: 4-Server AI Infrastructure | `projects/mcp-ecosystem.html`   |
| tap-sevenrooms                            | `projects/tap-sevenrooms.html`  |
| \_Lab Environment                         | `projects/lab-environment.html` |

### Additional Project Pages (not on homepage)

| Title            | Path                             |
| ---------------- | -------------------------------- |
| Agentic Pipeline | `projects/agentic-pipeline.html` |
| Book Library MCP | `projects/book-library-mcp.html` |
| claude-innit     | `projects/claude-innit.html`     |

---

## Work Case Study Link Chain (circular, 3 pages)

`dsp-application` → `contract-transfer` → `pinnacle-automation` → `dsp-application`

Each page has a "Next:" footer link. When adding/reordering, update all 3 links to keep the chain intact.

---

## Standalone Pages

| Page       | Path              | Notes                          |
| ---------- | ----------------- | ------------------------------ |
| Resume     | `resume.html`     | Linked from nav                |
| 401 Auth   | `401.html`        | Basic auth gate                |
| 401 Thanks | `401-thanks.html` | Post-auth redirect             |

---

## Path Depth Rules

| Location                     | CSS path     | JS path     | Sibling links            |
| ---------------------------- | ------------ | ----------- | ------------------------ |
| Root (`index.html`)          | `css/`       | `js/`       | direct                   |
| Projects (`projects/*.html`) | `../css/`    | `../js/`    | `../projects/other.html` |
| Work (`work/*/*.html`)       | `../../css/` | `../../js/` | `../sibling/file.html`   |

---

## Asset Directories

| Path                   | Contents                                                          |
| ---------------------- | ----------------------------------------------------------------- |
| `css/styles.css`       | Global tokens + layout (57 custom properties)                     |
| `css/case-study.css`   | Case study component library                                      |
| `css/fonts.css`        | Self-hosted @font-face declarations (latin subset, 11 blocks)     |
| `js/progress-bar.js`   | Reading progress bar (Safari/Firefox fallback)                    |
| `js/mermaid-init.js`   | Mermaid diagram config                                            |
| `fonts/`               | 6 WOFF2 files (Cormorant Garamond, DM Mono, Epilogue, Newsreader) |
| `images/headshot.jpg`  | Profile photo (JPEG fallback, 23 KB)                              |
| `images/headshot.webp` | Profile photo WebP (10 KB, 57% smaller)                           |
| `images/headshot.avif` | Profile photo AVIF (13 KB)                                        |
| `favicon.svg`          | Site favicon                                                      |

---

## Work Directory Structure

Each `work/*/` contains:

- `*.html` — the published case study (git-tracked)
- `evidence-*.md` — source data/analysis (gitignored)
- `evidence-*.jsx` — dashboard prototypes (gitignored)
- `case-study-draft*.md` — working drafts (gitignored)
- `Project_*.md` / `Project_*.txt` — context documents (gitignored)
