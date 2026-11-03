# IT 3006 — Software Quality Assurance Final Assignment



**Student:** Ali Handan  

**University:** International Burch University  

**Course:** IT 3006 — Software Quality Assurance  

**System Under Test:** nopCommerce 4.90.8



## Project Overview



This project demonstrates software quality assurance techniques through test planning, manual testing, UI automation, API testing, and unit testing.



The main application under test is nopCommerce, running locally using Docker and PostgreSQL.



**Application URL:** http://localhost:8081/



## 1. Test Strategy and Regression Suite



The test strategy focuses on important e-commerce functionality, including product search, shopping cart operations, quantity validation, navigation, registration, and login.



**Documentation:**

- `docs/test-strategy.md`

- `docs/regression-suite.md`



The regression suite contains 15 manual test cases.



## 2. Manual Testing



**Test documentation:**

- `docs/manual-test-cases/` — 15 regression test cases

- `docs/negative-test-cases/` — 4 additional negative test cases

- `bugs/` — exploration log, confirmed bug reports and template



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



## 3. UI Automation — Playwright



**Technologies:** TypeScript, Playwright



The automated UI suite contains 10 test scenarios:

- 5 smoke tests

- 5 regression tests



Tests run in Chromium and Firefox.



**Previous confirmed result:** 20/20 browser-specific executions passed using one worker.



### Run UI Tests



Install dependencies:



`npm install`



Run tests:



`npx playwright test --workers=1`



Open the HTML report:



`npx playwright show-report`



## 4. API Testing



**Technology:** Playwright API testing



The project contains GitHub REST API tests in `api/github.spec.ts`.



The API suite uses a dedicated GitHub test repository and authenticated requests.



**Previous confirmed result:** 10/10 tests passed.



A valid `GITHUB_TOKEN` environment variable is required.



### Run API Tests



`npx playwright test --config=playwright.github-api.config.ts`



The project also includes a separate local API testing setup in `api-tests/`.



## 5. Unit Testing

**Original web programming project:**
https://github.com/alihandanibu/web-programming

**Unit test directory:**
https://github.com/alihandanibu/web-programming/tree/main/sqa-unit-tests

The tests exercise the original `backend/services/UserService.php`.
Database and authentication dependencies are replaced by test doubles.

### Verified Results - November 3, 2026

| Metric | Result |
|---|---|
| Framework | PHPUnit 9.6.38 |
| Tests | 25 PASSED |
| Assertions | 61 |
| Line coverage | 82.28% (130/158) |
| Method coverage | 42.86% (3/7) |
| Coverage driver | Xdebug 3.5.3 |

### Run Unit Tests

Clone the original project and install dependencies:

~~~powershell
git clone https://github.com/alihandanibu/web-programming.git
cd web-programming/sqa-unit-tests
composer install
php vendor/phpunit/phpunit/phpunit tests/UserServiceTest.php
~~~

### Code Coverage

Run with a compatible Xdebug extension enabled.

~~~powershell
php -d "zend_extension=C:\xampp\php\ext\php_xdebug-3.5.3-8.0-ts-vs16-x86_64.dll" -d "xdebug.mode=coverage" vendor/phpunit/phpunit/phpunit tests/UserServiceTest.php --coverage-filter ../backend/services/UserService.php --coverage-text
~~~

Coverage shows which executable lines were reached by the tests.
It does not prove that the entire application is correct.

Full report:
https://github.com/alihandanibu/web-programming/blob/main/sqa-unit-tests/COVERAGE.md

The older `unit-tests/` folder in this SQA repository contains
historical tests of an adapted service. The graded Part 4b tests
are maintained in the original web-programming repository.

## 6. Project Structure



- `docs/` — test strategy, regression suite, manual cases, negative cases, defect summary

- `e2e/` — automated Playwright UI tests

- `api/` — GitHub REST API tests

- `api-tests/` — local API tests

- `api-server/` — local API server

- `unit-tests/src/` — PHP service under test

- `unit-tests/tests/` — PHPUnit tests

- `playwright.config.ts` — UI automation configuration

- `playwright.github-api.config.ts` — GitHub API testing configuration

- `package.json` — Node.js project configuration



## 7. Environment and Limitations



- nopCommerce version: 4.90.8

- Deployment: Local Docker environment

- Database: PostgreSQL

- UI automation browsers: Chromium and Firefox

- UI tests were previously run serially because parallel execution caused intermittent failures.

- Manual test execution evidence is limited.

- GitHub REST API testing is separate from nopCommerce.

