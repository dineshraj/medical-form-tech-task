import { render, screen } from '@testing-library/react';
import BackButton from '../../src/components/BackButton';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('BackButton', () => {
  it('renders the back button', async () => {
    render(<BackButton page={5} handleOnClick={() => {}} />);
    const backButton = await screen.findByTestId('back-button');
    const backButtonWrapper = await screen.findByTestId('back-button-wrapper');

    expect(backButtonWrapper).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  });

  it('does not render the back button if on the first page but does render the wrapper', async () => {
    render(<BackButton page={1} handleOnClick={() => {}} />);
    const backButtonWrapper = await screen.findByTestId('back-button-wrapper');
    const backButton = screen.queryByTestId('back-button');

    expect(backButtonWrapper).toBeInTheDocument();
    expect(backButton).not.toBeInTheDocument();
  });

  it('renders the back icon', async () => {
    render(<BackButton page={2} handleOnClick={() => {}} />);
    const backIcon = await screen.findByRole('back-icon');

    expect(backIcon).toBeInTheDocument();
  });

  it('the click handler is called when clicking the back button', async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();

    render(<BackButton page={2} handleOnClick={onClickMock} />);

    const backButton = await screen.findByTestId('back-button');

    await user.click(backButton);

    expect(onClickMock).toHaveBeenCalled();
  });
});
