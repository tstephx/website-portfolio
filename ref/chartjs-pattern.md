# Chart.js Token-Driven Pattern

**Source:** `CLAUDE.md` | **Last verified:** 2026-03-04

All Chart.js charts must read colors from CSS custom properties via `getComputedStyle`. Never hardcode hex values in chart config.

**Exception:** Existing `titleFont`/`bodyFont`/`font.family` strings use hardcoded `'Epilogue'` — pre-dates token system, accepted as-is.

---

## Boilerplate (copy into every new chart page)

```javascript
window.addEventListener('DOMContentLoaded', () => {
  const css = getComputedStyle(document.documentElement);
  const token = (name, fallback) => css.getPropertyValue(name).trim() || fallback;

  const accent = token('--color-accent', '#1a3a6b');
  const green = token('--color-success', '#16a34a');
  const red = token('--color-danger', '#dc2626');
  const muted = token('--color-muted', '#6b6b6b');
  const text = token('--color-text', '#3d3d3d');

  const hexToRgba = (hex, a = 1) => {
    const h = hex.replace('#', '');
    const full =
      h.length === 3
        ? h
            .split('')
            .map((c) => c + c)
            .join('')
        : h;
    const n = parseInt(full, 16);
    const r = (n >> 16) & 255,
      g = (n >> 8) & 255,
      b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const grid = hexToRgba(muted, 0.25);

  Chart.defaults.color = text;
  Chart.defaults.borderColor = grid;
  Chart.defaults.plugins.legend.labels.color = text;
  Chart.defaults.scale.grid.color = grid;
  Chart.defaults.scale.ticks.color = grid;

  // Your charts here...
});
```

---

## Color Variables

| Variable | Token             | Default fallback |
| -------- | ----------------- | ---------------- |
| `accent` | `--color-accent`  | `#1a3a6b`        |
| `green`  | `--color-success` | `#16a34a`        |
| `red`    | `--color-danger`  | `#dc2626`        |
| `muted`  | `--color-muted`   | `#6b6b6b`        |
| `text`   | `--color-text`    | `#3d3d3d`        |

---

## Common Dataset Patterns

### Bar chart (single dataset)

```javascript
datasets: [
  {
    label: 'Value',
    data: [72, 85, 91],
    backgroundColor: hexToRgba(accent, 0.8),
    borderColor: accent,
    borderWidth: 1,
  },
];
```

### Bar chart (before/after)

```javascript
datasets: [
  { label: 'Before', data: [...], backgroundColor: hexToRgba(red, 0.7) },
  { label: 'After',  data: [...], backgroundColor: hexToRgba(green, 0.8) }
]
```

### Line chart (multiple series)

```javascript
datasets: [
  {
    label: 'Series A',
    data: [...],
    borderColor: accent,
    backgroundColor: hexToRgba(accent, 0.1),
    tension: 0.4, fill: true
  },
  {
    label: 'Series B',
    data: [...],
    borderColor: green,
    backgroundColor: 'transparent',
    tension: 0.4
  }
]
```

---

## Chart Container HTML

```html
<div class="chart-container">
  <canvas id="myChart"></canvas>
</div>
<div class="chart-label">X-axis label</div>
```

Use `.chart-pair` to place two charts side by side:

```html
<div class="chart-pair">
  <div class="chart-container"><canvas id="chartA"></canvas></div>
  <div class="chart-container"><canvas id="chartB"></canvas></div>
</div>
```

---

## Script Tag (work pages, 2 deep)

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

CDN version: **4.4.0** — do not upgrade without testing all existing charts.

---

## Notes

- `Chart.defaults.scale.ticks.color` uses `grid` (muted+opacity), not `text` — keeps axis labels subtle
- Always call `hexToRgba` for fill/background; use raw token string for border
- Legend is hidden by default on single-dataset charts (use `plugins: { legend: { display: false } }`)
