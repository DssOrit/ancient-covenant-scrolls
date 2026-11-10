# ACR Print Project — The Ancient Covenant Record as a physical hardcover set

**Read this file first, in any future session, before touching anything related to
printing ACR Reader or ACR2 as physical books.** This exists because the working
details of this project (fonts, gold foil, volume split, vendor research) were lost
once already when they only lived inside one chat session. This file is the fix —
it lives in the repo, not in chat history, so a new session can always find it.

This is a print/output project, not a site edit. It does not touch any live site's
code, so the Rule 8 unlock phrases do not apply to this file or to regenerating the
print-ready PDFs from the live site's own content (reading `data/file_N.json` to
build a PDF is reading, not editing).

## Status as of 2026-11-10

- Two print-ready packages exist and have been verified (opened, page-counted,
  rendered to images): `ACR_Reader_PrintReady.zip` (6 volumes) and
  `ACR2_PrintReady.zip` (1 volume, companion/auxiliary archive).
- **A real cover defect was found and fixed the same day — see "Known issues
  found and fixed" below. Use `ACR_Reader_PrintReady_YODFIX.zip`, not the
  original `ACR_Reader_PrintReady.zip`, going forward** (delivered to the user
  directly; not stored in this repo, same as the original).
- A quote-request letter to printgroup.pt has been drafted and verified against
  the real page counts, **but needs two corrections before sending** — see
  "Printer research" below (vendor domain may be wrong; quantity needs updating
  from 1-2 copies to 6 copies per volume, for family).
- No printer has confirmed final specs yet. Nothing has been ordered.

## Known issues found and fixed

**2026-11-10 — wrong Yod glyph on all 6 front covers, found and fixed.**
The user flagged the paleo-Hebrew YHWH glyph as looking wrong on the print
proof compared to the live site. Investigation (not assumption) found:
- The live site, and the print **interior** pages, both correctly show YHWH
  as Yod-He-Waw-He (`0x10909 0x10904 0x10905 0x10904`), confirmed by
  installing the real `Noto Sans Phoenician` font and comparing rendered
  output directly, letter by letter.
- The print **cover** files (all 6 main volumes — `book1_torah` through
  `book6_ketuvim_pt2`) had the 4th character wrong: `0x10911` (SADE) instead
  of `0x10909` (YOD) — confirmed via `pdftotext -bbox-layout` text extraction
  on the actual delivered PDFs, not guessed from the rendered shape alone.
  This is the same bug class already documented and fixed on the live site
  itself back in PR #797/#799 (see `SESSION_NOTES_2026-08-05.md`) —
  recurring independently in the separate cover-generation pipeline used for
  this print project.
- ACR2's cover does not carry this glyph at all, so it was unaffected.
- **Fix applied:** a surgical PDF patch (navy-colored rectangle covering the
  old glyph, corrected 4-character glyph drawn on top in the real font, in
  the correct visual left-to-right order — He, Waw, He, Yod, matching how
  the live site actually displays it) was applied to all 6 cover PDFs only.
  Interiors, foil masks, and everything else were left untouched and
  reverified unchanged (same page counts as before: 569/188/476/598/405/428).
  Delivered as `ACR_Reader_PrintReady_YODFIX.zip`.
- **One known limitation of this patch, disclosed plainly:** the fix covers
  and redraws the *visual* glyph only. The PDF's underlying text layer (what
  you'd get from copy-paste or text search inside the PDF) still has the old
  wrong codepoint sitting underneath, hidden by the patch. This does not
  affect what prints on paper, only digital text-extraction from the file.
  If a true from-source rebuild of the cover template ever happens, fix the
  source text run directly instead of patching.

## The finished design

- **Trim size:** 7 x 10 in / 178 x 254 mm (504.96 x 720.96 pt). Chosen over A5
  because the wider page fits more text per page, which brought total page counts
  down enough that no volume needed to be split in two.
- **Binding:** hardcover, sewn (not glued), navy cloth.
- **Cover decoration:** gold foil tooling — flat foil, NOT raised/embossed —
  an ornamental border plus title lettering, on both the front cover and the spine.
