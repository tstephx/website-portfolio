# When 89% of Candidates Fail, the Question Isn't Speed — It's Whether That Number Should Be Lower

[CT Program Owner & Process Architect | $500M Delivery Network | 8 Teams, Zero Documentation | Solo]
Tech: SQL analytics, process architecture, SOP design, stakeholder governance

---

## Scope

<!-- component: scope-callout (ref/components.md) — replaces "Taylor's Role" section -->

- Role: CT Program Manager, DSP Acquisitions
- Timeline: Q3 2022-2025
- Teams: 8 cross-functional
- Artifacts: SOP + 13 appendices + 19 templates + SQL analytics
- Constraint: No additional headcount, no dedicated tech resources

## A $504K Problem No One Had Written Down

<!-- was: "What the Organization Needed" -->

The DSP Acquisitions team needed a way to transition business ownership — one
that preserved delivery network integrity and maintained quality, while
providing owners an equity exit path.

It required a different way of measuring the program. CT had been treated as a
customer service function. Framed as network protection, the same 89% rejection
rate was evidence of the program working.

<!-- Light reframe teaser only — full argument saved for Decision section -->

## Four Failures Compounding at $482K Each

<!-- was: "What Was Broken" -->

Every failed transfer became a DSP exit. Every exit reduced network Capacity
Reliability by 7.7%, recovering only 39.6% of routes — the remaining 60.4%
rerouted at higher manual review cost or absorbed by third-party solutions. The
business was absorbing $482K-$504K per exit that a functioning program could
have prevented.

Four compounding failures drove that number:

- **No one knew how it worked.** The process lived in tribal knowledge across
  eight teams — Business Coaches (BCs), Business Development Managers (BDMs),
  Acquisitions, Legal, Network Health, Delivery Route Resources (DRR), DSP
  Support Services (DSS), Marketing Technology. No one had defined role
  boundaries or clarified decision authority. Stakeholder strategy was unclear
  in terms of process goals and outcomes. Every new case played out differently.

- **Candidates and owners were left in silence.** The team had standardized
  only 4 communications — all to candidates. External communications
  necessitated legal review, but no standardization existed, causing
  communication bottlenecks and leaving candidates and partners frustrated by
  disparate updates. DSP owners received nothing.

- **Vetting lacked scrutiny and standardization.** No rubric backed the 89%
  rejection rate. Different reviewers caught disqualifying factors at different
  stages — wasting time and creating legal exposure on rejections no one could
  document.

- **Every failed transition became an exit.** At $482K-$504K per exit, that
  cost compounded fast.

When I inherited the program in Q3 2022, there were 29 active cases, a 15-case
backlog, and no documentation anywhere.

## The Decision That Changed the Program

<!-- MOVED: now precedes Solution (was after it) — restores arc order -->

In Q3 2022, I had two ways to frame the program's purpose.

**Option A:** CT is a customer service function. Success = requests processed,
owners satisfied. Under this framing, 89% rejection is damning.

**Option B:** CT is a network protection mechanism. Success = network stays
intact, bad transfers don't happen. Under this framing, 89% rejection is
evidence the program is working.

I chose Option B — and built the entire operating system around it.

Framing CT as network protection meant defending high rejection rates to
stakeholders who would have preferred faster approvals. It meant measuring
success in exit costs avoided, not cases closed. It meant the program's value
was invisible when it was working correctly — a prevented exit leaves no trace.

But it was the only framing that made the SOP defensible. The only framing that
could justify a 100% consensus approval model. And the only framing under which
I could argue — successfully, to leadership — that CT deserved to become formal
succession infrastructure, rather than remaining a low-priority case queue.

The $13M in avoided exit costs? That number only exists because someone decided
to count exits prevented, not transfers approved.

## What Changed

<!-- was: "What the Organization Got" -->

### 70% faster decisions. Here's how.

<!-- Front-load result per first-sentence test -->

Decisions that took 9.6 weeks now take 2.9 — a 70% reduction. I designed a
14-week, 21-milestone framework spanning five phases: Notification -> Intake ->
Vetting -> Approvals -> Onboarding. Each phase had defined SLAs, explicit
ownership assignments, and documented handoff criteria.

The vetting sequence was front-loaded by design — cheapest gates first:

1. Application review against a 6-dimension rubric (automatic disqualifiers)
2. Background and credit check
3. HireVue video assessment
4. Enhanced vetting via DRR (Delivery Route Resources)
5. Station visit
6. Interview loop

