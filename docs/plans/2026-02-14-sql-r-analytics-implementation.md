<!-- project: website-portfolio -->
# SQL/R Analytics Enhancement — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add "Under the Hood" sections with annotated SQL/R code snippets to two portfolio case studies.

**Architecture:** New `.code-annotation` CSS component added to `case-study.css`, then new HTML sections inserted into `pinnacle-automation.html` (3 SQL snippets) and `pinnacle-distance.html` (3 R snippets). No JavaScript, no build tools — pure HTML/CSS.

**Tech Stack:** HTML5, CSS3 (custom properties from existing design system), no dependencies

**Design Doc:** `docs/plans/2026-02-14-sql-r-analytics-design.md`
**Branch:** `feat/sql-r-analytics`

---

## Task 1: Add `.code-annotation` CSS Component

**Files:**
- Modify: `/Users/taylorstephens/_Lab/website-portfolio/css/case-study.css:207` (insert after existing code block styles)

**Step 1: Read the existing code block styles for context**

Read `css/case-study.css` lines 188-206. The new component builds on the same aesthetic (`.cs-section pre` uses `--color-bg-alt` background, `--color-border-light` border, 4px radius). The `.code-annotation` wraps an annotation header + description above a `<pre><code>` block.

**Step 2: Add the CSS component**

Insert after line 206 (after the `.cs-section pre code` closing brace), before the `/* ===== BEFORE/AFTER COMPARISON =====*/` comment on line 208:

```css
/* ===== ANNOTATED CODE SNIPPET ===== */
.code-annotation {
    margin: 1.5rem 0;
    border: 1px solid var(--color-border-light);
    border-radius: 4px;
    overflow: hidden;
}

.code-annotation-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem 1.25rem 0;
    background-color: var(--color-bg-alt);
}

.code-annotation-title {
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--color-heading);
    margin: 0;
}

.code-annotation-lang {
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent);
    background-color: var(--color-accent-light);
    padding: 0.2em 0.6em;
    border-radius: 3px;
    white-space: nowrap;
    flex-shrink: 0;
}

.code-annotation-desc {
    padding: 0.5rem 1.25rem 1rem;
    background-color: var(--color-bg-alt);
    font-size: 0.8125rem;
    font-style: italic;
    line-height: 1.6;
    color: var(--color-muted);
    margin: 0;
    border-bottom: 1px solid var(--color-border-light);
}

.code-annotation pre {
    margin: 0;
    border: none;
    border-radius: 0;
    padding: 1.25rem;
    background-color: var(--color-bg);
}

.code-annotation pre code {
    font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace;
    font-size: 0.8125rem;
    line-height: 1.7;
    color: var(--color-text);
    background: none;
    padding: 0;
}
```

**Step 3: Add tablet responsive rule**

Inside the existing `@media screen and (min-width: 640px)` block (around line 868), add:

```css
    .code-annotation-header {
        align-items: center;
    }
```

**Step 4: Add print rule**

Inside the existing `@media print` block (around line 948), add:

```css
    .code-annotation {
        page-break-inside: avoid;
    }

    .code-annotation pre {
        font-size: 0.7rem;
        background: none !important;
        border-top: 1px solid #ccc;
    }
```

**Step 5: Verify in browser**

Run: `open /Users/taylorstephens/_Lab/website-portfolio/work/pinnacle-program-selection/pinnacle-automation.html`
Expected: Page loads normally with no visual changes (no HTML uses the new component yet)

**Step 6: Commit**

```bash
git add css/case-study.css
git commit -m "feat: add .code-annotation CSS component for annotated code snippets"
```

---

## Task 2: Add "Under the Hood" Section to pinnacle-automation.html

**Files:**
- Modify: `/Users/taylorstephens/_Lab/website-portfolio/work/pinnacle-program-selection/pinnacle-automation.html:201-203` (insert between `</section>` closing `#technical` and `<section>` opening `#results`)

**Step 1: Read the insertion point for context**

Read `pinnacle-automation.html` lines 195-210. The new section goes after the `</section>` that closes `#technical` (line 201) and before the `<section class="cs-section" id="results">` (line 203).

**Step 2: Insert the "Under the Hood" section**

