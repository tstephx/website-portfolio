# Portfolio Content Audit — Phase 4: Triage and Fix Plan

## What this is

Reads ALL findings — from the phased audit AND the four specialist agent reviews — deduplicates, resolves conflicts, and produces a single prioritized fix plan with executable prompts.

## Read these files (in this order)

### Audit outputs
1. `docs/active/audit-phase0-results.txt` — mechanical check output
2. `docs/active/audit-phase1-standards.md` — standards summary and severity guide
3. `docs/active/audit-phase2-public.md` — public page findings
4. `docs/active/audit-phase3-protected-crosscutting.md` — protected + cross-cutting findings

### Agent review outputs
Read the agent findings from the session transcript. The four agents produced these findings:

#### content-writer agent
Recommendations to implement:
- CT defect table "Cases" column label → "Defect instances" (readers will add to 209, not 29)
- CT quality tracking paragraph — confirmed weakest section on the page
- CT "SLA" → "target" for non-Amazon readers
- PIN "reward program" vs "expansion program" inconsistency within the page
- PA TL;DR third bullet needs splitting
- PA comparison card labels need temporal anchoring
- PIN "trailing twelve months" → "past twelve months"

Recommendations disputed (DO NOT implement):
- "15×" homepage stat — agent says worse than "7-Figure" but ratio requires context the homepage doesn't provide. Skip.
- "(self-directed)" parenthetical — agent says NOT defensive, useful initiative signal. Keep.
- Pull quote tag mismatch severity — agent says SHOULD FIX not MUST FIX. Downgrade.
- "Breach of Contract" capitalization — cosmetic, not SHOULD FIX. Downgrade.

Writing issues the audit MISSED (implement these):
- CT Public results section has no insight callout before the metrics row — every other case study has one
- PA insight callout is a timeline summary, not an insight — should frame why the numbers matter
- PA decision section buries the decision — reads as "3 options, here's what I picked" instead of leading with why the obvious choice was wrong
- PIN "What Changed" H2 is the weakest section header — pure label, no tension
- CT line 196 has ambiguous "it" pronoun — two "it"s with different antecedents
- PA funnel paragraph buries the punchline — "2% conversion" should open, not close

#### code-reviewer agent
All 4 audit findings confirmed, zero disputes:
- Pull quote tag mismatch (downgraded to SHOULD FIX per content-writer)
- Data table accessibility gaps
- Icon card emoji parity
- Font preload missing from protected pages

Critical missed issues:
- Caption id= prerequisite: protected pages' `<caption>` elements have NO id attribute. Adding `role="region" aria-labelledby="metrics-caption"` without the matching id creates a broken reference. Both must be added together.
- CT protected icon card emojis need `aria-hidden="true"` — screen readers announce "clipboard," "incoming envelope," etc.
- PIN protected transformation table `<th>` elements lack `scope="col"` (public version has them)
- CT uses literal `—` character instead of `&mdash;` entity in quality tracking paragraph — renders identically but breaks authoring consistency
- Homepage loads `progress-bar.js` at end of `<body>` while case studies load it in `<head>` with defer — functionally identical but inconsistent

#### story-reviewer agent
Math errors found (MUST FIX):
- $482K+ × 29 ≠ $13M — $482K × 29 = ~$14M. The "+" makes it worse. The two figures contradict each other. Public version sidesteps this with "six figures each — eight-figure total."
- "274% YoY (23 to 63)" — 23 → 63 is a 174% increase, NOT 274%. "274%" means "grew to 274% of prior year." Standard usage of "grew 274%" implies ~86, not 63. The parenthetical exposes this to any interviewer who checks.
- PA Protected: 62% rejection rate doesn't match 4,450 passed — 62% rejection from 12,714 = 4,831 passed, not 4,450. Implied rate is 65%. Likely different data windows but the numbers coexist in the same paragraph.

Anonymization gap found:
- CT Public retains "39.6% of routes recover" — anonymization guide explicitly says this should be "fewer than 40%." Only miss across all three guides.

Number drift:
- Resume: "$13M+" (key metrics) vs "$13M" (SPM bullet) — "+" qualifier present in one, absent in the other within the same document.

#### career-coach agent
Strategic recommendations:
- Reorder homepage cards: CT should lead, not PA. CT has all confirmed metrics. PA leads with projections — wrong card to put first.
- PA metric cards need "projected" visible on the card face, not buried in a table caption. Skimming HM sees "+130%" without the qualifier.
- Cut CT quality tracking paragraph ("The system caught what would have gone unnoticed") — vague by the page's standard, creates ambiguity at the takeaway moment.
- Cut or collapse PIN "Post-automation" section — shifts focus to unsolved supply constraint; last thing reader remembers is "the remaining gap is supply." End at the achievement.
- PIN "Leadership credited it by name... the only workstream attributed to a specific person" — superlative tips into self-congratulatory. Keep the fact, drop the comparison.

