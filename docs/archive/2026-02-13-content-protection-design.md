# Portfolio Content Protection Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:writing-plans to create the implementation plan from this design.

**Goal:** Protect proprietary Amazon case studies (`/work/`) from public discovery and unauthorized access, while keeping `/projects/` and homepage fully public. Enable zero-friction access for targeted recruiters and a manual vetting path for organic visitors.

**Architecture:** NGINX basic auth on `/work/` location block + search engine prevention (robots.txt, meta noindex, X-Robots-Tag) + custom 401 error page with Formsubmit.co access request form + homepage CTA setting expectations.

---

## Access Model

| Path | Access Level | Auth | Search Indexed |
|------|-------------|------|----------------|
| `/` (homepage) | Public | None | Yes |
| `/resume.html` | Public | None | No (noindex) |
| `/work/*` | **Protected** | NGINX basic auth | No |
| `/projects/*` | Public | None | Yes |
| `/css/`, `/js/`, `/images/` | Public | None | N/A |
| `/401.html`, `/401-thanks.html` | Public | None | No (noindex) |

## Credential Workflow

- **Outreach (email/LinkedIn):** Include username and password directly in application materials
- **Organic visitors:** Hit auth prompt on `/work/` pages -> cancel -> see custom 401 page with context and access request form -> submit name + email -> Taylor vets and replies with credentials within 24 hours

---

## Component 1: NGINX Configuration

### Basic auth on `/work/` only

```nginx
location /work/ {
    auth_basic "Case Studies";
    auth_basic_user_file /home/echobyte/.config/nginx/htpasswd.conf;
    add_header X-Robots-Tag "noindex, nofollow" always;
    try_files $uri $uri/ =404;
}
```

### Custom 401 error page

```nginx
error_page 401 /401.html;
```

**Important:** `401.html` lives at the site root (outside `/work/`), so it is served without auth.

### Location matching behavior

NGINX regex locations (`~*`) for static assets take precedence over prefix locations (`/work/`). This means CSS/JS/images under `/work/` serve without auth. This is desirable — shared stylesheets load freely, auth prompt only appears on HTML pages.

---

## Component 2: Search Engine Prevention (belt + suspenders)

### robots.txt (new file at site root)

```
User-agent: *
Disallow: /work/

User-agent: *
Allow: /
```

### Meta tag in every `/work/*.html` `<head>`

```html
<meta name="robots" content="noindex, nofollow">
```

### X-Robots-Tag header

Included in the NGINX `/work/` location block above via `add_header`.

**Why all three:** `robots.txt` prevents crawling. `meta noindex` prevents indexing if crawled anyway (e.g., via external link). `X-Robots-Tag` covers non-HTML files (PDFs, images).

---

## Component 3: Custom 401 Error Page (`/401.html`)

A styled mini landing page, not a server error. Matches the portfolio's design system (Inter/Lora fonts, `--color-accent: #2563eb`, `--max-width: 720px`).

### Content structure

1. **Headline:** "These case studies are password-protected"
2. **Context:** Brief description of what's behind the gate — 6 case studies from Amazon covering process redesign, data pipelines, competitive intelligence, with real metrics and methodology
3. **Form:** Name + work email + submit button (via Formsubmit.co)
4. **Expectation:** "You'll receive a follow-up within 24 hours"

### Form implementation (Formsubmit.co)

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

- **Spam protection:** Honeypot field (`_honey`) + Formsubmit's built-in CAPTCHA
- **Redirect:** After submission, visitor sees `/401-thanks.html` confirmation page
- **Activation:** First submission triggers a one-time email verification to `hi@taylor.email`. Click to confirm, then all future submissions forward automatically.

---

## Component 4: Thank-You Page (`/401-thanks.html`)

Simple confirmation page matching the site design:

- "Your request has been received"
- "You'll hear back within 24 hours"
- Link back to homepage

Also has `<meta name="robots" content="noindex">`.

---

## Component 5: Homepage CTA

Small note near the "Professional Work" case study cards section:

> "Case studies contain proprietary work from my time at Amazon and are password-protected. [Request access](mailto:hi@taylor.email?subject=Portfolio%20Access%20Request) or enter credentials if you have them."

This sets expectations **before** visitors click a case study link and encounter the browser auth popup.

---

## NGINX Gotchas

1. **Browser auth popup behavior:** When basic auth is triggered, the browser shows its native popup first. Visitor must click Cancel to see the custom 401 page. The homepage CTA mitigates this by setting expectations before the click.

2. **401.html must be outside `/work/`:** The error page lives at the site root so NGINX can serve it without auth.

3. **Static assets bypass auth:** Regex location for `.css/.js/.woff/.jpg` etc. matches before prefix `/work/` location. CSS/JS load without auth prompt. This is intentional.

4. **Session caching:** Once a visitor authenticates, most browsers cache the credentials for the session. Navigation between `/work/` pages (including the "Next:" link chain) works without re-prompting.

---

## Files Changed

| File | Action | Description |
|------|--------|-------------|
| `401.html` | **Create** | Custom auth error page with access request form |
| `401-thanks.html` | **Create** | Form submission confirmation page |
| `robots.txt` | **Create** | Search engine crawl directives |
| `index.html` | **Modify** | Add CTA note near work case study cards |
| `work/*/*.html` (6 files) | **Modify** | Add `<meta name="robots" content="noindex, nofollow">` |
| Whatbox `nginx.conf` | **Modify** | Add `/work/` auth block, error_page directive, X-Robots-Tag |
| Whatbox `htpasswd.conf` | **Modify** | Add `portfolio` user entry |

---

## Future Considerations

- **Homepage card truncation:** The work case study cards currently show full Challenge/Action/Result summaries. This is substantial content before the gate. Consider truncating to tease rather than tell — separate design decision.
- **Password rotation:** Periodically change the basic auth password and update outreach templates.
- **Analytics:** Formsubmit submissions provide a lightweight record of who requested access and when.
