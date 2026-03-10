# DSP Application Redesign — Approved Outline

> Approved: 2026-03-06 | Score: 32/40 | Source: case-study-draft.md v2

---

## Headline

**74% of the people who started Amazon's delivery partner application never finished it.**

## Tagline

Competitive Intelligence | 17 Global Markets | 0.25 → 4.6 SDEs Secured

## Tech

Pardot, CMS Architecture, SQL/ANOVA Analysis, CFA Benchmark Study

---

## Scope

- **Timeline:** Oct 2023 – Q1 2024
- **Role:** Program Manager, DSP Acquisitions (self-directed — no assignment)
- **Teams:** Acquisitions, Engineering, Senior Leadership
- **Artifacts:** BRD (101 requirements), WW DSP Tech Vision 2025, OP1 resource escalation

---

## The $2.1M Problem

The DSP (Delivery Service Partner) Acquisitions team needed to scale Amazon's partner network across 17 global markets. The application — unchanged since 2018 — was broken in four compounding ways:

- **74% abandonment** — 55% dropped on page two at the resume upload. No visibility into who was leaving or why.
- **Unusable data** — 20 open-ended questions produced inconsistent responses (ANOVA F=430.9, 25,830 records). Reviewer scores diverged measurably.
- **Wrong candidates getting through** — 62% rejection rate post-submission, but only 23% of approved candidates showed program interest. Filtering happened too late.
- **Impossible to iterate** — adding 14 questions classified as XL (10–12 months engineering). Blocked every program expansion.

$2.1M–$2.35M annually in lost candidate conversion entitlement. We projected a 33% recruiting cost increase for 2024.

---

## What the Benchmark Revealed

I identified Chick-fil-A's franchise application as the benchmark: 40,000 applicants/year, ~0.2% acceptance, same model (individual operators running a branded business). Then I applied — October 17, 2023, using personal information. Every screen documented, every question cataloged by type and completion time, built into a comparison spreadsheet.

Then I directed the entire Acquisitions team through the same process to build shared conviction.

**Core insight:** CFA collects _more_ data (~80+ fields vs. 60+) in half the time. CFA uses structured dropdowns and numerical fields (seconds each). Amazon used open-ended questions (minutes each) producing inconsistent, unscoreable responses. The benchmark made the redesign defensible — not just intuitive.

---

## From CFA Application to $10.9M Roadmap

I owned strategy end-to-end — diagnosis, BRD (Business Requirements Document), roadmap. No one assigned this.

Central constraint: engineering allocation for 2024 was **0.25 SDEs (Software Development Engineers)**. The work required **4.6**.

**Architecture redesign:**

