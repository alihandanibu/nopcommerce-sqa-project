import { test, expect } from '@playwright/test';

test('@regression TC-AUTO-10: Empty search validation', async ({ page }) => {
  await page.goto('http://localhost:8081/');

  await page.locator('#small-searchterms').fill('');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Please enter some search keyword');
    await dialog.accept();
  });

  await page.locator('.search-box-button').click();

  await expect(page).toHaveURL('http://localhost:8081/');
});
