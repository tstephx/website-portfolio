// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Visual regression snapshots
 * Run `npm test` once to create baselines, then compare on subsequent runs.
 * To update: `npm run test:update-snapshots`
 */

const SNAPSHOT_PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/work/contract-transfer/contract-transfer.html', name: 'work-contract-transfer' },
  { path: '/projects/mcp-ecosystem.html', name: 'project-mcp-ecosystem' },
  { path: '/resume.html', name: 'resume' },
];

// ===== DESKTOP (1280×720) =====
test.describe('Desktop snapshots', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  for (const { path, name } of SNAPSHOT_PAGES) {
    test(`Visual: ${name} — above fold (desktop)`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`${name}-desktop-above-fold.png`, {
        clip: { x: 0, y: 0, width: 1280, height: 720 },
        maxDiffPixelRatio: 0.02,
      });
    });
  }

  // Full-page snapshot for homepage (lighter page, stable)
  test('Visual: homepage — full page (desktop)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-desktop-full.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
});

// ===== MOBILE (390×844 — iPhone 13) =====
test.describe('Mobile snapshots', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const { path, name } of SNAPSHOT_PAGES) {
    test(`Visual: ${name} — above fold (mobile)`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`${name}-mobile-above-fold.png`, {
        clip: { x: 0, y: 0, width: 390, height: 844 },
        maxDiffPixelRatio: 0.02,
      });
    });
  }

  // Full-page mobile snapshot for homepage — checks nav collapse + card stacking
  test('Visual: homepage — full page (mobile)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-mobile-full.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
});
