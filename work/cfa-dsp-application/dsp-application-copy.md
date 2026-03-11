# 74% of the people who started Amazon's delivery partner application never finished it.

**Competitive Intelligence | $2.1M+ in Annual Entitlement | 20 Global Markets**

`Marketing Automation` `CMS Architecture` `Statistical Analysis` `Chick-fil-A Benchmark`

## Quick Summary

- A delivery partner application unchanged since 2018 had a 74% abandonment rate, costing $2.1M+ annually in lost conversion.
- Applying to Chick-fil-A's franchise program revealed the fix: structured inputs, not fewer questions. A 101-requirement redesign followed.
- An evidence chain—requirements specification, technology roadmap, annual operating plan escalation—secured 3.8 engineers to capture $2.1M+ in annual entitlement, up from 0.25.

## Scope

|               |                                                                            |
| ------------- | -------------------------------------------------------------------------- |
| **Timeline**  | Oct 2023 – Q1 2024                                                         |
| **My Role**   | Program Manager, DSP Acquisitions (self-directed)                          |
| **Teams**     | Acquisitions, Engineering, Senior Leadership                               |
| **Artifacts** | BRD (101 requirements), Tech Vision 2025, annual operating plan escalation |

## The $2.1M+ Problem

The Delivery Service Partner (DSP) Acquisitions team needed to scale Amazon's partner network across 20 global markets. The application—unchanged since 2018—was broken in six ways:

- **74% abandonment**—55% dropped at the Education, Military & Work History section—the page requiring the resume upload. No visibility into who dropped, at which step, or why.
- **Poor candidate data quality**—32 questions—including 5 long-form essays—produced inconsistent responses across 25,830 records. Resume uploads contained experience data locked in unstructured PDFs—unreadable by any scoring system. A one-way ANOVA across six reviewers returned F = 430.9 (p < 2e-16)—the application design, not reviewer judgment, was the root cause.
- **Wrong candidates getting through**—62% rejection rate post-submission, but only 23% of approved candidates showed program interest. At $319 per final interview versus $15 at application review, the program filtered a full stage too late.
- **Misrouted applicants**—candidates searching for the DSP program landed on the Delivery Driver application instead, losing qualified leads before they reached the right form.
- **Broken UX**—not mobile-friendly despite majority mobile traffic. Question difficulty sequenced easy–hardest–medium instead of progressive. No tooltips, no input guardrails, no confirmation step validation. Email couldn't match an existing Amazon account, forcing applicants to create throwaway addresses. Questions reflected 2018 program needs while the business had evolved through 2024.
- **Costly to iterate**—updating 10 questions flagged as a "large" engineering effort. Adding new questions hit the same wall. Existing code was brittle—converting a free-response field to multi-select was scoped as a feature. No A/B testing, no candidate tracking. Every program update stalled.

Of 2.9 million marketing page visitors in 2023, only 415 became program-inclined—a 0.014% conversion rate. Total annual vetting cost: $1.9M. $2.1M+ annually in lost candidate conversion entitlement. The team projected a 33% recruiting cost increase for 2024. The resource gap was the central problem: the work required 3.8 engineers; the team had 0.25.

## What the Benchmark Revealed

I identified Chick-fil-A's franchise application as the benchmark: 40,000 applicants per year, ~0.2% acceptance rate, same model (individual operators running a branded business). Then I applied—October 17, 2023. I documented every screen, cataloging each question by type and estimated completion time.

I then directed the entire Acquisitions team through the same process.

| Amazon Application                                                                             | CFA Application                                                                                          |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| ~80 fields, 65% free-text, open-ended essays, 3+ hours, inconsistent and unscoreable responses | 80+ fields, 75% structured dropdowns, numerical inputs, under 1 hour, scoreable and consistent responses |

The ANOVA confirmed it: the design, not the reviewers, produced the inconsistent scores. CFA collects _more_ data in _less_ time through better input design. The fix wasn't fewer questions. It was better questions.

## From Benchmark to Engineering Roadmap

I owned the work end-to-end: diagnosis, BRD, roadmap, and the annual operating plan escalation.

