import Email from '../../../../src/components/Pages/PageOne/Email';
import { render, screen } from '@testing-library/react';
import { pageOne } from '../../../../src/lib/lang';
import {
  UseFormRegisterReturn,
  FieldErrors,
  FieldValues
} from 'react-hook-form';
import { vitest } from 'vitest';

const registeredMock = vitest.fn() as unknown as UseFormRegisterReturn<'email'>;
const errorsMock = vitest.fn() as unknown as FieldErrors<FieldValues>;

describe('Email', () => {
  it('render the Email label', async () => {
    render(<Email registered={registeredMock} errors={errorsMock} />);
    const emailLabel = await screen.findByTestId('enter-your-email');

    expect(emailLabel).toBeInTheDocument();
  });

  it('render the Email label text', async () => {
    render(<Email registered={registeredMock} errors={errorsMock} />);
    const emailLabel = await screen.findByTestId('enter-your-email');

    expect(emailLabel).toHaveTextContent(pageOne.email);
  });

  it('render the Email label input', async () => {
    render(<Email registered={registeredMock} errors={errorsMock} />);
    const emailinput = await screen.findByTestId('enter-your-email-input');

    expect(emailinput).toBeInTheDocument();
  });
});
