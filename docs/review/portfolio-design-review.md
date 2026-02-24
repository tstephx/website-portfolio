# Portfolio Design Review: Typography, UI & Design Choices

**Reviewed:** `index.html`, `mcp-ecosystem.html`, `styles.css`, `case-study.css`
**Date:** February 12, 2026
**Site:** taylorstephens.dev

---

## Typography

### What's Strong

**The type scale is deliberate and well-reasoned.** A constrained set of sizes, not random pixel values:

| Size | Use | Notes |
|------|-----|-------|
| 0.625rem (10px) | `.scope-label` | Metadata micro-type |
| 0.6875rem (11px) | `.tech-pill`, table headers, `.metric-label` | System labels |
| 0.75rem (12px) | Footer, `.project-card strong` | De-emphasized text |
| 0.8125rem (13px) | Nav, `.back-nav`, h3 labels, `.cs-tagline` context | UI chrome |
| 0.875rem (14px) | `.data-table`, `.bar-comparison-label`, `.scope-value` | Data display |
| 0.9375rem (15px) | Body text in case studies, project cards, skills | Primary reading |
| 1rem (16px) | Desktop body, `#about` text | Upgraded reading |
| 1.0625rem (17px) | `#about` lead paragraph, `.cs-tagline` | Emphasis |
| 1.125rem (18px) | `.summary`, `.formula`, `.insight-callout` | Editorial voice |
| 1.25rem (20px) | `.project-card h3`, desktop `.summary` | Card titles |

This is a near-perfect minor third type scale with intentional deviations. Using 15px as default body rather than 16px is a mature choice; it creates more air between body and heading tiers.

**The dual-font strategy is correctly applied.** Lora for editorial/narrative elements (h1, h2, `.summary`, `.insight-callout`, `.metric-number`, `.formula`, `.bar-value`), Inter for everything structural (nav, h3 labels, body, tables, pills, metadata). This creates two distinct reading modes: "the story" (Lora) and "the system" (Inter). Readers unconsciously shift between them.

**The `letter-spacing` discipline is notable.** Used precisely:

- `-0.02em` on headings (tightening Lora at large sizes — correct, serifs need tightening as they scale)
- `+0.04em` to `+0.08em` on uppercase labels (compensating for the optical looseness that all-caps creates)
- `+0.01em` to `+0.03em` on mid-weight UI text

This is typographic craftsmanship that most developers skip entirely.

**The `line-height` system.** `1.1` for h1, `1.2` for h2, `1.5` for timeline descriptions, `1.6` for taglines, `1.65` for project card body, `1.7` for long-form reading. This progression from tight display to loose reading is correct — large type needs less leading, small type needs more. The `1.7` on body at 15px means 25.5px actual leading, which is comfortable for the 65ch measure.

---

### Typography Issues

**Body text at 0.9375rem (15px) is slightly small for case study content density.** The MCP Ecosystem page has 2,000+ words of technical prose. At 15px with a 720px max-width, readers are spending significant time on that page. The desktop breakpoint bumps it to `1rem` (16px), which helps, but mobile/tablet users — reading at arm's length — get the smaller size where they arguably need the larger one.

**Recommendation:** Bump the mobile base to 1rem and desktop to 1.0625rem for `.cs-section p`. The column width (720px, ~65ch at this size) supports it without feeling oversized.

**The `h3` treatment creates a hierarchy ambiguity.** Every h3 is styled identically: Inter, 0.8125rem, 700 weight, uppercase, muted color, 0.06em tracking. This works for structural labels ("Search Strategy: Why Hybrid over Single-Mode"). But it also applies to:

- `.comparison-before h3` / `.comparison-after h3` — where "Rejected: Binary Approach" and "Chosen: Graduated Trust" function as card titles, not section labels
- `.project-card h3` — which overrides to Lora at 1.25rem (correctly), showing the problem was already recognized here
- Deep dive link cards — where h3 wraps a link ("Book Library MCP Server")

