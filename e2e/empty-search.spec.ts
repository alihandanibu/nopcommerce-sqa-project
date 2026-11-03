import { test, expect } from '@playwright/test';

test('@regression TC-AUTO-10: Empty search validation', async ({ page }) => {
  await page.goto('/');
  await page.locator('#small-searchterms').fill('');

  // The test fails if the expected browser dialog is never observed.
  let message: string | null = null;
  page.once('dialog', async dialog => {
    message = dialog.message();
    await dialog.accept();
  });
  await page.locator('.search-box-button').click();
  await expect.poll(() => message).toContain('Please enter some search keyword');
  await expect(page).toHaveURL('http://localhost:8081/');
});