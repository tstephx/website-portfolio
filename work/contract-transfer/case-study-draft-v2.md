# Contract Transfer — Case Study Draft v2
> Framework: Combined Ellet + Copywriter (portfolio-optimized)
> Revised: 2026-02-19
> Status: DRAFT v2 — pending review before HTML
> Changes from v1 noted inline as [NOTE: ...]

---

## One-Sentence Test (the spine)

> *Amazon's $500M delivery network had no structured way to transfer business ownership — a process held together by tribal knowledge across eight teams, with no SOP, no communications to DSP owners, and every failed transition costing $482K–$504K in exit costs. Taylor inherited 29 active cases and a 15-case backlog in Q3 2022, reframed the program's purpose from customer service to network protection, built a 14-week operating system from scratch, and transformed CT into the infrastructure behind a $25M strategic initiative.*

[NOTE: Added "reframed the program's purpose from customer service to network protection" — this is the missing strategic action that connects the operational work to the leadership endorsement. Without it, the case study reads as a documentation project rather than a strategic repositioning.]

---

## Case Study

---

**Amazon's $500M delivery network had no way to hand a business from one owner to another.**

When a DSP owner wanted to retire, bring in a family member, or sell to an employee, there was no structured path. What existed was a process built for arm's-length third-party sales — inconsistent, undocumented, and held together by tribal knowledge across eight teams. When Taylor inherited it in Q3 2022, there were 29 active cases and a 15-case backlog. There was no SOP. There were zero standardized communications to DSP owners. And every DSP exit the program failed to prevent cost Amazon an average of $482K–$504K and degraded network capacity by 7.7%.

The process wasn't just broken. It was measured wrong.

