# A 55MB Spreadsheet Was Deciding Who Got to Expand — and Getting It Wrong

[Pinnacle Program Automation | 2,620 Partners, 8.5% Tier 1 | 8 Root Causes | Solo Build]
Tech: SQL (Amazon Redshift), Haversine geospatial, window functions, process automation

---

## Scope

<!-- component: scope-callout (ref/components.md) — replaces "My Role" section -->

- Role: PM, Pinnacle Operations, DSP Acquisitions
- Timeline: Q3-Q4 2024 (10 weeks: 2 diagnosis + 4 build + 4 validation)
- Teams: Long-Range Planning, Business Intelligence, Network Health, BDM
- Constraint: No engineering resources, no data team — wrote all SQL independently

## The Reward Mechanism That Stopped Rewarding

<!-- was: "What the Organization Needed" -->

Amazon's Pinnacle program offers top-performing delivery partners — the 8.5%
of 2,620 operators who consistently achieve Tier 1 performance — a path to
expand into a second station. It depends on one thing working correctly:
identifying eligible partners.

In 2024, that identification process broke down. Launches dropped 55% (93 to
42). The process bypassed twenty longstanding eligible candidates, handing
their slots to net-new partners instead — violating the program's own
prioritization hierarchy. The reward mechanism wasn't rewarding the right
people.

The infrastructure behind eligibility determination needed a complete
replacement.

## Eight Root Causes Behind a 55% Decline

<!-- was: "What Was Broken" -->

The program ran on a 55+MB Excel file with index-match calculations across
24,000 rows. It crashed regularly. Every time it did, the process stopped.

But the Excel collapse was only one of eight failures I diagnosed:

- **The distance metric was non-deterministic.** Eligibility required proximity
  to an expansion site. The system measured distance using commute times — a
  tool that factored in live traffic. The same route could measure 49 miles one
  month and 52 the next. A partner could be eligible in October and ineligible
  in November, with nothing about their business having changed.

- **The data was always behind.** Eligibility data refreshed quarterly.
  Performance updated monthly. Partners who earned Tier 1 mid-quarter were
  invisible to the process until the next refresh.

- **Double-counting inflated the pool.** Reported candidate eligibility counts
  included those already in the program, making capacity planning unreliable.

- **Vetting history wasn't integrated.** Some partners had 12-month wait times
  or prior flags — but that history lived outside the eligibility system.
  Anyone wanting it had to cross-reference manually — or miss it entirely.

- **The prioritization framework was broken.** The tracker listed quality score
  as a tiebreaker, a metric that never existed.

Each failure compounded the others. Twenty candidates slipped through the gaps.

## The Decision That Made Eligibility Deterministic

<!-- elevated from H3 subsection to H2 — key insight -->

The existing system used commute times to measure candidate proximity. The data
was available, integrated, and familiar. Swapping it for a custom mathematical
formula required additional development, introduced an unfamiliar metric, and
would need to be explained and defended.

The problem was that commute times aren't a fixed property of geography.
They're a function of traffic — and traffic changes. A partner's eligibility
would shift month to month based on highway congestion on one particular
Tuesday.

I chose the Haversine formula: a standard great-circle distance calculation
using Earth's radius as a constant. The distance between two stations is now a
fixed number. It doesn't change between measurement cycles. That's the only
kind of metric that can support a program where eligibility has to be
deterministic.

The 250-mile fallback was a second design choice with real stakes. A hard
50-mile cutoff would strand expansion sites in remote regions. The fallback
extends the search only when no 50-mile match exists — preserving the primary
threshold while ensuring no site gets orphaned.

## What Changed

<!-- was: "What the Organization Got" -->

### 57.9% to 94.1%. Here's how the pipeline works.

<!-- Compressed to one sentence per stage per item 12 -->

I designed and built a six-stage SQL pipeline on Amazon Redshift that replaced
the Excel process entirely. Each stage addresses a specific diagnosed root
cause:

1. **Lock snapshot dates** — quarterly configuration pins performance scores,
   eliminating the data lag that made eligible partners invisible mid-cycle.
2. **Validate consecutive Tier 1** — window function checks sustained
   performance across two quarters, filtering single-quarter spikes.
3. **Integrate vetting history** — joins exclusion status and reconsideration
   dates directly into the query, replacing manual cross-referencing.
4. **Map station coordinates** — loads lat/long from master table for distance
   computation.
5. **Calculate Haversine distances** — replaces traffic-dependent commute times
   with mathematically consistent straight-line distance.
