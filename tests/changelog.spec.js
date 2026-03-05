// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const CHANGELOG = path.join(ROOT, 'CHANGELOG.md');

test.describe('Changelog', () => {
  test('CHANGELOG.md exists', () => {
    expect(fs.existsSync(CHANGELOG)).toBe(true);
  });

  test('CHANGELOG.md is non-empty', () => {
    const content = fs.readFileSync(CHANGELOG, 'utf8');
    expect(content.trim().length).toBeGreaterThan(100);
  });

  test('CHANGELOG.md starts with expected header', () => {
    const content = fs.readFileSync(CHANGELOG, 'utf8');
    expect(content).toMatch(/^# Changelog/);
  });

  test('CHANGELOG.md contains at least one commit entry', () => {
    const content = fs.readFileSync(CHANGELOG, 'utf8');
    // Commit entries look like: `abc1234` message
    expect(content).toMatch(/`[0-9a-f]{7}`/);
  });

  test('CHANGELOG.md is up-to-date with latest commit', () => {
    // Get the latest commit hash (short)
    const latestHash = execFileSync('git', ['log', '-1', '--pretty=format:%h'], {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();

    const content = fs.readFileSync(CHANGELOG, 'utf8');
    expect(
      content,
      `CHANGELOG.md is stale — run \`npm run changelog\` to regenerate. Missing: ${latestHash}`
    ).toContain(latestHash);
  });
});
