# TC-MAN-07
**Title:** Search with empty input
**Type:** Negative / Regression
**Priority:** Medium

## Precondition
nopCommerce is running at http://localhost:8081/

## Test Steps
1. Open the homepage.
2. Leave the search field empty.
3. Click the Search button.
4. Observe the validation message.
5. Check whether the homepage remains open.

## Expected Result
The application displays a warning:
"Please enter some search keyword"
The search is not performed.
The user remains on the homepage.

**Actual Result:** The application displayed the expected warning for empty search input. After closing the warning, the user remained on the homepage.
**Status:** PASSED


**Execution Date:** Not recorded
**Bug ID:** N/A (no defect recorded)

## Step-level Expected Results

| Step | Expected observable result |
|---|---|
| 1 | Homepage opens |
| 2 | Search field remains empty |
| 3 | Validation is triggered |
| 4 | Warning dialog appears |
| 5 | Homepage remains open |

Note: these expected outcomes are documented acceptance criteria, not newly claimed execution evidence. Existing execution dates remain unverified.
