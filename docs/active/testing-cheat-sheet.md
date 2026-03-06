# Testing Cheat Sheet

Quick reference for the 7 test files and when to run each one.

---

## Run Everything

```bash
npm run check    # ESLint + Stylelint + Prettier + html-validate
npm test         # Playwright (chromium): pages, links, a11y, layout, visual
```

Or use `/check` which runs both and reports a summary table.

---

## Individual Test Files

| File | What it tests | When to run |
|---|---|---|
| `pages.spec.js` | Every page loads (200), has title, has canonical tag, case studies have reading-progress bar | After adding/removing pages |
| `link-chain.spec.js` | Circular link chain: CT → scoring → DSP → automation → distance → chargeback → CT | After changing "Next:" links in case studies |
| `a11y.spec.js` | WCAG 2.1 AA via axe-core on all 14 pages — contrast, headings, landmarks, ARIA | After changing colors, text, or HTML structure |
| `layout.spec.js` | Horizontal overflow at 1280px, 390px, 320px; tap target sizes on mobile | After changing CSS layout, padding, or widths |
| `visual.spec.js` | Screenshot comparison at desktop + mobile for all 14 pages | After any visual change (CSS, content, images) |
| `assets.spec.js` | Static assets exist and load correctly | After adding/moving images or fonts |
| `changelog.spec.js` | Changelog generation works | After modifying the changelog script |

### Run a single file

```bash
npx playwright test tests/a11y.spec.js --project=chromium
```

### Run tests matching a name

```bash
npx playwright test --grep "Homepage" --project=chromium
```

---

## Common Failures and Fixes

### `color-contrast` (a11y.spec.js)

**Cause:** Text color doesn't have enough contrast against its background.

**Fix:** Check the token being used. Common swaps:
- `--color-light` (#767676) → `--color-muted` (#6b6b6b) or `--color-text` (#3d3d3d)
- Verify with: contrast ratio must be >= 4.5:1 for normal text, >= 3:1 for large text (18px+ bold or 24px+)

**Debug:**
```bash
node -e "
(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:8000/PAGE_PATH');
  const AxeBuilder = require('@axe-core/playwright').default;
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa']).analyze();
  for (const v of results.violations) {
    for (const n of v.nodes) {
      const d = n.any[0]?.data;
      console.log(n.html.slice(0, 80), '|', d?.fgColor, 'on', d?.bgColor, '| ratio:', d?.contrastRatio);
    }
  }
  await browser.close();
})();
"
```

### Horizontal overflow (layout.spec.js)

**Cause:** An element is wider than the viewport.

**Fix:** Find the element:
```bash
# In Playwright evaluate:
document.querySelectorAll('*').forEach(el => {
  if (el.getBoundingClientRect().right > document.documentElement.clientWidth) {
    console.log(el.tagName, el.className, el.getBoundingClientRect().width);
  }
});
```

Common fixes:
- Add `max-width: 100%` + `overflow-x: auto` to the container
- Tables: ensure `.data-table-wrapper` wraps the table
- Charts: `.chart-container` already has `overflow-x: auto`

### Visual regression (visual.spec.js)

**Cause:** Screenshots don't match baselines.

**If changes are intentional:**
```bash
/update-snapshots
```

**If changes are unexpected:** investigate what changed — `git diff css/` is usually the fastest way.

### Link chain broken (link-chain.spec.js)

**Cause:** A "Next:" link in a case study points to the wrong page or the circular chain is broken.

**Fix:** Check CLAUDE.md for the current chain order:
```
CT → scoring → DSP → automation → distance → chargeback → CT
```

Verify each page's bottom CTA links to the next page in the chain.

---

## Linting Commands (non-Playwright)

```bash
npm run lint          # ESLint on js/, scripts/, tests/
npm run lint:css      # Stylelint on css/**/*.css
npm run format:check  # Prettier check (doesn't modify)
npm run lint:html     # html-validate on all tracked pages
npm run check:links   # Linkinator — internal links only
```

### Auto-fix

```bash
npm run lint:fix      # ESLint auto-fix
npm run lint:css:fix  # Stylelint auto-fix
npm run format        # Prettier write
```

---

## Adding a New Page to Tests

When you add a new page, update these files:

1. **`tests/pages.spec.js`** — add to `PAGES` array
2. **`tests/a11y.spec.js`** — add to `PAGES` array
3. **`tests/layout.spec.js`** — add to `PAGES` array
4. **`tests/visual.spec.js`** — add to `SNAPSHOT_PAGES` array
5. **`package.json`** — add path to `lint:html` script

Then run `npm test` to generate initial snapshots for the new page.

---

*Created: 2026-03-04*
