import { shouldShowErrorBasedOnLength } from '../../src/helpers/formValidation';

describe('helpers', () => {
  describe('shouldShowErrorBasedOnLength', () => {
    it('returns false if the required length is not met', () => {
      const returnValue = shouldShowErrorBasedOnLength('pokemon', 1);
      expect(returnValue).toBe(false);
    });

    it('returns true if the required length is not met', () => {
      const returnValue = shouldShowErrorBasedOnLength('pokemon', 19);
      expect(returnValue).toBe(true);
    });
  });
});
