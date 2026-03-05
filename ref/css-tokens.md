# CSS Design Tokens Reference

**Source:** `css/styles.css :root` | **Last verified:** 2026-03-04

All 57 custom properties defined in `:root`. Never hardcode values that have a token. Use `getComputedStyle` in JS to read tokens (see CLAUDE.md Chart.js pattern).

---

## Colors

| Token                  | Value                  | Use                          |
| ---------------------- | ---------------------- | ---------------------------- |
| `--color-text`         | `#3d3d3d`              | Body text                    |
| `--color-heading`      | `#1a1a1a`              | Headings                     |
| `--color-muted`        | `#6b6b6b`              | Secondary/caption text       |
| `--color-light`        | `#767676`              | Tertiary text                |
| `--color-accent`       | `#1a3a6b`              | Primary brand color, links   |
| `--color-accent-hover` | `#142e55`              | Hover state for accent       |
| `--color-accent-light` | `rgba(26,58,107,0.12)` | Accent tint backgrounds      |
| `--color-bg`           | `#ffffff`              | Page background              |
| `--color-bg-alt`       | `#fafafa`              | Alternate section background |
| `--color-border`       | `#e5e5e5`              | Default borders              |
| `--color-border-light` | `#f0f0f0`              | Subtle borders               |
| `--color-surface`      | `#ffffff`              | Card/surface background      |
| `--color-heading-inv`  | `#ffffff`              | Inverted heading (dark bg)   |

### Semantic Colors

| Token                   | Value     | Use                     |
| ----------------------- | --------- | ----------------------- |
| `--color-success`       | `#16a34a` | Positive/green metrics  |
| `--color-success-light` | `#dcfce7` | Success background tint |
| `--color-success-dark`  | `#15803d` | Success dark variant    |
| `--color-danger`        | `#dc2626` | Negative/red metrics    |
| `--color-danger-light`  | `#fee2e2` | Danger background tint  |
| `--color-danger-dark`   | `#991b1b` | Danger dark variant     |

---

## Typography

| Token            | Value                                   |
| ---------------- | --------------------------------------- |
| `--font-sans`    | `'Epilogue'`, system-ui fallbacks       |
| `--font-serif`   | `'Newsreader'`, Georgia fallbacks       |
| `--font-display` | `'Cormorant Garamond'`, Times fallbacks |
| `--font-mono`    | `'DM Mono'`, Fira Mono fallbacks        |

### Fluid Type Scale (all use `clamp()`)

| Token                 | Range                   |
| --------------------- | ----------------------- |
| `--font-size-h1`      | `2.25rem → 3.25rem`     |
| `--font-size-h2`      | `1.5rem → 1.75rem`      |
| `--font-size-summary` | `1.125rem → 1.25rem`    |
| `--font-size-body-lg` | `0.9375rem → 1.0625rem` |

> Do NOT add font-size media query overrides — use clamp() tokens only.

---

## Spacing & Layout

| Token               | Value                           | Use                         |
| ------------------- | ------------------------------- | --------------------------- |
| `--max-width`       | `720px` (780px on wide screens) | Content container max-width |
| `--section-spacing` | `clamp(5rem, 4rem+3vw, 6rem)`   | Between major sections      |
| `--baseline`        | `1.5rem`                        | 24px baseline grid unit     |
| `--space-xs`        | `0.5rem`                        | Tight spacing               |
| `--space-sm`        | `1rem`                          | Small gaps                  |
| `--space-md`        | `1.5rem`                        | Medium gaps                 |
| `--space-lg`        | `2rem`                          | Large gaps                  |

---

## Borders & Shadows

| Token            | Value                                                     |
| ---------------- | --------------------------------------------------------- |
| `--radius-sm`    | `3px`                                                     |
| `--radius-md`    | `4px`                                                     |
| `--shadow-sm`    | `0 1px 3px rgba(0,0,0,0.06)`                              |
| `--shadow-md`    | `0 2px 8px rgba(0,0,0,0.08)`                              |
| `--shadow-hover` | `0 4px 12px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)` |

---

## Transitions

| Token                  | Value                      |
| ---------------------- | -------------------------- |
| `--transition`         | `0.2s ease` (legacy alias) |
| `--transition-fast`    | `0.15s ease`               |
| `--transition-base`    | `0.25s ease`               |
| `--transition-content` | `0.4s ease-out`            |

---

## Notes

- Token count discrepancy: CLAUDE.md says 44, README says 58, actual count is 57 (counted above). Update CLAUDE.md if it matters.
- Exception: Chart.js `titleFont`/`bodyFont`/`font.family` strings use hardcoded `'Epilogue'` — pre-dates token system, accepted as-is.
- ADR: `docs/decisions/ADR-001-css-token-system.md`
