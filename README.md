\# IT 3006 — Software Quality Assurance Final Assignment



\*\*Student:\*\* Ali Handan  

\*\*University:\*\* International Burch University  

\*\*Course:\*\* IT 3006 — Software Quality Assurance  

\*\*System Under Test:\*\* nopCommerce 4.90.8



\## Project Overview



This project demonstrates software quality assurance techniques through test planning, manual testing, UI automation, API testing, and unit testing.



The main application under test is nopCommerce, running locally using Docker and PostgreSQL.



\*\*Application URL:\*\* http://localhost:8081/



\## 1. Test Strategy and Regression Suite



The test strategy focuses on important e-commerce functionality, including product search, shopping cart operations, quantity validation, navigation, registration, and login.



\*\*Documentation:\*\*

\- `docs/test-strategy.md`

\- `docs/regression-suite.md`



The regression suite contains 15 manual test cases.



\## 2. Manual Testing



\*\*Test documentation:\*\*

\- `docs/manual-test-cases/` — 15 regression test cases

\- `docs/negative-test-cases/` — 4 additional negative test cases

\- `docs/defect-reports/defect-summary.md` — defect summary



All 15 regression test cases are recorded as PASSED. Their original execution dates were not recorded.



Four additional negative tests were executed on November 3, 2026:



| Test ID | Scenario | Result |

|---|---|---|

| TC-NEG-01 | Registration with invalid email | PASSED |

| TC-NEG-02 | Registration with mismatched passwords | PASSED |

| TC-NEG-03 | Login with incorrect password | PASSED |

| TC-NEG-04 | Registration with missing required fields | PASSED |



No confirmed defects were identified during these four additional negative test executions.



Browser output was reviewed, but screenshots were not saved.



\## 3. UI Automation — Playwright



\*\*Technologies:\*\* TypeScript, Playwright



The automated UI suite contains 10 test scenarios:

\- 5 smoke tests

\- 5 regression tests



Tests run in Chromium and Firefox.



\*\*Previous confirmed result:\*\* 20/20 browser-specific executions passed using one worker.



\### Run UI Tests



Install dependencies:



`npm install`



Run tests:



`npx playwright test --workers=1`



Open the HTML report:



`npx playwright show-report`



\## 4. API Testing



\*\*Technology:\*\* Playwright API testing



The project contains GitHub REST API tests in `api/github.spec.ts`.



The API suite uses a dedicated GitHub test repository and authenticated requests.



\*\*Previous confirmed result:\*\* 10/10 tests passed.



A valid `GITHUB\_TOKEN` environment variable is required.



\### Run API Tests



`npx playwright test --config=playwright.github-api.config.ts`



The project also includes a separate local API testing setup in `api-tests/`.



\## 5. Unit Testing



\*\*Technologies:\*\* PHP 8, PHPUnit 9.6, Xdebug 3



Unit tests cover an adapted, dependency-injected PHP `UserService` originally developed for a separate FlightPHP web programming project.



This unit test suite does not directly test nopCommerce source code.



\### Confirmed Results



| Metric | Result |

|---|---|

| Unit tests | 13 PASSED |

| Assertions | 42 |

| Line coverage | 92.86% (52/56) |

| Method coverage | 57.14% (4/7) |



\### Run Unit Tests



Navigate to the unit testing folder:



`cd unit-tests`



Install dependencies:



`composer install`



Execute tests:



`vendor/bin/phpunit tests/UserServiceTest.php`



Coverage measurement requires Xdebug.



\## 6. Project Structure



\- `docs/` — test strategy, regression suite, manual cases, negative cases, defect summary

\- `tests/` — automated Playwright UI tests

\- `api/` — GitHub REST API tests

\- `api-tests/` — local API tests

\- `api-server/` — local API server

\- `unit-tests/src/` — PHP service under test

\- `unit-tests/tests/` — PHPUnit tests

\- `playwright.config.ts` — UI automation configuration

\- `playwright.github-api.config.ts` — GitHub API testing configuration

\- `package.json` — Node.js project configuration



\## 7. Environment and Limitations



\- nopCommerce version: 4.90.8

\- Deployment: Local Docker environment

\- Database: PostgreSQL

\- UI automation browsers: Chromium and Firefox

\- UI tests were previously run serially because parallel execution caused intermittent failures.

\- Manual test execution evidence is limited.

\- GitHub REST API testing is separate from nopCommerce.

\- PHP unit testing covers an adapted service from a different project rather than nopCommerce business logic.

\- Reported results apply to the tested environments and execution dates.



\## Conclusion



The project demonstrates practical software testing techniques, including test strategy development, regression testing, negative testing, UI automation, API testing, unit testing, and code coverage analysis.



Test results and limitations are documented to support review and reproducibility.
