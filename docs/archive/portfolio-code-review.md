# Portfolio Code Review: Design Best Practices Audit

**Reviewed:** `mcp-ecosystem.html` (case study) and `index.html` (homepage)
**Date:** February 12, 2026
**Site:** taylorstephens.dev

---

## Review 1: MCP Ecosystem Case Study (`mcp-ecosystem.html`)

### Overall Assessment

The code is well above average for a self-built portfolio. The design system is clean, consistent, and thoughtful. The gap is between "good personal project" and "publish-ready portfolio that a hiring manager takes seriously." Most of what follows is refinement, not reconstruction.

---

### What's Working Well (Don't Touch These)

**Typography system.** The Inter/Lora pairing is a strong choice — Inter for UI, Lora for editorial headings. The `max-width: 65ch` on paragraphs, the baseline grid (`--baseline: 1.5rem`), the font size scale — this is editorial-quality typographic thinking. The `h2::after` accent underline is subtle and effective.

**CSS architecture.** Custom properties for the full color system, clean mobile-first breakpoints at 640/1024/1280, hover states scoped to desktop only (most people get this wrong), print stylesheet, skip link for accessibility. The separation of `styles.css` (global) from `case-study.css` (component) is the right instinct.

**Content structure.** The case study follows a Problem → Architecture → Decisions → Results → Lessons arc that reads naturally. The "Decision Points" section with rejected/chosen comparison cards is a standout — it shows *how you think*, not just what you built. That's exactly what hiring managers want to see.

**Component library.** A reusable set of patterns: `.metrics-row`, `.comparison`, `.insight-callout`, `.data-table`, `.bar-comparison`, `.scope-callout`, `.mermaid-container`. These are consistent across pages and well-designed.

---

### Issues to Fix

#### 1. Performance: Mermaid Diagrams Loading from CDN Without Fallback

```html
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
```

This loads ~180KB of JavaScript from a CDN for two small diagrams. If the CDN is slow or blocked (corporate firewalls, China), the diagrams render as raw text blocks.

**Fix options (pick one):**

- **Static SVG replacement** (recommended): Render the diagrams once, export as SVG, inline them. Zero JS dependency, instant render, works everywhere. The diagrams are simple enough that hand-coded SVG or a one-time Mermaid CLI export would work.
- **Lazy load with fallback:** Wrap the mermaid init in a `try/catch` and provide a `<noscript>` or CSS fallback that shows a simplified text version.

#### 2. Accessibility: Missing Table Captions and Diagram Alt Text

The accessibility baseline is good (skip link, semantic HTML, `alt` text on images), but tables and diagrams need attention:

- **Data tables lack `<caption>` elements.** Screen readers announce table purpose from the caption. Add `<caption class="visually-hidden">Server architecture comparison</caption>` (or visible captions) to each `<table>`.
- **Mermaid diagrams have no text alternative.** Add `role="img"` and `aria-label="Architecture diagram showing four MCP servers connected through Claude Code"` to `.mermaid-container`.
- **Bar comparison visualizations are purely visual.** The bar widths (`style="width: 100%"`) have no semantic meaning. The text labels compensate, but add `role="presentation"` to the `.bar-track` elements to clarify they're decorative.

#### 3. Content Issue: Bar Chart Widths Don't Map to Data

```html
<div class="bar-fill" style="width: 100%"></div>  <!-- Knowledge retrieval -->
<div class="bar-fill" style="width: 95%"></div>   <!-- Book ingestion -->
<div class="bar-fill" style="width: 90%"></div>    <!-- Session context -->
<div class="bar-fill" style="width: 85%"></div>    <!-- Cross-book research -->
```

These widths are arbitrary and descending — they look like a ranking rather than representing the actual magnitude of improvement. "10–15 min → <5ms" is a 180,000× improvement; "$15–20 min manual → $0.03 automated" is a cost comparison, not a time comparison. They're mixing units.

**Fix:** Either make the bars represent a consistent metric (% time reduction, all in the same unit), or remove the bars entirely and use a simple before/after table instead. Right now they look impressive at a glance but don't survive scrutiny — and a technical hiring manager will scrutinize.

#### 4. Mobile: Tables Overflow on Narrow Screens

The `.data-table` elements have no horizontal scroll wrapper on narrow screens. The 5-column server architecture table will overflow on phones.

**Fix:** Wrap data tables in a scrollable container or add this to `.data-table`:

```css
.data-table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
```

#### 5. SEO/Social: Missing OG Image

