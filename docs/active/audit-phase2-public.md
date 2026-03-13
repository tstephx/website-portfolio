# Phase 2: Public Pages Deep Review

_Close reading of the 4 public pages. Standards reference: `docs/active/audit-phase1-standards.md`._

---

## Homepage (`index.html`)

### Comprehension
- **Summary:** Taylor Stephens is a strategic program manager who builds critical operational systems from scratch at scale — here are three case studies and three personal projects proving it.
- **Strongest sentences:**
  1. *"I'm the person you call when a critical process doesn't exist yet, is falling apart, or costs millions more than it should — I've fixed all three."* — Immediately frames scope and confidence. The three-part structure mirrors the three case studies. Memorable, specific, and bold without being arrogant.
  2. *"Inherited a process with zero documentation and volume growing 274% YoY."* (CT card) — "Zero documentation" and "274% YoY" create instant tension. The reader thinks "how did this end?"
  3. *"A 55+MB spreadsheet crashed regularly, losing eligibility data."* (PIN card) — Visceral, concrete problem that any PM recognizes. The contrast between critical decisions and a crashing spreadsheet creates genuine curiosity.
- **Interview question:** "You say you're the person called when a process doesn't exist yet — walk me through the first 48 hours after you inherited the contract transfer process with zero documentation and a 15-case backlog."

### Findings

#### MUST FIX
_(None found)_

#### SHOULD FIX
- **Homepage meta description mentions "AI infrastructure" but case studies are about partner operations.** The tagline says "AI Infrastructure & Systems Design" and the case studies are about delivery partner applications, contract transfers, and selection automation. A hiring manager looking for AI PM work will expect AI case studies and feel misled. The Personal Projects section (MCP Ecosystem) covers AI, but the primary work doesn't.
  → **Recommended fix:** Either reword the tagline to match the case studies ("Operational Systems & Process Design") or add a brief framing note that connects operational systems work to AI/ML infrastructure thinking. The personal projects cover AI, but the tagline shouldn't over-index on them.

- **"7-Figure" stat label on PA card reads awkwardly as a stat.** The stat grid shows `7-Figure` / `Eng. investment secured`. Other stats are precise numbers (17 markets, 26% → 60%). "7-Figure" is vague by comparison and breaks the pattern of precision that makes the other stats land.
  → **Recommended fix:** Consider "15×" / "Eng. investment multiplier" (0.25 → 3.8) — this is more precise and more impressive.

- **"Built to solve problems the job didn't come with" (Personal Projects intro) is slightly unclear.** Does it mean "problems that arose beyond the job description" or "problems that come with not having a job"?
  → **Recommended fix:** "Built to solve problems the job didn't cover" or "Built outside working hours to solve real problems."

#### NICE TO HAVE
- The footer line "Built by a PM who watches F1 strategy calls like most people watch Netflix" is a strong personality signal. Consider whether it appears on every page (it does) — this is fine for brand consistency, but the repetition means returning visitors will stop noticing it. No change needed.
- The three personal project cards are strong but slightly front-loaded with specs ("79K LOC | 1,100+ Tests | 130+ Tools"). A hiring manager might prefer a hook before the tech specs. The work cards do this well (problem → solution in narrative), but project cards lead with meta.

---

## Partner Application Redesign — Public (`work/partner-application-public/index.html`)

### Comprehension
- **Summary:** A delivery partner application unchanged since 2018 had a 74% abandonment rate; Taylor benchmarked a best-in-class franchise program, built a 101-requirement redesign, and secured 15× the initial engineering allocation to capture seven-figure annual entitlement.
- **Strongest sentences:**
  1. *"A one-way ANOVA across six reviewers returned F = 430.9 (p < 2e-16) — the application design, not reviewer judgment, was the root cause."* — Statistical rigor deployed in a PM context. This sentence alone signals technical depth. A hiring manager at Stripe or Google would notice this.
  2. *"Engineering classified a 32-question update to the existing application as XL — 10 to 12 months of development."* — Perfectly frames the constraint. The reader immediately understands the "near-term blocker" without needing Amazon context.
  3. *"0.25 → 3.8 engineers secured against the identified seven-figure entitlement for 2025."* — The resource win in one number. Shows Taylor moved resources, not just made recommendations.
