# Session Notes — 2026-07-06

## Current state

- Branch: `claude/pagan-influences-christianity-rt1pfj`
- Base: synced from `origin/main` at session start (already up to date, tip `c5fcece`, acr-search-v110)
- Working tree after this build: content added to `Search/index.html`, cache bumped in `Search/sw.js` to `acr-search-v111`
- Not merged — awaiting user confirmation per locked rule 9.

## Built today

### Pagan influences in Christianity — expanded (acr-search-v111)

Extended the existing "Traditions of Men, YHWH's Testimony Against Adopted Practices"
section inside NT Lookup → Rome tab (`renderRomePanel`). All entries measured against
pre-Rabbinic / pre-Christian primary sources (DSS, Orit, Tanakh in DSS-attested form),
consistent with locked rule 13.

New sub-section: **The Spirit of YHWH Is Not the Christian Holy Spirit**
- Ruach, one word for breath/wind/every commissioned spirit (not a distinct Person)
- The lying spirit YHWH sent against Ahab (1 Kings 22:19-23 / 2 Chron 18) — same grammar
  Christians use for the Holy Spirit; a spirit sent from YHWH's throne that produced
  confident prophecy and was lying. Core point the user asked for.
- The distressing spirit from YHWH on Sha'ul (1 Samuel 16:14, 4QSam-a)
- Speaking in tongues vs true prophecy — Bamidbar 11, 1 Sam 10, 1 Sam 19 (intelligible,
  covenant-centered) vs pagan ecstatic utterance (1 Kings 18:26-29); Acts 2 tongues were
  real known languages, so modern glossolalia matches neither the prophets nor the NT.
- Holy Spirit as third Person defined at Constantinople 381 CE (datable council decision)

New sub-section: **Ritual Forms Borrowed From the Nations**
- Praying in circles (no primary-source basis; golden-calf circle)
- Rosary / repetitive bead prayer (Matthew 6:7)
- Prayer to saints / the departed (necromancy — Devarim 18:10-12; 1 Sam 28)
- Holy water & infant baptism vs the mikveh
- Sign of the cross
- Bowing / genuflecting before images (second commandment)
- Votive candles / offerings to saints
- The halo (sun disk) — Devarim 4:19; Yechezkel 8:16
- Steeples & obelisks (matzevah — Devarim 16:22)
- Sunrise worship facing east (Yechezkel 8:16)
- Ash Wednesday & Palm Sunday (Devarim 4:2)

Note: Laying on of hands was already covered in this section (semicha vs charismatic
co-option) — confirmed present, not duplicated.

Files:
- `Search/index.html` — new `td-item` entries in the Rome panel string
- `Search/sw.js` — cache `acr-search-v110` → `acr-search-v111`

### PR #557 — MERGED (SHA bcd3632). Backup of pre-change site: `backup/2026-07-06-v110` (SHA a1c2721). Recovery: `git checkout backup/2026-07-06-v110`.

### PR #558 (branch, open) — Big Questions cards + REWRITE + Rule 14 (acr-search-v113)

Two searchable Big Questions cards (`BELIEFS_QA`): "Speaking in Tongues" (prophecy)
and "The Holy Spirit vs the Spirit of YHWH" (spiritual). Searchable via bq-search
(matches full card text) — keywords tongues/glossolalia/holy spirit/ruach.

**User feedback that triggered a rewrite (logged):** the pagan content was too
watered-down and, in places, framed the invented Yeshua/Jesus figure as if he existed
(halo entry named "Yeshua"; Holy Spirit card said "the Father and the Son"). User: no
framing him as real; evidence points to invention; it felt biased. Approved: full-depth
rewrite + lock the rule.

**Rewrite done (approved):**
- Reframed all my additions to the invented-figure voice (never present the figure as
  real; Christian claims marked as claims around the invented figure).
- Deepened every entry with specifics: ruach usages (Shoftim 9:23, Yeshayahu 29:10,
  Zekharyah 12:10, Bamidbar 5:14), Ahab's 400 + Mikhayahu, Delphi/Bacchic/Cybelene +
  Montanism + 1 Cor 14 restraint + glossolalia linguistics, Constantinople 381 politics
  (Edict of Thessalonica 380, Pneumatomachi, filioque/1054), Tertullian for sign of the
  cross, Heliopolis obelisk at St. Peter's, japa/Buddhist bead origin, etc.
- Halo entry: "Yeshua" → "the invented Christ figure."

**Rule 14 LOCKED in CLAUDE.md (2026-07-06):** NT/Yeshua figure is documented as invented,
never framed as real; Christian claims marked as claims, never confirmation.

Files: `Search/index.html` (Rome td-items rewritten + 2 BQ cards reframed/deepened),
`Search/sw.js` (v112 → v113), `CLAUDE.md` (Rule 14), this notes file.

**Pending (needs approval — OUT of this scope):** pre-existing content still frames the
figure as real in places — e.g. the Christmas entry ("Yeshua's birth", ~line 3262) and
"body and blood of Christ" (communion, ~line 3238). ~45 "Yeshua" + ~59 "Jesus" tokens
across the whole Search app; many are legitimate (naming the invented figure) but some
frame him as real. Offered a full Rule-14 sweep of pre-existing content pending user OK.

Validation: extracted inline scripts and ran `node --check` — SYNTAX OK.

## Outstanding / blocking

- User to confirm on device, then PR can be merged (rule 9 — no merge without confirmation).
- Optional follow-ups the user did not request yet: mirror the tongues/Holy-Spirit points
  as searchable Big Questions cards (needs 4-tradition treatment).

## Capability gaps this session

- `dssorit.github.io` blocked — verify via `raw.githubusercontent.com`.
- GitHub MCP briefly disconnected/reconnected mid-session; PR tools available again.

## Divine name rule (kept)

Only YHWH and Creator. New content uses YHWH throughout; lowercase god only for pagan/false
claims. Avoided Lord/Adonai/Elohim/capital-G God as divine name in new text.
</content>
</invoke>
