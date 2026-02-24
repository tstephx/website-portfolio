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
