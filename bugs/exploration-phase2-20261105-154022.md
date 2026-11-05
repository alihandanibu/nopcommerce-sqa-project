# Exploratory testing: registration, login, sorting and cart

Execution date: 2026-11-05 15:42:23 (local time)
SUT: nopCommerce 4.90.8, locally hosted at http://localhost:8081/
Automation: Playwright; isolated browser contexts; Chromium and Firefox.

Playwright exit code: 1. JSON records: 20; screenshots: 20.
A PASS indicates an asserted expectation was observed; OBSERVED denotes exploratory evidence without a binary product-correctness verdict; REVIEW requires investigation. No bug is automatically confirmed.

| ID | Browser | Input | Verdict | Actual observation | Evidence |
|---|---|---|---|---|---|
| EX-11 | chromium | name=Sqa Tester, email=invalid-email, password=Password123! | PASS | email validation visible; URL=http://localhost:8081/register | [JSON](evidence/20261105-154022/EX-11-chromium.json), [image](evidence/20261105-154022/EX-11-chromium.png) |
| EX-11 | firefox | name=Sqa Tester, email=invalid-email, password=Password123! | PASS | email validation visible; URL=http://localhost:8081/register | [JSON](evidence/20261105-154022/EX-11-firefox.json), [image](evidence/20261105-154022/EX-11-firefox.png) |
| EX-12 | chromium | email=sqa-mismatch@example.invalid, password=Password123!, confirm=Different123! | PASS | mismatch validation visible; URL=http://localhost:8081/register | [JSON](evidence/20261105-154022/EX-12-chromium.json), [image](evidence/20261105-154022/EX-12-chromium.png) |
| EX-12 | firefox | email=sqa-mismatch@example.invalid, password=Password123!, confirm=Different123! | PASS | mismatch validation visible; URL=http://localhost:8081/register | [JSON](evidence/20261105-154022/EX-12-firefox.json), [image](evidence/20261105-154022/EX-12-firefox.png) |
| EX-13 | chromium | register form submitted with required fields empty | PASS | validations=First name is required. \| Last name is required. \| Email is required. \| Password is required.; URL=http://localhost:8081/register | [JSON](evidence/20261105-154022/EX-13-chromium.json), [image](evidence/20261105-154022/EX-13-chromium.png) |
| EX-13 | firefox | register form submitted with required fields empty | PASS | validations=First name is required. \| Last name is required. \| Email is required. \| Password is required.; URL=http://localhost:8081/register | [JSON](evidence/20261105-154022/EX-13-firefox.json), [image](evidence/20261105-154022/EX-13-firefox.png) |
| EX-14 | chromium | email=sqa-nonexistent@example.invalid, incorrect password | PASS | login rejected; message=Login was unsuccessful. Please correct the errors and try again. No customer account found | [JSON](evidence/20261105-154022/EX-14-chromium.json), [image](evidence/20261105-154022/EX-14-chromium.png) |
| EX-14 | firefox | email=sqa-nonexistent@example.invalid, incorrect password | PASS | login rejected; message=Login was unsuccessful. Please correct the errors and try again. No customer account found | [JSON](evidence/20261105-154022/EX-14-firefox.json), [image](evidence/20261105-154022/EX-14-firefox.png) |
| EX-15 | chromium | login email and password empty | PASS | blank-login errors=Please enter your email | [JSON](evidence/20261105-154022/EX-15-chromium.json), [image](evidence/20261105-154022/EX-15-chromium.png) |
| EX-15 | firefox | login email and password empty | PASS | blank-login errors=Please enter your email | [JSON](evidence/20261105-154022/EX-15-firefox.json), [image](evidence/20261105-154022/EX-15-firefox.png) |
| EX-16 | chromium | /computers then /notebooks | PASS | Notebooks page loaded; 6 product cards; URL=http://localhost:8081/notebooks | [JSON](evidence/20261105-154022/EX-16-chromium.json), [image](evidence/20261105-154022/EX-16-chromium.png) |
| EX-16 | firefox | /computers then /notebooks | PASS | Notebooks page loaded; 6 product cards; URL=http://localhost:8081/notebooks | [JSON](evidence/20261105-154022/EX-16-firefox.json), [image](evidence/20261105-154022/EX-16-firefox.png) |
| EX-17 | chromium | notebooks sort Price: Low to High | REVIEW | URL=http://localhost:8081/notebooks?viewmode=grid&orderby=10&pagesize=6; messages= | [JSON](evidence/20261105-154022/EX-17-chromium.json), [image](evidence/20261105-154022/EX-17-chromium.png) |
| EX-17 | firefox | notebooks sort Price: Low to High | REVIEW | URL=http://localhost:8081/notebooks?viewmode=grid&orderby=10&pagesize=6; messages= | [JSON](evidence/20261105-154022/EX-17-firefox.json), [image](evidence/20261105-154022/EX-17-firefox.png) |
| EX-18 | chromium | notebooks sort Price: High to Low | REVIEW | URL=http://localhost:8081/notebooks?viewmode=grid&orderby=11&pagesize=6; messages= | [JSON](evidence/20261105-154022/EX-18-chromium.json), [image](evidence/20261105-154022/EX-18-chromium.png) |
| EX-18 | firefox | notebooks sort Price: High to Low | REVIEW | URL=http://localhost:8081/notebooks?viewmode=grid&orderby=11&pagesize=6; messages= | [JSON](evidence/20261105-154022/EX-18-firefox.json), [image](evidence/20261105-154022/EX-18-firefox.png) |
| EX-19 | chromium | new session; add 3 MacBooks, increase cart quantity by 1 | PASS | cart=(4); initial total=$5,400.00; updated total=$7,200.00 | [JSON](evidence/20261105-154022/EX-19-chromium.json), [image](evidence/20261105-154022/EX-19-chromium.png) |
| EX-19 | firefox | new session; add 3 MacBooks, increase cart quantity by 1 | PASS | cart=(4); initial total=$5,400.00; updated total=$7,200.00 | [JSON](evidence/20261105-154022/EX-19-firefox.json), [image](evidence/20261105-154022/EX-19-firefox.png) |
| EX-20 | chromium | query=@#$%^&* | OBSERVED | dialog=(none); URL=http://localhost:8081/search?q=%40%23%24%25%5E%26*; page excerpts=              Search                                                       ... | [JSON](evidence/20261105-154022/EX-20-chromium.json), [image](evidence/20261105-154022/EX-20-chromium.png) |
| EX-20 | firefox | query=@#$%^&* | OBSERVED | dialog=(none); URL=http://localhost:8081/search?q=%40%23%24%25%5E%26*; page excerpts=              Search                                                       ... | [JSON](evidence/20261105-154022/EX-20-firefox.json), [image](evidence/20261105-154022/EX-20-firefox.png) |

### Limitations
- Negative account tests do not create valid accounts and do not validate the complete successful signup/login flow.
- Sorting checks the visible first-page product prices, not all database products or pagination.
- Local seed data, validation messages and DOM may differ in another nopCommerce installation.
- Any REVIEW or unexpected behavior requires manual reproduction before filing a bug report.
