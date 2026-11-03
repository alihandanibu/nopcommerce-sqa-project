import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './api',
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'github-api-report', open: 'never' }]
  ],
  use: {
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    trace: 'retain-on-failure'
  }
});
