#!/usr/bin/env python3
"""Build acr_concordance.json from the ACR corpus data files."""

import json
import re
import os
import html as html_module
from collections import defaultdict

DATA_DIR = "/home/user/ancient-covenant-scrolls/data"
SEARCH_DIR = "/home/user/ancient-covenant-scrolls/Search"
OUTPUT_PATH = os.path.join(SEARCH_DIR, "acr_concordance.json")
SEARCH_DATA_PATH = os.path.join(SEARCH_DIR, "acr-search-handoff", "acr_search_data.json")
NAV_PATH = os.path.join(DATA_DIR, "nav.json")

# ──────────────────────────────────────────────────────────────────────────────
# Volume metadata definitions
# ──────────────────────────────────────────────────────────────────────────────

VOL_META = {
    1: dict(
        themes=["creation", "solar-calendar", "YHWH-acts-directly", "light", "covenant"],
        threads=["Cosmological", "Temporal"],
        roots=["bara", "or", "ruach", "shabbat", "brit"],
        manuscript="DSS Genesis — 4QGen — Cave 4",
        cave="Cave 4",
        date_range="250-200 BCE",
        witness_count=4,
    ),
    2: dict(
        themes=["covenant", "YHWH-acts-directly", "monotheism", "exodus", "appointed-times"],
        threads=["Historical", "Temporal", "Moral"],
        roots=["brit", "moed", "ruach"],
        manuscript="DSS Exodus — 4QExod — Cave 4",
        cave="Cave 4",
        date_range="250-150 BCE",
        witness_count=3,
    ),
    3: dict(
        themes=["covenant", "appointed-times", "shabbat", "YHWH-acts-directly"],
        threads=["Temporal", "Moral"],
        roots=["brit", "moed", "shabbat", "tzedek"],
        manuscript="DSS Leviticus — 11QpaleoLev — Cave 11",
        cave="Cave 11",
        date_range="200-150 BCE",
        witness_count=3,
    ),
    4: dict(
        themes=["covenant", "appointed-times", "YHWH-acts-directly", "wilderness"],
        threads=["Historical", "Temporal"],
        roots=["brit", "moed"],
        manuscript="DSS Numbers — 4QNum — Cave 4",
        cave="Cave 4",
        date_range="30 BCE-20 CE",
        witness_count=3,
    ),
    5: dict(
        themes=["covenant", "monotheism", "false-prophet-test", "YHWH-acts-directly"],
        threads=["Historical", "Moral"],
        roots=["brit", "emet", "mishpat"],
        manuscript="DSS Deuteronomy — 4QDeut — Cave 4",
        cave="Cave 4",
        date_range="100-50 BCE",
        witness_count=8,
    ),
    6: dict(
        themes=["raz", "solar-calendar", "appointed-times", "eschatology", "disclosure", "wisdom"],
        threads=["Cosmological", "Temporal", "Eschatological"],
        roots=["moed", "ruach", "raz", "daat", "shemesh"],
        manuscript="DSS Enoch — 4QEn — Cave 4",
        cave="Cave 4",
        date_range="200-150 BCE",
        witness_count=5,
    ),
    7: dict(
        themes=["shabbat", "solar-calendar", "covenant", "appointed-times", "creation"],
        threads=["Temporal", "Moral"],
        roots=["moed", "brit", "shabbat"],
        manuscript="DSS Jubilees — 4QJub — Cave 4",
        cave="Cave 4",
        date_range="150-100 BCE",
        witness_count=15,
    ),
    8: dict(
        themes=["eschatology", "judgment", "darkness", "light", "Watchers"],
        threads=["Historical", "Eschatological"],
        roots=["or", "choshekh", "mishpat"],
        manuscript="DSS Book of Giants — 4QGiants — Cave 4",
        cave="Cave 4",
        date_range="200-150 BCE",
        witness_count=4,
    ),
    9: dict(
        themes=["two-spirits", "light", "darkness", "YHWH-acts-directly", "eschatology"],
        threads=["Moral", "Cosmological"],
        roots=["ruach", "or", "choshekh"],
        manuscript="DSS Visions of Amram — 4QAmram — Cave 4",
        cave="Cave 4",
        date_range="200-150 BCE",
        witness_count=5,
    ),
    16: dict(
        themes=["messiah", "monotheism", "YHWH-acts-directly", "almah", "suppressed", "eschatology", "manipulation"],
        threads=["Historical", "Eschatological", "Moral"],
        roots=["almah", "betulah", "ruach", "tzedek", "or"],
        manuscript="1QIsa-a — Cave 1",
        cave="Cave 1",
        date_range="125-100 BCE",
        witness_count=1,
    ),
    17: dict(
        themes=["covenant", "YHWH-acts-directly", "judgment", "monotheism", "new-covenant"],
        threads=["Historical", "Moral", "Eschatological"],
        roots=["brit", "mishpat", "emet"],
        manuscript="DSS Jeremiah — 4QJer — Cave 4",
        cave="Cave 4",
        date_range="225-175 BCE",
        witness_count=6,
    ),
    18: dict(
        themes=["YHWH-acts-directly", "eschatology", "judgment", "restoration", "solar-calendar"],
        threads=["Historical", "Eschatological", "Cosmological"],
        roots=["ruach", "mishpat", "or"],
        manuscript="DSS Ezekiel — 4QEzek — Cave 4",
        cave="Cave 4",
        date_range="100-75 BCE",
        witness_count=3,
    ),
    19: dict(
        themes=["YHWH-acts-directly", "judgment", "monotheism", "eschatology", "covenant"],
        threads=["Historical", "Eschatological", "Moral"],
        roots=["brit", "mishpat", "emet"],
        manuscript="DSS Minor Prophets — 4QXII — Cave 4",
        cave="Cave 4",
        date_range="150-50 BCE",
        witness_count=8,
    ),
    20: dict(
        themes=["YHWH-acts-directly", "monotheism", "righteousness", "light", "judgment", "suppressed"],
        threads=["Moral", "Cosmological", "Eschatological"],
        roots=["tzedek", "or", "mishpat", "chesed"],
        manuscript="11QPs — Cave 11",
        cave="Cave 11",
        date_range="30-50 CE",
        witness_count=36,
    ),
    28: dict(
        themes=["eschatology", "judgment", "YHWH-acts-directly", "appointed-times", "messiah"],
        threads=["Historical", "Eschatological", "Temporal"],
        roots=["moed", "mishpat", "daat", "raz"],
        manuscript="DSS Daniel — 4QDan — Cave 4",
        cave="Cave 4",
        date_range="125-50 BCE",
        witness_count=8,
    ),
    32: dict(
        themes=["messiah", "eschatology", "YHWH-acts-directly", "suppressed", "manipulation"],
        threads=["Eschatological", "Historical"],
        roots=["mashiach", "mishpat"],
        manuscript="4Q246 — Cave 4",
        cave="Cave 4",
        date_range="25 BCE-50 CE",
        witness_count=1,
        manipulation_flag=True,
        nt_appropriated_by=["Luke 1:32-35"],
    ),
    33: dict(
        themes=["eschatology", "judgment", "YHWH-acts-directly", "light", "darkness", "messiah"],
        threads=["Historical", "Eschatological", "Moral"],
        roots=["or", "choshekh", "mishpat"],
        manuscript="War Scroll — 1QM — Cave 1",
        cave="Cave 1",
        date_range="100-50 BCE",
        witness_count=1,
    ),
    34: dict(
        themes=["covenant", "appointed-times", "Torah", "YHWH-acts-directly"],
        threads=["Moral", "Temporal"],
        roots=["brit", "tzedek", "moed"],
        manuscript="4QMMT — Cave 4",
        cave="Cave 4",
        date_range="150-75 BCE",
        witness_count=6,
    ),
    35: dict(
        themes=["covenant", "two-spirits", "teacher-of-righteousness", "appointed-times", "eschatology"],
        threads=["Historical", "Moral", "Eschatological"],
        roots=["brit", "ruach", "tzedek", "moed"],
        manuscript="Damascus Document — CD — Cairo Geniza",
        cave="Cairo Geniza",
        date_range="100-50 BCE",
        witness_count=2,
    ),
    36: dict(
        themes=["two-spirits", "covenant", "raz", "light", "darkness", "righteousness", "appointed-times"],
        threads=["Moral", "Cosmological", "Temporal"],
        roots=["ruach", "or", "choshekh", "brit", "tzedek"],
        manuscript="Community Rule — 1QS — Cave 1",
        cave="Cave 1",
        date_range="100-75 BCE",
        witness_count=1,
    ),
    37: dict(
        themes=["covenant", "appointed-times", "messiah", "eschatology"],
        threads=["Historical", "Eschatological"],
        roots=["brit", "moed", "mashiach"],
        manuscript="Rule of Congregation — 1QSa — Cave 1",
        cave="Cave 1",
        date_range="100-75 BCE",
        witness_count=1,
    ),
    38: dict(
        themes=["covenant", "blessing", "YHWH-acts-directly", "righteousness"],
        threads=["Moral", "Historical"],
        roots=["brit", "tzedek", "chesed"],
        manuscript="Rule of Blessings — 1QSb — Cave 1",
        cave="Cave 1",
        date_range="100-75 BCE",
        witness_count=1,
    ),
    39: dict(
        themes=["solar-calendar", "shabbat", "appointed-times", "prayer", "creation"],
        threads=["Temporal", "Cosmological"],
        roots=["moed", "shabbat", "shemesh", "or"],
        manuscript="Words of Luminaries — 4QDibHam — Cave 4",
        cave="Cave 4",
        date_range="150-100 BCE",
        witness_count=4,
    ),
    40: dict(
        themes=["judgment", "teacher-of-righteousness", "historical-record", "eschatology"],
        threads=["Historical", "Eschatological"],
        roots=["mishpat", "tzedek"],
        manuscript="Pesher Nahum — 4QpNah — Cave 4",
        cave="Cave 4",
        date_range="63-40 BCE",
        witness_count=1,
    ),
    41: dict(
        themes=["YHWH-acts-directly", "wisdom", "raz", "covenant", "two-spirits", "light", "darkness", "righteousness"],
        threads=["Moral", "Cosmological", "Eschatological"],
        roots=["raz", "ruach", "or", "choshekh", "daat", "tzedek"],
        manuscript="Hodayot — 1QH — Cave 1",
        cave="Cave 1",
        date_range="100-50 BCE",
        witness_count=1,
    ),
    42: dict(
        themes=["teacher-of-righteousness", "judgment", "eschatology", "truth", "covenant"],
        threads=["Historical", "Eschatological", "Moral"],
        roots=["emet", "tzedek", "mishpat"],
        manuscript="Pesher Habakkuk — 1QpHab — Cave 1",
        cave="Cave 1",
        date_range="100-50 BCE",
        witness_count=1,
    ),
    43: dict(
        themes=["solar-calendar", "shabbat", "appointed-times", "creation", "Cosmological"],
        threads=["Temporal", "Cosmological"],
        roots=["shabbat", "moed", "shemesh", "or"],
        manuscript="Songs of Sabbath Sacrifice — 4QShirShabb — Cave 4",
        cave="Cave 4",
        date_range="100-50 BCE",
        witness_count=10,
    ),
    44: dict(
        themes=["creation", "covenant", "YHWH-acts-directly", "light", "calendar"],
        threads=["Cosmological", "Temporal", "Historical"],
        roots=["bara", "or", "brit", "moed"],
        manuscript="Genesis Apocryphon — 1QapGen — Cave 1",
        cave="Cave 1",
        date_range="100-50 BCE",
        witness_count=1,
    ),
    45: dict(
        themes=["messiah", "eschatology", "judgment", "suppressed", "YHWH-acts-directly", "appointed-times"],
        threads=["Eschatological", "Historical"],
        roots=["mashiach", "mishpat", "moed"],
        manuscript="11QMelchizedek — 11QMelch — Cave 11",
        cave="Cave 11",
        date_range="100-75 BCE",
        witness_count=1,
        manipulation_flag=True,
        nt_appropriated_by=["Hebrews 7"],
    ),
    46: dict(
        themes=["Torah", "appointed-times", "shabbat", "solar-calendar", "covenant", "YHWH-acts-directly"],
        threads=["Temporal", "Moral", "Historical"],
        roots=["moed", "shabbat", "brit", "tzedek"],
        manuscript="Temple Scroll — 11Q19 — Cave 11",
        cave="Cave 11",
        date_range="150-75 BCE",
        witness_count=2,
    ),
    47: dict(
        themes=["raz", "disclosure", "suppressed", "wisdom", "eschatology", "judgment", "two-spirits"],
        threads=["Cosmological", "Moral", "Eschatological"],
        roots=["raz", "daat", "mishpat"],
        manuscript="Book of Mysteries — 4Q299-301, 1Q27 — Caves 1 and 4",
        cave="Caves 1 and 4",
        date_range="150-50 BCE",
        witness_count=4,
    ),
    48: dict(
        themes=["raz", "disclosure", "wisdom", "eschatology", "judgment", "two-spirits", "covenant",
                "appointed-times", "YHWH-acts-directly", "light", "darkness", "righteousness"],
        threads=["Cosmological", "Temporal", "Moral", "Historical", "Eschatological"],
        roots=["raz", "ruach", "daat", "brit", "tzedek", "or", "choshekh", "mishpat", "moed"],
        manuscript="4QInstruction — 4Q415-418 — Cave 4",
        cave="Cave 4",
        date_range="200-150 BCE",
        witness_count=7,
    ),
}

