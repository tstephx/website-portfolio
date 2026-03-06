# Deployment Checklist

Run through this before every push to production. The `/deploy` skill automates steps 2-4, but review step 1 manually.

---

## 1. Pre-deploy Verification (local)

- [ ] `npm run check` passes (ESLint + Stylelint + Prettier + html-validate)
- [ ] `npm test` passes (Playwright: pages, links, a11y, layout, visual)
- [ ] `git status` is clean — all changes committed
- [ ] `git log -3` — review recent commits, nothing accidental
- [ ] Spot-check at `http://localhost:8000` — homepage, one case study, mobile viewport

### If you changed...

| What changed         | Extra check                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| CSS tokens or styles | `npm run test:visual` — review screenshot diffs                                 |
| Case study content   | Verify link chain: CT → scoring → DSP → automation → distance → chargeback → CT |
| New page added       | `ref/site-map.md` updated, `npm run lint:html` script includes new page         |
| Images               | All three formats exist (jpg, webp, avif), `<picture>` element used             |
| Chart.js             | Token-driven pattern, no hardcoded hex colors                                   |

## 2. Push to GitHub

```bash
git push origin main
```

## 3. Pull on Whatbox

```bash
ssh echobyte@cucumber.whatbox.ca "cd ~/public_html && git pull"
```

## 4. Verify live

```bash
curl -sI https://taylorstephens.io | grep -E 'HTTP|server|x-frame|strict-transport'
```

Expected:

- `HTTP/2 200`
- `server: cloudflare`
- `x-frame-options: SAMEORIGIN`
- `strict-transport-security: max-age=31536000`

Open `https://taylorstephens.io` in browser — confirm the change is visible.

## 5. If something went wrong

### Rollback (revert last commit)

```bash
# Local
git revert HEAD
git push origin main

# Remote
ssh echobyte@cucumber.whatbox.ca "cd ~/public_html && git pull"
```

### Cloudflare cache issue

Changes not showing despite successful pull? Cloudflare may be serving stale cache.

- Hard refresh in browser: Cmd + Shift + R
- For widespread issues: Cloudflare Dashboard → Caching → Purge Everything (use sparingly)

### SSH fails

```bash
# Test connection
ssh -v echobyte@cucumber.whatbox.ca echo "connected"
```

If key auth fails, check `~/.ssh/config` for the Whatbox entry.

---

## Quick version (when confident)

```
/deploy
```

The skill runs `npm run check`, pushes, pulls, and verifies headers automatically.

---

_Created: 2026-03-04_
