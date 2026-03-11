# DSP Application Redesign

_Auto-generated from dsp-application.html — do not edit directly._

**Meta description:** 74% of people who started the delivery partner application never finished it. Competitive intelligence from a franchise benchmark led to a 101-requirement redesign targeting $2.1M+ in annual entitlement.

**Tagline:** Competitive Intelligence | $2.1M+ in Annual Entitlement | 20 Global Markets

**Scope:** Oct 2023–Q1 2024 · Program Manager, DSP Acquisitions (self-directed) · Acquisitions, Engineering, Senior Leadership

---

## The $2.1M+ Problem

The Delivery Service Partner (DSP) Acquisitions team needed to scale Amazon’s partner network across 20 global markets. The application—unchanged since 2018—was broken in six ways:

Of 2.9 million marketing page visitors in 2023, only 415 became program-inclined—a 0.014% conversion rate. Total annual vetting cost: $1.9M. $2.1M+ annually in lost candidate conversion entitlement. The team projected a 33% recruiting cost increase for 2024. The resource gap was the central problem: the work required 3.8 engineers; the team had 0.25.

- 74% abandonment—55% dropped at the Education, Military & Work History section—the page requiring the resume upload. No visibility into who dropped, at which step, or why.
- Poor candidate data quality—32 questions—including 5 long-form essays—produced inconsistent responses across 25,830 records. Resume uploads contained experience data locked in unstructured PDFs—unreadable by any scoring system. A one-way ANOVA across six reviewers returned F&nbsp;=&nbsp;430.9 (p&nbsp;<&nbsp;2e-16)—the application design, not reviewer judgment, was the root cause.
- Wrong candidates getting through—62% rejection rate post-submission, but only 23% of approved candidates showed program interest. At $319 per final interview versus $15 at application review, the program filtered a full stage too late.
- Misrouted applicants—candidates searching for the DSP program landed on the Delivery Driver application instead, losing qualified leads before they reached the right form.
- Broken UX—not mobile-friendly despite majority mobile traffic. Question difficulty sequenced easy–hardest–medium instead of progressive. No tooltips, no input guardrails, no confirmation step validation. Email couldn’t match an existing Amazon account, forcing applicants to create throwaway addresses. Questions reflected 2018 program needs while the business had evolved through 2024.
- Costly to iterate—updating 10 questions flagged as a &ldquo;large&rdquo; engineering effort. Adding new questions hit the same wall. Existing code was brittle—converting a free-response field to multi-select was scoped as a feature. No A/B testing, no candidate tracking. Every program update stalled.

## What the Benchmark Revealed

I identified Chick-fil-A’s franchise application as the benchmark: 40,000 applicants per year, ~0.2% acceptance rate, same model (individual operators running a branded business). Then I applied—October 17, 2023. I documented every screen, cataloging each question by type and estimated completion time.

I then directed the entire Acquisitions team through the same process.

## From Benchmark to Engineering Roadmap

I owned the work end-to-end: diagnosis, BRD, roadmap, and the annual operating plan escalation.

Central constraint: the 2024 engineering allocation was 0.25 engineers. The work required 3.8.

By the time I requested 3.8 engineers, leadership had seen the same evidence three times:

0.25 → 3.8 engineers secured against $2.1M+ in annual entitlement.

- Replaced open-ended essays with single-response structured inputs
- Eliminated resume upload; replaced with standardized work history fields
- Added upstream qualification gate (modeled on CFA’s Expression of Interest)
- Designed modular, country-agnostic architecture: 7 programs, 20 markets, quarterly CMS updates without engineering
- Mobile-responsive redesign expanding reach from US/CA desktop-only to worldwide mobile-friendly
- BRD—101 requirements across 8 epics, each traceable to a CFA benchmark finding
- Global DSP Tech Vision 2025—executive narrative for senior leadership
- Annual operating plan escalation (co-authored)—I owned entitlement quantification and competitive framing

## Three Technology Paths

## 9,419 More Approved Applications Per Year

## Lessons Worth Stealing

- If you can’t measure what’s broken, benchmark the best—then apply as a customer. I applied to the Chick-fil-A franchise program myself. Primary research builds conviction that secondary research never will.
- Structured data beats more data. CFA collects more data points in less time through better input design. The fix wasn’t fewer questions—it was better questions.
- Resource escalations win on evidence chains, not urgency. BRD → Tech Vision → annual operating plan—each document cited the same benchmark. By the time I requested 3.8 engineers, leadership had seen the evidence three times.
- Evaluate every path before committing. Third-party, Salesforce, or extend what exists—each option had trade-offs. The right answer was the one that matched the constraint: scale across 20 markets without introducing migration risk.