Insert after line 201 (`</section>` closing `#technical`), before line 203 (`<section class="cs-section" id="results">`):

```html

        <section class="cs-section" id="under-the-hood">
            <h2>Under the Hood</h2>
            <p>The descriptions above trace the pipeline&rsquo;s logic. Here&rsquo;s what the actual production SQL looks like &mdash; three excerpts from the 6-step Redshift query.</p>

            <h3>Stage 2 &mdash; Consecutive Tier 1 Validation</h3>
            <div class="code-annotation">
                <div class="code-annotation-header">
                    <p class="code-annotation-title">LAG() Window Function &mdash; Temporal Business Rule</p>
                    <span class="code-annotation-lang">SQL</span>
                </div>
                <p class="code-annotation-desc">Window functions validate that a DSP held Tier 1 across consecutive quarters &mdash; not just once. This single clause prevents one-quarter flukes from qualifying DSPs for three-year contracts.</p>
<pre><code>static_tier AS (
    SELECT dsp_id, snapshot_date, adjusted_tier,
        LAG(adjusted_tier, 1) OVER (
            PARTITION BY dsp_id ORDER BY snapshot_date
        ) AS prev_tier
    FROM dsp_network_health
    WHERE snapshot_date IN (SELECT snapshot_date FROM nh_score_config)
)
SELECT * FROM static_tier
WHERE adjusted_tier = 1 AND prev_tier = 1</code></pre>
            </div>

            <h3>Stage 5 &mdash; Haversine Distance Computation</h3>
            <div class="code-annotation">
                <div class="code-annotation-header">
                    <p class="code-annotation-title">CROSS JOIN + Great-Circle Distance</p>
                    <span class="code-annotation-lang">SQL</span>
                </div>
                <p class="code-annotation-desc">Every station paired with every other station, distance computed via Haversine formula. Deterministic &mdash; same inputs always produce the same output, unlike traffic-dependent alternatives.</p>
<pre><code>station_pairs AS (
    SELECT a.station_code AS station_a,
           b.station_code AS station_b,
        3959 * ACOS(
            COS(RADIANS(a.lat)) * COS(RADIANS(b.lat))
            * COS(RADIANS(b.lon) - RADIANS(a.lon))
            + SIN(RADIANS(a.lat)) * SIN(RADIANS(b.lat))
        ) AS distance_miles
    FROM temp_station_data a
    CROSS JOIN temp_station_data b
    WHERE a.station_code &lt;&gt; b.station_code
)</code></pre>
            </div>

            <h3>Stage 6 &mdash; Two-Tier Policy Fallback</h3>
            <div class="code-annotation">
                <div class="code-annotation-header">
                    <p class="code-annotation-title">NOT EXISTS Subquery &mdash; Policy Encoded as SQL</p>
                    <span class="code-annotation-lang">SQL</span>
                </div>
                <p class="code-annotation-desc">Policy encoded as SQL: candidates within 50 miles get priority. Remote stations with no nearby candidates fall back to the 5 closest within 250 miles. The fallback never competes with primary matches.</p>
<pre><code>WHERE distance_miles &lt;= 50
   OR (distance_miles &lt;= 250
       AND proximity_rank &lt;= 5
       AND NOT EXISTS (
           SELECT 1 FROM station_pairs sp2
           WHERE sp2.station_a = sp.station_a
             AND sp2.distance_miles &lt;= 50
       ))</code></pre>
            </div>
        </section>

```

Note: HTML entities required for `<>` inside code blocks: use `&lt;` for `<` and `&gt;` for `>` where they appear in SQL comparison operators. The `<>` (not-equals) becomes `&lt;&gt;` and the `<=` becomes `&lt;=`.

**Step 3: Verify in browser**

Run: `open /Users/taylorstephens/_Lab/website-portfolio/work/pinnacle-program-selection/pinnacle-automation.html`

Expected:
- New "Under the Hood" section visible between "Why Consistency Beat Accuracy" and "From 57.9% to 94.1%"
- Three code snippets with annotation headers, language pills ("SQL"), descriptions, and monospace code
- Code blocks scroll horizontally on mobile
- Section heading has the blue accent underline (inherited from `.cs-section h2::after`)

**Step 4: Commit**