6. **Rank by policy-encoded priority** — applies the approved hierarchy
   (tenure first, performance second, proximity third) with intelligent
   250-mile fallback for remote stations.

The output — a ranked, pre-validated candidate list per expansion site — feeds
directly into the 8-day approvals process and the 3-week vetting cycle.

### 20 candidates preserved. Prioritization tenets restored.

The program's 5-lever sourcing hierarchy ranks expansion of existing
high-performers at Rank 3. Net-new partners sit at Rank 5 — last resort. In
2024, twenty Rank 3 candidates were skipped and those slots went directly to
Rank 5.

The pipeline enforces the hierarchy mechanically. Every open target checks the
full eligible pool before any fallback is triggered. The prioritization tenets
are no longer dependent on whoever is running the tracker that week.

### What the pipeline enabled.

<!-- was: "Foundation for what came next." — grouped + tightened per item 15 -->

The automation cut the need for the bloated Excel file that matched eligible
candidates with stations based on distance — the SQL handles it in seconds.
Removing double-counted partners reduced the reported eligible pool from 155
to 105 (fluctuating monthly), giving capacity planning accurate numbers for
the first time. The SQL infrastructure became the basis for the Salesforce
migration initiated in Q4 2024, and the reliable candidate pipeline supported
expanding the outreach team from 1 to 5 members.

I created the script that enabled the workstream. Leadership credited it by
name in program documentation — the only workstream in that document
attributed to a specific person.

## 57.9% to 94.1%: What the Numbers Show

<!-- was: "The Outcome" -->
<!-- component: insight-callout before metrics-row (ref/components.md) -->
<!-- component: metrics-row for headline numbers -->
<!-- component: data-table for before/after -->

| Metric                       | Before                            | After                                       |
| ---------------------------- | --------------------------------- | ------------------------------------------- |
| Annual Pinnacle launches     | 93 (2023) to 42 (2024)            | 80% of targets eligible for Pinnacle        |
| Pinnacle fill rate           | 57.9%                             | 94.1% (+36 percentage points)               |
| July 2024 fill rate          | Baseline                          | 100% (8 targets, +35 percentage points YTD) |
| Eligible candidates bypassed | 20 (2024)                         | 0                                           |
| Reported eligible pool       | 155 (inflated by double-counting) | 105 (accurate, monthly refresh)             |
| Eligibility process          | 55+MB Excel, crashes regularly    | Automated SQL on Redshift                   |
| Distance metric              | Variable commute time             | Haversine constant (3,959 mi radius)        |
| Outreach team capacity       | 1 member                          | 5 members                                   |

In 2024, the program missed 20 eligible candidates and delivered 42 launches
where 93 should have happened. The root cause wasn't strategy — it was a
broken identification process that couldn't be trusted.

A SQL pipeline replaced a spreadsheet. Mathematical precision replaced
traffic-dependent variability. Vetting history was integrated rather than
manually cross-referenced. The prioritization hierarchy was encoded so it
couldn't be violated by whoever opened the file.

The program now identifies the right candidates, in the right order, every
time the query runs.

## Lessons Worth Stealing

- **When a program is declining, diagnose whether it's strategy or
  infrastructure before changing strategy.** Pinnacle didn't need a new
  approach — it needed a working spreadsheet.
- **An eligibility system built on variable inputs produces variable outputs.**
  If the same query gives different answers on different days, the query isn't
  the problem — the inputs are.
- **If you can't rerun the process and get the same answer, you don't have a
  process.** Determinism isn't a nice-to-have — it's the minimum bar for any
  system that decides who gets an opportunity.

---

## Revision Notes

### Prose Edits Applied

- Items 3, 11, 12, 13, 14, 15: accepted as proposed
- Items 1, 2, 4, 5, 6, 7, 8, 9, 10: user edits applied
- Item 5 merged with item 1 (duplicate reference to 20 bypassed candidates)

### Structural Changes

- All 5 H2s rewritten with tension/specificity
- "My Role" replaced with scope-callout component
- Haversine decision elevated from H3 to H2 (key insight deserves section weight)
- Pipeline description compressed from ~350 to ~150 words (one sentence per stage)
- "Foundation" section tightened and grouped by impact type
- Prioritization section de-jargoned (lever names replaced with plain language)
- Lessons Worth Stealing section added (was missing)
- +3,500 bps converted to "+35 percentage points"
- "Restored" replaced with "80% of targets eligible for Pinnacle"

