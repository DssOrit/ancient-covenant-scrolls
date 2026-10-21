#!/usr/bin/env python3
"""Shrink Load Survival step panels in place: max 640 px wide, JPEG quality 68, progressive. Never enlarges.
Usage: python3 -I scripts/loadsurvival_shrink_panels.py"""
import glob, os
from PIL import Image
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'loadsurvival', 'assets', 'steps')
W, Q = 640, 68
before = after = n = 0
for f in sorted(glob.glob(os.path.join(ROOT, '*.jpg'))):
    before += os.path.getsize(f)
    im = Image.open(f).convert('RGB')
    if im.width > W: im = im.resize((W, round(W * im.height / im.width)), Image.LANCZOS)
    im.save(f, 'JPEG', quality=Q, optimize=True, progressive=True)
    after += os.path.getsize(f); n += 1
print('%d panels: %.1f MB -> %.1f MB' % (n, before / 1048576, after / 1048576))