Central constraint: the 2024 engineering allocation was **0.25 engineers**. The work required **3.8**.

### Architecture Redesign

- Replaced open-ended essays with single-response structured inputs
- Eliminated resume upload; replaced with standardized work history fields
- Added upstream qualification gate (modeled on CFA's Expression of Interest)
- Designed modular, country-agnostic architecture: 7 programs, 20 markets, quarterly CMS updates without engineering
- Mobile-responsive redesign expanding reach from US/CA desktop-only to worldwide mobile-friendly

### Evidence Chain That Moved Resources

By the time I requested 3.8 engineers, leadership had seen the same evidence three times:

- **BRD**—101 requirements across 8 epics, each traceable to a CFA benchmark finding
- **Global DSP Tech Vision 2025**—executive narrative for senior leadership
- **Annual operating plan escalation** (co-authored)—I owned entitlement quantification and competitive framing

  0.25 → 3.8 engineers secured against $2.1M+ in annual entitlement.

## Three Technology Paths

The application needed to support 7 programs across 20 markets and cut change cycles from months to weeks. I evaluated three platform options and recommended the one that avoided both a full rebuild and a risky migration.

Three business drivers forced a technology decision: the platform needed multi-program support, form modifications took months when the team needed 2–3 week cycles, and every completion-rate point represented thousands of additional approved applications.

I evaluated three paths:

- **Third-party platform**—full control over form strategy and UX through a licensed solution, but required significant integration effort, vendor dependency, and ongoing licensing costs.
- **Salesforce with custom modules**—robust multi-program infrastructure and faster deployment, but integration with the existing management console created new dependencies and constrained the flexibility the team needed most.
- **Continue on the existing platform**—no migration risk, already integrated with current workflows, and the fastest path to worldwide expansion across all 20 markets.

I recommended the third path. The existing platform already integrated with every operational workflow. A migration would have stalled a program already scaling across 20 markets. Extending what worked was the fastest route to capturing the $2.1M+ entitlement.

## 9,419 More Approved Applications Per Year

I submitted one franchise application on a Tuesday night. Fourteen months later: 101 requirements, 15× the initial engineering allocation, $2.1M+ in annual entitlement across 20 countries.

_The engineering investment (0.25 → 3.8) is confirmed. Completion and inclination targets below are projections from the approved roadmap._

| Metric                      | Before         | Target (projected) |
| --------------------------- | -------------- | ------------------ |
| Application completion rate | 26%            | 60% (+130%)        |
| Program inclination rate    | 23%            | 46% (+100%)        |
| Completion time             | 3+ hours       | ≤1.5 hours         |
| Development cycle           | 10–12 months   | 3–4 months         |
| Engineering secured         | 0.25 engineers | 3.8 engineers      |
| Annual entitlement captured | —              | $2.1M+             |

9,419 additional approved applications per year (15,699 → 25,118). 365 more program-inclined candidates per year (421 → 786). The redesign removes 2,200+ hours from manual review annually. The team now updates the application quarterly without an engineering ticket.

## Lessons Worth Stealing

- **If you can't measure what's broken, benchmark the best—then apply as a customer.** I applied to the Chick-fil-A franchise program myself. Primary research builds conviction that secondary research never will.
- **Structured data beats more data.** CFA collects more data points in less time through better input design. The fix wasn't fewer questions—it was better questions.
- **Resource escalations win on evidence chains, not urgency.** BRD → Tech Vision → annual operating plan—each document cited the same benchmark. By the time I requested 3.8 engineers, leadership had seen the evidence three times.
- **Evaluate every path before committing.** Third-party, Salesforce, or extend what exists—each option had trade-offs. The right answer was the one that matched the constraint: scale across 20 markets without introducing migration risk.

> The application wasn't collecting bad data—it was asking the wrong kind of questions. The fix wasn't fewer questions. It was better ones.

---

Next: [Read next: Contract Transfer Process Redesign →](../contract-transfer/contract-transfer.html)

[Get in touch](../../index.html#contact)
