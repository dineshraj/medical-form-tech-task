import { screen, render, within } from '@testing-library/react';
import SymptomIcon from '../../../../src/components/Pages/PageTwo/Symptoms/SymptomIcon';

describe('SymptomIcon', () => {
  it.skip('renders the icon with the provided fill', () => {
    render(<SymptomIcon fill="#4fae8a" />);

    const icon = screen.getByRole('svg');

    const fillAttributes = within(icon);
  });
});
