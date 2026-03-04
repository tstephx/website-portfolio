# Site Map & Page Index
**Last verified:** 2026-03-04

---

## Homepage
`index.html` — 3 personal info cards + 9 project cards

### Work Cards (6)
| Title | Path |
|---|---|
| Contract Transfer Process Redesign | `work/contract-transfer/contract-transfer.html` |
| Pinnacle BPR Scoring Methodology Redesign | `work/bpr-scoring-pinnacle/pinnacle-scoring.html` |
| DSP Application Redesign | `work/cfa-dsp-application/dsp-application.html` |
| Pinnacle Selection Automation | `work/pinnacle-program-selection/pinnacle-automation.html` |
| Pinnacle Station Distance Analysis | `work/pinnacle-station/pinnacle-distance.html` |
| Chargeback Email Parsing Automation | `work/charge-back-processing/chargeback-parsing.html` |

### Project Cards (3 shown on homepage)
| Title | Path |
|---|---|
| MCP Ecosystem: 4-Server AI Infrastructure | `projects/mcp-ecosystem.html` |
| tap-sevenrooms | `projects/tap-sevenrooms.html` |
| _Lab Environment | `projects/lab-environment.html` |

### Additional Project Pages (not on homepage)
| Title | Path |
|---|---|
| Agentic Pipeline | `projects/agentic-pipeline.html` |
| Book Library MCP | `projects/book-library-mcp.html` |
| claude-innit | `projects/claude-innit.html` |

---

## Work Case Study Link Chain (circular)
`contract-transfer` → `pinnacle-scoring` → `dsp-application` → `pinnacle-automation` → `pinnacle-distance` → `chargeback-parsing` → `contract-transfer`

Each page has a "Next:" footer link. When adding/reordering, update all 6 links to keep the chain intact.

---

## Standalone Pages
| Page | Path | Notes |
|---|---|---|
| Resume | `resume.html` | Not linked from homepage cards |
| 401 Auth | `401.html` | Basic auth gate |
| 401 Thanks | `401-thanks.html` | Post-auth redirect |

---

## Path Depth Rules
| Location | CSS path | JS path | Sibling links |
|---|---|---|---|
| Root (`index.html`) | `css/` | `js/` | direct |
| Projects (`projects/*.html`) | `../css/` | `../js/` | `../projects/other.html` |
| Work (`work/*/*.html`) | `../../css/` | `../../js/` | `../sibling/file.html` |

---

## Asset Directories
| Path | Contents |
|---|---|
| `css/styles.css` | Global tokens + layout (57 custom properties) |
| `css/case-study.css` | Case study component library |
| `js/progress-bar.js` | Reading progress bar (Safari/Firefox fallback) |
| `js/mermaid-init.js` | Mermaid diagram config |
| `images/headshot.jpg` | Profile photo |
| `favicon.svg` | Site favicon |

---

## Work Directory Structure
Each `work/*/` contains:
- `*.html` — the published case study (git-tracked)
- `evidence-*.md` — source data/analysis (gitignored)
- `evidence-*.jsx` — dashboard prototypes (gitignored)
- `case-study-draft*.md` — working drafts (gitignored)
- `Project_*.md` / `Project_*.txt` — context documents (gitignored)
