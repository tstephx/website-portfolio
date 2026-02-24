# Documentation System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure docs/ into decisions/, active/, and archive/ folders; write 5 ADRs from existing design docs; update CLAUDE.md with staleness detection.

**Architecture:** Migrate existing docs/plans/ files by category — distill design docs into ADRs, move implementation plans to archive, move open work to active/. Update CLAUDE.md in two places (global session protocol + project CLAUDE.md).

**Tech Stack:** Bash (mkdir, mv), plain Markdown. No code changes to the site itself.

**Design doc:** `docs/plans/2026-02-23-documentation-system-design.md`

---

### Task 1: Create folder structure

**Files:**
- Create: `docs/decisions/`
- Create: `docs/active/`
- Create: `docs/archive/`

**Step 1: Create directories**

```bash
mkdir -p /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/decisions
mkdir -p /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/active
mkdir -p /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/archive
```

**Step 2: Verify**

```bash
ls /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/
```
Expected: `active/  archive/  decisions/  plans/  review/`

---

### Task 2: Move active work files

Move open-work files to `docs/active/`.

**Step 1: Move design-review-todos**

```bash
mv /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/plans/2026-02-19-design-review-todos.md \
   /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/active/design-review-todos.md
```

**Step 2: Move portfolio expansion plan**

```bash
mv /Users/taylorstephens/Dev/_Lab/website-portfolio/PORTFOLIO_EXPANSION_PLAN.md \
   /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/active/portfolio-expansion-plan.md
```

**Step 3: Delete TODO.md (fully complete)**

```bash
rm /Users/taylorstephens/Dev/_Lab/website-portfolio/TODO.md
```

**Step 4: Verify**

```bash
ls /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/active/
```
Expected: `design-review-todos.md  portfolio-expansion-plan.md`

---

### Task 3: Move implementation plans to archive

**Step 1: Move all executed implementation plans**

```bash
cd /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/plans
mv 2026-02-12-css-design-system-implementation.md ../archive/
mv 2026-02-14-sql-r-analytics-implementation.md ../archive/
mv 2026-02-13-content-protection-implementation.md ../archive/
mv 2026-02-19-typography-overhaul-implementation.md ../archive/
```

**Step 2: Verify**

```bash
ls /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/archive/
```
Expected: 4 implementation plan files.

---

### Task 4: Write ADR-001 — CSS Token System

Distill `2026-02-12-css-design-system-upgrade.md` into a 1-page ADR.

**Files:**
- Create: `docs/decisions/ADR-001-css-token-system.md`
- Read first: `docs/plans/2026-02-12-css-design-system-upgrade.md`

**Step 1: Create ADR-001**

```markdown
# ADR-001: CSS Token System
**Date:** 2026-02-12 | **Status:** Implemented | **Supersedes:** —

## Decision
44 custom properties defined in `css/styles.css :root` cover all colors, typography,
spacing, shadows, transitions, and semantic states. No hardcoded values anywhere in
the codebase. Chart.js colors read tokens via `getComputedStyle` at runtime.

## Why
A single token source eliminates color drift between components and charts. Changing
a brand color requires one edit. Chart colors stay in sync with UI without manual
updates.

## Rejected Alternatives
- Per-component variables — too scattered, defeats single-source-of-truth goal
- Tailwind utility classes — too much churn for a static portfolio; overkill

## Where in Code
- `css/styles.css :root` — all 44 token definitions
- `css/case-study.css` — component usage (metrics-row, bar-comparison, etc.)
- Every `*.html` Chart.js block — `getComputedStyle` token reads
```

**Step 2: Move source file to archive**

```bash
mv /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/plans/2026-02-12-css-design-system-upgrade.md \
   /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/archive/
```

**Step 3: Commit**

```bash
cd /Users/taylorstephens/Dev/_Lab/website-portfolio
git add docs/decisions/ADR-001-css-token-system.md docs/archive/2026-02-12-css-design-system-upgrade.md
git commit -m "docs: add ADR-001 CSS token system, archive source design doc"
```

---

### Task 5: Write ADR-002 — SQL/R Analytics Integration

Merge `2026-02-12-sql-r-portfolio-integration-design.md` and `2026-02-14-sql-r-analytics-design.md` into one ADR.

**Files:**
- Create: `docs/decisions/ADR-002-sql-r-analytics.md`
- Read first: `docs/plans/2026-02-12-sql-r-portfolio-integration-design.md` and `docs/plans/2026-02-14-sql-r-analytics-design.md`

**Step 1: Create ADR-002**

