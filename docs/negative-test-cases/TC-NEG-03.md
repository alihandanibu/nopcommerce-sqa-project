# TC-NEG-03

**Title:** Login with incorrect password
**Type:** Negative / Manual
**Priority:** High

## Precondition
nopCommerce is running at http://localhost:8081/.

## Test Steps
1. Open Login page.
2. Enter an existing customer email.
3. Enter an incorrect password.
4. Submit login.

## Expected Result
Application rejects login and displays an appropriate error without authenticating the user.

## Actual Result
Login with the correct password succeeded. Login with an incorrect password was rejected with the message: The credentials provided are incorrect.

**Status:** PASSED
**Execution Date:** 2026-11-03
**Evidence:** Browser output provided during manual execution; screenshot not saved.
**Bug ID:** N/A (pending execution)
