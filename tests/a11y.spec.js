// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

/**
 * Automated WCAG 2.1 AA accessibility audit via axe-core.
 * Runs on every page defined in pages.spec.js PAGES list.
 */

const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/resume.html', name: 'Resume' },
  { path: '/projects/mcp-ecosystem.html', name: 'MCP Ecosystem' },
  { path: '/projects/tap-sevenrooms.html', name: 'tap-sevenrooms' },
  { path: '/projects/lab-environment.html', name: '_Lab Environment' },
  { path: '/projects/agentic-pipeline.html', name: 'Agentic Pipeline' },
  { path: '/projects/book-library-mcp.html', name: 'Book Library MCP' },
  { path: '/projects/claude-innit.html', name: 'claude-innit' },
  { path: '/work/contract-transfer/contract-transfer.html', name: 'Contract Transfer' },
  { path: '/work/bpr-scoring-pinnacle/pinnacle-scoring.html', name: 'Pinnacle Scoring' },
  { path: '/work/cfa-dsp-application/dsp-application.html', name: 'DSP Application' },
  { path: '/work/pinnacle-program-selection/pinnacle-automation.html', name: 'Pinnacle Automation' },
  { path: '/work/pinnacle-station/pinnacle-distance.html', name: 'Pinnacle Distance' },
  { path: '/work/charge-back-processing/chargeback-parsing.html', name: 'Chargeback Parsing' },
];

for (const page of PAGES) {
  test(`${page.name} — passes axe-core WCAG 2.1 AA`, async ({ page: pw }) => {
    await pw.goto(page.path);

    const results = await new AxeBuilder({ page: pw })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
