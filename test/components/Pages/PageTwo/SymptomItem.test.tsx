import { render, screen } from '@testing-library/react';
import SymptomItem from '../../../../src/components/Pages/PageTwo/Symptoms/SymptonItem';
import { vi, vitest } from 'vitest';

describe('SymptonItem', () => {
  beforeEach(() => {
    vitest.mock('react-hook-form', () => {
      // TODO abstract into function
      return {
        useFormContext: vi.fn().mockReturnValue({
          register: vi.fn()
        })
      };
    });
  });

  afterEach(() => {
    vitest.restoreAllMocks();
  });

  it('renders a symptom item with the correct data', async () => {
    const mockItem = {
      id: 'dumb-af',
      name: 'Too retarded',
      info: 'needs a lobotomy'
    };
    render(<SymptomItem {...mockItem} />);
    const listItem = await screen.findByTestId('symptom-item');

    expect(listItem).toHaveAttribute('data-id', mockItem.id);
    expect(listItem).toHaveTextContent(mockItem.name);
    expect(listItem).toHaveTextContent(mockItem.info);

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('class', 'symptom-list__icon');
  });
});
