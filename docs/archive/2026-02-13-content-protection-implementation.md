# Content Protection Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Protect `/work/` case studies with NGINX basic auth and search engine prevention, while keeping homepage and `/projects/` fully public. Provide a custom 401 error page with an access request form for organic visitors.

**Architecture:** NGINX `auth_basic` on `/work/` location block + belt-and-suspenders search engine prevention (robots.txt, meta noindex, X-Robots-Tag header) + custom 401/401-thanks HTML pages with Formsubmit.co integration + homepage CTA setting expectations before visitors click case study links.

**Tech Stack:** NGINX 1.26.2 (Whatbox shared hosting), static HTML/CSS, Formsubmit.co (free form forwarding)

**Design doc:** `docs/plans/2026-02-13-content-protection-design.md`

---

### Task 1: Create robots.txt

**Files:**
- Create: `robots.txt`

**Step 1: Create the file**

```
User-agent: *
Disallow: /work/

User-agent: *
Allow: /
```

This tells search engine crawlers not to crawl anything under `/work/`. Everything else (homepage, `/projects/`, `/css/`, etc.) is allowed by default.

**Step 2: Verify**

Open the file and confirm it has exactly two rule blocks. No trailing whitespace after `Disallow: /work/`.

**Step 3: Commit**

```bash
git add robots.txt
git commit -m "feat: add robots.txt to block /work/ from crawlers"
```

---

### Task 2: Add noindex meta tag to all 6 work HTML files

**Files:**
- Modify: `work/contract-transfer/contract-transfer.html`
- Modify: `work/bpr-scoring-pinnacle/pinnacle-scoring.html`
- Modify: `work/cfa-dsp-application/dsp-application.html`
- Modify: `work/pinnacle-program-selection/pinnacle-automation.html`
- Modify: `work/charge-back-processing/chargeback-parsing.html`
- Modify: `work/pinnacle-station/pinnacle-distance.html`

**Step 1: Add meta tag to each file**

In each file's `<head>`, add this line immediately after the `<meta name="viewport" ...>` tag (line 5):

```html
<meta name="robots" content="noindex, nofollow">
```

All 6 files have the same `<head>` structure. The insertion point is between line 5 (`<meta name="viewport"...>`) and line 6 (`<meta name="description"...>`).

**Step 2: Verify**

Grep all 6 files to confirm each has exactly one `<meta name="robots"` tag:

```bash
grep -l 'name="robots"' work/*//*.html
```

Expected: 6 file paths listed.

**Step 3: Commit**

```bash
git add work/contract-transfer/contract-transfer.html \
        work/bpr-scoring-pinnacle/pinnacle-scoring.html \
        work/cfa-dsp-application/dsp-application.html \
        work/pinnacle-program-selection/pinnacle-automation.html \
        work/charge-back-processing/chargeback-parsing.html \
        work/pinnacle-station/pinnacle-distance.html
git commit -m "feat: add noindex meta tag to all work case study pages"
```

---

### Task 3: Create custom 401 error page (401.html)

**Files:**
- Create: `401.html`

**Step 1: Create the file**

A styled page matching the portfolio design system (Inter/Lora fonts, `--color-accent: #2563eb`, max-width 720px). Must include:

1. `<meta name="robots" content="noindex">` in `<head>`
2. Headline: "These case studies are password-protected"
3. Context paragraph: brief description of what's behind the gate — 6 case studies from Amazon covering process redesign, data pipelines, competitive intelligence, with real metrics and methodology
4. Formsubmit.co form with name + work email fields
5. Expectation text: "You'll receive a follow-up within 24 hours"
6. Link back to homepage

Form implementation:

```html
<form action="https://formsubmit.co/hi@taylor.email" method="POST">
    <input type="text" name="name" placeholder="Your name" required>
    <input type="email" name="email" placeholder="Work email" required>
    <input type="hidden" name="_subject" value="Portfolio Access Request">
    <input type="hidden" name="_next" value="https://taylorstephens.dev/401-thanks.html">
    <input type="hidden" name="_honey" style="display:none">
    <input type="hidden" name="_captcha" value="true">
    <button type="submit">Request Access</button>
</form>
```

