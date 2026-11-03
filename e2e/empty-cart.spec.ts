import { test, expect } from '@playwright/test';

test('@smoke TC-AUTO-05: Empty shopping cart', async ({ page }) => {
  await page.goto('http://localhost:8081/cart');

  await expect(page.getByRole('heading', { name: 'Shopping cart' }))
    .toBeVisible();

  await expect(page.locator('.order-summary-content'))
    .toContainText('Your Shopping Cart is empty!');
});
