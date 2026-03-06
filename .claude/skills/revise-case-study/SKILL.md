---
name: revise-case-study
description: Analyze a case study draft against an 8-criterion rubric, produce a scored report with inline rewrite choices, and generate an approved outline for /new-case-study Prompt 2
disable-model-invocation: true
args:
  - name: slug
    description: "Work directory name (e.g., cfa-dsp-application)"
    required: true
---

# Revise Case Study

Single-pass content quality analysis for a markdown case study draft. Produces a scored report with inline rewrite choices and a prose-final outline ready for `/new-case-study` Prompt 2.

**Design doc:** `docs/plans/2026-03-05-revise-case-study-design.md`

---

## Step 1: Discover and Confirm Draft

Glob `work/{{slug}}/case-study-draft*.md`.

- **One match:** Confirm with user — "Found `case-study-draft.md` — use this?"
- **Multiple matches:** List all and ask which to analyze.
- **No matches:** Stop with error — "No case-study-draft*.md found in `work/{{slug}}/`."

## Step 2: Load Inputs

Read these files:

1. The confirmed draft file
2. `docs/active/content-writing-standards.md` (voice, tone, anti-patterns)
3. `work/{{slug}}/evidence*.md` (if any exist — for cross-referencing)
4. `work/{{slug}}/revision-log.md` (if exists — for delta comparison)

## Step 3: Pre-Check (Content-First Questions)

Check if the draft has a one-sentence test (spine) at the top — a single sentence capturing "I [did X] which [achieved Y] despite [constraint Z]."

**Detection heuristic:** Look for (a) a section headed "One-Sentence Test" or "Spine", or (b) a blockquote in the first 20 lines containing the pattern "I [verb]... which [outcome]... despite [constraint]." If neither found, treat as missing.

**If missing**, prompt the user to answer these 4 questions before proceeding:

1. Who is this for?
2. What do they need to believe about you?
3. What should they do after reading?
4. How will you know it worked?

**If present**, skip — the draft is past that stage.

## Step 4: Single-Pass Analysis

Run all five checks in one pass. Do not present intermediate results.

**Analysis vs. presentation:** Analysis runs in one pass (Steps 4a–4e). The report is presented in two phases: sections 1–5 first (pause for prose choices in section 5), then sections 6–7 (rubric + outline with choices applied).

### 4a. Structure Check

Does the arc work? (Problem → Insight → Solution → Result → Lessons)

- **Missing sections:** List any required sections absent from the draft. Required: Problem, Root Cause (or Insight), Solution, Results, Lessons Worth Stealing.
- **Sections that don't earn their space:** Flag any section that restates another or adds no new information.
- **H2 Headline Test:** Table of every H2 as written, pass/fail, and suggested rewrite. A passing H2: the reader who reads only the headings can reconstruct the story arc.

```
| H2 as written            | Passes? | Suggested rewrite                |
|--------------------------|---------|----------------------------------|
| "Background"             | Fail    | "The $482K Problem"              |
| "Results"                | Fail    | "94% Fill in One Quarter"        |
| "What Was Blocking Them" | Pass    | —                                |
```

### 4b. Strategy Check

Does every metric connect to business impact?

- **So-What Checklist:** Table of every metric. Every number must answer "why should a HM care?" Projected and confirmed metrics held to the same standard — the "projected" qualifier is a labeling concern handled by Accuracy.

```
| Metric          | Impact stated? | HM cares because...          |
|-----------------|----------------|-------------------------------|
| "70% faster"    | Bare number    | "Unblocked 29 transfers"      |
| "94% fill rate" | Has baseline   | —                             |
```

- **First-Sentence Test:** Extract first sentence of each paragraph. Does it front-load the key information?

```
P1: PASS  "The process had no owner..."
P2: FAIL  "After careful analysis of..." → lead with the finding
P3: PASS  "Approval rates recovered from 56% to the target."
```

- **Length Check:** Total prose word count (excluding comments, tables, headers). Flag if over 1200 words. Scored under Scanability; does not independently block.

### 4c. Prose Check (Elements of Style)

Apply Strunk's rules to every sentence. Produce a rewrite table with **inline choice per item**: accept the rewrite, reject (keep original), or edit (provide your own version).

**Rules checked (with rubric criterion mapping):**

