# Session Notes — 2026-07-12

## Current state

- Latest main tip: `6961613` — PR #606 (scan fixes).
- Working tree: this notes file pending; the two GreatE/WSA scan agents still running.
- Live cache markers after today: ACR Reader `acr-v73`, ACR Study `acr-study-v112`,
  Great Eraser Study `gestudy-v21`, Great Eraser `great-eraser-v19`,
  Search `acr-search-v143`.

## Built today (chronological, all merged)

1. **PR #604** — Removed the 11QMelchizedek heavenly-deliverer/mediator figure
   content from ALL sites (it cuts against the principle that YHWH delivers
   directly). Reader chapter `file_108` deleted + nav/TOC/prefetch; Study chapter
   removed from `IDS`/`LBL`/`VOL_GROUPS` + content file deleted; Search concordance
   lost 25 scroll passages + 2 Visions-of-Amram "Prince of Light" verses; Search
   Hebrews 7:3 entry reworded to refute from Bereshit 14 + YHWH-alone (no angelic
   figure); GreatE + GESTUDY scroll-list mention dropped. Temple Scroll renumbered
   to Vol 45. Kept Bereshit 14 / Tehillim 110 (Malki-Tzedek the human king).
   Caches acr-v71, acr-study-v110, acr-search-v143, great-eraser-v19, gestudy-v20.
2. **PR #605** — Visions of Amram: kept the (authentic pre-Christian DSS) Prince of
   Light verses, but replaced the editorial note. The `[CRITICAL NOTE]` in the
   Reader and a new Study FAQ now DEBUNK the later Christian attempt to graft the
   invented NT figure onto Malki-Tzedek (invented-figure language per rule 14).
   Caches acr-v72, acr-study-v111.
3. **PR #606** — Content-integrity scan fixes. "Jewish" -> "Hebrew" for the ancient
   covenant people (Reader file_88/89/66, Study file_35/106, GESTUDY); Esther
   (file_84) matched to its own "Yehudim"; GESTUDY name-slot "Elohim, The God of
   Israel" -> "the Creator of Israel" (rule 18); Book of Mysteries / Raz Nihyeh
   in-page volume headers corrected to match the sidebar (Vol 46 / Vol 47) after
   the #604 renumber. Divine-name appositive cases were KEPT per user direction.
   Caches acr-v73, acr-study-v112, gestudy-v21.

## Scan in progress (user request: any Christian/Rabbinic additions presented as ancient?)

Governing rule (user, locked in intent): NO Christian or Rabbinic additions on any
site, EXCEPT where they are being debunked.

Result so far — CLEAN:
- Reader (all chapters + full volume list): every volume is a genuine
  pre-Christian/pre-Rabbinic primary source; no NT text as scripture; no Rabbinic
  work shelved as ancient. Vol 46 "Book of Mysteries / Sefer ha-Razim" verified as
  the DSS 1Q27 Mysteries text (Qumran 1st c. BCE), NOT the medieval magical book.
- Study, GESTUDY: Christian/Rabbinic material appears only as the thing being
  debunked. Clean.
- Search: all 25 nt_database entries carry a debunk field (structural). Clean.
- ACR2, Solar: sampled — all mentions in debunking / primary-source frames. Clean.
- Great Eraser + WSA: two focused agents still scanning (thousands of mentions
  each); verdict pending.

Fixes already applied from the scan are in PR #606 (see above). Divine-name
appositive (rule 18) kept per user.

## Outstanding / to verify on device

- iPad Safari cache-bust check on the touched apps (Reader, Study, GESTUDY).
- Final GreatE + WSA scan verdict (agents running).

## Capability gaps this session

- Cannot reach the live site from the sandbox; verified in headless Chromium over a
  local http server.

## Backups (recovery: `git checkout <branch>`)

- `backup/2026-07-09-pre-reader-melchizedek` @ `7832b06` (pre-Melchizedek-removal
  safety point).

## Today's commit log (merges)

```
6961613 Scan fixes: Hebrew term, divine-name slot, volume-header renumber (#606)
0051e1f Visions of Amram: debunk the Christian claim on the Prince of Light figure (#605)
c578b8b Remove 11QMelchizedek heavenly-figure content from all sites (#604)
```
