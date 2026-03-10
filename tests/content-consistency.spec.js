// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Content Consistency Tests
 *
 * The case study <main> body is the single source of truth.
 * These tests verify that all reference points (meta descriptions, taglines,
 * quick summaries, homepage cards) stay in sync with body content.
 *
 * When a test fails, update the reference point to match the body — not the reverse.
 */

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get trimmed text content, collapsing whitespace */
async function textOf(locator) {
  const raw = await locator.textContent();
  return raw?.replace(/\s+/g, ' ').trim() ?? '';
}

// ── DSP Application ─────────────────────────────────────────────────────────

test.describe('DSP Application — consistency', () => {
  const slug = '/work/cfa-dsp-application/dsp-application.html';

  test('meta description has no stale values', async ({ page }) => {
    await page.goto(slug);
    const meta = await page.getAttribute('meta[name="description"]', 'content');
    // Guard against old wrong values creeping back
    expect(meta).not.toMatch(/4\.6/);
    expect(meta).not.toMatch(/18 (?:countries|markets)/);
    expect(meta).not.toContain("Amazon's DSP");
  });

  test('tagline matches body values', async ({ page }) => {
    await page.goto(slug);
    const tagline = await textOf(page.locator('.cs-tagline'));
    expect(tagline).toContain('17 Global Markets');
    expect(tagline).toContain('3.8 Engineers');
  });

  test('homepage card stat matches body', async ({ page }) => {
    await page.goto('/');
    const dspCard = page.locator('article.card', { hasText: 'DSP Application' });
    const statValues = await dspCard.locator('.stat-value').allTextContents();
    const stats = statValues.join(' ');
    // Body: 15× multiplier, 17 countries, 101 requirements
    expect(stats).toContain('15');
    expect(stats).toContain('101');
    expect(stats).not.toContain('18×');
  });

  test('no anonymization violations in meta/tagline', async ({ page }) => {
    await page.goto(slug);
    const meta = await page.getAttribute('meta[name="description"]', 'content');
    const tagline = await textOf(page.locator('.cs-tagline'));
    // Tagline should not expose "Amazon" or "DSP" in isolation
    expect(tagline).not.toMatch(/\bAmazon\b.*\bDSP\b/);
    // Meta is OK to reference Amazon in context (it's the page about Amazon's app)
    // but should not say "Amazon's DSP" as a program label
    expect(meta).not.toContain("Amazon's DSP");
  });
});

// ── Contract Transfer ────────────────────────────────────────────────────────

test.describe('Contract Transfer — consistency', () => {
  const slug = '/work/contract-transfer/contract-transfer.html';

  test('meta description has no anonymization violations', async ({ page }) => {
    await page.goto(slug);
    const meta = await page.getAttribute('meta[name="description"]', 'content');
    expect(meta).not.toContain("Amazon's DSP");
    expect(meta).not.toContain("Amazon's");
  });

  test('tagline says "Exit Costs Avoided" not "Risk Mitigated"', async ({ page }) => {
    await page.goto(slug);
    const tagline = await textOf(page.locator('.cs-tagline'));
    expect(tagline).toContain('Exit Costs Avoided');
    expect(tagline).not.toContain('Risk Mitigated');
  });

  test('body metric: 87% faster decisions', async ({ page }) => {
    await page.goto(slug);
    const resultsSection = page.locator('#results');
    const text = await textOf(resultsSection);
    expect(text).toMatch(/87%/);
    expect(text).toMatch(/16\.98/);
    expect(text).toMatch(/2\.28/);
  });

  test('homepage card stat matches body (87% not 70%)', async ({ page }) => {
    await page.goto('/');
    const ctCard = page.locator('article.card', { hasText: 'Contract Transfer' });
    const statValues = await ctCard.locator('.stat-value').allTextContents();
    const stats = statValues.join(' ');
    expect(stats).toContain('87%');
    expect(stats).not.toContain('70%');
  });

  test('homepage card narrative matches body claims', async ({ page }) => {
    await page.goto('/');
    const ctCard = page.locator('article.card', { hasText: 'Contract Transfer' });
    const narrative = await textOf(ctCard.locator('.card-narrative'));
    // Body: $13M+, 87%, zero documentation, 29 transfers
    expect(narrative).toContain('$13M+');
    expect(narrative).toContain('29 transfers');
    // Should NOT contain fabricated claims
    expect(narrative).not.toContain('eight figures');
    expect(narrative).not.toContain('3 of 4 workstreams');
  });

  test('body phases: 4 phases (no Notification)', async ({ page }) => {
    await page.goto(slug);
    const solutionSection = page.locator('#solution');
    const text = await textOf(solutionSection);
    expect(text).toContain('four phases');
    expect(text).toContain('Intake');
    expect(text).toContain('Vetting');
    expect(text).toContain('Approvals');
    expect(text).toContain('Onboarding');
    expect(text).not.toContain('Notification');
  });
});

// ── Pinnacle / Selection Automation ──────────────────────────────────────────

test.describe('Pinnacle Automation — consistency', () => {
  const slug = '/work/pinnacle-program-selection/pinnacle-automation.html';

  test('meta/og descriptions use "55+MB" not "55MB"', async ({ page }) => {
    await page.goto(slug);
    const meta = await page.getAttribute('meta[name="description"]', 'content');
    const og = await page.getAttribute('meta[property="og:description"]', 'content');
    expect(meta).toContain('55+MB');
    expect(og).toContain('55+MB');
  });

  test('quick summary uses "55+MB"', async ({ page }) => {
    await page.goto(slug);
    const summary = page.locator('.tldr-content');
    const text = await textOf(summary);
    expect(text).toContain('55+MB');
    expect(text).not.toMatch(/(?<!\+)55MB/); // no bare "55MB" without the +
  });

  test('body mentions 200-mile fallback (not 250)', async ({ page }) => {
    await page.goto(slug);
    const main = page.locator('main');
    const text = await textOf(main);
    expect(text).toContain('200-mile');
    expect(text).not.toContain('250-mile');
  });

  test('before/after table includes execution time row', async ({ page }) => {
    await page.goto(slug);
    const table = page.locator('table', { hasText: 'before and after' });
    const text = await textOf(table);
    expect(text).toContain('Hours per eligibility run');
    expect(text).toContain('10 minutes per run');
  });

  test('before/after table: crash description includes "failing to pull all data"', async ({
    page,
  }) => {
    await page.goto(slug);
    const table = page.locator('table', { hasText: 'before and after' });
    const text = await textOf(table);
    expect(text).toContain('failing to pull all data');
  });

  test('homepage card uses precise fill rate (57.9% → 94.1%)', async ({ page }) => {
    await page.goto('/');
    const pinnacleCard = page.locator('article.card', { hasText: 'Selection Automation' });
    const statValues = await pinnacleCard.locator('.stat-value').allTextContents();
    const stats = statValues.join(' ');
    expect(stats).toContain('57.9%');
    expect(stats).toContain('94.1%');
  });

  test('homepage card narrative matches body (no fabrications)', async ({ page }) => {
    await page.goto('/');
    const pinnacleCard = page.locator('article.card', { hasText: 'Selection Automation' });
    const narrative = await textOf(pinnacleCard.locator('.card-narrative'));
    // Body: "55+MB", "failing to pull all data", "1 to 5"
    expect(narrative).toContain('55+MB');
    expect(narrative).not.toContain('crashed mid-calculation');
    expect(narrative).not.toContain('one coordinator');
  });
});
