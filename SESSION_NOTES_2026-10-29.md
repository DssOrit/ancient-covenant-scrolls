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

## Approved scope, not built yet (each needs its own phrase, backup, checks, PR)
- Seniors guides and pregnancy guides (named sources, status label, Not confirmed list).
- Place pages: Portugal (Lisboa, Porto, Coimbra, Setubal), United States by state (CA: Los Angeles, San Pedro, Palmdale, Valencia; FL: Jacksonville, Orlando; SC: Conway; Ohio statewide). Each with hazards and alerts, stores, DIY survival, maps with a Load Maps link, ponds, rivers, water sources, off-grid resources.
- New guide ideas from the owner: staying warm when heat fails, hair care and hygiene during a catastrophe, glasses wearers who may lose them, more scenarios.

## Outstanding
- Owner merges the Home PR on GitHub.
- Real iPad Safari check of the new Home page.

## Capability gaps
- www.cdc.gov and www.nhs.uk could not be opened from the session network. Only search summaries were read.
