# Changelog

> Auto-generated from `git log`. Run `npm run changelog` to update.

## 2026-03

### Features
- `919594d` mobile stat preservation, resume link, personality line — batch 2
- `608698a` hero split layout with ghost CTA — batch 1 of homepage refinement
- `47e3ef0` batch 2 — case study polish, resume redesign, content sync tests
- `6e38047` replace DSP decision section with three-path technology evaluation
- `8403804` add Pinnacle post-automation growth data to case study and resume
- `43fe031` design system audit — resume integration, a11y fixes, visual hierarchy
- `3c5697c` rebuild Contract Transfer and Pinnacle case studies from approved outlines
- `5e40116` rebuild DSP Application case study from approved outline
- `a87f864` add 5 new case study components (icon-card, pull-quote, tldr, decision-card, cta-secondary)
- `52a1e0d` add /revise-case-study skill — 8-criterion rubric for case study drafts
- `fdd7a0b` pre-launch overhaul — curate to 3 case studies, sanitize, redesign homepage
- `d34dc6f` design refinements, a11y testing, and documentation overhaul
- `20a7502` expand visual regression coverage from 4 to 14 pages
- `e2d0913` add html-validate + linkinator, fix raw HTML entities and parser errors
- `d9de4a0` add og:image social card meta to all 14 pages (L5)
- `2d33f93` add Playwright testing infrastructure + changelog automation

### Bug Fixes
- `95cf584` enrich case studies from source documents and fix meta consistency
- `833f07c` correct Pinnacle team expansion to 3→10 across all references
- `c43ddb2` correct Pinnacle team expansion metric in resume (3→10)
- `845f607` align DSP case study to BRD source of truth and sync resume
- `4232f67` align site-wide content to case study bodies as source of truth
- `7115c60` address code review findings on batch 2
- `b5982a4` address code review findings on batch 1
- `b8af1d6` resolve 7 ambiguities found by subagent testing
- `bd0ff84` rewrite /revise-case-study description to CSO trigger format
- `290c653` sharpen Card 1 narrative — active voice, concrete language
- `4675ac0` pre-launch fixes — a11y, formatting, SEO, 404 page
- `47934c8` sharpen scoring + automation Approach one-liners on homepage
- `d992b12` add SRI hashes + pin CDN versions (M3, M4)
- `f68ca74` replace hardcoded Chart.js colors with CSS token variables (H1)
- `16c16dc` resolve all critical/high audit findings
- `d93e5d5` comparison-label audit + docs restructure

### Documentation
- `ff1867e` update token reference and mark PRD complete
- `299a879` regenerate DSP and Pinnacle copy markdown from current HTML
- `9a3fc85` add deploy ref, update site-map for fonts + headshot variants
- `a68c73f` fix 2 CLAUDE.md inaccuracies flagged by scaffold audit
- `e51725e` add ref/ directory with site map, CSS tokens, and component reference
- `9b142a4` clean up project structure and update CLAUDE.md

### Style
- `25f8f13` update visual regression snapshots for batch 3 cleanup
- `c7bfa50` token-align sticky nav, remove h2 underlines, clean card borders — batch 3
- `a044102` redesign palette (slate + rose-clay + cream) and fix WCAG contrast
- `9e4a1d0` Elements of Style copy-edit on DSP and Pinnacle case studies
- `d6abd43` format all files with Prettier, commit prior session work
- `7f13299` update visual regression snapshots for rebuilt case studies
- `25f96a1` compress /revise-case-study SKILL.md 42% (2075 → 1207 words)
- `cd7b634` apply 4 typography/design refinements to case-study components

### Chores / Maintenance
- `432af34` update changelog, gitignore design screenshots
- `6c1b121` commit .claude tooling, update .gitignore
- `507a691` remove _headers (nginx/Cloudflare stack — use CF Transform Rules instead)
- `b64ade6` add ESLint, Prettier, stylelint; apply first-run formatting

### Other
- `6b735ba` perf: add _headers caching/security rules; update changelog
- `311ee4c` perf: performance improvements — fonts, images, chart CLS
- `2886327` test: add mobile visual regression snapshots

## 2026-02

