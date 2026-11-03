# TC-MAN-08
**Title:** Reject zero product quantity
**Type:** Negative / Regression
**Priority:** High

## Precondition
nopCommerce is running at http://localhost:8081/
Shopping cart is empty.

## Test Steps
1. Open Apple MacBook Pro product page.
2. Enter quantity 0.
3. Click Add to cart.
4. Observe the application's response.
5. Check the shopping cart quantity.

## Expected Result
The application rejects quantity 0.
A validation message is displayed.
The shopping cart remains empty (0).

**Actual Result:** The application rejected quantity 0, displayed a validation message, and the shopping cart remained empty (0).
**Status:** PASSED


**Execution Date:** Not recorded
**Bug ID:** N/A (no defect recorded)

## Step-level Expected Results

| Step | Expected observable result |
|---|---|
| 1 | MacBook page opens |
| 2 | Quantity field contains 0 |
| 3 | Add action is rejected |
| 4 | Validation appears |
| 5 | Cart count stays (0) |

Note: these expected outcomes are documented acceptance criteria, not newly claimed execution evidence. Existing execution dates remain unverified.