- Replaced 20 open-ended questions with single-response structured inputs
- Eliminated resume upload; replaced with 30 standardized work history fields
- Added upstream qualification gate (modeled on CFA's Expression of Interest)
- Designed modular, country-agnostic architecture: 6 programs, 17 markets, quarterly CMS (content management system) updates without engineering

**Evidence chain that moved resources:**

1. **BRD** — 101 requirements across 6 epics, each traceable to a CFA benchmark finding
2. **WW DSP Tech Vision 2025** — executive narrative for senior leadership
3. **OP1 (annual operating plan) escalation** (co-authored) — I owned entitlement quantification and competitive framing

0.25 → 4.6 SDEs secured against $10.9–11.3M in identified entitlement.

---

## The Pardot Decision

When engineering classified the 32-question update as XL (12 months), I proposed a Pardot (marketing automation platform) integration that bypassed the constraint entirely. Development compressed from 12 months to 3–4 — unblocking the $10.9M roadmap.

---

## 9,419 More Approved Applications Per Year

<!-- NOTE: Metrics reflect projected targets, not confirmed post-launch results. Replace "Target (projected)" with actuals when available. -->

| Metric                      | Before       | Target (projected) |
| --------------------------- | ------------ | ------------------ |
| Application completion rate | 26%          | 60% (+130%)        |
| Program inclination rate    | 23%          | 46% (+100%)        |
| Completion time             | 3+ hours     | Under 1 hour       |
| Development cycle           | 10–12 months | 3–4 months         |
| Engineering secured         | 0.25 SDEs    | 4.6 SDEs           |
| Annual entitlement captured | —            | $2.1M–$2.35M       |

**9,419 additional approved applications per year (15,699→25,118). 87% more program-inclined candidates (421→786). 2,200+ FTE hours removed from manual review.**

<!-- SOURCE: All three stats from Project_1_DSP_Application_Enhancement_Context_Document_1.md, Business Impact section. 87% is absolute count increase, not rate (rate is 100%: 23%→46%). -->

The team now updates the application quarterly without an engineering ticket — across every program and market.

---

## Lessons Worth Stealing

- **If you can't measure what's broken, benchmark the best — then apply as a customer.** I applied to the Chick-fil-A franchise program myself. Primary research builds conviction that secondary research never will.
- **Structured data beats more data.** CFA collects more data points in less time through better input design. The fix wasn't fewer questions — it was better questions.
- **Resource escalations win on evidence chains, not urgency.** BRD → Tech Vision → OP1 — each document cited the same benchmark. By the time I requested 4.6 SDEs, leadership had seen the evidence three times.
- **When engineering says "12 months," look for the architectural shortcut.** The Pardot integration existed because I looked for the constraint's constraint.

---

## Revision Notes

- Metrics table uses "(projected)" — replace with actuals if post-launch data becomes available
- "Co-authored the OP1" — attribution breakdown: I owned entitlement quantification and competitive framing
- ANOVA F=430.9 — confirm source document is referenceable
- "Directed the entire Acquisitions team" — confirm this was self-directed, not manager-assigned
<!-- Suggested components from ref/components.md: metrics-table, timeline-bar, before-after-comparison, callout-box for Pardot decision -->

---

## Build Spec (from interview 2026-03-06)

### Cross-Cutting Decisions (all 3 pages)

| Decision         | Choice                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Page identity    | Content-shaped — components vary per page to serve content                                          |
| Tech depth       | Narrative only — describe what stages do, zero code/formulas                                        |
| Charts vs static | Chart.js only for complex data relationships; simple metrics stay static                            |
| Link chain       | DSP -> CT -> Pinnacle -> DSP (Pinnacle replaces existing automation slot)                           |
| TL;DR            | Collapsible 3-bullet summary near top (consult /trend-researcher for expanded vs collapsed default) |
| Closing quote    | Styled pull quote component (large quotes, accent border, increased font)                           |
| Page nav         | Consult /trend-researcher for sticky TOC vs anchor strip vs progress-bar-only                       |
| Scope callout    | Consult /trend-researcher for constraint placement best practice                                    |
| Naming           | CFA named explicitly; Amazon internal tools/teams anonymized                                        |
| Internal quotes  | No verbatim internal quotes on public pages — claims only                                           |
| Visual assets    | Placeholder figure elements; assets created in later pass                                           |
| Metric ranges    | Round to one number with trailing + ($2.1M+, $10.9M+)                                               |
| Table columns    | Consult /trend-researcher for standardization best practice                                         |
| Lessons styling  | Consult /trend-researcher for distinct vs standard treatment                                        |
| Closing CTA      | cs-cta block with "Read next: [title]" button + secondary contact/resume link                       |
| Homepage cards   | Rewrite after all 3 pages ship (separate pass)                                                      |
| Old pages        | Clean replacement — outlines are source of truth                                                    |
| Build order      | Sequential — DSP first as template, then CT, then Pinnacle                                          |
| Process flows    | Use /web-artifact-builder for CT 5-phase and Pinnacle 6-stage                                       |

### DSP-Specific Decisions

| Decision                 | Choice                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------- |
| CFA benchmark comparison | Before/after comparison component (left=Amazon before, right=CFA benchmark)         |
| Projected metrics        | Column header "Target (projected)" + one-sentence explanation. No visual downgrade. |
| ANOVA F-value            | Narrative only — describe what the analysis revealed, not the statistic             |
| Metric ranges            | $2.1M+ (not $2.1M-$2.35M), $10.9M+ (not $10.9-11.3M)                                |
| Problem section bullets  | Keep as bullets (4 items, each with bold lead)                                      |

### Anonymization Notes (DSP)

- "Pardot" -> "marketing automation platform" or keep as Pardot (it's a Salesforce product, not Amazon-internal)
- "Amazon Redshift" -> "data warehouse" (if referenced)
- "WBR" -> describe function, not acronym
- "DSP" -> "Delivery Service Partner" on first use, then "delivery partner" or "partner"
- "OP1" -> "annual operating plan" on first use
- "SDEs" -> "Software Development Engineers" on first use, then "engineers"
- CFA/Chick-fil-A stays named