- **Heading font:** Cardo. (Cormorant was the other option considered; Cardo was
  picked and confirmed — verified by querying the actual rendered computed
  font-family in the browser, not just assumed from the CSS source.)
- **Body font:** Garamond, two-column layout.
- **The paleo-Hebrew YHWH glyph (𐤉𐤄𐤅𐤄) is untouchable.** It has its own inline
  font-family declaration (`Noto Sans Phoenician`) set directly on that character
  span. This takes precedence over whatever heading font is active, so changing
  the heading font between Cardo/Cormorant/anything else never touches it. Any
  future redesign work MUST re-verify this the same way — query the actual
  rendered `computedFontFamily` of the glyph's span, don't just assume a CSS rule
  doesn't reach it.
- **Color:** the interior is not pure black-and-white — it uses a 3-4 color
  text highlight/label system throughout (the DSS/ORIT GE'EZ/MASORETIC
  VARIANT/CRITICAL NOTE note-color system from the live reader). This is why the
  printer needs to be asked specifically about CMYK conversion, ICC profile, and
  whether they want PDF/X-1a or PDF/X-4 — it is not a simple B&W text job.

## Final volume breakdown (confirmed by directly opening the delivered PDFs)

| Volume | Pages | Notes |
|---|---|---|
| Book 1 — Torah | 569 | |
| Book 2 — Chanokh (Enoch, includes Yovelim/Jubilees) | 188 | |
| Book 3 — Nevi'im Rishonim | 476 | |
| Book 4 — Nevi'im Acharonim | 598 | |
| Book 5 — Ketuvim Pt. 1 | 405 | |
| Book 6 — Ketuvim Pt. 2 (with War Scroll & Book of Giants) | 428 | |
| **Total** | **2,664** | **6 physical volumes** |

An earlier idea to split Book 1 and Book 4 each into two volumes (8 total) was
considered when an earlier design iteration pushed those two books to 756 and 823
pages. That problem went away once the final design/trim combination above
brought them down to 569 and 598 — **the set stayed at 6 volumes.** If a future
redesign changes the font, column count, or trim size again, re-check whether any
single volume creeps back up near or past ~600-700 pages before assuming 6 volumes
still works.

**ACR2 (separate, single companion volume):** 310 pages. Same design family
(navy/gold, same fonts), but its cover is explicitly marked "AUXILIARY ARCHIVE" /
"Held Under Warning — Documented, Not Canonical" so it's never confused with the
canonical 6-volume set.

## What's actually inside each delivered zip

Each book gets its own folder with exactly 3 files — there is no single combined
"volumes" document, so look inside the per-book folders:

```
ACR_Reader_PrintReady/
  book1_torah/
    book1_torah_INTERIOR.pdf        <- the real text pages (569pp)
    book1_torah_COVER_fullcolor.pdf  <- 1-page wraparound cover (back+spine+front)
    book1_torah_COVER_foilmask.pdf   <- 1-page stencil for the gold foil stamping
  book2_chanokh/            (same 3-file pattern, 188pp)
  book3_neviim_rishonim/    (same pattern, 476pp)
  book4_neviim_acharonim/   (same pattern, 598pp)
  book5_ketuvim_pt1/        (same pattern, 405pp)
  book6_ketuvim_pt2/        (same pattern, 428pp)
```

`ACR2_PrintReady/` follows the identical 3-file pattern for its single 310-page
volume.

All of this was independently re-verified on 2026-11-10 (not just assumed from the
earlier chat) — every INTERIOR.pdf opens and has the page count listed above at
504.96 x 720.96 pt; every COVER_fullcolor.pdf and COVER_foilmask.pdf opens as a
1-page wraparound at a width that scales correctly with that book's thickness
(thinnest book = narrowest cover width, thickest book = widest).

## Printer research (as of late Oct 2026, corrected 2026-11-10)

