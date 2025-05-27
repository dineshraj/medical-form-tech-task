import { screen } from '@testing-library/dom';
import DateOfBirth from '../../../../src/components/Pages/PageOne/DateOfBirth';
import { render } from '@testing-library/react';

describe('DateOfBirth', () => {
  it('does not display an error if no error message is passed in', async () => {
    render(<DateOfBirth onChange={() => {}} value={new Date()} />);
    const dobError = await screen.queryByTestId('error-message');

    expect(dobError).not.toBeInTheDocument();
  });

  it('does display an error if no error message is passed in', async () => {
    render(<DateOfBirth onChange={() => {}} value={new Date()} error={{message: 'dick'}} />);
    
    const dobError = await screen.queryByTestId('error-message');
    expect(dobError).toBeInTheDocument();
    expect(dobError).toHaveTextContent('dick');
  });
});
