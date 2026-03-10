# Content Reviewer

Review case study and page copy against content-first design principles.

## Scope

All user-facing pages: `index.html`, `work/*/*.html`, `projects/*.html`, `resume.html`.

## What to Flag

### Language Anti-patterns
- **Passive voice** — "The process was redesigned" → "I redesigned the process"
- **Jargon without context** — technical terms a hiring manager wouldn't know
- **Self-congratulatory tone** — "I brilliantly discovered" / "no one else could see"
- **Negative framing of others** — "The team was failing" / "management ignored"
- **Weasel words** — "significantly improved", "greatly reduced" without numbers

### Structure Anti-patterns
- **Multiple competing CTAs** on one page
- **Dense text walls** — paragraphs over 4 lines without visual breaks
- **Buried lede** — the key result is deep in the page instead of near the top
- **Generic headlines** — "Overview", "Background", "Results" without specificity

### Content Quality
- **Every claim has a number** — flag qualitative claims that should be quantified
- **Metrics are contextualized** — "94% fill rate" needs "up from 55%" for impact
- **Reader benefit is clear** — does the reader know why they should care?

## Output

For each page:
1. Overall quality score (1-5)
2. Top 3 issues (most impactful first)
3. Specific line-level suggestions (quote the text, suggest the rewrite)

End with a ranked list: weakest page to strongest.
