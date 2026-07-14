# Session Notes — 2026-07-12

## Current state

- Latest main tip: `b9b013c` — PR #609 (trinity / worshipped-deity debunking notes + One Creator tab).
- Working tree: clean (this notes update pending push).
- Live cache markers after today: ACR Reader `acr-v74`, ACR Study `acr-study-v112`,
  Great Eraser Study `gestudy-v21`, Great Eraser `great-eraser-v19`,
  Search `acr-search-v145`.

## Built today (chronological, all merged)

1. **PR #604** — Removed the 11QMelchizedek heavenly-deliverer/mediator figure
   content from ALL sites (it cuts against the principle that YHWH delivers
   directly). Reader chapter `file_108` deleted + nav/TOC/prefetch; Study chapter
   removed from `IDS`/`LBL`/`VOL_GROUPS` + content file deleted; Search concordance
   lost 25 scroll passages + 2 Visions-of-Amram "Prince of Light" verses; Search
   Hebrews 7:3 entry reworded to refute from Bereshit 14 + YHWH-alone (no angelic
   figure); GreatE + GESTUDY scroll-list mention dropped. Temple Scroll renumbered
   to Vol 45. Kept Bereshit 14 / Tehillim 110 (Malki-Tzedek the human king).
2. **PR #605** — Visions of Amram: kept the (authentic pre-Christian DSS) Prince of
   Light verses, but replaced the editorial note. The `[CRITICAL NOTE]` in the
   Reader and a new Study FAQ now DEBUNK the later Christian attempt to graft the
   invented NT figure onto Malki-Tzedek (invented-figure language per rule 14).
3. **PR #606** — Content-integrity scan fixes. "Jewish" -> "Hebrew" for the ancient
   covenant people (Reader file_88/89/66, Study file_35/106, GESTUDY); Esther
   (file_84) matched to its own "Yehudim"; GESTUDY name-slot "Elohim, The God of
   Israel" -> "the Creator of Israel" (rule 18); Book of Mysteries / Raz Nihyeh
   in-page volume headers corrected to match the sidebar after the #604 renumber.
   Divine-name appositive cases were KEPT per user direction.
4. **PR #607** — Session notes.
5. **PR #609** — "No pre-Christian/pre-Rabbinic trinity or worshipped deity"
   documentation. TEN `[CRITICAL NOTE]` blocks ADDED beside the existing notes (no
   existing note replaced, no scripture changed) at the classic Christian
   proof-texts: Bereshit 3:15 (file_1); Yesha'yahu 7:14, 9:6, 11:1 (file_42);
   Yesha'yahu 52:13-53:12 suffering servant (file_45); Tehillim 22 (file_66);
   Tehillim 110:1 (file_70); Mikhah 5:2 (file_62, added beside its untouched note);
   Zekharyahu 12:10 (file_64); Daniyel 7:13 & 9:25-26 (file_86). Each names the
   claim, gives the primary-source reading (ACR already restores "young woman",
   "Mighty Creator", "my Sovereign", "offspring"), and shows no worshipped deity.
   The Isaiah 53 note argues the servant is the covenant people (Yisra'EL/Yaakov,
   named 41:8; 44:1-2/21; 45:4; 49:3; 53:10 "sees his offspring, prolongs his
   days"). ACR Search gained a new "One Creator" tab (No Trinity + No Worshipped
   Figure + 10 proof-text cards). Caches acr-v74, acr-search-v145.

## Scan for Christian/Rabbinic additions presented as ancient — COMPLETE

Governing rule (user): NO Christian or Rabbinic additions on any site, EXCEPT where
they are being debunked.

Result: CLEAN across every site — Reader, Study, GESTUDY, Search, ACR2, Solar, Great
Eraser, WSA. All Christian/Rabbinic material sits in debunking/exposé frames only; no
NT figure treated as real, no doctrine as true, no Rabbinic/Masoretic ruling as the
authoritative original. Great Eraser and WSA were verified directly (their two focused
agents had been interrupted mid-run). Vol 46 "Book of Mysteries / Sefer ha-Razim"
confirmed as the DSS 1Q27 Mysteries text, not the medieval magical book.

Only surfaced item: WSA uses "the Lord" / "the Lord God" as the divine Name in ~19
spots (author-voice + quoted Jeremiah/Chanokh/Habakkuk). Reported as a rule-18 point;
**user chose to LEAVE it as-is.** No change made.

## Outstanding / to verify on device

- iPad Safari cache-bust check on the touched apps (Reader `acr-v74`, Search
  `acr-search-v145`, Study `acr-study-v112`, GESTUDY `gestudy-v21`). Confirm the
  Search "One Creator" tab shows and the new Reader proof-text notes appear. If stale,
  clear Website Data for `acrscrolls.com` and reload.

## Capability gaps this session

- Cannot reach the live site from the sandbox; verified in headless Chromium over a
  local http server.

## Backups (recovery: `git checkout <branch>`)

- `backup/2026-07-09-pre-reader-melchizedek` @ `7832b06` (pre-Melchizedek-removal
  safety point).

## Today's commit log (merges)

```
b9b013c Debunking notes: no pre-Christian/pre-Rabbinic trinity or worshipped deity (#609)
daa734d Session notes 2026-07-12 (#607)
6961613 Scan fixes: Hebrew term, divine-name slot, volume-header renumber (#606)
0051e1f Visions of Amram: debunk the Christian claim on the Prince of Light figure (#605)
c578b8b Remove 11QMelchizedek heavenly-figure content from all sites (#604)
```
