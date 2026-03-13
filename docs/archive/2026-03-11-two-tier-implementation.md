# Two-Tier Portfolio Implementation Guide

_Detailed requirements and execution steps for adding public case study versions alongside the existing protected versions._

**Created:** 2026-03-11
**Status:** Ready for implementation
**Prerequisites:** SSH access to Whatbox, nginx config write access

---

## Current State

| Component         | How it works today                                                             |
| ----------------- | ------------------------------------------------------------------------------ |
| **Auth**          | nginx basic auth on both `/` and `/work/` — entire site is gated               |
| **nginx config**  | User-managed at `~/.config/nginx/nginx.conf` on Whatbox                        |
| **htpasswd**      | `~/.config/nginx/htpasswd.conf` (2 users)                                      |
| **Site root**     | Whatbox site root directory                                                    |
| **Case studies**  | `work/{slug}/{slug}.html` — all behind basic auth                              |
| **Deploy**        | `git push origin main` → SSH to Whatbox and `git pull` in site root            |
| **nginx restart** | `/usr/sbin/nginx -c ~/.config/nginx/nginx.conf`                                |
| **robots.txt**    | `Allow: /` — but nginx adds `X-Robots-Tag: noindex, nofollow` on all responses |

---

## Target State

| Layer           | Public (Tier 1)                                                                          | Protected (Tier 2)                                 |
| --------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **What**        | Anonymized case studies — no dollar figures, no internal abbreviations, no partner codes | Full case studies with exact metrics               |
| **Who sees it** | Anyone with the URL — recruiters, LinkedIn visitors, Google                              | Hiring managers you share credentials with         |
| **Auth**        | None                                                                                     | Basic auth (existing)                              |
| **Indexed**     | Yes — `noindex` tag removed, sitemap updated                                             | No — `X-Robots-Tag: noindex, nofollow` stays       |
| **Path**        | `/work/{slug}-public/index.html`                                                         | `/work/{slug}/{slug}.html` (unchanged)             |
| **Links from**  | Homepage cards, LinkedIn, resume                                                         | Direct URL shared via email, CTA on public version |

---

## Implementation: 4 Phases

### Phase 1: nginx Config Changes

Edit `~/.config/nginx/nginx.conf` on Whatbox. The key change: add `auth_basic off` location blocks for public paths **before** the `/work/` catch-all. nginx uses longest prefix match, so `/work/contract-transfer-public/` matches before `/work/`.

**SSH in and edit:**

```bash
ssh $WHATBOX_USER@$WHATBOX_HOST
nano ~/.config/nginx/nginx.conf
```

**Replace the existing taylorstephens.io server block's location rules with:**

```nginx
        # Static asset caching
        location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
            expires max;
            access_log off;
        }
        location = /favicon.ico { access_log off; log_not_found off; }
        location = /robots.txt  { access_log off; log_not_found off; }

        # ── PUBLIC case studies (no auth, indexable) ──
        location /work/contract-transfer-public/ {
            auth_basic off;
            try_files $uri $uri/ =404;
        }
        location /work/partner-application-public/ {
            auth_basic off;
            try_files $uri $uri/ =404;
        }
        location /work/pinnacle-public/ {
            auth_basic off;
            try_files $uri $uri/ =404;
        }

        # ── PROTECTED case studies (auth required, noindex) ──
        location /work/ {
            auth_basic "Case Studies";
            auth_basic_user_file $WHATBOX_HOME/.config/nginx/htpasswd.conf;
            add_header X-Robots-Tag "noindex, nofollow" always;
            try_files $uri $uri/ =404;
        }

        error_page 401 /401.html;

        # ── PUBLIC homepage and everything else ──
        location / {
            try_files $uri $uri/ =404;
        }
```

**Critical changes from current config:**

1. Root `/` location: `auth_basic` removed — homepage, projects, resume are now public
2. Root `/` location: `X-Robots-Tag noindex` removed — pages can be indexed
3. Three new `auth_basic off` blocks for public case study paths
4. `/work/` catch-all keeps auth + noindex for protected versions

**Test and reload:**

```bash
# Validate config before reloading (prevents downtime from syntax errors)
/usr/sbin/nginx -t -c ~/.config/nginx/nginx.conf

# If validation passes, reload (zero-downtime)
/usr/sbin/nginx -s reload -c ~/.config/nginx/nginx.conf
```

**Repeat for the backup server block (port 16370)** — same location rules.

**Verify:**

