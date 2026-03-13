# Portfolio Content Audit — Prompt Suite

## Overview

Four sequential prompts that build on each other. Run them in order. Each one produces an output file that the next one reads.

**Prompt 0:** Mechanical checks (automated script — no LLM judgment needed)
**Prompt 1:** Summarize each page (forces close reading before any critique)
**Prompt 2:** Critique each page against the summaries (editorial judgment)
**Prompt 3:** Cross-cutting consistency check (compares all pages against each other)

---

## Prompt 0 — Automated Mechanical Checks

Run this first. It's a script, not a conversation. Produces `docs/active/audit-mechanical.md`.

```
Read and run the script at docs/prompts/audit-0-mechanical.md. Do not interpret the results — just run the checks and write the output file.
```

## Prompt 1 — Summarize Before Critiquing

```
Read and execute docs/prompts/audit-1-summarize.md
```

## Prompt 2 — Editorial Critique

```
Read docs/active/audit-summaries.md (from Prompt 1), then execute docs/prompts/audit-2-critique.md
```

## Prompt 3 — Cross-Cutting Consistency

```
Read docs/active/audit-summaries.md and docs/active/audit-critique.md, then execute docs/prompts/audit-3-consistency.md
```
