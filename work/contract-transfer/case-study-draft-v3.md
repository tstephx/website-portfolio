# Contract Transfer — Case Study Draft v3
> Status: DRAFT v3 — publication-ready, pending HTML conversion
> Revised: 2026-02-19

---

Amazon's $500M delivery network needed a reliable way to transfer business ownership — but a process built on tribal knowledge across eight teams, with no SOP and no standardized communications, was blocking every legitimate exit path. I reframed the program's purpose, rebuilt it from scratch in 14 weeks, and turned a reactive case queue into the infrastructure behind a $25M succession initiative.

---

## What the Organization Needed

The DSP Acquisitions team needed a reliable mechanism to transition ownership of delivery businesses — preserving network capacity, maintaining quality standards, and giving DSP owners a legitimate path to exit without abandoning their routes.

That required more than a better process. It required a different way of measuring the program. CT had been treated as a customer service function: a mechanism that existed to help individual DSP owners who asked for it. Framed that way, an 89% rejection rate looked like failure. Framed as network protection — a gatekeeping mechanism that prevented unqualified operators from acquiring routes and degrading capacity — that same 89% rate was evidence of the program working.

That reframe is what made everything else defensible.

---

## What Was Broken

Every failed transfer became a DSP exit. Every exit reduced network Capacity Reliability by 7.7%, with only 39.6% of routes recovered. The business was absorbing $482K–$504K per exit that a functioning program could have prevented.

Four compounding failures drove that number:

- **No one knew how it worked.** The process lived in tribal knowledge across eight teams — BCs, BDMs, Acquisitions, Legal, Network Health, DRR, DSS, Marketing Technology. Role boundaries were undefined. Decision authority was unclear. New cases were handled differently every time.
- **Candidates and owners were left in silence.** Only 4 standardized communications existed — all sent to candidates only. DSP owners received nothing. During high-stakes business transitions involving legal agreements, financial arrangements, and family dynamics, both parties routinely went weeks without contact.
- **Vetting was inconsistent and indefensible.** An 89% rejection rate with no rubric behind it. Disqualifying factors were caught at different stages depending on who reviewed the case — wasting time on both sides and creating legal exposure on rejections that couldn't be documented.
- **Every failed transition became an exit.** At $482K–$504K per exit, that cost compounded fast.

When I inherited the program in Q3 2022, there were 29 active cases, a 15-case backlog, and no documentation anywhere.

---

## Taylor's Role

I was a single point of failure holding together an undocumented process across eight teams with no institutional knowledge recorded anywhere.

The mandate: transform CT from a reactive case queue into a scalable, defensible operating system. No additional headcount. No dedicated tech resources. Everything built from scratch.

---

## What the Organization Got

### 70% faster decisions. Here's how.

I designed a 14-week, 21-milestone framework spanning five phases: Notification → Intake → Vetting → Approvals → Onboarding. Each phase had defined SLAs, explicit ownership assignments, and documented handoff criteria.

The vetting sequence was front-loaded by design — cheapest gates first:

1. Application review against a 6-dimension rubric (automatic disqualifiers defined)
2. Background and credit check
3. HireVue video assessment
4. Enhanced vetting via DRR
5. Station visit
6. Interview loop

This sequencing meant the 89% of candidates who didn't qualify were identified in days, not months — before the expensive stages.

### 689 attributes tracked. Six defect categories identified.

I built a SQL-based analytics system tracking 689 data attributes across 209 candidate records — enabling WBR dashboards and the first root-cause analysis of where the process actually failed. Six defect categories were identified and attributed: Credit Before Review (56% of defects), Phone Scheduling Backlog (20%), EV Sequence Errors (12%), Decision SLA Breach (12%).

This wasn't reporting for its own sake. It was the mechanism that made "the process works" or "the process is broken" a provable statement rather than an opinion.

### 19 templates. Zero unexplained silences.

I authored 19 email templates covering every lifecycle state for both DSP owners and candidates — intake confirmation, phase progression, 2-week cadence updates, rejection at each stage, conditional approval, onboarding kickoff. Separate tracks, separate tone, legally reviewed language throughout.

Moving from 4 candidate-only emails to 19 templates covering both audiences eliminated the extended silences that drove escalations — and the legally reviewed language protected Amazon's position on every rejection, critical when 4 in 5 third-party candidates were being declined.

### Any PM could pick it up and run it.

I authored a complete operational toolkit: CT Process Playbook, BC/BDM Playbook with role boundaries and talking points, Application Review Rubric, HireVue Assessment Rubric, Interview Question Bank, Survivorship framework (4 sub-scenarios with graduated vetting requirements), and a Buyer Supplementary Questionnaire capturing deal-specific data the standard application missed. 13 appendix artifacts total.

The program's survival no longer depended on any single person.

### 100% consensus required. No ambiguity about who approved what.

I designed a 5-stakeholder consensus approval model — BC Manager, Acquisitions Manager, NH Manager, Legal, NH Director — requiring unanimous agreement before any transfer was confirmed. No single point of decision failure. No individual who could later claim they hadn't approved a transfer they had.

---

## The Decision That Changed the Program

In Q3 2022, I had two ways to frame the program's purpose.

**Option A:** CT is a customer service function. Its job is to help DSP owners who request a transfer. Success means requests processed, candidates served, owners satisfied. Under this framing, an 89% rejection rate is damning — the program is failing the people it exists to serve.

**Option B:** CT is a network protection mechanism. Its job is to ensure that only qualified operators acquire DSP routes. Success means the network stays intact, bad transfers don't happen, and every approved candidate meets the bar. Under this framing, an 89% rejection rate is evidence the program is working.

