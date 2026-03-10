# 74% of the people who started Amazon's delivery partner application never finished it.

**Competitive Intelligence | 17 Global Markets | 0.25 → 4.6 Engineers Secured**

`Marketing Automation` `CMS Architecture` `Statistical Analysis` `Chick-fil-A Benchmark`

---

## Quick Summary

- A delivery partner application unchanged since 2018 had a 74% abandonment rate, costing $2.1M+ annually in lost candidate conversion.
- Applying to Chick-fil-A's franchise program as competitive intelligence revealed the fix: structured inputs, not fewer questions. A 101-requirement redesign followed.
- An evidence chain—requirements specification, technology roadmap, annual operating plan escalation—secured 4.6 engineers against a $10.9M+ roadmap, up from 0.25.

---

|               |                                                                            |
| ------------- | -------------------------------------------------------------------------- |
| **Timeline**  | Oct 2023 – Q1 2024                                                         |
| **My Role**   | Program Manager, DSP Acquisitions (self-directed)                          |
| **Teams**     | Acquisitions, Engineering, Senior Leadership                               |
| **Artifacts** | BRD (101 requirements), Tech Vision 2025, annual operating plan escalation |

---

## The $2.1M+ Problem

The Delivery Service Partner (DSP) Acquisitions team needed to scale Amazon's partner network across 17 global markets. The application—unchanged since 2018—was broken in four compounding ways:

- **74% abandonment**—55% dropped on page two at the resume upload. No visibility into who was leaving or why.
- **Unusable data**—20 open-ended questions produced inconsistent responses across 25,830 records. Statistical analysis confirmed reviewer scores diverged measurably.
- **Wrong candidates getting through**—62% rejection rate post-submission, but only 23% of approved candidates showed program interest. Filtering happened too late.
- **Impossible to iterate**—adding 14 questions flagged as a 10–12 month engineering effort. Blocked every program expansion.

$2.1M+ annually in lost candidate conversion entitlement. The team projected a 33% recruiting cost increase for 2024. The constraint was the story: 0.25 Software Development Engineers (engineers) allocated for work that required 4.6.

---

## What the Benchmark Revealed

I identified Chick-fil-A's franchise application as the benchmark: 40,000 applicants per year, ~0.2% acceptance rate, same model (individual operators running a branded business). Then I applied—October 17, 2023, using personal information. Every screen documented, every question cataloged by type and completion time, built into a comparison spreadsheet.

Then I directed the entire Acquisitions team through the same process to build shared conviction.

### Amazon Application vs. CFA Application

| Amazon Application                                                                             | CFA Application                                                                                          |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 60+ fields, 65% free-text, open-ended essays, 3+ hours, inconsistent and unscoreable responses | 80+ fields, 75% structured dropdowns, numerical inputs, under 1 hour, scoreable and consistent responses |

Statistical analysis of 25,830 records confirmed reviewer scores diverged measurably—the application design was the root cause. CFA collects _more_ data in _less_ time through better input design. The fix wasn't fewer questions. It was better questions.

---

## From CFA Application to $10.9M+ Roadmap

I owned strategy end-to-end—diagnosis, Business Requirements Document (BRD), roadmap. No one assigned this.

Central constraint: engineering allocation for 2024 was **0.25 engineers**. The work required **4.6**.

### Architecture Redesign

- Replaced 20 open-ended questions with single-response structured inputs
- Eliminated resume upload; replaced with 30 standardized work history fields
- Added upstream qualification gate (modeled on CFA's Expression of Interest)
- Designed modular, country-agnostic architecture: 6 programs, 17 markets, quarterly content management system updates without engineering

### Evidence Chain That Moved Resources

Each document cited the same benchmark. By the time I requested 4.6 engineers, leadership had seen the evidence three times:

- **BRD**—101 requirements across 6 epics, each traceable to a CFA benchmark finding
- **Global DSP Tech Vision 2025**—executive narrative for senior leadership
- **Annual operating plan escalation** (co-authored)—I owned entitlement quantification and competitive framing

  0.25 → 4.6 engineers secured against $10.9M+ in identified entitlement.

---

## The Pardot Decision

> When engineering flagged the 32-question update as a 12-month effort, I proposed a Pardot (marketing automation platform) integration that bypassed the constraint entirely.

Pardot was already in the tech stack. Using it for form management and progressive profiling compressed development from 12 months to 3–4—unblocking the $10.9M+ roadmap. The Acquisition team gained the ability to iterate on questions without engineering dependencies.

---

## 9,419 More Approved Applications Per Year

> One franchise application submitted on a Tuesday night. Fourteen months later: 101 requirements, 18x the initial engineering allocation, $10.9M+ in identified entitlement across 17 countries.

| Metric     | Value               | Detail                 |
| ---------- | ------------------- | ---------------------- |
| **+130%**  | Completion Rate     | 26% → 60%              |
| **+100%**  | Program Inclination | 23% → 46%              |
| **3–4 mo** | Dev Cycle           | Down from 10–12 months |
| **4.6**    | Engineers Secured   | Up from 0.25           |

| Metric                      | Before         | Target (projected) |
| --------------------------- | -------------- | ------------------ |
| Application completion rate | 26%            | 60% (+130%)        |
| Program inclination rate    | 23%            | 46% (+100%)        |
| Completion time             | 3+ hours       | Under 1 hour       |
| Development cycle           | 10–12 months   | 3–4 months         |
| Engineering secured         | 0.25 engineers | 4.6 engineers      |
| Annual entitlement captured | —              | $2.1M+             |

_Metrics reflect projected targets from the approved roadmap, not confirmed post-launch results._

9,419 additional approved applications per year (15,699 → 25,118). 365 more program-inclined candidates per year (421 → 786). 2,200+ hours removed from manual review annually. The team now updates the application quarterly without an engineering ticket—across every program and market.

---

## Lessons Worth Stealing

- **If you can't measure what's broken, benchmark the best—then apply as a customer.** I applied to the Chick-fil-A franchise program myself. Primary research builds conviction that secondary research never will.

- **Structured data beats more data.** CFA collects more data points in less time through better input design. The fix wasn't fewer questions—it was better questions.

- **Resource escalations win on evidence chains, not urgency.** BRD → Tech Vision → annual operating plan—each document cited the same benchmark. By the time I requested 4.6 engineers, leadership had seen the evidence three times.

- **When engineering says "12 months," look for the architectural shortcut.** The Pardot integration existed because I looked for the constraint's constraint.

---

> The application wasn't collecting bad data—it was asking the wrong kind of questions. The fix wasn't fewer questions. It was better ones.
