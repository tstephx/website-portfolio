# Content Writing Standards

Voice, tone, and quality rules for all portfolio content. Run `/content-audit` to score pages against these standards.

---

## Voice

**One sentence:** Professional, specific, reader-focused — like explaining your work to a smart colleague over coffee.

| Attribute | Do | Don't |
|---|---|---|
| **Tone** | Confident and direct | Arrogant or self-congratulatory |
| **Specificity** | "Reduced 70% (9.6 → 2.9 weeks)" | "Significantly improved" |
| **Framing** | "The process had no owner" | "The team was failing" |
| **Perspective** | "Here's what the data showed" | "I brilliantly discovered" |
| **Audience** | Write for the reader's benefit | Write about your feelings |

---

## Rules

### Every claim gets a number

```
Bad:  "Dramatically reduced processing time"
Good: "Processing time dropped 92% (~2 hours → ~10 minutes)"
```

If you can't put a number on it, question whether it belongs.

### Lead with the result, then explain

```
Bad:  "After months of research, I analyzed 198 interviews and discovered
       three failure modes, which led to a new scoring methodology that
       improved approval rates."

Good: "Approval rates recovered from 56% to the 65-70% target. The fix:
       three failure modes in the scoring formula that no one had identified
       in 198 interviews."
```

### One page, one goal

Every page has one primary action. For case studies, that action is: "This person solves hard problems — I should talk to them."

Everything on the page supports that goal. If a section doesn't, cut it.

### Front-load important information

Users scan, they don't read. The first sentence of every paragraph is the most-read sentence. Put the key point there.

```
Bad:  "After careful analysis of the existing workflow, consideration of
       multiple alternatives, and consultation with stakeholders, I
       determined that the root cause was..."

Good: "The root cause was a scoring formula that penalized dissent.
       I found it by reverse-engineering 198 interviews."
```

---

## Section-by-Section Standards

### Headlines (H1)

Create tension and specificity. The reader should think "how?" or "what happened?"

```
Weak:    "Process Improvement Project"
Better:  "From Crashing Excel to Real-Time Automation"
Best:    "A 55MB Spreadsheet Was Deciding Who Got to Expand — and Getting It Wrong"
```

Test: cover the headline and read the page. Does the headline add something the page doesn't already say? If the headline is just a label, rewrite it.

### Taglines (subtitle under H1)

Format: `[Role/Scope] | [Scale Indicator] | [Key Constraint]`

```
"CT Program Owner & Process Architect | 17x Volume Growth | Solo"
"Competitive Intelligence | 101 Requirements | 18 Countries | $10.9M Entitlement"
```

### Problem sections

State the problem in terms the reader understands. Provide enough context for someone outside Amazon to follow.

- Define jargon on first use: "the BPR (Business Plan Review) interview"
- Quantify the cost of the problem: "$482K per failed exit"
- Show scale: "77% of panels showed 30+ point scoring gaps"

### Results sections

Always precede with an insight callout — one sentence that frames why the numbers matter.

```html
<div class="insight-callout">
  A program declining for 18 months recovered to near-perfect fill rates
  in a single quarter.
</div>
```

Then the metrics row with specific numbers.

### Lessons Worth Stealing

Frame for the reader, not about you. Each lesson should be:
- One sentence, actionable
- Transferable beyond this project
- Something the reader can apply tomorrow

```
Bad:  "I learned that stakeholder alignment is important."
Good: "If you can't explain the scoring formula to a new panelist in
       under two minutes, the formula is too complex to produce
       consistent results."
```

---

## About Me Section

### Structure

1. **Opening:** What you specialize in — framed as a problem type, not a job title
2. **Evidence:** Concrete callbacks to case studies (numbers, not adjectives)
3. **Personal:** Human detail that makes you memorable

### Current version (reference)

> I specialize in the problems that don't have an owner yet. At Amazon, that meant inheriting a process that took four months per case, where each failure cost half a million dollars, and no one had written down how it was supposed to work.

This works because: specific problem → specific cost → specific gap.

---

## Homepage Cards

Each card has: title, tagline, Challenge, Approach (with link), Result.

- **Challenge:** 2-3 sentences max. The core problem with one key number.
- **Approach:** 1 sentence + the "Read the full case study →" link.
- **Result:** 2-3 sentences. Lead with the biggest number.

---

## Common Mistakes (with fixes)

| Mistake | Example | Fix |
|---|---|---|
| Weasel words | "significantly", "greatly", "dramatically" | Replace with the actual number |
| Passive voice | "Errors were eliminated" | "The script eliminated errors" |
| Talking to yourself | "What This Taught Me" | "Lessons Worth Stealing" |
| Burying the lede | Result in paragraph 4 | Result in the first sentence |
| Jargon without context | "BPR methodology redesign" | "Interview scoring redesign (BPR)" |
| Competing CTAs | "Read more" + "Contact me" + "See resume" | One primary CTA per section |
| Dense walls | 8+ line paragraphs | Break at 4 lines max, use visual components |

---

*Created: 2026-03-04*
