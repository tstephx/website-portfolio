---
name: content-audit
description: Full content audit pipeline — mechanical checks, standards, deep review, cross-cutting, agent review, and triage plan
disable-model-invocation: true
args:
  - name: phase
    description: "Run a specific phase: 0, 1, 2, 3, agents, 4. Default: auto-resume from last completed phase"
    required: false
---

# Content Audit Pipeline

5-phase content audit with specialist agent reviews. Produces a deduplicated, prioritized fix plan with executable prompts.

## Pipeline

| Phase | What | Output File | Prereqs |
|-------|------|-------------|---------|
| 0 | Mechanical checks (bash) | `docs/active/audit-phase0-results.txt` | — |
| 1 | Standards internalization | `docs/active/audit-phase1-standards.md` | Phase 0 |
| 2 | Public pages deep review | `docs/active/audit-phase2-public.md` | Phase 1 |
| 3 | Protected + cross-cutting | `docs/active/audit-phase3-protected-crosscutting.md` | Phases 1, 2 |
| agents | 4 specialist reviews | (in-session transcript) | Phases 2, 3 |
| 4 | Triage and fix plan | `docs/active/audit-phase4-fix-plan.md` + `docs/prompts/content-fixes-batch[1-4].md` | All above |

## Step 1: Auto-Resume

Check which output files exist in `docs/active/`:

```
audit-phase0-results.txt     → Phase 0 done
audit-phase1-standards.md    → Phase 1 done
audit-phase2-public.md       → Phase 2 done
audit-phase3-protected-crosscutting.md → Phase 3 done
audit-phase4-fix-plan.md     → Phase 4 done (audit complete)
```

Report: "Phases [X] complete. Resuming from Phase [Y]."

If `--phase` is specified, run only that phase (re-read prerequisites first). If no `--phase`, resume from the next incomplete phase.

If all outputs exist, report "Audit complete. Run again? This will overwrite existing outputs." and wait for confirmation.

---

## Phase 0: Mechanical Checks

Read and execute `docs/prompts/content-audit-phase0.md`.

This runs bash scripts that check:
- Anonymization leaks (dollar signs, company names, program names on public pages)
- Sentence length (>35 words)
- Read Next CTA chain completeness
- Number consistency across all pages

Save output to `docs/active/audit-phase0-results.txt`.

---

## Phase 1: Standards Internalization

Read and execute `docs/prompts/content-audit-phase1.md`.

Read these files in order:
1. `CLAUDE.md` — brand, audience, design principles
2. `docs/active/content-writing-standards.md` — voice, anti-patterns
3. `docs/active/JTBD.md` — audience personas, time budgets
4. `work/contract-transfer/anonymization-guide.md`
5. `work/cfa-dsp-application/DSP-anonymization-guide.md`
6. `work/pinnacle-program-selection/anonymization-guide.md`
7. `docs/active/audit-phase0-results.txt` — Phase 0 output

Produce a standards summary with: voice rules, audience contract, anonymization boundaries, Phase 0 issues, severity guide.

Save to `docs/active/audit-phase1-standards.md`.

---

## Phase 2: Public Pages Deep Review

Read and execute `docs/prompts/content-audit-phase2.md`.

Close reading of 4 public pages: `index.html`, PA public, CT public, PIN public. For each page: comprehension (summary, 3 strongest sentences, interview question), then findings by severity (MUST FIX / SHOULD FIX / NICE TO HAVE).

Save to `docs/active/audit-phase2-public.md`.

---

## Phase 3: Protected Pages + Cross-Cutting

Read and execute `docs/prompts/content-audit-phase3.md`.

Part A: Deep review of 3 protected pages (same method as Phase 2, plus public↔protected comparison and anonymization verification).

Part B: Cross-cutting checks — terminology table, metric consistency, structural parity, Read Next link chain.

Save to `docs/active/audit-phase3-protected-crosscutting.md`.

---

## Agent Review Step

After Phase 3, dispatch 4 specialist agents in parallel. Each agent gets the Phase 1 standards and relevant findings as context.

### Agent 1: content-writer

```
Read these files:
- docs/active/audit-phase1-standards.md (voice rules, severity guide)
- docs/active/audit-phase2-public.md (Phase 2 findings)
- index.html (homepage)
- work/partner-application-public/index.html
- work/contract-transfer-public/index.html
- work/pinnacle-public/index.html

You are a professional content writer reviewing a PM portfolio. Your job:

1. CONFIRM or DISPUTE each Phase 2 finding. For each:
   - If you agree: say so briefly
   - If you disagree: explain why and what the audit got wrong
   - If the severity is wrong: recommend the correct severity

2. Find writing issues the audit MISSED. Look for:
   - Buried ledes (punchline at end of paragraph instead of beginning)
   - Missing structural elements (insight callouts, visual breaks)
   - Weak section headers (pure labels instead of tension-building)
   - Ambiguous pronouns
   - Sentences that require domain knowledge to parse
   - Inconsistent terminology within a single page

3. For each new issue: specify the file, approximate line, severity, and a suggested fix.

Do NOT execute any fixes. Report findings only.
```

### Agent 2: code-reviewer

