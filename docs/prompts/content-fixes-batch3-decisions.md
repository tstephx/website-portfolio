# Batch 3: STRATEGIC — Decisions Requiring Taylor's Approval

_These are judgment calls that change how the portfolio positions you. Each recommendation has trade-offs. Review and approve/reject before execution._

---

## Decision 3.1: Reorder Homepage Cards — CT First

**Source:** career-coach agent

**Current order:** PA → CT → PIN
**Proposed order:** CT → PA → PIN

**Argument for:**
- CT has all confirmed, audited metrics — no projections, no asterisks
- CT's problem statement ("zero documentation, 15-case backlog") is immediately visceral
- CT's best sentence ("I didn't think the program was failing. I thought we were measuring it against the wrong mission") is the single strongest line in the portfolio
- Leading with your strongest, cleanest case study means a hiring manager who reads only one gets the best one

**Argument against:**
- PA's problem statement (74% abandonment rate, crashing process) is more universally accessible — any PM has dealt with a bad UX
- PA demonstrates cross-functional influence (0.25 → 3.8 engineers) which may be a stronger first signal for senior roles
- Current order may be intentional (builds complexity: UX → process → technical)

**Trade-offs:**
- If CT leads, skimmers see the strongest work first. If PA leads, they see the most relatable problem first.
- Changing order affects the "Read Next" chain perception (though links remain circular regardless of card order)

**Files affected:** `index.html` (swap the order of the two `<article class="work-card">` elements)
**Effort:** ~5 minutes
**Risk:** Low — easily reversible

**YOUR CALL:** [ ] APPROVE  [ ] REJECT  [ ] MODIFY

---

## Decision 3.2: PA Metric Cards — Make "Projected" Visible

**Source:** career-coach agent

**Current state:** PA public metric cards show "+130%" etc. without visible "projected" qualifier. The qualifier exists in a table caption deeper in the page.

**Argument for:**
- A skimming hiring manager sees "+130%" and assumes it's a delivered result
- When they discover it's projected, trust erodes
- Adding "(projected)" or "est." on the card face is transparent and actually stronger — "this person projected a result and got funded for it" is impressive on its own

**Argument against:**
- Adding qualifiers to metric cards reduces visual punch
- The full context exists on the page — the cards are teasers
- The PA case study explicitly says these are projected in the narrative

**Trade-offs:**
- Transparency vs visual impact. A qualified metric card ("~+130% projected") is less punchy but more honest.

**Suggestion:** Add a subtle subtitle line under the metric number: `<span class="metric-qualifier">projected</span>` — smaller font, muted color, doesn't break the visual rhythm.

**Files affected:** `work/partner-application-public/index.html` (metric cards), possibly PA protected
**Effort:** ~10 minutes
**Risk:** Low — cosmetic change

**YOUR CALL:** [ ] APPROVE  [ ] REJECT  [ ] MODIFY

---

## Decision 3.3: Cut CT Quality Tracking Paragraph

**Source:** career-coach agent (also flagged as weakest paragraph by Phase 2 and content-writer)

**Current state:** The quality tracking paragraph (~lines 376-383 on CT public) describes how the tracking framework caught a deviation "not a catastrophic failure, but a leading indicator." It's abstract, vague, and uses passive language.

**Two options:**

### Option A: Cut entirely
- **Argument for:** The results section is already strong without it. Removing the weakest paragraph raises the floor quality. Ends the results on a stronger note.
- **Argument against:** Loses the "system kept working after handoff" proof point. Some hiring managers value sustainability signals.

### Option B: Rewrite (this is what Batch 2 Fix 2.6 does)
- The Batch 2 fix rewrites it to be specific and outcome-focused
- This is the default if you reject the cut

