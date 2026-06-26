import { defineConfig } from '@mechris3/glassbox';

export default defineConfig({
  journeys: './journeys/**/*.journey.ts',
  browser: {
    defaultViewport: { width: 1280, height: 720 },
    headless: false,
  },
  server: { port: 3001 },
  hooks: {
    // globalSetup: './helpers/global-setup.ts',
    // beforeEach: './helpers/before-each.ts',
    // afterEach: './helpers/after-each.ts',
    // globalTeardown: './helpers/global-teardown.ts',
  },
});