Key details:
- `_honey` is a hidden honeypot field for spam prevention
- `_captcha` enables Formsubmit's built-in CAPTCHA
- `_next` redirects to the thank-you page after submission
- `_subject` sets the email subject line Taylor receives

Style the page inline (self-contained, no external CSS dependency) using the same fonts and color palette as the portfolio. Keep it clean and professional — this is a landing page, not a server error.

**Step 2: Verify**

Open `401.html` in a browser. Confirm:
- Fonts load (Inter for body, Lora for heading)
- Form fields are visible and styled
- Submit button is styled with accent color
- Page is centered and readable
- `noindex` meta tag is present in source

**Step 3: Commit**

```bash
git add 401.html
git commit -m "feat: add custom 401 error page with access request form"
```

---

### Task 4: Create thank-you page (401-thanks.html)

**Files:**
- Create: `401-thanks.html`

**Step 1: Create the file**

Simple confirmation page matching the 401.html design:

1. `<meta name="robots" content="noindex">` in `<head>`
2. Headline: "Your request has been received"
3. Body: "You'll hear back within 24 hours"
4. Link back to homepage: "Back to taylorstephens.dev"

Same inline styles as 401.html for visual consistency.

**Step 2: Verify**

Open in browser. Confirm it matches the 401 page styling and has the noindex tag.

**Step 3: Commit**

```bash
git add 401-thanks.html
git commit -m "feat: add 401 thank-you confirmation page"
```

---

### Task 5: Add homepage CTA near case study cards

**Files:**
- Modify: `index.html:58-59`

**Step 1: Add the CTA note**

After the `<h2>Featured Projects</h2>` on line 59, add a styled note:

```html
<p class="auth-notice">Case studies contain proprietary work from my time at Amazon and are password-protected. <a href="mailto:hi@taylor.email?subject=Portfolio%20Access%20Request">Request access</a> or enter credentials if you have them.</p>
```

**Step 2: Add minimal styling**

In `css/styles.css`, add a style for `.auth-notice`:

```css
.auth-notice {
    font-size: 0.9rem;
    color: var(--color-muted);
    margin-bottom: 2rem;
}
```

This keeps the note subtle — muted color, slightly smaller text — so it doesn't dominate the section but sets expectations before visitors click a case study link.

**Step 3: Verify**

Open `index.html` in browser. The note should appear between the "Featured Projects" heading and the first project card. It should be readable but unobtrusive.

**Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: add password-protection notice to homepage case study section"
```

---

### Task 6: Configure NGINX — auth block + error page + X-Robots-Tag

**Files:**
- Modify: `~/whatbox/.config/nginx/nginx.conf` (local mirror)
- Deploy: `echobyte@cucumber.whatbox.ca:~/.config/nginx/nginx.conf` (remote)

**Step 1: Add /work/ auth block and error_page to BOTH server blocks**

In the **port 33080 server block** (line 65-87), add these lines after the `location = /robots.txt` line (line 82) and before the `location / {` block (line 84):

```nginx
        # Protected case studies
        location /work/ {
            auth_basic "Case Studies";
            auth_basic_user_file /home/echobyte/.config/nginx/htpasswd.conf;
            add_header X-Robots-Tag "noindex, nofollow" always;
            try_files $uri $uri/ =404;
        }

        error_page 401 /401.html;
```

Apply the **identical block** to the port 16370 server block (line 92-112), in the same position relative to its location blocks.

**Important notes:**
- `401.html` lives at the site root (outside `/work/`), so it's served without auth
- The static asset regex `location ~*` (line 77/102) takes precedence over the prefix `/work/` location, so CSS/JS/images under `/work/` serve without auth — this is intentional
- `X-Robots-Tag` header covers non-HTML files (PDFs, images) served from `/work/`

**Step 2: Validate config syntax locally**

The local file is a mirror — syntax validation happens on the server. Skip to Step 3.

**Step 3: Commit the local mirror**

```bash
cd ~/whatbox
git add .config/nginx/nginx.conf
git commit -m "feat: add /work/ basic auth + custom 401 error page"
```

**Step 4: Deploy to server**

```bash
rsync -avz .config/nginx/nginx.conf echobyte@cucumber.whatbox.ca:~/.config/nginx/nginx.conf
```

**Step 5: Validate and reload on server**

```bash
ssh echobyte@cucumber.whatbox.ca 'nginx -t && nginx -s reload'
```

Expected: `nginx: configuration file ... test is successful` followed by a clean reload.

**Step 6: Verify auth prompt**

```bash
curl -s -o /dev/null -w "%{http_code}" https://taylorstephens.dev/work/contract-transfer/contract-transfer.html
```

Expected: `401`

```bash
curl -s -o /dev/null -w "%{http_code}" -u portfolio:PASSWORD https://taylorstephens.dev/work/contract-transfer/contract-transfer.html
```

Expected: `200` (after htpasswd is set up in Task 7)

---

### Task 7: Set up htpasswd credentials

**Files:**
- Modify: `/home/echobyte/.config/nginx/htpasswd.conf` (remote only)

**Step 1: Add the portfolio user**

```bash
ssh echobyte@cucumber.whatbox.ca 'htpasswd -s ~/.config/nginx/htpasswd.conf portfolio'
```

This prompts for a password interactively. Choose a memorable word to include in outreach materials.

**Note:** The `-s` flag uses SSHA (salted SHA-1) hashing, which is the recommended scheme for NGINX basic auth.

**Step 2: Verify the entry exists**

```bash
ssh echobyte@cucumber.whatbox.ca 'grep "^portfolio:" ~/.config/nginx/htpasswd.conf'
```

Expected: `portfolio:{SSHA}...` (hashed password)

**Step 3: Test end-to-end**

1. Open `https://taylorstephens.dev/work/contract-transfer/contract-transfer.html` in browser
2. Browser shows native auth popup
3. Enter `portfolio` / `[password]` → page loads
4. Click Cancel instead → custom 401 page appears with access request form
5. Navigate to another `/work/` page → no re-prompt (browser caches session credentials)
6. Open `https://taylorstephens.dev/projects/book-library-mcp.html` → loads without auth
7. Open `https://taylorstephens.dev/` → loads without auth

---

### Task 8: Deploy website files and activate Formsubmit

**Files:**
- Deploy: `401.html`, `401-thanks.html`, `robots.txt` to remote

**Step 1: Push to GitHub**

```bash
cd ~/\_Lab/website-portfolio
git push origin main
```

The portfolio deploys from the GitHub repo (or via rsync — use whichever deployment method is standard).

**Step 2: Activate Formsubmit.co**

After the first form submission to `https://formsubmit.co/hi@taylor.email`, Formsubmit sends a one-time verification email to `hi@taylor.email`. Click the confirmation link to activate. All future submissions forward automatically after that.

Test by submitting the form yourself from the live 401 page. Check email for the activation request, confirm it, then verify subsequent submissions arrive.

**Step 3: Final verification checklist**

| Test | Expected |
|------|----------|
| `curl` `/work/` page without auth | 401 |
| `curl` `/work/` page with auth | 200 |
| Browser → `/work/` page → Cancel → 401 page | Custom form page |
| Submit form on 401 page | Redirect to 401-thanks.html |
| `curl` `/projects/` page | 200 (no auth) |
| `curl` `/` (homepage) | 200 (no auth) |
| `curl -I` `/work/` page | X-Robots-Tag: noindex, nofollow |
| `curl` `/robots.txt` | Disallow: /work/ |
| Google "site:taylorstephens.dev/work" | No results (may take days) |
