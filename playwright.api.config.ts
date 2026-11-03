import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './api-tests',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { outputFolder: 'api-report', open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:3001',
    trace: 'retain-on-failure',
  },
});
