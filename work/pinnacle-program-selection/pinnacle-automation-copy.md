# A 55+MB Spreadsheet Was Deciding Who Got to Expand — and Getting It Wrong

**Pinnacle Program Automation | 57.9% → 94.1% Fill Rate | 7 Root Causes | Solo Build**

`SQL / Data Warehouse` `Haversine Geospatial` `Window Functions` `Process Automation`

## Quick Summary

- A reward program for top-performing delivery partners broke down — launches dropped 55% and 20 eligible candidates were bypassed entirely — because the eligibility process ran on a crashing 55+MB Excel file.
- Diagnosed 7 root causes across data, process, and tooling. Replaced the entire system with a 6-stage SQL pipeline using Haversine distance for deterministic eligibility.
- Fill rate jumped from 57.9% to 94.1% (+36 percentage points), hitting 100% in July. Zero candidates bypassed. Pinnacle team expanded from 3 to 10.

## Scope

|                |                                                                      |
| -------------- | -------------------------------------------------------------------- |
| **Timeline**   | Q3–Q4 2024 (10 weeks: 2 diagnosis + 4 build + 4 validation)          |
| **My Role**    | PM, Pinnacle Operations, DSP Acquisitions                            |
| **Teams**      | Capacity planning, Business Intelligence, Operations, Outreach       |
| **Constraint** | No engineering resources, no data team — wrote all SQL independently |

## The Reward Mechanism That Stopped Rewarding

Amazon's Pinnacle program offers top-performing delivery partners — the 8.5% of 2,620 operators who consistently achieve Tier 1 performance — a path to expand into a second station.

In 2024, that identification process broke down. Launches dropped 55% (93 to 42). The process bypassed 20 longstanding eligible candidates, handing their slots to net-new partners instead — violating the program's own prioritization hierarchy. The reward mechanism wasn't rewarding the right people.

### Seven Root Causes Behind a 55% Decline

The selection program ran on a 55+MB Excel file pairing partners with stations within a 50-mile radius.

- **Tooling collapse** — the 55+MB Excel file with index-match calculations across 24,000 rows crashed regularly, failing to pull all data. The primary identification tool was unreliable.
- **Non-deterministic distance metric** — eligibility used commute times that varied with live traffic. The same route measured 49 miles one month and 52 the next. A partner could be eligible in October and ineligible in November.
- **Rural exclusion** — a hard 50-mile cutoff discriminated against top performers in areas with no stations within range. Eligible partners were invisible to the system by geography alone.
- **Stale data** — eligibility refreshed quarterly while performance updated monthly. Partners who earned Tier 1 mid-quarter were invisible until the next refresh.
- **Double-counting** — reported eligibility counts included partners already in the program, making capacity planning unreliable.
- **Missing vetting history** — 12-month wait times and prior flags lived outside the eligibility system. Accessing it required manual cross-referencing.
- **Broken prioritization** — the tracker listed a quality score tiebreaker that never existed. The framework didn't match strategy documents.

Each failure compounded the others. Twenty eligible candidates were bypassed entirely.

## The Decision That Made Eligibility Deterministic

The existing system used commute times to measure candidate proximity. The data was available, integrated, and familiar. Swapping it for a custom mathematical formula required additional development, introduced an unfamiliar metric, and demanded justification to stakeholders who trusted the existing system.

The problem was that commute times aren't a fixed property of geography — they're a function of traffic. A partner's eligibility shifted month to month based on traffic conditions the day someone ran the query.

I chose the Haversine formula: a standard great-circle distance calculation using Earth's radius as a constant. The distance between two stations is now a fixed number. Only a fixed metric can support a program where eligibility must be deterministic.

The 200-mile fallback was the second consequential design choice. A hard 50-mile cutoff would strand expansion sites in remote regions. The fallback extends the search only when no 50-mile match exists, preserving the primary threshold without stranding remote sites.

## What Changed

### 57.9% to 94.1%. Here's how the pipeline works.

I designed and built a six-stage SQL pipeline on a data warehouse that replaced the Excel process entirely. Each stage addresses a specific root cause:

1. **Lock snapshot dates** — quarterly configuration pins performance scores, eliminating the data lag that made eligible partners invisible mid-cycle.
2. **Validate consecutive Tier 1** — checks sustained performance across two quarters, filtering single-quarter spikes.
3. **Integrate vetting history** — joins exclusion status and reconsideration dates directly into the query, replacing manual cross-referencing.
4. **Map station coordinates** — loads latitude and longitude from the master station table for distance computation.
5. **Calculate Haversine distances** — replaces traffic-dependent commute times with mathematically consistent straight-line distance.
6. **Rank by policy-encoded priority** — applies the approved hierarchy (tenure first, performance second, proximity third) with intelligent 200-mile fallback for remote stations.

