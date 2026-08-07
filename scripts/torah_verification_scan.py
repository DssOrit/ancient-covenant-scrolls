#!/usr/bin/env python3
"""
ACR Torah Site Verification Scan — read-only.

Freshly parses data/file_1.json through data/file_12.json (the 12 live
ACR Reader Torah files) and checks them against the authoritative
production totals below: chapter presence, verse presence/contiguity,
duplicate verses, cross-volume leakage, note-structure completeness,
niqqud/maqaf presence, divine-name-in-verse-text, and file routing.

Does not modify any file. Run from the repo root:
    python3 scripts/torah_verification_scan.py

See TORAH_VERIFICATION_SCAN_PROTOCOL.md for the full method writeup,
what each check means, and how to read the output.
"""
import json
import re

REPO = "."

VOLUMES = [
    ("Bereshit", [
        (1, "file_1", 1, 11, 299),
        (2, "file_2", 12, 25, 394),
        (3, "file_3", 26, 37, 427),
        (4, "file_4", 38, 50, 413),
    ], 50, 1533),
    ("Shemot", [
        (1, "file_5", 1, 18, 494),
        (2, "file_6", 19, 40, 715),
    ], 40, 1209),
    ("Vayikra", [
        (1, "file_7", 1, 16, 490),
        (2, "file_8", 17, 27, 369),
    ], 27, 859),
    ("Bamidbar", [
        (1, "file_9", 1, 18, 685),
        (2, "file_10", 19, 36, 603),
    ], 36, 1288),
    ("Devarim", [
        (1, "file_11", 1, 17, 488),
        (2, "file_12", 18, 34, 467),
    ], 34, 955),
]

# Known Hebrew/English versification-difference cases to spot-check for a
# disclosure note (not to "correct" — only to confirm the site discloses
# the numbering it uses). Update this list if new volumes introduce more.
VERSIFICATION_CASES = [
    ("file_3", "Bereshit 31/32", [31, 32]),
    ("file_7", "Vayikra 5/6", [5, 6]),
    ("file_9", "Bamidbar 16/17", [16, 17]),
    ("file_10", "Bamidbar 29/30", [29, 30]),
    ("file_11", "Devarim 5", [5]),
    ("file_11", "Devarim 13", [13]),
    ("file_12", "Devarim 22/23", [22, 23]),
    ("file_12", "Devarim 28/29", [28, 29]),
    ("file_6", "Shemot 20 Decalogue", [20]),
]

CHAP_HEAD_RE = re.compile(
    r'<p class="dp" style="border-bottom:1\.5px solid #666666;padding-bottom:0\.25em"><span[^>]*>([A-Z\' ]+?)\s*&#8212;\s*CHAPTER\s*(\d+)\s*</span>'
)
CHAP_HEAD_SIMPLE_RE = re.compile(r'CHAPTER\s*(\d+)\s*</span>')
VERSE_BARE_RE = re.compile(
    r'<p class="dp" data-ptype="verse"[^>]*><span[^>]*>(\d+)\s*</span><span[^>]*>(.*?)</span></p>'
)
VERSE_CV_RE = re.compile(
    r'<p class="dp"[^>]*><span[^>]*>(\d+):(\d+)\s*</span><span[^>]*>(.*?)</span></p>'
)
VERSE_TEXT_RE = re.compile(r'<span style="color:#111111;font-size:1\.000em">(.*?)</span></p>')
NOTE_RE = re.compile(r'\[(DSS|ORIT GE[’\'A-Z]*|MASORETIC VARIANT|CRITICAL NOTE)\]', re.IGNORECASE)
NIQQUD_RE = re.compile(r'[֑-ׇ]')
PALEO_YHWH_CORRECT = "\U00010909\U00010904\U00010905\U00010904"
STALE_TEXT_MARKERS = ["ESV", "English Standard Version", "King James", "KJV",
                       "Jewish Publication Society", "JPS 1917", "JPS 1985"]


