# Test Strategy — nopCommerce 4.90.8

**Course:** IT 3006 — Software Quality Assurance
**System Under Test:** nopCommerce 4.90.8
**Environment:** Local Docker deployment
**Application URL:** http://localhost:8081/
**Automation Framework:** Playwright with TypeScript
**Browsers:** Chromium and Firefox

## 1. Objective and Scope

The objective is to evaluate the reliability of selected nopCommerce storefront functions through manual and automated testing. The primary focus is on product discovery, product details, shopping cart operations, quantity validation, and selected customer account workflows.

The scope includes homepage loading, product search, category navigation, product sorting, product details, adding and removing products from the cart, changing quantities, registration, and login.

Payment processing, external integrations, performance testing, and security penetration testing are outside the current scope.

## 2. Testing Approach

A risk-based testing approach is used. Shopping cart operations and quantity validation receive high priority because defects in these functions can directly affect orders and calculated totals.

The project combines the following testing levels and techniques:

- Manual functional testing: 15 documented regression scenarios, including at least four negative scenarios.
- UI smoke testing: five automated scenarios covering essential storefront functionality.
- UI regression testing: five automated scenarios selected from the manual regression collection.
- Cross-browser testing: automated UI scenarios executed in Chromium and Firefox.
- API testing: GitHub REST API testing is used as the assignment-permitted alternative because the selected nopCommerce deployment does not expose a usable API endpoint.
- Unit testing: a separate previously developed web programming project will be used for unit-level verification.

Manual cases document preconditions, actions, expected outcomes, actual outcomes, and execution status. Automated tests use Playwright assertions to verify observable application behavior.

## 3. Regression Test Selection

Regression scenarios are selected based on business impact, frequency of use, validation risk, and previous functional coverage.

The five automated regression scenarios cover minimum quantity enforcement, nonexistent product search, empty search validation, cart quantity updates, and cart item removal.

A traceability mapping connects each automated regression scenario to its corresponding manual test case. The complete 15-case regression collection is maintained separately in `docs/regression-suite.md`.

## 4. Test Environment and Execution

The system runs locally in Docker with a nopCommerce web container and a PostgreSQL database container. Playwright tests run against `http://localhost:8081/`.

UI tests are executed in Chromium and Firefox. Tests currently use one worker to reduce interference and instability observed during parallel execution.

The most recent complete UI run passed all 20 browser-specific executions: 10 scenarios across two browsers. This result applies to the tested environment and does not establish that the application is defect-free.

Playwright HTML reports and failure traces support result inspection and debugging.

## 5. Entry and Exit Criteria

Entry criteria:
- The application and database containers are running.
- The storefront is reachable.
- Test data and required products are available.
- Test cases and expected outcomes are defined.

Exit criteria:
- Required manual and automated scenarios have been executed.
- Test results and available evidence are documented.
- Identified defects are recorded with reproducible steps.
- Outstanding limitations and unresolved issues are disclosed.
- Required deliverables and repository documentation are prepared.

## 6. Risks and Limitations

The local deployment may behave differently from production environments. Tests depend on seeded products, prices, page structure, and available browser resources.

Parallel execution previously produced intermittent UI failures; serial execution has been more reliable. This instability requires further investigation and must not automatically be classified as a confirmed nopCommerce defect.

A successful automated run demonstrates that the selected assertions passed under the tested conditions. It does not guarantee complete coverage or the absence of defects.

The project will document confirmed defects and distinguish them from environment or test automation issues.
