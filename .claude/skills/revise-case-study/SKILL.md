---
name: revise-case-study
description: Use when a markdown case study draft needs content quality scoring before building the HTML page with /new-case-study
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
- **No matches:** Stop — "No case-study-draft*.md found in `work/{{slug}}/`."

## Step 2: Load Inputs

Read these files:

1. The confirmed draft file
2. `docs/active/content-writing-standards.md` (voice, tone, anti-patterns)
3. `ref/components.md` (component library — for outline suggestions)
4. `work/{{slug}}/evidence*.md` (if any — for cross-referencing)
5. `work/{{slug}}/revision-log.md` (if exists — for delta comparison)

## Step 3: Pre-Check (Spine)

Check if draft has a one-sentence test (spine): "I [did X] which [achieved Y] despite [constraint Z]."

**Detection:** Look for (a) section headed "One-Sentence Test" or "Spine", or (b) the first blockquote in the first 20 lines matching the pattern. If neither found, prompt user:

1. Who is this for?
2. What do they need to believe about you?
3. What should they do after reading?
4. How will you know it worked?

If present, skip.

## Step 4: Single-Pass Analysis

Run all five checks in one pass. Do not present intermediate results. Voice score and outline are **provisional** — recomputed in Phase B after user prose choices.

### 4a. Structure Check

Does the arc work? (Problem → Insight → Solution → Result → Lessons)

- **Missing sections:** Required: Problem, Root Cause (or Insight), Solution, Results, Lessons Worth Stealing.
- **Redundant sections:** Flag any section that restates another.
- **H2 Headline Test:** Table: `H2 as written | Passes? | Suggested rewrite`. Pass = reader reconstructs story arc from headings alone. e.g., "Background" → Fail → "The $482K Problem"

### 4b. Strategy Check

- **So-What Checklist:** Table every metric: `Metric | Impact stated? | HM cares because...`. Every number must answer "why should a HM care?" e.g., "70% faster" → Bare number → "Unblocked 29 transfers"
- **First-Sentence Test:** Extract first sentence of each prose paragraph in Problem, Root Cause, Solution, Results, Lessons. (Skip spine, Scope, tables, sections < 2 sentences.) Does it front-load key info? Format: `P1: PASS/FAIL "sentence" → fix`
- **Length Check:** Prose word count (excluding comments, tables, headers). Flag if >1200 words. Scored under Scanability.

### 4c. Prose Check (Elements of Style)

Apply Strunk's rules. Rewrite table with **inline choice per item**: accept / reject / edit.

| Rule | Description | Feeds Criterion |
|------|-------------|-----------------|
| R10 | Active voice | Voice |
| R11 | Positive form | Voice |
| R12 | Specific/concrete | Specificity |
| R13 | Omit needless words | Scanability |
| R16 | Related words together | Scanability |
| R18 | Emphatic words at end | So-What |

Table format: `# | Original | Rule | Rewrite | Decision`

**Cap at 15 items**, priority: R10 > R12 > R18 > R11 > R13 > R16. If total violations exceed 15, note count and that remaining are minor.

**Also flag:** jargon without definition, sanitization issues, third-person voice (flagged, not auto-converted). Choices collected in Step 5 Phase A pause.

### 4d. Rubric Scoring (Provisional)

8 criteria, each 1-5, total /40. Voice scored provisionally; recomputed in Phase B.

| # | Criterion | 1 (fail) | 5 (pass) |
|---|-----------|----------|----------|
| 1 | **Arc** | Sections missing or disordered | Clear tension, turning point, payoff, lesson |
| 2 | **So-What** | Bare numbers without context | Every number answers "why should a HM care?" |
| 3 | **Scanability** | Generic headers, buried ledes, >1200w | H2s reconstruct arc; first sentences front-load |
| 4 | **Specificity** | "Significantly improved" | "Reduced 70% (16.98 → 2.28 weeks)" |
| 5 | **Context** | Numbers without anchoring | Before → after; derivation provided |
| 6 | **Voice** | Passive, self-congratulatory, undefined acronyms | Active, reader-focused, jargon defined |
| 7 | **One Lesson** | Unclear or competing messages | Reader states lesson in one sentence |
| 8 | **Accuracy** | Contradictions, unverifiable claims | All numbers cross-check; evidence supports |

**Accuracy without evidence files:** Cap at 4/5.

**Evidence cross-referencing:** Extract numeric claims → search evidence files → verify matches → flag discrepancies or unverifiable claims.

### 4e. Outline Generation (Provisional)

Draft outline using suggested rewrites. Updated in Phase B after user choices.

```markdown
# [Tension-Driven Headline]
[Tagline: Role/Scope | Scale | Constraint]
Tech: [tool/method pills]
---
## Scope — Timeline | Role | Teams | Artifacts
## The Problem — what was broken (numbers + baselines), why it mattered
## Root Cause — what you found that others missed, supporting data
## The Solution — what you built/changed, how it worked
## Results — metrics table (Before | After), baselines and derivations
## Lessons Worth Stealing — 3-4 transferable insights, one sentence each
---
## Revision Notes — extracted editorial comments
```

**Rules:** Apply accepted rewrites; keep rejected originals. Define jargon on first use. Anchor numbers with baselines. Flag third-person with `<!-- VOICE: convert to first person -->`. Suggest components via HTML comments referencing `ref/components.md` (note if proposed component is new). Extract `<!-- CHANGE: ... -->` to Revision Notes.

## Step 5: Present the Report

**Phase A** (present first, then pause):
1. **Top 3 Issues** (priority-ranked, one sentence each)
2. **Delta Summary** (re-runs only — see below)
3. **Structure Section** (4a results)
4. **Strategy Section** (4b results)
5. **Prose Section** (4c rewrite table)

**Wait for user inline choices (accept/reject/edit per row).**

**Phase B** (after choices resolved — recompute before displaying):
6. **Rubric Score** (recompute Voice; other 7 unchanged)
7. **Proposed Outline** (apply user's choices)

### Delta Summary (re-runs only)

If `revision-log.md` exists: `DELTA: X of Y issues resolved. Z remaining. Score: old → new (+diff). Resolved: [IDs]. Remaining: [IDs].`

## Step 6: Gate

**Score < 28/40 OR any criterion < 3:** Show outline for reference. "Score below threshold (X/40). Edit draft and re-run `/revise-case-study {{slug}}`." Do NOT write `outline-approved.md`. DO append revision log.

**Score >= 28/40 AND all >= 3:** "Approve this outline? Write to `outline-approved.md`?" On yes: write file, append log, message "Run `/new-case-study {{slug}}` — skip to Prompt 2." On no: ask what to change.

## Step 7: Append Revision Log

Append to `work/{{slug}}/revision-log.md` (create if needed). On first run, warn if not in `.gitignore` (informational, not a gate).

Format: `## Run: [YYYY-MM-DD HH:MM]` → `Rubric: [total]/40` table (8 criteria + scores) → `Issues: [N] total` list with `[Criterion.Type.Location]` IDs and summaries → `Outcome: [Approved / Blocked (score X/40)]`

**Issue ID examples:** `[Voice.R10.P3]` (Rule 10 in paragraph 3), `[SoWhat.M2]` (metric #2 lacks impact). Location is positional — insertions/deletions between runs cause false deltas (known limitation).

---

## What This Skill Does NOT Do

- Does not build HTML (→ `/new-case-study` Prompt 2)
- Does not invoke `/elements-of-style` or `/content-first-design` — rules embedded in rubric
- Does not dispatch `content-reviewer` agent — checks folded into rubric
- Does not auto-convert voice — flags for user decision
