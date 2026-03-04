# Documentation System Design
<!-- project: website-portfolio -->
**Date:** 2026-02-23 | **Status:** Approved

---

## Problem

Executed plan files accumulate in `docs/plans/` with no distinction between active work and completed history. Decision rationale is buried in large implementation files. No mechanism flags stale docs between sessions.

---

## Design

### Folder Structure

```
docs/
  decisions/          ← ADRs (permanent, ~1 page each, numbered)
  active/             ← open work only (flagged if >14 days stale)
  archive/            ← executed plans, read-only reference
  review/             ← unchanged (design-review.md, code-review.md)
```

### ADR Format

```markdown
# ADR-NNN: Title
**Date:** YYYY-MM-DD | **Status:** Implemented | **Supersedes:** —

## Decision
What was built or changed.

## Why
The problem it solved and the key reason this approach was chosen.

## Rejected Alternatives
- Option B — reason not chosen
- Option C — reason not chosen

## Where in Code
- File path — what lives there
```

**Status values:** `Draft` | `Implemented` | `Superseded`

### Staleness Detection

Two mechanisms keep docs current:

1. **Session-start scan** — CLAUDE.md instructs Claude to flag any `docs/active/` file not modified in 14+ days.
2. **ADR status field** — when a major code change contradicts an existing ADR, the session protocol prompts updating its status to `Superseded`.

---

## Migration Plan

| Source file | Action | Notes |
|---|---|---|
| `2026-02-12-css-design-system-upgrade.md` | → `decisions/ADR-001-css-token-system.md` | Design rationale |
| `2026-02-12-css-design-system-implementation.md` | → `archive/` | Executed task list |
| `2026-02-12-sql-r-portfolio-integration-design.md` | → merge into `decisions/ADR-002-sql-r-analytics.md` | |
| `2026-02-14-sql-r-analytics-design.md` | → merge into ADR-002 | Supersedes integration design |
| `2026-02-14-sql-r-analytics-implementation.md` | → `archive/` | Executed task list |
| `2026-02-13-content-protection-design.md` | → `decisions/ADR-003-content-protection.md` | |
| `2026-02-13-content-protection-implementation.md` | → `archive/` | Executed task list |
| `2026-02-19-typography-overhaul-design.md` | → `decisions/ADR-004-typography-system.md` | |
| `2026-02-19-typography-overhaul-implementation.md` | → `archive/` | Executed task list |
| `2026-02-14-homepage-card-truncation-design.md` | → `decisions/ADR-005-homepage-card-layout.md` | Small, standalone |
| `2026-02-19-design-review-todos.md` | → `active/` | 3 open items remain |
| `PORTFOLIO_EXPANSION_PLAN.md` | → `active/` | Open candidates |
| `TODO.md` | delete | Fully complete |

---

## CLAUDE.md Changes

Add to session-start protocol (step 5):

```
5. Check docs/active/ — flag any file not modified in 14+ days as potentially stale
```

Add to project CLAUDE.md:

```
## Documentation
- ADRs: docs/decisions/ — permanent decision log, ~1 page each
- Active work: docs/active/ — open items only; files >14 days old are stale
- Archive: docs/archive/ — executed plans, read-only
- When shipping significant changes, update the relevant ADR status or create a new one
```
