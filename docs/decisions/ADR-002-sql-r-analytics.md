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
