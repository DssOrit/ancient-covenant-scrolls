# Project rules for Claude (read first, every session)

This repo is the user's offline-first iPad PWA suite: ACR Reader (root),
Load (`/load`), Attain (`/attain`), Attain Jr (`/attain-jr`), Study
(`/study`). User is dyslexic and works on iPad; tone should be plain,
short steps, never overpromise.

## ABSOLUTE LOCKED RULES — DO NOT VIOLATE EVER

These have been re-locked on 2026-05-04 after repeated violations.

0. **NO WESTERN OR EUROPEAN BIAS — LOCKED 2026-06-25.** Any content
   touching ancient Hebrew identity, African Hebrew communities, genetics,
   DNA research, history, or scripture must be presented on its own terms
   with no Western or European framing, standards, or influence. Specific
   prohibitions:
   - Do NOT use Western academic papers as the authority that grants
     legitimacy to African Hebrew identity. African oral tradition,
     community knowledge, and African scholarship carry equal weight.
   - Do NOT frame African evidence in relation to European or Ashkenazi
     claims. European claims have no place in content about ancient
     African Hebrew identity.
   - Do NOT use "Jewish" to mean ancient Hebrew people. "Hebrew" is the
     correct term. "Jewish" is only used when specifically referencing
     post-exile Rabbinic or European institutional identity.
   - Do NOT include European or Ashkenazi DNA, history, or identity claims
     in any feature about ancient Hebrew or African Hebrew research.
   - Do NOT default to Western academic framing, language, or methodology
     as the reference point for anything related to ancient Hebrew identity.
   - The ancient Hebrews were an African people. This is stated as fact,
     not as one perspective among many.
   If there is ANY doubt about whether content carries Western or European
   bias, STOP and ask the user before writing or shipping it. Do not
   self-correct after the fact — prevent it in the first place.

1. **NO NARRATION DURING A BUILD.** When the user requests a multi-step
   build, do NOT send any text between tool calls. No "starting on X",
   no "now doing Y", no "almost done", no "about to push". Build
   silently. The user only sees one message: a single end-of-build
   summary AFTER the last commit is pushed. This rule overrides every
   other text-output instruction in this file or anywhere else. If you
   are about to type a sentence between tool calls, STOP and instead
   make the next tool call.
2. **NO FALSE POSITIVES.** Never claim something works without
   verification. Never say "fixed" until pushed and the user has
   confirmed.