# Volumes 10-15 share the same base metadata
for v in range(10, 16):
    VOL_META[v] = dict(
        themes=["covenant", "YHWH-acts-directly", "historical-record", "monotheism"],
        threads=["Historical", "Moral"],
        roots=["brit", "emet", "mishpat"],
        manuscript="DSS Historical — Cave 4",
        cave="Cave 4",
        date_range="100-50 BCE",
        witness_count=2,
    )

# Volumes 21-27 share base metadata
for v in range(21, 28):
    VOL_META[v] = dict(
        themes=["wisdom", "YHWH-acts-directly", "righteousness", "covenant"],
        threads=["Moral", "Cosmological"],
        roots=["daat", "tzedek", "chesed", "emet"],
        manuscript="DSS Writings — Cave 4",
        cave="Cave 4",
        date_range="150-50 BCE",
        witness_count=2,
    )

# Volumes 29-31 share base metadata
for v in range(29, 32):
    VOL_META[v] = dict(
        themes=["covenant", "YHWH-acts-directly", "historical-record"],
        threads=["Historical", "Moral"],
        roots=["brit", "emet"],
        manuscript="DSS Chronicles — Cave 4",
        cave="Cave 4",
        date_range="50 BCE-50 CE",
        witness_count=1,
    )


def strip_html(raw):
    """Remove all HTML tags and decode entities."""
    text = re.sub(r'<[^>]+>', '', raw)
    text = text.replace('&amp;', '&')
    text = text.replace('&apos;', "'")
    text = text.replace('&quot;', '"')
    text = text.replace('&nbsp;', ' ')
    # Also handle numeric/hex entities
    text = html_module.unescape(text)
    text = text.strip()
    return text


