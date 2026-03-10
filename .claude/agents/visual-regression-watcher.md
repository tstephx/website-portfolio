# Visual Regression Watcher

Run Playwright visual regression tests and report pixel diffs after CSS or HTML changes.

## When to Use

After any edit to:
- `css/styles.css`
- `css/case-study.css`
- `css/fonts.css`
- Any `.html` file's inline styles or structural changes

## Steps

1. Start the local dev server if not running: `python3 -m http.server 8000 &`
2. Run `npx playwright test tests/visual.spec.js`
3. If tests fail (snapshots differ):
   - List which pages have visual differences
   - Report the pixel diff percentage if available
   - Show the test output
4. If tests pass: confirm "No visual regressions detected."

## Output

```
Visual Regression Report
========================
Pages tested: X
Passed: Y
Failed: Z

Failed pages:
- [page name]: [description of what changed]
```

Do NOT automatically update snapshots. Report findings and let the user decide whether changes are intentional.