### Features
- `4c0746d` add AI & Technical skills column, expand skills grid to 4 columns
- `aafa539` apply display/mono font overrides (h1 → Cormorant, h3 + .project-meta → DM Mono)
- `e1670ad` update Google Fonts link for typography overhaul (Cormorant/Newsreader/Epilogue/DM Mono)
- `392867c` add font tokens for typography overhaul (--font-display, --font-mono, update --font-sans/serif)
- `7235bd6` update Google Fonts link for typography overhaul (Cormorant/Newsreader/Epilogue/DM Mono)
- `c53db6c` add Under the Hood section with 3 R snippets to pinnacle-distance
- `6bcbb9e` add Under the Hood section with 3 SQL snippets to pinnacle-automation
- `c179e8a` add .code-annotation CSS component for annotated code snippets
- `24e5c38` replace Action paragraphs with curiosity-gap Approach one-liners
- `f34ce81` add content protection for /work/ case studies
- `121ce7c` track resume.html, remove from gitignore
- `c05b924` add Chargeback Email Parsing case study + gitignore cleanup
- `d83498d` add Pinnacle Station Distance Analysis case study
- `8c9918e` CSS design system upgrade — tokens, fluid typography, accessibility, animations
- `0c37634` add case study pages with visual enhancements
- `98cd10a` portfolio website with responsive design

### Bug Fixes
- `36c4393` full UI audit fixes across all 13 pages (Phase 2)
- `d61a496` correct token reference link and clarify docs/plans/ role in CLAUDE.md
- `16f3b26` dynamic footer year, mermaid securityLevel strict
- `eedbfaf` wrap all data-tables with scroll wrapper for mobile overflow
- `4a31058` replace bar-comparison with before/after data table in mcp-ecosystem
- `e253dac` update positioning to Strategic Program Manager | AI Infrastructure & Systems Design
- `2b35608` pinnacle-distance Chart.js token colors, correct red value to --color-danger
- `af1a880` contract-transfer Chart.js token colors, 2024 uptick explanation, chart label
- `b8f0fd9` final review fixes (401 button hover color, 401-thanks preconnect, CLAUDE.md token count + chart exception)
- `5626055` complete accent color migration (theme-color on all pages, Chart.js var accent, 401 rgba shadow)
- `c95a1a9` propagate typography overhaul across all pages (font links, Chart.js, Mermaid, 401 pages)
- `d196ad8` consistency polish from code review
- `82b5dbf` replace taylorstephens.dev with taylorstephens.io site-wide
- `cabddb7` correct domain from .dev to .io in 401 pages
- `6cfeaf0` correct relative paths for work/ subdirectory restructure

### Documentation
- `9308170` create docs/active/ folder
- `5f13111` flag docs/active/ as not yet created
- `1925132` expand ADR-002 with synthesized content from both SQL/R source design docs
- `3b64112` complete documentation system migration — ADRs, active/, archive/
- `45d7f01` add typography overhaul implementation plan (7 tasks, 2 files)
- `1e6e109` add typography overhaul design doc (Cormorant/Newsreader/Epilogue/DM Mono)
- `7c54690` correct branch reference in design doc
- `20e5ef0` update design doc to reflect actual CSS tokens used (no --shadow-sm)
- `57a36c7` add SQL/R analytics implementation plan (4 tasks)
- `707e972` add SQL/R analytics enhancement design document
- `291cd1a` update CLAUDE.md for 6 case studies, add README
- `e07b6e7` add CLAUDE.md with session initialization protocol

### Style
- `33c276a` contract-transfer design review fixes
- `e0df2c5` dsp-application design review fixes
- `7b313a9` pinnacle-scoring design review fixes
- `31b5691` pinnacle-automation design review fixes
- `516c858` chargeback design review fixes
- `d6ef322` design review fixes for pinnacle-distance (h1 balance, finding callout, timeline step 6, results spacing)
- `46bc914` case study h1 → Cormorant Garamond (font-display) with tuned weight/tracking
- `1351eb2` design review fixes (card separation, hero height cap, h2 underline em units, accent-light opacity)

### Chores / Maintenance
- `82b66d2` untrack archive, TODO, drafts — add to .gitignore
- `0379d85` remove old flat work/ files replaced by subdirectory structure

### Other
- `2afa1d7` improve: strengthen tap-sevenrooms and _Lab project cards with metrics
- `da9d1f1` content: career coach fixes across all 6 case studies (math, labels, cross-refs, scale framing, role titles)
- `6ca2730` improve: add metadata, accessibility, and noindex to resume
- `ebafca2` improve: rewrite all 4 case studies with evidence-backed data and graphics
- `bce202d` improve: accessibility + hero height + bar chart data integrity
- `dc6e2b0` improve: tighten spacing, clarify content for non-experts, semantic chart colors