def extract_verse_number(text):
    """Extract leading verse number from text. Returns (verse_num_str, remaining_text)."""
    m = re.match(r'^(\d+)\s+(.*)', text, re.DOTALL)
    if m:
        return m.group(1), m.group(2).strip()
    return None, text.strip()


def parse_label(label):
    """Parse a nav label to extract vol number, part number, and book name."""
    # Vol N — BookName (NativeName) — Part P — ...
    vol_match = re.match(r'Vol\s+(\d+)', label)
    vol = int(vol_match.group(1)) if vol_match else 0

    # Part number
    part_match = re.search(r'Part\s+(\d+)', label)
    part = int(part_match.group(1)) if part_match else 1

    # Book name: take the primary book name from between first "—" and second "—"
    # e.g. "Vol 1 — Bereshit (Genesis) — Part 1 — ..."
    parts = [p.strip() for p in label.split('—')]
    # parts[0] = "Vol 1", parts[1] = "Bereshit (Genesis)", ...
    book_raw = parts[1] if len(parts) > 1 else ""
    # Use just the non-parenthetical name
    book_clean = re.sub(r'\s*\(.*?\)', '', book_raw).strip()

    return vol, part, book_clean


def keyword_tag(text, themes, roots, threads):
    """Apply keyword-based tagging rules, mutating themes/roots/threads in place."""
    tl = text.lower()

    if 'raz' in tl or 'mystery' in tl or 'hidden' in tl:
        if 'raz' not in themes:
            themes.append('raz')
        if 'raz' not in roots:
            roots.append('raz')

    if 'spirit' in tl:
        if 'ruach' not in roots:
            roots.append('ruach')

    if 'light' in tl:
        if 'light' not in themes:
            themes.append('light')
        if 'or' not in roots:
            roots.append('or')

    if 'darkness' in tl or 'dark' in tl:
        if 'darkness' not in themes:
            themes.append('darkness')
        if 'choshekh' not in roots:
            roots.append('choshekh')

    if 'covenant' in tl:
        if 'covenant' not in themes:
            themes.append('covenant')
        if 'brit' not in roots:
            roots.append('brit')

    if any(w in tl for w in ['appointed', 'festival', 'sabbath', 'shabbat']):
        if 'appointed-times' not in themes:
            themes.append('appointed-times')
        if 'moed' not in roots:
            roots.append('moed')

    if 'righteous' in tl or 'righteousness' in tl:
        if 'righteousness' not in themes:
            themes.append('righteousness')
        if 'tzedek' not in roots:
            roots.append('tzedek')

    if 'judgment' in tl or 'judge' in tl:
        if 'judgment' not in themes:
            themes.append('judgment')
        if 'mishpat' not in roots:
            roots.append('mishpat')

    if 'wisdom' in tl or 'understand' in tl or 'knowledge' in tl:
        if 'wisdom' not in themes:
            themes.append('wisdom')
        if 'daat' not in roots:
            roots.append('daat')

    if any(w in tl for w in ['creation', 'created', 'heaven', 'earth']):
        if 'Cosmological' not in threads:
            threads.append('Cosmological')

    if 'yhwh' in tl or 'creator' in tl:
        if 'YHWH-acts-directly' not in themes:
            themes.append('YHWH-acts-directly')
        if 'monotheism' not in themes:
            themes.append('monotheism')

    if 'messiah' in tl or 'anointed' in tl:
        if 'messiah' not in themes:
            themes.append('messiah')
        if 'mashiach' not in roots:
            roots.append('mashiach')

    if 'resurrection' in tl:
        if 'resurrection' not in themes:
            themes.append('resurrection')
        if 'Eschatological' not in threads:
            threads.append('Eschatological')

    if any(w in tl for w in ['solar', 'sun', 'moon', 'season']):
        if 'solar-calendar' not in themes:
            themes.append('solar-calendar')
        if 'shemesh' not in roots:
            roots.append('shemesh')

    if 'two spirits' in tl or 'spirit of truth' in tl or 'spirit of iniquity' in tl:
        if 'two-spirits' not in themes:
            themes.append('two-spirits')

    if 'teacher of righteousness' in tl:
        if 'teacher-of-righteousness' not in themes:
            themes.append('teacher-of-righteousness')

    if any(w in tl for w in ['virgin', 'almah', 'young woman']):
        if 'almah' not in themes:
            themes.append('almah')
        if 'almah' not in roots:
            roots.append('almah')
        return True  # manipulation flag

    if 'suppressed' in tl or 'hidden from' in tl:
        if 'suppressed' not in themes:
            themes.append('suppressed')

    return False


