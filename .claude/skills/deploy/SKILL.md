---
name: deploy
description: Push to GitHub and deploy to production (Whatbox + Cloudflare)
disable-model-invocation: true
---

# Deploy to Production

One-command deploy: push to GitHub, pull on Whatbox, verify live.

## Pre-flight

1. Run `npm run check` (lint + format + html-validate). Stop if errors.
2. Run `git status` — confirm working tree is clean (all changes committed).
3. If uncommitted changes exist, ask the user whether to commit first.

## Deploy

```bash
# Push to GitHub
git push origin main

# Pull on Whatbox
ssh echobyte@cucumber.whatbox.ca "cd ~/public_html && git pull"
```

## Verify

```bash
# Check site is serving
curl -sI https://taylorstephens.io | grep -E 'HTTP|server|x-frame'
```

Report: push status, pull output, and HTTP response headers.
