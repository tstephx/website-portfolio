# Selection Automation (Pinnacle) — Anonymization Guide

_Reference for maintaining public and private versions of the case study._

---

## Risk Assessment

This case study has the **lowest confidentiality surface** of the three. It contains no dollar figures, no competitor names, and no partner-identifying codes. The main risks are internal program names ("Pinnacle"), internal metric names ("Tier 1," "Leadership & Engagement"), and specific network size data (2,620 partners, 441 eligible pool). The methodology — Haversine distance, SQL pipeline, window functions — is entirely your work product and universally safe.

---

## Find and Replace Table

### Internal Program Names → Generalize

| Current (Tier 2)                                | Public (Tier 1)                                 | Notes                                                                                                    |
| ----------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `Pinnacle` (all ~12 instances)                  | `the expansion program` or `the reward program` | Internal program name. Use "expansion program" in narrative, "reward program" where stakes are discussed |
| `Pinnacle Program Automation` (tagline)         | `Expansion Program Automation`                  |                                                                                                          |
| `PM, Pinnacle Operations` (scope)               | `PM, Partner Operations`                        |                                                                                                          |
| `Pinnacle team expanded from 3 to 10`           | `the program team expanded from 3 to 10`        |                                                                                                          |
| `Pinnacle didn't need a new approach` (lessons) | `The program didn't need a new approach`        |                                                                                                          |
| `Pinnacle opportunities`                        | `expansion opportunities`                       |                                                                                                          |

### Internal Metric/Tier Names → Describe by Function

| Current (Tier 2)                                                            | Public (Tier 1)                                                     | Notes                                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------ |
| `Tier 1 performance` / `Tier 1 Designation`                                 | `top-tier performance` / `Top-Tier Designation`                     | "Tier 1" is Amazon's internal scoring tier name        |
| `Consecutive Tier 1` (funnel)                                               | `Consecutive Top-Tier`                                              |                                                        |
| `Leadership & Engagement, Positive Environment, and Strategic Communicator` | `leadership, engagement, and communication qualification screens`   | These are internal Amazon metric names for DSP scoring |
| `blended Quality reached 66.7% (+270 basis points month-over-month)`        | `blended quality scores improved 270 basis points month-over-month` | Remove the exact percentage; keep the improvement      |

### Network Size Data → Round or Generalize

| Current (Tier 2)                                     | Public (Tier 1)                                       | Notes                                                     |
| ---------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| `2,620 operators` / `2,620` (funnel)                 | `2,600+ operators`                                    | Minor rounding — low risk either way                      |
| `~222` (funnel)                                      | `~220`                                                |                                                           |
| `24,000 rows`                                        | `24,000+ rows`                                        | Keep — it describes the spreadsheet, not Amazon's network |
| `441 delivery partners`                              | `440+ delivery partners`                              | Minor rounding                                            |
| `118 delivery partners were actively in the program` | `~120 delivery partners were actively in the program` |                                                           |
| `155 to 105` (deduplicated pool)                     | Keep as-is                                            | These are your diagnostic findings                        |
| `37 Pinnacle opportunities`                          | `37 expansion opportunities`                          | Program name, not the number, is the issue                |

### Internal Tool/Platform Names → Describe by Function

| Current (Tier 2)       | Public (Tier 1)               | Notes                                                                                  |
| ---------------------- | ----------------------------- | -------------------------------------------------------------------------------------- |
| `Salesforce migration` | `CRM migration`               | Salesforce is a public product, but naming it reveals Amazon's internal tooling choice |
| `Asana workflow`       | `project management workflow` | Same — reveals internal tooling                                                        |
| `data warehouse`       | Keep as-is                    | Already anonymized from "Amazon Redshift"                                              |

### Amazon Reference → Minimize

| Current (Tier 2)            | Public (Tier 1)         | Notes                                                                       |
| --------------------------- | ----------------------- | --------------------------------------------------------------------------- |
| `Amazon's Pinnacle program` | `The expansion program` | Drop "Amazon's" — your LinkedIn says Amazon, the case study doesn't need it |

---

## What Stays the Same in Both Tiers

Everything about your methodology, diagnostic process, and results is safe:

- The 55+MB Excel file problem and all 7 root causes (your diagnosis)
- The Haversine formula decision and rationale (public math, your design choice)
- The 200-mile fallback logic (your design choice)
- The 6-stage SQL pipeline and what each stage does (your work product)
- The 5-lever sourcing hierarchy concept (describe by function, not internal name)
- All fill rate percentages: 57.9% → 94.1%, 100% in July (your process metrics)
- 20 candidates bypassed → 0 (your outcome)
- 3 → 10 team expansion (your outcome)
- Hours → 10 minutes per run (your outcome)
- The eligibility funnel visualization (your analysis)
- The before/after comparison table (your analysis)
- All three "Lessons Worth Stealing"
- The post-automation growth section (anonymize metric names, keep percentages)
- 93 → 42 launches decline (your diagnostic finding)
- 77% acceptance rate, zero exits (your outcomes)
- The constraint shift narrative (identification solved, supply is the remaining gap)

---

## Implementation Checklist

- [ ] Create `/work/pinnacle-program-selection-public/` directory
- [ ] Copy `pinnacle-automation.html` → `index.html` in new directory
- [ ] Replace all `Pinnacle` references (~12 instances)
- [ ] Replace `Tier 1` → `top-tier` throughout
- [ ] Replace internal metric names (Leadership & Engagement, etc.)
- [ ] Replace internal tool names (Salesforce, Asana)
- [ ] Drop `Amazon's` from program reference
- [ ] Round network size numbers slightly
- [ ] Update page title and meta
- [ ] Update canonical URL
- [ ] Add CTA: "Full case study with exact metrics available upon request" → link to 401
- [ ] Update homepage card link to public version
- [ ] Keep current protected version unchanged

---

## Quick Risk Ranking

| Risk Level                             | Items                                                                                                                                                      |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Medium — normalize for readability** | "Pinnacle" program name (~12×), "Tier 1" metric name, internal qualification screen names (Leadership & Engagement, etc.), Salesforce/Asana tool names     |
| **Low — round if you want**            | 2,620 / 222 / 441 / 118 network numbers                                                                                                                    |
| **Safe — keep as-is**                  | All percentages, fill rates, pipeline design, Haversine methodology, root cause diagnosis, team scaling, funnel visualization, lessons, before/after table |

---

## Comparison With Other Case Studies

| Risk Category            | Contract Transfer            | Partner Application       | Selection Automation          |
| ------------------------ | ---------------------------- | ------------------------- | ----------------------------- |
| Dollar figures           | High ($482K, $13M, $25M)     | High ($2.1M, $1.9M, $319) | **None**                      |
| Competitor naming        | None                         | High (Chick-fil-A 6×)     | **None**                      |
| Internal program names   | Medium (CT, Legacy Transfer) | Medium (DSP Acquisitions) | **Medium (Pinnacle, Tier 1)** |
| Internal tool names      | Low                          | Low (Pardot implied)      | **Low (Salesforce, Asana)**   |
| Partner-identifying data | Medium (CATY, HHSL, DFL7)    | Low                       | **None**                      |
| Overall risk             | Medium-High                  | High                      | **Low-Medium**                |

This is your safest case study to leave close to as-is on the public tier. The main anonymization work is just swapping "Pinnacle" for "expansion program" and "Tier 1" for "top-tier" — everything else is your methodology and results.
