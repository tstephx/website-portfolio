// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Asset integrity — CSS loads, JS loads, no 404s on critical resources
 */

test('Global stylesheet loads', async ({ page }) => {
  const cssRequest = page.waitForResponse((r) => r.url().includes('styles.css'));
  await page.goto('/');
  const resp = await cssRequest;
  expect(resp.status()).toBe(200);
});

test('Case study stylesheet loads on work pages', async ({ page }) => {
  const cssRequest = page.waitForResponse((r) => r.url().includes('case-study.css'));
  await page.goto('/work/contract-transfer/contract-transfer.html');
  const resp = await cssRequest;
  expect(resp.status()).toBe(200);
});

test('Progress bar JS loads on case study pages', async ({ page }) => {
  const jsRequest = page.waitForResponse((r) => r.url().includes('progress-bar.js'));
  await page.goto('/work/contract-transfer/contract-transfer.html');
  const resp = await jsRequest;
  expect(resp.status()).toBe(200);
});

test('Favicon loads', async ({ request }) => {
  const resp = await request.get('/favicon.svg');
  expect(resp.status()).toBe(200);
});

test('Headshot image loads on homepage', async ({ page }) => {
  await page.goto('/');
  const img = page.locator('img[src*="headshot"]').first();
  // Ensure image is loaded (naturalWidth > 0)
  const loaded = await img.evaluate((el) => {
    const image = /** @type {HTMLImageElement} */ (el);
    return image.complete && image.naturalWidth > 0;
  });
  expect(loaded).toBe(true);
});

test('No 404s on homepage asset requests', async ({ page }) => {
  const failed = [];
  page.on('response', (resp) => {
    if (resp.status() === 404) failed.push(resp.url());
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(failed, `404s found: ${failed.join(', ')}`).toHaveLength(0);
});