```markdown
# ADR-002: SQL/R Analytics Case Study
**Date:** 2026-02-14 | **Status:** Implemented | **Supersedes:** 2026-02-12-sql-r-portfolio-integration-design.md

## Decision
Added a SQL/R analytics case study as a project page (`projects/sql-r-analytics.html`).
The page demonstrates data pipeline work using embedded Chart.js visualizations and
a before/after data table rather than screenshots of R output.

## Why
Screenshots of R output don't convey methodology. Interactive charts let reviewers
engage with the data. The project page pattern (1 level deep) suited a standalone
technical showcase rather than a full work case study.

## Rejected Alternatives
- Embedding R Markdown output directly — requires iframe or external host, adds
  maintenance burden
- PDF attachment — not indexable, poor mobile experience

## Where in Code
- `projects/sql-r-analytics.html` — the case study page
- `css/case-study.css` — shared components (data-table, chart patterns)
```

**Step 2: Move both source files to archive**

```bash
cd /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/plans
mv 2026-02-12-sql-r-portfolio-integration-design.md ../archive/
mv 2026-02-14-sql-r-analytics-design.md ../archive/
```

**Step 3: Commit**

```bash
git add docs/decisions/ADR-002-sql-r-analytics.md \
        docs/archive/2026-02-12-sql-r-portfolio-integration-design.md \
        docs/archive/2026-02-14-sql-r-analytics-design.md
git commit -m "docs: add ADR-002 SQL/R analytics, archive source design docs"
```

---

### Task 6: Write ADR-003 — Content Protection

Distill `2026-02-13-content-protection-design.md`.

**Files:**
- Create: `docs/decisions/ADR-003-content-protection.md`
- Read first: `docs/plans/2026-02-13-content-protection-design.md`

**Step 1: Create ADR-003**

```markdown
# ADR-003: Content Protection (Basic Auth)
**Date:** 2026-02-13 | **Status:** Implemented | **Supersedes:** —

## Decision
Portfolio is protected by HTTP Basic Auth via nginx. Credentials stored server-side.
No client-side auth logic in the HTML/JS codebase.

## Why
The site is not yet public. Basic auth is the simplest reliable gate for a static
site on a VPS without requiring a login UI or session management.

## Rejected Alternatives
- Client-side password check in JS — trivially bypassed, credentials visible in source
- OAuth/SSO — massive overkill for a personal portfolio behind a temporary gate

## Where in Code
- nginx config (server-side, not in this repo)
- No auth logic in HTML/CSS/JS — the site assumes authenticated access
```

**Step 2: Move source file to archive**

```bash
mv /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/plans/2026-02-13-content-protection-design.md \
   /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/archive/
```

**Step 3: Commit**

```bash
git add docs/decisions/ADR-003-content-protection.md \
        docs/archive/2026-02-13-content-protection-design.md
git commit -m "docs: add ADR-003 content protection, archive source design doc"
```

---

### Task 7: Write ADR-004 — Typography System

Distill `2026-02-19-typography-overhaul-design.md`.

**Files:**
- Create: `docs/decisions/ADR-004-typography-system.md`
- Read first: `docs/plans/2026-02-19-typography-overhaul-design.md`

**Step 1: Create ADR-004**

```markdown
# ADR-004: Typography System
**Date:** 2026-02-19 | **Status:** Implemented | **Supersedes:** —

## Decision
Fluid typography using `clamp()` for all heading sizes. Two typefaces: Epilogue
(headings, UI) and a system serif for body text in case studies. No font-size
media query overrides anywhere.

## Why
`clamp()` eliminates breakpoint-specific font rules and produces smoother scaling
across all viewport sizes. Epilogue's geometric style suits the professional/technical
positioning. System serif for body reduces font loading weight.

## Rejected Alternatives
- Fixed breakpoint font sizes — more rules, more maintenance, abrupt size jumps
- Variable font with weight axis — interesting but adds loading complexity for minimal gain

## Where in Code
- `css/styles.css :root` — `--font-*` tokens (size scale, families, line-heights)
- All `clamp()` values in the token block; never repeated inline
```

**Step 2: Move source file to archive**

```bash
mv /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/plans/2026-02-19-typography-overhaul-design.md \
   /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/archive/
```

**Step 3: Commit**

```bash
git add docs/decisions/ADR-004-typography-system.md \
        docs/archive/2026-02-19-typography-overhaul-design.md
git commit -m "docs: add ADR-004 typography system, archive source design doc"
```

---

### Task 8: Write ADR-005 — Homepage Card Layout

Distill `2026-02-14-homepage-card-truncation-design.md`.

**Files:**
- Create: `docs/decisions/ADR-005-homepage-card-layout.md`
- Read first: `docs/plans/2026-02-14-homepage-card-truncation-design.md`

**Step 1: Create ADR-005**