I chose Option B — and built the entire operating system around it.

This wasn't the obvious path. Framing CT as network protection meant defending high rejection rates to stakeholders who would have preferred faster approvals. It meant measuring success in exit costs avoided, not cases closed. It meant the program's value was invisible when it was working correctly — a prevented exit leaves no trace.

But it was the only framing that made the SOP defensible. It was the only framing that could justify a 100% consensus approval model. And it was the only framing under which I could argue — successfully, to leadership — that CT deserved to become formal succession infrastructure for a $25M initiative, rather than remaining a low-priority case queue.

The $13M in avoided exit costs? That number only exists because someone decided to count exits prevented, not transfers approved.

---

## The Outcome

| Metric | Inherited | Built |
|--------|-----------|-------|
| Annual case volume | 5 (2020) / 29 (2021) | 63+ |
| Backlog | 15 cases | 0 |
| Standardized owner communications | 0 | 19 templates |
| Process documentation | None | SOP + 13 appendices |
| Data infrastructure | None | 689 attributes, 6 defect categories |
| Median time to decision | 9.6 weeks (2021) | 2.9 weeks (2023) — 70% reduction |
| Non-3P post-transfer quality | Unknown | +1,800 bps vs. network average |
| Exit cost avoidance | Baseline | $13M (29 approved transfers) |

Decision time dropped 70% — from a median of 9.6 weeks to 2.9 weeks — not because the bar was lowered, but because stage gates finally caught unqualified candidates in days instead of months.

At $482K–$504K per DSP exit, 29 successful transfers represents $13M in costs the network didn't absorb — and 29 routes that never dropped off capacity.

The SOP became the foundation for the 2025 Legacy Transfer strategy — a leadership-level initiative to formalize internal succession pathways, targeting a 70% approval rate, 72 quality exits reduced to 20 annually, and $25M in avoided costs by 2026. I'm named owner of three of four implementation workstreams.

---

*A process held together by one person's tribal knowledge is not a process — it's a liability. What the organization got wasn't just a playbook. It was proof, in data, that ownership transitions are worth doing — and the infrastructure to make that case at every level of the business.*

---

---

## Reusable Extracts

---

### 1. Headline Card

**Amazon's delivery network had no way to hand a business from one owner to another — until the process that was failing 89% of candidates got rebuilt, reframed, and turned into the infrastructure behind a $25M succession initiative.**

---

### 2. LinkedIn Post

Amazon's $500M delivery network had no structured way to transfer a business from one DSP owner to another. When I inherited the program, there were 29 active cases, a 15-case backlog, zero documentation, and a 9.6-week average decision time.

The fix wasn't faster processing. It was a different question: are we here to serve the owners who ask, or to protect the network from operators who shouldn't own routes?

Reframing the program's purpose changed what "success" meant — and unlocked the operating system, the data infrastructure, and the approval model that followed.

Three years later: 70% faster decisions, $13M in avoided exit costs, and the same framework is now the foundation for a $25M leadership initiative.

The hardest part wasn't building the process. It was making the case that the right metric was exits prevented, not transfers approved.

---

### 3. Three-Bullet Summary

- Rebuilt Amazon's contract transfer program from scratch — no SOP, no templates, no documentation — into a 14-week, 21-milestone operating system with SQL analytics tracking 689 attributes across 209 candidate records
- Cut median decision time 70% (9.6 weeks to 2.9 weeks) and generated $13M in avoided DSP exit costs across 29 approved transfers
- Reframed the program's purpose from customer service to network protection, securing leadership endorsement and becoming the named owner of 3 of 4 workstreams in a $25M succession initiative

---

## Changes Made and Why

**Lede rewritten as one-sentence test.**
V2 opened with a bold statement about the problem, then took several paragraphs to establish stakes. V3 opens with the combined arc — problem, action, outcome, lasting change — in two sentences. Portfolio readers are skimming; the argument has to land in the first 30 words.

**Sections relabeled to "What the Organization Got" with metric-first subheads.**
V2 used "What Taylor Built" with step numbers. V3 drops the step framing and leads each subhead with a number ("70% faster decisions," "689 attributes tracked," "19 templates"). Readers see the win before they read the explanation. This matches how hiring managers actually skim case studies.

**Ellet hedging removed throughout.**
V2 included analytical framing like "This was not an obvious choice" and "decision criteria" language. V3 keeps the tension in the decision section but removes academic hedging. Confidence reads better than intellectual balance in a portfolio context.

**All [NOTE: ...] inline scaffolding stripped.**
V2 was a working draft with reasoning visible. V3 is publication-ready.

**Voice shifted to first person.**
V2 used "Taylor" throughout (third person, appropriate for draft review). V3 uses "I" — consistent with the portfolio site's first-person voice per Flag 3 in v2.

**Decision section voice stays assertive.**
The "Option A / Option B" structure from v2 was strong and kept. The framing as a genuine choice under real constraints survives intact — but without the Ellet-style "I acknowledge the downsides" close.

**Closing reframe preserved, repositioned.**
"What This Story Is Really About" became the final paragraph of the body, set as a closing pull quote rather than a labeled section. Section labels break the flow at the end; the thought lands harder without a header announcing it.

**Three reusable extracts appended.**
Headline card, LinkedIn post (5 sentences, no emoji, no platitudes), and 3-bullet summary — all keyed to the same core metrics and framing as the body.

**Legacy Transfer numbers grounded.**
The closing now specifies the three Legacy Transfer targets (70% approval rate, 72 exits reduced to 20, $25M by 2026) rather than gesturing at "$25M initiative." Concrete numbers make the strategic bet legible.
