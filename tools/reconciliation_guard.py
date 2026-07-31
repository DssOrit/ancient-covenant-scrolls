#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
reconciliation_guard.py — pre-edit safety check for the ACR Search excluded-text
reconciliation task.

WHY THIS EXISTS
  Across sessions the reconciliation kept drifting: edits made out of the frozen
  list order, and no-touch debunk lines nearly edited by mistake. Prose rules did
  not hold. This makes the check MECHANICAL: before editing a line in
  Search/index.html, run this and confirm it is SAFE.

WHAT IT IS / IS NOT
  - Read-only. It only reads Search/index.html and prints a report. It NEVER
    writes any file. It is not loaded, served, or executed by the site (static
    hosting ignores it; the service worker never precaches it). Deleting it has
    zero site impact. It is advisory: it reports, it does not force anything.

USAGE
  python3 tools/reconciliation_guard.py --zones
      Print the CURRENT line range of each no-touch zone (computed live from
      content anchors, so it stays correct even after edits shift line numbers).

  python3 tools/reconciliation_guard.py "<unique snippet of the line to edit>"
      Locate that snippet in Search/index.html and report SAFE / WARN / BLOCKED.
        BLOCKED  -> the target line is inside a protected no-touch zone. Do not edit.
        WARN     -> the line carries debunk-verdict language; confirm it is a
                    VALIDATING re-source (fix) and not a debunk line (leave)
                    before editing.
        SAFE     -> outside every protected zone, no debunk signature.
      Exit code: 0 SAFE, 1 WARN, 2 BLOCKED/AMBIGUOUS/NOT-FOUND (fail-safe).

The zones are located by UNIQUE content anchors, not hardcoded line numbers, so
the guard cannot go stale as the file is edited. If an anchor is missing or not
unique, the guard fails safe (errors) rather than silently passing.
"""

import sys, os

TARGET = os.path.join(os.path.dirname(__file__), '..', 'Search', 'index.html')

# Each zone: (name, start_anchor, end_anchor). Both anchors must be unique in the
# file. The protected range is [line(start), line(end)] inclusive.
ZONES = [
    ("dossier (excluded-texts warning data)",
     "// Volumes excluded from the primary canon today",
     "function toggleChronOrder(pill) {"),
    ("cave-discovery (QM_CAVES scroll cards)",
     "var QM_CAVES = [",
     "var qmFoundCaves = {}"),
    ("origin-of-cruelty (renderFinalDaysPanel section)",
     "function renderFinalDaysPanel() {",
     "window.addEventListener('load',function(){if(document.getElementById('dna-grid'))"),
]

# Line-number-independent content check. A line carrying any of these reads as a
# debunk / exclusion verdict (leave it), not a validating source (fix it).
DEBUNK_SIGNATURES = [
    "not covenant scripture",
    "sectarian forgery",
    "a later addition of manipulation texts",
    "later addition of manipulation",
    "held under warning",
    "later manipulated addition",
    "manipulated additions",
    "Not found in the authentic record",
    "VB_EXCLUDED",
]


def load():
    with open(os.path.abspath(TARGET), encoding='utf-8') as f:
        return f.read().split('\n')


def unique_line(lines, anchor):
    hits = [i + 1 for i, ln in enumerate(lines) if anchor in ln]
    if len(hits) != 1:
        sys.stderr.write(
            "GUARD ERROR: anchor is not unique (found %d): %r\n"
            "Fix the anchor in tools/reconciliation_guard.py before trusting this guard.\n"
            % (len(hits), anchor))
        sys.exit(3)
    return hits[0]


def zone_ranges(lines):
    out = []
    for name, start, end in ZONES:
        s = unique_line(lines, start)
        e = unique_line(lines, end)
        lo, hi = min(s, e), max(s, e)
        out.append((name, lo, hi))
    return out


def cmd_zones():
    lines = load()
    print("Current no-touch zone ranges in Search/index.html:")
    for name, lo, hi in zone_ranges(lines):
        print("  BLOCK  L%-6d - L%-6d  %s" % (lo, hi, name))
    print("\n(these are computed live from content anchors; safe to re-run anytime)")


def cmd_check(snippet):
    lines = load()
    ranges = zone_ranges(lines)
    hits = [i + 1 for i, ln in enumerate(lines) if snippet in ln]
    if len(hits) == 0:
        print("NOT-FOUND: snippet matched no line. Paste a longer, exact snippet of the line to edit.")
        sys.exit(2)
    if len(hits) > 1:
        print("AMBIGUOUS: snippet matched %d lines (%s). Use a longer, unique snippet."
              % (len(hits), ", ".join("L%d" % h for h in hits)))
        sys.exit(2)
    line = hits[0]
    # zone check (hard block)
    for name, lo, hi in ranges:
        if lo <= line <= hi:
            print("BLOCKED: L%d is inside protected no-touch zone: %s (L%d-L%d)."
                  % (line, name, lo, hi))
            print("Do NOT edit this line. It is debunk/exclusion content, left as-is by the plan.")
            sys.exit(2)
    # content check (warn)
    sigs = [s for s in DEBUNK_SIGNATURES if s in lines[line - 1]]
    if sigs:
        print("WARN: L%d is outside every no-touch zone, but carries debunk-verdict language: %s"
              % (line, "; ".join(repr(s) for s in sigs)))
        print("Confirm this is a VALIDATING re-source (fix), not a debunk line (leave), before editing.")
        sys.exit(1)
    print("SAFE: L%d is outside every no-touch zone and shows no debunk signature." % line)
    sys.exit(0)


def main():
    args = sys.argv[1:]
    if not args or args[0] in ("-h", "--help"):
        print(__doc__)
        sys.exit(0)
    if args[0] == "--zones":
        cmd_zones()
        sys.exit(0)
    cmd_check(args[0])


if __name__ == "__main__":
    main()
