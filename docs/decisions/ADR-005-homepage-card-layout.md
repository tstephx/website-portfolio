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
