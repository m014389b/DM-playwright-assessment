import { defineConfig, devices } from '@playwright/test';

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,

  timeout: 5 * 60 * 1000,
  expect: {
    timeout: 60 * 1000,
  },
  reportSlowTests: null,

  workers: process.env.FUNCTIONAL_TESTS_WORKERS ? 1 : 1,
  reporter: process.env.CI ? "html" : "html",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        trace: "retain-on-first-failure",
        javaScriptEnabled: true,
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        screenshot: "off",
        trace: "retain-on-first-failure",
        javaScriptEnabled: true,
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        screenshot: "off",
        trace: "retain-on-first-failure",
        javaScriptEnabled: true,
      },
    },
    {
      name: "MobileChrome",
      use: {
        ...devices["Pixel 5"],
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
    {
      name: "MobileSafari",
      use: {
        ...devices["iPhone 12"],
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
    {
      name: "MicrosoftEdge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        screenshot: "only-on-failure",
        trace: "off",
      },
    },
  ],
});
