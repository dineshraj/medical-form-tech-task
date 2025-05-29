import { render, screen } from '@testing-library/react';
import AgeField from '../../../../src/components/Pages/PageOne/AgeCheck/AgeField';
import {
  UseFormRegisterReturn,
  FieldErrors,
  FieldValues
} from 'react-hook-form';
import { vitest } from 'vitest';

const registeredMock =
  vitest.fn() as unknown as UseFormRegisterReturn<'ageField'>;
const errorsMock = vitest.fn() as unknown as FieldErrors<FieldValues>;

describe('AgeTest', () => {
  it('renders the age field', async () => {
    render(<AgeField errors={errorsMock} registered={registeredMock} />);

    const ageField = await screen.findByTestId('age-field');

    expect(ageField).toBeInTheDocument();
  });
});
