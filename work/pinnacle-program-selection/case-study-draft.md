# Pinnacle Selection Automation — Case Study Draft
> Status: DRAFT v1 — publication-ready, pending HTML conversion
> Created: 2026-02-19

---

Amazon's Pinnacle program — the primary reward mechanism for its top-performing delivery partners — saw launches drop 55% in a single year. The cause wasn't a strategy failure. It was a broken spreadsheet. I diagnosed 8 root causes across data, process, and tooling, then built a SQL pipeline from scratch that raised the fill rate from 57.9% to 94.1%.

---

## What the Organization Needed

Amazon's Pinnacle program offers top-performing Delivery Service Partners (DSPs) — the 8.5% of 2,620 operators who consistently achieve Tier 1 Network Health performance — a path to expand into a second station. It is the program's primary reward mechanism, and it depends on one thing working correctly: the right DSPs getting identified.

In 2024, that identification process broke down. Forty-two Pinnacle launches occurred where 93 had happened the year before. Twenty eligible candidates were bypassed entirely, with those open slots handed to net-new RTO candidates instead — violating the program's own prioritization hierarchy. The reward mechanism wasn't rewarding the right people.

What was needed wasn't a process tweak. It was a complete replacement of the infrastructure behind eligibility determination.

---

## What Was Broken

The program ran on a 55+MB Excel file with index-match calculations across 24,000 rows. It crashed regularly. Every time it did, the process stopped.

But the Excel collapse was only one of eight failures I diagnosed. The others were less visible and harder to fix:

- **The distance metric was non-deterministic.** Eligibility required a DSP to be within a certain distance of an expansion site. The system measured that distance using commute times pulled from the "Who's My Neighbor Dashboard" — a tool that factored in live traffic. The same route could measure 49 miles one month and 52 the next. A DSP could be eligible in October and ineligible in November, with nothing about their business having changed.

- **The data was always behind.** Eligibility data refreshed quarterly. Network Health performance updated monthly. DSPs who earned Tier 1 status mid-quarter didn't appear in the system until the next refresh cycle — invisible to the process that was supposed to reward them.

- **Double-counting inflated the candidate pool.** DSPs already operating second stations were included in WBR eligibility counts, making capacity planning unreliable.

- **Vetting history wasn't integrated.** Some DSPs had 12-month wait times before re-approach, or had been flagged in prior MSO vetting cycles — but that history lived outside the eligibility system. It had to be manually cross-referenced or it was missed.

- **The prioritization framework was inconsistent.** The eligibility tracker's tiebreaker logic didn't match the strategy documents. Quality score was listed as a tiebreaker, but quality is a binary pass/fail — it can't rank candidates.

Each failure compounded the others. A DSP might qualify on performance, fail on an invisible vetting flag, or get ranked incorrectly after the distance calculation shifted. Twenty candidates slipped through the gaps entirely.

---

## My Role

I was the PM accountable for Pinnacle operations. No dedicated engineering resources. No data team assigned to this problem. The task: diagnose what was broken and build a replacement.

Timeline: Q3–Q4 2024. Working in Amazon Redshift, coordinating validation with BI, LRP, and Network Health teams.

---

## What the Organization Got

### 57.9% → 94.1%. Here's how the pipeline works.

I designed and built a six-stage SQL pipeline on Amazon Redshift that replaced the Excel process entirely. Each stage addresses a specific diagnosed root cause.

**Stage 1 — Lock the snapshot dates.** A quarterly configuration table (`nh_score_config`) maps nine snapshot dates, from 2022Q1 through 2024Q3, locking Network Health scores for consistent eligibility evaluation. This eliminates the quarterly data lag: the system now runs against a defined, stable snapshot rather than a live feed that shifts mid-cycle.

**Stage 2 — Validate consecutive Tier 1 performance.** A `LAG()` window function checks whether each DSP held Tier 1 status in both the current and prior quarter. Single-quarter spikes don't qualify. The `two_period_tier_one_flag` ensures the Pinnacle program is rewarding sustained performance, not a good month.

**Stage 3 — Integrate MSO vetting history.** A join against `dim_mso_pinnacle_vetting_hist` surfaces each DSP's exclusion status and reconsideration date. Vetting history is no longer a manual lookup — it's encoded in the query. DSPs with active exclusions or pending reconsideration periods are filtered before any outreach is considered.

