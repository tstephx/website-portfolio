#!/usr/bin/env node
/**
 * Generate CHANGELOG.md from git log
 * Groups commits by type: feat, fix, docs, style, chore
 * Usage: node scripts/generate-changelog.js
 */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'CHANGELOG.md');

// Get all commits: hash | date | subject — uses execFileSync (no shell injection risk)
const raw = execFileSync(
  'git',
  ['log', '--pretty=format:%H|%ad|%s', '--date=short'],
  { cwd: ROOT, encoding: 'utf8' }
).trim();

if (!raw) {
  console.error('No git history found.');
  process.exit(1);
}

const TYPES = {
  feat:  '### Features',
  fix:   '### Bug Fixes',
  docs:  '### Documentation',
  style: '### Style',
  chore: '### Chores / Maintenance',
};

// Group commits by month bucket
const buckets = {}; // "YYYY-MM" => { feat: [], fix: [], ... }

for (const line of raw.split('\n')) {
  const [hash, date, ...rest] = line.split('|');
  const subject = rest.join('|');
  const month = date.slice(0, 7); // "YYYY-MM"

  if (!buckets[month]) {
    buckets[month] = { feat: [], fix: [], docs: [], style: [], chore: [], other: [] };
  }

  const typeMatch = subject.match(/^(feat|fix|docs|style|chore)(\(.+?\))?:\s*/);
  if (typeMatch) {
    const type = typeMatch[1];
    const msg = subject.replace(typeMatch[0], '').trim();
    buckets[month][type].push({ hash: hash.slice(0, 7), msg });
  } else {
    buckets[month].other.push({ hash: hash.slice(0, 7), msg: subject.trim() });
  }
}

// Build markdown
const lines = [
  '# Changelog',
  '',
  '> Auto-generated from `git log`. Run `npm run changelog` to update.',
  '',
];

const sortedMonths = Object.keys(buckets).sort().reverse();

for (const month of sortedMonths) {
  lines.push(`## ${month}`);
  lines.push('');

  const bucket = buckets[month];

  for (const [type, heading] of Object.entries(TYPES)) {
    const entries = bucket[type];
    if (entries.length === 0) continue;
    lines.push(heading);
    for (const { hash, msg } of entries) {
      lines.push(`- \`${hash}\` ${msg}`);
    }
    lines.push('');
  }

  if (bucket.other.length > 0) {
    lines.push('### Other');
    for (const { hash, msg } of bucket.other) {
      lines.push(`- \`${hash}\` ${msg}`);
    }
    lines.push('');
  }
}

fs.writeFileSync(OUTPUT, lines.join('\n'), 'utf8');
console.log(`✓ CHANGELOG.md written (${sortedMonths.length} month(s), ${raw.split('\n').length} commits)`);
