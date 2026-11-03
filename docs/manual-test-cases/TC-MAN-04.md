# TC-MAN-04
**Title:** Remove product from shopping cart
**Type:** Positive / Regression
**Priority:** High

## Precondition
nopCommerce is running at http://localhost:8081/
Shopping cart contains 2 Apple MacBook Pro items.

## Test Steps
1. Open the shopping cart.
2. Verify that Apple MacBook Pro is present.
3. Click the Remove button next to the product.
4. Check the shopping cart contents.

## Expected Result
Apple MacBook Pro is removed from the cart.
Message "Your Shopping Cart is empty!" is displayed.

**Actual Result:** Apple MacBook Pro was successfully removed from the shopping cart. The empty cart message was displayed.
**Status:** PASSED


**Execution Date:** Not recorded
**Bug ID:** N/A (no defect recorded)

## Step-level Expected Results

| Step | Expected observable result |
|---|---|
| 1 | Cart page opens |
| 2 | Apple MacBook Pro is listed |
| 3 | Item is removed |
| 4 | Empty-cart message is displayed |

Note: these expected outcomes are documented acceptance criteria, not newly claimed execution evidence. Existing execution dates remain unverified.
