# ACR Reader Print References

Companion to `ACR_PRINT_PROJECT.md` (read that one first for status, printer
research, and next steps). This file is specifically the visual design record:
the six-volume cover designs, front/back/spine layouts, individual cover
previews, the luxury boxed-set inspiration, and where the original print-ready
ZIP lives. Saved here so it survives across chat sessions.

## The established ACR cover design — verified against the actual built file

Checked directly on 2026-11-10 by opening `book1_torah_COVER_fullcolor.pdf` at
high resolution and looking at it panel by panel. Full wraparound image, and the
three individual panels cropped from it, are saved in this same folder:

- `print_references/book1_torah_full_wraparound.png` — back + spine + front, one piece, as it goes to the printer.
- `print_references/book1_torah_front_cover.png`
- `print_references/book1_torah_spine.png`
- `print_references/book1_torah_back_cover.png`

| Claim | Status | What's actually there |
|---|---|---|
| Deep midnight navy blue + metallic gold | **Confirmed** | Solid navy background, gold line work and lettering throughout |
| Fine gold double borders | **Confirmed** | A thin double-ruled gold rectangle frames both front and back cover |
| Ornate corners | **Confirmed** | An 8-pointed gold compass-star medallion sits inside a circle at all four corners of both front and back |
| Ancient lettering | **Confirmed** | The paleo-Hebrew YHWH glyph (𐤉𐤄𐤅𐤄) sits at the top of the front cover, above the title |
| Roman numerals | **Confirmed** | Each volume is numbered in Roman numerals (I, II, III...) — shown on both the front cover and the spine |
| Six volumes: Torah, Chanokh, Nevi'im Rishonim, Nevi'im Acharonim, Ketuvim Pt. 1, Ketuvim Pt. 2 | **Confirmed** | Matches the six built volumes exactly |
| **Back cover: centered gold "menorah" emblem** | **Confirmed as the real target — not yet built** | The CURRENTLY BUILT back cover shows the compass-star rosette (same as the corners), not a menorah. On 2026-11-10 you shared a clear reference photo of your intended design (navy/gold 6-volume slipcase set) — it uses a **menorah**, not a compass-star, on the spines and the slipcase's front archway. This resolves the earlier open question: menorah is confirmed as what you want. Swapping the compass-star for a menorah on all 6 spines/back covers is real design work, not yet done — see "Open design work" below. |
| Ancient lettering (the paleo-Hebrew YHWH glyph) | **Confirmed correct, AND a real bug was found and fixed** | The glyph itself (Yod-He-Waw-He) is the right letters in the right direction, matching the live site exactly. But the actual print cover files had a real typo — the 4th character was encoded as the wrong letter (SADE instead of YOD) in all 6 covers. Found by directly comparing the print proof against the live site letter-by-letter, then confirmed by installing the real font and checking the raw codepoints. **Fixed 2026-11-10** — see "Known issues found and fixed" in `ACR_PRINT_PROJECT.md` for the full root-cause writeup. Corrected files delivered as `ACR_Reader_PrintReady_YODFIX.zip`. |
| Collector's boxed slipcase, Folio-Society-style | **Not built yet — inspiration now much clearer** | No slipcase design or print file exists yet. The 2026-11-10 reference photo (see "Luxury boxed-set inspiration" below) is a far clearer target than the earlier Topkapi photo — it's a mocked-up 6-volume navy/gold set with a menorah motif and an ornate pointed-arch gold filigree panel on the slipcase front. This is a future task, not a current deliverable. |

## Front cover layout (confirmed)

Top to bottom: paleo-Hebrew YHWH glyph → "THE ANCIENT COVENANT RECORD" → a thin
gold rule → "VOLUME [ONE/TWO/...]" in small caps → the Roman numeral → the book
title in large type → an italic subtitle (e.g. "The Five Books" for Torah).
Whole thing sits inside the double gold border with compass-star corners.

## Spine layout (confirmed)

