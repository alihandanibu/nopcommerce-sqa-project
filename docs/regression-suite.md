# Regression Test Suite — nopCommerce 4.90.8

**Course:** IT 3006 — Software Quality Assurance
**System Under Test:** nopCommerce 4.90.8
**Application URL:** http://localhost:8081/
**Total Manual Cases:** 15
**Automated Regression Cases:** 5
**Automation Framework:** Playwright / TypeScript

## 1. Purpose

This regression suite verifies that essential nopCommerce storefront functionality continues to work after changes to the application or test environment.

The suite prioritizes product discovery, shopping cart operations, input validation, and customer account functionality.

## 2. Regression Test Cases

| ID | Test Scenario | Type | Priority | Automated Regression |
|---|---|---|---|---|
| TC-MAN-01 | Verify homepage loads successfully | Positive | High | No |
| TC-MAN-02 | Search for an existing product | Positive | High | No |
| TC-MAN-03 | Add product to shopping cart | Positive | High | No |
| TC-MAN-04 | Remove product from shopping cart | Positive | High | TC-AUTO-09 |
| TC-MAN-05 | Reject product quantity below minimum | Negative | High | TC-AUTO-04 |
| TC-MAN-06 | Search for nonexistent product | Negative | Medium | TC-AUTO-06 |
| TC-MAN-07 | Search with empty input | Negative | Medium | TC-AUTO-10 |
| TC-MAN-08 | Reject zero product quantity | Negative | High | No |
| TC-MAN-09 | Verify product details page | Positive | Medium | No |
| TC-MAN-10 | Add product with quantity 3 | Positive | High | No |
| TC-MAN-11 | Update product quantity in shopping cart | Positive | High | TC-AUTO-08 |
| TC-MAN-12 | Verify product category navigation | Positive | Medium | No |
| TC-MAN-13 | Sort products by price (low to high) | Positive | Medium | No |
| TC-MAN-14 | Register a new customer account | Positive | High | No |
| TC-MAN-15 | Login with valid customer credentials | Positive | High | No |

## 3. Automation Traceability

| Automated Test | Manual Test | Verification |
|---|---|---|
| TC-AUTO-04 | TC-MAN-05 | Minimum quantity validation |
| TC-AUTO-06 | TC-MAN-06 | No results for nonexistent product |
| TC-AUTO-08 | TC-MAN-11 | Quantity update from 3 to 4 and total recalculation |
| TC-AUTO-09 | TC-MAN-04 | Product removal from cart |
| TC-AUTO-10 | TC-MAN-07 | Empty search input validation |

Five additional automated smoke scenarios verify basic storefront availability and core customer actions.

## 4. Execution and Evidence

All 15 manual test cases have recorded PASS statuses. Their execution dates have not yet been recorded and require verification.

The latest complete Playwright UI run passed 20 of 20 browser-specific executions (10 scenarios in Chromium and Firefox), using one worker.

Automated results are available through Playwright HTML reports. Manual execution details are stored in `docs/manual-test-cases/`.

## 5. Selection Rationale

High-priority scenarios focus on cart operations and quantity validation because they can affect order accuracy and customer experience.

Negative scenarios verify that invalid input is rejected appropriately.

The selected automated regression tests provide coverage of important validation and cart operations without duplicating all manual cases.

## 6. Limitations

The suite covers selected storefront functions rather than the entire nopCommerce platform.

The current UI automation uses serial execution because intermittent failures were observed during parallel execution.

Passing results apply to the tested application version, data, and local environment.


## 2a. Individual Selection Rationale

| Test case | Why selected |
|---|---|
| TC-MAN-01 | Reaches the landing page used by every customer journey. |
| TC-MAN-02 | Product discovery is a frequent, business-critical flow. |
| TC-MAN-03 | Cart creation enables checkout and order conversion. |
| TC-MAN-04 | Customers must be able to undo purchases before checkout. |
| TC-MAN-05 | Minimum purchase restrictions protect catalog/business rules. |
| TC-MAN-06 | Unmatched search terms must produce honest no-results feedback. |
| TC-MAN-07 | Blank searches should not submit meaningless requests. |
| TC-MAN-08 | Zero quantity is a boundary case that must be rejected. |
| TC-MAN-09 | Product details and availability influence purchase decisions. |
| TC-MAN-10 | Multiple-unit cart entry checks valid quantity handling. |
| TC-MAN-11 | Cart quantity updates affect order total and correctness. |
| TC-MAN-12 | Category navigation supports browsing and discovery. |
| TC-MAN-13 | Price sorting affects product comparison and choice. |
| TC-MAN-14 | Registration is a critical persistent account-state transition. |
| TC-MAN-15 | Login enables returning users to access their accounts. |
