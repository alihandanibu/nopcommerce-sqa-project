import { test, expect } from '@playwright/test';

test('@regression TC-AUTO-04: Reject quantity below minimum', async ({ page }) => {
  await page.goto('http://localhost:8081/apple-macbook-pro');

  await page.locator('input.qty-input').fill('1');

  await page.locator('#add-to-cart-button-4').click();

  await expect(page.locator('.bar-notification'))
    .toContainText('The minimum quantity allowed for purchase is 2.');

  await expect(page.locator('.cart-qty')).toContainText('(0)');
});
