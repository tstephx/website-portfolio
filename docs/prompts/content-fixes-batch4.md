# Batch 4: NICE TO HAVE — Polish

_Cosmetic, consistency, optional tightening. Execute as a cleanup pass after Batches 1–3. Low priority._

---

### Fix 4.1: CT `—` vs `&mdash;` Entity Consistency (K4)

**Source:** code-reviewer agent

**File: `work/contract-transfer-public/index.html`**

The quality tracking paragraph uses a literal `—` character instead of the `&mdash;` entity used elsewhere on the site. Both render identically, but authoring consistency matters.

- Find the literal em-dash character in the quality tracking section
- Replace with `&mdash;`

**Note:** If Batch 3 Decision 3.3 approves cutting this paragraph entirely, skip this fix.

---

### Fix 4.2: `progress-bar.js` Load Position (P1)

**Source:** code-reviewer agent

**File: `index.html`**

Homepage loads `progress-bar.js` at end of `<body>` while case studies load it in `<head>` with `defer`. Functionally identical but inconsistent.

- Find: `<script src="js/progress-bar.js"></script>` (near `</body>`)
- Move to `<head>` and add `defer`: `<script src="js/progress-bar.js" defer></script>`

**Verification:**

```bash
grep -rn "progress-bar.js" --include="*.html" .
# All should show defer in <head>
```

---

### Fix 4.3: PIN Lesson Count Parity

**Source:** Phase 2 observation

**Files:** PIN public + PIN protected

PA and CT have 4 "Lessons Worth Stealing"; PIN has 3. Consider adding a 4th lesson for structural parity.

**Suggested approach:** Read the PIN case study's narrative for a transferable insight that isn't already covered by the 3 existing lessons. The strongest candidate from the case study text:

- "If you can't get clean data from the source, sometimes the right move is to change the measurement methodology entirely" (the Haversine decision)
- Or: "Automate the judgment out of the process — the spreadsheet failed because humans were making decisions that a formula should make"

**This is optional** — PIN's 3 lessons are high quality. Adding a weaker 4th just for parity would reduce the section's strength.

---

### Fix 4.4: PA Results Paragraph — Visual Treatment

**Source:** Phase 2

**Files:** PA public + PA protected

The results paragraph packs 4 distinct metrics into one paragraph (9,000+ applications, double program-inclined, 2,000+ hours saved, quarterly updates without engineering). Each is impressive individually but they compete when packed together.

**Suggested approach:** Convert to a secondary metrics row or styled bullet list:

```html
<ul class="results-highlights">
  <li><strong>9,000+</strong> additional approved applications per year</li>
  <li><strong>2×</strong> program-inclined candidates per year</li>
  <li><strong>2,000+</strong> hours removed from manual review annually</li>
  <li>Quarterly application updates without an engineering ticket</li>
</ul>
```

Or use the existing `metric-card` component if it fits the layout.

---

### Fix 4.5: PA Pull Quote Repetition — No Action

**Source:** Phase 2 observation

The PA pull quote repeats the benchmark point. Phase 2 noted it's still effective as a visual break. **No change needed.** Included here for completeness.

---

### Fix 4.6: Insight Callout Placement Standardization

**Source:** Phase 2 cross-page observation

PA places its insight callout mid-results; CT and PIN place theirs pre-results. Consider standardizing to pre-results for all three.

**Trade-off:** PA's mid-results placement may be intentional — it breaks up the results data. Standardizing would mean moving the PA callout earlier, which changes the reading flow.

**Suggested approach:** Only move if the content of the PA callout supports a pre-results position. If it's a "why this matters" frame, it works pre-results. If it's a "here's what the data shows" summary, it belongs mid-results.

---

### Fix 4.7: Homepage "7-Figure" Stat — Likely Skip

**Source:** Phase 2 recommendation (disputed by content-writer agent)

The PA card shows "7-Figure" / "Eng. investment secured" while other stats are precise numbers. Phase 2 suggested "15×" engineering multiplier.

**Content-writer's counter:** The "15×" ratio requires context the homepage card doesn't provide (0.25 → 3.8). "7-Figure" is vaguer but self-contained.

**Recommendation:** Skip unless Taylor specifically wants to change it.

---

### Fix 4.8: Homepage "Built to solve problems..."

**Source:** Phase 2

**File: `index.html`**

The Personal Projects intro line "Built to solve problems the job didn't come with" is slightly ambiguous.

**Options:**

- "Built to solve problems the job didn't cover"
- "Built outside working hours to solve real problems"
- "Side projects that solve real problems"

---

### Fix 4.9: PIN Post-Automation Paragraph Density

**Source:** Phase 2 + content-writer

**Files:** PIN public + PIN protected

**Note:** If Batch 3 Decision 3.4 approves cutting or collapsing this section, this fix is superseded. Only apply if Decision 3.4 = KEEP.

Break the dense paragraph into 2-3 shorter paragraphs:

1. Growth metrics (43% YoY, 440+ partners)
2. Process improvements (qualification screens, automated identification)
3. Quality results (77% acceptance, zero exits, 2.7pp improvement)

---

## Post-Batch 4 Verification

```bash
# Entity consistency
grep -rn "—" --include="*.html" work/contract-transfer-public/ | head -5
# Check remaining literal em-dashes vs &mdash;

# Progress bar consistency
grep -rn "progress-bar.js" --include="*.html" .

# Full test suite
npm run check && npm test
```
