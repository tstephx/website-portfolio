# From 17 Weeks to 2.3 — Without Lowering the Bar

**Process Architecture | $13M in Exit Costs Avoided | 87% Faster Decisions | Solo Program Owner**

`SQL Analytics` `Process Architecture` `SOP Design` `Stakeholder Governance`

---

## Quick Summary

- Inherited a transfer process with zero documentation, no data infrastructure, and a 15-case backlog. Decisions averaged 17 weeks.
- Reframed the program from customer service to network protection—making the 89% rejection rate defensible instead of damning—and built the operating system around that framing.
- Decision time dropped 87% (16.98 → 2.28 weeks), 29 successful transfers, approved candidates performed +18 pp above network average, and the SOP became the foundation for a $25M program expansion strategy.

---

|                |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Timeline**   | Q3 2022 – 2025                                                                 |
| **My Role**    | CT Program Manager, DSP Acquisitions                                           |
| **Teams**      | 8 cross-functional                                                             |
| **Artifacts**  | SOP + 13 appendices, 19 templates, SQL analytics pipeline, CT Process Playbook |
| **Constraint** | No additional headcount, no dedicated tech resources                           |

---

## A $482K+ Problem No One Had Written Down

I inherited the Owner Transfer process in Q3 2022. It was a one-person operation with no infrastructure: cases lived in email threads and a shared spreadsheet, with no standardized stages, no SLAs, and no criteria for what "approved" or "rejected" meant. I walked into a 15-case backlog awaiting final decision and zero documentation.

The program started in 2020 for third-party sales—strangers buying a delivery business—but by 2022, requests had grown 274% year-over-year (23 to 63). The process also covered two additional use cases: entity restructures (23% of volume) and survivorship transfers (5%)—owners who died or became incapacitated—each with different vetting requirements. Every decision, status update, and rejection letter started from scratch. Institutional knowledge spread across teams. Nobody had built the system to diagnose why decisions averaged 17 weeks.

The bottleneck was stakeholder conviction. Every failed transfer risked becoming a partner exit—39% of rejected partners subsequently left the network—and each exit cost $482K+ in lost delivery capacity. Without an SOP, without data infrastructure, without standardized communications, stakeholders had no basis for confidence—so rather than risk a bad approval, they deferred.

### Four Failures Contributing to Decision Paralysis

1. **No one knew how it worked**
   Institutional knowledge was scattered across eight teams—field coaches, development managers, Acquisitions, Legal, network operations, screening, support services, Marketing Technology. No role boundaries, no decision authority, no documentation.

2. **Candidates and owners were left in silence**
   Only 4 standardized communications existed—all to candidates. DSP owners received nothing across the lifecycle. No status updates, no expectations, no next steps.

3. **Vetting lacked scrutiny and standardization**
   No rubric backed the 89% rejection rate. Different reviewers caught disqualifying factors at different stages—wasting time and creating undocumentable legal exposure.

4. **Decisions took 3+ months on average**
   Without data to justify a decision either way, stakeholders deferred. Every stalled case risked becoming a $482K+ exit.

---

## The Strategic Reframe

When I inherited the program, leadership treated CT as a service function. A partner wanted to sell their business. We processed the request, measured speed, and called it done. Under that framing, an 89% rejection rate and 16-week average against a 7-week SLA are indefensible.

But I didn't think the program was failing. I thought we were measuring it against the wrong mission.

I brought the framing question to leadership: is CT a service function, or a network protection decision?

### Option A — Rejected: CT as Customer Service

Success = requests processed quickly, owners satisfied. An 89% rejection rate and 16-week average mean the program is failing the people it serves and the targets it's measured against. The fix is to approve more, faster.

### Option B — Chosen: CT as Network Protection

Success = the network stays intact, bad transfers don't happen. An 89% rejection rate is evidence the bar is calibrated correctly. The 16-week average isn't a quality problem—it's an infrastructure problem. Build the operating system, and you hit the SLA without lowering the bar.

**Leadership aligned on Option B.**

When a partner exits, it costs the network $482K+ and degrades station capacity by 7.7%. Only 39.6% of routes recover. Option B was the only defensible choice. A successful transfer prevents all of that. A bad transfer—approving an unqualified buyer who degrades performance—creates all of that damage plus the cost of eventually removing and replacing them.

I led with exit costs and post-approval transfer performance—not "we should keep rejecting 89%." That shifted the conversation. Stakeholders stopped asking "why is this taking so long?" and started asking "do we have conviction in this candidate's success?" When CT was a service function, the program was a low-priority case queue. When it was a network protection function, leadership endorsed formalizing it as succession infrastructure.

Once the framing was set, I engineered the system to match.

---

## Building the Operating System

