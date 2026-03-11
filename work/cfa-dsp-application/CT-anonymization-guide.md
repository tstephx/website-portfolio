# Contract Transfer Case Study — Anonymization Guide

_Reference for maintaining public and private versions of the case study._

---

## Two-Tier Strategy

Your site already has the infrastructure for this. The 401 gate + Cloudflare auth protects everything behind a password. The two-tier approach means:

**Tier 1 — Public version** (no auth, indexed, shareable link)
Lives at a public URL. Contains the full narrative, methodology, and relative metrics. No internal dollar figures, no partner codes, no internal abbreviations. This is what LinkedIn links point to, what recruiters see first, what Google can index.

**Tier 2 — Protected version** (behind existing 401 gate)
The current case study as-is, with exact figures. This is what hiring managers see after you share credentials. The specificity is the differentiator — it signals you actually did the work.

### How it works on your site

```
/work/contract-transfer/                  ← Tier 2 (current, behind auth)
/work/contract-transfer/contract-transfer.html

/work/contract-transfer-public/           ← Tier 1 (new, no auth)
/work/contract-transfer-public/index.html
```

The public version links to the protected version with a CTA:

> "This is the anonymized version. The full case study with exact metrics is available upon request." → links to 401.html

The homepage can link to the public version by default. When you email a hiring manager credentials, they see the full version.

**Alternatively** — single URL, swap content with a query param or keep only one version and decide which tier to default to. The simplest approach: keep the current protected version as-is, create a public version at a new path, and link the public one from LinkedIn/resume.

---

## Public Version — Find and Replace Table

Every change needed for the public tier. Left column is current text, right column is the anonymized replacement.

### Dollar Figures → Relative/Range Language

| Current (Tier 2)                       | Public (Tier 1)                   | Notes                                                          |
| -------------------------------------- | --------------------------------- | -------------------------------------------------------------- |
| `$482K+`                               | `six-figure`                      | Appears 4x in the HTML                                         |
| `$482K–$504K`                          | `six-figure`                      | Only in the interview .md, not on site                         |
| `$13M`                                 | `eight-figure`                    | Appears in meta description, tagline, metrics, body (5x total) |
| `$25M`                                 | `eight-figure`                    | Legacy Transfer target                                         |
| `$13M in Exit Costs Avoided` (tagline) | `8-Figure Exit Costs Avoided`     |                                                                |
| `$13M in avoided exit costs` (meta)    | `eight-figure avoided exit costs` |                                                                |

### Internal Metrics → Percentages or Ranges

| Current (Tier 2)                             | Public (Tier 1)                    | Notes                                                         |
| -------------------------------------------- | ---------------------------------- | ------------------------------------------------------------- |
| `7.7%` capacity degradation                  | `~8%` or keep as-is                | Low risk — it's a percentage, not a dollar figure. Your call. |
| `39.6% of routes recover`                    | `fewer than 40% of routes recover` | Same — low risk as a percentage                               |
| `11% to 21%` approval rate                   | Keep as-is                         | These are your process metrics, not Amazon financials         |
| `16.98 weeks` / `2.28 weeks`                 | Keep as-is                         | Process duration is your work product                         |
| `9.6 to 2.9 weeks` median                    | Keep as-is                         |                                                               |
| `8.71 weeks` longest case                    | Keep as-is                         |                                                               |
| `86.6% reduction`                            | Keep as-is                         |                                                               |
| `18 percentage points above network average` | `18 pp above the program average`  | Swap "network" → "program" to de-jargon                       |
| `29 successful transfers`                    | `29 successful transfers`          | Keep — it's your output count                                 |
| `87 in 2024` case volume                     | Keep as-is                         |                                                               |
| `5 in 2020` starting volume                  | Keep as-is                         |                                                               |
| `200+ candidate records`                     | Keep as-is                         |                                                               |

### Internal Abbreviations → Plain Language

| Current (Tier 2)                                                       | Public (Tier 1)                                                   | Notes                                                                   |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `CT` (all instances)                                                   | `contract transfer` or `the transfer process`                     | Appears ~7x. Spell it out or use "transfer"                             |
| `CT Program Manager, DSP Acquisitions` (scope meta)                    | `Transfer Program Manager, Partner Acquisitions`                  |                                                                         |
| `CT as Customer Service` / `CT as Network Protection` (decision cards) | `Transfer as Customer Service` / `Transfer as Network Protection` |                                                                         |
| `CT Process Playbook`                                                  | `Transfer Process Playbook`                                       |                                                                         |
| `DSP Acquisitions`                                                     | `Partner Acquisitions`                                            | "DSP" itself is public, but "DSP Acquisitions" is an internal team name |
| `DSP owners` / `DSP`                                                   | `delivery partners` or `partners`                                 | "DSP" is public but reads as insider jargon to non-Amazon readers       |
| `Owner Transfer process`                                               | `ownership transfer process`                                      | Minor — just normalizes the capitalization/framing                      |

### Partner/Station Codes → Remove

| Current (Tier 2)               | Public (Tier 1)           | Notes                                                          |
| ------------------------------ | ------------------------- | -------------------------------------------------------------- |
| `CATY at DFL7`                 | Remove entirely           | Only in the interview .md, not on the site currently           |
| `HHSL`                         | Remove                    | Only in the interview .md                                      |
| `Breach of Contract incidents` | `compliance incidents`    | Slightly less specific, avoids signaling internal metric names |
| `partner quality scores`       | `operator quality scores` | Minor de-jargoning                                             |

