<!-- project: website-portfolio -->
# SQL/R Analytics Enhancement — Design Document

*Approved: 2026-02-14*
*Branch: feat/sql-r-analytics*

---

## 1. Goal

Add "Under the Hood" sections to two portfolio case studies (pinnacle-automation, pinnacle-distance) showing annotated SQL and R code snippets from actual production work. Narrative: PM with deep technical fluency — code as context, not centerpiece.

---

## 2. Scope

### In Scope
- **pinnacle-automation.html** — 3 SQL snippets from the 6-step Redshift pipeline
- **pinnacle-distance.html** — 3 R snippets from the geospatial analysis
- **case-study.css** — New `.code-annotation` component
- Tech pills update if needed (already have SQL/Redshift pills)

### Out of Scope (for now)
- contract-transfer.html enhancements
- pinnacle-scoring.html enhancements
- dsp-application.html enhancements
- chargeback-parsing.html enhancements
- Expandable/collapsible code blocks
- Syntax highlighting libraries

---

## 3. Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Narrative frame | PM with deep technical fluency | Code supports the story, doesn't become it |
| Code display | Annotated snippets (5-15 lines) | Shows real code without overwhelming the page |
| Placement | New "Under the Hood" section | Self-contained, easy to skip for non-technical readers |
| Code styling | Native `<pre><code>` with CSS | No external syntax highlighting library needed |
| Snippet count | 3 per page | Enough to show depth, not so many it becomes a code dump |

---

## 4. New CSS Component: `.code-annotation`

```
.code-annotation              — container wrapping annotation + code block
  .code-annotation-header      — title + language label
    .code-annotation-title     — what this code does (sans-serif, bold)
    .code-annotation-lang      — "SQL" or "R" pill (top-right)
  .code-annotation-desc        — plain-English explanation (italic, muted)
  pre > code                   — the actual code (monospace, subtle bg)
```

Styling rules:
- Uses existing design tokens (--font-sans, --color-muted, --radius-md, --shadow-sm)
- Subtle background similar to `.formula-box` aesthetic
- Language label pill in top-right corner
- Horizontal scroll on mobile for long lines
- Margin/spacing consistent with other `.cs-section` children

---

## 5. Page Enhancements

### pinnacle-automation.html

**Section placement:** Between `#technical` and `#results`

**Section title:** "Under the Hood"

**Intro:** "The descriptions above trace the pipeline's logic. Here's what the actual production SQL looks like — three excerpts from the 6-step Redshift query."

| # | Snippet | Stage | SQL Technique | Annotation Focus |
|---|---------|-------|---------------|-----------------|
| 1 | Consecutive Tier Validation | Stage 2 | LAG() window function | Business rule encoded temporally |
| 2 | Haversine Distance | Stage 5 | CROSS JOIN + trig functions | Deterministic distance computation |
| 3 | Two-Tier Fallback | Stage 6 | NOT EXISTS subquery | Policy encoded as SQL logic |

### pinnacle-distance.html

**Section placement:** Between `#approach` and `#technical`

**Section title:** "Under the Hood"

**Intro:** "The coverage matrix above summarizes what the R analysis found. Here's the analysis itself — three excerpts from the geospatial pipeline that produced those numbers."

| # | Snippet | R Technique | Annotation Focus |
|---|---------|-------------|-----------------|
| 1 | Vincenty Distance Matrix | geosphere::distVincentyEllipsoid, expand.grid | Geodesic precision, full Cartesian product |
| 2 | Distance Interval Sweep | for loop, dplyr group_by/summarise | Methodology that produced the coverage matrix |
| 3 | Performance Comparison | dplyr filter, bind_rows, summarise | Counter-intuitive finding that dismantled the distance assumption |

---

## 6. Code Snippets (Exact Content)

### pinnacle-automation.html

**Snippet 1: Consecutive Tier Validation**
```sql
static_tier AS (
    SELECT dsp_id, snapshot_date, adjusted_tier,
        LAG(adjusted_tier, 1) OVER (
            PARTITION BY dsp_id ORDER BY snapshot_date
        ) AS prev_tier
    FROM dsp_network_health
    WHERE snapshot_date IN (SELECT snapshot_date FROM nh_score_config)
)
SELECT * FROM static_tier
WHERE adjusted_tier = 1 AND prev_tier = 1
```
*"Window functions validate that a DSP held Tier 1 across consecutive quarters — not just once. This single clause prevents one-quarter flukes from qualifying DSPs for three-year contracts."*

