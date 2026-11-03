# TC-MAN-06
**Title:** Search for nonexistent product
**Type:** Negative / Regression
**Priority:** Medium

## Precondition
nopCommerce is running at http://localhost:8081/

## Test Steps
1. Open the homepage.
2. Enter XYZNONEXISTENT98765 in the search field.
3. Click Search.
4. Observe the search results.

## Expected Result
The application displays:
"No products were found that matched your criteria."
No products are displayed in the search results.

**Actual Result:** The application displayed the expected no-products-found message. No matching products were shown.
**Status:** PASSED


**Execution Date:** Not recorded
**Bug ID:** N/A (no defect recorded)

## Step-level Expected Results

| Step | Expected observable result |
|---|---|
| 1 | Homepage opens |
| 2 | Search field contains unmatched string |
| 3 | Search is processed |
| 4 | No products found message appears |

Note: these expected outcomes are documented acceptance criteria, not newly claimed execution evidence. Existing execution dates remain unverified.
