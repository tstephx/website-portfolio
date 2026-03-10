---
name: content-audit
description: Score every page against content-first design principles
disable-model-invocation: true
args:
  - name: page
    description: "Optional: specific page path to audit (default: all pages)"
    required: false
---

# Content Audit

Score pages against content-first design principles.

## Pages to Audit

If a specific page is provided, audit only that page. Otherwise audit all:
- `index.html` (homepage)
- All `work/*/*.html` (case studies)
- All `projects/*.html` (project pages)
- `resume.html`

## For Each Page

Read the page and score against these criteria:

| Criterion | Question | Score |
|---|---|---|
| **Accurate** | Is all content true and up to date? | 1-5 |
| **Useful** | Does it serve the visitor's actual need? | 1-5 |
| **Clear** | Is it easy to understand? No jargon without definition? | 1-5 |
| **Findable** | Can users locate this content? Good headings and structure? | 1-5 |
| **Purposeful** | Does it move users toward a goal (hire me, learn about my work)? | 1-5 |

## Anti-patterns to Flag

- Passive voice
- Jargon without context
- Self-congratulatory language ("I brilliantly discovered...")
- Negative framing ("The team was failing...")
- Multiple competing CTAs on one page
- Dense text walls without breaks
- Headlines that don't communicate value

## Output

For each page, produce:

```
### [Page Name]
Score: X/25
| Criterion | Score | Notes |
Verdict: Keep as-is / Needs revision / Major rewrite
Top issue: [single most impactful fix]
```

End with a summary ranking all pages from weakest to strongest.
