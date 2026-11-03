# Exploratory testing and defect status

**SUT:** nopCommerce 4.90.8 at `http://localhost:8081/` (locally configured demo installation).

## Verified history

- The 15 manual regression cases in `docs/manual-test-cases/` have recorded PASS outcomes, but their original execution dates were not recorded and require confirmation.
- Four additional negative registration/login scenarios are recorded as PASSED on 2026-11-03 in `docs/negative-test-cases/`.
- On 2026-11-03 the user executed 10 Playwright E2E scenarios in both browsers: 20/20 passed.
- The separately scoped GitHub API suite: 10/10 passed, and the original SQA-local PHP test suite: 13/13 passed. These are not evidence of nopCommerce defects.
- No confirmed reproducible nopCommerce defect was documented in the supplied material. **Confirmed bug reports: 0.**

## Exploration needed to meet Part 5

The assignment expects five detailed bug reports. If fewer are found, provide credible exploration evidence, without inventing defects. Record the real date, browser, OS, version, test data, actual result and screenshot/log for every case explored.

| Area / experiment | Real execution date | Browser | Actual observation | Defect ID or no defect | Evidence file |
|---|---|---|---|---|---|
| Quantity boundaries (0, 1, 2, large value) | TODO | TODO | TODO | TODO | TODO |
| Cart quantity changes and recalculated totals | TODO | TODO | TODO | TODO | TODO |
| Search: blank, spaces, special characters | TODO | TODO | TODO | TODO | TODO |
| Registration: invalid and duplicate emails | TODO | TODO | TODO | TODO | TODO |
| Login: invalid password and empty fields | TODO | TODO | TODO | TODO | TODO |
| Categories and price sorting | TODO | TODO | TODO | TODO | TODO |
| Browser comparison in Chromium/Firefox | TODO | TODO | TODO | TODO | TODO |

A validation message for an intentionally invalid input is **correct behavior**, not a bug. An automation failure due to selectors, state or local environment must not be labeled as a nopCommerce defect unless reproducible in the app independently.

## Defect report template

Use the template in `BUG-TEMPLATE.md` for every confirmed problem; name files `BUG-001.md`, `BUG-002.md`, etc., once supported by evidence. Record fewer than five if that is what genuine exploratory testing finds.
## Automated exploratory run 20261103-192630

See [actual observations and screenshots](exploration-20261103-192630.md). This run is separate from historical undated manual case execution.
