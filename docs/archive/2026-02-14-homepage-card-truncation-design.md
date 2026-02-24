# Homepage Card Truncation Design

> Replace Action paragraphs on homepage case study cards with curiosity-gap one-liners that protect methodology IP while hooking click-throughs.

## Problem

The 6 work case study cards on the homepage publicly display full Challenge/Action/Result paragraphs. The Action paragraphs contain proprietary methodology — the actual playbook — which is the IP Taylor wants protected behind auth. Challenge and Result are safe to show publicly (they're outcomes and context, not process).

## Design Decision

**Approach A: Replace Action with curiosity-gap one-liner + CTA**

Grounded in copywriting frameworks from the book library:
- **StoryBrand**: "Write in Morse code" — very few words above the fold
- **Complete Copywriter**: "Arouse, Withhold, Fulfill" — hint at the approach without revealing it
- **4U's**: Useful, Ultra-specific, Unique, Urgent

Each card keeps Challenge and Result untouched. The Action paragraph is replaced with a single sentence that creates a curiosity gap (names the *type* of work without revealing *how*), followed by a CTA link.

## Card Structure (After)

```
Challenge: [unchanged — full paragraph]
Approach: [one-liner curiosity gap sentence]
Read the full case study →  [CTA link to /work/ page]
Result: [unchanged — full paragraph]
```

Note: Label changes from "Action" to "Approach" — sounds less like a homework assignment, more like strategic thinking.

## One-Liners

1. **Contract Transfer**: "Built a 14-week operational system from scratch — the playbook behind a 70% faster decision cycle."
2. **Pinnacle BPR Scoring**: "Reverse-engineered the scoring formula from 198 interviews and found three failure modes no one had identified."
3. **DSP Application**: "Applied to a competitor's franchise program as competitive intelligence, then turned the findings into a 101-requirement redesign."
4. **Pinnacle Selection Automation**: "Diagnosed 8 root causes across three dimensions and replaced a crashing Excel file with a 6-step SQL pipeline."
5. **Pinnacle Station Distance**: "Computed 130,000+ pairwise geodesic distances to prove the eligibility cap was excluding top performers."
6. **Chargeback Parsing**: "Turned unstructured email prose into structured data with a text mining script that scales to any batch size."

## Implementation

Single file change: `index.html` lines 62-107. Replace each `<p><strong>Action:</strong> ...</p>` with:

```html
<p><strong>Approach:</strong> [one-liner] <a href="work/[path]">Read the full case study &rarr;</a></p>
```

No CSS changes needed — the CTA link inherits existing `a` styling.
