import { test, expect } from '@playwright/test';

test('@smoke TC-AUTO-02: Search for a product', async ({ page }) => {
  await page.goto('http://localhost:8081/');

  await page.locator('#small-searchterms').fill('MacBook');

  await page.locator('.search-box-button').click();

  await expect(page.getByText('Apple MacBook Pro')).toBeVisible();
});
