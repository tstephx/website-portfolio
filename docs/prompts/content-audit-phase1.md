# Portfolio Content Audit — Phase 1: Standards Internalization

## What this is

Before reviewing any page, internalize the rules you'll apply. This phase produces a standards summary that Phases 2 and 3 reference.

## Read these files (in order)

1. `CLAUDE.md` — brand personality, audience, design principles, voice
2. `docs/active/content-writing-standards.md` — tone, anti-patterns, before/after examples
3. `docs/active/JTBD.md` — audience personas, time budgets, jobs-to-be-done

Then read the three anonymization guides (these define what differs between tiers):
4. `work/contract-transfer/anonymization-guide.md`
5. `work/cfa-dsp-application/DSP-anonymization-guide.md`
6. `work/pinnacle-program-selection/anonymization-guide.md`

Also read the Phase 0 mechanical results:
7. `docs/active/audit-phase0-results.txt` — automated checks already completed

## Output

After reading all files, produce a single summary document with these sections:

### Voice Rules (from content-writing-standards + CLAUDE.md)
Summarize in 5-7 bullet points. What does good writing sound like on this site? What are the anti-patterns to flag?

### Audience Contract (from JTBD)
For each audience (hiring manager, recruiter, peer PM): what are they looking for, how long do they spend, what makes them stop reading?

### Anonymization Boundaries
For each case study pair, list the 3-4 highest-risk items that were anonymized and what they became. This is your reference for checking the public versions.

### Mechanical Issues Already Found
Summarize anything flagged in Phase 0 results that the deep review should investigate further.

### Severity Guide
Use this for all findings in Phases 2 and 3:
- **MUST FIX**: Factual error, math inconsistency, anonymization leak, broken narrative arc, claim that contradicts another page
- **SHOULD FIX**: Clarity issue, awkward phrasing from find-and-replace, voice drift, abrupt transition, reader has to re-read to parse
- **NICE TO HAVE**: Cosmetic, optional tightening, subjective style preference

Save this summary to `docs/active/audit-phase1-standards.md`. Phases 2 and 3 will reference it.
