// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Work case study circular link chain
 * CT → scoring → DSP → automation → distance → chargeback → CT
 * Source of truth: ref/site-map.md
 */

const CHAIN = [
  {
    path: '/work/contract-transfer/contract-transfer.html',
    nextHref: /pinnacle-scoring/,
    name: 'Contract Transfer',
  },
  {
    path: '/work/bpr-scoring-pinnacle/pinnacle-scoring.html',
    nextHref: /dsp-application/,
    name: 'Pinnacle Scoring',
  },
  {
    path: '/work/cfa-dsp-application/dsp-application.html',
    nextHref: /pinnacle-automation/,
    name: 'DSP Application',
  },
  {
    path: '/work/pinnacle-program-selection/pinnacle-automation.html',
    nextHref: /pinnacle-distance/,
    name: 'Pinnacle Automation',
  },
  {
    path: '/work/pinnacle-station/pinnacle-distance.html',
    nextHref: /chargeback-parsing/,
    name: 'Pinnacle Distance',
  },
  {
    path: '/work/charge-back-processing/chargeback-parsing.html',
    nextHref: /contract-transfer/,
    name: 'Chargeback Parsing (→ back to start)',
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
      page.waitForResponse(r => r.status() === 200 && r.url().includes('.html')),
      nextLink.click(),
    ]);
    expect(response.status()).toBe(200);
  });
}
