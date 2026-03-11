# Partner Application Redesign — Anonymization Guide

_Reference for maintaining public and private versions of the case study._

---

## Risk Assessment

This case study has a **higher confidentiality surface** than Contract Transfer. It names a specific competitor (Chick-fil-A), describes applying to their program as intelligence gathering, and includes precise internal financial figures ($2.1M entitlement, $1.9M vetting cost, $319 per interview). The Chick-fil-A detail is the biggest flag — it's the kind of specific, memorable claim that could circulate and reach Amazon Legal or CFA's team.

---

## Find and Replace Table

### Competitor Identification → Anonymize Completely

This is the highest-risk category. Chick-fil-A is named 5× in the HTML plus once in a tech pill.

| Current (Tier 2)                                                  | Public (Tier 1)                                                            | Notes                                                                            |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `Chick-fil-A` (all instances)                                     | `a best-in-class franchise operator` or `the benchmark franchise`          | 5× in body text, 1× in lessons                                                   |
| `CFA` (all instances)                                             | `the benchmark` or `their application`                                     | Appears in comparison card and body                                              |
| `Chick-fil-A Benchmark` (tech pill)                               | `Franchise Benchmark`                                                      |                                                                                  |
| `CFA Application` (comparison label)                              | `Benchmark Application`                                                    |                                                                                  |
| `I applied to the Chick-fil-A franchise program myself` (lessons) | `I applied to the benchmark franchise program myself`                      | Or soften further: "I went through the benchmark program's application process"  |
| `CFA's Expression of Interest`                                    | `the benchmark's pre-qualification gate`                                   | Internal CFA program term                                                        |
| `40,000 applicants per year, ~0.2% acceptance rate`               | Remove or generalize: `tens of thousands of applicants, sub-1% acceptance` | These are CFA's numbers, not yours — including them makes identification trivial |
| `October 17, 2023`                                                | `Q4 2023`                                                                  | The specific date adds nothing for the reader and narrows identification         |

### Dollar Figures → Relative/Range Language

| Current (Tier 2)                                            | Public (Tier 1)                                                    | Notes                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------- |
| `$2.1M+` (all ~7 instances)                                 | `seven-figure` or `multi-million`                                  | Appears in meta, tagline, TL;DR, problem, solution, results |
| `$1.9M` total vetting cost                                  | `nearly $2M` or `seven-figure vetting cost`                        |                                                             |
| `$319 per final interview versus $15 at application review` | `20× more expensive at final interview than at application review` | Converts to a ratio — same insight, no internal cost data   |
| `$2.1M+ in Annual Entitlement` (tagline)                    | `Multi-Million Annual Entitlement`                                 |                                                             |

### Internal Volume/Conversion Data → Generalize

| Current (Tier 2)                                   | Public (Tier 1)                                                                             | Notes                                             |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `2.9 million marketing page visitors`              | `millions of marketing page visitors`                                                       | Exact traffic is internal data                    |
| `only 415 became program-inclined`                 | `fewer than 500 converted`                                                                  |                                                   |
| `0.014% conversion rate`                           | `sub-0.1% conversion rate` or remove (the 415/2.9M math is the point, not the exact number) |                                                   |
| `25,830 records`                                   | `25,000+ records`                                                                           | Minor — round it                                  |
| `9,419 additional approved applications`           | `9,000+ additional approved applications`                                                   |                                                   |
| `15,699 → 25,118`                                  | Remove the exact before/after or round: `~16K → ~25K`                                       |                                                   |
| `365 more program-inclined candidates (421 → 786)` | `nearly double the program-inclined candidates`                                             |                                                   |
| `2,200+ hours from manual review`                  | `2,000+ hours from manual review`                                                           | Minor rounding                                    |
| `33% recruiting cost increase`                     | Keep as-is                                                                                  | It's a projected percentage, not an actual figure |

### Internal Abbreviations → Plain Language