| Strunk's Rule | Description | Feeds Criterion |
|---------------|-------------|-----------------|
| R10 | Active voice | Voice |
| R11 | Positive form | Voice |
| R12 | Specific/concrete | Specificity |
| R13 | Omit needless words | Scanability |
| R16 | Related words together | Scanability |
| R18 | Emphatic words at end | So-What |

```
| # | Original                          | Rule       | Rewrite                        | Decision |
|---|-----------------------------------|------------|--------------------------------|----------|
| 1 | "The process was redesigned to     | R10: passive| "I redesigned the process,     | accept / |
|   |  improve efficiency"              |            |  cutting cycle time 70%"       | reject / |
|   |                                   |            |                                | edit     |
```

**Cap at 15 items**, prioritized by severity (R10 passive voice > R12 vague language > R18 weak endings > R11 negative form > R13 wordiness > R16 word order). If more violations exist, note: "15 of N violations shown. Remaining are minor (R13, R16) — will surface on re-run if still present."

**Also flag:**
- Jargon used without definition (with suggested parenthetical)
- Sanitization issues (internal dollar amounts, program codes) if present
- Third-person voice instances that need conversion to first person (flagged, not auto-converted — user decides phrasing)

User choices are collected in Step 5 (Phase A pause), not here.

### 4d. Rubric Scoring

Score 8 criteria, each 1-5. Total: /40.

| # | Criterion | What it measures | 1 (fail) | 5 (pass) |
|---|-----------|-----------------|----------|----------|
| 1 | **Arc** | Problem → Insight → Solution → Result → Lessons present and ordered | Sections missing or out of order | Clear tension, turning point, payoff, transferable lesson |
| 2 | **So-What** | Every metric connects to business impact | Bare numbers without context | Every number answers "why should a HM care?" |
| 3 | **Scanability** | H2s tell the story; first sentences front-load; under 1200 words | Generic headers, buried ledes, over-length | H2s alone reconstruct the arc; first sentences carry key info; concise |
| 4 | **Specificity** | Numbers beat adjectives; claims are concrete | "Significantly improved" | "Reduced 70% (16.98 → 2.28 weeks)" |
| 5 | **Context** | Every number has a baseline and derivation | Numbers float without anchoring | Before → after stated; denominator or derivation provided |
| 6 | **Voice** | Active, reader-focused, jargon defined on first use | Passive voice, self-congratulatory, undefined acronyms | Direct, for the reader, terms explained |
| 7 | **One Lesson** | Case study teaches one clear, transferable thing | Unclear takeaway or multiple competing messages | Reader can state the lesson in one sentence |
| 8 | **Accuracy** | Numbers are internally consistent, math checks out, claims traceable to evidence | Contradictions, arithmetic errors, unverifiable claims | All numbers cross-check; evidence files support claims |

**Accuracy without evidence files:** Cap at 4/5. Note in report: "Accuracy capped at 4 — no evidence files available for cross-referencing."

**Evidence cross-referencing (when evidence files exist):**
1. Extract every numeric claim from the draft
2. Search evidence files for corresponding source data
3. Match found → verify number matches source; flag discrepancies
4. No match found → flag as "unverifiable claim — no source in evidence files"

### 4e. Outline Generation

Generate the proposed outline in this format, applying all accepted Strunk's rewrites:

```markdown
# [Tension-Driven Headline]

[Tagline: Role/Scope | Scale Indicator | Key Constraint]

Tech: [tool/method pills]

---

## Scope
Timeline | Role | Teams | Artifacts

## The Problem
<!-- suggest: insight-callout -->
- What was broken (with numbers + baselines)
- Why it mattered (cost/impact, connected to business outcome)

## Root Cause
- What you found that others missed
- Supporting data (with derivation)

## The Solution
- What you built/changed
- How it worked (process, not just result)

## Results
<!-- suggest: insight-callout -->
<!-- suggest: metrics-row -->
- Metrics table: Before | After (or Projected, labeled)
- Every number has a baseline and derivation

## Lessons Worth Stealing
- 3-4 transferable insights
- One sentence each, actionable, reader-focused

---

## Revision Notes
[Extracted editorial comments from the draft, preserved for context]
```

