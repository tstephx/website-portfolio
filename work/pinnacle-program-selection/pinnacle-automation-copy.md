# Pinnacle Selection Automation

_Auto-generated from pinnacle-automation.html — do not edit directly._

**Meta description:** A 55+MB spreadsheet was deciding who got to expand — and getting it wrong. Diagnosed 7 root causes, built a 6-stage SQL pipeline, increased Pinnacle fill rate from 57.9% to 94.1%.

**Tagline:** Pinnacle Program Automation | 57.9% → 94.1% Fill Rate | 7 Root Causes | Solo Build

**Scope:** Q3–Q4 2024 (10 weeks) · PM, Pinnacle Operations · Capacity planning, BI, Operations, Outreach · No engineering resources

---

## The Reward Mechanism That Stopped Rewarding

Amazon’s Pinnacle program offers top-performing delivery partners—the 8.5% of 2,620 operators who consistently achieve Tier 1 performance—a path to expand into a second station.

In 2024, that identification process broke down. Launches dropped 55% (93 to 42). The process bypassed 20 longstanding eligible candidates, handing their slots to net-new partners instead—violating the program’s own prioritization hierarchy. The reward mechanism wasn’t rewarding the right people.

The selection program ran on a 55+MB Excel file pairing partners with stations within a 50-mile radius.

Each failure compounded the others. Twenty eligible candidates were bypassed entirely.

- Tooling collapse—the 55+MB Excel file with index-match calculations across 24,000 rows crashed regularly, failing to pull all data. The primary identification tool was unreliable.
- Non-deterministic distance metric—eligibility used commute times that varied with live traffic. The same route measured 49 miles one month and 52 the next. A partner could be eligible in October and ineligible in November.
- Rural exclusion—a hard 50-mile cutoff discriminated against top performers in areas with no stations within range. Eligible partners were invisible to the system by geography alone.
- Stale data—eligibility refreshed quarterly while performance updated monthly. Partners who earned Tier 1 mid-quarter were invisible until the next refresh.
- Double-counting—reported eligibility counts included partners already in the program, making capacity planning unreliable.
- Missing vetting history—12-month wait times and prior flags lived outside the eligibility system. Accessing it required manual cross-referencing.
- Broken prioritization—the tracker listed a quality score tiebreaker that never existed. The framework didn’t match strategy documents.

## The Decision That Made Eligibility Deterministic

The existing system used commute times to measure candidate proximity. The data was available, integrated, and familiar. Swapping it for a custom mathematical formula required additional development, introduced an unfamiliar metric, and demanded justification to stakeholders who trusted the existing system.

The problem was that commute times aren’t a fixed property of geography—they’re a function of traffic. A partner’s eligibility shifted month to month based on traffic conditions the day someone ran the query.

I chose the Haversine formula: a standard great-circle distance calculation using Earth’s radius as a constant. The distance between two stations is now a fixed number. Only a fixed metric can support a program where eligibility must be deterministic.

The 200-mile fallback was the second consequential design choice. A hard 50-mile cutoff would strand expansion sites in remote regions. The fallback extends the search only when no 50-mile match exists, preserving the primary threshold without stranding remote sites.

## What Changed

I designed and built a six-stage SQL pipeline on a data warehouse that replaced the Excel process entirely. Each stage addresses a specific root cause:

The output—a ranked, pre-validated candidate list per expansion site—feeds directly into the 8-day approval process and the 3-week vetting cycle.

The program’s 5-lever sourcing hierarchy ranks expansion of existing high-performers at Rank 3. Net-new partners sit at Rank 5—last resort. In 2024, the system skipped twenty Rank 3 candidates; their slots went directly to Rank 5.

The pipeline enforces the hierarchy mechanically. Every open target checks the full eligible pool before triggering any fallback. The prioritization tenets now hold regardless of who runs the tracker.

A process that took hours collapsed to 10 minutes. The automation eliminated the Excel file. Removing double-counted partners reduced the reported eligible pool from 155 to 105, giving capacity planning its first accurate numbers. The SQL infrastructure became the basis for a Salesforce migration that began in Q4 2024, and the pipeline enabled the Pinnacle team to expand from 3 to 10 members.

I created the script that enabled the workstream. Leadership named it in the program’s official documentation—unusual for a PM deliverable.

- Lock snapshot dates—quarterly configuration pins performance scores, eliminating the data lag that made eligible partners invisible mid-cycle.
- Validate consecutive Tier 1—checks sustained performance across two quarters, filtering single-quarter spikes.
- Integrate vetting history—joins exclusion status and reconsideration dates directly into the query, replacing manual cross-referencing.
- Map station coordinates—loads latitude and longitude from the master station table for distance computation.
- Calculate Haversine distances—replaces traffic-dependent commute times with mathematically consistent straight-line distance.
- Rank by policy-encoded priority—applies the approved hierarchy (tenure first, performance second, proximity third) with intelligent 200-mile fallback for remote stations.

## 57.9% to 94.1%: What the Numbers Show

## Lessons Worth Stealing

- When a program is declining, diagnose whether the failure is strategy or infrastructure before touching either. Pinnacle didn’t need a new approach—it needed a working spreadsheet.
- An eligibility system built on variable inputs produces variable outputs. If the same query gives different answers on different days, the query isn’t the problem—the inputs are.
- If you can’t rerun the process and get the same answer, you don’t have a process. Determinism isn’t optional—it’s the minimum bar for any system that decides who advances.
