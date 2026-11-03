# TC-MAN-12
**Title:** Verify product category navigation
**Type:** Positive / Regression
**Priority:** Medium

## Precondition
nopCommerce is running at http://localhost:8081/

## Test Steps
1. Open the homepage.
2. Click Computers in the navigation menu.
3. Verify that the Computers category page opens.
4. Click Notebooks.
5. Verify that the Notebooks category page opens.
6. Verify that products are displayed.

## Expected Result
Computers category opens successfully.
Notebooks subcategory opens successfully.
Products are displayed without errors.

**Actual Result:** Computers and Notebooks categories opened successfully. Products were displayed correctly without errors.
**Status:** PASSED


**Execution Date:** Not recorded
**Bug ID:** N/A (no defect recorded)

## Step-level Expected Results

| Step | Expected observable result |
|---|---|
| 1 | Homepage opens |
| 2 | Computers category is selected |
| 3 | Computers page is visible |
| 4 | Notebooks category is selected |
| 5 | Notebooks page is visible |
| 6 | Catalog items are present |

Note: these expected outcomes are documented acceptance criteria, not newly claimed execution evidence. Existing execution dates remain unverified.
