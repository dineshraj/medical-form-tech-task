import { render, screen } from '@testing-library/react';
import BackButton from '../../src/components/BackButton';

describe('BackButton', () => {
  it('renders the back button', async () => {
    render(<BackButton page={5} />);
    const backButton = await screen.findByTestId('back-button');
    const backButtonWrapper = await screen.findByTestId('back-button-wrapper');

    expect(backButtonWrapper).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  });

  it('does not render the back button if on the first page but does render the wrapper', async () => {
    render(<BackButton page={1} />);
    const backButtonWrapper = await screen.findByTestId('back-button-wrapper');
    const backButton = screen.queryByTestId('back-button');

    expect(backButtonWrapper).toBeInTheDocument();
    expect(backButton).not.toBeInTheDocument();
  });

  it('renders the back icon', async () => {
    render(<BackButton page={2} />);
    const backIcon = await screen.findByRole('back-icon');

    expect(backIcon).toBeInTheDocument();
  });
});
