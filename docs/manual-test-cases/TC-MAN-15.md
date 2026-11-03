# TC-MAN-15
**Title:** Login with valid customer credentials
**Type:** Positive / Regression
**Priority:** High

## Precondition
nopCommerce is running at http://localhost:8081/
A registered customer account exists.
User is logged out.

## Test Steps
1. Open the homepage.
2. Click Log in.
3. Enter the registered customer email.
4. Enter the correct password.
5. Click Log in.
6. Verify that login is successful.
7. Verify that My account and Log out are visible.

## Expected Result
Customer logs in successfully.
My account and Log out links are displayed.
No authentication errors appear.

**Actual Result:** Customer successfully logged in using valid registered credentials. My account and Log out links were displayed without authentication errors.
**Status:** PASSED


**Execution Date:** Not recorded
**Bug ID:** N/A (no defect recorded)

## Step-level Expected Results

| Step | Expected observable result |
|---|---|
| 1 | Homepage opens |
| 2 | Login form opens |
| 3 | Registered email is entered |
| 4 | Correct password is entered |
| 5 | Login is submitted |
| 6 | User is authenticated |
| 7 | My account and Log out are visible |

Note: these expected outcomes are documented acceptance criteria, not newly claimed execution evidence. Existing execution dates remain unverified.
