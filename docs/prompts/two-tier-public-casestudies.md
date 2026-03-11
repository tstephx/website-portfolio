# Two-Tier Portfolio: Public Case Studies

## What this is

Execute the two-tier implementation plan at `docs/active/two-tier-implementation.md`. This creates public (anonymized) versions of all 3 case studies alongside the existing protected versions.

## Before you start

Read these files in order — they are the source of truth:

1. `docs/active/two-tier-implementation.md` — full implementation guide with nginx config, file structure, and deploy steps
2. `work/contract-transfer/anonymization-guide.md` — every find-and-replace for Contract Transfer
3. `work/cfa-dsp-application/anonymization-guide.md` — every find-and-replace for Partner Application (highest surface — Chick-fil-A, dollar figures)
4. `work/pinnacle-program-selection/anonymization-guide.md` — every find-and-replace for Selection Automation

Also read `CLAUDE.md` for site conventions, path depth rules, and definition of done.

## What to do

### Phase 1: Skip for now

nginx config changes (Phase 1 in the guide) require SSH to Whatbox. Skip this — I'll do it manually. Start at Phase 2.

### Phase 2: Create public case study files

Do these in order — Contract Transfer first (establishes the pattern), then Partner Application, then Pinnacle.

**A. Contract Transfer**

```bash
mkdir -p work/contract-transfer-public
cp work/contract-transfer/contract-transfer.html work/contract-transfer-public/index.html
```

Apply every replacement from `work/contract-transfer/anonymization-guide.md`. Then:

- Change `<meta name="robots">` to `index, follow`
- Update `<link rel="canonical">` to the public URL path
- Update meta description and og:description (anonymized — no dollar figures)
- Add the CTA section before lessons (see the implementation guide for the HTML block)
- Update the "Read next" link to point to the next PUBLIC case study: `../partner-application-public/index.html`

**B. Partner Application**

```bash
mkdir -p work/partner-application-public
cp work/cfa-dsp-application/dsp-application.html work/partner-application-public/index.html
```

Apply every replacement from `work/cfa-dsp-application/anonymization-guide.md`. Same meta/canonical/CTA updates. "Read next" points to `../contract-transfer-public/index.html`.

**C. Selection Automation (Pinnacle)**

```bash
mkdir -p work/pinnacle-public
cp work/pinnacle-program-selection/pinnacle-automation.html work/pinnacle-public/index.html
```

Apply every replacement from `work/pinnacle-program-selection/anonymization-guide.md`. Same meta/canonical/CTA updates. "Read next" points to `../partner-application-public/index.html`.

### Phase 3: Update homepage and supporting files

- Update all 3 card `href` values in `index.html` to point to public versions
- Update `sitemap.xml` — add public URLs, do NOT add protected URLs
- Update `ref/site-map.md` — add public case studies section, update link chain docs

### Phase 4: Testing

- Add public pages to the Playwright test suites (pages, a11y, layout, link-chain)
- Add to `npm run lint:html` script
- Run `npm run check` and `npm test`

## Constraints

- Do NOT modify the protected case studies (the originals in `work/{slug}/`)
- Do NOT modify `docs/active/two-tier-implementation.md` — it's the reference
- Do NOT modify the anonymization guides — they're the reference
- Public versions use same path depth (work/{slug-public}/index.html = depth 2) so all `../../css/` and `../../js/` paths work unchanged
- Follow all rules in CLAUDE.md — especially token usage, definition of done checklist, and Chart.js patterns
- The public link chain is separate: Partner App Public → CT Public → Pinnacle Public → Partner App Public

## Verification checklist

After all changes:

- [ ] Each public page loads at `http://localhost:8000/work/{slug}-public/`
- [ ] Zero dollar figures ($) in any public version
- [ ] Zero "Chick-fil-A" or "CFA" in partner-application-public
- [ ] Zero "Pinnacle" in pinnacle-public
- [ ] Zero "CT" or "DSP" abbreviations in any public version
- [ ] Each public page has the CTA section linking to `../../401.html`
- [ ] Public link chain is complete and circular
- [ ] Homepage cards link to public versions
- [ ] `npm run check` passes
- [ ] `npm test` passes
