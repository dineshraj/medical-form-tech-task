import { vi } from 'vitest';
import { FORM_KEY } from '../../src/App';
import {
  getFromLocalStorage,
  updateLocalStorage
} from '../../src/lib/localStorage';

describe('localStorage', () => {
  it('updates localStorage with new data', () => {
    const existingData = { name: 'Alice', dob: '2025-04-30T23:00:00.000Z' };

    localStorage.getItem = vi.fn().mockImplementationOnce(() => {
      return JSON.stringify(existingData);
    });

    const newData = {
      symptoms: ['speach-and-communication', 'being a prick']
    };

    updateLocalStorage(newData);

    const expectedDataAsObject = {
      ...existingData,
      ...newData
    };
    const expectedDataInLocalStorage = JSON.stringify(expectedDataAsObject);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      FORM_KEY,
      expectedDataInLocalStorage
    );

    vi.restoreAllMocks();
  });

  it('retrieves values from localStorage', () => {
    const existingData = { name: 'Alice', dob: '2025-04-30T23:00:00.000Z' };

    localStorage.getItem = vi.fn().mockImplementationOnce(() => {
      return JSON.stringify(existingData);
    });

    const retrievedValue = getFromLocalStorage('name');
    const expectedValue = 'Alice';

    expect(retrievedValue).toBe(expectedValue);

    vi.restoreAllMocks();
  });
});
