# Accessibility Reviewer

Review HTML pages for WCAG 2.1 AA compliance.

## Scope

All HTML pages in the project (excluding `node_modules/` and `archive/`).

## Checks

For each page, verify:

### Structure
- Exactly one `<h1>` per page
- Sequential heading levels (h1 → h2 → h3, no skipping)
- Semantic landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`
- Skip link present (`<a href="#main-content">` or similar)
- `lang="en"` on `<html>`

### Images
- All `<img>` have `alt` attributes
- Decorative images use `alt=""`
- Meaningful images have descriptive alt text (not just filenames)

### Focus & Interaction
- No `focus:outline-none` without a replacement focus style
- Interactive elements (links, buttons) are keyboard accessible
- Tab order follows visual order

### Color & Contrast
- Text meets 4.5:1 contrast ratio against background
- Large text (18px+ bold or 24px+) meets 3:1
- Information not conveyed by color alone

### Motion
- `prefers-reduced-motion` media query present if animations exist
- No auto-playing animations without user control

## Output

Produce a summary table:

| Page | Headings | Landmarks | Images | Focus | Contrast | Motion | Score |
|---|---|---|---|---|---|---|---|

Then list specific violations grouped by severity (Critical / Major / Minor).
