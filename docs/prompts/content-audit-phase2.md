# Portfolio Content Audit — Phase 2: Public Pages Deep Review

## What this is

Close reading of the 4 public pages. These are the pages recruiters, LinkedIn visitors, and Google see first. Every sentence must earn its place.

## Before you start

Read `docs/active/audit-phase1-standards.md` — the voice rules, audience contract, and severity guide from Phase 1.

## Pages to review (in this order)

1. `index.html` — homepage
2. `work/partner-application-public/index.html`
3. `work/contract-transfer-public/index.html`
4. `work/pinnacle-public/index.html`

## How to review each page

### Step 1: Comprehension (do this FIRST — before any critique)

For each page, write:

**One-sentence summary:** What does this page argue? (If you can't write this clearly, the page has a narrative problem.)

**Three strongest sentences:** Quote them exactly and say why they work. What makes them land?

**The question a hiring manager would ask in an interview after reading this page.** Be specific — not "tell me more about this project" but "how did you get 8 teams to agree on a consensus model when they had no prior documentation?"

### Step 2: Logic and flow

Read the page section by section. For each transition between sections (H2 to H2), answer:

- Does the reader know WHY they're now reading this section?
- Could this section be understood without reading the one before it?
- Is there a gap where the reader has to infer a connection that should be explicit?

Flag any section that could be cut without weakening the argument.

### Step 3: Clarity and voice

Flag any sentence where:

- A hiring manager at Stripe or Google would need Amazon context to understand it
- The sentence requires re-reading to parse (usually a sign of too many clauses or find-and-replace artifacts)
- The tone drifts defensive, apologetic, or self-congratulatory
- Passive voice weakens what should be a strong claim ("the system was built" vs "I built")
- A pronoun ("it," "this," "that") has an ambiguous referent

### Step 4: Reader experience

After finishing the page:

- Can you name the ONE thing this person did and why it mattered?
- Does any section repeat a point already made elsewhere on the page?
- Is there anywhere the page loses momentum — where your attention drifted?

## Output format

For each page:

```
## [Page Name]

### Comprehension
- Summary: [one sentence]
- Strongest sentences: [3, with why]
- Interview question: [specific]

### Findings

#### MUST FIX
- [exact text] → [issue] → [recommended fix]

#### SHOULD FIX
- [exact text] → [issue] → [recommended fix]

#### NICE TO HAVE
- [observation] → [recommendation]
```

Save to `docs/active/audit-phase2-public.md`.