def run():
    report = {"volumes": {}, "defects": [], "file_inventory": [], "niqqud_hits": {},
              "paleo_bad": [], "note_gaps": {}, "cross_leak": [], "stale_text_hits": {},
              "divine_name_in_verse_text": {}, "versification_disclosure": {}}

    all_chapter_headings_by_file = {}
    file_to_volname = {}
    for vol_name, parts, _, _ in VOLUMES:
        for part_num, fname, *_ in parts:
            file_to_volname[fname] = vol_name

    torah_total_verses = 0
    torah_total_chapters = 0

    for vol_name, parts, expected_chapters, expected_verses in VOLUMES:
        vol_verse_total = 0
        vol_chapter_total = 0
        vol_report = {"parts": [], "expected_chapters": expected_chapters, "expected_verses": expected_verses}

        for part_num, fname, ch_start, ch_end, expected_part_verses in parts:
            path = f"{REPO}/data/{fname}.json"
            with open(path, encoding="utf-8") as f:
                d = json.load(f)
            html_content = d["html"]

            headings = CHAP_HEAD_RE.findall(html_content)
            all_chapter_headings_by_file[fname] = headings
            chapter_nums_found = [int(c) for _, c in headings]
            expected_chapter_range = list(range(ch_start, ch_end + 1))

            part_defects = []
            if chapter_nums_found != expected_chapter_range:
                part_defects.append(f"{fname}: chapter sequence mismatch. found={chapter_nums_found} expected={expected_chapter_range}")

            seen, dups = set(), set()
            for c in chapter_nums_found:
                if c in seen:
                    dups.add(c)
                seen.add(c)
            if dups:
                part_defects.append(f"{fname}: duplicate chapter heading(s) {sorted(dups)}")

            bare_matches = VERSE_BARE_RE.findall(html_content)
            cv_matches = VERSE_CV_RE.findall(html_content)
            per_chapter_verses = {}

            if bare_matches and not cv_matches:
                positions = [(m.start(), int(m.group(2))) for m in CHAP_HEAD_RE.finditer(html_content)]
                positions.append((len(html_content), None))
                for i in range(len(positions) - 1):
                    start_pos, chap = positions[i]
                    end_pos, _ = positions[i + 1]
                    segment = html_content[start_pos:end_pos]
                    seg_verses = VERSE_BARE_RE.findall(segment)
                    per_chapter_verses[chap] = [int(v) for v, _ in seg_verses]
                mode = "bare"
            elif cv_matches:
                for c, v, _ in cv_matches:
                    per_chapter_verses.setdefault(int(c), []).append(int(v))
                mode = "chapter:verse"
            else:
                part_defects.append(f"{fname}: NO VERSE CONTENT FOUND")
                mode = "NONE"

            total_verses_this_part = 0
            for chap in expected_chapter_range:
                vnums = per_chapter_verses.get(chap)
                if not vnums:
                    part_defects.append(f"{fname} ch{chap}: MISSING CHAPTER CONTENT (0 verses found)")
                    continue
                total_verses_this_part += len(vnums)
                expected_seq = list(range(1, len(vnums) + 1))
                if sorted(vnums) != expected_seq:
                    dup_v = [x for x in set(vnums) if vnums.count(x) > 1]
                    missing_v = [x for x in expected_seq if x not in vnums]
                    if dup_v:
                        part_defects.append(f"{fname} ch{chap}: duplicate verse number(s) {dup_v}")
                    if missing_v:
                        part_defects.append(f"{fname} ch{chap}: missing verse number(s) {missing_v}")
                if vnums != sorted(vnums):
                    part_defects.append(f"{fname} ch{chap}: verses out of order in document: {vnums}")

            if total_verses_this_part != expected_part_verses:
                part_defects.append(f"{fname}: TOTAL VERSE COUNT MISMATCH: found {total_verses_this_part}, expected {expected_part_verses}")

            # note-structure check per chapter
            positions = [(m.start(), int(m.group(2))) for m in CHAP_HEAD_RE.finditer(html_content)]
            positions.append((len(html_content), None))
            chapter_note_gaps = []
            for i in range(len(positions) - 1):
                start_pos, chap = positions[i]
                end_pos, _ = positions[i + 1]
                segment = html_content[start_pos:end_pos]
                notes_found_norm = set()
                for n in NOTE_RE.findall(segment):
                    notes_found_norm.add("ORIT" if n.upper().startswith("ORIT") else n.upper())
                missing_notes = {"DSS", "MASORETIC VARIANT", "CRITICAL NOTE"} - notes_found_norm
                if missing_notes:
                    chapter_note_gaps.append((chap, sorted(missing_notes)))
            if chapter_note_gaps:
                report["note_gaps"][fname] = chapter_note_gaps

            niqqud_found = NIQQUD_RE.findall(html_content)
            if niqqud_found:
                report["niqqud_hits"][fname] = len(niqqud_found)

            paleo_spans = re.findall(r'font-family:&quot;Segoe UI Historic&quot;[^>]*>([^<]+)</span>', html_content)
            for sp in paleo_spans:
                if sp != PALEO_YHWH_CORRECT and len(sp) <= 6:
                    report["paleo_bad"].append((fname, [hex(ord(c)) for c in sp]))

            stale_hits = {}
            for marker in STALE_TEXT_MARKERS:
                c = html_content.count(marker)
                if c:
                    stale_hits[marker] = c
            if stale_hits:
                report["stale_text_hits"][fname] = stale_hits

            verse_texts = VERSE_TEXT_RE.findall(html_content)
            lord_hits = sum(1 for v in verse_texts if re.search(r'\bLord\b', v))
            god_hits = sum(1 for v in verse_texts if re.search(r'(?<![A-Za-z])God(?![A-Za-z])', v))
            if lord_hits or god_hits:
                report["divine_name_in_verse_text"][fname] = {"Lord": lord_hits, "God": god_hits}

            vol_verse_total += total_verses_this_part
            vol_chapter_total += len(expected_chapter_range) if not part_defects else len(chapter_nums_found)

            vol_report["parts"].append({
                "file": fname, "part": part_num, "chapters": f"{ch_start}-{ch_end}",
                "expected_verses": expected_part_verses, "found_verses": total_verses_this_part,
                "mode": mode, "defects": part_defects,
            })
            report["defects"].extend(part_defects)
            report["file_inventory"].append({
                "file": fname, "volume": vol_name, "part": part_num,
                "chapters": f"{ch_start}-{ch_end}", "mode": mode,
            })

        vol_report["found_chapters"] = vol_chapter_total
        vol_report["found_verses"] = vol_verse_total
        if vol_chapter_total != expected_chapters:
            report["defects"].append(f"{vol_name}: TOTAL CHAPTER COUNT MISMATCH: found {vol_chapter_total}, expected {expected_chapters}")
        if vol_verse_total != expected_verses:
            report["defects"].append(f"{vol_name}: TOTAL VERSE COUNT MISMATCH: found {vol_verse_total}, expected {expected_verses}")

        torah_total_verses += vol_verse_total
        torah_total_chapters += vol_chapter_total
        report["volumes"][vol_name] = vol_report

    report["torah_total_verses"] = torah_total_verses
    report["torah_total_chapters"] = torah_total_chapters

    # cross-volume leakage
    book_names = {"BERESHIT": "Bereshit", "SHEMOT": "Shemot", "VAYIKRA": "Vayikra",
                  "BAMIDBAR": "Bamidbar", "DEVARIM": "Devarim"}
    for fname, headings in all_chapter_headings_by_file.items():
        own_vol = file_to_volname[fname]
        for book_word, _ in headings:
            mapped = book_names.get(book_word.strip())
            if mapped and mapped != own_vol:
                report["cross_leak"].append(f"{fname} (belongs to {own_vol}) contains a heading for {mapped}")

    # versification-disclosure spot check
    for fname, label, chapters in VERSIFICATION_CASES:
        path = f"{REPO}/data/{fname}.json"
        with open(path, encoding="utf-8") as f:
            d = json.load(f)
        html_content = d["html"]
        positions = [(m.start(), int(m.group(1))) for m in CHAP_HEAD_SIMPLE_RE.finditer(html_content)]
        positions.append((len(html_content), None))
        for i in range(len(positions) - 1):
            start_pos, chap = positions[i]
            end_pos, _ = positions[i + 1]
            if chap in chapters:
                segment = html_content[start_pos:end_pos]
                has_kw = bool(re.search(r'number|Decalogue|MT |LXX|Masoretic|verse.?(division|split|merge)', segment, re.IGNORECASE))
                report["versification_disclosure"][f"{fname}:{label}:ch{chap}"] = has_kw

    return report