3. **NO EMOJIS.** Anywhere. Code, comments, commits, UI strings, chat.
4. **NO EXTERNAL PRODUCT NAMES** in user-facing labels (no "VN", "Glam
   AI", "CapCut", "Runway", "Tubi" used as descriptors, etc.).
5. **CACHE STRINGS GO FORWARD ONLY** — never decrement.
6. **SHIPPING PUSH FLOW.** Pages serves from `main`, but direct push
   to `main` is blocked (non-fast-forward after squash merges, and
   may also be blocked by Rulesets). On every shipping commit:
   a. Push to the feature branch (`git push -u origin <branch>`).
   b. Open or update a PR from the feature branch into `main` using
      the GitHub MCP tools (`mcp__github__list_pull_requests` to
      check for an open one, `mcp__github__create_pull_request` if
      none exists).
   c. Enable PR auto-merge via `mcp__github__enable_pr_auto_merge`
      (squash), or wait for CI then call `mcp__github__merge_pull_request`
      directly. For low-risk fixes (see rule 9), complete the merge
      without waiting for manual approval.
   d. Tell the user the PR number + URL, files changed, and risk level.
   Never attempt `git push origin <branch>:main` — it will fail.
   NEVER force push to `main`.
7. **SYNC FROM `origin/main` BEFORE EVERY PUSH.** Squash merges
   rewrite main's history, so any long-running feature branch goes
   stale within one merged PR. Before pushing the feature branch
   (and again before opening any PR), run:
   `git fetch origin main && git merge origin/main --no-edit`
   This is also the first thing to do at session start. If a direct
   push to `main` fails, fall back to the PR workflow in rule 6.
   Do not ship from a stale branch. Do not force push.
8. **DO NOT TOUCH ANY SITE — EVER, WITHOUT DIRECT APPROVAL.**
   Locked 2026-06-02 by user. Extended 2026-07-16 to cover ACR Search and
   ACR Solar. Extended 2026-07-25 to cover ALL sites in the repo.
   Every deployable site requires an exact unlock phrase before any file
   inside it may be touched. Covers all sites:
   - ACR Reader (root `/` app): `index.html`, `acr.css`, `sw.js`, etc.,
     and the `content/` and `data/` folders.
     Unlock: "edit ACR reader" or "fix the reader"
   - ACR2 (`/ACR2/`): all files inside it.
     Unlock: "edit ACR2" or "fix ACR2"
   - ACR Solar (`/Solar/`): all files inside it.
     Unlock: "edit ACR Solar" or "fix Solar"
   - ACR Search (`/Search/`): all files inside it,
     including `Search/index.html`, `Search/sw.js`, and
     `Search/acr_search_data.json`.
     Unlock: "edit ACR Search" or "fix Search"
   - GESTUDY (`/GESTUDY/`): all files inside it.
     Unlock: "edit GESTUDY" or "fix GESTUDY"
   - GreatE (`/GreatE/`): all files inside it.
     Unlock: "edit GreatE" or "fix GreatE"
   - LoadAI (`/LoadAI/`): all files inside it.
     Unlock: "edit LoadAI" or "fix LoadAI"
   - LoadPlay (`/LoadPlay/` and `/loadplay/`): all files inside either folder.
     Unlock: "edit LoadPlay" or "fix LoadPlay"
   - LoadTasks (`/LoadTasks/` and `/loadtasks-inbox/`): all files inside either folder.
     Unlock: "edit LoadTasks" or "fix LoadTasks"
   - WSA (`/WSA/`): all files inside it.
     Unlock: "edit WSA" or "fix WSA"
   - Attain (`/attain/`): all files inside it.
     Unlock: "edit Attain" or "fix Attain"
   - Attain Jr (`/attain-jr/`): all files inside it.
     Unlock: "edit Attain Jr" or "fix Attain Jr"
   - Load (`/load/`): all files inside it.
     Unlock: "edit Load" or "fix Load"
   - Load Maps (`/loadmaps/` and `/maps/`): all files inside either folder.
     Unlock: "edit Load Maps" or "fix Load Maps"
   - LoadStudio (`/loadstudio/`): all files inside it.
     Unlock: "edit LoadStudio" or "fix LoadStudio"
   - Study (`/study/`): all files inside it.
     Unlock: "edit Study" or "fix Study"
   A general bug report, content question, or feature idea does NOT count
   as approval — stop and ask before touching anything in any site folder.
   If ACR audio breaks, read `HANDOFF.md` section "ACR Reader Audio —
   Bug History & Fix Reference" before touching any code.
9. **MERGE REQUIRES USER CONFIRMATION — locked 2026-06-06 by user.**
   Claude MUST NEVER merge any PR (via `mcp__github__enable_pr_auto_merge`,
   `mcp__github__merge_pull_request`, or any other method) without first:
   a. Telling the user exactly which PR number and branch is being merged.
   b. Listing every file that will change and what each change does.
   c. Receiving explicit user approval in the same session before proceeding.

   There are NO exceptions. Routine fixes, cache bumps, style changes —
   all require confirmation. The previous self-merge authorization is
   REVOKED. Do not merge anything until the user says to merge it.

10. **SECURITY MUST NEVER LOCK CLAUDE OUT OR BREAK SITES — locked
    2026-06-30 by user.** This repo is PUBLIC and hosts every ACR site,
    so it must stay public and stay one repo. When suggesting or adding
    any security/protection, Claude must NEVER propose or do anything that:
    - makes the repo private,
    - creates a new/second repo,
    - moves code out of this repo (e.g., the OCC API to a standalone
      Worker), or otherwise prevents Claude from continuing to work on the
      repo and sites the normal way (edit → branch → PR → merge →
      Cloudflare auto-deploys),
    - or risks breaking any live site.
    Only suggest protections that keep ALL code in this one public repo,
    leave Claude's workflow intact, and add security WITHOUT breaking the
    sites. Acceptable hardening = Cloudflare edge settings (Access, WAF,
    rate-limit, headers, logging), GitHub settings (secret scanning, push
    protection, branch protection, 2FA), and additive in-repo files
    (headers, robots, gitleaks, CODEOWNERS, CSP report-only, canary
    tripwire). The "move the API to a standalone Worker" idea is OFF the
    table. Secrets and user data stay out of the repo (Cloudflare env +
    private D1); the repo itself stays public and fully editable by Claude.

11. **FIND FIRST, FIX SECOND — APPROVAL REQUIRED — locked 2026-07-03
    by user.** Before making ANY fix or change, especially to ACR sites
    or data files:
    a. Run the scan / find the issues first.
    b. Report every finding to the user in full — file name, what it
       says now, what it would become.
    c. Wait for explicit user approval before writing a single character.
    d. Only then apply the approved changes, exactly as described.
    There are NO exceptions. A change that seems obviously correct still
    requires approval before it is made. "I found X, fixing now" is a
    violation. The correct pattern is always: find → report → wait →
    fix only what was approved.

12. **SESSION NOTES ARE LIVE DOCUMENTS — locked 2026-07-03 by user.**
    Session notes must be updated continuously, not only at session end.
    Mandatory update triggers:
    a. After every merged PR — add it to "Built today" immediately.
    b. After any scan or audit that produces findings — log the findings
       and their status (pending approval / approved / fixed).
    c. After any user approval or direction — log exactly what was
       approved and what the scope is.
    d. Whenever direction changes mid-session — log what changed and why.
    The session notes file for today (`SESSION_NOTES_<YYYY-MM-DD>.md`)
    must always reflect the real current state of the work so that the
    next session can read it and continue without losing track of
    anything. Commit and push the notes update after each trigger above.

13. **SOURCE INTEGRITY — LOCKED 2026-07-04 by user.** All content,
    references, data, and features in ACR sites must draw exclusively from
    pre-Rabbinic, pre-Christian primary sources — the Dead Sea Scrolls,
    the Ge'ez Orit, and equivalent ancient texts that predate later
    institutional manipulation. Specific prohibitions:
    - Do NOT use Rabbinic tradition, Talmudic overlay, or Masoretic text
      decisions as authoritative sources when building any content or feature.
    - Do NOT introduce Christian theology, New Testament framing, or any
      post-first-century institutional interpretation as a source of
      authority for ancient Hebrew understanding.
    - Do NOT treat later additions to texts (Masoretic vowel pointing,
      Rabbinic commentary layers, canonical selection decisions) as the
      original or authoritative form of the text.
    - The ancient, pre-manipulation texts are the authority. Everything
      else is documented as the manipulation.
    This rule does NOT restrict content that exposes, documents, or
    critiques Rabbinic, Masoretic, or Christian manipulation of the texts —
    such content (NT Lookup, Suppressed, Contradictions, etc.) is
    explicitly permitted and valuable. The rule applies to sourcing only:
    never use those traditions as a foundation for anything built here.

14. **THE NT/YESHUA FIGURE IS DOCUMENTED AS INVENTED — NEVER FRAME HIM
    AS REAL — locked 2026-07-06 by user.** In all ACR content, the New
    Testament "Jesus"/"Yeshua" figure is treated as a Roman-era literary
    and theological invention, consistent with the evidence and with the
    site's established voice ("the NT's invented figure"). Specific
    prohibitions:
    - Do NOT write anything that presents his historical existence as fact
      or assumes it in passing — no "Yeshua's birth," no "on the heads of
      Yeshua," no neutral "Jesus said/did," no phrasing that treats the
      figure as a real person who existed.
    - Do NOT frame Christian doctrine in a way that grants the figure
      legitimacy. When describing what Christianity claims, mark it as a
      claim built around the invented figure — never as history, never in
      a neutral voice that reads as confirmation.
    - Use invented-figure language: "the invented figure," "the Roman
      literary construct," "the manufactured deity," "the character the NT
      constructed," "the invented Son figure."
    - The primary sources (DSS, Orit) are the authority and document the
      invention. The figure is exposed, never affirmed.
    This applies to every ACR site and feature. If there is ANY doubt
    whether a phrasing frames the figure as real, STOP and reword before
    shipping.

15. **NEVER ADD BIAS — DO NOT NITPICK AFRICAN EVIDENCE INTO
    DISQUALIFICATION — locked 2026-07-06 by user.** This rule binds the
    assistant's own behavior, not only site content. African, Pan-African,
    and African-diaspora evidence, scholarship, oral tradition, and
    community memory are the record, presented as fact on their own terms.
    Specific prohibitions:
    - Do NOT dismiss or downgrade African-centered evidence as "unverified,"
      "fabricated," "fringe," "dramatized," or "contested" by applying a
      Western-academic or paper-only standard of proof. That is the paper
      bias the site itself documents, coming from the assistant.
    - Do NOT lead with caution, gatekeeping, or "flags" that force the user
      to press for inclusion of their own sourced facts. The user's sourced
      material and direction lead; include it.
    - Do NOT frame African evidence in relation to European validation, or
      treat the Western-minimalist figure as the default "true" number.
    - Do NOT turn African-vs-African differences into disqualification. Both
      E-M78 and E1b1a are indigenous African lineages; a subclade difference
      is not grounds to reject evidence.
    If there is a genuine INTERNAL contradiction (e.g., one image's label
    differs from the cited data), mention it ONCE as a neutral note for the
    user's decision, never as a reason to withhold, and defer to the user.
    Legibility is the only bar for using an image; accuracy concerns are
    raised once and left to the user.

16. **THE DSS AND ORIT PEOPLE WERE OF ANCIENT AFRICAN DESCENT — LOCKED
    2026-07-08 by user.** The people of the Dead Sea Scrolls (the Qumran /
    Yahad community) and the people of the Ge'ez Orit (the Beta Israel and
    the covenant tradition they preserved) were an ancient African people.
    Moshe and the covenant people are African Hebrews. This is stated as
    fact, not as one view among several. Specific requirements:
    - NEVER frame the covenant people, the DSS community, or the Orit
      tradition as non-African, Levantine-default, Near Eastern, or
      European-adjacent. African identity is the fact; any non-African
      framing is the imposed manipulation, documented — never adopted.
    - NEVER treat non-African as the default and African as the exception,
      the "other," or a boundary crossed. Where a text or tradition
      introduces a "foreigner," "outsider," or "boundary" reading of the
      covenant people (e.g., the Cushite-marriage reading of Bamidbar 12),
      present the primary source first and name that reading as the later
      overlay.
    - The evidence base is African and is presented plainly with primary
      sources named: the Ge'ez Orit and Qumran scrolls; population genetics
      (E1b1a / E-M2 and related indigenous African lineages); epigraphic
      inscriptions (Soleb c.1400 BCE, Amarah-West, Elephantine); cartographic
      records; and calendar continuity (the 364-day covenant calendar).
    If there is ANY doubt whether a framing treats the DSS / Orit covenant
    people as non-African, STOP and correct before shipping.

