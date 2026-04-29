# Pull Request

## What does this change?

<!-- Describe the change in 1-3 sentences. -->

## Why?

<!-- Link an issue, session note, or describe the user-visible reason. -->

## Security checklist (mandatory)

- [ ] No API keys / tokens / passwords added
- [ ] No `.env` file added (use `.env.example` for placeholders only)
- [ ] No provider keys exposed in frontend code
- [ ] No private user data added
- [ ] No paid / copyrighted assets added without owner approval
- [ ] Cache version bumped if any JS/HTML/CSS edits (per CLAUDE.md)
- [ ] App still builds
- [ ] App still runs (verified on iPad Safari if PWA-touching)

## Testing

<!-- How did you verify this works? -->

- [ ] Tested on iPad Safari (cache-busted URL)
- [ ] Verified service worker updated
- [ ] Verified existing features still work (regression check)
