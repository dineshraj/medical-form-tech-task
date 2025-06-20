import { render, screen } from '@testing-library/react';

import CallType from '../../../../src/components/Pages/PageFour/CallType';
import { pageFour } from '../../../../src/lib/lang';

describe('CallType', () => {
  it('render the CallType text', async () => {
    render(<CallType />);
    const callTypeLabel = screen.getByTestId('title');

    expect(callTypeLabel).toHaveTextContent(pageFour.callType);
  });

  it('renders the two buttons', () => {
    render(<CallType />);

    const callTypeOptions = screen.getAllByTestId('call-type-options');

    expect(callTypeOptions.length).toEqual(2);
  });
});