`og:title` and `og:description` are present but no `og:image`. When someone shares this on LinkedIn or Slack, it renders as a text-only card. For a portfolio, this is a missed opportunity.

**Fix:** Create a 1200×630 social card image and add:

```html
<meta property="og:image" content="https://taylorstephens.dev/images/og-mcp-ecosystem.png">
```

#### 6. Minor Code Quality

- **Mermaid `securityLevel: 'loose'`**: Allows HTML in diagram labels, which is a minor XSS surface. Since all content is controlled, it's not a real risk, but `'strict'` would be safer — test since labels use `\n` for line breaks, not HTML.

---

### Case Study Priority Order

| Priority | Issue | Impact |
|----------|-------|--------|
| 1 | Bar chart data integrity | Content credibility — fix or remove misleading widths |
| 2 | Table accessibility | Add captions, table wrapper for mobile overflow |
| 3 | Mermaid diagram accessibility | ARIA labels for screen readers |
| 4 | OG image | LinkedIn/Slack sharing appearance |
| 5 | Mermaid → static SVG | Performance and reliability |
| 6 | Minor items | Security level, mobile table scroll |

---

## Review 2: Homepage (`index.html`)

### Overall Assessment

The page is well-built technically. Clean semantic HTML, single stylesheet, zero JavaScript on the homepage, 23KB headshot, good heading hierarchy. The CSS design system carries the page well.

The issues here are mostly **strategic and content-level**, not code-level. For a portfolio homepage, the content decisions matter more than the code — and that's where the biggest wins are.

---

### What's Working Well

**Zero JS on the homepage.** No frameworks, no animations library, no analytics bloat. The page loads instantly. This is the right call for a portfolio — speed is a first impression.

**Semantic structure.** Single `<h1>`, proper `<article>` wrappers on project cards, `<section>` with IDs for anchor navigation, `<footer>` in the right place. The heading hierarchy (h1 → h2 → h3) is correct throughout.

**Contact section SVGs.** Inline SVGs with `aria-hidden="true"` on decorative icons, text labels visible — this is the right pattern. No icon font dependency, no external sprite sheet.

**Favicon.** The SVG favicon with initials is clean, renders at any size, and the `rx="4"` radius is a nice touch. At 300 bytes it loads instantly.

**Project card structure.** The Challenge/Action/Result format on Featured Projects is strong. Hiring managers scan for this exact pattern — it maps directly to STAR format and answers "what did you actually do" without ambiguity.

---

### Issues to Fix

#### 1. Strategic: Title and Positioning Mismatch

This is the biggest issue on the page and it's not a code problem.

The `<title>`, `og:title`, `twitter:title`, meta description, and tagline all say **"Program Manager."** But the target is **Principal/Lead Design Strategist** roles. Every hiring manager or recruiter who lands on this page gets an immediate signal that doesn't match the role being pursued.

The tagline reads: *"Product × Operations × Program | Builder from Zero | Former Amazon PM"*

This positions as an ops/program generalist. The case studies (scoring methodology design, application redesign, MCP ecosystem architecture) actually demonstrate design strategy and systems thinking — but the wrapper doesn't frame them that way.

**Fix:** This isn't about inflating — it's about framing. The work *is* design strategy work. Consider:

- Title: `Taylor Stephens | Design Strategist` or `Taylor Stephens | Design & Systems Strategy`
- Tagline: Something that signals designing systems, not just managing programs
- Meta description: Lead with the design strategy angle

This is a judgment call about positioning, but right now the page actively works against the target roles.

#### 2. `loading="lazy"` on Above-the-Fold Headshot

```html
<img src="images/headshot.jpg" alt="Taylor Stephens, Program Manager"
     class="headshot" loading="lazy" width="300" height="300">
```

The headshot is in the hero — it's the first thing visible on page load. `loading="lazy"` tells the browser to *defer* loading it until it's near the viewport, which is counterproductive for above-the-fold content. On slower connections, visitors see a blank circle before the image appears.

**Fix:** Remove `loading="lazy"` or switch to `loading="eager"` (the default). Keep the `width` and `height` attributes — those prevent layout shift.

#### 3. Nav Missing `aria-label`

```html
<nav>
    <ul>
```

Screen readers announce this as just "navigation" with no context. On pages with multiple `<nav>` elements (case study pages have both the main header nav and `.back-nav`), this creates ambiguity.

**Fix:**

```html
<nav aria-label="Main navigation">
```

#### 4. Missing `og:image`

When someone shares `taylorstephens.dev` on LinkedIn, Slack, or Twitter, it renders as a plain text card with no visual. For a portfolio this is a significant missed opportunity — LinkedIn shares are likely the primary traffic source.

