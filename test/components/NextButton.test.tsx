import { screen } from '@testing-library/dom';
import NextButton from '../../src/components/NextButton';
import { next } from '../../src/lib/lang';
import { render } from '@testing-library/react';

describe('NextButton', () => {
  it('renders the next button', async () => {
    render(<NextButton disabled={false} page={1} />);

    const nextButton = await screen.findByText(next);

    expect(nextButton).toBeInTheDocument();
  });

  it('renders as disabled if the disabled prop is true', async () => {
    render(<NextButton disabled={true} page={1} />);

    const nextButton = await screen.findByText(next);

    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });
});