**Note:** If you approve the cut here, skip Batch 2 Fix 2.6 (they're mutually exclusive).

**Files affected:** CT public + CT protected (same section)
**Effort:** ~5 minutes to cut, or ~15 minutes to rewrite (Batch 2)
**Risk:** Medium — removing content is harder to evaluate than rewriting. Consider reading the section in context before deciding.

**YOUR CALL:** [ ] CUT (skip Batch 2 Fix 2.6)  [ ] REWRITE (use Batch 2 Fix 2.6)

---

## Decision 3.4: Cut or Collapse PIN "Post-Automation" Section

**Source:** career-coach agent

**Current state:** PIN has a "Post-automation: the program kept growing" section showing 43% YoY growth, tightened qualification screens, 77% acceptance rate, zero exits, and 2.7pp quality improvement.

### Option A: Cut entirely
- **Argument for:** The last thing the reader remembers is "the remaining gap is supply" — an unsolved problem. Better to end at the achievement (94.1% fill rate).
- **Argument against:** This section proves the automation survived handoff and kept improving. That's a durability signal hiring managers value.

### Option B: Collapse to 2-3 sentences
- Keep the strongest proof points (77% acceptance, zero exits) and cut the rest
- Removes the dense paragraph problem without losing the durability signal

### Option C: Keep as-is, but fix density (Batch 2 handles this)
- Break into 2-3 paragraphs (Batch 2 Fix would handle paragraph density)
- Doesn't change content, just formatting

**Files affected:** PIN public + PIN protected
**Effort:** 5 min (cut), 15 min (collapse), 10 min (density fix only)
**Risk:** Medium — cutting strong content requires confidence the remaining sections carry the weight

**YOUR CALL:** [ ] CUT  [ ] COLLAPSE  [ ] KEEP + FIX DENSITY (Batch 2/4)

---

## Decision 3.5: PIN Superlative — "Only Workstream Attributed to a Specific Person"

**Source:** career-coach agent

**Current text:** "Leadership credited it by name in program documentation — the only workstream in that document attributed to a specific person."

**Recommendation:** Keep the fact ("Leadership credited it by name"), drop the comparison ("the only workstream...attributed to a specific person").

**Argument for:**
- The comparison tips into self-congratulatory territory
- The fact alone is strong enough — "leadership credited it by name" is social proof without needing the superlative

**Argument against:**
- The superlative is factual — it IS the only named workstream
- Dropping it loses a genuine differentiator
- Phase 2 rated this as a strong sentence

**Suggestion:** "Leadership credited it by name in program documentation." Full stop. Let the reader infer the significance.

**Files affected:** PIN public + PIN protected
**Effort:** ~5 minutes
**Risk:** Low — minor edit, easily reversible

**YOUR CALL:** [ ] TRIM (drop comparison)  [ ] KEEP AS-IS

---

## Decision 3.6: CT Icon Cards — Cut or Keep

**Source:** career-coach agent

**Current state:** CT has 4 icon cards ("Four Failures Contributing to Decision Paralysis") that summarize documentation gaps, communication breakdowns, evaluation gaps, and visibility gaps.

**Argument for cutting:**
- The prose already covers these failures in detail
- Removing them tightens the page by ~20 lines
- The icon cards are the only component in CT that doesn't add NEW information

**Argument against:**
- Phase 2 called them "an effective component"
- They serve skimmers who won't read the full prose
- They create visual rhythm between dense paragraphs

**Suggestion:** Keep them. The scannability value outweighs the redundancy. Skimmers need these entry points.

**Files affected:** CT public + CT protected
**Effort:** ~10 minutes to cut (plus adjusting surrounding flow)
**Risk:** Medium — cutting structural components affects page rhythm

**YOUR CALL:** [ ] CUT  [ ] KEEP

---

## Decision 3.7: PA "Near-Term Blocker" Section — Collapse

**Source:** career-coach agent

**Current state:** PA has a section "Even With Resources Secured, There Was a Near-Term Blocker" that spans multiple paragraphs about the engineering constraint.

**Recommendation:** Collapse to one paragraph — the engineering constraint (10-12 months for XL ticket) is important, but the section over-explains it.

**Argument for:**
- Tightens the page's longest section
- The reader already understands the constraint from the problem section

**Argument against:**
- The near-term blocker creates narrative tension ("got the resources but still can't use them")
- This section demonstrates Taylor's ability to find workarounds under constraint

**Files affected:** PA public + PA protected
**Effort:** ~15 minutes
**Risk:** Low — collapse preserves the key point while removing repetition

**YOUR CALL:** [ ] COLLAPSE  [ ] KEEP AS-IS

---

## Decision 3.8: CT "I Owned End-to-End Implementation" — Cut

**Source:** career-coach agent

**Current text (protected):** "I owned the work end-to-end: diagnosis, BRD, roadmap, and the annual operating plan escalation."

**Recommendation:** Cut. The case study already demonstrates end-to-end ownership through the narrative. Stating it explicitly reads as defensive.

**Argument for:**
- "Owned end-to-end" is a resume phrase, not a narrative phrase
- The case study's structure (diagnosis → reframe → build → results) already proves ownership
- Cutting removes a defensive fragment

**Argument against:**
- "End-to-end" is a keyword hiring managers ctrl+F for
- The BRD/roadmap/AOP list is useful for interview prep — it names the artifacts

**Suggestion:** Cut the explicit claim but keep the artifact list elsewhere (e.g., in the scope-meta or as a parenthetical): "through a BRD, technology roadmap, and annual planning escalation."

**Files affected:** PA protected (and potentially PA public if similar phrasing exists)
**Effort:** ~5 minutes
**Risk:** Low

**YOUR CALL:** [ ] CUT  [ ] REPHRASE  [ ] KEEP AS-IS

---

## Summary

| # | Decision | Recommendation | Mutually Exclusive With |
|---|----------|---------------|------------------------|
| 3.1 | Homepage card order | CT first | — |
| 3.2 | PA projected qualifier | Add subtle label | — |
| 3.3 | CT quality paragraph | Rewrite (Batch 2) over cut | Batch 2 Fix 2.6 |
| 3.4 | PIN post-automation | Collapse to 2-3 sentences | Batch 4 Fix 4.9 (density) |
| 3.5 | PIN superlative | Trim comparison | — |
| 3.6 | CT icon cards | Keep | — |
| 3.7 | PA near-term blocker | Collapse | — |
| 3.8 | CT "owned end-to-end" | Rephrase | — |

**Next step:** Mark each decision, then I'll create executable prompts for approved items.