### Front-loading the cheapest gates first.

I designed a 14-week, 21-milestone framework spanning four phases: Intake → Vetting → Approvals → Onboarding. Each phase had defined SLAs, explicit ownership assignments, and documented handoff criteria across eight teams.

The critical design decision was front-loading the cheapest gates. The rejection data told me where: 24% of candidates failed at application review, 30% at the interview loop, and 20% at final approval—an 89% cumulative fail rate. Without front-loaded disqualification, candidates advanced deep into the pipeline—consuming station visits, interview loops, and enhanced vetting hours—before getting rejected at month three for something catchable at week one.

I designed six sequential gates, ordered by cost:

| Week      | Stage                                        | Details                                                                   |
| --------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| Week 1    | Application Review                           | Rubric-scored evaluation across 7 competency areas                        |
| Week 2–3  | Background & Credit Check + Video Assessment | Third-party screening → Financial assessment → Behavioral video interview |
| Week 4    | Enhanced Vetting & Station Visit             | Conflict-of-interest screening → week-long station immersion              |
| Week 5    | Interview Loop                               | 6 core competency assessment with bar-raiser questions                    |
| Week 6    | Final Approval                               |                                                                           |
| Week 7–14 | Onboarding                                   | _(separate phase)_                                                        |

### End-to-end process tracking. Six defect categories.

Our CRM didn't support the workflow configuration, so I built a SQL analytics system tracking end-to-end attributes from application through final approval. Before this, the only visible symptom was that the process was slow.

The data surfaced six defect categories. The two largest were structural: a strict sequential dependency that didn't need to exist, and missed actions from unclear team ownership—not the process design flaws anyone expected.

| Category                           | %       | Cases | Root Cause                      |
| ---------------------------------- | ------- | ----- | ------------------------------- |
| **Background check waiver delays** | **34%** | 71    | No follow-up, unclear ownership |
| **Credit check sequencing**        | **22%** | 46    | Should be parallel              |
| **Interview scheduling backlog**   | **20%** | 42    | Screening at capacity           |
| Decision authority ambiguity       | 12%     | 25    | No escalation path              |
| Station visit coordination         | 8%      | 17    | Field coach conflicts           |
| Other                              | 4%      | 8     | One-off errors                  |

None of that was visible before the tracking infrastructure existed. Once it was, the fixes were clear.

I wrote 19 email templates covering both partner owners and candidates across the full lifecycle—separate tracks, separate tone, Legal-reviewed language throughout. The program went from 4 candidate-only emails to full coverage, eliminating the silences that drove escalations.

I wrote the CT Process Playbook: end-to-end process mapping with rubrics, workflows, and timelines. I designed a 5-stakeholder consensus approval model requiring unanimous agreement before approving any transfer.

The program could survive the loss of any single person.

---

## 17 Weeks to 2.3 — and the Bar was Raised

| Metric     | Value                 | Detail                  |
| ---------- | --------------------- | ----------------------- |
| **87%**    | Faster Decisions      | 16.98 → 2.28 weeks avg  |
| **$13M**   | Exit Costs Avoided    | 29 successful transfers |
| **+18 pp** | Candidate Performance | Above network avg       |

Decision time dropped from 16.98 weeks to 2.28 weeks on average—an 86.6% reduction—not because I lowered the bar, but because the stage gates caught unqualified candidates in days instead of months. The longest case in 2023—at 8.71 weeks—was still faster than the 16.98-week pre-system average. By December, requests closed in under a week.

29 successful transfers at $482K+ each—$13M in avoided exit costs, and 29 delivery routes that stayed in the network. Approved candidates performed 18 percentage points above the network average in partner quality scores.

Annual case volume grew from 5 in 2020 to 87 in 2024, with zero backlog. The SOP became the foundation for the 2025 Legacy Transfer strategy—a leadership initiative targeting $25M in avoided exit costs by 2026. I owned end-to-end implementation.

---

## Lessons Worth Stealing

- **Question the framing before questioning the program.** If 89% rejection looks like failure, ask whether you're measuring against the right mission before assuming the process is broken. The reframe only held because I built the analytics to make it provable—you can't defend a counterintuitive position on intuition alone.

- **Front-load the cheapest gates.** The people who don't qualify should find out in days, not months—and the team's expensive resources should never touch a candidate a credit check would have eliminated.

- **Pipeline sequencing matters as much as decision quality.** Our rejections were always defensible. The problem was candidates traveling three stages downstream before those decisions took effect. Fixing _where_ decisions happen can matter more than fixing _how_ you make them.

- **A process held together by one person's institutional knowledge is not a process—it's a liability.** If the program dies when someone leaves, you don't have a program. Documentation isn't overhead; it's what makes the work durable.