```bash
# Public page — should return 200 with no auth challenge
curl -sI https://taylorstephens.io/ | grep -E 'HTTP|WWW-Authenticate'

# Protected page — should return 401 without credentials
curl -sI https://taylorstephens.io/work/contract-transfer/ | grep -E 'HTTP|WWW-Authenticate'

# Public case study — should return 200 (after Phase 2 creates the files)
curl -sI https://taylorstephens.io/work/contract-transfer-public/ | grep -E 'HTTP|WWW-Authenticate'
```

---

### Phase 2: Create Public Case Study Files

For each case study, create a `-public` sibling directory containing the anonymized version.

**Directory structure after implementation:**

```
work/
├── cfa-dsp-application/
│   ├── dsp-application.html          ← Tier 2 (protected, unchanged)
│   └── anonymization-guide.md        ← Reference (gitignored)
├── partner-application-public/
│   └── index.html                    ← Tier 1 (public, anonymized)
│
├── contract-transfer/
│   ├── contract-transfer.html        ← Tier 2 (protected, unchanged)
│   └── anonymization-guide.md        ← Reference (gitignored)
├── contract-transfer-public/
│   └── index.html                    ← Tier 1 (public, anonymized)
│
├── pinnacle-program-selection/
│   ├── pinnacle-automation.html      ← Tier 2 (protected, unchanged)
│   └── anonymization-guide.md        ← Reference (gitignored)
└── pinnacle-public/
    └── index.html                    ← Tier 1 (public, anonymized)
```

**For each case study:**

1. Copy the protected HTML to the public directory:

```bash
mkdir -p work/contract-transfer-public
cp work/contract-transfer/contract-transfer.html work/contract-transfer-public/index.html
```

2. Apply all Tier 1 replacements from the case study's `anonymization-guide.md`

3. Update these HTML elements in the public version:
   - `<meta name="robots">` → change to `index, follow` (or remove the tag entirely)
   - `<link rel="canonical">` → point to the public URL
   - `<meta name="description">` → anonymized version (no dollar figures)
   - `<meta property="og:description">` → same
   - `<title>` → match updated case study title if changed

4. Add a CTA section before the lessons, linking to the protected version:

```html
<section class="cs-section cs-unlock-cta">
  <p>
    This case study uses anonymized metrics. The full version — with exact figures, internal
    benchmarks, and detailed methodology — is available on request.
  </p>
  <a href="../../401.html" class="cta-button">
    Request access to full case studies <span class="arrow">→</span>
  </a>
</section>
```

5. Keep the "Read next" CTA pointing to the next **public** case study (not the protected one):

```html
<!-- Public chain: partner-app-public → ct-public → pinnacle-public → partner-app-public -->
<a href="../contract-transfer-public/index.html" class="cta-button">
  Read next: Contract Transfer Process Redesign <span class="arrow">→</span>
</a>
```

**Path depth is the same** (`work/{slug-public}/index.html` = depth 2), so all relative paths (`../../css/`, `../../js/`) work without changes.

---

### Phase 3: Update Homepage and Supporting Files

**`index.html` — card links:**

Update all three card `href` values to point to public versions:

```html
<!-- Card 1 -->
<a href="work/partner-application-public/index.html">Partner Application Redesign</a>
<!-- ... -->
<a href="work/partner-application-public/index.html" class="card-link">Read case study →</a>

<!-- Card 2 -->
<a href="work/contract-transfer-public/index.html">Contract Transfer Process Redesign</a>
<!-- ... -->
<a href="work/contract-transfer-public/index.html" class="card-link">Read case study →</a>

<!-- Card 3 -->
<a href="work/pinnacle-public/index.html">Selection Automation</a>
<!-- ... -->
<a href="work/pinnacle-public/index.html" class="card-link">Read case study →</a>
```

**`robots.txt` — already allows all.** No change needed.

**`sitemap.xml` — add public case study URLs:**

```xml
<url>
  <loc>https://taylorstephens.io/work/partner-application-public/</loc>
</url>
<url>
  <loc>https://taylorstephens.io/work/contract-transfer-public/</loc>
</url>
<url>
  <loc>https://taylorstephens.io/work/pinnacle-public/</loc>
</url>
```

Do NOT add the protected `/work/{slug}/` URLs to the sitemap.

**`ref/site-map.md` — update the page index:**

Add a new "Public Case Studies" table and update the link chain documentation to reflect both public and protected chains.

**`401.html` — no changes needed.** It already explains that case studies are password-protected and provides an access request form. The public versions link here.

---

### Phase 4: Testing and Deploy

**Add public pages to test suites:**

Update these Playwright spec files (per `ref/testing.md`):