This sequencing meant the 89% who didn't qualify were identified in days, not
months — before the expensive stages. The inherited 3P rejection rate of 89%
improved to 79% post-revamp — approval rate nearly doubled from 11% to 21%.

### Internal/external user and process attributes tracked. Six defect categories identified.

<!-- Reframed from "689 attributes" per accuracy fix A4 -->

I built a SQL-based analytics system tracking internal and external user and
process attributes across candidate records — enabling the first root-cause
analysis of where the process actually failed. Six defect categories identified:
Credit Before Review (56%), Phone Scheduling Backlog (20%), EV Sequence Errors
(12%), Decision SLA Breach (12%). Frontloading information collection and
vetting scrutiny reduced the transfer decision timeline from 9.6 weeks to 2.9
weeks. WBR (Weekly Business Review) dashboards gave stakeholders the first
real-time view of pipeline health.

### 19 templates. Zero unexplained silences.

<!-- Combined into one paragraph, cut enumeration (items 13, 14) -->

Extended silences during business transfers were driving escalations. I authored
19 email templates covering both DSP owners and candidates across the full
lifecycle — separate tracks, separate tone, legally reviewed language
throughout. Moving from 4 candidate-only emails to full coverage eliminated the
silences and protected Amazon's position on every rejection, critical when 4 in
5 third-party candidates were being declined.

### The Playbook — end-to-end process mapping.

<!-- Focused on Playbook as anchor artifact (item 8) -->

I authored the CT Process Playbook: end-to-end process mapping with rubrics,
communications, workflows, and timelines. It included the BC/BDM Playbook with
role boundaries and talking points, a Survivorship framework covering 4
sub-scenarios with graduated vetting, and the Application Review Rubric with
candidate tiering.

The program's survival no longer depended on any single person.

### 100% consensus required. No ambiguity about who approved what.

I designed a 5-stakeholder consensus approval model — BC Manager, Acquisitions
Manager, NH Manager, Legal, NH Director — requiring unanimous agreement before
the team confirmed any transfer. No single point of decision failure.

## From 15-Case Backlog to $25M Succession Infrastructure

<!-- was: "The Outcome" -->
<!-- component: insight-callout before metrics-row (ref/components.md) -->
<!-- component: metrics-row for headline numbers -->
<!-- component: data-table for before/after -->

| Metric                            | Inherited                    | Built                                                   |
| --------------------------------- | ---------------------------- | ------------------------------------------------------- |
| Active caseload                   | 29 cases + 15 backlog (2021) | 0 backlog                                               |
| Annual case volume                | 5 (2020)                     | 87 (2024)                                               |
| Standardized owner communications | 0                            | 19 templates                                            |
| Process documentation             | None                         | SOP + 13 appendices                                     |
| Data infrastructure               | None                         | User/process attributes, 6 defect categories            |
| Median time to decision           | 9.6 weeks (2021)             | 2.9 weeks (2023) — 70% reduction                        |
| 3P rejection rate                 | 89% (inherited)              | 79% (post-revamp) — approval nearly doubled             |
| Non-3P post-transfer quality      | Unknown                      | +1,800 bps (18 percentage points above network average) |
| Exit cost avoidance               | Baseline                     | $13M (29 approved transfers)                            |

Decision time dropped 70% — not because the bar was lowered, but because stage
gates finally caught unqualified candidates in days instead of months.

At $482K-$504K per DSP exit, 29 successful transfers represents $13M in costs
the network didn't absorb — and 29 routes that never dropped off capacity.

Candidates who met the vetting bar achieved partner quality scores 1,800 basis
points above network average.

The SOP became the foundation for the 2025 Legacy Transfer strategy — a
leadership-level initiative to formalize internal succession pathways, targeting
a 70% approval rate, 72 annual DSP exits reduced to 20, and $25M in avoided
costs by 2026 (52 avoided exits x $482K/exit = $25.1M). Driving end-to-end
implementation for process, awareness, execution, and communications — I own
three of four implementation workstreams.

## Lessons Worth Stealing

- **Question the metric before questioning the program.** If 89% rejection
  looks like failure, ask whether the framing is wrong before assuming the
  process is.
- **Front-load the cheapest gates.** The 89% who don't qualify should be
  identified in days, not months — before the expensive stages consume
  everyone's time.
- **A process held together by one person's tribal knowledge is not a process
  — it's a liability.** If the program dies when the person leaves, you don't
  have a program.
- **If you can't prove the process works with data, you can't defend it to
  leadership.** The reframe only held because the analytics made it provable.

