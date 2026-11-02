# Session Notes — 2026-11-02

## Current state

- Branch: `claude/acr-reader-text-additions-mo2b4k`, reset to `origin/main` at
  `239188b1` (post PR #1174 merge).
- No uncommitted changes yet this session.

## Finding: unapproved authenticity verdict on ACR Search, user disputes it

While researching whether a batch of user-supplied reference images belonged
anywhere on ACR Search, discovered that ACR Search's "Excluded Texts" content
(`Search/index.html`) carries a hard authenticity rejection of the Birth of
Noah text (4Q534-536):

> "The Birth of Noah (4Q534-536) is not a patriarchal record but a late
> Aramaic astrological fragment... Not found in the authentic record. A
> later addition of manipulation texts."

This directly conflicts with ACR2's own treatment of the identical manuscript
(4Q534-536), which presents it as genuine quarantined DSS content ("Held
Under Warning — Documented, Not Canonical") — flagged for theological
implications, never framed as inauthentic or fabricated.

Traced the live wording to its source: `EXCLUDED_TEXTS_DOSSIER.md` at the
repo root carries near-identical text for this same entry, as one of a
larger list (Nabonidus, Apocryphon of Joshua, Words of Michael,
Pseudo-Jubilees, and others) all written in the same "Forensic Data /
Debunking Proof" format. The live commit that introduced this specific
wording to `Search/index.html` is `cb7a13fc` (PR #987, merged 2026-09-22) —
no session notes exist from that date to show what was actually reviewed
with the user at the time.

**User's explicit response when asked whether they approved this specific
"inauthentic/fabricated" framing: "I never approved this, it was slipped
again... another attempt at confusing this text."** Per the user, this
wording was not authorized and misrepresents the text.

**Status: unresolved, no site file touched yet.** Awaiting the user's
direction on scope — fix only this one entry, or audit the rest of the
same Excluded Texts list (and/or `EXCLUDED_TEXTS_DOSSIER.md` itself) for
other entries that may carry the same problem, since the user's own
wording ("another attempt") suggests this may not be isolated. Any fix
to `Search/index.html` requires the ACR Search unlock phrase ("edit ACR
Search" or "fix Search"), which has not been given this session.

## Outstanding / blocking

- The ACR Search Birth-of-Noah authenticity-verdict dispute above — needs
  the user's decision on scope before any fix is proposed or written.
- A separate, already-proposed but not-yet-approved edit from earlier
  today: a Bereshit 5:28-29 (`data/file_1.json`) cross-reference note to
  the Birth of Noah text, drafted before this authenticity dispute
  surfaced. That draft should NOT ship as originally worded, since it
  cited the Birth-of-Noah text's "fuller tradition" without knowing ACR
  Search elsewhere calls the same text fabricated — needs to be revisited
  once the Search-side dispute is resolved.

## Pending / parked

- A larger "add these explanations to ACR Search, illustrated with
  user-supplied images" project was proposed, then scoped down: of 11
  images shown, only 1 was already live on the site (confirmed exact
  match: `solar-covenant-calendar-city.webp`); most of the rest have no
  existing content to attach to and would need new sections built first.
  One image (a glowing-sky "divine name" graphic) was rejected twice for
  using the wrong script for YHWH (first square Hebrew with niqqud, then
  plain English lettering) — the standing rule requires the paleo-Hebrew
  glyph (𐤉𐤄𐤅𐤄) specifically. Parked pending the authenticity-dispute
  resolution above and the user producing a corrected image.

## Capability gaps in this session

- No access to the live Pages/custom-domain URLs from this sandbox, as
  usual — all verification done via `git fetch origin main` and direct
  file reads.

## Today's commit log

- (none yet this session)
