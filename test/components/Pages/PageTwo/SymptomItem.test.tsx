import { render, screen, within } from '@testing-library/react';
import SymptomItem from '../../../../src/components/Pages/PageTwo/Symptoms/SymptonItem';

describe('SymptonItem', () =>
  it('renders a symptom item with the correct data', async () => {
    const mockItem = {
      id: 'dumb-af',
      name: 'Too retarded',
      icon: 'icon-time',
      info: 'needs a lobotomy'
    };
    render(<SymptomItem {...mockItem} />);
    const listItem = await screen.findByTestId('symptom-item');

    expect(listItem).toHaveAttribute('data-id', mockItem.id);
    expect(listItem).toHaveTextContent(mockItem.name);
    expect(listItem).toHaveTextContent(mockItem.info);

    const icon = within(listItem).getByRole('img');
    expect(icon).toHaveAttribute('src', mockItem.icon);
  }));
