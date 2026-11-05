# Phase 2 - Exploratory Testing Report

Date: November 5, 2026
System: nopCommerce 4.90.8
Browsers: Chromium and Firefox
Execution: 20 tests, 18 PASS and 2 OBSERVED

## Recorded evidence

| Test | Browser | Result | Actual observation | Evidence |
|---|---|---|---|---|
| EX-11 | chromium | PASS | email validation visible; URL=http://localhost:8081/register | [JSON](evidence/20261105-162926/EX-11-chromium.json), [Screenshot](evidence/20261105-162926/EX-11-chromium.png) |
| EX-11 | firefox | PASS | email validation visible; URL=http://localhost:8081/register | [JSON](evidence/20261105-162926/EX-11-firefox.json), [Screenshot](evidence/20261105-162926/EX-11-firefox.png) |
| EX-12 | chromium | PASS | mismatch validation visible; URL=http://localhost:8081/register | [JSON](evidence/20261105-162926/EX-12-chromium.json), [Screenshot](evidence/20261105-162926/EX-12-chromium.png) |
| EX-12 | firefox | PASS | mismatch validation visible; URL=http://localhost:8081/register | [JSON](evidence/20261105-162926/EX-12-firefox.json), [Screenshot](evidence/20261105-162926/EX-12-firefox.png) |
| EX-13 | chromium | PASS | validations=First name is required. / Last name is required. / Email is required. / Password is required.; URL=http://localhost:8081/register | [JSON](evidence/20261105-162926/EX-13-chromium.json), [Screenshot](evidence/20261105-162926/EX-13-chromium.png) |
| EX-13 | firefox | PASS | validations=First name is required. / Last name is required. / Email is required. / Password is required.; URL=http://localhost:8081/register | [JSON](evidence/20261105-162926/EX-13-firefox.json), [Screenshot](evidence/20261105-162926/EX-13-firefox.png) |
| EX-14 | chromium | PASS | login rejected; message=Login was unsuccessful. Please correct the errors and try again. No customer account found | [JSON](evidence/20261105-162926/EX-14-chromium.json), [Screenshot](evidence/20261105-162926/EX-14-chromium.png) |
| EX-14 | firefox | PASS | login rejected; message=Login was unsuccessful. Please correct the errors and try again. No customer account found | [JSON](evidence/20261105-162926/EX-14-firefox.json), [Screenshot](evidence/20261105-162926/EX-14-firefox.png) |
| EX-15 | chromium | PASS | blank-login errors=Please enter your email | [JSON](evidence/20261105-162926/EX-15-chromium.json), [Screenshot](evidence/20261105-162926/EX-15-chromium.png) |
| EX-15 | firefox | PASS | blank-login errors=Please enter your email | [JSON](evidence/20261105-162926/EX-15-firefox.json), [Screenshot](evidence/20261105-162926/EX-15-firefox.png) |
| EX-16 | chromium | PASS | Notebooks page loaded; 6 product cards; URL=http://localhost:8081/notebooks | [JSON](evidence/20261105-162926/EX-16-chromium.json), [Screenshot](evidence/20261105-162926/EX-16-chromium.png) |
| EX-16 | firefox | PASS | Notebooks page loaded; 6 product cards; URL=http://localhost:8081/notebooks | [JSON](evidence/20261105-162926/EX-16-firefox.json), [Screenshot](evidence/20261105-162926/EX-16-firefox.png) |
| EX-17 | chromium | PASS | option=Price: Low to High; prices=1350, 1360, 1460, 1500, 1590, 1800; URL=http://localhost:8081/notebooks?viewmode=grid&orderby=10&pagesize=6 | [JSON](evidence/20261105-162926/EX-17-chromium.json), [Screenshot](evidence/20261105-162926/EX-17-chromium.png) |
| EX-17 | firefox | PASS | option=Price: Low to High; prices=1350, 1360, 1460, 1500, 1590, 1800; URL=http://localhost:8081/notebooks?viewmode=grid&orderby=10&pagesize=6 | [JSON](evidence/20261105-162926/EX-17-firefox.json), [Screenshot](evidence/20261105-162926/EX-17-firefox.png) |
| EX-18 | chromium | PASS | option=Price: High to Low; prices=1800, 1590, 1500, 1460, 1360, 1350; URL=http://localhost:8081/notebooks?viewmode=grid&orderby=11&pagesize=6 | [JSON](evidence/20261105-162926/EX-18-chromium.json), [Screenshot](evidence/20261105-162926/EX-18-chromium.png) |
| EX-18 | firefox | PASS | option=Price: High to Low; prices=1800, 1590, 1500, 1460, 1360, 1350; URL=http://localhost:8081/notebooks?viewmode=grid&orderby=11&pagesize=6 | [JSON](evidence/20261105-162926/EX-18-firefox.json), [Screenshot](evidence/20261105-162926/EX-18-firefox.png) |
| EX-19 | chromium | PASS | cart=(4); initial total=$5,400.00; updated total=$7,200.00 | [JSON](evidence/20261105-162926/EX-19-chromium.json), [Screenshot](evidence/20261105-162926/EX-19-chromium.png) |
| EX-19 | firefox | PASS | cart=(4); initial total=$5,400.00; updated total=$7,200.00 | [JSON](evidence/20261105-162926/EX-19-firefox.json), [Screenshot](evidence/20261105-162926/EX-19-firefox.png) |
| EX-20 | chromium | OBSERVED | dialog=(none); URL=http://localhost:8081/search?q=%40%23%24%25%5E%26*; page excerpts=              Search                                                                           ... | [JSON](evidence/20261105-162926/EX-20-chromium.json), [Screenshot](evidence/20261105-162926/EX-20-chromium.png) |
| EX-20 | firefox | OBSERVED | dialog=(none); URL=http://localhost:8081/search?q=%40%23%24%25%5E%26*; page excerpts=              Search                                                                           ... | [JSON](evidence/20261105-162926/EX-20-firefox.json), [Screenshot](evidence/20261105-162926/EX-20-firefox.png) |

## Investigation of sorting failures

Initial EX-17 and EX-18 tests failed in both browsers.
The synchronization of the automated test was investigated and corrected.
Independent diagnostics confirmed correct price sorting in both directions.
The corrected tests passed in Chromium and Firefox.

No reproducible nopCommerce product defect was confirmed.
Two observation-only scenarios require interpretation rather than a PASS claim.
