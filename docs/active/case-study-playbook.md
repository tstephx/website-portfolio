# Case Study Playbook

How to build a case study from raw evidence to published page. The `/new-case-study` skill scaffolds the files — this playbook covers the content strategy behind each step.

---

## Before You Start

Answer these four questions (from content-first design):

1. **Who is this for?** — A hiring manager screening for [specific role]. What do they need to believe about you?
2. **What's the one thing?** — One sentence: "I [did X] which [achieved Y] despite [constraint Z]."
3. **What should they do?** — Read the full case study → contact you / request access.
4. **How will you know it worked?** — Time on page, access requests, interview mentions.

If you can't answer all four, don't write yet.

---

## The 3-Prompt Pattern

### Prompt 1: Research and Structure

**Input:** Evidence files (`.md`, `.jsx` dashboards) in the `work/[slug]/` directory.

**What to do:**

- Read all evidence files
- Read an existing case study as template (e.g., `work/contract-transfer/contract-transfer.html`)
- Map evidence → sections, identifying which data supports which claim
- Produce an outline — not HTML yet

**Outline format:**

```
H1: [Headline — specific, tension-driven, no jargon]
Tagline: [One-line summary with scope]
Tech pills: [Tools/methods used]

Scope callout: Timeline | Role | Teams | Artifacts

Section 1 — The Problem
  - What was broken (with numbers)
  - Why it mattered (cost/impact)
  - Insight callout before metrics

Section 2 — Root Cause Analysis
  - What you found that others missed
  - Supporting data

Section 3 — The Solution
  - What you built/changed
  - How it worked (process, not just result)

Section 4 — Results
  - Insight callout → metrics row
  - Every claim has a number
  - Before/after comparisons where possible

Section 5 — Lessons Worth Stealing
  - 3-4 transferable insights
  - Written for the reader, not about you
```

**Review the outline before proceeding.** Structure problems are 10x cheaper to fix here than in HTML.

### Prompt 2: Create HTML

**Input:** Approved outline + evidence + template structure.

**Rules:**

- Every claim gets a number
- Use components from `ref/components.md`
- Chart.js follows token-driven pattern from `ref/chartjs-pattern.md`
- Paths: `../../css/`, `../../js/` (work pages are 2 levels deep)

### Prompt 3: Graphics Review

**Input:** Dashboard `.jsx` files (if they exist).

**What to do:**

- Identify which visualizations add understanding (not decoration)
- Propose Chart.js implementations before building
- Only add charts that make the data clearer than a table would

---

## Content Standards (applied across all case studies)

### Headlines

```
Bad:  "Process Improvement Project"
Bad:  "Finding the Mathematical Flaw No One Else Saw"
Good: "One Panelist Scored 5. Another Scored 57. Same Candidate, Same Interview."
```

A good headline creates tension and specificity. The reader should think "how?" or "what happened?"

### Voice

- Active voice: "I redesigned" not "The process was redesigned"
- Specific: "reduced from 9.6 to 2.9 weeks" not "significantly improved"
- Reader-focused: "Here's what this means for your team" not "I'm proud of this result"

### Anti-patterns to avoid

| Anti-pattern           | Example                    | Fix                                                 |
| ---------------------- | -------------------------- | --------------------------------------------------- |
| Self-congratulatory    | "I brilliantly discovered" | "The data showed"                                   |
| Blaming others         | "The team was failing"     | "The process had no owner"                          |
| Vague claims           | "Significantly improved"   | "Reduced 70% (9.6 → 2.9 weeks)"                     |
| Jargon without context | "BPR scoring methodology"  | "The interview scoring system (BPR)"                |
| Passive voice          | "Errors were eliminated"   | "The script eliminated errors"                      |
| Generic sections       | "Overview" / "Background"  | "The $482K Problem" / "Why 77% of Panels Disagreed" |

### Lessons section

Header: "Lessons Worth Stealing" (not "What This Taught Me" — frame for the reader).

Each lesson should be:

- One sentence, actionable
- Transferable beyond this specific project
- Something the reader can use tomorrow

---

## Integration Checklist (after all 3 prompts)

- [ ] `<link rel="canonical" href="https://taylorstephens.io/work/[slug]/[file].html">`
- [ ] `<div class="reading-progress"></div>` as first `<body>` child
- [ ] `<script src="../../js/progress-bar.js" defer>`
- [ ] Homepage card added to `index.html` in Featured Projects section
- [ ] Link chain updated (circular): add new page into the chain
- [ ] `ref/site-map.md` updated with new page
- [ ] `package.json` `lint:html` script includes new page path
- [ ] `npm run check` passes
- [ ] `npx playwright test tests/a11y.spec.js` passes for new page

---

_Created: 2026-03-04_
