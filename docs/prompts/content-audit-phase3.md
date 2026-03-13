# Portfolio Content Audit — Phase 3: Protected Pages + Cross-Cutting

## What this is

Two tasks in one phase:
- Part A: Deep review of the 3 protected case studies (same method as Phase 2)
- Part B: Cross-cutting consistency checks across all pages

## Before you start

Read:
- `docs/active/audit-phase1-standards.md` — voice rules and severity guide
- `docs/active/audit-phase2-public.md` — Phase 2 findings (so you can compare public ↔ protected)

---

## Part A: Protected Pages Deep Review

### Pages
1. `work/cfa-dsp-application/dsp-application.html`
2. `work/contract-transfer/contract-transfer.html`
3. `work/pinnacle-program-selection/pinnacle-automation.html`

### Method

Same as Phase 2. For each page:

**Step 1 — Comprehension (before any critique):**
- One-sentence summary of what the page argues
- Three strongest sentences and why they work
- The interview question a hiring manager would ask

**Step 2 — Logic and flow:**
- Section-by-section transition check
- Flag gaps where the reader has to infer connections

**Step 3 — Clarity and voice:**
- Flag sentences needing Amazon context, re-reading, or with voice drift

**Step 4 — Reader experience:**
- Can you name the ONE thing and why it mattered?
- Any repeated points or momentum loss?

**Step 5 — Public ↔ Protected comparison (NEW for this phase):**
For each page, compare against its public counterpart from Phase 2:
- Does the protected version have MORE detail in every section? (It should — it's the richer version)
- Flag any content that exists on the public version but NOT on the protected version
- Are the anonymized terms correctly swapped? (Reference the anonymization guides from Phase 1)
- Do the narrative arcs match — same sections, same order, same argument?

### Output format

Same as Phase 2, plus the comparison findings:

```
## [Page Name — Protected]

### Comprehension
- Summary: [one sentence]
- Strongest sentences: [3, with why]
- Interview question: [specific]

### Findings
#### MUST FIX
#### SHOULD FIX
#### NICE TO HAVE

### Public ↔ Protected Comparison
- Content on public but missing from protected: [list]
- Structural differences: [list]
- Anonymization accuracy: [pass/fail with specifics]
```

---

## Part B: Cross-Cutting Consistency

After reviewing all protected pages, run these checks across ALL 7 case study pages + homepage + resume.

### 1. Terminology table

Build this table. Every cell should say what term is used on that page. Flag mismatches.

| Term | Homepage | PA Pub | PA Prot | CT Pub | CT Prot | PIN Pub | PIN Prot | Resume |
|------|----------|--------|---------|--------|---------|---------|----------|--------|
| 29 _____ (cases/transfers) | | | | | | | | |
| partners called _____ | | | | | | | | |
| average called _____ (network/program) | | | | | | | | |
| transfer process called _____ | | | | | | | | |
| expansion program called _____ | | | | | | | | |
| performance tier called _____ | | | | | | | | |
| benchmark called _____ | | | | | | | | |

### 2. Metric consistency

For every number below, verify it appears identically on every page that references it. Flag discrepancies with exact quotes.

- 87% / 86.6% decision cycle
- 16.98 → 2.28 weeks
- 29 cases
- 274% YoY
- +18 pp
- 57.9% → 94.1%
- 3 → 10 team
- 26% → 60% completion
- 0.25 → 3.8 engineers
- 11% → 21% approval

### 3. Structural parity

For each case study pair, verify these components match:

| Component | PA | CT | PIN |
|---|---|---|---|
| TL;DR present (both tiers) | | | |
| TL;DR default state (open/closed) matches | | | |
| Scope-meta present (both tiers) | | | |
| Scope-context paragraph present (both tiers) | | | |
| Pull-quote present (both tiers) | | | |
| Metrics row card count matches | | | |
| Lessons count matches | | | |
| Unlock CTA present (public only) | | | |

### 4. "Read next" link chain

Verify both chains are complete and circular:

**Public chain:**
PA Public → [title, URL] → CT Public → [title, URL] → PIN Public → [title, URL] → PA Public

**Protected chain:**
PA Protected → [title, URL] → CT Protected → [title, URL] → PIN Protected → [title, URL] → PA Protected

Verify every CTA uses the short page title (not the H1, not a paraphrase).

---

## Save output to `docs/active/audit-phase3-protected-crosscutting.md`