- PHP unit testing covers an adapted service from a different project rather than nopCommerce business logic.

- Reported results apply to the tested environments and execution dates.



## Conclusion



The project demonstrates practical software testing techniques, including test strategy development, regression testing, negative testing, UI automation, API testing, unit testing, and code coverage analysis.



Test results and limitations are documented to support review and reproducibility.

## Complete setup for independent grading

### Prerequisites and SUT

Install Git, Node.js, npm, Docker Desktop, Playwright Chromium/Firefox, PHP 8+, Composer, and Xdebug only for coverage. The tested SUT is **nopCommerce 4.90.8**, accessible locally at `http://localhost:8081/`, backed by PostgreSQL, with **sample data enabled**.

**Important reproducibility limit:** The SQA repository does not yet include a complete runnable nopCommerce Docker Compose definition or a pinned deployment script. The lecturer must separately obtain and configure a compatible nopCommerce 4.90.8 environment (the assignment's Appendix A has a sample setup). Confirm these exact application settings before testing: Apple MacBook Pro exists at `/apple-macbook-pro`, its minimum order quantity is **2**, and it has product ID **4**. The UI suite is environment-dependent and fails when these differ. Do not claim a portable one-command setup until it is actually demonstrated.

### Clone and install

```powershell
git clone https://github.com/alihandanibu/nopcommerce-sqa-project.git
cd nopcommerce-sqa-project
npm ci
npx playwright install chromium firefox
```

### Run E2E tests (requires SUT at localhost:8081)

```powershell
npx playwright test --config=playwright.config.ts --workers=1
npx playwright test --config=playwright.config.ts --grep @smoke --workers=1
npx playwright test --config=playwright.config.ts --grep @regression --workers=1
npx playwright show-report
```

UI files live in `e2e/`; screenshots and traces are retained on failure; HTML report is generated locally and intentionally excluded from Git.

### Run GitHub API tests (separate permitted API fallback)

Create a private test repository called `sqa-api-testing` owned by `alihandanibu`, and obtain a **fine-grained GitHub token** with suitable repository metadata and Issues read/write permissions. Do not store the token in source control. The tests create and close temporary issues and comments. Use the repository only for test data. In PowerShell:

```powershell
$env:GITHUB_TOKEN = gh auth token
npx playwright test --config=playwright.github-api.config.ts --workers=1
Remove-Item Env:GITHUB_TOKEN
npx playwright show-report github-api-report
```

If the examiner is not logged into the same GitHub account, they must **adapt the hard-coded owner/repo** in `api/github.spec.ts` and use an authorized token in a private test repository. Simply copying this README is not yet a fully independent API setup. Never paste token output or commit `.env`.

### Unit tests — previous web project

**Original project:** https://github.com/alihandanibu/web-programming

**Correct source:** `backend/services/UserService.php` in that original repo. Add and run the `sqa-unit-tests/` suite there as required by Part 4b; use that repository's README for exact commands and actual measured coverage. The `unit-tests/` folder in this SQA repository contains an earlier **adapted** UserService and its previous 13-test result; it does not independently prove the original web project passes. Do not use the historical 92.86% coverage figure as a measurement of the original service.

### Manual, defect and evidence review

- Read `docs/test-strategy.md` and `docs/regression-suite.md`.
- Review the 15 files in `docs/manual-test-cases/` and the four extra cases in `docs/negative-test-cases/`.
- Check step-level expected results and verify all dated pass/fail records with actual browser execution.
- Read `bugs/exploration-log.md`; record confirmed reproducible bugs individually in `bugs/BUG-001.md` etc. with screenshots or sanitized logs.

### How to contribute

1. Create a feature branch rather than pushing to main during review.
2. Give every new test a unique ID, a precondition, a repeatable setup and a meaningful assertion.
3. Run relevant tests in both browsers and verify they do not depend on other tests.
4. Keep secrets and generated reports out of Git; attach reproducible evidence for confirmed defects.
5. Open a pull request describing what was changed and what was actually run.

### Submission checks

- [ ] Instructor and assistant have confirmed read access to repository.
- [ ] Date and evidence for manual test executions are verified and documented.
- [ ] Exploration log is completed; only genuine defects are filed in `/bugs/`.
- [x] Original `web-programming` repository has its own passing unit suite, coverage output and link.
- [ ] New `e2e/` tests pass after this restructuring in both browsers.
- [ ] Another person can reproduce the local SUT environment and both API credentials/test repository setup.
- [ ] The repository URL is submitted via LMS and the submission receipt is visible.