```bash
git add work/pinnacle-program-selection/pinnacle-automation.html
git commit -m "feat: add Under the Hood section with 3 SQL snippets to pinnacle-automation"
```

---

## Task 3: Add "Under the Hood" Section to pinnacle-distance.html

**Files:**
- Modify: `/Users/taylorstephens/_Lab/website-portfolio/work/pinnacle-station/pinnacle-distance.html:232-234` (insert between `</section>` closing `#approach` and `<section>` opening `#technical`)

**Step 1: Read the insertion point for context**

Read `pinnacle-distance.html` lines 228-240. The new section goes after the `</section>` that closes `#approach` (line 232) and before the `<section class="cs-section" id="technical">` (line 234).

**Step 2: Insert the "Under the Hood" section**

Insert after line 232 (`</section>` closing `#approach`), before line 234 (`<section class="cs-section" id="technical">`):

```html

        <section class="cs-section" id="under-the-hood">
            <h2>Under the Hood</h2>
            <p>The coverage matrix above summarizes what the R analysis found. Here&rsquo;s the analysis itself &mdash; three excerpts from the geospatial pipeline that produced those numbers.</p>

            <h3>Vincenty Ellipsoid Distance Matrix</h3>
            <div class="code-annotation">
                <div class="code-annotation-header">
                    <p class="code-annotation-title">Geodesic Distance &mdash; Full Cartesian Product</p>
                    <span class="code-annotation-lang">R</span>
                </div>
                <p class="code-annotation-desc">Vincenty Ellipsoid accounts for Earth&rsquo;s flattening at the poles &mdash; more precise than Haversine over long distances. The full Cartesian product generates every possible station pair for analysis.</p>
<pre><code>library(geosphere)

# All pairwise station combinations (~130,000 pairs)
pairs &lt;- expand.grid(
    station1 = 1:nrow(stations),
    station2 = 1:nrow(stations)
)
pairs &lt;- pairs[pairs$station1 != pairs$station2, ]

# Vincenty Ellipsoid — most accurate for oblate spheroid
pairs$distance_mi &lt;- distVincentyEllipsoid(
    cbind(stations$lon[pairs$station1], stations$lat[pairs$station1]),
    cbind(stations$lon[pairs$station2], stations$lat[pairs$station2])
) * 0.000621371  # meters to miles</code></pre>
            </div>

            <h3>Distance Interval Sweep</h3>
            <div class="code-annotation">
                <div class="code-annotation-header">
                    <p class="code-annotation-title">16-Threshold Coverage Analysis</p>
                    <span class="code-annotation-lang">R</span>
                </div>
                <p class="code-annotation-desc">Sweeping from 50 to 200 miles in 10-mile increments. At each threshold, compute the percentage of stations with 1, 3, or 5+ eligible DSPs nearby. This produced the coverage matrix that made the policy case.</p>
<pre><code>thresholds &lt;- seq(50, 200, by = 10)
results &lt;- data.frame()

for (d in thresholds) {
    nearby &lt;- pairs[pairs$distance_mi &lt;= d, ]
    by_station &lt;- nearby %&gt;%
        group_by(station1) %&gt;%
        summarise(neighbor_count = n_distinct(station2))
    results &lt;- rbind(results, data.frame(
        distance  = d,
        AtLeast1  = mean(by_station$neighbor_count &gt;= 1),
        AtLeast3  = mean(by_station$neighbor_count &gt;= 3),
        AtLeast5  = mean(by_station$neighbor_count &gt;= 5)
    ))
}</code></pre>
            </div>

            <h3>Performance Comparison &mdash; Distance Breakers vs. Non-Breakers</h3>
            <div class="code-annotation">
                <div class="code-annotation-header">
                    <p class="code-annotation-title">Counter-Intuitive Finding &mdash; Distance Doesn&rsquo;t Predict Performance</p>
                    <span class="code-annotation-lang">R</span>
                </div>
                <p class="code-annotation-desc">The 17 DSPs who launched despite exceeding the 50-mile cap outperformed non-breakers across every metric &mdash; CSAT (+800 bps), DSP Quality (+10 pp), Safety (100% vs 97%). The assumption that distance degrades performance was wrong.</p>
<pre><code>breakers &lt;- pinnacle_dsps %&gt;%
    filter(distance_break == TRUE)       # n = 17
non_breakers &lt;- pinnacle_dsps %&gt;%
    filter(distance_break == FALSE)      # n = 91

comparison &lt;- bind_rows(
    breakers %&gt;%
        summarise(across(c(CSAT, DSP_Quality, CR_T12M,
            Tier1_Post, SLS_Safety, NSF), mean)) %&gt;%
        mutate(group = "Breakers"),
    non_breakers %&gt;%
        summarise(across(c(CSAT, DSP_Quality, CR_T12M,
            Tier1_Post, SLS_Safety, NSF), mean)) %&gt;%
        mutate(group = "Non-Breakers")
)</code></pre>
            </div>
        </section>

```