```
Read these files:
- docs/active/audit-phase1-standards.md
- docs/active/audit-phase3-protected-crosscutting.md (structural findings)
- All 6 case study HTML files (3 public + 3 protected)

You are reviewing the HTML for structural correctness, accessibility, and consistency. Your job:

1. CONFIRM or DISPUTE each Phase 3 structural/parity finding.

2. Find structural issues the audit MISSED. Check:
   - Semantic HTML: are pull quotes using correct elements? Are headings in order?
   - Accessibility: do data tables have proper attributes (role, aria-labelledby, scope, caption id)?
   - Do emoji/icon elements have aria-hidden="true"?
   - Font preload consistency between public and protected versions
   - Script loading consistency (defer, placement)
   - Entity encoding consistency (literal characters vs HTML entities)

3. For EVERY accessibility fix, check prerequisites. Example: if recommending aria-labelledby, verify the referenced id actually exists. If it doesn't, note that both must be added together.

Do NOT execute any fixes. Report findings only.
```

### Agent 3: story-reviewer

```
Read these files:
- docs/active/audit-phase1-standards.md (anonymization boundaries)
- work/contract-transfer/anonymization-guide.md
- work/cfa-dsp-application/DSP-anonymization-guide.md
- work/pinnacle-program-selection/anonymization-guide.md
- All 6 case study HTML files + index.html + resume.html

You are a fact-checker and math reviewer. Your job:

1. VERIFY EVERY MATH CLAIM on every page:
   - Percentage calculations: if "X% increase" is claimed with before/after numbers, check the math
   - Multiplications: if "$X × Y = $Z" is stated or implied, verify
   - Rates: if "N% rejection from M submissions = K passed" — check

2. ANONYMIZATION COMPLIANCE (public pages only):
   - For each anonymization guide entry, verify the public page uses the correct replacement
   - Flag any exact figures that should be rounded or generalized

3. NUMBER DRIFT across pages:
   - Compare every number on the resume against the case study it references
   - Check for qualifier drift ("$13M" vs "$13M+" — the "+" matters)
   - Check homepage card numbers against their source case studies

4. For each finding: cite exact text, file, approximate line, and the correct value.

Do NOT execute any fixes. Report findings only.
```

### Agent 4: career-coach

```
Read these files:
- docs/active/audit-phase1-standards.md (audience contract)
- docs/active/JTBD.md (personas and time budgets)
- docs/active/audit-phase2-public.md (Phase 2 findings)
- index.html + all 3 public case study pages

Simulate two reads:

**Read 1 — Recruiter (15-30 seconds, homepage only):**
- Can you write a 1-sentence pass-through note with a specific metric?
- Is the seniority signal clear within 15 seconds?
- What would make you close the tab?

**Read 2 — Hiring Manager (30s homepage, then 5 min on ONE case study):**
- Which case study would you click? Why?
- After reading it, would you schedule a phone screen? Why/why not?
- What's the one thing you'd remember in the debrief?

Then evaluate strategically:
1. Homepage card ordering — which case study should lead and why?
2. Are any metrics presented as confirmed results when they're actually projections?
3. Identify ONE section in each case study that could be cut to tighten the page
4. Flag any sentences that tip into self-congratulatory or defensive territory
5. Does each case study end on its strongest note, or does the ending dilute the impact?

Do NOT execute any fixes. Report findings only.
```

### After all agents complete

Summarize findings from all 4 agents. Note:
- Confirmations (audit findings validated)
- Disputes (audit findings challenged — include agent's reasoning)
- New issues discovered by agents that the audit missed
- Conflicts between agents (different severity ratings, contradictory recommendations)

Inform user: "Agent reviews complete. Ready for Phase 4 (triage plan). Continue?"

---

## Phase 4: Triage and Fix Plan

Read and execute `docs/prompts/content-audit-phase4.md`.

Consolidate ALL findings from Phases 0-3 AND all 4 agent reviews. Produce:

1. **Conflict resolution table** — where agents disagree with each other or with audit, make a call and document reasoning
2. **Deduplicated issue list** — group overlapping findings into single issues with all sources cited
3. **4 batches** sequenced by severity:
   - Batch 1: MUST FIX (math errors, anonymization, broken references)
   - Batch 2: SHOULD FIX (clarity, voice, a11y, structural parity)
   - Batch 3: STRATEGIC (card reorder, section cuts — requires Taylor's approval)
   - Batch 4: NICE TO HAVE (cosmetic, polish)
4. **Dependency map** — which fixes must happen before others
5. **Effort estimates** per batch
6. **Execution prompts** — find-and-replace specs for Batches 1, 2, 4; decision document for Batch 3

Save to:
- `docs/active/audit-phase4-fix-plan.md` — main triage plan
- `docs/prompts/content-fixes-batch1.md` — MUST FIX (executable after decisions)
- `docs/prompts/content-fixes-batch2.md` — SHOULD FIX (executable)
- `docs/prompts/content-fixes-batch3-decisions.md` — STRATEGIC (decision document)
- `docs/prompts/content-fixes-batch4.md` — NICE TO HAVE (executable)

---

## Constraints

- Do NOT execute any fixes during the audit. Produce the plan only.
- Every finding must cite its source (Phase 0/1/2/3 or which agent).
- Where agents conflict, document both positions and recommend — but flag for Taylor's review.
- Batch 3 items require Taylor's approval before execution.
- Math fixes require Taylor to confirm which number is correct. Flag as DECISION NEEDED.

---

## What This Skill Does NOT Do

- Does not apply fixes (→ run the batch prompt files after review)
- Does not replace `/revise-case-study` (that scores markdown drafts pre-build; this audits finished HTML)
- Does not run the test suite (→ `/check` after fixes are applied)
