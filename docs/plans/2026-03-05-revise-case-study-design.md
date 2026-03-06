# `/revise-case-study` — Design Document

<!-- project: website-portfolio -->

**Goal:** A single-pass skill that takes a markdown case study draft through content quality analysis, produces one scored report with inline rewrite choices, and outputs a prose-final outline ready for `/new-case-study` Prompt 2 (HTML build).

**Status:** Design — approved, ready for implementation.

**Skill file:** `.claude/skills/revise-case-study/SKILL.md`

---

## Architecture

```
/revise-case-study [slug]
         |
         v
  Glob work/[slug]/case-study-draft*.md
  Show matches, confirm with user
         |
         v
  Read confirmed draft file
  Read work/[slug]/evidence* (if present)
  Read docs/active/content-writing-standards.md
         |
         v
  +-----------------------+
  |   SINGLE-PASS ANALYSIS |
  |                        |
  |  1. Structure check    |
  |  2. Strategy check     |
  |  3. Prose check        |
  |  4. Rubric scoring     |
  |  5. Outline generation |
  +-----------------------+
         |
         v
  Report displayed in conversation
  (inline accept/reject/edit per rewrite)
         |
         v
  Proposed outline displayed with choices applied
         |
    Score >= 28/40 AND all criteria >= 3?
         |
    NO:  Hard block — full report shown,
         outline visible for reference,
         but no approval prompt, no file written.
         User must edit draft and re-run.
         |
    YES: "Approve this outline? Write to
          outline-approved.md? [yes/no]"
         |
  ====== GATE: User approves ======
         |
         v
  Write work/[slug]/outline-approved.md
  Append to work/[slug]/revision-log.md
         |
         v
  Hand off to /new-case-study Prompt 2
```

**Key constraints:**

- One gate, one approval. No staged checkpoints.
- No book-library search at runtime — principles baked into rubric.
- No audience simulation — checklist-based validation only.
- No auto-triage — same checks regardless of draft state.
- Does not build HTML — hands off to `/new-case-study`.
- Re-runnable: run again after edits; delta compared to last report.
- Hard block: full report displayed (including outline for reference) but no approval prompt and no `outline-approved.md` written if rubric score < 28/40 or any criterion < 3.

---

## Inputs

| Input | Required | Purpose |
|-------|----------|---------|
| `work/[slug]/case-study-draft*.md` | Yes | Glob pattern — show matches and confirm with user before reading |
| `work/[slug]/evidence*.md` | No | Cross-reference metrics against source data; flag unverifiable claims |
| `docs/active/content-writing-standards.md` | Auto-loaded | Voice, tone, anti-pattern reference |
| `work/[slug]/revision-log.md` | Auto-read if exists | Previous run's scores for delta comparison |

**Draft discovery:** The skill globs `work/[slug]/case-study-draft*.md`. If exactly one file matches, confirm with user ("Found `case-study-draft-v2.md` — use this?"). If multiple match, list them and ask which to analyze. If none match, stop with error.

**Pre-check:** If the draft lacks a one-sentence test (spine) at the top, prompt the user to answer the 4 content-first questions before running analysis. These questions come from the `/content-first-design` skill's philosophy (the skill itself is not invoked — just the questions):

1. Who is this for?
2. What do they need to believe about you?
3. What should they do after reading?
4. How will you know it worked?

If a one-sentence test is present, skip — the draft is past that stage.

---

## The Report

### Top 3 Issues

Priority-ranked. Each: one sentence describing the problem + the fix. The reader knows what to care about before reading details.

### Delta Summary (on re-runs only)

If a previous `revision-log.md` exists, show:

```
DELTA: 5 of 8 issues resolved since last run. 3 remaining.
Score: 24/40 → 31/40 (+7)

Resolved: [Voice.R10.P3], [SoWhat.M2], [Arc.Missing.Lessons], ...
Remaining: [Accuracy.Inconsistency.Markets], [Context.M4], ...
```

Delta matching uses structured issue IDs (see State Management) for precise tracking across runs.

