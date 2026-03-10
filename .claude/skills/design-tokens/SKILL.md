---
name: design-tokens
description: Load CSS tokens and component reference into context before styling work
user-invocable: false
---

# Design Tokens Context

Load the design system into context before any styling or component work.

## On Invocation

Read these files into context:
1. `ref/css-tokens.md` — all 57 design tokens with values and usage notes
2. `ref/components.md` — case study component library with usage snippets
3. `ref/chartjs-pattern.md` — Chart.js token-driven boilerplate

## Rules (from CLAUDE.md)

- Always use existing CSS custom properties. Do not add new tokens without updating the design doc.
- Fluid typography uses `clamp()` — do NOT add font-size media query overrides.
- Chart.js colors must read from CSS tokens via `getComputedStyle`, never hardcoded hex values.
- Exception: existing `titleFont`/`bodyFont`/`font.family` strings use hardcoded `'Epilogue'` (accepted as-is).

## After Loading

Confirm to the conversation: "Design system loaded — 57 tokens, component library, and Chart.js pattern ready."
Then proceed with the styling task.
