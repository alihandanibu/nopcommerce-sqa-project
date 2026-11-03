# TC-MAN-05
**Title:** Reject product quantity below minimum
**Type:** Negative / Regression
**Priority:** High

## Precondition
nopCommerce is running at http://localhost:8081/
Shopping cart is empty.

## Test Steps
1. Open Apple MacBook Pro product page.
2. Enter quantity 1.
3. Click Add to cart.
4. Observe the validation message.
5. Check the shopping cart quantity.

## Expected Result
The application displays:
"The minimum quantity allowed for purchase is 2."
Product is not added to the cart.
Shopping cart remains empty (0).

**Actual Result:** The application displayed the minimum quantity validation message and rejected quantity 1. Shopping cart remained empty (0).
**Status:** PASSED


**Execution Date:** Not recorded
**Bug ID:** N/A (no defect recorded)

## Step-level Expected Results

| Step | Expected observable result |
|---|---|
| 1 | MacBook page opens |
| 2 | Quantity field contains 1 |
| 3 | Add is rejected |
| 4 | Minimum-quantity warning is shown |
| 5 | Cart count stays (0) |

Note: these expected outcomes are documented acceptance criteria, not newly claimed execution evidence. Existing execution dates remain unverified.
