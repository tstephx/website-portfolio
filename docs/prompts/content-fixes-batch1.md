# Batch 1: MUST FIX — Blocks Going Public

_Factual errors, math contradictions, anonymization leaks. Execute after Taylor provides decisions on F1, F2, F3._

---

## Prerequisites

Before executing, Taylor must answer:

### DECISION 1 (F1): 274% YoY — what's correct?

"274% year-over-year (23 to 63)" — 23→63 is a 174% increase. "274%" means "grew to 274% of the prior year." Which is it?

- **Option A:** The growth was 174%. Fix "274%" to "174%" everywhere.
- **Option B:** The volume reached 274% of the prior year. Remove the parenthetical "(23 to 63)" which exposes the math, OR reword to "volume grew to 274% of the prior year (23 to 63 requests)."
- **Option C:** The parenthetical is wrong. Fix "(23 to 63)" to the correct numbers.

### DECISION 2 (F2): $482K × 29 ≠ $13M — which number is authoritative?

$482K+ × 29 = ~$14M, not $13M. The "+" makes the gap worse.

- **Option A:** "$13M" is the audited total. Adjust "$482K+" to "~$448K" (or "six figures" if rounding).
- **Option B:** "$482K+" is the per-case average. Adjust "$13M" to "$14M+".
- **Option C:** Both are approximate. Add context: "averaging $482K+ each — $13M+ in total avoided exit costs."
- **Option D:** Different. (Specify.)

### DECISION 3 (F3): PA 62% rejection vs 4,450 passed

62% of 12,714 = 4,831 passed. The page says 4,450. Implied rejection rate is 65%.

- **Option A:** 62% is correct. Fix 4,450 to ~4,831.
- **Option B:** 4,450 is correct. Fix 62% to ~65%.
- **Option C:** Different data windows. Add a clarifying note.

---

## Fix 1.1: 274% YoY Math (F1)

**Depends on:** Decision 1

### If Option A (fix to 174%):

**File: `work/contract-transfer-public/index.html`**

- Find: `274% year-over-year`
- Replace: `174% year-over-year`

**File: `work/contract-transfer/contract-transfer.html`**

- Find: `274% year-over-year`
- Replace: `174% year-over-year`

**File: `index.html`** (homepage CT card)

- Find: `274% YoY`
- Replace: `174% YoY`

**File: `work/partner-application-public/index.html`** (if referenced in PA scope-context)

- Grep for `274` and fix any occurrence

### If Option B (reword to "grew to 274%"):

**File: `work/contract-transfer-public/index.html`**

- Find: `grown 274% year-over-year (23 to 63)` (or similar)
- Replace: `reached 274% of the prior year's volume (23 to 63 requests)`

**File: `work/contract-transfer/contract-transfer.html`**

- Same find/replace as above

**File: `index.html`** — no change needed ("274% YoY" on the card is ambiguous enough to work either way)

### Verification:

```bash
cd ~/Dev/_Projects/website-portfolio
grep -rn "274" --include="*.html" .
```

Confirm all instances are consistent with the chosen option.

---

## Fix 1.2: $482K × 29 Math (F2)

**Depends on:** Decision 2
**Scope:** CT protected only (public version uses "six figures" / "eight-figure")

**File: `work/contract-transfer/contract-transfer.html`**

### If Option A (fix per-case to ~$448K):

- Find: `$482K+`
- Replace: `~$448K` (or whatever Taylor specifies)
- Check all instances: grep shows 4 occurrences on CT protected

### If Option B (fix total to $14M+):

- Find: `$13M` (all instances)
- Replace: `$14M+`
- Also update homepage if "$13M" appears on the CT card

### If Option C (add context):

- Find the sentence containing both figures
- Rewrite to: "29 cases at $482K+ each — $13M+ in total avoided exit costs" (changing "$13M" to "$13M+" adds the qualifier)

### Verification:

```bash
grep -rn "482\|13M\|14M" --include="*.html" .
```

Confirm all instances are internally consistent. Check resume.html too (Fix 1.5 depends on this).

---

## Fix 1.3: PA 62% Rejection Math (F3)

**Depends on:** Decision 3
**Scope:** PA protected only

**File: `work/cfa-dsp-application/dsp-application.html`**

### If Option A (fix count):

- Find: `4,450`
- Replace: `4,831` (or whatever Taylor specifies based on actual data)
- Update any downstream calculations that reference 4,450

### If Option B (fix percentage):

- Find: `62%` (in the rejection rate context, not other uses of 62%)
- Replace: `65%`
- Also update "two in three were rejected" if changing from 62% to 65% — "two in three" ≈ 67%, closer to 65% than 62%, so this phrasing may actually become more accurate

### Verification:

```bash
grep -rn "4,450\|62%\|65%\|4,831" --include="*.html" work/cfa-dsp-application/
```

---

## Fix 1.4: CT Public Anonymization Gap (A1)

**No decision needed — execute directly.**

**File: `work/contract-transfer-public/index.html`**

- Find: `39.6% of routes recover` (or the exact phrasing containing "39.6%")
- Replace: `fewer than 40% of routes recover`

### Verification:

```bash
# Confirm no exact percentages leaked from anonymization guide
grep -rn "39\.6" --include="*.html" work/contract-transfer-public/
# Should return 0 results after fix

# Cross-check against anonymization guide
grep -n "39.6\|fewer than 40" work/contract-transfer/anonymization-guide.md
```

---

## Fix 1.5: Resume "$13M+" vs "$13M" Drift (N1)

**Depends on:** Fix 1.2 (F2) resolution — the correct total determines what the resume should say.

**File: `resume.html`**

After F2 is resolved, standardize both resume mentions to use the same figure:

```bash
grep -rn "13M" resume.html
```

- If both currently show "$13M" and one has "+": make them match
- If F2 changed the total to "$14M+": update both resume mentions to "$14M+"

### Verification:

```bash
grep -rn "\$1[34]M" resume.html
# All occurrences should be identical
```

---

## Post-Batch 1 Verification

After all fixes in this batch:

```bash
# 1. Full number consistency check
grep -rn "274\|482\|13M\|14M\|39\.6\|4,450\|4,831\|62%\|65%" --include="*.html" .

# 2. Anonymization leak scan (all public pages)
grep -rn "\$[0-9]" --include="*.html" work/contract-transfer-public/ work/partner-application-public/ work/pinnacle-public/

# 3. Cross-page metric consistency
grep -rn "274" --include="*.html" . | head -20
```

All numbers should be internally consistent within each page and across public/protected pairs.