[NOTE: Added the final sentence as a bridge to the reframe section below. Per Ellet's principle: position the central insight early, before the evidence. The draft previously buried this entirely — it only appeared in the context doc under "influenced without authority." This is the thesis.]

---

### What the Organization Needed

[NOTE: Renamed from "The Organization's Goal" — "needed" is more specific and implies urgency, which matches the evidence. Also reordered: original draft had the goal section before the breakdown section; this version leads with the full diagnosis before stating what was required, so the reader understands the stakes before the ask.]

The DSP Acquisitions team needed a reliable mechanism to transition ownership of delivery businesses — preserving network capacity, maintaining quality standards, and giving DSP owners a legitimate path to exit without abandoning their routes.

But to solve it, someone first had to reframe what the program was for. CT had been treated as a customer service function: a process that existed to help individual DSP owners who asked for it. Framed that way, an 89% rejection rate looked like poor service. Framed as network protection — a gatekeeping mechanism that prevented unqualified operators from acquiring routes and degrading capacity — that same 89% rate was evidence of the program working. That reframe is what made everything else defensible.

---

### What Was Broken

The inherited process failed in four compounding ways:

- **No one knew how it worked.** The process lived in tribal knowledge across eight teams — BCs, BDMs, Acquisitions, Legal, Network Health, DRR, DSS, Marketing Technology. Role boundaries were undefined. Decision authority was unclear. New cases were handled differently every time.
- **Candidates and owners were left in silence.** Only 4 standardized communications existed — all sent to candidates only. DSP owners received nothing. During a high-stakes business transition involving legal agreements, financial arrangements, and family dynamics, both parties routinely went weeks without any contact.
- **Vetting was inconsistent and indefensible.** An 89% overall rejection rate with no rubric behind it. Disqualifying factors were caught at different stages depending on who reviewed the case — wasting candidate time, team time, and creating legal exposure on rejections that couldn't be explained.
- **Every failed transition became an exit.** DSP exits reduced network Capacity Reliability by 7.7%, with only 39.6% of routes recovered. The remaining 60.4% were rerouted at higher cost or covered by expensive third-party solutions.

The business was absorbing $482K–$504K per DSP exit that a functioning CT process could have prevented.

[NOTE: Changed "creating defensibility risk on rejections" to "creating legal exposure on rejections that couldn't be explained" — the original phrase is jargon. The plain language version is sharper and more alarming to a reader who isn't an Amazon PM.]

---

### Taylor's Role

Taylor inherited the program as a single-point-of-failure operation — one person holding together an undocumented process across eight teams, with no institutional knowledge documented anywhere.

The mandate: transform CT from a reactive case queue into a scalable, defensible operating system. No additional headcount. No dedicated tech resources. Everything built from scratch.

[NOTE: This section is clean and should stay. The constraint callout (no headcount, no tech) is appropriately placed and specific. Do not expand it here — the constraints are reinforced by showing scale of delivery in the action sections.]

---

### What Taylor Built

[NOTE: Renamed from "What Taylor Did" — "Built" rather than "Did" keeps Taylor as guide (builder of infrastructure the org needed) rather than protagonist. Small word-level reframe that accumulates across the whole piece.]

**Step 1: Clear the inherited mess, map the actual system.**

The 15-case inherited backlog was cleared by end of Q3 2022 through systematic triage — categorizing cases by type, stage, and blocking issue, then working each to resolution. This wasn't just cleanup. It was the diagnostic. Working through 15 stalled cases revealed exactly where the process broke down: unclear intake criteria, undefined role boundaries, no stage-gate logic, no communication cadence.

**Step 2: Build the operating system.**

Taylor designed the CT process from scratch — a 14-week, 21-milestone framework spanning five phases: Notification → Intake → Vetting → Approvals → Onboarding. Each phase had defined SLAs, explicit ownership assignments, and documented handoff criteria.

The vetting sequence was front-loaded by design — cheapest gates first:

1. Application review against a 6-dimension rubric (automatic disqualifiers defined)
2. Background and credit check
3. HireVue video assessment
4. Enhanced vetting via DRR
5. Station visit
6. Interview loop

This sequencing meant the 89% of candidates who didn't qualify were identified early — before the expensive stages.

**Step 3: Build the data infrastructure.**

Taylor built a SQL-based analytics system tracking 689 data attributes across 209 candidate records — enabling WBR dashboards and the first root-cause analysis of where the process actually failed. Six defect categories were identified and attributed: Credit Before Review (56% of defects), Phone Scheduling Backlog (20%), EV Sequence Errors (12%), Decision SLA Breach (12%). This wasn't reporting for its own sake — it was the mechanism that made "the process works" or "the process is broken" a provable statement rather than an opinion.

[NOTE: This entire step was missing from v1. The SQL infrastructure is the reason Taylor could measure the process at all, and the defect tracking is what created the improvement feedback loop. Without it, the SOP is a document. With it, it's a system. This is also what supports the "2 weeks to decision" claim in the outcome table — that number had to come from somewhere.]

**Step 4: End the silence.**

Taylor authored 19 email templates covering every lifecycle state for both DSP owners and candidates — intake confirmation, phase progression, 2-week cadence updates during review periods, rejection at each stage, conditional approval, onboarding kickoff. Separate tracks, separate tone, legally reviewed language throughout.

Moving from 4 candidate-only emails to 19 templates covering both audiences eliminated the extended silences that drove escalations — and the legally reviewed language protected Amazon's position on every rejection, critical when 4 in 5 third-party candidates were being declined.

[NOTE: Added "protected Amazon's position on every rejection, critical when 4 in 5 third-party candidates were being declined" — the legal dimension was mentioned in the evidence doc but absent from v1. It's what makes the communication redesign more than a customer experience improvement.]

**Step 5: Decentralize the knowledge.**

Taylor authored a complete operational toolkit: CT Process Playbook, BC/BDM Playbook with role boundaries and talking points, Application Review Rubric, HireVue Assessment Rubric, Interview Question Bank, Survivorship framework (4 sub-scenarios with graduated vetting requirements), and a Buyer Supplementary Questionnaire capturing deal-specific data the standard application missed.

13 appendix artifacts. Any new CT PM, BC, or BDM could pick up the playbook and execute without institutional knowledge transfer — the program's survival no longer depended on any single person.

[NOTE: Added the final clause — "the program's survival no longer depended on any single person" — to link back to the single-point-of-failure setup in Taylor's Role. Per Copywriter framework: success should feel like resolution of the opening problem, not just a list of outputs.]

**Step 6: Define what "approved" means.**

Taylor designed a 5-stakeholder consensus approval model — BC Manager, Acquisitions Manager, NH Manager, Legal, NH Director — requiring 100% agreement before any transfer was confirmed. No single point of decision failure. No ambiguity about who had authority. And no individual who could later be claimed to have approved something they hadn't.

[NOTE: Added the final sentence. The legal/political dimension of distributed approval (no one can be scapegoated) was implied in the evidence doc but not made explicit in v1. It sharpens the "why this mattered" argument.]

---

### The Decision That Changed the Program

[NOTE: Renamed from "The Decision That Held It Together" — "Held It Together" sounds like survival; "Changed the Program" signals agency. Also substantially rewrote the content. See below.]

In Q3 2022, Taylor had two ways to frame the program's purpose.

Option A: CT is a customer service function. Its job is to help DSP owners who request a transfer. Success means requests processed, candidates served, owners satisfied. Under this framing, an 89% rejection rate is damning — the program is failing the people it exists to serve.

Option B: CT is a network protection mechanism. Its job is to ensure that only qualified operators acquire DSP routes. Success means the network stays intact, bad transfers don't happen, and every approved candidate meets the bar. Under this framing, an 89% rejection rate is evidence the program is working.

Taylor chose Option B — and built the entire operating system around it.

This was not an obvious choice. Framing CT as network protection meant defending high rejection rates to stakeholders who would have preferred faster approvals. It meant measuring success in exit costs avoided, not cases closed. It meant the program's value was invisible when it was working correctly — a prevented exit leaves no trace.

But it was the only framing that made the SOP defensible. It was the only framing that could justify a 100% consensus approval model. And it was the only framing under which Taylor could argue — successfully, to leadership — that CT deserved to become formal succession infrastructure for a $25M initiative, rather than remaining a low-priority case queue.

The $13M in avoided exit costs? That number only exists because someone decided to count exits prevented, not transfers approved.

[NOTE: This is a complete rewrite. The v1 version described a documentation discipline decision about the HireVue bottleneck — accurately, but it was a process management detail, not a pivot. The real decision was the strategic reframe, which is documented explicitly in the context doc under "Influenced without authority: Reframed CT from customer service to network protection function, fundamentally changing success metrics and securing leadership endorsement." That's the harder moment. It involves real risk, a genuine alternative, and a consequence that shapes everything downstream. Per Ellet: acknowledge constraints, make the decision logic explicit. Per Copywriter: a pivot should feel like a choice made under pressure, not an obvious next step.]

---

### The Outcome

| Metric | Inherited | Built |
|--------|-----------|-------|
| Annual case volume | 5 (2020) / 29 (2021) | 63+ |
| Backlog | 15 cases | 0 |
| Standardized owner communications | 0 | 19 templates |
| Process documentation | None | SOP + 13 appendices |
| Data infrastructure | None | 689 attributes tracked, 6 defect categories |
| Median time to decision | 9.6 weeks (2021) | 2.9 weeks (2023) — 70% reduction |
| Non-3P post-transfer quality | Unknown | +1,800 bps vs. network average |
| Exit cost avoidance | Baseline | $13M (29 approved transfers) |

[NOTE: Three changes to the table. (1) Added 5 cases (2020) baseline to show the full volume growth story — 5→29→63+ is a more dramatic arc than just 29→63+. (2) Added the data infrastructure row — it was missing entirely from v1. (3) Changed "Time to decision: 4+ months → 2 weeks" to "Median time to decision: 9.6 weeks → 2.9 weeks — 70% reduction" using the actual data from the evidence doc. The 4-months figure was an anecdote from one CAG member in 2020; the 9.6→2.9 week figure is from Taylor's own tracker data, n=6 and n=24. More defensible and more specific. Flag: verify 63+ is current as of filing date.]

**Every approved transfer is an exit that didn't happen.** At $482K–$504K per DSP exit, 29 successful transfers represents $13M in costs Amazon didn't absorb — and 29 routes that never dropped off the network.

Decision time dropped 70% — from a median of 9.6 weeks to 2.9 weeks — not because the bar was lowered, but because the process finally had stage gates that caught unqualified candidates in days instead of months.

[NOTE: Added the second paragraph to pull the "time to decision" number out of the table and give it prose emphasis. This is the most visceral metric in the piece — a 70% reduction in decision time is the proof that the system works operationally, not just strategically. It was buried in v1.]

The SOP became the foundation for the 2025 Legacy Transfer strategy — a leadership-level initiative to formalize internal succession pathways, projecting $25M in avoided exit costs by 2026. Taylor is named owner of three of four implementation workstreams.

---

### What This Story Is Really About

*A program held together by one person's tribal knowledge is not a program — it's a liability. What Taylor built wasn't just a process. It was the argument, proven in data, that ownership transitions are worth doing — and the infrastructure that lets the program survive, scale, and become the foundation for a $25M strategic initiative.*

[NOTE: Added "the argument, proven in data, that ownership transitions are worth doing" — this links the strategic reframe decision to the final outcome. The SOP's most important product wasn't documentation; it was proof of concept. The Ellet framework requires that the position statement in the conclusion connect to the opening problem. The opening problem was: the program existed but didn't work. The resolution is: it now works AND it proved its own value well enough to drive a $25M initiative.]

---

## Flags (resolve before HTML)

1. **63+ cases** — confirm this is the current number. The context doc says 2024-2025, not necessarily current.
2. **$13M exit cost avoidance** — spans 29 transfers since 2019 total, not all under Taylor's tenure as builder. Consider adding "since program inception" for accuracy, or narrow to Taylor's tenure if a smaller number is available.
3. **First vs. third person** — draft uses "Taylor" throughout; revert to "I" if site is first-person.
4. **HireVue bottleneck** — retained in evidence doc but removed from Decision section. If you want a tactical decision moment as a second example, the HireVue documentation choice is a good secondary callout. It was dropped here because the strategic reframe is the stronger story, but both can coexist if the section has space.
5. **BC SME network** — Taylor's decision to build a 3-BC specialist network rather than train all BCs broadly is a notable structural design choice not mentioned in this draft. Low priority for the current structure, but worth a one-sentence mention in Step 5 (Decentralize) if word count allows.
6. **Legacy Transfer projected metrics** — the 2025 targets (70% approval rate, -70% exits, $25M savings) are available and concrete. The closing section currently gestures at "$25M strategic initiative" without grounding it. Consider adding 1 sentence: "The Legacy Transfer targets: 70% approval rate (up from 36%), 72 quality exits reduced to 20 annually, $25M in avoided costs by 2026." These numbers make the strategic bet legible.
