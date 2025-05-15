import { render, screen } from '@testing-library/react';
import Pages from '../src/components/Pages';

describe('Form', () => {
  it('renders the page container', async () => {
    render(<Pages />);
    const formContainer = await screen.findByTestId('page-container');
    expect(formContainer).toBeVisible();
  });
});