**Stage 4 + 5 — Replace commute times with Haversine distances.** Station coordinates are loaded from a master table, then a `CROSS JOIN` applies the Haversine formula across all station pairs. The result is a mathematically consistent straight-line distance — the same calculation, every time, regardless of traffic or time of day.

**Stage 6 — Rank candidates by policy-encoded priority.** The final selection layer applies the program's approved prioritization hierarchy directly in the `ORDER BY`: tenure quarters first, Network Health score rank second, proximity third. An intelligent fallback uses `NOT EXISTS` to extend the search radius to 250 miles for remote or island stations where no candidates exist within 50 miles.

The output — a ranked, pre-validated candidate list per expansion site — feeds directly into the 8-day Amazon Approvals process and the 3-week BPR vetting cycle.

### The decision that made eligibility deterministic.

The existing system used commute times to measure candidate proximity. That data was already available, already integrated, and already familiar to the teams using the process. Swapping it for a custom mathematical formula required additional development work, introduced an unfamiliar metric, and would need to be explained and defended.

The problem was that commute times aren't a fixed property of geography. They're a function of traffic — and traffic changes. An eligibility system built on variable inputs produces variable outputs. A DSP's eligibility would shift month to month based on the highway congestion on one particular Tuesday.

I chose the Haversine formula: a standard great-circle distance calculation using Earth's radius as a constant. The distance between two stations is now a fixed number. It doesn't change between measurement cycles. That's the only kind of metric that can support a program where eligibility has to be deterministic.

The 250-mile fallback was a second design choice with real stakes. A hard 50-mile cutoff would strand expansion sites in remote regions — stations in rural areas or island operations with no Tier 1 candidates nearby. The `NOT EXISTS` fallback extends the search only when no 50-mile match exists, preserving the primary threshold while ensuring no site gets orphaned from the program entirely.

### 20 candidates preserved. Prioritization tenets restored.

Before the automation, the LRP 5-lever sourcing hierarchy was being violated. The hierarchy: RTT (existing transfers) → R2O (Road to Ownership graduates) → RTE/Pinnacle → R2O unassigned → RTO (net-new). Pinnacle sits at Rank 3. In 2024, 20 Pinnacle-eligible candidates were skipped and those targets went directly to RTO at Rank 5 — last resort, not first consideration.

The SQL pipeline enforces the hierarchy mechanically. Every open target checks the full eligible Pinnacle pool before any RTO fallback is triggered. The prioritization tenets are no longer dependent on whoever is running the tracker that week.

### Foundation for what came next.

The SQL infrastructure became the basis for the Salesforce migration, initiated in Q4 2024. The Haversine distance module is reusable for any station-pair proximity calculation across the network. WBR reporting accuracy improved through elimination of double-counting. The BDM Pinnacle team expanded from 1 to 5 members — a capacity expansion that was only possible because the candidate identification pipeline was finally reliable enough to support it.

The script was explicitly credited in leadership documentation: *"The acquisition team will create a script that automatically identifies the prioritized list of Pinnacle eligible candidates for each site (Taylor Stephens, ECD: completed)."*

---

## The Outcome

| Metric | Before | After |
|--------|--------|-------|
| Annual Pinnacle launches | 93 (2023) → 42 (2024) | Restored |
| Pinnacle fill rate | 57.9% | 94.1% (+36 percentage points) |
| July 2024 fill rate | Baseline | 100% (8 targets closed, +3,500 bps YTD) |
| Eligible candidates bypassed | 20 (2024) | 0 |
| Eligibility process | 55+MB Excel, crashes regularly | Automated SQL on Amazon Redshift |
| Distance metric | Variable commute time | Haversine constant (Earth radius: 3,959 mi) |
| Data refresh cadence | Quarterly lag | Monthly NH integration |
| BDM outreach capacity | 1 team member | 5 team members |

In 2024, the program missed 20 eligible candidates and delivered 42 launches where 93 should have happened. The root cause wasn't strategy — it was a broken identification process that couldn't be trusted.

A SQL pipeline replaced a spreadsheet. Mathematical precision replaced traffic-dependent variability. Vetting history was integrated rather than manually cross-referenced. The prioritization hierarchy was encoded in an `ORDER BY` clause rather than left to whoever opened the file.

The program now identifies the right candidates, in the right order, every time the query runs.