def get_file_path(file_id):
    """Return absolute path for a file ID, handling the space in file_112."""
    if file_id == "file_112":
        return os.path.join(DATA_DIR, "file 112.json")
    return os.path.join(DATA_DIR, f"{file_id}.json")


# ──────────────────────────────────────────────────────────────────────────────
# Build 8 contradictions from the handoff data
# ──────────────────────────────────────────────────────────────────────────────

CONTRADICTIONS = [
    {
        "id": "almah_vs_parthenos",
        "title": "Yeshayahu 7:14",
        "dss_ref": "1QIsa-a Cave 1",
        "dss_text": "Behold, the almah shall conceive and bear a son, and shall call his name Immanu-El.",
        "maso_text": "Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel.",
        "maso_ref": "Masoretic Text — 900 CE",
        "critical_note": (
            "The Hebrew word almah means young woman. The word for virgin is betulah, which Isaiah did not use. "
            "The Septuagint (LXX) translated almah as parthenos (virgin) in the 3rd century BCE. "
            "Matthew 1:23 quotes the LXX mistranslation, not the Hebrew original. "
            "1QIsa-a confirms the DSS primary reading uses almah."
        ),
        "nt_uses": ["Matthew 1:23"],
        "severity": "F",
    },
    {
        "id": "devarim_32_8",
        "title": "Devarim 32:8",
        "dss_ref": "4QDeut — Cave 4",
        "dss_text": "When the Most High gave the nations their inheritance, when He separated the sons of man, He fixed the borders of the peoples according to the number of the sons of El.",
        "maso_text": "When the Most High gave the nations their inheritance, when He separated the sons of man, He fixed the borders of the peoples according to the number of the sons of Israel.",
        "maso_ref": "Masoretic Text — 900 CE",
        "critical_note": (
            "The DSS reading, confirmed by 4QDeut and the Septuagint, has 'sons of El' (divine council members). "
            "The Masoretic text substitutes 'sons of Israel', removing the divine council theology. "
            "This is one of the clearest documented scribal alterations in the DSS corpus."
        ),
        "nt_uses": [],
        "severity": "F",
    },
    {
        "id": "tehillim_22_16",
        "title": "Tehillim 22:16",
        "dss_ref": "11QPs Cave 11",
        "dss_text": "For dogs have surrounded me; a company of evildoers has encircled me; like a lion, my hands and my feet.",
        "maso_text": "For dogs have surrounded me; a company of evildoers has encircled me; they have pierced my hands and my feet.",
        "maso_ref": "Masoretic Text — 900 CE",
        "critical_note": (
            "The Hebrew word ka'ari means like a lion, not they pierced. "
            "The Masoretic vowel pointing changes the reading to kaaru (they dug/pierced). "
            "The DSS reading and earliest manuscripts support like a lion. "
            "Matthew 27:46 extracts the psalm opening; the piercing interpretation is built on a vowel change not found in the primary sources."
        ),
        "nt_uses": ["Matthew 27:46"],
        "severity": "F",
    },
    {
        "id": "tehillim_40_6",
        "title": "Tehillim 40:6",
        "dss_ref": "11QPs Cave 11",
        "dss_text": "Sacrifice and offering you did not desire; ears you have opened for me; burnt offering and sin offering you have not required.",
        "maso_text": "Sacrifice and offering you did not desire; ears you have opened for me; burnt offering and sin offering you have not required.",
        "maso_ref": "Masoretic Text — 900 CE",
        "critical_note": (
            "The Septuagint diverges sharply: 'a body you have prepared for me' (soma de katertiso moi). "
            "Hebrews 10:5 quotes the LXX version to argue for bodily sacrifice theology. "
            "Both the Hebrew DSS reading and Masoretic text say 'ears you have opened', referring to obedience, not a prepared body. "
            "The LXX rendering used by the NT author contradicts the primary source."
        ),
        "nt_uses": ["Hebrews 10:5"],
        "severity": "A",
    },
    {
        "id": "yeshayahu_53",
        "title": "Yeshayahu 52:13-53:12",
        "dss_ref": "1QIsa-a Cave 1",
        "dss_text": "The servant in Yeshayahu 40-55 is Yisra'el collectively: 'You are My servant O Yisra'el in whom I will be glorified' (49:3). Chapter 53 is part of this continuous literary unit about the collective national servant.",
        "maso_text": "Applied throughout NT as prophecy of an individual suffering saviour figure.",
        "maso_ref": "NT application — various passages",
        "critical_note": (
            "The collective national servant of the surrounding 15 chapters was individualized into a single person. "
            "The literary context was severed. Yeshayahu 41:8, 44:1, and 49:3 explicitly identify the servant as Yisra'el. "
            "1QIsa-a contains no individual messianic figure in chapter 53. "
            "The Qumran community who preserved the DSS did not interpret Isaiah 53 as predicting an individual saviour."
        ),
        "nt_uses": ["Various NT passages"],
        "severity": "A",
    },
    {
        "id": "tehillim_110_1",
        "title": "Tehillim 110:1",
        "dss_ref": "11QPs Cave 11",
        "dss_text": "YHWH said to my adoni: Sit at My right hand until I make your enemies a footstool for your feet.",
        "maso_text": "The LORD said to my Lord: Sit at my right hand until I make your enemies a footstool for your feet.",
        "maso_ref": "Masoretic Text — 900 CE",
        "critical_note": (
            "The Hebrew adoni is the human form of address — used for human lords, masters, and kings. "
            "The divine form is Adonai. The NT applies this to argue for the divinity of the messiah (Matthew 22:44, Acts 2:34). "
            "The DSS text uses adoni — a human king speaking with YHWH — not a divine co-equal being addressed. "
            "This is a documented case where the same consonantal text supports a human or divine reading depending on vowel pointing applied by Masoretes."
        ),
        "nt_uses": ["Matthew 22:44", "Acts 2:34", "Hebrews 1:13"],
        "severity": "F",
    },
    {
        "id": "shemot_3_14",
        "title": "Shemot 3:14",
        "dss_ref": "4QExod — Cave 4",
        "dss_text": "And The Creator said to Moshe: Ehyeh asher ehyeh — I will be what I will be. And He said: Say to the sons of Yisra'el: Ehyeh has sent me to you.",
        "maso_text": "And God said unto Moses: I AM THAT I AM; and he said, Thus shalt thou say unto the children of Israel: I AM hath sent me unto you.",
        "maso_ref": "Masoretic Text / KJV rendering",
        "critical_note": (
            "Ehyeh asher ehyeh is future tense Hebrew: I will be what I will be. "
            "The Greek LXX translated this as ego eimi ho on (I am the being/existing one) — a Greek philosophical statement of eternal existence. "
            "John 8:58 uses ego eimi (I am) to claim divine identity, relying on the LXX philosophical translation, not the Hebrew original. "
            "The DSS primary reading preserves the dynamic future-tense declaration of YHWH's freedom and independence, not a Greek ontological claim."
        ),
        "nt_uses": ["John 8:58"],
        "severity": "A",
    },
    {
        "id": "daniyyel_9_24",
        "title": "Daniyyel 9:24",
        "dss_ref": "4QDan — Cave 4",
        "dss_text": "Seventy weeks are decreed for your people and your holy city to finish transgression, to make an end of sin, to atone for iniquity, to bring in everlasting righteousness, to seal up vision and prophecy, and to anoint a most holy place.",
        "maso_text": "Seventy weeks are determined upon thy people and upon thy holy city, to finish the transgression, and to make an end of sins, and to make reconciliation for iniquity, and to bring in everlasting righteousness, and to seal up the vision and prophecy, and to anoint the most Holy.",
        "maso_ref": "Masoretic Text — 900 CE",
        "critical_note": (
            "The DSS Daniel manuscripts (4QDan-a through 4QDan-e) differ from the Masoretic text in significant places. "
            "The phrase 'anoint the most Holy' in the Masoretic is used by NT interpreters as a messianic reference. "
            "The DSS reading supports 'a most holy place' — referring to a location or the Temple, not a messianic individual. "
            "The seventy-weeks calculation used in NT messianic chronology does not match the DSS textual tradition."
        ),
        "nt_uses": ["Matthew 24:15", "Daniel chronology arguments across NT"],
        "severity": "F",
    },
]


