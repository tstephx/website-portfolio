# ADR-003: Content Protection (Basic Auth)

**Date:** 2026-02-13 | **Status:** Partially superseded by ADR-006 | **Supersedes:** —

## Decision

Portfolio is protected by HTTP Basic Auth via nginx. Credentials stored server-side.
No client-side auth logic in the HTML/JS codebase.

## Why

The site is not yet public. Basic auth is the simplest reliable gate for a static
site on a VPS without requiring a login UI or session management.

## Rejected Alternatives

- Client-side password check in JS — trivially bypassed, credentials visible in source
- OAuth/SSO — massive overkill for a personal portfolio behind a temporary gate

## Where in Code

- nginx config (server-side, not in this repo)
- No auth logic in HTML/CSS/JS — the site assumes authenticated access
- See ADR-006 for the two-tier split (public pages no longer gated)
