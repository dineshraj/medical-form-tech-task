import { render, screen } from '@testing-library/react';
import TimePickerWrapper from '../../../../src/components/Pages/PageFour/TimePicker'
import { vitest } from 'vitest';
import { FieldErrors, FieldValues } from 'react-hook-form';

const errorsMock = vitest.fn() as unknown as FieldErrors<FieldValues>;

describe('TimePicker', () => {
  it('renders the time picker', () => {
    render(<TimePickerWrapper onChange={() => {  }} value={new Date()} error={errorsMock} />);

    const timePicker = screen.getByTestId('appointment-time-label');

    expect(timePicker).toBeVisible();
  });

  it('does not display an error if no error message is passed in', () => {
    render(<TimePickerWrapper onChange={() => {}} value={new Date()} />);
    const timeError = screen.queryByTestId('error-message');

    expect(timeError).not.toBeInTheDocument();
  });

  it('displays an error if an error message is passed in', () => {
    render(<TimePickerWrapper onChange={() => {}} value={new Date()} error={{message: 'dick'}} />);
    
    const timeError = screen.queryByTestId('error-message');
    expect(timeError).toBeInTheDocument();
    expect(timeError).toHaveTextContent('dick');
  });
});
