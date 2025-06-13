import { childSymptomsList, childSymptomsType } from '../../src/data/index';

describe('data', () => {
  it('exports a symptom list object', () => {
    expect(childSymptomsList).toBeTruthy();
  });

  it('exports a symptom type object', () => {
    expect(childSymptomsType).toBeTruthy();
  });
});
