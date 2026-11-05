# nopCommerce SUT - Docker Setup

## Verified environment - November 5, 2026
- Application: nopCommerce 4.90.8
- Database: PostgreSQL 16
- Runtime: Docker Desktop with WSL2
- URL: http://localhost:8081/
- Browsers: Chromium and Firefox

## Existing Docker installation
- Web container: nopcommerce490_web
- Database container: nopcommerce490_db
- Web port mapping: 8081:80
- Database storage: Docker volume at /var/lib/postgresql/data
- Database environment names: POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD
- Credentials are not included in this repository.

## Original Compose location
Desktop/nopCommerce-4.90.8/nopCommerce-release-4.90.8/postgresql-sqa-compose.yml
The web service uses the Dockerfile in the same release directory.

## Start existing containers
1. Run: docker start nopcommerce490_db
2. Check: docker inspect --format "{{.State.Health.Status}}" nopcommerce490_db
3. After the database is healthy: docker start nopcommerce490_web
4. Verify: curl.exe -I http://127.0.0.1:8081/

## Execute UI tests
Run: npm ci
Run: npx playwright install chromium firefox
Run: npx playwright test --config=playwright.config.ts --workers=1
Phase 2: npx playwright test --config=playwright.exploration2.config.ts --workers=1

## Reproducibility limitations
The original nopCommerce release source and Dockerfile are outside this repository.
A fresh deployment requires compatible source, PostgreSQL setup and sample catalog data.
The original Compose file is not copied because credentials have not been sanitized.
These instructions document the existing verified local installation, not a one-command fresh deployment.

## Verified testing results
- Main UI suite: 20/20 browser executions passed.
- GitHub API suite: 10/10 passed.
- Exploratory Phase 2: 20/20 executions, 18 PASS and 2 OBSERVED.
- No reproducible nopCommerce product defect was confirmed.
