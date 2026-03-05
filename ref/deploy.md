# Deploy Reference

**Stack:** Whatbox shared hosting (nginx) → Cloudflare CDN → `taylorstephens.io`

**Last verified:** 2026-03-04

---

## How Deployment Works

The live site lives in `~/public_html/` on Whatbox. It is a git checkout of the `main` branch.
Deploy = `git pull` on the server. No rsync, no file upload.

```
[local] git push origin main
   ↓
[GitHub] tstephx/website-portfolio (main)
   ↓
[Whatbox] cd ~/public_html && git pull
   ↓
[Cloudflare] serves cached/proxied content
```

---

## Deploy Steps

```bash
# 1. Local: commit and push
git push origin main

# 2. Remote: pull on Whatbox
ssh echobyte@cucumber.whatbox.ca "cd ~/public_html && git pull"
```

That's it. Cloudflare's CDN cache invalidates automatically for most assets (short TTL).
For fonts/images with long cache headers, a hard refresh clears the cache on first visit.

---

## Whatbox Constraints

- Shared hosting — NO root, NO sudo, NO package installs
- nginx config is inaccessible (`/etc/nginx/` is Permission denied)
- No `.htaccess` (Apache-only), no `_headers` file (Netlify/CF Pages only)
- HTTP headers are managed by Cloudflare, not the origin server

---

## Cloudflare Configuration

Security and performance headers are set via **Managed Transforms** (free plan):

| Feature              | Status                       | Notes                                               |
| -------------------- | ---------------------------- | --------------------------------------------------- |
| Add security headers | Enabled                      | X-Frame-Options, X-Content-Type, etc.               |
| Remove X-Powered-By  | Enabled                      | Hides server fingerprint                            |
| HSTS                 | Enabled                      | `max-age=31536000` (6 months), no subdomain/preload |
| TLS minimum          | 1.2                          | TLS 1.0/1.1 blocked                                 |
| Certificate          | Universal SSL (auto-renewed) |

**Where to configure:** Cloudflare Dashboard → taylorstephens.io → Security / SSL-TLS / Managed Transforms

---

## Verifying Headers

```bash
curl -sI https://taylorstephens.io | grep -E 'server|x-frame|strict-transport|content-type-options'
```

Expected output includes:

- `server: cloudflare`
- `x-frame-options: SAMEORIGIN`
- `strict-transport-security: max-age=31536000`
- `x-content-type-options: nosniff`

---

## Git Setup on Whatbox (one-time, already done)

```bash
ssh echobyte@cucumber.whatbox.ca
cd ~/public_html
git init
git remote add origin git@github.com:tstephx/website-portfolio.git
git fetch origin
git reset --hard origin/main   # overlay repo on existing files
```

SSH key used: ed25519 key from Whatbox, added to GitHub account (Settings → SSH keys).

---

## Fonts (Self-Hosted)

Google Fonts dependencies were removed in commit `311ee4c`. Fonts now served from `fonts/` directory.

- No external font requests at page load
- 6 WOFF2 files in `fonts/` — latin subset only
- Font declarations in `css/fonts.css` — loaded before `css/styles.css` on all pages