### De-Jargoning Applied

- RTO -> "net-new partners"
- DSPs -> "partners" or "delivery partners" (first use)
- WBR -> "reported" (context makes meaning clear)
- BDM -> "outreach team"
- LRP -> "Long-Range Planning" (in scope) / "capacity planning" (in body)
- BI -> "Business Intelligence" (in scope only)
- RTT/R2O/RTE/RTO hierarchy -> described by function ("existing transfers",
  "graduates", "expansion of high-performers", "net-new")
- Quality score tiebreaker -> "a metric that never existed"

### Accuracy Notes

- July "8 targets" breakdown sums to 9 in evidence (1 MMRO + 1 XL + 7 ZL) —
  likely evidence typo; draft matches evidence's stated count of 8
- Timeline 2+4+4 weeks: user-stated, not in evidence file
- All other claims verified against evidence

### Rubric Score: 30/40

| Criterion   | Score |
| ----------- | ----- |
| Arc         | 3     |
| So-What     | 4     |
| Scanability | 3     |
| Specificity | 5     |
| Context     | 4     |
| Voice       | 3     |
| One Lesson  | 3     |
| Accuracy    | 5     |

### Tips for HTML Build (3 -> 4 improvements)

- **Arc -> 4:** Outline fixes order + adds Lessons. Haversine decision elevated
  to H2 strengthens the turning point.
- **Scanability -> 4:** Add visual components: process-timeline for 6 stages,
  metrics-row for headline numbers, comparison for before/after.
- **Voice -> 4:** Outline de-jargons extensively. One final pass to catch any
  remaining undefined terms.
- **One Lesson -> 4:** "Diagnose strategy vs. infrastructure" is the primary
  lesson. Determinism and reproducibility are supporting.

### Component Suggestions (ref/components.md)

- scope-callout for Scope section
- insight-callout before Results narrative
- metrics-row for headline numbers (57.9% -> 94.1%, 20 -> 0, 1 -> 5)
- data-table for before/after comparison
- process-timeline for 6-stage pipeline
- lessons-list for Lessons Worth Stealing
- bar-comparison for fill rate improvement

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
| Metric ranges    | Round to one number with trailing +                                                                 |
| Table columns    | Consult /trend-researcher for standardization best practice                                         |
| Lessons styling  | Consult /trend-researcher for distinct vs standard treatment                                        |
| Closing CTA      | cs-cta block with "Read next: [title]" button + secondary contact/resume link                       |
| Homepage cards   | Rewrite after all 3 pages ship (separate pass)                                                      |
| Old pages        | Clean replacement — outlines are source of truth                                                    |
| Build order      | Sequential — DSP first as template, then CT, then Pinnacle                                          |
| Process flows    | Use /web-artifact-builder for CT 5-phase and Pinnacle 6-stage                                       |

### Pinnacle-Specific Decisions

| Decision                 | Choice                                                                                          |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| Root causes              | Compressed 5 bullets; mention "8 root causes diagnosed" in narrative                            |
| Eligibility funnel       | Use /web-artifact-builder (2,620 -> 222 -> ~180 -> ~160 -> ~140 -> output)                      |
| 6-stage pipeline         | Use /web-artifact-builder; one sentence per stage, narrative only                               |
| SQL/Haversine detail     | Narrative only — "great-circle distance using Earth's radius as a constant." No formula syntax. |
| LAG() / window functions | Narrative only — "checks sustained performance across two quarters." No SQL.                    |
| This page replaces       | Existing automation case study (same URL slot in link chain)                                    |
| Chart.js candidates      | Eligibility funnel (progressive filtering is complex enough for Chart.js)                       |

### Anonymization Notes (Pinnacle)

- "Amazon Redshift" -> "data warehouse"
- "Who's My Neighbor Dashboard" -> "the distance dashboard" or "the proximity tool"
- "LRP" -> "capacity planning team" or "Long-Range Planning" on first use
- "BI" -> "business intelligence team"
- "BDM" -> "outreach team"
- "WBR" -> "weekly reporting" or describe function
- "RTT/R2O/RTE/RTO" -> described by function in outline (already done)
- "MSO" -> "vetting" or describe function
- "NH" -> "network performance" or "operations"
- "DSPi" -> omit or describe as "training platform"
- Station-specific identifiers (MMRO, XL, ZL) -> omit or genericize
- Haversine formula stays named (it's a public mathematical concept, not Amazon-internal)
