<!-- project: website-portfolio -->
# Typography Overhaul — Design Document

*Approved: 2026-02-19*
*Branch: main*

---

## 1. Goal

Replace the Inter + Lora font stack with a four-font editorial system that better matches the "PM with deep technical fluency" narrative. Simultaneously shift the accent color from generic Tailwind blue to a distinguished ink navy.

**Direction:** Editorial & Refined — think Harvard Business Review meets personal brand. Senior, confident, high-taste.

---

## 2. Scope

### In Scope
- `css/styles.css` — font token updates, accent color tokens, `h1`/`h3` overrides
- `index.html` — Google Fonts `<link>` replacement

### Out of Scope
- Layout changes
- Spacing or component changes
- Case study pages (inherit tokens automatically — no per-file changes needed)
- Dark mode

---

## 3. Font Stack

Four fonts, each with a specific job:

| Font | Role | Rationale |
|------|------|-----------|
| `Cormorant Garamond` 600/700 | `h1` only (name display) | High-contrast strokes look extraordinary at display size. Rare on PM portfolios. Signals print-quality refinement. |
| `Newsreader` (variable, optical) | `h2`, body serif, cards h3, `.summary` | Designed for editorial reading. Optical sizing (`opsz`) keeps it crisp at 13px and lush at 18px. Replaces Lora. |
| `Epilogue` 400/500/600/700 | Nav, CTA button, tagline, body paragraphs, UI chrome | Replaces Inter. Slightly geometric, more personality, same readability. |
| `DM Mono` 400/500 | `h3` section labels, `.project-meta` | Monospace + wide letter-spacing on labels signals analytical precision — "output from a system," not resume bullets. |

**Google Fonts replacement** (replaces current Inter + Lora `<link>`):
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Mono:wght@400;500&family=Epilogue:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet">
```

---

## 4. CSS Token Changes

### New tokens (add to `:root`)
```css
--font-display: 'Cormorant Garamond', 'Times New Roman', serif;
--font-mono:    'DM Mono', 'Fira Mono', monospace;
```

### Updated tokens
```css
--font-sans:  'Epilogue', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-serif: 'Newsreader', Georgia, 'Times New Roman', serif;
```

### Accent color tokens
```css
/* BEFORE */
--color-accent:       #2563eb;
--color-accent-hover: #1d4ed8;
--color-accent-light: rgba(37, 99, 235, 0.08);

/* AFTER */
--color-accent:       #1a3a6b;
--color-accent-hover: #142e55;
--color-accent-light: rgba(26, 58, 107, 0.08);
```

---

## 5. Element Mapping

| Element | Before | After | Notes |
|---------|--------|-------|-------|
| `h1` | Lora 700 | Cormorant Garamond 600, `letter-spacing: -0.03em` | Requires explicit `font-family: var(--font-display)` override |
| `h2` | Lora 600 | Newsreader 600 | Automatic via `--font-serif` token update |
| `h3` (labels) | Inter 700 uppercase | DM Mono 500 uppercase, keep `letter-spacing: 0.06em` | Requires `font-family: var(--font-mono)` override |
| `.project-card h3` | Lora serif | Newsreader | Automatic via `--font-serif` token — override stays in place |
| `.project-meta` | Inter 500 | DM Mono 400 | Requires `font-family: var(--font-mono)` override |
| `.summary` | Lora | Newsreader | Automatic via `--font-serif` |
| `.tagline` | Inter | Epilogue | Automatic via `--font-sans` |
| Nav links | Inter | Epilogue | Automatic via `--font-sans` |
| `.cta-button` | Inter | Epilogue | Automatic via `--font-sans` |
| Body paragraphs | Inter | Epilogue | Automatic via `--font-sans` |

### Explicit CSS overrides required (2 rules)
```css
h1 {
    font-family: var(--font-display);
    letter-spacing: -0.03em; /* tighter than current -0.02em */
}

h3 {
    font-family: var(--font-mono);
    /* weight: keep 700 → but DM Mono only has 400/500, use 500 */
    font-weight: 500;
}
```

### Additional override needed
```css
.project-meta {
    font-family: var(--font-mono);
}
```

---

## 6. Files Changed

| File | Change |
|------|--------|
| `index.html` | Replace Google Fonts `<link>` |
| `css/styles.css` | 4 token updates, 2 new tokens, 3 explicit overrides |

Case study pages (`work/**/*.html`, `projects/*.html`) inherit all changes via CSS tokens — no per-file edits needed.

---

## 7. Implementation Order

1. Update Google Fonts `<link>` in `index.html`
2. Add `--font-display` and `--font-mono` tokens to `:root` in `styles.css`
3. Update `--font-sans` and `--font-serif` tokens
4. Update accent color tokens
5. Add `h1` font-family + letter-spacing override
6. Add `h3` font-family + font-weight override
7. Add `.project-meta` font-family override
8. Visual QA both index and a case study page

---

*Created: 2026-02-19*