### Program-Specific Details → Generalize

| Current (Tier 2)                                            | Public (Tier 1)                       | Notes                                         |
| ----------------------------------------------------------- | ------------------------------------- | --------------------------------------------- |
| `2025 Legacy Transfer strategy`                             | `2025 succession planning initiative` | "Legacy Transfer" is an internal program name |
| `Capacity Reliability`                                      | `delivery capacity`                   | Internal metric name                          |
| `station capacity`                                          | `local delivery capacity`             |                                               |
| `274% year-over-year (23 to 63)`                            | Keep as-is                            | Growth rate of your workload is your story    |
| `entity restructures (23%) and survivorship transfers (5%)` | Keep as-is                            | These are transfer types, not secret          |

---

## What Stays the Same in Both Tiers

These are safe across both versions — they describe your role, your thinking, and publicly known program structure:

- Your job title, scope, and timeline
- The full narrative arc (inherited → reframed → built → results)
- The strategic reframe argument (service function vs. network protection)
- The 14-week, 21-milestone framework design
- The six sequential gates and their ordering logic
- The defect category table (anonymize the case counts if you want, but the categories themselves are process observations, not confidential data)
- The 19 email templates / communications system
- The 5-stakeholder consensus model
- All four "Lessons Worth Stealing"
- The decision cards (Option A / Option B)
- The process timeline visualization
- The icon cards (four failures)

---

## Implementation Checklist

- [ ] Create `/work/contract-transfer-public/` directory
- [ ] Copy `contract-transfer.html` → `index.html` in new directory
- [ ] Apply all Tier 1 replacements from the table above
- [ ] Update meta description and og:description
- [ ] Update canonical URL to point to public path
- [ ] Add CTA section before lessons: "Full case study with exact metrics available upon request" → link to 401
- [ ] Update homepage card to link to public version by default
- [ ] Update link chain (DSP → CT-public → automation → DSP)
- [ ] Add to test files
- [ ] Keep current protected version unchanged at existing URL

---

## Quick Decision Framework

When in doubt about whether something is safe for the public version:

1. **Is it a dollar figure derived from internal data?** → Convert to range or relative
2. **Is it an abbreviation only Amazon employees would recognize?** → Spell out or describe functionally
3. **Could it identify a specific partner, station, or person?** → Remove
4. **Is it a percentage or ratio describing your process improvement?** → Keep
5. **Is it a publicly known Amazon program (DSP, LP, Bar Raiser)?** → Keep but consider normalizing for non-Amazon readers
6. **Is it your methodology, framework, or design decision?** → Always keep — that's your work product

---

## Homepage Cards — Public Surface

The homepage (`index.html`) is public — `robots.txt` allows all crawlers, no auth gate. The cards are the first thing recruiters, hiring managers, and anyone with the URL sees. They need to follow Tier 1 rules even though the case studies they link to are behind auth.

### Card 2: Contract Transfer

**Current:**

```
Inherited a process with zero documentation and volume growing 274% YoY.
Built a framework that prevented $13M+ in exit costs across 29 transfers.
```

**Recommended:**

```
Inherited a process with zero documentation and volume growing 274% YoY.
Built a framework that prevented eight-figure exit costs across 29 transfers.
```

Only one change needed: `$13M+` → `eight-figure`. The stats (87% faster, 274% YoY, 29 transfers) are all your process outputs — safe as-is.

### Card 1: DSP Application Redesign

**Current:**

```
Applied to a competitor's franchise program as competitive intelligence, then built a
101-requirement redesign spanning 20 countries that secured 15× the engineering investment.
```

**Recommended — consider softening:**

```
Benchmarked a competing franchise model as competitive intelligence, then built a
101-requirement redesign spanning 20 countries that secured 15× the engineering investment.
```

The concern: "Applied to a competitor's franchise program" on a public page advertises that you submitted a real application under what could be interpreted as false pretenses. Anyone in last-mile logistics can identify the competitor from "franchise program" + "20 countries." The stats and redesign scope are safe — the activity description is the risk. "Benchmarked a competing franchise model" describes the same intelligence work without specifying the method.

Alternative if you want to keep the boldness: `Conducted a competitive teardown of a rival franchise model` — still signals the initiative without the application detail.

### Card 3: Selection Automation

**No changes needed.** No dollar figures, no internal program names on the card. "55+MB spreadsheet," fill rates, and team scaling are all your work product.

### Card Link Targets

If you build the two-tier system, the homepage card links should point to the public versions:

| Card                 | Current `href`                                             | Public `href`                                                    |
| -------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| DSP Application      | `work/cfa-dsp-application/dsp-application.html`            | `work/cfa-dsp-application-public/index.html` (if created)        |
| Contract Transfer    | `work/contract-transfer/contract-transfer.html`            | `work/contract-transfer-public/index.html`                       |
| Selection Automation | `work/pinnacle-program-selection/pinnacle-automation.html` | `work/pinnacle-program-selection-public/index.html` (if created) |

If you only create a public version for Contract Transfer, update that one link and leave the others pointing to the auth-gated versions. The 401 page handles the access request flow for those.
