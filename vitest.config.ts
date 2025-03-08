import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // 启用全局 expect, describe, it 等
    environment: 'node', // 可以是 jsdom 或 node
  },
});