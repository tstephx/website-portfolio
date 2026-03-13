# Site Map & Page Index

**Last verified:** 2026-03-13

---

## Homepage

`index.html` — 3 work cards (V2.1 narrative-led) + 3 personal project cards + skill tags

### Work Cards (3) — link to public versions, order matters

| #   | Card Title                                                  | Path (public)                                |
| --- | ----------------------------------------------------------- | -------------------------------------------- |
| 1   | From 17 Weeks to 2: Redefining What the Program Was For    | `work/contract-transfer-public/index.html`   |
| 2   | The Fix Wasn't Fewer Questions — It Was Better Ones         | `work/partner-application-public/index.html` |
| 3   | Overlooking Elite for Good Enough                           | `work/pinnacle-public/index.html`            |

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

## Public Case Studies (Tier 1 — no auth, indexed)

| Title                                | Path                                         |
| ------------------------------------ | -------------------------------------------- |
| Partner Application Redesign         | `work/partner-application-public/index.html` |
| Contract Transfer Process Redesign   | `work/contract-transfer-public/index.html`   |
| Selection Automation (Pinnacle)      | `work/pinnacle-public/index.html`            |

## Protected Case Studies (Tier 2 — behind basic auth, noindex)

| Title                              | Path                                                       |
| ---------------------------------- | ---------------------------------------------------------- |
| DSP Application Redesign           | `work/cfa-dsp-application/dsp-application.html`            |
| Contract Transfer Process Redesign | `work/contract-transfer/contract-transfer.html`            |
| Selection Automation               | `work/pinnacle-program-selection/pinnacle-automation.html` |

---

## Link Chains (circular, 3 pages each)

### Public chain

`partner-application-public` → `contract-transfer-public` → `pinnacle-public` → `partner-application-public`

### Protected chain

`dsp-application` → `contract-transfer` → `pinnacle-automation` → `dsp-application`

Each page has a "Next:" footer link. When adding/reordering, update all links in both chains.

---

## Standalone Pages

| Page       | Path              | Notes              |
| ---------- | ----------------- | ------------------ |
| Resume     | `resume.html`     | Linked from nav    |
| 401 Auth   | `401.html`        | Basic auth gate    |
| 401 Thanks | `401-thanks.html` | Post-auth redirect |

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
