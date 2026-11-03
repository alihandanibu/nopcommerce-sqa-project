import { test, expect } from '@playwright/test';

test('@smoke TC-AUTO-01: Homepage loads successfully', async ({ page }) => {
  await page.goto('http://localhost:8081/');

  await expect(page).toHaveTitle(/Your store\. Home page title/i);
});