The comparison cards specifically suffer. "REJECTED: BINARY APPROACH" in tiny uppercase muted type looks like a label for something below it, not a title for the content beside it. These need a different treatment — perhaps the project card's Lora style, or at minimum a slightly larger/darker variant of the label pattern.

**The tagline uses `×` (multiplication sign) as a separator.** *"Product × Operations × Program."* The `×` character renders differently across systems. On macOS it looks clean; on Windows with certain font stacks it can look like a lowercase "x" or misalign vertically. Consider `·` (middle dot, `&middot;`) or `|` for guaranteed cross-platform consistency, or test on Windows/Chrome.

**No `font-feature-settings` for Inter.** Inter supports `tnum` for tabular numbers (which should be used in `.metric-number`, `.stage-value`, and data tables), and several stylistic sets. At minimum, add:

```css
font-feature-settings: 'tnum' 1;
```

to any element displaying numbers in columns — without it, proportional figures cause misalignment in tables and metrics.

**The `p { margin-bottom: 1.125rem }` comment says "per 50-site study."** Paragraph spacing at 75% of line-height matches the Bringhurst recommendation exactly. No change needed — rationale is sound.

---

## Color System

### What's Strong

**The neutral palette is sophisticated.** Five gray tones with clear roles:

| Token | Hex | Role |
|-------|-----|------|
| `--color-heading` | `#1a1a1a` | Headings, CTA button, highest contrast |
| `--color-text` | `#3d3d3d` | Body text |
| `--color-muted` | `#6b6b6b` | De-emphasized labels, h3, metadata |
| `--color-light` | `#a0a0a0` | Lightest text (footer, scope labels) |
| `--color-border` | `#e5e5e5` | Structural dividers |

Each step is optically distinct — not just numerically different. The jump from `#6b6b6b` to `#a0a0a0` is the widest, correctly placing the biggest contrast gap between "readable muted" and "barely-there light."

**Single accent hue.** `#2563eb` (Tailwind blue-600) as the sole accent color. One accent used consistently reads as intentional; multiple colors read as "template." The gradient treatment on `h2::after` (`accent` → `accent-hover`) adds depth without adding a second hue.

---

### Color Issues

**Contrast ratio on `--color-light: #a0a0a0`.** Against `--color-bg: #ffffff`, this computes to approximately 2.97:1 — below WCAG AA's 4.5:1 requirement for normal text and below the 3:1 requirement for large text. This affects:

- `.scope-label` (10px uppercase)
- Footer text (12px)
- `.metric-subtitle` (11px)

These are all small-size text elements where contrast matters most.

**Fix:** Darken `--color-light` to at least `#767676` (4.54:1). Alternatively, accept these elements are purely decorative and add `aria-hidden` — but scope labels carry meaning, so darkening is the better path.

**The vote diagram introduces out-of-system colors.** `.vote-yes` uses `#d4edda` / `#155724` / `#28a745` and `.vote-no` uses `#f8d7da` / `#721c24` / `#dc3545`. These are Bootstrap's success/danger palette, not derived from the design tokens. They're the only place in the entire system where green and red appear, and they feel imported rather than designed.

**Fix:** Define these as tokens (`--color-success`, `--color-danger`) or rethink whether green/red is needed — the comparison cards already use gray border (rejected) vs blue border (chosen), which communicates the same thing through the existing system.

**No dark mode consideration.** Not required, but because the color system is fully tokenized, it's one `@media (prefers-color-scheme: dark)` block away from support. The investment is low and the signal it sends ("this person thinks about user preferences") aligns with the Design Strategist positioning.

---

## Layout & Spacing

### What's Strong

**The 720px max-width is an excellent choice.** At 16px body, 720px gives roughly 65 characters per line — the typographic optimum for sustained reading. Most portfolio sites go wider (900–1100px) because they think "more space = more impressive." This correctly recognizes that readability matters more than visual grandeur. The bump to 780px at 1280px viewports is proportionally correct.