**Outline rules:**
- Accepted Strunk's rewrites applied; rejected items keep original phrasing
- Jargon defined on first use
- Numbers anchored with baselines and derivations
- Internal inconsistencies resolved
- Third-person voice instances flagged with `<!-- VOICE: convert to first person -->` (not auto-converted)
- Component suggestions as HTML comments referencing `ref/components.md` names. If a suggested component doesn't exist in the library, note it as "proposed new component."
- Editorial comments (`<!-- CHANGE: ... -->`) extracted to Revision Notes appendix

## Step 5: Present the Report

Present the report in two phases:

**Phase A** (present first, then pause):
1. **Top 3 Issues** (priority-ranked, one sentence each: problem + fix)
2. **Delta Summary** (re-runs only — see format below)
3. **Structure Section** (missing sections, redundant sections, H2 headline test table)
4. **Strategy Section** (so-what checklist, first-sentence test, length check)
5. **Prose Section** (Strunk's rewrite table)

**Wait for user to make all inline choices (accept/reject/edit per row) before continuing.**

**Phase B** (present after prose choices are resolved):
6. **Rubric Score** (8 criteria with scores, total — Voice score reflects accepted rewrites)
7. **Proposed Outline** (with all accepted rewrites applied)

### Delta Summary (re-runs only)

If `revision-log.md` exists, show:

```
DELTA: 5 of 8 issues resolved since last run. 3 remaining.
Score: 24/40 → 31/40 (+7)

Resolved: [Voice.R10.P3], [SoWhat.M2], [Arc.Missing.Lessons], ...
Remaining: [Accuracy.Inconsistency.Markets], [Context.M4], ...
```

## Step 6: Gate

**If score < 28/40 OR any criterion < 3:**

Display the outline for reference, then:

> **Score below threshold (X/40).** The outline above is for reference only — it cannot be approved at this score. Edit the draft and re-run `/revise-case-study {{slug}}`.

Do NOT show an approval prompt. Do NOT write `outline-approved.md`. DO still append to `revision-log.md` (so the next run can compute a delta).

**If score >= 28/40 AND all criteria >= 3:**

Display the outline, then:

> **Approve this outline? Write to `outline-approved.md`?** [yes/no]

On **yes**:
1. Write `work/{{slug}}/outline-approved.md`
2. Append to `work/{{slug}}/revision-log.md`
3. Message: "Outline approved. Run `/new-case-study {{slug}}` — skip to Prompt 2 (HTML build). The outline is the content source; Prompt 2 handles layout and components."

On **no**:
- Ask what to change. User can edit the draft and re-run, or request specific outline adjustments.

## Step 7: Append Revision Log

Append to `work/{{slug}}/revision-log.md` (create if it doesn't exist).

On first run, verify `work/*/revision-log.md` is covered by `.gitignore`. If not, warn the user.

Format:

```markdown
## Run: [YYYY-MM-DD HH:MM]

Rubric: [total]/40
| Criterion | Score |
|-----------|-------|
| Arc       | X     |
| So-What   | X     |
| Scanability | X   |
| Specificity | X   |
| Context   | X     |
| Voice     | X     |
| One Lesson | X    |
| Accuracy  | X     |

Issues: [N] total
1. [Criterion.Type.Location] Issue summary
2. [Criterion.Type.Location] Issue summary
...

Outcome: [Approved / Blocked (score X/40)]

---
```

**Issue ID format:** `[Criterion.Type.Location]` for precise delta matching.
- `[Voice.R10.P3]` — Strunk's Rule 10 violation in paragraph 3
- `[Accuracy.Inconsistency.Markets]` — internal contradiction about market count
- `[Arc.Missing.Lessons]` — required section absent
- `[SoWhat.M2]` — metric #2 lacks business impact
- `[Context.M4]` — metric #4 has no baseline

---

## What This Skill Does NOT Do

- **Does not build HTML** — hands off to `/new-case-study` Prompt 2
- **Does not invoke `/elements-of-style`** — Strunk's rules are embedded in the Prose section
- **Does not invoke `/content-first-design`** — uses its core questions in the pre-check only
- **Does not dispatch `content-reviewer` agent** — agent's checks are folded into the rubric
- **Does not search book-library** — principles are baked into the 8 rubric criteria
- **Does not simulate a hiring manager** — the so-what checklist catches the same failures deterministically
- **Does not auto-convert voice** — flags third-person instances for user decision