| Current (Tier 2)                            | Public (Tier 1)                         | Notes                                                                         |
| ------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------- |
| `DSP` / `Delivery Service Partner`          | `delivery partner`                      | "DSP" is public but reads as jargon                                           |
| `DSP Acquisitions`                          | `Partner Acquisitions`                  | Internal team name                                                            |
| `Program Manager, DSP Acquisitions` (scope) | `Program Manager, Partner Acquisitions` |                                                                               |
| `Global DSP Tech Vision 2025`               | `the global technology vision document` | Internal document title                                                       |
| `annual operating plan escalation`          | `annual planning escalation`            | "Operating plan" is Amazon-specific jargon (OP1/OP2)                          |
| `BRD`                                       | `business requirements document`        | Spell out on first use; acronym is industry-standard but worth being explicit |
| `Delivery Driver application`               | `the driver application`                | Minor                                                                         |

### Statistical Details → Keep or Simplify

| Current (Tier 2)                                    | Public (Tier 1) | Notes                                                                       |
| --------------------------------------------------- | --------------- | --------------------------------------------------------------------------- |
| `F = 430.9 (p < 2e-16)`                             | Keep as-is      | This is your analysis methodology, not confidential data. It signals rigor. |
| `one-way ANOVA across six reviewers`                | Keep as-is      | Same — your analytical approach                                             |
| `74% abandonment`                                   | Keep as-is      | Your process metric                                                         |
| `55% dropped at Education, Military & Work History` | Keep as-is      | Your diagnostic finding                                                     |
| `62% rejection rate`                                | Keep as-is      |                                                                             |
| `23% showed program interest`                       | Keep as-is      |                                                                             |
| `32 questions including 5 long-form essays`         | Keep as-is      | Observable from the application itself                                      |
| `~80 fields, 65% free-text`                         | Keep as-is      | Your analysis output                                                        |
| `0.25 → 3.8 engineers`                              | Keep as-is      | Your resource win — this is the story                                       |
| `101 requirements across 8 epics`                   | Keep as-is      | Your deliverable scope                                                      |

### Page Title and Meta

| Current (Tier 2)                                                                             | Public (Tier 1)                                                                     | Notes                                                                       |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `<title>DSP Application Redesign</title>`                                                    | `Partner Application Redesign`                                                      | Match the homepage card                                                     |
| H1: `74% of the people who started Amazon's delivery partner application never finished it.` | `74% of the people who started the delivery partner application never finished it.` | Drop "Amazon's" — your LinkedIn already says Amazon, the H1 doesn't need it |
| Meta description mentioning `$2.1M+`                                                         | Replace with `multi-million`                                                        |                                                                             |
| `competitive intelligence from a franchise benchmark` (meta)                                 | Keep — it's vague enough                                                            |                                                                             |

---

## What Stays the Same in Both Tiers

- The 74% abandonment rate and where it happened (your diagnostic)
- The ANOVA analysis and statistical findings (your methodology)
- The six problems identified (your diagnosis)
- The comparison framework (Amazon vs. benchmark — just anonymize the benchmark name)
- The architecture redesign decisions (your work product)
- The three technology paths evaluation (your analysis)
- The evidence chain strategy (BRD → vision → escalation)
- The 0.25 → 3.8 engineer resource win
- All four "Lessons Worth Stealing"
- The completion rate / inclination rate improvements
- The 101-requirement scope

---

## Implementation Checklist

- [ ] Create `/work/cfa-dsp-application-public/` directory (or rename to `partner-application-public/`)
- [ ] Copy `dsp-application.html` → `index.html` in new directory
- [ ] Replace all Chick-fil-A / CFA references (highest priority)
- [ ] Replace all dollar figures with relative language
- [ ] Generalize exact volume/conversion numbers
- [ ] Replace DSP → delivery partner throughout
- [ ] Update page title and meta to match "Partner Application Redesign"
- [ ] Update canonical URL
- [ ] Add CTA: "Full case study with exact metrics available upon request" → link to 401
- [ ] Update homepage card link to public version
- [ ] Keep current protected version unchanged

---

## Quick Risk Ranking

| Risk Level                          | Items                                                                                                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **High — change immediately**       | Chick-fil-A / CFA naming (5+ instances), "applied to their franchise program," October 17 2023 date, 40K applicants / 0.2% acceptance (CFA's data) |
| **Medium — convert to ranges**      | $2.1M, $1.9M, $319/$15, 2.9M visitors, 415 conversions, 9,419 applications                                                                         |
| **Low — normalize for readability** | DSP → delivery partner, internal doc titles, team names                                                                                            |
| **Safe — keep as-is**               | All percentages, ANOVA stats, engineer counts, requirement scope, methodology, lessons                                                             |