---

## Revision Notes

### Prose Edits Applied

- Items 1, 5, 11, 12, 13, 14, 15: accepted as proposed
- Items 2, 3, 4, 6, 7, 8, 9, 10: user edits applied

### Structural Changes

- Decision section moved before Solution (arc order restored)
- "Taylor's Role" replaced with scope-callout component
- Reframe condensed in Problem section; full argument in Decision section
- "What the Organization Needed" -> "A $504K Problem No One Had Written Down"
- "What Was Broken" -> "Four Failures Compounding at $482K Each"
- "What the Organization Got" -> "What Changed"
- "The Outcome" -> "From 15-Case Backlog to $25M Succession Infrastructure"
- Lessons Worth Stealing section added (was missing)

### Accuracy Fixes

- 89%: clarified as inherited rate, improved to 79% post-revamp
- $25M: derivation added (52 avoided exits x $482K = $25.1M)
- 72 -> 20: cited as Legacy Transfer strategy target, 2025
- 689 attributes: reframed as "internal/external user and process attributes"
- Outcome table: active caseload corrected (was labeled as annual volume)
- Annual volume: updated to 87 (2024)
- +1,800 bps: plain English added (18 percentage points above network average)
- Candidate quality: "Candidates who met vetting bar achieved partner quality scores 1,800 bps above network average"

### Rubric Score: 29/40

| Criterion   | Score |
| ----------- | ----- |
| Arc         | 3     |
| So-What     | 4     |
| Scanability | 3     |
| Voice       | 3     |
| Specificity | 4     |
| Context     | 4     |
| One Lesson  | 3     |
| Accuracy    | 5     |

### Tips for HTML Build (3 -> 4 improvements)

- **Arc -> 4:** Outline already fixes order + adds Lessons. Add one sentence after "I chose Option B" showing the immediate consequence.
- **Scanability -> 4:** Add visual components during HTML build (metrics-row, comparison, insight-callout) to break prose walls.
- **Voice -> 4:** One more passive-voice pass; verify all acronyms defined before first use.
- **One Lesson -> 4:** Make the reframe the PRIMARY lesson; documentation and data are supporting lessons.

### Component Suggestions (ref/components.md)

- scope-callout for Scope section
- insight-callout before Results narrative
- metrics-row for headline numbers (70%, $13M, 29 transfers)
- data-table for before/after comparison
- comparison component for Problem section (inherited vs. built)
- process-timeline for the 5-phase framework
- lessons-list for Lessons Worth Stealing

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
| Metric ranges    | Round to one number with trailing + ($482K+, not $482K-$504K)                                       |
| Table columns    | Consult /trend-researcher for standardization best practice                                         |
| Lessons styling  | Consult /trend-researcher for distinct vs standard treatment                                        |
| Closing CTA      | cs-cta block with "Read next: [title]" button + secondary contact/resume link                       |
| Homepage cards   | Rewrite after all 3 pages ship (separate pass)                                                      |
| Old pages        | Clean replacement — outlines are source of truth                                                    |
| Build order      | Sequential — DSP first as template, then CT, then Pinnacle                                          |
| Process flows    | Use /web-artifact-builder for CT 5-phase and Pinnacle 6-stage                                       |

### CT-Specific Decisions

| Decision                     | Choice                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| Option A / Option B decision | Side-by-side comparison cards (Option A = muted/rejected, Option B = accent/chosen)               |
| Four failures section        | Icon cards in 2x2 grid (stacking to 1-col on mobile), each with icon + bold title + 1-2 sentences |
| 5-phase lifecycle            | Use /web-artifact-builder for visual treatment                                                    |
| Table columns                | "Inherited / Built" (keep unique — more evocative than Before/After; pending /trend-researcher)   |
| $482K-$504K range            | $482K+                                                                                            |
| Chart.js candidates          | CT defect category breakdown (56/20/12/12%) — complex enough for Chart.js pie/donut               |

### Anonymization Notes (CT)

- "BCs" -> "field coaches" or "Business Coaches (BCs)" on first use then "field coaches"
- "BDMs" -> "development managers"
- "DRR" -> "screening team"
- "DSS" -> "support services"
- "WBR" -> "weekly business review" or describe function
- "NH" -> "network operations" or "operations leadership"
- "MSO" -> describe function
- "Capacity Reliability" -> "network capacity" or define on first use
- All team acronyms get plain-language names; Amazon-internal tool names genericized
- CFA stays named if cross-referenced from DSP page
