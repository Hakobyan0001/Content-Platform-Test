import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json']
    },
    setupFiles: ['./src/tests/setupTests.ts'],
    include: ['src/tests/**/*']
  }
});
