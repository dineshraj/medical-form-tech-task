import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['test/**/*.test.{tsx,ts}'],
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./test/setupTest.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html']
      }
    }
  })
);
