# Load Tasks v4.3 Repair Preview Safety Patch

Sensitive repairs now show a visible Repair Preview panel before Apply Safe Patch is used.

## Why

Prepare Fix was not clearly showing what would change. This was unsafe for duplicate IDs, CSP, placeholder links, and PWA structure repairs.

## Rule

Do not apply a sensitive patch unless the Repair Preview panel shows:

- repair type
- risk level
- files likely changed
- planned steps
- QA required

After applying, status remains Patched, Needs QA until live testing passes.
