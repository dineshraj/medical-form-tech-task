import { render, screen } from '@testing-library/react';
import ErrorMessage from '../../src/components/ErrorMessage';

describe('Error Message', () => {
  it('renders the error message', async () => {
    const errorMessage = 'you are the error';
    render(<ErrorMessage error={errorMessage} />);

    const errorElement = await screen.findByTestId('error-message');

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(errorMessage);
  });
});