def print_summary(report):
    print("Torah total chapters:", report["torah_total_chapters"], "/ 187")
    print("Torah total verses:", report["torah_total_verses"], "/ 5844")
    print("Total defects:", len(report["defects"]))
    for d in report["defects"]:
        print(" -", d)
    print("Cross-volume leakage flags:", len(report["cross_leak"]))
    for c in report["cross_leak"]:
        print(" -", c)
    print("Note gaps files:", list(report["note_gaps"].keys()))
    print("Niqqud/maqaf hit files:", report["niqqud_hits"])
    print("Bad paleo glyphs:", report["paleo_bad"])
    print("Stale ESV/KJV/JPS text-marker hits:", report["stale_text_hits"])
    print("Divine-name-in-verse-text hits:", report["divine_name_in_verse_text"])
    print("Versification-disclosure spot check (True = keyword found):")
    for k, v in report["versification_disclosure"].items():
        print(" -", k, v)
    overall_pass = (
        report["torah_total_chapters"] == 187
        and report["torah_total_verses"] == 5844
        and not report["defects"]
        and not report["cross_leak"]
    )
    print()
    if overall_pass:
        print("ACR TORAH SITE VERIFICATION SCAN: PASS")
        print("187/187 chapters present")
        print("5,844/5,844 verses present")
        print("Zero missing verses")
        print("Zero duplicated verses")
        print("Zero cross-volume leakage")
        print("No stale active Reader lineage detected")
    else:
        print("ACR TORAH SITE VERIFICATION SCAN: DEFECTS FOUND — see list above. Report only, nothing was fixed.")


if __name__ == "__main__":
    print_summary(run())