---

*A reward mechanism is only as good as the infrastructure behind it. When top performers don't receive the opportunities they've earned, the program hasn't failed — the process has. The fix was making eligibility deterministic: same data, same math, same answer.*

---

---

## Reusable Extracts

---

### 1. Headline Card

**Amazon's top-performing delivery partners were being bypassed for expansion opportunities they had earned — not because the strategy was wrong, but because a crashing spreadsheet and variable distance calculations made eligibility impossible to trust. A six-stage SQL pipeline fixed all eight root causes and raised the fill rate from 57.9% to 94.1%.**

---

### 2. LinkedIn Post

In 2024, Amazon's Pinnacle program — the primary reward mechanism for top-performing delivery partners — saw launches drop 55% year over year.

The cause wasn't a strategy failure. It was a 55MB Excel file that crashed regularly, distance calculations that shifted with traffic patterns, and eligibility data that lagged a quarter behind actual performance. Twenty qualified candidates were skipped entirely.

I diagnosed eight root causes across data, process, and tooling — then built a SQL pipeline on Amazon Redshift that addressed every one of them.

The most consequential decision wasn't technical. The existing system used commute times for distance. They were already integrated, already familiar. I replaced them with the Haversine formula — a constant derived from Earth's radius — because an eligibility determination has to produce the same answer twice.

Fill rate went from 57.9% to 94.1%. All 20 bypassed candidates were recovered. The program's prioritization hierarchy was encoded directly in the query so it couldn't be violated by whoever happened to open the tracker that week.

The hardest part wasn't building the pipeline. It was making the case that a broken process — not a broken strategy — was the thing that needed fixing.

---

### 3. Three-Bullet Summary

- Diagnosed 8 root causes across data, process, and tooling dimensions driving a 55% decline in Pinnacle launches (93 → 42) and 20 missed eligible candidates; built a six-stage SQL pipeline on Amazon Redshift to replace a 55+MB crash-prone Excel process
- Implemented Haversine formula for mathematically consistent straight-line distances, replacing traffic-dependent commute times that made eligibility non-deterministic; encoded the program's full prioritization hierarchy in `ORDER BY` logic so tenet violations became mechanically impossible
- Raised Pinnacle fill rate from 57.9% to 94.1% (+36 percentage points); achieved 100% fill rate in July 2024; preserved 20 eligible candidates previously bypassed; SQL infrastructure became foundation for Salesforce migration and supported BDM team expansion from 1 to 5 members

---

## Changes Made and Why

**Lede opens with the metric event, not a thesis.**
The brief specified: lead with "55% decline in launches." The opening two sentences deliver the number, name the cause, and state the action and result — the full arc in 40 words. A reader skimming the first line gets the argument before they read anything else.

**Hero is the program and the DSPs, not Taylor.**
Section headers frame outcomes for the organization ("What the Organization Needed," "What the Organization Got") rather than Taylor's contributions. The guide role is preserved — "I diagnosed," "I built," "I chose" — but the subject of value is always the program.

**The Haversine decision is written as a genuine choice with real stakes.**
The brief flagged this as the key decision moment. The section shows the alternative (commute times were already integrated and familiar), the risk of the chosen path (additional development, unfamiliar metric, needed defending), and why it was the only option that produced a deterministic output. That's what makes it a decision rather than an obvious technical preference.

**The 250-mile fallback gets its own explanation.**
The NOT EXISTS fallback logic is a second design choice with program integrity implications — not a footnote. Remote stations would be orphaned without it. Brief coverage given because it demonstrates that the engineering decisions were policy decisions, not just technical ones.

**Prioritization section leads with the hierarchy violation, not the fix.**
The stakes (20 candidates sent to RTO instead of Pinnacle, hierarchy violated) precede the solution (the SQL enforces rank mechanically). Metric first, narrative second.

**Closing is a pull quote, not a labeled section.**
Matches the v3 contract-transfer pattern: final thought as an italicized closing paragraph without a section header. Lands harder without the announcement.

**Three reusable extracts appended.**
Headline card (one sentence framing the full arc), LinkedIn post (5 paragraphs, no emoji, no platitudes, structured as hook → context → action → decision → result), and three-bullet summary keyed to the same metrics as the body.

**Voice: first person throughout.**
Matches the v3 contract-transfer convention established in the portfolio.