The output — a ranked, pre-validated candidate list per expansion site — feeds directly into the 8-day approval process and the 3-week vetting cycle.

### 20 candidates preserved. Prioritization tenets restored.

The program's 5-lever sourcing hierarchy ranks expansion of existing high-performers at Rank 3. Net-new partners sit at Rank 5 — last resort. In 2024, the system skipped twenty Rank 3 candidates; their slots went directly to Rank 5.

The pipeline enforces the hierarchy mechanically. Every open target checks the full eligible pool before triggering any fallback. The prioritization tenets now hold regardless of who runs the tracker.

### What the pipeline enabled.

A process that took hours collapsed to 10 minutes. The automation eliminated the Excel file. Removing double-counted partners reduced the reported eligible pool from 155 to 105, giving capacity planning its first accurate numbers. The SQL infrastructure became the basis for a Salesforce migration that began in Q4 2024, and the pipeline enabled the Pinnacle team to expand from 3 to 10 members.

I created the script that enabled the workstream. Leadership named it in the program's official documentation — unusual for a PM deliverable.

## 57.9% to 94.1%: What the Numbers Show

> The crashing file wasn't just an inconvenience — it was actively misrouting the network's best operators. The pipeline fixed the tooling, the data, and the rules simultaneously.

| Metric                  | Value                         |
| ----------------------- | ----------------------------- |
| **Fill Rate**           | 94.1% (up from 57.9%, +36 pp) |
| **July Fill Rate**      | 100% (8 targets, +35 pp YTD)  |
| **Candidates Bypassed** | 0 (down from 20)              |
| **Pinnacle Team**       | 3 → 10 (3× capacity)          |

### Eligibility Funnel: Full Network → Ranked Candidates

| Stage                          | Count              |
| ------------------------------ | ------------------ |
| Full Partner Network           | 2,620              |
| Tier 1 Designation             | ~222 (~8.5%)       |
| Consecutive Tier 1             | ~180               |
| Tenure Qualified (12+ months)  | ~160               |
| Vetting Clear                  | ~140               |
| Distance Matched & Prioritized | Ranked per station |

### System transformation: before and after automation

| Before                                                          | After                                 |
| --------------------------------------------------------------- | ------------------------------------- |
| 55+ MB Excel file (crashes regularly, failing to pull all data) | 6-stage SQL pipeline (data warehouse) |
| Traffic-dependent commute distances                             | Haversine constant (deterministic)    |
| Quarterly data refresh                                          | Monthly integration (3x faster)       |
| Double-counting in reports                                      | Deduplicated (155 → 105 accurate)     |
| 20 candidates bypassed                                          | 0 candidates missed                   |
| 57.9% fill rate (42 launches)                                   | 94.1% fill rate (100% in July)        |
| 3 Pinnacle team members                                         | 10 Pinnacle team members              |
| Hours per eligibility run                                       | 10 minutes per run                    |

In 2024, the program missed 20 eligible candidates and delivered 42 launches where 93 were expected. The root cause was a broken identification process, not a flawed strategy.

A SQL pipeline replaced a spreadsheet. Mathematical precision replaced traffic-dependent variability. The pipeline integrated vetting history directly, eliminating manual cross-referencing. Encoding the prioritization hierarchy removed human discretion from candidate ranking. The program now identifies the right candidates, in the right order, every time the query runs.

### Post-automation: the program kept growing.

By May 2025, the eligible pool had grown **43% year-over-year to 441 DSPs** — even after tightening Leadership & Engagement, Positive Environment, and Strategic Communicator qualification screens. 118 DSPs were actively in the program. The SQL pipeline migrated to an Asana workflow with automated candidate identification, heuristics-based allocation, and a quality-aligned vetting block. Acceptance held at **77%**, exits stayed at **zero year-to-date**, and blended Quality reached 66.7% (+270 bps month-over-month).

The constraint shifted: only 37 Pinnacle opportunities opened in the trailing twelve months (−46% YoY), with 5 targets unfilled. The pipeline solved identification. The remaining gap was supply — too few expansion opportunities opening.

## Lessons Worth Stealing

- **When a program is declining, diagnose whether the failure is strategy or infrastructure before touching either.** Pinnacle didn't need a new approach — it needed a working spreadsheet.
- **An eligibility system built on variable inputs produces variable outputs.** If the same query gives different answers on different days, the query isn't the problem — the inputs are.
- **If you can't rerun the process and get the same answer, you don't have a process.** Determinism isn't optional — it's the minimum bar for any system that decides who advances.

> A reward mechanism is only as good as the infrastructure behind it. When top performers don't receive the opportunities they've earned, the program hasn't failed — the process has.

---

Next: [Read next: DSP Application Redesign →](../cfa-dsp-application/dsp-application.html)

[Get in touch](../../index.html#contact)
