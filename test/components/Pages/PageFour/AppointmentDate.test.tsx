import { screen } from '@testing-library/dom';
import AppointmentDate from '../../../../src/components/Pages/PageFour/AppointmentDate';
import { render } from '@testing-library/react';

describe('DateOfBirth', () => {
  it('does not display an error if no error message is passed in', () => {
    render(<AppointmentDate onChange={() => {}} value={new Date()} />);
    const dobError = screen.queryByTestId('error-message');

    expect(dobError).not.toBeInTheDocument();
  });

  it('does display an error if no error message is passed in', () => {
    render(<AppointmentDate onChange={() => {}} value={new Date()} error={{message: 'dick'}} />);
    
    const dobError = screen.queryByTestId('error-message');
    expect(dobError).toBeInTheDocument();
    expect(dobError).toHaveTextContent('dick');
  });
});
