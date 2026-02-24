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