**Section spacing is generous and consistent.** `5rem` mobile → `6rem` desktop between sections creates clear chapter breaks without feeling empty. The alternating `#fafafa` backgrounds on About and Skills add visual rhythm without adding complexity.

**The scope callout is a well-designed metadata pattern.** Four key-value pairs in a compact grid that collapses cleanly from 2×2 on tablet to stacked on mobile. Tiny uppercase labels (`0.625rem`, `0.08em` tracking) read as structural metadata, not content. The border treatment (shared borders between cells, `border-radius` on the container) is clean.

---

### Layout Issues

**The `85vh` hero height is a design problem.** The hero does three things: name, one-liner, and CTA. That content occupies maybe 300px of vertical space. The remaining ~400px is not creating contemplative whitespace (there's nothing to contemplate) — it's just pushing actual work below the fold.

The radial gradient background effect (`radial-gradient(ellipse at 50% 40%, var(--color-accent-light) 0%, transparent 70%)`) is so subtle that it doesn't justify the space it occupies. Reducing to `60vh` or removing `min-height` entirely still gives the hero breathing room while letting the top of Featured Projects peek above the fold — which is what visitors should engage with.

**The comparison cards have an internal spacing inconsistency.** On tablet+, `.comparison` uses `1fr 1fr` with `gap: 1.5rem`. Cards have `padding: 1.25rem` with `padding-left: 1.5rem` (the extra 0.25rem accounts for the 3px border-left). The visual result is that left-padding inside the card matches the gap between cards — this is good.

However, the border-left treatment means the "Rejected" card (gray border) and "Chosen" card (blue border) have unequal visual weight despite equal grid sizing. The blue border draws the eye intentionally, but it also makes the rejected option feel physically narrower because the gray border disappears into the background. Consider making both borders visible colors — gray for rejected, blue for chosen — rather than relying on `var(--color-border)` which is barely visible at 3px.

**No vertical rhythm enforcement in component margins.** `--baseline: 1.5rem` is defined but not enforced consistently. Component margins are `1.5rem 0` (tables, comparisons, mermaid containers, code blocks, bar comparisons), which aligns to baseline. But `h3 { margin-top: 2rem }` breaks the grid, and `margin-bottom: 1.125rem` on paragraphs intentionally doesn't align (which is fine — paragraph spacing should be sub-baseline). The issue is that `2rem` on h3 puts the label at a fractional baseline position, creating subtle vertical misalignment when labels sit beside baseline-aligned elements. Consider `margin-top: 1.5rem` or `margin-top: 3rem` (1× or 2× baseline) for cleaner vertical cadence.

---

## Component Design

### What's Strong

**The `.insight-callout` is the best-designed component on the site.** The gradient background (`linear-gradient(135deg, var(--color-accent-light), transparent)`) is subtle enough to not fight the text, the border-left accent creates a clear visual anchor, and switching to Lora italic at 1rem immediately signals "this is editorial voice, not documentation." It's the single most visually distinctive element and communicates purpose perfectly.

**The `.tech-pill` pattern is restrained and effective.** Ghost border style (no fill, just a 1px border) in muted color, tiny uppercase type — these read as metadata tags, not interactive elements. The `white-space: nowrap` prevents wrapping within pills, a detail most people miss.

**The project card separator pattern.** Using `border-bottom` with `:first-of-type { padding-top: 0 }` and `:last-of-type { border-bottom: none; padding-bottom: 0 }` creates a clean divider pattern without wrapper elements. The negative margin (`margin: 0 -1.5rem`) extends the separator edge-to-edge while keeping content padded. This is elegant.

**The lessons-list checkmark pattern.** `::before` pseudo-element with `\2713` (checkmark) in accent color, positioned absolutely with `padding-left: 1.75em`. Custom list marker without SVG overhead or icon font dependency. The checkmark semantically matches the content ("Lessons Learned" = things confirmed through experience).

---

### Component Issues

**The metrics row doesn't scale its numbers.** `.metric-number` is `1.75rem` at all breakpoints. On mobile (2×2 grid), "130+" and "35K" at 1.75rem with `1.25rem` padding feel cramped inside the 1px border box. On desktop (4×1), the same size feels undersized for the available space.

**Fix:** Add a responsive scale: `1.5rem` on mobile (tighter space) and `2rem` on desktop (room to breathe). The metric cards are the most glanceable element on the results page — they should feel impactful at every viewport.

**The data table `.highlight` class is overloaded.** In the architecture table, it highlights server names in accent blue (`color: var(--color-accent); font-weight: 600`). In the decision tables, it highlights the chosen row. Same visual treatment, different semantic meaning. A visitor can't distinguish "this is a name" from "this is the recommended option."

**Fix:** For chosen-option rows, add a subtle background tint (`background-color: var(--color-accent-light)`) to the entire row. This distinguishes "this is the answer" from "this is a label."

**The deep dive link cards reuse `.comparison` but aren't comparisons.** The "Deep Dives" section uses:

```html
<div class="comparison">
    <div class="comparison-before link-card">...</div>
    <div class="comparison-after link-card">...</div>
</div>
```

This repurposes a "before/after" component as a "two-column link grid." The `.link-card` modifier overrides border colors to make both accent-blue, which visually works, but the underlying semantics are confusing. More practically, the "Portfolio Server (coming soon)" card gets the same blue border treatment as live links — no visual distinction between "clickable" and "not yet available."

**Fix:** Add a `.link-card-disabled` variant with a gray border and reduced opacity, or create a dedicated `.link-grid` component rather than overloading `.comparison`.

**The `border-radius: 3px` vs `4px` inconsistency.** `.cta-button` and `.tech-pill` use `3px`. Everything else (`.metric-card`, `.mermaid-container`, `.comparison-before`, `.scope-callout`, `pre code`) uses `4px`. A 1px difference that's nearly invisible, but suggests two different design decisions rather than one. Pick one and apply everywhere — `4px` is the more common value in the system.

---

## Interaction Design

### What's Strong

**Hover states are well-scoped.** Desktop-only via the `@media (min-width: 1024px)` block prevents touch devices from getting stuck hover states. The nav underline animation (`transform: scaleX(0)` → `scaleX(1)`) is smooth at `0.25s ease`. The CTA button lift (`translateY(-1px)` + shadow) provides clear affordance without being flashy.

---

### Interaction Issues

**No `:focus-visible` states.** A skip link signals accessibility awareness, but there are no `:focus-visible` styles on interactive elements. Keyboard users tabbing through the page get the browser's default focus ring but no custom styling that matches the design system.

**Fix:**

```css
a:focus-visible,
.cta-button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}
```

This gives keyboard navigation the same polish as mouse navigation.

**The `transition: width 0.6s ease-out` on `.bar-fill` never triggers.** Bar widths are set inline with `style="width: 85%"` — they don't animate on scroll or load because the value is already applied when the element renders. To animate the bars in, an Intersection Observer or CSS animation would be needed. If animation isn't intended, remove the transition declaration — it's dead code that suggests unfinished intent.

---

## Priority Design Fixes

| Priority | Issue | Category | Impact |
|----------|-------|----------|--------|
| 1 | Darken `--color-light` from `#a0a0a0` to `#767676`+ | Color | WCAG AA compliance failure |
| 2 | Add `font-feature-settings: 'tnum' 1` to numeric elements | Typography | Tabular number alignment in metrics/tables |
| 3 | Differentiate h3 treatments for comparison card titles | Typography | Hierarchy clarity |
| 4 | Reduce hero height to `60vh` or content-driven | Layout | Content visibility above fold |
| 5 | Scale `.metric-number` responsively | Components | Visual impact at all viewports |
| 6 | Add `:focus-visible` states | Interaction | Keyboard navigation polish |
| 7 | Distinguish table `.highlight` semantics | Components | Row background for chosen vs text color for labels |
| 8 | Standardize `border-radius` to `4px` | Components | Visual consistency |
| 9 | Remove dead `.bar-fill` transition or implement scroll animation | Interaction | Code cleanliness |
