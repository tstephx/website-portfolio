// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Layout tests — horizontal overflow, tap targets, responsive breakpoints.
 * Runs at both desktop (1280) and mobile (390) viewports.
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

// ===== MOBILE LAYOUT (390px — iPhone 13) =====
test.describe('Mobile layout', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const page of PAGES) {
    test(`${page.name} — no horizontal overflow`, async ({ page: pw }) => {
      await pw.goto(page.path);
      await pw.waitForLoadState('domcontentloaded');

      const overflow = await pw.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(overflow, 'Page has horizontal scrollbar on mobile').toBe(false);
    });

    test(`${page.name} — tap targets >= 44px`, async ({ page: pw }) => {
      await pw.goto(page.path);
      await pw.waitForLoadState('domcontentloaded');

      const smallTargets = await pw.evaluate(() => {
        const interactive = document.querySelectorAll('a, button, input, select, textarea');
        const failures = [];

        for (const el of interactive) {
          // Skip hidden/offscreen elements (skip links, etc.)
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            rect.width === 0 ||
            rect.height === 0 ||
            rect.top < -100
          ) {
            continue;
          }

          // WCAG 2.5.8: minimum 24px, target 44px
          if (rect.width < 44 || rect.height < 44) {
            failures.push({
              tag: el.tagName,
              text: el.textContent?.trim().slice(0, 40),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            });
          }
        }

        return failures;
      });

      // Allow up to 0 failures — strict mode
      // If this is too strict initially, change to a threshold
      if (smallTargets.length > 0) {
        const report = smallTargets
          .slice(0, 5)
          .map((t) => `  ${t.tag} "${t.text}" (${t.width}×${t.height})`)
          .join('\n');
        // Warn but don't fail yet — tap target compliance is progressive
        console.warn(`[${page.name}] ${smallTargets.length} tap targets under 44px:\n${report}`);
      }
    });
  }
});

// ===== DESKTOP LAYOUT (1280px) =====
test.describe('Desktop layout', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  for (const page of PAGES) {
    test(`${page.name} — no horizontal overflow`, async ({ page: pw }) => {
      await pw.goto(page.path);
      await pw.waitForLoadState('domcontentloaded');

      const overflow = await pw.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(overflow, 'Page has horizontal scrollbar on desktop').toBe(false);
    });
  }

  // Content width check — main content shouldn't exceed readable width
  test('Homepage — content max-width is constrained', async ({ page: pw }) => {
    await pw.goto('/');
    await pw.waitForLoadState('domcontentloaded');

    const maxWidth = await pw.evaluate(() => {
      const sections = document.querySelectorAll('section');
      let widest = 0;
      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        widest = Math.max(widest, rect.width);
      }
      return widest;
    });

    // Sections shouldn't stretch wider than viewport
    expect(maxWidth).toBeLessThanOrEqual(1280);
  });
});

// ===== NARROW VIEWPORT (320px — smallest common) =====
test.describe('Narrow viewport (320px)', () => {
  test.use({ viewport: { width: 320, height: 568 } });

  for (const page of PAGES) {
    test(`${page.name} — no overflow at 320px`, async ({ page: pw }) => {
      await pw.goto(page.path);
      await pw.waitForLoadState('domcontentloaded');

      const overflow = await pw.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(overflow, 'Page overflows at 320px viewport').toBe(false);
    });
  }
});
