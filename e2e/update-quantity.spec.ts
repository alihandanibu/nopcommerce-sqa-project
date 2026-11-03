import { test, expect } from '@playwright/test';

test('@regression TC-AUTO-08: Update product quantity', async ({ page }) => {
  await page.goto('/apple-macbook-pro');

  await page.locator('input.qty-input').fill('3');
  await page.locator('#add-to-cart-button-4').click();

  await expect(page.locator('.cart-qty')).toContainText('(3)');

  await page.goto('/cart');

  const quantity = page.locator('input.qty-input');
  await expect(quantity).toHaveValue('3');

  const total = page.locator('.order-total .value-summary');
  const totalBefore = await total.innerText();

  await page.locator('[id^="quantity-up-"]').click();

  await expect(quantity).toHaveValue('4');
  await expect(page.locator('.cart-qty')).toContainText('(4)');

  await expect.poll(async () => total.innerText())
    .not.toBe(totalBefore);

  await expect(page.locator('.message-error')).toHaveCount(0);
});
