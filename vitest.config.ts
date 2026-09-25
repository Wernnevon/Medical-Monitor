import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@domain': resolve(__dirname, './src/domain'),
      '@data': resolve(__dirname, './src/data'),
      '@infra': resolve(__dirname, './src/infra'),
      '@core': resolve(__dirname, './src/core'),
      '@app': resolve(__dirname, './src/app'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts'],
    // Timeout maior por conta da latência do emulador
    testTimeout: 15000,
    hookTimeout: 15000,
  },
});
