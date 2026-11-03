# TC-MAN-03
**Title:** Add product to shopping cart
**Type:** Positive / Regression
**Priority:** High

## Precondition
nopCommerce is running at http://localhost:8081/
Shopping cart is empty.

## Test Steps
1. Open the homepage.
2. Search for MacBook.
3. Open Apple MacBook Pro.
4. Set quantity to 2.
5. Click Add to cart.
6. Check the shopping cart quantity.

## Expected Result
Product is added successfully.
Shopping cart displays (2).

**Actual Result:** Apple MacBook Pro was successfully added to the shopping cart with quantity 2. Cart displayed (2).
**Status:** PASSED


**Execution Date:** Not recorded
**Bug ID:** N/A (no defect recorded)

## Step-level Expected Results

| Step | Expected observable result |
|---|---|
| 1 | Homepage is shown |
| 2 | Search results contain MacBook |
| 3 | Apple MacBook Pro page opens |
| 4 | Quantity field contains 2 |
| 5 | Add to cart succeeds |
| 6 | Cart count becomes (2) |

Note: these expected outcomes are documented acceptance criteria, not newly claimed execution evidence. Existing execution dates remain unverified.