- **Interview question:** "You went from 0.25 engineers to 3.8. Walk me through the exact evidence chain — what was in the BRD that hadn't convinced leadership on its own, and what did the annual planning escalation add?"

### Findings

#### MUST FIX
_(None found — anonymization is clean, numbers are consistent, narrative arc is complete)_

#### SHOULD FIX
- **Line 69-71: "An evidence chain — requirements specification, technology roadmap, annual planning escalation — secured 3.8 engineers..."** in the TL;DR uses em-dashes around a parenthetical list that already has commas. This parses cleanly, but the sentence is doing a lot of work. The TL;DR's third bullet is noticeably denser than the first two.
  → **Recommended fix:** Split into two sentences: "An evidence chain — requirements specification, technology roadmap, annual planning escalation — secured the case. Engineering allocation grew from 0.25 to 3.8."

- **Line 130-133: "The application's inability to filter early pushed vetting costs downstream, inflating a seven-figure annual budget by 33% heading into 2024."** This sentence requires domain knowledge to fully parse. "Pushed vetting costs downstream" is abstract — what does "downstream" mean here?
  → **Recommended fix:** "Because the application couldn't filter out unqualified candidates early, the team spent seven-figure vetting budgets evaluating people who would eventually be rejected — inflating costs 33% heading into 2024."

- **Line 131-133: "Our team owned the application; engineering controlled it. Any change required a 4–6 month effort, and we had zero engineering entitlement. To get it, I needed to build the case."** These three sentences are excellent but could be even punchier. The semicolon in the first sentence slightly weakens the impact of the ownership paradox.
  → **Recommended fix:** "Our team owned the application. Engineering controlled it." (Period instead of semicolon — the pause makes the tension land harder.)

- **The comparison box (lines 146-157) uses "Current Application" vs "Benchmark Application" labels.** "Current" is ambiguous — current as of when? Before the redesign? Now?
  → **Recommended fix:** "Original Application (2018)" vs "Benchmark Application" — adds temporal anchor.

- **Line 324-327: Results paragraph packs four distinct metrics into one paragraph.** "9,000+ additional approved applications per year (~16K → ~25K). Nearly double the program-inclined candidates per year. The redesign removes 2,000+ hours from manual review annually. The team now updates the application quarterly without an engineering ticket." Each of these is impressive; packing them together reduces impact.
  → **Recommended fix:** Consider a secondary metrics row or bullet list for these four stats, matching the visual weight of the primary metrics row.

#### NICE TO HAVE
- The pull quote ("The application wasn't collecting bad data — it was asking the wrong kind of questions") repeats a point already made in the benchmark section and in Lesson 2. It's still effective as a visual break, but the repetition is noticeable on close reading.
- The scope-meta line reads "Oct 2023–Q1 2024 · Program Manager, Partner Acquisitions (self-directed)" — the "(self-directed)" parenthetical is a smart signal but might read as defensive to some hiring managers. Consider whether the case study's narrative already demonstrates self-direction strongly enough.

---

## Contract Transfer Process Redesign — Public (`work/contract-transfer-public/index.html`)

### Comprehension
- **Summary:** Taylor inherited a transfer process running on email threads with zero documentation and 17-week decision times, reframed it from "customer service" to "network protection," and built the operating system that dropped decisions to 2.3 weeks while raising the bar — preventing eight-figure exit costs across 29 cases.
- **Strongest sentences:**
  1. *"I walked into a 15-case backlog awaiting final decision and zero documentation."* — The concreteness ("15-case backlog," "zero documentation") makes this immediately credible. No weasel words.
  2. *"I didn't think the program was failing. I thought we were measuring it against the wrong mission."* — This is the best sentence on the entire portfolio. It signals strategic thinking, contrarian conviction, and the ability to reframe — all in two sentences. A hiring manager would quote this in the debrief.
  3. *"Not because I lowered the bar, but because the stage gates caught unqualified candidates in days instead of months."* — Directly addresses the skeptic's objection ("you just approved more"). Shows the speed improvement came from process design, not lower standards.
- **Interview question:** "You reframed an 89% rejection rate from 'program failure' to 'correctly calibrated bar.' How did you build conviction with leadership that wasn't just rationalizing poor performance? What data did you bring to that meeting?"

### Findings

