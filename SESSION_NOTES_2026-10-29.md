# Session notes 2026-10-29 (Load Survival)

Full request list: see the section LOAD SURVIVAL: owner request tracker at the end of MASTER_BACKLOG.md. PRs #1122, #1123 and #1124 are merged by DssOrit. Owner asked 2026-10-29: do not lose track of any request.

## Current state
- Branch claude/loadsurvival-home-redesign from origin/main d45f618f (PR #1122 merged by DssOrit, cache p85-v103).
- Home redesign built and checked, cache loadsurvival-p86-v104. PR opened, not merged.

## Backups
- backup/2026-10-29-loadsurvival-p84-v102 at 41772078 (before #1122)
- backup/2026-10-29-loadsurvival-p85-v103 at d45f618f (before the Home redesign). Recovery: git checkout backup/2026-10-29-loadsurvival-p85-v103

## Built today
- Home redesign: slim underlined top tabs, photo header from welcome.jpg, thin pill buttons, Your place bar (region choice), Who is at home row (saved on device, guides added next), photo cards, slim emergency numbers. Files: app.js, features.js, style.css, service-worker.js.

- PR #1123 (Home redesign) merged by DssOrit.
- Refresh circle now returns to the welcome screen once, then Get started goes to Home (cache p87-v105). Backup backup/2026-10-29-loadsurvival-p86-v104 at 48792a4e. Normal opening of the app still goes straight to the page you were on.

- Six disaster guide corrections built (hurricane, tornado, flood table, earthquake, wildfire, heat wave) plus their Not confirmed notes updated, cache p88-v106. Backup backup/2026-10-29-loadsurvival-p87-v105 at c9ddb68f. PR awaiting merge.

- Sleek pass built (Home down to the footer, Guides tiles and rows, Tools and Lists cards, button caps, calmer dyslexia spacing), cache p89-v107. Backup backup/2026-10-29-loadsurvival-p88-v106-after1127 at 62642718. PR awaiting merge. Topic picture prompts delivered (14).

- #1128 (sleek pass) merged by DssOrit. All-pages style with a picture banner on every page built, cache p90-v108. Backup backup/2026-10-29-loadsurvival-p89-v107 at 4eb5d6c1. PR awaiting merge.

- #1129 (all pages style) merged by DssOrit. Seniors (8) and pregnancy (9) guides built in extra-needs-data.js, cache p91-v109, Home Who is at home row shows them. Backup backup/2026-10-29-loadsurvival-p90-v108 at a284d9e4. PR awaiting merge. Emergency birth steps are labelled general guidance (no named source found).

- #1130 (pregnancy and seniors guides) merged by DssOrit. Power supplies guides (6) built in power-supplies-data.js, cache p92-v110. Backup backup/2026-10-29-loadsurvival-p91-v109 at 93e29925. PR awaiting merge.

- #1131 (power supplies) merged by DssOrit. Place choices on Home and 12 place guides built in places-data.js, cache p93-v111. Backup backup/2026-10-29-loadsurvival-p92-v110 at 6804d16f. PR awaiting merge. CDC, NHS, WHO, ACOG and Red Cross pages were still blocked from the session network.

- #1132 (place choices and 12 place guides) merged by DssOrit. Staying warm (2), hygiene (5), glasses (2) and scenarios (3) guides built in life-data.js, cache p94-v112. Backup backup/2026-10-29-loadsurvival-p93-v111 at 426a26e2. PR awaiting merge.

- #1133 (staying warm, hygiene, glasses, scenarios) merged by DssOrit. Household guides (7) built in household-data.js, cache p95-v113. Backup backup/2026-10-29-loadsurvival-p94-v112 at b8781bad. PR awaiting merge. Next: download and print.

## Approved scope, not built yet (each needs its own phrase, backup, checks, PR)
- Seniors guides and pregnancy guides (named sources, status label, Not confirmed list).
- Place pages: Portugal (Lisboa, Porto, Coimbra, Setubal), United States by state (CA: Los Angeles, San Pedro, Palmdale, Valencia; FL: Jacksonville, Orlando; SC: Conway; Ohio statewide). Each with hazards and alerts, stores, DIY survival, maps with a Load Maps link, ponds, rivers, water sources, off-grid resources.
- New guide ideas from the owner: staying warm when heat fails, hair care and hygiene during a catastrophe, glasses wearers who may lose them, more scenarios.

## Outstanding
- Owner merges the Home PR on GitHub.
- Real iPad Safari check of the new Home page.

## Capability gaps
- www.cdc.gov and www.nhs.uk could not be opened from the session network. Only search summaries were read.

- Owner 2026-10-29: site must work when government and outside sites cannot be reached; saved Survival Maps handoff and research docx under planning/ for later.

- #1134 and #1135 merged. Download and print built (export.js, Tools > Download and print), cache p96-v114. Backup backup/2026-10-29-loadsurvival-p95-v113 at 750ec990. Next: place the 40 pictures when uploaded; audit guides for steps that depend on outside links.

- #1136 (download and print) merged. Owner approved audit A, B and C. Built: labels on all 299 guides, 56 'If you cannot reach it' boxes (fallback-data.js), cache p97-v115. Backup backup/2026-10-29-loadsurvival-p96-v114 at 178ba583. Owner answered: tampons and pads mixture for the three women (asked whether all three still have periods). Waiting on: 40 pictures from ChatGPT (1 received, tile-medical), well pump label, older woman details.

- #1137 (audit) merged. Owner said all three women have periods (tampons and pads mixture), pump info and older woman details wait, finish the build requests. Built UK in the Stockpile and Dog tools, pad and tampon split in the tracker, cache p98-v116. Backup backup/2026-10-29-loadsurvival-p97-v115 at 71d97cf4. Still waiting: 39 pictures, pump label.

- #1138 merged. Owner pasted another tool's verification of the labour guidance (checked: WHO manual and ISBN real, NHS signs match search results, rest unconfirmed) and supplied the WHO slidedoc PDF with edit Load Survival. Built the labour guide update, cache p99-v117. Backup backup/2026-10-29-loadsurvival-p98-v116 at 676048bb.

- #1139 merged. Owner's pasted download list checked: ACNM Giving Birth In Place is real (could not open, site blocked); other titles not found. Labour guide updated from the opened WHO manual, cache p100-v118. Backup backup/2026-10-29-loadsurvival-p99-v117 at 5dc7f891.
