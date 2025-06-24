import { modifyDate, modifyTime } from '../../src/lib/date';

describe('date', () => {
  it('modifies the ISO date to the date format we want', () => {
    const ISOdate = '2025-06-27T22:00:00.000Z';
    const expectedDate = '27 June 2025';

    const modifiedDate = modifyDate(ISOdate);

    expect(modifiedDate).toBe(expectedDate);
  });
  it('modifies the ISO date to the time format we want', () => {
    const ISOdate = '2025-06-27T22:00:00.000Z';
    const expectedTime = '11:00 pm';

    const modifiedTime = modifyTime(ISOdate);

    expect(modifiedTime).toBe(expectedTime);
  });
});
