# Testing Reference

**Stack:** Playwright + axe-core + ESLint + Stylelint + Prettier + html-validate + Linkinator

**Last verified:** 2026-03-04

---

## Test Files (Playwright)

| File | Tests | What it covers |
|---|---|---|
| `pages.spec.js` | 14 pages × 3 checks | HTTP 200, page title, canonical tag, reading-progress bar |
| `link-chain.spec.js` | 6 links | Circular case study chain: CT → scoring → DSP → automation → distance → chargeback → CT |
| `a11y.spec.js` | 14 pages | WCAG 2.1 AA via axe-core — contrast, headings, landmarks, ARIA |
| `layout.spec.js` | 14 pages × 3 viewports | Horizontal overflow at 1280px, 390px, 320px; tap targets on mobile |
| `visual.spec.js` | 14 pages × 2 viewports | Screenshot regression — desktop (1280×720) and mobile (390×844) |
| `assets.spec.js` | Static assets | Image/font files exist and load |
| `changelog.spec.js` | 1 | Changelog generation script works |

---

## npm Scripts

### Quality checks (no browser needed)

```bash
npm run lint          # ESLint: js/, scripts/, tests/
npm run lint:css      # Stylelint: css/**/*.css (includes a11y plugin)
npm run format:check  # Prettier: all tracked file types
npm run lint:html     # html-validate: all 14 HTML pages
npm run check:links   # Linkinator: internal links only
npm run check         # All of the above in sequence
```

### Playwright tests

```bash
npm test              # All specs, chromium only
npm run test:all      # All specs, all projects (chromium + mobile)
npm run test:visual   # Visual regression only
npm run test:update-snapshots  # Regenerate visual baselines
npm run test:ui       # Interactive Playwright UI
npm run test:report   # Open last HTML report
```

### Auto-fix

```bash
npm run lint:fix      # ESLint auto-fix
npm run lint:css:fix  # Stylelint auto-fix
npm run format        # Prettier write mode
```

---

## Playwright Config

- **Config:** `playwright.config.js`
- **Base URL:** `http://localhost:8000`
- **Web server:** `python3 -m http.server 8000` (auto-started by Playwright)
- **Snapshots:** `tests/snapshots/`
- **Reports:** `tests/report/`
- **Projects:** `chromium` (Desktop Chrome), `mobile` (Pixel 5)

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `@playwright/test` | ^1.58 | Test runner + browser automation |
| `@axe-core/playwright` | latest | WCAG accessibility auditing |
| `eslint` | ^10.0 | JavaScript linting |
| `stylelint` | ^17.4 | CSS linting |
| `stylelint-config-standard` | ^40.0 | Stylelint base config |
| `@double-great/stylelint-a11y` | ^3.4 | CSS accessibility rules |
| `prettier` | ^3.8 | Code formatting |
| `html-validate` | ^10.11 | HTML validation |
| `linkinator` | ^7.6 | Link checking |

---

## Adding a New Page

Update these files when adding a page:

1. `tests/pages.spec.js` — `PAGES` array
2. `tests/a11y.spec.js` — `PAGES` array
3. `tests/layout.spec.js` — `PAGES` array
4. `tests/visual.spec.js` — `SNAPSHOT_PAGES` array
5. `package.json` — `lint:html` script path list

Then run `npm test` to generate initial visual snapshots.
