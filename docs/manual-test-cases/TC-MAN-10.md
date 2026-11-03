# TC-MAN-10
**Title:** Add product with quantity 3
**Type:** Positive / Regression
**Priority:** High

## Precondition
nopCommerce is running at http://localhost:8081/
Shopping cart is empty.

## Test Steps
1. Open Apple MacBook Pro product page.
2. Enter quantity 3.
3. Click Add to cart.
4. Check the shopping cart quantity.
5. Open the shopping cart.
6. Verify that Apple MacBook Pro has quantity 3.

## Expected Result
Product is successfully added to the shopping cart.
Shopping cart displays (3).
Apple MacBook Pro quantity is 3.

**Actual Result:** Apple MacBook Pro was successfully added with quantity 3. The cart displayed (3), and the product quantity in the shopping cart was 3.
**Status:** PASSED


**Execution Date:** Not recorded
**Bug ID:** N/A (no defect recorded)

## Step-level Expected Results

| Step | Expected observable result |
|---|---|
| 1 | MacBook page opens |
| 2 | Quantity field contains 3 |
| 3 | Add succeeds |
| 4 | Cart count shows (3) |
| 5 | Cart page opens |
| 6 | Product line quantity equals 3 |

Note: these expected outcomes are documented acceptance criteria, not newly claimed execution evidence. Existing execution dates remain unverified.