1. **pages spec** — add the 3 new public URLs to the page existence test
2. **a11y spec** — add the 3 new URLs to the axe-core accessibility scan
3. **layout spec** — add at least 1 public case study to the 3-viewport layout check
4. **visual spec** — add snapshot for at least 1 public case study
5. **link-chain spec** — add a separate public link chain test

**`npm run lint:html` script** — add the 3 new HTML files.

**Local verification:**

```bash
# Run all checks
npm run check
npm test

# Manual spot-check: start local server and verify
python3 -m http.server 8000
# Open http://localhost:8000/work/contract-transfer-public/
# Verify: no dollar figures, no internal abbreviations, CTA links to 401
```

**Deploy:**

```bash
# Push all changes (HTML files, sitemap, tests, site-map.md)
git add -A
git commit -m "feat: add public case study tier with anonymized metrics"
git push origin main

# Pull on Whatbox
ssh $WHATBOX_USER@$WHATBOX_HOST "cd ~/public_html && git pull"

# nginx config was already updated in Phase 1, so no reload needed here
```

**Post-deploy verification:**

```bash
# Homepage loads without auth
curl -sI https://taylorstephens.io/ | grep 'HTTP'
# Expected: HTTP/2 200

# Public case study loads without auth
curl -sI https://taylorstephens.io/work/contract-transfer-public/ | grep 'HTTP'
# Expected: HTTP/2 200

# Protected case study requires auth
curl -sI https://taylorstephens.io/work/contract-transfer/ | grep 'HTTP'
# Expected: HTTP/2 401

# Protected case study works with credentials
curl -sI -u portfolio:PASSWORD https://taylorstephens.io/work/contract-transfer/ | grep 'HTTP'
# Expected: HTTP/2 200
```

---

## Execution Order

| Step | What                                                                  | Where         | Time   |
| ---- | --------------------------------------------------------------------- | ------------- | ------ |
| 1    | Edit nginx.conf — add public location blocks, remove root auth        | Whatbox SSH   | 10 min |
| 2    | Test and reload nginx                                                 | Whatbox SSH   | 2 min  |
| 3    | Verify auth behavior (public 200, protected 401)                      | Terminal curl | 2 min  |
| 4    | Create 3 public case study directories + copy HTML                    | Local repo    | 5 min  |
| 5    | Apply anonymization replacements per each guide                       | Local repo    | 30 min |
| 6    | Add CTA sections to public versions                                   | Local repo    | 10 min |
| 7    | Update public link chain (public → public)                            | Local repo    | 5 min  |
| 8    | Update homepage card links                                            | Local repo    | 5 min  |
| 9    | Update sitemap.xml                                                    | Local repo    | 2 min  |
| 10   | Update ref/site-map.md                                                | Local repo    | 5 min  |
| 11   | Update meta tags (robots, canonical, descriptions) in public versions | Local repo    | 10 min |
| 12   | Add public pages to test suites                                       | Local repo    | 15 min |
| 13   | Run `npm run check` + `npm test`                                      | Local         | 5 min  |
| 14   | Git push + git pull on Whatbox                                        | Terminal      | 2 min  |
| 15   | Post-deploy curl verification                                         | Terminal      | 5 min  |

**Total estimated time: ~2 hours**

---

## Rollback Plan

If something breaks:

**nginx rollback** (auth issues):

```bash
ssh $WHATBOX_USER@$WHATBOX_HOST
# Restore original nginx.conf
cp ~/.config/nginx/nginx.conf.save ~/.config/nginx/nginx.conf
/usr/sbin/nginx -s reload -c ~/.config/nginx/nginx.conf
```

Before making changes, save a backup:

```bash
cp ~/.config/nginx/nginx.conf ~/.config/nginx/nginx.conf.pre-two-tier
```

**Code rollback** (broken pages):

```bash
git revert HEAD
git push origin main
ssh $WHATBOX_USER@$WHATBOX_HOST "cd ~/public_html && git pull"
```

---

## Maintenance Notes

**When updating a case study:**

- Edit the **protected version** first (it has exact figures — source of truth)
- Then propagate non-confidential changes to the **public version**
- The anonymization guide in each case study directory documents what differs

**When adding a new case study:**

- Create both versions simultaneously
- Add a new `auth_basic off` nginx location block for the public path
- Add to both link chains (public and protected)
- Write an anonymization guide before creating the public version

**Password management:**

- htpasswd file: `~/.config/nginx/htpasswd.conf`
- Add a user: `htpasswd ~/.config/nginx/htpasswd.conf username`
- Remove a user: edit the file, delete the line, reload nginx
