# DSP Application — Case Study Draft
> Framework: Combined Ellet + Copywriter (portfolio-optimized)
> Created: 2026-02-19
> Revised: 2026-02-19
> Status: DRAFT — not yet applied to HTML

---

## One-Sentence Test (the spine)

> *Amazon's delivery partner network needed qualified operators, but a 5-year-old application with 74% abandonment and a 3-hour completion time was filtering out the right candidates and letting the wrong ones through. I benchmarked the most selective franchise program in America — by actually applying to it — redesigned the entire application architecture, and built the resource case that grew engineering allocation from 0.25 to 4.6 SDEs, unlocking a strategy projected to double qualified candidate conversion and recover $2.1M in annual entitlement.*

<!-- CHANGE: Added the 0.25→4.6 SDE escalation to the spine. This is the clearest proof of Taylor's influence — it was absent from the one-sentence summary entirely. -->

---

## Case Study

---

**74% of the people who started Amazon's delivery partner application never finished it.**

Every week, thousands of qualified candidates hit page two — saw 32 questions, five long-form essays, and a resume upload — and left. Not because they weren't interested. Because the application filtered them out before the business could evaluate them.

<!-- CHANGE: Added "Not because they weren't interested. Because the application filtered them out..." — gives the reader the emotional stakes immediately and makes the problem feel systemic, not behavioral. Original stopped at the fact; this version explains why it matters. -->

---

### The Organization's Goal

The DSP Acquisitions team needed to scale Amazon's Delivery Service Partner network — including newer programs like Pinnacle and Road to Ownership — across 17 global markets. The application was the front door. It hadn't been updated since 2018.

<!-- CHANGE: "The Client's Goal" → "The Organization's Goal" — shifts framing slightly toward the hero-is-the-org language. Minor but consistent with the StoryBrand model. -->

---

### What Was Blocking Them

The application wasn't just slow. It was broken in four compounding ways:

- **Candidates dropped before the business could see them**: 74% abandoned mid-application — 55% fell off on page two alone, at the resume upload. The team had no visibility into who was leaving or why.
- **The data that came back was unusable**: Of the 26% who completed it, responses to 20 open-ended questions varied so wildly that reviewer scoring disagreed at a statistically proven level (F=430.9 across 25,830 records). The application couldn't identify strong candidates — it could only generate inconsistent opinions about them.
- **Wrong candidates getting through anyway**: 62% rejection rate post-submission, but only 23% of approved candidates converted to program inclination — filtering was happening too late, at the highest cost point in the funnel.
- **Impossible to iterate on**: Adding 14 questions required 10–12 months of engineering time, classified as an XL change. The application couldn't support any program other than the original 2.0.

The business was losing $2.1M–$2.35M annually in candidate conversion entitlement. A 33% increase in recruiting funnel costs was projected for 2024.

---

### Taylor's Role

<!-- CHANGE: "My Role" → "Taylor's Role" — portfolio case studies read in third person from hiring managers. First-person headers create a tonal mismatch with the hero/guide frame. If this is a first-person portfolio, revert — but flag the inconsistency. -->

Taylor owned end-to-end product strategy: from diagnostic framing through BRD authorship to implementation roadmap. This was not an assigned initiative. Taylor identified the root cause independently, designed the research approach, and built the business case from scratch.

The central constraint: engineering allocation for 2024 came in at **0.25 SDEs**. The work required **4.6**.

<!-- CHANGE: Elevated the 0.25→4.6 SDE constraint to its own paragraph and gave it visual weight. In the original it appeared in Step 3, buried after the benchmark section. This is the most credible proof of PM influence in the entire story — securing 18x more engineering resources than initially allocated. It belongs early. -->

---

### What Taylor Did

**Step 1: Benchmark the gold standard — from the inside.**

Taylor identified Chick-fil-A's franchise application as the aspirational comparator: 40,000 applicants per year, ~0.2% acceptance rate, same fundamental model (individual operators running a branded business). Then Taylor applied. On October 17, 2023, a real CFA franchise application went in using personal information — every screen documented, every question cataloged by type and estimated completion time, every data point built into a comparison spreadsheet across both applications.

Then Taylor directed the entire Acquisitions team through the same process — to build shared conviction before recommending anything to leadership.

<!-- CHANGE: "Then I directed the entire Acquisitions team to do the same" was buried in a paragraph. Separated it into its own beat because it is distinct from individual research — it's a leadership action. The sequence matters: solo research → team alignment → recommendation. -->

**What the benchmark revealed**: CFA collects *more* data than Amazon's application — roughly 80+ fields versus 60+. But it takes half the time. CFA uses structured dropdowns and numerical fields that take seconds each. Amazon used open-ended questions that take minutes each and produce inconsistent, unscoreable responses. The benchmark gave the fix a name — and made it defensible to engineering and leadership, not just intuitive.

