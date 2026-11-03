# Defect Summary

**Course:** IT 3006 - Software Quality Assurance
**System Under Test:** nopCommerce 4.90.8
**Environment:** Local Docker deployment
**Test Date:** 2026-11-03

## Negative Test Execution

| Test ID | Scenario | Result |
|---|---|---|
| TC-NEG-01 | Invalid registration email | PASSED |
| TC-NEG-02 | Mismatched registration passwords | PASSED |
| TC-NEG-03 | Incorrect login password | PASSED |
| TC-NEG-04 | Missing required registration fields | PASSED |

## Confirmed Defects

No confirmed defects were identified during these four negative test executions.

## Observations

The application displayed appropriate validation messages and rejected invalid input.

## Limitations

This summary covers the four additional negative tests only.
It does not establish that the entire application is defect-free.

Manual browser output was reviewed; screenshots were not saved.
