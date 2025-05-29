import { render, screen } from '@testing-library/react';
import ProgressBar from '../../../src/components/ProgressBar/ProgressBar';

const PROGRESS_BAR_COUNT = 4;

describe('ProgressBar', () => {
  it('renders the progress bars', () => {
    render(<ProgressBar sections={PROGRESS_BAR_COUNT} page={1} />);

    const progressBar = screen.getByTestId('progress-bar');
    const progressBarItems = screen.getAllByTestId('progress-bar__item');

    expect(progressBar).toBeInTheDocument();
    expect(progressBarItems).toHaveLength(4);
  });

  it('renders the first progress item in a different colour', () => {
    render(<ProgressBar sections={PROGRESS_BAR_COUNT}  page={1} />);

    const progressBarItems = screen.getAllByTestId('progress-bar__item');
    expect(progressBarItems[0]).toHaveStyle(
      'background-color: rgb(118, 87, 191);'
    );
  });

  it('renders the highlighted color with respect to the page parameter', () => {
    render(<ProgressBar sections={PROGRESS_BAR_COUNT} page={2} />);
    const progressBarItems = screen.getAllByTestId('progress-bar__item');
    expect(progressBarItems[0]).toHaveStyle(
      'background-color: rgb(242, 242, 242);'
    );
    expect(progressBarItems[1]).toHaveStyle(
      'background-color: rgb(118, 87, 191);'
    );
  });
});
