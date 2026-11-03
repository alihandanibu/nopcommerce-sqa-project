# TC-NEG-02

**Title:** Registration with mismatched passwords
**Type:** Negative / Manual
**Priority:** High

## Precondition
nopCommerce is running at http://localhost:8081/.

## Test Steps
1. Open Register page.
2. Fill all required fields with valid values.
3. Enter Password123! as password.
4. Enter Different123! as confirmation.
5. Submit registration.

## Expected Result
Application rejects registration and displays a password confirmation error.

## Actual Result
Registration was rejected. The application displayed: The password and confirmation password do not match.

**Status:** PASSED
**Execution Date:** 2026-11-03
**Evidence:** Browser output provided during manual testing; screenshot not saved.
**Bug ID:** N/A (pending execution)