**Fix:**

```html
<meta property="og:image" content="https://taylorstephens.dev/images/og-homepage.png">
<meta property="twitter:image" content="https://taylorstephens.dev/images/og-homepage.png">
```

Even a simple card with name, title, and a clean background is better than nothing.

#### 5. Personal Projects Section: Uneven Card Weight

Three cards with very different levels of substance:

- **MCP Ecosystem** — Strong. Metrics in the meta line, clear scope, specific outcome. Reads as a serious project.
- **tap-sevenrooms** — Thin. One sentence that won't mean anything to someone who doesn't know what Singer taps are. No metrics, no context on why it matters, no sense of complexity.
- **_Lab Environment** — Vague. Describes a philosophy, not a project. No concrete deliverable or measurable outcome.

The MCP Ecosystem card carries the section; the other two dilute it.

**Options:**

- **Strengthen the descriptions:** Add a concrete metric or technical detail to each. For tap-sevenrooms: how many API endpoints, data volume, who used it. For _Lab: what specific workflow did it enable, what was the measurable change.
- **Remove the weaker cards:** Two strong entries beat three uneven ones. If tap-sevenrooms and _Lab don't have case study pages with real depth behind them, they may not be earning their spot on the homepage.
- **Visual differentiation:** Make the MCP Ecosystem card visually dominant — a featured card treatment with a border accent or slightly larger type — so it reads as the flagship with the others as supporting.

#### 6. Skills Section: Doesn't Reflect Actual Stack

The "How I Work" column lists: SQL, R, Excel, Salesforce, Jira/Confluence/Asana, QuickSight & Tableau.

The personal projects demonstrate 79,000 lines of Python, SQLite, FastMCP, sentence-transformers, semantic search, state machines. None of that appears in the skills section. The skills listed read as a 2020 PM toolkit, not someone building production AI infrastructure in 2025.

**Fix:** This doesn't mean dropping the PM tools — it means adding a fourth column or expanding the current ones to include Python, SQLite/FTS5, AI/ML tools, and MCP. The personal projects demonstrate these skills; the skills section should confirm them.

#### 7. Missing Canonical URL

`og:url` is present but no canonical link tag. If the site is accessible at both `www.taylorstephens.dev` and `taylorstephens.dev`, or via trailing slash variants, search engines may index duplicate versions.

**Fix:**

```html
<link rel="canonical" href="https://taylorstephens.dev/">
```

#### 8. Hero Height Pushes Content Below Fold

```css
#hero {
    min-height: 85vh;
}
```

On most laptops (768–900px viewport height), 85vh means the name, tagline, and CTA consume the entire screen. Visitors have to scroll to see any work. The hero's job is to introduce and get people to the projects — right now it's doing the first part but making the second one require a scroll.

**Fix:** Consider reducing to `min-height: 70vh` or even `60vh`, or removing the `min-height` entirely and letting the content dictate the height.

#### 9. Minor Items

- **No `<meta name="theme-color">`:** Mobile browsers can color-match the browser chrome. Add `<meta name="theme-color" content="#ffffff">`.
- **Footer year hardcoded to 2026:** Either use JS to generate dynamically or drop the year entirely — `© Taylor Stephens. All rights reserved.` never goes stale.
- **Alt text on headshot says "Program Manager":** Same positioning issue as #1. If the title updates, update this too.

---

### Homepage Priority Order

| Priority | Issue | Impact |
|----------|-------|--------|
| 1 | Positioning/title mismatch | Highest-impact change — affects how every visitor frames everything else |
| 2 | Personal projects card weight | Strengthen or trim the weaker cards |
| 3 | Skills section gap | Add actual technical stack |
| 4 | `loading="lazy"` removal | Headshot render performance |
| 5 | `og:image` | Social sharing appearance |
| 6 | Hero height reduction | Content visibility above fold |
| 7 | Nav `aria-label`, canonical URL, theme-color | Quick wins |

---

## Summary

The code quality and design system are solid across both pages. The CSS architecture, typography, semantic HTML, and component patterns are publish-ready. The primary gaps are:

1. **Strategic positioning** — the content says "Program Manager" while the work demonstrates design strategy
2. **Content credibility** — bar chart data integrity and uneven project card weight
3. **Accessibility polish** — table captions, ARIA labels, mobile overflow
4. **Social sharing** — missing OG images for LinkedIn/Slack visibility

Close the positioning gap and address the content issues, and this is a strong portfolio.