**Snippet 2: Haversine Distance**
```sql
station_pairs AS (
    SELECT a.station_code AS station_a, b.station_code AS station_b,
        3959 * ACOS(
            COS(RADIANS(a.lat)) * COS(RADIANS(b.lat))
            * COS(RADIANS(b.lon) - RADIANS(a.lon))
            + SIN(RADIANS(a.lat)) * SIN(RADIANS(b.lat))
        ) AS distance_miles
    FROM temp_station_data a CROSS JOIN temp_station_data b
    WHERE a.station_code <> b.station_code
)
```
*"Every station paired with every other station, distance computed via Haversine formula. Deterministic — same inputs always produce the same output, unlike traffic-dependent alternatives."*

**Snippet 3: Two-Tier Fallback**
```sql
WHERE distance_miles <= 50
   OR (distance_miles <= 250
       AND proximity_rank <= 5
       AND NOT EXISTS (
           SELECT 1 FROM station_pairs sp2
           WHERE sp2.station_a = sp.station_a
             AND sp2.distance_miles <= 50
       ))
```
*"Policy encoded as SQL: candidates within 50 miles get priority. Remote stations with no nearby candidates fall back to the 5 closest within 250 miles. The fallback never competes with primary matches."*

### pinnacle-distance.html

**Snippet 1: Vincenty Distance Matrix**
```r
library(geosphere)

# All pairwise station combinations (~130,000 pairs)
pairs <- expand.grid(station1 = 1:nrow(stations), station2 = 1:nrow(stations))
pairs <- pairs[pairs$station1 != pairs$station2, ]

# Vincenty Ellipsoid — most accurate formula for oblate spheroid
pairs$distance_mi <- distVincentyEllipsoid(
    cbind(stations$lon[pairs$station1], stations$lat[pairs$station1]),
    cbind(stations$lon[pairs$station2], stations$lat[pairs$station2])
) * 0.000621371  # meters to miles
```
*"Vincenty Ellipsoid accounts for Earth's flattening at the poles — more precise than Haversine over long distances. The full Cartesian product generates every possible station pair for analysis."*

**Snippet 2: Distance Interval Sweep**
```r
thresholds <- seq(50, 200, by = 10)
results <- data.frame()

for (d in thresholds) {
    nearby <- pairs[pairs$distance_mi <= d, ]
    by_station <- nearby %>%
        group_by(station1) %>%
        summarise(neighbor_count = n_distinct(station2))
    results <- rbind(results, data.frame(
        distance = d,
        AtLeast1 = mean(by_station$neighbor_count >= 1),
        AtLeast3 = mean(by_station$neighbor_count >= 3),
        AtLeast5 = mean(by_station$neighbor_count >= 5)
    ))
}
```
*"Sweeping from 50 to 200 miles in 10-mile increments. At each threshold, compute the percentage of stations with 1, 3, or 5+ eligible DSPs nearby. This produced the coverage matrix that made the policy case."*

**Snippet 3: Performance Comparison**
```r
breakers <- pinnacle_dsps %>% filter(distance_break == TRUE)    # n=17
non_breakers <- pinnacle_dsps %>% filter(distance_break == FALSE) # n=91

comparison <- bind_rows(
    breakers %>% summarise(across(c(CSAT, DSP_Quality, CR_T12M,
        Tier1_Post, SLS_Safety, NSF), mean)) %>% mutate(group = "Breakers"),
    non_breakers %>% summarise(across(c(CSAT, DSP_Quality, CR_T12M,
        Tier1_Post, SLS_Safety, NSF), mean)) %>% mutate(group = "Non-Breakers")
)
```
*"The 17 DSPs who launched despite exceeding the 50-mile cap outperformed non-breakers across every metric — CSAT (+800 bps), DSP Quality (+10 pp), Safety (100% vs 97%). The assumption that distance degrades performance was wrong."*

---

## 7. Implementation Order

1. Add `.code-annotation` CSS component to `case-study.css`
2. Add "Under the Hood" section to `pinnacle-automation.html`
3. Add "Under the Hood" section to `pinnacle-distance.html`
4. Visual QA in browser
5. Commit on `feat/sql-r-analytics` branch

---

*Created: 2026-02-14*