Note: R assignment operator `<-` must be escaped as `&lt;-` in HTML. The pipe `%>%` must be escaped as `%&gt;%`. Comparison operators `<=` and `>=` must be `&lt;=` and `&gt;=`.

**Step 3: Verify in browser**

Run: `open /Users/taylorstephens/_Lab/website-portfolio/work/pinnacle-station/pinnacle-distance.html`

Expected:
- New "Under the Hood" section visible between "130,000 Distance Calculations" and "From R Research to SQL Production"
- Three code snippets with annotation headers, language pills ("R"), descriptions, and monospace code
- R code properly formatted with `<-` assignment operators rendering correctly
- `%>%` pipe operators rendering correctly
- Section heading has the blue accent underline

**Step 4: Commit**

```bash
git add work/pinnacle-station/pinnacle-distance.html
git commit -m "feat: add Under the Hood section with 3 R snippets to pinnacle-distance"
```

---

## Task 4: Visual QA and Final Commit

**Files:**
- No new files — verification only

**Step 1: Open both pages side by side**

Run:
```bash
open /Users/taylorstephens/_Lab/website-portfolio/work/pinnacle-program-selection/pinnacle-automation.html
open /Users/taylorstephens/_Lab/website-portfolio/work/pinnacle-station/pinnacle-distance.html
```

**Step 2: Desktop QA checklist**

Verify on each page:
- [ ] "Under the Hood" h2 heading renders with blue accent underline
- [ ] h3 subheadings render as uppercase muted labels
- [ ] Language pills ("SQL" / "R") show blue text on light blue background, top-right
- [ ] Annotation descriptions render as italic muted text
- [ ] Code blocks use monospace font, subtle background contrast
- [ ] Code is readable without horizontal scroll on desktop (1024px+)
- [ ] Section flows naturally between surrounding sections
- [ ] No broken HTML entities (all `<` `>` render as angle brackets in code)

**Step 3: Mobile QA (resize browser to 375px)**

Verify:
- [ ] Code blocks scroll horizontally (not overflow the page)
- [ ] Annotation header stacks gracefully (title + language pill)
- [ ] Text remains readable at mobile sizes

**Step 4: Cross-page consistency check**

Verify:
- [ ] SQL snippets on pinnacle-automation look consistent with R snippets on pinnacle-distance
- [ ] The `.code-annotation` component has the same spacing/borders as other components (`.formula-box`, `.chart-container`)

**Step 5: If any issues found, fix and amend the last commit**

If fixes needed:
```bash
git add -A
git commit -m "fix: adjust code-annotation styling from QA review"
```

**Step 6: Final verification — run git log on feature branch**

Run: `git log --oneline feat/sql-r-analytics`
Expected: 4-5 commits on the feature branch (design doc + CSS + 2 HTML pages + any fixes)

---

## Summary

| Task | File | What It Does |
|------|------|-------------|
| 1 | `css/case-study.css` | New `.code-annotation` component (header, lang pill, description, code block) |
| 2 | `work/pinnacle-program-selection/pinnacle-automation.html` | "Under the Hood" with 3 SQL snippets (LAG, CROSS JOIN, NOT EXISTS) |
| 3 | `work/pinnacle-station/pinnacle-distance.html` | "Under the Hood" with 3 R snippets (Vincenty, interval sweep, comparison) |
| 4 | (none) | Visual QA across desktop and mobile |

**Total: 4 tasks, ~4 commits, 3 files modified.**

After completion: show Taylor both pages in browser. If approved, merge `feat/sql-r-analytics` into `main`.