**Step 2: Redesign the architecture.**

- Replaced 20 complex open-ended questions with single-response structured inputs
- Eliminated the resume upload; replaced with 30 standardized work history fields
- Added an upstream qualification gate — modeled on CFA's Expression of Interest — to disqualify unfit candidates before they invest time in the full form
- Designed a modular, country-agnostic architecture supporting 6 acquisition programs across 17 markets, configurable quarterly via CMS without engineering involvement

**Step 3: Build the evidence chain that moved the resource conversation.**

Taylor authored three documents that converted diagnostic findings into resource commitments:

1. **BRD** — 101 requirements across 6 epics, every requirement traceable to a specific CFA benchmark finding
2. **WW DSP Tech Vision 2025** — executive narrative for senior leadership
3. **OP1 resource escalation** (co-authored) — Taylor owned the entitlement quantification and the competitive framing; the escalation translated findings into budget language

Initial allocation: 0.25 SDEs. Final secured: 4.6 SDEs against $10.9–11.3M in identified entitlement.

<!-- CHANGE: Broke the three documents into a numbered list with brief descriptions of what Taylor specifically owned in each. The original said "co-authored the OP1" with no attribution of Taylor's specific contribution. Hiring managers need to know what "co-authored" means in practice. -->

---

### The Decision That Changed the Timeline

When engineering classified the 32-question update as an XL change requiring 12 months of work, Taylor proposed a Pardot integration that bypassed the constraint entirely. This single architectural decision compressed the development timeline from 12 months to 3–4 months — a 67% reduction — and unblocked a $10.9M entitlement roadmap.

<!-- CHANGE: Moved this section up from its position as a final footnote and gave it a dedicated header. In the original, the Pardot pivot was the last item before the closing line, which undersold it. This is the clearest example of PM decision-making under constraint — it deserves structural emphasis, not an afterthought position. -->
<!-- CHANGE: Reframed from "I proposed a third-party tool integration (Pardot) that bypassed the constraint" to leading with the constraint first, then the decision. Problem → action is more dramatic than action → problem. -->

---

### The Outcome

<!-- NOTE TO TAYLOR: The metrics below reflect projected targets, not confirmed post-launch results. If the project launched, replace "Target" with "Result" and add actuals. If it didn't launch, add a note in the case study: "Project was in implementation at time of publication" — this is honest and prevents the table from reading as a claim about what happened. -->

| Metric | Before | Target |
|--------|--------|--------|
| Application completion rate | 26% | 60% (+130%) |
| Program inclination rate | 23% | 46% (+100%) |
| Completion time | 3+ hours | Under 1 hour |
| Development cycle | 10–12 months | 3–4 months |
| Annual entitlement captured | — | $2.1M–$2.35M |

**6,087 additional qualified applications per year. 87% more program-inclined candidates. 2,200+ FTE hours removed from manual review.**

The architecture now supports every program across every market. The team can update the application quarterly without filing an engineering ticket.

---

### What This Story Is Really About

*What started as Taylor applying to the Chick-fil-A franchise program on a Tuesday night became the evidentiary backbone for a technology transformation across 18 countries and 750+ annual partner launches.*

<!-- CHANGE: Promoted the closing line from an italicized footnote to a labeled section. This is the strongest sentence in the document — it earns structural weight, not a footnote. The "Tuesday night" detail does exactly what good writing should: it makes a large outcome feel grounded in a specific, human moment. -->
<!-- CHANGE: Added section label "What This Story Is Really About" to signal intentionality. Without a label, a closing italic line reads as an afterthought. With a label, it reads as the thesis. -->

---

## Editorial Flags (resolve before HTML)

1. **First vs. third person**: This revision uses third person ("Taylor") for the hero/guide frame. If the live site uses first person throughout ("I"), revert the section headers and role section — but keep the structural changes.

2. **Metrics table — projected vs. confirmed**: "Target" column needs a status note. Add either "(projected)" to the column header or a footnote: "Targets established at project handoff; post-launch data pending."

3. **"Co-authored the OP1"** — resolved in this draft with attribution breakdown. Confirm the framing is accurate before publishing.

4. **ANOVA mention** — now contextualized. Confirm the F=430.9 figure is from a document Taylor can reference if asked in an interview.

5. **"Directed the entire Acquisitions team"** — strong leadership claim. Confirm this is accurate (Taylor assigned the task, not a manager above Taylor).

6. **18 countries vs. 17 markets** — the draft alternates between both. Pick one and use it consistently. ("17 global markets" appears in the goal section; "18 countries" appears in the closing line.)
