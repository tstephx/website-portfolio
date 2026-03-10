---
name: link-check
description: Run linkinator + Playwright link-chain test, report broken links
disable-model-invocation: true
---

# Link Check

Verify all internal links and the circular case study link chain.

## Steps

1. Run `npm run check:links` (linkinator — internal links only, skips external https)
2. Run `npx playwright test tests/link-chain.spec.js` (circular link chain verification)
3. Report results:

### Output Format

**Internal Links:**
- Total checked: X
- Broken: Y (list each with source page and target)

**Link Chain** (CT → scoring → DSP → automation → distance → chargeback → CT):
- Status: Pass / Fail
- If fail: which link in the chain is broken

If any links are broken, suggest the fix (usually a path typo).
