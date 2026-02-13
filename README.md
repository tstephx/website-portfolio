# taylorstephens.dev

Personal portfolio website. Static HTML/CSS with Chart.js visualizations.

## Stack

- **HTML/CSS** — no framework, no build step
- **Chart.js 4.4** — data visualizations in case studies
- **Google Fonts** — Inter (body) + Lora (headings)
- **CSS Custom Properties** — 58 design tokens in `:root`

## Structure

```
index.html                  # Homepage — 6 work + 3 personal project cards
css/styles.css              # Global styles, fluid typography, responsive breakpoints
css/case-study.css          # 15+ reusable visual components
work/*/                     # 6 professional case studies (Amazon PM work)
projects/                   # 5 personal project case studies
js/progress-bar.js          # Reading progress bar (JS fallback for Safari/Firefox)
```

## Case Studies

| Page | Topic | Key Visual |
|---|---|---|
| contract-transfer | Process redesign, 17x volume | Before/after capability bars |
| pinnacle-scoring | Scoring methodology, 198 interviews | Vote comparison diagrams |
| dsp-application | Competitive intelligence, 18 countries | Essay time dominance chart |
| pinnacle-automation | SQL pipeline, 8 root causes | Funnel chart |
| pinnacle-distance | Geospatial analysis, 130K+ pairs | Coverage curve + fill rate |
| chargeback-parsing | R text mining, 92% time reduction | Email transformation + scaling |

## Run Locally

Open `index.html` in a browser. No server required.

## Design System

All colors, typography, spacing, and shadows are defined as CSS custom properties in `css/styles.css`. Case study components (metric cards, timelines, data tables, bar comparisons, charts) are in `css/case-study.css`.

Key tokens: `--color-accent: #2563eb`, `--font-sans: Inter`, `--font-serif: Lora`, `--max-width: 720px`.