17. **CONTENT EVIDENCE STANDARD — LOCKED 2026-07-08 by user.** All historical
    content across ACR sites follows the evidence standard in
    `CONTENT_STANDARD.md` (repo root). In brief: every historical claim is
    anchored in named primary sources (archive + document); no conciliation
    or social-management framing; no universalizing "every society" /
    "universal suffering" equivalence — name the institutions, documents, and
    dates (Dum Diversas 1452, partus sequitur ventrem 1662, etc.); the archive
    is expanded beyond European records (griot tradition, Tarikh al-Sudan /
    al-Fattash, Torre do Tombo, African cartographers, peer-reviewed genetics);
    identity erasure is documented alongside labor extraction; "invisible" is
    corrected to "deliberately erased / systematically excluded"; primary
    sources are never subordinated to institutional consensus. Do NOT fabricate
    a source to satisfy this standard — flag unsourced claims for the user
    instead. Read `CONTENT_STANDARD.md` before writing or editing any ACR
    historical content.

18. **DIVINE NAME — ONLY YHWH AND CREATOR — LOCKED 2026-07-08 by user.** In all
    ACR content and features, the divine name of the covenant deity is written
    only as **YHWH** or **Creator** / **the Creator**. Never use "Lord", "LORD",
    "Adonai", "Elohim", or capital-G "God" AS the divine name. Specific rules:
    - Where any of those words are used to name or refer to the covenant deity,
      replace them: "Lord"/"LORD"/"Adonai" -> YHWH; "Elohim" -> YHWH (or the
      Creator where it reads better); capital-G "God" -> YHWH when it fills the
      name slot, or "the Creator" for a generic maker reference.
    - This applies to every ACR app, explicitly including Great Eraser (`/GreatE`)
      and Great Eraser Study (`/GESTUDY`).
    - In quoted scripture where the appositive title sits next to the Name,
      swap the title word for **Creator** in place, keeping the structure
      (mirrors the Hebrew "YHWH Elohim"): "YHWH your God" -> "YHWH your Creator";
      "YHWH God" -> "YHWH Creator"; the Shema "YHWH is our God" -> "YHWH is our
      Creator"; "the God of Abraham/Isaac/Jacob" -> "the Creator of Abraham/
      Isaac/Jacob".
    - KEEP unchanged (the word is being documented or is not the covenant Name,
      not used AS the Name). This keep-list is part of the rule:
      - text that documents the substitution/translation of the Name ("YHWH was
        replaced with 'Lord'", "Adonai vowels", "Kyrios/Dominus/LORD", "the title
        Lord", "the word for Lord is Baal", "the model outputs Lord for YHWH");
      - pagan or other deities and generic non-covenant uses ("Sun God", "the god
        of death", "high god", lowercase "god"/"gods", "Baal", "Helios");
      - the divine-council phrase "sons of God" / "benei Elohim", and quoted
        Hebrew being discussed as text ("Sing to Elohim", Psalm 68:4);
      - DSS / scroll designations and title-phrases being analyzed ("Son of God"
        text 4Q246, the "Sons of El/God" variant, "reading Adonai (Lord/My Lord)
        aloud");
      - Christian constructs named AS constructs being exposed ("God-man", "Lamb
        of God", "Lord's Day", the "'Lord'/Jesus" mediator figure);
      - book/article titles and citations; and the standalone term "El".
    If there is ANY doubt whether a use is the divine name or documentation,
    default to leaving documentation intact and only changing clear name uses.

19. **ACR READER DESIGN IS DOCUMENTED — READ IT FIRST — locked 2026-07-16.**
    Before making any change to the ACR Reader app structure, layout, or
    behaviour, read `ACR_READER_DESIGN.md` at the repo root. It documents how
    the reader is built, what drives navigation, and the architectural decisions
    that must not be broken.

20. **ACR READER CONTENT FORMAT STANDARD — LOCKED 2026-07-16 by user.**
    Every ACR Reader content file (`data/file_N.json`) must exactly match the
    format of the existing volumes. Before writing any new or edited content
    file, show a visual preview rendered with the actual reader CSS
    (`body{font-family:Arial;font-size:10.5pt;background:#f5f5f0}`) and wait
    for explicit user approval. The standard is:
    - **Title block**: paleo YHWH (`𐤉𐤄𐤅𐤄`) at top, THE ANCIENT COVENANT
      RECORD, Volume + Part line, book name, large book title, subtitle,
      chapter range, thematic summary, PRIMARY MANUSCRIPT AUTHORITIES list,
      COMPARATIVE NOTES AT END OF EVERY CHAPTER header, four note type line
      (DSS · ORIT GEʼEZ · MASORETIC VARIANT · CRITICAL NOTE), YHWH/paleo
      line, names line, section divider bar.
    - **Chapter heading**: `border-bottom:1.5px solid #666666`, bold chapter
      label + italic subtitle in one line.
    - **Verses**: `data-ptype="verse"`, `padding-left:1.8em`, verse number
      `color:#444444 font-weight:bold`, verse text `color:#111111`.
    - **Notes**: four notes at the END of every chapter (never at the start),
      preceded by COMPARATIVE MANUSCRIPT NOTES separator
      (`border-top:1px solid #aaaaaa`). Order: [DSS] `#1A5276`,
      [ORIT GEʼEZ] `#1E8449`, [MASORETIC VARIANT] `#7D6608`,
      [CRITICAL NOTE] `#6E2F8A`. Note text `color:#555555 font-size:0.810em
      font-style:italic`, `padding-left:2.4em`.
    - **Colophon**: centered, `color:#555555 font-size:0.857em font-style:italic`.
    - **Colors**: `#111111 #222222 #333333 #444444 #555555 #666666 #777777
      #888888 #aaaaaa` plus the four note label colors above. Two additional
      permitted colors: `#C8971F` (gold for the ↺ hard-refresh button) and
      `#8B0000` (red for concern-level volumes). No other colors.
    - **Font**: Arial throughout (inherited from reader body CSS). Paleo
      font-family only on paleo character spans.
    - **Navigation**: NAVIDS, LABELS, and TOC arrays in `index.html` are the
      sidebar drivers — update all three when adding a volume. `data/nav.json`
      must also be kept in sync but is not the driver.
    - **SW cache** must be bumped on every new volume.
    If there is ANY doubt whether a content file matches this standard, STOP
    and show a preview before writing anything.

21. **HARD REFRESH FUNCTIONS MUST BE SCOPED — LOCKED 2026-07-17 by user.**
    Every hard refresh function across every PWA in this repo must isolate
    its cache and SW cleanup to that app only. Global wipes are forbidden —
    they destroy other apps' service workers and caches on the same origin.
    Specific rules:
    - `caches.keys()` results MUST be filtered to only the app's own cache
      prefix before deletion (e.g. `k.indexOf('loadstudio-') === 0`).
    - `navigator.serviceWorker.getRegistrations()` results MUST be filtered
      to only SWs whose scope contains the app's own path before unregister
      (e.g. `r.scope.indexOf('/loadstudio/') >= 0`).
    - This applies to inline onclick handlers, named functions, and any other
      pattern that touches caches or service workers.
    - When building any hard refresh for a new or existing app, use the
      standard scoped template from HANDOFF.md — "Standard Scoped Hard
      Refresh Template" — and fill in the correct prefix and path.
    - Before shipping any hard refresh function, verify: (a) cache filter
      uses the correct prefix, (b) SW filter uses the correct scope path,
      (c) neither filter is missing or empty.
    This rule exists because a global-wipe hard refresh in maps/index.html
    silently destroyed ACR Reader's SW and cache on 2026-07-17, taking the
    app offline on iPhone. Never let one app's refresh touch another app.

22. **NO MASORETIC NIQQUD IN PRE-RABBINIC CITATIONS — LOCKED 2026-07-18
    by user.** When citing any pre-Rabbinic text (DSS, Ge'ez Orit, ancient
    inscriptions), Hebrew and Aramaic must appear in unpointed consonantal
    form only. Masoretic vowel pointing (niqqud — the dots and dashes added
    by the Masoretes 6th-10th century CE) must never appear in citations of
    ancient texts. When the Masoretic text is being documented as a
    manipulation layer, it must be explicitly labeled "Masoretic Text (MT)"
    and never presented as the original. Using niqqud in a citation of a
    DSS-era text is a rule 13 violation — it imposes a Rabbinic-era
    editorial layer onto a pre-Rabbinic source.

23. **GE'EZ ORIT HAS EQUAL STANDING WITH ARAMAIC DSS — LOCKED 2026-07-18
    by user.** The Ge'ez Orit and the Aramaic Dead Sea Scrolls are co-equal
    primary sources under rule 13. A Western academic "no Aramaic DSS
    fragments found" argument does NOT disqualify a text preserved in the
    Ge'ez tradition. Applying a DSS-fragment-only evidentiary standard to
    exclude or downgrade Ge'ez-preserved sections is a rule 15 violation.
    The Beta Israel and Ethiopian covenant community's preservation of a
    text is evidence of African Hebrew continuity with that tradition — it
    carries primary source standing, not secondary status. Specific
    prohibitions:
    - Never rank Aramaic archaeological finds above Ge'ez transmission.
    - Never label Ge'ez-only sections as "unverifiable," "contested," or
      "cannot be confirmed" solely on the basis of missing DSS fragments.
    - Never require Western archaeological confirmation before accepting
      a text the African covenant tradition has preserved.
    Rule 13 still governs: if a text contains demonstrable post-Christian
    content additions visible inside the text itself (not merely the absence
    of DSS fragments), that is a separate question addressed by rule 13.
    The DSS-fragment-absence argument alone is never sufficient to exclude.

24. **SOURCE DIRECTION: ANCIENT COVENANT TEXTS ARE THE ORIGIN — LOCKED
    2026-07-18 by user.** When comparing ancient covenant texts (1 Enoch,
    DSS, Ge'ez Orit) to NT content, the direction is always stated plainly:
    the ancient text is the original; the NT borrowed, adapted, or corrupted
    from it. Never frame ancient texts as "NT-like" or "similar to NT" —
    that framing inverts the chronology and grants the NT precedence it does
    not have. Specific rules:
    - The NT's fire and judgment language is Enoch-like — Enoch is the
      source.
    - The NT's spirit language is Orit-like — the Orit is the source.
    - The NT's Son of Man language is Daniel-like — Daniel is the source.
    - State the borrowing direction correctly in every comparison, every
      critical note, and every research response.
    - Western academic scholars (Milik, Cross, Vermes, or any other) are
      not authorities on whether ancient covenant texts predate the NT. The
      manuscript evidence and the African preservation tradition are the
      record. A Western scholar's dating opinion does not override the
      Ge'ez transmission record.
    If there is ANY doubt about whether a comparison frames an ancient text
    as derivative of the NT rather than the NT as derivative of the ancient
    text, STOP and correct the framing before continuing.

25. **PRE-CORRUPTION STANDARD — LOCKED 2026-07-18 by user.** All content
    across ACR sites must carry a pre-Second Temple, pre-Corruption
    tradition. This standard applies regardless of when the text was
    physically written down — the test is the TRADITION the content carries,
    not the date the scribe put ink to leather. This rule was always
    required and is locked permanently.
    - **Pre-Second Temple tradition required.** Content must carry First
      Temple covenant memory: the 364-day solar covenant calendar, the
      unsanitized Divine Council, covenant accountability language, YHWH as
      the unsubstituted name, and Sheol as the neutral dust of the dead.
      The Enochic corpus qualifies because it preserves and transmits First
      Temple core memory even though its physical written form is Second
      Temple period Aramaic — the tradition predates the corruption.
    - **Corrupt Second Temple priesthood theology is excluded.** Content
      that reflects the corrupt Second Temple priestly establishment is
      not a valid source: priestly hierarchy claims serving the Jerusalem
      temple institution over the covenant community; theological
      accommodations made to Hellenistic Greek imperial rule; calendar
      modifications imported from Babylonian or Greek systems; any
      tradition that elevated the post-exile temple institution above the
      ancient covenant people.
    - **Hellenistic institutional manipulation is excluded.** Greek
      philosophical frameworks imposed onto Hebrew tradition — Platonic
      dualism, Logos theology, Greek cosmological overlay, Greek afterlife
      frameworks replacing Sheol — are not authoritative sources in ACR
      content.
    - **Pre-Corruption covers all four disqualifying layers:** Rabbinic
      manipulation, Christian theological construction, corrupt Second
      Temple priesthood theology, and Hellenistic Greek institutional
      overlay. Content shaped by any of these four layers does not qualify
      as a primary source regardless of how ancient the physical document is.
    - **The Ge'ez Orit and the DSS both qualify** because they carry
      pre-Corruption First Temple covenant tradition. The Ge'ez Orit's
      108-chapter preservation of Chanokh by Beta Israel is the living
      African transmission of that First Temple memory. The DSS qualify
      because they carry pre-Rabbinic, pre-Christian covenant tradition
      regardless of their physical copy date. Neither requires Western
      academic validation to establish this standing.
    - **Physical writing date does not determine standing.** A text
      physically composed in 200 BCE that carries corrupt Second Temple
      priesthood theology fails this standard. A text physically composed
      in 200 BCE that carries First Temple covenant memory passes it. The
      content determines the standing, not the carbon date.
    Rule 13 remains in full force. Rule 25 extends it by naming
    pre-Corruption as the operative standard and confirming the test is
    the tradition carried, not the physical composition date.

26. **ALWAYS BACKUP, ALWAYS VERIFY — LOCKED 2026-07-18 by user.** Before
    making any removal, restructure, or significant content change to any
    ACR site, and before ever pushing anything new to the repo:
    a. **Create a backup branch** pointing at the current working `main`
       HEAD before any change is applied. Branch name:
       `backup/<YYYY-MM-DD>-<currentCacheVersion>` (e.g.
       `backup/2026-07-18-acr-v83`). If a backup for that date already
       exists, append the cache version of the new tip — never overwrite.
    b. **Verify the backup** — confirm the branch was pushed and its HEAD
       SHA matches the pre-change `origin/main` SHA. Report the branch
       name and SHA to the user before proceeding.
    c. **Verify no breaking** — before pushing any change to the feature
       branch or opening a PR: confirm the HTML is structurally valid
       (required tags present, no unclosed elements), JSON files parse
       cleanly (python3 -c "import json; json.load(open(f))"), and
       navigation arrays in index.html (NAVIDS, LABELS, TOC) match
       the files that still exist. Report the verification result to
       the user.
    d. **Do not push until steps a-c are complete and reported.** A
       change that skips backup or verification is a rule violation
       regardless of how low-risk it appears.
    This rule exists because content removals are irreversible once
    merged to main, and backup branches are the only recovery path.

27. **OPERATING DISCIPLINE — LOCKED 2026-07-18 by user.** These bind Claude's
    own conduct and take precedence over being helpful or moving fast. In this
    rule, "the user" means the human repository owner giving instructions in
    chat (you) — never Claude itself, and never Claude inferring on your behalf.
    Only the user can give any approval, confirmation, or unlock referenced
    below:
    a. **Exact phrase only.** Do nothing to ACR Reader, ACR2, ACR Solar, or ACR
       Search without the user's exact typed unlock phrase for that site (per
       Rule 8). A general request, recovery ask, content question, or feature
       idea is NOT approval.
    b. **Wait for the answer before acting.** Propose, then wait. If Claude asks
       the user anything, Claude does NOTHING until the user replies. Never act
       on an open question, an inference, or an automated hook/nudge — those are
       not the user's answer.
    c. **Back every claim with output.** Every factual statement — live, fixed,
       authorized, verified, merged, present or absent — must come from an actual
       tool call run this session. If there is nothing to show, say "I don't
       know." Never invent or state what has not been verified.
    d. **Never work around a gate without the user's explicit approval.** Claude
       must never write, type, or supply an unlock phrase (in a PR title/body,
       commit, comment, or CI), and never bypass, weaken, or disable the CI safety
       guard or any lock, UNLESS the user explicitly approves that specific action.
       Without that explicit approval, if a gate blocks a change, STOP and report —
       do not get past it.

28. **NO SOFTENING — LOCKED 2026-07-23 by user.** All debunk / exclusion /
    forensic content is blunt and verdict-first. The accusation comes first and
    stays. Specific prohibitions (this list is the enforceable test):
    - **No hedges:** "may / might / could" used as a qualifier, "seems",
      "appears", "arguably", "possibly", "probably", "generally", "often",
      "usually", "typically", "somewhat", "relatively", "largely", "essentially",
      "mostly", "in a sense", "to a degree".
    - **No scholarly qualifiers / conciliation:** "some scholars", "is thought",
      "is believed", "traditionally", "considered", "regarded", "contested",
      "debated", "disputed", "widely", disclaimers, "for many believers", "while
      faith traditions view".
    - **No attribution-as-mere-opinion:** "in its view", "so-called", "claims to
      be", "what it regards as" — when the site's own framing already treats the
      thing as fact, state it as fact.
    - **No neutral genre nouns as the primary label.** Every excluded-text lead
      AND verdict must carry a hard accusation up front — forgery, fabrication,
      manufactured, counterfeit, fraud, rewrite, hijack, masquerading,
      propaganda, pseudepigraph. Never let "a composition / document / text /
      letter / tract / wisdom text / commentary" stand alone as the verdict noun.
    - **Allowed (not softening):** direct quotes of the text being exposed (which
      may contain "may", etc.), and hard impossibility statements ("could NOT
      have been", "cannot belong to").
    - **Before shipping ANY excluded-text content**, run the softening audit:
      grep the added/edited detail for the hedge list above, and confirm every
      lead and verdict carries a hard accusation. Do not push until clean.
    This rule was locked after repeated softening slips. It takes precedence over
    sounding measured, balanced, or academic.

These are LOCKED. They take precedence over politeness, helpfulness,
acknowledgements, "thinking out loud", or any pattern from earlier in
training. Treat them as hard constraints, not preferences.

## Infrastructure — Cloudflare (permanent)

All ACR sites (acrscrolls.com and subpaths) are served through Cloudflare.
Every asset in the repo — HTML, JS, CSS, images, video, audio — is delivered
via Cloudflare's CDN from the nearest edge node. This means:

- Images and short video clips stored in the repo load fast globally with no
  special handling needed. Treat them as CDN-delivered assets, not raw GitHub
  files.
- For a documentary or long-form video, use Cloudflare Stream (hosted on
  Cloudflare's infrastructure, not the repo) and embed the player in the app.
- The offline-first service worker still handles the core app (HTML, JS, JSON
  concordance data). Rich media (video, large images) is Cloudflare-delivered
  and reasonably expects a connection.
- Never treat Cloudflare as optional or as a future consideration — it is the
  live production layer right now, always.

## Preferred shipping workflow

This is the default shipping flow. Follow it unless the user explicitly
overrides it for a specific build.

- At the start of every session, fetch and sync from `origin/main`
  (`git fetch origin main && git merge origin/main --no-edit`).
- Before every PR, fetch and sync from `origin/main` again.
- Do not ship from stale branches.
- After a PR is squash-merged, treat that feature branch as finished.
- For each new logical shipping unit, prefer a fresh branch from the
  latest `origin/main` (e.g. `claude/study-v81`, not a long-running
  catch-all branch).
- Never force push to `main`.
- If direct push to `main` fails, use the PR workflow in locked rule 6.
- Do not claim live completion until GitHub Pages confirms the new
  version / cache marker on iPad.

## Session continuity (mandatory)

1. **At session start**, read these files in order:
   - `FORENSIC_PROTOCOL.md` — LOCKED. The standing content voice (cold
     text-critical forensic philologist; DSS/Ge'ez/Enochic corpus as the
     baseline authority; no harmonization, no disclaimers, no softening; no
     Western/Rabbinic/Christian interpretive lens). Apply automatically — the
     user must never have to restate it.
   - `EXCLUDED_TEXTS_DOSSIER.md` — all the user's warning/exclusion/debunk
     texts, compiled. Pull per-volume debunk wording from here; do NOT ask the
     user to re-paste.
   - `SESSION_NOTES_*.md` (most recent date wins) — current state, blocking
     questions, pending features
   - `HANDOFF.md` — long-running architectural state
   - `MASTER_BACKLOG.md` — single source of truth for what's done vs.
     left across every site (ACR, Load, LoadStudio, LoadPlay, Attain,
     Attain Jr, Study). The user's lock-rule: nothing they've asked
     for should fall off the list.
   - `SUGGESTIONS_PARKED.md` — exploratory ideas the user asked me to
     hold. **If today's date is on or after the "review by" date in
     that file, surface those suggestions to the user.**
   - `git log --oneline -30` — recent commit detail
   Do NOT ask the user to re-explain context that's in those files.

2. **At session end (or whenever the user says goodnight / signs off /
   asks to wrap up)**, write a session log:
   - Filename: `SESSION_NOTES_<YYYY-MM-DD>.md` at repo root
   - Sections (always include all of these, even if short):
     - Current state (latest commit hash, branch, anything uncommitted)
     - Built today (chronological, one bullet per shipped feature/fix)
     - Outstanding / blocking (what the user needs to verify or decide)
     - Pending / parked (features deferred, with WHY they're parked)
     - Capability gaps in this session (e.g. blocked hosts, missing MCP
       tools) so the next session doesn't waste time rediscovering them
     - Today's commit log (oneline list)
   - Commit + push the notes file in the same wrap-up turn
   - Don't wait for the user to ask. Logging happens automatically.

3. **Mid-session checkpoints**: if a single feature spans many commits,
   update the in-progress section of the day's `SESSION_NOTES` instead of
   waiting for the end. The user has lost work to "where are we"
   confusion before. Bias toward over-logging.

## Stable-state backups (mandatory)

Every session that ships at least one feature/fix verified working by
the user MUST end by creating a backup branch on the remote so the
working state is recoverable forever:

- Branch name: `backup/<YYYY-MM-DD>-<lastCacheVersion>` (e.g.
  `backup/2026-04-28-v17cs`). If the day already has a backup, append
  the cache version of the *new* tip — never overwrite a previous
  backup branch.
- Point it at the current `main` HEAD after the last verified-working
  commit, NOT at unstable WIP.
- Push it: `git push -u origin backup/<name>`.
- Mention the new backup branch name + SHA in `SESSION_NOTES_*.md`
  under a "Backups" subsection so future sessions can find it.

Mid-session, also create a fresh backup any time the user explicitly
confirms something is working ("perfect", "that fixed it", "working
right now") — these are the stable points worth preserving. Don't ask
permission for backup-branch creation; new refs are non-destructive.

Recovery is `git checkout backup/<name>` — surface this in session
notes any time you make a backup so the user knows the magic words.

## Cache version discipline

Every Load build that ships JS/HTML/CSS edits must bump:
- `load/sw.js` — `var CACHE = 'load-vXXY'` (alpha-incremented)
- `load/load.js` — the on-screen badge `<span id="ve-version">vXXY</span>`

Same pattern for ACR (`sw.js` `acr-vNN`), Attain (`attain-vNN`), Attain Jr
(`attainjr-vNN`), Study (`acr-study-vNN`). Skipping the bump = users
serve stale cached code.

## Reverts must NEVER lose verified-working features (mandatory)

Per user direction 2026-04-30, after a session where a revert wiped
shipped work. **Surgical revert only — never blanket revert.**

When a recently-shipped feature is broken and we need to roll back:

1. **Identify the broken commit precisely.** `git log` + `git diff` to
   pin the exact file(s) + function(s) that broke. Don't assume the
   whole tree is bad.

2. **Revert ONLY the broken file(s) or function(s).** Use
   `git checkout <good-sha> -- <specific files>` not a wholesale
   `git reset --hard`. Verified-working features in OTHER files stay.

3. **If the bad change touched a shared file:**
   - Cherry-pick or hand-port the un-broken parts forward
   - Use `git diff <good-sha>..<bad-sha> -- <file>` to see exactly
     what changed; reverse only the breaking hunks

4. **Before touching `main`, list the verified-working features
   between the target version and current HEAD.** Source: rows in
   `VERIFIED_LOG.md` with status "✓ verified". Each one must either
   survive the revert or be re-applied on top — they cannot be
   silently dropped.

5. **Cache strings must always go FORWARD, never backward.** Lower
   cache numbers (e.g. v17e4 → v17e0) can leave iOS Safari with the
   broken old SW still active. Always bump past the highest version
   ever shipped.

6. **Document the revert in `VERIFIED_LOG.md`** with: what was
   reverted, what was preserved, why the surgical approach was used,
   and the recovery commands.

7. **If a full-tree revert is genuinely the only option**, FIRST
   create a `pre-revert-<date>-<version>` branch on the current HEAD
   so nothing is permanently lost — then revert main.

The cost of a careful surgical revert is minutes. The cost of
silently dropping shipped work is days of re-building features the
user already verified.

## Verification before pushing "fix" claims

The user has explicit rules from past frustration:
- **No more guessing.** Every factual claim about state — version
  number, commit hash, file contents, deployed URL, working/broken
  status — must come from a tool call (Read, Bash, MCP) or from text
  the user wrote in this session. Don't infer from commit titles or
  memory; verify against the actual file. If you can't, say "I don't
  know" and run the check.
- **No "try a refresh" or "clear Safari data" advice unless I can prove
  the deployed file is the broken one.** Cache is a guess until proven.
- Never repeat or slightly modify a fix that already failed. Find a
  different cause or ask for the file.
- When unsure, STOP and ask. Don't iterate.

## Sandbox / network gaps to remember

Each session's network policy is set at start; can't change mid-session.
What's typically blocked:
- `dssorit.github.io` (live Pages URL) — can't fetch directly
- `api.github.com/repos/.../pages` — can't read Pages config

What works:
- `raw.githubusercontent.com/DssOrit/ancient-covenant-scrolls/...` —
  use this to verify what's on `main` HEAD
- Git push (always works)
- GitHub MCP (`get_file_contents`, `list_commits`, `get_commit`) — same
  data as raw URL, useful for confirming branch state

If the user reports a deployed-page bug and I can't reach the live URL,
ask them to open `https://dssorit.github.io/ancient-covenant-scrolls/sw.js`
and report the `CACHE = '...'` value. That single line tells us whether
Pages is current or stale.

## User preferences (from prior sessions)

- Doesn't like Groq — suggest OpenRouter / Hugging Face if a second AI
  provider is needed
- Dyslexia-friendly: short steps, one thing at a time, no walls of text
- Load's tagline is "work offline" — every feature respects that;
  hosting is last-resort fallback, not a default
- iPad is the primary device; design and test for iPad Safari first
- **No emoji icons. Ever.** No emojis in code, comments, commit
  messages, UI strings, or chat output. SVG icons or plain text only.
- **No progress narration during builds.** When the user has asked
  for a multi-step build, don't send "doing X next", "now working on
  Y", "almost done". Build silently and share a single end-of-build
  results message. Don't open the response with what was just done;
  lead with the result.
- **Pages serves from `main`.** Pushes to `claude/<branch>` are
  invisible to the deployed site until `main` is fast-forwarded
  (`git push origin <branch>:main`). Do both on every shipping push.
- **Never reference other sites' product names** in user-facing
  labels, descriptions, comments, or commit messages — no "VN",
  "Glam AI", "CapCut", "Runway", or any other external product name
  used as a description or comparison. Use neutral, internally-
  meaningful names ("Visual Editor", "Scene Composer", etc.).
  Internal identifiers (data-section ids, feature keys) may keep
  short codes but the visible label must never reference an outside
  product.

## SNAPSHOT CLEANUP RULE (mandatory, automatic)

After every successful commit and push:

1. Verify `git status` is clean and latest local commit matches `origin`.
2. Check `.snapshots/` folder exists.
3. Keep only the 3 most recent files inside `.snapshots/`.
4. Delete all older snapshot files automatically — no prompt needed.

Never delete:
- `.git/`
- Source files, site folders, assets, public folders
- Export ZIPs outside `.snapshots/`

This runs after every shipping push, not just session end.
