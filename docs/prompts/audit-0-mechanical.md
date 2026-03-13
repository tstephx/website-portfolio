# Audit 0 — Automated Mechanical Checks

This is a script to run, not a conversation. Extract text from every page and run the checks below. Write all results to `docs/active/audit-mechanical.md`.

## Pages to check

```
index.html
work/partner-application-public/index.html
work/contract-transfer-public/index.html
work/pinnacle-public/index.html
work/cfa-dsp-application/dsp-application.html
work/contract-transfer/contract-transfer.html
work/pinnacle-program-selection/pinnacle-automation.html
resume.html
401.html
401-thanks.html
404.html
```

## Checks to run

### 1. Sensitivity scan (public pages only)

For each public page + homepage + resume, count occurrences of:

- `$` followed by a digit (dollar figures)
- `Chick-fil-A` or `CFA` (competitor name)
- `Pinnacle` (internal program name)
- `Tier 1` (internal metric)
- `DSP` as a standalone word, not inside href/path (internal abbreviation)
- `CT` as a standalone word, not inside href/path (internal abbreviation)
- `Amazon` (company name — flag but don't fail; some uses are intentional)
- `Salesforce` or `Asana` or `Redshift` (internal tool names)
- `WBR` or `BDM` or `BRD` as standalone (internal jargon)
- `Legacy Transfer` (internal program name)
- `Breach of Contract` (internal metric)

Expected: all zero on public pages except Amazon (which may appear intentionally on homepage/resume).

### 2. Link chain verification

For each case study (public and protected), extract the "Read next:" CTA text and href. Verify:

- CTA text matches the target page's `<title>` (before the ` | Taylor Stephens` suffix)
- href resolves to an existing file
- Chain is circular (A→B→C→A) for public and protected separately

### 3. Number consistency

Extract these numbers from every page where they appear and verify they match:

| Number             | Check across                                            |
| ------------------ | ------------------------------------------------------- |
| 87% / 86.6%        | homepage card, CT TL;DR, CT metrics, CT body, resume    |
| 16.98 → 2.28       | CT TL;DR, CT metrics, CT body, resume                   |
| 29 cases/transfers | homepage card, CT TL;DR, CT metrics, CT body, resume    |
| 274% YoY           | homepage card, CT body, PA scope-context                |
| 57.9% → 94.1%      | homepage card, PIN TL;DR, PIN metrics, PIN body, resume |
| 3 → 10             | homepage card, PIN TL;DR, PIN body, resume              |
| 26% → 60%          | homepage card, PA metrics, PA body, resume              |
| 0.25 → 3.8         | PA TL;DR, PA body, PA metrics, resume                   |
| +18 pp             | CT TL;DR, CT metrics, CT body, resume                   |

Flag any mismatch or inconsistent terminology (e.g., "transfers" in one place, "cases" in another).

### 4. Structural element inventory

For each case study (all 6), check presence of:

- `<details class="tldr-summary">` (and whether open or closed)
- `<p class="scope-meta">`
- `<p class="scope-context">`
- `<div class="metrics-row">` (count of `.metric-card` children)
- `<div class="data-table-wrapper">`
- `<ul class="lessons-list">` (count of `<li>` children)
- `<blockquote class="pull-quote">`
- `<section class="cs-unlock-cta">` (public only)
- `<section class="cs-cta">` with "Read next:" link
- Footer personality line

Output as a table showing presence/absence per page.

### 5. HTML entity consistency

Check that all case studies use the same entity style throughout:

- `&rsquo;` vs `'` for apostrophes
- `&mdash;` vs `—` for em-dashes
- `&ndash;` vs `–` for en-dashes
- `&rarr;` vs `→` for arrows
  Flag any page that mixes styles.

## Output

Write all results to `docs/active/audit-mechanical.md` with clear pass/fail for each check.