#### MUST FIX
- **Line 48: Tagline says "8-Figure Exit Costs Avoided" but H1 says "From 17 Weeks to 2.3."** The H1 uses 2.3, but the results section (line 339) says "2.28 weeks" and elsewhere says "2.3" (meta description, line 9). The TL;DR says "2.28 weeks." The page uses both 2.3 and 2.28 — minor inconsistency but the H1 and results should match precisely.
  → **Recommended fix:** Standardize. Use "2.3" in the H1 and tagline (rounder, punchier for headlines), and "2.28" in the detailed results section (precision for credibility). Current approach is acceptable, but note the meta description says "2.3" while results say "2.28" — these should be reconciled. Technically both round correctly, so this is borderline SHOULD FIX.

#### SHOULD FIX
- **Line 99-104: "...requests had grown 274% year-over-year (23 to 63). The process also covered two additional use cases: entity restructures (23% of volume) and survivorship transfers (5%) — owners who died or became incapacitated — each with different vetting requirements."** This sentence carries a lot of parenthetical weight. The em-dash parenthetical "owners who died or became incapacitated" is important context but creates a sentence that requires re-reading.
  → **Recommended fix:** Split: "The process also covered entity restructures (23%) and survivorship transfers (5%) — cases where an owner died or became incapacitated. Each type had different vetting requirements."

- **Line 152: "an 89% rejection rate and 16-week average against a 7-week SLA are indefensible."** A non-Amazon reader may not know what "SLA" means in this context.
  → **Recommended fix:** "an 89% rejection rate and 16-week average — against a 7-week target — are indefensible." Replace "SLA" with "target" since the reader doesn't need the acronym.

- **Lines 376-383: "The quality tracking framework proved its value three months after one 2023 launch, when it flagged a deviation in compliance incidents—not a catastrophic failure, but a leading indicator."** This paragraph is the weakest on the page. It's abstract ("a deviation"), uses passive language ("it flagged"), and doesn't match the precision of the rest of the case study. What was the deviation? What was the intervention? The sentence "Four of five launches maintained quality" is vague by this page's standards.
  → **Recommended fix:** Either make it specific (what kind of compliance incident? what was the intervention?) or cut it. The results section is already strong without it. If kept, lead with the outcome: "One 2023 launch deviated from quality standards within three months. The tracking framework caught it before it compounded — the only early warning the program had."

- **Defect table (lines 264-316): The "%"and "Cases" columns don't add up to 100% / total cases.** 34+22+20+12+8+4 = 100% and 71+46+42+25+17+8 = 209. But this appears to be counting defect instances (multiple per case), not cases. This should be labeled more clearly.
  → **Recommended fix:** Change the "Cases" column header to "Defect instances" or add a caption note: "Cases counted by defect type; a single case may have multiple defects."

#### NICE TO HAVE
- The four icon cards ("Four Failures Contributing to Decision Paralysis") are an effective component. The section between the icon cards and the Strategic Reframe section flows well.
- The decision cards (Option A vs Option B) are the standout component of this case study. The "Rejected" / "Chosen" labels with visual distinction work exactly as intended.
- The "Lessons Worth Stealing" section is the strongest of the three case studies. All four lessons are genuinely transferable and actionable.

---

## Selection Automation — Public (`work/pinnacle-public/index.html`)

### Comprehension
- **Summary:** A failing expansion program for top delivery partners — launches down 55%, 20 eligible candidates bypassed — was caused by a crashing 55+MB Excel file; Taylor diagnosed 7 root causes, built a 6-stage SQL pipeline with Haversine distance, and raised fill rates from 57.9% to 94.1%.
- **Strongest sentences:**
  1. *"The same route measured 49 miles one month and 52 the next. A partner could be eligible in October and ineligible in November."* — Makes a technical problem viscerally understandable. Any reader grasps why this is broken without needing domain context.
  2. *"I created the script that enabled the workstream. Leadership credited it by name in program documentation — the only workstream in that document attributed to a specific person."* — Social proof without self-congratulation. The fact that leadership chose to name it speaks louder than Taylor claiming it.
  3. *"If you can't rerun the process and get the same answer, you don't have a process."* — The strongest lesson across all three case studies. Universal, memorable, and deeply technical in implication while being completely accessible.
- **Interview question:** "You chose Haversine over commute times despite it being less familiar to stakeholders. How did you get buy-in for a mathematical formula that was technically 'less accurate' than real commute data? What was the pushback?"