Top to bottom: small compass-star emblem → a gold rule → "THE ANCIENT COVENANT
RECORD" running vertically → a gold rule → the Roman numeral → the book title in
italic, also vertical → (blank space scales with page count/spine width) → a
final gold rule → "ACR" at the very bottom.

## Back cover layout (confirmed as currently built; menorah swap pending)

Plain navy field inside the same double gold border and compass-star corners as
the front, with a single centered compass-star emblem in the middle. Per the
2026-11-10 reference photo, this should become a menorah instead — see the
table above and "Open design work" below.

## Open design work (not yet done, confirmed as wanted)

- **Swap the compass-star emblem for a menorah** on all 6 spines and back
  covers, per the 2026-11-10 reference photo. Not started.
- **Design the 6-volume slipcase box**, matching the reference photo's
  ornate gold filigree pointed-arch front panel with a large centered
  menorah, "THE ANCIENT COVENANT RECORD" / "ACR" lettering, navy cloth to
  match the volumes. Not started.
- Neither of these is urgent relative to settling the printer (see
  `ACR_PRINT_PROJECT.md`) — the menorah swap is cosmetic-but-real, the
  slipcase is a wholly new deliverable.

## Six-volume set, confirmed titles and page counts

| # | Title | Pages |
|---|---|---|
| I | Torah | 569 |
| II | Chanokh | 188 |
| III | Nevi'im Rishonim | 476 |
| IV | Nevi'im Acharonim | 598 |
| V | Ketuvim Part One | 405 |
| VI | Ketuvim Part Two | 428 |

Full spec detail (fonts, trim size, binding, margins) is in `ACR_PRINT_PROJECT.md`
— this file is the visual record, that one is the technical/production record.

## Individual cover preview

Every volume's cover follows the layout above with its own Roman numeral, title,
and page count (which changes the spine width slightly — thicker book, wider
spine, wider overall cover panel). Book 1 (Torah) is saved here as the reference
example since it was the one directly re-verified. The other five volumes' cover
PDFs are inside the original ZIP (see below) and follow the identical template.

## Luxury boxed-set inspiration

Two reference images exist, neither saved as a file in this repo yet (both
times, saving them here wasn't confirmed/approved in the moment — ask again
if you want either added to `print_references/`):

1. **Topkapi Palace Museum photo** (shown first, Oct 28 session) — a real
   photo of a navy-and-gold cloth hardcover 5-volume slipcase set with
   ornamental bookends, used as a size/style comparison.
2. **2026-11-10 mockup — the clearer, more specific target.** A rendered
   6-volume navy/gold slipcase set: spines read "THE ANCIENT COVENANT
   RECORD" / book title / Roman numeral / "ACR", each with a small menorah
   icon top and bottom; the slipcase's own front face is a separate ornate
   gold filigree pointed-arch panel with a large centered menorah and "THE
   ANCIENT COVENANT RECORD — ACR" lettering. This is the reference that
   confirmed menorah (not compass-star) as the real target — see the table
   near the top of this file.

No slipcase has been designed or built yet. When that work starts, follow
reference image 2 above as the primary target, keeping the navy/gold/
double-border language already established for the volumes themselves.

## Where the print-ready ZIPs are

**Use `ACR_Reader_PrintReady_YODFIX.zip`, not the original
`ACR_Reader_PrintReady.zip`** — the original has the YHWH-glyph typo
described above on all 6 covers. The YODFIX version has that corrected and
nothing else changed (interiors, foil masks, all identical, reverified).
`ACR2_PrintReady.zip` (the 1-volume companion) is unaffected either way — its
cover doesn't carry the glyph.

All of these were delivered to you directly as downloads and independently
re-opened and verified on 2026-11-10 (every interior PDF opens with the
correct page count; every cover and foil-mask PDF opens at the correct
wraparound size). They are not stored in this git repository — they're
binary production files, large, and not site code, so they don't belong in
the repo the way this documentation does. If you ever lose your copy, say so
in a new chat and point it at this repo; the covers can be rebuilt from this
documented spec, and the interior text can be regenerated from the live ACR
Reader site's own content (`data/file_N.json`), which is what built them the
first time.