### Structure Section

Does the arc work? (Problem → Insight → Solution → Result → Lessons)

- **Missing sections:** List any required sections absent from the draft (including "Lessons Worth Stealing").
- **Sections that don't earn their space:** Flag any section that restates another or adds no new information.
- **H2 Headline Test:** Table of every H2 as written, pass/fail, and suggested rewrite.

```
| H2 as written            | Passes? | Suggested rewrite                |
|--------------------------|---------|----------------------------------|
| "Background"             | Fail    | "The $482K Problem"              |
| "Results"                | Fail    | "94% Fill in One Quarter"        |
| "What Was Blocking Them" | Pass    | —                                |
```

A passing H2: the reader who reads only the headings can reconstruct the story arc.

### Strategy Section

Does every metric connect to business impact?

- **So-What Checklist:** Table of every metric in the draft. Projected and confirmed metrics held to the same standard — every number must answer "why should a HM care?" The "projected" qualifier is a labeling concern handled by Accuracy.

```
| Metric          | Impact stated? | HM cares because...          |
|-----------------|----------------|-------------------------------|
| "70% faster"    | Bare number    | "Unblocked 29 transfers"      |
| "94% fill rate" | Has baseline   | —                             |
```

- **First-Sentence Test:** First sentence of each paragraph extracted. Does it front-load the key information?

```
P1: PASS  "The process had no owner..."
P2: FAIL  "After careful analysis of..." → lead with the finding
P3: PASS  "Approval rates recovered from 56% to the target."
```

- **Length Check:** Total prose word count (excluding comments, tables, headers). Flag if over 1200 words — a hiring manager at 250 wpm finishes in under 5 minutes. Scored under Scanability; does not independently block.

### Prose Section (Elements of Style)

Strunk's rules applied to every sentence. Produces a rewrite table with **inline choice per item**: accept the rewrite, reject (keep original), or edit (provide your own version). Accepted rewrites flow into the proposed outline; rejected items keep the original phrasing.

Rules checked (with rubric criterion mapping):

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

Also flags:
- Jargon used without definition (with suggested parenthetical)
- Sanitization issues (internal dollar amounts, program codes) if present
- Third-person voice instances that need conversion to first person (flagged, not auto-converted — user decides phrasing)

### Rubric Score

8 criteria, each scored 1-5. Total: /40.

**Hard block threshold:** 28+ overall, no individual criterion below 3. Below threshold = full report displayed (including proposed outline for reference) but no approval prompt shown and no `outline-approved.md` written. User must edit the draft and re-run.

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

**Accuracy scoring without evidence files:** When no `evidence*.md` files exist in the work directory, Accuracy is capped at 4/5. Internal consistency can still be verified, but claims cannot be traced to source data. The report notes: "Accuracy capped at 4 — no evidence files available for cross-referencing."

### Proposed Outline

Full restructured outline in `case-study-playbook.md` format with:
- Accepted Strunk's rewrites applied (rejected items keep original phrasing)
- Jargon defined on first use
- Numbers anchored with baselines and derivations
- Internal inconsistencies resolved
- Voice: third-person instances flagged (not auto-converted)
- Component suggestions as HTML comments (e.g., `<!-- suggest: insight-callout -->`)
- "Lessons Worth Stealing" section included

Component suggestions reference names from `ref/components.md`. If a suggested component name doesn't exist in the component library, the skill notes it as "proposed new component" rather than silently referencing something that doesn't exist.

Editorial comments from the draft (`<!-- CHANGE: ... -->`) are extracted to a **Revision Notes** appendix at the bottom of the outline — prose above stays clean, reasoning trail preserved below.

**Gate behavior:**

1. The proposed outline is always displayed in the report, regardless of score.
2. If score meets threshold (28+ overall, all criteria 3+): prompt "Approve this outline? Write to `outline-approved.md`? [yes/no]"
3. If score is below threshold: display outline for reference only. No approval prompt. Message: "Score below threshold (X/40). Edit the draft and re-run `/revise-case-study`."
4. On approval: write `outline-approved.md` and append to `revision-log.md`.

