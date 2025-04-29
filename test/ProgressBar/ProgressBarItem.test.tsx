import { render, screen } from '@testing-library/react';
import ProgressBarItem from '../../src/components/ProgressBar/ProgressBarItem';

describe('ProgressBarItem', () => {
  it('returns a ProgresBarItem with the default colour', async () => {
    render(<ProgressBarItem />);
    const progressBarItem = await screen.findByTestId('progress-bar__item');
    expect(progressBarItem).toBeInTheDocument();
    expect(progressBarItem).toBeInTheDocument();
  });
});
