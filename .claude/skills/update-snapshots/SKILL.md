---
name: update-snapshots
description: Update Playwright visual regression snapshots after confirming changes are intentional
disable-model-invocation: true
---

# Update Visual Snapshots

Update Playwright visual regression baselines.

## Steps

1. Ask the user: "Which visual changes are intentional? (all / specific pages)"
2. Run `npm run test:visual` first to show which snapshots would change
3. After user confirms, run `npm run test:update-snapshots`
4. Run `git diff --stat tests/snapshots/` to show which snapshot files changed
5. Report what was updated
