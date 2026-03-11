#!/usr/bin/env node
/**
 * Extract text content from case study HTML and write *-copy.md files.
 * Zero-drift by construction — copy.md always matches the HTML source.
 *
 * Usage: node scripts/generate-copy-md.js
 */

const fs = require('fs');
const path = require('path');

const STUDIES = [
  {
    html: 'work/cfa-dsp-application/dsp-application.html',
    md: 'work/cfa-dsp-application/dsp-application-copy.md',
    title: 'DSP Application Redesign',
  },
  {
    html: 'work/contract-transfer/contract-transfer.html',
    md: 'work/contract-transfer/contract-transfer-copy.md',
    title: 'Contract Transfer Process Redesign',
  },
  {
    html: 'work/pinnacle-program-selection/pinnacle-automation.html',
    md: 'work/pinnacle-program-selection/pinnacle-automation-copy.md',
    title: 'Pinnacle Selection Automation',
  },
];

/** Strip HTML tags and decode common entities */
function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
    .replace(/&rarr;/g, '\u2192')
    .replace(/&times;/g, '\u00d7')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&middot;/g, '\u00b7')
    .replace(/&#\d+;/g, (m) => String.fromCharCode(parseInt(m.slice(2, -1))))
    .replace(/\s+/g, ' ')
    .trim();
}

/** Extract content between <main> tags */
function extractMain(html) {
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  return mainMatch ? mainMatch[1] : '';
}

/** Extract sections from main content */
function extractSections(mainHtml) {
  const sections = [];
  const sectionRegex =
    /<(?:section|div)[^>]*class="[^"]*cs-section[^"]*"[^>]*>([\s\S]*?)<\/(?:section|div)>/g;
  let match;
  while ((match = sectionRegex.exec(mainHtml)) !== null) {
    sections.push(match[1]);
  }
  return sections;
}

/** Extract heading text from section HTML */
function extractHeading(sectionHtml) {
  const h2Match = sectionHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
  return h2Match ? stripHtml(h2Match[1]) : '';
}

/** Extract paragraph text from section HTML */
function extractParagraphs(sectionHtml) {
  const paras = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
  let match;
  while ((match = pRegex.exec(sectionHtml)) !== null) {
    const text = stripHtml(match[1]);
    if (text) paras.push(text);
  }
  return paras;
}

/** Extract list items */
function extractListItems(sectionHtml) {
  const items = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/g;
  let match;
  while ((match = liRegex.exec(sectionHtml)) !== null) {
    const text = stripHtml(match[1]);
    if (text) items.push(text);
  }
  return items;
}

/** Extract meta description */
function extractMeta(html) {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  return match ? stripHtml(match[1]) : '';
}

/** Extract tagline */
function extractTagline(html) {
  const match = html.match(/<p[^>]*class="[^"]*cs-tagline[^"]*"[^>]*>([\s\S]*?)<\/p>/);
  return match ? stripHtml(match[1]) : '';
}

/** Extract scope metadata */
function extractScope(html) {
  const match = html.match(/<p[^>]*class="[^"]*scope-meta[^"]*"[^>]*>([\s\S]*?)<\/p>/);
  return match ? stripHtml(match[1]) : '';
}

function generateCopyMd(study) {
  const htmlPath = path.resolve(study.html);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const mainHtml = extractMain(html);
  const sections = extractSections(mainHtml);

  const lines = [];
  lines.push(`# ${study.title}`);
  lines.push('');
  lines.push(`_Auto-generated from ${path.basename(study.html)} — do not edit directly._`);
  lines.push('');

  // Meta
  const meta = extractMeta(html);
  if (meta) {
    lines.push(`**Meta description:** ${meta}`);
    lines.push('');
  }

  // Tagline
  const tagline = extractTagline(html);
  if (tagline) {
    lines.push(`**Tagline:** ${tagline}`);
    lines.push('');
  }

  // Scope
  const scope = extractScope(html);
  if (scope) {
    lines.push(`**Scope:** ${scope}`);
    lines.push('');
  }

  lines.push('---');
  lines.push('');

  // Sections
  for (const section of sections) {
    const heading = extractHeading(section);
    if (heading) {
      lines.push(`## ${heading}`);
      lines.push('');
    }

    const paras = extractParagraphs(section);
    for (const p of paras) {
      lines.push(p);
      lines.push('');
    }

    const items = extractListItems(section);
    if (items.length > 0) {
      for (const item of items) {
        lines.push(`- ${item}`);
      }
      lines.push('');
    }
  }

  return lines.join('\n').trim() + '\n';
}

// Main
let changed = 0;
for (const study of STUDIES) {
  if (!fs.existsSync(study.html)) {
    console.error(`  SKIP: ${study.html} not found`);
    continue;
  }

  const content = generateCopyMd(study);
  const existing = fs.existsSync(study.md) ? fs.readFileSync(study.md, 'utf8') : '';

  if (content !== existing) {
    fs.writeFileSync(study.md, content);
    console.log(`  UPDATED: ${study.md}`);
    changed++;
  } else {
    console.log(`  OK: ${study.md} (no changes)`);
  }
}

console.log(`\n${changed} file(s) updated.`);
