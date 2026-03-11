// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Work case study circular link chain
 * DSP → CT → automation → DSP
 * Source of truth: ref/site-map.md
 */

// Protected chain (Tier 2)
const CHAIN = [
  {
    path: '/work/cfa-dsp-application/dsp-application.html',
    nextHref: /contract-transfer/,
    name: 'DSP Application',
  },
  {
    path: '/work/contract-transfer/contract-transfer.html',
    nextHref: /pinnacle-automation/,
    name: 'Contract Transfer',
  },
  {
    path: '/work/pinnacle-program-selection/pinnacle-automation.html',
    nextHref: /dsp-application/,
    name: 'Selection Automation (→ back to start)',
  },
];

// Public chain (Tier 1)
const PUBLIC_CHAIN = [
  {
    path: '/work/partner-application-public/index.html',
    nextHref: /contract-transfer-public/,
    name: 'Partner Application (public)',
  },
  {
    path: '/work/contract-transfer-public/index.html',
    nextHref: /pinnacle-public/,
    name: 'Contract Transfer (public)',
  },
  {
    path: '/work/pinnacle-public/index.html',
    nextHref: /partner-application-public/,
    name: 'Selection Automation (public → back to start)',
  },
];

for (const step of CHAIN) {
  test(`Link chain: ${step.name} has correct Next link`, async ({ page }) => {
    await page.goto(step.path);

    // Find the "Next:" footer link
    const nextLink = page.locator('.cs-cta a, a:has-text("Next:")').first();
    await expect(nextLink).toBeAttached();

    const href = await nextLink.getAttribute('href');
    expect(href).toMatch(step.nextHref);
  });

  test(`Link chain: ${step.name} Next link is reachable`, async ({ page }) => {
    await page.goto(step.path);
    const nextLink = page.locator('.cs-cta a, a:has-text("Next:")').first();

    // Click the link and verify destination loads (resolves relative href correctly)
    const [response] = await Promise.all([
      page.waitForResponse((r) => r.status() === 200 && r.url().includes('.html')),
      nextLink.click(),
    ]);
    expect(response.status()).toBe(200);
  });
}

// Public chain tests
for (const step of PUBLIC_CHAIN) {
  test(`Link chain: ${step.name} has correct Next link`, async ({ page }) => {
    await page.goto(step.path);

    const nextLink = page.locator('.cs-cta a, a:has-text("Next:")').first();
    await expect(nextLink).toBeAttached();

    const href = await nextLink.getAttribute('href');
    expect(href).toMatch(step.nextHref);
  });

  test(`Link chain: ${step.name} Next link is reachable`, async ({ page }) => {
    await page.goto(step.path);
    const nextLink = page.locator('.cs-cta a, a:has-text("Next:")').first();

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.status() === 200 && r.url().includes('index.html')),
      nextLink.click(),
    ]);
    expect(response.status()).toBe(200);
  });
}
