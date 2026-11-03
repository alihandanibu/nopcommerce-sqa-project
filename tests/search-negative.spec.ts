import { test, expect } from '@playwright/test';

test('@regression TC-AUTO-06: Search for nonexistent product', async ({ page }) => {
  await page.goto('http://localhost:8081/');

  await page.locator('#small-searchterms').fill('XYZNONEXISTENT98765');

  await page.locator('.search-box-button').click();

  await expect(page.getByText('No products were found that matched your criteria.'))
    .toBeVisible();
});
