// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321', // dev server port
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'node scripts/preview-server.mjs',
    port: 4321,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});