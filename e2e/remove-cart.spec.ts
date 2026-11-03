import { test, expect } from '@playwright/test';

test('@regression TC-AUTO-09: Remove product from shopping cart', async ({ page }) => {
  await page.goto('http://localhost:8081/apple-macbook-pro');

  await page.locator('input.qty-input').fill('2');
  await page.locator('#add-to-cart-button-4').click();

  await expect(page.locator('.cart-qty')).toContainText('(2)');

  await page.goto('http://localhost:8081/cart');

  await page.locator('button.remove-btn').click();

  await expect(page.locator('.order-summary-content'))
    .toContainText('Your Shopping Cart is empty!');
});
