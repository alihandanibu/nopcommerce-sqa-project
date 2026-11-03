import { test, expect } from '@playwright/test';

test('@smoke TC-AUTO-07: Product details page', async ({ page }) => {
  await page.goto('http://localhost:8081/apple-macbook-pro');

  await expect(page.locator('.product-name h1'))
    .toHaveText('Apple MacBook Pro');

  await expect(page.locator('#add-to-cart-button-4'))
    .toBeVisible();
});
