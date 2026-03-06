# Case Study Components Reference

**Source:** `css/case-study.css` | **Last verified:** 2026-03-06

Reusable visual components for case study pages (`work/*/` and `projects/`). All components use CSS design tokens — no hardcoded colors.

---

## Page Structure

| Class                        | Purpose                                                          |
| ---------------------------- | ---------------------------------------------------------------- |
| `.case-study`                | Page wrapper — sets typography, max-width                        |
| `.back-nav`                  | Top navigation link back to homepage                             |
| `.cs-header`                 | Hero section: title, tagline, tech pills                         |
| `.cs-tagline`                | Subtitle/summary line under h1                                   |
| `.tech-pills` / `.tech-pill` | Tag chips for tools/methods used                                 |
| `.cs-section`                | Content section with styled h2/h3/p/ul                           |
| `.cs-cta`                    | Bottom call-to-action block with button                          |
| `.reading-progress`          | Thin progress bar at top of page (requires `js/progress-bar.js`) |

---

## Data Display Components

### Metrics Row

```html
<div class="metrics-row">
  <div class="metric-card">
    <div class="metric-number">17x</div>
    <div class="metric-label">Volume increase</div>
    <div class="metric-subtitle">Optional context</div>
  </div>
</div>
```

### Bar Comparison

```html
<div class="bar-comparison">
  <div class="bar-comparison-item">
    <div class="bar-comparison-label">
      <span>Label</span>
      <span class="bar-value">92%</span>
    </div>
    <div class="bar-track"><div class="bar-fill" style="width:92%"></div></div>
  </div>
</div>
```

Add `.muted` to `.bar-fill` for secondary/gray bars.

### Funnel Chart

```html
<div class="funnel-chart">
  <div class="funnel-stage">
    <div class="stage-label">Stage Name</div>
    <div class="stage-value">1,200</div>
    <div class="stage-drop">↓ 40% drop</div>
  </div>
</div>
```

Add `.chart-label` div below funnel for axis label.

### Vote Comparison

```html
<div class="vote-comparison">
  <div class="vote-scenario scenario-old">
    <h4>Before</h4>
    <div class="vote-icons"><!-- .vote-icon.vote-yes / .vote-no --></div>
    <div class="vote-result result-rejected">Rejected</div>
  </div>
  <div class="vote-scenario scenario-new">...</div>
</div>
<p class="vote-caption">Caption text</p>
```

### Data Table

```html
<div class="data-table-wrapper">
  <table class="data-table">
    <caption>
      Optional caption
    </caption>
    <thead>
      <tr>
        <th>Col</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Value</td>
      </tr>
      <tr class="chosen">
        <td>Highlighted row</td>
      </tr>
    </tbody>
  </table>
</div>
```

Cell modifiers: `.highlight`, `.old-value`, `.new-value`

### Formula Box

```html
<div class="formula-box">
  <div class="formula-label">Formula Name</div>
  <div class="formula">Term × <span class="accent">Variable</span></div>
  <div class="formula-note">Explanatory note</div>
</div>
```

---

## Comparison Components

### Before/After Comparison

```html
<div class="comparison">
  <div class="comparison-before">
    <div class="comparison-label">Before</div>
    <p>Description</p>
  </div>
  <div class="comparison-after">
    <div class="comparison-label">After</div>
    <p>Description</p>
  </div>
</div>
```

`.comparison-label` renders in DM Mono caps. Do not use `<h3>` inside comparison blocks.

---

## Callout Components

### Insight Callout

```html
<div class="insight-callout">
  <p><strong>Key insight:</strong> Supporting detail.</p>
</div>
```

Used to frame a results section before the metrics-row.

### Scope Callout

```html
<div class="scope-callout">
  <div class="scope-item">
    <span class="scope-label">My Role</span>
    <span class="scope-value">Senior PM, DSP Acquisitions</span>
  </div>
  <div class="scope-item">
    <span class="scope-label">Timeline</span>
    <span class="scope-value">Q1–Q3 2023</span>
  </div>
</div>
```

Do not use "Design Strategist" in My Role — use actual PM title.

### Stat Highlight (inside insight-callout)

```html
<div class="stat-highlight">
  <span class="stat-number">92</span>
  <span class="stat-unit">%</span>
  <span class="stat-context">time reduction</span>
</div>
```

---

## Layout Components

### Process Timeline

```html
<div class="process-timeline">
  <div class="timeline-item completed">
    <div class="timeline-week">Week 1–2</div>
    <div class="timeline-title">Phase Title</div>
    <div class="timeline-desc">Description</div>
  </div>
</div>
```

### Chart Container

```html
<div class="chart-container">
  <canvas id="myChart"></canvas>
</div>
<div class="chart-label">X-axis label</div>
```

Use `.chart-pair` to place two charts side by side.

### Figure

```html
<figure class="cs-figure">
  <img src="..." alt="..." />
  <figcaption>Caption</figcaption>
</figure>
```

Use `.cs-figure-wide` for full-width figures, `.cs-figure-pair` for side-by-side.

### Mermaid Diagram

```html
<div class="mermaid-container">
  <div class="mermaid">flowchart LR A --> B</div>
</div>
```

Config in `js/mermaid-init.js`. Use `flowchart LR/TD` or `stateDiagram-v2`.

### Lessons List

```html
<ul class="lessons-list">
  <li>Lesson item</li>
</ul>
```

---

## New Components (2026-03-06)

### Icon Cards

2x2 grid for problem decomposition. Stacks to 1-col on mobile.

```html
<div class="icon-cards">
  <div class="icon-card">
    <div class="icon-card-icon">&#x26A0;</div>
    <div class="icon-card-title">Card Title</div>
    <div class="icon-card-desc">Short description of the problem or concept.</div>
  </div>
</div>
```

### Pull Quote

Styled closing thesis statement with accent border and large opening quote mark.

```html
<div class="pull-quote">
  <p>The application wasn't collecting bad data — it was asking the wrong kind of questions.</p>
</div>
```

### TL;DR Collapsible Summary

Collapsible summary near the top of case study pages. Uses native `<details>`.

```html
<details class="tldr-summary">
  <summary>Quick Summary</summary>
  <div class="tldr-content">
    <ul>
      <li>Key point one</li>
      <li>Key point two</li>
      <li>Key point three</li>
    </ul>
  </div>
</details>
```

### Decision Cards

Side-by-side comparison cards with chosen/rejected states.

```html
<div class="decision-cards">
  <div class="decision-card rejected">
    <div class="decision-card-label">Option A</div>
    <div class="decision-card-title">Rejected Approach</div>
    <div class="decision-card-desc">Why this was considered and rejected.</div>
  </div>
  <div class="decision-card chosen">
    <div class="decision-card-label">Option B — Chosen</div>
    <div class="decision-card-title">Selected Approach</div>
    <div class="decision-card-desc">Why this was the better path.</div>
  </div>
</div>
```

### CTA Secondary Link

Secondary link below the main CTA button. Use inside `.cs-cta`.

```html
<section class="cs-cta">
  <a href="..." class="cta-button">Read next: Title <span class="arrow">&rarr;</span></a>
  <p class="secondary-link"><a href="...">Get in touch</a></p>
</section>
```

---

## Notes

- Every new case study page must include `.reading-progress` as first `<body>` child
- Charts must use token-driven JS pattern (see CLAUDE.md or `ref/chartjs-pattern.md`)
- Avoid h2 phrasing in first person — reframe as outcomes, not narrator statements
