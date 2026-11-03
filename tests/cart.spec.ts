import { test, expect } from '@playwright/test';

test('@smoke TC-AUTO-03: Add product to shopping cart', async ({ page }) => {
  await page.goto('http://localhost:8081/');

  await page.locator('#small-searchterms').fill('MacBook');
  await page.locator('.search-box-button').click();

  await page.getByRole('link', { name: 'Apple MacBook Pro', exact: true }).click();

  await page.locator('input.qty-input').fill('2'); await page.locator('#add-to-cart-button-4').click();

  await expect(page.locator('.cart-qty')).toContainText('(2)');
});
