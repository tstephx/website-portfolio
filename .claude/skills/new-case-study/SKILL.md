---
name: new-case-study
description: Scaffold a new case study using the 3-prompt content-first pattern
disable-model-invocation: true
args:
  - name: slug
    description: URL-friendly directory name (e.g., "fleet-optimization")
    required: true
  - name: title
    description: Working title for the case study
    required: true
---

# New Case Study

Scaffold a case study page using the 3-prompt content-first workflow from CLAUDE.md.

## Step 1: Create directory and evidence placeholder

```bash
mkdir -p work/{{slug}}
```

Create `work/{{slug}}/evidence.md` with sections:
- Context / Background
- Problem Statement
- Data Sources
- Process / Approach
- Results / Metrics
- Lessons

Tell the user: "Fill in `work/{{slug}}/evidence.md` with raw evidence, then run Prompt 1."

## Step 2: Prompt 1 — Research & Structure

Read evidence file and any dashboard `.jsx` in the directory.
Read an existing case study as a template (e.g., `work/contract-transfer/contract-transfer.html`).
Produce an outline mapping sections to evidence data. Do NOT create the HTML yet.

Present the outline for approval.

## Step 3: Prompt 2 — Create HTML

After outline approval, build `work/{{slug}}/{{slug}}.html` using:
- Template structure from existing case studies
- Design tokens from `css/styles.css` (57 custom properties)
- Components from `ref/components.md`
- Chart.js token-driven pattern from `ref/chartjs-pattern.md`
- Every claim gets a number

## Step 4: Prompt 3 — Graphics Review

Read any `.jsx` dashboard file in the directory.
Identify visualizations worth adding as Chart.js charts.
Propose before implementing.

## Step 5: Integration

After all 3 prompts complete:

1. Add homepage card to `index.html` in the appropriate section
2. Update the circular link chain (see CLAUDE.md for current chain)
3. Update `ref/site-map.md` with the new page
4. Update `npm run lint:html` script in `package.json` to include the new page

## Definition of Done

- [ ] Paths correct for depth (`../../css/`, `../../js/`)
- [ ] Has `<link rel="canonical">` pointing to production URL
- [ ] Has `<div class="reading-progress"></div>` as first `<body>` child
- [ ] Has `<script src="../../js/progress-bar.js" defer>`
- [ ] Index card added
- [ ] Link chain updated (circular)
- [ ] Chart.js uses token-driven pattern (no hardcoded colors)
- [ ] `npm run check` passes