# ──────────────────────────────────────────────────────────────────────────────
# Main build
# ──────────────────────────────────────────────────────────────────────────────

def main():
    print("Loading nav.json...")
    with open(NAV_PATH) as f:
        nav = json.load(f)

    ids = nav["ids"]
    labels = nav["labels"]
    assert len(ids) == len(labels), f"ids/labels mismatch: {len(ids)} vs {len(labels)}"
    print(f"  {len(ids)} file IDs found")

    # Build label map: file_id -> label
    label_map = dict(zip(ids, labels))

    passages = []
    skipped = 0

    for file_id, label in zip(ids, labels):
        vol, part, book = parse_label(label)
        file_path = get_file_path(file_id)

        if not os.path.exists(file_path):
            print(f"  WARNING: missing {file_path}")
            continue

        with open(file_path) as f:
            data = json.load(f)

        raw_html = data.get("html", "")

        # Extract all verse paragraphs
        verse_paras = re.findall(r'<p[^>]*data-ptype="verse"[^>]*>(.*?)</p>', raw_html, re.DOTALL)

        seen_texts = set()
        seq = 0

        for para in verse_paras:
            plain = strip_html(para)
            if not plain:
                continue

            verse_num, text = extract_verse_number(plain)
            if not text:
                continue

            # Deduplicate within same vol+part
            dedup_key = (vol, part, text)
            if dedup_key in seen_texts:
                skipped += 1
                continue
            seen_texts.add(dedup_key)

            seq += 1

            # Build passage ID
            passage_id = f"acr_main_vol{vol}_p{part}_v{seq}"

            # Ref
            ref_vnum = verse_num if verse_num else str(seq)
            ref = f"{book} v{ref_vnum}"

            # Get volume metadata
            meta = VOL_META.get(vol, {})
            themes = list(meta.get("themes", []))
            threads = list(meta.get("threads", []))
            roots = list(meta.get("roots", []))
            manuscript = meta.get("manuscript", "DSS — Cave 4")
            cave = meta.get("cave", "Cave 4")
            date_range = meta.get("date_range", "Unknown")
            witness_count = meta.get("witness_count", 1)
            manipulation_flag = meta.get("manipulation_flag", False)
            nt_appropriated_by = list(meta.get("nt_appropriated_by", [])) if meta.get("nt_appropriated_by") else None

            # Vol 16 special rules
            if vol == 16:
                tl = text.lower()
                if 'almah' in tl or 'young woman' in tl:
                    manipulation_flag = True
                    nt_appropriated_by = ["Matthew 1:23"]
                # Isaiah 53 content detection: we are in part 4 (chapters 42-54)
                # so check if servant suffering language is present
                if part == 4 and any(w in tl for w in ['servant', 'suffering', 'stricken', 'wounded', 'transgression']):
                    manipulation_flag = True
                    if nt_appropriated_by is None:
                        nt_appropriated_by = ["Various NT passages"]
                    elif "Various NT passages" not in nt_appropriated_by:
                        nt_appropriated_by.append("Various NT passages")

            # Vol 20 special rules
            if vol == 20:
                tl = text.lower()
                # Ps 22 content in part 2 (Psalms 21-41)
                if part == 2 and any(w in tl for w in ['forsaken', 'lion', 'pierced', 'encircled']):
                    manipulation_flag = True
                    nt_appropriated_by = ["Matthew 27:46"]
                # Ps 110 adoni — in part 8 (Psalms 120-150) or searching for adoni
                if 'adoni' in tl or ('right hand' in tl and 'enemies' in tl):
                    manipulation_flag = True
                    if nt_appropriated_by is None:
                        nt_appropriated_by = []

            # Apply keyword-based tagging
            kw_manip = keyword_tag(text, themes, roots, threads)
            if kw_manip:
                manipulation_flag = True

            # Collection tagging
            collection = "acr_main"

            # Deduplicate tags
            themes = list(dict.fromkeys(themes))
            threads = list(dict.fromkeys(threads))
            roots = list(dict.fromkeys(roots))

            passage = {
                "id": passage_id,
                "collection": collection,
                "vol": vol,
                "part": part,
                "ref": ref,
                "text": text,
                "manuscript": manuscript,
                "cave": cave,
                "date_range": date_range,
                "language": "Hebrew",
                "witness_count": witness_count,
                "threads": threads,
                "themes": themes,
                "roots": roots,
                "manipulation_flag": manipulation_flag,
                "nt_appropriated_by": nt_appropriated_by,
            }
            passages.append(passage)

    print(f"  Extracted {len(passages)} passages ({skipped} duplicates skipped)")

    # ──────────────────────────────────────────────────────────────────────────
    # Build theme and root indices
    # ──────────────────────────────────────────────────────────────────────────
    print("Building theme and root indices...")
    theme_index = defaultdict(list)
    root_index = defaultdict(list)

    for p in passages:
        pid = p["id"]
        for t in p["themes"]:
            theme_index[t].append(pid)
        for r in p["roots"]:
            root_index[r].append(pid)

    print(f"  {len(theme_index)} distinct themes, {len(root_index)} distinct roots")

    # ──────────────────────────────────────────────────────────────────────────
    # Assemble output
    # ──────────────────────────────────────────────────────────────────────────
    output = {
        "meta": {
            "version": "1.0",
            "total_passages": len(passages),
            "built": "2026-06-04",
        },
        "passages": passages,
        "themes": dict(theme_index),
        "roots": dict(root_index),
        "contradictions": CONTRADICTIONS,
    }

    print(f"Writing {OUTPUT_PATH} ...")
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    size_mb = os.path.getsize(OUTPUT_PATH) / (1024 * 1024)
    print(f"\nDone.")
    print(f"  Total passages: {len(passages)}")
    print(f"  Themes indexed: {len(theme_index)}")
    print(f"  Roots indexed:  {len(root_index)}")
    print(f"  Contradictions: {len(CONTRADICTIONS)}")
    print(f"  File size:      {size_mb:.2f} MB")
    print(f"  Output path:    {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
