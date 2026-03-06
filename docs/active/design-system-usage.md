# Design System Usage Guide

When to use which token and component. The token reference (`ref/css-tokens.md`) lists all 57 values — this guide explains when to reach for each one.

---

## Color Selection

### Text colors — pick by importance

| Level     | Token             | When to use                                                                                         |
| --------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| Primary   | `--color-heading` | H1, H2, H3, bold callouts — anything that anchors attention                                         |
| Body      | `--color-text`    | Paragraph text, list items, table cells — the default reading color                                 |
| Secondary | `--color-muted`   | Captions, labels, timestamps, metadata — supporting info                                            |
| Tertiary  | `--color-light`   | Decorative text only — avoid for anything users need to read (fails contrast on tinted backgrounds) |
| Brand     | `--color-accent`  | Links, CTAs, highlighted values, interactive elements                                               |

**Rule of thumb:** if you're debating between `--color-muted` and `--color-light`, use `--color-muted`. It passes contrast on all backgrounds. `--color-light` fails on `--color-bg-alt` and tinted backgrounds.

### Background colors — pick by layer

| Layer          | Token                                            | When to use                                                     |
| -------------- | ------------------------------------------------ | --------------------------------------------------------------- |
| Page           | `--color-bg`                                     | Default page background, never needs to be set explicitly       |
| Alternate      | `--color-bg-alt`                                 | Alternating sections, card backgrounds, code blocks             |
| Surface        | `--color-surface`                                | Cards, modals, overlays — anything that "floats" above the page |
| Tint           | `--color-accent-light`                           | Highlight backgrounds, selected rows, active states             |
| Success/Danger | `--color-success-light` / `--color-danger-light` | Status indicators, before/after comparisons                     |

### Semantic colors — pick by meaning

| Meaning  | Text              | Background              | Use for                                    |
| -------- | ----------------- | ----------------------- | ------------------------------------------ |
| Positive | `--color-success` | `--color-success-light` | Improvements, gains, "after" values        |
| Negative | `--color-danger`  | `--color-danger-light`  | Problems, losses, "before" values          |
| Neutral  | `--color-accent`  | `--color-accent-light`  | Highlights, selected items, brand elements |

---

## Typography Selection

### Font families — pick by content type

| Content                  | Token                                 | Examples                                         |
| ------------------------ | ------------------------------------- | ------------------------------------------------ |
| Body text, UI elements   | `--font-sans` (Epilogue)              | Paragraphs, buttons, navigation, labels          |
| Section headings, quotes | `--font-serif` (Newsreader)           | H2 with serif feel, pullquotes, taglines         |
| Large display numbers    | `--font-display` (Cormorant Garamond) | Metric card numbers, hero stats                  |
| Code, data, labels       | `--font-mono` (DM Mono)               | Comparison labels, technical values, code blocks |

### Font sizes — never hardcode

Use the `clamp()` tokens. They scale fluidly between mobile and desktop.

| Purpose         | Token                 | Range                 |
| --------------- | --------------------- | --------------------- |
| Page title      | `--font-size-h1`      | 2.25rem → 3.25rem     |
| Section heading | `--font-size-h2`      | 1.5rem → 1.75rem      |
| Lead paragraph  | `--font-size-summary` | 1.125rem → 1.25rem    |
| Large body      | `--font-size-body-lg` | 0.9375rem → 1.0625rem |

For smaller text (captions, labels), use `rem` values directly: `0.875rem`, `0.8125rem`, `0.75rem`, `0.6875rem`, `0.625rem`.

---

## Spacing Selection

### Between sections

Use `--section-spacing` (clamp 5rem–6rem). Never hardcode section padding.

### Within sections

| Gap size | Token                 | When to use                            |
| -------- | --------------------- | -------------------------------------- |
| Tight    | `--space-xs` (0.5rem) | Between label and value, icon and text |
| Small    | `--space-sm` (1rem)   | Between list items, between paragraphs |
| Medium   | `--space-md` (1.5rem) | Between components within a section    |
| Large    | `--space-lg` (2rem)   | Between major groups within a section  |

**Baseline:** everything aligns to `--baseline` (1.5rem / 24px). When in doubt, use multiples of 1.5rem.

---

## Component Selection

### Showing numbers

| Component          | When to use                               | Example                                   |
| ------------------ | ----------------------------------------- | ----------------------------------------- |
| **Metrics row**    | 2-4 headline stats                        | "70% faster", "$13M saved", "17x growth"  |
| **Bar comparison** | Comparing values on a single axis         | Fill rates, completion percentages        |
| **Data table**     | 3+ columns of structured data             | Feature comparisons, before/after grids   |
| **Chart.js chart** | Trends over time or complex relationships | Monthly fill rates, scoring distributions |

Pick the simplest component that makes the data clear. A metrics row beats a chart for 3 numbers. A table beats a chart for exact comparisons.

### Showing process

| Component           | When to use                  | Example                                   |
| ------------------- | ---------------------------- | ----------------------------------------- |
| **Timeline**        | Sequential steps with dates  | Project phases, implementation milestones |
| **Mermaid diagram** | System flows, decision trees | Process architecture, data pipelines      |
| **Funnel chart**    | Stage-by-stage attrition     | Application funnel, conversion pipeline   |

### Showing comparison

| Component                     | When to use                            | Example                            |
| ----------------------------- | -------------------------------------- | ---------------------------------- |
| **Before/after blocks**       | Two states side by side                | Old process vs. new process        |
| **Comparison label**          | Labeling before/after sections         | "BEFORE" / "AFTER" in DM Mono caps |
| **Data table with highlight** | Detailed feature-by-feature comparison | Amazon vs. Chick-fil-A application |
| **Bar comparison**            | Visual ratio difference                | Old time vs. new time              |

### Showing emphasis

| Component           | When to use                       | Example                                                            |
| ------------------- | --------------------------------- | ------------------------------------------------------------------ |
| **Insight callout** | One-sentence frame before results | "A program declining for 18 months recovered in a single quarter." |
| **Scope callout**   | Project metadata grid             | Timeline, role, teams, artifacts                                   |
| **Code annotation** | Technical implementation detail   | SQL snippets, formula breakdowns                                   |
| **Blockquote**      | Direct quotes or key principles   | Stakeholder feedback, design principles                            |

---

## Common Patterns

### Results section

```
insight-callout → metrics-row → (optional: bar-comparison or chart)
```

The insight callout frames the numbers. The metrics row delivers the headline stats. Additional visualization only if it adds understanding.

### Problem section

```
paragraph (with numbers) → data-table or bar-comparison → insight-callout
```

State the problem, show the evidence, then frame why it matters.

### Process section

```
paragraph → mermaid-diagram or timeline → code-annotation (if technical)
```

Explain what you did, show the structure, then show implementation detail.

---

## Anti-Patterns

| Don't                                 | Why                                     | Instead                                            |
| ------------------------------------- | --------------------------------------- | -------------------------------------------------- |
| Hardcode hex colors                   | Breaks consistency, fails token updates | Use `var(--color-*)` tokens                        |
| Add `font-size` media queries         | Conflicts with `clamp()` fluid system   | Use `--font-size-*` tokens                         |
| Use `--color-light` for readable text | Fails contrast on tinted backgrounds    | Use `--color-muted` or `--color-text`              |
| Put a chart where a table works       | Charts add complexity, load Chart.js    | Use simplest component that works                  |
| Create new tokens                     | Fragments the system                    | Use existing tokens or update the design doc first |
| Nest more than 2 components           | Visual noise, hard to scan              | Flatten the hierarchy                              |

---

_Created: 2026-03-04_
