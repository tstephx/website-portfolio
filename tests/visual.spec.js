// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Visual regression snapshots — desktop only (chromium project)
 * Run `npm test` once to create baselines, then compare on subsequent runs.
 * To update: `npm run test:update-snapshots`
 */

const SNAPSHOT_PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/work/contract-transfer/contract-transfer.html', name: 'work-contract-transfer' },
  { path: '/projects/mcp-ecosystem.html', name: 'project-mcp-ecosystem' },
  { path: '/resume.html', name: 'resume' },
];

for (const { path, name } of SNAPSHOT_PAGES) {
  test(`Visual: ${name} — above fold (desktop)`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    // Clip to above-fold viewport to keep snapshots stable
    await expect(page).toHaveScreenshot(`${name}-above-fold.png`, {
      clip: { x: 0, y: 0, width: 1280, height: 720 },
      maxDiffPixelRatio: 0.02, // allow 2% pixel diff before failing
    });
  });
}

// Full-page snapshot for homepage (lighter page, stable)
test('Visual: homepage — full page', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('homepage-full.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  });
});
