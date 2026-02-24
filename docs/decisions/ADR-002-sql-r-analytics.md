# ADR-002: SQL/R Analytics — "Under the Hood" Sections
**Date:** 2026-02-14 | **Status:** Implemented (Phase 1) | **Supersedes:** 2026-02-12-sql-r-portfolio-integration-design.md

## Decision

Added "Under the Hood" sections to two case study pages — `pinnacle-automation.html`
and `pinnacle-distance.html` — showing annotated production SQL and R snippets.
Each section contains 3 code blocks using a new `.code-annotation` CSS component.

**Narrative frame:** PM with deep technical fluency. Code supports the story; it
doesn't become it. Snippets are 5–15 lines with plain-English annotation, not
full query dumps.

## Why

The Feb 12 design proposed a three-layer architecture (Evidence/Summary/Atoms)
spanning 4 case study pages, MCP server tool integration, and a LinkedIn content
pipeline. That scope was correct strategically but too large to ship in one pass.

The Feb 14 decision scoped to two pages where the technical evidence was strongest
and most self-contained:
- **pinnacle-automation.html** — 3 SQL snippets from a 6-step Redshift pipeline
  (LAG window function for consecutive tier validation, Haversine distance via
  CROSS JOIN, two-tier fallback via NOT EXISTS)
- **pinnacle-distance.html** — 3 R snippets from the geospatial analysis
  (Vincenty distance matrix, distance interval sweep, performance comparison that
  disproved the distance assumption)

Native `<pre><code>` with CSS was chosen over a syntax highlighting library
(Prism.js) to avoid an external dependency for minimal visual gain.

## Rejected Alternatives

- **Full 4-page rollout immediately** — contract-transfer and pinnacle-scoring
  enhancements are out of scope pending evidence file cleanup and frontmatter work
- **Expandable/collapsible code blocks** — adds JS complexity; static snippets
  are sufficient for the "PM with technical depth" framing
- **Syntax highlighting library** — overkill for curated 5–15 line snippets;
  CSS background + monospace font reads clearly enough

## What Was Deferred (Feb 12 design, not yet implemented)

- `contract-transfer.html`, `pinnacle-scoring.html`, `dsp-application.html` enhancements
- Three-layer Evidence/Summary/Atoms data model in the MCP server
- STAR story and skill assessment updates with SQL/R proof points
- LinkedIn "PM who codes" content series

## Where in Code

- `css/case-study.css` — `.code-annotation`, `.code-annotation-header`,
  `.code-annotation-title`, `.code-annotation-lang`, `.code-annotation-desc`
- `work/pinnacle-automation/pinnacle-automation.html` — "Under the Hood" section
- `work/pinnacle-distance/pinnacle-distance.html` — "Under the Hood" section
