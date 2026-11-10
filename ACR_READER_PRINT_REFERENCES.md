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
| **Back cover: centered gold "menorah" emblem** | **Not what's built — correcting this** | The back cover's centered emblem is the **same 8-pointed compass-star rosette** used in the four corners, not a menorah (7-branched candelabra). See `book1_torah_back_cover.png`. If you want an actual menorah there instead, that's a real design change, not yet made — say so and it can be built. |
| Collector's boxed slipcase, Folio-Society-style | **Not built yet — inspiration only** | No slipcase design or print file exists. What exists is the reference photo you shared (see below). This is a future task, not a current deliverable. |

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

## Back cover layout (confirmed)

Plain navy field inside the same double gold border and compass-star corners as
the front, with a single centered compass-star emblem in the middle — the same
rosette as the corner ornaments, not a menorah (see correction above).

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

You shared a photo of a navy-and-gold cloth hardcover 5-volume slipcase set
(labeled "Topkapi Palace Museum" on the spines, with ornamental bookends) as a
size/style comparison when asking whether hardcover would suit a family keepsake
set. That photo is the inspiration reference on file for the collector's boxed
edition — it was embedded inside one of the Oct 28 session screenshots rather
than shared as its own clean image file, so it isn't saved separately here yet.
If you want it saved properly alongside this doc, share that photo on its own
and it'll be added to this folder.

No slipcase has been designed yet. When that work starts, it should match this
same navy/gold/compass-star/double-border language already established above,
scaled up to a 6-volume box.

## Where the original print-ready ZIP is

`ACR_Reader_PrintReady.zip` (6 volumes) and `ACR2_PrintReady.zip` (1 companion
volume) were both delivered to you directly as downloads, and were independently
re-opened and verified on 2026-11-10 (every interior PDF opens with the correct
page count; every cover and foil-mask PDF opens at the correct wraparound size).
They are not stored in this git repository — they're binary production files,
large, and not site code, so they don't belong in the repo the way this
documentation does. If you ever lose your copy, say so in a new chat and point
it at this repo; the covers can be rebuilt from this documented spec, and the
interior text can be regenerated from the live ACR Reader site's own content
(`data/file_N.json`), which is what built them the first time.