### Findings

#### MUST FIX
_(None found — anonymization clean, numbers consistent, narrative arc complete)_

#### SHOULD FIX
- **Line 63: TL;DR says "A reward program for top-performing delivery partners" but the scope-context (line 85) says "The expansion program was the company's top recognition."** The page uses both "reward program" and "expansion program" to describe the same thing. This inconsistency could confuse a reader on first pass.
  → **Recommended fix:** Pick one and use it consistently. "Expansion program" is more descriptive and appears more frequently. Change TL;DR to: "An expansion program for top-performing delivery partners broke down..."

- **Line 92-93: "The expansion program offers top-performing delivery partners — the 8.5% of 2,600+ operators who consistently achieve top-tier performance — a path to expand into a second station."** The em-dash parenthetical interrupts the main clause's verb. You have to hold "offers...a path to expand" across a 15-word interruption.
  → **Recommended fix:** Move the qualifier: "The expansion program offers a path for top-performing delivery partners to expand into a second station. Only 8.5% of 2,600+ operators qualify — those who consistently achieve top-tier performance."

- **Lines 345-353: Post-automation paragraph is the densest on the page.** It packs: 43% YoY growth, 440+ partners, qualification screen tightening, ~120 active, CRM migration, automated identification, heuristics allocation, vetting block, 77% acceptance, zero exits, 2.7 pp quality improvement — all into one paragraph. This is the "wall of data" anti-pattern from the writing standards.
  → **Recommended fix:** Break into 2-3 shorter paragraphs or use a mini metrics row. The information is valuable — it shows the system kept improving after handoff — but it needs breathing room.

- **Lines 355-358: "The constraint shifted: only 37 expansion opportunities opened in the trailing twelve months (−46% YoY), with 5 targets unfilled."** "Trailing twelve months" is finance/analytics jargon. A hiring manager outside operations might parse "trailing" as "lagging behind" rather than "previous."
  → **Recommended fix:** "In the past twelve months, only 37 expansion opportunities opened (−46% YoY)."

- **H2 "The Reward Mechanism That Stopped Rewarding" (line 90) vs H1 about a spreadsheet.** The H1 is about a crashing Excel file. The first H2 is about a reward mechanism. The transition works on careful reading, but a skimming HM might wonder if these are the same project. The connection (the spreadsheet was the reward mechanism's infrastructure) could be made explicit.
  → **Recommended fix:** Add one bridge sentence after the scope-context: "The declining fill rates traced back to a single source: the 55+MB Excel file that powered the entire selection process."

#### NICE TO HAVE
- The funnel visualization (lines 258-284) is the strongest visual component across all three case studies. The descending widths make the filtering intuitively clear.
- The before/after table (lines 286-332) is excellent — clean, scannable, every row tells a micro-story.
- This case study has 3 "Lessons Worth Stealing" while the other two have 4. Not necessarily a problem — quality over quantity — but worth noting for structural parity.
- The 6-stage pipeline (ordered list, lines 172-197) uses `<ol>` correctly. Each stage name (bold) acts as a mini-heading. This is well-structured.

---

## Cross-Page Observations (Public Pages)

### Consistency
- All three case studies follow the same structure: H1 → tagline → tech pills → TL;DR → scope-meta → scope-context → Problem → Solution → Results → Lessons → Pull Quote → Unlock CTA → Read Next CTA. Structural consistency is strong.
- Footer line is identical on all pages (F1 reference). Good.
- "Read next" chain is circular and uses consistent short titles (confirmed by Phase 0).

### Voice Drift
- **CT Public** is the most polished — tightest prose, strongest narrative arc, best strategic thinking on display.
- **PA Public** is the most data-dense — which is both a strength (ANOVA, 6-point problem list) and a risk (several sentences require re-reading).
- **PIN Public** is the most technical — which matches its "Technical Solution" category label.
- The voice is generally consistent across all three. No case study drifts into defensive or self-congratulatory tone.

### Structural Observations
- PA and CT have 4 "Lessons Worth Stealing"; PIN has 3.
- PA has a comparison box component (Current vs Benchmark); CT has decision cards (Option A vs B); PIN has neither but has a funnel chart. Each uses a unique visual component — good variety.
- All three use the insight-callout component, though PA places it mid-results while CT and PIN place it before results metrics. Consider standardizing placement.