**IMPORTANT CORRECTION — check this before sending anything.** The vendor
name "printgroup.pt" (a Portugal domain) may simply be wrong. A 2026-11-10
search found a real Polish company, "Books Factory Sp. z o.o." (Szczecin,
Poland, digital book printing from a single copy), sitting on the same
street (Cukrowa 22) as a company called "Print Group Sp. z o.o.", whose
real website domain is **printgroup.pl** (Poland), not **printgroup.pt**.
Both printgroup.pl and printgroup.pt are unreachable from this sandbox, so
this has NOT been directly confirmed — **before sending the quote email,
open printgroup.pl yourself and check it's the right company.**

**Also: the quantity in the drafted quote letter needs updating.** The
letter below was written for "1-2 copies of each title." The user has since
clarified this is for family — **6 copies of each volume (6 complete sets)**
is the real target. Update the letter before sending.

**Best lead (name pending the domain correction above): Books Factory, Poland / EU**
- States it accepts orders of as few as 1 copy (so 6 should be no problem,
  but hasn't been confirmed at 6 specifically).
- EU-based (Poland) — no UK-style post-Brexit customs/VAT exposure shipping to
  Portugal.
- Has a dedicated hardcover category, sewn or glued binding.
- Trim range 105x145mm to 297x297mm — the 178x254mm target fits, though anything
  with a spine-side dimension over 160x160mm reportedly costs more (a surcharge,
  not a rejection).
- **Still unconfirmed, and this is the risk to watch:** a "Bookfactory FAQ"
  page states hardcover page limits of 16-400 pages (glue binding) and
  24-400 pages (thread binding) — i.e. BOTH binding methods cap at 400
  pages. If this applies to the same vendor, Book 1 (569pp) and Book 4
  (598pp) would exceed it in EITHER binding method, and a different vendor
  would be needed for those two volumes. **This is exactly question #2 in
  the drafted quote letter below — get this answered before ordering
  anything.**
- Also still unconfirmed: exact file specs (bleed/margin/color profile), and real
  Portugal shipping cost/VAT at checkout for a 6-copies-per-title order.

**Other vendors checked, ranked by fit (quantity column updated 2026-11-10 to
reflect the real target of 6 copies per volume, not 1-2):**

| Vendor | No big minimum (need 6/title)? | Custom 7x10in? | Portugal? |
|---|---|---|---|
| Books Factory (domain: confirm printgroup.pl, not .pt) | Yes, from 1 copy per their own site language — 6 should be fine but unconfirmed at that exact number | Likely (in range, see page-limit risk above) | EU/Poland, ships to PT |
| Doxzoo | Confirmed "no minimum order" for case-bound books, custom trim sizes | Yes (custom trim) | UK-based — Portugal shipping cost/VAT not yet confirmed |
| CPI (Germany) | No MOQ stated, 72h hardcover production (per their dropshipping factsheet) | Not confirmed | EU — Portugal shipping not yet confirmed; gold foil capability not yet confirmed |
| IngramSpark | Medium confidence (as a "proof" copy) | Low confidence — custom trim is paperback-only; hardcover is a fixed size list | N/A |
| Lulu | Yes | Unconfirmed in their live configurator, but their own docs claim "thousands of trim sizes" supported, so true custom 7x10 is likely orderable — the named "Executive" preset (7.25x10.5in) is close but not exact | Unconfirmed |
| Mixam | Likely yes | No — fixed presets only | N/A |
| Pixartprinting | **No** (confirmed directly) | N/A — ruled out | Has a Portuguese site, but already ruled out on quantity |
| Portuguese artisan binderies / gilders | Unconfirmed, needs direct outreach | Yes (bespoke, by definition) | Based in Portugal (Lisbon area) |

**New leads found 2026-11-10 for hand-gilded/artisan binding** (not
industrial printing — worth considering for real hand-tooled gold leaf
rather than machine foil stamping, and they're actually IN Portugal):
- **Carlos Guerreiro** — Lisbon bookbinder and gilder. Offers simple and
  luxury binding, gilding with fine gold leaf and foil, restoration.
  Described as one of the city's last surviving artisans in this craft.
  Not yet confirmed for cloth-cover or multi-copy commissions.
- **Arte no Livro** (Andreia Tibério dos Santos and her father Fernando) —
  studio in Cascais, near Lisbon, since 2014. Gold-leaf blocked titles,
  tooled spines. Also not yet confirmed for this kind of order.
- No Porto-based binders were found in this search.
- No Porto-based binders were found in this search.

## The drafted quote-request letter (ready to send, not yet sent)

Already written and verified against the real page counts above. It asks
printgroup.pt, in order:
1. Confirm 178x254mm as a custom size and the cost impact of exceeding their
   160x160mm standard-cost threshold.
2. **Max page count for a single sewn hardcover volume at this trim** (naming
   Book 4's 598 pages directly) — this is the question that resolves the
   page-limit risk above.
3. Whether page counts must round to a multiple of 4 or 8 at this trim/stock.
4. Whether the color text interior needs CMYK conversion, which ICC profile, and
   PDF/X-1a vs PDF/X-4.
5. Bleed, safety margin, recommended interior paper stock, and whether they
   provide a spine-width template generator once page count/stock are fixed.
6. Whether they can do flat (not raised) gold foil tooling on cloth, and their
   foil-artwork file requirements.
7. Confirm the 1-2 copy minimum order and the price difference between 1 and 2
   copies.
8. A price and lead-time quote for all 6 volumes, shipped to Portugal, with
   confirmation that the quote includes Portuguese VAT with no surprise customs
   charges on delivery.

It covers only the 6-volume main set — ACR2 (310pp) is not mentioned in it yet.
Decide whether to fold ACR2 into the same email or send it as a separate request
before sending.

**Before sending, apply both 2026-11-10 corrections from "Printer research"
above:** (1) confirm/fix the vendor domain (printgroup.pl vs printgroup.pt),
(2) change the quantity throughout from "1-2 copies" to "6 copies" of each
volume (family order, 6 complete sets).

## Hardcover file-spec notes (general guidance, not yet vendor-confirmed)

- Hardcover interiors typically need a much bigger bleed/margin allowance per
  edge than softcover (softcover was ~3mm; hardcover commonly wants closer to
  15mm per edge).
- Gutter margins should widen to roughly 20-25mm for a 600-page book, not stay
  at a softcover's 18mm — the thicker the book, the more the gutter needs to
  compensate for the fold.
- Standard bookshelves cap around 10in tall — the 10in dimension of the chosen
  trim is already at that ceiling; don't go taller without checking the family's
  actual shelf.
- For a matched 6-volume set to look right side by side, keep spine thickness as
  uniform as practical across volumes (none of these specifics have been
  vendor-confirmed yet — they're general self-publishing guidance, treat as
  starting assumptions to verify, not settled facts).

## Next steps, in order

1. **Send (or finalize and send) the printgroup.pt quote email.** It already
   asks the right questions, especially #2 (the page-limit risk).
2. **In parallel, get 1-2 backup quotes** — check Lulu's live configurator
   directly for a true custom 7x10in order, and/or reach out to Carlos Guerreiro
   or Arte no Livro directly if hand-gilded artisan binding is wanted instead of
   machine foil stamping.
3. **Once a vendor responds**, compare: confirmed trim capability, page ceiling
   (does it actually fit Book 4's 598pp?), price per volume at 1 vs 2 copies,
   lead time, and real shipping/VAT to Portugal.
4. **Only after a vendor confirms specs**, revisit the file specs above (bleed,
   margin, color profile, page-count rounding) and adjust the actual PDFs if
   their requirements differ from what's already built.
5. Decide whether ACR2 ships with the same order or separately.

## Rules this project must keep honoring

- The paleo-Hebrew YHWH glyph is never re-fonted, no matter what heading/body
  font is chosen — see "The finished design" above.
- Divine name in the interior text stays YHWH/Creator only, exactly as the live
  ACR Reader site enforces (CLAUDE.md Rule 18) — the print PDFs were generated
  from the live site's own content, so this should already be correct, but any
  regeneration from a different/older source must re-check it.
- This file itself, and any PDFs/zips generated for this project, are NOT site
  code — Rule 8's unlock phrases govern editing `index.html`/`data/` files, not
  reading them to build a print PDF or editing this document.
