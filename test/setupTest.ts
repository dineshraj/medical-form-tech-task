import '@testing-library/jest-dom';

import { expect, vi } from 'vitest';

import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
} as unknown as Storage;

global.localStorage = localStorageMock;

afterEach(() => {
  cleanup();
});
