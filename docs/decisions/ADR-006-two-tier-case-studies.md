# ADR-006: Two-Tier Case Study Architecture

**Date:** 2026-03-11 | **Status:** Implemented | **Supersedes:** ADR-003 (partially)

## Decision

Case studies exist in two tiers: public (anonymized, no auth, indexable) and protected (full figures, basic auth, noindex). Each tier has its own HTML files, link chain, and URL structure.

## Why

The portfolio needed to be publicly accessible for recruiters and LinkedIn visitors while still protecting proprietary metrics (dollar figures, internal benchmarks, partner codes) that require employer permission to share. A single-tier approach forced a binary choice: fully gated (invisible to recruiters) or fully public (compliance risk).

## How It Works

| Layer         | Public (Tier 1)                          | Protected (Tier 2)                       |
| ------------- | ---------------------------------------- | ---------------------------------------- |
| Auth          | None                                     | nginx basic auth                         |
| Indexing      | Yes (`index, follow`)                    | No (`X-Robots-Tag: noindex, nofollow`)   |
| Path pattern  | `work/{slug}-public/index.html`          | `work/{slug}/{slug}.html`                |
| Metrics       | Anonymized (percentages, multipliers)    | Exact figures (dollar amounts, codes)    |
| Links from    | Homepage, LinkedIn, resume               | Direct URL shared via email              |
| Link chain    | Public pages link to other public pages  | Protected pages link to other protected  |

nginx uses longest-prefix matching: `/work/contract-transfer-public/` (auth off) matches before the `/work/` catch-all (auth on).

## Relationship to ADR-003

ADR-003 established basic auth as a site-wide gate. This ADR inverts the default: the homepage, projects, and resume are now public; only `/work/` (non-public paths) remains gated. Basic auth mechanism is unchanged.

## Rejected Alternatives

- **Single-tier with redaction toggle** (JS-driven show/hide) -- credentials leak in page source; complexity for a static site
- **Server-side rendering per auth state** -- requires a backend; violates the static-site constraint
- **Public-only with vague metrics** -- loses the specificity that makes case studies credible to hiring managers who get credentials

## Where in Code

- Public HTML: `work/*-public/index.html`
- Protected HTML: `work/{slug}/{slug}.html`
- nginx config: Whatbox `~/.config/nginx/nginx.conf` (not in repo)
- Homepage cards: `index.html` (link to public tier)
- Design doc: `docs/archive/2026-03-11-two-tier-implementation.md`