---

## Outline Format (Handoff Artifact)

Written to `work/[slug]/outline-approved.md` after approval:

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

**What's already done in this file:**
- Strunk's rewrites applied (per inline choices)
- Jargon defined on first use
- Numbers anchored with baselines and derivations
- Internal inconsistencies resolved
- Component suggestions embedded as HTML comments
- "Lessons Worth Stealing" section included
- Editorial comments extracted to appendix

**What `/new-case-study` Prompt 2 does with it:**
- Reads this outline + `ref/components.md` + `ref/chartjs-pattern.md`
- Builds the HTML using design tokens and case study CSS
- Uses component suggestions as starting points (can override)
- Does not re-edit the prose — the words are final

---

## State Management

### Revision Log

Each run appends to `work/[slug]/revision-log.md` (gitignored — verify `work/*/revision-log.md` is in `.gitignore` on first run):

```markdown
## Run: 2026-03-05 21:45

Rubric: 24/40
| Criterion | Score |
|-----------|-------|
| Arc       | 3     |
| So-What   | 2     |
| ...       | ...   |

Issues: 8 total
1. [Arc.Missing.Lessons] Lessons Worth Stealing section absent
2. [SoWhat.M2] "70% faster" — bare number, no business impact stated
3. [Voice.R10.P3] "The process was redesigned" — passive voice
4. [Accuracy.Inconsistency.Markets] "17 markets" in P2 vs "18 markets" in P7
...

---
```

**Issue ID format:** `[Criterion.Type.Location]` — enables precise delta matching across runs. Examples:
- `[Voice.R10.P3]` — Strunk's Rule 10 violation in paragraph 3
- `[Accuracy.Inconsistency.Markets]` — internal contradiction about market count
- `[Arc.Missing.Lessons]` — required section absent
- `[SoWhat.M2]` — metric #2 lacks business impact connection
- `[Context.M4]` — metric #4 has no baseline

On subsequent runs, the skill reads the last entry and computes a delta:
- Issues resolved (ID present in last run, absent now)
- Issues remaining (ID present in both runs)
- New issues (ID absent in last run, present now)
- Score change per criterion and overall

---

## Evidence File Cross-Referencing

When `work/[slug]/evidence*.md` files exist:

1. Extract every numeric claim from the draft
2. Search evidence files for corresponding source data
3. **Match found:** Verify the number matches the source. Flag discrepancies.
4. **No match found:** Flag as "unverifiable claim — no source in evidence files"

This informs the **Accuracy** criterion score. A draft with multiple unverifiable claims scores lower on Accuracy regardless of internal consistency. When no evidence files exist, Accuracy is capped at 4/5 (see Rubric Score section).

---

## Relationship to Existing Tools

| Tool | Role | Relationship |
|------|------|-------------|
| `/content-first-design` | Upstream philosophy | `/revise-case-study` checks for one-sentence test; if missing, prompts the 4 content-first questions. The skill itself is not invoked — just its core questions. |
| `/new-case-study` | Downstream HTML builder | Receives `outline-approved.md` at Prompt 2; does not touch prose. Component suggestions are advisory. |
| `/elements-of-style` | Embedded | Strunk's rules run inside the Prose section; not invoked separately |
| `content-reviewer` agent | Replaced for this workflow | Agent's checks are folded into the rubric; no need to dispatch separately |
| `/content-audit` | Complementary | Content-audit scores existing published pages; revise-case-study scores drafts pre-publication |
| `content-writing-standards.md` | Reference | Auto-loaded; anti-patterns checked against this doc |
| `JTBD.md` | Informing doc | Audience time budgets (HM: 3-5 min, recruiter: 15-30 sec) informed rubric design and 1200-word ceiling; not loaded at runtime |

---

## Design Decisions (ADR-style)

**Why one gate, not three?**
Three gates transfers integration complexity to the user (holding context across approvals), creates decision fatigue, and feels disproportionate to editing a single markdown file. A process you skip is worse than no process. Single pass, one report, one approval.

