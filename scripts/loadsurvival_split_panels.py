#!/usr/bin/env python3
"""Split 5-panel (2 on top, 3 below) or 4-panel (2x2) pictures for Load Survival.
Usage: python3 -I scripts/loadsurvival_split_panels.py <guide-id>=<picture.png> ...
Writes loadsurvival/assets/steps/<guide-id>-<n>.jpg and updates loadsurvival/step-images.js.
Then add the new files to the list in loadsurvival/service-worker.js and bump the cache."""
import sys, os, re, json
from PIL import Image
import numpy as np
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'loadsurvival')

def gaps(v, lo, hi, thr=238, minw=1):
    idx = [i for i in range(int(lo), int(hi)) if v[i] > thr]
    out = []
    for x in idx:
        if out and x == out[-1][1] + 1: out[-1][1] = x
        else: out.append([x, x])
    return [g for g in out if g[1] - g[0] + 1 >= minw]

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

def row_cuts(v, w):
    """Column spans for one row, using light gaps found in that row only."""
    g = gaps(v, w * .12, w * .88, 235)
    g = [x for x in g if x[1] - x[0] >= 3]
    edges = [0]
    for a, b in g: edges += [a - 1, b + 2]
    edges.append(w)
    return [(edges[i], edges[i + 1]) for i in range(0, len(edges), 2)]

def split(path, layout=None):
    """layout: None (auto, two rows) or a list of (x0, y0, x1, y1) boxes in reading order."""
    im = Image.open(path).convert('RGB')
    if layout: return [im.crop(b) for b in layout]
    a = np.asarray(im.convert('L')).astype(float); h, w = a.shape
    hb = pick(gaps(a.mean(axis=1), h * .3, h * .7, 235), h / 2) or (h // 2 - 4, h // 2 + 4)
    rows = [(0, hb[0] - 1), (hb[1] + 2, h)]
    panels = []
    for y0, y1 in rows:
        for x0, x1 in row_cuts(a[y0:y1].mean(axis=0), w):
            panels.append(im.crop((x0, y0, x1, y1)))
    return panels

# Special layouts (x0, y0, x1, y1) for pictures that are not two plain rows
LAYOUTS = {
    # heat illness: two panels side by side in one row (1672x941)
    'g-heat-illness': [(0, 0, 827, 941), (844, 0, 1672, 941)],
    # seizure: two, two, then one wide panel (phone) cropped to 16:9
    'med-seizure': [(0, 0, 580, 383), (590, 0, 1672, 383), (0, 391, 820, 679), (830, 391, 1672, 679), (440, 688, 888, 941)],
    # three on top, two below
    'lim-sanitation': [(0, 0, 550, 464), (560, 0, 1113, 464), (1123, 0, 1672, 464), (0, 473, 718, 941), (727, 473, 1672, 941)],
    'lim-heat-cold': [(0, 0, 626, 449), (635, 0, 1148, 449), (1157, 0, 1672, 449), (0, 457, 816, 941), (828, 457, 1672, 941)],
    # three on top, two below (optional limited-resources guides)
    'lim-city-event': [(0, 0, 566, 506), (576, 0, 1134, 506), (1144, 0, 1672, 506), (0, 516, 870, 941), (880, 516, 1672, 941)],
    'lim-food-none': [(0, 0, 744, 461), (755, 0, 1151, 461), (1161, 0, 1672, 461), (0, 468, 830, 941), (841, 468, 1672, 941)],
    'lim-comms': [(0, 0, 545, 498), (555, 0, 1160, 498), (1170, 0, 1672, 498), (0, 507, 826, 941), (836, 507, 1672, 941)],
    'lim-stay-safe': [(0, 0, 561, 477), (572, 0, 1105, 477), (1116, 0, 1672, 477), (0, 485, 900, 941), (911, 485, 1672, 941)],
    'hs-hand-pump': [(0, 0, 449, 941), (467, 0, 848, 941), (865, 0, 1254, 447), (1271, 0, 1672, 447), (865, 464, 1672, 941)],
    'wf-fire-wet': [(14, 192, 345, 915), (354, 192, 672, 915), (682, 192, 994, 915), (1004, 192, 1318, 915), (1328, 192, 1658, 915)],
    'wf-fire-nomatches': [(14, 192, 345, 915), (354, 192, 672, 915), (682, 192, 994, 915), (1004, 192, 1318, 915), (1328, 192, 1658, 915)],
    'wf-shelter-build': [(15, 150, 413, 512), (428, 150, 828, 512), (842, 150, 1242, 512), (1256, 150, 1655, 512), (15, 526, 413, 902), (428, 526, 828, 902), (842, 526, 1242, 902), (1256, 526, 1655, 902)],
    'wf-shelter-secure': [(15, 150, 413, 512), (428, 150, 828, 512), (842, 150, 1242, 512), (1256, 150, 1655, 512), (15, 526, 413, 902), (428, 526, 828, 902), (842, 526, 1242, 902), (1256, 526, 1655, 902)],
    'wf-clean-fish': [(15, 188, 387, 750), (402, 188, 798, 750), (815, 188, 1182, 750), (1197, 188, 1577, 750), (1592, 188, 1987, 750)],
    'wf-fishing-gear': [(15, 188, 387, 750), (402, 188, 798, 750), (815, 188, 1182, 750), (1197, 188, 1577, 750), (1592, 188, 1987, 750)],
    'wf-field-kitchen': [(15, 150, 413, 512), (428, 150, 828, 512), (842, 150, 1242, 512), (1256, 150, 1655, 512), (15, 526, 413, 902), (428, 526, 828, 902), (842, 526, 1242, 902), (1256, 526, 1655, 902)],
    'wf-smoke-dry-salt': [(15, 172, 400, 748), (415, 172, 800, 748), (815, 172, 1187, 748), (1200, 172, 1585, 748), (1600, 172, 1987, 748)],
}

def main(args):
    mapping_path = os.path.join(ROOT, 'step-images.js')
    txt = open(mapping_path, encoding='utf8').read()
    m = json.loads(re.search(r'=\s*(\{.*\});', txt, re.S).group(1))
    os.makedirs(os.path.join(ROOT, 'assets', 'steps'), exist_ok=True)
    for arg in args:
        gid, pic = arg.split('=', 1)
        paths = []
        boxes = LAYOUTS.get(gid)
        for i, p in enumerate(split(pic, boxes), 1):
            if p.width > 640: p = p.resize((640, round(640 * p.height / p.width)), Image.LANCZOS)
            rel = 'assets/steps/%s-%d.jpg' % (gid, i)
            p.save(os.path.join(ROOT, rel), quality=68, optimize=True, progressive=True); paths.append(rel)
        m[gid] = paths; print(gid, len(paths), 'panels')
    open(mapping_path, 'w', encoding='utf8').write('window.LOAD_STEP_IMAGES=' + json.dumps(m, indent=1) + ';\n')

if __name__ == '__main__': main(sys.argv[1:])
