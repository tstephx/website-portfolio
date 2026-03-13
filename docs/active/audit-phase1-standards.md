# Phase 1: Standards Summary

_Internalized rules for Phases 2 and 3. Generated from CLAUDE.md, content-writing-standards.md, JTBD.md, and all three anonymization guides._

---

## Voice Rules

1. **Confident and direct, never arrogant.** Tone should read like a strong 1:1 with a senior PM who respects your time. No self-congratulation ("I brilliantly discovered"), no defensiveness, no weasel words ("significantly improved").

2. **Every claim gets a number.** If a sentence makes an impact claim without a specific metric, flag it. "Dramatically reduced" → "Reduced 70% (9.6 → 2.9 weeks)".

3. **Lead with the result, then explain.** First sentence of every paragraph = the key point. Result first, method second. Burying the lede is an anti-pattern.

4. **Write for the reader, not about yourself.** Frame problems in terms the reader understands. Define jargon on first use. "Lessons Worth Stealing" not "What This Taught Me." No talking about feelings.

5. **Front-load information for scanners.** Recruiters scan for 15 seconds. Hiring managers skim. The first sentence of every section must deliver value independently.

6. **One page, one goal.** For case studies: "This person solves hard problems — I should talk to them." Every section must support that goal. If it doesn't, cut it.

7. **Anti-patterns to flag:** Passive voice weakening strong claims, ambiguous pronouns ("it," "this," "that"), paragraphs >4 lines, competing CTAs, jargon without context, find-and-replace artifacts that break sentence flow.

---

## Audience Contract

### Hiring Manager
- **Time budget:** 30–90 seconds on homepage, 3–5 minutes on one case study
- **Looking for:** Evidence of ownership, ambiguity navigation, measurable impact at senior scope
- **Stops reading when:** Can't find the impact, work seems junior, or page requires too much effort to parse
- **Success:** "I know what this person does and I want to hear more" → schedules phone screen
- **Failure:** "I don't understand their impact" or "this feels junior" → closes tab
- **Decision behavior:** Clicks into 1 (maybe 2) case studies. Reads problem statement, skims approach, checks results. If first is strong, stops reading and moves to schedule.

### Recruiter
- **Time budget:** 15–30 seconds — homepage only, never clicks into case studies
- **Looking for:** Company names, titles, metrics, technical keywords — signals to justify pass-through
- **Stops reading when:** Can't find clear seniority signals in 15 seconds
- **Success:** Can write a 1-sentence pass-through note with a specific metric ("strong metrics, former Amazon")
- **Failure:** "I can't tell if they're senior enough" → skips
- **Decision behavior:** One-pass. Scans for bold numbers, job title, company name.

### Peer PM / Networking Contact
- **Time budget:** 2–5 minutes, curiosity-driven
- **Looking for:** What kind of problems does this person solve? How do they think?
- **Stops reading when:** Nothing stands out as interesting or relevant
- **Success:** Remembers one specific thing Taylor did → refers or bookmarks
- **Failure:** "Seemed fine but nothing stood out" → forgets
- **Decision behavior:** Reads About section, then 1 case study that looks interesting. Follows the narrative.

---

## Anonymization Boundaries

### Partner Application (PA): Public ↔ Protected
| Protected Term | Public Term | Risk |
|---|---|---|
| `Chick-fil-A` / `CFA` (5+ instances) | "a best-in-class franchise operator" / "the benchmark franchise" | **HIGH** — competitor naming is biggest flag |
| `$2.1M+` entitlement (7 instances) | "multi-million" / "seven-figure" | **MEDIUM** — internal financial data |
| `$1.9M` vetting cost, `$319` per interview | "seven-figure vetting cost" / "20× more expensive" ratio | **MEDIUM** |
| `40,000 applicants, 0.2% acceptance` | Removed — these are CFA's numbers | **HIGH** |
| `DSP` / `DSP Acquisitions` | "delivery partner" / "Partner Acquisitions" | **LOW** |

### Contract Transfer (CT): Public ↔ Protected
| Protected Term | Public Term | Risk |
|---|---|---|
| `$13M` in exit costs (5 instances) | "eight-figure" | **HIGH** — internal financial data |
| `$482K+` per failed exit (4 instances) | "six-figure" | **HIGH** |
| `CT` abbreviation (~7 instances) | "contract transfer" / "the transfer process" | **LOW** |
| `DSP Acquisitions` | "Partner Acquisitions" | **LOW** |
| `Legacy Transfer` program | "succession planning initiative" | **MEDIUM** |
| `network average` | "program average" | **LOW** |

### Selection Automation (PIN): Public ↔ Protected
| Protected Term | Public Term | Risk |
|---|---|---|
| `Pinnacle` (~12 instances) | "the expansion program" / "the reward program" | **MEDIUM** — internal program name |
| `Tier 1` designation | "top-tier" | **MEDIUM** — internal scoring tier |
| `Leadership & Engagement, Positive Environment, Strategic Communicator` | "leadership, engagement, and communication qualification screens" | **MEDIUM** — internal metric names |
| `Salesforce` / `Asana` | "CRM migration" / "project management workflow" | **LOW** — reveals internal tooling |
| `2,620` / `441` / `118` exact network numbers | Rounded: `2,600+` / `440+` / `~120` | **LOW** |

---

## Mechanical Issues Already Found (Phase 0)

### Anonymization Leaks
- **All clear.** No dollar signs, CFA, DSP abbreviations, or Tier 1 references on public pages.
- "Pinnacle" appears in public page URLs (og:url, canonical) — acceptable since these are URL paths, not content.
- "Amazon" on homepage is intentional (meta descriptions, tagline, intro paragraph) — this is Taylor's employer attribution, not a case study leak.

### Long Sentences
- Most flagged "sentences" are HTML artifacts (metric cards, multi-line layout elements parsed as continuous text).
- **Investigate in Phase 2:** PA Public "8 engineers, leadership had seen the same evidence three times" (43w) and "Three business drivers forced a technology decision" (40w). CT Public "six sequential gates" section (69w) and "defect category breakdown" (70w). These may contain genuine long-sentence prose issues.

### Read Next CTAs
- Chain is complete and circular: PA → CT → PIN → PA (both tiers match).

### Number Consistency
- Public/Protected counts match for each case study pair (good).
- Numbers appear on their relevant pages only (PA numbers on PA pages, etc.).
- Resume references CT metrics (86.6%, 16.98, 2.28) and PIN metrics (57.9%, 94.1%).
- No discrepancies detected in the automated scan.

---

## Severity Guide

- **MUST FIX**: Factual error, math inconsistency, anonymization leak, broken narrative arc, claim that contradicts another page
- **SHOULD FIX**: Clarity issue, awkward phrasing from find-and-replace, voice drift, abrupt transition, reader has to re-read to parse
- **NICE TO HAVE**: Cosmetic, optional tightening, subjective style preference