```markdown
# ADR-005: Homepage Card Layout
**Date:** 2026-02-14 | **Status:** Implemented | **Supersedes:** —

## Decision
Homepage work cards use fixed-height description areas with CSS line-clamp for
truncation. All 6 work cards maintain uniform height regardless of description length.

## Why
Variable-height cards create visual imbalance in the grid. Line-clamp is the
simplest CSS-only solution — no JS needed, degrades gracefully.

## Rejected Alternatives
- JS-based truncation — unnecessary complexity for a pure layout problem
- Manual description length caps — fragile, breaks when copy changes

## Where in Code
- `index.html` — card markup with `.card-description` class
- `css/styles.css` — `.card-description` line-clamp rules
```

**Step 2: Move source file to archive**

```bash
mv /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/plans/2026-02-14-homepage-card-truncation-design.md \
   /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/archive/
```

**Step 3: Commit**

```bash
git add docs/decisions/ADR-005-homepage-card-layout.md \
        docs/archive/2026-02-14-homepage-card-truncation-design.md
git commit -m "docs: add ADR-005 homepage card layout, archive source design doc"
```

---

### Task 9: Update CLAUDE.md files

Two files need updating: global `~/.claude/CLAUDE.md` (session-start step) and project `CLAUDE.md` (docs section).

**Files:**
- Modify: `/Users/taylorstephens/.claude/CLAUDE.md`
- Modify: `/Users/taylorstephens/Dev/_Lab/website-portfolio/CLAUDE.md`

**Step 1: Add staleness check to global CLAUDE.md session-start**

Find the session-start checklist and add after step 4 (documentation freshness check):

```
5. If in website-portfolio or similar doc-heavy project, check docs/active/ — flag any file not modified in 14+ days as potentially stale
```

Note: The global CLAUDE.md already has a step 5 ("Summarize state"). Insert before it, making it the new step 5 and renumbering "Summarize" to step 6.

**Step 2: Add Documentation section to project CLAUDE.md**

Add before `## Common Tasks`:

```markdown
## Documentation
- ADRs: `docs/decisions/` — permanent decision log, ~1 page each, numbered ADR-NNN
- Active work: `docs/active/` — open items only; files >14 days old are stale, flag them
- Archive: `docs/archive/` — executed plans, read-only reference
- When shipping significant changes, update the relevant ADR status or write a new ADR
```

**Step 3: Commit**

```bash
cd /Users/taylorstephens/Dev/_Lab/website-portfolio
git add CLAUDE.md
git commit -m "docs: add Documentation section to CLAUDE.md"
```

---

### Task 10: Final cleanup and verify

**Step 1: Check docs/plans/ for remaining files**

```bash
ls /Users/taylorstephens/Dev/_Lab/website-portfolio/docs/plans/
```
Expected: only `2026-02-23-documentation-system-design.md` and `2026-02-23-documentation-system-implementation.md` (this plan and its design doc — keep both as a record of this migration).

**Step 2: Verify full docs structure**

```bash
find /Users/taylorstephens/Dev/_Lab/website-portfolio/docs -name "*.md" | sort
```
Expected output shape:
```
docs/active/design-review-todos.md
docs/active/portfolio-expansion-plan.md
docs/archive/2026-02-12-css-design-system-implementation.md
docs/archive/2026-02-12-css-design-system-upgrade.md
docs/archive/2026-02-12-sql-r-portfolio-integration-design.md
docs/archive/2026-02-13-content-protection-design.md
docs/archive/2026-02-13-content-protection-implementation.md
docs/archive/2026-02-14-homepage-card-truncation-design.md
docs/archive/2026-02-14-sql-r-analytics-design.md
docs/archive/2026-02-14-sql-r-analytics-implementation.md
docs/archive/2026-02-19-typography-overhaul-design.md
docs/archive/2026-02-19-typography-overhaul-implementation.md
docs/decisions/ADR-001-css-token-system.md
docs/decisions/ADR-002-sql-r-analytics.md
docs/decisions/ADR-003-content-protection.md
docs/decisions/ADR-004-typography-system.md
docs/decisions/ADR-005-homepage-card-layout.md
docs/plans/2026-02-23-documentation-system-design.md
docs/plans/2026-02-23-documentation-system-implementation.md
docs/review/portfolio-code-review.md
docs/review/portfolio-design-review.md
```

**Step 3: Final commit**

```bash
cd /Users/taylorstephens/Dev/_Lab/website-portfolio
git add -A
git commit -m "docs: complete documentation system migration — ADRs, active/, archive/"
```

---

## Verification Checklist

- [ ] `docs/decisions/` has 5 ADRs (ADR-001 through ADR-005)
- [ ] `docs/active/` has 2 files (design-review-todos, portfolio-expansion-plan)
- [ ] `docs/archive/` has 12 files (all executed plans + source design docs)
- [ ] `TODO.md` deleted from project root
- [ ] `PORTFOLIO_EXPANSION_PLAN.md` moved from project root
- [ ] Project CLAUDE.md has `## Documentation` section
- [ ] Global CLAUDE.md has staleness check step
- [ ] `docs/plans/` contains only the 2 files from this migration session
