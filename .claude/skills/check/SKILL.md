---
name: check
description: Run full lint + format + html-validate + Playwright tests, report pass/fail
disable-model-invocation: true
---

# Full Project Check

Run all quality checks and tests in one command.

## Steps

1. Run `npm run check` (ESLint + Stylelint + Prettier + html-validate)
2. If step 1 passes, run `npm test` (Playwright chromium)
3. Report results as a summary table:

| Check | Status |
|---|---|
| ESLint | Pass/Fail |
| Stylelint | Pass/Fail |
| Prettier | Pass/Fail |
| html-validate | Pass/Fail |
| Playwright | Pass/Fail (X/Y tests) |

If any check fails, show the error output and suggest fixes.
