#!/usr/bin/env bash
# check-js-syntax.sh
# Extracts every <script> block from ACR HTML files and runs node --check on each.
# Blocks pushes/PRs if any JS syntax error is found.
# Run manually: bash scripts/check-js-syntax.sh
# Run automatically: triggered by GitHub Actions on every PR.

set -euo pipefail

ERRORS=0
TMPDIR_WORK=$(mktemp -d)
trap 'rm -rf "$TMPDIR_WORK"' EXIT

HTML_FILES=(
  "Search/index.html"
  "load/index.html"
  "attain/index.html"
  "attain-jr/index.html"
  "Study/index.html"
  "GreatE/index.html"
  "GESTUDY/index.html"
  "ACR2/index.html"
  "Solar/index.html"
  "loadmaps/index.html"
)

JS_FILES=(
  "Search/sw.js"
  "load/sw.js"
  "load/load.js"
  "attain/sw.js"
  "attain-jr/sw.js"
  "Study/sw.js"
  "GreatE/sw.js"
  "loadmaps/sw.js"
  "sw.js"
)

echo "=== ACR JS Syntax Check ==="
echo ""

# Check standalone JS files
for js_file in "${JS_FILES[@]}"; do
  [ -f "$js_file" ] || continue
  if node --check "$js_file" 2>/dev/null; then
    echo "  PASS  $js_file"
  else
    echo "  FAIL  $js_file"
    node --check "$js_file" 2>&1 | head -6
    ERRORS=$((ERRORS + 1))
  fi
done

# Check JS blocks extracted from HTML files
for html_file in "${HTML_FILES[@]}"; do
  [ -f "$html_file" ] || continue
  python3 - "$html_file" "$TMPDIR_WORK" << 'PYEOF'
import re, sys, subprocess, os

html_path = sys.argv[1]
tmp_dir   = sys.argv[2]

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

scripts = re.findall(r'<script(?:\s(?!src=)[^>]*)?>(.+?)</script>', content, re.DOTALL)
errors  = 0

for i, src in enumerate(scripts):
    if len(src.strip()) < 50:
        continue  # skip tiny inline snippets
    tmp_js = os.path.join(tmp_dir, f'block_{i}.js')
    with open(tmp_js, 'w', encoding='utf-8') as f:
        f.write(src)
    result = subprocess.run(['node', '--check', tmp_js], capture_output=True)
    if result.returncode != 0:
        msg = result.stderr.decode().strip()
        # Adjust line number to HTML line for easier debugging
        print(f'  FAIL  {html_path} (script block {i}):')
        print(f'        {msg.splitlines()[0]}')
        errors += 1
    os.remove(tmp_js)

if errors == 0:
    print(f'  PASS  {html_path}')
sys.exit(errors)
PYEOF
  [ $? -eq 0 ] || ERRORS=$((ERRORS + 1))
done

echo ""
if [ "$ERRORS" -gt 0 ]; then
  echo "FAILED — $ERRORS file(s) have JS syntax errors."
  echo "Fix unescaped apostrophes or other syntax issues before pushing."
  echo ""
  echo "Common causes:"
  echo "  - Unescaped apostrophe in a single-quoted JS string: Yisra'el -> Yisra\\'el"
  echo "  - Unclosed string or bracket"
  echo "  - Broken template literal"
  exit 1
else
  echo "ALL CHECKS PASSED — safe to push."
  exit 0
fi
