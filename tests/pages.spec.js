// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * All pages — load, status, and key structural requirements
 * Source of truth: ref/site-map.md
 */

const PAGES = [
  { path: '/', title: /Taylor Stephens/i, name: 'Homepage' },
  { path: '/resume.html', title: /Resume/i, name: 'Resume' },
  { path: '/projects/mcp-ecosystem.html', title: /MCP/i, name: 'MCP Ecosystem' },
  { path: '/projects/tap-sevenrooms.html', title: /SevenRooms/i, name: 'tap-sevenrooms' },
  { path: '/projects/lab-environment.html', title: /_Lab/i, name: '_Lab Environment' },
  { path: '/projects/agentic-pipeline.html', title: /Agentic/i, name: 'Agentic Pipeline' },
  { path: '/projects/book-library-mcp.html', title: /Book Library/i, name: 'Book Library MCP' },
  { path: '/projects/claude-innit.html', title: /claude-innit/i, name: 'claude-innit' },
  {
    path: '/work/contract-transfer/contract-transfer.html',
    title: /Contract Transfer/i,
    name: 'Contract Transfer',
  },
  {
    path: '/work/cfa-dsp-application/dsp-application.html',
    title: /DSP/i,
    name: 'DSP Application',
  },
  {
    path: '/work/pinnacle-program-selection/pinnacle-automation.html',
    title: /Automation/i,
    name: 'Pinnacle Automation',
  },
];

for (const page of PAGES) {
  test(`${page.name} — loads with 200`, async ({ page: pw }) => {
    const response = await pw.goto(page.path);
    expect(response?.status()).toBe(200);
  });

  test(`${page.name} — has page title`, async ({ page: pw }) => {
    await pw.goto(page.path);
    await expect(pw).toHaveTitle(page.title);
  });
}

// Reading progress bar required on all case study pages (work + projects)
const CASE_STUDY_PAGES = PAGES.filter(
  (p) => p.path.startsWith('/work/') || p.path.startsWith('/projects/')
);

for (const page of CASE_STUDY_PAGES) {
  test(`${page.name} — has reading-progress bar`, async ({ page: pw }) => {
    await pw.goto(page.path);
    const el = pw.locator('.reading-progress').first();
    await expect(el).toBeAttached();
  });
}

// Canonical tag on every page
for (const page of PAGES) {
  test(`${page.name} — has canonical tag`, async ({ page: pw }) => {
    await pw.goto(page.path);
    const canonical = pw.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    const href = await canonical.getAttribute('href');
    expect(href).toMatch(/^https:\/\/taylorstephens\.io\//);
  });
}
