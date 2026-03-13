# Portfolio Content Audit — Phase 0: Mechanical Checks

## What this is

Automated pre-scan that removes grunt work from the deep review. Run this FIRST, save the output, and hand it to the Phase 1-3 prompts as context.

## Run these checks

```bash
cd ~/Dev/_Projects/website-portfolio

echo "=== ANONYMIZATION LEAKS ==="
echo "--- Dollar signs on public pages ---"
grep -n '\$[0-9]' work/partner-application-public/index.html work/contract-transfer-public/index.html work/pinnacle-public/index.html 2>/dev/null || echo "  CLEAN"

echo "--- Chick-fil-A / CFA on public pages ---"
grep -in 'chick-fil-a\|CFA' work/partner-application-public/index.html work/contract-transfer-public/index.html work/pinnacle-public/index.html 2>/dev/null || echo "  CLEAN"

echo "--- Pinnacle on public pages ---"
grep -in 'Pinnacle' work/pinnacle-public/index.html 2>/dev/null || echo "  CLEAN"

echo "--- DSP abbreviation on public pages (excluding href/canonical) ---"
grep -n '\bDSP\b' work/partner-application-public/index.html work/contract-transfer-public/index.html work/pinnacle-public/index.html 2>/dev/null | grep -v 'href\|canonical' || echo "  CLEAN"

echo "--- Tier 1 on Pinnacle public ---"
grep -in 'Tier 1' work/pinnacle-public/index.html 2>/dev/null || echo "  CLEAN"

echo "--- Amazon on public pages (excluding href/canonical) ---"
grep -n 'Amazon' work/partner-application-public/index.html work/contract-transfer-public/index.html work/pinnacle-public/index.html index.html 2>/dev/null | grep -v 'href\|canonical' || echo "  CLEAN"

echo ""
echo "=== SENTENCE LENGTH (>35 words) ==="
python3 -c "
import re, sys
pages = [
    ('Homepage', 'index.html'),
    ('PA Public', 'work/partner-application-public/index.html'),
    ('CT Public', 'work/contract-transfer-public/index.html'),
    ('PIN Public', 'work/pinnacle-public/index.html'),
    ('PA Protected', 'work/cfa-dsp-application/dsp-application.html'),
    ('CT Protected', 'work/contract-transfer/contract-transfer.html'),
    ('PIN Protected', 'work/pinnacle-program-selection/pinnacle-automation.html'),
]
for name, path in pages:
    with open(path) as f:
        html = f.read()
    body = re.search(r'<main.*?</main>', html, re.DOTALL)
    if not body: continue
    text = re.sub(r'<[^>]+>', ' ', body.group())
    text = re.sub(r'&\w+;', ' ', text)
    sentences = re.split(r'[.!?]+', text)
    long = [(s.strip(), len(s.split())) for s in sentences if len(s.split()) > 35]
    if long:
        print(f'\n  {name}:')
        for s, wc in long:
            print(f'    [{wc}w] {s[:100]}...')
"

echo ""
echo "=== READ NEXT CTA CHECK ==="
python3 -c "
import re
pairs = [
    ('PA Public', 'work/partner-application-public/index.html'),
    ('CT Public', 'work/contract-transfer-public/index.html'),
    ('PIN Public', 'work/pinnacle-public/index.html'),
    ('PA Protected', 'work/cfa-dsp-application/dsp-application.html'),
    ('CT Protected', 'work/contract-transfer/contract-transfer.html'),
    ('PIN Protected', 'work/pinnacle-program-selection/pinnacle-automation.html'),
]
for name, path in pairs:
    with open(path) as f:
        html = f.read()
    cta = re.search(r'Read next: (.*?)\s*<', html)
    print(f'  {name:15s}: {cta.group(1).strip()[:60] if cta else \"MISSING\"}')"

echo ""
echo "=== NUMBER CONSISTENCY CHECK ==="
python3 -c "
import re
targets = ['86.6%', '16.98', '2.28', '274%', '57.9%', '94.1%', '0.25', '3.8']
pages = [
    ('Homepage', 'index.html'),
    ('PA Pub', 'work/partner-application-public/index.html'),
    ('CT Pub', 'work/contract-transfer-public/index.html'),
    ('PIN Pub', 'work/pinnacle-public/index.html'),
    ('PA Prot', 'work/cfa-dsp-application/dsp-application.html'),
    ('CT Prot', 'work/contract-transfer/contract-transfer.html'),
    ('PIN Prot', 'work/pinnacle-program-selection/pinnacle-automation.html'),
    ('Resume', 'resume.html'),
]
print(f'  {\"Number\":10s}', end='')
for name, _ in pages:
    print(f' {name:8s}', end='')
print()
for num in targets:
    print(f'  {num:10s}', end='')
    for _, path in pages:
        with open(path) as f:
            html = f.read()
        count = html.count(num)
        print(f' {count if count else \".\":>8s}', end='')
    print()
"
```

Save the output to `docs/active/audit-phase0-results.txt` before running Phases 1-3.