Credibility risks flagged:
- PA projected metrics presented as headline wins without clear labeling
- CT "I owned end-to-end implementation" — defensive fragment, cut it
- PIN superlative ("only workstream") — slightly self-congratulatory

One section to cut from each (to tighten):
- PA: "Even With Resources Secured, There Was a Near-Term Blocker" — collapse to one paragraph
- CT: "Four Failures" icon cards — repeats content already in prose
- PIN: "Post-automation: the program kept growing" — blunts the landing

---

## What to produce

### 1. Conflict resolution

Where agents disagree with each other or with the audit, make a call. Document each conflict and the resolution:

| Conflict | Source A | Source B | Resolution |
|---|---|---|---|
| Pull quote tag severity | Phase 3: MUST FIX | content-writer: SHOULD FIX | [decide] |
| CT icon cards: cut or keep? | career-coach: cut (redundant) | Phase 2: no finding | [decide] |
| PIN post-automation: cut or keep? | career-coach: cut (blunts landing) | Phase 2: "strong differentiator" | [decide] |
| PA near-term blocker: cut or collapse? | career-coach: collapse | Phase 2: no finding | [decide] |
| Homepage card order | career-coach: CT first | Current: PA first | [decide] |
| 274% YoY math | story-reviewer: MUST FIX | — | [decide: fix the % or remove parenthetical] |
| $482K × 29 math | story-reviewer: MUST FIX | — | [decide: which number to adjust] |

### 2. Deduplicate and root-cause group

Group findings from ALL sources (audit phases + 4 agents) into single issues. Many overlap:
- "CT quality tracking paragraph is weak" appears in Phase 2, content-writer, AND career-coach = 1 issue
- "PIN H2 'What Changed' is weak" appears in content-writer AND earlier conversation = 1 issue
- Data table a11y gaps across protected pages = 1 structural issue, not 3

### 3. Sequence into batches

**Batch 1: MUST FIX — blocks going public**
Factual errors, math contradictions, anonymization leaks, broken references. These undermine credibility if an interviewer checks.
- List each: what's wrong, which files, exact fix, source (which audit phase or agent flagged it)

**Batch 2: SHOULD FIX — affects hiring manager perception**
Clarity, flow, voice, structural parity, accessibility. These affect whether a hiring manager shortlists after reading.
- List each: what's wrong, which files, recommended fix, source

**Batch 3: STRATEGIC — career-coach recommendations**
Card reordering, section cuts/collapses, projected metric labeling. These are judgment calls that change how the portfolio positions you.
- List each: recommendation, trade-off, which files, suggested approach
- Flag any that require me (Taylor) to make a decision before executing

**Batch 4: NICE TO HAVE — polish**
Cosmetic, consistency, optional tightening. Do if time permits.
- List each: what it would improve, which files, suggested approach

### 4. Dependencies

Map which fixes must happen before others:
- "Fix 274% math" must happen before "update resume to match"
- "$482K × 29 resolution" must happen before "update public version's anonymized equivalent"
- "CT icon card decision (cut/keep)" must happen before "CT structural parity check"
- "Homepage card reorder" affects link chain and visual regression tests

### 5. Estimated effort

Per batch: total time, number of files touched, whether it can run in one Claude Code session.

### 6. Generate execution prompts

For Batch 1 and Batch 2, write Claude Code-ready prompts that:
- List every file to modify
- Specify the exact find-and-replace or rewrite for each change
- Include verification steps (grep for anonymization, math check for numbers)
- Reference which finding each fix addresses

For Batch 3, write a decision document — not an execution prompt. List each recommendation with trade-offs so I can approve/reject before execution.

Save as:
- `docs/prompts/content-fixes-batch1.md` — must fix (executable)
- `docs/prompts/content-fixes-batch2.md` — should fix (executable)
- `docs/prompts/content-fixes-batch3-decisions.md` — strategic decisions (requires my input)
- `docs/prompts/content-fixes-batch4.md` — nice to have (executable, low priority)

## Output

Save the triage plan to `docs/active/audit-phase4-fix-plan.md`.
Save execution prompts to `docs/prompts/content-fixes-batch[1-4].md`.

## Constraints

- Do NOT execute any fixes. Produce the plan only.
- Every fix must reference its source (Phase 0/1/2/3, content-writer, code-reviewer, story-reviewer, or career-coach).
- Where agents conflict, document both positions and make a recommendation — but flag it for my review.
- Batch 3 items require my approval before execution. Do not write them as find-and-replace prompts.
- Math fixes ($482K×29, 274% YoY) require me to confirm which number is correct. Flag these as DECISION NEEDED.
