import { isValidated } from '../../src/helpers/form';

describe('isValidated', () => {
  it('returns true if the error parameter does not exist', () => {
    const isValid = isValidated(null);
    expect(isValid).toBeFalsy();
  });

  it('returns false if the error parameter does exist', () => {
    const isValid = isValidated('i have never met anyone worse than you');
    expect(isValid).toBe(true);
  });
});
