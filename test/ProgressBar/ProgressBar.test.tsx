import { render, screen } from '@testing-library/react';
import ProgressBar from '../../src/components/ProgressBar/ProgressBar';

const PROGRESS_BAR_COUNT = 4;

describe('ProgressBar', () => {
  it('renders the progress bars', async () => {
    render(<ProgressBar sections={PROGRESS_BAR_COUNT} />);

    const progressBar = await screen.findByTestId('progress-bar');
    const progressBarItems = await screen.findAllByTestId(
      'progress-bar__item'
    );

    expect(progressBar).toBeInTheDocument();
    expect(progressBarItems).toHaveLength(4);
  });
});