**Why inline choice per rewrite, not batch accept?**
Some rewrites improve the sentence; others lose nuance. Batch accept produces an outline with phrasing you didn't choose. Batch reject wastes the analysis. Per-item choice gives control without blocking progress.

**Why hard block below threshold?**
A "warn but allow" threshold trains you to ignore warnings. The rubric exists to enforce quality — if the score says the draft isn't ready, the draft isn't ready. Edit and re-run. The full report (including outline) is still displayed so you can see what needs fixing — you just can't approve it.

**Why flag voice conversion instead of auto-converting?**
"Taylor owned" → "I owned" is simple, but "Taylor's constraint" → "My constraint" can sound awkward. Voice conversion requires judgment about phrasing, not just find-and-replace. Flagging surfaces every instance; you decide the wording.

**Why no HM simulation?**
Asking Claude to roleplay a hiring manager produces plausible but unverifiable feedback. The so-what checklist catches the same failures deterministically. Real audience validation requires a real person.

**Why no book-library search at runtime?**
The 14 portfolio case study rules were synthesized from StoryBrand, HBR Job Search, Mastering Behavioral Interviews, and established PM portfolio conventions. Those principles are now baked into the 8 rubric criteria. Re-searching the library every time adds latency for zero marginal insight.

**Why 8 criteria, not 5 or 14?**
5 (content-audit's generic criteria) misses case-study-specific concerns like Context and Arc. 14 (the original rules list) created scoring noise. 8 captures every failure mode surfaced by both the content-reviewer agent and content-audit skill when run against a real draft, with no redundancy.

**Why include Accuracy with evidence cross-referencing?**
Both review agents independently flagged internal inconsistencies (17 vs 18 markets) and unverifiable arithmetic (67% reduction that's actually 71%). Cross-referencing evidence files catches claims that are internally consistent but factually wrong against source data. Unverifiable claims are flagged because a hiring manager who asks "where did that number come from?" deserves an answer. Without evidence files, Accuracy caps at 4/5 — internal consistency can be checked, but source verification cannot.

**Why extract editorial comments to appendix?**
Inline `<!-- CHANGE: ... -->` comments serve the writer during drafting but clutter the outline that feeds into HTML production. Extracting them preserves the reasoning trail (useful for interview prep: "why did you structure it this way?") without polluting the prose.

**Why component suggestions instead of mandates?**
Component placement is a visual design decision, not a content quality decision. `/revise-case-study` owns content; `/new-case-study` owns presentation. Suggestions give Prompt 2 a head start without constraining it — the component library may evolve, and a better layout option may exist. Suggestions reference `ref/components.md` names; if a suggested name doesn't exist there, it's flagged as "proposed new component."

**Why 1200-word ceiling?**
JTBD doc defines a 3-5 minute HM time budget. At 250 wpm average reading speed, 1200 words = 4.8 minutes. This keeps the case study within the time budget with slight margin. The ceiling flags under Scanability but does not independently block — a 1300-word draft that scores well on all other criteria can still proceed.

**Why revision-log.md instead of hidden JSON?**
Human-readable, inspectable without tooling, and doubles as an audit trail. You can read it yourself to see how a draft evolved across multiple revision passes. Gitignored alongside evidence files.

**Why structured issue IDs?**
Plain-text issue summaries make delta matching fragile — rephrasing the same issue between runs makes it look "resolved." Structured IDs like `[Voice.R10.P3]` give deterministic matching: same violation, same ID, accurate delta. The format `[Criterion.Type.Location]` is human-readable while being machine-matchable.

**Why glob for draft discovery instead of hardcoded filename?**
Drafts evolve through versions (`case-study-draft.md`, `case-study-draft-v2.md`, `case-study-draft-final.md`). Globbing finds whatever exists; user confirmation prevents analyzing the wrong version.

---

_Created: 2026-03-05_
_Updated: 2026-03-05 (code review fixes incorporated: C1-C3, I1-I5, S1, S3)_
