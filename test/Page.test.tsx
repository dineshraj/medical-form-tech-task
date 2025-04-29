import { render, screen } from '@testing-library/react';
import Page from '../src/components/Page';

describe('Form', () => {
  it('renders the page container', async () => {
    render(<Page />);
    const formContainer = await screen.findByTestId('page-container');
    expect(formContainer).toBeVisible();
  });
});
