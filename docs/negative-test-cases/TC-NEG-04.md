# TC-NEG-04

**Title:** Registration with missing required fields
**Type:** Negative / Manual
**Priority:** High

## Precondition
nopCommerce is running at http://localhost:8081/.

## Test Steps
1. Open Register page.
2. Leave required fields empty.
3. Submit registration.

## Expected Result
Application prevents registration and displays required-field validation messages.

## Actual Result
Registration was rejected. Required-field validation messages were displayed for first name, last name, email and password.

**Status:** PASSED
**Execution Date:** 2026-11-03
**Evidence:** Browser output provided during manual execution; screenshot not saved.
**Bug ID:** N/A (pending execution)
