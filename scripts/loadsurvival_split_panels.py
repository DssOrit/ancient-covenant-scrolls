#!/usr/bin/env python3
"""Split 5-panel (2 on top, 3 below) or 4-panel (2x2) pictures for Load Survival.
Usage: python3 -I scripts/loadsurvival_split_panels.py <guide-id>=<picture.png> ...
Writes loadsurvival/assets/steps/<guide-id>-<n>.jpg and updates loadsurvival/step-images.js.
Then add the new files to the list in loadsurvival/service-worker.js and bump the cache."""
import sys, os, re, json
from PIL import Image
import numpy as np
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'loadsurvival')

def gaps(v, lo, hi, thr=238):
    idx = [i for i in range(int(lo), int(hi)) if v[i] > thr]
    out = []
    for x in idx:
        if out and x == out[-1][1] + 1: out[-1][1] = x
        else: out.append([x, x])
    return out

def pick(g, target):
    return min(g, key=lambda t: abs((t[0] + t[1]) / 2 - target)) if g else None

def cuts(v, n, length):
    """Return n (start,end) spans separated by light gaps near equal positions."""
    edges = [0]
    for k in range(1, n):
        t = length * k / n
        g = pick(gaps(v, t - length * .08, t + length * .08), t)
        edges += [g[0] - 1, g[1] + 2] if g else [int(t) - 2, int(t) + 2]
    edges.append(length)
    return [(edges[i], edges[i + 1]) for i in range(0, len(edges), 2)]

def split(path):
    im = Image.open(path).convert('RGB'); a = np.asarray(im.convert('L')).astype(float); h, w = a.shape
    hb = pick(gaps(a.mean(axis=1), h * .3, h * .7), h / 2) or (h // 2 - 4, h // 2 + 4)
    rows = [(0, hb[0] - 1), (hb[1] + 2, h)]
    # decide 4-panel (2 + 2) or 5-panel (2 + 3) by looking for gaps in the bottom row
    bottom = a[rows[1][0]:rows[1][1]].mean(axis=0)
    three = len(gaps(bottom, w * .2, w * .8)) >= 2
    panels = []
    for r, (y0, y1) in enumerate(rows):
        n = 2 if r == 0 else (3 if three else 2)
        v = a[y0:y1].mean(axis=0)
        for x0, x1 in cuts(v, n, w):
            panels.append(im.crop((x0, y0, x1, y1)))
    return panels

def main(args):
    mapping_path = os.path.join(ROOT, 'step-images.js')
    txt = open(mapping_path, encoding='utf8').read()
    m = json.loads(re.search(r'=\s*(\{.*\});', txt, re.S).group(1))
    os.makedirs(os.path.join(ROOT, 'assets', 'steps'), exist_ok=True)
    for arg in args:
        gid, pic = arg.split('=', 1)
        paths = []
        for i, p in enumerate(split(pic), 1):
            if p.width > 800: p = p.resize((800, round(800 * p.height / p.width)), Image.LANCZOS)
            rel = 'assets/steps/%s-%d.jpg' % (gid, i)
            p.save(os.path.join(ROOT, rel), quality=84, optimize=True, progressive=True); paths.append(rel)
        m[gid] = paths; print(gid, len(paths), 'panels')
    open(mapping_path, 'w', encoding='utf8').write('window.LOAD_STEP_IMAGES=' + json.dumps(m, indent=1) + ';\n')

if __name__ == '__main__': main(sys.argv[1:])
