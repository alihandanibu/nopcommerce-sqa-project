# TC-MAN-11
**Title:** Update product quantity in shopping cart
**Type:** Positive / Regression
**Priority:** High

## Precondition
nopCommerce is running at http://localhost:8081/
Apple MacBook Pro is already in the shopping cart with quantity 3.

## Test Steps
1. Open the shopping cart.
2. Find Apple MacBook Pro.
3. Change the quantity from 3 to 4.
4. Click Update shopping cart if required.
5. Verify the product quantity.
6. Verify that the shopping cart total is updated.

## Expected Result
Apple MacBook Pro quantity changes from 3 to 4.
The shopping cart total is recalculated correctly.
No validation errors are displayed.

**Actual Result:** Apple MacBook Pro quantity was successfully updated from 3 to 4. The shopping cart total was recalculated correctly, and no validation errors appeared.
**Status:** PASSED


**Execution Date:** Not recorded
**Bug ID:** N/A (no defect recorded)

## Step-level Expected Results

| Step | Expected observable result |
|---|---|
| 1 | Cart page opens |
| 2 | MacBook line is present |
| 3 | Quantity input is set to 4 |
| 4 | Update action applies if required |
| 5 | Cart quantity reads 4 |
| 6 | Displayed total reflects new quantity |

Note: these expected outcomes are documented acceptance criteria, not newly claimed execution evidence. Existing execution dates remain unverified.
