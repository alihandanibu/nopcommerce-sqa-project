import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  testDir: './exploration',
  testMatch: '**/phase2.spec.ts',
  reporter: [['list'], ['html', { outputFolder: 'exploration2-report', open: 'never' }]],
});