import { vi } from 'vitest';
// import React, { Root } from 'react-dom/client';
import '../src/main';

vi.mock('react-dom/client', async () => {
  return {
    createRoot: vi.fn(() => {
      return {
        render: vi.fn()
      }
    })
  }
});

describe('main', () => {
  it('calls createRoot', async () => {
     await import('../src/main');
    const { createRoot } = await import('react-dom/client');

    expect(createRoot).toHaveBeenCalled();
  });
});
