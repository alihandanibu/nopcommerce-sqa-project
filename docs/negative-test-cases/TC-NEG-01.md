# TC-NEG-01

**Title:** Registration with invalid email
**Type:** Negative / Manual
**Priority:** High

## Precondition
nopCommerce is running at http://localhost:8081/.

## Test Steps
1. Open Register page.
2. Fill all required fields with valid values except email.
3. Enter invalid email: invalid-email.
4. Submit registration.

## Expected Result
Application rejects the invalid email and displays a validation message.

## Actual Result
Registration was rejected. The application displayed 'Please enter a valid email address.' No other required-field validation errors were displayed.

**Status:** PASSED
**Execution Date:** 2026-11-03
**Evidence:** Browser output supplied during manual execution; no screenshot saved.
**Bug ID:** N/A (pending execution)
